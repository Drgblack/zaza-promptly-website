import { test, expect } from '@playwright/test';

test.describe('Stripe Checkout Integration', () => {
  test('should handle checkout with valid test price ID', async ({ page }) => {
    // Test with a valid test price ID
    const testPriceId = 'price_1QKMfnGLWNYhKl5w2gqWExWG';
    
    // Navigate directly to checkout endpoint
    await page.goto(`/api/checkout?priceId=${testPriceId}`, { waitUntil: 'networkidle' });
    
    // Should either redirect to Stripe checkout or show error if env vars missing
    const url = page.url();
    
    if (url.includes('checkout.stripe.com')) {
      // Success - redirected to Stripe
      expect(url).toContain('checkout.stripe.com');
    } else if (url.includes('/waitlist')) {
      // Graceful fallback when Stripe not configured
      expect(url).toContain('/waitlist');
    } else {
      // Should not end up on any other page
      throw new Error(`Unexpected redirect to: ${url}`);
    }
  });

  test('should reject invalid price ID', async ({ page }) => {
    // Test with an invalid price ID
    const invalidPriceId = 'price_invalid_123';
    
    await page.goto(`/api/checkout?priceId=${invalidPriceId}`, { waitUntil: 'networkidle' });
    
    // Should redirect to pricing with error
    expect(page.url()).toContain('/pricing');
    expect(page.url()).toContain('error=invalid-price');
  });

  test('should handle missing price ID', async ({ page }) => {
    // Test without price ID
    await page.goto('/api/checkout', { waitUntil: 'networkidle' });
    
    // Should redirect to pricing with error
    expect(page.url()).toContain('/pricing');
    expect(page.url()).toContain('error=missing-price');
  });

  test('should load checkout success page', async ({ page }) => {
    await page.goto('/en/checkout/success?session_id=test_session', { waitUntil: 'networkidle' });
    
    // Should load without errors
    expect(page.url()).toContain('/checkout/success');
    
    // Should show loading state initially (suspense fallback)
    await expect(page.locator('text=Loading...')).toBeVisible();
  });

  test('should load checkout cancel page', async ({ page }) => {
    await page.goto('/en/checkout/cancel', { waitUntil: 'networkidle' });
    
    // Should load without errors  
    expect(page.url()).toContain('/checkout/cancel');
    
    // Should show cancel message
    await expect(page.locator('text=No Worries!')).toBeVisible();
    
    // Should have try again button
    await expect(page.locator('text=Try Again')).toBeVisible();
  });

  test('should validate Stripe configuration in different environments', async ({ page }) => {
    // Test the POST endpoint for proper error handling
    const response = await page.request.post('/api/checkout', {
      data: { priceId: 'invalid_id' }
    });
    
    const responseBody = await response.json();
    
    if (response.status() === 503) {
      // Service unavailable - Stripe not configured
      expect(responseBody.error).toBe('Payment processing unavailable');
      expect(responseBody.redirectUrl).toBe('/waitlist');
    } else if (response.status() === 400) {
      // Bad request - invalid price ID
      expect(responseBody.error).toBe('Invalid price ID');
      expect(responseBody.validPriceIds).toBeDefined();
    }
  });
});