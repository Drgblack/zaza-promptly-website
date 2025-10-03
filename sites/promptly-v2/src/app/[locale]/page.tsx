// sites/promptly-v2/src/app/[locale]/page.tsx
import { Metadata } from 'next';
import LocalizedHomePage from '@/components/i18n/LocalizedHomePage';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Zaza Draft – The writing partner for teachers',
  description: 'Beat the blank page, save hours, and stay in control — for parent emails, student reports, and staff notes. Try Zaza Draft free.',
  keywords: 'AI for teachers, AI teacher reports, AI parent communication, safe AI for teachers, teacher AI tool, hallucination-safe AI, teacher report writing',
  openGraph: {
    title: 'Zaza Draft – The writing partner for teachers',
    description: 'Beat the blank page, save hours, and stay in control — for parent emails, student reports, and staff notes. Try Zaza Draft free.',
    images: ['/images/og/zaza-og.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zaza Draft – The writing partner for teachers',
    description: 'Beat the blank page, save hours, and stay in control — for parent emails, student reports, and staff notes. Try Zaza Draft free.',
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