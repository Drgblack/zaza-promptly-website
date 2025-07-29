'use client'

import { ReactNode, useState } from 'react'
import { Lock, Crown, Zap, ArrowRight, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { getFeatureGate, getFeatureStatus, type UserSubscription, type FeatureStatus } from '@/lib/subscription-tiers'
import { UpgradeModal } from './UpgradeModal'

interface FeatureGateProps {
  feature: string
  children: ReactNode
  userSubscription?: UserSubscription
  showUsageHint?: boolean
  className?: string
}

export function FeatureGate({ 
  feature, 
  children, 
  userSubscription, 
  showUsageHint = true,
  className = '' 
}: FeatureGateProps) {
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)
  const gate = getFeatureGate(userSubscription)
  const status = getFeatureStatus(feature, userSubscription)
  const remaining = gate.getRemainingUsage(feature)
  const isProUser = gate.isProUser()

  // Pro users get full access
  if (isProUser || status === 'available') {
    return <div className={className}>{children}</div>
  }

  // Feature is completely locked for free users
  if (status === 'locked') {
    return (
      <div className={`relative ${className}`}>
        <div className="relative">
          <div className="absolute inset-0 bg-gray-100 bg-opacity-90 backdrop-blur-sm z-10 rounded-lg flex items-center justify-center">
            <Card className="max-w-sm mx-auto border-2 border-purple-200 bg-white shadow-xl">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-3">
                  <Crown className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-lg text-gray-900">Pro Feature</h3>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 mb-4 text-sm">
                  {gate.getUpgradeReason(feature)}
                </p>
                <Button 
                  onClick={() => setShowUpgradeModal(true)}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                >
                  Upgrade to Pro
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </div>
          <div className="opacity-30 pointer-events-none">
            {children}
          </div>
        </div>
        <UpgradeModal 
          isOpen={showUpgradeModal}
          onClose={() => setShowUpgradeModal(false)}
          feature={feature}
        />
      </div>
    )
  }

  // Feature limit exceeded
  if (status === 'exceeded') {
    return (
      <div className={`relative ${className}`}>
        <div className="relative">
          <div className="absolute inset-0 bg-red-50 bg-opacity-95 z-10 rounded-lg flex items-center justify-center border-2 border-red-200">
            <Card className="max-w-sm mx-auto bg-white shadow-xl">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mb-3">
                  <Lock className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-lg text-gray-900">Limit Reached</h3>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 mb-4 text-sm">
                  {gate.getUpgradeReason(feature)}
                </p>
                <Button 
                  onClick={() => setShowUpgradeModal(true)}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                >
                  Upgrade Now
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </div>
          <div className="opacity-20 pointer-events-none">
            {children}
          </div>
        </div>
        <UpgradeModal 
          isOpen={showUpgradeModal}
          onClose={() => setShowUpgradeModal(false)}
          feature={feature}
        />
      </div>
    )
  }

  // Limited access - show usage hint
  return (
    <div className={`relative ${className}`}>
      {children}
      
      {showUsageHint && status === 'limited' && (
        <div className="mt-3 p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Zap className="w-4 h-4 text-purple-600" />
              <span className="text-sm text-gray-700">
                <span className="font-medium text-purple-600">{remaining}</span> {feature.toLowerCase()} remaining this month
              </span>
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setShowUpgradeModal(true)}
              className="border-purple-300 text-purple-600 hover:bg-purple-50"
            >
              Upgrade
            </Button>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Unlock unlimited {feature.toLowerCase()} with Zaza Pro
          </p>
        </div>
      )}
      
      <UpgradeModal 
        isOpen={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
        feature={feature}
      />
    </div>
  )
}

// Usage indicator component
interface UsageIndicatorProps {
  feature: string
  userSubscription?: UserSubscription
  className?: string
}

export function UsageIndicator({ feature, userSubscription, className = '' }: UsageIndicatorProps) {
  const gate = getFeatureGate(userSubscription)
  const usage = gate.getFeatureUsage(feature)
  const limit = gate.getFeatureLimit(feature)
  const remaining = gate.getRemainingUsage(feature)
  const isProUser = gate.isProUser()

  if (isProUser) {
    return (
      <div className={`flex items-center space-x-2 ${className}`}>
        <Crown className="w-4 h-4 text-purple-600" />
        <span className="text-sm text-purple-600 font-medium">Unlimited</span>
      </div>
    )
  }

  if (limit === 'none') {
    return (
      <div className={`flex items-center space-x-2 ${className}`}>
        <Lock className="w-4 h-4 text-gray-400" />
        <span className="text-sm text-gray-500">Pro Only</span>
      </div>
    )
  }

  const percentage = typeof limit === 'number' ? (usage / limit) * 100 : 0
  const isNearLimit = percentage > 80
  const isAtLimit = remaining === 0

  return (
    <div className={`${className}`}>
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm text-gray-600">{feature}</span>
        <span className={`text-sm font-medium ${
          isAtLimit ? 'text-red-600' : 
          isNearLimit ? 'text-yellow-600' : 
          'text-green-600'
        }`}>
          {usage}/{limit}
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className={`h-2 rounded-full transition-all duration-300 ${
            isAtLimit ? 'bg-red-500' :
            isNearLimit ? 'bg-yellow-500' :
            'bg-green-500'
          }`}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>
      {isNearLimit && (
        <p className="text-xs text-gray-500 mt-1">
          {isAtLimit ? 'Limit reached' : `${remaining} remaining`} - Upgrade for unlimited access
        </p>
      )}
    </div>
  )
}

// Feature comparison component
interface FeatureComparisonProps {
  feature: string
  userSubscription?: UserSubscription
}

export function FeatureComparison({ feature, userSubscription }: FeatureComparisonProps) {
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)
  const gate = getFeatureGate(userSubscription)
  const isProUser = gate.isProUser()
  const limit = gate.getFeatureLimit(feature)

  return (
    <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
      {/* Free Plan */}
      <div className="text-center">
        <h4 className="font-medium text-gray-900 mb-2">Free Plan</h4>
        <div className="space-y-2">
          {limit === 'none' ? (
            <div className="flex items-center justify-center text-red-500">
              <X className="w-4 h-4 mr-1" />
              <span className="text-sm">Not included</span>
            </div>
          ) : (
            <div className="text-2xl font-bold text-gray-600">
              {typeof limit === 'number' ? limit : '0'}
            </div>
          )}
        </div>
      </div>

      {/* Pro Plan */}
      <div className="text-center relative">
        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
          <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs">
            Recommended
          </Badge>
        </div>
        <h4 className="font-medium text-gray-900 mb-2">Pro Plan</h4>
        <div className="space-y-2">
          <div className="text-2xl font-bold text-purple-600">∞</div>
          <div className="text-sm text-gray-600">Unlimited</div>
        </div>
        {!isProUser && (
          <Button
            size="sm"
            onClick={() => setShowUpgradeModal(true)}
            className="w-full mt-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          >
            Upgrade Now
          </Button>
        )}
      </div>

      <UpgradeModal 
        isOpen={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
        feature={feature}
      />
    </div>
  )
}