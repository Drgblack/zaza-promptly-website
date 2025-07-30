import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // List of non-localized routes that should pass through without modification
  const nonLocalizedRoutes = [
    '/promptly-pricing',
    '/signup', 
    '/contact',
    '/faqs',
    '/products',
    '/promptly-faq',
    '/support',
    '/cookies',
    '/about-founder',
    '/vision-mission', 
    '/why-zaza-teach',
    '/zaza-ecosystem',
    '/generate-blog',
    '/privacy',
    '/terms',
    '/blog',
    '/robots.txt',
    '/sitemap.xml'
  ]
  
  // If it's a non-localized route, let it pass through
  if (nonLocalizedRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.next()
  }
  
  // If it's an API route, static file, or Next.js internal route, let it pass through
  if (pathname.startsWith('/api') || 
      pathname.startsWith('/_next') || 
      pathname.startsWith('/_vercel') ||
      pathname.includes('.')) {
    return NextResponse.next()
  }
  
  // For the homepage, let it pass through
  if (pathname === '/') {
    return NextResponse.next()
  }
  
  // For localized routes like /en/free-resources, /de/about, etc., let them pass through
  if (pathname.match(/^\/(en|de|fr|es|it)\//)) {
    return NextResponse.next()
  }
  
  // For any other routes that might need localization, redirect to English version
  const locales = ['en', 'de', 'fr', 'es', 'it']
  const defaultLocale = 'en'
  
  // If the path doesn't start with a locale, redirect to default locale
  if (!locales.some(locale => pathname.startsWith(`/${locale}/`))) {
    // Only redirect specific paths that we know should be localized
    const localizedPaths = ['/free-resources', '/about', '/why-zaza-promptly']
    
    if (localizedPaths.some(path => pathname.startsWith(path))) {
      return NextResponse.redirect(new URL(`/${defaultLocale}${pathname}`, request.url))
    }
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: [
    // Match all paths except static files and API routes
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ]
};