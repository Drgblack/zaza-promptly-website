'use client'

import { useState } from 'react'
import { X, Crown, Check, Zap, ArrowRight, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { SUBSCRIPTION_TIERS, getFeatureGate, type UserSubscription } from '@/lib/subscription-tiers'

interface UpgradeModalProps {
  isOpen: boolean
  onClose: () => void
  feature?: string
  userSubscription?: UserSubscription
}

export function UpgradeModal({ isOpen, onClose, feature, userSubscription }: UpgradeModalProps) {
  const [selectedPlan, setSelectedPlan] = useState('pro-monthly')
  const gate = getFeatureGate(userSubscription)
  
  if (!isOpen) return null

  const proMonthly = SUBSCRIPTION_TIERS.find(t => t.id === 'pro-monthly')!
  const proYearly = SUBSCRIPTION_TIERS.find(t => t.id === 'pro-yearly')!
  const freeTier = SUBSCRIPTION_TIERS.find(t => t.id === 'free')!

  const handleUpgrade = (planId: string) => {
    // Track upgrade attempt
    if (typeof window !== 'undefined' && (window as any).zazeAnalytics) {
      (window as any).zazeAnalytics.trackFeatureUse(`upgrade_attempt_${planId}`)
    }
    
    // Redirect to Stripe checkout
    window.location.href = `/api/stripe-checkout?plan=${planId}&feature=${feature || 'general'}`
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <Crown className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Upgrade to Zaza Pro</h2>
                <p className="text-sm text-gray-600">
                  {feature ? `Unlock unlimited ${feature.toLowerCase()} and more` : 'Unlock all premium features'}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="rounded-full h-8 w-8 p-0"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="p-6">
          {/* Feature Highlight */}
          {feature && (
            <div className="mb-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
              <div className="flex items-center space-x-3">
                <Zap className="w-5 h-5 text-purple-600" />
                <div>
                  <h3 className="font-medium text-gray-900">{feature} Limit Reached</h3>
                  <p className="text-sm text-gray-600">
                    {gate.getUpgradeReason(feature)}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Pricing Plans */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Monthly Plan */}
            <Card 
              className={`cursor-pointer transition-all duration-200 ${
                selectedPlan === 'pro-monthly' 
                  ? 'ring-2 ring-purple-500 border-purple-500' 
                  : 'border-gray-200 hover:border-purple-300'
              }`}
              onClick={() => setSelectedPlan('pro-monthly')}
            >
              <CardHeader className="text-center pb-4">
                {proMonthly.badge && (
                  <Badge className="mb-2 bg-purple-100 text-purple-800 border-purple-200">
                    {proMonthly.badge}
                  </Badge>
                )}
                <h3 className="text-lg font-bold text-gray-900">{proMonthly.name}</h3>
                <div className="text-3xl font-bold text-gray-900">
                  ${proMonthly.price}
                  <span className="text-lg text-gray-500 font-normal">/month</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {proMonthly.features.slice(0, 4).map((feature, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-600">{feature.description}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Yearly Plan */}
            <Card 
              className={`cursor-pointer transition-all duration-200 relative ${
                selectedPlan === 'pro-yearly' 
                  ? 'ring-2 ring-purple-500 border-purple-500' 
                  : 'border-gray-200 hover:border-purple-300'
              }`}
              onClick={() => setSelectedPlan('pro-yearly')}
            >
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                  <Star className="w-3 h-3 mr-1" />
                  {proYearly.savings}
                </Badge>
              </div>
              <CardHeader className="text-center pb-4">
                {proYearly.badge && (
                  <Badge className="mb-2 bg-green-100 text-green-800 border-green-200">
                    {proYearly.badge}
                  </Badge>
                )}
                <h3 className="text-lg font-bold text-gray-900">{proYearly.name}</h3>
                <div className="text-3xl font-bold text-gray-900">
                  ${Math.round(proYearly.price / 12)}
                  <span className="text-lg text-gray-500 font-normal">/month</span>
                </div>
                <div className="text-sm text-gray-500">
                  Billed annually (${proYearly.price})
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {proYearly.features.slice(0, 4).map((feature, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-600">{feature.description}</span>
                    </li>
                  ))}
                  <li className="flex items-start space-x-2">
                    <Star className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm font-medium text-green-600">2 months free!</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Feature Comparison */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
              What you'll get with Pro
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Zap className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-medium text-gray-900 mb-2">Unlimited Generation</h3>
                <p className="text-sm text-gray-600">No limits on AI comments, emails, or reports</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Crown className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-medium text-gray-900 mb-2">Premium Features</h3>
                <p className="text-sm text-gray-600">Advanced tones, templates, and export options</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Star className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-medium text-gray-900 mb-2">Priority Support</h3>
                <p className="text-sm text-gray-600">24/7 support and early access to new features</p>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center">
            <Button
              size="lg"
              onClick={() => handleUpgrade(selectedPlan)}
              className="w-full md:w-auto px-8 py-4 text-lg font-semibold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg"
            >
              Start Free Trial
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <p className="text-sm text-gray-500 mt-3">
              7-day free trial • Cancel anytime • No setup fees
            </p>
          </div>

          {/* Social Proof */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600 mb-4">
              Join 2,400+ teachers already using Zaza Pro
            </p>
            <div className="flex justify-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
              ))}
              <span className="text-sm text-gray-600 ml-2">4.9/5 from 500+ reviews</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}