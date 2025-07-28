"use client"

import React from "react"

import { useEffect } from "react"

interface ErrorInfo {
  error: Error
  errorInfo?: any
  userId?: string
  sessionId?: string
  additionalContext?: Record<string, any>
}

export function useErrorTracking() {
  useEffect(() => {
    // Global error handler
    const handleError = (event: ErrorEvent) => {
      trackError({
        error: new Error(event.message),
        additionalContext: {
          filename: event.filename,
          lineno: event.lineno,
          colno: event.colno,
          stack: event.error?.stack,
        },
      })
    }

    // Unhandled promise rejection handler
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      trackError({
        error: new Error(`Unhandled Promise Rejection: ${event.reason}`),
        additionalContext: {
          type: "unhandled_promise_rejection",
          reason: event.reason,
        },
      })
    }

    window.addEventListener("error", handleError)
    window.addEventListener("unhandledrejection", handleUnhandledRejection)

    return () => {
      window.removeEventListener("error", handleError)
      window.removeEventListener("unhandledrejection", handleUnhandledRejection)
    }
  }, [])

  const trackError = async (errorInfo: ErrorInfo) => {
    const { error, additionalContext = {} } = errorInfo

    // Get session information
    const sessionId = sessionStorage.getItem("session_id") || "unknown"
    const userId = localStorage.getItem("user_id") || "anonymous"

    const errorData = {
      message: error.message,
      stack: error.stack,
      name: error.name,
      timestamp: new Date().toISOString(),
      url: window.location.href,
      userAgent: navigator.userAgent,
      sessionId,
      userId,
      ...additionalContext,
    }

    try {
      // Send to internal error tracking
      await fetch("/api/analytics/error-tracking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(errorData),
      })

      // Track in Google Analytics
          if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "exception", {
          description: error.message,
          fatal: false,
          custom_parameter_1: error.name,
          custom_parameter_2: sessionId,
        })
      }

      // Send to Sentry (if configured)
      if (typeof window !== "undefined" && window.Sentry) {
        window.Sentry.captureException(error, {
          contexts: {
            additional: additionalContext,
          },
          tags: {
            sessionId,
            userId,
          },
        })
      }
    } catch (trackingError) {
      console.error("Error tracking failed:", trackingError)
    }
  }

  return { trackError }
}

// Error Boundary Component
export class ErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback?: React.ComponentType<{ error: Error }> },
  { hasError: boolean; error?: Error }
> {
  constructor(props: any) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: any) {
    // Track error
    if (typeof window !== "undefined") {
      const trackError = async () => {
        try {
          await fetch("/api/analytics/error-tracking", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              message: error.message,
              stack: error.stack,
              componentStack: errorInfo.componentStack,
              timestamp: new Date().toISOString(),
              url: window.location.href,
              type: "react_error_boundary",
            }),
          })
        } catch (e) {
          console.error("Error boundary tracking failed:", e)
        }
      }

      trackError()
    }
  }

  render() {
    if (this.state.hasError) {
      const FallbackComponent = this.props.fallback || DefaultErrorFallback
      return <FallbackComponent error={this.state.error!} />
    }

    return this.props.children
  }
}

function DefaultErrorFallback({ error }: { error: Error }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 text-center">
        <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
          <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Something went wrong</h2>
        <p className="text-gray-600 mb-4">We're sorry for the inconvenience. Please try refreshing the page.</p>
        <button
          onClick={() => window.location.reload()}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Refresh Page
        </button>
      </div>
    </div>
  )
}
