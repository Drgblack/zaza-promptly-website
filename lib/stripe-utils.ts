// Stripe utility functions for checkout
export const createCheckoutSession = async (planType: 'pro-monthly' | 'pro-yearly' | 'pro' | 'bundle') => {
  try {
    const response = await fetch('/api/stripe-checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        plan: planType,
        successUrl: `${window.location.origin}/checkout/success`,
        cancelUrl: `${window.location.origin}/checkout/cancel`,
        // Add UTM tracking for analytics
        utm_source: 'website',
        utm_medium: 'pricing_page',
        utm_campaign: 'upgrade_to_pro'
      }),
    });

    const data = await response.json();

    if (response.ok && data.url) {
      // Redirect to Stripe Checkout
      window.location.href = data.url;
      return { success: true };
    } else {
      return { 
        success: false, 
        error: data.error || 'Unable to start checkout. Please try again.' 
      };
    }
  } catch (err) {
    return { 
      success: false, 
      error: 'Network error. Please check your connection and try again.' 
    };
  }
};

// Test the checkout session creation (for development)
export const testCheckoutSession = async () => {
  console.log('Testing Stripe checkout session...');
  
  // This will test with Stripe test keys
  const result = await createCheckoutSession('pro-monthly');
  
  if (result.success) {
    console.log('✅ Checkout session created successfully');
  } else {
    console.error('❌ Checkout session failed:', result.error);
  }
  
  return result;
};