'use client'

import React from 'react'
import Link from 'next/link'
import { BlogPost } from '@/lib/blog'
import { Calendar, Clock, User, Tag, Share2, Facebook, Twitter, Linkedin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { AuthorAvatar } from '@/components/shared/AuthorAvatar'

interface BlogPostLayoutProps {
  post: BlogPost
  relatedPosts: BlogPost[]
  children: React.ReactNode
}

export function BlogPostLayout({ post, relatedPosts, children }: BlogPostLayoutProps) {
  const shareUrl = typeof window !== 'undefined' ? window.location.href : post.seo.canonicalUrl
  const shareTitle = encodeURIComponent(post.title)
  const shareDescription = encodeURIComponent(post.description)

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
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Article Header */}
      <header className="mb-8">
        {/* Category Badge */}
        <div className="mb-4">
          <Link href={`/blog/category/${post.category.toLowerCase().replace(/\s+/g, '-')}`}>
            <Badge variant="secondary" className="bg-purple-100 text-purple-800 hover:bg-purple-200">
              {post.category}
            </Badge>
          </Link>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
          {post.title}
        </h1>

        {/* Description */}
        <p className="text-xl text-gray-600 mb-6 leading-relaxed">
          {post.description}
        </p>

        {/* Article Meta */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6">
          {/* Author */}
          <div className="flex items-center gap-2">
            <AuthorAvatar 
              name={post.author.name}
              size={24}
            />
            <User className="w-4 h-4" />
            <span className="font-medium text-gray-700">{post.author.name}</span>
          </div>

          {/* Published Date */}
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
          </div>

          {/* Reading Time */}
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>{post.readingTime} min read</span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {post.tags.map((tag) => (
            <Link key={tag} href={`/blog/tag/${tag.toLowerCase().replace(/\s+/g, '-')}`}>
              <Badge variant="outline" className="text-xs hover:bg-gray-100">
                <Tag className="w-3 h-3 mr-1" />
                {tag}
              </Badge>
            </Link>
          ))}
        </div>

        {/* Featured Image */}
        {post.featuredImage && (
          <div className="mb-8 rounded-lg overflow-hidden">
            <img
              src={post.featuredImage}
              alt={post.title}
              className="w-full h-64 sm:h-80 lg:h-96 object-cover"
            />
          </div>
        )}

        {/* Social Share Buttons */}
        <div className="flex items-center gap-4 pb-8 border-b border-gray-200">
          <span className="text-sm font-medium text-gray-700">Share this article:</span>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open(shareLinks.twitter, '_blank')}
              className="flex items-center gap-2"
            >
              <Twitter className="w-4 h-4" />
              Twitter
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open(shareLinks.facebook, '_blank')}
              className="flex items-center gap-2"
            >
              <Facebook className="w-4 h-4" />
              Facebook
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open(shareLinks.linkedin, '_blank')}
              className="flex items-center gap-2"
            >
              <Linkedin className="w-4 h-4" />
              LinkedIn
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopyLink}
              className="flex items-center gap-2"
            >
              <Share2 className="w-4 h-4" />
              Copy Link
            </Button>
          </div>
        </div>
      </header>

      {/* Article Content */}
      <div className="prose prose-lg prose-gray max-w-none mb-12">
        {children}
      </div>

      {/* Author Bio */}
      {post.author.bio && (
        <div className="bg-gray-50 rounded-lg p-6 mb-12">
          <div className="flex items-start gap-4">
            <AuthorAvatar 
              name={post.author.name}
              size={64}
            />
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                About {post.author.name}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {post.author.bio}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="border-t border-gray-200 pt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Articles</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedPosts.map((relatedPost) => (
              <Link
                key={relatedPost.slug}
                href={`/blog/${relatedPost.slug}`}
                className="group block"
              >
                <article className="bg-white rounded-lg border border-gray-200 overflow-hidden group-hover:shadow-lg transition-shadow duration-200">
                  {relatedPost.featuredImage && (
                    <img
                      src={relatedPost.featuredImage}
                      alt={relatedPost.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                  )}
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-purple-600 transition-colors duration-200 mb-2">
                      {relatedPost.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {relatedPost.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{relatedPost.author.name}</span>
                      <span>{relatedPost.readingTime} min read</span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </section>
      )}

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
              "name": "Zaza Technologies",
              "logo": {
                "@type": "ImageObject",
                "url": "https://zazatechnologies.com/icon"
              }
            },
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": post.seo.canonicalUrl
            },
            "keywords": post.tags.join(", "),
            "articleSection": post.category,
            "wordCount": post.content.split(/\s+/).length
          })
        }}
      />
    </article>
  )
}