'use client'

import React, { Component, ReactNode } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { RefreshCw, Home, MessageCircle, AlertTriangle } from 'lucide-react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
  errorInfo?: React.ErrorInfo
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
    
    this.setState({
      error,
      errorInfo
    })
    
    // Track error in analytics if available
    if (typeof window !== 'undefined' && (window as any).zazeAnalytics) {
      (window as any).zazeAnalytics.trackError('component_error', error.message)
    }
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="min-h-[400px] flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-100 rounded-lg">
          <div className="max-w-md w-full text-center px-6">
            {/* Error Icon */}
            <div className="mb-6">
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-red-500 to-orange-600 rounded-2xl flex items-center justify-center">
                <AlertTriangle className="text-white w-8 h-8" />
              </div>
            </div>

            {/* Error Message */}
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">
              Something went wrong
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed text-sm">
              This component encountered an unexpected error. 
              We've been notified and are working to fix it.
            </p>

            {/* Technical Details (in development) */}
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <div className="mb-6 p-3 bg-gray-100 rounded-lg text-left">
                <h3 className="font-semibold text-gray-800 mb-2 text-sm">Error Details:</h3>
                <pre className="text-xs text-gray-600 overflow-auto max-h-20">
                  {this.state.error.message}
                </pre>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button 
                onClick={() => window.location.reload()}
                className="w-full bg-red-600 hover:bg-red-700"
                size="sm"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Reload Page
              </Button>
              
              <div className="flex gap-2">
                <Button asChild variant="outline" className="flex-1" size="sm">
                  <Link href="/">
                    <Home className="w-4 h-4 mr-1" />
                    Home
                  </Link>
                </Button>
                
                <Button asChild variant="outline" className="flex-1" size="sm">
                  <Link href="/contact">
                    <MessageCircle className="w-4 h-4 mr-1" />
                    Report
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

// Hook-based error boundary for functional components
export function useErrorHandler() {
  return (error: Error, errorInfo?: React.ErrorInfo) => {
    console.error('Component error:', error, errorInfo)
    
    // Track error in analytics if available
    if (typeof window !== 'undefined' && (window as any).zazeAnalytics) {
      (window as any).zazeAnalytics.trackError('hook_error', error.message)
    }
  }
}

// Higher-order component for wrapping components with error boundary
export function withErrorBoundary<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  fallback?: ReactNode
) {
  const WithErrorBoundaryComponent = (props: P) => (
    <ErrorBoundary fallback={fallback}>
      <WrappedComponent {...props} />
    </ErrorBoundary>
  )
  
  WithErrorBoundaryComponent.displayName = `withErrorBoundary(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`
  
  return WithErrorBoundaryComponent
}