'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const COOKIE_CONSENT_KEY = 'promptly-cookie-consent'
const COOKIE_CONSENT_VERSION = 'v2'

interface CookieConsent {
  version: string
  timestamp: number
  essential: boolean
  analytics: boolean
  preferences: boolean
  declined: boolean
}

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false)
  const [showManage, setShowManage] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [preferences, setPreferences] = useState({
    analytics: false,
    preferences: true
  })

  // Check if Do Not Track is enabled
  const isDoNotTrack = () => {
    if (typeof window === 'undefined') return false
    return navigator.doNotTrack === '1' || 
           (window as unknown as { doNotTrack?: string }).doNotTrack === '1' || 
           (navigator as unknown as { msDoNotTrack?: string }).msDoNotTrack === '1'
  }

  useEffect(() => {
    // Check if user has already made a choice
    const consentData = getStoredConsent()
    
    // Respect Do Not Track - if enabled, don't show banner and default to declined
    if (isDoNotTrack() && !consentData) {
      saveConsent({
        version: COOKIE_CONSENT_VERSION,
        timestamp: Date.now(),
        essential: true,
        analytics: false,
        preferences: false,
        declined: true
      })
      setIsLoaded(true)
      return
    }
    
    if (!consentData || consentData.version !== COOKIE_CONSENT_VERSION) {
      setShowBanner(true)
    } else {
      // Load analytics if previously consented
      if (consentData.analytics) {
        loadAnalytics()
      }
    }
    
    setIsLoaded(true)
  }, [])

  const getStoredConsent = (): CookieConsent | null => {
    if (typeof window === 'undefined') return null
    
    try {
      const stored = localStorage.getItem(COOKIE_CONSENT_KEY)
      return stored ? JSON.parse(stored) : null
    } catch {
      return null
    }
  }

  const saveConsent = (consent: CookieConsent) => {
    if (typeof window === 'undefined') return
    
    try {
      localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(consent))
      
      // Set cookie for server-side access
      const expires = new Date()
      expires.setFullYear(expires.getFullYear() + 1)
      document.cookie = `${COOKIE_CONSENT_KEY}=${encodeURIComponent(JSON.stringify(consent))}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`
    } catch (error) {
      console.error('Failed to save cookie consent:', error)
    }
  }

  const loadAnalytics = () => {
    if (typeof window === 'undefined') return
    
    // Load Plausible analytics
    if (!document.querySelector('script[data-domain]')) {
      const script = document.createElement('script')
      script.defer = true
      script.setAttribute('data-domain', window.location.hostname)
      script.src = 'https://plausible.io/js/script.js'
      document.head.appendChild(script)
      
      console.log('Analytics loaded with user consent')
    }
    
    // Dispatch custom event for other analytics integrations
    window.dispatchEvent(new CustomEvent('analyticsConsented'))
  }

  const removeAnalytics = () => {
    if (typeof window === 'undefined') return
    
    // Remove Plausible script
    const script = document.querySelector('script[data-domain]')
    if (script) {
      script.remove()
    }
    
    // Clear any analytics cookies
    document.cookie = '_ga=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/'
    document.cookie = '_ga_*=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/'
    
    // Dispatch custom event
    window.dispatchEvent(new CustomEvent('analyticsDeclined'))
    
    console.log('Analytics removed per user request')
  }

  const handleAcceptAll = () => {
    const consent: CookieConsent = {
      version: COOKIE_CONSENT_VERSION,
      timestamp: Date.now(),
      essential: true,
      analytics: !isDoNotTrack(),
      preferences: true,
      declined: false
    }
    
    saveConsent(consent)
    setShowBanner(false)
    setShowManage(false)
    
    if (consent.analytics) {
      loadAnalytics()
    }
  }

  const handleDecline = () => {
    const consent: CookieConsent = {
      version: COOKIE_CONSENT_VERSION,
      timestamp: Date.now(),
      essential: true,
      analytics: false,
      preferences: false,
      declined: true
    }
    
    saveConsent(consent)
    setShowBanner(false)
    setShowManage(false)
    
    removeAnalytics()
  }

  const handleSavePreferences = () => {
    const consent: CookieConsent = {
      version: COOKIE_CONSENT_VERSION,
      timestamp: Date.now(),
      essential: true,
      analytics: preferences.analytics && !isDoNotTrack(),
      preferences: preferences.preferences,
      declined: false
    }
    
    saveConsent(consent)
    setShowBanner(false)
    setShowManage(false)
    
    if (consent.analytics) {
      loadAnalytics()
    } else {
      removeAnalytics()
    }
  }

  // Don't render on server or if not loaded yet to prevent hydration issues
  if (!isLoaded || !showBanner) {
    return null
  }

  return (
    <div className="fixed inset-x-0 bottom-4 mx-auto max-w-[800px] px-4 z-40 pointer-events-none">
      <div className="pointer-events-auto">
      <div className="rounded-2xl border border-white/10 bg-slate-900/95 p-6 shadow-2xl backdrop-blur-md">
        {!showManage ? (
          // Main banner
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Cookie Preferences</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                We use cookies to improve your experience and understand how our site is used. 
                Essential cookies are always active. You can manage your preferences or{' '}
                <Link 
                  href="/cookies" 
                  className="text-purple-400 hover:text-purple-300 underline decoration-purple-400/50 hover:decoration-purple-300/50 transition-colors"
                  target="_blank"
                >
                  learn more about our cookie policy
                </Link>.
                {isDoNotTrack() && (
                  <span className="block mt-2 text-xs text-blue-300 bg-blue-900/30 px-2 py-1 rounded">
                    ℹ️ Do Not Track detected - Analytics disabled by default
                  </span>
                )}
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                onClick={handleDecline}
                className="px-4 py-2 text-sm text-slate-300 hover:text-white border border-white/20 hover:border-white/40 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:ring-offset-slate-900"
                type="button"
              >
                Decline
              </button>
              
              <button
                onClick={() => setShowManage(true)}
                className="px-4 py-2 text-sm text-purple-300 hover:text-purple-200 border border-purple-500/30 hover:border-purple-400/50 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-900"
                type="button"
              >
                Manage
              </button>
              
              <button
                onClick={handleAcceptAll}
                className="px-6 py-2 text-sm bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-900"
                type="button"
              >
                Accept All
              </button>
            </div>
          </div>
        ) : (
          // Manage preferences
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Manage Cookie Preferences</h3>
              <button
                onClick={() => setShowManage(false)}
                className="text-slate-400 hover:text-white transition-colors"
                type="button"
                aria-label="Close preferences"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="space-y-4">
              {/* Essential Cookies */}
              <div className="flex items-start justify-between p-3 bg-slate-800/50 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center mb-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    <h4 className="font-medium text-white">Essential Cookies</h4>
                  </div>
                  <p className="text-xs text-slate-400">
                    Required for basic site functionality. Cannot be disabled.
                  </p>
                </div>
                <div className="ml-4">
                  <div className="w-10 h-6 bg-green-600 rounded-full flex items-center justify-end px-1">
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                  </div>
                </div>
              </div>

              {/* Analytics Cookies */}
              <div className="flex items-start justify-between p-3 bg-slate-800/50 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center mb-1">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                    <h4 className="font-medium text-white">Analytics Cookies</h4>
                  </div>
                  <p className="text-xs text-slate-400">
                    Help us understand how you use our site (Plausible Analytics).
                    {isDoNotTrack() && <span className="text-blue-300"> Disabled due to Do Not Track.</span>}
                  </p>
                </div>
                <div className="ml-4">
                  <button
                    onClick={() => setPreferences(prev => ({ 
                      ...prev, 
                      analytics: isDoNotTrack() ? false : !prev.analytics 
                    }))}
                    disabled={isDoNotTrack()}
                    className={`w-10 h-6 rounded-full flex items-center px-1 transition-colors ${
                      preferences.analytics && !isDoNotTrack()
                        ? 'bg-purple-600 justify-end' 
                        : 'bg-slate-600 justify-start'
                    } ${isDoNotTrack() ? 'opacity-50 cursor-not-allowed' : ''}`}
                    type="button"
                  >
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                  </button>
                </div>
              </div>

              {/* Preference Cookies */}
              <div className="flex items-start justify-between p-3 bg-slate-800/50 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center mb-1">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                    <h4 className="font-medium text-white">Preference Cookies</h4>
                  </div>
                  <p className="text-xs text-slate-400">
                    Remember your settings and preferences.
                  </p>
                </div>
                <div className="ml-4">
                  <button
                    onClick={() => setPreferences(prev => ({ 
                      ...prev, 
                      preferences: !prev.preferences 
                    }))}
                    className={`w-10 h-6 rounded-full flex items-center px-1 transition-colors ${
                      preferences.preferences
                        ? 'bg-purple-600 justify-end' 
                        : 'bg-slate-600 justify-start'
                    }`}
                    type="button"
                  >
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                  </button>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={handleSavePreferences}
                className="px-6 py-2 text-sm bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-900"
                type="button"
              >
                Save Preferences
              </button>
            </div>
          </div>
        )}
      </div>
      </div>
    </div>
  )
}
