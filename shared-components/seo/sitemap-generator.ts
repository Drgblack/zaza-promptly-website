import { MetadataRoute } from 'next'
import { ZAZA_URLS, AI_KEYWORDS } from './metadata-config'

/**
 * Zaza Sitemap Generator
 * 
 * This file provides comprehensive sitemap generation for all Zaza websites,
 * optimized for AI search engines and traditional SEO with proper structure.
 */

export interface SitemapPage {
  url: string
  lastModified: Date
  changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
  priority: number
  title?: string
  description?: string
  keywords?: string[]
  image?: string
}

export interface SitemapConfig {
  baseUrl: string
  productName: string
  productDescription: string
  productKeywords: string[]
  pages: SitemapPage[]
  blogPosts?: Array<{
    slug: string
    title: string
    description: string
    publishDate: Date
    lastModified: Date
    keywords: string[]
  }>
  faqPages?: Array<{
    slug: string
    title: string
    description: string
    lastModified: Date
  }>
}

// Default sitemap configuration for Zaza products
export const ZAZA_SITEMAP_CONFIGS: Record<keyof typeof ZAZA_URLS, SitemapConfig> = {
  main: {
    baseUrl: ZAZA_URLS.main,
    productName: 'Zaza Technologies',
    productDescription: 'Human-centred AI tools built by educators, for educators',
    productKeywords: [...AI_KEYWORDS.ai, ...AI_KEYWORDS.education, ...AI_KEYWORDS.productivity],
    pages: [
      {
        url: ZAZA_URLS.main,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1.0,
        title: 'Zaza Technologies – Human-Centred AI Tools for Educators',
        description: 'Zaza builds trusted AI tools that help teachers save time, reduce burnout, and bring back the joy of teaching.',
        keywords: [...AI_KEYWORDS.ai, ...AI_KEYWORDS.education, ...AI_KEYWORDS.productivity],
      },
      {
        url: `${ZAZA_URLS.main}/about`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
        title: 'About Zaza Technologies',
        description: 'Learn about our mission to build human-centred AI tools for educators.',
        keywords: ['about Zaza', 'Zaza mission', 'education technology company'],
      },
      {
        url: `${ZAZA_URLS.main}/products`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.9,
        title: 'Zaza Products - AI Tools for Educators',
        description: 'Explore our complete suite of AI-powered tools designed specifically for teachers and educators.',
        keywords: [...AI_KEYWORDS.ai, ...AI_KEYWORDS.education, 'Zaza products', 'AI tools'],
      },
      {
        url: `${ZAZA_URLS.main}/pricing`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.9,
        title: 'Zaza Pricing - Affordable AI Tools for Educators',
        description: 'Transparent pricing for our AI-powered education tools. Choose the plan that works for you.',
        keywords: ['Zaza pricing', 'AI tool pricing', 'education technology pricing'],
      },
      {
        url: `${ZAZA_URLS.main}/contact`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
        title: 'Contact Zaza Technologies',
        description: 'Get in touch with our team for support, partnerships, or questions about our AI tools.',
        keywords: ['contact Zaza', 'Zaza support', 'AI tool support'],
      },
      {
        url: `${ZAZA_URLS.main}/blog`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.8,
        title: 'Zaza Blog - AI in Education',
        description: 'Insights, tips, and stories about AI in education from the Zaza team.',
        keywords: [...AI_KEYWORDS.education, 'AI education blog', 'teacher resources'],
      },
      {
        url: `${ZAZA_URLS.main}/faq`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.6,
        title: 'Zaza FAQ - Frequently Asked Questions',
        description: 'Find answers to common questions about our AI tools and services.',
        keywords: ['Zaza FAQ', 'AI tool questions', 'education technology FAQ'],
      },
      {
        url: `${ZAZA_URLS.main}/privacy`,
        lastModified: new Date(),
        changeFrequency: 'yearly',
        priority: 0.3,
        title: 'Zaza Privacy Policy',
        description: 'How we protect your data and privacy when using our AI tools.',
        keywords: ['Zaza privacy', 'data protection', 'AI privacy'],
      },
      {
        url: `${ZAZA_URLS.main}/terms`,
        lastModified: new Date(),
        changeFrequency: 'yearly',
        priority: 0.3,
        title: 'Zaza Terms of Service',
        description: 'Terms and conditions for using Zaza AI tools and services.',
        keywords: ['Zaza terms', 'service terms', 'AI tool terms'],
      },
    ],
  },
  
  promptly: {
    baseUrl: ZAZA_URLS.promptly,
    productName: 'Zaza Promptly',
    productDescription: 'AI-Powered Feedback Generation for Teachers',
    productKeywords: [...AI_KEYWORDS.promptly, ...AI_KEYWORDS.education, ...AI_KEYWORDS.productivity],
    pages: [
      {
        url: ZAZA_URLS.promptly,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1.0,
        title: 'Zaza Promptly - AI-Powered Feedback Generation for Teachers',
        description: 'Save hours with Zaza Promptly – the AI-powered tool that helps teachers write student comments and parent messages faster, better, and stress-free.',
        keywords: [...AI_KEYWORDS.promptly, ...AI_KEYWORDS.education, ...AI_KEYWORDS.productivity],
      },
      {
        url: `${ZAZA_URLS.promptly}/features`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.9,
        title: 'Zaza Promptly Features - AI Comment Generator',
        description: 'Discover the powerful features of Zaza Promptly, including AI comment generation, tone customization, and more.',
        keywords: [...AI_KEYWORDS.promptly, 'AI features', 'comment generator features'],
      },
      {
        url: `${ZAZA_URLS.promptly}/pricing`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.9,
        title: 'Zaza Promptly Pricing - AI Teacher Tools',
        description: 'Affordable pricing plans for Zaza Promptly. Choose the plan that fits your needs.',
        keywords: ['Zaza Promptly pricing', 'AI tool pricing', 'teacher tool pricing'],
      },
      {
        url: `${ZAZA_URLS.promptly}/demo`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
        title: 'Zaza Promptly Demo - Try AI Comment Generation',
        description: 'See Zaza Promptly in action with our interactive demo. Experience AI-powered comment generation.',
        keywords: ['Zaza Promptly demo', 'AI demo', 'comment generator demo'],
      },
      {
        url: `${ZAZA_URLS.promptly}/help`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.7,
        title: 'Zaza Promptly Help & Support',
        description: 'Get help with Zaza Promptly. Find tutorials, guides, and support resources.',
        keywords: ['Zaza Promptly help', 'AI tool support', 'teacher support'],
      },
      {
        url: `${ZAZA_URLS.promptly}/blog`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.8,
        title: 'Zaza Promptly Blog - AI for Teachers',
        description: 'Tips, insights, and stories about AI in education from the Zaza Promptly team.',
        keywords: [...AI_KEYWORDS.education, 'AI education blog', 'teacher resources'],
      },
    ],
    blogPosts: [
      {
        slug: 'ai-teaching-tools-2024',
        title: 'The Best AI Teaching Tools for 2024',
        description: 'Discover the top AI tools that are transforming education and helping teachers save time.',
        publishDate: new Date('2024-01-15'),
        lastModified: new Date('2024-01-15'),
        keywords: [...AI_KEYWORDS.education, 'AI tools 2024', 'teaching technology'],
      },
      {
        slug: 'teacher-productivity-tips',
        title: '10 AI-Powered Productivity Tips for Teachers',
        description: 'Learn how to use AI tools to boost your productivity and reduce administrative workload.',
        publishDate: new Date('2024-01-10'),
        lastModified: new Date('2024-01-10'),
        keywords: [...AI_KEYWORDS.productivity, 'teacher tips', 'AI productivity'],
      },
      {
        slug: 'student-feedback-best-practices',
        title: 'Best Practices for Writing Student Feedback with AI',
        description: 'How to write effective, personalized student feedback using AI assistance.',
        publishDate: new Date('2024-01-05'),
        lastModified: new Date('2024-01-05'),
        keywords: [...AI_KEYWORDS.promptly, 'student feedback', 'feedback best practices'],
      },
    ],
  },
  
  teach: {
    baseUrl: ZAZA_URLS.teach,
    productName: 'Zaza Teach',
    productDescription: 'AI-Powered Lesson Planning for Educators',
    productKeywords: [...AI_KEYWORDS.teach, ...AI_KEYWORDS.education, ...AI_KEYWORDS.productivity],
    pages: [
      {
        url: ZAZA_URLS.teach,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1.0,
        title: 'Zaza Teach - AI-Powered Lesson Planning for Educators',
        description: 'Plan lessons in seconds with Zaza Teach – AI that understands curriculum, context, and creativity to help teachers design engaging learning experiences.',
        keywords: [...AI_KEYWORDS.teach, ...AI_KEYWORDS.education, ...AI_KEYWORDS.productivity],
      },
      {
        url: `${ZAZA_URLS.teach}/features`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.9,
        title: 'Zaza Teach Features - AI Lesson Planning',
        description: 'Explore the powerful features of Zaza Teach, including AI lesson planning, curriculum alignment, and more.',
        keywords: [...AI_KEYWORDS.teach, 'lesson planning features', 'AI curriculum tools'],
      },
      {
        url: `${ZAZA_URLS.teach}/pricing`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.9,
        title: 'Zaza Teach Pricing - AI Lesson Planning',
        description: 'Affordable pricing plans for Zaza Teach. Choose the plan that fits your teaching needs.',
        keywords: ['Zaza Teach pricing', 'lesson planning pricing', 'AI tool pricing'],
      },
      {
        url: `${ZAZA_URLS.teach}/templates`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
        title: 'Zaza Teach Templates - Lesson Plan Templates',
        description: 'Access a library of lesson plan templates designed by educators for educators.',
        keywords: ['lesson plan templates', 'teaching templates', 'curriculum templates'],
      },
    ],
  },
  
  visuals: {
    baseUrl: ZAZA_URLS.visuals,
    productName: 'Zaza Visuals',
    productDescription: 'AI Image Generator for Classrooms',
    productKeywords: [...AI_KEYWORDS.visuals, ...AI_KEYWORDS.education],
    pages: [
      {
        url: ZAZA_URLS.visuals,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1.0,
        title: 'Zaza Visuals - AI Image Generator for Classrooms',
        description: 'Create curriculum-aligned images instantly with Zaza Visuals – AI-powered visual generator designed specifically for educational content.',
        keywords: [...AI_KEYWORDS.visuals, ...AI_KEYWORDS.education],
      },
      {
        url: `${ZAZA_URLS.visuals}/gallery`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
        title: 'Zaza Visuals Gallery - Educational Images',
        description: 'Browse our collection of AI-generated educational images and visual content.',
        keywords: [...AI_KEYWORDS.visuals, 'educational images', 'classroom graphics'],
      },
    ],
  },
  
  inbox: {
    baseUrl: ZAZA_URLS.inbox,
    productName: 'Zaza Inbox',
    productDescription: 'AI Email Management for Educators',
    productKeywords: [...AI_KEYWORDS.inbox, ...AI_KEYWORDS.productivity],
    pages: [
      {
        url: ZAZA_URLS.inbox,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1.0,
        title: 'Zaza Inbox - AI Email Management for Educators',
        description: 'Organize your emails with AI assistance using Zaza Inbox – smart email management designed for busy educators.',
        keywords: [...AI_KEYWORDS.inbox, ...AI_KEYWORDS.productivity],
      },
    ],
  },
  
  claritydeck: {
    baseUrl: ZAZA_URLS.claritydeck,
    productName: 'Zaza ClarityDeck',
    productDescription: 'AI Presentation Maker for Educators',
    productKeywords: [...AI_KEYWORDS.claritydeck, ...AI_KEYWORDS.education],
    pages: [
      {
        url: ZAZA_URLS.claritydeck,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1.0,
        title: 'Zaza ClarityDeck - AI Presentation Maker for Educators',
        description: 'Create stunning presentations with Zaza ClarityDeck – AI-powered slide generator designed for educational content.',
        keywords: [...AI_KEYWORDS.claritydeck, ...AI_KEYWORDS.education],
      },
    ],
  },
  
  schwoop: {
    baseUrl: ZAZA_URLS.schwoop,
    productName: 'Zaza Schwoop',
    productDescription: 'AI Student Engagement Platform',
    productKeywords: [...AI_KEYWORDS.schwoop, ...AI_KEYWORDS.education],
    pages: [
      {
        url: ZAZA_URLS.schwoop,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1.0,
        title: 'Zaza Schwoop - AI Student Engagement Platform',
        description: 'Engage students with AI-powered activities using Zaza Schwoop – interactive learning platform designed to boost classroom participation.',
        keywords: [...AI_KEYWORDS.schwoop, ...AI_KEYWORDS.education],
      },
    ],
  },
  
  'hr-spark': {
    baseUrl: ZAZA_URLS['hr-spark'],
    productName: 'Zaza HR Spark',
    productDescription: 'AI HR Management for Schools',
    productKeywords: [...AI_KEYWORDS['hr-spark']],
    pages: [
      {
        url: ZAZA_URLS['hr-spark'],
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1.0,
        title: 'Zaza HR Spark - AI HR Management for Schools',
        description: 'Streamline HR processes with AI using Zaza HR Spark – comprehensive HR management designed for educational institutions.',
        keywords: [...AI_KEYWORDS['hr-spark']],
      },
    ],
  },
  
  study: {
    baseUrl: ZAZA_URLS.study,
    productName: 'Zaza Study',
    productDescription: 'AI Study Planning and Optimization',
    productKeywords: [...AI_KEYWORDS.study],
    pages: [
      {
        url: ZAZA_URLS.study,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1.0,
        title: 'Zaza Study - AI Study Planning and Optimization',
        description: 'Optimize your study plans with AI using Zaza Study – intelligent study planning designed to maximize learning efficiency.',
        keywords: [...AI_KEYWORDS.study],
      },
    ],
  },
  
  coach: {
    baseUrl: ZAZA_URLS.coach,
    productName: 'Zaza Coach',
    productDescription: 'AI Coaching and Mentoring Platform',
    productKeywords: [...AI_KEYWORDS.coach],
    pages: [
      {
        url: ZAZA_URLS.coach,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1.0,
        title: 'Zaza Coach - AI Coaching and Mentoring Platform',
        description: 'Get AI-powered coaching and mentoring with Zaza Coach – intelligent guidance platform for personal and professional development.',
        keywords: [...AI_KEYWORDS.coach],
      },
    ],
  },
}

/**
 * Generate sitemap for a specific Zaza product
 */
export function generateProductSitemap(product: keyof typeof ZAZA_URLS): MetadataRoute.Sitemap {
  const config = ZAZA_SITEMAP_CONFIGS[product]
  const sitemap: MetadataRoute.Sitemap = []
  
  // Add main pages
  config.pages.forEach(page => {
    sitemap.push({
      url: page.url,
      lastModified: page.lastModified,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    })
  })
  
  // Add blog posts if available
  if (config.blogPosts) {
    config.blogPosts.forEach(post => {
      sitemap.push({
        url: `${config.baseUrl}/blog/${post.slug}`,
        lastModified: post.lastModified,
        changeFrequency: 'monthly',
        priority: 0.7,
      })
    })
  }
  
  // Add FAQ pages if available
  if (config.faqPages) {
    config.faqPages.forEach(faq => {
      sitemap.push({
        url: `${config.baseUrl}/faq/${faq.slug}`,
        lastModified: faq.lastModified,
        changeFrequency: 'monthly',
        priority: 0.6,
      })
    })
  }
  
  return sitemap
}

/**
 * Generate comprehensive sitemap for all Zaza products
 */
export function generateComprehensiveSitemap(): MetadataRoute.Sitemap {
  const sitemap: MetadataRoute.Sitemap = []
  
  // Add all product sitemaps
  Object.keys(ZAZA_SITEMAP_CONFIGS).forEach(product => {
    const productSitemap = generateProductSitemap(product as keyof typeof ZAZA_URLS)
    sitemap.push(...productSitemap)
  })
  
  // Add cross-product pages
  sitemap.push(
    {
      url: `${ZAZA_URLS.main}/ecosystem`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${ZAZA_URLS.main}/compare`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${ZAZA_URLS.main}/integrations`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${ZAZA_URLS.main}/api`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${ZAZA_URLS.main}/developers`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    }
  )
  
  return sitemap
}

/**
 * Default sitemap function for Next.js
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return generateComprehensiveSitemap()
} 