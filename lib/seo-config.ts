/**
 * Centralized SEO configuration for Zaza Promptly
 * Ensures consistent metadata across all pages
 */

export interface SEOConfig {
  title: string
  description: string
  keywords: string
  url: string
  image?: string
  noindex?: boolean
  type?: 'website' | 'article'
  article?: {
    publishedTime: string
    modifiedTime: string
    author: string
    section: string
    tags: string[]
  }
}

const baseUrl = 'https://zazapromptly.com'
const defaultImage = '/og-image.png'

export const seoConfigs: Record<string, SEOConfig> = {
  home: {
    title: 'AI Comment Generator for Teachers | Zaza Promptly - Save Hours on Report Writing',
    description: 'Save hours with Zaza Promptly – the AI-powered tool that helps teachers write student comments and parent messages faster, better, and stress-free. Trusted by thousands of educators worldwide.',
    keywords: 'AI comment generator, AI for teachers, student report writing, teacher productivity software, automated feedback generation, ChatGPT for teachers, AI teaching assistant, educational AI tools',
    url: baseUrl,
    image: defaultImage,
  },
  
  'free-resources': {
    title: 'Free AI Resources for Teachers | Templates & Guides | Zaza Promptly',
    description: 'Download free AI prompt templates, time management guides, assessment rubrics, and classroom management resources. Designed specifically for busy educators who want to work smarter.',
    keywords: 'free teacher resources, AI prompt templates, time management for teachers, assessment templates, classroom management guides, teacher productivity tools, free educational resources',
    url: `${baseUrl}/free-resources`,
    image: defaultImage,
  },

  pricing: {
    title: 'Teacher-Friendly Pricing | Zaza Promptly - Start Free, Upgrade Anytime',
    description: 'Affordable AI tools for teachers. Start with our free plan and upgrade when ready. Pro plan at $14.99/month, Bundle at $24.99/month. No contracts, cancel anytime.',
    keywords: 'teacher pricing, affordable AI tools, teacher subscription plans, educational software pricing, AI for teachers cost, teacher-friendly pricing',
    url: `${baseUrl}/promptly-pricing`,
    image: defaultImage,
  },

  about: {
    title: 'About Zaza Promptly | AI Tools Built by Teachers, for Teachers',
    description: 'Founded by educators who understand the teaching profession. Learn about our mission to help teachers work smarter, not harder, with AI-powered tools.',
    keywords: 'about Zaza Promptly, teacher-founded company, AI education tools, educational technology mission, teacher productivity solutions',
    url: `${baseUrl}/about`,
    image: defaultImage,
  },

  'about-founder': {
    title: 'Meet the Founder | Dr. Greg Blackburn | Zaza Promptly',
    description: 'Learn about Dr. Greg Blackburn, the educator-turned-entrepreneur behind Zaza Promptly. Discover the story of how Zaza was created by teachers, for teachers.',
    keywords: 'Dr. Greg Blackburn, Zaza Promptly founder, teacher entrepreneur, educational technology founder, AI education pioneer',
    url: `${baseUrl}/about-founder`,
    image: defaultImage,
  },

  contact: {
    title: 'Contact Zaza Promptly | Teacher Support & Questions',
    description: 'Get in touch with the Zaza Promptly team. We\'re here to help teachers succeed with AI tools. Quick response times and teacher-focused support.',
    keywords: 'contact Zaza Promptly, teacher support, AI tool help, educational technology support, customer service for teachers',
    url: `${baseUrl}/contact`,
    image: defaultImage,
  },

  blog: {
    title: 'AI Teaching Tips & Resources | Zaza Promptly Blog',
    description: 'Discover practical AI tips, teaching strategies, and productivity hacks for educators. Stay updated with the latest in educational technology.',
    keywords: 'AI teaching tips, educational technology blog, teacher productivity tips, AI in education, teaching with technology',
    url: `${baseUrl}/blog`,
    image: defaultImage,
  },

  privacy: {
    title: 'Privacy Policy | Zaza Promptly - Protecting Teacher Data',
    description: 'Learn how Zaza Promptly protects your privacy and student data. FERPA-compliant AI tools designed with teacher privacy in mind.',
    keywords: 'privacy policy, FERPA compliance, teacher data protection, student privacy, educational technology security',
    url: `${baseUrl}/privacy`,
    image: defaultImage,
    noindex: true,
  },

  terms: {
    title: 'Terms of Service | Zaza Promptly - Fair Terms for Teachers',
    description: 'Read our teacher-friendly terms of service. Clear, fair terms designed for educational use of AI tools.',
    keywords: 'terms of service, educational software terms, teacher agreements, AI tool terms',
    url: `${baseUrl}/terms`,
    image: defaultImage,
    noindex: true,
  },

  faqs: {
    title: 'Frequently Asked Questions | Zaza Promptly Teacher Support',
    description: 'Find answers to common questions about Zaza Promptly AI tools. Get help with setup, billing, features, and more.',
    keywords: 'FAQ, teacher help, AI tool questions, Zaza Promptly support, common questions',
    url: `${baseUrl}/faqs`,
    image: defaultImage,
  },

  support: {
    title: 'Teacher Support Center | Zaza Promptly Help & Resources',
    description: 'Get help with Zaza Promptly AI tools. Access tutorials, troubleshooting guides, and direct support for teachers.',
    keywords: 'teacher support, AI tool help, tutorials, troubleshooting, customer service',
    url: `${baseUrl}/support`,
    image: defaultImage,
  },

  'vision-mission': {
    title: 'Our Vision & Mission | Zaza Promptly - Empowering Teachers with AI',
    description: 'Discover Zaza Promptly\'s mission to empower teachers with AI tools that save time and reduce stress. Learn about our vision for the future of education.',
    keywords: 'Zaza mission, teacher empowerment, AI education vision, educational technology mission, teacher support',
    url: `${baseUrl}/vision-mission`,
    image: defaultImage,
  },

  'promptly-faq': {
    title: 'Zaza Promptly FAQ | AI Tool Questions & Answers for Teachers',
    description: 'Get answers to specific questions about Zaza Promptly AI features, pricing, and implementation for teachers.',
    keywords: 'Zaza Promptly FAQ, AI tool questions, teacher AI help, product support',
    url: `${baseUrl}/promptly-faq`,
    image: defaultImage,
  },
}

export function getSEOConfig(pageKey: string, customConfig?: Partial<SEOConfig>): SEOConfig {
  const baseConfig = seoConfigs[pageKey] || seoConfigs.home
  
  return {
    ...baseConfig,
    ...customConfig,
  }
}

export function generateStructuredData(config: SEOConfig) {
  const baseStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Zaza Promptly',
    url: baseUrl,
    logo: `${baseUrl}/zaza-logo.png`,
    description: 'AI-powered tools for teachers to save time on report writing and student feedback',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-555-ZAZA-AI',
      contactType: 'customer service',
      email: 'support@zazapromptly.com',
    },
    sameAs: [
      'https://twitter.com/zazateach',
      'https://facebook.com/zazapromptly',
      'https://linkedin.com/company/zaza-promptly',
    ],
  }

  // Add specific structured data based on page type
  if (config.type === 'article' && config.article) {
    return {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: config.title,
      description: config.description,
      image: config.image,
      url: config.url,
      datePublished: config.article.publishedTime,
      dateModified: config.article.modifiedTime,
      author: {
        '@type': 'Person',
        name: config.article.author,
      },
      publisher: baseStructuredData,
      keywords: config.keywords,
    }
  }

  return baseStructuredData
}

export function generateOpenGraphTags(config: SEOConfig) {
  return {
    'og:title': config.title,
    'og:description': config.description,
    'og:url': config.url,
    'og:image': config.image || defaultImage,
    'og:type': config.type || 'website',
    'og:site_name': 'Zaza Promptly',
    'og:locale': 'en_US',
  }
}

export function generateTwitterTags(config: SEOConfig) {
  return {
    'twitter:card': 'summary_large_image',
    'twitter:title': config.title,
    'twitter:description': config.description,
    'twitter:image': config.image || defaultImage,
    'twitter:creator': '@zazateach',
    'twitter:site': '@zazateach',
  }
}

export function generateCanonicalUrl(config: SEOConfig) {
  return config.url
}