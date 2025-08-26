import { Metadata } from 'next'
import { Suspense } from 'react'
import Link from 'next/link'
import Image from 'next/image'
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
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
      url: `${baseUrl}/pricing`,
      description: "5 comments per month, hallucination-safe AI, tone tutor"
    },
    {
      "@type": "Offer", 
      name: "Pro Plan",
      price: "14.99",
      priceCurrency: "EUR",
      billingIncrement: "Month",
      availability: "https://schema.org/InStock",
      url: `${baseUrl}/pricing`,
      description: "Unlimited comments, translation, priority support"
    },
    {
      "@type": "Offer",
      name: "Bundle Plan", 
      price: "24.99",
      priceCurrency: "EUR",
      billingIncrement: "Month",
      availability: "https://schema.org/InStock",
      url: `${baseUrl}/pricing`,
      description: "Promptly + Zaza Teach complete teaching toolkit"
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
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">
              Simple pricing for every teacher
            </h1>
            <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto">
              Start free, upgrade when ready. No contracts, cancel anytime.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-16">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            
            {/* Free Plan */}
            <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8 relative">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">Free</h3>
                <p className="text-slate-400 text-sm mb-6">Perfect for trying Promptly</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-white">€0</span>
                  <span className="text-slate-400 ml-2">/month</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8" role="list">
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-slate-300">5 comments per month</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-slate-300">Hallucination-safe AI</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-slate-300">Tone tutor + rephrase</span>
                </li>
              </ul>

              <Link
                href="/waitlist"
                className="w-full bg-slate-700 hover:bg-slate-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
              >
                Start free
              </Link>
            </div>

            {/* Pro Plan - Most Popular */}
            <div className="bg-gradient-to-b from-blue-900/30 to-purple-900/30 border-2 border-blue-500 rounded-2xl p-8 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-medium px-4 py-1 rounded-full">
                  Most Popular
                </span>
              </div>

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">Pro</h3>
                <p className="text-slate-400 text-sm mb-6">For individual teachers</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-white">€14.99</span>
                  <span className="text-slate-400 ml-2">/month</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8" role="list">
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-slate-300">Unlimited comments</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-slate-300">Hallucination-safe, pedagogy-first</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-slate-300">Translation + tone tutor</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-slate-300">Priority support</span>
                </li>
              </ul>

              <Link
                href="/waitlist"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-lg transition-all flex items-center justify-center"
              >
                Upgrade to Pro
              </Link>
            </div>

            {/* Bundle Plan */}
            <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8 relative">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">Bundle</h3>
                <p className="text-slate-400 text-sm mb-6">Complete teaching toolkit</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-white">€24.99</span>
                  <span className="text-slate-400 ml-2">/month</span>
                </div>
                <p className="text-sm text-green-400">Save €5/month</p>
              </div>

              <ul className="space-y-4 mb-8" role="list">
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-slate-300">Everything in Pro</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a.75.75 0 01-.75.75H21m0 0v.75" />
                  </svg>
                  <span className="text-slate-300">Zaza Teach (lesson planning)</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  <span className="text-slate-300">Resource library access</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span className="text-slate-300">Advanced AI features</span>
                </li>
              </ul>

              <Link
                href="/waitlist"
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
              >
                Get the bundle
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Available on */}
      <section id="download" className="py-12">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-semibold text-white mb-8">
              Available on
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a 
                href="https://placeholder-ios-store-link.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:scale-105 transition-transform"
              >
                <Image 
                  src="/images/appstore-badge.svg" 
                  alt="Download on the App Store" 
                  width={150} 
                  height={45} 
                  className="rounded-md"
                />
              </a>
              <a 
                href="https://placeholder-google-play-link.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:scale-105 transition-transform"
              >
                <Image 
                  src="/images/googleplay-badge.svg" 
                  alt="Get it on Google Play" 
                  width={150} 
                  height={45} 
                  className="rounded-md"
                />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-white text-center mb-12">
              Compare plans
            </h2>
            
            <div className="overflow-x-auto">
              <table className="w-full bg-slate-800/30 rounded-2xl overflow-hidden">
                <thead className="bg-slate-800/60">
                  <tr>
                    <th className="text-left px-6 py-4 text-slate-300 font-medium">Features</th>
                    <th className="text-center px-6 py-4 text-white font-semibold">Free</th>
                    <th className="text-center px-6 py-4 text-white font-semibold bg-blue-600/20">Pro</th>
                    <th className="text-center px-6 py-4 text-white font-semibold">Bundle</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  <tr>
                    <td className="px-6 py-4 text-slate-300">Comments per month</td>
                    <td className="px-6 py-4 text-center text-slate-400">5</td>
                    <td className="px-6 py-4 text-center text-green-400 bg-blue-600/10">Unlimited</td>
                    <td className="px-6 py-4 text-center text-green-400">Unlimited</td>
                  </tr>
                  <tr className="bg-slate-800/20">
                    <td className="px-6 py-4 text-slate-300">Hallucination-safe AI</td>
                    <td className="px-6 py-4 text-center">
                      <svg className="w-5 h-5 text-green-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </td>
                    <td className="px-6 py-4 text-center bg-blue-600/10">
                      <svg className="w-5 h-5 text-green-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <svg className="w-5 h-5 text-green-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-slate-300">Tone tutor & rephrase</td>
                    <td className="px-6 py-4 text-center">
                      <svg className="w-5 h-5 text-green-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </td>
                    <td className="px-6 py-4 text-center bg-blue-600/10">
                      <svg className="w-5 h-5 text-green-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <svg className="w-5 h-5 text-green-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </td>
                  </tr>
                  <tr className="bg-slate-800/20">
                    <td className="px-6 py-4 text-slate-300">Translation</td>
                    <td className="px-6 py-4 text-center">
                      <svg className="w-5 h-5 text-slate-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </td>
                    <td className="px-6 py-4 text-center bg-blue-600/10">
                      <svg className="w-5 h-5 text-green-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <svg className="w-5 h-5 text-green-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-slate-300">Priority support</td>
                    <td className="px-6 py-4 text-center">
                      <svg className="w-5 h-5 text-slate-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </td>
                    <td className="px-6 py-4 text-center bg-blue-600/10">
                      <svg className="w-5 h-5 text-green-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <svg className="w-5 h-5 text-green-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </td>
                  </tr>
                  <tr className="bg-slate-800/20">
                    <td className="px-6 py-4 text-slate-300">Zaza Teach access</td>
                    <td className="px-6 py-4 text-center">
                      <svg className="w-5 h-5 text-slate-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </td>
                    <td className="px-6 py-4 text-center bg-blue-600/10">
                      <svg className="w-5 h-5 text-slate-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <svg className="w-5 h-5 text-purple-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white text-center mb-12">
              Frequently asked questions
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">
                    What makes Promptly safer than ChatGPT?
                  </h3>
                  <p className="text-slate-300 leading-relaxed">
                    Promptly is specifically designed for education with hallucination-safe AI that won't generate false information. Unlike ChatGPT, it's trained on educational contexts and includes safety guardrails to ensure accurate, appropriate content for school communications.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">
                    Can I cancel anytime?
                  </h3>
                  <p className="text-slate-300 leading-relaxed">
                    Yes, absolutely. You can cancel your subscription at any time with no penalties or fees. Your access will continue until the end of your current billing period, and you can always restart later.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">
                    Do you offer refunds?
                  </h3>
                  <p className="text-slate-300 leading-relaxed">
                    We offer a 30-day money-back guarantee. If you're not satisfied with Promptly for any reason within your first 30 days, contact us for a full refund.
                  </p>
                </div>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">
                    Is my data private?
                  </h3>
                  <p className="text-slate-300 leading-relaxed">
                    Yes, your data is completely private and secure. We're GDPR compliant, never train AI models on your content, and all data is encrypted. Your student information and communications remain confidential at all times.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">
                    What's included in the bundle?
                  </h3>
                  <p className="text-slate-300 leading-relaxed">
                    The bundle includes full access to both Promptly (unlimited comments, translations, priority support) and Zaza Teach (lesson planning, resource library, curriculum alignment tools) at a discounted rate.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">
                    Can I upgrade or downgrade plans?
                  </h3>
                  <p className="text-slate-300 leading-relaxed">
                    Yes, you can change your plan at any time from your account settings. Upgrades take effect immediately, while downgrades take effect at your next billing cycle.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Start saving hours today
            </h2>
            <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
              Join 12,000+ teachers who've transformed their practice with hallucination-safe AI. Start with 5 free comments this month.
            </p>
            
            <Link 
              href="/waitlist"
              className="inline-flex items-center px-10 py-5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors shadow-2xl text-xl"
            >
              Try Promptly free
              <svg className="ml-3 w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            
            <p className="text-slate-400 text-sm mt-6">
              No credit card required • Cancel anytime • Created by teachers, for teachers
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}