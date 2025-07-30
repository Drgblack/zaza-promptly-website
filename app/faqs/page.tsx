import type { Metadata } from 'next';
import FAQ from '@/components/FAQ';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { HelpCircle, MessageCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'FAQs | Frequently Asked Questions - Zaza Promptly',
  description: 'Find answers to common questions about Zaza Promptly, our AI-powered teaching assistant. Learn about features, pricing, privacy, and how it compares to other AI tools.',
  keywords: 'Zaza Promptly FAQ, AI teaching tools questions, educational technology support, teacher AI assistant, ChatGPT vs Zaza',
  openGraph: {
    title: 'FAQs - Zaza Promptly | AI Teaching Assistant',
    description: 'Get answers to frequently asked questions about Zaza Promptly and discover why teachers choose our specialized AI over generic tools.',
    type: 'website',
    url: 'https://zazapromptly.com/faqs',
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FAQs - Zaza Promptly | AI Teaching Assistant', 
    description: 'Get answers to frequently asked questions about Zaza Promptly and discover why teachers choose our specialized AI over generic tools.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: 'https://zazapromptly.com/faqs',
  },
};

export default function FAQsPage() {
  return (
    <div className="pt-16 lg:pt-20">
      {/* Hero Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="secondary" className="text-indigo-700 bg-indigo-100 px-4 py-2 mb-6">
            <HelpCircle className="w-4 h-4 mr-2" />
            Get Your Questions Answered
          </Badge>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-800 mb-6">
            Frequently Asked{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Questions
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Everything you need to know about Zaza Promptly, the AI teaching assistant 
            designed specifically for educators like you.
          </p>
        </div>
      </section>

      {/* FAQ Component */}
      <section className="py-16 lg:py-24">
        <FAQ />
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Still Have Questions?
          </h2>
          <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
            Can't find what you're looking for? Our support team is here to help you 
            get the most out of Zaza Promptly.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-indigo-600 hover:bg-gray-100"
              asChild
            >
              <Link href="/contact">
                <MessageCircle className="w-5 h-5 mr-2" />
                Contact Support
              </Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-indigo-600"
              asChild
            >
              <Link href="/free-resources">
                <ArrowRight className="w-5 h-5 mr-2" />
                Try Free Resources
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
} 