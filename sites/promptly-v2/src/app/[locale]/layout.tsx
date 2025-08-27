import type { Metadata } from "next";
import { notFound } from 'next/navigation'
import { supportedLocales, loadTranslations, type Locale } from '@/lib/i18n'
import { generateI18nMetadata } from '@/lib/i18n-metadata'

interface LocaleLayoutProps {
  children: React.ReactNode
  params: { locale: Locale }
}

export async function generateStaticParams() {
  return supportedLocales.map((locale) => ({ locale }))
}

export async function generateMetadata(
  { params }: { params: { locale: Locale } }
): Promise<Metadata> {
  const { locale } = params
  
  // Validate locale
  if (!supportedLocales.includes(locale)) {
    notFound()
  }

  return generateI18nMetadata({
    locale,
    pathname: '/'
  })
}

export default async function LocaleLayout({
  children,
  params: { locale }
}: LocaleLayoutProps) {
  // Validate that the incoming locale is valid
  if (!supportedLocales.includes(locale)) {
    notFound()
  }

  // Load translations for the locale
  await loadTranslations(locale)

  return (
    <>
      {children}
    </>
  )
}