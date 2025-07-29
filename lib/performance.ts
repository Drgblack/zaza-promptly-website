/**
 * Performance optimization utilities for Zaza Promptly
 * Implements best practices for Core Web Vitals and user experience
 */

// Resource hints for performance optimization
export function addResourceHints() {
  if (typeof window === 'undefined') return

  // DNS prefetch for external domains
  const dnsPrefetchDomains = [
    'fonts.googleapis.com',
    'fonts.gstatic.com',
    'api.stripe.com',
    'js.stripe.com',
    'api.brevo.com',
    'www.google-analytics.com',
    'openai.com',
  ]

  dnsPrefetchDomains.forEach(domain => {
    const link = document.createElement('link')
    link.rel = 'dns-prefetch'
    link.href = `//${domain}`
    document.head.appendChild(link)
  })

  // Preconnect to critical domains
  const preconnectDomains = [
    { href: 'https://fonts.googleapis.com', crossOrigin: true },
    { href: 'https://fonts.gstatic.com', crossOrigin: true },
    { href: 'https://api.stripe.com', crossOrigin: false },
  ]

  preconnectDomains.forEach(({ href, crossOrigin }) => {
    const link = document.createElement('link')
    link.rel = 'preconnect'
    link.href = href
    if (crossOrigin) link.crossOrigin = 'anonymous'
    document.head.appendChild(link)
  })
}

// Image optimization utilities
export interface ImageOptimizationConfig {
  src: string
  width?: number
  height?: number
  quality?: number
  format?: 'webp' | 'avif' | 'jpg' | 'png'
  lazy?: boolean
}

export function optimizeImageUrl({
  src,
  width,
  height,
  quality = 85,
  format = 'webp',
}: ImageOptimizationConfig): string {
  // For Next.js built-in optimization
  if (src.startsWith('/') && !src.includes('/_next/')) {
    const params = new URLSearchParams()
    if (width) params.set('w', width.toString())
    if (height) params.set('h', height.toString())
    params.set('q', quality.toString())
    params.set('f', format)
    
    return `/_next/image?url=${encodeURIComponent(src)}&${params.toString()}`
  }
  
  return src
}

// Generate responsive image srcSet
export function generateSrcSet(src: string, widths: number[] = [640, 768, 1024, 1280, 1536]): string {
  return widths
    .map(width => `${optimizeImageUrl({ src, width })} ${width}w`)
    .join(', ')
}

// Bundle size analysis (development only)
export function analyzeBundleSize() {
  if (process.env.NODE_ENV !== 'development') return

  // Monitor bundle loading performance
  const observer = new PerformanceObserver((list) => {
    const entries = list.getEntries()
    entries.forEach((entry) => {
      if (entry.name.includes('_next/static/chunks/')) {
        console.log(`📦 Chunk loaded: ${entry.name.split('/').pop()} - ${Math.round(entry.duration)}ms`)
      }
    })
  })

  try {
    observer.observe({ entryTypes: ['resource'] })
  } catch (e) {
    console.warn('Bundle analysis not supported')
  }

  return () => observer.disconnect()
}

// Core Web Vitals monitoring
export interface WebVitals {
  lcp?: number  // Largest Contentful Paint
  fid?: number  // First Input Delay
  cls?: number  // Cumulative Layout Shift
  fcp?: number  // First Contentful Paint
  ttfb?: number // Time to First Byte
}

export function measureWebVitals(callback: (vitals: WebVitals) => void) {
  if (typeof window === 'undefined') return

  const vitals: WebVitals = {}

  // Largest Contentful Paint
  const lcpObserver = new PerformanceObserver((list) => {
    const entries = list.getEntries()
    const lastEntry = entries[entries.length - 1]
    vitals.lcp = lastEntry.startTime
    callback(vitals)
  })

  // First Input Delay
  const fidObserver = new PerformanceObserver((list) => {
    const entries = list.getEntries()
    entries.forEach((entry: any) => {
      vitals.fid = entry.processingStart - entry.startTime
      callback(vitals)
    })
  })

  // Cumulative Layout Shift
  let clsScore = 0
  const clsObserver = new PerformanceObserver((list) => {
    const entries = list.getEntries()
    entries.forEach((entry: any) => {
      if (!entry.hadRecentInput) {
        clsScore += entry.value
        vitals.cls = clsScore
        callback(vitals)
      }
    })
  })

  // First Contentful Paint
  const fcpObserver = new PerformanceObserver((list) => {
    const entries = list.getEntries()
    entries.forEach((entry) => {
      vitals.fcp = entry.startTime
      callback(vitals)
    })
  })

  try {
    lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] })
    fidObserver.observe({ entryTypes: ['first-input'] })
    clsObserver.observe({ entryTypes: ['layout-shift'] })
    fcpObserver.observe({ entryTypes: ['paint'] })
  } catch (e) {
    console.warn('Web Vitals monitoring not supported')
  }

  // Measure TTFB
  if ('navigation' in performance) {
    const navigationEntry = performance.getEntriesByType('navigation')[0] as any
    vitals.ttfb = navigationEntry.responseStart - navigationEntry.requestStart
    callback(vitals)
  }

  return () => {
    lcpObserver.disconnect()
    fidObserver.disconnect()
    clsObserver.disconnect()
    fcpObserver.disconnect()
  }
}

// Critical resource loading optimization
export function loadCriticalResources() {
  const criticalResources = [
    { href: '/zaza-logo.png', as: 'image' },
    { href: '/manifest.json', as: 'fetch', crossOrigin: 'anonymous' },
  ]

  criticalResources.forEach(({ href, as, crossOrigin }) => {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.href = href
    link.as = as
    if (crossOrigin) link.crossOrigin = crossOrigin
    document.head.appendChild(link)
  })
}

// Service Worker registration for caching
export function registerServiceWorker() {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) return

  window.addEventListener('load', async () => {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js')
      console.log('✅ Service Worker registered:', registration.scope)
      
      // Listen for updates
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // New content available
              console.log('📦 New content available - please refresh')
              // Could trigger a user notification here
            }
          })
        }
      })
    } catch (error) {
      console.warn('❌ Service Worker registration failed:', error)
    }
  })
}

// Lazy loading configuration
export const lazyLoadingConfig = {
  // Intersection Observer options
  threshold: 0.1,
  rootMargin: '50px 0px',
  
  // Image lazy loading
  imageSizes: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  
  // Component lazy loading
  componentThreshold: 0.1,
  
  // Priority loading for above-the-fold content
  priorityComponents: [
    'Hero',
    'Header',
    'Navigation',
  ],
}

// Performance budget monitoring
export interface PerformanceBudget {
  lcp: number      // ms
  fid: number      // ms  
  cls: number      // score
  bundleSize: number // KB
  imageSize: number  // KB per image
}

export const performanceBudget: PerformanceBudget = {
  lcp: 2500,      // 2.5s for LCP
  fid: 100,       // 100ms for FID
  cls: 0.1,       // 0.1 for CLS
  bundleSize: 200, // 200KB for main bundle
  imageSize: 150,  // 150KB per image
}

export function checkPerformanceBudget(vitals: WebVitals): {
  passed: boolean
  violations: string[]
} {
  const violations: string[] = []

  if (vitals.lcp && vitals.lcp > performanceBudget.lcp) {
    violations.push(`LCP: ${Math.round(vitals.lcp)}ms exceeds budget of ${performanceBudget.lcp}ms`)
  }

  if (vitals.fid && vitals.fid > performanceBudget.fid) {
    violations.push(`FID: ${Math.round(vitals.fid)}ms exceeds budget of ${performanceBudget.fid}ms`)
  }

  if (vitals.cls && vitals.cls > performanceBudget.cls) {
    violations.push(`CLS: ${vitals.cls.toFixed(3)} exceeds budget of ${performanceBudget.cls}`)
  }

  return {
    passed: violations.length === 0,
    violations,
  }
}

// Resource prioritization
export function prioritizeResources() {
  // Critical CSS
  const criticalCSS = document.querySelector('style[data-critical]')
  if (criticalCSS) {
    criticalCSS.remove()
  }

  // Non-critical CSS (load asynchronously)
  const nonCriticalCSS = [
    'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
  ]

  nonCriticalCSS.forEach(href => {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = href
    link.media = 'print'
    link.onload = () => { link.media = 'all' }
    document.head.appendChild(link)
  })
}

// Memory leak prevention
export function preventMemoryLeaks() {
  // Clean up event listeners on page unload
  const cleanup: (() => void)[] = []

  const addCleanup = (fn: () => void) => {
    cleanup.push(fn)
  }

  window.addEventListener('beforeunload', () => {
    cleanup.forEach(fn => fn())
  })

  return addCleanup
}

// Performance debugging (development only)
export function debugPerformance() {
  if (process.env.NODE_ENV !== 'development') return

  // Log slow operations (simplified for TypeScript compatibility)
  console.log('🔧 Performance debugging enabled')

  // Monitor long tasks
  const longTaskObserver = new PerformanceObserver((list) => {
    const entries = list.getEntries()
    entries.forEach((entry) => {
      console.warn(`🐌 Long task detected: ${Math.round(entry.duration)}ms`)
    })
  })

  try {
    longTaskObserver.observe({ entryTypes: ['longtask'] })
  } catch (e) {
    console.warn('Long task monitoring not supported')
  }

  return () => longTaskObserver.disconnect()
}