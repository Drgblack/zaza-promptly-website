import { test, expect } from '@playwright/test'

test.describe('API Endpoints', () => {
  test('/api/ping returns { ok: true }', async ({ request }) => {
    // Make API request to ping endpoint
    const response = await request.get('/api/ping')
    
    // Check response status
    expect(response.status()).toBe(200)
    
    // Check response headers
    expect(response.headers()['content-type']).toContain('application/json')
    
    // Check response body
    const responseBody = await response.json()
    expect(responseBody.ok).toBe(true)
    expect(responseBody).toHaveProperty('marker')
    expect(responseBody).toHaveProperty('ts')
    expect(typeof responseBody.ts).toBe('number')
  })
  
  test('/api/ping responds quickly', async ({ request }) => {
    const startTime = Date.now()
    
    const response = await request.get('/api/ping')
    
    const endTime = Date.now()
    const responseTime = endTime - startTime
    
    expect(response.status()).toBe(200)
    // API should respond within 1 second
    expect(responseTime).toBeLessThan(1000)
  })
  
  test('/api/ping handles multiple concurrent requests', async ({ request }) => {
    // Make 5 concurrent requests
    const requests = Array(5).fill(null).map(() => request.get('/api/ping'))
    
    const responses = await Promise.all(requests)
    
    // All requests should succeed
    for (const response of responses) {
      expect(response.status()).toBe(200)
      const body = await response.json()
      expect(body.ok).toBe(true)
      expect(body).toHaveProperty('ts')
    }
  })
  
  test('/api/ping from page context', async ({ page }) => {
    // Test API from page context (simulating browser fetch)
    await page.goto('/')
    
    const response = await page.evaluate(async () => {
      const res = await fetch('/api/ping')
      return {
        status: res.status,
        body: await res.json()
      }
    })
    
    expect(response.status).toBe(200)
    expect(response.body.ok).toBe(true)
    expect(response.body).toHaveProperty('ts')
  })
})