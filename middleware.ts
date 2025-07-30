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
    // Explicitly match locale paths
    '/(en|de|fr|es|it)/:path*',
    // Match root for locale redirect
    '/',
    // Match any other path that should be internationalized (excluding specific routes)
    '/((?!api|_next|_vercel|.*\\..*|blog|robots|sitemap|manifest|favicon|about-founder|vision-mission|why-zaza-teach|zaza-ecosystem|generate-blog|privacy|terms|checkout|contact|faqs|products|promptly-faq|promptly-pricing|support|cookies|signup|free-resources).+)'
  ]
};