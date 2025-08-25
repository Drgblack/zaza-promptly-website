import { Metadata } from 'next'

interface SEOPageConfig {
  title: string
  description: string
  keywords: string[]
  url: string
  ogTitle?: string
  ogDescription?: string
  twitterTitle?: string
  twitterDescription?: string
}

export const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.zazapromptly.com'

export function generateSEOMetadata(config: SEOPageConfig): Metadata {
  return {
    metadataBase: new URL(baseUrl),
    title: config.title,
    description: config.description,
    keywords: config.keywords.join(', '),
    alternates: {
      canonical: config.url,
      languages: {
        'en': `${baseUrl}${config.url}`,
        'x-default': `${baseUrl}${config.url}`
        // TODO: Add other locales when enabled
        // 'de': `${baseUrl}/de${config.url}`,
        // 'fr': `${baseUrl}/fr${config.url}`,
        // 'es': `${baseUrl}/es${config.url}`,
        // 'it': `${baseUrl}/it${config.url}`
      }
    },
    openGraph: {
      title: config.ogTitle || config.title,
      description: config.ogDescription || config.description,
      url: `${baseUrl}${config.url}`,
      siteName: 'Promptly',
      type: 'website',
      locale: 'en_GB',
      images: [
        {
          url: '/og-default.png',
          width: 1200,
          height: 630,
          alt: 'Promptly - AI Tools for Teachers',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: config.twitterTitle || config.ogTitle || config.title,
      description: config.twitterDescription || config.ogDescription || config.description,
      images: ['/og-default.png'],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}

// Page-specific SEO configurations
export const seoConfigs: Record<string, SEOPageConfig> = {
  home: {
    title: 'AI for Teacher Reports & Parent Communication | Safe AI Writing Helper for Teachers',
    description: 'Save hours with Promptly – hallucination-safe AI for teacher report writing and parent communication. GDPR-compliant AI writing assistant designed by educators, trusted by 12,000+ teachers.',
    keywords: [
      'ai for teacher report writing',
      'teacher report comments helper',
      'safe ai for parent communication',
      'teacher productivity ai',
      'parent email generator for teachers',
      'gdpr compliant ai for schools',
      'hallucination-safe ai for education',
      'ai writing assistant for educators'
    ],
    url: '/',
    ogTitle: 'Promptly – AI Tool for Teacher Reports & Parent Communication',
    ogDescription: 'Hallucination-safe AI that helps teachers write better parent communications and report comments. Save hours weekly while maintaining your caring teacher voice.',
  },
  
  pricing: {
    title: 'Teacher AI Pricing | GDPR-Compliant AI Tools for Schools & Individual Teachers',
    description: 'Simple pricing for AI teacher productivity tools. From $15/month for individual teachers to school-wide solutions. 14-day free trial, no credit card required. GDPR-compliant.',
    keywords: [
      'teacher productivity ai pricing',
      'gdpr compliant ai for schools',
      'ai tools for teachers pricing',
      'teacher report writing software cost',
      'parent communication ai pricing',
      'educational ai subscription'
    ],
    url: '/pricing'
  },

  faq: {
    title: 'Teacher AI FAQ | Safe AI for Parent Communication & Report Writing',
    description: 'Common questions about using hallucination-safe AI for teacher report writing and parent communication. Learn about GDPR compliance, safety features, and teacher productivity benefits.',
    keywords: [
      'safe ai for parent communication',
      'hallucination-safe ai for education',
      'teacher ai safety questions',
      'gdpr ai for schools',
      'ai for teacher reports faq',
      'teacher productivity ai help'
    ],
    url: '/faq'
  },

  freeResources: {
    title: 'Free Teacher Resources | AI Tools, Templates & Professional Development',
    description: 'Free downloadable resources for teachers: AI writing templates, parent communication guides, report comment examples, and professional development materials for teacher productivity.',
    keywords: [
      'teacher time saving apps',
      'professional development ai for teachers',
      'free teacher productivity tools',
      'parent communication templates',
      'teacher report writing templates',
      'empathetic parent communication tools'
    ],
    url: '/free-resources'
  },

  aboutFounder: {
    title: 'About Dr. Greg Blackburn | PhD Educator & Promptly Founder',
    description: 'Meet Dr. Greg Blackburn, PhD in Professional Education and founder of Promptly. 20+ years in EdTech, building safe AI for classroom communication and teacher productivity.',
    keywords: [
      'dr greg blackburn',
      'promptly founder',
      'safe ai for classroom communication',
      'phd education technology',
      'teacher productivity ai expert',
      'educational ai safety'
    ],
    url: '/about/founder'
  },

  blog: {
    title: 'Teacher AI Blog | Reducing Workload with Safe AI Tools & Productivity Tips',
    description: 'Expert insights on AI tools for reducing teacher burnout, safe parent communication, and teacher productivity. Research-backed advice from education professionals.',
    keywords: [
      'ai tools for reducing teacher burnout',
      'teacher workload reduction',
      'safe ai parent communication tips',
      'teacher productivity blog',
      'education ai safety',
      'teacher professional development'
    ],
    url: '/blog'
  },

  support: {
    title: 'Teacher AI Support | Help with GDPR-Compliant Educational AI Tools',
    description: 'Get help with Promptly AI tools for teachers. Technical support, GDPR compliance questions, and guidance for safe AI use in education. Dedicated teacher support team.',
    keywords: [
      'gdpr compliant ai for schools support',
      'safe ai for education help',
      'teacher productivity ai support',
      'educational ai technical help',
      'teacher ai tool assistance'
    ],
    url: '/support'
  }
}