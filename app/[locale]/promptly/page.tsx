import type { Metadata } from 'next';
import ProductPage from '@/components/ProductPage';

export const metadata: Metadata = {
  title: 'Zaza Promptly - AI-Powered Helper for Teachers',
  description: 'AI-powered helper for teachers. Write caring, professional parent messages and report comments in minutes, not hours.',
  alternates: {
    canonical: '/promptly',
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