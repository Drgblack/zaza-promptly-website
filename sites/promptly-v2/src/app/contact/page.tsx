import { Metadata } from 'next'
import ContactForm from './ContactForm'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.zazapromptly.com'

export const metadata: Metadata = {
  title: 'Contact Us | Promptly',
  description: 'Get in touch with the Promptly team. We&apos;d love to hear from you and help with any questions about our AI-powered teaching tools.',
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'Contact Us | Promptly',
    description: 'Get in touch with the Promptly team. We&apos;d love to hear from you and help with any questions about our AI-powered teaching tools.',
    url: `${baseUrl}/contact`,
    images: [
      {
        url: '/og-default.png',
        width: 1200,
        height: 630,
        alt: 'Contact Promptly - Get in Touch',
      },
    ],
    siteName: 'Promptly',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Us | Promptly',
    description: 'Get in touch with the Promptly team. We&apos;d love to hear from you and help with any questions about our AI-powered teaching tools.',
    images: ['/og-default.png'],
  },
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-slate-900">
      {/* Hero Section */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-white mb-6">
              Contact Us
            </h1>
            <p className="text-xl text-slate-300 mb-12 max-w-[720px] mx-auto">
              We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="pb-20">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Additional Contact Info */}
      <section className="border-t border-white/10 py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-brand-600/20 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                  <svg className="w-8 h-8 text-brand-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Email Us</h3>
                <p className="text-slate-300 mb-4">
                  For general inquiries and support
                </p>
                <a
                  href="mailto:hello@zazapromptly.com"
                  className="text-brand-400 hover:text-brand-300 underline decoration-brand-400/50 hover:decoration-brand-300/50 transition-colors"
                >
                  hello@zazapromptly.com
                </a>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-purple-600/20 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                  <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Enterprise</h3>
                <p className="text-slate-300 mb-4">
                  Custom solutions for schools and MATs
                </p>
                <a
                  href="mailto:enterprise@zazapromptly.com"
                  className="text-purple-400 hover:text-purple-300 underline decoration-purple-400/50 hover:decoration-purple-300/50 transition-colors"
                >
                  enterprise@zazapromptly.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
