'use client'

import { Suspense } from 'react'
import { ErrorBoundary } from './ErrorBoundary'

interface LoadingErrorBoundaryProps {
  children: React.ReactNode
  loadingFallback?: React.ReactNode
  errorFallback?: React.ReactNode
}

const DefaultLoadingFallback = () => (
  <div className="flex items-center justify-center p-8">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
  </div>
)

export function LoadingErrorBoundary({ 
  children, 
  loadingFallback = <DefaultLoadingFallback />,
  errorFallback 
}: LoadingErrorBoundaryProps) {
  return (
    <ErrorBoundary fallback={errorFallback}>
      <Suspense fallback={loadingFallback}>
        {children}
      </Suspense>
    </ErrorBoundary>
  )
}