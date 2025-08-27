'use client'

import { useState, useEffect, useRef } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { supportedLocales, getLocaleFromPath, type Locale } from '@/lib/i18n'

interface LanguageSwitcherProps {
  variant?: 'header' | 'mobile'
  className?: string
}

// Define language display names
const LANGUAGE_NAMES: Record<Locale, { name: string; nativeName: string }> = {
  en: { name: 'English', nativeName: 'English' },
  de: { name: 'German', nativeName: 'Deutsch' },
  fr: { name: 'French', nativeName: 'Français' },
  es: { name: 'Spanish', nativeName: 'Español' },
  it: { name: 'Italian', nativeName: 'Italiano' }
}

export default function LanguageSwitcher({ variant = 'header', className = '' }: LanguageSwitcherProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  const currentLocale = getLocaleFromPath(pathname)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Close dropdown on escape key or click outside
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false)
        buttonRef.current?.focus()
      }
    }

    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.addEventListener('mousedown', handleClickOutside)
      return () => {
        document.removeEventListener('keydown', handleEscape)
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }
  }, [isOpen])

  const handleLanguageSelect = (locale: Locale) => {
    setIsOpen(false)
    buttonRef.current?.focus()
    
    // Set cookie for persistence
    document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=31536000`
    
    // Replace only the first path segment  
    const parts = pathname.split('/')
    parts[1] = locale
    const newPath = parts.join('/') || `/${locale}`
    
    router.push(newPath)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      setIsOpen(!isOpen)
    }
  }

  // Don't render until mounted to avoid hydration issues
  if (!mounted) {
    return (
      <div className={`${variant === 'header' ? 'w-20' : 'w-full'} h-8 bg-slate-800/60 rounded animate-pulse ${className}`} />
    )
  }

  const currentLanguage = LANGUAGE_NAMES[currentLocale] || LANGUAGE_NAMES.en

  if (variant === 'mobile') {
    return (
      <div className={`w-full ${className}`}>
        <div className="px-4 py-2 border-b border-white/10">
          <div className="text-xs text-slate-400 uppercase tracking-wide mb-2">Language</div>
          <div className="grid grid-cols-2 gap-2">
            {supportedLocales.map((locale) => {
              const language = LANGUAGE_NAMES[locale]
              return (
                <button
                  key={locale}
                  onClick={() => handleLanguageSelect(locale)}
                  className={`px-3 py-2 text-sm rounded-lg transition-colors text-left ${
                    currentLocale === locale
                      ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                      : 'bg-slate-800/60 text-slate-300 hover:bg-slate-700/60 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {language.nativeName}
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        className="flex items-center gap-2 px-3 py-2 text-white/80 hover:text-white/90 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900 rounded-lg"
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-controls={isOpen ? 'language-menu' : undefined}
        aria-label={`Current language: ${currentLanguage.nativeName}. Click to change language.`}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span className="text-sm font-medium">{currentLanguage.nativeName}</span>
        <svg 
          className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div
          id="language-menu"
          role="menu"
          className="absolute top-full right-0 mt-1 w-40 bg-slate-800/95 backdrop-blur-sm border border-white/10 rounded-lg shadow-xl py-1 z-50"
        >
          {supportedLocales.map((locale) => {
            const language = LANGUAGE_NAMES[locale]
            return (
              <button
                key={locale}
                role="menuitem"
                onClick={() => handleLanguageSelect(locale)}
                className={`w-full px-4 py-2 text-sm text-left hover:bg-slate-700/50 transition-colors focus:outline-none focus:bg-slate-700/50 ${
                  currentLocale === locale 
                    ? 'text-blue-400 bg-slate-700/30' 
                    : 'text-slate-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{language.nativeName}</span>
                  {currentLocale === locale && (
                    <svg className="w-3 h-3 ml-auto text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}