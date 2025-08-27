import type { Metadata } from 'next';
import ProductPage from '@/components/ProductPage';

export const metadata: Metadata = {
  title: 'Zaza Looop - AI-Powered Language Learning App',
  description: 'A culturally immersive, AI-powered language learning app that makes learning sticky, fun, and globally connected.',
  alternates: {
    canonical: '/looop',
  },
};

export default async function LooopPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const title = 'Zaza Looop';
  const description = locale === 'de' 
    ? 'Eine kulturell immersive, KI-gestützte Sprachlern-App, die Lernen spannend, unterhaltsam und global vernetzt macht.'
    : 'A culturally immersive, AI-powered language learning app that makes learning sticky, fun, and globally connected.';

  return <ProductPage title={title} description={description} locale={locale} />;
}