// Temporarily disable all middleware to test if routes work
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Pass through all requests without any modification
  return NextResponse.next()
}

export const config = {
  // Don't match any routes - effectively disable middleware
  matcher: []
};