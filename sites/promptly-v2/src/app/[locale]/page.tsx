import LocalizedHomePage from '@/components/i18n/LocalizedHomePage'
import { notFound } from 'next/navigation'
import { supportedLocales, loadTranslations, type Locale } from '@/lib/i18n'
import { generateI18nMetadata } from '@/lib/i18n-metadata'

// Static page - revalidate every hour
export const revalidate = 3600

interface LocalePageProps {
  params: { locale: Locale }
}

export async function generateStaticParams() {
  return supportedLocales.map((locale) => ({ locale }))
}

export async function generateMetadata(
  { params }: { params: { locale: Locale } }
) {
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

export default async function LocalePage({ params: { locale } }: LocalePageProps) {
  // Validate that the incoming locale is valid
  if (!supportedLocales.includes(locale)) {
    notFound()
  }
  
  // Pre-load translations for the detected locale
  await loadTranslations(locale)

  // Enhanced structured data for SEO and AI search
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.zazapromptly.com'
  
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'Promptly - AI Tool for Teachers',
      description: 'Hallucination-safe AI tool for teachers. Generate parent communications, student reports & professional messages. Reduce teacher workload with GDPR-compliant AI.',
      url: baseUrl,
      applicationCategory: 'EducationalApplication',
      operatingSystem: 'Web',
      keywords: 'AI tool for teachers, AI for teacher reports, AI for parent communication, safe AI for teachers, hallucination-safe AI, teacher productivity apps',
      author: {
        '@type': 'Organization',
        name: 'Zaza Technologies',
        founder: {
          '@type': 'Person',
          name: 'Dr. Greg Blackburn',
          jobTitle: 'PhD, Professional Education',
          description: 'PhD-qualified founder with expertise in educational technology and AI safety'
        }
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.8',
        reviewCount: '12000',
        bestRating: '5',
        worstRating: '1'
      },
      offers: {
        '@type': 'Offer',
        url: `${baseUrl}/pricing`,
        priceCurrency: 'USD',
        price: '15.00',
        availability: 'https://schema.org/InStock',
        validFrom: '2024-01-01',
        priceValidUntil: '2025-12-31'
      },
      audience: {
        '@type': 'EducationalAudience',
        educationalRole: 'teacher',
        geographicArea: ['United Kingdom', 'United States', 'Germany', 'France', 'Spain', 'Italy']
      },
      featureList: [
        'Hallucination-safe AI for accurate content',
        'Parent communication templates',
        'Student report generation',
        'GDPR-compliant data handling',
        'Multi-language support',
        'Education-specific AI training'
      ]
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Zaza Technologies',
      url: baseUrl,
      logo: `${baseUrl}/images/logo/zaza-logo.png`,
      description: 'Educational technology company providing AI tools for teachers, including Promptly for parent communication and report writing.',
      foundingDate: '2023',
      founder: {
        '@type': 'Person',
        name: 'Dr. Greg Blackburn',
        jobTitle: 'PhD, Professional Education'
      },
      sameAs: [
        'https://twitter.com/zazapromptly',
        'https://www.linkedin.com/company/zaza-technologies'
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        email: 'hello@zazatechnologies.com',
        availableLanguage: ['English', 'German', 'French', 'Spanish', 'Italian']
      }
    }
  ]
  
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LocalizedHomePage />
    </>
  )
}