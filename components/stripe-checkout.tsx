"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Check, Loader2, CreditCard, Shield, Users, Zap } from 'lucide-react'
import { useAnalytics } from '@/hooks/useAnalytics'

interface PricingTier {
  id: string
  name: string
  price: number
  currency: string
  interval: string
  description: string
  features: string[]
  stripePriceId?: string
  popular?: boolean
  available?: boolean
}

const pricingTiers: PricingTier[] = [
  {
    id: 'free',
    name: 'Free Trial',
    price: 0,
    currency: 'USD',
    interval: 'month',
    description: 'Perfect for trying out Promptly',
    features: [
      '5 AI-generated comments per month',
      'Basic parent communication templates',
      'GDPR-compliant data handling',
      'Email support',
      'No credit card required'
    ],
    available: true
  },
  {
    id: 'individual',
    name: 'Individual Teacher',
    price: 14.99,
    currency: 'USD',
    interval: 'month',
    description: 'Starting at $14.99/month (geo-pricing may vary)',
    features: [
      'Unlimited AI-generated comments',
      'Advanced parent communication templates',
      'Behavior and academic reporting',
      'Custom writing style learning',
      'Priority email support',
      'GDPR & school-safe compliance'
    ],
    stripePriceId: process.env.NODE_ENV === 'production' ? 'price_live_individual' : 'price_test_individual',
    popular: true,
    available: true
  },
  {
    id: 'school',
    name: 'School License',
    price: 8,
    currency: 'USD',
    interval: 'month',
    description: 'Per teacher/month (minimum 5 teachers)',
    features: [
      'Everything in Individual plan',
      'School-wide template sharing',
      'Admin dashboard and controls',
      'Bulk user management',
      'Custom training sessions',
      'Dedicated support manager',
      'Data processing agreements'
    ],
    stripePriceId: process.env.NODE_ENV === 'production' ? 'price_live_school' : 'price_test_school',
    available: true
  }
]

export function StripeCheckout({ 
  className = "",
  showTestNotice = true 
}: {
  className?: string
  showTestNotice?: boolean
}) {
  const [loading, setLoading] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const { trackEvent } = useAnalytics()

  const handleCheckout = async (tierId: string, priceId?: string) => {
    if (!priceId) {
      // Handle free tier or waitlist
      if (tierId === 'free') {
        trackEvent('free_trial_started', { tier: tierId })
        window.location.href = '/promptly?trial=true'
        return
      }
      return
    }

    setLoading(tierId)
    setError(null)

    try {
      trackEvent('checkout_initiated', { 
        tier: tierId, 
        price_id: priceId 
      })

      const response = await fetch('/api/stripe-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          priceId,
          mode: 'subscription',
          successUrl: `${window.location.origin}/checkout/success?tier=${tierId}`,
          cancelUrl: `${window.location.origin}/promptly-pricing?cancelled=true`
        })
      })

      if (!response.ok) {
        throw new Error('Failed to create checkout session')
      }

      const { url } = await response.json()
      window.location.href = url

    } catch (err) {
      console.error('Checkout error:', err)
      setError('Something went wrong. Please try again.')
      trackEvent('checkout_error', { 
        tier: tierId, 
        error: err instanceof Error ? err.message : 'Unknown error' 
      })
    } finally {
      setLoading(null)
    }
  }

  return (
    <div className={`max-w-6xl mx-auto ${className}`}>
      {showTestNotice && process.env.NODE_ENV !== 'production' && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
          <div className="flex items-center gap-2 text-yellow-800">
            <Shield className="w-5 h-5" />
            <p className="font-medium">Test Mode Active</p>
          </div>
          <p className="text-yellow-700 text-sm mt-1">
            This is a test environment. Use test card 4242 4242 4242 4242 for testing payments.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {pricingTiers.map((tier) => (
          <Card key={tier.id} className={`relative ${tier.popular ? 'ring-2 ring-purple-500 shadow-lg' : ''}`}>
            {tier.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </span>
              </div>
            )}
            
            <CardHeader>
              <CardTitle className="text-xl">{tier.name}</CardTitle>
              <div className="mt-4">
                <span className="text-4xl font-bold text-gray-900">
                  ${tier.price}
                </span>
                <span className="text-gray-600">
                  /{tier.interval}
                </span>
              </div>
              <p className="text-gray-600 text-sm mt-2">
                {tier.description}
              </p>
            </CardHeader>

            <CardContent>
              <ul className="space-y-3 mb-6">
                {tier.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                onClick={() => handleCheckout(tier.id, tier.stripePriceId)}
                disabled={loading === tier.id || !tier.available}
                className={`w-full ${
                  tier.popular 
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700' 
                    : 'bg-gray-900 hover:bg-gray-800'
                } text-white`}
              >
                {loading === tier.id ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Processing...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4" />
                    <span>
                      {tier.price === 0 ? 'Start Free Trial' : 'Get Started'}
                    </span>
                  </div>
                )}
              </Button>

              {tier.id === 'free' && (
                <p className="text-xs text-gray-500 text-center mt-2">
                  No credit card required
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mt-6">
          <p className="text-red-800 text-sm">{error}</p>
        </div>
      )}

      <div className="text-center mt-12">
        <div className="flex items-center justify-center gap-8 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            <span>GDPR Compliant</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            <span>12,000+ Teachers</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4" />
            <span>5+ Hours Saved Weekly</span>
          </div>
        </div>
        
        <p className="text-xs text-gray-500 mt-4 max-w-2xl mx-auto">
          All plans include 24/7 email support, regular feature updates, and our 30-day money-back guarantee. 
          School licenses include custom training and priority support.
        </p>
      </div>
    </div>
  )
}

// Simple pricing display for product pages
export function ProductPricing({ 
  productId, 
  className = "" 
}: { 
  productId: string
  className?: string 
}) {
  const tier = pricingTiers.find(t => t.id === productId) || pricingTiers[1]
  const [loading, setLoading] = useState(false)
  const { trackEvent } = useAnalytics()

  const handleQuickStart = () => {
    if (tier.price === 0) {
      trackEvent('quick_free_trial', { product: productId })
      window.location.href = '/promptly?trial=true'
    } else {
      trackEvent('quick_checkout_view', { product: productId })
      window.location.href = '/promptly-pricing'
    }
  }

  return (
    <div className={`bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-6 ${className}`}>
      <div className="text-center">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Ready to Start Saving Time?
        </h3>
        <div className="text-3xl font-bold text-gray-900 mb-1">
          ${tier.price}
          <span className="text-lg font-normal text-gray-600">/{tier.interval}</span>
        </div>
        <p className="text-sm text-gray-600 mb-6">{tier.description}</p>
        
        <div className="grid grid-cols-2 gap-2 text-xs text-gray-700 mb-6">
          {tier.features.slice(0, 4).map((feature, index) => (
            <div key={index} className="flex items-center gap-2">
              <Check className="w-3 h-3 text-green-500 flex-shrink-0" />
              <span>{feature}</span>
            </div>
          ))}
        </div>

        <Button
          onClick={handleQuickStart}
          disabled={loading}
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold"
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            tier.price === 0 ? 'Start Free Trial' : 'Get Started Today'
          )}
        </Button>
        
        <p className="text-xs text-gray-500 mt-3">
          {tier.price === 0 ? 'No credit card required' : '30-day money-back guarantee'}
        </p>
      </div>
    </div>
  )
}