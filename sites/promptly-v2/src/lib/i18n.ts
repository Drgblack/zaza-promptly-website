export const supportedLocales = ['en', 'de', 'fr', 'es', 'it'] as const
export const locales = supportedLocales
export const defaultLocale = 'en'

export type Locale = typeof supportedLocales[number]

export interface LocaleConfig {
  code: Locale
  name: string
  nativeName: string
  flag: string
}

export const localeConfigs: Record<Locale, LocaleConfig> = {
  en: { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧' },
  de: { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
  fr: { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
  es: { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
  it: { code: 'it', name: 'Italian', nativeName: 'Italiano', flag: '🇮🇹' },
}

// Extract locale from pathname
export function getLocaleFromPath(pathname: string): Locale {
  const segments = pathname.split('/').filter(Boolean)
  const firstSegment = segments[0]
  
  if (supportedLocales.includes(firstSegment as Locale)) {
    return firstSegment as Locale
  }
  
  return defaultLocale
}

// Remove locale prefix from pathname
export function removeLocaleFromPath(pathname: string): string {
  const segments = pathname.split('/').filter(Boolean)
  const firstSegment = segments[0]
  
  if (supportedLocales.includes(firstSegment as Locale)) {
    return '/' + segments.slice(1).join('/')
  }
  
  return pathname
}

// Add locale prefix to pathname
export function addLocaleToPath(pathname: string, locale: Locale): string {
  const cleanPath = removeLocaleFromPath(pathname)
  return `/${locale}${cleanPath}`
}

// Get alternate paths for all locales
export function getAlternatePaths(pathname: string): Record<Locale, string> {
  const cleanPath = removeLocaleFromPath(pathname)
  const alternates: Record<Locale, string> = {} as any
  
  for (const locale of supportedLocales) {
    alternates[locale] = addLocaleToPath(cleanPath, locale)
  }
  
  return alternates
}

// Translation function
let translations: Record<Locale, Record<string, any>> = {} as any

export async function loadTranslations(locale: Locale) {
  if (!translations[locale]) {
    try {
      const translation = await import(`@/content/i18n/${locale}.json`)
      translations[locale] = translation.default
    } catch (error) {
      console.warn(`Failed to load translations for locale: ${locale}`)
      translations[locale] = {}
    }
  }
  
  return translations[locale]
}

export function t(key: string, locale: Locale = defaultLocale, params?: Record<string, string>): string {
  const localeTranslations = translations[locale] || {}
  
  // Get nested key using dot notation
  const keys = key.split('.')
  let value: any = localeTranslations
  
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k]
    } else {
      // Fallback to English if available
      if (locale !== defaultLocale && translations[defaultLocale]) {
        let fallback: any = translations[defaultLocale]
        for (const k of keys) {
          if (fallback && typeof fallback === 'object' && k in fallback) {
            fallback = fallback[k]
          } else {
            fallback = key // Use key as last resort
            break
          }
        }
        value = typeof fallback === 'string' ? fallback : key
      } else {
        value = key
      }
      break
    }
  }
  
  let result = typeof value === 'string' ? value : key
  
  // Replace parameters
  if (params) {
    for (const [paramKey, paramValue] of Object.entries(params)) {
      result = result.replace(new RegExp(`{{${paramKey}}}`, 'g'), paramValue)
    }
  }
  
  return result
}

// Generate static params for Next.js
export function generateStaticParams() {
  return supportedLocales.map((locale) => ({ locale }))
}