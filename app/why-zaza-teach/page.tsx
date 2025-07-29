import { Metadata } from 'next'
import { WhyZazaTeachPage } from '@/components/cross-app/why-zaza-teach-page'

export const metadata: Metadata = {
  title: 'Why Zaza Teach? | Complete Lesson Planning vs Free Resources',
  description: 'Compare Zaza Promptly\'s free resources with Zaza Teach\'s complete lesson planning platform. See which tool fits your teaching needs best.',
  keywords: 'lesson planning, AI teaching tools, curriculum planning, Zaza Teach vs Promptly',
  openGraph: {
    title: 'Why Zaza Teach? Complete Lesson Planning Platform',
    description: 'From free AI prompts to complete curriculum planning - discover which Zaza tool is right for your teaching needs.',
    type: 'website',
    url: 'https://zazapromptly.com/why-zaza-teach'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Why Zaza Teach? Complete Lesson Planning Platform',
    description: 'From free AI prompts to complete curriculum planning - discover which Zaza tool is right for your teaching needs.',
  },
  alternates: {
    canonical: 'https://zazapromptly.com/why-zaza-teach',
  },
}

export default function WhyZazaTeach() {
  return <WhyZazaTeachPage />
}