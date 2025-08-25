'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { X, Clock, Users, Shield } from 'lucide-react'

export function MobileStickyCTA() {
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const windowHeight = window.innerHeight
      
      // Show CTA after user scrolls 50% of viewport height
      if (scrollPosition > windowHeight * 0.5 && !isDismissed) {
        setIsVisible(true)
      }
    }

    // Check if user previously dismissed
    const dismissed = localStorage.getItem('mobile-cta-dismissed')
    if (dismissed) {
      setIsDismissed(true)
    } else {
      window.addEventListener('scroll', handleScroll)
    }

    return () => window.removeEventListener('scroll', handleScroll)
  }, [isDismissed])

  const handleDismiss = () => {
    setIsDismissed(true)
    setIsVisible(false)
    localStorage.setItem('mobile-cta-dismissed', 'true')
  }

  if (!isVisible || isDismissed) return null

  return (
    <>
      {/* Mobile Sticky CTA - Only show on mobile */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 shadow-2xl lg:hidden">
        <div className="flex items-center justify-between">
          <button
            onClick={handleDismiss}
            className="absolute top-2 right-2 p-1 hover:bg-white/20 rounded-full transition-colors"
            aria-label="Dismiss"
          >
            <X className="w-4 h-4" />
          </button>
          
          <div className="flex-1 pr-8">
            <div className="text-sm font-semibold mb-1">
              Save 5+ Hours Weekly
            </div>
            <div className="text-xs opacity-90 mb-2">
              Join 12,000+ teachers using AI feedback
            </div>
            <div className="flex items-center gap-4 text-xs opacity-80">
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>14-day trial</span>
              </div>
              <div className="flex items-center gap-1">
                <Shield className="w-3 h-3" />
                <span>GDPR safe</span>
              </div>
            </div>
          </div>
          
          <Link
            href="/waitlist"
            className="bg-white text-blue-600 px-4 py-3 rounded-lg font-bold text-sm hover:bg-blue-50 transition-colors shadow-lg min-h-[44px] min-w-[80px] flex items-center justify-center"
          >
            Try Free
          </Link>
        </div>
      </div>

      {/* Desktop Floating CTA - Only show on desktop */}
      <div className="fixed bottom-6 right-6 z-40 hidden lg:block">
        <div className="bg-white rounded-xl shadow-2xl border border-gray-200 p-4 max-w-xs">
          <button
            onClick={handleDismiss}
            className="absolute top-2 right-2 p-1 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Dismiss"
          >
            <X className="w-4 h-4 text-gray-400" />
          </button>
          
          <div className="mb-3">
            <div className="text-sm font-semibold text-gray-900 mb-1">
              Ready to save 5+ hours weekly?
            </div>
            <div className="text-xs text-gray-600 mb-2">
              Join 12,000+ teachers already using Promptly
            </div>
            <div className="flex items-center gap-3 text-xs text-gray-500">
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>14-day free trial</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-3 h-3" />
                <span>No credit card</span>
              </div>
            </div>
          </div>
          
          <Link
            href="/waitlist"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-3 rounded-lg font-semibold text-sm hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center"
          >
            Start Free Trial
          </Link>
        </div>
      </div>
    </>
  )
}