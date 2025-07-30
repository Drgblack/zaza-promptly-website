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
    // Include all paths EXCEPT the excluded ones
    '/((?!api|_next|_vercel|blog|.*\\..*|robots|sitemap|manifest|favicon|about-founder|vision-mission|why-zaza-teach|zaza-ecosystem|generate-blog|privacy|terms|checkout|contact|faqs|products|promptly-faq|promptly-pricing|support|cookies|signup|free-resources).*)',
    // Explicitly include root for locale redirect
    '/'
  ]
};