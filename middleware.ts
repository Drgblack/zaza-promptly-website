import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n';

export default createMiddleware({
  // A list of all locales that are supported
  locales,
  
  // Used when no locale matches
  defaultLocale
});

export const config = {
  // Only match specific paths that need internationalization
  // Exclude paths that should remain non-localized
  matcher: [
    // Include localized paths
    '/(en|de|fr|es|it)/:path*',
    // Include root paths that should redirect to default locale
    '/((?!api|_next|_vercel|promptly-pricing|signup|contact|faqs|products|promptly-faq|support|cookies|about-founder|vision-mission|why-zaza-teach|zaza-ecosystem|generate-blog|privacy|terms|blog|robots|sitemap|.*\\..*).*)'
  ]
};