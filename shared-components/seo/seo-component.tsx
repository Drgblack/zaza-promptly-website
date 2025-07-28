import React from 'react'
import { Metadata } from 'next'
import { STRUCTURED_DATA, ZAZA_URLS } from './metadata-config'

/**
 * Zaza SEO Component
 * 
 * This component provides comprehensive SEO optimization including:
 * - Structured data for AI search engines
 * - Enhanced metadata
 * - Social media optimization
 * - Performance optimization
 * - Accessibility features
 */

interface SEOComponentProps {
  // Basic metadata
  title: string
  description: string
  url: string
  keywords?: string[]
  image?: string
  
  // Page type for structured data
  pageType?: 'homepage' | 'product' | 'article' | 'faq' | 'contact' | 'about' | 'pricing'
  
  // Product-specific data
  productName?: string
  productDescription?: string
  productUrl?: keyof typeof ZAZA_URLS
  
  // Article-specific data
  articleAuthor?: string
  articlePublishDate?: string
  articleModifiedDate?: string
  
  // FAQ data
  faqQuestions?: Array<{ question: string; answer: string }>
  
  // Breadcrumb data
  breadcrumbs?: Array<{ name: string; url: string }>
  
  // Additional structured data
  additionalStructuredData?: Record<string, any>
  
  // Social media
  socialTitle?: string
  socialDescription?: string
  socialImage?: string
  
  // Performance
  preloadImages?: string[]
  preloadFonts?: string[]
  
  // Analytics
  googleAnalyticsId?: string
  googleTagManagerId?: string
  
  // Children to render
  children: React.ReactNode
}

export function SEOComponent({
  title,
  description,
  url,
  keywords = [],
  image,
  pageType = 'homepage',
  productName,
  productDescription,
  productUrl,
  articleAuthor,
  articlePublishDate,
  articleModifiedDate,
  faqQuestions = [],
  breadcrumbs = [],
  additionalStructuredData,
  socialTitle,
  socialDescription,
  socialImage,
  preloadImages = [],
  preloadFonts = [],
  googleAnalyticsId,
  googleTagManagerId,
  children,
}: SEOComponentProps) {
  
  // Generate structured data based on page type
  const generateStructuredData = () => {
    const structuredData: Record<string, any>[] = []
    
    // Always include organization and website data
    structuredData.push(STRUCTURED_DATA.organization)
    structuredData.push(STRUCTURED_DATA.website)
    
    // Add page-specific structured data
    switch (pageType) {
      case 'product':
        if (productName && productDescription && productUrl) {
          structuredData.push(
            STRUCTURED_DATA.softwareApplication(
              productUrl,
              productName,
              productDescription
            )
          )
        }
        break
        
      case 'article':
        if (articleAuthor && articlePublishDate) {
          structuredData.push(
            STRUCTURED_DATA.article(
              title,
              description,
              url,
              articleAuthor,
              articlePublishDate
            )
          )
        }
        break
        
      case 'faq':
        if (faqQuestions.length > 0) {
          structuredData.push(STRUCTURED_DATA.faq(faqQuestions))
        }
        break
    }
    
    // Add breadcrumbs if available
    if (breadcrumbs.length > 0) {
      structuredData.push(STRUCTURED_DATA.breadcrumb(breadcrumbs))
    }
    
    // Add additional structured data
    if (additionalStructuredData) {
      structuredData.push(additionalStructuredData)
    }
    
    return structuredData
  }
  
  const structuredData = generateStructuredData()
  
  return (
    <>
      {/* Structured Data */}
      {structuredData.map((data, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(data),
          }}
        />
      ))}
      
      {/* Preload Critical Resources */}
      {preloadImages.map((imageUrl, index) => (
        <link
          key={`preload-image-${index}`}
          rel="preload"
          as="image"
          href={imageUrl}
        />
      ))}
      
      {preloadFonts.map((fontUrl, index) => (
        <link
          key={`preload-font-${index}`}
          rel="preload"
          as="font"
          href={fontUrl}
          crossOrigin="anonymous"
        />
      ))}
      
      {/* Google Analytics */}
      {googleAnalyticsId && (
        <>
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${googleAnalyticsId}', {
                  page_title: '${title}',
                  page_location: '${url}',
                  custom_map: {
                    'custom_parameter_1': 'page_type',
                    'custom_parameter_2': 'product_name'
                  }
                });
                gtag('config', '${googleAnalyticsId}', {
                  'page_type': '${pageType}',
                  'product_name': '${productName || ''}'
                });
              `,
            }}
          />
        </>
      )}
      
      {/* Google Tag Manager */}
      {googleTagManagerId && (
        <>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${googleTagManagerId}');
              `,
            }}
          />
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${googleTagManagerId}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        </>
      )}
      
      {/* Enhanced Meta Tags for AI Search Engines */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      
      {/* AI-Specific Meta Tags */}
      <meta name="ai-search-optimized" content="true" />
      <meta name="ai-content-type" content={pageType} />
      {productName && <meta name="ai-product-name" content={productName} />}
      {keywords.length > 0 && <meta name="ai-keywords" content={keywords.join(', ')} />}
      
      {/* Enhanced Open Graph Tags */}
      <meta property="og:title" content={socialTitle || title} />
      <meta property="og:description" content={socialDescription || description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={pageType === 'article' ? 'article' : 'website'} />
      <meta property="og:site_name" content="Zaza Technologies" />
      <meta property="og:locale" content="en_US" />
      
      {socialImage && (
        <>
          <meta property="og:image" content={socialImage} />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          <meta property="og:image:alt" content={socialTitle || title} />
        </>
      )}
      
      {/* Enhanced Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={socialTitle || title} />
      <meta name="twitter:description" content={socialDescription || description} />
      {socialImage && <meta name="twitter:image" content={socialImage} />}
      <meta name="twitter:site" content="@ZazaTech" />
      <meta name="twitter:creator" content="@ZazaTech" />
      
      {/* Additional AI-Optimized Meta Tags */}
      <meta name="author" content="Zaza Technologies" />
      <meta name="publisher" content="Zaza Technologies" />
      <meta name="category" content="Education Technology" />
      <meta name="classification" content="Business" />
      
      {/* Performance and Security Meta Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes" />
      <meta name="theme-color" content="#6366f1" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="Zaza Technologies" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="application-name" content="Zaza Technologies" />
      
      {/* Security Headers */}
      <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
      <meta httpEquiv="X-Frame-Options" content="DENY" />
      <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
      <meta httpEquiv="Referrer-Policy" content="strict-origin-when-cross-origin" />
      
      {/* Resource Hints */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://www.googletagmanager.com" />
      <link rel="preconnect" href="https://www.google-analytics.com" />
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//fonts.gstatic.com" />
      <link rel="dns-prefetch" href="//www.googletagmanager.com" />
      <link rel="dns-prefetch" href="//www.google-analytics.com" />
      
      {/* Favicon and Icons */}
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <link rel="icon" type="image/png" href="/favicon.png" />
      <link rel="icon" href="/favicon.ico" sizes="32x32" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />
      <link rel="mask-icon" href="/assets/safari-pinned-tab.svg" color="#6366f1" />
      
      {/* Microsoft Tiles */}
      <meta name="msapplication-TileImage" content="/assets/mstile-144x144.png" />
      <meta name="msapplication-TileColor" content="#6366f1" />
      <meta name="msapplication-config" content="/assets/browserconfig.xml" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={url} />
      
      {/* Alternative Language Versions (if available) */}
      <link rel="alternate" hrefLang="en" href={url} />
      <link rel="alternate" hrefLang="x-default" href={url} />
      
      {/* RSS Feed (if available) */}
      <link rel="alternate" type="application/rss+xml" title="Zaza Technologies Blog" href="/rss.xml" />
      
      {/* JSON-LD for AI Search Engines */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: title,
            description: description,
            url: url,
            isPartOf: {
              "@type": "WebSite",
              name: "Zaza Technologies",
              url: ZAZA_URLS.main,
            },
            about: {
              "@type": "Organization",
              name: "Zaza Technologies",
              description: "Human-centred AI tools built by educators, for educators",
            },
            mainEntity: pageType === 'article' ? {
              "@type": "Article",
              headline: title,
              description: description,
              author: {
                "@type": "Organization",
                name: "Zaza Technologies",
              },
              publisher: {
                "@type": "Organization",
                name: "Zaza Technologies",
                logo: {
                  "@type": "ImageObject",
                  url: `${ZAZA_URLS.main}/assets/zaza-logo.png`,
                },
              },
              datePublished: articlePublishDate || new Date().toISOString(),
              dateModified: articleModifiedDate || new Date().toISOString(),
            } : undefined,
            breadcrumb: breadcrumbs.length > 0 ? {
              "@type": "BreadcrumbList",
              itemListElement: breadcrumbs.map((item, index) => ({
                "@type": "ListItem",
                position: index + 1,
                name: item.name,
                item: item.url,
              })),
            } : undefined,
          }),
        }}
      />
      
      {/* Render children */}
      {children}
    </>
  )
}

/**
 * SEO Metadata Generator Hook
 * 
 * This hook generates comprehensive metadata for Next.js pages
 */
export function useSEOMetadata(props: Omit<SEOComponentProps, 'children'>): Metadata {
  const {
    title,
    description,
    url,
    keywords = [],
    image,
    pageType = 'homepage',
    productName,
    productDescription,
    productUrl,
    articleAuthor,
    articlePublishDate,
    socialTitle,
    socialDescription,
    socialImage,
  } = props
  
  return {
    title: {
      default: title,
      template: `%s | Zaza Technologies`,
    },
    description,
    keywords: [
      'AI for teachers',
      'education technology',
      'teacher tools',
      'AI education',
      'Zaza Technologies',
      ...keywords,
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
      type: pageType === 'article' ? 'article' : 'website',
      locale: 'en_US',
      url,
      siteName: 'Zaza Technologies',
      title: socialTitle || title,
      description: socialDescription || description,
      images: socialImage ? [
        {
          url: socialImage,
          width: 1200,
          height: 630,
          alt: socialTitle || title,
        },
      ] : image ? [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ] : [
        {
          url: '/assets/og-cover.jpg',
          width: 1200,
          height: 630,
          alt: 'Zaza Technologies',
        },
      ],
      ...(pageType === 'article' && articleAuthor && {
        authors: [articleAuthor],
      }),
      ...(pageType === 'article' && articlePublishDate && {
        publishedTime: articlePublishDate,
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title: socialTitle || title,
      description: socialDescription || description,
      images: socialImage ? [socialImage] : image ? [image] : ['/assets/og-cover.jpg'],
      creator: '@ZazaTech',
      site: '@ZazaTech',
    },
    alternates: {
      canonical: url,
    },
    category: 'Education Technology',
    classification: 'Business',
    referrer: 'origin-when-cross-origin',
    verification: {
      // Add verification codes when available
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
} 