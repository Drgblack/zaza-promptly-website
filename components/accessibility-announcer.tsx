"use client"

import { useEffect, useState } from "react"

interface AccessibilityAnnouncerProps {
  message?: string
  priority?: "polite" | "assertive"
  clearAfter?: number
}

export function AccessibilityAnnouncer({ 
  message, 
  priority = "polite", 
  clearAfter = 5000 
}: AccessibilityAnnouncerProps) {
  const [announcements, setAnnouncements] = useState<string[]>([])

  // Listen for custom accessibility events
  useEffect(() => {
    const handleAccessibilityEvent = (event: CustomEvent) => {
      const { message: eventMessage, priority: eventPriority = "polite" } = event.detail
      announceMessage(eventMessage, eventPriority)
    }

    window.addEventListener("accessibility-announce", handleAccessibilityEvent as EventListener)
    
    return () => {
      window.removeEventListener("accessibility-announce", handleAccessibilityEvent as EventListener)
    }
  }, [])

  // Announce a message
  const announceMessage = (msg: string, msgPriority: "polite" | "assertive" = "polite") => {
    setAnnouncements(prev => [...prev, msg])
    
    // Clear message after specified time
    setTimeout(() => {
      setAnnouncements(prev => prev.filter(announcement => announcement !== msg))
    }, clearAfter)
  }

  // Announce message prop if provided
  useEffect(() => {
    if (message) {
      announceMessage(message, priority)
    }
  }, [message, priority, clearAfter])

  return (
    <div
      aria-live={priority}
      aria-atomic="true"
      className="sr-only"
      role="status"
      aria-relevant="additions"
    >
      {announcements.map((announcement, index) => (
        <div key={index} className="sr-only">
          {announcement}
        </div>
      ))}
    </div>
  )
}

// Utility function to announce messages from anywhere in the app
export function announceToScreenReader(
  message: string, 
  priority: "polite" | "assertive" = "polite"
) {
  const event = new CustomEvent("accessibility-announce", {
    detail: { message, priority }
  })
  window.dispatchEvent(event)
}

// Hook for announcing messages
export function useAccessibilityAnnounce() {
  return {
    announce: announceToScreenReader,
    announcePolite: (message: string) => announceToScreenReader(message, "polite"),
    announceAssertive: (message: string) => announceToScreenReader(message, "assertive")
  }
}

// Component for announcing page changes
export function PageChangeAnnouncer() {
  const [currentPage, setCurrentPage] = useState("")

  useEffect(() => {
    const announcePageChange = () => {
      const pageTitle = document.title
      if (pageTitle !== currentPage) {
        setCurrentPage(pageTitle)
        announceToScreenReader(`Page loaded: ${pageTitle}`)
      }
    }

    // Announce on initial load
    announcePageChange()

    // Listen for navigation changes
    const observer = new MutationObserver(() => {
      announcePageChange()
    })

    observer.observe(document.head, {
      childList: true,
      subtree: true
    })

    return () => observer.disconnect()
  }, [currentPage])

  return null
}

// Component for announcing form status
export function FormStatusAnnouncer({ 
  isSubmitting, 
  isSuccess, 
  isError, 
  successMessage = "Form submitted successfully",
  errorMessage = "There was an error submitting the form"
}: {
  isSubmitting?: boolean
  isSuccess?: boolean
  isError?: boolean
  successMessage?: string
  errorMessage?: string
}) {
  useEffect(() => {
    if (isSubmitting) {
      announceToScreenReader("Form is being submitted", "polite")
    }
  }, [isSubmitting])

  useEffect(() => {
    if (isSuccess) {
      announceToScreenReader(successMessage, "assertive")
    }
  }, [isSuccess, successMessage])

  useEffect(() => {
    if (isError) {
      announceToScreenReader(errorMessage, "assertive")
    }
  }, [isError, errorMessage])

  return null
}

// Component for announcing loading states
export function LoadingAnnouncer({ 
  isLoading, 
  loadingMessage = "Loading content",
  completeMessage = "Content loaded"
}: {
  isLoading?: boolean
  loadingMessage?: string
  completeMessage?: string
}) {
  useEffect(() => {
    if (isLoading) {
      announceToScreenReader(loadingMessage, "polite")
    } else {
      announceToScreenReader(completeMessage, "polite")
    }
  }, [isLoading, loadingMessage, completeMessage])

  return null
}

// Component for announcing search results
export function SearchResultsAnnouncer({ 
  resultsCount, 
  searchTerm 
}: {
  resultsCount: number
  searchTerm: string
}) {
  useEffect(() => {
    if (resultsCount > 0) {
      announceToScreenReader(
        `Found ${resultsCount} results for "${searchTerm}"`,
        "polite"
      )
    } else {
      announceToScreenReader(
        `No results found for "${searchTerm}"`,
        "polite"
      )
    }
  }, [resultsCount, searchTerm])

  return null
}
