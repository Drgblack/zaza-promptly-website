import { NextResponse } from 'next/server'

export async function GET() {
  const baseUrl = 'https://zazapromptly.com'
  
  const routes = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date().toISOString(),
      changeFreq: 'weekly',
      priority: 1.0
    },
    {
      url: `${baseUrl}/promptly-pricing`,
      lastModified: new Date().toISOString(),
      changeFreq: 'weekly',
      priority: 0.9
    },
    {
      url: `${baseUrl}/free-resources`,
      lastModified: new Date().toISOString(),
      changeFreq: 'weekly',
      priority: 0.8
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date().toISOString(),
      changeFreq: 'monthly',
      priority: 0.7
    },
    {
      url: `${baseUrl}/about-founder`,
      lastModified: new Date().toISOString(),
      changeFreq: 'monthly',
      priority: 0.6
    },
    {
      url: `${baseUrl}/vision-mission`,
      lastModified: new Date().toISOString(),
      changeFreq: 'monthly',
      priority: 0.6
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date().toISOString(),
      changeFreq: 'monthly',
      priority: 0.7
    },
    {
      url: `${baseUrl}/support`,
      lastModified: new Date().toISOString(),
      changeFreq: 'weekly',
      priority: 0.7
    },
    {
      url: `${baseUrl}/faqs`,
      lastModified: new Date().toISOString(),
      changeFreq: 'weekly',
      priority: 0.7
    },
    {
      url: `${baseUrl}/promptly-faq`,
      lastModified: new Date().toISOString(),
      changeFreq: 'weekly',
      priority: 0.7
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date().toISOString(),
      changeFreq: 'weekly',
      priority: 0.8
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date().toISOString(),
      changeFreq: 'monthly',
      priority: 0.4
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date().toISOString(),
      changeFreq: 'monthly',
      priority: 0.4
    }
  ]

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${routes
  .map(
    (route) => `  <url>
    <loc>${route.url}</loc>
    <lastmod>${route.lastModified}</lastmod>
    <changefreq>${route.changeFreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`
  )
  .join('')}
</urlset>`

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate'
    }
  })
}