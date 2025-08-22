/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://promptly.zazatechnologies.com',
  generateRobotsTxt: true,
  exclude: [
    '/api/*',
    '/_debug/*', 
    '/admin/*',
    '/test/*',
    '*.json',
    '/feed.xml',
    '/feed.json'
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/_debug/',
          '/admin/',
          '/test/',
          '*.json'
        ],
      },
    ],
    additionalSitemaps: [
      'https://promptly.zazatechnologies.com/sitemap.xml',
    ],
  },
  // Generate additional sitemaps for different content types
  additionalPaths: async (config) => {
    const { getAllPostsMeta } = await import('./src/lib/blog.js')
    const { getAllCaseStudies } = await import('./src/lib/case-studies.js')

    const blogPosts = await getAllPostsMeta()
    const caseStudies = await getAllCaseStudies()

    const result = []

    // Add blog posts
    blogPosts.forEach(post => {
      result.push({
        loc: `/blog/${post.slug}`,
        lastmod: new Date(post.date).toISOString(),
        changefreq: 'monthly',
        priority: 0.8,
      })
    })

    // Add case studies
    caseStudies.forEach(caseStudy => {
      result.push({
        loc: `/case-studies/${caseStudy.slug}`,
        lastmod: new Date(caseStudy.metadata.date).toISOString(),
        changefreq: 'monthly',
        priority: 0.7,
      })
    })

    // Add main pages
    const mainPages = [
      { path: '/', priority: 1.0, changefreq: 'weekly' },
      { path: '/blog', priority: 0.9, changefreq: 'daily' },
      { path: '/case-studies', priority: 0.8, changefreq: 'weekly' },
      { path: '/pricing', priority: 0.9, changefreq: 'weekly' },
      { path: '/contact', priority: 0.7, changefreq: 'monthly' },
      { path: '/about/founder', priority: 0.6, changefreq: 'monthly' },
      { path: '/free-resources', priority: 0.8, changefreq: 'weekly' },
      { path: '/privacy', priority: 0.3, changefreq: 'yearly' },
      { path: '/terms', priority: 0.3, changefreq: 'yearly' }
    ]

    mainPages.forEach(page => {
      result.push({
        loc: page.path,
        lastmod: new Date().toISOString(),
        changefreq: page.changefreq,
        priority: page.priority,
      })
    })

    return result
  },
  transform: async (config, path) => {
    // Customize URL transformations
    const defaultTransform = {
      loc: path,
      lastmod: new Date().toISOString(),
      changefreq: 'monthly',
      priority: 0.5,
    }

    // Higher priority for important pages
    if (path === '/') return { ...defaultTransform, priority: 1.0, changefreq: 'weekly' }
    if (path === '/pricing') return { ...defaultTransform, priority: 0.9, changefreq: 'weekly' }
    if (path === '/blog') return { ...defaultTransform, priority: 0.9, changefreq: 'daily' }
    if (path.startsWith('/blog/')) return { ...defaultTransform, priority: 0.8, changefreq: 'monthly' }
    if (path.startsWith('/case-studies/')) return { ...defaultTransform, priority: 0.7, changefreq: 'monthly' }

    return defaultTransform
  },
}