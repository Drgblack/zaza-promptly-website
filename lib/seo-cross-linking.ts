// SEO cross-linking system for Zaza ecosystem

export interface CrossLinkItem {
  url: string
  title: string
  description: string
  app: 'promptly' | 'teach' | 'visuals' | 'ecosystem'
  relevanceScore: number
  anchor: string
  context?: string
}

export interface SEOMetadata {
  title: string
  description: string
  keywords: string[]
  canonicalUrl: string
  alternateUrls?: { [key: string]: string }
  openGraph?: {
    title: string
    description: string
    image: string
    type: string
  }
  jsonLd?: any
}

export class SEOCrossLinking {
  private static readonly DOMAIN_MAP = {
    promptly: 'https://zazapromptly.com',
    teach: 'https://zazateach.com', 
    visuals: 'https://zazavisuals.com',
    ecosystem: 'https://zazapromptly.com'
  }

  // Generate contextual cross-links based on content
  static generateCrossLinks(
    currentContent: {
      title: string
      category: string
      tags: string[]
      app: string
    },
    maxLinks: number = 5
  ): CrossLinkItem[] {
    const links: CrossLinkItem[] = []

    // Internal app links
    const internalLinks = this.getInternalLinks(currentContent)
    links.push(...internalLinks.slice(0, Math.ceil(maxLinks * 0.6)))

    // Cross-app links
    const crossAppLinks = this.getCrossAppLinks(currentContent)
    links.push(...crossAppLinks.slice(0, Math.floor(maxLinks * 0.4)))

    // Sort by relevance and return top results
    return links
      .sort((a, b) => b.relevanceScore - a.relevanceScore)
      .slice(0, maxLinks)
  }

  // Get internal links within the same app
  private static getInternalLinks(content: any): CrossLinkItem[] {
    const links: CrossLinkItem[] = []
    const baseUrl = this.DOMAIN_MAP[content.app as keyof typeof this.DOMAIN_MAP]

    // Category-based internal links
    if (content.category === 'lesson_planning') {
      links.push({
        url: `${baseUrl}/blog/category/lesson-planning`,
        title: 'More Lesson Planning Resources',
        description: 'Discover additional strategies and tools for effective lesson planning',
        app: content.app,
        relevanceScore: 0.9,
        anchor: 'lesson planning resources',
        context: 'category'
      })
    }

    if (content.category === 'ai_tools') {
      links.push({
        url: `${baseUrl}/blog/category/ai-tools`,
        title: 'AI Tools for Teachers',
        description: 'Explore more AI-powered solutions for educators',
        app: content.app,
        relevanceScore: 0.9,
        anchor: 'AI tools for teachers',
        context: 'category'
      })
    }

    // Tag-based internal links
    content.tags.forEach((tag: string) => {
      const tagSlug = tag.toLowerCase().replace(/\s+/g, '-')
      links.push({
        url: `${baseUrl}/blog/tag/${tagSlug}`,
        title: `${tag} Articles`,
        description: `All content related to ${tag.toLowerCase()}`,
        app: content.app,
        relevanceScore: 0.7,
        anchor: `${tag.toLowerCase()} content`,
        context: 'tag'
      })
    })

    // Resource pages
    if (content.app === 'promptly') {
      links.push({
        url: `${baseUrl}/free-resources`,
        title: 'Free Teaching Resources',
        description: 'Download free AI prompts, templates, and guides',
        app: content.app,
        relevanceScore: 0.8,
        anchor: 'free teaching resources',
        context: 'resources'
      })
    }

    return links
  }

  // Get cross-app promotional links
  private static getCrossAppLinks(content: any): CrossLinkItem[] {
    const links: CrossLinkItem[] = []

    // Always include ecosystem page
    links.push({
      url: `${this.DOMAIN_MAP.ecosystem}/zaza-ecosystem`,
      title: 'Zaza Ecosystem - Complete Teaching Suite',
      description: 'Discover all Zaza apps and find the perfect tools for your teaching needs',
      app: 'ecosystem',
      relevanceScore: 0.6,
      anchor: 'complete Zaza ecosystem',
      context: 'ecosystem'
    })

    // Content-specific cross-app links
    if (content.category === 'lesson_planning' || content.tags.includes('curriculum')) {
      links.push({
        url: `${this.DOMAIN_MAP.teach}`,
        title: 'Zaza Teach - Complete Lesson Planning Platform',
        description: 'AI-powered lesson planning with standards alignment and assessment creation',
        app: 'teach',
        relevanceScore: 0.9,
        anchor: 'complete lesson planning platform',
        context: 'cross_promotion'
      })

      links.push({
        url: `${this.DOMAIN_MAP.ecosystem}/why-zaza-teach`,
        title: 'Why Choose Zaza Teach?',
        description: 'Compare free resources vs complete lesson planning tools',
        app: 'ecosystem',
        relevanceScore: 0.8,
        anchor: 'compare teaching tools',
        context: 'comparison'
      })
    }

    if (content.category === 'classroom_design' || content.tags.includes('visual')) {
      links.push({
        url: `${this.DOMAIN_MAP.visuals}`,
        title: 'Zaza Visuals - AI Classroom Graphics',
        description: 'Create professional posters, worksheets, and visual aids with AI',
        app: 'visuals',
        relevanceScore: 0.9,
        anchor: 'AI-powered classroom graphics',
        context: 'cross_promotion'
      })
    }

    if (content.tags.includes('productivity') || content.tags.includes('time-saving')) {
      links.push({
        url: `${this.DOMAIN_MAP.ecosystem}/waitlist?product=autoplanner`,
        title: 'Zaza AutoPlanner - Automated Lesson Planning',
        description: 'Coming soon: completely automated weekly lesson planning',
        app: 'ecosystem',
        relevanceScore: 0.7,
        anchor: 'automated lesson planning',
        context: 'waitlist'
      })
    }

    return links
  }

  // Generate SEO metadata for pages
  static generateMetadata(
    pageData: {
      title: string
      description: string
      app: string
      category?: string
      tags?: string[]
      publishDate?: string
      author?: string
    },
    currentUrl: string
  ): SEOMetadata {
    const baseUrl = this.DOMAIN_MAP[pageData.app as keyof typeof this.DOMAIN_MAP]
    
    return {
      title: `${pageData.title} | ${this.getAppName(pageData.app)}`,
      description: pageData.description,
      keywords: this.generateKeywords(pageData),
      canonicalUrl: currentUrl,
      alternateUrls: this.generateAlternateUrls(pageData, currentUrl),
      openGraph: {
        title: pageData.title,
        description: pageData.description,
        image: this.generateOGImage(pageData),
        type: 'article'
      },
      jsonLd: this.generateJsonLd(pageData, currentUrl)
    }
  }

  // Generate contextual keywords
  private static generateKeywords(pageData: any): string[] {
    const baseKeywords = [
      'AI teaching tools',
      'educational technology',
      'teacher resources',
      'lesson planning',
      'classroom management'
    ]

    const appKeywords = {
      promptly: ['free AI prompts', 'teaching templates', 'AI for teachers'],
      teach: ['lesson planning software', 'curriculum planning', 'standards alignment'],
      visuals: ['classroom graphics', 'educational design', 'AI-generated posters'],
      ecosystem: ['teaching suite', 'educational apps', 'integrated teaching tools']
    }

    const categoryKeywords = {
      lesson_planning: ['lesson plan templates', 'curriculum development', 'instructional design'],
      ai_tools: ['artificial intelligence', 'machine learning', 'AI automation'],
      classroom_management: ['student engagement', 'behavior management', 'classroom organization'],
      productivity: ['time management', 'teacher efficiency', 'workflow optimization']
    }

    let keywords = [...baseKeywords]
    
    // Add app-specific keywords
    if (pageData.app && appKeywords[pageData.app as keyof typeof appKeywords]) {
      keywords.push(...appKeywords[pageData.app as keyof typeof appKeywords])
    }

    // Add category keywords
    if (pageData.category && categoryKeywords[pageData.category as keyof typeof categoryKeywords]) {
      keywords.push(...categoryKeywords[pageData.category as keyof typeof categoryKeywords])
    }

    // Add tag-based keywords
    if (pageData.tags) {
      keywords.push(...pageData.tags)
    }

    return [...new Set(keywords)] // Remove duplicates
  }

  // Generate alternate URLs for cross-app content
  private static generateAlternateUrls(pageData: any, currentUrl: string): { [key: string]: string } {
    const alternates: { [key: string]: string } = {}

    // If this is Promptly content, suggest Teach equivalent
    if (pageData.app === 'promptly' && pageData.category === 'lesson_planning') {
      alternates.teach = `${this.DOMAIN_MAP.teach}/lesson-planning`
    }

    // Ecosystem page for all content
    alternates.ecosystem = `${this.DOMAIN_MAP.ecosystem}/zaza-ecosystem`

    return alternates
  }

  // Generate OpenGraph image URL
  private static generateOGImage(pageData: any): string {
    const baseUrl = this.DOMAIN_MAP[pageData.app as keyof typeof this.DOMAIN_MAP]
    const params = new URLSearchParams({
      title: pageData.title,
      type: pageData.category || 'blog',
      app: pageData.app
    })
    
    return `${baseUrl}/api/og-image?${params.toString()}`
  }

  // Generate JSON-LD structured data
  private static generateJsonLd(pageData: any, currentUrl: string): any {
    return {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: pageData.title,
      description: pageData.description,
      url: currentUrl,
      datePublished: pageData.publishDate || new Date().toISOString(),
      author: {
        '@type': 'Organization',
        name: 'Zaza Technologies',
        url: 'https://zazatechnologies.com'
      },
      publisher: {
        '@type': 'Organization',
        name: this.getAppName(pageData.app),
        logo: {
          '@type': 'ImageObject',
          url: `${this.DOMAIN_MAP[pageData.app as keyof typeof this.DOMAIN_MAP]}/logo.png`
        }
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': currentUrl
      },
      keywords: this.generateKeywords(pageData).join(', ')
    }
  }

  private static getAppName(app: string): string {
    const names = {
      promptly: 'Zaza Promptly',
      teach: 'Zaza Teach',
      visuals: 'Zaza Visuals',
      ecosystem: 'Zaza Technologies'
    }
    return names[app as keyof typeof names] || 'Zaza Technologies'
  }

  // Generate sitemap entries for cross-linking
  static generateSitemapEntries(app: string): any[] {
    const baseUrl = this.DOMAIN_MAP[app as keyof typeof this.DOMAIN_MAP]
    const entries = []

    // Main pages
    entries.push({
      url: baseUrl,
      lastmod: new Date().toISOString(),
      changefreq: 'daily',
      priority: 1.0,
      alternates: this.getCrossAppAlternates(app, '/')
    })

    // Cross-app specific pages
    if (app === 'promptly') {
      entries.push({
        url: `${baseUrl}/why-zaza-teach`,
        lastmod: new Date().toISOString(),
        changefreq: 'weekly',
        priority: 0.8,
        alternates: {
          teach: `${this.DOMAIN_MAP.teach}`,
          ecosystem: `${baseUrl}/zaza-ecosystem`
        }
      })

      entries.push({
        url: `${baseUrl}/zaza-ecosystem`,
        lastmod: new Date().toISOString(),
        changefreq: 'weekly',
        priority: 0.9,
        alternates: {
          teach: `${this.DOMAIN_MAP.teach}`,
          visuals: `${this.DOMAIN_MAP.visuals}`
        }
      })
    }

    return entries
  }

  private static getCrossAppAlternates(currentApp: string, path: string): { [key: string]: string } {
    const alternates: { [key: string]: string } = {}
    
    Object.entries(this.DOMAIN_MAP).forEach(([app, domain]) => {
      if (app !== currentApp) {
        alternates[app] = `${domain}${path}`
      }
    })

    return alternates
  }
}

// Utility functions for generating SEO meta tags (moved to utils to avoid TSX in .ts file)
export function generateStructuredDataScript(data: any): string {
  return `<script type="application/ld+json">${JSON.stringify(data)}</script>`
}

export function generateCanonicalLinkTag(url: string): string {
  return `<link rel="canonical" href="${url}" />`
}

export function generateAlternateLinksHtml(alternates: { [key: string]: string }): string {
  return Object.entries(alternates)
    .map(([lang, url]) => `<link rel="alternate" hreflang="${lang}" href="${url}" />`)
    .join('\n')
}

// Hook for managing SEO in components
export function useSEOCrossLinking(pageData: any, currentUrl: string) {
  const metadata = SEOCrossLinking.generateMetadata(pageData, currentUrl)
  const crossLinks = SEOCrossLinking.generateCrossLinks(pageData)

  return {
    metadata,
    crossLinks,
    structuredData: metadata.jsonLd,
    canonicalUrl: metadata.canonicalUrl,
    alternateUrls: metadata.alternateUrls
  }
}