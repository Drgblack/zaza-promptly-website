import Stripe from 'stripe';

/**
 * Stripe environment configuration helper
 * Automatically switches between test and live keys based on environment
 */

export interface StripeConfig {
  publishableKey: string;
  secretKey: string;
  webhookSecret?: string;
  isLive: boolean;
  environment: 'development' | 'preview' | 'production';
}

/**
 * Get the appropriate Stripe configuration based on environment
 */
export function getStripeConfig(): StripeConfig | null {
  const env = process.env.VERCEL_ENV || process.env.NODE_ENV || 'development';
  const isProduction = env === 'production';

  // Environment-specific key selection
  let publishableKey: string | undefined;
  let secretKey: string | undefined;
  let webhookSecret: string | undefined;

  if (isProduction) {
    // Production: Use live keys
    publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || process.env.STRIPE_LIVE_PUBLISHABLE_KEY;
    secretKey = process.env.STRIPE_SECRET_KEY || process.env.STRIPE_LIVE_SECRET_KEY;
    webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || process.env.STRIPE_LIVE_WEBHOOK_SECRET;
  } else {
    // Development/Preview: Use test keys
    publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || process.env.STRIPE_TEST_PUBLISHABLE_KEY;
    secretKey = process.env.STRIPE_SECRET_KEY || process.env.STRIPE_TEST_SECRET_KEY;
    webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || process.env.STRIPE_TEST_WEBHOOK_SECRET;
  }

  // Validate required keys
  if (!publishableKey || !secretKey) {
    return null;
  }

  // Validate key formats
  const isLiveKey = secretKey.startsWith('sk_live_');
  const isTestKey = secretKey.startsWith('sk_test_');
  
  if (!isLiveKey && !isTestKey) {
    console.warn('Stripe secret key format is invalid');
    return null;
  }

  // Ensure we're using the right type of keys for the environment
  if (isProduction && !isLiveKey) {
    console.warn('Using test keys in production environment');
  }

  return {
    publishableKey,
    secretKey,
    webhookSecret,
    isLive: isLiveKey,
    environment: env as 'development' | 'preview' | 'production'
  };
}

/**
 * Get a properly configured Stripe client instance
 * Returns null if configuration is invalid to prevent build failures
 */
export function getStripe(): Stripe | null {
  const config = getStripeConfig();
  
  if (!config) {
    return null;
  }

  try {
    return new Stripe(config.secretKey, {
      telemetry: false, // Disable telemetry for performance
    });
  } catch (error) {
    console.error('Failed to initialize Stripe:', error);
    return null;
  }
}

/**
 * Get Stripe client with environment info or return error for API responses
 */
export function getStripeOrError(): { stripe: Stripe; config: StripeConfig } | { error: string; status: number } {
  const config = getStripeConfig();
  
  if (!config) {
    return {
      error: 'Payment processing is temporarily unavailable. Please try again later.',
      status: 503
    };
  }

  const stripe = new Stripe(config.secretKey, {
    telemetry: false,
  });

  return { stripe, config };
}

/**
 * Check if Stripe is properly configured
 */
export function isStripeConfigured(): boolean {
  return getStripeConfig() !== null;
}

/**
 * Get client-safe configuration for frontend use
 */
export function getClientStripeConfig() {
  const config = getStripeConfig();
  
  if (!config) {
    return null;
  }

  return {
    publishableKey: config.publishableKey,
    isLive: config.isLive,
    environment: config.environment
  };
}