/*
 * Global Pricing Page with Currency Support
 * 
 * This component provides pricing for teachers and schools worldwide with multi-currency support.
 * 
 * Currency Handling:
 * - Supports USD, EUR, GBP with localStorage persistence
 * - URL parameter ?currency=usd|eur|gbp reflects current selection
 * - Prices defined in pricing object below with teacher-focused value props
 * - Currency preference saved to localStorage as 'pricing_currency'
 * 
 * Accessibility:
 * - Currency switcher uses radiogroup pattern with proper ARIA labels
 * - Semantic HTML with proper heading hierarchy (h2, h3)
 * - Focus-visible states for keyboard navigation
 * - Plan features use semantic lists with proper markup
 */

'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'

type Currency = 'usd' | 'eur' | 'gbp'

interface PricingData {
  symbol: string
  free: { price: string; period: string }
  pro: { 
    monthly: { price: string; period: string }
    annual: { price: string; period: string; originalPrice: string; savings: string }
  }
}

const PRICING: Record<Currency, PricingData> = {
  usd: {
    symbol: '$',
    free: { price: '0', period: 'Forever' },
    pro: { 
      monthly: { price: '15', period: 'month' },
      annual: { price: '12', period: 'month', originalPrice: '$180', savings: 'Save $36/year' }
    }
  },
  eur: {
    symbol: '€',
    free: { price: '0', period: 'Forever' },
    pro: { 
      monthly: { price: '15', period: 'month' },
      annual: { price: '12', period: 'month', originalPrice: '€180', savings: 'Save €36/year' }
    }
  },
  gbp: {
    symbol: '£',
    free: { price: '0', period: 'Forever' },
    pro: { 
      monthly: { price: '13', period: 'month' },
      annual: { price: '10', period: 'month', originalPrice: '£156', savings: 'Save £36/year' }
    }
  }
}

const CURRENCY_LABELS: Record<Currency, string> = {
  usd: 'USD ($)',
  eur: 'EUR (€)',
  gbp: 'GBP (£)'
}

export default function PricingClient() {
  const [currency, setCurrency] = useState<Currency>('usd')
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annual'>('annual')
  const [mounted, setMounted] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()

  // Initialize currency from URL params or localStorage
  useEffect(() => {
    const urlCurrency = searchParams.get('currency') as Currency
    const storedCurrency = (typeof window !== 'undefined' ? localStorage.getItem('pricing_currency') : null) as Currency

    let initialCurrency: Currency = 'usd'
    
    if (urlCurrency && ['usd', 'eur', 'gbp'].includes(urlCurrency)) {
      initialCurrency = urlCurrency
    } else if (storedCurrency && ['usd', 'eur', 'gbp'].includes(storedCurrency)) {
      initialCurrency = storedCurrency
    }

    setCurrency(initialCurrency)
    setMounted(true)

    // Update URL if different from current
    if (urlCurrency !== initialCurrency) {
      const url = new URL(window.location.href)
      url.searchParams.set('currency', initialCurrency)
      router.replace(url.pathname + url.search, { scroll: false })
    }
  }, [searchParams, router])

  const handleCurrencyChange = (newCurrency: Currency) => {
    setCurrency(newCurrency)
    
    // Save to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('pricing_currency', newCurrency)
    }
    
    // Update URL
    const url = new URL(window.location.href)
    url.searchParams.set('currency', newCurrency)
    router.replace(url.pathname + url.search, { scroll: false })
  }

  if (!mounted) {
    return (
      <div className="py-20 flex items-center justify-center">
        <div className="text-slate-400">Loading pricing...</div>
      </div>
    )
  }

  const pricing = PRICING[currency]

  return (
    <div className="py-20">
      <div className="container max-w-6xl mx-auto">
        {/* Currency Switcher */}
        <div className="flex justify-center mb-12">
          <fieldset className="bg-slate-800 border border-slate-700 rounded-lg p-1">
            <legend className="sr-only">Choose currency</legend>
            <div className="flex" role="radiogroup" aria-label="Currency selection">
              {(Object.keys(PRICING) as Currency[]).map((curr) => (
                <label
                  key={curr}
                  className={`relative flex items-center justify-center px-4 py-2 rounded-md cursor-pointer transition-all duration-200 ${
                    currency === curr 
                      ? 'bg-indigo-600 text-white shadow-sm' 
                      : 'text-slate-300 hover:text-white hover:bg-slate-700'
                  }`}
                >
                  <input
                    type="radio"
                    name="currency"
                    value={curr}
                    checked={currency === curr}
                    onChange={(e) => handleCurrencyChange(e.target.value as Currency)}
                    className="sr-only"
                    aria-label={`Select ${CURRENCY_LABELS[curr]}`}
                  />
                  <span className="font-medium text-sm">
                    {CURRENCY_LABELS[curr]}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>
        </div>

        {/* Billing Period Toggle */}
        <div className="flex justify-center mb-12">
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-1">
            <div className="flex">
              <button
                onClick={() => setBillingPeriod('monthly')}
                className={`relative px-6 py-2 rounded-md transition-all duration-200 text-sm font-medium ${
                  billingPeriod === 'monthly'
                    ? 'bg-slate-700 text-white shadow-sm'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingPeriod('annual')}
                className={`relative px-6 py-2 rounded-md transition-all duration-200 text-sm font-medium ${
                  billingPeriod === 'annual'
                    ? 'bg-slate-700 text-white shadow-sm'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                Annual
                <span className="ml-2 px-2 py-0.5 bg-green-600 text-green-100 text-xs rounded-full">
                  Save 20%
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Pricing Plans */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-6 max-w-4xl mx-auto">
          
          {/* Free Plan */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8 relative">
            <div className="text-center mb-8">
              <h3 className="text-xl font-semibold text-white mb-2">Free</h3>
              <p className="text-slate-400 text-sm mb-4">Perfect for trying out Promptly</p>
              <div className="mb-4">
                <span className="text-4xl font-bold text-white" data-testid="free-price">
                  {pricing.symbol}{pricing.free.price}
                </span>
                <span className="text-slate-400 ml-2">/{pricing.free.period.toLowerCase()}</span>
              </div>
            </div>

            <ul className="space-y-3 mb-8" role="list" aria-label="Free plan features">
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-slate-300 text-sm">5 student reports per month</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-slate-300 text-sm">Basic comment templates</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-slate-300 text-sm">Email support</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-slate-300 text-sm">Learning resources</span>
              </li>
            </ul>

            <Link
              href="/signup"
              className="w-full bg-slate-700 hover:bg-slate-600 text-white font-medium py-3 px-4 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-800 flex items-center justify-center"
            >
              Start Free Trial
            </Link>
          </div>

          {/* Pro Plan - Most Popular */}
          <div className="bg-gradient-to-b from-indigo-900/30 to-purple-900/30 border-2 border-indigo-500 rounded-2xl p-8 relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <span className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-medium px-4 py-1 rounded-full">
                Most Popular
              </span>
            </div>

            <div className="text-center mb-8">
              <h3 className="text-xl font-semibold text-white mb-2">Pro</h3>
              <p className="text-slate-400 text-sm mb-4">For individual teachers and small teams</p>
              <div className="mb-2">
                {billingPeriod === 'annual' && (
                  <div className="text-slate-400 text-sm mb-2">
                    <span className="line-through">{pricing.pro.annual.originalPrice}</span>
                  </div>
                )}
                <span className="text-4xl font-bold text-white" data-testid="pro-price">
                  {pricing.symbol}{billingPeriod === 'monthly' ? pricing.pro.monthly.price : pricing.pro.annual.price}
                </span>
                <span className="text-slate-400 ml-2">/{billingPeriod === 'monthly' ? pricing.pro.monthly.period : pricing.pro.annual.period}</span>
                {billingPeriod === 'annual' && (
                  <div className="text-xs text-slate-500 mt-1">
                    Billed annually
                  </div>
                )}
              </div>
              {billingPeriod === 'annual' && (
                <p className="text-sm text-green-400">{pricing.pro.annual.savings}</p>
              )}
              {billingPeriod === 'monthly' && (
                <p className="text-sm text-slate-400">Less than €0.50 per comment</p>
              )}
            </div>

            <ul className="space-y-3 mb-8" role="list" aria-label="Pro plan features">
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-slate-300 text-sm">Unlimited student reports</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-slate-300 text-sm">Advanced comment personalisation</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-slate-300 text-sm">Parent communication templates</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-slate-300 text-sm">Bulk report generation</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-slate-300 text-sm">Priority support</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-slate-300 text-sm">Advanced analytics dashboard</span>
              </li>
            </ul>

            <Link
              href="/signup"
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium py-3 px-4 rounded-lg transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-800 flex items-center justify-center"
            >
              Start Free Trial
            </Link>
            
            {/* Guarantee */}
            <div className="mt-6 p-4 bg-green-900/20 border border-green-500/30 rounded-lg">
              <div className="flex items-center justify-center mb-2">
                <svg className="w-5 h-5 text-green-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span className="text-green-300 font-semibold text-sm">Money-Back Guarantee</span>
              </div>
              <p className="text-green-200 text-xs text-center">
                If you don't save 5+ hours in month 1, we'll refund you. No questions asked.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Questions teachers ask us
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Get answers to common concerns about using AI in your teaching practice.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Left Column */}
            <div className="space-y-6">
              <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                <h3 className="text-white font-semibold mb-3 flex items-center">
                  <svg className="w-5 h-5 text-orange-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  What if the AI makes a mistake?
                </h3>
                <p className="text-slate-300 text-sm">
                  You stay in complete control. Every suggestion can be edited, and you always review before sending. 
                  Our AI acts as your writing assistant, not a replacement for your professional judgment.
                </p>
              </div>

              <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                <h3 className="text-white font-semibold mb-3 flex items-center">
                  <svg className="w-5 h-5 text-blue-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Will parents notice it's AI?
                </h3>
                <p className="text-slate-300 text-sm">
                  No. Our AI preserves your natural voice while improving clarity and tone. 
                  Parents receive professional, empathetic messages that sound authentically from you.
                </p>
              </div>

              <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                <h3 className="text-white font-semibold mb-3 flex items-center">
                  <svg className="w-5 h-5 text-purple-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Is my student data safe?
                </h3>
                <p className="text-slate-300 text-sm">
                  Absolutely. We're GDPR compliant, use enterprise-grade encryption, and never train our AI on your data. 
                  Your student information stays private and secure at all times.
                </p>
              </div>

              <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                <h3 className="text-white font-semibold mb-3 flex items-center">
                  <svg className="w-5 h-5 text-red-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Can I cancel anytime?
                </h3>
                <p className="text-slate-300 text-sm">
                  Yes, absolutely. One-click cancellation with no questions asked. 
                  Your account remains active until the end of your billing period, and you keep access to all your data.
                </p>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                <h3 className="text-white font-semibold mb-3 flex items-center">
                  <svg className="w-5 h-5 text-green-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  How much time will I actually save?
                </h3>
                <p className="text-slate-300 text-sm">
                  Most teachers save 3-5 hours per week. Report writing that used to take hours now takes minutes. 
                  Parent emails get written faster with better results. We guarantee 5+ hours saved in month 1 or full refund.
                </p>
              </div>

              <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                <h3 className="text-white font-semibold mb-3 flex items-center">
                  <svg className="w-5 h-5 text-yellow-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  How is this different from ChatGPT?
                </h3>
                <p className="text-slate-300 text-sm">
                  ChatGPT is general-purpose and can hallucinate. Promptly is education-specific with built-in safety, 
                  always appropriate tone, GDPR compliance, and costs less (€15 vs €20+).
                </p>
              </div>

              <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                <h3 className="text-white font-semibold mb-3 flex items-center">
                  <svg className="w-5 h-5 text-indigo-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                  </svg>
                  Do I need any technical skills?
                </h3>
                <p className="text-slate-300 text-sm">
                  None at all. If you can send an email, you can use Promptly. 
                  Type your draft, click improve, copy and paste. It's that simple.
                </p>
              </div>

              <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                <h3 className="text-white font-semibold mb-3 flex items-center">
                  <svg className="w-5 h-5 text-teal-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  What about different languages/regions?
                </h3>
                <p className="text-slate-300 text-sm">
                  Promptly supports 25+ languages and understands cultural contexts. 
                  Perfect for international schools or communicating with multilingual parent communities.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="text-center mt-12 pt-8 border-t border-slate-700">
          <p className="text-slate-400 text-sm mb-4">
            5 free comments every month • No credit card required • Cancel anytime
          </p>
          <div className="flex items-center justify-center gap-8 text-xs text-slate-500">
            <div className="flex items-center">
              <svg className="w-4 h-4 text-green-400 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              GDPR Compliant
            </div>
            <div className="flex items-center">
              <svg className="w-4 h-4 text-green-400 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Data Encrypted
            </div>
            <div className="flex items-center">
              <svg className="w-4 h-4 text-green-400 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              No AI Training on Your Data
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}