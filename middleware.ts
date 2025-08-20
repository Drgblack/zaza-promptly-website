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
  // Temporarily disabled internationalization middleware to fix 404 routing issues
  // The site will use the root-level pages in app/ directory
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