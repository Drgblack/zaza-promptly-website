/**
 * Analytics utilities for consent-gated event tracking
 */

interface CookieConsent {
  analytics: boolean
  declined: boolean
}

// Check if analytics tracking is allowed based on user consent
export function canTrackAnalytics(): boolean {
  if (typeof window === 'undefined') return false
  
  // Check Do Not Track
  const isDoNotTrack = navigator.doNotTrack === '1' || 
                      (window as unknown as { doNotTrack?: string }).doNotTrack === '1' || 
                      (navigator as unknown as { msDoNotTrack?: string }).msDoNotTrack === '1'
  
  if (isDoNotTrack) return false
  
  // Check stored consent
  try {
    const stored = localStorage.getItem('promptly-cookie-consent')
    if (!stored) return false
    
    const consent: CookieConsent = JSON.parse(stored)
    return consent.analytics && !consent.declined
  } catch {
    return false
  }
}

// Send event to Google Analytics if consent is given
export function trackEvent(eventName: string, parameters: Record<string, unknown> = {}) {
  if (!canTrackAnalytics()) return
  
  try {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', eventName, parameters)
    }
  } catch (error) {
    console.error('Analytics tracking error:', error)
  }
}

// FAQ-specific tracking events
export const faqAnalytics = {
  search: (query: string, resultsCount: number) => {
    trackEvent('faq_search', {
      search_term: query,
      results_count: resultsCount,
      page_location: window.location.href
    })
  },
  
  expand: (slug: string, category: string) => {
    trackEvent('faq_expand', {
      faq_slug: slug,
      faq_category: category,
      page_location: window.location.href
    })
  },
  
  helpful: (slug: string, isHelpful: boolean) => {
    trackEvent('faq_helpful', {
      faq_slug: slug,
      helpful: isHelpful,
      page_location: window.location.href
    })
  }
}