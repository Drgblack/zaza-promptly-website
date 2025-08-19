import type { Metadata } from 'next';
import ProductPage from '@/components/ProductPage';

export const metadata: Metadata = {
  title: 'Zaza KnowledgeCore - The Memory Spine of Teaching',
  description: 'The memory spine of teaching. Capture, organise, and resurface knowledge across your career.',
  alternates: {
    canonical: '/knowledgecore',
  },
};

export default async function KnowledgeCorePage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const title = 'Zaza KnowledgeCore';
  const description = locale === 'de' 
    ? 'Das Gedächtnis der Lehre. Erfassen, organisieren und aktivieren Sie Ihr Wissen über Ihre gesamte Karriere hinweg.'
    : 'The memory spine of teaching. Capture, organise, and resurface knowledge across your career.';

  return <ProductPage title={title} description={description} locale={locale} />;
}