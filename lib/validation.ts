/**
 * Comprehensive input validation for Zaza Promptly
 * Protects against XSS, injection attacks, and malformed data
 */

import { z } from 'zod'

// Email validation with educational domain awareness
export const emailSchema = z
  .string()
  .email('Please enter a valid email address')
  .min(5, 'Email must be at least 5 characters')
  .max(100, 'Email must be less than 100 characters')
  .refine(
    (email) => !email.includes('<') && !email.includes('>'),
    'Email contains invalid characters'
  )

// Name validation (for forms)
export const nameSchema = z
  .string()
  .min(2, 'Name must be at least 2 characters')
  .max(50, 'Name must be less than 50 characters')
  .regex(/^[a-zA-Z\s'-]+$/, 'Name can only contain letters, spaces, hyphens, and apostrophes')
  .refine(
    (name) => !/<script|javascript:|data:/i.test(name),
    'Name contains unsafe content'
  )

// Message validation (for contact forms)
export const messageSchema = z
  .string()
  .min(10, 'Message must be at least 10 characters')
  .max(2000, 'Message must be less than 2000 characters')
  .refine(
    (message) => !/<script|javascript:|data:|vbscript:|onload|onerror/i.test(message),
    'Message contains unsafe content'
  )

// School/Organization validation
export const organizationSchema = z
  .string()
  .min(2, 'Organization name must be at least 2 characters')
  .max(100, 'Organization name must be less than 100 characters')
  .optional()

// Phone number validation
export const phoneSchema = z
  .string()
  .regex(/^[\d\s\-\+\(\)]+$/, 'Phone number can only contain digits, spaces, hyphens, plus signs, and parentheses')
  .min(10, 'Phone number must be at least 10 digits')
  .max(20, 'Phone number must be less than 20 characters')
  .optional()

// Brevo subscription schema
export const brevoSubscriptionSchema = z.object({
  email: emailSchema,
  name: nameSchema.optional(),
  source: z.string().optional(),
  tags: z.array(z.string()).optional(),
  attributes: z.record(z.string()).optional(),
})

// Contact form schema
export const contactFormSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  organization: organizationSchema,
  phone: phoneSchema,
  message: messageSchema,
  subject: z.string().min(5, 'Subject must be at least 5 characters').max(100, 'Subject must be less than 100 characters'),
  consent: z.boolean().refine(val => val === true, 'You must agree to the privacy policy'),
})

// Stripe checkout validation
export const stripeCheckoutSchema = z.object({
  priceId: z.string().regex(/^price_[a-zA-Z0-9]+$/, 'Invalid price ID'),
  email: emailSchema.optional(),
  customerInfo: z.object({
    name: nameSchema,
    email: emailSchema,
    phone: phoneSchema,
  }).optional(),
  metadata: z.record(z.string()).optional(),
})

// AI prompt validation (for GPT endpoints)
export const aiPromptSchema = z.object({
  prompt: z
    .string()
    .min(10, 'Prompt must be at least 10 characters')
    .max(2000, 'Prompt must be less than 2000 characters')
    .refine(
      (prompt) => !/<script|javascript:|data:|vbscript:|eval\(|Function\(/i.test(prompt),
      'Prompt contains unsafe content'
    ),
  context: z.string().max(1000, 'Context must be less than 1000 characters').optional(),
  tone: z.enum(['professional', 'friendly', 'formal', 'casual']).optional(),
  length: z.enum(['short', 'medium', 'long']).optional(),
})

// File upload validation
export const fileUploadSchema = z.object({
  file: z.any().refine(
    (file) => file instanceof File,
    'Invalid file'
  ).refine(
    (file) => file.size <= 5 * 1024 * 1024, // 5MB
    'File size must be less than 5MB'
  ).refine(
    (file) => ['image/jpeg', 'image/png', 'image/webp', 'application/pdf', 'text/plain'].includes(file.type),
    'File type not supported. Please use JPEG, PNG, WebP, PDF, or plain text files.'
  ),
  purpose: z.enum(['profile', 'document', 'feedback']),
})

// API rate limiting schemas
export const rateLimitSchema = z.object({
  ip: z.string().ip(),
  endpoint: z.string(),
  windowMs: z.number().positive(),
  maxRequests: z.number().positive(),
})

// Sanitization functions
export function sanitizeString(input: string): string {
  return input
    .replace(/[<>]/g, '') // Remove angle brackets
    .replace(/javascript:/gi, '') // Remove javascript: URLs
    .replace(/data:/gi, '') // Remove data: URLs
    .replace(/vbscript:/gi, '') // Remove vbscript: URLs
    .replace(/on\w+=/gi, '') // Remove event handlers
    .trim()
}

export function sanitizeEmail(email: string): string {
  return email.toLowerCase().trim().replace(/[<>"']/g, '')
}

export function sanitizeHtml(input: string): string {
  // Basic HTML sanitization - for production, consider using DOMPurify
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi, '')
    .replace(/<embed\b[^<]*(?:(?!<\/embed>)<[^<]*)*<\/embed>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/data:/gi, '')
    .replace(/vbscript:/gi, '')
}

// Validation wrapper with error handling
export function validateInput<T>(
  schema: z.ZodSchema<T>,
  input: unknown
): { success: true; data: T } | { success: false; errors: string[] } {
  try {
    const result = schema.parse(input)
    return { success: true, data: result }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        errors: error.errors.map(err => `${err.path.join('.')}: ${err.message}`)
      }
    }
    return {
      success: false,
      errors: ['Validation failed']
    }
  }
}

// CSRF token validation
export function generateCSRFToken(): string {
  return btoa(Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15))
}

export function validateCSRFToken(token: string, storedToken: string): boolean {
  return token === storedToken && token.length > 10
}

// Rate limiting utilities
interface RateLimitConfig {
  windowMs: number
  maxRequests: number
  skipSuccessfulRequests?: boolean
  skipFailedRequests?: boolean
}

const requestCounts = new Map<string, { count: number; resetTime: number }>()

export function checkRateLimit(
  identifier: string,
  config: RateLimitConfig
): { allowed: boolean; remaining: number; resetTime: number } {
  const now = Date.now()
  const windowStart = now - config.windowMs
  
  // Clean up old entries
  for (const [key, data] of requestCounts.entries()) {
    if (data.resetTime < now) {
      requestCounts.delete(key)
    }
  }
  
  const current = requestCounts.get(identifier)
  
  if (!current || current.resetTime < now) {
    // New window
    const resetTime = now + config.windowMs
    requestCounts.set(identifier, { count: 1, resetTime })
    return {
      allowed: true,
      remaining: config.maxRequests - 1,
      resetTime
    }
  }
  
  if (current.count >= config.maxRequests) {
    return {
      allowed: false,
      remaining: 0,
      resetTime: current.resetTime
    }
  }
  
  current.count++
  return {
    allowed: true,
    remaining: config.maxRequests - current.count,
    resetTime: current.resetTime
  }
}

// Common rate limit configurations
export const rateLimitConfigs = {
  general: { windowMs: 15 * 60 * 1000, maxRequests: 100 }, // 100 requests per 15 minutes
  auth: { windowMs: 15 * 60 * 1000, maxRequests: 5 }, // 5 attempts per 15 minutes
  ai: { windowMs: 60 * 1000, maxRequests: 10 }, // 10 requests per minute
  contact: { windowMs: 60 * 60 * 1000, maxRequests: 3 }, // 3 requests per hour
  subscription: { windowMs: 60 * 1000, maxRequests: 5 }, // 5 requests per minute
}

// Input sanitization middleware
export function createValidationMiddleware<T>(schema: z.ZodSchema<T>) {
  return (input: unknown) => {
    const validation = validateInput(schema, input)
    if (!validation.success) {
      throw new Error(`Validation failed: ${(validation as any).errors.join(', ')}`)
    }
    return validation.data
  }
}

// Security headers validation
export const securityHeaders = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
  'Content-Security-Policy': `
    default-src 'self';
    script-src 'self' 'unsafe-eval' 'unsafe-inline' https://js.stripe.com https://www.googletagmanager.com;
    style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
    font-src 'self' https://fonts.gstatic.com;
    img-src 'self' data: https: blob:;
    connect-src 'self' https://api.stripe.com https://api.brevo.com https://api.openai.com https://www.google-analytics.com;
    frame-src https://js.stripe.com;
  `.replace(/\s+/g, ' ').trim()
}

// Environment-specific validation
export function validateEnvironment() {
  const requiredEnvVars = [
    'STRIPE_SECRET_KEY',
    'NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY',
    'BREVO_API_KEY',
    'OPENAI_API_KEY',
  ]

  const missing = requiredEnvVars.filter(
    varName => !process.env[varName] || process.env[varName]?.includes('placeholder')
  )

  if (missing.length > 0 && process.env.NODE_ENV === 'production') {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`)
  }

  return {
    isValid: missing.length === 0,
    missingVars: missing,
  }
}