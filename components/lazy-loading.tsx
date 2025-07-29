"use client"

import React, { Suspense, lazy } from 'react'
import Image from 'next/image'
import { Loader2 } from 'lucide-react'

// Lazy loading wrapper component
interface LazyWrapperProps {
  children: React.ReactNode
  fallback?: React.ReactNode
  threshold?: number
  className?: string
}

export function LazyWrapper({ 
  children, 
  fallback = <LazyLoadingSkeleton />, 
  threshold = 0.1,
  className = ""
}: LazyWrapperProps) {
  return (
    <Suspense fallback={fallback}>
      <div className={className}>
        {children}
      </div>
    </Suspense>
  )
}

// Optimized image component with lazy loading
interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
  placeholder?: 'blur' | 'empty'
  blurDataURL?: string
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = "",
  priority = false,
  placeholder = 'blur',
  blurDataURL
}: OptimizedImageProps) {
  // Generate blur placeholder if not provided
  const defaultBlurDataURL = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority={priority}
      placeholder={placeholder}
      blurDataURL={blurDataURL || defaultBlurDataURL}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      loading={priority ? 'eager' : 'lazy'}
    />
  )
}

// Intersection Observer hook for lazy loading
export function useIntersectionObserver(
  threshold = 0.1,
  rootMargin = '50px'
) {
  const [isIntersecting, setIsIntersecting] = React.useState(false)
  const [element, setElement] = React.useState<Element | null>(null)

  React.useEffect(() => {
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting)
      },
      { threshold, rootMargin }
    )

    observer.observe(element)

    return () => {
      observer.unobserve(element)
    }
  }, [element, threshold, rootMargin])

  return [setElement, isIntersecting] as const
}

// Lazy loading container for content sections
interface LazyContentProps {
  children: React.ReactNode
  fallback?: React.ReactNode
  className?: string
  threshold?: number
}

export function LazyContent({ 
  children, 
  fallback = <LazyLoadingSkeleton />, 
  className = "",
  threshold = 0.1 
}: LazyContentProps) {
  const [setRef, isIntersecting] = useIntersectionObserver(threshold)

  return (
    <div ref={setRef} className={className}>
      {isIntersecting ? children : fallback}
    </div>
  )
}

// Loading skeletons for different content types
export function LazyLoadingSkeleton({ className = "" }: { className?: string }) {
  return (
    <div className={`animate-pulse ${className}`}>
      <div className="bg-gray-200 rounded-lg h-32 w-full mb-4"></div>
      <div className="space-y-2">
        <div className="bg-gray-200 rounded h-4 w-3/4"></div>
        <div className="bg-gray-200 rounded h-4 w-1/2"></div>
      </div>
    </div>
  )
}

export function CardSkeleton({ className = "" }: { className?: string }) {
  return (
    <div className={`animate-pulse bg-white rounded-lg shadow-md p-6 ${className}`}>
      <div className="bg-gray-200 rounded-lg h-48 w-full mb-4"></div>
      <div className="bg-gray-200 rounded h-6 w-3/4 mb-2"></div>
      <div className="bg-gray-200 rounded h-4 w-full mb-2"></div>
      <div className="bg-gray-200 rounded h-4 w-2/3"></div>
    </div>
  )
}

export function BlogPostSkeleton({ className = "" }: { className?: string }) {
  return (
    <div className={`animate-pulse ${className}`}>
      <div className="bg-gray-200 rounded-lg h-64 w-full mb-6"></div>
      <div className="bg-gray-200 rounded h-8 w-3/4 mb-4"></div>
      <div className="space-y-2 mb-6">
        <div className="bg-gray-200 rounded h-4 w-full"></div>
        <div className="bg-gray-200 rounded h-4 w-full"></div>
        <div className="bg-gray-200 rounded h-4 w-2/3"></div>
      </div>
      <div className="flex gap-2">
        <div className="bg-gray-200 rounded-full h-6 w-16"></div>
        <div className="bg-gray-200 rounded-full h-6 w-20"></div>
      </div>
    </div>
  )
}

// Lazy loaded components for heavy sections
export const LazyTestimonials = lazy(() => import('@/components/Testimonials'))
export const LazyPricingPreview = lazy(() => import('@/components/PricingPreview'))

// Performance monitoring for lazy loading
export function usePerformanceMonitoring() {
  React.useEffect(() => {
    // Monitor Core Web Vitals
    if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
      // Largest Contentful Paint
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        entries.forEach((entry) => {
          if (entry.entryType === 'largest-contentful-paint') {
            console.log('LCP:', entry.startTime)
            // Send to analytics
            if (typeof window !== 'undefined' && (window as any).gtag) {
              (window as any).gtag('event', 'web_vitals', {
                name: 'LCP',
                value: Math.round(entry.startTime),
              })
            }
          }
        })
      })
      
      try {
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] })
      } catch (e) {
        console.warn('Performance monitoring not supported')
      }

      // First Input Delay
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        entries.forEach((entry: any) => {
          if (entry.entryType === 'first-input') {
            const fid = entry.processingStart - entry.startTime
            console.log('FID:', fid)
            // Send to analytics
            if (typeof window !== 'undefined' && (window as any).gtag) {
              (window as any).gtag('event', 'web_vitals', {
                name: 'FID',
                value: Math.round(fid),
              })
            }
          }
        })
      })

      try {
        fidObserver.observe({ entryTypes: ['first-input'] })
      } catch (e) {
        console.warn('FID monitoring not supported')
      }

      // Cumulative Layout Shift
      let clsScore = 0
      const clsObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        entries.forEach((entry: any) => {
          if (entry.entryType === 'layout-shift' && !entry.hadRecentInput) {
            clsScore += entry.value
          }
        })
      })

      try {
        clsObserver.observe({ entryTypes: ['layout-shift'] })
      } catch (e) {
        console.warn('CLS monitoring not supported')
      }

      // Report CLS on page unload
      const reportCLS = () => {
        console.log('CLS:', clsScore)
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'web_vitals', {
            name: 'CLS',
            value: Math.round(clsScore * 1000),
          })
        }
      }

      window.addEventListener('beforeunload', reportCLS)

      return () => {
        lcpObserver.disconnect()
        fidObserver.disconnect()
        clsObserver.disconnect()
        window.removeEventListener('beforeunload', reportCLS)
      }
    }
  }, [])
}

// Preload critical resources
export function PreloadCriticalResources() {
  React.useEffect(() => {
    // Preload critical fonts
    const fontLinks = [
      'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
    ]

    fontLinks.forEach(href => {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.href = href
      link.as = 'style'
      link.crossOrigin = 'anonymous'
      document.head.appendChild(link)
    })

    // Preload critical images
    const criticalImages = [
      '/zaza-logo.png',
      '/og-image.png',
    ]

    criticalImages.forEach(src => {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.href = src
      link.as = 'image'
      document.head.appendChild(link)
    })
  }, [])

  return null
}

// Component for critical above-the-fold content
export function CriticalContent({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PreloadCriticalResources />
      {children}
    </>
  )
}

// Loading state for forms
export function FormLoadingState() {
  return (
    <div className="flex items-center justify-center p-4">
      <Loader2 className="w-6 h-6 animate-spin text-purple-600 mr-2" />
      <span className="text-gray-600">Processing...</span>
    </div>
  )
}