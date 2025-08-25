import { Metadata } from 'next'
import SupportClient from './SupportClient'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.zazapromptly.com'

export const metadata: Metadata = {
  title: 'Support Center - Get Help with Promptly | Teacher AI Tools',
  description: 'Get help with Promptly AI tools for teachers. Find guides, tutorials, contact support, and access free resources to enhance your teaching workflow.',
  keywords: ['Promptly support', 'teacher AI help', 'education tool support', 'AI for teachers help', 'teaching resources support'],
  alternates: {
    canonical: `${baseUrl}/support`,
    languages: {
      'en': `${baseUrl}/support`,
      'de': `${baseUrl}/support?lang=de`,
      'x-default': `${baseUrl}/support`
    }
  },
  openGraph: {
    title: 'Support Center - Get Help with Promptly | Teacher AI Tools',
    description: 'Get help with Promptly AI tools for teachers. Find guides, tutorials, contact support, and access free resources.',
    url: `${baseUrl}/support`,
    siteName: 'Promptly',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: '/og-default.png',
        width: 1200,
        height: 630,
        alt: 'Promptly Support Center - Help for Teachers',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Support Center - Get Help with Promptly | Teacher AI Tools',
    description: 'Get help with Promptly AI tools for teachers. Find guides, tutorials, contact support, and access free resources.',
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

export default function SupportPage() {
  return <SupportClient />
}