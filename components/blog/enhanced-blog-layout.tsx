'use client'

import React from 'react'
import Link from 'next/link'
import { BlogPost } from '@/lib/blog'
import { EnhancedBlogSidebar } from './enhanced-blog-sidebar'
import { Calendar, Clock, User, Tag, Share2, Facebook, Twitter, Linkedin, ArrowLeft, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'

interface EnhancedBlogLayoutProps {
  post: BlogPost
  relatedPosts: BlogPost[]
  popularPosts: BlogPost[]
  recentPosts: BlogPost[]
  categories: string[]
  tags: string[]
  children: React.ReactNode
}

export function EnhancedBlogLayout({ 
  post, 
  relatedPosts, 
  popularPosts,
  recentPosts,
  categories,
  tags,
  children 
}: EnhancedBlogLayoutProps) {
  const shareUrl = typeof window !== 'undefined' ? window.location.href : post.seo.canonicalUrl
  const shareTitle = encodeURIComponent(post.title)

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${shareTitle}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`
  }

  const handleCopyLink = async () => {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(shareUrl)
      // You could add a toast notification here
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back to Blog */}
        <div className="mb-8">
          <Link 
            href="/blog" 
            className="inline-flex items-center text-purple-600 hover:text-purple-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <article className="bg-white rounded-2xl shadow-lg overflow-hidden">
              {/* Featured Image */}
              {post.featuredImage && (
                <div className="w-full h-64 sm:h-80 lg:h-96 overflow-hidden">
                  <img
                    src={post.featuredImage}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className="p-8 lg:p-12">
                {/* Article Header */}
                <header className="mb-8">
                  {/* Category Badge */}
                  <div className="mb-4">
                    <Link href={`/blog/category/${post.category.toLowerCase().replace(/\s+/g, '-')}`}>
                      <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">
                        {post.category}
                      </Badge>
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

                  {/* Article Meta */}
                  <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 mb-6 pb-6 border-b border-gray-200">
                    {/* Author */}
                    <div className="flex items-center gap-3">
                      {post.author.avatar && (
                        <img 
                          src={post.author.avatar} 
                          alt={post.author.name}
                          className="w-10 h-10 rounded-full"
                        />
                      )}
                      <div>
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4" />
                          <span className="font-medium text-gray-700">{post.author.name}</span>
                        </div>
                        <div className="text-xs text-gray-500">Author</div>
                      </div>
                    </div>

                    {/* Published Date */}
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <div>
                        <time dateTime={post.date} className="text-gray-700">
                          {new Date(post.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </time>
                        <div className="text-xs text-gray-500">Published</div>
                      </div>
                    </div>

                    {/* Reading Time */}
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <div>
                        <span className="text-gray-700">{post.readingTime} min read</span>
                        <div className="text-xs text-gray-500">Reading time</div>
                      </div>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {post.tags.map((tag) => (
                      <Link key={tag} href={`/blog/tag/${tag.toLowerCase().replace(/\s+/g, '-')}`}>
                        <Badge variant="outline" className="text-xs hover:bg-gray-100 cursor-pointer">
                          <Tag className="w-3 h-3 mr-1" />
                          {tag}
                        </Badge>
                      </Link>
                    ))}
                  </div>
                </header>

                {/* Social Share Buttons - Sticky */}
                <div className="flex items-center justify-center gap-3 mb-8 p-4 bg-gray-50 rounded-lg">
                  <span className="text-sm font-medium text-gray-700">Share this article:</span>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(shareLinks.twitter, '_blank')}
                      className="flex items-center gap-2 hover:bg-blue-50 hover:border-blue-300"
                    >
                      <Twitter className="w-4 h-4 text-blue-500" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(shareLinks.facebook, '_blank')}
                      className="flex items-center gap-2 hover:bg-blue-50 hover:border-blue-600"
                    >
                      <Facebook className="w-4 h-4 text-blue-600" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(shareLinks.linkedin, '_blank')}
                      className="flex items-center gap-2 hover:bg-blue-50 hover:border-blue-700"
                    >
                      <Linkedin className="w-4 h-4 text-blue-700" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleCopyLink}
                      className="flex items-center gap-2 hover:bg-gray-100"
                    >
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Article Content */}
                <div className="prose prose-lg prose-gray max-w-none mb-12">
                  {children}
                </div>

                {/* Appreciation Section */}
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6 mb-8">
                  <div className="flex items-center justify-center mb-4">
                    <Heart className="w-6 h-6 text-red-500 mr-2" />
                    <span className="text-lg font-medium text-gray-800">Found this helpful?</span>
                  </div>
                  <p className="text-center text-gray-600 mb-4">
                    Share it with a fellow teacher who could use these tips!
                  </p>
                  <div className="flex justify-center gap-3">
                    <Button
                      onClick={() => window.open(shareLinks.twitter, '_blank')}
                      className="bg-blue-500 hover:bg-blue-600 text-white"
                    >
                      Share on Twitter
                    </Button>
                    <Button
                      onClick={() => window.open(shareLinks.facebook, '_blank')}
                      variant="outline"
                      className="border-blue-300 text-blue-600 hover:bg-blue-50"
                    >
                      Share on Facebook
                    </Button>
                  </div>
                </div>

                {/* Author Bio */}
                {post.author.bio && (
                  <Card className="mb-8">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        {post.author.avatar && (
                          <img
                            src={post.author.avatar}
                            alt={post.author.name}
                            className="w-16 h-16 rounded-full"
                          />
                        )}
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            About {post.author.name}
                          </h3>
                          <p className="text-gray-600 leading-relaxed">
                            {post.author.bio}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </article>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <section className="mt-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-8">You Might Also Like</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {relatedPosts.slice(0, 4).map((relatedPost) => (
                    <Link
                      key={relatedPost.slug}
                      href={`/blog/${relatedPost.slug}`}
                      className="group block"
                    >
                      <Card className="overflow-hidden group-hover:shadow-lg transition-shadow duration-200">
                        {relatedPost.featuredImage && (
                          <div className="h-48 overflow-hidden">
                            <img
                              src={relatedPost.featuredImage}
                              alt={relatedPost.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                            />
                          </div>
                        )}
                        <CardContent className="p-6">
                          <Badge className="mb-3 bg-purple-100 text-purple-800">
                            {relatedPost.category}
                          </Badge>
                          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-purple-600 transition-colors duration-200 mb-2 line-clamp-2">
                            {relatedPost.title}
                          </h3>
                          <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                            {relatedPost.excerpt}
                          </p>
                          <div className="flex items-center justify-between text-xs text-gray-500">
                            <span>{relatedPost.author.name}</span>
                            <span>{relatedPost.readingTime} min read</span>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <EnhancedBlogSidebar
                popularPosts={popularPosts}
                recentPosts={recentPosts}
                categories={categories}
                tags={tags}
                currentPostSlug={post.slug}
              />
            </div>
          </div>
        </div>
      </div>

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": post.title,
            "description": post.description,
            "image": post.featuredImage || "https://zazapromptly.com/opengraph-image",
            "datePublished": post.date,
            "dateModified": post.date,
            "author": {
              "@type": "Person",
              "name": post.author.name,
              "description": post.author.bio
            },
            "publisher": {
              "@type": "Organization",
              "name": "Zaza Promptly",
              "logo": {
                "@type": "ImageObject",
                "url": "https://zazapromptly.com/icon"
              }
            },
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": post.seo.canonicalUrl
            },
            "keywords": post.tags.join(", "),
            "articleSection": post.category,
            "wordCount": post.content.split(/\s+/).length,
            "isAccessibleForFree": true,
            "genre": "Education",
            "audience": {
              "@type": "Audience",
              "audienceType": "Teachers and Educators"
            }
          })
        }}
      />
    </div>
  )
}