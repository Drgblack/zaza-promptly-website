#!/usr/bin/env bash
set -euo pipefail

# ---- CONFIG ----
REPO="Drgblack/zaza-websites-promptly"
OWNER="Drgblack"                # GitHub username or org that will own the Project
PROJECT_TITLE="Promptly v2 Recovery"

# Require gh auth
gh auth status >/dev/null

echo "==> Creating labels (ok if they already exist)"
make_label() { gh label create "$1" -R "$REPO" -c "$2" -d "$3" 2>/dev/null || true; }
make_label "priority:P0"      "#d73a4a" "Must ship for parity"
make_label "priority:P1"      "#fbca04" "Important for hardening"
make_label "priority:P2"      "#cfd3d7" "Nice to have"
make_label "area:content"     "#0e8a16" "Blog / resources / IA"
make_label "area:i18n"        "#006b75" "Localization"
make_label "area:forms"       "#5319e7" "Brevo / consent"
make_label "area:payments"    "#b60205" "Stripe"
make_label "area:seo"         "#1d76db" "SEO / sitemap / OG"
make_label "area:perf"        "#0052cc" "Perf / Lighthouse"
make_label "area:security"    "#5319e7" "Headers / CSP / Sentry"
make_label "area:ci"          "#5319e7" "Tests / pipelines"
make_label "area:ux"          "#5319e7" "UI/UX polish"
make_label "type:feat"        "#a2eeef" "Feature"
make_label "type:task"        "#fef2c0" "Task"
make_label "type:bug"         "#d73a4a" "Bug"
make_label "status:blocked"   "#ededed" "Blocked on something"

echo "==> Creating milestones (ok if they already exist)"
make_milestone() { gh milestone create -R "$REPO" -t "$1" -d "$2" 2>/dev/null || true; }
make_milestone "Phase 1 — Parity"      "Recover all pre-crash functionality (EN/DE)."
make_milestone "Phase 2 — Hardening"   "Reliability, security, SEO/perf, CI, release process."
make_milestone "Phase 3 — Clone"       "Shared brand tokens + RealtyClose scaffold."

# Resolve milestone numbers
PHASE1=$(gh milestone list -R "$REPO" --state open --json title,number | jq -r '.[]|select(.title=="Phase 1 — Parity")|.number')
PHASE2=$(gh milestone list -R "$REPO" --state open --json title,number | jq -r '.[]|select(.title=="Phase 2 — Hardening")|.number')
PHASE3=$(gh milestone list -R "$REPO" --state open --json title,number | jq -r '.[]|select(.title=="Phase 3 — Clone")|.number')

echo "==> Writing issues manifest"
cat > /tmp/issues.json <<'JSON'
[
  {
    "title": "Parity: Blog, Case Studies, Resources routes + IA restored",
    "labels": ["priority:P0","type:feat","area:content"],
    "milestone": "Phase 1 — Parity",
    "body": "- Restore blog list/detail, case studies list/detail, and resources (PDF grid + metadata).\n- Ensure canonical URLs, proper slugs, and navigation links.\n\n**Acceptance criteria**\n- [ ] Header/footer links navigate without 404.\n- [ ] Blog posts render with date, author, hero image, code/MDX.\n- [ ] Case studies render with OG tags.\n- [ ] Resources grid shows PDFs with titles/size; files downloadable."
  },
  {
    "title": "SEO: Canonicals, hreflang, sitemap, robots",
    "labels": ["priority:P0","type:task","area:seo"],
    "milestone": "Phase 1 — Parity",
    "body": "- Add canonical on all pages; generate hreflang for EN/DE.\n- Verify `sitemap.xml` includes variants; `robots.txt` sane.\n\n**Acceptance criteria**\n- [ ] Canonical present, correct per route.\n- [ ] hreflang covers EN/DE for localizable routes.\n- [ ] Single sitemap includes all pages; robots allows crawling."
  },
  {
    "title": "Redirects: 308 /free-resources → /resources (and legacy aliases)",
    "labels": ["priority:P0","type:task","area:seo"],
    "milestone": "Phase 1 — Parity",
    "body": "Configure Next/Vercel redirects for legacy paths.\n\n**Acceptance criteria**\n- [ ] Visiting /free-resources returns 308 to /resources.\n- [ ] No redirect loops; analytics preserve utm params."
  },
  {
    "title": "OG/Twitter cards for all SEO pages",
    "labels": ["priority:P1","type:feat","area:seo"],
    "milestone": "Phase 2 — Hardening",
    "body": "Add per-page Open Graph & Twitter metadata; include default fallbacks.\n\n**Acceptance criteria**\n- [ ] Home, blog posts, case studies, resources have correct OG title/desc/image.\n- [ ] Lint with meta inspector; links preview nicely."
  },
  {
    "title": "Brevo: newsletter + waitlist integration (double opt-in, locale, consent, anti-spam)",
    "labels": ["priority:P0","type:feat","area:forms"],
    "milestone": "Phase 1 — Parity",
    "body": "- Wire Brevo API: add email with double opt-in.\n- Store `locale`, `source_path`, `consent` fields; add honeypot & rate limit.\n\n**Acceptance criteria**\n- [ ] Submissions succeed in Preview (API key via env).\n- [ ] Honeypot blocks bots; basic rate limit 1/min/IP.\n- [ ] Consent stored and honored."
  },
  {
    "title": "Consent Manager: analytics only after consent",
    "labels": ["priority:P0","type:feat","area:forms"],
    "milestone": "Phase 1 — Parity",
    "body": "Implement a consent banner that gates analytics & marketing pixels.\n\n**Acceptance criteria**\n- [ ] No analytics fire before accept.\n- [ ] Consent state persisted; revocation UI available."
  },
  {
    "title": "Snippet Demo: presets + states + copy button + event logging (post-consent)",
    "labels": ["priority:P0","type:feat","area:ux"],
    "milestone": "Phase 1 — Parity",
    "body": "- Add 3–4 preset chips; graceful empty/loading/error states; Copy to clipboard.\n- Log interactions only after consent.\n\n**Acceptance criteria**\n- [ ] Presets populate the form.\n- [ ] Loading/error UX is clear.\n- [ ] Copy works across devices."
  },
  {
    "title": "Zara page: ‘How to prompt’, FAQ accordion, FAQPage JSON-LD",
    "labels": ["priority:P0","type:feat","area:content"],
    "milestone": "Phase 1 — Parity",
    "body": "Complete /[locale]/zara content, add FAQ schema, nav links to/from demo.\n\n**Acceptance criteria**\n- [ ] Page renders in EN/DE with complete copy.\n- [ ] FAQPage JSON-LD validates.\n- [ ] Linked from header/footer and demo."
  },
  {
    "title": "Stripe (test mode): guarded API + price validation + success/cancel",
    "labels": ["priority:P0","type:feat","area:payments"],
    "milestone": "Phase 1 — Parity",
    "body": "- Validate priceId server-side; no hard-coded apiVersion; guard on missing key.\n- Provide success/cancel pages; SCA/3DS works in test.\n\n**Acceptance criteria**\n- [ ] Checkout works end-to-end in Preview with test keys.\n- [ ] Missing key → safe fallback to /waitlist."
  },
  {
    "title": "i18n: EN/DE parity + locale switcher preserves path; hide FR/ES/IT behind flag",
    "labels": ["priority:P0","type:task","area:i18n"],
    "milestone": "Phase 1 — Parity",
    "body": "Mirror content/labels; switcher keeps route context; feature flag other locales.\n\n**Acceptance criteria**\n- [ ] EN & DE show same structure and content.\n- [ ] Switcher keeps current path and slug.\n- [ ] FR/ES/IT hidden unless LOCALES_ENABLED includes them."
  },
  {
    "title": "Perf: LCP image optimization + font preloads + preconnect",
    "labels": ["priority:P1","type:task","area:perf"],
    "milestone": "Phase 2 — Hardening",
    "body": "Use `next/image` for hero; preload fonts; preconnect where helpful.\n\n**Acceptance criteria**\n- [ ] Lighthouse mobile LCP under 2.5s on Preview.\n- [ ] No layout shift from font swap."
  },
  {
    "title": "Sentry: instrumentation + global 404/500 pages (localized)",
    "labels": ["priority:P1","type:task","area:security"],
    "milestone": "Phase 2 — Hardening",
    "body": "Init Sentry in instrumentation; add global error boundary; friendly 404/500 per locale.\n\n**Acceptance criteria**\n- [ ] Errors appear in Sentry with release + environment.\n- [ ] 404/500 render localized copy."
  },
  {
    "title": "Security headers + CSP (Report-Only) + HSTS",
    "labels": ["priority:P1","type:task","area:security"],
    "milestone": "Phase 2 — Hardening",
    "body": "Apply strict headers (CSP report-only first), HSTS, Referrer-Policy, Permissions-Policy.\n\n**Acceptance criteria**\n- [ ] SecurityHeaders test passes.\n- [ ] No breakages from CSP; upgrade to enforce later."
  },
  {
    "title": "CI: Playwright smoke tests (home/blog/resources/form/Stripe)",
    "labels": ["priority:P0","type:feat","area:ci"],
    "milestone": "Phase 1 — Parity",
    "body": "Add headless E2E: home renders, blog post opens, resource downloads (200), form posts (stub), Stripe test flow reaches success.\n\n**Acceptance criteria**\n- [ ] Tests run in CI, must pass on PR to main."
  },
  {
    "title": "CI: i18n coverage check (EN↔DE)",
    "labels": ["priority:P1","type:task","area:i18n","area:ci"],
    "milestone": "Phase 2 — Hardening",
    "body": "Fail CI if DE messages coverage drops below threshold.\n\n**Acceptance criteria**\n- [ ] Script audits /src/messages; CI fails on gaps."
  },
  {
    "title": "OG image generator for blog/case-study",
    "labels": ["priority:P2","type:feat","area:seo"],
    "milestone": "Phase 2 — Hardening",
    "body": "Generate OG images dynamically with route handlers.\n\n**Acceptance criteria**\n- [ ] Posts/case studies have crisp OG images."
  },
  {
    "title": "Lighthouse budget in CI (mobile) + perf regressions fail",
    "labels": ["priority:P2","type:task","area:perf","area:ci"],
    "milestone": "Phase 2 — Hardening",
    "body": "Add Lighthouse CI with budgets; block PRs on major regressions.\n\n**Acceptance criteria**\n- [ ] Budget file committed; CI shows scores/history."
  },
  {
    "title": "Docs: release checklist + env var runbook",
    "labels": ["priority:P1","type:task","area:content"],
    "milestone": "Phase 2 — Hardening",
    "body": "Document promote-from-preview, required env vars, Stripe test->live switch, consent, Sentry, redirects.\n\n**Acceptance criteria**\n- [ ] /docs/release.md exists and is accurate."
  },
  {
    "title": "Vercel: Production Protection + promote from Preview only",
    "labels": ["priority:P1","type:task","area:ci"],
    "milestone": "Phase 2 — Hardening",
    "body": "Turn on Production Protection; require checks before promote.\n\n**Acceptance criteria**\n- [ ] Production shows lock; deploys promoted from passing preview."
  },
  {
    "title": "Health check endpoint + Uptime monitor",
    "labels": ["priority:P1","type:feat","area:ci"],
    "milestone": "Phase 2 — Hardening",
    "body": "Add /api/health returning app version and 200; set external uptime monitor (doc steps).\n\n**Acceptance criteria**\n- [ ] /api/health returns 200 with JSON.\n- [ ] Uptime monitor created (documented)."
  },
  {
    "title": "Shared brand tokens extraction (Tailwind) for cloning",
    "labels": ["priority:P1","type:feat","area:content"],
    "milestone": "Phase 3 — Clone",
    "body": "Move Promptly colors/spacing/radii to shared brand package; expose tokens as `brand.*`.\n\n**Acceptance criteria**\n- [ ] Promptly compiles using tokens with no visual regressions."
  },
  {
    "title": "Scaffold: sites/realtyclose (flagged) using shared tokens",
    "labels": ["priority:P1","type:feat","area:content"],
    "milestone": "Phase 3 — Clone",
    "body": "Copy Promptly site to `sites/realtyclose`, switch to navy/emerald/gold tokens; feature-flag routes.\n\n**Acceptance criteria**\n- [ ] RealtyClose home builds behind flag; no impact to Promptly."
  }
]
JSON

echo "==> Creating issues"
create_issue () {
  local title="$1" body="$2" labels="$3" milestone="$4"
  local ms_number
  case "$milestone" in
    "Phase 1 — Parity") ms_number='$PHASE1' ;;
    "Phase 2 — Hardening") ms_number='$PHASE2' ;;
    "Phase 3 — Clone") ms_number='$PHASE3' ;;
    *) ms_number='' ;;
  esac
  # shellcheck disable=SC2001
  ms_number=$(eval echo $ms_number)

  url=$(gh issue create -R "$REPO" \
    -t "$title" \
    -b "$body" \
    -l "$labels" \
    -m "$ms_number" \
    --json url -q '.url')
  echo "   -> $url"
}

jq -c '.[]' /tmp/issues.json | while read -r row; do
  TITLE=$(echo "$row" | jq -r '.title')
  BODY=$(echo "$row" | jq -r '.body')
  LABELS=$(echo "$row" | jq -r '.labels | join(",")')
  MILE=$(echo "$row" | jq -r '.milestone')
  create_issue "$TITLE" "$BODY" "$LABELS" "$MILE"
done

echo "==> (Optional) Create a GitHub Project board and add all open issues"
# Create project if missing
PROJECT_ID=$(gh api graphql -f query='
query($owner:String!, $title:String!) {
  organization(login:$owner){ projectsV2(first:100){nodes{ id title number }}}
  user(login:$owner){ projectsV2(first:100){nodes{ id title number }}}
}' -F owner="$OWNER" --jq "
  (.organization.projectsV2.nodes // .user.projectsV2.nodes)
  | map(select(.title==\"$PROJECT_TITLE\")) | .[0].id // empty")

if [[ -z "${PROJECT_ID:-}" ]]; then
  # Try create under user owner
  echo "Creating project $PROJECT_TITLE under $OWNER"
  PROJECT_ID=$(gh api graphql -f query='
mutation($owner:String!, $title:String!) {
  createProjectV2(input:{ownerId: (repositoryOwner: $owner) }) { projectV2 { id } }
}' 2>/dev/null | jq -r '.data.createProjectV2.projectV2.id' || true)

  # Fallback to CLI (older gh may not support create via GraphQL easily)
  if [[ -z "${PROJECT_ID:-}" ]]; then
    echo "Project creation via API is environment-specific. You can also create it manually and rerun the add step."
  fi
fi

if [[ -n "${PROJECT_ID:-}" ]]; then
  echo "Adding open issues to project…"
  gh issue list -R "$REPO" --state open --json number,url | jq -c '.[]' | while read -r iss; do
    IURL=$(echo "$iss" | jq -r '.url')
    gh api graphql -f query='
      mutation($project:ID!, $item:String!){
        addProjectV2ItemById(input:{projectId:$project, contentId:$item}){ item { id } }
      }' -F project="$PROJECT_ID" -F item="$IURL" >/dev/null || true
  done
else
  echo "Project not created automatically; issues & milestones are ready. You can create a Project in the UI and add these issues."
fi

echo "Done."
