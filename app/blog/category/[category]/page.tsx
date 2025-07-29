import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getBlogPostsByCategory, getAllCategories } from '@/lib/blog'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { Calendar, Clock, User, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface CategoryPageProps {
  params: Promise<{
    category: string
  }>
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category } = await params
  const categoryName = category.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
  
  return {
    title: `${categoryName} Articles | AI Education Blog | Zaza Promptly`,
    description: `Explore all ${categoryName.toLowerCase()} articles on our AI education blog. Expert insights and practical strategies for educators.`,
    keywords: [categoryName.toLowerCase(), 'education articles', 'teaching resources', 'AI in education'],
    openGraph: {
      title: `${categoryName} Articles | Zaza Promptly`,
      description: `Expert ${categoryName.toLowerCase()} content for educators using AI tools.`,
      images: ['/opengraph-image'],
      type: 'website',
    },
    alternates: {
      canonical: `/blog/category/${category}`,
    },
  }
}

export async function generateStaticParams() {
  const categories = await getAllCategories('en')
  return categories.map((category) => ({
    category: category.toLowerCase().replace(/\s+/g, '-'),
  }))
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params
  const categoryName = category.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
  
  try {
    const posts = await getBlogPostsByCategory(categoryName, 'en')
    
    if (posts.length === 0) {
      notFound()
    }

    return (
      <>
        <Header />
        
        <main className="min-h-screen pt-16 lg:pt-20 bg-gray-50">
          {/* Category Header */}
          <div className="bg-white border-b border-gray-200">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <Link href="/blog" className="inline-flex items-center text-purple-600 hover:text-purple-700 mb-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </Link>
              
              <div className="flex items-center gap-4 mb-4">
                <Badge variant="secondary" className="bg-purple-100 text-purple-800 text-lg px-4 py-2">
                  {categoryName}
                </Badge>
                <span className="text-gray-500">
                  {posts.length} article{posts.length !== 1 ? 's' : ''}
                </span>
              </div>
              
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                {categoryName} Articles
              </h1>
              
              <p className="text-xl text-gray-600 max-w-3xl">
                Discover expert insights, practical strategies, and innovative approaches to {categoryName.toLowerCase()} in education.
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
                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-3">
                        {post.tags.slice(0, 2).map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      
                      {/* Title */}
                      <h2 className="text-xl font-semibold text-gray-900 group-hover:text-purple-600 transition-colors duration-200 mb-3 line-clamp-2">
                        {post.title}
                      </h2>
                      
                      {/* Excerpt */}
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                      
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
            
            {/* CTA Section */}
            <div className="mt-16 text-center">
              <div className="bg-white rounded-2xl border border-gray-200 p-8 max-w-2xl mx-auto">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Want More {categoryName} Resources?
                </h2>
                <p className="text-gray-600 mb-6">
                  Join thousands of educators who get weekly insights and practical strategies delivered to their inbox.
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