"use client"

import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, Clock, ArrowRight, Heart, BookOpen, MessageCircle } from 'lucide-react'
import { useAnalytics } from '@/hooks/useAnalytics'
import { InlineEmailCapture } from './inline-email-capture'
import { Button } from '@/components/ui/button'

interface BlogPost {
  slug: string
  title: string
  excerpt: string
  date: string
  readingTime?: string
  category?: string
  tags?: string[]
  author?: string
  image?: string
  painPoint?: string
  featured?: boolean
}

interface EnhancedBlogPreviewsProps {
  posts: BlogPost[]
  title?: string
  subtitle?: string
  showEmailCapture?: boolean
  layout?: 'grid' | 'featured' | 'list'
  className?: string
}

// Pain point icons for different blog categories
const painPointIcons = {
  'Teacher Burnout': Heart,
  'Time Management': Clock,
  'Parent Communication': MessageCircle,
  'Lesson Planning': BookOpen,
  'AI Safety': Heart,
  'Productivity': Clock
}

export function EnhancedBlogPreviews({
  posts,
  title = "Teacher Resources & AI Insights",
  subtitle = "Evidence-based strategies and AI tools to reduce teacher workload",
  showEmailCapture = true,
  layout = 'grid',
  className = ""
}: EnhancedBlogPreviewsProps) {
  const { trackEvent } = useAnalytics()

  const handlePostClick = (slug: string, title: string) => {
    trackEvent('blog_post_click', {
      post_slug: slug,
      post_title: title,
      source: 'blog_preview'
    })
  }

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    } catch {
      return dateString
    }
  }


  if (layout === 'featured' && posts.length > 0) {
    const [featuredPost, ...regularPosts] = posts
    
    return (
      <div className={`space-y-12 ${className}`}>
        {/* Featured Post */}
        <div className="relative">
          <Card className="overflow-hidden border-2 border-purple-200 shadow-xl">
            <div className="md:flex">
              <div className="md:w-1/2">
                {featuredPost.image ? (
                  <Image
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    width={600}
                    height={400}
                    className="w-full h-64 md:h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-64 md:h-full bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center">
                    <div className="text-center">
                      <BookOpen className="w-16 h-16 text-purple-400 mx-auto mb-4" />
                      <p className="text-purple-600 font-medium">Teacher Resource</p>
                    </div>
                  </div>
                )}
              </div>
              <CardContent className="md:w-1/2 p-8">
                <div className="flex items-center gap-2 mb-4">
                  <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                    Featured
                  </Badge>
                  {featuredPost.category && (
                    <Badge variant="outline">{featuredPost.category}</Badge>
                  )}
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-4 leading-tight">
                  {featuredPost.title}
                </h3>
                
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {featuredPost.excerpt}
                </p>

                {featuredPost.painPoint && (
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-6">
                    <div className="flex items-start gap-2">
                      <Heart className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-amber-800">
                        <strong>Teacher Pain Point:</strong> {featuredPost.painPoint}
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(featuredPost.date)}</span>
                    </div>
                    {featuredPost.readingTime && (
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{featuredPost.readingTime}</span>
                      </div>
                    )}
                  </div>
                </div>

                <Link 
                  href={`/blog/${featuredPost.slug}`}
                  onClick={() => handlePostClick(featuredPost.slug, featuredPost.title)}
                >
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white">
                    Read Full Article
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </div>
          </Card>
        </div>

        {/* Regular Posts Grid */}
        {regularPosts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularPosts.map((post) => (
              <BlogPreviewCard 
                key={post.slug} 
                post={post} 
                onPostClick={handlePostClick}
              />
            ))}
          </div>
        )}

        {/* Email Capture */}
        {showEmailCapture && (
          <InlineEmailCapture
            variant="default"
            source="blog_preview"
            title="Get Weekly Teacher AI Tips"
            description="Join 12,000+ teachers getting practical AI strategies and free resources"
            className="max-w-2xl mx-auto"
          />
        )}
      </div>
    )
  }

  return (
    <div className={className}>
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          {title}
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          {subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <BlogPreviewCard 
            key={post.slug} 
            post={post} 
            onPostClick={handlePostClick}
          />
        ))}
      </div>

      {showEmailCapture && (
        <div className="mt-12">
          <InlineEmailCapture
            variant="default"
            source="blog_preview"
            title="Stay Updated with Teacher AI Tips"
            description="Weekly insights on using AI safely and effectively in education"
            className="max-w-xl mx-auto"
          />
        </div>
      )}
    </div>
  )
}

function BlogPreviewCard({ 
  post, 
  onPostClick 
}: { 
  post: BlogPost
  onPostClick: (slug: string, title: string) => void 
}) {
  const PainPointIcon = post.category ? (painPointIcons[post.category as keyof typeof painPointIcons] || BookOpen) : BookOpen

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-200 border hover:border-purple-200">
      <div className="relative">
        {post.image ? (
          <Image
            src={post.image}
            alt={post.title}
            width={400}
            height={250}
            className="w-full h-48 object-cover"
          />
        ) : (
          <div className="w-full h-48 bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center">
            <PainPointIcon className="w-12 h-12 text-purple-400" />
          </div>
        )}
        
        {post.featured && (
          <div className="absolute top-3 right-3">
            <Badge className="bg-amber-500 text-white">Featured</Badge>
          </div>
        )}
      </div>

      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-3">
          {post.category && (
            <Badge variant="outline" className="text-xs">
              {post.category}
            </Badge>
          )}
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Calendar className="w-3 h-3" />
            <span>{formatDate(post.date)}</span>
          </div>
          {post.readingTime && (
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <Clock className="w-3 h-3" />
              <span>{post.readingTime}</span>
            </div>
          )}
        </div>

        <h3 className="text-lg font-semibold text-gray-900 mb-3 leading-tight line-clamp-2">
          {post.title}
        </h3>

        <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-3">
          {post.excerpt}
        </p>

        {post.painPoint && (
          <div className="bg-red-50 border border-red-200 rounded-md p-3 mb-4">
            <div className="flex items-start gap-2">
              <Heart className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-red-800">
                <strong>Addresses:</strong> {post.painPoint}
              </p>
            </div>
          </div>
        )}

        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {post.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        <Link 
          href={`/blog/${post.slug}`}
          onClick={() => onPostClick(post.slug, post.title)}
          className="inline-flex items-center text-purple-600 hover:text-purple-800 font-medium text-sm group"
        >
          Read More
          <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
        </Link>
      </CardContent>
    </Card>
  )
}

// Sidebar widget for blog pages
export function BlogSidebar({ className = "" }: { className?: string }) {
  return (
    <div className={`space-y-8 ${className}`}>
      {/* Email Capture */}
      <InlineEmailCapture
        variant="sidebar"
        source="blog_sidebar"
        title="Get Weekly Teacher Tips"
        description="AI strategies, free resources, and teaching insights"
      />

      {/* Popular Posts */}
      <Card>
        <CardContent className="p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Popular Teacher Resources</h3>
          <div className="space-y-3">
            {[
              "5 AI Report Writing Hacks That Save Hours",
              "Is Using AI for Teaching Cheating?",
              "Best AI Tools for Teachers 2025",
              "Teacher Burnout Prevention Strategies"
            ].map((title, index) => (
              <Link 
                key={index}
                href={`/blog/${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                className="block text-sm text-gray-700 hover:text-purple-600 hover:bg-purple-50 p-2 rounded transition-colors"
              >
                {title}
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Cross-product suggestion */}
      <Card className="bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200">
        <CardContent className="p-6 text-center">
          <h3 className="font-semibold text-purple-900 mb-2">Ready to Try AI?</h3>
          <p className="text-sm text-purple-800 mb-4">
            Generate professional parent emails and student comments in seconds
          </p>
          <Link href="/promptly">
            <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white">
              Try Zaza Promptly Free
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}

function formatDate(dateString: string) {
  try {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  } catch {
    return dateString
  }
}