// sites/promptly-v2/src/app/api/checkout/route.ts
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getBaseUrl } from '@/lib/url';
import { capture } from '../../../lib/obs';

export const runtime = 'nodejs'; // Stripe needs Node APIs

// Let the SDK use its default apiVersion (avoids TS literal mismatch)
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: NextRequest) {
  let body: { priceId?: string; quantity?: number } = {};

  try {
    body = await request.json();
    const { priceId, quantity = 1 } = body;

    if (!process.env.STRIPE_SECRET_KEY) {
      console.warn('Stripe key missing — redirecting to waitlist');
      return NextResponse.redirect(new URL('/waitlist', getBaseUrl()), 302);
    }

    if (!priceId) {
      return NextResponse.json({ error: 'Missing priceId' }, { status: 400 });
    }

    const baseUrl = getBaseUrl();

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: [{ price: priceId, quantity }],
      success_url: `${baseUrl}/thank-you?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/pricing?canceled=1`,
      allow_promotion_codes: true,
    });

    return NextResponse.json({ ok: true, url: session.url });
  } catch (error) {
    console.error('Checkout error:', error);
    capture(error, {
      endpoint: '/api/checkout',
      priceId: body?.priceId,
      userAgent: request.headers.get('user-agent'),
      timestamp: new Date().toISOString(),
    });
    return NextResponse.json(
      { ok: false, error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
