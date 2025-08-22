import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test.describe('Accessibility Tests', () => {
  test('Homepage accessibility audit', async ({ page }) => {
    await page.goto('/')
    
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze()
    
    console.log('=== AXE ACCESSIBILITY RESULTS ===')
    console.log(`Violations: ${accessibilityScanResults.violations.length}`)
    console.log(`Passes: ${accessibilityScanResults.passes.length}`)
    console.log(`Incomplete: ${accessibilityScanResults.incomplete.length}`)
    
    if (accessibilityScanResults.violations.length > 0) {
      console.log('\n=== TOP 5 VIOLATIONS ===')
      accessibilityScanResults.violations.slice(0, 5).forEach((violation, index) => {
        console.log(`\n${index + 1}. ${violation.id}: ${violation.description}`)
        console.log(`   Impact: ${violation.impact}`)
        console.log(`   Help: ${violation.help}`)
        console.log(`   Elements: ${violation.nodes.length} affected`)
        if (violation.nodes.length > 0) {
          console.log(`   Example: ${violation.nodes[0].html.substring(0, 100)}...`)
        }
      })
    }
    
    if (accessibilityScanResults.incomplete.length > 0) {
      console.log('\n=== INCOMPLETE CHECKS (needs manual review) ===')
      accessibilityScanResults.incomplete.slice(0, 3).forEach((incomplete, index) => {
        console.log(`\n${index + 1}. ${incomplete.id}: ${incomplete.description}`)
        console.log(`   Elements: ${incomplete.nodes.length} need manual review`)
      })
    }
    
    // Fail if there are critical or serious violations
    const criticalViolations = accessibilityScanResults.violations.filter(
      v => v.impact === 'critical' || v.impact === 'serious'
    )
    
    if (criticalViolations.length > 0) {
      console.log(`\n⚠️  Found ${criticalViolations.length} critical/serious accessibility issues`)
    }
    
    expect(accessibilityScanResults.violations.length).toBeLessThan(10)
  })
  
  test('Contact form accessibility', async ({ page }) => {
    await page.goto('/contact')
    
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze()
    
    console.log('\n=== CONTACT FORM A11Y RESULTS ===')
    console.log(`Violations: ${accessibilityScanResults.violations.length}`)
    
    if (accessibilityScanResults.violations.length > 0) {
      accessibilityScanResults.violations.forEach((violation, index) => {
        console.log(`${index + 1}. ${violation.id}: ${violation.description}`)
      })
    }
    
    expect(accessibilityScanResults.violations.length).toBeLessThan(5)
  })
  
  test('Snippet tool accessibility', async ({ page }) => {
    await page.goto('/#snippet')
    
    // Wait for the snippet tool to load
    await page.waitForSelector('#snippet', { timeout: 5000 })
    
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze()
    
    console.log('\n=== SNIPPET TOOL A11Y RESULTS ===')
    console.log(`Violations: ${accessibilityScanResults.violations.length}`)
    
    if (accessibilityScanResults.violations.length > 0) {
      accessibilityScanResults.violations.forEach((violation, index) => {
        console.log(`${index + 1}. ${violation.id}: ${violation.description}`)
      })
    }
    
    expect(accessibilityScanResults.violations.length).toBeLessThan(5)
  })
})