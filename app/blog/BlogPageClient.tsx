'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { EmailCaptureForm } from '@/components/EmailCaptureForm'
import { Calendar, Clock, ArrowRight, BookOpen, Sparkles } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

interface BlogPageClientProps {
  publishedPosts: any[]
  categories: string[]
  tags: string[]
}

export function BlogPageClient({ publishedPosts, categories }: BlogPageClientProps) {
  // Animation variants for Framer Motion
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  }

  return (
    <main className="pt-8">
      {/* Blog Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="bg-gradient-to-br from-purple-600 via-indigo-700 to-blue-800 rounded-3xl p-12 md:p-16 relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Background decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-300/10 rounded-full translate-y-24 -translate-x-24" />
            <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-blue-300/10 rounded-full -translate-x-16 -translate-y-16" />
            
            <div className="relative z-10">
              <div className="text-center mb-8">
                <motion.div
                  className="inline-flex items-center bg-white/10 rounded-full px-4 py-2 mb-6 backdrop-blur-sm"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                >
                  <BookOpen className="w-4 h-4 mr-2 text-purple-200" />
                  <span className="text-sm font-medium text-white">Latest Insights</span>
                </motion.div>
                
                <motion.h1 
                  className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                  Insights for{' '}
                  <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                    Teachers
                  </span>
                </motion.h1>
                
                <motion.p 
                  className="text-xl md:text-2xl text-purple-100 max-w-3xl mx-auto mb-10 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                >
                  Practical tips, research-based strategies, and AI-powered teaching insights.
                </motion.p>
              </div>

              {/* Inline Email Signup */}
              <motion.div
                className="max-w-md mx-auto mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <EmailCaptureForm
                    title=""
                    subtitle=""
                    placeholder="Your email address"
                    buttonText="Get updates"
                    source="blog_hero"
                    variant="hero"
                  />
                </div>
              </motion.div>

              {/* Quick Stats */}
              <motion.div 
                className="flex flex-wrap justify-center gap-8 text-sm text-purple-200"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.4 }}
              >
                <div className="flex items-center">
                  <Sparkles className="w-4 h-4 mr-2" />
                  {publishedPosts.length} Articles
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  {categories.length} Categories
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {publishedPosts.length === 0 ? (
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">No blog posts found</h2>
              <p className="text-gray-600">Check back soon for new content!</p>
            </div>
          ) : (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
            >
              {publishedPosts.map((post) => (
                <motion.article
                  key={post.slug}
                  className="group cursor-pointer"
                  variants={cardVariants}
                  whileHover={{ 
                    scale: 1.05, 
                    transition: { duration: 0.2 } 
                  }}
                >
                  <Link href={`/blog/${post.slug}`} className="block">
                    <div className="bg-gradient-to-br from-slate-800/90 via-indigo-900/80 to-slate-900/90 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-white/10 transition-all duration-300 group-hover:shadow-2xl group-hover:bg-gradient-to-br group-hover:from-slate-700/90 group-hover:via-indigo-800/80 group-hover:to-slate-800/90">
                      {/* Cover Image */}
                      <div className="relative h-48 overflow-hidden">
                        {post.coverImage ? (
                          <Image
                            src={post.coverImage}
                            alt={post.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 flex items-center justify-center">
                            <BookOpen className="w-16 h-16 text-white/80" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                      </div>

                      <div className="p-6">
                        {/* Meta Info at Top */}
                        <div className="flex items-center justify-between text-xs text-purple-300 mb-3">
                          <div className="flex items-center">
                            <Calendar className="w-3 h-3 mr-1" />
                            {new Date(post.date).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                            })}
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {post.readingTime} min read
                          </div>
                        </div>

                        {/* Category Badge */}
                        <Badge 
                          variant="secondary" 
                          className="mb-4 bg-purple-500/20 text-purple-200 border-purple-400/30 hover:bg-purple-500/30"
                        >
                          {post.category}
                        </Badge>
                        
                        {/* Title */}
                        <h2 className="text-2xl font-bold text-white mb-3 leading-tight group-hover:text-purple-200 transition-colors">
                          {post.title}
                        </h2>
                        
                        {/* Excerpt */}
                        <p className="text-slate-300 mb-4 line-clamp-2 leading-relaxed">
                          {post.excerpt}
                        </p>
                        
                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-6">
                          {post.tags.slice(0, 2).map((tag: string) => (
                            <Badge 
                              key={tag} 
                              variant="outline" 
                              className="text-xs bg-white/5 text-slate-400 border-slate-600 hover:bg-white/10"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        
                        {/* Read More Link */}
                        <div className="flex items-center text-purple-400 group-hover:text-purple-300 font-medium transition-all duration-200 relative">
                          <span className="mr-2">Read more</span>
                          <ArrowRight className="w-4 h-4 transform transition-transform group-hover:translate-x-1" />
                          <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-400 transition-all duration-300 group-hover:w-full" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Bottom Newsletter Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="bg-gradient-to-r from-indigo-600 to-purple-700 rounded-3xl p-10 text-center relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-purple-300/10 rounded-full translate-y-12 -translate-x-12" />
            
            <div className="relative z-10">
              <h3 className="text-3xl font-bold text-white mb-4">
                Never Miss an Insight
              </h3>
              <p className="text-indigo-100 text-lg mb-8 max-w-2xl mx-auto">
                Get the latest AI teaching strategies, tools, and tips delivered to your inbox weekly.
              </p>
              <div className="max-w-md mx-auto">
                <EmailCaptureForm
                  title=""
                  subtitle=""
                  placeholder="Enter your email"
                  buttonText="Subscribe"
                  source="blog_bottom"
                  variant="hero"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}