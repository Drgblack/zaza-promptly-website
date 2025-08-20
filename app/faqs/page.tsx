import type { Metadata } from 'next';
import FAQSimple from '@/components/FAQSimple';
import { StructuredData } from '@/components/structured-data';
import { generateFAQSchema } from '@/lib/structured-data';

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
  // Enhanced FAQ data for structured data generation
  const faqData = [
    {
      question: 'Is my student data safe with AI?',
      answer: 'Absolutely. Zaza Promptly meets the highest privacy standards with GDPR compliance, bank-level encryption, and EU-only data processing. Your student information NEVER trains other AI models or leaves secure servers.'
    },
    {
      question: 'Will students misuse this technology?',
      answer: 'Students cannot access Zaza Promptly - it\'s a teacher-only tool designed for professional communication and report writing with safeguards that prevent inappropriate content.'
    },
    {
      question: 'Is using AI for teaching cheating or unprofessional?',
      answer: 'No. Using AI for teacher reports and parent communication is a productivity tool, like spell-check. You maintain full control and professional judgment over all communications.'
    },
    {
      question: 'How is Zaza Promptly different from ChatGPT?',
      answer: 'ChatGPT can hallucinate false information about students. Zaza Promptly is specifically designed for education with built-in safeguards against hallucinations and GDPR compliance.'
    },
    {
      question: 'Does this actually save time or create more work?',
      answer: 'Teachers report saving 3-5 hours per week on report writing and parent communication. What used to take 15-20 minutes per comment now takes 2-3 minutes.'
    },
    {
      question: 'What prevents inappropriate content about students?',
      answer: 'Multiple safety layers: content filtering, context awareness, tone validation, and hallucination prevention. Every output is checked against educational communication standards.'
    },
    {
      question: 'Will the comments sound like me?',
      answer: 'Yes. Promptly matches your tone and you can write your own templates. Every suggestion is fully editable - you\'re always in control.'
    },
    {
      question: 'Does this work for all ages and subjects?',
      answer: 'From Reception to Year 13, maths to music, Zaza adapts to your teaching context. Works for primary parent communication and secondary report writing.'
    },
    {
      question: 'Can my school pay for this?',
      answer: 'We offer school-wide licenses with bulk pricing, admin controls, and easy billing. Many schools find the time savings justifies the investment.'
    },
    {
      question: 'How quickly can I get started?',
      answer: 'Generate your first parent message or report comment in under 2 minutes. No training courses or complex setup required.'
    }
  ]

  const faqSchema = generateFAQSchema(faqData)

  return (
    <div>
      <StructuredData data={faqSchema} />
      <FAQSimple />
      
      {/* Enhanced JSON-LD Schema for FAQ Page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "name": "Zaza Promptly FAQ - AI Teaching Assistant Questions",
            "description": "Frequently asked questions about Zaza Promptly AI teaching assistant, covering data safety, privacy, and time-saving benefits for teachers.",
            "url": "https://zazapromptly.com/faqs",
            "mainEntity": faqData.map(faq => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
              }
            })),
            "publisher": {
              "@type": "Organization",
              "name": "Zaza Promptly",
              "url": "https://zazapromptly.com",
              "logo": "https://zazapromptly.com/logo.png"
            }
          })
        }}
      />
    </div>
  );
} 