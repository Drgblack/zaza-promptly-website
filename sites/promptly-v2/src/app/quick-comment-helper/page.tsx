import { Metadata } from 'next'
import QuickCommentHelperContent from './QuickCommentHelperContent'

export const metadata: Metadata = {
  title: 'Quick Comment Helper - Try AI for Parent Messages | Promptly',
  description: 'Experience how Promptly\'s AI can help you write better parent messages and report comments. Try our demo tool - safe, teacher-first, never replaces your professional judgement.',
  keywords: ['quick comment helper', 'parent messages', 'report writing', 'AI for teachers', 'teacher tools'],
  alternates: {
    canonical: 'https://www.zazapromptly.com/quick-comment-helper',
    languages: {
      'en': 'https://www.zazapromptly.com/quick-comment-helper',
      'de': 'https://www.zazapromptly.com/quick-comment-helper?lang=de',
      'x-default': 'https://www.zazapromptly.com/quick-comment-helper'
    }
  },
  openGraph: {
    title: 'Quick Comment Helper - Try AI for Parent Messages | Promptly',
    description: 'Experience how Promptly\'s AI can help you write better parent messages and report comments.',
    url: 'https://www.zazapromptly.com/quick-comment-helper',
    siteName: 'Zaza Promptly',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Quick Comment Helper - Try AI for Parent Messages | Promptly',
    description: 'Experience how Promptly\'s AI can help you write better parent messages and report comments.',
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

export default function QuickCommentHelperPage() {
  return <QuickCommentHelperContent />
}