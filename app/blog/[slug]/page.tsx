import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getBlogPost, getBlogPostSlugs, getRelatedPosts } from '@/lib/blog'
import { BlogPostLayout } from '@/components/blog/blog-post-layout'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { mdxComponents } from '@/components/blog/mdx-components'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

interface BlogPostPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  
  try {
    const post = await getBlogPost(slug, 'en')
    
    return {
      title: post.seo.title,
      description: post.seo.description,
      keywords: post.seo.keywords,
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
  
  try {
    const [post, relatedPosts] = await Promise.all([
      getBlogPost(slug, 'en'),
      getRelatedPosts(slug, 3, 'en')
    ])
    
    if (!post.isPublished) {
      notFound()
    }

    return (
      <>
        <Header />
        
        <main className="min-h-screen pt-16 lg:pt-20">
          <BlogPostLayout
            post={post}
            relatedPosts={relatedPosts}
          >
            <MDXRemote 
              source={post.content} 
              components={mdxComponents}
            />
          </BlogPostLayout>
        </main>

        <Footer />
      </>
    )
  } catch (error) {
    notFound()
  }
}