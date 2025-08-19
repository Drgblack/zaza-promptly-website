import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getBlogPost, getBlogPostSlugs, getRelatedPosts, getPopularPosts, getAllCategories, getAllTags, getPublishedBlogPosts } from '@/lib/blog'
import { EnhancedBlogLayout } from '@/components/blog/enhanced-blog-layout'
import { MDXRenderer } from '@/components/blog/mdx-renderer'
import { StructuredData } from '@/components/structured-data'
import { generateArticleSchema, generateAuthorSchema, generateKeywordsFromContent } from '@/lib/structured-data'

interface BlogPostPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  
  try {
    const post = await getBlogPost(slug, 'en')
    
    // Generate enhanced keywords if not provided
    const enhancedKeywords: string[] = post.seo.keywords || generateKeywordsFromContent(
      post.title,
      post.description,
      slug,
      post.tags
    )
    
    return {
      title: post.seo.title,
      description: post.seo.description,
      keywords: enhancedKeywords,
      authors: [{ name: post.author.name }],
      openGraph: {
        title: post.title,
        description: post.description,
        images: post.featuredImage ? [post.featuredImage] : ['/opengraph-image'],
        type: 'article',
        publishedTime: post.date,
        authors: [post.author.name],
        tags: post.tags,
      },
      twitter: {
        card: 'summary_large_image',
        title: post.title,
        description: post.description,
        images: post.featuredImage ? [post.featuredImage] : ['/opengraph-image'],
      },
      alternates: {
        canonical: post.seo.canonicalUrl,
      },
    }
  } catch (error) {
    return {
      title: 'Blog Post Not Found',
      description: 'The requested blog post could not be found.',
    }
  }
}

// Enable static generation with ISR
export const dynamic = 'force-static'
export const revalidate = 3600 // 1 hour

// Generate static params for all blog posts
export async function generateStaticParams() {
  try {
    const slugs = await getBlogPostSlugs()
    return slugs.map((slug) => ({
      slug: slug,
    }))
  } catch (error) {
    console.error('Error generating static params:', error)
    return []
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const siteUrl = 'https://www.zazapromptly.com'
  
  try {
    const post = await getBlogPost(slug, 'en')
    
    // Check if post exists and is published
    if (!post.isPublished || post.isDraft) {
      notFound()
    }
    
    const [relatedPosts, popularPosts, allPosts, categories, tags] = await Promise.all([
      getRelatedPosts(slug, 6, 'en'),
      getPopularPosts(8, 'en'),
      getPublishedBlogPosts('en'),
      getAllCategories('en'),
      getAllTags('en')
    ])

    // Get recent posts (excluding current post)
    const recentPosts = allPosts
      .filter(p => p.slug !== slug)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 8)

    // Generate structured data schemas
    const articleSchema = generateArticleSchema({
      title: post.title,
      description: post.description,
      slug: slug,
      author: post.author,
      datePublished: post.date,
      dateModified: post.date,
      featuredImage: post.featuredImage,
      tags: post.tags,
      category: post.category,
      readingTime: post.readingTime.toString()
    }, siteUrl)

    const authorSchema = generateAuthorSchema(post.author, siteUrl)

    return (
      <div className="pt-16 lg:pt-20">
        <StructuredData data={[articleSchema, authorSchema]} />
        <EnhancedBlogLayout
          post={post}
          relatedPosts={relatedPosts}
          popularPosts={popularPosts}
          recentPosts={recentPosts}
          categories={categories}
          tags={tags}
        >
          <MDXRenderer content={post.content} />
        </EnhancedBlogLayout>
      </div>
    )
  } catch (error) {
    console.error(`Error loading blog post ${slug}:`, error)
    // Only call notFound for missing posts, let other errors surface
    if (error instanceof Error && error.message.includes('not found')) {
      notFound()
    }
    throw error
  }
}