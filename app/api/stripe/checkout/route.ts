import { NextRequest, NextResponse } from 'next/server'
import { getStripeOrError } from '@/lib/config/stripe'

export async function POST(request: NextRequest) {
  try {
    const stripeResult = getStripeOrError()
    
    if ('error' in stripeResult) {
      return NextResponse.json(
        { error: stripeResult.error },
        { status: stripeResult.status }
      )
    }

    const body = await request.json()
    const { priceId, successUrl, cancelUrl } = body

    if (!priceId) {
      return NextResponse.json(
        { error: 'Price ID is required' },
        { status: 400 }
      )
    }

    const { stripe } = stripeResult
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: successUrl || `${request.nextUrl.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl || `${request.nextUrl.origin}/cancel`,
      allow_promotion_codes: true,
      billing_address_collection: 'auto',
      customer_creation: 'always',
    })

    return NextResponse.json({ sessionId: session.id })
  } catch (error) {
    console.error('Stripe checkout error:', error)
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
}