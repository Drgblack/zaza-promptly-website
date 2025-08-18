import type { Metadata } from 'next';
import ProductPage from '@/components/ProductPage';

export const metadata: Metadata = {
  title: 'Zaza Notably Suite - AI-Powered Professional Communication',
  description: 'AI-powered professional communication tools for lawyers, HR, consultants, and education — making work faster, clearer, and more professional.',
  alternates: {
    canonical: '/notably',
  },
};

export default async function NotablyPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const title = 'Zaza Notably Suite';
  const description = locale === 'de' 
    ? 'KI-gestützte Kommunikationstools für Juristen, HR, Berater und Bildung – für schnellere, klarere und professionellere Arbeit.'
    : 'AI-powered professional communication tools for lawyers, HR, consultants, and education — making work faster, clearer, and more professional.';

  return <ProductPage title={title} description={description} locale={locale} />;
}