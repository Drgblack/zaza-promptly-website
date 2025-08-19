import type { Metadata } from 'next';
import { SparkProductPage } from '@/components/product-pages/spark-product-page';

export const metadata: Metadata = {
  title: 'Zaza Spark (HR) - HR Workflows That Actually Work for Schools',
  description: 'HR workflows that actually work for schools. Streamline teacher onboarding, training schedules, and communication with tools designed for educational environments.',
  alternates: {
    canonical: '/spark',
  },
};

export default function SparkPage() {
  return <SparkProductPage />;
}