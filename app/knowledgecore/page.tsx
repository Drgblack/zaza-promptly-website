import type { Metadata } from 'next';
import { KnowledgeCoreProductPage } from '@/components/product-pages/knowledgecore-product-page';

export const metadata: Metadata = {
  title: 'Zaza KnowledgeCore - Your Teaching Wisdom, Organised and Accessible',
  description: 'Your teaching wisdom, organised and always accessible. The memory spine of teaching that captures, organises, and resurfaces your best ideas across your career.',
  alternates: {
    canonical: '/knowledgecore',
  },
};

export default function KnowledgeCorePage() {
  return <KnowledgeCoreProductPage />;
}