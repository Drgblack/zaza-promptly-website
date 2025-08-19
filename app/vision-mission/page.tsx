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
      <p>Learn more about our mission to revolutionize education through AI technology.</p>
      <p style={{ color: '#7c3aed', marginTop: '20px' }}>
        Empowering educators worldwide with intelligent teaching tools that save time and enhance student outcomes.
      </p>
    </div>
  );
} 