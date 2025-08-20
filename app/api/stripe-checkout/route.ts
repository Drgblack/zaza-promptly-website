import { NextRequest, NextResponse } from 'next/server';
import { getStripeOrError } from '@/lib/stripe';

export const dynamic = "force-dynamic"; // ensure server-only runtime

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const plan = searchParams.get('plan') || 'pro-monthly';
    const referral = searchParams.get('referral');
    const feature = searchParams.get('feature');
    const utm_source = searchParams.get('utm_source');
    const utm_medium = searchParams.get('utm_medium');
    const utm_campaign = searchParams.get('utm_campaign');

    return createCheckoutSession({
      plan,
      referral: referral || undefined,
      feature: feature || undefined,
      utm_source: utm_source || undefined,
      utm_medium: utm_medium || undefined,
      utm_campaign: utm_campaign || undefined,
      request
    });
  } catch (error) {
    console.error('GET Checkout error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { 
      priceId, 
      planType, 
      plan,
      successUrl, 
      cancelUrl,
      referral,
      feature,
      utm_source,
      utm_medium,
      utm_campaign
    } = await request.json();

    // Support both old and new API formats
    const selectedPlan = plan || planType || 'pro-monthly';

    return createCheckoutSession({
      plan: selectedPlan,
      priceId,
      successUrl,
      cancelUrl,
      referral,
      feature,
      utm_source,
      utm_medium,
      utm_campaign,
      request
    });
  } catch (error) {
    console.error('POST Checkout error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

async function createCheckoutSession({
  plan,
  priceId,
  successUrl,
  cancelUrl,
  referral,
  feature,
  utm_source,
  utm_medium,
  utm_campaign,
  request
}: {
  plan?: string;
  priceId?: string;
  successUrl?: string;
  cancelUrl?: string;
  referral?: string;
  feature?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  request: NextRequest;
}) {
  try {
    // Validate input
    if (!priceId && !plan) {
      return NextResponse.json({ error: 'Price ID or plan is required' }, { status: 400 });
    }

    // Get Stripe client with environment-aware configuration
    const stripeResult = getStripeOrError();
    if ('error' in stripeResult) {
      return NextResponse.json({ 
        error: stripeResult.error,
        testMode: true 
      }, { status: stripeResult.status });
    }
    
    const { stripe, config } = stripeResult;

  // Enhanced product configurations with new pricing structure
  const products = {
    'pro-monthly': {
      price: 1499, // $14.99 in cents
      name: 'Zaza Promptly Pro Monthly',
      description: 'AI-powered parent communication for teachers',
      interval: 'month' as const,
      features: [
        'Unlimited AI comments',
        'All tone options',
        'Multi-language support',
        'Premium templates',
        'Export to PDF & Word',
        'Priority support'
      ]
    },
    'pro-yearly': {
      price: 14990, // $149.90 in cents (save 17%)
      name: 'Zaza Promptly Pro Yearly',
      description: 'AI-powered parent communication for teachers - Annual Plan',
      interval: 'year' as const,
      features: [
        'Everything in Monthly',
        'Save 17% vs monthly',
        '2 months free',
        'Early access to new features',
        'Advanced analytics'
      ]
    },
    // Legacy support
    'pro': {
      price: 1499,
      name: 'Zaza Promptly Pro',
      description: 'AI-powered parent communication for teachers',
      interval: 'month' as const,
      features: [
        'Unlimited AI comments',
        'All tone options',
        'Premium templates',
        'Priority support'
      ]
    }
  };

  const selectedProduct = products[plan as keyof typeof products];
  if (!selectedProduct && !priceId) {
    return NextResponse.json({ error: 'Invalid plan type' }, { status: 400 });
  }

  // Get the base URL for redirects
  const baseUrl = request.headers.get('origin') || 'http://localhost:3000';

  // Build comprehensive metadata
  const sessionMetadata: Record<string, string> = {
    plan_type: plan || 'custom',
    source: 'website',
    checkout_version: '2.0',
    timestamp: new Date().toISOString(),
  };

  // Add referral information
  if (referral) {
    sessionMetadata.referral_code = referral;
    sessionMetadata.has_referral = 'true';
  }

  // Add feature that triggered the upgrade
  if (feature) {
    sessionMetadata.trigger_feature = feature;
  }

  // Add UTM parameters for attribution
  if (utm_source) sessionMetadata.utm_source = utm_source;
  if (utm_medium) sessionMetadata.utm_medium = utm_medium;
  if (utm_campaign) sessionMetadata.utm_campaign = utm_campaign;

  // Add user agent and IP for fraud detection
  const userAgent = request.headers.get('user-agent');
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (userAgent) sessionMetadata.user_agent = userAgent.substring(0, 200); // Limit length
  if (forwardedFor) sessionMetadata.ip_address = forwardedFor.split(',')[0].trim();

  const checkoutSession = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: priceId ? [
      {
        price: priceId,
        quantity: 1,
      }
    ] : [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: selectedProduct.name,
            description: selectedProduct.description,
            metadata: {
              features: selectedProduct.features.join(', '),
              plan_id: plan || 'custom',
              interval: selectedProduct.interval
            }
          },
          unit_amount: selectedProduct.price,
          recurring: {
            interval: selectedProduct.interval,
          },
        },
        quantity: 1,
      }
    ],
    mode: 'subscription',
    success_url: successUrl || `${baseUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: cancelUrl || `${baseUrl}/checkout/cancel`,
    allow_promotion_codes: true,
    billing_address_collection: 'required',
    customer_creation: 'always',
    phone_number_collection: {
      enabled: false, // Keep simple for teachers
    },
    custom_text: {
      submit: {
        message: 'Start your 7-day free trial - cancel anytime!'
      }
    },
    subscription_data: {
      trial_period_days: 7, // 7-day free trial
      metadata: sessionMetadata,
    },
    metadata: sessionMetadata,
  });

  return NextResponse.json({ 
    url: checkoutSession.url,
    sessionId: checkoutSession.id,
    testMode: !config.isLive,
    environment: config.environment,
    plan: plan || 'custom',
    amount: selectedProduct ? `$${(selectedProduct.price / 100).toFixed(2)}` : null
  });
  } catch (error: any) {
    console.error('Stripe checkout error:', error);
    
    if (error.type === 'StripeCardError') {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ 
      error: 'Unable to create checkout session. Please try again later.' 
    }, { status: 500 });
  }
}

