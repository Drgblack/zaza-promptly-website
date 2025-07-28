"use client"

import { useEffect } from "react"

export function MobileOptimizations() {
  useEffect(() => {
    // Add smooth scroll behavior
    document.documentElement.style.scrollBehavior = "smooth"

    // Optimize touch interactions
    document.body.style.touchAction = "manipulation"

    // Prevent zoom on input focus (iOS) - but allow user scaling for accessibility
    const viewport = document.querySelector('meta[name="viewport"]')
    if (viewport) {
      viewport.setAttribute("content", "width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes")
    }

    // Add performance optimizations
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {
        // Service worker registration failed
      })
    }

    // Preload critical resources
    const preloadLink = document.createElement("link")
    preloadLink.rel = "preload"
    preloadLink.href = "/zaza-logo.png"
    preloadLink.as = "image"
    document.head.appendChild(preloadLink)

    // Add mobile-specific optimizations
    const addMobileOptimizations = () => {
      // Ensure minimum touch target size for all interactive elements
      const interactiveElements = document.querySelectorAll('button, a, input, select, textarea, [role="button"]')
      interactiveElements.forEach((element) => {
        const computedStyle = window.getComputedStyle(element)
        const minHeight = parseInt(computedStyle.minHeight) || 0
        const minWidth = parseInt(computedStyle.minWidth) || 0
        
        if (minHeight < 44) {
          element.style.minHeight = '44px'
        }
        if (minWidth < 44) {
          element.style.minWidth = '44px'
        }
      })

      // Add touch feedback for buttons
      const buttons = document.querySelectorAll('button, [role="button"]')
      buttons.forEach((button) => {
        button.addEventListener('touchstart', () => {
          button.style.transform = 'scale(0.98)'
        })
        button.addEventListener('touchend', () => {
          button.style.transform = ''
        })
      })
    }

    // Run optimizations after a short delay to ensure DOM is ready
    setTimeout(addMobileOptimizations, 100)

    // Handle orientation changes
    const handleOrientationChange = () => {
      setTimeout(() => {
        window.scrollTo(0, 0)
      }, 100)
    }

    window.addEventListener('orientationchange', handleOrientationChange)

    // Optimize for mobile performance
    if ('connection' in navigator) {
      const connection = (navigator as any).connection
      if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
        // Reduce animations for slow connections
        document.documentElement.style.setProperty('--animation-duration', '0.1s')
      }
    }

    return () => {
      document.documentElement.style.scrollBehavior = "auto"
      window.removeEventListener('orientationchange', handleOrientationChange)
    }
  }, [])

  return null
}
