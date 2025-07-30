'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { BlogPost } from '@/lib/blog'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  TrendingUp, 
  Clock, 
  Calendar, 
  Mail, 
  ChevronRight, 
  Star, 
  BookOpen,
  Users,
  Award
} from 'lucide-react'

interface BlogSidebarProps {
  popularPosts: BlogPost[]
  recentPosts: BlogPost[]
  categories: string[]
  tags: string[]
  currentPostSlug?: string
}

export function EnhancedBlogSidebar({ 
  popularPosts, 
  recentPosts, 
  categories, 
  tags, 
  currentPostSlug 
}: BlogSidebarProps) {
  const [email, setEmail] = useState('')
  const [isSubscribing, setIsSubscribing] = useState(false)
  const [subscriptionStatus, setSubscriptionStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleEmailSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsSubscribing(true)
    
    try {
      const response = await fetch('/api/brevo-subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email,
          source: 'blog_sidebar',
          listIds: [4], // Blog subscriber list
          firstName: '',
          lastName: '',
          interests: ['Blog Updates', 'AI Teaching Tips']
        }),
      })

      if (response.ok) {
        setSubscriptionStatus('success')
        setEmail('')
      } else {
        setSubscriptionStatus('error')
      }
    } catch (error) {
      setSubscriptionStatus('error')
    } finally {
      setIsSubscribing(false)
    }
  }

  const topCategories = categories.slice(0, 6)
  const topTags = tags.slice(0, 15)

  return (
    <aside className="space-y-8">
      {/* Email Newsletter Signup */}
      <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center text-lg text-purple-800">
            <Mail className="w-5 h-5 mr-2" />
            Weekly Teaching Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-purple-700 mb-4">
            Get AI-powered teaching strategies, lesson planning tips, and productivity hacks delivered every Tuesday.
          </p>
          
          {subscriptionStatus === 'success' ? (
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-800 text-sm font-medium">
                🎉 Welcome! Check your email for a special welcome gift.
              </p>
            </div>
          ) : (
            <form onSubmit={handleEmailSubscribe} className="space-y-3">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="border-purple-200 focus:border-purple-400"
                required
              />
              <Button 
                type="submit" 
                disabled={isSubscribing}
                className="w-full bg-purple-600 hover:bg-purple-700"
              >
                {isSubscribing ? 'Subscribing...' : 'Get Free Tips'}
              </Button>
              {subscriptionStatus === 'error' && (
                <p className="text-red-600 text-xs">
                  Something went wrong. Please try again.
                </p>
              )}
            </form>
          )}
          
          <p className="text-xs text-purple-600 mt-3">
            ✨ Free download included • No spam • Unsubscribe anytime
          </p>
        </CardContent>
      </Card>

      {/* Popular Posts */}
      {popularPosts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <TrendingUp className="w-5 h-5 mr-2 text-orange-500" />
              Most Popular
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {popularPosts.slice(0, 5).map((post, index) => (
                <Link 
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className={`block group ${post.slug === currentPostSlug ? 'opacity-50 pointer-events-none' : ''}`}
                >
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                      <span className="text-orange-600 font-bold text-sm">
                        {index + 1}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-900 group-hover:text-purple-600 transition-colors line-clamp-2">
                        {post.title}
                      </h4>
                      <div className="flex items-center text-xs text-gray-500 mt-1">
                        <Clock className="w-3 h-3 mr-1" />
                        {post.readingTime} min read
                        <span className="mx-1">•</span>
                        <Badge variant="outline" className="text-xs py-0">
                          {post.category}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recent Posts */}
      {recentPosts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Calendar className="w-5 h-5 mr-2 text-blue-500" />
              Latest Articles
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentPosts.slice(0, 4).map((post) => (
                <Link 
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className={`block group ${post.slug === currentPostSlug ? 'opacity-50 pointer-events-none' : ''}`}
                >
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-gray-900 group-hover:text-purple-600 transition-colors line-clamp-2">
                      {post.title}
                    </h4>
                    <div className="flex items-center text-xs text-gray-500">
                      <Calendar className="w-3 h-3 mr-1" />
                      {new Date(post.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric'
                      })}
                      <span className="mx-1">•</span>
                      <span>{post.readingTime} min</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Categories */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <BookOpen className="w-5 h-5 mr-2 text-green-500" />
            Categories
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {topCategories.map((category) => (
              <Link
                key={category}
                href={`/blog/category/${category.toLowerCase().replace(/\s+/g, '-')}`}
                className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors group"
              >
                <span className="text-sm text-gray-700 group-hover:text-purple-600">
                  {category}
                </span>
                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-purple-600" />
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Popular Tags */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <Star className="w-5 h-5 mr-2 text-yellow-500" />
            Popular Topics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {topTags.map((tag) => (
              <Link
                key={tag}
                href={`/blog/tag/${tag.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <Badge 
                  variant="outline" 
                  className="text-xs hover:bg-purple-50 hover:border-purple-300 hover:text-purple-700 cursor-pointer transition-colors"
                >
                  {tag}
                </Badge>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Zaza Promptly CTA */}
      <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center text-lg text-blue-800">
            <Award className="w-5 h-5 mr-2" />
            Try Zaza Promptly Free
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-blue-700 mb-4">
            Generate personalized lesson plans, student feedback, and parent communications in minutes with AI.
          </p>
          
          <div className="space-y-3">
            <div className="flex items-center text-sm text-blue-600">
              <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
              Save 5+ hours per week
            </div>
            <div className="flex items-center text-sm text-blue-600">
              <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
              Personalized AI for teachers
            </div>
            <div className="flex items-center text-sm text-blue-600">
              <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
              Free 14-day trial
            </div>
          </div>
          
          <Button asChild className="w-full mt-4 bg-blue-600 hover:bg-blue-700">
            <Link href="/signup">
              Start Free Trial
            </Link>
          </Button>
          
          <p className="text-xs text-blue-600 mt-2 text-center">
            No credit card required
          </p>
        </CardContent>
      </Card>

      {/* Community Stats */}
      <div className="bg-gray-50 rounded-lg p-6">
        <div className="flex items-center justify-center mb-4">
          <Users className="w-6 h-6 text-gray-600 mr-2" />
          <span className="text-lg font-semibold text-gray-800">Join 12,000+ Teachers</span>
        </div>
        
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-purple-600">150+</div>
            <div className="text-xs text-gray-600">Teaching Articles</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-purple-600">50k+</div>
            <div className="text-xs text-gray-600">Hours Saved</div>
          </div>
        </div>
        
        <div className="mt-4 text-center">
          <p className="text-xs text-gray-600">
            Join teachers worldwide who are transforming their practice with AI
          </p>
        </div>
      </div>

      {/* Free Resources */}
      <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center text-lg text-green-800">
            <BookOpen className="w-5 h-5 mr-2" />
            Free Teaching Resources
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <Link 
              href="/free-resources" 
              className="block text-sm text-green-700 hover:text-green-800 hover:underline"
            >
              📚 AI Prompt Templates for Teachers
            </Link>
            <Link 
              href="/free-resources" 
              className="block text-sm text-green-700 hover:text-green-800 hover:underline"
            >
              ⏰ Time Management Guide
            </Link>
            <Link 
              href="/free-resources" 
              className="block text-sm text-green-700 hover:text-green-800 hover:underline"
            >
              📝 Lesson Planning Templates
            </Link>
            <Link 
              href="/free-resources" 
              className="block text-sm text-green-700 hover:text-green-800 hover:underline"
            >
              🎯 Assessment Rubrics
            </Link>
          </div>
          
          <Button asChild variant="outline" className="w-full mt-4 border-green-300 text-green-700 hover:bg-green-100">
            <Link href="/free-resources">
              Browse All Resources
            </Link>
          </Button>
        </CardContent>
      </Card>
    </aside>
  )
}