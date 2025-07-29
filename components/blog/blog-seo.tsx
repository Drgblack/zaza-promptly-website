import Head from 'next/head'
import { BlogPost } from '@/lib/blog'
import { SEOCrossLinking } from '@/lib/seo-cross-linking'

interface BlogSEOProps {
  post: BlogPost
  url: string
}

export function BlogSEO({ post, url }: BlogSEOProps) {
  // Generate comprehensive SEO metadata
  const seoData = SEOCrossLinking.generateMetadata({
    title: post.title,
    description: post.description,
    app: 'promptly',
    category: post.category,
    tags: post.tags,
    publishDate: post.date,
    author: post.author.name
  }, url)

  // Generate structured data for articles
  const articleStructuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.description,
    "image": post.featuredImage || `https://zazapromptly.com/api/og-image?title=${encodeURIComponent(post.title)}&category=${encodeURIComponent(post.category)}`,
    "author": {
      "@type": "Person",
      "name": post.author.name,
      "description": post.author.bio
    },
    "publisher": {
      "@type": "Organization",
      "name": "Zaza Promptly",
      "logo": {
        "@type": "ImageObject",
        "url": "https://zazapromptly.com/logo.png"
      }
    },
    "datePublished": post.publishedAt.toISOString(),
    "dateModified": post.publishedAt.toISOString(),
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url
    },
    "keywords": post.tags.join(", "),
    "articleSection": post.category,
    "wordCount": post.content.split(/\s+/).length,
    "timeRequired": `PT${post.readingTime}M`,
    "url": url,
    "isPartOf": {
      "@type": "Blog",
      "name": "Zaza Promptly AI Education Blog",
      "@id": "https://zazapromptly.com/blog"
    },
    "about": {
      "@type": "Thing",
      "name": post.category
    },
    "mentions": post.tags.map(tag => ({
      "@type": "Thing",
      "name": tag
    }))
  }

  // Breadcrumb structured data
  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://zazapromptly.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": "https://zazapromptly.com/blog"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": post.category,
        "item": `https://zazapromptly.com/blog/category/${post.category.toLowerCase().replace(/\s+/g, '-')}`
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": post.title,
        "item": url
      }
    ]
  }

  // FAQ structured data (if post contains common questions)
  const faqStructuredData = post.content.includes('?') ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": extractFAQs(post.content)
  } : null

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{seoData.title}</title>
      <meta name="description" content={seoData.description} />
      <meta name="keywords" content={seoData.keywords.join(', ')} />
      <meta name="author" content={post.author.name} />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={seoData.canonicalUrl} />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:type" content="article" />
      <meta property="og:title" content={seoData.openGraph?.title} />
      <meta property="og:description" content={seoData.openGraph?.description} />
      <meta property="og:image" content={seoData.openGraph?.image} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="Zaza Promptly" />
      <meta property="og:locale" content="en_US" />
      
      {/* Article-specific Open Graph */}
      <meta property="article:published_time" content={post.publishedAt.toISOString()} />
      <meta property="article:modified_time" content={post.publishedAt.toISOString()} />
      <meta property="article:author" content={post.author.name} />
      <meta property="article:section" content={post.category} />
      {post.tags.map((tag, index) => (
        <meta key={index} property="article:tag" content={tag} />
      ))}
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seoData.openGraph?.title} />
      <meta name="twitter:description" content={seoData.openGraph?.description} />
      <meta name="twitter:image" content={seoData.openGraph?.image} />
      <meta name="twitter:site" content="@ZazaPromptly" />
      <meta name="twitter:creator" content="@ZazaPromptly" />
      
      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#9333ea" />
      <meta name="msapplication-TileColor" content="#9333ea" />
      
      {/* Language and Regional */}
      <meta httpEquiv="content-language" content="en-US" />
      <meta name="geo.region" content="US" />
      <meta name="geo.placename" content="United States" />
      
      {/* Article-specific Meta */}
      <meta name="article:reading_time" content={`${post.readingTime} minutes`} />
      <meta name="article:word_count" content={post.content.split(/\s+/).length.toString()} />
      
      {/* Cross-app Alternate Links */}
      {seoData.alternateUrls && Object.entries(seoData.alternateUrls).map(([app, alternateUrl]) => (
        <link key={app} rel="alternate" href={alternateUrl} hrefLang={app} />
      ))}
      
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleStructuredData)
        }}
      />
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbStructuredData)
        }}
      />
      
      {faqStructuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqStructuredData)
          }}
        />
      )}
      
      {/* Preconnect to external domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      
      {/* RSS Feed */}
      <link rel="alternate" type="application/rss+xml" title="Zaza Promptly Blog RSS Feed" href="/blog/rss.xml" />
      
      {/* Sitemap */}
      <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
    </Head>
  )
}

// Helper function to extract FAQs from content
function extractFAQs(content: string) {
  const questions = content.match(/#{2,4}\s+(.+\?)/g) || []
  
  return questions.slice(0, 5).map((question, index) => {
    const cleanQuestion = question.replace(/#{2,4}\s+/, '').trim()
    // This is a simplified approach - in a real implementation, 
    // you'd parse the content more thoroughly to get the actual answers
    const answer = "This question is answered in detail within the blog post above."
    
    return {
      "@type": "Question",
      "name": cleanQuestion,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": answer
      }
    }
  })
}