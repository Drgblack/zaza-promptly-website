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
  pro: { price: string; period: string; originalPrice: string; savings: string }
  school: { price: string; period: string }
}

const PRICING: Record<Currency, PricingData> = {
  usd: {
    symbol: '$',
    free: { price: '0', period: 'Forever' },
    pro: { price: '15', period: 'month', originalPrice: '18', savings: 'Save $36/year' },
    school: { price: '299', period: 'year' }
  },
  eur: {
    symbol: '€',
    free: { price: '0', period: 'Forever' },
    pro: { price: '14', period: 'month', originalPrice: '17', savings: 'Save €36/year' },
    school: { price: '279', period: 'year' }
  },
  gbp: {
    symbol: '£',
    free: { price: '0', period: 'Forever' },
    pro: { price: '12', period: 'month', originalPrice: '15', savings: 'Save £36/year' },
    school: { price: '249', period: 'year' }
  }
}

const CURRENCY_LABELS: Record<Currency, string> = {
  usd: 'USD ($)',
  eur: 'EUR (€)',
  gbp: 'GBP (£)'
}

export default function PricingClient() {
  const [currency, setCurrency] = useState<Currency>('usd')
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

        {/* Pricing Plans */}
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-6">
          
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
                <span className="text-4xl font-bold text-white" data-testid="pro-price">
                  {pricing.symbol}{pricing.pro.price}
                </span>
                <span className="text-slate-400 ml-2">/{pricing.pro.period}</span>
              </div>
              <p className="text-sm text-green-400">{pricing.pro.savings}</p>
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
          </div>

          {/* School Plan */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8 relative">
            <div className="text-center mb-8">
              <h3 className="text-xl font-semibold text-white mb-2">School</h3>
              <p className="text-slate-400 text-sm mb-4">For schools and education organisations</p>
              <div className="mb-4">
                <span className="text-4xl font-bold text-white" data-testid="school-price">
                  {pricing.symbol}{pricing.school.price}
                </span>
                <span className="text-slate-400 ml-2">/{pricing.school.period}</span>
              </div>
              <p className="text-sm text-slate-400">Up to 50 teachers</p>
            </div>

            <ul className="space-y-3 mb-8" role="list" aria-label="School plan features">
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-slate-300 text-sm">Everything in Pro</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-slate-300 text-sm">Multi-teacher dashboard</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-slate-300 text-sm">School-wide analytics</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-slate-300 text-sm">Admin controls and user management</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-slate-300 text-sm">Dedicated account manager</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-slate-300 text-sm">SLA and priority onboarding</span>
              </li>
            </ul>

            <Link
              href="/contact"
              className="w-full bg-slate-700 hover:bg-slate-600 text-white font-medium py-3 px-4 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-800 flex items-center justify-center"
            >
              Talk to Sales
            </Link>
          </div>
        </div>

        {/* Additional Info */}
        <div className="text-center mt-12 pt-8 border-t border-slate-700">
          <p className="text-slate-400 text-sm mb-4">
            All plans include a 14-day free trial. No credit card required.
          </p>
          <p className="text-slate-400 text-xs">
            * Pricing varies by region and currency. Contact us for local pricing information.
          </p>
        </div>
      </div>
    </div>
  )
}