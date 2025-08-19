import type { Metadata } from 'next';
import { TeachProductPage } from '@/components/product-pages/teach-product-page';

export const metadata: Metadata = {
  title: 'AI Lesson Planning Assistant | Zaza Teach - Best AI Tools for Teachers 2025',
  description: 'AI lesson planning assistant that saves teachers 3-5 hours per week. Generate curriculum-aligned lesson plans with activities, assessments & differentiation. Safe AI for teachers by PhD educator.',
  keywords: [
    'AI lesson planning assistant', 'best AI tools for teachers 2025', 'AI for lesson planning',
    'teacher productivity apps', 'safe AI for teachers', 'lesson planning AI',
    'curriculum-aligned AI', 'AI tools for teachers', 'lesson planning software'
  ],
  openGraph: {
    title: 'AI Lesson Planning Assistant - Best AI Tools for Teachers',
    description: 'Save 3-5 hours per week with AI lesson planning. Generate curriculum-aligned lessons with activities and assessments. Trusted by educators.',
    type: 'website',
    images: ['/og-image-teach.png'],
    siteName: 'Zaza Technologies'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Lesson Planning Assistant for Teachers',
    description: 'Get your Sunday nights back. AI-powered lesson planning that saves 3-5 hours per week.',
    images: ['/og-image-teach.png']
  },
  alternates: {
    canonical: 'https://zazapromptly.com/teach',
  },
};

export default function TeachPage() {
  return <TeachProductPage />;
}