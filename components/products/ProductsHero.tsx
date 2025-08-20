'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Play } from 'lucide-react'
import { useAnalytics } from '@/hooks/useAnalytics'

export function ProductsHero() {
  const { trackEvent } = useAnalytics()

  const handleCTAClick = (action: string) => {
    trackEvent('product_hero_cta', {
      action,
      source: 'products_page'
    })
  }

  return (
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 text-center">
      {/* Hero Content */}
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
          All Zaza tools in{' '}
          <span className="bg-gradient-to-r from-amber-300 to-orange-300 bg-clip-text text-transparent">
            one place
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-blue-100 mb-12 leading-relaxed max-w-2xl mx-auto">
          Teacher-first AI that lightens the load—from comments to lesson plans to complex workflows.
        </p>

        {/* Primary CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <Link href="/promptly" onClick={() => handleCTAClick('try_promptly')}>
            <Button 
              size="lg" 
              className="bg-white text-purple-600 hover:bg-gray-100 font-semibold px-8 py-4 text-lg shadow-xl"
            >
              Try Zaza Promptly
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
          
          <Link href="/#snippet-demo" onClick={() => handleCTAClick('see_examples')}>
            <Button 
              variant="outline" 
              size="lg"
              className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm font-medium px-8 py-4 text-lg"
            >
              <Play className="w-5 h-5 mr-2" />
              See examples
            </Button>
          </Link>
        </div>

        {/* Trust indicator */}
        <div className="flex items-center justify-center text-blue-200 text-sm">
          <div className="flex items-center space-x-2">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div 
                  key={i}
                  className="w-8 h-8 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full border-2 border-white/20"
                />
              ))}
            </div>
            <span className="ml-3">Trusted by 12,000+ teachers worldwide</span>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/4 left-10 w-20 h-20 bg-white/5 rounded-full blur-xl" />
      <div className="absolute top-1/3 right-20 w-16 h-16 bg-amber-400/10 rounded-full blur-lg" />
      <div className="absolute bottom-1/4 left-1/4 w-12 h-12 bg-purple-400/10 rounded-full blur-md" />
    </div>
  )
}