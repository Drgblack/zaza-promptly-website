'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { EmailCaptureForm } from '@/components/EmailCaptureForm'
import { ArrowRight, Users, Clock, CheckCircle, Sparkles, Zap } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { getProductsByCategory } from '@/lib/products'

export function ProductsPageClient() {
  const teachingTools = getProductsByCategory('teaching')
  const otherApps = getProductsByCategory('other')

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
      y: 0
    }
  }

  return (
    <main className="pt-8">
      {/* Products Hero Section */}
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
                  <Zap className="w-4 h-4 mr-2 text-purple-200" />
                  <span className="text-sm font-medium text-white">AI-Powered Tools</span>
                </motion.div>
                
                <motion.h1 
                  className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                  Zaza{' '}
                  <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                    Products
                  </span>
                </motion.h1>
                
                <motion.p 
                  className="text-xl md:text-2xl text-purple-100 max-w-3xl mx-auto mb-10 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                >
                  AI-powered tools that help teachers thrive — from lesson planning to student feedback.
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
                  <h3 className="text-lg font-semibold text-white mb-2 text-center">
                    Join the waitlist to get early access
                  </h3>
                  <EmailCaptureForm
                    title=""
                    subtitle=""
                    placeholder="Your email address"
                    buttonText="Get Early Access"
                    source="products_hero"
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
                  <Users className="w-4 h-4 mr-2" />
                  12,000+ teachers
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  Save 5+ hours weekly
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  GDPR compliant
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Teaching Tools Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Teaching Tools
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Purpose-built AI that understands your classroom challenges and saves you hours every week.
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {teachingTools.map((product, index) => (
              <motion.article
                key={product.id}
                className="group cursor-pointer"
                variants={cardVariants}
                transition={{ duration: 0.5, ease: "easeOut" }}
                whileHover={{ 
                  scale: 1.05, 
                  transition: { duration: 0.2 } 
                }}
              >
                <Link href={product.href} className="block">
                  <div className="bg-gradient-to-br from-slate-800/90 via-indigo-900/80 to-slate-900/90 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-white/10 transition-all duration-300 group-hover:shadow-2xl group-hover:bg-gradient-to-br group-hover:from-slate-700/90 group-hover:via-indigo-800/80 group-hover:to-slate-800/90">
                    {/* Product Icon/Image */}
                    <div className="relative h-48 overflow-hidden bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 flex items-center justify-center">
                      <div className="transform transition-transform duration-500 group-hover:scale-110">
                        <product.icon className="w-20 h-20 text-white/90" />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                      
                      {/* Status badge */}
                      <div className="absolute top-4 right-4">
                        <Badge 
                          className={`text-xs font-medium border ${
                            product.status === 'available' 
                              ? 'bg-green-500/20 text-green-200 border-green-400/30' 
                              : product.status === 'waitlist'
                              ? 'bg-amber-500/20 text-amber-200 border-amber-400/30'
                              : 'bg-blue-500/20 text-blue-200 border-blue-400/30'
                          }`}
                        >
                          {product.status === 'available' ? 'Available now' : 
                           product.status === 'waitlist' ? 'Join waitlist' : 'Coming soon'}
                        </Badge>
                      </div>

                      {/* Featured badge */}
                      {index === 0 && (
                        <div className="absolute top-4 left-4">
                          <Badge className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black text-xs font-semibold border-0">
                            Most Popular
                          </Badge>
                        </div>
                      )}
                    </div>

                    <div className="p-6">
                      {/* Product name */}
                      <h3 className="text-2xl font-bold text-white mb-3 leading-tight group-hover:text-purple-200 transition-colors">
                        {product.name}
                      </h3>
                      
                      {/* Tagline */}
                      <p className="text-purple-200 font-medium mb-3">
                        {product.tagline}
                      </p>
                      
                      {/* Description */}
                      <p className="text-slate-300 mb-4 line-clamp-3 leading-relaxed">
                        {product.description}
                      </p>
                      
                      {/* Key features */}
                      <div className="space-y-2 mb-6">
                        {product.bullets.slice(0, 2).map((bullet, i) => (
                          <div key={i} className="flex items-start space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                            <span className="text-slate-300 text-sm">{bullet}</span>
                          </div>
                        ))}
                      </div>
                      
                      {/* Stats */}
                      {product.stats && (
                        <div className="flex items-center text-purple-300 text-sm mb-4">
                          <Sparkles className="w-4 h-4 mr-1" />
                          {product.stats}
                        </div>
                      )}
                      
                      {/* CTA */}
                      <div className="flex items-center text-purple-400 group-hover:text-purple-300 font-semibold transition-all duration-200 relative">
                        <span className="mr-2">{product.ctaPrimary}</span>
                        <ArrowRight className="w-4 h-4 transform transition-transform group-hover:translate-x-1" />
                        <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-400 transition-all duration-300 group-hover:w-full" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Coming Soon
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              More Zaza tools to streamline school operations, communications, and professional growth.
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {otherApps.map((product) => (
              <motion.article
                key={product.id}
                className="group cursor-pointer"
                variants={cardVariants}
                transition={{ duration: 0.5, ease: "easeOut" }}
                whileHover={{ 
                  scale: 1.05, 
                  transition: { duration: 0.2 } 
                }}
              >
                <Link href={product.href} className="block">
                  <div className="bg-gradient-to-br from-slate-800/90 via-indigo-900/80 to-slate-900/90 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-white/10 transition-all duration-300 group-hover:shadow-2xl group-hover:bg-gradient-to-br group-hover:from-slate-700/90 group-hover:via-indigo-800/80 group-hover:to-slate-800/90">
                    {/* Product Icon/Image */}
                    <div className="relative h-48 overflow-hidden bg-gradient-to-br from-slate-600 via-gray-700 to-slate-800 flex items-center justify-center">
                      <div className="transform transition-transform duration-500 group-hover:scale-110">
                        <product.icon className="w-20 h-20 text-white/70" />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                      
                      {/* Status badge */}
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-gray-500/20 text-gray-200 border-gray-400/30 text-xs font-medium">
                          {product.status === 'waitlist' ? 'Join waitlist' : 'Coming soon'}
                        </Badge>
                      </div>
                    </div>

                    <div className="p-6">
                      {/* Product name */}
                      <h3 className="text-2xl font-bold text-white mb-3 leading-tight group-hover:text-purple-200 transition-colors">
                        {product.name}
                      </h3>
                      
                      {/* Tagline */}
                      <p className="text-gray-300 font-medium mb-3">
                        {product.tagline}
                      </p>
                      
                      {/* Description */}
                      <p className="text-slate-300 mb-6 line-clamp-3 leading-relaxed">
                        {product.description}
                      </p>
                      
                      {/* CTA */}
                      <div className="flex items-center text-gray-400 group-hover:text-gray-300 font-semibold transition-all duration-200 relative">
                        <span className="mr-2">{product.ctaPrimary}</span>
                        <ArrowRight className="w-4 h-4 transform transition-transform group-hover:translate-x-1" />
                        <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-400 transition-all duration-300 group-hover:w-full" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </motion.div>

          {/* Early Access CTA */}
          <motion.div 
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-gradient-to-r from-indigo-600 to-purple-700 rounded-3xl p-10 max-w-4xl mx-auto relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-purple-300/10 rounded-full translate-y-12 -translate-x-12" />
              
              <div className="relative z-10">
                <h3 className="text-3xl font-bold text-white mb-4">
                  Get Early Access to New Tools
                </h3>
                <p className="text-indigo-100 text-lg mb-8 max-w-2xl mx-auto">
                  Join our waitlist to be the first to try new Zaza apps as they launch.
                </p>
                <div className="max-w-md mx-auto">
                  <EmailCaptureForm
                    title=""
                    subtitle=""
                    placeholder="Enter your email"
                    buttonText="Join Waitlist"
                    source="products_bottom"
                    variant="hero"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}