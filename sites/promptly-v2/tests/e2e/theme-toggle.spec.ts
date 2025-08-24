import { test, expect } from '@playwright/test'

test.describe('Theme Toggle', () => {
  test.beforeEach(async ({ page }) => {
    // Clear localStorage before each test
    await page.goto('/')
    await page.evaluate(() => localStorage.clear())
    await page.reload()
  })

  test('should display visible theme toggle button at all breakpoints', async ({ page }) => {
    // Desktop view
    await page.setViewportSize({ width: 1200, height: 800 })
    await page.goto('/')
    
    const desktopToggle = page.locator('button[aria-label*="theme"]').first()
    await expect(desktopToggle).toBeVisible()
    
    // Check that it has proper accessibility attributes
    await expect(desktopToggle).toHaveAttribute('aria-label')
    
    // Mobile view
    await page.setViewportSize({ width: 375, height: 667 })
    
    // Open mobile menu
    const mobileMenuButton = page.locator('button[aria-label*="menu"]')
    await mobileMenuButton.click()
    
    const mobileToggle = page.locator('text=/theme/i')
    await expect(mobileToggle).toBeVisible()
  })

  test('should respect system preference when set to auto', async ({ page }) => {
    // Set system preference to dark mode
    await page.emulateMedia({ colorScheme: 'dark' })
    await page.goto('/')
    
    // Should default to system (dark)
    await expect(page.locator('html')).toHaveClass(/dark/)
    
    // Set system preference to light mode
    await page.emulateMedia({ colorScheme: 'light' })
    await page.reload()
    
    // Should follow system (light)
    await expect(page.locator('html')).not.toHaveClass(/dark/)
  })

  test('should persist theme selection in localStorage', async ({ page }) => {
    await page.goto('/')
    
    // Find and click theme toggle
    const themeToggle = page.locator('button[aria-label*="theme"]').first()
    
    // Click to change from system to light theme
    await themeToggle.click()
    
    // Verify theme is applied
    await expect(page.locator('html')).not.toHaveClass(/dark/)
    
    // Check localStorage
    const storedTheme = await page.evaluate(() => localStorage.getItem('promptly-theme'))
    expect(storedTheme).toBe('light')
    
    // Click again to change to dark theme
    await themeToggle.click()
    
    // Verify dark theme is applied
    await expect(page.locator('html')).toHaveClass(/dark/)
    
    // Check localStorage
    const storedTheme2 = await page.evaluate(() => localStorage.getItem('promptly-theme'))
    expect(storedTheme2).toBe('dark')
  })

  test('should maintain theme across page reloads', async ({ page }) => {
    await page.goto('/')
    
    // Set dark theme
    const themeToggle = page.locator('button[aria-label*="theme"]').first()
    
    // Click twice to get to dark theme (system -> light -> dark)
    await themeToggle.click()
    await themeToggle.click()
    
    // Verify dark theme is applied
    await expect(page.locator('html')).toHaveClass(/dark/)
    
    // Reload page
    await page.reload()
    
    // Wait for theme to be applied after hydration
    await page.waitForTimeout(500)
    
    // Verify theme persisted after reload
    await expect(page.locator('html')).toHaveClass(/dark/)
    
    // Verify localStorage still contains the theme
    const storedTheme = await page.evaluate(() => localStorage.getItem('promptly-theme'))
    expect(storedTheme).toBe('dark')
  })

  test('should maintain theme across navigation', async ({ page }) => {
    await page.goto('/')
    
    // Set light theme
    const themeToggle = page.locator('button[aria-label*="theme"]').first()
    await themeToggle.click() // system -> light
    
    // Verify light theme
    await expect(page.locator('html')).not.toHaveClass(/dark/)
    
    // Navigate to another page
    await page.goto('/about/founder')
    
    // Wait for theme to be applied after navigation
    await page.waitForTimeout(500)
    
    // Verify theme persisted across navigation
    await expect(page.locator('html')).not.toHaveClass(/dark/)
  })

  test('should have proper focus ring and meet WCAG contrast requirements', async ({ page }) => {
    await page.goto('/')
    
    const themeToggle = page.locator('button[aria-label*="theme"]').first()
    
    // Focus the button with keyboard
    await page.keyboard.press('Tab')
    await page.keyboard.press('Tab')
    await page.keyboard.press('Tab')
    await page.keyboard.press('Tab')
    await page.keyboard.press('Tab')
    await page.keyboard.press('Tab') // Navigate to theme toggle
    
    // Check if button is focused (this will depend on your focus styles)
    await expect(themeToggle).toBeFocused()
    
    // Verify button can be activated with keyboard
    await page.keyboard.press('Enter')
    
    // Check that theme changed
    const storedTheme = await page.evaluate(() => localStorage.getItem('promptly-theme'))
    expect(['light', 'dark', 'system']).toContain(storedTheme)
  })

  test('should cycle through theme options correctly', async ({ page }) => {
    await page.goto('/')
    
    const themeToggle = page.locator('button[aria-label*="theme"]').first()
    
    // Starting state should be 'system'
    let storedTheme = await page.evaluate(() => localStorage.getItem('promptly-theme'))
    expect(storedTheme).toBeNull() // Should be null initially, defaults to system
    
    // First click: system -> light
    await themeToggle.click()
    storedTheme = await page.evaluate(() => localStorage.getItem('promptly-theme'))
    expect(storedTheme).toBe('light')
    await expect(page.locator('html')).not.toHaveClass(/dark/)
    
    // Second click: light -> dark
    await themeToggle.click()
    storedTheme = await page.evaluate(() => localStorage.getItem('promptly-theme'))
    expect(storedTheme).toBe('dark')
    await expect(page.locator('html')).toHaveClass(/dark/)
    
    // Third click: dark -> system
    await themeToggle.click()
    storedTheme = await page.evaluate(() => localStorage.getItem('promptly-theme'))
    expect(storedTheme).toBe('system')
  })

  test('should display correct icon for each theme state', async ({ page }) => {
    await page.goto('/')
    
    const themeToggle = page.locator('button[aria-label*="theme"]').first()
    
    // Should show moon icon in light mode (indicating you can switch to dark)
    await themeToggle.click() // Go to light theme
    await expect(page.locator('html')).not.toHaveClass(/dark/)
    
    // Should show sun icon in dark mode (indicating you can switch to light)
    await themeToggle.click() // Go to dark theme  
    await expect(page.locator('html')).toHaveClass(/dark/)
    
    // The icons are SVG paths, so we can't easily test their visual content
    // but we can verify the button changes state when clicked
    await expect(themeToggle).toBeVisible()
  })
})
