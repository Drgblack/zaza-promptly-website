import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllBlogPosts, getPopularPosts, getAllCategories, getAllTags } from '@/lib/blog'
import { StructuredData } from '@/components/structured-data'
import { generateWebsiteSchema } from '@/lib/structured-data'
import { Calendar, Clock, ArrowRight, Search, TrendingUp } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
// Header and Footer are now rendered globally via layout
// Cache-busting comment - Force rebuild 2025-07-30-22:54 UTC - Blog system is working

// Enable static generation with ISR
export const dynamic = 'force-static'
export const revalidate = 3600 // 1 hour

export const metadata: Metadata = {
  title: 'Best AI Tools for Teachers 2025 - Safe AI for Education Blog | Zaza Technologies',
  description: 'Discover the best AI tools for teachers 2025, reduce teacher workload with AI, and learn about hallucination-safe AI for education. Written by PhD educator for teachers worldwide.',
  keywords: [
    'best AI tools for teachers 2025', 'AI tool for teachers', 'reduce teacher workload with AI',
    'safe AI for teachers', 'teacher productivity apps', 'hallucination-safe AI',
    'AI for teacher reports', 'AI lesson planning assistant', 'teacher burnout solutions',
    'AI vs ChatGPT for teachers', 'GDPR compliant AI for teachers'
  ],
  openGraph: {
    title: 'Best AI Tools for Teachers 2025 - Safe AI Education Blog',
    description: 'Discover safe AI tools reducing teacher workload. Expert insights on AI for teacher reports, lesson planning, and parent communication by PhD educator.',
    images: ['/opengraph-image'],
    type: 'website',
    siteName: 'Zaza Technologies'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best AI Tools for Teachers 2025 - Safe AI Blog',
    description: 'Expert insights on safe AI tools for teachers. Reduce workload, improve teaching with hallucination-safe AI.',
    images: ['/opengraph-image'],
    creator: '@zazateachapp'
  },
  alternates: {
    canonical: '/blog',
  },
}

export default async function BlogPage() {
  const siteUrl = 'https://www.zazapromptly.com'
  
  let allPosts: any[] = [];
  let popularPosts: any[] = [];
  let categories: string[] = [];
  let tags: string[] = [];
  
  try {
    [allPosts, popularPosts, categories, tags] = await Promise.all([
      getAllBlogPosts(),
      getPopularPosts(6),
      getAllCategories(),
      getAllTags()
    ]);
  } catch (error) {
    console.error('Error loading blog data:', error);
    // Continue with empty arrays for graceful degradation
  }

  // Generate structured data for blog section
  const blogSchema = generateWebsiteSchema({
    name: 'Zaza Technologies Blog - AI Education Tips & Strategies',
    url: `${siteUrl}/blog`,
    description: 'Discover the latest insights, tips, and strategies for using AI in education. Written by teachers, for teachers.'
  })

  // Filter to only published posts
  const publishedPosts = allPosts.filter(post => post.isPublished && !post.isDraft)

  return (
    <div className="bg-gray-50">
      <StructuredData data={blogSchema} />
      
      <main className="pt-8">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-purple-50 to-pink-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-800 mb-6">
                AI Education Blog
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                Discover the latest insights, tips, and strategies for using AI in education. Written by teachers, for teachers.
              </p>
              
              {/* Quick Stats */}
              <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-600">
                <div className="flex items-center">
                  <TrendingUp className="w-4 h-4 mr-2 text-purple-600" />
                  {publishedPosts.length} Articles
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2 text-purple-600" />
                  {categories.length} Categories
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {publishedPosts.length === 0 ? (
              <div className="text-center py-12">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">No blog posts found</h2>
                <p className="text-gray-600">Check back soon for new content!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {publishedPosts.map((post) => (
                  <article
                    key={post.slug}
                    className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group"
                  >
                    <div className="p-6">
                      {/* Category Badge */}
                      <Badge variant="secondary" className="mb-3">
                        {post.category}
                      </Badge>
                      
                      {/* Title */}
                      <h2 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-purple-600 transition-colors">
                        <Link href={`/blog/${post.slug}`} className="hover:underline">
                          {post.title}
                        </Link>
                      </h2>
                      
                      {/* Excerpt */}
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                      
                      {/* Meta Info */}
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {new Date(post.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {post.readingTime} min read
                        </div>
                      </div>
                      
                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      
                      {/* Read More Link */}
                      <Link
                        href={`/blog/${post.slug}`}
                        className="inline-flex items-center text-purple-600 hover:text-purple-700 font-medium transition-colors"
                      >
                        Read More
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  )
}