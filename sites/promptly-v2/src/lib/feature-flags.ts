/**
 * Feature Flags System for Zaza Promptly
 * 
 * Simple, environment-based feature flags for controlling feature rollouts
 * and A/B testing without requiring external services.
 */

export interface FeatureFlag {
  name: string
  description: string
  enabled: boolean
  environment?: 'development' | 'production' | 'all'
  rolloutPercentage?: number
}

export interface FeatureFlagConfig {
  [key: string]: FeatureFlag
}

// Default feature flags configuration
export const DEFAULT_FEATURE_FLAGS: FeatureFlagConfig = {
  // Demo and onboarding features
  INTERACTIVE_DEMO: {
    name: 'Interactive Demo',
    description: 'Enable the interactive AI demo page with snippet tool',
    enabled: true,
    environment: 'all'
  },
  
  DEMO_TYPING_ANIMATION: {
    name: 'Demo Typing Animation',
    description: 'Show realistic typing animation in demo tool',
    enabled: true,
    environment: 'all'
  },

  // Resource features
  PDF_RESOURCES: {
    name: 'PDF Resources',
    description: 'Enable PDF downloads on resources page',
    enabled: true,
    environment: 'all'
  },

  RESOURCE_PREVIEW_IMAGES: {
    name: 'Resource Preview Images',
    description: 'Show preview images for PDF resources',
    enabled: false,
    environment: 'all'
  },

  // Navigation and UI features
  ENHANCED_NAVIGATION: {
    name: 'Enhanced Navigation',
    description: 'Show updated navigation with Resources and Demo links',
    enabled: true,
    environment: 'all'
  },

  MOBILE_MENU_V2: {
    name: 'Mobile Menu V2',
    description: 'Use improved mobile navigation design',
    enabled: false,
    environment: 'all'
  },

  // Content features
  BLOG_PAGINATION: {
    name: 'Blog Pagination',
    description: 'Enable pagination on blog pages',
    enabled: true,
    environment: 'all'
  },

  CASE_STUDY_COMMENTS: {
    name: 'Case Study Comments',
    description: 'Allow comments on case study pages',
    enabled: false,
    environment: 'development'
  },

  // Marketing and conversion features
  PRICING_COMPARISON: {
    name: 'Pricing Comparison',
    description: 'Show competitor comparison on pricing page',
    enabled: false,
    environment: 'all',
    rolloutPercentage: 50
  },

  FREE_TRIAL_BANNER: {
    name: 'Free Trial Banner',
    description: 'Show free trial promotion banner',
    enabled: true,
    environment: 'all'
  },

  // Experimental features
  AI_CHAT_SUPPORT: {
    name: 'AI Chat Support',
    description: 'Enable AI-powered chat support widget',
    enabled: false,
    environment: 'development'
  },

  DARK_MODE: {
    name: 'Dark Mode',
    description: 'Enable dark mode theme toggle',
    enabled: false,
    environment: 'development'
  },

  // Performance features
  IMAGE_OPTIMIZATION: {
    name: 'Image Optimization',
    description: 'Use optimized images and lazy loading',
    enabled: true,
    environment: 'all'
  },

  ADVANCED_CACHING: {
    name: 'Advanced Caching',
    description: 'Enable advanced caching strategies',
    enabled: false,
    environment: 'production'
  }
}

/**
 * Get current environment
 */
function getCurrentEnvironment(): 'development' | 'production' {
  return process.env.NODE_ENV === 'production' ? 'production' : 'development'
}

/**
 * Get user hash for consistent rollout percentages
 * Uses simple hash of user identifier or session
 */
function getUserHash(identifier?: string): number {
  const id = identifier || 'anonymous'
  let hash = 0
  for (let i = 0; i < id.length; i++) {
    const char = id.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash // Convert to 32-bit integer
  }
  return Math.abs(hash) % 100
}

/**
 * Check if a feature flag is enabled
 */
export function isFeatureEnabled(
  flagName: string, 
  userId?: string,
  customFlags?: FeatureFlagConfig
): boolean {
  const flags = customFlags || DEFAULT_FEATURE_FLAGS
  const flag = flags[flagName]
  
  if (!flag) {
    console.warn(`Feature flag '${flagName}' not found`)
    return false
  }

  // Check if flag is globally disabled
  if (!flag.enabled) {
    return false
  }

  // Check environment constraints
  const currentEnv = getCurrentEnvironment()
  if (flag.environment && flag.environment !== 'all' && flag.environment !== currentEnv) {
    return false
  }

  // Check rollout percentage
  if (flag.rolloutPercentage !== undefined) {
    const userHash = getUserHash(userId)
    return userHash < flag.rolloutPercentage
  }

  return true
}

/**
 * Get all enabled feature flags
 */
export function getEnabledFeatures(
  userId?: string,
  customFlags?: FeatureFlagConfig
): string[] {
  const flags = customFlags || DEFAULT_FEATURE_FLAGS
  return Object.keys(flags).filter(flagName => 
    isFeatureEnabled(flagName, userId, customFlags)
  )
}

/**
 * Get feature flag configuration
 */
export function getFeatureFlag(
  flagName: string,
  customFlags?: FeatureFlagConfig
): FeatureFlag | null {
  const flags = customFlags || DEFAULT_FEATURE_FLAGS
  return flags[flagName] || null
}

/**
 * Get all feature flags with their status
 */
export function getAllFeatureFlags(
  userId?: string,
  customFlags?: FeatureFlagConfig
): Array<FeatureFlag & { enabled: boolean; flagName: string }> {
  const flags = customFlags || DEFAULT_FEATURE_FLAGS
  
  return Object.entries(flags).map(([flagName, flag]) => ({
    ...flag,
    flagName,
    enabled: isFeatureEnabled(flagName, userId, customFlags)
  }))
}

/**
 * Create a feature flag hook for React components
 */
export function createFeatureFlag(flagName: string) {
  return function useFeatureFlag(userId?: string) {
    return isFeatureEnabled(flagName, userId)
  }
}

// Pre-defined feature flag hooks for common features
export const useInteractiveDemo = createFeatureFlag('INTERACTIVE_DEMO')
export const useDemoTypingAnimation = createFeatureFlag('DEMO_TYPING_ANIMATION')
export const usePDFResources = createFeatureFlag('PDF_RESOURCES')
export const useEnhancedNavigation = createFeatureFlag('ENHANCED_NAVIGATION')
export const useFreeTrialBanner = createFeatureFlag('FREE_TRIAL_BANNER')
export const useImageOptimization = createFeatureFlag('IMAGE_OPTIMIZATION')