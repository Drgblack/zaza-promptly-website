import type { Metadata } from 'next';

export default function generateMetadata() {
  return {};
}

export function generateProductMetadata(
  title: string,
  description: string,
  productSlug: string,
  keywords: string[]
): Metadata {
  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}
