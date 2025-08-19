import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getBlogPost } from '@/lib/blog'
import { MDXRenderer } from '@/components/blog/mdx-renderer'

interface BlogPostPageProps {
  params: Promise<{
    slug: string
  }>
}

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  
  try {
    const post = await getBlogPost(slug, 'en')
    return {
      title: post.seo.title,
      description: post.seo.description,
      keywords: post.seo.keywords,
    }
  } catch (error) {
    return {
      title: 'Blog Post Not Found | Zaza Technologies',
      description: 'The requested blog post could not be found.'
    }
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  
  try {
    const post = await getBlogPost(slug, 'en')
    
    return (
      <div className="bg-gray-50 min-h-screen">
        <main className="pt-8">
          <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="bg-green-100 p-4 rounded-lg mb-8">
              <p className="text-green-800 font-semibold">✅ Blog Post System: WORKING!</p>
              <p className="text-green-700">Successfully loaded post: {post.slug}</p>
            </div>
            
            <header className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
              <p className="text-xl text-gray-600 mb-6">{post.description}</p>
              
              <div className="flex items-center text-sm text-gray-500 mb-4">
                <span>{post.author.name}</span>
                <span className="mx-2">•</span>
                <span>{new Date(post.date).toLocaleDateString()}</span>
                <span className="mx-2">•</span>
                <span>{post.readingTime} min read</span>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span key={tag} className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </header>
            
            <MDXRenderer content={post.content} />
          </article>
        </main>
      </div>
    )
  } catch (error) {
    console.error('Error loading blog post:', error)
    notFound()
  }
}