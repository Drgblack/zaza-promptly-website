import { Metadata } from 'next'

// Structured Data / JSON-LD Schema Generator
// Generates SEO-optimized structured data for blog posts and pages

export interface BlogPostData {
  title: string
  description: string
  slug: string
  author: {
    name: string
    url?: string
  }
  datePublished: string
  dateModified?: string
  featuredImage?: string
  tags?: string[]
  category?: string
  readingTime?: string
}

export interface WebsiteData {
  name: string
  url: string
  description: string
  logo?: string
  sameAs?: string[]
}

// Generate Article structured data for blog posts
export function generateArticleSchema(post: BlogPostData, siteUrl: string): object {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    url: `${siteUrl}/blog/${post.slug}`,
    datePublished: post.datePublished,
    dateModified: post.dateModified || post.datePublished,
    author: {
      '@type': 'Person',
      name: post.author.name,
      url: post.author.url || `${siteUrl}/about-founder`
    },
    publisher: {
      '@type': 'Organization',
      name: 'Zaza Technologies',
      url: siteUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteUrl}/blog/${post.slug}`
    },
    articleSection: post.category || 'Education Technology',
    keywords: post.tags?.join(', ') || '',
    ...(post.featuredImage && {
      image: {
        '@type': 'ImageObject',
        url: post.featuredImage,
        width: 1200,
        height: 630
      }
    }),
    ...(post.readingTime && {
      timeRequired: post.readingTime
    })
  }

  return schema
}

// Generate Author structured data
export function generateAuthorSchema(author: BlogPostData['author'], siteUrl: string): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: author.name,
    url: author.url || `${siteUrl}/about-founder`,
    jobTitle: 'EdTech Expert & AI Education Pioneer',
    worksFor: {
      '@type': 'Organization',
      name: 'Zaza Technologies',
      url: siteUrl
    },
    description: 'PhD-qualified educator and founder of Zaza Technologies, building AI tools for teachers worldwide.',
    sameAs: [
      'https://www.linkedin.com/in/drgregblackburn/',
      'https://linkedin.com/company/zaza-technologies',
      'https://twitter.com/zazateachapp'
    ]
  }
}

// Generate WebSite structured data for homepage
export function generateWebsiteSchema(data: WebsiteData): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: data.name,
    url: data.url,
    description: data.description,
    publisher: {
      '@type': 'Organization',
      name: 'Zaza Technologies',
      url: data.url,
      logo: {
        '@type': 'ImageObject',
        url: `${data.url}/og-image.jpg`,
        width: 1200,
        height: 630
      }
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${data.url}/blog?search={search_term_string}`
      },
      'query-input': 'required name=search_term_string'
    },
    sameAs: data.sameAs || [
      'https://linkedin.com/company/zaza-technologies',
      'https://twitter.com/zazateachapp'
    ]
  }
}

// Generate Organization structured data
export function generateOrganizationSchema(siteUrl: string): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Zaza Technologies',
    url: siteUrl,
    logo: `${siteUrl}/og-image.jpg`,
    description: 'AI-powered teaching tools that help educators save time and improve student outcomes',
    foundingDate: '2023',
    founder: {
      '@type': 'Person',
      name: 'Dr. Greg Blackburn',
      jobTitle: 'Founder & CEO'
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      email: 'support@zazapromptly.com'
    },
    sameAs: [
      'https://linkedin.com/company/zaza-technologies',
      'https://twitter.com/zazateachapp'
    ]
  }
}

// Generate FAQ structured data
export function generateFAQSchema(faqs: { question: string; answer: string }[]): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  }
}

// Generate SoftwareApplication structured data for product pages
export function generateSoftwareSchema(siteUrl: string): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Zaza Promptly',
    applicationCategory: 'EducationalApplication',
    operatingSystem: 'Web Browser',
    url: siteUrl,
    description: 'PhD-designed AI teaching assistant that helps 12,000+ teachers write professional parent communications, student comments & reports 10x faster. Built by Dr. Greg Blackburn with GDPR compliance and hallucination-safe AI.',
    softwareVersion: '2.0',
    datePublished: '2023-01-01',
    creator: {
      '@type': 'Person',
      name: 'Dr. Greg Blackburn',
      jobTitle: 'PhD in Professional Education',
      description: 'PhD-qualified educator with 20+ years of teaching experience'
    },
    publisher: {
      '@type': 'Organization',
      name: 'Zaza Technologies',
      url: siteUrl,
      foundingDate: '2023'
    },
    offers: [
      {
        '@type': 'Offer',
        name: 'Free Plan',
        price: '0',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        description: 'Free trial with 5 AI comments per month'
      },
      {
        '@type': 'Offer',
        name: 'Pro Plan',
        price: '12',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        description: 'Unlimited AI comments and advanced features for individual teachers'
      }
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '1200',
      bestRating: '5',
      worstRating: '1'
    },
    featureList: [
      'AI-powered comment generation for student reports',
      'Professional parent communication templates', 
      'GDPR-compliant data handling',
      'Hallucination-safe AI technology',
      'Multi-language support',
      'PhD educator-designed prompts'
    ],
    applicationSubCategory: 'Teacher Productivity Tool'
  }
}

// Generate keywords from content
export function generateKeywordsFromContent(title: string, description: string, slug?: string, tags?: string[]): string[] {
  const keywords = new Set<string>()
  
  // Extract from existing tags
  if (tags) {
    tags.forEach(tag => keywords.add(tag.toLowerCase()))
  }
  
  // Common AI/Education keywords
  const aiEducationKeywords = [
    'AI teacher tools', 'education technology', 'teacher assistant', 
    'student feedback', 'parent communication', 'AI for teachers',
    'teaching efficiency', 'classroom technology', 'educational AI'
  ]
  
  // Extract keywords from title and description
  const text = `${title} ${description} ${slug || ''}`.toLowerCase()
  
  // Add relevant AI/Education keywords if they appear in content
  aiEducationKeywords.forEach(keyword => {
    if (text.includes(keyword.toLowerCase()) || 
        keyword.toLowerCase().split(' ').some(word => text.includes(word))) {
      keywords.add(keyword)
    }
  })
  
  // Extract meaningful words from slug
  if (slug) {
    const slugWords = slug.split('-').filter(word => word.length > 3)
    slugWords.forEach(word => {
      if (!['with', 'from', 'that', 'this', 'your'].includes(word)) {
        keywords.add(word)
      }
    })
  }
  
  // Always include brand keywords
  keywords.add('Zaza Promptly')
  keywords.add('AI teaching assistant')
  
  return Array.from(keywords).slice(0, 15) // Limit to 15 keywords
}

// Create structured data script tag
export function createStructuredDataScript(schema: object): string {
  return `<script type="application/ld+json">${JSON.stringify(schema, null, 2)}</script>`
}

// Utility to add structured data to Next.js metadata
export function addStructuredDataToMetadata(schema: object, existingMetadata?: Metadata): Metadata {
  const structuredDataScript = createStructuredDataScript(schema)
  
  return {
    ...existingMetadata,
    other: {
      ...existingMetadata?.other,
      'structured-data': structuredDataScript
    }
  }
}