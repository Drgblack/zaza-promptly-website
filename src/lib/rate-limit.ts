import { NextRequest } from 'next/server';

export interface RateLimitResult {
  success: boolean;
  remaining: number;
  resetTime: number;
  error?: string;
}

export interface RateLimitConfig {
  // Number of requests allowed
  limit: number;
  // Time window in seconds
  window: number;
  // Custom key generator (defaults to IP-based)
  keyGenerator?: (req: NextRequest) => string;
  // Skip rate limiting for certain conditions
  skip?: (req: NextRequest) => boolean;
}

// Simple in-memory storage (replace with Redis in production)
const store = new Map<string, { count: number; resetTime: number }>();

// Clean up expired entries periodically
setInterval(() => {
  const now = Date.now();
  for (const [key, value] of store.entries()) {
    if (now > value.resetTime) {
      store.delete(key);
    }
  }
}, 5 * 60 * 1000); // Clean every 5 minutes

function getClientIP(req: NextRequest): string {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip') ||
    req.ip ||
    '127.0.0.1'
  );
}

export function rateLimit(config: RateLimitConfig) {
  return async function checkRateLimit(req: NextRequest): Promise<RateLimitResult> {
    // Skip if configured to do so
    if (config.skip && config.skip(req)) {
      return {
        success: true,
        remaining: config.limit,
        resetTime: Date.now() + config.window * 1000,
      };
    }

    // Generate key
    const key = config.keyGenerator 
      ? config.keyGenerator(req)
      : `ratelimit:${getClientIP(req)}`;

    const now = Date.now();
    const windowMs = config.window * 1000;
    const resetTime = now + windowMs;

    // Get or create rate limit entry
    const existing = store.get(key);
    
    if (!existing || now > existing.resetTime) {
      // First request in this window
      store.set(key, { count: 1, resetTime });
      return {
        success: true,
        remaining: config.limit - 1,
        resetTime,
      };
    }

    // Increment count
    existing.count += 1;
    
    if (existing.count > config.limit) {
      // Rate limit exceeded
      return {
        success: false,
        remaining: 0,
        resetTime: existing.resetTime,
        error: `Rate limit exceeded. Try again in ${Math.ceil((existing.resetTime - now) / 1000)} seconds.`,
      };
    }

    // Within limits
    return {
      success: true,
      remaining: config.limit - existing.count,
      resetTime: existing.resetTime,
    };
  };
}

// Predefined rate limit configurations for common use cases

// For AI/OpenAI API endpoints - more restrictive
export const aiRateLimit = rateLimit({
  limit: 10, // 10 requests
  window: 60, // per minute
});

// For contact/subscription forms - moderate
export const formRateLimit = rateLimit({
  limit: 5, // 5 submissions  
  window: 300, // per 5 minutes
});

// For general API endpoints - lenient
export const generalRateLimit = rateLimit({
  limit: 100, // 100 requests
  window: 60, // per minute
});

// For analytics/tracking - very lenient
export const analyticsRateLimit = rateLimit({
  limit: 1000, // 1000 requests
  window: 60, // per minute
});

// Utility function to apply rate limiting to API routes
export function withRateLimit(
  rateLimitFn: (req: NextRequest) => Promise<RateLimitResult>,
  handler: (req: NextRequest) => Promise<Response>
) {
  return async function rateLimitedHandler(req: NextRequest): Promise<Response> {
    const result = await rateLimitFn(req);
    
    if (!result.success) {
      return new Response(
        JSON.stringify({
          error: result.error || 'Too many requests',
          retryAfter: Math.ceil((result.resetTime - Date.now()) / 1000),
        }),
        {
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            'Retry-After': Math.ceil((result.resetTime - Date.now()) / 1000).toString(),
            'X-RateLimit-Limit': '10', // Would be dynamic in real implementation
            'X-RateLimit-Remaining': result.remaining.toString(),
            'X-RateLimit-Reset': result.resetTime.toString(),
          },
        }
      );
    }

    // Add rate limit headers to successful responses
    const response = await handler(req);
    
    // Clone response to add headers
    const newResponse = new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    });

    newResponse.headers.set('X-RateLimit-Remaining', result.remaining.toString());
    newResponse.headers.set('X-RateLimit-Reset', result.resetTime.toString());
    
    return newResponse;
  };
}