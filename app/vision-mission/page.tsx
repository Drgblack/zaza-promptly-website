import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Vision & Mission | Transforming Education with AI - Zaza Technologies',
  description: 'Discover Zaza Technologies\' vision and mission to revolutionize education through AI-powered teaching tools that empower educators worldwide.',
  keywords: 'Zaza Technologies vision, educational mission, AI education transformation, teaching innovation goals',
  openGraph: {
    title: 'Vision & Mission - Zaza Technologies',
    description: 'Learn about our mission to transform education through innovative AI tools that empower teachers and improve student outcomes.',
    type: 'website',
    url: 'https://zazapromptly.com/vision-mission',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vision & Mission - Zaza Technologies',
    description: 'Learn about our mission to transform education through innovative AI tools that empower teachers and improve student outcomes.',
  },
  alternates: {
    canonical: 'https://zazapromptly.com/vision-mission',
  },
};

export default function VisionMissionPlaceholder() {
  return (
    <div style={{ padding: 32, textAlign: 'center' }}>
      <h1>Vision & Mission</h1>
      <p>This page is only available on the main Zaza Technologies site.</p>
      <a href="https://zazatechnologies.com/vision-mission" target="_blank" rel="noopener noreferrer" style={{ color: '#7c3aed', textDecoration: 'underline' }}>
        Go to Vision & Mission
      </a>
    </div>
  );
} 