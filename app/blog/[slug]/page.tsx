import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getBlogPost, getBlogPostSlugs, getRelatedPosts } from '@/lib/blog'
import { BlogPostLayout } from '@/components/blog/blog-post-layout'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { mdxComponents } from '@/components/blog/mdx-components'
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

// Disable static generation - render pages dynamically to prevent build errors
export const dynamic = 'force-dynamic'

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const siteUrl = 'https://zazapromptly.com'
  
  try {
    const [post, relatedPosts] = await Promise.all([
      getBlogPost(slug, 'en'),
      getRelatedPosts(slug, 3, 'en')
    ])
    
    if (!post.isPublished) {
      notFound()
    }

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
        <BlogPostLayout
          post={post}
          relatedPosts={relatedPosts}
        >
          <MDXRemote 
            source={post.content} 
            components={mdxComponents}
          />
        </BlogPostLayout>
      </div>
    )
  } catch (error) {
    notFound()
  }
}