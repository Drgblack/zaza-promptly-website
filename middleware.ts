import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n';

export default createMiddleware({
  // A list of all locales that are supported
  locales,

  // Used when no locale matches
  defaultLocale,

  // The locale prefix strategy - never prefix default locale
  localePrefix: 'never',

  // Enable automatic locale detection from Accept-Language header
  localeDetection: false,

  // Custom path matcher - exclude API routes, static files, etc.
  pathnames: {
    '/': '/',
    '/about': {
      en: '/about',
      de: '/uber-uns',
      fr: '/a-propos',
      es: '/nosotros',
      it: '/chi-siamo'
    },
    '/blog': '/blog',
    '/pricing': {
      en: '/pricing',
      de: '/preise',
      fr: '/tarifs',
      es: '/precios',
      it: '/prezzi'
    },
    '/free-resources': {
      en: '/free-resources',
      de: '/kostenlose-ressourcen',
      fr: '/ressources-gratuites',
      es: '/recursos-gratuitos',
      it: '/risorse-gratuite'
    },
    '/why-zaza-teach': {
      en: '/why-zaza-promptly',
      de: '/warum-zaza-promptly',
      fr: '/pourquoi-zaza-promptly',
      es: '/por-que-zaza-promptly',
      it: '/perche-zaza-promptly'
    }
  }
});

export const config = {
  // Match only internationalized pathnames
  matcher: [
    // Enable a redirect to a matching locale at the root
    '/',

    // Set a cookie to remember the previous locale for
    // all requests that have a locale prefix
    '/(de|fr|es|it)/:path*',

    // Enable redirects that add missing locales
    // (e.g. `/pathnames` -> `/en/pathnames`)
    '/((?!_next|_vercel|.*\\..*).*)'
  ]
};