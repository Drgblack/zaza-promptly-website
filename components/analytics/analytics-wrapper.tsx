"use client"

import { Suspense } from 'react'
import { ComprehensiveAnalytics } from './comprehensive-analytics'

// Wrapper component to handle Suspense boundary for useSearchParams
function AnalyticsContent(props: any) {
  return <ComprehensiveAnalytics {...props} />
}

export function AnalyticsWrapper(props: any) {
  return (
    <Suspense fallback={null}>
      <AnalyticsContent {...props} />
    </Suspense>
  )
}