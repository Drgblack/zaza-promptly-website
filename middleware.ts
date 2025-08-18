import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n';
import { NextRequest } from 'next/server';

const intlMiddleware = createMiddleware({
  // A list of all locales that are supported
  locales,
  
  // Used when no locale matches
  defaultLocale,
  
  // Only use the locale prefix when it's not the default locale
  localePrefix: 'as-needed'
});

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hostname = request.headers.get('host') || '';
  
  // Only apply internationalization to blog routes and zazatechnologies.com domain
  if (hostname.includes('zazatechnologies.com') || pathname.startsWith('/blog') || pathname.startsWith('/en/blog') || pathname.startsWith('/de/blog')) {
    return intlMiddleware(request);
  }
  
  // For other domains/routes, let Next.js handle normally
  return;
}

export const config = {
  // Match only internationalized pathnames
  matcher: [
    // Match all pathnames except for:
    // - /api (API routes)
    // - /static (static files)
    // - /_next (Next.js internals)
    // - /_vercel (Vercel internals)
    // - Files with extensions (e.g. favicon.ico)
    '/((?!api|_next|_vercel|static|favicon.ico|robots.txt|sitemap.xml|og-image.png|.*\\..*).*)'
  ]
};