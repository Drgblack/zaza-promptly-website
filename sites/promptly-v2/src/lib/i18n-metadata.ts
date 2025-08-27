import { Metadata } from 'next'
import { loadTranslations, t, getAlternatePaths, type Locale } from './i18n'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.zazapromptly.com'

interface I18nMetadataOptions {
  locale: Locale
  pathname: string
  titleKey?: string
  descriptionKey?: string
  title?: string
  description?: string
  keywords?: string[]
  type?: 'website' | 'article'
  image?: string
}

export async function generateI18nMetadata({
  locale,
  pathname,
  titleKey,
  descriptionKey,
  title,
  description,
  keywords = [],
  type = 'website',
  image
}: I18nMetadataOptions): Promise<Metadata> {
  // Load translations for the locale
  await loadTranslations(locale)
  
  // Get localized title and description
  const localizedTitle = titleKey ? t(titleKey, locale) : title || 'Promptly - AI for Teachers'
  const localizedDescription = descriptionKey ? t(descriptionKey, locale) : description || t('home.hero.subtitle', locale)
  
  // Get alternate URLs for all locales
  const alternateUrls = getAlternatePaths(pathname)
  const canonicalUrl = `${baseUrl}${alternateUrls[locale]}`
  
  // Create hreflang links
  const languages: Record<string, string> = {}
  Object.entries(alternateUrls).forEach(([loc, path]) => {
    languages[loc] = `${baseUrl}${path}`
  })
  languages['x-default'] = `${baseUrl}${alternateUrls.en}` // Default to English
  
  // Generate keywords based on locale
  const baseKeywords = [
    'AI for teachers',
    'teacher productivity',
    'parent communication',
    'report writing',
    'educational technology'
  ]
  
  const localizedKeywords = locale === 'de' ? [
    'KI für Lehrer',
    'Lehrerproduktivität',
    'Elternkommunikation',
    'Berichtschreibung',
    'Bildungstechnologie'
  ] : locale === 'fr' ? [
    'IA pour enseignants',
    'productivité enseignant',
    'communication parents',
    'rédaction rapports',
    'technologie éducative'
  ] : locale === 'es' ? [
    'IA para profesores',
    'productividad docente',
    'comunicación padres',
    'redacción informes',
    'tecnología educativa'
  ] : locale === 'it' ? [
    'IA per insegnanti',
    'produttività insegnante',
    'comunicazione genitori',
    'scrittura rapporti',
    'tecnologia educativa'
  ] : baseKeywords
  
  const allKeywords = [...localizedKeywords, ...keywords, ...baseKeywords]
  
  const metadata: Metadata = {
    title: localizedTitle,
    description: localizedDescription,
    keywords: allKeywords.join(', '),
    alternates: {
      canonical: canonicalUrl,
      languages
    },
    openGraph: {
      title: localizedTitle,
      description: localizedDescription,
      url: canonicalUrl,
      siteName: 'Promptly',
      locale: locale === 'en' ? 'en_US' : locale === 'de' ? 'de_DE' : locale === 'fr' ? 'fr_FR' : locale === 'es' ? 'es_ES' : 'it_IT',
      type,
      images: image ? [{ url: image, alt: localizedTitle }] : undefined
    },
    twitter: {
      card: 'summary_large_image',
      title: localizedTitle,
      description: localizedDescription,
      images: image ? [image] : undefined
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1
      }
    }
  }
  
  return metadata
}