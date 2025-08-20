import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe';
import { getStripe } from '@/lib/stripe';

export const dynamic = "force-dynamic"; // ensure server-only runtime

export async function POST(request: NextRequest) {
  // Get Stripe client with graceful error handling
  const stripe = getStripe();
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
  
  if (!stripe) {
    return NextResponse.json(
      { error: 'Stripe integration not configured' },
      { status: 500 }
    );
  }

  if (!endpointSecret) {
    return NextResponse.json(
      { error: 'Stripe webhook secret not configured' },
      { status: 500 }
    );
  }

  const body = await request.text()
  const sig = request.headers.get('stripe-signature') as string

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret)
  } catch (err: any) {
    console.error('Webhook signature verification failed.', err.message)
    return NextResponse.json({ error: 'Webhook signature verification failed' }, { status: 400 })
  }

  // Handle the event
  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object
        
        console.log('Payment successful:', {
          sessionId: session.id,
          customerEmail: session.customer_details?.email,
          amountTotal: session.amount_total,
          currency: session.currency,
          paymentStatus: session.payment_status,
          timestamp: new Date().toISOString()
        })

        // Here you would typically:
        // 1. Update your database with the successful payment
        // 2. Send a confirmation email to the customer
        // 3. Activate the customer's subscription
        // 4. Track the conversion in analytics
        
        break
      }

      case 'checkout.session.expired': {
        const session = event.data.object
        
        console.log('Checkout session expired:', {
          sessionId: session.id,
          customerEmail: session.customer_details?.email,
          timestamp: new Date().toISOString()
        })
        
        break
      }

      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object
        
        console.log('Payment Intent succeeded:', {
          paymentIntentId: paymentIntent.id,
          amount: paymentIntent.amount,
          currency: paymentIntent.currency,
          customerEmail: paymentIntent.receipt_email,
          timestamp: new Date().toISOString()
        })
        
        break
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object
        
        console.error('Payment Intent failed:', {
          paymentIntentId: paymentIntent.id,
          amount: paymentIntent.amount,
          currency: paymentIntent.currency,
          lastPaymentError: paymentIntent.last_payment_error,
          timestamp: new Date().toISOString()
        })
        
        break
      }

      case 'customer.subscription.created': {
        const subscription = event.data.object
        
        console.log('Subscription created:', {
          subscriptionId: subscription.id,
          customerId: subscription.customer,
          status: subscription.status,
          currentPeriodStart: (subscription as any).current_period_start ? new Date((subscription as any).current_period_start * 1000).toISOString() : null,
          currentPeriodEnd: (subscription as any).current_period_end ? new Date((subscription as any).current_period_end * 1000).toISOString() : null,
          timestamp: new Date().toISOString()
        })
        
        break
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object
        
        console.log('Subscription updated:', {
          subscriptionId: subscription.id,
          customerId: subscription.customer,
          status: subscription.status,
          timestamp: new Date().toISOString()
        })
        
        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object
        
        console.log('Subscription canceled:', {
          subscriptionId: subscription.id,
          customerId: subscription.customer,
          canceledAt: (subscription as any).canceled_at ? new Date((subscription as any).canceled_at * 1000).toISOString() : null,
          timestamp: new Date().toISOString()
        })
        
        break
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object
        
        console.log('Invoice payment succeeded:', {
          invoiceId: invoice.id,
          subscriptionId: (invoice as any).subscription,
          customerId: invoice.customer,
          amountPaid: (invoice as any).amount_paid,
          currency: invoice.currency,
          timestamp: new Date().toISOString()
        })
        
        break
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object
        
        console.error('Invoice payment failed:', {
          invoiceId: invoice.id,
          subscriptionId: (invoice as any).subscription,
          customerId: invoice.customer,
          amountDue: (invoice as any).amount_due,
          currency: invoice.currency,
          timestamp: new Date().toISOString()
        })
        
        break
      }

      default:
        console.log(`Unhandled event type ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error: any) {
    console.error('Error processing webhook:', error)
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({ 
    error: 'Method not allowed. This endpoint only accepts POST requests from Stripe.' 
  }, { status: 405 })
}