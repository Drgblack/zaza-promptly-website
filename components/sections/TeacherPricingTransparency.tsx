'use client'

import { Calculator, DollarSign, Clock, Users, School, Award } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const pricingTiers = [
  {
    name: 'Individual Teacher',
    price: 8,
    currency: '£',
    period: 'month',
    description: 'Perfect for teachers wanting to try AI feedback',
    features: [
      'Unlimited comment generation',
      '14-day free trial',
      'Email support',
      'Parent communication templates',
      'Report writing assistance'
    ],
    popular: false,
    audience: 'Self-funded teachers'
  },
  {
    name: 'School Essential',
    price: 6,
    currency: '£',
    period: 'teacher/month',
    description: 'Most popular for primary and secondary schools',
    features: [
      'Everything in Individual',
      'Admin dashboard',
      'Bulk user management',
      'Priority support',
      'Training sessions',
      'Custom templates'
    ],
    popular: true,
    audience: '5+ teachers'
  },
  {
    name: 'District Pro',
    price: 'Custom',
    currency: '',
    period: '',
    description: 'Tailored solutions for large education authorities',
    features: [
      'Everything in School Essential',
      'SSO integration',
      'Custom branding',
      'Dedicated support',
      'Advanced analytics',
      'API access'
    ],
    popular: false,
    audience: '100+ teachers'
  }
]

const budgetComparisons = [
  {
    scenario: 'Supply Teacher Cost',
    traditionCost: '£150/day',
    promptlyCost: '£8/month',
    savings: '£142 savings per day covered',
    icon: Users,
    description: 'One day of supply teacher costs covers 18+ months of Promptly'
  },
  {
    scenario: 'Overtime Hours',
    traditionCost: '£25/hour overtime',
    promptlyCost: '5 hours saved weekly',
    savings: '£500+ value per month',
    icon: Clock,
    description: 'Time savings worth 62x the subscription cost'
  },
  {
    scenario: 'Professional Development',
    traditionCost: '£300+ per course',
    promptlyCost: 'Built-in training',
    savings: '£292 savings',
    icon: Award,
    description: 'Ongoing AI skills development included'
  }
]

const paymentOptions = [
  {
    method: 'School Purchase Order',
    description: 'Direct billing to schools with NET30 terms',
    bestFor: 'School administrators',
    icon: School
  },
  {
    method: 'Personal Subscription',
    description: 'Monthly or annual billing to personal accounts',
    bestFor: 'Individual teachers',
    icon: Users
  },
  {
    method: 'Education Authority',
    description: 'District-wide licensing with volume discounts',
    bestFor: 'MATs and local authorities',
    icon: Calculator
  }
]

export function TeacherPricingTransparency() {
  return (
    <section className="py-20 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 dark:from-green-900/10 dark:via-blue-900/10 dark:to-purple-900/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <DollarSign className="w-4 h-4 mr-2" />
            Teacher Budget Friendly
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Transparent Pricing for Teachers
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            We understand teaching budgets. Every price is designed with teacher salaries and school funding in mind.
          </p>
        </div>

        {/* Budget Reality Check */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-8">
            The True Cost of Your Time
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {budgetComparisons.map((comparison, index) => {
              const Icon = comparison.icon
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-6 h-6 text-green-600 dark:text-green-400" />
                    </div>
                    <CardTitle className="text-lg">{comparison.scenario}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                        <div className="text-sm text-red-700 dark:text-red-300 font-medium mb-1">Traditional Cost:</div>
                        <div className="text-lg font-bold text-red-800 dark:text-red-200">{comparison.traditionCost}</div>
                      </div>
                      <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                        <div className="text-sm text-green-700 dark:text-green-300 font-medium mb-1">With Promptly:</div>
                        <div className="text-lg font-bold text-green-800 dark:text-green-200">{comparison.promptlyCost}</div>
                      </div>
                      <div className="text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 p-2 rounded">
                        {comparison.savings}
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{comparison.description}</p>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Pricing Tiers */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-8">
            Choose What Works for Your Situation
          </h3>
          <div className="grid lg:grid-cols-3 gap-8">
            {pricingTiers.map((tier, index) => (
              <Card key={index} className={`relative ${tier.popular ? 'ring-2 ring-blue-500 shadow-xl' : ''}`}>
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-600 text-white px-4 py-1 text-sm font-semibold rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-xl">{tier.name}</CardTitle>
                  <div className="text-4xl font-bold text-gray-900 dark:text-white">
                    {tier.price === 'Custom' ? (
                      'Custom'
                    ) : (
                      <>
                        <span className="text-2xl">{tier.currency}</span>
                        {tier.price}
                        <span className="text-lg font-normal text-gray-600 dark:text-gray-400">/{tier.period}</span>
                      </>
                    )}
                  </div>
                  <CardDescription className="text-base">{tier.description}</CardDescription>
                  <div className="text-sm text-blue-600 dark:text-blue-400 font-medium">{tier.audience}</div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {tier.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm">
                        <div className="w-4 h-4 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                          <div className="w-2 h-2 bg-green-600 dark:bg-green-400 rounded-full"></div>
                        </div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button 
                    asChild 
                    className={`w-full ${tier.popular ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-600 hover:bg-gray-700'}`}
                  >
                    <Link href="/waitlist">
                      {tier.price === 'Custom' ? 'Contact Sales' : 'Start Free Trial'}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Payment Options */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-8">
            Flexible Payment Options
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {paymentOptions.map((option, index) => {
              const Icon = option.icon
              return (
                <Card key={index} className="text-center">
                  <CardHeader>
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <CardTitle className="text-lg">{option.method}</CardTitle>
                    <CardDescription>{option.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                      Best for: {option.bestFor}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Money-Back Guarantee */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 text-center shadow-lg">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-6">
            <Award className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Risk-Free for Teachers
          </h3>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
            We understand teachers work within tight budgets. If Promptly doesn't save you significant time within the first 14 days, get a full refund - no questions asked.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-green-600 hover:bg-green-700">
              <Link href="/waitlist">Start Your Free Trial</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/pricing">See Full Pricing Details</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}