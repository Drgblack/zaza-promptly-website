'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Users, Shield, Zap } from 'lucide-react'
import { useAnalytics } from '@/hooks/useAnalytics'

export function ProductsCTA() {
  const { trackEvent } = useAnalytics()

  const handlePrimaryCTA = () => {
    trackEvent('products_bottom_cta', {
      action: 'try_promptly',
      source: 'products_page_bottom'
    })
  }

  const handleSecondaryCTA = () => {
    trackEvent('products_bottom_cta', {
      action: 'browse_all',
      source: 'products_page_bottom'
    })
  }

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(68,68,68,.2)_50%,transparent_75%,transparent_100%)] bg-[length:60px_60px]" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Ready to{' '}
            <span className="bg-gradient-to-r from-amber-300 to-orange-300 bg-clip-text text-transparent">
              save hours
            </span>{' '}
            every week?
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Join 12,000+ teachers using Zaza AI tools to reduce workload and focus on what matters most—your students.
          </p>
        </div>

        {/* Trust indicators */}
        <div className="flex flex-wrap justify-center items-center gap-8 mb-12">
          <div className="flex items-center text-gray-300">
            <Users className="w-5 h-5 mr-2 text-purple-400" />
            <span className="font-medium">12,000+ teachers</span>
          </div>
          <div className="flex items-center text-gray-300">
            <Shield className="w-5 h-5 mr-2 text-purple-400" />
            <span className="font-medium">GDPR compliant</span>
          </div>
          <div className="flex items-center text-gray-300">
            <Zap className="w-5 h-5 mr-2 text-purple-400" />
            <span className="font-medium">5+ hours saved weekly</span>
          </div>
        </div>

        {/* Primary CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <Link href="/promptly" onClick={handlePrimaryCTA}>
            <Button 
              size="lg"
              className="bg-white text-purple-900 hover:bg-gray-100 font-bold px-8 py-4 text-lg shadow-2xl hover:shadow-purple-500/25 transition-all duration-300"
            >
              Start with Zaza Promptly
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
          
          <Link href="/#comparison" onClick={handleSecondaryCTA}>
            <Button 
              variant="outline"
              size="lg" 
              className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm font-semibold px-8 py-4 text-lg"
            >
              Browse all tools
            </Button>
          </Link>
        </div>

        {/* Social proof */}
        <div className="text-center">
          <p className="text-gray-400 text-sm mb-4">
            Trusted by educators worldwide
          </p>
          
          {/* Avatar placeholders */}
          <div className="flex justify-center -space-x-2 mb-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div 
                key={i}
                className="w-10 h-10 bg-gradient-to-br from-purple-400 via-blue-400 to-teal-400 rounded-full border-2 border-white/20"
              />
            ))}
            <div className="w-10 h-10 bg-gray-800 rounded-full border-2 border-white/20 flex items-center justify-center">
              <span className="text-white text-xs font-bold">12k+</span>
            </div>
          </div>
          
          <p className="text-gray-400 text-sm italic max-w-2xl mx-auto">
            "Finally, AI tools that understand teaching. Zaza saves me hours every week on communication and planning."
          </p>
          <p className="text-gray-500 text-xs mt-2">
            — Sarah K., Elementary Teacher
          </p>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl" />
      <div className="absolute top-32 right-20 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl" />
      <div className="absolute bottom-20 left-1/4 w-20 h-20 bg-amber-500/10 rounded-full blur-xl" />
    </div>
  )
}