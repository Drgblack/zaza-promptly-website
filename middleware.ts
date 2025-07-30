import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n';

export default createMiddleware({
  locales,
  defaultLocale,
  
  // Use never to always include locale in URL
  localePrefix: 'always'
});

export const config = {
  matcher: [
    // Match all paths that should be internationalized
    '/((?!api|_next|_vercel|.*\\..*|robots|sitemap|manifest|favicon).*)'
  ]
};