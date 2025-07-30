'use client'

import { useEffect } from 'react'

/**
 * Performance Optimizations Component
 * Implements various performance improvements to reduce CLS and improve Core Web Vitals
 */
export function PerformanceOptimizations() {
  useEffect(() => {
    // Reduce CLS by adding size reservations
    const addSizeReservations = () => {
      // Reserve space for floating assistant button
      const assistantReservation = document.createElement('div')
      assistantReservation.id = 'assistant-space-reservation'
      assistantReservation.style.cssText = `
        position: fixed;
        bottom: 24px;
        right: 24px;
        width: 56px;
        height: 56px;
        z-index: 49;
        pointer-events: none;
        opacity: 0;
        border-radius: 50%;
      `
      document.body.appendChild(assistantReservation)

      // Remove reservation after assistant loads
      const checkAssistant = () => {
        const assistant = document.querySelector('[title="Chat with AI Assistant"]')
        if (assistant) {
          assistantReservation.remove()
        } else {
          setTimeout(checkAssistant, 100)
        }
      }
      setTimeout(checkAssistant, 1000)
    }

    // Add critical CSS to prevent layout shifts
    const addCriticalStyles = () => {
      if (!document.getElementById('critical-cls-prevention')) {
        const style = document.createElement('style')
        style.id = 'critical-cls-prevention'
        style.textContent = `
          /* Prevent layout shifts for common elements */
          .fixed { contain: layout; }
          
          /* Reserve space for images without dimensions */
          img:not([width]):not([height]) {
            aspect-ratio: 16/9;
            object-fit: cover;
          }
          
          /* Smooth font loading */
          body {
            font-display: swap;
          }
          
          /* Optimize animations for performance */
          * {
            backface-visibility: hidden;
            perspective: 1000px;
          }
          
          /* GPU acceleration for transforms */
          .transform, .hover\\:scale-105:hover, .hover\\:scale-110:hover {
            transform: translateZ(0);
            will-change: transform;
          }
          
          /* Reduce paint on scroll */
          .fixed, .sticky {
            will-change: transform;
          }
        `
        document.head.appendChild(style)
      }
    }

    // Optimize scroll performance
    const optimizeScrolling = () => {
      // Passive event listeners for better scroll performance
      let ticking = false
      const optimizedScrollHandler = () => {
        if (!ticking) {
          requestAnimationFrame(() => {
            // Any scroll-based animations would go here
            ticking = false
          })
          ticking = true
        }
      }

      window.addEventListener('scroll', optimizedScrollHandler, { passive: true })
      
      return () => {
        window.removeEventListener('scroll', optimizedScrollHandler)
      }
    }

    // Apply optimizations
    addSizeReservations()
    addCriticalStyles()
    const cleanupScroll = optimizeScrolling()

    return cleanupScroll
  }, [])

  return null // This component doesn't render anything
}

/**
 * Critical CSS Inlining Component
 * Inlines critical CSS to improve FCP
 */
export function CriticalCSS() {
  return (
    <style
      dangerouslySetInnerHTML={{
        __html: `
          /* Critical above-the-fold styles */
          .hero-section {
            contain: layout style paint;
          }
          
          /* Prevent FOUC */
          .fade-in {
            opacity: 0;
            animation: fadeIn 0.3s ease-in-out forwards;
          }
          
          @keyframes fadeIn {
            to { opacity: 1; }
          }
          
          /* Loading states to prevent CLS */
          .loading-skeleton {
            background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
            background-size: 200% 100%;
            animation: loading 1.5s infinite;
          }
          
          @keyframes loading {
            0% { background-position: 200% 0; }
            100% { background-position: -200% 0; }
          }
        `
      }}
    />
  )
}