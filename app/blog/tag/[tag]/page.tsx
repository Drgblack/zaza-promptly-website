import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getBlogPostsByTag, getAllTags } from '@/lib/blog'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { Calendar, Clock, User, ArrowLeft, Tag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface TagPageProps {
  params: Promise<{
    tag: string
  }>
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  try {
    const { tag } = await params
    const tagName = tag.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
    
    return {
      title: `${tagName} Articles | AI Education Blog | Zaza Promptly`,
      description: `All articles tagged with ${tagName.toLowerCase()}. Expert insights and practical strategies for educators using AI tools.`,
      keywords: [tagName.toLowerCase(), 'education articles', 'teaching resources', 'AI in education'],
      openGraph: {
        title: `${tagName} Articles | Zaza Promptly`,
        description: `Expert content about ${tagName.toLowerCase()} for educators.`,
        images: ['/opengraph-image'],
        type: 'website',
      },
      alternates: {
        canonical: `/blog/tag/${tag}`,
      },
    }
  } catch (error) {
    console.error('Error generating metadata for tag page:', error)
    return {
      title: 'Blog Tag | Zaza Promptly',
      description: 'Explore educational articles and resources for teachers.',
    }
  }
}

// Disable static generation - render pages dynamically to prevent build errors
export const dynamic = 'force-dynamic'

export default async function TagPage({ params }: TagPageProps) {
  try {
    const { tag } = await params
    const tagName = tag.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
    
    const posts = await getBlogPostsByTag(tagName, 'en')
    
    if (posts.length === 0) {
      notFound()
    }

    return (
      <>
        <Header />
        
        <main className="min-h-screen pt-16 lg:pt-20 bg-gray-50">
          {/* Tag Header */}
          <div className="bg-white border-b border-gray-200">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <Link href="/blog" className="inline-flex items-center text-purple-600 hover:text-purple-700 mb-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </Link>
              
              <div className="flex items-center gap-4 mb-4">
                <Badge variant="outline" className="text-purple-700 border-purple-300 text-lg px-4 py-2">
                  <Tag className="w-4 h-4 mr-2" />
                  {tagName}
                </Badge>
                <span className="text-gray-500">
                  {posts.length} article{posts.length !== 1 ? 's' : ''}
                </span>
              </div>
              
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Articles Tagged: {tagName}
              </h1>
              
              <p className="text-xl text-gray-600 max-w-3xl">
                Explore all articles related to {tagName.toLowerCase()} and discover practical insights for modern educators.
              </p>
            </div>
          </div>

          {/* Articles Grid */}
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
                  <article className="bg-white rounded-lg border border-gray-200 overflow-hidden group-hover:shadow-lg transition-all duration-200">
                    {post.featuredImage && (
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={post.featuredImage}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                        />
                      </div>
                    )}
                    
                    <div className="p-6">
                      {/* Category */}
                      <div className="mb-3">
                        <Badge variant="secondary" className="bg-purple-100 text-purple-800 text-xs">
                          {post.category}
                        </Badge>
                      </div>
                      
                      {/* Title */}
                      <h2 className="text-xl font-semibold text-gray-900 group-hover:text-purple-600 transition-colors duration-200 mb-3 line-clamp-2">
                        {post.title}
                      </h2>
                      
                      {/* Excerpt */}
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                      
                      {/* Tags (excluding current tag) */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags
                          .filter(t => t.toLowerCase() !== tagName.toLowerCase())
                          .slice(0, 2)
                          .map((relatedTag) => (
                            <Badge key={relatedTag} variant="outline" className="text-xs">
                              {relatedTag}
                            </Badge>
                          ))}
                      </div>
                      
                      {/* Meta */}
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <User className="w-3 h-3" />
                            <span>{post.author.name}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            <time dateTime={post.date}>
                              {new Date(post.date).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric'
                              })}
                            </time>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{post.readingTime} min</span>
                        </div>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
            
            {/* Related Tags */}
            {posts.length > 0 && (
              <div className="mt-12">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Related Tags</h2>
                <div className="flex flex-wrap gap-2">
                  {[...new Set(posts.flatMap(post => post.tags))]
                    .filter(relatedTag => relatedTag.toLowerCase() !== tagName.toLowerCase())
                    .slice(0, 10)
                    .map((relatedTag) => (
                      <Link
                        key={relatedTag}
                        href={`/blog/tag/${relatedTag.toLowerCase().replace(/\s+/g, '-')}`}
                      >
                        <Badge variant="outline" className="hover:bg-purple-50 hover:border-purple-300 transition-colors">
                          <Tag className="w-3 h-3 mr-1" />
                          {relatedTag}
                        </Badge>
                      </Link>
                    ))}
                </div>
              </div>
            )}
            
            {/* CTA Section */}
            <div className="mt-16 text-center">
              <div className="bg-white rounded-2xl border border-gray-200 p-8 max-w-2xl mx-auto">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Looking for More {tagName} Content?
                </h2>
                <p className="text-gray-600 mb-6">
                  Subscribe to our newsletter for weekly insights and the latest articles on {tagName.toLowerCase()} and other education topics.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild className="bg-purple-600 hover:bg-purple-700">
                    <Link href="/blog">
                      Explore All Articles
                    </Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link href="/promptly-pricing">
                      Try Zaza Promptly
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </>
    )
  } catch (error) {
    notFound()
  }
}