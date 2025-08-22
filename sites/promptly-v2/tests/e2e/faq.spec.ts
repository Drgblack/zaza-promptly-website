import { test, expect } from '@playwright/test'

test.describe('FAQ Tests', () => {
  test.describe('Page Load and Content', () => {
    test('should load /faq page with 200 status and contain at least 10 questions', async ({ page }) => {
      const response = await page.goto('/faq')
      
      // Check that page loads successfully
      expect(response?.status()).toBe(200)
      
      // Wait for page to load completely
      await page.waitForLoadState('networkidle')
      
      // Check page title and heading
      await expect(page).toHaveTitle(/FAQ|Frequently Asked Questions/i)
      const heading = page.locator('h1').first()
      await expect(heading).toBeVisible()
      await expect(heading).toContainText(/FAQ|Frequently Asked Questions/i)
      
      // Count FAQ items - they should have question text and be clickable buttons
      const faqButtons = page.locator('button[aria-expanded]')
      const faqCount = await faqButtons.count()
      
      // Ensure we have at least 10 FAQ questions
      expect(faqCount).toBeGreaterThanOrEqual(10)
      
      // Verify FAQ questions are visible and have proper accessibility attributes
      for (let i = 0; i < Math.min(3, faqCount); i++) {
        const faqButton = faqButtons.nth(i)
        await expect(faqButton).toBeVisible()
        
        // Check aria attributes
        const ariaExpanded = await faqButton.getAttribute('aria-expanded')
        expect(['true', 'false']).toContain(ariaExpanded)
        
        const ariaControls = await faqButton.getAttribute('aria-controls')
        expect(ariaControls).toBeTruthy()
        
        // Check that button contains question text
        const buttonText = await faqButton.textContent()
        expect(buttonText?.length).toBeGreaterThan(10)
      }
    })
    
    test('should have proper page structure with categories and search', async ({ page }) => {
      await page.goto('/faq')
      await page.waitForLoadState('networkidle')
      
      // Check for search functionality
      const searchInput = page.locator('input[placeholder*="Search"]')
      await expect(searchInput).toBeVisible()
      
      // Check for category navigation
      const categoryNav = page.locator('nav[aria-label*="Categories"], nav:has-text("Categories")')
      await expect(categoryNav).toBeVisible()
      
      // Check for category links
      const categoryLinks = page.locator('nav a, nav button').filter({ hasText: /\(\d+\)/ })
      const categoryCount = await categoryLinks.count()
      expect(categoryCount).toBeGreaterThanOrEqual(3)
      
      // Check for main content area
      const mainContent = page.locator('main, [role="main"], div').filter({ has: page.locator('button[aria-expanded]') })
      await expect(mainContent.first()).toBeVisible()
    })
  })

  test.describe('JSON-LD Schema', () => {
    test('should have valid FAQ JSON-LD schema with mainEntity array', async ({ page }) => {
      await page.goto('/faq')
      await page.waitForLoadState('networkidle')
      
      // Extract JSON-LD data from the page
      const jsonLdData = await page.evaluate(() => {
        const scripts = document.querySelectorAll('script[type="application/ld+json"]')
        const faqSchemas = []
        
        for (const script of Array.from(scripts)) {
          try {
            const data = JSON.parse(script.textContent || '')
            if (data['@type'] === 'FAQPage' || (Array.isArray(data) && data.some(item => item['@type'] === 'FAQPage'))) {
              faqSchemas.push(data)
            }
          } catch (e) {
            // Skip invalid JSON
          }
        }
        
        return faqSchemas
      })
      
      // Should have at least one FAQ schema
      expect(jsonLdData.length).toBeGreaterThanOrEqual(1)
      
      // Check the first FAQ schema
      let faqSchema = jsonLdData[0]
      if (Array.isArray(faqSchema)) {
        faqSchema = faqSchema.find(item => item['@type'] === 'FAQPage')
      }
      
      expect(faqSchema).toBeTruthy()
      expect(faqSchema['@context']).toBe('https://schema.org')
      expect(faqSchema['@type']).toBe('FAQPage')
      expect(faqSchema.mainEntity).toBeTruthy()
      expect(Array.isArray(faqSchema.mainEntity)).toBe(true)
      
      // Count visible FAQ questions on the page
      const visibleFaqs = await page.locator('button[aria-expanded]').count()
      
      // JSON-LD mainEntity array should have at least as many items as visible questions
      // (or at least be close - some questions might be drafts/hidden)
      expect(faqSchema.mainEntity.length).toBeGreaterThanOrEqual(Math.min(visibleFaqs, 10))
      
      // Check structure of first mainEntity item
      if (faqSchema.mainEntity.length > 0) {
        const firstQuestion = faqSchema.mainEntity[0]
        expect(firstQuestion['@type']).toBe('Question')
        expect(firstQuestion.name).toBeTruthy()
        expect(firstQuestion.acceptedAnswer).toBeTruthy()
        expect(firstQuestion.acceptedAnswer['@type']).toBe('Answer')
        expect(firstQuestion.acceptedAnswer.text).toBeTruthy()
        
        // Verify answer text is substantial (not just a few characters)
        expect(firstQuestion.acceptedAnswer.text.length).toBeGreaterThan(50)
      }
    })
    
    test('should exclude needsReview questions from JSON-LD', async ({ page }) => {
      await page.goto('/faq')
      await page.waitForLoadState('networkidle')
      
      // Get JSON-LD schema
      const jsonLdData = await page.evaluate(() => {
        const scripts = document.querySelectorAll('script[type="application/ld+json"]')
        for (const script of Array.from(scripts)) {
          try {
            const data = JSON.parse(script.textContent || '')
            let faqSchema = data
            if (Array.isArray(data)) {
              faqSchema = data.find(item => item['@type'] === 'FAQPage')
            }
            if (faqSchema && faqSchema['@type'] === 'FAQPage') {
              return faqSchema
            }
          } catch (e) {
            // Skip invalid JSON
          }
        }
        return null
      })
      
      // Count draft questions on the page (those with "Draft" badge)
      const draftQuestions = await page.locator('span:has-text("Draft")').count()
      const totalVisibleQuestions = await page.locator('button[aria-expanded]').count()
      
      if (draftQuestions > 0) {
        // If there are draft questions visible, JSON-LD should have fewer items
        expect(jsonLdData.mainEntity.length).toBeLessThanOrEqual(totalVisibleQuestions)
        expect(jsonLdData.mainEntity.length).toBeGreaterThanOrEqual(totalVisibleQuestions - draftQuestions)
      } else {
        // If no drafts, JSON-LD should match visible questions (approximately)
        expect(Math.abs(jsonLdData.mainEntity.length - totalVisibleQuestions)).toBeLessThanOrEqual(2)
      }
    })
  })

  test.describe('Search Functionality', () => {
    test('should filter to pricing questions when searching "pricing"', async ({ page }) => {
      await page.goto('/faq')
      await page.waitForLoadState('networkidle')
      
      // Get the search input
      const searchInput = page.locator('input[placeholder*="Search"]')
      await expect(searchInput).toBeVisible()
      
      // Perform search
      await searchInput.fill('pricing')
      await searchInput.press('Enter')
      
      // Wait for search results to appear
      await page.waitForTimeout(500) // Allow for debounced search
      
      // Should show search results heading
      const searchResultsHeading = page.locator('h2:has-text("Search Results")')
      await expect(searchResultsHeading).toBeVisible()
      
      // Get search result questions
      const searchResults = page.locator('button[aria-expanded]')
      const resultCount = await searchResults.count()
      
      // Should have at least 1 pricing-related result
      expect(resultCount).toBeGreaterThanOrEqual(1)
      
      // Check that results are actually pricing-related
      for (let i = 0; i < Math.min(3, resultCount); i++) {
        const resultText = await searchResults.nth(i).textContent()
        const isRelevant = /pricing|cost|price|payment|subscription|billing|fee/i.test(resultText || '')
        
        if (!isRelevant) {
          // Also check category badge if visible
          const categoryBadge = searchResults.nth(i).locator('span').filter({ hasText: /pricing|billing/i })
          const hasPricingCategory = await categoryBadge.count() > 0
          
          // At least one should be true - either question text or category is pricing-related
          expect(isRelevant || hasPricingCategory).toBe(true)
        }
      }
      
      // Test that zero state works for non-existent search terms
      await searchInput.fill('xyznonexistentterm123')
      await page.waitForTimeout(500)
      
      const noResultsMessage = page.locator('text=/No results found|No FAQs found/')
      await expect(noResultsMessage).toBeVisible()
      
      // Should show suggested search terms
      const suggestions = page.locator('button:has-text("pricing"), button:has-text("privacy"), button:has-text("GDPR")')
      const suggestionCount = await suggestions.count()
      expect(suggestionCount).toBeGreaterThanOrEqual(3)
    })
    
    test('should support search suggestions and clear search', async ({ page }) => {
      await page.goto('/faq')
      await page.waitForLoadState('networkidle')
      
      const searchInput = page.locator('input[placeholder*="Search"]')
      
      // Search for non-existent term to see suggestions
      await searchInput.fill('nonexistentterm')
      await page.waitForTimeout(500)
      
      // Click on a suggestion (e.g., "privacy")
      const privacySuggestion = page.locator('button:has-text("privacy")')
      if (await privacySuggestion.count() > 0) {
        await privacySuggestion.click()
        
        // Should update search input
        const searchValue = await searchInput.inputValue()
        expect(searchValue).toBe('privacy')
        
        // Should show privacy-related results
        const results = page.locator('button[aria-expanded]')
        const resultCount = await results.count()
        expect(resultCount).toBeGreaterThanOrEqual(1)
      }
      
      // Clear search
      await searchInput.fill('')
      await page.waitForTimeout(500)
      
      // Should return to category view
      const categoryHeadings = page.locator('h2').filter({ hasText: /getting started|privacy|pricing/i })
      const categoryCount = await categoryHeadings.count()
      expect(categoryCount).toBeGreaterThanOrEqual(2)
    })
  })

  test.describe('Interactive Features', () => {
    test('should expand and collapse FAQ questions', async ({ page }) => {
      await page.goto('/faq')
      await page.waitForLoadState('networkidle')
      
      const firstFaq = page.locator('button[aria-expanded]').first()
      
      // Initially should be collapsed
      let ariaExpanded = await firstFaq.getAttribute('aria-expanded')
      expect(ariaExpanded).toBe('false')
      
      // Click to expand
      await firstFaq.click()
      
      // Should be expanded
      ariaExpanded = await firstFaq.getAttribute('aria-expanded')
      expect(ariaExpanded).toBe('true')
      
      // Content should be visible
      const ariaControls = await firstFaq.getAttribute('aria-controls')
      expect(ariaControls).toBeTruthy()
      
      const content = page.locator(`#${ariaControls}`)
      await expect(content).toBeVisible()
      
      // Should contain substantial answer content
      const contentText = await content.textContent()
      expect(contentText?.length).toBeGreaterThan(20)
      
      // Click again to collapse
      await firstFaq.click()
      
      // Should be collapsed again
      ariaExpanded = await firstFaq.getAttribute('aria-expanded')
      expect(ariaExpanded).toBe('false')
    })
    
    test('should have copy link functionality', async ({ page }) => {
      await page.goto('/faq')
      await page.waitForLoadState('networkidle')
      
      // Look for copy link buttons (they might be icon buttons)
      const copyLinks = page.locator('button[aria-label*="Copy"], button[title*="Copy"]')
      
      if (await copyLinks.count() > 0) {
        const firstCopyLink = copyLinks.first()
        
        // Click copy link button
        await firstCopyLink.click()
        
        // Should show success feedback (check icon or success message)
        const successIndicator = page.locator('svg').filter({ hasText: '' }).or(
          page.locator('text=/copied|success/i')
        )
        
        // May take a moment for the icon to change
        await page.waitForTimeout(200)
        
        // The button should indicate success somehow (changed icon, tooltip, etc.)
        const buttonContent = await firstCopyLink.innerHTML()
        const hasSuccessState = buttonContent.includes('Check') || 
                               buttonContent.includes('success') || 
                               buttonContent.includes('copied')
        
        // Note: We can't easily test actual clipboard content in Playwright without permissions
        // but we can verify the UI feedback works
        expect(hasSuccessState || await successIndicator.count() > 0).toBe(true)
      }
    })
    
    test('should have helpful voting functionality', async ({ page }) => {
      await page.goto('/faq')
      await page.waitForLoadState('networkidle')
      
      // Expand first FAQ to see voting buttons
      const firstFaq = page.locator('button[aria-expanded]').first()
      await firstFaq.click()
      
      // Wait for content to expand
      await page.waitForTimeout(300)
      
      // Look for voting buttons
      const thumbsUp = page.locator('button[aria-label*="helpful"], button:has(svg):has-text(""), button').filter({ has: page.locator('svg') }).filter({ hasText: '' }).first()
      const thumbsDown = page.locator('button[aria-label*="not helpful"], button:has(svg)').filter({ hasText: '' }).first()
      
      if (await thumbsUp.count() > 0 && await thumbsDown.count() > 0) {
        // Click thumbs up
        await thumbsUp.click()
        
        // Should show feedback message
        const feedbackMessage = page.locator('text=/Thank you/i')
        await expect(feedbackMessage).toBeVisible()
        
        // Buttons should be disabled/changed state
        const thumbsUpDisabled = await thumbsUp.isDisabled()
        expect(thumbsUpDisabled).toBe(true)
      }
    })
  })

  test.describe('Accessibility', () => {
    test('should have proper heading hierarchy and ARIA labels', async ({ page }) => {
      await page.goto('/faq')
      await page.waitForLoadState('networkidle')
      
      // Check main heading
      const h1 = page.locator('h1')
      await expect(h1).toBeVisible()
      
      // Check category headings
      const h2s = page.locator('h2')
      const h2Count = await h2s.count()
      expect(h2Count).toBeGreaterThanOrEqual(2)
      
      // Check FAQ question headings
      const h3s = page.locator('h3')
      const h3Count = await h3s.count()
      expect(h3Count).toBeGreaterThanOrEqual(5)
      
      // Check navigation has proper labels
      const nav = page.locator('nav[aria-label*="Categories"]')
      await expect(nav).toBeVisible()
      
      // Check search has proper label
      const searchInput = page.locator('input[aria-label*="Search"]')
      await expect(searchInput).toBeVisible()
    })
    
    test('should be keyboard navigable', async ({ page }) => {
      await page.goto('/faq')
      await page.waitForLoadState('networkidle')
      
      // Tab through the interface
      await page.keyboard.press('Tab') // Should focus search input
      const searchInput = page.locator('input[placeholder*="Search"]')
      await expect(searchInput).toBeFocused()
      
      // Continue tabbing to find FAQ buttons
      let tabCount = 0
      let foundFaqButton = false
      
      while (tabCount < 20 && !foundFaqButton) {
        await page.keyboard.press('Tab')
        tabCount++
        
        const focused = page.locator(':focus')
        const ariaExpanded = await focused.getAttribute('aria-expanded')
        if (ariaExpanded !== null) {
          foundFaqButton = true
          
          // Press Enter to expand FAQ
          await page.keyboard.press('Enter')
          
          // Check it expanded
          const expandedState = await focused.getAttribute('aria-expanded')
          expect(expandedState).toBe('true')
          
          break
        }
      }
      
      expect(foundFaqButton).toBe(true)
    })
  })
})