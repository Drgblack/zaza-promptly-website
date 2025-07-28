# AI SEO Setup Log

## SEO Utility Package: /packages/seo/

### 1. seoDefaults.ts
- Exports default SEO metadata (title, description, og/tw tags, canonical)
- Usage: Import and spread into your Next.js app's metadata export, override as needed.

### 2. sitemapGenerator.ts
- Auto-generates sitemap.xml by scanning all apps/ for public routes
- Canonical URLs use https://zazatechnologies.com
- Usage: Run `generateSitemap()` in a build script or manually to update sitemap.xml

### 3. structuredData.ts
- Utility functions to generate JSON-LD for FAQPage, Product, and HowTo
- Usage: Import and use in Next.js metadata or inject into <head> for rich results

---

## Apps Updated for SEO (metadata export)
- apps/zaza-visuals-landing-1/app/page.tsx
- apps/zaza-promptly-support-1/app/page.tsx
- apps/teach/app/page.tsx

---

## How to Use SEO Utilities in Future Apps

1. **Default Metadata**
   ```ts
   import { seoDefaults } from 'packages/seo/seoDefaults';
   export const metadata = {
     ...seoDefaults,
     title: 'Custom Title',
     description: 'Custom description',
     // ...other overrides
   };
   ```
2. **Structured Data**
   ```ts
   import { getFAQPageStructuredData } from 'packages/seo/structuredData';
   const faqJsonLd = getFAQPageStructuredData([...]);
   // Inject into metadata or <head>
   ```
3. **Sitemap Generation**
   - Run the script in `packages/seo/sitemapGenerator.ts` to update sitemap.xml after adding new routes.

---

If you need more SEO automation or want to extend these utilities, let me know! 