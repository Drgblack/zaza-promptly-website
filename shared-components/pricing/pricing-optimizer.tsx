import React from 'react'
import { Check, Star, Zap, Clock, Users, Shield, ArrowRight, DollarSign, TrendingUp, Award } from 'lucide-react'
import { cn } from '../lib/utils'

/**
 * Zaza Pricing & Trial Optimizer
 * 
 * Comprehensive pricing component with transparent pricing, ROI calculators,
 * risk-free trials, and conversion optimization features.
 */

interface PricingPlan {
  id: string
  name: string
  description: string
  price: {
    monthly: number
    yearly: number
    savings: number
  }
  features: string[]
  limitations: string[]
  popular?: boolean
  recommended?: boolean
  trialDays: number
  maxUsers?: number
  maxStorage?: string
  support: 'email' | 'chat' | 'phone' | 'priority'
  integrations: string[]
  customFeatures?: string[]
}

interface EnterprisePlan {
  id: string
  name: string
  description: string
  features: string[]
  benefits: string[]
  contactInfo: string
  customPricing: boolean
}

const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'starter',
    name: 'Starter',
    description: 'Perfect for individual teachers getting started with AI tools',
    price: {
      monthly: 19,
      yearly: 190,
      savings: 38,
    },
    features: [
      'AI-powered lesson planning (up to 50 lessons/month)',
      'Student feedback generation (up to 200 comments/month)',
      'Basic assessment rubrics',
      'Email support',
      'Mobile app access',
      'Basic templates library',
    ],
    limitations: [
      'Limited to 1 teacher account',
      'No advanced analytics',
      'No priority support',
    ],
    trialDays: 14,
    maxUsers: 1,
    maxStorage: '5GB',
    support: 'email',
    integrations: ['Google Workspace', 'Microsoft 365'],
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'Ideal for active teachers who want to maximize their productivity',
    price: {
      monthly: 39,
      yearly: 390,
      savings: 78,
    },
    features: [
      'Unlimited AI lesson planning',
      'Unlimited student feedback generation',
      'Advanced assessment tools & rubrics',
      'Parent communication templates',
      'Priority chat support',
      'Advanced analytics dashboard',
      'Custom template creation',
      'Integration with LMS platforms',
      'Export to PDF/Word',
    ],
    limitations: [
      'Limited to 1 teacher account',
      'No team collaboration features',
    ],
    popular: true,
    recommended: true,
    trialDays: 14,
    maxUsers: 1,
    maxStorage: '25GB',
    support: 'chat',
    integrations: ['Google Workspace', 'Microsoft 365', 'Canvas', 'Blackboard', 'Schoology'],
  },
  {
    id: 'team',
    name: 'Team',
    description: 'Perfect for departments and small schools working together',
    price: {
      monthly: 99,
      yearly: 990,
      savings: 198,
    },
    features: [
      'Everything in Professional',
      'Up to 5 teacher accounts',
      'Shared resource library',
      'Team collaboration tools',
      'Department-wide analytics',
      'Priority phone support',
      'Custom branding',
      'Advanced reporting',
      'API access',
      'White-label options',
    ],
    limitations: [
      'Maximum 5 teacher accounts',
      'No district-wide features',
    ],
    trialDays: 14,
    maxUsers: 5,
    maxStorage: '100GB',
    support: 'phone',
    integrations: ['Google Workspace', 'Microsoft 365', 'Canvas', 'Blackboard', 'Schoology', 'Custom LMS'],
  },
]

const ENTERPRISE_PLAN: EnterprisePlan = {
  id: 'enterprise',
  name: 'Enterprise',
  description: 'District-wide implementation with custom features and dedicated support',
  features: [
    'Unlimited teacher accounts',
    'District-wide analytics & reporting',
    'Custom AI model training',
    'Dedicated success manager',
    '24/7 priority support',
    'Custom integrations',
    'Advanced security & compliance',
    'Professional development training',
    'Custom feature development',
    'On-premise deployment options',
  ],
  benefits: [
    'Average 85% time savings per teacher',
    '40% increase in parent engagement',
    '25% improvement in student feedback quality',
    '95% teacher satisfaction rate',
    'ROI of 300%+ within first year',
  ],
  contactInfo: 'enterprise@zaza.com',
  customPricing: true,
}

const COMPARISON_FEATURES = [
  'AI Lesson Planning',
  'Student Feedback Generation',
  'Assessment Tools',
  'Parent Communication',
  'Analytics Dashboard',
  'Priority Support',
  'Team Collaboration',
  'Custom Branding',
  'API Access',
  'White-label Options',
]

const TRUST_SIGNALS = [
  {
    icon: Shield,
    title: '30-Day Money-Back Guarantee',
    description: 'Not satisfied? Get a full refund, no questions asked.',
    color: 'green',
  },
  {
    icon: Clock,
    title: '14-Day Free Trial',
    description: 'Try all features risk-free with no credit card required.',
    color: 'blue',
  },
  {
    icon: Users,
    title: '50,000+ Teachers Trust Us',
    description: 'Join educators nationwide who have transformed their practice.',
    color: 'purple',
  },
  {
    icon: Award,
    title: 'EdTech Breakthrough Award',
    description: 'Recognized as the best AI solution for education.',
    color: 'orange',
  },
]

export function PricingOptimizer() {
  const [billingCycle, setBillingCycle] = React.useState<'monthly' | 'yearly'>('yearly')
  const [selectedPlan, setSelectedPlan] = React.useState<string | null>(null)
  const [showComparison, setShowComparison] = React.useState(false)

  const getFeatureValue = (plan: PricingPlan, feature: string): boolean | string => {
    const featureMap: Record<string, boolean | string> = {
      'AI Lesson Planning': plan.id === 'starter' ? '50/month' : 'Unlimited',
      'Student Feedback Generation': plan.id === 'starter' ? '200/month' : 'Unlimited',
      'Assessment Tools': plan.features.some(f => f.includes('assessment')),
      'Parent Communication': plan.features.some(f => f.includes('parent')),
      'Analytics Dashboard': plan.features.some(f => f.includes('analytics')),
      'Priority Support': plan.support !== 'email',
      'Team Collaboration': plan.id === 'team' || plan.id === 'enterprise',
      'Custom Branding': plan.id === 'team' || plan.id === 'enterprise',
      'API Access': plan.id === 'team' || plan.id === 'enterprise',
      'White-label Options': plan.id === 'team' || plan.id === 'enterprise',
    }
    return featureMap[feature] || false
  }

  const calculateROI = (plan: PricingPlan) => {
    const annualCost = billingCycle === 'yearly' ? plan.price.yearly : plan.price.monthly * 12
    const timeSaved = plan.id === 'starter' ? 8 : plan.id === 'professional' ? 12 : 15 // hours per month
    const hourlyRate = 45 // average teacher hourly rate
    const annualSavings = timeSaved * hourlyRate * 12
    const roi = ((annualSavings - annualCost) / annualCost) * 100
    return Math.round(roi)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Choose the plan that fits your needs. All plans include a 14-day free trial 
              and 30-day money-back guarantee.
            </p>
            
            {/* Billing Toggle */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <span className="text-lg">Monthly</span>
              <button
                onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
                className={cn(
                  "relative inline-flex h-8 w-16 items-center rounded-full transition-colors",
                  billingCycle === 'yearly' ? "bg-blue-500" : "bg-gray-300"
                )}
              >
                <span
                  className={cn(
                    "inline-block h-6 w-6 transform rounded-full bg-white transition-transform",
                    billingCycle === 'yearly' ? "translate-x-9" : "translate-x-1"
                  )}
                />
              </button>
              <span className="text-lg">Yearly</span>
              <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                Save {PRICING_PLANS[0].price.savings}%
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {TRUST_SIGNALS.map((signal, index) => {
              const IconComponent = signal.icon
              return (
                <div key={index} className="text-center">
                  <div className={cn(
                    "w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4",
                    signal.color === 'green' && "bg-green-100",
                    signal.color === 'blue' && "bg-blue-100",
                    signal.color === 'purple' && "bg-purple-100",
                    signal.color === 'orange' && "bg-orange-100",
                  )}>
                    <IconComponent className={cn(
                      "w-8 h-8",
                      signal.color === 'green' && "text-green-600",
                      signal.color === 'blue' && "text-blue-600",
                      signal.color === 'purple' && "text-purple-600",
                      signal.color === 'orange' && "text-orange-600",
                    )} />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{signal.title}</h3>
                  <p className="text-sm text-gray-600">{signal.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PRICING_PLANS.map(plan => (
              <PricingCard
                key={plan.id}
                plan={plan}
                billingCycle={billingCycle}
                isSelected={selectedPlan === plan.id}
                onSelect={() => setSelectedPlan(plan.id)}
                roi={calculateROI(plan)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Enterprise Plan */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Enterprise Solutions
              </h2>
              <p className="text-xl text-gray-600">
                Custom solutions for districts and large organizations
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Features</h3>
                <ul className="space-y-3">
                  {ENTERPRISE_PLAN.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Benefits</h3>
                <ul className="space-y-3">
                  {ENTERPRISE_PLAN.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <TrendingUp className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 p-6 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Contact Sales</h4>
                  <p className="text-gray-600 mb-4">
                    Get custom pricing and dedicated support for your organization.
                  </p>
                  <button className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                    Contact Enterprise Sales
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Comparison */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Compare Plans
            </h2>
            <p className="text-xl text-gray-600">
              See exactly what's included in each plan
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Feature</th>
                  {PRICING_PLANS.map(plan => (
                    <th key={plan.id} className="text-center py-4 px-6 font-semibold text-gray-900">
                      {plan.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARISON_FEATURES.map(feature => (
                  <tr key={feature} className="border-b">
                    <td className="py-4 px-6 font-medium text-gray-900">{feature}</td>
                    {PRICING_PLANS.map(plan => {
                      const value = getFeatureValue(plan, feature)
                      return (
                        <td key={plan.id} className="text-center py-4 px-6">
                          {typeof value === 'boolean' ? (
                            value ? (
                              <Check className="w-5 h-5 text-green-500 mx-auto" />
                            ) : (
                              <span className="text-gray-400">—</span>
                            )
                          ) : (
                            <span className="text-sm font-medium text-gray-700">{value}</span>
                          )}
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Can I cancel my subscription anytime?
              </h3>
              <p className="text-gray-600">
                Yes, you can cancel your subscription at any time. You'll continue to have access until the end of your billing period.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                What's included in the free trial?
              </h3>
              <p className="text-gray-600">
                The 14-day free trial includes all features of the Professional plan, so you can experience the full power of our AI tools.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Do you offer discounts for schools and districts?
              </h3>
              <p className="text-gray-600">
                Yes, we offer special pricing for educational institutions. Contact our sales team for custom quotes and volume discounts.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Is my data secure and private?
              </h3>
              <p className="text-gray-600">
                Absolutely. We use enterprise-grade security and are SOC 2 Type II certified. Your data is encrypted and never shared with third parties.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Teaching?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Start your free trial today and see why 50,000+ teachers choose Zaza.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Start Free Trial
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
              Watch Demo
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

interface PricingCardProps {
  plan: PricingPlan
  billingCycle: 'monthly' | 'yearly'
  isSelected: boolean
  onSelect: () => void
  roi: number
}

function PricingCard({ plan, billingCycle, isSelected, onSelect, roi }: PricingCardProps) {
  const price = billingCycle === 'monthly' ? plan.price.monthly : plan.price.yearly
  const savings = billingCycle === 'yearly' ? plan.price.savings : 0

  return (
    <div className={cn(
      "bg-white rounded-2xl shadow-lg p-8 relative",
      plan.popular && "ring-2 ring-blue-500 ring-opacity-50",
      isSelected && "ring-2 ring-green-500"
    )}>
      {plan.popular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <span className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
            Most Popular
          </span>
        </div>
      )}

      {plan.recommended && (
        <div className="absolute -top-4 right-4">
          <span className="bg-green-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
            Recommended
          </span>
        </div>
      )}

      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
        <p className="text-gray-600 mb-6">{plan.description}</p>

        <div className="mb-4">
          <div className="flex items-baseline justify-center gap-2">
            <span className="text-4xl font-bold text-gray-900">${price}</span>
            <span className="text-gray-600">
              /{billingCycle === 'monthly' ? 'month' : 'year'}
            </span>
          </div>
          {savings > 0 && (
            <div className="text-green-600 font-semibold mt-2">
              Save ${savings} per year
            </div>
          )}
        </div>

        {/* ROI Calculator */}
        <div className="bg-green-50 p-4 rounded-lg mb-6">
          <div className="text-2xl font-bold text-green-600">{roi}%</div>
          <div className="text-sm text-green-700">Annual ROI</div>
        </div>

        <button
          onClick={onSelect}
          className={cn(
            "w-full py-3 px-6 rounded-lg font-semibold transition-colors",
            isSelected
              ? "bg-green-600 text-white hover:bg-green-700"
              : "bg-blue-600 text-white hover:bg-blue-700"
          )}
        >
          {isSelected ? 'Selected' : `Start ${plan.trialDays}-Day Free Trial`}
        </button>
      </div>

      <div className="space-y-4">
        <h4 className="font-semibold text-gray-900">What's included:</h4>
        <ul className="space-y-3">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-start gap-3">
              <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700 text-sm">{feature}</span>
            </li>
          ))}
        </ul>

        {plan.limitations.length > 0 && (
          <div className="mt-6">
            <h4 className="font-semibold text-gray-900 mb-3">Limitations:</h4>
            <ul className="space-y-2">
              {plan.limitations.map((limitation, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                  <span className="text-gray-600 text-sm">{limitation}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
} 