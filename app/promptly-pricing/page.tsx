import type { Metadata } from 'next'
import Link from 'next/link'
import { ImprovedPricing } from "@/components/improved-pricing";
import { SEOHead } from "../../components/seo-head";
import { Zap, CheckCircle, Users, Shield } from "lucide-react";

// Disable static generation - render pages dynamically to prevent build errors
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Zaza Promptly Pricing - AI Teacher Tools Plans & Pricing',
  description: 'Choose the perfect AI-powered teaching plan for your needs. Start with our free tier or upgrade to Pro for unlimited feedback generation and advanced features.',
  keywords: ['AI teacher tools pricing', 'education technology plans', 'teacher feedback software cost', 'AI for teachers pricing'],
  openGraph: {
    title: 'Zaza Promptly Pricing - AI Teacher Tools Plans & Pricing',
    description: 'Choose the perfect AI-powered teaching plan for your needs. Start with our free tier or upgrade to Pro for unlimited feedback generation and advanced features.',
    images: ['/opengraph-image'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zaza Promptly Pricing - AI Teacher Tools Plans & Pricing',
    description: 'Choose the perfect AI-powered teaching plan for your needs. Start with our free tier or upgrade to Pro for unlimited feedback generation and advanced features.',
    images: ['/opengraph-image'],
  },
  alternates: {
    canonical: '/promptly-pricing',
  },
}

export default function PromptlyPricing() {
  return (
    <div className="pt-16 lg:pt-20">
      <SEOHead pageType="promptly-pricing" />
        {/* Hero Section */}
        <section className="py-16 lg:py-24 bg-gradient-to-br from-purple-50 to-pink-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex items-center justify-center mb-6">
              <Zap className="w-8 h-8 text-purple-600 mr-3" />
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-800">
                Choose Your{" "}
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  AI Teaching Plan
                </span>
              </h1>
            </div>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Join thousands of teachers who are already saving 5+ hours per week with AI-powered feedback generation.
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-3">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <div className="text-2xl font-bold text-gray-800">12,000+</div>
                <div className="text-sm text-gray-600">Teachers Using AI</div>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                  <CheckCircle className="w-6 h-6 text-blue-600" />
                </div>
                <div className="text-2xl font-bold text-gray-800">5.7 hrs</div>
                <div className="text-sm text-gray-600">Average Time Saved/Week</div>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-3">
                  <Shield className="w-6 h-6 text-green-600" />
                </div>
                <div className="text-2xl font-bold text-gray-800">99.2%</div>
                <div className="text-sm text-gray-600">Teacher Satisfaction</div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-16 lg:py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Simple, Transparent Pricing
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Choose the plan that fits your teaching style. Upgrade, downgrade, or cancel anytime.
              </p>
            </div>

            <ImprovedPricing />
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Can I cancel anytime?</h3>
                <p className="text-gray-600 text-sm">
                  Yes! You can cancel your subscription at any time from your account settings. 
                  No questions asked, no cancellation fees.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Is there a free trial?</h3>
                <p className="text-gray-600 text-sm">
                  We offer a 30-day money-back guarantee instead of a trial. Try it risk-free 
                  and get a full refund if you're not satisfied.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">What payment methods do you accept?</h3>
                <p className="text-gray-600 text-sm">
                  We accept all major credit cards (Visa, MasterCard, American Express) 
                  processed securely through Stripe.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Do you offer school/district pricing?</h3>
                <p className="text-gray-600 text-sm">
                  Yes! We offer special pricing for schools and districts. 
                  Contact us at schools@zazapromptly.com for a custom quote.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-purple-600 to-pink-600">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Transform Your Teaching?
            </h2>
            <p className="text-xl text-purple-100 mb-8">
              Join thousands of teachers who've already discovered their AI superpower.
            </p>
            <div className="flex justify-center">
              <Link 
                href="/promptly-pricing" 
                className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Choose Your Plan
              </Link>
            </div>
          </div>
        </section>
    </div>
  );
}