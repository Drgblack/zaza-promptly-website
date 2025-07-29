'use client'

import { useState, useEffect } from 'react'
import { X, ArrowRight, Crown, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { getFeatureGate, type UserSubscription } from '@/lib/subscription-tiers'
import { UpgradeModal } from './UpgradeModal'

interface FloatingUpgradeCTAProps {
  userSubscription?: UserSubscription
  feature?: string
  message?: string
  showAfterDelay?: number // Show after X seconds
  className?: string
}

export function FloatingUpgradeCTA({ 
  userSubscription,
  feature,
  message,
  showAfterDelay = 0,
  className = ''
}: FloatingUpgradeCTAProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)
  
  const gate = getFeatureGate(userSubscription)
  const isProUser = gate.isProUser()

  useEffect(() => {
    // Don't run effect for Pro users
    if (isProUser) return
    // Check if user has dismissed this CTA recently
    const dismissedKey = `floating-cta-dismissed-${feature || 'general'}`
    const dismissed = localStorage.getItem(dismissedKey)
    const dismissedTime = dismissed ? parseInt(dismissed) : 0
    const oneHourAgo = Date.now() - (60 * 60 * 1000)
    
    if (dismissedTime > oneHourAgo) {
      setIsDismissed(true)
      return
    }

    // Show after delay
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, showAfterDelay)

    return () => clearTimeout(timer)
  }, [feature, showAfterDelay, isProUser])

  // Don't show to Pro users
  if (isProUser) return null

  const handleDismiss = () => {
    setIsVisible(false)
    setIsDismissed(true)
    
    // Remember dismissal for 1 hour
    const dismissedKey = `floating-cta-dismissed-${feature || 'general'}`
    localStorage.setItem(dismissedKey, Date.now().toString())
    
    // Track dismissal
    if (typeof window !== 'undefined' && (window as any).zazeAnalytics) {
      (window as any).zazeAnalytics.trackFeatureUse('floating_cta_dismissed')
    }
  }

  const handleUpgrade = () => {
    // Track click
    if (typeof window !== 'undefined' && (window as any).zazeAnalytics) {
      (window as any).zazeAnalytics.trackFeatureUse('floating_cta_clicked')
    }
    
    setShowUpgradeModal(true)
  }

  // Don't render if dismissed or not visible
  if (isDismissed || !isVisible) return null

  const defaultMessage = feature 
    ? `Unlock unlimited ${feature.toLowerCase()} with Zaza Pro`
    : 'Upgrade to Pro for unlimited access'

  return (
    <>
      <div className={`fixed bottom-4 left-4 right-4 z-40 animate-slide-up ${className}`}>
        <div className="max-w-md mx-auto">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl shadow-2xl p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3 flex-1">
                <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Crown className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <Badge className="bg-white bg-opacity-20 text-white border-white border-opacity-30 text-xs">
                      <Sparkles className="w-3 h-3 mr-1" />
                      Limited Time
                    </Badge>
                  </div>
                  <p className="text-sm font-medium text-white leading-tight">
                    {message || defaultMessage}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 ml-3">
                <Button
                  size="sm"
                  onClick={handleUpgrade}
                  className="bg-white text-purple-600 hover:bg-gray-100 font-medium px-3 py-1 h-8 text-xs"
                >
                  Upgrade
                  <ArrowRight className="w-3 h-3 ml-1" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handleDismiss}
                  className="text-white hover:bg-white hover:bg-opacity-20 p-1 h-8 w-8"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
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

// Smart CTA that appears based on user behavior
interface SmartUpgradeCTAProps {
  userSubscription?: UserSubscription
  triggerOnFeatureUse?: string[] // Show after using these features
  triggerAfterUsagePercent?: number // Show when user reaches X% of their limit
}

export function SmartUpgradeCTA({ 
  userSubscription,
  triggerOnFeatureUse = ['AI Comments'],
  triggerAfterUsagePercent = 80
}: SmartUpgradeCTAProps) {
  const [shouldShow, setShouldShow] = useState(false)
  const [triggeredFeature, setTriggeredFeature] = useState<string>()
  
  const gate = getFeatureGate(userSubscription)
  const isProUser = gate.isProUser()

  useEffect(() => {
    if (isProUser) return

    // Check if any feature is near its limit
    for (const feature of triggerOnFeatureUse) {
      const usage = gate.getFeatureUsage(feature)
      const limit = gate.getFeatureLimit(feature)
      
      if (typeof limit === 'number' && limit > 0) {
        const percentage = (usage / limit) * 100
        
        if (percentage >= triggerAfterUsagePercent) {
          setShouldShow(true)
          setTriggeredFeature(feature)
          break
        }
      }
    }
  }, [userSubscription, triggerOnFeatureUse, triggerAfterUsagePercent, isProUser, gate])

  if (!shouldShow || isProUser) return null

  const remaining = gate.getRemainingUsage(triggeredFeature!)
  const message = `Only ${remaining} ${triggeredFeature?.toLowerCase()} left this month`

  return (
    <FloatingUpgradeCTA
      userSubscription={userSubscription}
      feature={triggeredFeature}
      message={message}
      showAfterDelay={2000} // Show after 2 seconds
    />
  )
}

// Usage limit warning that appears inline
interface UsageWarningProps {
  feature: string
  userSubscription?: UserSubscription
  warningThreshold?: number // Show warning when X usages remaining
  className?: string
}

export function UsageWarning({ 
  feature, 
  userSubscription, 
  warningThreshold = 3,
  className = ''
}: UsageWarningProps) {
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)
  const gate = getFeatureGate(userSubscription)
  const remaining = gate.getRemainingUsage(feature)
  const isProUser = gate.isProUser()

  if (isProUser || typeof remaining !== 'number' || remaining > warningThreshold) {
    return null
  }

  const isLastUsage = remaining <= 1

  return (
    <>
      <div className={`p-3 rounded-lg border-2 transition-all duration-200 ${
        isLastUsage 
          ? 'bg-red-50 border-red-200' 
          : 'bg-yellow-50 border-yellow-200'
      } ${className}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${
              isLastUsage ? 'bg-red-500' : 'bg-yellow-500'
            }`} />
            <span className={`text-sm font-medium ${
              isLastUsage ? 'text-red-800' : 'text-yellow-800'
            }`}>
              {isLastUsage 
                ? `Last ${feature.toLowerCase()} this month!` 
                : `${remaining} ${feature.toLowerCase()} remaining`
              }
            </span>
          </div>
          <Button
            size="sm"
            onClick={() => setShowUpgradeModal(true)}
            className={`text-xs ${
              isLastUsage
                ? 'bg-red-600 hover:bg-red-700 text-white'
                : 'bg-yellow-600 hover:bg-yellow-700 text-white'
            }`}
          >
            Upgrade Now
          </Button>
        </div>
        <p className={`text-xs mt-1 ${
          isLastUsage ? 'text-red-600' : 'text-yellow-600'
        }`}>
          Upgrade to Pro for unlimited {feature.toLowerCase()}
        </p>
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