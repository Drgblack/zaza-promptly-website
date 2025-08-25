// i18n system - ready for locale expansion but currently EN-only
import { en } from './en'
// TODO: Uncomment when locales are enabled
// import { de } from './de'
// import { fr } from './fr'
// import { es } from './es'
// import { it } from './it'

export type SupportedLocale = 'en' | 'de' | 'fr' | 'es' | 'it'
export type TranslationStrings = typeof en

// Available translations - currently only English
export const translations = {
  en
  // TODO: Add other locales when enabled
  // de,
  // fr,
  // es,
  // it
} as const

// Currently enabled locales - only English for now
export const enabledLocales: SupportedLocale[] = ['en']

// Default locale
export const defaultLocale: SupportedLocale = 'en'

// Get translations for a locale
export function getTranslations(locale: SupportedLocale = 'en'): TranslationStrings {
  // For now, always return English
  // TODO: When i18n is enabled, return translations[locale] || translations.en
  return translations.en
}

// Check if locale is supported
export function isSupportedLocale(locale: string): locale is SupportedLocale {
  return enabledLocales.includes(locale as SupportedLocale)
}

// Get locale from pathname (for future use)
export function getLocaleFromPathname(pathname: string): SupportedLocale {
  // TODO: When i18n routes are enabled, parse locale from pathname
  // For now, always return default
  return defaultLocale
}

// Generate localized path (for future use)
export function getLocalizedPath(path: string, locale: SupportedLocale): string {
  // TODO: When i18n routes are enabled, prepend locale to path
  // For now, return path as-is
  return path
}