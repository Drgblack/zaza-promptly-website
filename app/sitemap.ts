import { MetadataRoute } from 'next'
import { locales } from '@/i18n'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://zazapromptly.com'
  const currentDate = new Date()
  
  // Core pages that should be available in all locales
  const corePages = [
    '', // homepage
    '/pricing',
    '/blog', 
    '/free-resources',
    '/faqs',
    '/about-founder',
    '/contact',
    '/support',
    '/terms',
    '/privacy',
    '/waitlist'
  ]

  // Products and solutions pages
  const productPages = [
    '/products',
    '/teach',
    '/notably', 
    '/promptly',
    '/spark',
    '/knowledgecore',
    '/looop',
    '/autoplanner'
  ]

  // Persona pages
  const personaPages = [
    '/for-primary-teachers',
    '/for-secondary-english',
    '/for-special-education-iep',
    '/for-heads-of-year'
  ]

  // Combine all pages
  const allPages = [...corePages, ...productPages, ...personaPages]
  
  // Generate sitemap entries for all locales
  const sitemap: MetadataRoute.Sitemap = []

  // Add non-localized root redirect
  sitemap.push({
    url: baseUrl,
    lastModified: currentDate,
    changeFrequency: 'daily',
    priority: 1.0,
    alternates: {
      languages: Object.fromEntries(
        locales.map(locale => [
          locale === 'en' ? 'x-default' : locale,
          `${baseUrl}/${locale}`
        ])
      )
    }
  })

  // Add localized pages
  for (const page of allPages) {
    for (const locale of locales) {
      const url = `${baseUrl}/${locale}${page}`
      
      // Determine priority based on page type
      let priority = 0.7
      if (page === '') priority = 1.0 // homepage
      else if (['/pricing', '/blog', '/free-resources'].includes(page)) priority = 0.9
      else if (page.startsWith('/for-')) priority = 0.8

      // Determine change frequency
      let changeFrequency: 'daily' | 'weekly' | 'monthly' = 'monthly'
      if (page === '') changeFrequency = 'daily' // homepage
      else if (['/pricing', '/blog'].includes(page)) changeFrequency = 'weekly'

      sitemap.push({
        url,
        lastModified: currentDate,
        changeFrequency,
        priority,
        alternates: {
          languages: Object.fromEntries(
            locales.map(loc => [
              loc === 'en' ? 'x-default' : loc,
              `${baseUrl}/${loc}${page}`
            ])
          )
        }
      })
    }
  }

  return sitemap
}