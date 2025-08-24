import { Metadata } from 'next'
import UniversalEmailCapture from '@/components/email/UniversalEmailCapture'

interface PlaceholderPageProps {
  source: string
}

interface PageContent {
  en: {
    title: string
    metaTitle: string
    metaDescription: string
  }
  de: {
    title: string
    metaTitle: string
    metaDescription: string
  }
}

const pageContents: Record<string, PageContent> = {
  'quick-comment-helper': {
    en: {
      title: 'Quick Comment Helper',
      metaTitle: 'Zaza Promptly – Quick Comment Helper (Coming Soon)',
      metaDescription: 'Our Quick Comment Helper tool is coming soon. Leave your email to get notified when it\'s live.'
    },
    de: {
      title: 'Schneller Kommentar-Helfer',
      metaTitle: 'Zaza Promptly – Schneller Kommentar-Helfer (bald verfügbar)',
      metaDescription: 'Unser Schneller Kommentar-Helfer-Tool ist bald verfügbar. Geben Sie Ihre E-Mail ein, um benachrichtigt zu werden.'
    }
  },
  'pricing': {
    en: {
      title: 'Pricing',
      metaTitle: 'Zaza Promptly – Pricing (Coming Soon)',
      metaDescription: 'Our pricing page is coming soon. Leave your email to get notified when it\'s live.'
    },
    de: {
      title: 'Preise',
      metaTitle: 'Zaza Promptly – Preise (bald verfügbar)',
      metaDescription: 'Unsere Preisseite ist bald verfügbar. Geben Sie Ihre E-Mail ein, um benachrichtigt zu werden.'
    }
  },
  'free-resources': {
    en: {
      title: 'Free Resources',
      metaTitle: 'Zaza Promptly – Free Resources (Coming Soon)',
      metaDescription: 'Our free resources page is coming soon. Leave your email to get notified when it\'s live.'
    },
    de: {
      title: 'Kostenlose Ressourcen',
      metaTitle: 'Zaza Promptly – Kostenlose Ressourcen (bald verfügbar)',
      metaDescription: 'Unsere kostenlosen Ressourcen sind bald verfügbar. Geben Sie Ihre E-Mail ein, um benachrichtigt zu werden.'
    }
  },
  'support': {
    en: {
      title: 'Support',
      metaTitle: 'Zaza Promptly – Support (Coming Soon)',
      metaDescription: 'Our support page is coming soon. Leave your email to get notified when it\'s live.'
    },
    de: {
      title: 'Unterstützung',
      metaTitle: 'Zaza Promptly – Unterstützung (bald verfügbar)',
      metaDescription: 'Unsere Support-Seite ist bald verfügbar. Geben Sie Ihre E-Mail ein, um benachrichtigt zu werden.'
    }
  }
}

export function generatePlaceholderMetadata(source: string, lang: string = 'en'): Metadata {
  const content = pageContents[source]
  const langContent = content?.[lang as keyof typeof content] || content?.en || pageContents.support.en
  
  const baseUrl = 'https://www.zazapromptly.com'
  const canonicalUrl = `${baseUrl}/${source}`
  const altLangUrl = lang === 'en' ? `${canonicalUrl}?lang=de` : canonicalUrl
  
  return {
    title: langContent.metaTitle,
    description: langContent.metaDescription,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': canonicalUrl,
        'de': `${canonicalUrl}?lang=de`,
        'x-default': canonicalUrl
      }
    },
    openGraph: {
      title: langContent.metaTitle,
      description: langContent.metaDescription,
      url: canonicalUrl,
      siteName: 'Zaza Promptly',
      locale: lang === 'de' ? 'de_DE' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: langContent.metaTitle,
      description: langContent.metaDescription,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}

export default function PlaceholderPage({ source }: PlaceholderPageProps) {
  return <UniversalEmailCapture source={source} />
}