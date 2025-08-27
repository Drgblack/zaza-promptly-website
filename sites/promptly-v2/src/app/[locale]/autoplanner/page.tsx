import type { Metadata } from 'next';
import ProductPage from '@/components/ProductPage';

export const metadata: Metadata = {
  title: 'Zaza AutoPlanner - Intelligent Agent for Future Teaching',
  description: 'The flagship Zaza intelligent agent. Multimodal, adaptive, and classroom-aware lesson planning for the future of teaching.',
  alternates: {
    canonical: '/autoplanner',
  },
};

export default async function AutoPlannerPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const title = 'Zaza AutoPlanner';
  const description = locale === 'de' 
    ? 'Das Flaggschiff der Zaza-Intelligenz. Multimodale, adaptive und klassenraumgerechte Unterrichtsplanung für die Zukunft des Lehrens.'
    : 'The flagship Zaza intelligent agent. Multimodal, adaptive, and classroom-aware lesson planning for the future of teaching.';

  return <ProductPage title={title} description={description} locale={locale} />;
}