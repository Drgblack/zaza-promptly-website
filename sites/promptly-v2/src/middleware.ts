import { NextRequest, NextResponse } from 'next/server'
import { supportedLocales, defaultLocale } from './lib/i18n'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Check if pathname has a locale prefix
  const pathnameHasLocale = supportedLocales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  // If no locale prefix and not the default locale path, redirect to default locale
  if (!pathnameHasLocale) {
    // Don't redirect API routes, static files, or Next.js internal paths
    if (
      pathname.startsWith('/api') ||
      pathname.startsWith('/_next') ||
      pathname.startsWith('/images') ||
      pathname.startsWith('/fonts') ||
      pathname.startsWith('/icons') ||
      pathname.includes('.') ||
      pathname.startsWith('/favicon') ||
      pathname.startsWith('/robots') ||
      pathname.startsWith('/sitemap')
    ) {
      return NextResponse.next()
    }

    // Only redirect the root path to locale routing for now
    if (pathname === '/') {
      return NextResponse.redirect(new URL(`/${defaultLocale}`, request.url))
    }
    
    // For all other paths, let them through to existing route structure
    return NextResponse.next()
  }

  // If locale is in path, continue normally
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public folder)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|images|fonts|icons|robots.txt|sitemap.xml).*)',
  ],
}