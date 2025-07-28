import { Metadata } from 'next'

/**
 * Zaza SEO Metadata Configuration
 * 
 * This file contains centralized SEO metadata configurations for all Zaza websites,
 * optimized for AI search engines and traditional SEO with structured data.
 */

// Base URLs for different Zaza products
export const ZAZA_URLS = {
  main: 'https://zazatechnologies.com',
  promptly: 'https://zazapromptly.com',
  teach: 'https://zazateach.com',
  inbox: 'https://zazainbox.com',
  visuals: 'https://zazavisuals.com',
  claritydeck: 'https://zazaclaritydeck.com',
  schwoop: 'https://zazaschwoop.com',
  'hr-spark': 'https://zazahrspark.com',
  study: 'https://zazastudy.com',
  coach: 'https://zazacoach.com',
} as const

// AI-optimized keywords for different product categories
export const AI_KEYWORDS = {
  // Core AI terms
  ai: [
    'artificial intelligence',
    'AI tools',
    'machine learning',
    'AI-powered',
    'intelligent automation',
    'smart technology',
    'AI assistant',
    'automated solutions',
  ],
  
  // Education-specific AI terms
  education: [
    'AI for teachers',
    'AI in education',
    'educational technology',
    'EdTech AI',
    'AI teaching tools',
    'AI lesson planning',
    'AI for educators',
    'classroom AI',
    'AI education tools',
    'teaching assistant AI',
  ],
  
  // Productivity terms
  productivity: [
    'teacher productivity',
    'time-saving tools',
    'workflow automation',
    'efficiency tools',
    'productivity software',
    'automation tools',
    'time management',
    'work optimization',
  ],
  
  // Specific product keywords
  promptly: [
    'AI comment generator',
    'student feedback AI',
    'report writing AI',
    'parent communication AI',
    'teacher feedback tools',
    'AI report comments',
    'student evaluation AI',
    'feedback automation',
  ],
  
  teach: [
    'AI lesson planning',
    'curriculum planning AI',
    'lesson plan generator',
    'AI teaching assistant',
    'educational planning',
    'AI curriculum tools',
    'lesson design AI',
    'teaching preparation AI',
  ],
  
  visuals: [
    'AI image generator',
    'educational visuals',
    'classroom graphics',
    'AI art for teachers',
    'visual learning tools',
    'AI illustration',
    'educational imagery',
    'classroom visuals AI',
  ],
  
  inbox: [
    'AI email management',
    'email organization',
    'AI inbox assistant',
    'email automation',
    'smart email tools',
    'AI email sorting',
    'email productivity',
    'inbox optimization',
  ],
  
  claritydeck: [
    'AI presentation maker',
    'slide generator AI',
    'presentation tools',
    'AI slideshow',
    'educational presentations',
    'AI presentation design',
    'slide creation AI',
    'presentation automation',
  ],
  
  schwoop: [
    'student engagement AI',
    'classroom engagement',
    'AI learning activities',
    'student interaction',
    'engagement tools',
    'AI classroom games',
    'student participation',
    'interactive learning AI',
  ],
  
  'hr-spark': [
    'AI HR tools',
    'recruitment AI',
    'HR automation',
    'AI hiring tools',
    'HR management AI',
    'recruitment software',
    'AI personnel management',
    'HR technology',
  ],
  
  study: [
    'AI study planning',
    'learning optimization',
    'study schedule AI',
    'academic planning',
    'AI learning tools',
    'study optimization',
    'learning efficiency',
    'AI academic assistant',
  ],
  
  coach: [
    'AI coaching',
    'mentoring AI',
    'AI guidance',
    'coaching tools',
    'AI mentor',
    'personal development AI',
    'coaching software',
    'AI guidance tools',
  ],
} as const

// Structured data schemas for different page types
export const STRUCTURED_DATA = {
  organization: {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Zaza Technologies",
    description: "Human-centred AI tools built by educators, for educators",
    url: ZAZA_URLS.main,
    logo: `${ZAZA_URLS.main}/assets/zaza-logo.png`,
    foundingDate: "2024",
    founder: {
      "@type": "Person",
      name: "Dr. Greg Blackburn",
      jobTitle: "Founder & CEO",
      description: "PhD-qualified educator and Global Director of Learning with over 20 years' experience",
    },
    industry: "Education Technology",
    sameAs: [
      "https://twitter.com/ZazaTech",
      "https://linkedin.com/company/zaza-technologies",
      "https://youtube.com/@zazatechnologies",
      "https://tiktok.com/@zazatechnologies"
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      url: `${ZAZA_URLS.main}/contact`,
      email: "support@zazatechnologies.com",
    },
    offers: [
      {
        "@type": "Product",
        name: "Zaza Promptly",
        description: "Write 100 report comments in minutes — hallucination-safe, tone-aware, and teacher-trusted",
        url: ZAZA_URLS.promptly,
        category: "AI Writing Assistant",
      },
      {
        "@type": "Product",
        name: "Zaza Teach",
        description: "Plan lessons in seconds with AI that understands curriculum, context, and creativity",
        url: ZAZA_URLS.teach,
        category: "AI Lesson Planning",
      },
      {
        "@type": "Product",
        name: "Zaza Visuals",
        description: "Create curriculum-aligned images instantly with AI",
        url: ZAZA_URLS.visuals,
        category: "AI Image Generation",
      },
      {
        "@type": "Product",
        name: "Zaza Inbox",
        description: "Organize your emails with AI assistance",
        url: ZAZA_URLS.inbox,
        category: "AI Email Management",
      },
      {
        "@type": "Product",
        name: "Zaza ClarityDeck",
        description: "Create stunning presentations with AI",
        url: ZAZA_URLS.claritydeck,
        category: "AI Presentation Tool",
      },
      {
        "@type": "Product",
        name: "Zaza Schwoop",
        description: "Engage students with AI-powered activities",
        url: ZAZA_URLS.schwoop,
        category: "AI Student Engagement",
      },
      {
        "@type": "Product",
        name: "Zaza HR Spark",
        description: "Streamline HR processes with AI",
        url: ZAZA_URLS['hr-spark'],
        category: "AI HR Management",
      },
      {
        "@type": "Product",
        name: "Zaza Study",
        description: "Optimize your study plans with AI",
        url: ZAZA_URLS.study,
        category: "AI Study Planning",
      },
      {
        "@type": "Product",
        name: "Zaza Coach",
        description: "Get AI-powered coaching and mentoring",
        url: ZAZA_URLS.coach,
        category: "AI Coaching",
      },
    ],
  },
  
  website: {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Zaza Technologies",
    description: "Human-Centred AI Tools for Educators",
    url: ZAZA_URLS.main,
    potentialAction: {
      "@type": "SearchAction",
      target: `${ZAZA_URLS.main}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  },
  
  softwareApplication: (product: keyof typeof ZAZA_URLS, productName: string, description: string) => ({
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: productName,
    description,
    url: ZAZA_URLS[product],
    applicationCategory: "EducationalApplication",
    operatingSystem: "Web Browser",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
    author: {
      "@type": "Organization",
      name: "Zaza Technologies",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "1250",
      bestRating: "5",
      worstRating: "1",
    },
  }),
  
  article: (title: string, description: string, url: string, author: string, publishDate: string) => ({
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url,
    author: {
      "@type": "Person",
      name: author,
    },
    publisher: {
      "@type": "Organization",
      name: "Zaza Technologies",
      logo: {
        "@type": "ImageObject",
        url: `${ZAZA_URLS.main}/assets/zaza-logo.png`,
      },
    },
    datePublished: publishDate,
    dateModified: publishDate,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  }),
  
  faq: (questions: Array<{ question: string; answer: string }>) => ({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map(q => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: q.answer,
      },
    })),
  }),
  
  breadcrumb: (items: Array<{ name: string; url: string }>) => ({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }),
} as const

// Base metadata configuration
export const BASE_METADATA: Metadata = {
  metadataBase: new URL(ZAZA_URLS.main),
  title: {
    default: 'Zaza Technologies – Human-Centred AI Tools for Educators',
    template: '%s | Zaza Technologies'
  },
  description: 'Zaza builds trusted AI tools that help teachers save time, reduce burnout, and bring back the joy of teaching.',
  keywords: [
    ...AI_KEYWORDS.ai,
    ...AI_KEYWORDS.education,
    ...AI_KEYWORDS.productivity,
    'Zaza Technologies',
    'AI for teachers',
    'education technology',
    'teacher tools',
    'AI education',
  ],
  authors: [{ name: 'Zaza Technologies' }],
  creator: 'Zaza Technologies',
  publisher: 'Zaza Technologies',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
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
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: ZAZA_URLS.main,
    siteName: 'Zaza Technologies',
    title: 'Zaza Technologies – Human-Centred AI for Classrooms',
    description: 'Save time and stress with trusted AI tools for teaching.',
    images: [
      {
        url: '/assets/og-cover.jpg',
        width: 1200,
        height: 630,
        alt: 'Zaza Technologies - Human-Centred AI for Classrooms',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zaza Technologies – Human-Centred AI for Classrooms',
    description: 'Save time and stress with trusted AI tools for teaching.',
    images: ['/assets/og-cover.jpg'],
    creator: '@ZazaTech',
    site: '@ZazaTech',
  },
  alternates: {
    canonical: ZAZA_URLS.main,
  },
  category: 'Education Technology',
  classification: 'Business',
  referrer: 'origin-when-cross-origin',
  verification: {
    // Add verification codes when available
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
    // yahoo: 'your-yahoo-verification-code',
  },
  icons: {
    icon: [
      { url: '/assets/favicon.ico', sizes: '32x32', type: 'image/x-icon' },
      { url: '/assets/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/assets/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [{ url: '/assets/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
    other: [{ rel: 'mask-icon', url: '/assets/safari-pinned-tab.svg', color: '#6366f1' }],
  },
}

// Product-specific metadata configurations
export const PRODUCT_METADATA = {
  promptly: {
    title: 'Zaza Promptly - AI-Powered Feedback Generation for Teachers',
    description: 'Save hours with Zaza Promptly – the AI-powered tool that helps teachers write student comments and parent messages faster, better, and stress-free.',
    keywords: [
      ...AI_KEYWORDS.promptly,
      ...AI_KEYWORDS.education,
      ...AI_KEYWORDS.productivity,
      'student feedback',
      'parent communication',
      'report writing',
      'teacher comments',
    ],
    url: ZAZA_URLS.promptly,
    ogImage: '/assets/promptly-og.jpg',
  },
  
  teach: {
    title: 'Zaza Teach - AI-Powered Lesson Planning for Educators',
    description: 'Plan lessons in seconds with Zaza Teach – AI that understands curriculum, context, and creativity to help teachers design engaging learning experiences.',
    keywords: [
      ...AI_KEYWORDS.teach,
      ...AI_KEYWORDS.education,
      ...AI_KEYWORDS.productivity,
      'lesson planning',
      'curriculum design',
      'teaching preparation',
      'educational planning',
    ],
    url: ZAZA_URLS.teach,
    ogImage: '/assets/teach-og.jpg',
  },
  
  visuals: {
    title: 'Zaza Visuals - AI Image Generator for Classrooms',
    description: 'Create curriculum-aligned images instantly with Zaza Visuals – AI-powered visual generator designed specifically for educational content.',
    keywords: [
      ...AI_KEYWORDS.visuals,
      ...AI_KEYWORDS.education,
      'educational images',
      'classroom graphics',
      'visual learning',
      'AI art for education',
    ],
    url: ZAZA_URLS.visuals,
    ogImage: '/assets/visuals-og.jpg',
  },
  
  inbox: {
    title: 'Zaza Inbox - AI Email Management for Educators',
    description: 'Organize your emails with AI assistance using Zaza Inbox – smart email management designed for busy educators.',
    keywords: [
      ...AI_KEYWORDS.inbox,
      ...AI_KEYWORDS.productivity,
      'email organization',
      'teacher email',
      'communication tools',
      'email automation',
    ],
    url: ZAZA_URLS.inbox,
    ogImage: '/assets/inbox-og.jpg',
  },
  
  claritydeck: {
    title: 'Zaza ClarityDeck - AI Presentation Maker for Educators',
    description: 'Create stunning presentations with Zaza ClarityDeck – AI-powered slide generator designed for educational content.',
    keywords: [
      ...AI_KEYWORDS.claritydeck,
      ...AI_KEYWORDS.education,
      'presentation tools',
      'educational slides',
      'AI presentations',
      'slide design',
    ],
    url: ZAZA_URLS.claritydeck,
    ogImage: '/assets/claritydeck-og.jpg',
  },
  
  schwoop: {
    title: 'Zaza Schwoop - AI Student Engagement Platform',
    description: 'Engage students with AI-powered activities using Zaza Schwoop – interactive learning platform designed to boost classroom participation.',
    keywords: [
      ...AI_KEYWORDS.schwoop,
      ...AI_KEYWORDS.education,
      'student engagement',
      'interactive learning',
      'classroom activities',
      'student participation',
    ],
    url: ZAZA_URLS.schwoop,
    ogImage: '/assets/schwoop-og.jpg',
  },
  
  'hr-spark': {
    title: 'Zaza HR Spark - AI HR Management for Schools',
    description: 'Streamline HR processes with AI using Zaza HR Spark – comprehensive HR management designed for educational institutions.',
    keywords: [
      ...AI_KEYWORDS['hr-spark'],
      'school HR',
      'educational HR',
      'recruitment tools',
      'HR automation',
      'personnel management',
    ],
    url: ZAZA_URLS['hr-spark'],
    ogImage: '/assets/hr-spark-og.jpg',
  },
  
  study: {
    title: 'Zaza Study - AI Study Planning and Optimization',
    description: 'Optimize your study plans with AI using Zaza Study – intelligent study planning designed to maximize learning efficiency.',
    keywords: [
      ...AI_KEYWORDS.study,
      'study planning',
      'learning optimization',
      'academic planning',
      'study efficiency',
      'learning tools',
    ],
    url: ZAZA_URLS.study,
    ogImage: '/assets/study-og.jpg',
  },
  
  coach: {
    title: 'Zaza Coach - AI Coaching and Mentoring Platform',
    description: 'Get AI-powered coaching and mentoring with Zaza Coach – intelligent guidance platform for personal and professional development.',
    keywords: [
      ...AI_KEYWORDS.coach,
      'coaching tools',
      'mentoring platform',
      'personal development',
      'AI guidance',
      'professional coaching',
    ],
    url: ZAZA_URLS.coach,
    ogImage: '/assets/coach-og.jpg',
  },
} as const

// Helper function to generate product-specific metadata
export function generateProductMetadata(product: keyof typeof PRODUCT_METADATA): Metadata {
  const productMeta = PRODUCT_METADATA[product]
  
  return {
    ...BASE_METADATA,
    metadataBase: new URL(productMeta.url),
    title: {
      default: productMeta.title,
      template: `%s | ${productMeta.title.split(' - ')[0]}`
    },
    description: productMeta.description,
    keywords: productMeta.keywords,
    openGraph: {
      ...BASE_METADATA.openGraph,
      url: productMeta.url,
      title: productMeta.title,
      description: productMeta.description,
      images: [
        {
          url: productMeta.ogImage,
          width: 1200,
          height: 630,
          alt: productMeta.title,
        },
      ],
    },
    twitter: {
      ...BASE_METADATA.twitter,
      title: productMeta.title,
      description: productMeta.description,
      images: [productMeta.ogImage],
    },
    alternates: {
      canonical: productMeta.url,
    },
  }
}

// Helper function to generate page-specific metadata
export function generatePageMetadata(
  title: string,
  description: string,
  url: string,
  keywords: string[] = [],
  image?: string
): Metadata {
  return {
    ...BASE_METADATA,
    title: {
      default: title,
      template: `%s | Zaza Technologies`
    },
    description,
    keywords: [...BASE_METADATA.keywords!, ...keywords],
    openGraph: {
      ...BASE_METADATA.openGraph,
      url,
      title,
      description,
      images: image ? [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ] : BASE_METADATA.openGraph?.images,
    },
    twitter: {
      ...BASE_METADATA.twitter,
      title,
      description,
      images: image ? [image] : BASE_METADATA.twitter?.images,
    },
    alternates: {
      canonical: url,
    },
  }
} 