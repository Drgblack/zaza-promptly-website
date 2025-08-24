'use client'

import { useState } from 'react'
import ScrollReveal from '@/components/animations/ScrollReveal'

const STRIPE_ENABLED = Boolean(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY)
const PRICE_ID_MONTHLY = process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_PROMPTLY_MONTHLY
const PRICE_ID_ANNUAL = process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_PROMPTLY_ANNUAL

interface Plan {
  name: string
  price: string
  period: string
  originalPrice?: string
  badge?: string
  priceId?: string
  features: string[]
  recommended?: boolean
}

const plans: { monthly: Plan[]; annual: Plan[] } = {
  monthly: [
    {
      name: 'Promptly Starter',
      price: '£14.99',
      period: 'month',
      priceId: PRICE_ID_MONTHLY,
      features: [
        'Unlimited student reports',
        'Personalized feedback generator', 
        'Parent communication templates',
        'Email support',
        '14-day free trial'
      ]
    },
    {
      name: 'Promptly Pro',
      price: '£149.99', 
      period: 'year',
      originalPrice: '£179.88',
      badge: 'Save £29.89',
      priceId: PRICE_ID_ANNUAL,
      recommended: true,
      features: [
        'Everything in Starter',
        'Advanced report analytics',
        'Priority support',
        'Bulk report generation',
        'Parent portal integration',
        '2 months free'
      ]
    }
  ],
  annual: [
    {
      name: 'Promptly Starter',
      price: '£14.99',
      period: 'month',
      priceId: PRICE_ID_MONTHLY,
      features: [
        'Unlimited student reports',
        'Personalized feedback generator',
        'Parent communication templates', 
        'Email support',
        '14-day free trial'
      ]
    },
    {
      name: 'Promptly Pro',
      price: '£149.99',
      period: 'year',
      originalPrice: '£179.88',
      badge: 'Save £29.89',
      priceId: PRICE_ID_ANNUAL,
      recommended: true,
      features: [
        'Everything in Starter',
        'Advanced report analytics',
        'Priority support',
        'Bulk report generation',
        'Parent portal integration',
        '2 months free'
      ]
    }
  ]
}

export default function PricingClient() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual')
  const [isLoading, setIsLoading] = useState<string | null>(null)

  const currentPlans = plans[billingCycle]

  const handleCheckout = async (priceId: string | undefined, planName: string) => {
    if (!priceId) return
    
    setIsLoading(planName)
    
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId,
          quantity: 1
        })
      })

      const data = await response.json()

      if (data.ok && data.url) {
        window.location.href = data.url
      } else if (data.reason === 'stripe_disabled') {
        // Fallback to waitlist if Stripe is disabled
        window.location.href = '/waitlist'
      } else {
        console.error('Checkout failed:', data)
        alert('Sorry, there was an error processing your request. Please try again.')
      }
    } catch (error) {
      console.error('Checkout error:', error)
      alert('Sorry, there was an error processing your request. Please try again.')
    } finally {
      setIsLoading(null)
    }
  }

  return (
    <section className="pb-20">
      <div className="container">
        <div className="max-w-6xl mx-auto">
          {/* Billing Toggle */}
          <ScrollReveal duration={0.22}>
            <div className="flex justify-center mb-16">
              <div className="inline-flex items-center bg-slate-800/50 rounded-full p-1">
                <button
                  onClick={() => setBillingCycle('monthly')}
                  className={`px-6 py-2 rounded-full font-medium transition-colors ${
                    billingCycle === 'monthly'
                      ? 'bg-purple-600 text-white'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setBillingCycle('annual')}
                  className={`px-6 py-2 rounded-full font-medium transition-colors ${
                    billingCycle === 'annual'
                      ? 'bg-purple-600 text-white'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  Annual
                </button>
              </div>
            </div>
          </ScrollReveal>

          {/* Dev Hint */}
          {process.env.NODE_ENV === 'development' && (
            <div className="mb-8 p-4 bg-amber-900/20 border border-amber-500/30 rounded-lg">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-amber-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="text-sm">
                  <p className="text-amber-300 font-medium mb-1">Development Mode</p>
                  <p className="text-amber-200">
                    {STRIPE_ENABLED 
                      ? '✅ Stripe is configured - checkout will work in test mode' 
                      : '⚠️ Stripe not configured - checkout buttons will redirect to waitlist'
                    }
                  </p>
                  <p className="text-amber-200 text-xs mt-1">
                    {STRIPE_ENABLED 
                      ? 'Use test card 4242 4242 4242 4242 with any future date and CVC'
                      : 'Add STRIPE_SECRET_KEY and STRIPE_PUBLIC_KEY to .env.local to enable checkout'
                    }
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Geo-pricing disclaimer */}
          <ScrollReveal duration={0.24} delay={0.08}>
            <div className="text-center mb-8">
              <p className="text-sm text-slate-400">
                * Prices shown in GBP. Final price may vary by location and currency.
              </p>
            </div>
          </ScrollReveal>

          {/* Pricing Cards */}
          <ScrollReveal duration={0.26} delay={0.1}>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {currentPlans.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-2xl shadow-card border p-6 relative ${
                  plan.recommended
                    ? 'border-purple-500/50 bg-purple-900/20'
                    : 'border-white/10 bg-slate-900/60'
                }`}
              >
                {/* Recommended Badge */}
                {plan.recommended && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <div className="bg-purple-600 text-white text-sm font-medium px-4 py-1 rounded-full">
                      Recommended
                    </div>
                  </div>
                )}

                {/* Savings Badge */}
                {plan.badge && (
                  <div className="absolute -top-3 right-4">
                    <div className="bg-green-600 text-white text-sm font-medium px-3 py-1 rounded-full">
                      {plan.badge}
                    </div>
                  </div>
                )}

                {/* Plan Header */}
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-semibold text-white mb-2">
                    {plan.name}
                  </h3>
                  
                  <div className="flex items-baseline justify-center gap-2">
                    <span className="text-4xl font-bold text-white">
                      {plan.price}
                    </span>
                    <span className="text-slate-400">
                      /{plan.period}
                    </span>
                  </div>

                  {plan.originalPrice && (
                    <div className="text-slate-400 text-sm mt-1">
                      <span className="line-through">{plan.originalPrice}/year</span>
                    </div>
                  )}
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-slate-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <button
                  onClick={() => handleCheckout(plan.priceId, plan.name)}
                  disabled={!STRIPE_ENABLED || isLoading === plan.name}
                  className={`w-full py-4 rounded-full font-semibold transition-all duration-[120ms] ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 animate-focus-ring ${
                    plan.recommended
                      ? 'bg-purple-600 hover:bg-purple-700 text-white shadow-lg hover:shadow-purple-600/25 focus:ring-purple-500/50'
                      : 'bg-white/10 hover:bg-white/20 text-white border border-white/20 focus:ring-slate-500/50'
                  } ${
                    !STRIPE_ENABLED || isLoading === plan.name
                      ? 'opacity-50 cursor-not-allowed'
                      : 'hover:scale-[1.02] active:scale-[0.98]'
                  }`}
                  title={!STRIPE_ENABLED ? 'Coming soon — join the waitlist' : undefined}
                >
                  {isLoading === plan.name ? (
                    <div className="flex items-center justify-center gap-2">
                      <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </div>
                  ) : STRIPE_ENABLED ? (
                    'Start Free Trial'
                  ) : (
                    'Join Waitlist'
                  )}
                </button>

                {STRIPE_ENABLED && (
                  <p className="text-center text-slate-400 text-sm mt-3">
                    14-day free trial • No credit card required • Cancel anytime
                  </p>
                )}
              </div>
            ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
