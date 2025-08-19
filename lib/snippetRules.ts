// lib/snippetRules.ts
export type TemplateType = "report" | "parent" | "iep" | "praise";

type Parts = {
  name?: string;
  positives: string[];
  concerns: string[];
  context: string[];
};

export function parseNotes(raw: string): Parts {
  const txt = (raw || "").trim();

  // crude name grab (first capitalized word), fallback to "the student"
  const nameMatch = txt.match(/\b([A-Z][a-z]+)\b/);
  const name = nameMatch?.[1];

  // buckets
  const positives: string[] = [];
  const concerns: string[] = [];
  const context: string[] = [];

  // very simple signal words
  const lower = txt.toLowerCase();

  if (lower.includes("late") || lower.includes("lunch") || lower.includes("disrupt"))
    concerns.push("punctuality and focus after lunch");

  if (lower.includes("math") || lower.includes("english") || lower.includes("reads") || lower.includes("good results"))
    positives.push("strong progress in core subjects");

  if (lower.includes("creative") || lower.includes("writing") || lower.includes("storytelling"))
    positives.push("creative writing and storytelling abilities");

  if (lower.includes("phonics") || lower.includes("comprehension") || lower.includes("reading"))
    positives.push("reading and phonics development");

  if (lower.includes("help") || lower.includes("leadership") || lower.includes("group work"))
    positives.push("collaborative leadership and peer support");

  if (lower.includes("editing") || lower.includes("rush") || lower.includes("inference"))
    concerns.push("taking time with editing and revision");

  if (lower.includes("inference") || lower.includes("comprehension"))
    concerns.push("inference and higher-order comprehension skills");

  // keep any remaining note as context for flavor
  context.push(txt);

  return { name, positives, concerns, context };
}

function firstName(parts: Parts) {
  return parts.name ?? "the student";
}

export function generateFromNotes(raw: string, type: TemplateType): string {
  const p = parseNotes(raw);

  // guard: empty -> friendly nudge
  if (!raw || !raw.trim()) {
    return "Add a few quick notes, and I'll turn them into a clear, professional message.";
  }

  switch (type) {
    case "report": {
      // 3–4 sentences: strength → specific evidence → area for growth → next steps (we language)
      const strengthText = p.positives.length 
        ? `${firstName(p)} is showing ${p.positives[0]} this term`
        : `${firstName(p)} is making steady progress this term`;
      
      const evidenceText = p.positives.length
        ? `From recent class work, ${firstName(p)} demonstrates growth in ${p.positives[0]} and responds well to clear success criteria`
        : `From recent observations, ${firstName(p)} is developing key skills and engaging with learning tasks`;
      
      const concernText = p.concerns.length
        ? `A next step is improving ${p.concerns[0]}, particularly maintaining consistent focus throughout the day`
        : `A next step is continuing to build independence with multi-step tasks`;
      
      const supportText = `We'll keep routines consistent and provide brief check-ins to help ${firstName(p)} stay organised and confident`;

      return `${strengthText}. ${evidenceText}. ${concernText}. ${supportText}.`;
    }

    case "parent": {
      // Greeting → observation → specific ask/collab → warm close (no salutations/signatures here)
      const greeting = `Hi there — a quick update about ${firstName(p)}`;
      
      const observation = p.concerns.length
        ? `${firstName(p)} has found ${p.concerns[0]} a bit challenging, which can affect focus during lessons`
        : `${firstName(p)} is settling well and engaging consistently in lessons`;
      
      const positive = p.positives.length
        ? `On the plus side, ${firstName(p)} is making solid progress in ${p.positives[0]}`
        : `We're seeing steady effort across different subjects, which is great`;
      
      const collaboration = p.concerns.includes("punctuality and focus after lunch")
        ? `Could we both encourage a simple routine after lunch (water, quick reset) to support a calm return to learning? Thanks for your support — it makes a big difference`
        : `I'd love to hear what you're noticing at home and discuss ways we can support ${firstName(p)} together. Thanks for partnering with us`;

      return `${greeting}. ${observation}. ${positive}. ${collaboration}.`;
    }

    case "iep": {
      // SMART-ish mini plan: Present Level → Goal → Supports → Success criteria
      const presentLevel = p.positives.length
        ? `**Present level:** ${firstName(p)} shows ${p.positives[0]}`
        : `**Present level:** ${firstName(p)} is developing core skills`;
      
      const challengeText = p.concerns.length
        ? `focus can dip with ${p.concerns[0]}`
        : `focus is generally steady`;
      
      const goalText = p.concerns.includes("punctuality and focus after lunch")
        ? `**Goal (6–8 weeks):** Improve on-task behaviour after transitions and sustain attention for 10–15 minutes in independent work`
        : `**Goal (6–8 weeks):** Demonstrate increased independence in completing tasks with minimal prompting`;
      
      const supportsText = p.concerns.includes("punctuality and focus after lunch")
        ? `**Supports:** visual schedule, 2-minute settling routine after lunch, clear first-then steps, brief adult check-in`
        : `**Supports:** visual task checklist, regular progress check-ins, clear success criteria, additional processing time`;
      
      const criteriaText = p.concerns.includes("punctuality and focus after lunch")
        ? `**Success criteria:** meets task expectations in 3/4 lessons per week with no more than one prompt after lunch`
        : `**Success criteria:** completes assigned tasks independently in 3/4 attempts with appropriate quality standards`;

      return `${presentLevel}; ${challengeText}. ${goalText}. ${supportsText}. ${criteriaText}.`;
    }

    case "praise": {
      // 2–3 sentences: name-led praise → impact on learning/community → keep it up
      const praiseText = p.positives.length
        ? `${firstName(p)}, I'm proud of the way you're leaning into your strengths — especially your ${p.positives[0]}`
        : `${firstName(p)}, I'm proud of the consistent effort you're putting into your learning`;
      
      const impactText = p.positives.includes("collaborative leadership and peer support")
        ? `Your willingness to help others creates such a positive learning environment for everyone`
        : `Your effort helps our class stay positive and focused, and it shows in your learning`;
      
      const encouragementText = `Keep bringing that attitude — it makes a real difference`;

      return `${praiseText}. ${impactText}. ${encouragementText}.`;
    }
  }
}