export async function initiateCheckout(priceId: string): Promise<void> {
  try {
    const response = await fetch('/api/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ priceId }),
    });

    if (!response.ok) {
      throw new Error('Checkout failed');
    }

    const data = await response.json();
    
    if (data.ok && data.url) {
      // Redirect to Stripe checkout
      window.location.href = data.url;
    } else {
      // Fallback to waitlist if Stripe is not configured
      window.location.href = '/waitlist';
    }
  } catch (error) {
    console.error('Checkout error:', error);
    // Fallback to waitlist on any error
    window.location.href = '/waitlist';
  }
}

// Price IDs - these should be configured in your Stripe dashboard
export const PRICE_IDS = {
  free: 'free', // Special case - redirects to free signup
  pro: process.env.NEXT_PUBLIC_STRIPE_PRICE_PRO || 'price_pro_monthly',
  bundle: process.env.NEXT_PUBLIC_STRIPE_PRICE_BUNDLE || 'price_bundle_monthly',
} as const;