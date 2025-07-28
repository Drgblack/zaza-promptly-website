"use client"

import { useEffect } from "react"

export function SecurityHeaders() {
  useEffect(() => {
    // Disable right-click context menu (optional security measure)
    const handleContextMenu = (e: MouseEvent) => {
      // Allow right-click on specific elements like inputs and textareas
      const target = e.target as HTMLElement
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.tagName === 'SELECT') {
        return
      }
      e.preventDefault()
    }

    // Disable text selection on non-input elements (optional)
    const handleSelectStart = (e: Event) => {
      const target = e.target as HTMLElement
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.tagName === 'SELECT') {
        return
      }
      e.preventDefault()
    }

    // Prevent drag and drop of images (optional)
    const handleDragStart = (e: DragEvent) => {
      e.preventDefault()
    }

    // Add security event listeners
    document.addEventListener('contextmenu', handleContextMenu)
    document.addEventListener('selectstart', handleSelectStart)
    document.addEventListener('dragstart', handleDragStart)

    // Disable developer tools (basic attempt - can be bypassed)
    const handleKeyDown = (e: KeyboardEvent) => {
      // Disable F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
      if (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J')) ||
        (e.ctrlKey && e.key === 'u')
      ) {
        e.preventDefault()
        return false
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    // Cleanup function
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu)
      document.removeEventListener('selectstart', handleSelectStart)
      document.removeEventListener('dragstart', handleDragStart)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return null
}

// Generate Content Security Policy
function generateCSP(): string {
  const policies = [
    // Default source
    "default-src 'self'",
    
    // Script sources
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://js.stripe.com",
    
    // Style sources
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    
    // Font sources
    "font-src 'self' https://fonts.gstatic.com https://fonts.googleapis.com",
    
    // Image sources
    "img-src 'self' data: https: blob: https://www.google-analytics.com https://www.googletagmanager.com",
    
    // Connect sources (for API calls)
    "connect-src 'self' https://api.openai.com https://www.google-analytics.com https://analytics.google.com",
    
    // Frame sources
    "frame-src 'self' https://js.stripe.com https://hooks.stripe.com",
    
    // Object sources
    "object-src 'none'",
    
    // Base URI
    "base-uri 'self'",
    
    // Form action
    "form-action 'self'",
    
    // Frame ancestors (X-Frame-Options equivalent)
    "frame-ancestors 'self'",
    
    // Upgrade insecure requests
    "upgrade-insecure-requests",
    
    // Block mixed content
    "block-all-mixed-content"
  ]

  return policies.join('; ')
}

// Security utilities
export const SecurityUtils = {
  // Sanitize user input
  sanitizeInput: (input: string): string => {
    return input
      .replace(/[<>]/g, '') // Remove < and >
      .replace(/javascript:/gi, '') // Remove javascript: protocol
      .replace(/on\w+=/gi, '') // Remove event handlers
      .trim()
  },

  // Validate email format
  validateEmail: (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  },

  // Generate secure random string
  generateSecureToken: (length: number = 32): string => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let result = ''
    const randomArray = new Uint8Array(length)
    crypto.getRandomValues(randomArray)
    
    for (let i = 0; i < length; i++) {
      result += chars[randomArray[i] % chars.length]
    }
    
    return result
  },

  // Hash sensitive data
  hashData: async (data: string): Promise<string> => {
    const encoder = new TextEncoder()
    const dataBuffer = encoder.encode(data)
    const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
  },

  // Validate URL
  validateURL: (url: string): boolean => {
    try {
      const parsed = new URL(url)
      return ['http:', 'https:'].includes(parsed.protocol)
    } catch {
      return false
    }
  }
}

// Security monitoring
export function useSecurityMonitoring() {
  useEffect(() => {
    // Monitor for potential XSS attempts
    const monitorXSS = () => {
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === 'childList') {
            mutation.addedNodes.forEach((node) => {
              if (node.nodeType === Node.ELEMENT_NODE) {
                const element = node as Element
                const scripts = element.querySelectorAll('script')
                if (scripts.length > 0) {
                  console.warn('Potential XSS: Dynamic script injection detected')
                  // Report to security monitoring service
                  reportSecurityEvent('potential_xss', {
                    element: element.tagName,
                    location: window.location.href,
                    timestamp: new Date().toISOString()
                  })
                }
              }
            })
          }
        })
      })

      observer.observe(document.body, {
        childList: true,
        subtree: true
      })

      return () => observer.disconnect()
    }

    // Monitor for suspicious network requests
    const monitorNetworkRequests = () => {
      const originalFetch = window.fetch
      window.fetch = function(...args) {
        const url = typeof args[0] === 'string' ? args[0] : args[0].url
        
        // Check for suspicious patterns
        if (url.includes('javascript:') || url.includes('data:text/html')) {
          console.warn('Potential security issue: Suspicious fetch request detected')
          reportSecurityEvent('suspicious_fetch', {
            url,
            location: window.location.href,
            timestamp: new Date().toISOString()
          })
        }
        
        return originalFetch.apply(this, args)
      }
    }

    // Monitor for localStorage/sessionStorage access
    const monitorStorageAccess = () => {
      const originalSetItem = Storage.prototype.setItem
      Storage.prototype.setItem = function(key: string, value: string) {
        // Check for sensitive data patterns
        const sensitivePatterns = ['password', 'token', 'secret', 'key', 'auth']
        const isSensitive = sensitivePatterns.some(pattern => 
          key.toLowerCase().includes(pattern) || value.toLowerCase().includes(pattern)
        )
        
        if (isSensitive) {
          console.warn('Sensitive data being stored in localStorage/sessionStorage')
          reportSecurityEvent('sensitive_storage', {
            key,
            storageType: this === localStorage ? 'localStorage' : 'sessionStorage',
            location: window.location.href,
            timestamp: new Date().toISOString()
          })
        }
        
        return originalSetItem.call(this, key, value)
      }
    }

    // Initialize monitoring
    monitorXSS()
    monitorNetworkRequests()
    monitorStorageAccess()
  }, [])
}

// Report security events
function reportSecurityEvent(eventType: string, data: any) {
  // Send to security monitoring endpoint
  fetch('/api/security/monitor', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      eventType,
      data,
      userAgent: navigator.userAgent,
      timestamp: new Date().toISOString()
    })
  }).catch(() => {
    // Silently fail if security endpoint is not available
  })
}

// Security context provider
export function SecurityProvider({ children }: { children: React.ReactNode }) {
  useSecurityMonitoring()

  return (
    <>
      <SecurityHeaders />
      {children}
    </>
  )
} 