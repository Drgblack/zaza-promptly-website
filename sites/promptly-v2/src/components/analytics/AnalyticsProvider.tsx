'use client'

import Script from 'next/script'
import { useEffect, useState } from 'react'

// Google Analytics 4
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
// Plausible
// const PLAUSIBLE_DOMAIN = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN || 'promptly.zazatechnologies.com'

interface CookieConsent {
  version: string
  timestamp: number
  essential: boolean
  analytics: boolean
  preferences: boolean
  declined: boolean
}

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void
    dataLayer: unknown[]
    plausible: (...args: unknown[]) => void
  }
}

export default function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const [hasAnalyticsConsent, setHasAnalyticsConsent] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  // Check if Do Not Track is enabled
  const isDoNotTrack = () => {
    if (typeof window === 'undefined') return false
    return navigator.doNotTrack === '1' || 
           (window as unknown as { doNotTrack?: string }).doNotTrack === '1' || 
           (navigator as unknown as { msDoNotTrack?: string }).msDoNotTrack === '1'
  }

  const getStoredConsent = (): CookieConsent | null => {
    if (typeof window === 'undefined') return null
    
    try {
      const stored = localStorage.getItem('promptly-cookie-consent')
      return stored ? JSON.parse(stored) : null
    } catch {
      return null
    }
  }

  useEffect(() => {
    // Check for existing consent
    const consentData = getStoredConsent()
    
    // Respect Do Not Track
    if (isDoNotTrack()) {
      setHasAnalyticsConsent(false)
    } else if (consentData && consentData.analytics) {
      setHasAnalyticsConsent(true)
    }
    
    setIsLoaded(true)

    // Listen for consent events from the cookie banner
    const handleAnalyticsConsented = () => {
      if (!isDoNotTrack()) {
        setHasAnalyticsConsent(true)
        initializeAnalytics()
      }
    }

    const handleAnalyticsDeclined = () => {
      setHasAnalyticsConsent(false)
      cleanupAnalytics()
    }

    window.addEventListener('analyticsConsented', handleAnalyticsConsented)
    window.addEventListener('analyticsDeclined', handleAnalyticsDeclined)

    return () => {
      window.removeEventListener('analyticsConsented', handleAnalyticsConsented)
      window.removeEventListener('analyticsDeclined', handleAnalyticsDeclined)
    }
  }, [])

  const initializeAnalytics = () => {
    // Don't initialize if Do Not Track is enabled
    if (isDoNotTrack()) {
      console.log('Analytics blocked: Do Not Track enabled')
      return
    }

    // Initialize Google Analytics if configured
    if (GA_MEASUREMENT_ID && typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'granted'
      })
      console.log('Google Analytics consent updated: granted')
    }
    
    console.log('Analytics initialized with user consent')
  }

  const cleanupAnalytics = () => {
    // Cleanup Google Analytics
    if (GA_MEASUREMENT_ID && typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'denied'
      })
    }
    
    // Clear analytics cookies
    if (typeof window !== 'undefined') {
      document.cookie = '_ga=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=.' + window.location.hostname
      document.cookie = '_ga_' + GA_MEASUREMENT_ID + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=.' + window.location.hostname
      document.cookie = '_gid=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=.' + window.location.hostname
    }
    
    console.log('Analytics cleaned up per user request')
  }

  // Initialize analytics if consent already exists
  useEffect(() => {
    if (hasAnalyticsConsent && isLoaded && !isDoNotTrack()) {
      initializeAnalytics()
    }
  }, [hasAnalyticsConsent, isLoaded])

  return (
    <>
      {/* Google Analytics 4 - Only load if we have consent and Do Not Track is not enabled */}
      {GA_MEASUREMENT_ID && hasAnalyticsConsent && !isDoNotTrack() && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              
              gtag('consent', 'default', {
                analytics_storage: 'granted'
              });
              
              gtag('config', '${GA_MEASUREMENT_ID}', {
                page_title: document.title,
                page_location: window.location.href,
                anonymize_ip: true
              });
            `}
          </Script>
        </>
      )}

      {/* 
        Note: Plausible is now loaded directly by the CookieBanner component 
        when consent is granted to avoid double loading
      */}

      {children}
    </>
  )
}