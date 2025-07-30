'use client'

import { useEffect, useState } from 'react'
import { GoogleAnalytics } from '@/components/google-analytics'
import { EnhancedConversionTracking } from '@/components/analytics/enhanced-conversion-tracking'
import { UserFeedback } from '@/components/user-feedback'

/**
 * Deferred Analytics Component
 * Loads analytics after the page has become interactive to improve FCP and LCP
 */
export function DeferredAnalytics() {
  const [shouldLoadAnalytics, setShouldLoadAnalytics] = useState(false)

  useEffect(() => {
    // Wait for page to be interactive before loading analytics
    const loadAnalytics = () => {
      setShouldLoadAnalytics(true)
    }

    // Load analytics after a short delay when page is ready
    if (document.readyState === 'complete') {
      setTimeout(loadAnalytics, 1000)
    } else {
      window.addEventListener('load', () => {
        setTimeout(loadAnalytics, 1000)
      })
    }

    // Also load on first user interaction (scroll, click, or touch)
    const handleInteraction = () => {
      loadAnalytics()
      // Remove listeners after first interaction
      window.removeEventListener('scroll', handleInteraction)
      window.removeEventListener('click', handleInteraction)
      window.removeEventListener('touchstart', handleInteraction)
    }

    window.addEventListener('scroll', handleInteraction, { passive: true })
    window.addEventListener('click', handleInteraction, { passive: true })
    window.addEventListener('touchstart', handleInteraction, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleInteraction)
      window.removeEventListener('click', handleInteraction)
      window.removeEventListener('touchstart', handleInteraction)
    }
  }, [])

  if (!shouldLoadAnalytics) {
    return null
  }

  return (
    <>
      <GoogleAnalytics measurementId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
      <EnhancedConversionTracking />
      <UserFeedback />
    </>
  )
}