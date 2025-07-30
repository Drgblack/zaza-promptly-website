'use client'

import { useState } from 'react'
import { useLocale } from 'next-intl'
import { useRouter, usePathname } from 'next/navigation'
import { ChevronDown, Globe } from 'lucide-react'
import { locales, localeNames, localeFlags, type Locale } from '@/i18n'

export default function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false)
  const locale = useLocale() as Locale
  const router = useRouter()
  const pathname = usePathname()

  const switchLanguage = (newLocale: Locale) => {
    // Remove current locale from pathname
    const segments = pathname.split('/').filter(Boolean)
    
    // Check if first segment is a locale
    const currentLocaleInPath = locales.includes(segments[0] as Locale) ? segments[0] : null
    const pathWithoutLocale = currentLocaleInPath ? segments.slice(1).join('/') : segments.join('/')
    
    // Create new path with new locale
    const newPath = `/${newLocale}${pathWithoutLocale ? `/${pathWithoutLocale}` : ''}`
    
    setIsOpen(false)
    router.push(newPath)
    
    // Store user preference
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000; SameSite=Lax`
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all duration-200"
        aria-label="Change language"
        aria-expanded={isOpen}
      >
        <Globe className="w-4 h-4" />
        <span className="hidden sm:inline">{localeNames[locale]}</span>
        <span className="sm:hidden">{localeFlags[locale]}</span>
        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
            {locales.map((loc) => (
              <button
                key={loc}
                onClick={() => switchLanguage(loc)}
                className={`w-full flex items-center space-x-3 px-4 py-2 text-sm hover:bg-gray-50 transition-colors duration-150 ${
                  loc === locale ? 'text-purple-600 bg-purple-50' : 'text-gray-700'
                }`}
              >
                <span className="text-lg">{localeFlags[loc]}</span>
                <span className="font-medium">{localeNames[loc]}</span>
                {loc === locale && (
                  <div className="ml-auto w-2 h-2 bg-purple-600 rounded-full" />
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}