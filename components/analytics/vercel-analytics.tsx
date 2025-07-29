'use client'

import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

export function VercelAnalytics() {
  const isProduction = process.env.NODE_ENV === 'production'
  
  if (!isProduction) {
    return (
      <div className="hidden">
        {/* Analytics disabled in development */}
        {process.env.NODE_ENV === 'development' && (
          <div className="fixed bottom-4 left-4 bg-blue-100 border border-blue-400 text-blue-800 px-3 py-2 rounded text-xs z-50">
            Vercel Analytics: Development Mode
          </div>
        )}
      </div>
    )
  }

  return (
    <>
      {/* Vercel Analytics for page views and user behavior */}
      <Analytics />
      
      {/* Vercel Speed Insights for performance monitoring */}
      <SpeedInsights />
    </>
  )
}