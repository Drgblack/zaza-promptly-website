import type { Metadata } from 'next';
import { LooopProductPage } from '@/components/product-pages/looop-product-page';

export const metadata: Metadata = {
  title: 'Zaza Looop - Language Learning That Brings Cultures to Life',
  description: 'Language learning that brings cultures to life. A culturally immersive AI-powered language learning app for bilingual classrooms and teachers building language skills.',
  alternates: {
    canonical: '/looop',
  },
};

export default function LooopPage() {
  return <LooopProductPage />;
}