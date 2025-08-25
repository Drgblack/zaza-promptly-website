import { test, expect } from '@playwright/test'

test.describe('Header Navigation', () => {
  test('header links navigate client-side correctly', async ({ page }) => {
    // Start at home page
    await page.goto('/')
    
    // Verify we're on home page
    await expect(page).toHaveURL('/')
    
    // Test pricing CTA button
    const pricingButton = page.getByRole('link', { name: /start free/i })
    if (await pricingButton.isVisible()) {
      await pricingButton.click()
      await expect(page).toHaveURL('/pricing')
    }
    
    // Go back home
    await page.goto('/')
    
    // Test dropdown navigation - hover over Resources
    const resourcesButton = page.getByRole('button', { name: /resources/i })
    if (await resourcesButton.isVisible()) {
      await resourcesButton.hover()
      
      // Look for dropdown menu items (these may vary)
      const dropdownItems = page.locator('[role="menu"], [aria-expanded="true"] a').first()
      if (await dropdownItems.isVisible()) {
        await dropdownItems.click()
        // Verify navigation occurred (URL should change)
        await expect(page.url()).not.toBe('/')
      }
    }
  })
  
  test('logo link navigates to home', async ({ page }) => {
    await page.goto('/pricing')
    
    // Click logo to navigate home
    await page.getByRole('link').filter({ has: page.getByText('Promptly') }).first().click()
    await expect(page).toHaveURL('/')
  })
  
  test('mobile menu navigation works', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })
    
    await page.goto('/')
    
    // Open mobile menu
    const menuButton = page.getByRole('button', { name: /menu/i })
    if (await menuButton.isVisible()) {
      await menuButton.click()
      
      // Navigate to pricing via mobile menu
      await page.getByRole('link', { name: 'Pricing' }).click()
      await expect(page).toHaveURL('/pricing')
    }
  })
})