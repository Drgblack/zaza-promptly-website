'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { loadTranslations, t as translate, getLocaleFromPath, type Locale } from '@/lib/i18n'

interface UseTranslationReturn {
  t: (key: string, params?: Record<string, string>) => string
  locale: Locale
  isLoading: boolean
}

export function useTranslation(): UseTranslationReturn {
  const pathname = usePathname()
  const locale = getLocaleFromPath(pathname)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadLocaleTranslations = async () => {
      setIsLoading(true)
      await loadTranslations(locale)
      setIsLoading(false)
    }

    loadLocaleTranslations()
  }, [locale])

  const t = (key: string, params?: Record<string, string>) => {
    if (isLoading) return key
    return translate(key, locale, params)
  }

  return { t, locale, isLoading }
}

// Server-side translation helper
export async function getServerTranslation(locale: Locale) {
  await loadTranslations(locale)
  
  return {
    t: (key: string, params?: Record<string, string>) => translate(key, locale, params),
    locale
  }
}