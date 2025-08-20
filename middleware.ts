import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n';
import { NextRequest } from 'next/server';

const intlMiddleware = createMiddleware({
  // A list of all locales that are supported
  locales,
  // Used when no locale matches
  defaultLocale,
  // Always show locale prefix for clarity
  localePrefix: 'always'
});

export default function middleware(request: NextRequest) {
  // For zazapromptly.com, apply internationalization to all routes
  // This ensures proper locale routing with the [locale] folder structure
  return intlMiddleware(request);
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