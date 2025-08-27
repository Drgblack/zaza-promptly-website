import { NextRequest, NextResponse } from 'next/server'
import { supportedLocales, defaultLocale } from './lib/i18n'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Check if pathname has a locale prefix
  const pathnameHasLocale = supportedLocales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  // If no locale prefix, redirect to default locale
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

    // Redirect all paths to include default locale prefix
    return NextResponse.redirect(new URL(`/${defaultLocale}${pathname}`, request.url))
  }

  // If locale is in path, rewrite to the actual page location
  const locale = supportedLocales.find(
    (l) => pathname.startsWith(`/${l}/`) || pathname === `/${l}`
  )
  
  if (locale) {
    const pathWithoutLocale = pathname.replace(`/${locale}`, '') || '/'
    
    // Handle homepage - rewrite to [locale] route
    if (pathWithoutLocale === '/') {
      return NextResponse.next()
    }
    
    // For all other paths, rewrite to the original page location
    // but keep the locale in the URL for the user
    const url = request.nextUrl.clone()
    url.pathname = pathWithoutLocale
    return NextResponse.rewrite(url)
  }

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