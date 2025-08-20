import { NextRequest } from 'next/server';
import { POST } from '../../app/api/stripe-checkout/route';

// Mock Stripe to prevent actual API calls during tests
jest.mock('stripe');

describe('/api/stripe-checkout', () => {
  beforeEach(() => {
    // Reset environment variables
    process.env.STRIPE_SECRET_KEY = 'sk_test_mock_key_for_testing';
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY = 'pk_test_mock_key_for_testing';
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return 400 for missing plan and priceId', async () => {
    const request = new NextRequest('http://localhost:3000/api/stripe-checkout', {
      method: 'POST',
      body: JSON.stringify({}),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe('Price ID or plan is required');
  });

  it('should return 503 when Stripe is not configured', async () => {
    // Remove Stripe keys to simulate missing configuration
    delete process.env.STRIPE_SECRET_KEY;
    delete process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

    const request = new NextRequest('http://localhost:3000/api/stripe-checkout', {
      method: 'POST',
      body: JSON.stringify({ plan: 'pro-monthly' }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(503);
    expect(data.error).toContain('Payment processing is temporarily unavailable');
    expect(data.testMode).toBe(true);
  });

  it('should validate plan types', async () => {
    const request = new NextRequest('http://localhost:3000/api/stripe-checkout', {
      method: 'POST',
      body: JSON.stringify({ plan: 'invalid-plan' }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe('Invalid plan type');
  });

  // Integration test example (requires actual Stripe test keys)
  describe('Integration Tests', () => {
    beforeEach(() => {
      // Only run if we have real test keys
      if (!process.env.STRIPE_SECRET_KEY?.startsWith('sk_test_')) {
        jest.skip();
      }
    });

    it('should create checkout session with valid test keys', async () => {
      const request = new NextRequest('http://localhost:3000/api/stripe-checkout', {
        method: 'POST',
        body: JSON.stringify({
          plan: 'pro-monthly',
          successUrl: 'http://localhost:3000/success',
          cancelUrl: 'http://localhost:3000/cancel',
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const response = await POST(request);
      
      if (response.status === 503) {
        // Skip if Stripe is not configured
        return;
      }

      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.url).toMatch(/^https:\/\/checkout\.stripe\.com/);
      expect(data.sessionId).toMatch(/^cs_/);
      expect(data.testMode).toBe(true);
      expect(data.plan).toBe('pro-monthly');
      expect(data.amount).toBe('$14.99');
    }, 10000); // Longer timeout for API call
  });
});