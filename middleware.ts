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
    // Match all paths except excluded ones
    '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|blog).*)'
  ]
};