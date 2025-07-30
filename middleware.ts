import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Only handle very specific redirects for localized content
  // Redirect /free-resources to /en/free-resources
  if (pathname === '/free-resources') {
    return NextResponse.redirect(new URL('/en/free-resources', request.url))
  }
  
  // Redirect /about to /en/about
  if (pathname === '/about') {
    return NextResponse.redirect(new URL('/en/about', request.url))
  }
  
  // Redirect /why-zaza-promptly to /en/why-zaza-promptly
  if (pathname === '/why-zaza-promptly') {
    return NextResponse.redirect(new URL('/en/why-zaza-promptly', request.url))
  }
  
  // Pass through everything else without modification
  return NextResponse.next()
}

export const config = {
  // Only match the specific paths that need redirects
  matcher: [
    '/free-resources',
    '/about',
    '/why-zaza-promptly'
  ]
};