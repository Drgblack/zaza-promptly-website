"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  Calendar, 
  Clock, 
  User, 
  ArrowLeft, 
  Share2, 
  BookOpen,
  TrendingUp,
  ExternalLink
} from 'lucide-react'
import { BlogPost } from '@/lib/blog'
import { SmartFooterCTA } from '@/components/cross-app/smart-footer-cta'
import { mdxComponents } from './mdx-components'
import { SEOCrossLinking } from '@/lib/seo-cross-linking'
import { BrevoForm } from '@/components/brevo-form'

interface BlogLayoutProps {
  post: BlogPost
  relatedPosts?: BlogPost[]
  popularPosts?: BlogPost[]
  children?: React.ReactNode
}

export function BlogLayout({ post, relatedPosts = [], popularPosts = [], children }: BlogLayoutProps) {
  const [crossLinks, setCrossLinks] = useState<any[]>([])
  
  useEffect(() => {
    // Generate cross-links for SEO
    const links = SEOCrossLinking.generateCrossLinks({
      title: post.title,
      category: post.category,
      tags: post.tags,
      app: 'promptly'
    }, 5)
    setCrossLinks(links)
  }, [post])

  const shareUrl = `https://zazapromptly.com/blog/${post.slug}`
  const shareText = `${post.title} - ${post.description}`

  return (
    <div className="min-h-screen bg-white">
      {/* Back to Blog Navigation */}
      <div className="bg-gray-50 py-4 sticky top-16 z-10 border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link 
            href="/blog" 
            className="inline-flex items-center text-purple-600 hover:text-purple-700 transition-colors font-medium"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Link>
          
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              {post.readingTime} min read
            </div>
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              {new Date(post.date).toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric',
                year: 'numeric'
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="flex max-w-7xl mx-auto">
        {/* Main Content */}
        <main className="flex-1 max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Article Header */}
          <header className="py-16">
            {/* Category Badge */}
            <div className="mb-6">
              <Link 
                href={`/blog/category/${post.category.toLowerCase().replace(/\s+/g, '-')}`}
                className="inline-block px-4 py-2 bg-purple-100 text-purple-700 text-sm font-medium rounded-full hover:bg-purple-200 transition-colors"
              >
                {post.category}
              </Link>
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Description */}
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              {post.description}
            </p>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-8 pb-8 border-b">
              <div className="flex items-center">
                <User className="w-5 h-5 mr-2" />
                <span className="font-medium">{post.author.name}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                <span>{new Date(post.date).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                <span>{post.readingTime} min read</span>
              </div>
            </div>

            {/* Tags */}
            <div className="mb-8">
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/blog/tag/${tag.toLowerCase().replace(/\s+/g, '-')}`}
                    className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200 transition-colors"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            </div>

            {/* Share Buttons */}
            <div className="flex items-center gap-4">
              <span className="text-gray-600 font-medium">Share:</span>
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Twitter
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors text-sm"
              >
                <Share2 className="w-4 h-4 mr-2" />
                LinkedIn
              </a>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(shareUrl)
                  // Could add toast notification here
                }}
                className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Copy Link
              </button>
            </div>
          </header>

          {/* Top Email Signup */}
          <div className="mb-12">
            <BrevoForm
              title="Get More AI Teaching Tips"
              description="Join 5,000+ teachers getting weekly AI strategies and time-saving tips"
              buttonText="Get Free Tips"
              placeholder="Your email address"
              source={`blog-${post.slug}-top`}
              tags={['blog_reader', 'top_signup']}
              className="max-w-lg mx-auto"
            />
          </div>

          {/* Article Content */}
          <article className="pb-16">
            <div className="prose prose-lg prose-purple max-w-none mdx-content">
              {children}
            </div>
          </article>

          {/* Bottom Email Signup */}
          <div className="mb-12">
            <BrevoForm
              title="Loved this article? Get more like it!"
              description="Subscribe to our weekly newsletter for the latest AI teaching strategies"
              buttonText="Subscribe Now"
              placeholder="Enter your email"
              source={`blog-${post.slug}-bottom`}
              tags={['blog_reader', 'bottom_signup']}
              className="max-w-lg mx-auto"
            />
          </div>

          {/* Smart Footer CTA */}
          <SmartFooterCTA
            contentType="blog_post"
            contentTitle={post.title}
            contentCategory={post.category as any}
            tags={post.tags}
            readingTime={post.readingTime}
            className="mb-16"
          />
        </main>

        {/* Sidebar */}
        <aside className="hidden lg:block w-80 pl-8">
          <div className="sticky top-32 space-y-8">
            {/* Popular Posts */}
            {popularPosts.length > 0 && (
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-purple-600" />
                  Popular Posts
                </h3>
                <div className="space-y-4">
                  {popularPosts.slice(0, 4).map((popularPost, index) => (
                    <Link
                      key={popularPost.slug}
                      href={`/blog/${popularPost.slug}`}
                      className="block group"
                    >
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                          <span className="text-purple-600 font-bold text-sm">{index + 1}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-gray-900 group-hover:text-purple-600 transition-colors line-clamp-2">
                            {popularPost.title}
                          </h4>
                          <div className="flex items-center text-xs text-gray-500 mt-1">
                            <Clock className="w-3 h-3 mr-1" />
                            {popularPost.readingTime} min
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Explore Zaza Teach CTA */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-xl mx-auto mb-4 flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">
                  Explore Zaza Teach
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Take your teaching to the next level with our complete AI-powered lesson planning platform.
                </p>
                <a
                  href="https://zazateach.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                  onClick={() => {
                    if ((window as any).zazeAnalytics) {
                      (window as any).zazeAnalytics.trackCrossAppCTA('teach', 'sidebar_cta', 'clicked')
                    }
                  }}
                >
                  Try Zaza Teach
                  <ExternalLink className="w-4 h-4 ml-2" />
                </a>
              </div>
            </div>

            {/* Cross-linking */}
            {crossLinks.length > 0 && (
              <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                <h3 className="font-bold text-gray-900 mb-4">Related Resources</h3>
                <div className="space-y-3">
                  {crossLinks.slice(0, 3).map((link, index) => (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-sm text-green-700 hover:text-green-800 transition-colors"
                    >
                      → {link.title}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </aside>
      </div>

      {/* Related Posts Section */}
      {relatedPosts.length > 0 && (
        <section className="py-16 bg-gray-50 border-t">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              Related Articles
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost) => (
                <Link 
                  key={relatedPost.slug} 
                  href={`/blog/${relatedPost.slug}`}
                  className="group"
                >
                  <article className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden">
                    <div className="h-48 bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
                      <div className="text-purple-600 text-4xl font-bold opacity-20">AI</div>
                    </div>
                    
                    <div className="p-6">
                      <div className="flex items-center text-sm text-gray-500 mb-3">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(relatedPost.date).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                        <span className="mx-2">•</span>
                        <Clock className="w-4 h-4 mr-1" />
                        {relatedPost.readingTime} min
                      </div>
                      
                      <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors line-clamp-2">
                        {relatedPost.title}
                      </h3>
                      
                      <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                        {relatedPost.description}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
                          {relatedPost.category}
                        </span>
                        <span className="text-purple-600 group-hover:text-purple-700 font-medium text-sm">
                          Read →
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}