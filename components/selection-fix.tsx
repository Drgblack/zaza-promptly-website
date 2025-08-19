"use client"

import { useEffect } from "react"

export function SelectionFix() {
  useEffect(() => {
    // Neutralize any remaining selection blocking
    const enableSelection = () => {
      // Remove any lingering selectstart event listeners
      const handleSelectStart = (e: Event) => {
        // Allow selection on all elements except specific controls
        const target = e.target as HTMLElement
        if (target) {
          const isInteractiveControl = 
            target.tagName === 'BUTTON' ||
            target.role === 'button' ||
            target.closest('button') ||
            target.closest('[role="button"]') ||
            target.classList.contains('button') ||
            target.classList.contains('btn') ||
            target.closest('.button') ||
            target.closest('.btn') ||
            target.closest('.slider') ||
            target.closest('.carousel')
          
          if (isInteractiveControl) {
            e.preventDefault()
            return
          }
        }
        // Allow selection for everything else
      }

      // Override any existing selectstart listeners with our permissive one
      document.addEventListener('selectstart', handleSelectStart, { capture: true })

      // Enable context menu for copy operations
      const handleContextMenu = (e: MouseEvent) => {
        const target = e.target as HTMLElement
        if (target) {
          // Allow context menu on text content for copying
          const isTextContent = 
            target.tagName === 'P' ||
            target.tagName === 'SPAN' ||
            target.tagName === 'DIV' ||
            ['H1', 'H2', 'H3', 'H4', 'H5', 'H6'].includes(target.tagName) ||
            target.tagName === 'LI' ||
            target.tagName === 'BLOCKQUOTE' ||
            target.tagName === 'FIGCAPTION'
          
          if (isTextContent) {
            // Allow context menu for copy functionality
            return
          }
        }
      }

      // Add our context menu handler
      document.addEventListener('contextmenu', handleContextMenu, { capture: true })

      // Enable copy keyboard shortcuts
      const handleKeyDown = (e: KeyboardEvent) => {
        // Allow Ctrl+C (Cmd+C on Mac) for copying
        if ((e.ctrlKey || e.metaKey) && e.key === 'c') {
          return // Allow copy
        }
        // Allow Ctrl+A (Cmd+A on Mac) for select all
        if ((e.ctrlKey || e.metaKey) && e.key === 'a') {
          return // Allow select all
        }
      }

      document.addEventListener('keydown', handleKeyDown, { capture: true })

      // Cleanup function
      return () => {
        document.removeEventListener('selectstart', handleSelectStart, { capture: true })
        document.removeEventListener('contextmenu', handleContextMenu, { capture: true })
        document.removeEventListener('keydown', handleKeyDown, { capture: true })
      }
    }

    const cleanup = enableSelection()

    return cleanup
  }, [])

  return null
}