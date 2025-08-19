import type { Metadata } from 'next';
import { TeachProductPage } from '@/components/product-pages/teach-product-page';

export const metadata: Metadata = {
  title: 'Zaza Teach - AI-Powered Lesson Planning Assistant',
  description: 'AI-powered lesson planning that gets your Sunday nights back. Save 3-5 hours per week on planning with curriculum-aligned lessons in minutes, not hours.',
  alternates: {
    canonical: '/teach',
  },
};

export default function TeachPage() {
  return <TeachProductPage />;
}