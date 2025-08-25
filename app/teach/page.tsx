import type { Metadata } from 'next';
import ProductPage from '@/components/ProductPage';

export const metadata: Metadata = {
  title: 'Zaza Teach – AI Lesson Planning Assistant for Teachers',
  description: 'Create engaging lesson plans in minutes with Zaza Teach. AI-powered, curriculum-aligned, and designed by educators to save time and reduce stress.',
  keywords: 'AI lesson planning, teacher lesson plans, AI for teachers, curriculum planning, lesson planning assistant, educational AI, teacher productivity',
  openGraph: {
    title: 'Zaza Teach – AI Lesson Planning Assistant for Teachers',
    description: 'Create engaging lesson plans in minutes with Zaza Teach. AI-powered, curriculum-aligned, and designed by educators to save time and reduce stress.',
    type: 'website',
    url: 'https://www.zazapromptly.com/teach',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zaza Teach – AI Lesson Planning Assistant for Teachers',
    description: 'Create engaging lesson plans in minutes with Zaza Teach. AI-powered, curriculum-aligned, and designed by educators to save time and reduce stress.',
  },
  alternates: {
    canonical: '/teach',
  },
};

export default async function TeachPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const title = 'Zaza Teach';
  const description = locale === 'de' 
    ? 'Ihr KI-gestützter Unterrichtsplanungs-Assistent. Erstellen Sie ansprechende, lehrplankonforme Stunden schneller.'
    : 'Your AI-powered lesson planning assistant. Build engaging, curriculum-aligned lessons faster.';

  return <ProductPage title={title} description={description} locale={locale} />;
}