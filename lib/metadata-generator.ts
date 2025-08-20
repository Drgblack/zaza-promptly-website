import type { Metadata } from 'next'

interface MetadataProps {
  title: string
  description: string
  keywords?: string[]
  image?: string
  url?: string
  type?: 'website' | 'article' | 'product'
  author?: string
  publishedTime?: string
  modifiedTime?: string
  section?: string
  tags?: string[]
}

const DEFAULT_KEYWORDS = [
  'AI for teachers', 'education technology', 'teacher productivity tools',
  'AI teaching assistant', 'GDPR compliant AI', 'hallucination-safe AI',
  'PhD educator designed', 'Dr Greg Blackburn', 'Zaza Technologies'
]

export function generateMetadata({
  title,
  description,
  keywords = [],
  image = '/og-image.png',
  url = '/',
  type = 'website',
  author = 'Dr. Greg Blackburn',
  publishedTime,
  modifiedTime,
  section,
  tags = []
}: MetadataProps): Metadata {
  const baseUrl = 'https://zazapromptly.com'
  const fullUrl = url.startsWith('http') ? url : `${baseUrl}${url}`
  const fullImageUrl = image.startsWith('http') ? image : `${baseUrl}${image}`
  
  const allKeywords = [...DEFAULT_KEYWORDS, ...keywords, ...tags].filter(Boolean)
  
  const metadata: Metadata = {
    title: {
      default: title,
      template: '%s | Zaza Promptly - AI for Teachers'
    },
    description,
    keywords: allKeywords,
    authors: [{ name: author, url: `${baseUrl}/about-founder` }],
    creator: author,
    publisher: 'Zaza Technologies',
    category: section || 'Education Technology',
    applicationName: 'Zaza Promptly',
    referrer: 'origin-when-cross-origin',
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: url,
      languages: {
        'en-US': url,
        'en-GB': url,
      },
    },
    openGraph: {
      type,
      locale: 'en_US',
      url: fullUrl,
      title,
      description,
      siteName: 'Zaza Promptly',
      images: [
        {
          url: fullImageUrl,
          width: 1200,
          height: 630,
          alt: title,
          type: 'image/png',
        },
        {
          url: `${baseUrl}/og-image-square.png`,
          width: 800,
          height: 800,
          alt: `${title} - Zaza Promptly`,
          type: 'image/png',
        },
      ],
      ...(type === 'article' && {
        publishedTime,
        modifiedTime,
        author: [author],
        section,
        tags,
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title: title.length > 70 ? `${title.substring(0, 67)}...` : title,
      description: description.length > 160 ? `${description.substring(0, 157)}...` : description,
      images: [fullImageUrl],
      creator: '@zazateachapp',
      site: '@zazateachapp',
    },
    robots: {
      index: true,
      follow: true,
      nocache: true,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }

  return metadata
}

// Specific metadata generators for different page types
export function generateHomeMetadata(): Metadata {
  return generateMetadata({
    title: 'AI Teaching Assistant Built by PhD Educator - Save 5+ Hours Weekly',
    description: 'Join 12,000+ teachers using PhD-designed AI for professional parent communications & student reports. GDPR-compliant, hallucination-safe AI that saves 5+ hours weekly. Built by Dr. Greg Blackburn.',
    keywords: [
      'AI for teacher reports', 'parent communication AI', 'student comment generator',
      'teacher feedback assistant', 'automated feedback generation', 'AI vs ChatGPT for teachers',
      'best AI tools for teachers 2025', 'reduce teacher workload with AI', 'safe AI for teachers'
    ],
    url: '/'
  })
}

export function generateBlogMetadata(post: BlogPost): Metadata {
  return generateMetadata({
    title: post.title,
    description: post.excerpt,
    keywords: post.tags || [],
    image: post.image,
    url: `/blog/${post.slug}`,
    type: 'article',
    author: post.author,
    publishedTime: post.date,
    modifiedTime: post.date,
    section: post.category,
    tags: post.tags
  })
}

export function generateProductMetadata(
  productName: string, 
  description: string, 
  slug: string,
  features: string[] = []
): Metadata {
  return generateMetadata({
    title: `${productName} - AI Teaching Tool by PhD Educator`,
    description,
    keywords: [
      `${productName.toLowerCase()} AI tool`,
      'AI for teachers',
      'education technology',
      ...features.map(f => f.toLowerCase())
    ],
    url: `/${slug}`,
    type: 'product' as any,
    section: 'Products'
  })
}

export function generateFAQMetadata(): Metadata {
  return generateMetadata({
    title: 'AI for Teachers FAQ - Safety, Privacy & ChatGPT Comparison',
    description: 'Get answers about using AI for teaching. Learn about GDPR compliance, AI safety, hallucination prevention, and why Promptly is better than ChatGPT for teachers.',
    keywords: [
      'AI for teachers FAQ', 'is using AI for teaching cheating', 'AI vs ChatGPT for teachers',
      'GDPR compliant AI for teachers', 'safe AI for teachers', 'hallucination-safe AI',
      'AI teacher assistant safety', 'teacher AI privacy questions'
    ],
    url: '/faqs'
  })
}

// Blog post interface for type safety
interface BlogPost {
  title: string
  slug: string
  excerpt: string
  content?: string
  date: string
  author?: string
  readingTime?: string
  category?: string
  tags?: string[]
  image?: string
}