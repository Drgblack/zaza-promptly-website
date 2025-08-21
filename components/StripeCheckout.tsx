'use client'

import { useState } from 'react'

interface StripeCheckoutProps {
  priceId: string
  children: React.ReactNode
  className?: string
}

export default function StripeCheckout({ priceId, children, className }: StripeCheckoutProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleCheckout = async () => {
    if (!priceId) {
      setError('Price ID is required')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId,
          successUrl: `${window.location.origin}/success`,
          cancelUrl: `${window.location.origin}/cancel`,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong')
      }

      // Redirect to Stripe Checkout
      const stripe = (window as any).Stripe?.(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY)
      if (stripe) {
        const { error } = await stripe.redirectToCheckout({
          sessionId: data.sessionId,
        })

        if (error) {
          throw new Error(error.message)
        }
      } else {
        throw new Error('Stripe not loaded')
      }
    } catch (err) {
      console.error('Checkout error:', err)
      setError(err instanceof Error ? err.message : 'An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={className}>
      <button
        onClick={handleCheckout}
        disabled={loading || !priceId}
        className="w-full inline-flex justify-center items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors"
      >
        {loading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing...
          </>
        ) : (
          children
        )}
      </button>
      {error && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      )}
    </div>
  )
}