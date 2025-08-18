import type { Metadata } from 'next';
import ProductPage from '@/components/ProductPage';

export const metadata: Metadata = {
  title: 'Zaza Teach - AI-Powered Lesson Planning Assistant',
  description: 'Your AI-powered lesson planning assistant. Build engaging, curriculum-aligned lessons faster.',
  alternates: {
    canonical: '/teach',
  },
};

export default async function TeachPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const title = 'Zaza Teach';
  const description = locale === 'de' 
    ? 'Ihr KI-gestützter Unterrichtsplanungs-Assistent. Erstellen Sie ansprechende, lehrplankonforme Stunden schneller.'
    : 'Your AI-powered lesson planning assistant. Build engaging, curriculum-aligned lessons faster.';

  return <ProductPage title={title} description={description} locale={locale} />;
}