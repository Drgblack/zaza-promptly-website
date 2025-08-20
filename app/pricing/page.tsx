import type { Metadata } from 'next'
import { PricingPageClient } from './PricingPageClient'
import { ProductStructuredData, FAQStructuredData } from '@/components/seo/StructuredData'

export const metadata: Metadata = {
    title: 'Pricing - AI Teaching Assistant Plans | Zaza Promptly',
    description: 'Choose the perfect AI teaching plan for your needs. Free demo, Teacher monthly, School license. GDPR-compliant AI built by PhD educator.',
    keywords: [
      'AI teacher pricing',
      'teaching assistant subscription',
      'education AI plans',
      'teacher productivity pricing',
      'AI teaching tools cost',
      'educational software pricing',
      'teacher AI assistant plans'
    ],
    openGraph: {
      title: 'AI Teaching Assistant Pricing - Start Your Free Trial',
      description: 'Transparent pricing for teachers. Free 7-day trial, cancel anytime. Built by PhD educator for real classroom needs.',
      type: 'website',
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}

export default function PricingPage() {

  // Structured data for the product and pricing
  const productData = {
    name: "Zaza Promptly - AI Teaching Assistant",
    description: "AI-powered teaching assistant that helps teachers generate professional student comments, parent messages, and reports 10x faster. Built by PhD educator.",
    brand: "Zaza Technologies",
    category: "Educational Software",
    offers: {
      price: "14.99",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      priceRange: "Starting at $14.99/month",
      geoNote: "Pricing may vary by region - contact us for local pricing"
    },
    aggregateRating: {
      ratingValue: 4.8,
      reviewCount: 247
    },
    features: [
      "Unlimited AI-generated student comments",
      "Professional parent communication templates", 
      "Multi-language support (EN, FR, DE, ES, IT)",
      "GDPR compliant and secure",
      "50+ professional templates",
      "Export to PDF & Word",
      "Mobile-friendly interface",
      "Priority email support"
    ]
  };

  const faqData = [
    {
      question: "Can I try it before I buy?",
      answer: "Yes! All plans include a 7-day free trial. You can explore all features without entering payment details during your trial."
    },
    {
      question: "Can I cancel anytime?",
      answer: "Absolutely. You can cancel your subscription at any time from your account settings. No questions asked, no cancellation fees."
    },
    {
      question: "Is my data secure and private?",
      answer: "Yes. We're GDPR compliant and never store your student data. All communications are encrypted and we never share your content with third parties."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, debit cards, and digital wallets through our secure Stripe payment system."
    }
  ];

  return (
    <>
      <ProductStructuredData product={productData} />
      <FAQStructuredData faqs={faqData} mainEntity="Zaza Promptly" />
      
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16 sm:py-20">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl md:text-2xl text-purple-100 mb-8 max-w-3xl mx-auto">
            Choose the plan that fits your teaching needs. All plans include a 7-day free trial and can be cancelled anytime.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-purple-100">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              7-day free trial
            </div>
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Cancel anytime
            </div>
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              30-day money-back guarantee
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PricingPageClient />
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white py-16 sm:py-20 border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to know about our pricing and features
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid gap-8 md:grid-cols-2">
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Can I try it before I buy?
                  </h3>
                  <p className="text-gray-600">
                    Yes! All plans include a 7-day free trial. You can explore all features without entering payment details during your trial.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Can I cancel anytime?
                  </h3>
                  <p className="text-gray-600">
                    Absolutely. You can cancel your subscription at any time from your account settings. No questions asked, no cancellation fees.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Is my data secure and private?
                  </h3>
                  <p className="text-gray-600">
                    Yes. We're GDPR compliant and never store your student data. All communications are encrypted and we never share your content with third parties.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Do you offer school/district pricing?
                  </h3>
                  <p className="text-gray-600">
                    Yes! We offer volume discounts for schools and districts. Contact our team for custom pricing based on your needs.
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    What payment methods do you accept?
                  </h3>
                  <p className="text-gray-600">
                    We accept all major credit cards, debit cards, and digital wallets through our secure Stripe payment system.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Is there a money-back guarantee?
                  </h3>
                  <p className="text-gray-600">
                    Yes, we offer a 30-day money-back guarantee. If you're not satisfied, we'll refund your payment in full.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Can I upgrade or downgrade my plan?
                  </h3>
                  <p className="text-gray-600">
                    You can change your plan anytime from your account settings. Upgrades are prorated, and downgrades take effect at your next billing cycle.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Do you offer educational discounts?
                  </h3>
                  <p className="text-gray-600">
                    Yes! We offer special pricing for student teachers, new teachers in their first year, and teachers in Title I schools. Contact us for details.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Section */}
      <div className="bg-gray-50 py-16 border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Secure & Private</h3>
              <p className="text-gray-600 text-sm">GDPR compliant with end-to-end encryption</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">24/7 Support</h3>
              <p className="text-gray-600 text-sm">Get help whenever you need it</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Teacher Approved</h3>
              <p className="text-gray-600 text-sm">Built by PhD educator, trusted by 12,000+ teachers</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}