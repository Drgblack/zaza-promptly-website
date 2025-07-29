import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Zaza Promptly FAQ | AI Teaching Tool Questions - Zaza Technologies',
  description: 'Find answers to frequently asked questions about Zaza Promptly, our AI-powered student feedback tool for teachers and educators.',
  keywords: 'Zaza Promptly FAQ, AI student feedback questions, teaching tool help, automated comments help, educator resources',
  openGraph: {
    title: 'Zaza Promptly FAQ - AI Teaching Tool Support',
    description: 'Get answers to common questions about using Zaza Promptly for automated student feedback and AI-powered teaching assistance.',
    type: 'website',
    url: 'https://zazapromptly.com/promptly-faq',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zaza Promptly FAQ - AI Teaching Tool Support',
    description: 'Get answers to common questions about using Zaza Promptly for automated student feedback and AI-powered teaching assistance.',
  },
  alternates: {
    canonical: 'https://zazapromptly.com/promptly-faq',
  },
};

export default function PromptlyFAQ() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4">FAQ</h1>
      <p className="text-lg text-gray-600">This is the FAQ page. Details coming soon.</p>
    </main>
  );
} 