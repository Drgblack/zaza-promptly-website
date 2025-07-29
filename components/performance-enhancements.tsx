"use client"

import { useEffect } from 'react'

export function PerformanceEnhancements() {
  useEffect(() => {
    // Web Vitals monitoring
    if (typeof window !== 'undefined' && 'performance' in window) {
      // Track Core Web Vitals
      const trackWebVitals = () => {
        const observer = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry) => {
            const metricName = entry.name
            const value = Math.round((entry as any).value || 0)
            
            // Send to analytics if available
            if (window.gtag) {
              window.gtag('event', 'web_vitals', {
                metric_name: metricName,
                metric_value: value,
                metric_id: (entry as any).id,
                custom_parameter: 'zaza_education_performance'
              })
            }
            
            // Console log in development
            if (process.env.NODE_ENV === 'development') {
              console.log(`[Performance] ${metricName}: ${value}`)
            }
          })
        })

        // Observe various performance metrics
        try {
          observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'cumulative-layout-shift'] })
        } catch (error) {
          // Silently fail if metrics not supported
        }
      }

      // Performance optimization techniques
      const optimizePerformance = () => {
        // Preload critical resources
        const criticalResources = [
          '/zaza-logo.png',
          '/phone-mockup.png'
        ]
        
        criticalResources.forEach(resource => {
          const link = document.createElement('link')
          link.rel = 'preload'
          link.as = resource.endsWith('.png') ? 'image' : 'fetch'
          link.href = resource
          document.head.appendChild(link)
        })

        // Lazy load non-critical images
        const images = document.querySelectorAll('img[data-src]')
        const imageObserver = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const img = entry.target as HTMLImageElement
              img.src = img.dataset.src || ''
              img.removeAttribute('data-src')
              imageObserver.unobserve(img)
            }
          })
        })

        images.forEach(img => imageObserver.observe(img))

        // Prefetch likely navigation targets
        const prefetchLinks = [
          '/promptly-pricing',
          '/free-resources',
          '/blog'
        ]

        prefetchLinks.forEach(link => {
          const prefetchLink = document.createElement('link')
          prefetchLink.rel = 'prefetch'
          prefetchLink.href = link
          document.head.appendChild(prefetchLink)
        })
      }

      // Initialize performance monitoring
      trackWebVitals()
      optimizePerformance()

      // Track page load time
      window.addEventListener('load', () => {
        const loadTime = performance.now()
        
        if (window.gtag) {
          window.gtag('event', 'page_load_time', {
            value: Math.round(loadTime),
            custom_parameter: 'zaza_education_timing'
          })
        }

        if (process.env.NODE_ENV === 'development') {
          console.log(`[Performance] Page load time: ${Math.round(loadTime)}ms`)
        }
      })

      // Track user engagement
      let engagementStartTime = Date.now()
      let isActive = true

      const trackEngagement = () => {
        const engagementTime = Date.now() - engagementStartTime
        
        if (window.gtag && engagementTime > 5000) { // Only track if engaged for 5+ seconds
          window.gtag('event', 'user_engagement', {
            engagement_time_msec: engagementTime,
            custom_parameter: 'zaza_education_engagement'
          })
        }
      }

      // Track when user becomes inactive
      const handleVisibilityChange = () => {
        if (document.hidden && isActive) {
          trackEngagement()
          isActive = false
        } else if (!document.hidden && !isActive) {
          engagementStartTime = Date.now()
          isActive = true
        }
      }

      document.addEventListener('visibilitychange', handleVisibilityChange)
      window.addEventListener('beforeunload', trackEngagement)

      // Cleanup
      return () => {
        document.removeEventListener('visibilitychange', handleVisibilityChange)
        window.removeEventListener('beforeunload', trackEngagement)
      }
    }
  }, [])

  return null // This component doesn't render anything
}

// Service Worker registration for caching
export function ServiceWorkerRegistration() {
  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      'serviceWorker' in navigator &&
      process.env.NODE_ENV === 'production'
    ) {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/sw.js')
          .then((registration) => {
            if (process.env.NODE_ENV === 'development') {
              console.log('[SW] Service Worker registered successfully:', registration)
            }
            
            // Track service worker registration
            if (window.gtag) {
              window.gtag('event', 'service_worker_registered', {
                custom_parameter: 'zaza_education_sw'
              })
            }
          })
          .catch((error) => {
            if (process.env.NODE_ENV === 'development') {
              console.log('[SW] Service Worker registration failed:', error)
            }
          })
      })
    }
  }, [])

  return null
}

// Error boundary for performance tracking
export function PerformanceErrorBoundary({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Global error handler
    const handleError = (event: ErrorEvent) => {
      if (window.gtag) {
        window.gtag('event', 'javascript_error', {
          error_message: event.message,
          error_filename: event.filename,
          error_lineno: event.lineno,
          custom_parameter: 'zaza_education_error'
        })
      }

      if (process.env.NODE_ENV === 'development') {
        console.error('[Performance] JavaScript Error:', event.error)
      }
    }

    // Unhandled promise rejection handler
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      if (window.gtag) {
        window.gtag('event', 'unhandled_promise_rejection', {
          error_message: event.reason?.message || 'Unknown promise rejection',
          custom_parameter: 'zaza_education_error'
        })
      }

      if (process.env.NODE_ENV === 'development') {
        console.error('[Performance] Unhandled Promise Rejection:', event.reason)
      }
    }

    window.addEventListener('error', handleError)
    window.addEventListener('unhandledrejection', handleUnhandledRejection)

    return () => {
      window.removeEventListener('error', handleError)
      window.removeEventListener('unhandledrejection', handleUnhandledRejection)
    }
  }, [])

  return <>{children}</>
}