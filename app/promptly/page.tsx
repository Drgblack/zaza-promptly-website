import type { Metadata } from 'next';
import ProductPage from '@/components/ProductPage';

export const metadata: Metadata = {
  title: 'AI for Teacher Reports & Parent Communication | Zaza Promptly - Hallucination-Safe AI Tool',
  description: 'Safe AI tool for teachers writing parent communications, reports & professional messages. Hallucination-safe AI designed by educators. GDPR compliant, reduces teacher workload by 3-5 hours/week.',
  keywords: [
    'AI for teacher reports', 'AI for parent communication', 'safe AI for teachers',
    'hallucination-safe AI', 'parent email generator for teachers', 'teacher comment bank AI',
    'report writing for teachers AI', 'GDPR compliant AI for teachers', 'AI vs ChatGPT for teachers'
  ],
  openGraph: {
    title: 'AI for Teacher Reports & Parent Communication - Safe AI Tool',
    description: 'Hallucination-safe AI tool trusted by 12,000+ teachers. Generate professional parent communications and report comments 10x faster.',
    type: 'website',
    images: ['/og-image-promptly.png'],
    siteName: 'Zaza Promptly'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Safe AI Tool for Teacher Reports & Parent Communication',
    description: 'Join 12,000+ teachers using hallucination-safe AI. GDPR compliant, designed by educators.',
    images: ['/og-image-promptly.png']
  },
  alternates: {
    canonical: 'https://zazapromptly.com/promptly',
  },
};

export default async function PromptlyPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const title = 'Zaza Promptly';
  const description = locale === 'de' 
    ? 'KI-gestützter Helfer für Lehrkräfte. Schreiben Sie einfühlsame, professionelle Elternnachrichten und Zeugnisbemerkungen in Minuten statt Stunden.'
    : 'AI-powered helper for teachers. Write caring, professional parent messages and report comments in minutes, not hours.';

  return <ProductPage title={title} description={description} locale={locale} />;
}