'use client'

// TEMPORARY FIX: Vercel deployment stuck on old commit 14c5b57
// This file was deleted but Vercel won't sync to latest commit
// Creating minimal stub to satisfy imports until deployment sync resolves

import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

export function VercelAnalytics() {
  // Only render in production and if enabled
  if (process.env.NODE_ENV !== 'production') {
    return null
  }

  return (
    <>
      <Analytics />
      <SpeedInsights />
    </>
  )
}

export default VercelAnalytics