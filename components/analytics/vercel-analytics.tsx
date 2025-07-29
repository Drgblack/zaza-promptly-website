'use client'

// TODO: Re-enable once Vercel Analytics packages are properly installed
// import { Analytics } from '@vercel/analytics/react'
// import { SpeedInsights } from '@vercel/speed-insights/next'

export function VercelAnalytics() {
  const isProduction = process.env.NODE_ENV === 'production'
  
  if (!isProduction) {
    return (
      <div className="hidden">
        {/* Analytics disabled in development */}
        {process.env.NODE_ENV === 'development' && (
          <div className="fixed bottom-4 left-4 bg-blue-100 border border-blue-400 text-blue-800 px-3 py-2 rounded text-xs z-50">
            Vercel Analytics: Development Mode (Temporarily Disabled)
          </div>
        )}
      </div>
    )
  }

  // Temporarily disabled to fix build issues
  // Will re-enable once packages are properly resolved
  return (
    <div className="hidden">
      {/* Vercel Analytics temporarily disabled for build fix */}
      {/* <Analytics /> */}
      {/* <SpeedInsights /> */}
    </div>
  )
}