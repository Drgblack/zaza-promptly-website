import type { Metadata } from 'next';
import { NotablyProductPage } from '@/components/product-pages/notably-product-page';

export const metadata: Metadata = {
  title: 'Zaza Notably Suite - Professional Writing for Educators',
  description: 'Professional writing for educators, minus the stress. Draft policies, proposals, and reports with confidence using AI communication tools designed for schools.',
  alternates: {
    canonical: '/notably',
  },
};

export default function NotablyPage() {
  return <NotablyProductPage />;
}