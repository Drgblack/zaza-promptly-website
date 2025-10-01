import fs from "node:fs";
import path from "node:path";
import chalk from "chalk";
import { z } from "zod";
import http from "node:http";
import https from "node:https";
import { URL } from "node:url";

/** Where the fixtures live */
const FIXTURE_DIR = path.resolve("tests/golden");

/** Your API endpoint that returns the two texts.
 *  Default assumes localhost; override with GOLDEN_ENDPOINT env var.
 *  Expected response: { polished: string, emailReady: string }
 */
const GENERATE_URL = process.env.GOLDEN_ENDPOINT ?? "http://localhost:3000/api/snippet";

const fixtureSchema = z.object({
  id: z.string(),
  description: z.string().optional(),
  input: z.object({
    text: z.string(),
    name: z.string().nullish(),
    pronoun_choice: z.enum(["auto", "he", "she", "they"])
  }),
  expectations: z.object({
    paragraphs: z.number().int(),
    word_count: z.object({ min: z.number(), max: z.number() }),
    allowed_pronouns: z.array(z.string()).optional(),
    forbidden_pronouns: z.array(z.string()).optional(),
    opener_any: z.array(z.string()).optional(),
    opener_must_contain: z.string().optional(),
    closer_any: z.array(z.string()).optional(),
    must_contain_any: z.array(z.string()).optional(),
    banned_words: z.array(z.string()).optional(),
    grammar_requirements: z.object({
      no_verb_errors: z.array(z.string()).optional(),
      proper_tense: z.boolean().optional(),
      subject_verb_agreement: z.boolean().optional()
    }).optional(),
    debugMustContain: z.string().optional()
  })
});

type Fixture = z.infer<typeof fixtureSchema>;
type Tab = "Polished" | "Email-ready";

function splitParas(s: string) {
  return s.replace(/\r\n/g, "\n").split(/\n{1,}\s*\n/).map(p => p.trim()).filter(Boolean);
}
function countWords(s: string) {
  return (s.match(/\b[\p{L}\p{N}’'-]+\b/gu) ?? []).length;
}
function containsAny(hay: string, needles: string[]) {
  const low = hay.toLowerCase();
  return needles.some(n => low.includes(n.toLowerCase()));
}
function pronounChecks(text: string, allowed?: string[], forbidden?: string[]) {
  const norm = ` ${text.toLowerCase().replace(/[^\p{L}\p{N}\s’'-]/gu, " ")} `;
  const hasForbidden = !!forbidden?.some(p => norm.includes(` ${p} `));
  const okAllowed = allowed ? allowed.some(p => norm.includes(` ${p} `)) : true;
  return { hasForbidden, okAllowed };
}

async function postJSON(url: string, body: any) {
  const u = new URL(url);
  const isHttps = u.protocol === "https:";
  const mod = isHttps ? https : http;
  const payload = Buffer.from(JSON.stringify(body), "utf8");

  return new Promise<any>((resolve, reject) => {
    const req = mod.request({
      method: "POST",
      hostname: u.hostname,
      port: u.port || (isHttps ? 443 : 80),
      path: u.pathname + (u.search || ""),
      headers: { "Content-Type": "application/json", "Content-Length": payload.length }
    }, res => {
      let buf = "";
      res.setEncoding("utf8");
      res.on("data", c => (buf += c));
      res.on("end", () => {
        try { resolve(JSON.parse(buf)); }
        catch { reject(new Error("Bad JSON from endpoint: " + buf)); }
      });
    });
    req.on("error", reject);
    req.write(payload);
    req.end();
  });
}

async function runFixture(fx: Fixture) {
  const resp = await postJSON(GENERATE_URL, {
    focus: fx.input.text,
    student: fx.input.name ?? null,
    pronounToggle: fx.input.pronoun_choice
  });

  const byTab: Record<Tab, string> = {
    "Polished": resp.polished ?? resp.Polished,
    "Email-ready": resp.emailReady ?? resp["Email-ready"]
  };

  const results: { tab: Tab; violations: string[] }[] = [];

  for (const tab of ["Polished","Email-ready"] as const) {
    const txt = byTab[tab];
    const v: string[] = [];
    const paras = splitParas(txt);
    const words = countWords(txt);
    const exp = fx.expectations;

    if (paras.length !== exp.paragraphs) v.push(`paragraphs: expected ${exp.paragraphs}, got ${paras.length}`);
    if (words < exp.word_count.min || words > exp.word_count.max) v.push(`word_count: ${words} (expected ${exp.word_count.min}-${exp.word_count.max})`);
    if (exp.banned_words && containsAny(txt, exp.banned_words)) v.push(`banned_words present`);
    if (exp.opener_any && !containsAny(paras[0] ?? "", exp.opener_any)) v.push(`opener missing one of: ${exp.opener_any.join(" | ")}`);
    if (exp.opener_must_contain && !txt.toLowerCase().includes(exp.opener_must_contain.toLowerCase())) v.push(`opener must contain: ${exp.opener_must_contain}`);
    if (exp.closer_any && !containsAny(paras.at(-1) ?? "", exp.closer_any)) v.push(`closer missing one of: ${exp.closer_any.join(" | ")}`);
    if (exp.must_contain_any && !containsAny(txt, exp.must_contain_any)) v.push(`must contain one of: ${exp.must_contain_any.join(" | ")}`);

    // Grammar checks
    if (exp.grammar_requirements?.no_verb_errors) {
      const foundErrors = exp.grammar_requirements.no_verb_errors.filter(error => 
        txt.toLowerCase().includes(error.toLowerCase())
      );
      if (foundErrors.length > 0) v.push(`grammar errors found: ${foundErrors.join(", ")}`);
    }

    const { hasForbidden, okAllowed } = pronounChecks(txt, exp.allowed_pronouns, exp.forbidden_pronouns);
    if (hasForbidden) v.push("forbidden pronouns detected");
    if (!okAllowed) v.push("allowed pronouns not found");

    // Debug info check (only for Polished tab)
    if (tab === "Polished" && exp.debugMustContain && resp.pronounDebug) {
      if (!resp.pronounDebug.includes(exp.debugMustContain)) {
        v.push(`debug info missing: expected "${exp.debugMustContain}", got "${resp.pronounDebug}"`);
      }
    }

    results.push({ tab, violations: v });
  }

  return results;
}

function loadFixtures(): Fixture[] {
  const files = fs.readdirSync(FIXTURE_DIR).filter(f => f.endsWith(".json")).sort();
  return files.map(f => {
    const raw = fs.readFileSync(path.join(FIXTURE_DIR, f), "utf8");
    return fixtureSchema.parse(JSON.parse(raw));
  });
}

(async () => {
  console.log(chalk.cyan(`Golden tests → ${FIXTURE_DIR}`));
  const fixtures = loadFixtures();
  let total = 0, failed = 0;

  for (const fx of fixtures) {
    const results = await runFixture(fx);
    for (const r of results) {
      total++;
      if (r.violations.length) {
        failed++;
        console.log(chalk.red(`✖ ${fx.id} [${r.tab}]`));
        r.violations.forEach(v => console.log("  • " + v));
      } else {
        console.log(chalk.green(`✔ ${fx.id} [${r.tab}]`));
      }
    }
  }

  console.log(failed ? chalk.red(`\n${failed}/${total} checks failed`) : chalk.green(`\nAll ${total} checks passed`));
  process.exit(failed ? 1 : 0);
})();
