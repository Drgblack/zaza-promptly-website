'use client'

import { ReactNode } from 'react'
import { isFeatureEnabled, type FeatureFlagConfig } from '@/lib/feature-flags'

interface FeatureFlagProps {
  flag: string
  userId?: string
  customFlags?: FeatureFlagConfig
  children: ReactNode
  fallback?: ReactNode
}

/**
 * Component wrapper for conditional feature rendering
 * 
 * @example
 * <FeatureFlag flag="NEW_FEATURE">
 *   <NewFeatureComponent />
 * </FeatureFlag>
 * 
 * @example
 * <FeatureFlag flag="EXPERIMENTAL_UI" fallback={<OldUI />}>
 *   <NewUI />
 * </FeatureFlag>
 */
export function FeatureFlag({ 
  flag, 
  userId, 
  customFlags, 
  children, 
  fallback = null 
}: FeatureFlagProps) {
  const enabled = isFeatureEnabled(flag, userId, customFlags)
  
  if (enabled) {
    return <>{children}</>
  }
  
  return <>{fallback}</>
}

/**
 * Hook for feature flag usage in components
 */
export function useFeatureFlag(flag: string, userId?: string, customFlags?: FeatureFlagConfig) {
  return isFeatureEnabled(flag, userId, customFlags)
}

/**
 * Higher-order component for feature flag conditional rendering
 */
export function withFeatureFlag<P extends object>(
  flag: string,
  Component: React.ComponentType<P>,
  FallbackComponent?: React.ComponentType<P>
) {
  return function FeatureFlaggedComponent(props: P) {
    const enabled = isFeatureEnabled(flag)
    
    if (enabled) {
      return <Component {...props} />
    }
    
    if (FallbackComponent) {
      return <FallbackComponent {...props} />
    }
    
    return null
  }
}

/**
 * Debug component to show feature flag status (development only)
 */
export function FeatureFlagDebug({ userId, customFlags }: { 
  userId?: string 
  customFlags?: FeatureFlagConfig 
}) {
  if (process.env.NODE_ENV !== 'development') {
    return null
  }

  const { getAllFeatureFlags } = require('@/lib/feature-flags')
  const flags = getAllFeatureFlags(userId, customFlags)

  return (
    <div className="fixed bottom-4 right-4 bg-black/90 text-white p-4 rounded-lg max-w-sm text-xs font-mono z-50">
      <div className="font-bold mb-2">Feature Flags Debug</div>
      <div className="space-y-1 max-h-64 overflow-y-auto">
        {flags.map((flag) => (
          <div key={flag.flagName} className="flex items-center justify-between">
            <span className="truncate mr-2">{flag.flagName}</span>
            <span className={flag.enabled ? 'text-green-400' : 'text-red-400'}>
              {flag.enabled ? '✓' : '✗'}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}