import { test, expect } from '@playwright/test';

test('home loads and has primary CTA', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('button', { name: /start/i })).toBeVisible();
});

test('locale switcher preserves path', async ({ page }) => {
  await page.goto('/en/resources');
  await page.getByRole('button', { name: /English/i }).click();
  await page.getByRole('menuitem', { name: /Deutsch/i }).click();
  await expect(page).toHaveURL(/\/de\/resources/);
});

test('resources downloads return 200', async ({ page, request }) => {
  await page.goto('/en/resources');
  const href = await page.locator('a[href$=".pdf"]').first().getAttribute('href');
  const res = await request.get(href!);
  expect(res.status()).toBe(200);
});

test('brevo form accepts', async ({ page }) => {
  await page.goto('/en');
  await page.getByPlaceholder('you@school.edu').fill('playwright+test@example.com');
  await page.getByRole('button', { name: /subscribe|join|waitlist/i }).click();
  await expect(page.getByText(/thanks|check your email/i)).toBeVisible();
});

test('stripe cancel page works', async ({ page }) => {
  await page.goto('/en/pricing');
  await page.getByRole('button', { name: /buy|start/i }).first().click();
  // In test, the integration should bounce back to cancel
  await expect(page).toHaveURL(/cancel/);
});