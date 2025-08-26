'use client'

import { initiateCheckout } from '@/lib/checkout'

interface CheckoutButtonProps {
  plan: 'free' | 'pro' | 'bundle'
  className?: string
  children: React.ReactNode
}

export default function CheckoutButton({ plan, className, children }: CheckoutButtonProps) {
  const handleClick = () => {
    if (plan === 'free') {
      // Free plan goes directly to waitlist
      window.location.href = '/waitlist'
      return
    }
    
    // Pro and Bundle use Stripe checkout with fallback
    const priceId = plan === 'pro' ? 'price_pro_monthly' : 'price_bundle_monthly'
    initiateCheckout(priceId)
  }

  return (
    <button
      onClick={handleClick}
      className={className}
    >
      {children}
    </button>
  )
}