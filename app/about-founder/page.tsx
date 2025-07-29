import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About the Founder | Zaza Technologies Leadership',
  description: 'Learn about the founder and leadership behind Zaza Technologies\' AI-powered educational tools that are transforming teaching.',
  keywords: 'Zaza Technologies founder, educational leadership, AI education pioneers, teaching innovation',
  openGraph: {
    title: 'About the Founder - Zaza Technologies',
    description: 'Meet the visionary founder behind Zaza Technologies\' revolutionary AI teaching tools.',
    type: 'website',
    url: 'https://zazapromptly.com/about-founder',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About the Founder - Zaza Technologies',
    description: 'Meet the visionary founder behind Zaza Technologies\' revolutionary AI teaching tools.',
  },
  alternates: {
    canonical: 'https://zazapromptly.com/about-founder',
  },
};

export default function AboutFounderPlaceholder() {
  return (
    <div style={{ padding: 32, textAlign: 'center' }}>
      <h1>About the Founder</h1>
      <p>This page is only available on the main Zaza Technologies site.</p>
      <a href="https://zazatechnologies.com/about-founder" target="_blank" rel="noopener noreferrer" style={{ color: '#7c3aed', textDecoration: 'underline' }}>
        Go to About the Founder
      </a>
    </div>
  );
} 