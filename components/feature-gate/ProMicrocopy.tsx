'use client'

import { useState } from 'react'
import { Crown, Sparkles, ArrowRight, Zap, Lock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { getFeatureGate, type UserSubscription } from '@/lib/subscription-tiers'
import { UpgradeModal } from './UpgradeModal'

interface ProMicrocopyProps {
  feature: string
  userSubscription?: UserSubscription
  variant?: 'subtle' | 'prominent' | 'inline'
  customMessage?: string
  showUpgradeButton?: boolean
  className?: string
}

export function ProMicrocopy({ 
  feature,
  userSubscription,
  variant = 'subtle',
  customMessage,
  showUpgradeButton = true,
  className = ''
}: ProMicrocopyProps) {
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)
  const gate = getFeatureGate(userSubscription)
  const isProUser = gate.isProUser()
  const remaining = gate.getRemainingUsage(feature)

  // Don't show to Pro users
  if (isProUser) return null

  const defaultMessages = {
    'AI Comments': 'Unlock unlimited comment generation with Zaza Pro',
    'Email Templates': 'Access 50+ premium templates with Pro',
    'Language Support': 'Translate to any language with Pro',
    'Tone Options': 'Choose from 5+ tone styles with Pro',
    'Export Options': 'Export to PDF and Word with Pro',
    'Analytics': 'Track your time savings with Pro'
  }

  const message = customMessage || defaultMessages[feature as keyof typeof defaultMessages] || `Unlock unlimited ${feature.toLowerCase()} with Zaza Pro`

  // Subtle variant - small text under buttons/inputs
  if (variant === 'subtle') {
    return (
      <>
        <div className={`flex items-center justify-between text-xs text-gray-500 mt-2 ${className}`}>
          <div className="flex items-center space-x-1">
            <Crown className="w-3 h-3 text-purple-400" />
            <span>{message}</span>
          </div>
          {showUpgradeButton && (
            <button
              onClick={() => setShowUpgradeModal(true)}
              className="text-purple-600 hover:text-purple-700 font-medium underline"
            >
              Upgrade
            </button>
          )}
        </div>
        <UpgradeModal 
          isOpen={showUpgradeModal}
          onClose={() => setShowUpgradeModal(false)}
          feature={feature}
          userSubscription={userSubscription}
        />
      </>
    )
  }

  // Prominent variant - noticeable call-out box
  if (variant === 'prominent') {
    return (
      <>
        <div className={`p-3 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg mt-3 ${className}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <Crown className="w-3 h-3 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">{message}</p>
                <p className="text-xs text-gray-500">
                  {typeof remaining === 'number' && remaining > 0 
                    ? `${remaining} uses remaining this month`
                    : 'Join 2,400+ teachers already using Pro'
                  }
                </p>
              </div>
            </div>
            {showUpgradeButton && (
              <Button
                size="sm"
                onClick={() => setShowUpgradeModal(true)}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
              >
                Upgrade
                <ArrowRight className="w-3 h-3 ml-1" />
              </Button>
            )}
          </div>
        </div>
        <UpgradeModal 
          isOpen={showUpgradeModal}
          onClose={() => setShowUpgradeModal(false)}
          feature={feature}
          userSubscription={userSubscription}
        />
      </>
    )
  }

  // Inline variant - appears within the flow
  return (
    <>
      <div className={`inline-flex items-center space-x-1 text-sm text-gray-600 ${className}`}>
        <Sparkles className="w-3 h-3 text-purple-500" />
        <span>{message}</span>
        {showUpgradeButton && (
          <button
            onClick={() => setShowUpgradeModal(true)}
            className="text-purple-600 hover:text-purple-700 font-medium ml-1"
          >
            Learn more
          </button>
        )}
      </div>
      <UpgradeModal 
        isOpen={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
        feature={feature}
        userSubscription={userSubscription}
      />
    </>
  )
}

// Feature benefit callouts for specific actions
interface FeatureBenefitProps {
  feature: string
  benefit: string
  userSubscription?: UserSubscription
  icon?: React.ReactNode
  className?: string
}

export function FeatureBenefit({ 
  feature, 
  benefit, 
  userSubscription, 
  icon,
  className = ''
}: FeatureBenefitProps) {
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)
  const gate = getFeatureGate(userSubscription)
  const isProUser = gate.isProUser()

  if (isProUser) return null

  return (
    <>
      <div className={`flex items-start space-x-2 p-3 bg-blue-50 border border-blue-200 rounded-lg ${className}`}>
        <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
          {icon || <Zap className="w-3 h-3 text-blue-600" />}
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium text-blue-900 mb-1">Pro Tip</p>
          <p className="text-sm text-blue-700 mb-2">{benefit}</p>
          <Button
            size="sm"
            onClick={() => setShowUpgradeModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white text-xs"
          >
            Upgrade to unlock
          </Button>
        </div>
      </div>
      <UpgradeModal 
        isOpen={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
        feature={feature}
        userSubscription={userSubscription}
      />
    </>
  )
}

// Locked feature teaser
interface LockedFeatureTeaserProps {
  feature: string
  description: string
  userSubscription?: UserSubscription
  className?: string
}

export function LockedFeatureTeaser({ 
  feature, 
  description, 
  userSubscription,
  className = ''
}: LockedFeatureTeaserProps) {
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)
  const gate = getFeatureGate(userSubscription)
  const isProUser = gate.isProUser()

  if (isProUser) return null

  return (
    <>
      <div className={`p-4 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 ${className}`}>
        <div className="text-center">
          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-3">
            <Lock className="w-5 h-5 text-gray-400" />
          </div>
          <h4 className="font-medium text-gray-900 mb-2">{feature}</h4>
          <p className="text-sm text-gray-600 mb-3">{description}</p>
          <Button
            size="sm"
            onClick={() => setShowUpgradeModal(true)}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
          >
            <Crown className="w-3 h-3 mr-1" />
            Unlock with Pro
          </Button>
        </div>
      </div>
      <UpgradeModal 
        isOpen={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
        feature={feature}
        userSubscription={userSubscription}
      />
    </>
  )
}

// Usage-based microcopy that adapts to user's current usage
interface AdaptiveMicrocopyProps {
  feature: string
  userSubscription?: UserSubscription
  className?: string
}

export function AdaptiveMicrocopy({ 
  feature, 
  userSubscription,
  className = ''
}: AdaptiveMicrocopyProps) {
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)
  const gate = getFeatureGate(userSubscription)
  const isProUser = gate.isProUser()
  const remaining = gate.getRemainingUsage(feature)
  const usage = gate.getFeatureUsage(feature)
  const limit = gate.getFeatureLimit(feature)

  if (isProUser) return null

  // Determine message based on usage
  let message = ''
  let urgency: 'low' | 'medium' | 'high' = 'low'

  if (typeof remaining === 'number' && typeof limit === 'number') {
    const percentage = (usage / limit) * 100
    
    if (remaining === 0) {
      message = `${feature} limit reached. Upgrade for unlimited access.`
      urgency = 'high'
    } else if (percentage >= 80) {
      message = `Only ${remaining} ${feature.toLowerCase()} left this month.`
      urgency = 'high'
    } else if (percentage >= 60) {
      message = `${remaining} ${feature.toLowerCase()} remaining. Upgrade for unlimited access.`
      urgency = 'medium'
    } else {
      message = `Unlock unlimited ${feature.toLowerCase()} with Zaza Pro.`
      urgency = 'low'
    }
  }

  const urgencyStyles = {
    low: 'bg-purple-50 border-purple-200 text-purple-700',
    medium: 'bg-yellow-50 border-yellow-200 text-yellow-700',
    high: 'bg-red-50 border-red-200 text-red-700'
  }

  return (
    <>
      <div className={`flex items-center justify-between p-2 border rounded text-xs ${urgencyStyles[urgency]} ${className}`}>
        <div className="flex items-center space-x-1">
          <Crown className="w-3 h-3" />
          <span>{message}</span>
        </div>
        <button
          onClick={() => setShowUpgradeModal(true)}
          className="font-medium underline hover:no-underline"
        >
          Upgrade
        </button>
      </div>
      <UpgradeModal 
        isOpen={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
        feature={feature}
        userSubscription={userSubscription}
      />
    </>
  )
}