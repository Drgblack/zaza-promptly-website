import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n';

export default createMiddleware({
  // A list of all locales that are supported
  locales,
  
  // Used when no locale matches
  defaultLocale,
  
  // Never use a locale prefix for the default locale
  localePrefix: 'as-needed'
});

export const config = {
  // Match only internationalized pathnames
  matcher: [
    // Match all pathnames except for
    // - API routes
    // - _next (Next.js internals)
    // - _vercel (Vercel internals)
    // - Static files (.*\\..*) 
    // - Root files in public folder
    '/((?!api|_next|_vercel|.*\\..*|robots.txt|sitemap.xml|favicon.ico|manifest.json).*)'
  ]
};