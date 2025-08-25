import { Metadata } from 'next'
import PricingClient from './PricingClient'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.zazapromptly.com'

export const metadata: Metadata = {
  title: 'Simple pricing for teachers and schools | Promptly',
  description: 'Simple pricing for teachers and schools. Flexible pricing from $15/month (pricing varies by region). Try free for 14 days - no credit card required.',
  keywords: ['teacher pricing', 'AI for teachers', 'education software pricing', 'teacher tools subscription'],
  alternates: {
    canonical: `${baseUrl}/pricing`,
    languages: {
      'en': `${baseUrl}/pricing`,
      'de': `${baseUrl}/pricing?lang=de`,
      'x-default': `${baseUrl}/pricing`
    }
  },
  openGraph: {
    title: 'Pricing | Promptly',
    description: 'Choose the perfect plan for your teaching needs. Start with our free trial and upgrade anytime. Flexible pricing for individual teachers and schools.',
    url: `${baseUrl}/pricing`,
    images: [
      {
        url: '/og-default.png',
        width: 1200,
        height: 630,
        alt: 'Promptly Pricing - AI Tools for Teachers',
      },
    ],
    siteName: 'Promptly',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pricing | Promptly',
    description: 'Choose the perfect plan for your teaching needs. Start with our free trial and upgrade anytime. Flexible pricing for individual teachers and schools.',
    images: ['/og-default.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-slate-900">
      {/* Hero Section */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-white mb-6">
              Simple, transparent pricing
            </h1>
            <p className="text-xl text-slate-300 mb-12 max-w-[720px] mx-auto">
              Start free and upgrade anytime. No hidden fees, no long-term commitments. 
              Choose the plan that works best for your teaching needs.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Component */}
      <PricingClient />

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-semibold text-white text-center mb-12">
              Frequently asked questions
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Can I cancel anytime?
                  </h3>
                  <p className="text-slate-300">
                    Yes, you can cancel your subscription at any time. Your access will continue until the end of your current billing period.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Do you offer school discounts?
                  </h3>
                  <p className="text-slate-300">
                    Yes, we offer volume discounts for schools and multi-academy trusts. Contact us for custom pricing options.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    What payment methods do you accept?
                  </h3>
                  <p className="text-slate-300">
                    We accept all major credit cards, debit cards, and digital wallets through Stripe&apos;s secure payment processing.
                  </p>
                </div>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Is there a free trial?
                  </h3>
                  <p className="text-slate-300">
                    Yes, all plans come with a 14-day free trial. No credit card required to get started.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Can I change plans later?
                  </h3>
                  <p className="text-slate-300">
                    Absolutely. You can upgrade or downgrade your plan at any time from your account settings.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Need help deciding?
                  </h3>
                  <p className="text-slate-300">
                    We&apos;re here to help! Contact us and we&apos;ll help you choose the best plan for your needs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
