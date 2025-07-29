/**
 * Environment validation and safe defaults for Zaza Promptly
 * Ensures production readiness and graceful fallbacks
 */

interface EnvironmentConfig {
  stripe: {
    secretKey: string;
    publishableKey: string;
    isTestMode: boolean;
  };
  brevo: {
    apiKey: string;
    listId: string;
    isTestMode: boolean;
  };
  openai: {
    apiKey: string;
    isTestMode: boolean;
  };
  analytics: {
    measurementId: string;
    isEnabled: boolean;
  };
  app: {
    url: string;
    environment: 'development' | 'production' | 'test';
  };
  security: {
    jwtSecret: string;
    rateLimitMax: number;
  };
}

/**
 * Validates and returns environment configuration with safe fallbacks
 */
export function getEnvironmentConfig(): EnvironmentConfig {
  const isProduction = process.env.NODE_ENV === 'production';
  
  // Stripe Configuration
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY || '';
  const stripePublishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '';
  const stripeIsTestMode = stripeSecretKey.startsWith('sk_test_') || !isProduction;

  // Brevo Configuration
  const brevoApiKey = process.env.BREVO_API_KEY || '';
  const brevoListId = process.env.BREVO_LIST_ID || '';
  const brevoIsTestMode = brevoApiKey.includes('development') || !isProduction;

  // OpenAI Configuration
  const openaiApiKey = process.env.OPENAI_API_KEY || '';
  const openaiIsTestMode = openaiApiKey.includes('development') || !isProduction;

  // Analytics Configuration
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '';
  const analyticsEnabled = measurementId !== '' && measurementId !== 'G-DEVELOPMENT';

  // Application Configuration
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 
    (isProduction ? 'https://zazapromptly.com' : 'http://localhost:3000');

  // Security Configuration
  const jwtSecret = process.env.JWT_SECRET || 'fallback_jwt_secret_change_in_production';
  const rateLimitMax = parseInt(process.env.RATE_LIMIT_MAX || '100', 10);

  return {
    stripe: {
      secretKey: stripeSecretKey,
      publishableKey: stripePublishableKey,
      isTestMode: stripeIsTestMode,
    },
    brevo: {
      apiKey: brevoApiKey,
      listId: brevoListId,
      isTestMode: brevoIsTestMode,
    },
    openai: {
      apiKey: openaiApiKey,
      isTestMode: openaiIsTestMode,
    },
    analytics: {
      measurementId,
      isEnabled: analyticsEnabled,
    },
    app: {
      url: appUrl,
      environment: (process.env.NODE_ENV as any) || 'development',
    },
    security: {
      jwtSecret,
      rateLimitMax,
    },
  };
}

/**
 * Validates critical environment variables for production
 */
export function validateProductionEnvironment(): {
  isValid: boolean;
  errors: string[];
  warnings: string[];
} {
  const errors: string[] = [];
  const warnings: string[] = [];
  const config = getEnvironmentConfig();

  if (config.app.environment === 'production') {
    // Critical production checks
    if (!config.stripe.secretKey || config.stripe.secretKey.includes('placeholder')) {
      errors.push('STRIPE_SECRET_KEY is missing or using placeholder value');
    }
    
    if (!config.stripe.publishableKey || config.stripe.publishableKey.includes('placeholder')) {
      errors.push('NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is missing or using placeholder value');
    }

    if (!config.brevo.apiKey || config.brevo.apiKey.includes('placeholder')) {
      errors.push('BREVO_API_KEY is missing or using placeholder value');
    }

    if (!config.openai.apiKey || config.openai.apiKey.includes('placeholder')) {
      warnings.push('OPENAI_API_KEY is missing - AI features will be disabled');
    }

    if (config.security.jwtSecret.includes('development') || config.security.jwtSecret.includes('fallback')) {
      errors.push('JWT_SECRET is using development/fallback value in production');
    }

    // Test mode warnings
    if (config.stripe.isTestMode) {
      warnings.push('Using Stripe test keys in production environment');
    }

    if (config.brevo.isTestMode) {
      warnings.push('Using Brevo test configuration in production environment');
    }

    if (!config.analytics.isEnabled) {
      warnings.push('Google Analytics is not properly configured');
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
}

/**
 * Safe environment access with fallbacks
 */
export const env = {
  get stripe() {
    return getEnvironmentConfig().stripe;
  },
  get brevo() {
    return getEnvironmentConfig().brevo;
  },
  get openai() {
    return getEnvironmentConfig().openai;
  },
  get analytics() {
    return getEnvironmentConfig().analytics;
  },
  get app() {
    return getEnvironmentConfig().app;
  },
  get security() {
    return getEnvironmentConfig().security;
  },
  get isProduction() {
    return process.env.NODE_ENV === 'production';
  },
  get isDevelopment() {
    return process.env.NODE_ENV === 'development';
  },
};

// Development-only validation logging
if (process.env.NODE_ENV === 'development') {
  const validation = validateProductionEnvironment();
  if (validation.warnings.length > 0) {
    console.warn('🟡 Environment Warnings:', validation.warnings);
  }
  if (validation.errors.length > 0) {
    console.error('🔴 Environment Errors:', validation.errors);
  }
}