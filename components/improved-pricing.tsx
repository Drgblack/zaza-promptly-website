"use client";

import { useState } from "react";
import { useAnalytics } from "@/lib/analytics";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Zap, Crown, Loader2, AlertCircle, Calendar } from "lucide-react";
import { createCheckoutSession } from "@/lib/stripe-utils";

interface ImprovedPricingProps {
  className?: string;
}

export function ImprovedPricing({ className = "" }: ImprovedPricingProps) {
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const { trackUpgradeClick, trackTrialStart, trackButtonClick } = useAnalytics();

  const handleCheckout = async (planType: 'pro-monthly' | 'pro-yearly') => {
    setLoadingPlan(planType);
    setError(null);

    // Track upgrade attempt
    trackUpgradeClick(planType, 'pricing_page');
    trackTrialStart(planType, 'pricing_page');

    const result = await createCheckoutSession(planType);
    
    if (!result.success) {
      setError(result.error || 'Checkout failed');
    }
    
    setLoadingPlan(null);
  };

  const plans = {
    monthly: [
      {
        id: 'pro-monthly',
        name: 'Zaza Promptly Pro',
        price: '$14.99',
        originalPrice: null, // Cache refresh: 2025-08-20-v2
        description: 'Perfect for individual teachers',
        popular: true,
        savings: null,
        features: [
          'Unlimited AI-generated feedback',
          'All tone options (encouraging, constructive, formal, warm)',
          'Save and reuse custom templates',
          'Mobile-friendly interface',
          'Export to Word & PDF',
          'Priority email support',
          '7-day free trial',
          'Cancel anytime'
        ]
      }
    ],
    yearly: [
      {
        id: 'pro-yearly',
        name: 'Zaza Promptly Pro',
        price: '$149.90',
        originalPrice: '$179.88',
        description: 'Best value - save 17% annually',
        popular: true,
        savings: 'Save $30/year',
        features: [
          'Everything in Monthly plan',
          'Save 17% vs monthly billing',
          '2 months completely free',
          'Early access to new features',
          'Advanced usage analytics',
          'Bulk export capabilities',
          'Priority support + phone access',
          '30-day money-back guarantee'
        ]
      }
    ]
  };

  const currentPlans = plans[billingCycle];

  return (
    <div className={`max-w-6xl mx-auto ${className}`}>
      {/* Billing Toggle */}
      <div className="flex justify-center mb-8">
        <div className="bg-gray-100 rounded-lg p-1 flex">
          <button
            onClick={() => {
              setBillingCycle('monthly');
              trackButtonClick('Monthly Billing', 'pricing_toggle');
            }}
            className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
              billingCycle === 'monthly'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => {
              setBillingCycle('yearly');
              trackButtonClick('Yearly Billing', 'pricing_toggle');
            }}
            className={`px-6 py-2 rounded-md text-sm font-medium transition-all relative ${
              billingCycle === 'yearly'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Yearly
            <Badge className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-1.5 py-0.5">
              Save 17%
            </Badge>
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center text-red-800">
            <AlertCircle className="w-5 h-5 mr-2" />
            <span>{error}</span>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 max-w-md mx-auto">
        {currentPlans.map((plan) => (
          <Card key={plan.id} className="relative ring-2 ring-purple-500 shadow-xl">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-1">
                Most Popular
              </Badge>
            </div>

            <CardHeader className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl">{plan.name}</CardTitle>
              <CardDescription className="text-base">{plan.description}</CardDescription>
              
              <div className="py-4">
                <div className="flex items-baseline justify-center space-x-2">
                  {plan.originalPrice && (
                    <span className="text-lg text-gray-400 line-through">{plan.originalPrice}</span>
                  )}
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-600">/{billingCycle === 'monthly' ? 'month' : 'year'}</span>
                </div>
                {plan.savings && (
                  <Badge variant="secondary" className="mt-2 bg-green-100 text-green-800">
                    {plan.savings}
                  </Badge>
                )}
              </div>
            </CardHeader>

            <CardContent>
              <div className="space-y-3 mb-6">
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              <Button
                onClick={() => handleCheckout(plan.id as 'pro-monthly' | 'pro-yearly')}
                disabled={loadingPlan === plan.id}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                size="lg"
              >
                {loadingPlan === plan.id ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Starting Checkout...
                  </>
                ) : (
                  <>
                    <Zap className="w-5 h-5 mr-2" />
                    Start 7-Day Free Trial
                  </>
                )}
              </Button>

              <p className="text-xs text-gray-500 text-center mt-3">
                {billingCycle === 'yearly' ? '30-day money-back guarantee' : '7-day free trial'} • Cancel anytime • No setup fees
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Trust Indicators */}
      <div className="mt-12 text-center">
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-gray-600 text-sm">
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span>Secure payment via Stripe</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span>Used by 12,000+ teachers</span>
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