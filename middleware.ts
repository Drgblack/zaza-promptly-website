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

  // Apply internationalization to all routes for zazapromptly.com
  // This will handle locale routing properly with the [locale] folder structure
  if (hostname.includes('zazapromptly.com') || 
      pathname.startsWith('/en') || 
      pathname.startsWith('/de') || 
      pathname.startsWith('/es') || 
      pathname.startsWith('/fr') || 
      pathname.startsWith('/it')) {
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