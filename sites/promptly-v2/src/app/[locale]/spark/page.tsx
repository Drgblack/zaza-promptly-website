import type { Metadata } from 'next';
import ProductPage from '@/components/ProductPage';

export const metadata: Metadata = {
  title: 'Zaza Spark (HR) - AI Productivity Suite for HR',
  description: 'AI productivity suite for HR. Streamline onboarding, training, and employee communication.',
  alternates: {
    canonical: '/spark',
  },
};

export default async function SparkPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const title = 'Zaza Spark (HR)';
  const description = locale === 'de' 
    ? 'KI-Produktivitätssuite für HR. Optimieren Sie Onboarding, Schulungen und Mitarbeiterkommunikation.'
    : 'AI productivity suite for HR. Streamline onboarding, training, and employee communication.';

  return <ProductPage title={title} description={description} locale={locale} />;
}