// sites/promptly-v2/src/app/[locale]/page.tsx
import { Metadata } from 'next';
import LocalizedHomePage from '@/components/i18n/LocalizedHomePage';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Zaza Promptly – AI for Teachers & Parent Communication',
  description: 'Save hours with Zaza Promptly – the hallucination-safe AI built for teachers. Write reports, parent messages, and professional emails faster.',
  keywords: 'AI for teachers, AI teacher reports, AI parent communication, safe AI for teachers, teacher AI tool, hallucination-safe AI, teacher report writing',
  openGraph: {
    title: 'Zaza Promptly – AI for Teachers & Parent Communication',
    description: 'Save hours with Zaza Promptly – the hallucination-safe AI built for teachers. Write reports, parent messages, and professional emails faster.',
    images: ['/images/og/zaza-og.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zaza Promptly – AI for Teachers & Parent Communication',
    description: 'Save hours with Zaza Promptly – the hallucination-safe AI built for teachers. Write reports, parent messages, and professional emails faster.',
    images: ['/images/og/zaza-og.png'],
  },
};

// Safe fallback for static params when LOCALES_ENABLED is missing
export async function generateStaticParams() {
  const defaultLocales = ['en', 'de'];
  return defaultLocales.map((locale) => ({ locale }));
}

export default function Page({ params }: { params: { locale: string } }) {
  return <LocalizedHomePage locale={params.locale} />;
}