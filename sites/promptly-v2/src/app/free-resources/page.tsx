import { Metadata } from 'next'
import FreeResourcesClient from './FreeResourcesClient'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.zazapromptly.com'

export const metadata: Metadata = {
  title: 'Free Teaching Resources - Templates, Guides & Tools | Promptly',
  description: 'Download free teaching resources: report templates, lesson planners, parent communication guides, behaviour trackers, and AI prompt templates. Professional tools for teachers.',
  keywords: ['free teaching resources', 'teacher templates', 'lesson planning tools', 'parent communication', 'behaviour tracking', 'AI prompts for teachers'],
  alternates: {
    canonical: `${baseUrl}/free-resources`,
    languages: {
      'en': `${baseUrl}/free-resources`,
      'de': `${baseUrl}/free-resources?lang=de`,
      'x-default': `${baseUrl}/free-resources`
    }
  },
  openGraph: {
    title: 'Free Teaching Resources - Templates, Guides & Tools | Promptly',
    description: 'Download free teaching resources: report templates, lesson planners, parent communication guides, behaviour trackers, and AI prompt templates.',
    url: `${baseUrl}/free-resources`,
    siteName: 'Promptly',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: '/og-default.png',
        width: 1200,
        height: 630,
        alt: 'Promptly Free Resources - Teaching Tools & Templates',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Teaching Resources - Templates, Guides & Tools | Promptly',
    description: 'Download free teaching resources: report templates, lesson planners, parent communication guides, behaviour trackers, and AI prompt templates.',
    images: ['/og-default.png'],
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

export default function FreeResourcesPage() {
  return <FreeResourcesClient />
}
