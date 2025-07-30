import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n';

export default createMiddleware({
  locales,
  defaultLocale,
  
  // Don't use localePrefix to avoid adding locale to non-localized routes
  localePrefix: 'as-needed',
  
  // Define which paths should be localized
  pathnames: {
    '/': '/',
    '/free-resources': '/free-resources',
    '/about': '/about',
    '/why-zaza-promptly': '/why-zaza-promptly',
    '/blog': '/blog'
  }
});

export const config = {
  // Only match paths that should be localized, exclude all others
  matcher: [
    // Match all paths except excluded ones
    '/((?!api|_next|_vercel|promptly-pricing|signup|contact|faqs|products|promptly-faq|support|cookies|about-founder|vision-mission|why-zaza-teach|zaza-ecosystem|generate-blog|privacy|terms|blog|robots|sitemap|checkout|manifest|favicon|sw|.*\\.).*)',
    
    // Explicitly include localized routes
    '/(en|de|fr|es|it)/:path*'
  ]
};