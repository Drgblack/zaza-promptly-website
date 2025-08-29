// sites/promptly-v2/src/i18n/request.ts
import {getRequestConfig} from 'next-intl/server';

export default getRequestConfig(async ({locale}) => {
  // List the locales your site supports
  const supported = ['en', 'de'] as const;
  const isSupported = (l: string): l is typeof supported[number] =>
    (supported as readonly string[]).includes(l);

  const normalized = isSupported(locale) ? locale : 'en';

  // Load messages from /src/messages/<locale>.json (fallback to en)
  let messages: Record<string, unknown> = {};
  try {
    messages = (await import(`../messages/${normalized}.json`)).default;
  } catch {
    messages = (await import(`../messages/en.json`)).default;
  }

  return {locale: normalized, messages};
});
