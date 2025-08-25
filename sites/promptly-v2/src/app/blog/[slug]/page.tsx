import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { marked } from 'marked'
import { getPostMeta, getPostSlugs, getAuthorMeta, calculateReadingTime } from '@/lib/blog'
import AuthorByline from '@/components/blog/AuthorByline'
import RelatedPosts from '@/components/blog/RelatedPosts'

type Props = {
  params: { slug: string }
}

export async function generateStaticParams() {
  const slugs = getPostSlugs()
  return slugs.map((slug) => ({
    slug,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const postMeta = await getPostMeta(params.slug)
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.zazapromptly.com'
  
  if (!postMeta) {
    return {
      title: 'Post Not Found | Promptly Blog',
      alternates: {
        canonical: '/404',
      },
    }
  }

  const postUrl = `${baseUrl}/blog/${params.slug}`
  const postDate = new Date(postMeta.date)

  return {
    title: `${postMeta.title} | Promptly Blog`,
    description: postMeta.description,
    authors: [{ name: postMeta.author || 'Zaza Promptly Team' }],
    alternates: {
      canonical: `/blog/${params.slug}`,
    },
    openGraph: {
      title: postMeta.title,
      description: postMeta.description,
      type: 'article',
      publishedTime: postDate.toISOString(),
      authors: [postMeta.author || 'Zaza Promptly Team'],
      tags: postMeta.tags || [],
      url: postUrl,
      images: [
        {
          url: '/og-default.png', // TODO: Add post-specific images if available in frontmatter
          width: 1200,
          height: 630,
          alt: postMeta.title,
        },
      ],
      siteName: 'Promptly',
    },
    twitter: {
      card: 'summary_large_image',
      title: postMeta.title,
      description: postMeta.description,
      images: ['/og-default.png'],
    },
    other: {
      'article:published_time': postDate.toISOString(),
      'article:author': postMeta.author || 'Zaza Promptly Team',
      ...(postMeta.tags && { 'article:tag': postMeta.tags.join(', ') }),
      ...(postMeta.category && { 'article:section': postMeta.category }),
    },
  }
}

export default async function BlogPost({ params }: Props) {
  const postMeta = await getPostMeta(params.slug)
  
  if (!postMeta) {
    notFound()
  }

  // Skip dynamic MDX import to avoid React context issues during static generation
  // Content will be rendered as HTML from the processed content

  // Calculate reading time
  const readingTime = calculateReadingTime(postMeta.content || '')
  const authorMeta = getAuthorMeta(postMeta.author || '')
  
  // Process markdown content to HTML
  const htmlContent = postMeta.content ? marked(postMeta.content.replace(/^# .+$/m, '')) : '<p>Content not available</p>'

  // Generate structured data for the article
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.zazapromptly.com'
  const postUrl = `${baseUrl}/blog/${params.slug}`
  const postDate = new Date(postMeta.date)
  
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": postMeta.title,
    "description": postMeta.description,
    "image": `${baseUrl}/og-default.png`,
    "author": {
      "@type": "Person",
      "name": postMeta.author || 'Promptly Team',
      ...(authorMeta?.bio && { "description": authorMeta.bio }),
      ...(authorMeta?.image && { "image": authorMeta.image })
    },
    "publisher": {
      "@type": "Organization",
      "name": "Promptly",
      "logo": {
        "@type": "ImageObject",
        "url": `${baseUrl}/og-default.png`
      }
    },
    "datePublished": postDate.toISOString(),
    ...(postMeta.lastmod && { "dateModified": new Date(postMeta.lastmod).toISOString() }),
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": postUrl
    },
    "url": postUrl,
    ...(postMeta.tags && { "keywords": postMeta.tags.join(', ') }),
    ...(postMeta.category && { "articleSection": postMeta.category })
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
        "name": postMeta.title,
        "item": postUrl
      }
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />
      
      <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <section className="bg-gradient-to-br from-slate-800 to-slate-900 py-20">
        <div className="container">
          {/* Breadcrumb */}
          <nav className="mb-8 max-w-4xl mx-auto" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 text-sm text-slate-400">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </li>
              <li>
                <span className="text-white font-medium">
                  {postMeta.title}
                </span>
              </li>
            </ol>
          </nav>

          <div className="max-w-4xl mx-auto text-center">
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              {postMeta.tags?.map((tag: string) => (
                <Link
                  key={tag}
                  href={`/blog/tag/${encodeURIComponent(tag.toLowerCase())}`}
                  className="px-3 py-1 bg-brand-600/20 text-brand-400 hover:bg-brand-600/30 hover:text-brand-300 text-sm rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 focus:ring-offset-slate-900"
                >
                  {tag}
                </Link>
              ))}
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-white mb-6">
              {postMeta.title}
            </h1>
            
            <p className="text-xl text-slate-300 mb-8">
              {postMeta.description}
            </p>
            
            {/* Author Byline */}
            <div className="flex justify-center">
              <AuthorByline 
                authorName={postMeta.author || 'Promptly Team'}
                publishDate={postMeta.date}
                readTime={`${readingTime} min read`}
                showBio={false}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="section">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <article className="prose prose-invert prose-lg max-w-none">
              <div 
                dangerouslySetInnerHTML={{ 
                  __html: htmlContent
                }}
              />
            </article>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      <section className="border-t border-white/10 py-16">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <RelatedPosts currentSlug={params.slug} />
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="border-t border-white/10 py-12">
        <div className="container">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <Link 
              href="/blog"
              className="inline-flex items-center text-brand-400 hover:text-brand-300 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 focus:ring-offset-slate-900 rounded"
            >
              <svg className="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Blog
            </Link>
            
            <Link 
              href="/waitlist"
              className="px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white font-semibold rounded-lg transition-colors shadow-card focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 focus:ring-offset-slate-900"
            >
              Try Promptly
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-slate-800/50 py-16">
        <div className="container text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Transform Your Teaching?
          </h2>
          <p className="text-xl text-slate-300 mb-8">
            Join thousands of educators who are saving time while improving student outcomes.
          </p>
          <Link 
            href="/waitlist"
            className="inline-flex items-center px-8 py-4 bg-brand-600 hover:bg-brand-700 text-white font-semibold rounded-lg transition-colors shadow-card focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 focus:ring-offset-slate-900"
          >
            Get Started Today
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>
      </div>
    </>
  )
}