'use client'

import { useEffect } from 'react'

export default function ClickDiagnostic() {
  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const link = target.closest('a')
      
      console.log('[Click Diagnostic] Document click:', {
        target: target.tagName,
        targetClasses: target.className,
        link: link?.href,
        linkTagName: link?.tagName,
        linkText: link?.textContent?.trim(),
        preventDefault: e.defaultPrevented,
        bubbles: e.bubbles,
        eventType: e.type
      })
      
      if (link && link.href && link.href.includes('/blog')) {
        console.log('[Click Diagnostic] Blog link clicked!', {
          href: link.href,
          preventDefault: e.defaultPrevented,
          target: e.target,
          currentTarget: e.currentTarget
        })
      }
    }
    
    // Listen in capture phase
    document.addEventListener('click', handleDocumentClick, true)
    
    return () => {
      document.removeEventListener('click', handleDocumentClick, true)
    }
  }, [])
  
  return null
}