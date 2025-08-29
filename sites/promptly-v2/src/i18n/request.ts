// sites/promptly-v2/src/i18n/request.ts
import {getRequestConfig} from 'next-intl/server';

const SUPPORTED_LOCALES = ['en', 'de'] as const;
type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

function normalizeLocale(locale: string | undefined): SupportedLocale {
  if (locale && SUPPORTED_LOCALES.includes(locale as SupportedLocale)) {
    return locale as SupportedLocale;
  }
  return 'en';
}

export default getRequestConfig(async ({requestLocale}) => {
  const normalized = normalizeLocale(await requestLocale);

  return {
    locale: normalized,
    // messages live at: sites/promptly-v2/src/messages/{en|de}.json
    messages: (await import(`../messages/${normalized}.json`)).default
  };
});
