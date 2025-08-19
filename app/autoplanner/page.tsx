import type { Metadata } from 'next';
import { AutoPlannerProductPage } from '@/components/product-pages/autoplanner-product-page';

export const metadata: Metadata = {
  title: 'Zaza AutoPlanner - The Future of Teaching: AI That Adapts',
  description: 'Our flagship multimodal AI agent for the future of teaching. Adaptive, classroom-aware, and built to align lessons with curriculum standards in real time.',
  alternates: {
    canonical: '/autoplanner',
  },
};

export default function AutoPlannerPage() {
  return <AutoPlannerProductPage />;
}