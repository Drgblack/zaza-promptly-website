import type { Metadata } from 'next'
import { useTranslations } from 'next-intl'
import { ResourcesClient } from './ResourcesClient'

interface ResourcesPageProps {
  params: { locale: string }
}

export function generateMetadata({ params }: ResourcesPageProps): Metadata {
  const { locale } = params
  
  return {
    title: 'Free Teaching Resources - AI Prompts, Templates & Guides | Zaza Promptly',
    description: 'Download free AI prompts, email templates, and teaching guides. Over 50 resources tested by teachers to save you time.',
    keywords: [
      'free teaching resources',
      'AI prompts for teachers',
      'teaching templates',
      'classroom management',
      'lesson planning',
      'teacher resources',
      'educational AI tools'
    ],
    alternates: {
      canonical: `/${locale}/resources`,
      languages: {
        'en': '/en/resources',
        'de': '/de/resources',
        'x-default': '/en/resources'
      }
    },
    openGraph: {
      title: 'Free Teaching Resources - AI Prompts, Templates & Guides',
      description: 'Download free AI prompts, email templates, and teaching guides. Over 50 resources tested by teachers to save you time.',
      url: `https://www.zazapromptly.com/${locale}/resources`,
      siteName: 'Zaza Promptly',
      type: 'website',
      locale: locale,
    },
    twitter: {
      card: 'summary_large_image',
      site: '@ZazaPromptly',
      title: 'Free Teaching Resources - AI Prompts, Templates & Guides',
      description: 'Download free AI prompts, email templates, and teaching guides. Over 50 resources tested by teachers to save you time.',
    }
  }
}

export default function ResourcesPage({ params }: ResourcesPageProps) {
  return <ResourcesClient locale={params.locale} />
}