'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Settings, 
  ToggleLeft, 
  ToggleRight, 
  Eye,
  EyeOff,
  Info,
  RefreshCw
} from 'lucide-react'
import { 
  getAllFeatureFlags, 
  type FeatureFlag as FeatureFlagType,
  DEFAULT_FEATURE_FLAGS 
} from '@/lib/feature-flags'

interface ExtendedFeatureFlag extends FeatureFlagType {
  flagName: string
  enabled: boolean
}

/**
 * Development-only admin interface for feature flags
 * Only visible in development environment
 */
export function FeatureFlagAdmin() {
  const [flags, setFlags] = useState<ExtendedFeatureFlag[]>([])
  const [isVisible, setIsVisible] = useState(false)
  const [localOverrides, setLocalOverrides] = useState<Record<string, boolean>>({})

  useEffect(() => {
    // Only show in development
    if (process.env.NODE_ENV !== 'development') {
      return
    }

    // Load feature flags
    loadFeatureFlags()

    // Load local overrides from localStorage
    const saved = localStorage.getItem('feature-flag-overrides')
    if (saved) {
      try {
        setLocalOverrides(JSON.parse(saved))
      } catch (error) {
        console.error('Failed to parse saved feature flag overrides:', error)
      }
    }
  }, [])

  const loadFeatureFlags = () => {
    const allFlags = getAllFeatureFlags()
    setFlags(allFlags)
  }

  const toggleOverride = (flagName: string) => {
    const newOverrides = {
      ...localOverrides,
      [flagName]: !localOverrides[flagName]
    }
    
    setLocalOverrides(newOverrides)
    localStorage.setItem('feature-flag-overrides', JSON.stringify(newOverrides))
    
    // Reload flags to reflect changes
    loadFeatureFlags()
  }

  const clearOverrides = () => {
    setLocalOverrides({})
    localStorage.removeItem('feature-flag-overrides')
    loadFeatureFlags()
  }

  const getEnvironmentColor = (env?: string) => {
    switch (env) {
      case 'development': return 'bg-blue-100 text-blue-800'
      case 'production': return 'bg-green-100 text-green-800'
      case 'all': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  // Don't render in production
  if (process.env.NODE_ENV !== 'development') {
    return null
  }

  return (
    <>
      {/* Toggle Button */}
      <Button
        onClick={() => setIsVisible(!isVisible)}
        className="fixed bottom-4 left-4 z-50 bg-purple-600 hover:bg-purple-700"
        size="sm"
      >
        {isVisible ? <EyeOff className="w-4 h-4 mr-1" /> : <Eye className="w-4 h-4 mr-1" />}
        Flags
      </Button>

      {/* Admin Panel */}
      {isVisible && (
        <div className="fixed inset-y-4 right-4 w-96 bg-white border border-gray-200 rounded-lg shadow-lg z-40 overflow-hidden flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-gray-200 bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Settings className="w-5 h-5 mr-2 text-purple-600" />
                <h3 className="font-semibold text-gray-900">Feature Flags</h3>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  onClick={clearOverrides}
                  variant="outline"
                  size="sm"
                  className="text-xs"
                >
                  Clear Overrides
                </Button>
                <Button
                  onClick={() => setIsVisible(false)}
                  variant="outline"
                  size="sm"
                  className="text-xs"
                >
                  ×
                </Button>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Development environment only
            </p>
          </div>

          {/* Feature Flags List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {flags.map((flag) => {
              const hasOverride = localOverrides.hasOwnProperty(flag.flagName)
              const effectivelyEnabled = hasOverride 
                ? localOverrides[flag.flagName] 
                : flag.enabled

              return (
                <Card key={flag.flagName} className="text-xs">
                  <CardContent className="p-3">
                    {/* Flag Header */}
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-gray-900 truncate">
                            {flag.name}
                          </span>
                          {hasOverride && (
                            <Badge variant="outline" className="text-xs px-1 py-0">
                              Override
                            </Badge>
                          )}
                        </div>
                        <p className="text-gray-600 text-xs leading-relaxed">
                          {flag.description}
                        </p>
                      </div>
                      
                      <Button
                        onClick={() => toggleOverride(flag.flagName)}
                        variant="outline"
                        size="sm"
                        className="ml-2 p-1 h-auto"
                      >
                        {effectivelyEnabled ? (
                          <ToggleRight className="w-5 h-5 text-green-600" />
                        ) : (
                          <ToggleLeft className="w-5 h-5 text-gray-400" />
                        )}
                      </Button>
                    </div>

                    {/* Flag Details */}
                    <div className="flex items-center gap-2 text-xs">
                      <Badge 
                        variant="outline" 
                        className={`${getEnvironmentColor(flag.environment)} text-xs px-1 py-0`}
                      >
                        {flag.environment || 'all'}
                      </Badge>
                      
                      {flag.rolloutPercentage !== undefined && (
                        <Badge variant="outline" className="text-xs px-1 py-0">
                          {flag.rolloutPercentage}% rollout
                        </Badge>
                      )}
                      
                      <Badge 
                        variant={effectivelyEnabled ? "default" : "secondary"} 
                        className="text-xs px-1 py-0"
                      >
                        {effectivelyEnabled ? 'ON' : 'OFF'}
                      </Badge>
                    </div>

                    {/* Flag Name (Technical) */}
                    <div className="mt-2 pt-2 border-t border-gray-100">
                      <code className="text-xs text-gray-500 font-mono">
                        {flag.flagName}
                      </code>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200 bg-gray-50">
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>{flags.length} flags total</span>
              <Button
                onClick={loadFeatureFlags}
                variant="outline"
                size="sm"
                className="text-xs"
              >
                <RefreshCw className="w-3 h-3 mr-1" />
                Refresh
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}