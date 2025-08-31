import { test, expect } from '@playwright/test';

test.describe('Health Checks', () => {
  test('homepage loads correctly', async ({ page }) => {
    await page.goto('/en');
    
    // Page should load
    await expect(page).toHaveTitle(/Zaza Promptly/);
    
    // Should have main content
    await expect(page.locator('main')).toBeVisible();
    
    // Should have header navigation
    await expect(page.locator('header')).toBeVisible();
    
    // Should have footer
    await expect(page.locator('footer')).toBeVisible();
  });

  test('pricing page loads correctly', async ({ page }) => {
    await page.goto('/en/pricing');
    
    // Page should load
    await expect(page).toHaveTitle(/Pricing/);
    
    // Should have pricing content
    await expect(page.locator('main')).toBeVisible();
  });

  test('resources page loads correctly', async ({ page }) => {
    await page.goto('/en/resources');
    
    // Page should load
    await expect(page).toHaveTitle(/Resources/);
    
    // Should have resources content
    await expect(page.locator('main')).toBeVisible();
  });

  test('API routes respond correctly', async ({ request }) => {
    // Test snippet generation endpoint
    const response = await request.post('/api/snippet', {
      data: {
        subject: 'Mathematics',
        level: 'Primary',
        tone: 'Supportive',
        length: 'Short',
        scenario: 'Test scenario'
      }
    });

    expect(response.status()).toBe(200);
    const data = await response.json();
    expect(data).toHaveProperty('success', true);
    expect(data).toHaveProperty('snippet');
  });
});