"use client"

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
  url?: string
}

interface BlogStructuredDataProps {
  post: BlogPost
  baseUrl?: string
}

export function BlogStructuredData({ 
  post, 
  baseUrl = 'https://zazapromptly.com' 
}: BlogStructuredDataProps) {
  const postUrl = `${baseUrl}/blog/${post.slug}`
  const imageUrl = post.image || `${baseUrl}/og-image.png`
  
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": postUrl,
    "headline": post.title,
    "description": post.excerpt,
    "url": postUrl,
    "datePublished": post.date,
    "dateModified": post.date,
    "author": {
      "@type": "Person",
      "name": post.author || "Dr. Greg Blackburn",
      "jobTitle": "PhD in Professional Education",
      "url": `${baseUrl}/about-founder`,
      "sameAs": [
        "https://linkedin.com/in/drgregblackburn"
      ]
    },
    "publisher": {
      "@type": "Organization",
      "name": "Zaza Technologies",
      "url": baseUrl,
      "logo": {
        "@type": "ImageObject",
        "url": `${baseUrl}/og-image.png`,
        "width": 1200,
        "height": 630
      }
    },
    "image": {
      "@type": "ImageObject",
      "url": imageUrl,
      "width": 1200,
      "height": 630,
      "alt": post.title
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": postUrl
    },
    "articleSection": post.category || "Education Technology",
    "keywords": post.tags?.join(", ") || "AI for teachers, education technology, teacher productivity",
    "wordCount": post.content?.split(/\s+/).length || 800,
    "timeRequired": post.readingTime || "5 minutes",
    "audience": {
      "@type": "Audience",
      "audienceType": "Teachers, Educators, School Leaders"
    },
    "about": [
      {
        "@type": "Thing",
        "name": "AI for Teachers"
      },
      {
        "@type": "Thing", 
        "name": "Education Technology"
      },
      {
        "@type": "Thing",
        "name": "Teacher Productivity"
      }
    ],
    "mentions": [
      {
        "@type": "SoftwareApplication",
        "name": "Zaza Promptly",
        "url": `${baseUrl}/promptly`
      }
    ]
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": baseUrl
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": `${baseUrl}/blog`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": post.title,
        "item": postUrl
      }
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  )
}

// Blog listing page structured data
export function BlogListingStructuredData({ 
  posts, 
  baseUrl = 'https://zazapromptly.com' 
}: {
  posts: BlogPost[]
  baseUrl?: string
}) {
  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${baseUrl}/blog`,
    "name": "Zaza Technologies Teacher Blog",
    "description": "AI tools and strategies for teachers. Reduce workload, improve teaching with safe AI designed by PhD educator Dr. Greg Blackburn.",
    "url": `${baseUrl}/blog`,
    "publisher": {
      "@type": "Organization",
      "name": "Zaza Technologies",
      "url": baseUrl
    },
    "author": {
      "@type": "Person",
      "name": "Dr. Greg Blackburn",
      "jobTitle": "PhD in Professional Education"
    },
    "blogPost": posts.slice(0, 10).map(post => ({
      "@type": "BlogPosting",
      "@id": `${baseUrl}/blog/${post.slug}`,
      "headline": post.title,
      "description": post.excerpt,
      "url": `${baseUrl}/blog/${post.slug}`,
      "datePublished": post.date,
      "author": {
        "@type": "Person", 
        "name": post.author || "Dr. Greg Blackburn"
      }
    }))
  }

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${baseUrl}/blog`,
    "name": "Teacher AI Blog - Best Practices & Safe AI Tools",
    "description": "Expert insights on AI for education, teacher productivity tools, and safe AI practices in the classroom.",
    "url": `${baseUrl}/blog`,
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": posts.length,
      "itemListElement": posts.map((post, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "BlogPosting",
          "@id": `${baseUrl}/blog/${post.slug}`,
          "name": post.title,
          "url": `${baseUrl}/blog/${post.slug}`
        }
      }))
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
    </>
  )
}

// Product page structured data
export function ProductStructuredData({ 
  productName,
  description,
  features,
  price,
  url,
  baseUrl = 'https://zazapromptly.com'
}: {
  productName: string
  description: string
  features: string[]
  price?: number
  url: string
  baseUrl?: string
}) {
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": url,
    "name": productName,
    "description": description,
    "url": url,
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "Web Browser",
    "offers": price ? {
      "@type": "Offer",
      "price": price,
      "priceCurrency": "USD",
      "priceValidUntil": "2025-12-31",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "Zaza Technologies",
        "url": baseUrl
      }
    } : {
      "@type": "Offer",
      "availability": "https://schema.org/PreOrder",
      "seller": {
        "@type": "Organization", 
        "name": "Zaza Technologies",
        "url": baseUrl
      }
    },
    "featureList": features,
    "screenshot": `${baseUrl}/app-screenshot.png`,
    "publisher": {
      "@type": "Organization",
      "name": "Zaza Technologies",
      "url": baseUrl
    },
    "creator": {
      "@type": "Person",
      "name": "Dr. Greg Blackburn",
      "jobTitle": "PhD in Professional Education"
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
    />
  )
}