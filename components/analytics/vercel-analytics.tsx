'use client'

// CRITICAL FIX: Vercel deployment stuck on old commit 14c5b57
// That commit expects this file but doesn't have @vercel packages in package.json
// Creating no-op stub to satisfy import without external dependencies

export function VercelAnalytics() {
  // Disabled due to deployment sync issues
  // Will re-enable once Vercel syncs to latest commit with proper dependencies
  return null
}

export default VercelAnalytics