import { Metadata } from 'next'
import { founder, extractExcerpt, calculateReadingTime } from '@/config/founder'

interface BlogMetadataProps {
  title: string
  description?: string
  content: string
  publishDate: string
  slug: string
  author?: string
  tags?: string[]
  customImage?: string
}

export function generateBlogMetadata({
  title,
  description,
  content,
  publishDate,
  slug,
  author = founder.name,
  tags = [],
  customImage
}: BlogMetadataProps): Metadata {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.zazapromptly.com'
  const postUrl = `${baseUrl}/blog/${slug}`
  const postDate = new Date(publishDate)
  const excerpt = description || extractExcerpt(content)
  const readingTime = calculateReadingTime(content)
  
  // Use custom image or default to founder photo for social previews
  const socialImage = customImage || founder.photo
  const fullImageUrl = socialImage.startsWith('http') ? socialImage : `${baseUrl}${socialImage}`

  return {
    title: `${title} | Promptly Blog`,
    description: excerpt,
    authors: [{ name: author }],
    alternates: {
      canonical: `/blog/${slug}`,
    },
    keywords: tags.length > 0 ? tags.join(', ') : undefined,
    openGraph: {
      title: title,
      description: excerpt,
      type: 'article',
      publishedTime: postDate.toISOString(),
      authors: [author],
      tags: tags,
      url: postUrl,
      images: [
        {
          url: fullImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      siteName: 'Promptly',
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: excerpt,
      images: [fullImageUrl],
      creator: '@zazapromptly',
    },
    other: {
      'article:published_time': postDate.toISOString(),
      'article:author': author,
      'article:reading_time': `${readingTime}`,
      ...(tags.length > 0 && { 'article:tag': tags.join(', ') }),
    },
  }
}

// Generate structured data for blog posts
export function generateBlogStructuredData({
  title,
  description,
  content,
  publishDate,
  slug,
  author = founder.name,
  customImage
}: BlogMetadataProps) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.zazapromptly.com'
  const postUrl = `${baseUrl}/blog/${slug}`
  const postDate = new Date(publishDate)
  const excerpt = description || extractExcerpt(content)
  const socialImage = customImage || founder.photo
  const fullImageUrl = socialImage.startsWith('http') ? socialImage : `${baseUrl}${socialImage}`

  const articleData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": title,
    "description": excerpt,
    "image": fullImageUrl,
    "author": {
      "@type": "Person",
      "name": author,
      "description": founder.bio,
      "image": `${baseUrl}${founder.photo}`,
      "url": `${baseUrl}${founder.profileUrl}`,
      "sameAs": founder.social.linkedin ? [founder.social.linkedin] : []
    },
    "publisher": {
      "@type": "Organization",
      "name": "Promptly",
      "logo": {
        "@type": "ImageObject",
        "url": `${baseUrl}/images/zaza-logo.png`
      }
    },
    "datePublished": postDate.toISOString(),
    "dateModified": postDate.toISOString(),
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": postUrl
    },
    "url": postUrl,
  }

  const breadcrumbData = {
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
        "name": title,
        "item": postUrl
      }
    ]
  }

  return { articleData, breadcrumbData }
}