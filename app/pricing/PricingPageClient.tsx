'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { CheckCircle, Zap, Crown, Users, Loader2, AlertCircle } from 'lucide-react';
import { useAnalytics } from '@/hooks/useAnalytics';

interface Plan {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  popular?: boolean;
  comingSoon?: boolean;
  geoNote?: string;
  features: string[];
  icon: any;
  ctaText: string;
  targetAudience: string;
}

export function PricingPageClient() {
  const [isYearly, setIsYearly] = useState(false);
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { trackPricingInterest, trackCheckoutClick } = useAnalytics();

  // Track pricing page visit
  React.useEffect(() => {
    trackPricingInterest('pricing_page_visit', 'hero');
  }, [trackPricingInterest]);

  const plans: Plan[] = [
    {
      id: 'free',
      name: 'Free Demo',
      description: 'Perfect for trying out Zaza Promptly',
      monthlyPrice: 0,
      yearlyPrice: 0,
      features: [
        '3 AI-generated comments per day',
        'Basic tone options (Professional, Encouraging)',
        'Essential templates',
        'Email support',
        'All core features for testing'
      ],
      icon: Zap,
      ctaText: 'Start Free Demo',
      targetAudience: 'Teachers wanting to try AI assistance'
    },
    {
      id: 'teacher',
      name: 'Teacher Plan',
      description: 'Complete AI assistant for individual teachers',
      monthlyPrice: 14.99,
      yearlyPrice: 149.9, // 2 months free (12 * 14.99 = 179.88, so 149.90 saves ~17%)
      popular: true,
      geoNote: '(geo-pricing may vary—contact us for your region)',
      features: [
        'Unlimited AI-generated content',
        'All tone options (6 different styles)',
        '50+ professional templates',
        'Multi-language support (EN, FR, DE, ES, IT)',
        'Export to PDF & Word',
        'Priority email support',
        'Mobile-friendly interface',
        'GDPR compliant & secure'
      ],
      icon: Crown,
      ctaText: 'Start 7-Day Free Trial',
      targetAudience: 'Individual teachers & homeschool educators'
    },
    {
      id: 'school',
      name: 'School License',
      description: 'Comprehensive solution for schools & districts',
      monthlyPrice: 299,
      yearlyPrice: 2990, // Bulk pricing
      comingSoon: true,
      features: [
        'Everything in Teacher Plan',
        'Unlimited teacher accounts',
        'Admin dashboard & analytics',
        'Bulk user management',
        'Custom templates & branding',
        'Phone support & training',
        'SSO integration options',
        'Volume discount pricing',
        'Dedicated account manager'
      ],
      icon: Users,
      ctaText: 'Contact Sales',
      targetAudience: 'Schools, districts, and education organizations'
    }
  ];

  const handlePlanSelection = async (plan: Plan) => {
    // Track pricing interest
    trackPricingInterest(plan.id, 'pricing_cards');

    if (plan.id === 'free') {
      // Redirect to demo
      window.location.href = '/?utm_source=pricing&utm_medium=free_plan&utm_campaign=pricing_conversion';
      return;
    }

    if (plan.comingSoon) {
      // Redirect to contact form or waitlist
      window.location.href = '/contact?subject=school-license&utm_source=pricing&utm_medium=school_plan&utm_campaign=enterprise_interest';
      return;
    }

    // Handle checkout for Teacher Plan
    if (plan.id === 'teacher') {
      setLoadingPlan(plan.id);
      setError(null);

      try {
        const planType = isYearly ? 'pro-yearly' : 'pro-monthly';
        
        // Track checkout click
        trackCheckoutClick(planType, isYearly ? 'yearly' : 'monthly');

        const response = await fetch('/api/stripe-checkout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            plan: planType,
            successUrl: `${window.location.origin}/checkout/success?utm_source=pricing&utm_medium=${isYearly ? 'yearly' : 'monthly'}&utm_campaign=subscription`,
            cancelUrl: `${window.location.origin}/pricing?checkout=cancelled`,
            utm_source: 'pricing_page',
            utm_medium: 'teacher_plan',
            utm_campaign: 'subscription_checkout'
          }),
        });

        const data = await response.json();

        if (response.ok && data.url) {
          // Redirect to Stripe Checkout
          window.location.href = data.url;
        } else {
          setError(data.error || 'Unable to start checkout. Please try again.');
        }
      } catch (err) {
        setError('Network error. Please check your connection and try again.');
      } finally {
        setLoadingPlan(null);
      }
    }
  };

  const getPrice = (plan: Plan) => {
    if (plan.monthlyPrice === 0) return 'Free';
    
    const price = isYearly ? plan.yearlyPrice / 12 : plan.monthlyPrice;
    return plan.id === 'teacher' ? `Starting at $${price.toFixed(2)}` : `$${price.toFixed(2)}`;
  };

  const getSavings = (plan: Plan) => {
    if (plan.monthlyPrice === 0 || !isYearly) return null;
    
    const monthlyCost = plan.monthlyPrice * 12;
    const yearlyCost = plan.yearlyPrice;
    const savings = Math.round(((monthlyCost - yearlyCost) / monthlyCost) * 100);
    
    return `Save ${savings}%`;
  };

  return (
    <div className="space-y-8">
      {/* Billing Toggle */}
      <div className="text-center">
        <div className="inline-flex items-center space-x-4 bg-gray-100 rounded-lg p-1">
          <span className={`px-4 py-2 text-sm font-medium ${!isYearly ? 'text-purple-600' : 'text-gray-500'}`}>
            Monthly
          </span>
          <Switch
            checked={isYearly}
            onCheckedChange={(checked) => {
              setIsYearly(checked);
              trackPricingInterest('billing_toggle', checked ? 'yearly' : 'monthly');
            }}
            className="data-[state=checked]:bg-purple-600"
          />
          <span className={`px-4 py-2 text-sm font-medium ${isYearly ? 'text-purple-600' : 'text-gray-500'}`}>
            Yearly
            <Badge variant="secondary" className="ml-2 bg-green-100 text-green-700 text-xs">
              Save 17%
            </Badge>
          </span>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="max-w-4xl mx-auto mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center text-red-800">
            <AlertCircle className="w-5 h-5 mr-2" />
            <span>{error}</span>
          </div>
        </div>
      )}

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {plans.map((plan) => {
          const IconComponent = plan.icon;
          const savings = getSavings(plan);
          
          return (
            <Card 
              key={plan.id} 
              className={`relative transition-all duration-200 hover:shadow-lg ${
                plan.popular 
                  ? 'ring-2 ring-purple-500 shadow-lg transform scale-105' 
                  : plan.comingSoon 
                    ? 'opacity-75' 
                    : 'hover:shadow-md'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-1">
                    Most Popular
                  </Badge>
                </div>
              )}

              {plan.comingSoon && (
                <div className="absolute -top-3 right-4">
                  <Badge variant="outline" className="bg-white border-gray-300 text-gray-600">
                    Coming Soon
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center pb-4">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                  plan.id === 'free' 
                    ? 'bg-gradient-to-br from-blue-500 to-cyan-500' 
                    : plan.id === 'teacher'
                      ? 'bg-gradient-to-br from-purple-500 to-pink-500'
                      : 'bg-gradient-to-br from-green-500 to-teal-500'
                }`}>
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                
                <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                <CardDescription className="text-base text-gray-600 mb-4">
                  {plan.description}
                </CardDescription>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-center">
                    <span className="text-4xl font-bold text-gray-900">
                      {getPrice(plan)}
                    </span>
                    {plan.monthlyPrice > 0 && (
                      <span className="text-gray-600 ml-2">
                        /{isYearly ? 'month' : 'month'}
                      </span>
                    )}
                  </div>
                  
                  {savings && (
                    <div className="text-sm text-green-600 font-medium">
                      {savings} vs monthly billing
                    </div>
                  )}
                  
                  {isYearly && plan.monthlyPrice > 0 && (
                    <div className="text-xs text-gray-500">
                      Billed ${plan.yearlyPrice} annually
                    </div>
                  )}
                  
                  {plan.geoNote && plan.id === 'teacher' && (
                    <div className="text-xs text-gray-500 mt-1">
                      {plan.geoNote}
                    </div>
                  )}
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="space-y-3 mb-8">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button
                  onClick={() => handlePlanSelection(plan)}
                  disabled={loadingPlan === plan.id}
                  className={`w-full ${
                    plan.popular
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'
                      : plan.comingSoon
                        ? 'bg-gray-400 hover:bg-gray-500'
                        : 'bg-gray-900 hover:bg-gray-800'
                  }`}
                  size="lg"
                >
                  {loadingPlan === plan.id ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Starting Checkout...
                    </>
                  ) : (
                    <>
                      <IconComponent className="w-5 h-5 mr-2" />
                      {plan.ctaText}
                    </>
                  )}
                </Button>

                <div className="mt-4 text-center">
                  <p className="text-xs text-gray-500">
                    {plan.id === 'teacher' && !plan.comingSoon ? (
                      '7-day free trial • Cancel anytime • 30-day guarantee'
                    ) : plan.id === 'free' ? (
                      'No credit card required • Upgrade anytime'
                    ) : (
                      'Custom pricing • Dedicated support • Volume discounts'
                    )}
                  </p>
                </div>

                <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-600 text-center">
                    <strong>Perfect for:</strong> {plan.targetAudience}
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Feature Comparison Note */}
      <div className="text-center mt-12 max-w-4xl mx-auto">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-semibold text-blue-900 mb-2">
            All plans include our core AI features
          </h3>
          <p className="text-blue-700 text-sm">
            Professional parent communications, student feedback generation, multiple languages, 
            GDPR compliance, and secure data handling. The main differences are usage limits, 
            advanced features, and support levels.
          </p>
        </div>
      </div>

      {/* Money Back Guarantee */}
      <div className="text-center mt-8">
        <div className="inline-flex items-center space-x-8 text-gray-600 text-sm">
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span>Secure payment via Stripe</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span>30-day money-back guarantee</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span>Cancel anytime</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Add React import for useEffect
import React from 'react';