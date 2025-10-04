// sites/promptly-v2/src/app/[locale]/page.tsx
import { Metadata } from 'next';
import LocalizedHomePage from '@/components/i18n/LocalizedHomePage';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: 'The writing partner for teachers | Zaza Draft',
  description: 'Beat the blank page, save hours, and stay in control. Powered by the world\'s first safe AI — built for education. Try Zaza Draft free.',
  keywords: 'AI for teachers, teacher writing assistant, parent communication, safe AI for teachers, teacher AI tool, hallucination-safe AI, teacher report writing',
  openGraph: {
    title: 'The writing partner for teachers | Zaza Draft',
    description: 'Beat the blank page, save hours, and stay in control. Powered by the world\'s first safe AI — built for education. Try Zaza Draft free.',
    images: ['/images/og/zaza-og.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The writing partner for teachers | Zaza Draft',
    description: 'Beat the blank page, save hours, and stay in control. Powered by the world\'s first safe AI — built for education. Try Zaza Draft free.',
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