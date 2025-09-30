Project

Zaza Technologies – Marketing Website
Repo: https://github.com/Drgblack/zaza-website-technologies
Local path: C:\Users\User\zaza-website-technologies
Hosting: Vercel
Vercel project name: zaza-website-technologies
Primary locale: en (English, UK)
Secondary locales: de (German), fr (French), it (Italian), es (Spanish)
Images: public/images/homepage and standard public/ subfolders

i18n Architecture:
- Route-based locales: /en, /de, /fr, /it, /es
- Translation files: /messages/{locale}.json for UI strings
- Content translation: locale-specific data files in /data/
- SEO: hreflang, canonical URLs, locale-specific sitemaps

You are working only on the Zaza Technologies marketing site that aggregates the Zaza product family. This is not the Promptly product site.

Do-Nots and Repo Boundaries

Do not work in, deploy, or reference any of the following repos or Vercel projects from here:

zaza-promptly-website or any "zaza-website-promptly" variants

zaza-teach-website (and other product sites)

realtyclose-website or Close Suite sites

Do not change DNS, domains, or production of other projects from this repo.

Do not move files or assets out of this repo's public/ unless instructed.

Do not add new third-party services without listing them in this file first.

Tone, Style, and Content Conventions

Use UK English spelling.

Prefer hyphens (-) instead of em dashes.

Teacher-first, clear and warm, no hype. Clarity beats cleverness.

Copy must sell outcomes (time saved, stress reduced), not just features.

Consistent primary CTA language across pages (see CTA policy below).

Primary Objectives – Current Sprint

Pre-launch QA & Functional Audit

No 404s, no broken images, no dead CTAs, correct redirects.

All forms submit to the correct backends and actually deliver.

SEO & AI-SEO Readiness

Titles, metas, OG/Twitter, schema, sitemap, robots, alt text.

Usability & Conversion Polish

Consistent primary CTA, spacing, readability, hover states, focus states.

Internationalisation (i18n)

Lock English content, implement clean de translations for key pages.

Correct routing, hreflang, canonical, and sitemap for locales.

Content Updates Specific to Zaza Technologies

Company menu, founder page, testimonials with images, consistent header/footer, working "Start Free Today" CTA behavior.

Information Architecture (high-level)

Home

Solutions (overview pages that link to product sites)

Products (Promptly, Teach, etc. → outbound to product sites)

Pricing (high-level comparison and bundle narrative where applicable)

Company (About, Founder, Press/News, Careers if applicable)

Resources (Blog, Help/Docs links)

Legal (Privacy, Terms)

Contact/Support

Keep navigation consistent and avoid dead ends. Footer must mirror key top-nav links.

CTA Policy

Primary CTA: "Try Free" or "Get Started Free" – routes to the correct product site or sign-up flow.

Secondary CTA: "See Plans" or "Book Demo" – where relevant.

Do not invent new CTA phrasings unless asked. Apply consistently across pages.

Assets and Media

Testimonials headshots: place in public/images/homepage/testimonials/
Reference via /images/homepage/testimonials/<name>.jpg.

Homepage images: already located at public/images/homepage/. Use descriptive file names and include alt text.

Forms and Integrations

Email capture and contact forms must:

Post to the configured backend (Brevo or Lindy webhook if specified).

On success: show a confirmation message and actually deliver the lead.

On failure: show a clear error state and log to console.

If endpoints are unset, place them in .env.local and document keys in .env.example:

BREVO_LIST_ID=
BREVO_API_KEY=
LINDY_WEBHOOK_URL=


Do not commit secrets.

Technical Requirements

Framework: Next.js (App Router) with Tailwind/shadcn (where applicable).

i18n: Folder or routing-based locales (/en, /de) with a visible language toggle.

Accessibility: Keyboard focus states, aria labels on nav/menu buttons, sufficient contrast.

Performance: Optimize images, add loading="lazy" where sensible, avoid blocking scripts.

Pre-Launch QA – Tasks You Must Perform

Link & Redirect Audit

Crawl all links (internal/external). No 404s or stray staging links.

Validate vercel.json redirects if present.

Forms

Test every form end-to-end. Confirm receipt in target system.

If using Brevo, verify list subscription. If using Lindy, verify webhook receipt.

Responsive & Cross-Browser

Test desktop, tablet, mobile; Chrome, Safari, Firefox, Edge.

Check header/footer behavior, sticky nav, and mobile menus.

Accessibility

Landmark roles, meaningful link text, alt text, focus order, skip-to-content.

Performance

Optimize oversized images, check LCP/CLS basics.

Content

Proofread headings, spacing, consistency of CTA labels.

Ensure Company menu items exist and point to live pages.

SEO and AI-SEO – Required

Per page: unique <title> (≤60 chars), meta description (≤155 chars), one H1.

Images: descriptive alt attributes.

Open Graph/Twitter Cards: title, description, image.

Schema: Organization, Website, BreadcrumbList; add Product and FAQ where applicable.

Sitemap: include all en and de routes. Submit via GSC.

Robots: ensure allowed. Block only intentional drafts/staging.

Hreflang: en default, de alternate; canonical URLs set correctly.

i18n – Multi-Language Architecture

Lock English

Freeze current English copy as default en. No overwriting during translation.

Core Locales Implementation

Priority Order: de (German), fr (French), it (Italian), es (Spanish)

Start with: Home, Solutions/Products overview, Pricing, Company/About, Footer/Legal.

Use professional, respectful formal register for each language.

Standard CTA translations:

English → German → French → Italian → Spanish
"Try Free" → "Kostenlos testen" → "Essai gratuit" → "Prova gratuita" → "Prueba gratis"
"Get Started" → "Jetzt starten" → "Commencer" → "Inizia ora" → "Empezar"
"Learn More" → "Mehr erfahren" → "En savoir plus" → "Scopri di più" → "Saber más"

Content Translation Strategy

High Priority Content (Phase 1):
- Homepage and core product pages
- 5 top-performing blog posts
- Key case studies (Lincoln Elementary, Meridian High School)
- Getting started documentation

Medium Priority Content (Phase 2):
- Resource downloads and guides
- Remaining blog posts
- Complete documentation
- Legal and company pages

Technical Implementation

Route Structure: /{locale}/path (e.g., /de/blog, /fr/pricing)
Translation Files: /messages/{locale}.json for UI elements
Content Data: /data/{content}-{locale}.ts for page content
SEO Configuration: hreflang, locale-specific sitemaps, canonical URLs

Quality Assurance

- No layout breaks due to longer text in target languages
- All CTAs and forms function correctly in each locale
- Consistent terminology across all content in each language
- Cultural appropriateness and professional tone
- Mobile responsiveness with translated content

Content Updates – Zaza Technologies Specific

Company menu
Ensure these items are present and live:

About Zaza

Founder

Press/News

Contact

Careers (optional stub or hide)

Founder page

Emphasise dual credibility: Professional Education PhD + Enterprise/Operations background.

Headshot and short narrative that speaks to teachers and enterprise buyers.

Testimonials

Add teacher photos to testimonial cards.

Pair quotes with outcomes (time saved, stress reduced).

Homepage hero and tiles

Keep consistent with Zaza Technologies umbrella messaging.

Ensure "Start Free Today" is a real CTA that goes to the correct action.

Branching, Commits, Deploys

Create feature branches: feat/<short-name> or fix/<short-name>.

Commit style: conventional commits, e.g. feat: add de translations for homepage

Deploy flow

Push branch → Vercel Preview builds.

QA on Preview URL.

Open PR to main; merge when QA passes.

Production deploy triggers on merge. Keep a rollback plan (promote last good build).

Never deploy or promote any other project from this repo.

Verification Checklist – Must Complete Before Marking Done

 No broken links or missing images.

 All forms deliver to target backend; success and error states validated.

 Primary CTA consistent and points to correct flow.

 Titles/metas/OG/Twitter complete on all pages.

 Schema present where applicable.

 Sitemap and robots correct; locales included.

 en locked, de implemented on priority pages; hreflang correct.

 Accessibility basics pass: focus, alt, contrast, keyboard nav.

 Footer legal links live (Privacy, Terms, Contact).

 Analytics/monitoring configured (GA4 or Plausible; Sentry or Vercel Analytics).

 Performance check done; images optimised.

Useful Commands (run in repo root)
# status
git status

# create a branch
git checkout -b feat/de-i18n-pass-1

# install & build (pnpm or npm per project)
pnpm install
pnpm build
pnpm dev

# push branch
git push -u origin feat/de-i18n-pass-1


Deployment is via Vercel Preview on PRs, then merge to main for production.

Open Questions – Ask Before Proceeding If Unclear

Which exact form endpoints are active (Brevo list IDs vs Lindy webhook)?

Confirm final primary CTA route for "Start Free Today".

Any page(s) intentionally excluded from translation for launch?

End of CLAUDE.md