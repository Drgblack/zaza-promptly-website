import { Metadata } from 'next'
import Link from 'next/link'
import { generateSEOMetadata, seoConfigs } from '@/lib/seo/metadata'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.zazapromptly.com'

export const metadata: Metadata = {
  title: 'FAQ - Frequently Asked Questions | Promptly for Teachers',
  description: 'Clear answers about Promptly\'s hallucination-safe AI for teachers. Learn about safety, privacy, pricing, and how Promptly differs from ChatGPT.',
  keywords: ['Promptly FAQ', 'teacher AI questions', 'hallucination-safe AI', 'AI for teachers safety', 'Promptly vs ChatGPT', 'teacher data privacy'],
  openGraph: {
    title: 'FAQ - Frequently Asked Questions | Promptly for Teachers',
    description: 'Clear answers about Promptly\'s hallucination-safe AI for teachers. Learn about safety, privacy, pricing, and how Promptly differs from ChatGPT.',
    type: 'website',
    url: `${baseUrl}/faq`,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FAQ - Frequently Asked Questions | Promptly for Teachers',
    description: 'Clear answers about Promptly\'s hallucination-safe AI for teachers. Learn about safety, privacy, pricing, and how Promptly differs from ChatGPT.',
  },
}

const faqs = [
  {
    question: "What makes Promptly different from ChatGPT?",
    answer: "Promptly is specifically designed for education with hallucination-safe AI that won't generate false information or inappropriate content. Unlike ChatGPT, Promptly is trained on educational contexts, understands pedagogy, and includes safety guardrails to ensure accurate, appropriate content for school communications. It's built by educators, for educators—not a general-purpose AI tool repurposed for teaching."
  },
  {
    question: "What does 'hallucination-safe' mean?",
    answer: "Hallucination-safe means our AI won't make up facts, create fictional information, or generate inappropriate content. Generic AI can 'hallucinate'—confidently stating things that aren't true or creating content that's unsuitable for school environments. Promptly's safety systems prevent this, ensuring all generated content is appropriate for educational contexts and family communication."
  },
  {
    question: "Can I cancel anytime?",
    answer: "Yes, absolutely. You can cancel your subscription at any time with no penalties, fees, or questions asked. Your access will continue until the end of your current billing period, and you can always restart later. We believe teachers should have complete flexibility with their tools."
  },
  {
    question: "Is my data private?",
    answer: "Yes, your data is completely private and secure. We're GDPR compliant and never use your content to train AI models. All data is encrypted in transit and at rest. Your student information, communications, and teaching content remain confidential at all times. We understand the sensitivity of educational data and treat it with the highest level of security."
  },
  {
    question: "Does it really save time?",
    answer: "Yes—teachers report saving 5-8 hours per week on report writing and parent communications. What used to take 15 minutes per comment now takes 2-3 minutes. Primary teachers finish reports in 2 hours instead of entire weekends. Secondary teachers handle hundreds of comments in the time it used to take for dozens. The time savings are immediate and substantial."
  },
  {
    question: "How accurate are translations?",
    answer: "Our translations are highly accurate and culturally sensitive. Unlike generic translation tools, Promptly preserves educational terminology and adapts tone for different cultural contexts. We support 25+ languages with native-speaker quality that maintains the warmth and professionalism of your original message. Parents have consistently praised the natural, respectful tone of multilingual communications."
  },
  {
    question: "Will Promptly replace teachers?",
    answer: "Absolutely not. Promptly is designed to handle administrative tasks so teachers can focus on what matters most—teaching, connecting with students, and being creative in the classroom. It's an AI writing assistant, not a replacement for human expertise. You remain in control of all content, making decisions about tone, personalization, and what to communicate. Promptly simply helps you say it better and faster."
  },
  {
    question: "Do I need a credit card for the free plan?",
    answer: "No credit card required for the free plan. You can start using Promptly immediately with 5 comments per month at no cost. Only when you decide to upgrade to Pro or Bundle plans will we ask for payment information. We believe in letting teachers experience the value before making any financial commitment."
  }
]

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "name": "Frequently Asked Questions about Promptly for Teachers",
  "description": "Common questions and answers about Promptly's hallucination-safe AI for teachers",
  "url": `${baseUrl}/faq`,
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
}

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      
      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Questions teachers ask us
            </h1>
            <p className="text-xl text-slate-300 mb-12 max-w-3xl mx-auto">
              Clear answers to help you trust Promptly and understand how hallucination-safe AI works for education.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700">
                  <h2 className="text-xl md:text-2xl font-semibold text-white mb-4 leading-tight">
                    {faq.question}
                  </h2>
                  <div className="text-slate-300 leading-relaxed space-y-4">
                    {faq.answer.split('\n\n').map((paragraph, pIndex) => (
                      <p key={pIndex}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Additional Trust Signals */}
      <section className="py-16 bg-slate-800/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-white text-center mb-12">
              Built with teachers' trust in mind
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-3">GDPR Compliant</h3>
                <p className="text-slate-400 text-sm">Your data is protected with enterprise-grade security and privacy controls</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-3">Built by Educators</h3>
                <p className="text-slate-400 text-sm">Created by Dr. Greg Blackburn, PhD in Professional Education</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-purple-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-3">24/7 Support</h3>
                <p className="text-slate-400 text-sm">Priority support for Pro users, community support for all teachers</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-12">
              Trusted by teachers worldwide
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-400 mb-2">12,000+</div>
                <p className="text-slate-400 text-sm">Teachers using Promptly</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-400 mb-2">4.9/5</div>
                <p className="text-slate-400 text-sm">Average rating</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-400 mb-2">25+</div>
                <p className="text-slate-400 text-sm">Languages supported</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-cyan-400 mb-2">8 hrs</div>
                <p className="text-slate-400 text-sm">Average weekly time saved</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Questions Quick Links */}
      <section className="py-16 bg-slate-800/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-white text-center mb-8">
              Popular questions
            </h2>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                <h3 className="text-white font-medium mb-2">🔒 Safety & Privacy</h3>
                <p className="text-slate-400 text-sm">GDPR compliant, hallucination-safe AI designed specifically for education</p>
              </div>
              <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                <h3 className="text-white font-medium mb-2">⚡ Time Savings</h3>
                <p className="text-slate-400 text-sm">Teachers save 5-8 hours per week on reports and parent communications</p>
              </div>
              <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                <h3 className="text-white font-medium mb-2">🌍 Translation</h3>
                <p className="text-slate-400 text-sm">Native-quality translations in 25+ languages with cultural sensitivity</p>
              </div>
              <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                <h3 className="text-white font-medium mb-2">💰 Free Plan</h3>
                <p className="text-slate-400 text-sm">5 comments per month free, no credit card required to start</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Still have questions?
            </h2>
            <p className="text-xl text-slate-300 mb-8">
              Our team of educators is here to help you understand how Promptly can transform your teaching practice.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/contact"
                className="inline-flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors shadow-lg"
              >
                Contact support
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </Link>
              <Link 
                href="/waitlist"
                className="inline-flex items-center px-8 py-4 border border-blue-600 text-blue-400 hover:bg-blue-600/10 font-semibold rounded-lg transition-colors"
              >
                Try Promptly free
              </Link>
            </div>
            
            <p className="text-slate-400 text-sm mt-6">
              Average response time: 2 hours during school hours
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}