/**
 * Production-ready SEO Meta component for Zaza Promptly
 * Provides comprehensive metadata, structured data, and social tags
 */

import { Metadata } from 'next'
import { getSEOConfig, generateStructuredData, generateOpenGraphTags, generateTwitterTags, SEOConfig } from '@/lib/seo-config'

interface SEOMetaProps {
  pageKey: string
  customConfig?: Partial<SEOConfig>
}

export function generateMetadata({ pageKey, customConfig }: SEOMetaProps): Metadata {
  const config = getSEOConfig(pageKey, customConfig)
  const structuredData = generateStructuredData(config)
  const ogTags = generateOpenGraphTags(config)
  const twitterTags = generateTwitterTags(config)

  return {
    title: config.title,
    description: config.description,
    keywords: config.keywords,
    robots: config.noindex ? 'noindex, nofollow' : 'index, follow',
    
    // Canonical URL
    alternates: {
      canonical: config.url,
    },
    
    // Open Graph tags
    openGraph: {
      title: ogTags['og:title'],
      description: ogTags['og:description'],
      url: ogTags['og:url'],
      images: [
        {
          url: ogTags['og:image'],
          width: 1200,
          height: 630,
          alt: `${ogTags['og:title']} - Zaza Promptly`,
        },
      ],
      type: ogTags['og:type'] as any,
      siteName: ogTags['og:site_name'],
      locale: ogTags['og:locale'],
    },
    
    // Twitter tags
    twitter: {
      card: twitterTags['twitter:card'] as any,
      title: twitterTags['twitter:title'],
      description: twitterTags['twitter:description'],
      images: [twitterTags['twitter:image']],
      creator: twitterTags['twitter:creator'],
      site: twitterTags['twitter:site'],
    },
    
    // Additional meta tags
    other: {
      // Structured data
      'application/ld+json': JSON.stringify(structuredData),
      
      // Additional SEO tags
      'theme-color': '#6366f1',
      'msapplication-TileColor': '#6366f1',
      'apple-mobile-web-app-capable': 'yes',
      'apple-mobile-web-app-status-bar-style': 'default',
      'format-detection': 'telephone=no',
      
      // Educational specific tags
      'education.subject': 'Teaching Tools',
      'education.audience': 'Teachers',
      'education.type': 'Professional Development',
      
      // Privacy and security
      'referrer': 'strict-origin-when-cross-origin',
      'permissions-policy': 'camera=(), microphone=(), geolocation=()',
    },
  }
}

// Server-side SEO component for App Router
export function SEOMeta({ pageKey, customConfig }: SEOMetaProps) {
  const config = getSEOConfig(pageKey, customConfig)
  const structuredData = generateStructuredData(config)
  
  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData, null, 2)
        }}
      />
      
      {/* Additional head elements that can't be handled by Metadata */}
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//fonts.gstatic.com" />
      <link rel="dns-prefetch" href="//api.stripe.com" />
      <link rel="dns-prefetch" href="//js.stripe.com" />
      
      {/* Preconnect to critical domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      
      {/* Security headers */}
      <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
      <meta httpEquiv="X-Frame-Options" content="DENY" />
      <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
      
      {/* Educational metadata */}
      <meta name="education.subject" content="Teaching Tools" />
      <meta name="education.audience" content="Teachers" />
      <meta name="education.type" content="Professional Development" />
      
      {/* Additional accessibility */}
      <meta name="color-scheme" content="light" />
      <meta name="supported-color-schemes" content="light" />
    </>
  )
}

// Hook for dynamic SEO updates in client components
export function useSEO(pageKey: string, customConfig?: Partial<SEOConfig>) {
  const config = getSEOConfig(pageKey, customConfig)
  
  // Update document title dynamically
  if (typeof window !== 'undefined') {
    document.title = config.title
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', config.description)
    }
    
    // Update canonical URL
    const canonicalLink = document.querySelector('link[rel="canonical"]')
    if (canonicalLink) {
      canonicalLink.setAttribute('href', config.url)
    }
  }
  
  return config
}

// Utility for generating page-specific metadata
export function createPageMetadata(pageKey: string, customConfig?: Partial<SEOConfig>): Metadata {
  return generateMetadata({ pageKey, customConfig })
}

// Blog post specific metadata generator
export function createBlogPostMetadata(
  slug: string,
  title: string,
  description: string,
  publishedTime: string,
  modifiedTime: string,
  author: string = 'Zaza Promptly Team',
  tags: string[] = []
): Metadata {
  return generateMetadata({
    pageKey: 'blog',
    customConfig: {
      title: `${title} | Zaza Promptly Blog`,
      description,
      url: `https://zazapromptly.com/blog/${slug}`,
      type: 'article',
      article: {
        publishedTime,
        modifiedTime,
        author,
        section: 'AI Teaching Tips',
        tags,
      },
    },
  })
}