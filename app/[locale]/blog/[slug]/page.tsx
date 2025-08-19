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
    locale: string
  }>
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug, locale } = await params
  
  try {
    const post = await getBlogPost(slug, locale || 'en')
    
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

// Disable static generation - render pages dynamically to prevent build errors
export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug, locale } = await params
  const siteUrl = 'https://zazatechnologies.com'
  
  try {
    const [post, relatedPosts, popularPosts, allPosts, categories, tags] = await Promise.all([
      getBlogPost(slug, locale || 'en'),
      getRelatedPosts(slug, 6, locale || 'en'),
      getPopularPosts(8, locale || 'en'),
      getPublishedBlogPosts(locale || 'en'),
      getAllCategories(locale || 'en'),
      getAllTags(locale || 'en')
    ])
    
    if (!post.isPublished) {
      notFound()
    }

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
    notFound()
  }
}