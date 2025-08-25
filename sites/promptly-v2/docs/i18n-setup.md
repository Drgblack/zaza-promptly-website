# How to Enable Locales Later

This guide explains how to activate the i18n scaffolding that has been prepared for the site.

## Current Status
- ✅ i18n strings are defined in `src/i18n/` for all locales (EN, DE, FR, ES, IT)
- ✅ SEO helpers support `inLanguage` parameter
- ✅ Metadata helpers support locale-specific alternates
- ✅ All TODO placeholders marked for translation
- ❌ Next.js i18n routing is **NOT** enabled (site remains EN-only)
- ❌ Translations are **NOT** complete (only English strings are real)

## Steps to Enable Locales

### 1. Complete Translations
```typescript
// Update src/i18n/{de,fr,es,it}.ts
// Replace all "TODO: ..." strings with actual translations
// Use professional translation service or native speakers
```

### 2. Update Next.js Configuration
```typescript
// next.config.js
const nextConfig = {
  i18n: {
    locales: ['en', 'de', 'fr', 'es', 'it'],
    defaultLocale: 'en',
    localeDetection: true, // Auto-detect user language
    domains: [
      // Optional: use subdomains for different markets
      {
        domain: 'www.zazapromptly.com',
        defaultLocale: 'en',
      },
      {
        domain: 'de.zazapromptly.com', 
        defaultLocale: 'de',
      },
      // ... more domains
    ],
  },
}
```

### 3. Enable All Locales in i18n System
```typescript
// src/i18n/index.ts
import { de } from './de'
import { fr } from './fr'
import { es } from './es'
import { it } from './it'

export const translations = {
  en,
  de,
  fr,
  es,
  it
}

export const enabledLocales: SupportedLocale[] = ['en', 'de', 'fr', 'es', 'it']
```

### 4. Update SEO Helpers
```typescript
// src/lib/seo/metadata.ts
export function generateSEOMetadata(config: SEOPageConfig, locale: SupportedLocale = 'en') {
  const t = getTranslations(locale)
  
  return {
    title: locale === 'en' ? config.title : t.meta.homeTitle, // Use translated titles
    alternates: {
      languages: {
        'en': `${baseUrl}${config.url}`,
        'de': `${baseUrl}/de${config.url}`,
        'fr': `${baseUrl}/fr${config.url}`,
        'es': `${baseUrl}/es${config.url}`,
        'it': `${baseUrl}/it${config.url}`,
        'x-default': `${baseUrl}${config.url}`
      }
    }
    // ... rest of metadata
  }
}
```

### 5. Update Sitemap with Alternates
```typescript
// src/app/sitemap.ts
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes = [
    { path: '/', priority: 1 },
    { path: '/pricing', priority: 0.9 },
    // ... all routes
  ]
  
  const locales = ['en', 'de', 'fr', 'es', 'it']
  
  return routes.flatMap(route => 
    locales.map(locale => ({
      url: locale === 'en' ? `${baseUrl}${route.path}` : `${baseUrl}/${locale}${route.path}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: route.priority,
      // Add alternates for each URL
      alternates: {
        languages: Object.fromEntries(
          locales.map(l => [
            l,
            l === 'en' ? `${baseUrl}${route.path}` : `${baseUrl}/${l}${route.path}`
          ])
        )
      }
    }))
  )
}
```

### 6. Create Locale-Specific Pages
```typescript
// src/app/[locale]/page.tsx
export async function generateStaticParams() {
  return [
    { locale: 'en' },
    { locale: 'de' },
    { locale: 'fr' },
    { locale: 'es' },
    { locale: 'it' },
  ]
}

export default function LocalizedHome({ 
  params: { locale } 
}: { 
  params: { locale: SupportedLocale } 
}) {
  const t = getTranslations(locale)
  // Use t.hero.title, t.nav.home, etc.
}
```

### 7. Update Components to Use Translations
```typescript
// Components that display text
import { getTranslations } from '@/i18n'

export default function HeroSection({ locale = 'en' }: { locale?: SupportedLocale }) {
  const t = getTranslations(locale)
  
  return (
    <h1>{t.hero.title}</h1>
    <p>{t.hero.subtitle}</p>
    <button>{t.cta.startTrial}</button>
  )
}
```

## Testing Checklist

- [ ] All TODO strings replaced with real translations
- [ ] Next.js i18n routing working (`/de`, `/fr`, etc.)
- [ ] hreflang tags present in HTML head
- [ ] Sitemap contains all locale URLs
- [ ] Each locale has proper canonical URLs
- [ ] Schema.org JSON-LD includes correct `inLanguage`
- [ ] All components render translated strings
- [ ] SEO metadata translated for each locale

## Content Strategy Notes

- **German (DE)**: Focus on GDPR compliance, data protection
- **French (FR)**: Emphasize educational excellence, pedagogical approach  
- **Spanish (ES)**: Highlight community, family communication
- **Italian (IT)**: Focus on relationship building, warm communication

Each locale should maintain the core teacher-empathy messaging while adapting cultural communication preferences.