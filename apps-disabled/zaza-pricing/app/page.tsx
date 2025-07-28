// SEO meta tags injected by automation
"use client"

import Head from "next/head";
import { BRAND_NAME, DEFAULT_DESCRIPTION, DEFAULT_OG_IMAGE, BASE_URL } from "@zaza/shared-components/lib/seo";
import { useState } from "react"
import { Check, Star, Users, Mail, Sparkles, BookOpen, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState("monthly")

  const freeFeatures = [
    "5 AI-generated teacher comments per month",
    "Basic curriculum alignment",
    "Save and copy comments",
    "Email support",
  ]

  const proFeatures = [
    "Unlimited comment generations",
    "Advanced tone memory (context-aware phrasing)",
    "Custom curriculum options",
    "Export to PDF, email, and school platforms",
    "Priority support",
  ]

  const bundleFeatures = [
    "Zaza Promptly (unlimited use)",
    "Zaza Teach: full-featured AI lesson planner",
    "Shared tone memory across products",
    "Unlimited saves",
    "Priority support across both tools",
    "Early access to new Zaza apps",
  ]

  const schoolsFeatures = [
    "Site licenses or per-seat pricing",
    "Admin dashboard for usage tracking",
    "Custom onboarding + curriculum alignment",
    "Dedicated support and SLAs",
    "Data privacy & compliance ready",
    "Early access to Zaza Coach & Inbox",
  ]

  return (
    <>
      <Head>
        <title>Zaza Pricing | {BRAND_NAME}</title>
        <meta name="description" content="Explore pricing for Zaza's suite of AI-powered education tools. {DEFAULT_DESCRIPTION}" />
        <meta property="og:title" content="Zaza Pricing | {BRAND_NAME}" />
        <meta property="og:description" content="Explore pricing for Zaza's suite of AI-powered education tools. {DEFAULT_DESCRIPTION}" />
        <meta property="og:image" content={DEFAULT_OG_IMAGE} />
        <meta property="og:url" content={`${BASE_URL}/zaza-pricing`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Zaza Pricing | {BRAND_NAME}" />
        <meta name="twitter:description" content="Explore pricing for Zaza's suite of AI-powered education tools. {DEFAULT_DESCRIPTION}" />
        <meta name="twitter:image" content={DEFAULT_OG_IMAGE} />
      </Head>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
        {/* Header */}
        <div className="container mx-auto px-4 py-16 text-center">
          <Badge className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-full text-sm font-medium mb-8 hover:from-purple-700 hover:to-pink-700">
            <Sparkles className="w-4 h-4" />
            Simple, Transparent Pricing
          </Badge>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent">
            Simple, honest pricing - built for teachers
          </h1>

          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">Start for free. Upgrade only if you love it.</p>

          <div className="inline-flex items-center gap-2 text-purple-600 font-medium">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            Trusted by educators worldwide
          </div>
        </div>

        {/* Billing Toggle */}
        <div className="container mx-auto px-4 mb-12">
          <div className="flex justify-center">
            <div className="bg-white rounded-full p-2 shadow-lg">
              <div className="flex">
                <button
                  onClick={() => setBillingCycle("yearly")}
                  className={`px-6 py-2 rounded-full font-medium transition-all ${
                    billingCycle === "yearly" ? "bg-gray-100 text-gray-900" : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Yearly
                </button>
                <button
                  onClick={() => setBillingCycle("monthly")}
                  className={`px-6 py-2 rounded-full font-medium transition-all ${
                    billingCycle === "monthly"
                      ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Monthly
                </button>
              </div>
            </div>
          </div>
          {billingCycle === "yearly" && <p className="text-center text-purple-600 font-medium mt-3">Save 2 months</p>}
        </div>

        {/* Pricing Cards */}
        <div className="container mx-auto px-4 pb-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {/* Free Plan */}
            <Card className="rounded-3xl p-2 shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-blue-200">
              <CardHeader className="text-center pb-0">
                <Badge
                  variant="secondary"
                  className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-4 mx-auto"
                >
                  <Zap className="w-4 h-4" />
                  Perfect Start
                </Badge>
                <h3 className="text-2xl font-bold mb-2">Free</h3>
                <p className="text-gray-600 mb-4">Perfect for trying out Zaza Promptly</p>
                <div className="text-4xl font-bold text-blue-600 mb-2">Free</div>
                <p className="text-sm text-gray-500">No tricks. Really free.</p>
              </CardHeader>

              <CardContent className="space-y-4 mt-8">
                {freeFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </CardContent>

              <CardFooter>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-6">Start Free</Button>
              </CardFooter>
            </Card>

            {/* Pro Plan */}
            <Card className="rounded-3xl p-2 shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-purple-200 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full text-sm font-medium flex items-center gap-2">
                  <Star className="w-4 h-4" />
                  Most Popular
                </Badge>
              </div>

              <CardHeader className="text-center pb-0 pt-4">
                <h3 className="text-2xl font-bold mb-2">Pro</h3>
                <p className="text-gray-600 mb-4">For teachers who want unlimited access</p>
                <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                  $14.99
                </div>
                <p className="text-sm text-gray-500">/month</p>
              </CardHeader>

              <CardContent className="space-y-4 mt-8">
                {proFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </CardContent>

              <CardFooter>
                <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium py-6">
                  Start Pro Trial
                </Button>
              </CardFooter>
            </Card>

            {/* Bundle Plan */}
            <Card className="rounded-3xl p-2 shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-orange-200">
              <CardHeader className="text-center pb-0">
                <Badge
                  variant="secondary"
                  className="inline-flex items-center gap-2 bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-medium mb-4 mx-auto"
                >
                  <BookOpen className="w-4 h-4" />
                  Best Value
                </Badge>
                <h3 className="text-2xl font-bold mb-2">Zaza Bundle</h3>
                <p className="text-gray-600 mb-4">Promptly + Teach</p>
                <div className="text-4xl font-bold text-orange-600 mb-2">$24.99</div>
                <p className="text-sm text-gray-500">/month</p>
              </CardHeader>

              <CardContent className="space-y-4 mt-8">
                {bundleFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </CardContent>

              <CardFooter>
                <Button className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-medium py-6 flex items-center justify-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  Get the Bundle
                </Button>
              </CardFooter>
            </Card>

            {/* Schools Plan */}
            <Card className="rounded-3xl p-2 shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-indigo-200">
              <CardHeader className="text-center pb-0">
                <Badge
                  variant="secondary"
                  className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full text-sm font-medium mb-4 mx-auto"
                >
                  <Users className="w-4 h-4" />
                  For Schools
                </Badge>
                <h3 className="text-2xl font-bold mb-2">Schools & Districts</h3>
                <p className="text-gray-600 mb-4">Flexible, volume-based pricing</p>
                <div className="text-2xl font-bold text-indigo-600 mb-2">Custom Pricing</div>
                <p className="text-sm text-gray-500">Empower every teacher</p>
              </CardHeader>

              <CardContent className="space-y-4 mt-8">
                {schoolsFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </CardContent>

              <CardFooter>
                <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-6 flex items-center justify-center gap-2">
                  <Mail className="w-4 h-4" />
                  Contact Sales
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>

        {/* Teacher Feedback Section */}
        <div className="bg-gradient-to-r from-purple-100 to-pink-100 py-16">
          <div className="container mx-auto px-4 text-center">
            <Badge className="inline-flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-full text-sm font-medium mb-8 hover:bg-purple-700">
              <Check className="w-4 h-4" />
              Teacher-Approved
            </Badge>

            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Built with real teacher feedback
            </h2>

            <p className="text-lg md:text-xl text-gray-700 mb-12 max-w-4xl mx-auto">
              Everything in Zaza Promptly was designed around the real, everyday struggles of report season. We listen, we
              iterate, and we put teachers first.
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-green-400 to-blue-500 py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Start for free - no risk, no setup, just time saved.
            </h2>

            <Button
              size="lg"
              className="bg-white text-green-600 font-bold py-6 px-8 rounded-xl text-lg hover:bg-gray-50 transition-colors shadow-lg flex items-center gap-3 mx-auto"
            >
              <Sparkles className="w-5 h-5" />
              Try it Free
            </Button>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-900 text-white py-8">
          <div className="container mx-auto px-4 text-center">
            <p className="text-gray-400">
              Questions? Email us at{" "}
              <a href="mailto:schools@zazateach.com" className="text-purple-400 hover:text-purple-300">
                schools@zazateach.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
