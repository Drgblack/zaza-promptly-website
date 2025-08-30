// sites/promptly-v2/src/app/api/checkout/route.ts
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getBaseUrl } from '@/lib/url';
import { capture } from '../../../lib/obs';
import { STRIPE_CONFIG } from '@/config/stripe';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  // Check if Stripe is properly configured
  if (!STRIPE_CONFIG.isEnabled) {
    return NextResponse.redirect(new URL('/waitlist', getBaseUrl()), 302);
  }

  const { searchParams } = new URL(request.url);
  const priceId = searchParams.get('priceId');
  const quantity = parseInt(searchParams.get('quantity') || '1');

  if (!priceId) {
    return NextResponse.redirect(new URL('/pricing?error=missing-price', getBaseUrl()), 302);
  }

  // Server-side price ID validation
  if (!STRIPE_CONFIG.validatePriceId(priceId)) {
    console.warn(`Invalid price ID attempted: ${priceId}`);
    return NextResponse.redirect(new URL('/pricing?error=invalid-price', getBaseUrl()), 302);
  }

  return createCheckoutSession(priceId, quantity, request);
}

export async function POST(request: NextRequest) {
  let body: { priceId?: string; quantity?: number } = {};

  try {
    body = await request.json();
    const { priceId, quantity = 1 } = body;

    // Guard against missing Stripe configuration
    if (!STRIPE_CONFIG.isEnabled) {
      return NextResponse.json(
        { ok: false, error: 'Payment processing unavailable', redirectUrl: '/waitlist' },
        { status: 503 }
      );
    }

    if (!priceId) {
      return NextResponse.json({ error: 'Missing priceId' }, { status: 400 });
    }

    // Server-side price ID validation  
    if (!STRIPE_CONFIG.validatePriceId(priceId)) {
      console.warn(`Invalid price ID attempted: ${priceId}`);
      return NextResponse.json({ 
        error: 'Invalid price ID',
        validPriceIds: STRIPE_CONFIG.getValidPriceIds() 
      }, { status: 400 });
    }

    return createCheckoutSession(priceId, quantity, request);
  } catch (error) {
    console.error('Checkout error:', error);
    capture(error, {
      endpoint: '/api/checkout',
      priceId: body?.priceId,
      userAgent: request.headers.get('user-agent') ?? undefined,
      timestamp: new Date().toISOString(),
    });
    return NextResponse.json(
      { ok: false, error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}

async function createCheckoutSession(priceId: string, quantity: number, request: NextRequest) {
  try {
    const secret = process.env.STRIPE_SECRET_KEY;
    if (!secret) {
      console.warn('Stripe secret key missing');
      return NextResponse.json(
        { ok: false, error: 'Payment configuration error', redirectUrl: '/waitlist' },
        { status: 503 }
      );
    }

    // Create the client only when a request hits the route
    const stripe = new Stripe(secret); // no apiVersion — let SDK default

    const baseUrl = getBaseUrl();
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: [{ price: priceId, quantity }],
      success_url: `${baseUrl}/en/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/en/checkout/cancel`,
      allow_promotion_codes: true,
      customer_creation: 'always',
      billing_address_collection: 'required',
      metadata: {
        priceId,
        quantity: quantity.toString(),
        created_at: new Date().toISOString()
      }
    });

    const isGetRequest = request.method === 'GET';
    if (isGetRequest && session.url) {
      return NextResponse.redirect(session.url, 302);
    }

    return NextResponse.json({ ok: true, url: session.url });
  } catch (error) {
    console.error('Stripe session creation error:', error);
    throw error;
  }
}
