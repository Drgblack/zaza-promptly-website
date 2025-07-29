export interface SubscriptionTier {
  id: string
  name: string
  price: number
  currency: string
  interval: 'monthly' | 'yearly'
  features: FeatureLimit[]
  badge?: string
  popular?: boolean
  savings?: string
}

export interface FeatureLimit {
  feature: string
  limit: number | 'unlimited' | 'none'
  description: string
  proOnly?: boolean
}

export interface UserSubscription {
  tier: string
  isActive: boolean
  expiresAt?: Date
  usage: FeatureUsage
}

export interface FeatureUsage {
  commentsGenerated: number
  translationsUsed: number
  templatesAccessed: number
  reportsCreated: number
  lastResetDate: Date
}

// Subscription tiers configuration
export const SUBSCRIPTION_TIERS: SubscriptionTier[] = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    currency: 'USD',
    interval: 'monthly',
    features: [
      {
        feature: 'AI Comments',
        limit: 10,
        description: 'Generate up to 10 AI-powered comments per month'
      },
      {
        feature: 'Email Templates',
        limit: 5,
        description: 'Access to 5 basic email templates'
      },
      {
        feature: 'Language Support',
        limit: 1,
        description: 'English only'
      },
      {
        feature: 'Tone Options',
        limit: 2,
        description: 'Professional and Friendly tones'
      },
      {
        feature: 'Export Options',
        limit: 'none',
        description: 'Copy to clipboard only',
        proOnly: true
      },
      {
        feature: 'Priority Support',
        limit: 'none',
        description: 'Community support only',
        proOnly: true
      }
    ]
  },
  {
    id: 'pro-monthly',
    name: 'Pro',
    price: 9,
    currency: 'USD',
    interval: 'monthly',
    badge: 'Most Popular',
    popular: true,
    features: [
      {
        feature: 'AI Comments',
        limit: 'unlimited',
        description: 'Generate unlimited AI-powered comments'
      },
      {
        feature: 'Email Templates',
        limit: 'unlimited',
        description: 'Access to 50+ professional templates'
      },
      {
        feature: 'Language Support',
        limit: 'unlimited',
        description: 'All languages supported (5+ languages)'
      },
      {
        feature: 'Tone Options',
        limit: 'unlimited',
        description: 'All tone options (Professional, Friendly, Supportive, Direct, Encouraging)'
      },
      {
        feature: 'Export Options',
        limit: 'unlimited',
        description: 'PDF, Word, and direct integrations'
      },
      {
        feature: 'Priority Support',
        limit: 'unlimited',
        description: '24/7 priority email and chat support'
      },
      {
        feature: 'Analytics',
        limit: 'unlimited',
        description: 'Track time saved and communication patterns'
      }
    ]
  },
  {
    id: 'pro-yearly',
    name: 'Pro Yearly',
    price: 90,
    currency: 'USD',
    interval: 'yearly',
    badge: 'Best Value',
    savings: 'Save 17%',
    features: [
      {
        feature: 'AI Comments',
        limit: 'unlimited',
        description: 'Generate unlimited AI-powered comments'
      },
      {
        feature: 'Email Templates',
        limit: 'unlimited',
        description: 'Access to 50+ professional templates'
      },
      {
        feature: 'Language Support',
        limit: 'unlimited',
        description: 'All languages supported (5+ languages)'
      },
      {
        feature: 'Tone Options',
        limit: 'unlimited',
        description: 'All tone options available'
      },
      {
        feature: 'Export Options',
        limit: 'unlimited',
        description: 'PDF, Word, and direct integrations'
      },
      {
        feature: 'Priority Support',
        limit: 'unlimited',
        description: '24/7 priority email and chat support'
      },
      {
        feature: 'Analytics',
        limit: 'unlimited',
        description: 'Advanced analytics and insights'
      },
      {
        feature: 'Bonus Features',
        limit: 'unlimited',
        description: '2 months free + early access to new features'
      }
    ]
  }
]

// Feature gating utilities
export class FeatureGate {
  private userSubscription: UserSubscription

  constructor(userSubscription: UserSubscription) {
    this.userSubscription = userSubscription
  }

  canUseFeature(feature: string): boolean {
    const tier = this.getCurrentTier()
    const featureLimit = tier.features.find(f => f.feature === feature)
    
    if (!featureLimit) return false
    if (featureLimit.limit === 'unlimited') return true
    if (featureLimit.limit === 'none') return false
    
    const usage = this.getFeatureUsage(feature)
    return usage < (featureLimit.limit as number)
  }

  getFeatureUsage(feature: string): number {
    switch (feature) {
      case 'AI Comments':
        return this.userSubscription.usage.commentsGenerated
      case 'Email Templates':
        return this.userSubscription.usage.templatesAccessed
      case 'Translations':
        return this.userSubscription.usage.translationsUsed
      case 'Reports':
        return this.userSubscription.usage.reportsCreated
      default:
        return 0
    }
  }

  getFeatureLimit(feature: string): number | string {
    const tier = this.getCurrentTier()
    const featureLimit = tier.features.find(f => f.feature === feature)
    return featureLimit?.limit || 0
  }

  getRemainingUsage(feature: string): number | string {
    const limit = this.getFeatureLimit(feature)
    if (limit === 'unlimited') return 'unlimited'
    if (limit === 'none') return 0
    
    const usage = this.getFeatureUsage(feature)
    return Math.max(0, (limit as number) - usage)
  }

  getCurrentTier(): SubscriptionTier {
    return SUBSCRIPTION_TIERS.find(t => t.id === this.userSubscription.tier) || SUBSCRIPTION_TIERS[0]
  }

  isProUser(): boolean {
    return this.userSubscription.tier !== 'free' && this.userSubscription.isActive
  }

  getUpgradeReason(feature: string): string {
    const tier = this.getCurrentTier()
    const featureLimit = tier.features.find(f => f.feature === feature)
    
    if (!featureLimit || featureLimit.limit === 'none') {
      return `${feature} is available with Zaza Pro`
    }
    
    if (typeof featureLimit.limit === 'number') {
      const remaining = this.getRemainingUsage(feature)
      if (remaining === 0) {
        return `You've reached your ${feature.toLowerCase()} limit. Upgrade for unlimited access.`
      }
    }
    
    return `Upgrade to Pro for unlimited ${feature.toLowerCase()}`
  }
}

// Mock user subscription for development/testing
export const mockUserSubscription: UserSubscription = {
  tier: 'free',
  isActive: true,
  usage: {
    commentsGenerated: 7,
    translationsUsed: 3,
    templatesAccessed: 4,
    reportsCreated: 2,
    lastResetDate: new Date()
  }
}

// Utility to get feature gate instance
export function getFeatureGate(userSubscription?: UserSubscription): FeatureGate {
  return new FeatureGate(userSubscription || mockUserSubscription)
}

// Feature status types
export type FeatureStatus = 'available' | 'limited' | 'locked' | 'exceeded'

export function getFeatureStatus(feature: string, userSubscription?: UserSubscription): FeatureStatus {
  const gate = getFeatureGate(userSubscription)
  
  if (gate.isProUser()) return 'available'
  
  const canUse = gate.canUseFeature(feature)
  const limit = gate.getFeatureLimit(feature)
  
  if (limit === 'none') return 'locked'
  if (!canUse) return 'exceeded'
  
  return 'limited'
}