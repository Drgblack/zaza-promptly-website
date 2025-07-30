import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n';
import { NextRequest, NextResponse } from 'next/server';

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always'
});

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Skip middleware for blog routes
  if (pathname.startsWith('/blog') || 
      pathname.startsWith('/api') || 
      pathname.startsWith('/_next') ||
      pathname.includes('.')) {
    return NextResponse.next();
  }
  
  // Use next-intl middleware for all other routes
  return intlMiddleware(request);
}

export const config = {
  matcher: [
    // Match all routes except those we want to exclude
    '/((?!api|_next/static|_next/image|_vercel|.*\\..*).+)',
    '/'
  ]
};