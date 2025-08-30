// sites/promptly-v2/src/middleware.ts
import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['en', 'de'],
  defaultLocale: 'en',
  localePrefix: 'always' // we’re using /[locale]/... routes
});

export const config = {
  matcher: ['/((?!_next|.*\\..*|api).*)']
};
