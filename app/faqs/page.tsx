import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FAQs | Frequently Asked Questions - Zaza Technologies',
  description: 'Find answers to common questions about Zaza Technologies\' AI-powered teaching tools, subscriptions, privacy, and educational features.',
  keywords: 'Zaza Technologies FAQ, AI teaching tools questions, educational technology support, teacher tools help',
  openGraph: {
    title: 'FAQs - Zaza Technologies',
    description: 'Get answers to frequently asked questions about our AI-powered educational tools and teaching resources.',
    type: 'website',
    url: 'https://zazapromptly.com/faqs',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FAQs - Zaza Technologies',
    description: 'Get answers to frequently asked questions about our AI-powered educational tools and teaching resources.',
  },
  alternates: {
    canonical: 'https://zazapromptly.com/faqs',
  },
};

export default function FaqsPlaceholder() {
  return (
    <div style={{ padding: 32, textAlign: 'center' }}>
      <h1>FAQs</h1>
      <p>This page is only available on the main Zaza Technologies site.</p>
      <a href="https://zazatechnologies.com/faqs" target="_blank" rel="noopener noreferrer" style={{ color: '#7c3aed', textDecoration: 'underline' }}>
        Go to FAQs
      </a>
    </div>
  );
} 