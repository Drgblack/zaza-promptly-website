import { MetadataRoute } from 'next'
import { getPostSlugs, getAllTags, getAllAuthors, getAllPostsMeta, slugifyAuthor, slugifyTag } from '@/lib/blog'
import { CASE_STUDIES } from '@/content/case-studies'
import { supportedLocales } from '@/lib/i18n'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.zazadraft.com'
  const slugs = getPostSlugs()
  const tags = await getAllTags()
  const authors = await getAllAuthors()
  const allPosts = await getAllPostsMeta()
  
  // Calculate total pages for pagination
  const totalPages = Math.ceil(allPosts.length / 10)
  
  // Main pages that should be multilingual
  const mainPages = [
    { path: '/', priority: 1.0, changeFrequency: 'weekly' as const },
    { path: '/zara', priority: 0.9, changeFrequency: 'monthly' as const },
    { path: '/pricing', priority: 0.9, changeFrequency: 'monthly' as const },
    { path: '/blog', priority: 0.8, changeFrequency: 'daily' as const },
    { path: '/case-studies', priority: 0.8, changeFrequency: 'weekly' as const },
    { path: '/resources', priority: 0.7, changeFrequency: 'weekly' as const },
    { path: '/about-founder', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/faq', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/contact', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/support', priority: 0.7, changeFrequency: 'monthly' as const }
  ]
  
  // Generate multilingual main pages
  const multilingualPages = mainPages.flatMap(page => 
    supportedLocales.map(locale => ({
      url: locale === 'en' ? `${baseUrl}${page.path}` : `${baseUrl}/${locale}${page.path}`,
      lastModified: new Date(),
      changeFrequency: page.changeFrequency,
      priority: page.priority,
      alternates: {
        languages: supportedLocales.reduce((acc, loc) => {
          acc[loc] = loc === 'en' ? `${baseUrl}${page.path}` : `${baseUrl}/${loc}${page.path}`
          return acc
        }, {} as Record<string, string>)
      }
    }))
  )
  
  return [
    // Multilingual main pages
    ...multilingualPages,
    {
      url: `${baseUrl}/personas`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/personas/uk-primary`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/personas/us-secondary`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/personas/edtech-savvy`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/personas/international`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/personas/special-needs`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/personas/head-teacher`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/learning-centre`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    // Blog posts
    ...slugs.map((slug) => ({
      url: `${baseUrl}/blog/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
    
    // Case studies
    ...CASE_STUDIES.map((caseStudy) => ({
      url: `${baseUrl}/case-studies/${caseStudy.slug}`,
      lastModified: new Date(caseStudy.dateISO),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    
    // Blog pagination pages (excluding page 1 since that's /blog)
    ...Array.from({ length: totalPages - 1 }, (_, i) => ({
      url: `${baseUrl}/blog/page/${i + 2}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.5,
    })),
    
    // Tag index page
    {
      url: `${baseUrl}/blog/tag`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    
    // Individual tag pages
    ...tags.map((tag) => ({
      url: `${baseUrl}/blog/tag/${slugifyTag(tag)}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.5,
    })),
    
    // Author pages
    ...authors.map((author) => ({
      url: `${baseUrl}/blog/author/${slugifyAuthor(author)}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.5,
    })),
    {
      url: `${baseUrl}/pricing`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/thank-you`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/waitlist`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/quick-comment-helper`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/student-privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/reliable-ai`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.8,
    },
    // Solutions pages
    {
      url: `${baseUrl}/solutions/uk-primary`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/solutions/us-secondary`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/solutions/special-education`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/solutions/international`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/solutions/edtech-savvy`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/solutions/head-teachers-leaders`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ]
}
