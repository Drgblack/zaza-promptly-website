import Stripe from 'stripe';

/**
 * Get a properly configured Stripe client instance
 * Returns null if STRIPE_SECRET_KEY is not configured to prevent build failures
 */
export function getStripe(): Stripe | null {
  const key = process.env.STRIPE_SECRET_KEY;
  
  // Check if key exists and is not a placeholder
  if (!key || key === 'sk_test_REPLACE_WITH_YOUR_STRIPE_SECRET_KEY' || key.trim() === '') {
    return null;
  }

  try {
    return new Stripe(key, {
      apiVersion: '2024-06-20', // Using stable API version
    });
  } catch (error) {
    console.error('Failed to initialize Stripe:', error);
    return null;
  }
}

/**
 * Check if Stripe is properly configured
 */
export function isStripeConfigured(): boolean {
  return getStripe() !== null;
}

/**
 * Get Stripe client or throw graceful error for API responses
 */
export function getStripeOrError(): { stripe: Stripe } | { error: string; status: number } {
  const stripe = getStripe();
  
  if (!stripe) {
    return {
      error: 'Payment processing is temporarily unavailable. Please try again later.',
      status: 503
    };
  }

  return { stripe };
}