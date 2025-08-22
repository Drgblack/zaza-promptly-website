/**
 * Resource analytics utility that respects user consent
 */

interface Resource {
  filename: string
  title: string
  format: string
  [key: string]: unknown
}

interface CookieConsent {
  version: string
  timestamp: number
  essential: boolean
  analytics: boolean
  preferences: boolean
  declined: boolean
}

// Check if user has given analytics consent
const hasAnalyticsConsent = (): boolean => {
  if (typeof window === 'undefined') return false
  
  // Respect Do Not Track
  if (navigator.doNotTrack === '1' || 
      (window as unknown as { doNotTrack?: string }).doNotTrack === '1' || 
      (navigator as unknown as { msDoNotTrack?: string }).msDoNotTrack === '1') {
    return false
  }
  
  try {
    const stored = localStorage.getItem('promptly-cookie-consent')
    if (!stored) return false
    
    const consent: CookieConsent = JSON.parse(stored)
    return consent.analytics === true
  } catch {
    return false
  }
}

// Track resource open event (for inline viewing)
export const trackResourceOpen = (resource: Resource): void => {
  if (!hasAnalyticsConsent()) return
  
  // Only track if gtag is available
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'resource_open', {
      event_category: 'Resource',
      event_label: resource.title,
      file_name: resource.filename,
      file_type: resource.format.toLowerCase(),
      value: 1,
      // Additional custom parameters
      custom_parameters: {
        resource_title: resource.title,
        resource_format: resource.format,
        resource_filename: resource.filename
      }
    })
    
    console.log(`📊 Tracked resource_open: ${resource.filename}`)
  }
}

// Track resource download event
export const trackResourceDownload = (resource: Resource): void => {
  if (!hasAnalyticsConsent()) return
  
  // Only track if gtag is available
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'resource_download', {
      event_category: 'Resource',
      event_label: resource.title,
      file_name: resource.filename,
      file_type: resource.format.toLowerCase(),
      value: 1,
      // Additional custom parameters
      custom_parameters: {
        resource_title: resource.title,
        resource_format: resource.format,
        resource_filename: resource.filename
      }
    })
    
    console.log(`📊 Tracked resource_download: ${resource.filename}`)
  }
}

// Generic resource interaction tracker (fallback)
export const trackResourceInteraction = (
  action: 'open' | 'download', 
  resource: Resource
): void => {
  if (action === 'open') {
    trackResourceOpen(resource)
  } else if (action === 'download') {
    trackResourceDownload(resource)
  }
}

// Debug function to check consent status
export const getConsentStatus = (): { 
  hasConsent: boolean
  doNotTrack: boolean
  gtagAvailable: boolean 
} => {
  return {
    hasConsent: hasAnalyticsConsent(),
    doNotTrack: typeof window !== 'undefined' && navigator.doNotTrack === '1',
    gtagAvailable: typeof window !== 'undefined' && !!window.gtag
  }
}