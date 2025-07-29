/**
 * Rate limiting middleware for API routes
 * Prevents abuse and ensures fair usage
 */

import { NextRequest, NextResponse } from 'next/server'
import { checkRateLimit, rateLimitConfigs } from './validation'

interface RateLimitOptions {
  windowMs: number
  maxRequests: number
  message?: string
  skipSuccessfulRequests?: boolean
  skipFailedRequests?: boolean
  keyGenerator?: (req: NextRequest) => string
}

// In-memory rate limit store (use Redis in production)
class RateLimitStore {
  private store = new Map<string, { count: number; resetTime: number }>()

  get(key: string) {
    return this.store.get(key)
  }

  set(key: string, value: { count: number; resetTime: number }) {
    this.store.set(key, value)
  }

  delete(key: string) {
    this.store.delete(key)
  }

  cleanup() {
    const now = Date.now()
    for (const [key, data] of this.store.entries()) {
      if (data.resetTime < now) {
        this.store.delete(key)
      }
    }
  }
}

const store = new RateLimitStore()

// Cleanup old entries every 5 minutes
setInterval(() => store.cleanup(), 5 * 60 * 1000)

export function rateLimit(options: RateLimitOptions) {
  return async (req: NextRequest) => {
    const key = options.keyGenerator ? options.keyGenerator(req) : getClientIdentifier(req)
    
    const result = checkRateLimit(key, {
      windowMs: options.windowMs,
      maxRequests: options.maxRequests,
      skipSuccessfulRequests: options.skipSuccessfulRequests,
      skipFailedRequests: options.skipFailedRequests,
    })

    if (!result.allowed) {
      return NextResponse.json(
        {
          error: options.message || 'Too many requests, please try again later.',
          retryAfter: Math.ceil((result.resetTime - Date.now()) / 1000),
        },
        {
          status: 429,
          headers: {
            'X-RateLimit-Limit': options.maxRequests.toString(),
            'X-RateLimit-Remaining': result.remaining.toString(),
            'X-RateLimit-Reset': result.resetTime.toString(),
            'Retry-After': Math.ceil((result.resetTime - Date.now()) / 1000).toString(),
          },
        }
      )
    }

    return null // Allow the request to continue
  }
}

function getClientIdentifier(req: NextRequest): string {
  // Try to get real IP from various headers
  const forwarded = req.headers.get('x-forwarded-for')
  const realIp = req.headers.get('x-real-ip')
  const clientIp = req.headers.get('x-client-ip')
  
  let ip = forwarded || realIp || clientIp || '127.0.0.1'
  
  // Handle comma-separated IPs (take the first one)
  if (ip.includes(',')) {
    ip = ip.split(',')[0].trim()
  }
  
  // Add user agent to make identifier more unique
  const userAgent = req.headers.get('user-agent') || ''
  const userAgentHash = btoa(userAgent).substring(0, 10)
  
  return `${ip}:${userAgentHash}`
}

// Pre-configured rate limiters for common endpoints
export const generalRateLimit = rateLimit({
  ...rateLimitConfigs.general,
  message: 'Too many requests from this IP, please try again later.',
})

export const aiRateLimit = rateLimit({
  ...rateLimitConfigs.ai,
  message: 'Too many AI requests, please wait a moment before trying again.',
})

export const authRateLimit = rateLimit({
  ...rateLimitConfigs.auth,
  message: 'Too many authentication attempts, please try again in 15 minutes.',
})

export const contactRateLimit = rateLimit({
  ...rateLimitConfigs.contact,
  message: 'You can only submit the contact form 3 times per hour.',
})

export const subscriptionRateLimit = rateLimit({
  ...rateLimitConfigs.subscription,
  message: 'Too many subscription attempts, please wait a moment.',
})

// Strict rate limiter for sensitive endpoints
export const strictRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxRequests: 3,
  message: 'This action is rate limited. Please try again in 15 minutes.',
})

// Rate limiting by user ID (for authenticated endpoints)
export function createUserRateLimit(maxRequests: number, windowMs: number = 60 * 1000) {
  return rateLimit({
    windowMs,
    maxRequests,
    keyGenerator: (req: NextRequest) => {
      // Extract user ID from JWT token or session
      // This is a simplified example - implement proper auth token parsing
      const authHeader = req.headers.get('authorization')
      if (authHeader) {
        const token = authHeader.replace('Bearer ', '')
        // Parse JWT token to get user ID (implement proper JWT parsing)
        return `user:${token.substring(0, 10)}` // Simplified for example
      }
      return getClientIdentifier(req)
    },
    message: 'Too many requests for this user account.',
  })
}

// API wrapper that includes rate limiting
export function withRateLimit(
  rateLimiter: (req: NextRequest) => Promise<NextResponse | null>,
  handler: (req: NextRequest) => Promise<NextResponse>
) {
  return async (req: NextRequest) => {
    // Check rate limit first
    const rateLimitResponse = await rateLimiter(req)
    if (rateLimitResponse) {
      return rateLimitResponse
    }

    // Continue with the original handler
    return handler(req)
  }
}

// Middleware for Next.js API routes
export function createRateLimitedHandler(
  handler: (req: NextRequest) => Promise<NextResponse>,
  rateLimiter = generalRateLimit
) {
  return withRateLimit(rateLimiter, handler)
}

// Advanced rate limiting with different limits for different user types
export function adaptiveRateLimit(req: NextRequest) {
  const userAgent = req.headers.get('user-agent') || ''
  const isBot = /bot|crawler|spider|crawling/i.test(userAgent)
  
  if (isBot) {
    return rateLimit({
      windowMs: 60 * 1000, // 1 minute
      maxRequests: 10, // Very limited for bots
      message: 'Bot traffic is rate limited.',
    })(req)
  }

  // Check if premium user (implement your logic)
  const isPremium = checkPremiumStatus(req)
  
  if (isPremium) {
    return rateLimit({
      windowMs: 60 * 1000,
      maxRequests: 100, // Higher limit for premium users
      message: 'Premium rate limit exceeded.',
    })(req)
  }

  // Default rate limit for regular users
  return generalRateLimit(req)
}

function checkPremiumStatus(req: NextRequest): boolean {
  // Implement your premium user check logic
  // This could check JWT tokens, API keys, database, etc.
  const apiKey = req.headers.get('x-api-key')
  return apiKey?.startsWith('premium_') || false
}

// Rate limit monitoring and metrics
export interface RateLimitMetrics {
  totalRequests: number
  blockedRequests: number
  topIPs: Array<{ ip: string; count: number }>
  endpoint: string
  timestamp: number
}

class RateLimitMonitor {
  private metrics = new Map<string, RateLimitMetrics>()

  recordRequest(endpoint: string, ip: string, blocked: boolean) {
    const key = `${endpoint}:${new Date().toISOString().substring(0, 13)}` // Hour bucket
    const current = this.metrics.get(key) || {
      totalRequests: 0,
      blockedRequests: 0,
      topIPs: [],
      endpoint,
      timestamp: Date.now(),
    }

    current.totalRequests++
    if (blocked) current.blockedRequests++

    // Update top IPs
    const ipIndex = current.topIPs.findIndex(item => item.ip === ip)
    if (ipIndex >= 0) {
      current.topIPs[ipIndex].count++
    } else {
      current.topIPs.push({ ip, count: 1 })
    }

    // Keep only top 10 IPs
    current.topIPs.sort((a, b) => b.count - a.count)
    current.topIPs = current.topIPs.slice(0, 10)

    this.metrics.set(key, current)
  }

  getMetrics(endpoint?: string): RateLimitMetrics[] {
    const results = Array.from(this.metrics.values())
    return endpoint 
      ? results.filter(m => m.endpoint === endpoint)
      : results
  }

  cleanup(olderThan: number = 24 * 60 * 60 * 1000) { // 24 hours
    const cutoff = Date.now() - olderThan
    for (const [key, metrics] of this.metrics.entries()) {
      if (metrics.timestamp < cutoff) {
        this.metrics.delete(key)
      }
    }
  }
}

export const rateLimitMonitor = new RateLimitMonitor()

// Cleanup old metrics every hour
setInterval(() => rateLimitMonitor.cleanup(), 60 * 60 * 1000)

// Enhanced rate limiter with monitoring
export function monitoredRateLimit(options: RateLimitOptions & { endpoint: string }) {
  const baseRateLimit = rateLimit(options)
  
  return async (req: NextRequest) => {
    const ip = getClientIdentifier(req)
    const result = await baseRateLimit(req)
    const blocked = result !== null
    
    rateLimitMonitor.recordRequest(options.endpoint, ip, blocked)
    
    return result
  }
}