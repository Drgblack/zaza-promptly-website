import { NextRequest, NextResponse } from 'next/server';

export const dynamic = "force-dynamic"; // ensure server-only runtime

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('session_id');

    if (!sessionId) {
      return NextResponse.json({ error: 'Session ID is required' }, { status: 400 });
    }

    // Check if Stripe is properly configured
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key || key === 'sk_test_REPLACE_WITH_YOUR_STRIPE_SECRET_KEY') {
      return NextResponse.json({ 
        error: 'Stripe secret key not configured',
        testMode: true,
        sessionId,
        planType: 'Pro Plan',
        amount: '$14.99',
        email: 'test@example.com'
      }, { status: 500 });
    }

    // Dynamically import and initialize Stripe
    const { default: Stripe } = await import('stripe');
    const stripe = new Stripe(key, {
      apiVersion: '2025-06-30.basil',
    });

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