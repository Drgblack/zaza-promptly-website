import type { Metadata } from 'next';
import ContactForm from './ContactForm';

export const metadata: Metadata = {
  title: 'Contact Us | Get Support - Zaza Technologies',
  description: 'Contact Zaza Technologies for support with our AI teaching tools. Get help with Zaza Promptly, technical issues, or general inquiries.',
  keywords: 'contact Zaza Technologies, AI teaching tools support, educational technology help, teacher support',
  openGraph: {
    title: 'Contact Us - Zaza Technologies',
    description: 'Get in touch with our team for support, questions, or feedback about our AI-powered teaching tools.',
    type: 'website',
    url: 'https://zazapromptly.com/contact',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Us - Zaza Technologies',
    description: 'Get in touch with our team for support, questions, or feedback about our AI-powered teaching tools.',
  },
  alternates: {
    canonical: 'https://zazapromptly.com/contact',
  },
};

export default function ContactPage() {
  return <ContactForm />;
} 