import { Metadata } from 'next'
import PricingClient from './PricingClient'
import { generateSEOMetadata, seoConfigs } from '@/lib/seo/metadata'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.zazapromptly.com'

export const metadata: Metadata = generateSEOMetadata(seoConfigs.pricing)

const productJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Zaza Promptly",
  description: "Hallucination-safe AI tool for teachers. Generate parent communications, student reports & professional messages. Reduce teacher workload with GDPR-compliant AI.",
  url: baseUrl,
  applicationCategory: "EducationalApplication",
  operatingSystem: "Web",
  keywords: "AI tool for teachers, AI for teacher reports, AI for parent communication, safe AI for teachers, hallucination-safe AI, teacher productivity apps",
  author: {
    "@type": "Organization",
    name: "Zaza Technologies",
    founder: {
      "@type": "Person",
      name: "Dr. Greg Blackburn",
      jobTitle: "PhD, Professional Education"
    }
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    reviewCount: "12000",
    bestRating: "5",
    worstRating: "1"
  },
  offers: [
    {
      "@type": "Offer",
      name: "Free Plan",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: `${baseUrl}/pricing`,
      description: "5 student reports per month, basic templates, email support"
    },
    {
      "@type": "Offer", 
      name: "Pro Plan",
      price: "15",
      priceCurrency: "USD",
      billingIncrement: "Month",
      availability: "https://schema.org/InStock",
      url: `${baseUrl}/pricing`,
      description: "Unlimited reports, advanced personalisation, priority support, bulk generation"
    },
    {
      "@type": "Offer",
      name: "School Plan", 
      price: "299",
      priceCurrency: "USD",
      billingIncrement: "Year",
      availability: "https://schema.org/InStock",
      url: `${baseUrl}/pricing`,
      description: "Everything in Pro, multi-teacher dashboard, school analytics, admin controls, dedicated support"
    }
  ],
  audience: {
    "@type": "EducationalAudience",
    educationalRole: "teacher",
    geographicArea: ["United Kingdom", "United States", "Germany", "France", "Spain", "Italy"]
  },
  featureList: [
    "Hallucination-safe AI for accurate content",
    "Parent communication templates", 
    "Student report generation",
    "GDPR-compliant data handling",
    "Multi-language support",
    "Education-specific AI training"
  ]
}


export default function PricingPage() {
  return (
    <div className="min-h-screen bg-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
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
