// Temporarily disable middleware to fix homepage 404 issue
// The middleware is interfering with the root route

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Simply pass through all requests without modification
  return NextResponse.next()
}

export const config = {
  // Only match specific locale-prefixed paths to avoid interfering with main routes
  matcher: [
    '/(de|fr|es|it)/:path*'
  ]
};