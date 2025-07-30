import { Metadata } from 'next'
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Download,
  FileText,
  Users,
  Lightbulb,
  BookOpen,
  PenTool,
  Star,
  ArrowRight,
  CheckCircle2,
  Zap,
  Gift
} from 'lucide-react';
import Link from 'next/link';
import { FreeResourcesClient } from './FreeResourcesClient';

export const metadata: Metadata = {
  title: 'Free Teaching Resources - AI Prompts, Templates & Guides',
  description: 'Download free AI prompts, email templates, and teaching guides. Over 50 resources tested by teachers to save you time.',
  alternates: {
    canonical: 'https://zazapromptly.com/free-resources',
  },
  openGraph: {
    title: 'Free Teaching Resources - AI Prompts, Templates & Guides',
    description: 'Download free AI prompts, email templates, and teaching guides. Over 50 resources tested by teachers to save you time.',
    url: 'https://zazapromptly.com/free-resources',
    siteName: 'Zaza Promptly',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@ZazaPromptly',
    title: 'Free Teaching Resources - AI Prompts, Templates & Guides',
    description: 'Download free AI prompts, email templates, and teaching guides. Over 50 resources tested by teachers to save you time.',
  }
};

export default function FreeResourcesPage() {
  return (
    <>
      <Header />
      <FreeResourcesClient />
      <Footer />
    </>
  );
}