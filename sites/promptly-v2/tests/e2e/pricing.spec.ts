import { test, expect } from '@playwright/test'

test.describe('Pricing Page', () => {
  test('currency switcher changes prices correctly', async ({ page }) => {
    await page.goto('/pricing')
    
    // Wait for page to load and check initial state (should default to USD)
    await expect(page.locator('[data-testid="free-price"]')).toContainText('$0')
    await expect(page.locator('[data-testid="pro-price"]')).toContainText('$15')
    await expect(page.locator('[data-testid="school-price"]')).toContainText('$299')
    
    // Switch to EUR and verify prices change
    await page.locator('[data-testid="currency-eur"]').click()
    await expect(page.locator('[data-testid="free-price"]')).toContainText('€0')
    await expect(page.locator('[data-testid="pro-price"]')).toContainText('€14')
    await expect(page.locator('[data-testid="school-price"]')).toContainText('€279')
    
    // Verify URL parameter is set
    await expect(page).toHaveURL(/currency=eur/)
    
    // Switch to GBP and verify prices change
    await page.locator('[data-testid="currency-gbp"]').click()
    await expect(page.locator('[data-testid="free-price"]')).toContainText('£0')
    await expect(page.locator('[data-testid="pro-price"]')).toContainText('£12')
    await expect(page.locator('[data-testid="school-price"]')).toContainText('£249')
    
    // Verify URL parameter is updated
    await expect(page).toHaveURL(/currency=gbp/)
    
    // Switch back to USD and verify
    await page.locator('[data-testid="currency-usd"]').click()
    await expect(page.locator('[data-testid="free-price"]')).toContainText('$0')
    await expect(page.locator('[data-testid="pro-price"]')).toContainText('$15')
    await expect(page.locator('[data-testid="school-price"]')).toContainText('$299')
    
    // Verify URL parameter is updated
    await expect(page).toHaveURL(/currency=usd/)
  })
  
  test('currency preference persists after page reload', async ({ page }) => {
    await page.goto('/pricing')
    
    // Switch to EUR
    await page.locator('[data-testid="currency-eur"]').click()
    await expect(page.locator('[data-testid="pro-price"]')).toContainText('€14')
    
    // Reload page
    await page.reload()
    
    // Verify EUR is still selected and prices are correct
    await expect(page.locator('[data-testid="currency-eur"]')).toBeChecked()
    await expect(page.locator('[data-testid="pro-price"]')).toContainText('€14')
    await expect(page).toHaveURL(/currency=eur/)
  })
  
  test('URL parameter overrides localStorage on initial load', async ({ page }) => {
    // First, set localStorage to USD by visiting and selecting USD
    await page.goto('/pricing')
    await page.locator('[data-testid="currency-usd"]').click()
    
    // Then visit with EUR in URL parameter
    await page.goto('/pricing?currency=eur')
    
    // Should show EUR prices despite localStorage having USD
    await expect(page.locator('[data-testid="currency-eur"]')).toBeChecked()
    await expect(page.locator('[data-testid="pro-price"]')).toContainText('€14')
  })
  
  test('accessibility - currency switcher keyboard navigation', async ({ page }) => {
    await page.goto('/pricing')
    
    // Focus the currency switcher
    await page.locator('[data-testid="currency-usd"]').focus()
    
    // Use arrow keys to navigate
    await page.keyboard.press('ArrowDown')
    await expect(page.locator('[data-testid="currency-eur"]')).toBeFocused()
    
    await page.keyboard.press('ArrowDown')
    await expect(page.locator('[data-testid="currency-gbp"]')).toBeFocused()
    
    // Select with space/enter
    await page.keyboard.press('Space')
    await expect(page.locator('[data-testid="currency-gbp"]')).toBeChecked()
    await expect(page.locator('[data-testid="pro-price"]')).toContainText('£12')
  })
})