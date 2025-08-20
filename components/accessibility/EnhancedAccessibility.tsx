"use client"

import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

interface AccessibilityContextType {
  reducedMotion: boolean
  highContrast: boolean
  fontSize: 'small' | 'medium' | 'large'
  focusVisible: boolean
}

export function EnhancedAccessibility({ children }: { children: React.ReactNode }) {
  const [accessibilityPrefs, setAccessibilityPrefs] = useState<AccessibilityContextType>({
    reducedMotion: false,
    highContrast: false,
    fontSize: 'medium',
    focusVisible: true
  })

  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    // Check for prefers-reduced-motion
    const reducedMotion = prefersReducedMotion || 
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // Check for prefers-contrast
    const highContrast = window.matchMedia('(prefers-contrast: high)').matches

    // Check for saved preferences
    const savedPrefs = localStorage.getItem('accessibility-preferences')
    if (savedPrefs) {
      try {
        const parsed = JSON.parse(savedPrefs)
        setAccessibilityPrefs({ 
          ...parsed, 
          reducedMotion: reducedMotion || parsed.reducedMotion 
        })
      } catch (e) {
        // Use defaults
        setAccessibilityPrefs(prev => ({ ...prev, reducedMotion, highContrast }))
      }
    } else {
      setAccessibilityPrefs(prev => ({ ...prev, reducedMotion, highContrast }))
    }

    // Add focus-visible support for keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation')
      }
    })

    document.addEventListener('mousedown', () => {
      document.body.classList.remove('keyboard-navigation')
    })

    // Add high contrast styles if needed
    if (highContrast) {
      document.documentElement.style.setProperty('--contrast-multiplier', '1.5')
    }

    // Add font size class based on preference
    document.documentElement.setAttribute('data-font-size', accessibilityPrefs.fontSize)

  }, [prefersReducedMotion])

  // Save preferences when they change
  useEffect(() => {
    localStorage.setItem('accessibility-preferences', JSON.stringify(accessibilityPrefs))
  }, [accessibilityPrefs])

  return (
    <>
      {children}
      
      {/* Accessibility Styles */}
      <style jsx global>{`
        /* Reduced motion support */
        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }

        /* High contrast support */
        @media (prefers-contrast: high) {
          :root {
            --contrast-multiplier: 1.5;
          }
          
          .bg-gradient-to-r,
          .bg-gradient-to-br,
          .bg-gradient-to-l {
            background: var(--foreground) !important;
            color: var(--background) !important;
          }
          
          .text-gray-600,
          .text-gray-700,
          .text-slate-600,
          .text-slate-700 {
            color: var(--foreground) !important;
          }
        }

        /* Keyboard navigation focus styles */
        .keyboard-navigation *:focus {
          outline: 3px solid #3b82f6 !important;
          outline-offset: 2px !important;
        }

        .keyboard-navigation button:focus,
        .keyboard-navigation a:focus,
        .keyboard-navigation input:focus,
        .keyboard-navigation textarea:focus,
        .keyboard-navigation select:focus {
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3) !important;
        }

        /* Skip links */
        .skip-link {
          position: absolute;
          top: -40px;
          left: 6px;
          background: #3b82f6;
          color: white;
          padding: 8px;
          border-radius: 4px;
          text-decoration: none;
          transition: top 0.3s;
          z-index: 100;
        }

        .skip-link:focus {
          top: 6px;
        }

        /* Font size variations */
        [data-font-size="small"] {
          font-size: 0.9em;
        }

        [data-font-size="large"] {
          font-size: 1.1em;
        }

        [data-font-size="large"] h1 {
          font-size: 1.2em;
        }

        [data-font-size="large"] h2 {
          font-size: 1.15em;
        }

        /* Better focus indicators for interactive elements */
        button:focus-visible,
        a:focus-visible,
        input:focus-visible,
        textarea:focus-visible,
        select:focus-visible,
        [role="button"]:focus-visible,
        [role="link"]:focus-visible,
        [tabindex]:focus-visible {
          outline: 2px solid #3b82f6;
          outline-offset: 2px;
          border-radius: 4px;
        }

        /* Ensure sufficient color contrast */
        .text-gray-400 {
          color: #6b7280 !important;
        }

        .text-gray-500 {
          color: #6b7280 !important;
        }

        .bg-gray-100 {
          background-color: #f3f4f6 !important;
        }

        /* Better spacing for touch targets */
        button,
        a,
        input,
        [role="button"],
        [role="link"] {
          min-height: 44px;
          min-width: 44px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 8px 12px;
        }

        /* Screen reader only content */
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }

        /* Ensure animations respect user preferences */
        .motion-reduce\\:animate-none {
          animation: none !important;
        }

        .motion-reduce\\:transition-none {
          transition: none !important;
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-pulse,
          .animate-spin,
          .animate-ping,
          .animate-bounce {
            animation: none !important;
          }
          
          .transition-all,
          .transition-colors,
          .transition-opacity,
          .transition-transform {
            transition: none !important;
          }
        }
      `}</style>

      {/* Skip Navigation Links */}
      <div className="sr-only">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <a href="#navigation" className="skip-link">
          Skip to navigation
        </a>
      </div>
    </>
  )
}

export default EnhancedAccessibility