'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const COOKIE_CONSENT_KEY = 'zaza.cookieConsent'
const COOKIE_CONSENT_VERSION = 'v1'

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY)
    
    if (!consent || consent !== COOKIE_CONSENT_VERSION) {
      setShowBanner(true)
    }
    
    setIsLoaded(true)
  }, [])

  const handleAccept = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, COOKIE_CONSENT_VERSION)
    setShowBanner(false)
    
    // Trigger analytics initialization if needed
    window.dispatchEvent(new CustomEvent('cookieConsentAccepted'))
  }

  const handleDecline = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, COOKIE_CONSENT_VERSION)
    setShowBanner(false)
    
    // Trigger analytics cleanup if needed
    window.dispatchEvent(new CustomEvent('cookieConsentDeclined'))
  }

  // Don't render on server or if not loaded yet to prevent hydration issues
  if (!isLoaded || !showBanner) {
    return null
  }

  return (
    <div className="fixed inset-x-0 bottom-4 mx-auto max-w-[720px] px-4 z-50">
      <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-4 shadow-card backdrop-blur">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex-1">
            <p className="text-sm text-slate-200 leading-relaxed">
              We use cookies to improve your experience and analyze site usage. 
              Essential cookies are always active.{' '}
              <Link 
                href="/privacy" 
                className="text-brand-400 hover:text-brand-300 underline decoration-brand-400/50 hover:decoration-brand-300/50 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 focus:ring-offset-slate-900 rounded"
                tabIndex={0}
              >
                Learn more
              </Link>
            </p>
          </div>
          
          <div className="flex items-center gap-3 flex-shrink-0">
            <button
              onClick={handleDecline}
              className="px-4 py-2 text-sm text-slate-300 hover:text-white border border-white/20 hover:border-white/40 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:ring-offset-slate-900"
              type="button"
            >
              Decline
            </button>
            
            <button
              onClick={handleAccept}
              className="px-4 py-2 text-sm bg-brand-600 hover:bg-brand-700 text-white font-medium rounded-lg transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 focus:ring-offset-slate-900"
              type="button"
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}