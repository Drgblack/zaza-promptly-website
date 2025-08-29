import { NextRequest, NextResponse } from 'next/server'
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
import { getBaseUrl } from '@/lib/url'
import { capture } from '../../../lib/obs'

export async function POST(request: NextRequest) {
  let body: { priceId?: string; quantity?: number } = {};
  try {
    body = await request.json()
    const { priceId, quantity = 1 } = body

    // Check if Stripe is configured
    if (!process.env.STRIPE_SECRET_KEY) {
      console.warn("Stripe key missing — redirecting to waitlist")
      return NextResponse.redirect(new URL('/waitlist', getBaseUrl()), 302)
    }

    // Basic validation
    if (!priceId) {
      return NextResponse.json(
        { error: 'Missing priceId' },
        { status: 400 }
      )
    }

// Option A: match the types in your installed SDK
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-08-27.basil',
});

// Option B: omit apiVersion and let the SDK default
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);


    const baseUrl = getBaseUrl()

    // Create Checkout Session
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: [
        {
          price: priceId,
          quantity: quantity
        }
      ],
      success_url: `${baseUrl}/thank-you?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/pricing?canceled=1`,
      allow_promotion_codes: true
    })

    return NextResponse.json({
      ok: true,
      url: session.url
    })

  } catch (error) {
    console.error('Checkout error:', error)
    capture(error, { 
      endpoint: '/api/checkout',
      priceId: body?.priceId,
      userAgent: request.headers.get('user-agent'),
      timestamp: new Date().toISOString()
    })
    return NextResponse.json(
      { ok: false, error: 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}
