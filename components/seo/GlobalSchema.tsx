'use client'

import Script from 'next/script'

interface GlobalSchemaProps {
  type?: 'website' | 'article' | 'product'
  url?: string
  title?: string
  description?: string
  image?: string
}

export default function GlobalSchema({ 
  type = 'website',
  url = 'https://zazapromptly.com',
  title = 'Zaza Promptly - AI Teaching Assistant',
  description = 'AI-powered teaching assistant that helps teachers generate professional student comments, parent messages, and reports 10x faster.',
  image = 'https://zazapromptly.com/images/og-image.jpg'
}: GlobalSchemaProps) {
  
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Zaza Technologies",
    "alternateName": "Zaza Promptly",
    "url": "https://zazapromptly.com",
    "logo": {
      "@type": "ImageObject",
      "url": "https://zazapromptly.com/images/logo.png",
      "width": 512,
      "height": 512
    },
    "sameAs": [
      "https://www.linkedin.com/company/zaza-technologies"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+61-xxx-xxx-xxx",
      "contactType": "customer service",
      "availableLanguage": ["English", "French", "German", "Spanish", "Italian"]
    },
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "AU"
    }
  }

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Zaza Promptly",
    "alternateName": "AI Teaching Assistant",
    "url": url,
    "description": description,
    "publisher": {
      "@type": "Organization",
      "name": "Zaza Technologies"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${url}/search?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  }

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Zaza Promptly",
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "14.99",
      "priceCurrency": "USD",
      "priceValidUntil": "2025-12-31",
      "availability": "https://schema.org/InStock",
      "url": `${url}/pricing`
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "247",
      "bestRating": "5"
    },
    "description": description,
    "featureList": [
      "AI-generated student comments",
      "Parent communication templates",
      "Multi-language support",
      "GDPR compliant",
      "Export to PDF & Word"
    ],
    "screenshot": image,
    "softwareVersion": "2.0",
    "releaseNotes": "Enhanced AI models, improved user interface, better performance"
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": url
      }
    ]
  }

  return (
    <>
      <Script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema)
        }}
      />
      
      <Script
        id="website-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema)
        }}
      />
      
      {type === 'product' && (
        <Script
          id="product-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(productSchema)
          }}
        />
      )}
      
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema)
        }}
      />
    </>
  )
}