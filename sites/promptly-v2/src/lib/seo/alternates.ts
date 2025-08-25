// Helper for generating hreflang alternates - ready for i18n expansion

export type SupportedLocale = 'en' | 'de' | 'fr' | 'es' | 'it'

export interface AlternateLanguages {
  'en': string
  'de'?: string
  'fr'?: string
  'es'?: string
  'it'?: string
  'x-default': string
}

export function generateAlternateLanguages(
  path: string,
  enabledLocales: SupportedLocale[] = ['en']
): AlternateLanguages {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.zazapromptly.com'
  
  // For now, only return English
  // TODO: When i18n is enabled, expand this function to include all locales
  const alternates: AlternateLanguages = {
    'en': `${baseUrl}${path}`,
    'x-default': `${baseUrl}${path}`
  }
  
  // TODO: Uncomment when locales are enabled
  // if (enabledLocales.includes('de')) {
  //   alternates.de = `${baseUrl}/de${path}`
  // }
  // if (enabledLocales.includes('fr')) {
  //   alternates.fr = `${baseUrl}/fr${path}`
  // }
  // if (enabledLocales.includes('es')) {
  //   alternates.es = `${baseUrl}/es${path}`
  // }
  // if (enabledLocales.includes('it')) {
  //   alternates.it = `${baseUrl}/it${path}`
  // }
  
  return alternates
}

export function generateCanonical(path: string, locale: SupportedLocale = 'en'): string {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.zazapromptly.com'
  
  // For now, always return English canonical
  // TODO: When i18n is enabled, include locale in path for non-English
  return `${baseUrl}${path}`
}