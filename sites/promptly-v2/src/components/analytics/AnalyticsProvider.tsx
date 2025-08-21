'use client'

import Script from 'next/script'
import { useEffect, useState } from 'react'

// Google Analytics 4
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
// Plausible
const PLAUSIBLE_DOMAIN = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN

declare global {
  interface Window {
    gtag: (...args: any[]) => void
    dataLayer: any[]
    plausible: (...args: any[]) => void
  }
}

export default function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const [hasConsent, setHasConsent] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Check for existing consent
    const consent = localStorage.getItem('zaza.cookieConsent')
    if (consent === 'v1') {
      setHasConsent(true)
    }
    
    setIsLoaded(true)

    // Listen for consent events
    const handleAccept = () => {
      setHasConsent(true)
      initializeAnalytics()
    }

    const handleDecline = () => {
      setHasConsent(false)
      cleanupAnalytics()
    }

    window.addEventListener('cookieConsentAccepted', handleAccept)
    window.addEventListener('cookieConsentDeclined', handleDecline)

    return () => {
      window.removeEventListener('cookieConsentAccepted', handleAccept)
      window.removeEventListener('cookieConsentDeclined', handleDecline)
    }
  }, [])

  const initializeAnalytics = () => {
    // Initialize Google Analytics if configured
    if (GA_MEASUREMENT_ID && typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'granted'
      })
    }
  }

  const cleanupAnalytics = () => {
    // Cleanup Google Analytics
    if (GA_MEASUREMENT_ID && typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'denied'
      })
    }
  }

  // Initialize analytics if consent already exists
  useEffect(() => {
    if (hasConsent && isLoaded) {
      initializeAnalytics()
    }
  }, [hasConsent, isLoaded])

  return (
    <>
      {/* Google Analytics 4 */}
      {GA_MEASUREMENT_ID && (
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
                analytics_storage: '${hasConsent ? 'granted' : 'denied'}'
              });
              
              gtag('config', '${GA_MEASUREMENT_ID}', {
                page_title: document.title,
                page_location: window.location.href,
              });
            `}
          </Script>
        </>
      )}

      {/* Plausible */}
      {PLAUSIBLE_DOMAIN && hasConsent && (
        <Script
          defer
          data-domain={PLAUSIBLE_DOMAIN}
          src="https://plausible.io/js/script.js"
          strategy="afterInteractive"
        />
      )}

      {children}
    </>
  )
}