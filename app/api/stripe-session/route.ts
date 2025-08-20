import { NextRequest, NextResponse } from 'next/server';
import { getStripeOrError } from '@/lib/stripe';

export const dynamic = "force-dynamic"; // ensure server-only runtime

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('session_id');

    if (!sessionId) {
      return NextResponse.json({ error: 'Session ID is required' }, { status: 400 });
    }

    // Get Stripe client with graceful error handling
    const stripeResult = getStripeOrError();
    if ('error' in stripeResult) {
      return NextResponse.json({ 
        error: stripeResult.error,
        testMode: true,
        sessionId,
        planType: 'Pro Plan',
        amount: '$14.99',
        email: 'test@example.com'
      }, { status: stripeResult.status });
    }
    
    const stripe = stripeResult.stripe;

    // Retrieve the checkout session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['line_items', 'customer', 'subscription']
    });

    // Extract relevant information
    const sessionData = {
      sessionId: session.id,
      customerEmail: session.customer_details?.email,
      amount: session.amount_total ? `$${(session.amount_total / 100).toFixed(2)}` : null,
      currency: session.currency,
      status: session.payment_status,
      planType: session.metadata?.plan_type || 'Unknown',
      subscriptionId: session.subscription,
    };

    return NextResponse.json(sessionData);

  } catch (error: any) {
    console.error('Error retrieving Stripe session:', error);
    
    if (error.type === 'StripeInvalidRequestError') {
      return NextResponse.json({ error: 'Invalid session ID' }, { status: 400 });
    }

    return NextResponse.json({ 
      error: 'Unable to retrieve session details' 
    }, { status: 500 });
  }
}