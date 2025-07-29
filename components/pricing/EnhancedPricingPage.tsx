'use client'

import { useState } from 'react'
import { Check, Star, Crown, Zap, Shield, Users, Clock, ArrowRight, ChevronDown, ChevronUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { SUBSCRIPTION_TIERS, type SubscriptionTier } from '@/lib/subscription-tiers'

interface EnhancedPricingPageProps {
  defaultPlan?: string
  referralCode?: string
  feature?: string
}

export function EnhancedPricingPage({ 
  defaultPlan = 'pro-monthly',
  referralCode,
  feature
}: EnhancedPricingPageProps) {
  const [selectedPlan, setSelectedPlan] = useState(defaultPlan)
  const [isAnnual, setIsAnnual] = useState(defaultPlan === 'pro-yearly')
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null)

  const freeTier = SUBSCRIPTION_TIERS.find(t => t.id === 'free')!
  const monthlyTier = SUBSCRIPTION_TIERS.find(t => t.id === 'pro-monthly')!
  const yearlyTier = SUBSCRIPTION_TIERS.find(t => t.id === 'pro-yearly')!

  const currentTier = isAnnual ? yearlyTier : monthlyTier

  const handleStartTrial = (planId: string) => {
    // Track conversion attempt
    if (typeof window !== 'undefined' && (window as any).zazeAnalytics) {
      (window as any).zazeAnalytics.trackFeatureUse(`checkout_started_${planId}`)
    }

    // Build checkout URL with metadata
    const params = new URLSearchParams({
      plan: planId,
      ...(referralCode && { referral: referralCode }),
      ...(feature && { feature })
    })

    window.location.href = `/api/stripe-checkout?${params.toString()}`
  }

  const faqs = [
    {
      question: "What's included in the free trial?",
      answer: "You get full access to all Pro features for 7 days, including unlimited AI comments, all tone options, multi-language support, and premium templates. No credit card required."
    },
    {
      question: "Can I cancel anytime?",
      answer: "Yes! You can cancel your subscription at any time from your account settings. If you cancel during your trial, you won't be charged anything."
    },
    {
      question: "What happens to my data if I cancel?",
      answer: "Your generated content remains accessible for 30 days after cancellation. We recommend exporting any important content before canceling."
    },
    {
      question: "Do you offer school or district pricing?",
      answer: "Yes! We offer special pricing for schools and districts. Contact our team for a custom quote based on your needs."
    },
    {
      question: "Is my student data secure?",
      answer: "Absolutely. We're FERPA compliant and use enterprise-grade security. Your data is encrypted and never shared with third parties."
    },
    {
      question: "Can I switch between monthly and yearly plans?",
      answer: "Yes, you can upgrade to yearly at any time to get the discount. You can also downgrade from yearly to monthly at your next billing cycle."
    }
  ]

  const testimonials = [
    {
      quote: "Zaza Pro has saved me 10+ hours every week. The AI comments are spot-on and the parents love the professional tone.",
      author: "Sarah Chen",
      role: "5th Grade Teacher",
      avatar: "👩‍🏫"
    },
    {
      quote: "Finally, a tool that actually understands teaching! The multilingual support has been a game-changer for our diverse school.",
      author: "Miguel Rodriguez",
      role: "ESL Coordinator",
      avatar: "👨‍🏫"
    },
    {
      quote: "The time I save on report cards now goes back to actual teaching. Best investment I've made for my classroom.",
      author: "Jennifer Park",
      role: "2nd Grade Teacher",
      avatar: "👩‍🏫"
    }
  ]

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <Badge className="mb-4 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 border-purple-200">
          <Star className="w-3 h-3 mr-1" />
          Trusted by 2,400+ teachers
        </Badge>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Choose Your Plan
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Start with our free plan or upgrade to Pro for unlimited access to all features.
          {feature && (
            <> <span className="font-medium text-purple-600">
              Unlock unlimited {feature.toLowerCase()} and more!
            </span></>
          )}
        </p>
      </div>

      {/* Billing Toggle */}
      <div className="flex justify-center mb-8">
        <div className="flex items-center space-x-4 bg-gray-100 rounded-full p-1">
          <button
            onClick={() => setIsAnnual(false)}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
              !isAnnual 
                ? 'bg-white text-gray-900 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setIsAnnual(true)}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all relative ${
              isAnnual 
                ? 'bg-white text-gray-900 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Annual
            <Badge className="absolute -top-2 -right-2 bg-green-500 text-white text-xs">
              Save 17%
            </Badge>
          </button>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
        {/* Free Plan */}
        <Card className="border-2 border-gray-200 relative">
          <CardHeader className="text-center pb-4">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Free</h3>
            <div className="text-4xl font-bold text-gray-900 mb-2">
              $0
              <span className="text-lg text-gray-500 font-normal">/month</span>
            </div>
            <p className="text-gray-600">Perfect for trying out our tools</p>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 mb-8">
              {freeTier.features.slice(0, 6).map((feature, index) => (
                <li key={index} className="flex items-start space-x-3">
                  {feature.proOnly || feature.limit === 'none' ? (
                    <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 bg-gray-400 rounded-full" />
                    </div>
                  ) : (
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  )}
                  <div>
                    <span className="text-sm text-gray-700">{feature.description}</span>
                    {typeof feature.limit === 'number' && (
                      <span className="text-xs text-gray-500 block">
                        ({feature.limit} per month)
                      </span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
            <Button 
              variant="outline" 
              className="w-full border-2 border-gray-300 hover:border-gray-400"
              onClick={() => window.location.href = '/free-resources'}
            >
              Get Started Free
            </Button>
          </CardContent>
        </Card>

        {/* Pro Plan */}
        <Card className="border-2 border-purple-500 relative shadow-xl">
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
            <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-1">
              <Crown className="w-3 h-3 mr-1" />
              {currentTier.badge || 'Most Popular'}
            </Badge>
          </div>
          
          <CardHeader className="text-center pb-4">
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Pro {isAnnual ? 'Annual' : 'Monthly'}
            </h3>
            <div className="text-4xl font-bold text-gray-900 mb-2">
              ${isAnnual ? Math.round(yearlyTier.price / 12) : monthlyTier.price}
              <span className="text-lg text-gray-500 font-normal">/month</span>
            </div>
            {isAnnual && (
              <div className="text-sm text-green-600 font-medium">
                Save ${(monthlyTier.price * 12) - yearlyTier.price} per year
              </div>
            )}
            <p className="text-gray-600">Everything you need for professional parent communication</p>
          </CardHeader>
          
          <CardContent>
            <ul className="space-y-3 mb-8">
              {currentTier.features.slice(0, 7).map((feature, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">{feature.description}</span>
                </li>
              ))}
            </ul>
            
            <Button 
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg"
              onClick={() => handleStartTrial(currentTier.id)}
            >
              Start Free Trial
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <p className="text-xs text-center text-gray-500 mt-2">
              7-day free trial • No credit card required
            </p>
          </CardContent>
        </Card>

        {/* Enterprise Plan */}
        <Card className="border-2 border-gray-200 relative">
          <CardHeader className="text-center pb-4">
            <Badge className="mb-2 bg-blue-100 text-blue-800 border-blue-200">
              <Users className="w-3 h-3 mr-1" />
              Schools & Districts
            </Badge>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Enterprise</h3>
            <div className="text-4xl font-bold text-gray-900 mb-2">
              Custom
            </div>
            <p className="text-gray-600">For schools and districts</p>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start space-x-3">
                <Check className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-700">Everything in Pro</span>
              </li>
              <li className="flex items-start space-x-3">
                <Check className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-700">Volume discounts</span>
              </li>
              <li className="flex items-start space-x-3">
                <Check className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-700">Admin dashboard</span>
              </li>
              <li className="flex items-start space-x-3">
                <Check className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-700">Priority onboarding</span>
              </li>
              <li className="flex items-start space-x-3">
                <Check className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-700">Dedicated support</span>
              </li>
              <li className="flex items-start space-x-3">
                <Check className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-700">Custom integrations</span>
              </li>
            </ul>
            <Button 
              variant="outline"
              className="w-full border-2 border-blue-500 text-blue-600 hover:bg-blue-50"
              onClick={() => window.location.href = '/contact?type=enterprise'}
            >
              Contact Sales
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Feature Comparison */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
          Compare All Features
        </h2>
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Features</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Free</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Pro</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Enterprise</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {freeTier.features.map((feature, index) => {
                  const proFeature = currentTier.features.find(f => f.feature === feature.feature)
                  return (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{feature.feature}</td>
                      <td className="px-6 py-4 text-center text-sm">
                        {feature.limit === 'none' ? (
                          <span className="text-gray-400"> - </span>
                        ) : typeof feature.limit === 'number' ? (
                          <span className="text-gray-600">{feature.limit}</span>
                        ) : (
                          <Check className="w-4 h-4 text-green-500 mx-auto" />
                        )}
                      </td>
                      <td className="px-6 py-4 text-center text-sm">
                        {proFeature?.limit === 'unlimited' ? (
                          <div className="flex items-center justify-center">
                            <Check className="w-4 h-4 text-purple-500 mr-1" />
                            <span className="text-purple-600 font-medium">Unlimited</span>
                          </div>
                        ) : (
                          <Check className="w-4 h-4 text-purple-500 mx-auto" />
                        )}
                      </td>
                      <td className="px-6 py-4 text-center text-sm">
                        <div className="flex items-center justify-center">
                          <Check className="w-4 h-4 text-blue-500 mr-1" />
                          <span className="text-blue-600 font-medium">Unlimited</span>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Social Proof */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
          Loved by Teachers Worldwide
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <blockquote className="text-gray-700 mb-4 italic">
                  "{testimonial.quote}"
                </blockquote>
                <div className="flex items-center">
                  <span className="text-2xl mr-3">{testimonial.avatar}</span>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.author}</div>
                    <div className="text-gray-500 text-sm">{testimonial.role}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
          Frequently Asked Questions
        </h2>
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <Collapsible 
              key={index}
              open={expandedFAQ === index}
              onOpenChange={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
            >
              <CollapsibleTrigger className="flex items-center justify-between w-full p-4 text-left bg-white border border-gray-200 rounded-lg mb-2 hover:bg-gray-50">
                <span className="font-medium text-gray-900">{faq.question}</span>
                {expandedFAQ === index ? (
                  <ChevronUp className="w-5 h-5 text-gray-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                )}
              </CollapsibleTrigger>
              <CollapsibleContent className="px-4 pb-4">
                <p className="text-gray-600">{faq.answer}</p>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      </div>

      {/* Final CTA */}
      <div className="text-center bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white">
        <h2 className="text-2xl font-bold mb-4">
          Ready to Transform Your Teaching?
        </h2>
        <p className="text-xl text-purple-100 mb-6">
          Join thousands of teachers who save 10+ hours every week with Zaza Pro.
        </p>
        <Button
          size="lg"
          onClick={() => handleStartTrial(currentTier.id)}
          className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
        >
          Start Your Free Trial
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
        <p className="text-purple-200 text-sm mt-4">
          No credit card required • 7-day free trial • Cancel anytime
        </p>
      </div>
    </div>
  )
}