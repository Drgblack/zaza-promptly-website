# Promptly V2 - Live Deployment Configuration

**⚠️ CRITICAL: This is the ONLY live source for zazapromptly.com**

## Deployment Details

### Vercel Configuration
- **Project Name**: `promptly-v2` 
- **Root Directory**: `sites/promptly-v2`
- **Build Command**: `npm run build`
- **Output Directory**: `.next` (default Next.js output)
- **Install Command**: `npm install`

### Route Mapping
The following routes are available on the live site:

| Route | File Path | Description |
|-------|-----------|-------------|
| `/` | `src/app/page.tsx` | Homepage with hero, personas, testimonials |
| `/about/founder` | `src/app/about/founder/page.tsx` | Dr. Greg Blackburn founder story |
| `/blog` | `src/app/blog/page.tsx` | Blog listing page |
| `/blog/[slug]` | `src/app/blog/[slug]/page.tsx` | Individual blog posts |
| `/pricing` | `src/app/pricing/page.tsx` | Pricing plans and checkout |
| `/contact` | `src/app/contact/page.tsx` | Contact form |
| `/personas` | `src/app/personas/page.tsx` | Education role solutions |
| `/personas/[slug]` | `src/app/personas/[slug]/page.tsx` | Role-specific pages |
| `/case-studies` | `src/app/case-studies/page.tsx` | Customer success stories |
| `/learning-centre` | `src/app/learning-centre/page.tsx` | Resources and guides |
| `/free-resources` | `src/app/free-resources/page.tsx` | Free downloads |
| `/waitlist` | `src/app/waitlist/page.tsx` | Sign-up form |

### Important Notes
- Uses Next.js 14.2.8 with App Router
- Styled with Tailwind CSS
- Integrated with Stripe for payments
- Sentry for error tracking
- MDX support for content
- Built-in API routes for contact, checkout, and generation

### Safety Branch
- **Live Snapshot Tag**: `promptly-v2-live-2025-08-22`
- **Hardening Branch**: `promptly-v2-hardening`

### Last Updated
August 22, 2025
