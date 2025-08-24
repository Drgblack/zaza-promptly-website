/**
 * Language utilities for managing user language preferences
 */

export interface Language {
  code: string
  name: string
  nativeName: string
  flag?: string
}

export const LANGUAGES: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'de', name: 'German', nativeName: 'Deutsch' },
  { code: 'fr', name: 'French', nativeName: 'Français' },
  { code: 'es', name: 'Spanish', nativeName: 'Español' },
]

export const DEFAULT_LANGUAGE = 'en'

/**
 * Get the current language from localStorage and URL params
 */
export function getCurrentLanguage(): string {
  if (typeof window === 'undefined') return DEFAULT_LANGUAGE
  
  // Check URL params first
  const urlParams = new URLSearchParams(window.location.search)
  const urlLang = urlParams.get('lang')
  if (urlLang && LANGUAGES.some(lang => lang.code === urlLang)) {
    return urlLang
  }
  
  // Check localStorage
  const storedLang = localStorage.getItem('lang')
  if (storedLang && LANGUAGES.some(lang => lang.code === storedLang)) {
    return storedLang
  }
  
  return DEFAULT_LANGUAGE
}

/**
 * Set the language preference and update URL
 */
export function setLanguage(languageCode: string): void {
  if (typeof window === 'undefined') return
  
  // Store in localStorage
  localStorage.setItem('lang', languageCode)
  
  // Update URL params
  const url = new URL(window.location.href)
  if (languageCode === DEFAULT_LANGUAGE) {
    url.searchParams.delete('lang')
  } else {
    url.searchParams.set('lang', languageCode)
  }
  
  // Update the URL without triggering a navigation
  window.history.replaceState({}, '', url.toString())
  
  // Dispatch custom event for components to listen to language changes
  window.dispatchEvent(new CustomEvent('languageChange', { detail: languageCode }))
}

/**
 * Get language display name
 */
export function getLanguageName(code: string): string {
  const lang = LANGUAGES.find(l => l.code === code)
  return lang?.nativeName || code
}