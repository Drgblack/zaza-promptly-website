// sites/promptly-v2/src/middleware.ts
import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';

const intlMiddleware = createMiddleware({
  locales: ['en', 'de'],
  defaultLocale: 'en',
  localePrefix: 'always' // we're using /[locale]/... routes
});

export default function middleware(request: NextRequest) {
  // Apply internationalization middleware first
  const response = intlMiddleware(request);
  
  // Add security headers
  const headers = new Headers(response.headers);
  
  // Additional security headers not covered by next.config.mjs
  headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  
  // Rate limiting preparation - add client IP to headers for future use
  const forwardedFor = request.headers.get('x-forwarded-for');
  const clientIP = forwardedFor ? forwardedFor.split(',')[0] : request.ip || 'unknown';
  headers.set('x-client-ip', clientIP);
  
  // Create new response with updated headers
  return new NextResponse(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

export const config = {
  matcher: ['/((?!_next|.*\\..*|api).*)']
};
