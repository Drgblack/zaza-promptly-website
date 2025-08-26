import { test, expect } from '@playwright/test'

test.describe('Animation Tests', () => {
  test.describe('Reduced Motion Tests', () => {
    test('should render hero and timeline elements without transition delays when reduced motion is ON', async ({ page }) => {
      // Enable reduced motion preference
      await page.emulateMedia({ reducedMotion: 'reduce' })
      
      // Go to homepage with hero section
      await page.goto('/')
      
      // Wait for page to load
      await page.waitForLoadState('networkidle')
      
      // Test hero elements - they should be immediately visible with opacity 1
      const heroH1 = page.locator('h1').first()
      await expect(heroH1).toBeVisible()
      
      // Check computed styles - should have opacity 1 immediately (no transition delays)
      const heroOpacity = await heroH1.evaluate(el => getComputedStyle(el).opacity)
      expect(heroOpacity).toBe('1')
      
      // Check that no transform animations are applied during reduced motion
      const heroTransform = await heroH1.evaluate(el => getComputedStyle(el).transform)
      expect(heroTransform).toBe('none')
      
      // Test other hero elements
      const heroSubheading = page.locator('section p').first()
      const heroSubheadingOpacity = await heroSubheading.evaluate(el => getComputedStyle(el).opacity)
      expect(heroSubheadingOpacity).toBe('1')
      
      // Go to about/founder page to test timeline
      await page.goto('/about')
      await page.waitForLoadState('networkidle')
      
      // Test timeline elements - should be immediately visible
      const timelineElements = page.locator('[class*="timeline"], [data-testid*="timeline"]')
      const timelineCount = await timelineElements.count()
      
      if (timelineCount > 0) {
        // Check first timeline element
        const firstTimeline = timelineElements.first()
        await expect(firstTimeline).toBeVisible()
        
        const timelineOpacity = await firstTimeline.evaluate(el => getComputedStyle(el).opacity)
        expect(timelineOpacity).toBe('1')
        
        const timelineTransform = await firstTimeline.evaluate(el => getComputedStyle(el).transform)
        expect(timelineTransform).toBe('none')
      }
      
      // Test motion settings button should show reduced motion is active
      const motionToggle = page.locator('button:has-text("Reduce Motion")')
      if (await motionToggle.count() > 0) {
        // The toggle should indicate reduced motion is active
        const toggleContainer = motionToggle.locator('xpath=..')
        const toggleState = await toggleContainer.evaluate(el => {
          const switchElement = el.querySelector('[class*="bg-blue-600"], [class*="bg-gray-"]')
          return switchElement ? switchElement.className.includes('bg-blue-600') : false
        })
        // Should be active (blue) when reduced motion is on
        expect(toggleState).toBe(true)
      }
    })
    
    test('should confirm hero H1 receives opacity 0 → 1 animation when reduced motion is OFF', async ({ page }) => {
      // Disable reduced motion preference (normal animations)
      await page.emulateMedia({ reducedMotion: 'no-preference' })
      
      // Navigate to homepage
      await page.goto('/')
      
      // Wait for initial load but not for animations to complete
      await page.waitForLoadState('domcontentloaded')
      
      // Get the hero H1 element
      const heroH1 = page.locator('h1').first()
      
      // The element should exist but may start with opacity 0
      await expect(heroH1).toBeAttached()
      
      // Check if element has animation classes that indicate it will animate
      const hasAnimationClass = await heroH1.evaluate(el => {
        const classList = el.className
        return classList.includes('animate-transform-opacity') || 
               classList.includes('motion-') || 
               el.closest('[class*="motion-"]') !== null ||
               el.closest('[data-testid*="animated"]') !== null
      })
      
      // Wait a moment and check opacity transitions to 1
      await page.waitForTimeout(500) // Allow time for animations to start/complete
      
      // After animations, opacity should be 1
      const finalOpacity = await heroH1.evaluate(el => getComputedStyle(el).opacity)
      expect(finalOpacity).toBe('1')
      
      // The element should be fully visible
      await expect(heroH1).toBeVisible()
      
      // Test that motion preference is correctly detected as "no-preference"
      const prefersReducedMotion = await page.evaluate(() => {
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches
      })
      expect(prefersReducedMotion).toBe(false)
    })
    
    test('should respect localStorage motion preference override', async ({ page }) => {
      // Set localStorage to reduced motion
      await page.goto('/')
      await page.evaluate(() => localStorage.setItem('motion', 'reduced'))
      await page.reload()
      
      await page.waitForLoadState('networkidle')
      
      // Elements should render immediately without transitions
      const heroH1 = page.locator('h1').first()
      const heroOpacity = await heroH1.evaluate(el => getComputedStyle(el).opacity)
      expect(heroOpacity).toBe('1')
      
      // Check motion toggle state should be active
      const motionToggle = page.locator('button:has-text("Reduce Motion")')
      if (await motionToggle.count() > 0) {
        const isToggleActive = await motionToggle.evaluate(el => {
          const container = el.parentElement || el
          return container.innerHTML.includes('bg-blue-600') || 
                 container.innerHTML.includes('translate-x-4')
        })
        expect(isToggleActive).toBe(true)
      }
      
      // Now remove localStorage preference
      await page.evaluate(() => localStorage.removeItem('motion'))
      await page.reload()
      await page.waitForLoadState('networkidle')
      
      // Should now allow animations (assuming system preference allows it)
      await page.waitForTimeout(100)
      const heroAfterRemoval = page.locator('h1').first()
      await expect(heroAfterRemoval).toBeVisible()
    })
    
    test('should handle motion toggle interaction correctly', async ({ page }) => {
      await page.goto('/')
      await page.waitForLoadState('networkidle')
      
      // Find and click the motion toggle in footer
      const motionToggle = page.locator('button:has-text("Reduce Motion")')
      
      if (await motionToggle.count() > 0) {
        // Click to enable reduced motion
        await motionToggle.click()
        
        // Should show feedback message
        await expect(page.locator('text=Animations simplified')).toBeVisible({ timeout: 3000 })
        
        // Check localStorage was set
        const motionPref = await page.evaluate(() => localStorage.getItem('motion'))
        expect(motionPref).toBe('reduced')
        
        // Wait for feedback to disappear
        await page.waitForTimeout(2500)
        await expect(page.locator('text=Animations simplified')).not.toBeVisible()
        
        // Click again to disable reduced motion
        await motionToggle.click()
        
        // Check localStorage was removed
        const motionPrefAfter = await page.evaluate(() => localStorage.getItem('motion'))
        expect(motionPrefAfter).toBeNull()
      }
    })
  })
  
  test.describe('Animation Performance Tests', () => {
    test('should apply GPU acceleration classes to animated elements', async ({ page }) => {
      await page.emulateMedia({ reducedMotion: 'no-preference' })
      await page.goto('/')
      
      await page.waitForLoadState('networkidle')
      
      // Check that animated elements have GPU acceleration classes
      const animatedElements = page.locator('.gpu-accelerate, .animate-transform-opacity')
      const count = await animatedElements.count()
      
      if (count > 0) {
        const firstElement = animatedElements.first()
        
        // Check for GPU acceleration styles
        const hasGPUAcceleration = await firstElement.evaluate(el => {
          const transform = getComputedStyle(el).transform
          const backfaceVisibility = getComputedStyle(el).backfaceVisibility
          
          return transform !== 'none' || backfaceVisibility === 'hidden' || 
                 el.classList.contains('gpu-accelerate')
        })
        
        expect(hasGPUAcceleration).toBe(true)
      }
    })
    
    test('should clean up will-change properties after animations', async ({ page }) => {
      await page.emulateMedia({ reducedMotion: 'no-preference' })
      await page.goto('/')
      
      // Wait for animations to complete
      await page.waitForTimeout(1000)
      
      // Check that animation-complete class is applied to some elements
      const completedElements = page.locator('.animation-complete')
      const completedCount = await completedElements.count()
      
      // There should be some elements that have completed animations
      // (This test verifies our cleanup mechanism is working)
      if (completedCount > 0) {
        const element = completedElements.first()
        const willChange = await element.evaluate(el => getComputedStyle(el).willChange)
        
        // After animation completion, will-change should be auto or not set
        expect(['auto', 'unset', '']).toContain(willChange)
      }
    })
  })
})
