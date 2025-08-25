import { test, expect } from '@playwright/test'

test.describe('Footer Links', () => {
  test('footer renders with all expected links', async ({ page }) => {
    await page.goto('/')
    
    // Verify footer is visible
    const footer = page.locator('footer')
    await expect(footer).toBeVisible()
    
    // Check for common footer links (adjust based on actual footer structure)
    const expectedInternalLinks = [
      'Home',
      'About', 
      'Blog',
      'Pricing',
      'Contact',
      'Privacy',
      'Terms'
    ]
    
    for (const linkText of expectedInternalLinks) {
      const link = footer.getByRole('link', { name: new RegExp(linkText, 'i') })
      if (await link.count() > 0) {
        await expect(link.first()).toBeVisible()
      }
    }
  })
  
  test('external links have proper security attributes', async ({ page }) => {
    await page.goto('/')
    
    // Get all links in the footer
    const footer = page.locator('footer')
    const allLinks = footer.locator('a')
    const linkCount = await allLinks.count()
    
    for (let i = 0; i < linkCount; i++) {
      const link = allLinks.nth(i)
      const href = await link.getAttribute('href')
      
      // Check if link is external (starts with http/https and not our domain)
      if (href && (href.startsWith('http://') || href.startsWith('https://')) && !href.includes('zazapromptly.com')) {
        // External links should have rel="noopener noreferrer"
        const rel = await link.getAttribute('rel')
        expect(rel).toContain('noopener')
        expect(rel).toContain('noreferrer')
        
        // External links should open in new tab/window
        const target = await link.getAttribute('target')
        expect(target).toBe('_blank')
      }
    }
  })
  
  test('internal footer links navigate correctly', async ({ page }) => {
    await page.goto('/')
    
    const footer = page.locator('footer')
    
    // Test a few key internal links
    const internalLinksToTest = [
      { name: /about/i, expectedUrl: /\/about/ },
      { name: /blog/i, expectedUrl: /\/blog/ },
      { name: /pricing/i, expectedUrl: /\/pricing/ }
    ]
    
    for (const linkTest of internalLinksToTest) {
      const link = footer.getByRole('link', { name: linkTest.name })
      if (await link.count() > 0) {
        await link.first().click()
        await expect(page).toHaveURL(linkTest.expectedUrl)
        
        // Navigate back to home for next test
        await page.goto('/')
      }
    }
  })
  
  test('social media links have correct attributes', async ({ page }) => {
    await page.goto('/')
    
    const footer = page.locator('footer')
    
    // Common social media domains to check
    const socialDomains = ['twitter.com', 'linkedin.com', 'facebook.com', 'youtube.com', 'github.com']
    
    const allLinks = footer.locator('a')
    const linkCount = await allLinks.count()
    
    for (let i = 0; i < linkCount; i++) {
      const link = allLinks.nth(i)
      const href = await link.getAttribute('href')
      
      if (href && socialDomains.some(domain => href.includes(domain))) {
        // Social links should be external with proper security attributes
        const rel = await link.getAttribute('rel')
        expect(rel).toContain('noopener')
        expect(rel).toContain('noreferrer')
        
        const target = await link.getAttribute('target')
        expect(target).toBe('_blank')
      }
    }
  })
})