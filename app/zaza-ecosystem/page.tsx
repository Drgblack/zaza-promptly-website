import { Metadata } from 'next'
import { ZazaEcosystemPage } from '@/components/cross-app/zaza-ecosystem-page'

export const metadata: Metadata = {
  title: 'Zaza Ecosystem | Complete Suite of AI Teaching Tools',
  description: 'Discover all Zaza apps - from free teaching resources to complete lesson planning, visual design, and automated scheduling. Find the perfect AI tool for your teaching needs.',
  keywords: 'AI teaching tools, lesson planning, classroom management, educational technology, Zaza apps',
  openGraph: {
    title: 'Zaza Ecosystem - AI-Powered Teaching Tools Suite',
    description: 'Explore our complete ecosystem of AI teaching tools. From free resources to advanced automation, we have everything educators need.',
    type: 'website',
    url: 'https://zazapromptly.com/zaza-ecosystem'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zaza Ecosystem - AI-Powered Teaching Tools Suite',
    description: 'Explore our complete ecosystem of AI teaching tools. From free resources to advanced automation, we have everything educators need.',
  },
  alternates: {
    canonical: 'https://zazapromptly.com/zaza-ecosystem',
  },
}

export default function ZazaEcosystem() {
  return <ZazaEcosystemPage />
}