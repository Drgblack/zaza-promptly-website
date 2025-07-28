"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Sparkles, Zap, Shield } from "lucide-react"
import { Layout } from "@zaza/shared-components"

interface PricingData {
  currency: "GBP" | "USD"
  symbol: "£" | "$"
  monthly: {
    price: string
    stripeId: string
  }
  yearly: {
    price: string
    savings: string
    stripeId: string
  }
}

export default function PricingPage() {
  const handleSubscribe = () => {
    // This would redirect to Stripe Checkout for Pro plan
    console.log("Redirecting to Stripe for Pro plan")
    // window.location.href = 'https://checkout.stripe.com/pay/pro_plan'
  }

  return (
    <Layout currentProduct="Promptly">
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-pink-50 to-orange-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 pt-16 transition-colors duration-300">
        {/* Section 1 - Page Header */}
        <section className="px-4 py-16 sm:px-6 lg:px-8 relative overflow-hidden">
          {/* Enhanced Background decorative elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-violet-400/30 to-pink-400/30 dark:from-violet-600/20 dark:to-pink-600/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-pink-400/30 to-orange-400/30 dark:from-pink-600/20 dark:to-orange-600/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-purple-300/20 to-indigo-300/20 dark:from-purple-600/10 dark:to-indigo-600/10 rounded-full blur-3xl"></div>

            {/* Additional floating elements */}
            <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-cyan-400/20 to-blue-400/20 dark:from-cyan-600/15 dark:to-blue-600/15 rounded-full blur-2xl"></div>
            <div className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-br from-emerald-400/20 to-teal-400/20 dark:from-emerald-600/15 dark:to-teal-600/15 rounded-full blur-2xl"></div>
            <div className="absolute top-40 right-1/3 w-24 h-24 bg-gradient-to-br from-rose-400/25 to-pink-400/25 dark:from-rose-600/15 dark:to-pink-600/15 rounded-full blur-xl"></div>
          </div>

          <div className="mx-auto max-w-4xl text-center relative z-10">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 text-white px-6 py-3 rounded-full text-sm font-medium mb-8 shadow-lg border border-white/20 backdrop-blur-sm">
              <Sparkles className="h-4 w-4 animate-pulse" />
              Simple, Transparent Pricing
            </div>
            <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-violet-700 via-purple-600 via-pink-600 to-orange-600 dark:from-violet-400 dark:via-purple-400 dark:via-pink-400 dark:to-orange-400 bg-clip-text text-transparent sm:text-5xl lg:text-6xl drop-shadow-sm">
              Simple, honest pricing - built for teachers
            </h1>
            <p className="mt-8 text-xl text-slate-800 dark:text-slate-200 sm:text-2xl font-medium bg-gradient-to-r from-slate-700 to-slate-900 dark:from-slate-300 dark:to-slate-100 bg-clip-text text-transparent transition-colors duration-300">
              Start for free. Upgrade only if you love it.
            </p>

            {/* Additional visual enhancement */}
            <div className="mt-8 flex justify-center">
              <div className="flex items-center gap-2 text-sm text-violet-700 dark:text-violet-300 bg-violet-100/80 dark:bg-violet-900/30 backdrop-blur-sm px-4 py-2 rounded-full border border-violet-200/50 dark:border-violet-700/50 transition-colors duration-300">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="font-medium">Trusted by educators worldwide</span>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2 - Pricing Plans with Monthly/Yearly Toggle */}
        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            {/* Pricing Cards */}
            <div className="grid gap-8 lg:grid-cols-4">
              {/* Free Plan */}
              <Card className="relative border-2 border-blue-200 dark:border-blue-700 shadow-xl bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <div className="absolute -top-3 left-6">
                  <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                    <Zap className="h-3 w-3" />
                    Perfect Start
                  </div>
                </div>
                <CardHeader className="text-center pb-8 pt-8">
                  <CardTitle className="text-2xl font-bold text-slate-900 dark:text-slate-100 transition-colors duration-300">
                    Free
                  </CardTitle>
                  <CardDescription className="text-lg text-slate-600 dark:text-slate-400 transition-colors duration-300">
                    Teachers who want to try the basics
                  </CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent">
                      $0
                    </span>
                    <span className="text-slate-600 dark:text-slate-400 transition-colors duration-300">/month</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-700 dark:text-slate-300 transition-colors duration-300">
                        5 AI-generated teacher comments per month
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-700 dark:text-slate-300 transition-colors duration-300">
                        Basic curriculum alignment
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-700 dark:text-slate-300 transition-colors duration-300">
                        Save and copy comments
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-700 dark:text-slate-300 transition-colors duration-300">
                        Email support
                      </span>
                    </div>
                  </div>
                  <div className="pt-6">
                    <Button
                      variant="outline"
                      className="w-full border-2 border-slate-800 text-slate-800 hover:bg-slate-800 hover:text-white dark:border-slate-200 dark:text-slate-200 dark:hover:bg-slate-200 dark:hover:text-slate-900 transition-colors duration-300 bg-transparent"
                      size="lg"
                    >
                      Start Free
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Pro Plan */}
              <Card className="relative border-2 border-violet-300 dark:border-violet-600 shadow-2xl bg-gradient-to-br from-violet-50 via-pink-50 to-orange-50 dark:from-violet-900/20 dark:via-pink-900/20 dark:to-orange-900/20 hover:shadow-3xl transition-all duration-300 hover:scale-105">
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-gradient-to-r from-violet-500 to-pink-500 text-white px-4 py-1.5 text-xs font-medium shadow-lg">
                    ⭐ Most Popular
                  </Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <div className="bg-gradient-to-r from-orange-400 to-pink-400 text-white p-2 rounded-full">
                    <Sparkles className="h-4 w-4" />
                  </div>
                </div>
                <CardHeader className="text-center pb-8 pt-8">
                  <CardTitle className="text-2xl font-bold text-slate-900 dark:text-slate-100 transition-colors duration-300">
                    Pro
                  </CardTitle>
                  <CardDescription className="text-lg text-slate-600 dark:text-slate-400 transition-colors duration-300">
                    Busy educators who want daily help
                  </CardDescription>
                  <div className="mt-4 relative">
                    <div className="transition-all duration-300 ease-in-out">
                      <div>
                        <span className="text-4xl font-bold bg-gradient-to-r from-violet-600 to-pink-600 dark:from-violet-400 dark:to-pink-400 bg-clip-text text-transparent">
                          $14.99
                        </span>
                        <span className="text-slate-600 dark:text-slate-400 transition-colors duration-300">
                          /month
                        </span>
                      </div>
                      <div className="mt-2 text-sm text-slate-500 dark:text-slate-400">£12.99 (UK) • €13.99 (EU)</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-sm text-slate-600 dark:text-slate-400 mb-4 italic">
                    Everything in Free, plus:
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-violet-500 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-700 dark:text-slate-300 font-medium transition-colors duration-300">
                        Unlimited comment generations
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-violet-500 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-700 dark:text-slate-300 transition-colors duration-300">
                        Advanced tone memory (context-aware)
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-violet-500 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-700 dark:text-slate-300 transition-colors duration-300">
                        Custom curriculum options
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-violet-500 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-700 dark:text-slate-300 transition-colors duration-300">
                        Export to PDF, email, and school platforms
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-violet-500 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-700 dark:text-slate-300 transition-colors duration-300">
                        Priority support
                      </span>
                    </div>
                  </div>
                  <div className="pt-6">
                    <Button
                      className="w-full bg-gradient-to-r from-violet-500 via-pink-500 to-orange-500 hover:from-violet-600 hover:via-pink-600 hover:to-orange-600 text-white shadow-lg transition-colors duration-300"
                      size="lg"
                      onClick={handleSubscribe}
                    >
                      Start Pro Trial ✨
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Bundle Plan */}
              <Card className="relative border-2 border-purple-300 dark:border-purple-600 shadow-2xl bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 dark:from-purple-900/20 dark:via-indigo-900/20 dark:to-blue-900/20 hover:shadow-3xl transition-all duration-300 hover:scale-105">
                <div className="absolute -top-3 left-6">
                  <div className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                    <Sparkles className="h-3 w-3" />
                    Best Value
                  </div>
                </div>
                <CardHeader className="text-center pb-8 pt-8">
                  <CardTitle className="text-2xl font-bold text-slate-900 dark:text-slate-100 transition-colors duration-300">
                    Zaza Bundle
                  </CardTitle>
                  <CardDescription className="text-lg text-slate-600 dark:text-slate-400 transition-colors duration-300">
                    Promptly + Teach together
                  </CardDescription>
                  <div className="mt-4 relative">
                    <div className="transition-all duration-300 ease-in-out">
                      <div>
                        <span className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400 bg-clip-text text-transparent">
                          $24.99
                        </span>
                        <span className="text-slate-600 dark:text-slate-400 transition-colors duration-300">
                          /month
                        </span>
                      </div>
                      <div className="mt-2 text-sm text-slate-500 dark:text-slate-400">£21.99 (UK) • €22.99 (EU)</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-purple-500 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-700 dark:text-slate-300 font-medium transition-colors duration-300">
                        Zaza Promptly (unlimited use)
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-purple-500 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-700 dark:text-slate-300 font-medium transition-colors duration-300">
                        Zaza Teach: AI lesson planner
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-purple-500 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-700 dark:text-slate-300 font-medium transition-colors duration-300">
                        Shared tone memory across products
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-purple-500 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-700 dark:text-slate-300 transition-colors duration-300">
                        Unlimited saves
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-purple-500 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-700 dark:text-slate-300 transition-colors duration-300">
                        Priority support across both tools
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-purple-500 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-700 dark:text-slate-300 transition-colors duration-300">
                        Early access to new Zaza apps
                      </span>
                    </div>
                  </div>
                  <div className="pt-6">
                    <Button
                      className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-bold shadow-lg transition-colors duration-300 flex items-center justify-center gap-2"
                      size="lg"
                    >
                      <Sparkles className="h-4 w-4" />
                      Get the Bundle
                      <Zap className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Schools & Districts Plan */}
              <Card className="relative border-2 border-indigo-200 dark:border-indigo-700 shadow-xl bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <div className="absolute -top-3 left-6">
                  <div className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                    <Shield className="h-3 w-3" />
                    For Schools
                  </div>
                </div>
                <CardHeader className="text-center pb-8 pt-8">
                  <CardTitle className="text-2xl font-bold text-slate-900 dark:text-slate-100 transition-colors duration-300">
                    Schools & Districts
                  </CardTitle>
                  <CardDescription className="text-lg text-slate-600 dark:text-slate-400 transition-colors duration-300">
                    Flexible, volume-based pricing
                  </CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 dark:from-indigo-400 dark:to-blue-400 bg-clip-text text-transparent">
                      Custom Pricing
                    </span>
                    <div className="mt-2 text-sm text-slate-500 dark:text-slate-400">Empower every teacher</div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-indigo-500 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-700 dark:text-slate-300 transition-colors duration-300">
                        Site licenses or per-seat pricing
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-indigo-500 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-700 dark:text-slate-300 transition-colors duration-300">
                        Admin dashboard for usage tracking
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-indigo-500 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-700 dark:text-slate-300 transition-colors duration-300">
                        Custom onboarding + curriculum alignment
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-indigo-500 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-700 dark:text-slate-300 transition-colors duration-300">
                        Dedicated support and SLAs
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-indigo-500 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-700 dark:text-slate-300 transition-colors duration-300">
                        Data privacy & compliance ready
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-indigo-500 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-700 dark:text-slate-300 transition-colors duration-300">
                        Early access to Zaza Coach & Inbox
                      </span>
                    </div>
                  </div>
                  <div className="pt-6">
                    <Button
                      className="w-full bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 text-white font-medium shadow-lg transition-colors duration-300 flex items-center justify-center gap-2"
                      size="lg"
                    >
                      <Shield className="h-4 w-4" />
                      Contact Sales
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Section 4 - Social Proof Block */}
        <section className="px-4 py-16 sm:px-6 lg:px-8 bg-gradient-to-r from-indigo-100 via-purple-50 to-pink-100 dark:from-indigo-900/20 dark:via-purple-900/20 dark:to-pink-900/20 relative overflow-hidden transition-colors duration-300">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-pink-500/5 dark:from-indigo-400/10 dark:via-purple-400/10 dark:to-pink-400/10"></div>
          <div className="mx-auto max-w-4xl text-center relative z-10">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Shield className="h-4 w-4" />
              Teacher-Approved
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent sm:text-4xl">
              Built with real teacher feedback
            </h2>
            <p className="mt-6 text-lg text-slate-700 dark:text-slate-300 leading-relaxed transition-colors duration-300">
              Everything in Zaza Promptly was designed around the real, everyday struggles of report season. We listen,
              we iterate, and we put teachers first.
            </p>
          </div>
        </section>

        {/* Section 4 - CTA */}
        <section className="px-4 py-16 sm:px-6 lg:px-8 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-emerald-900/20 dark:via-teal-900/20 dark:to-cyan-900/20 relative overflow-hidden transition-colors duration-300">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-emerald-400/20 to-teal-400/20 dark:from-emerald-600/15 dark:to-teal-600/15 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-br from-teal-400/20 to-cyan-400/20 dark:from-teal-600/15 dark:to-cyan-600/15 rounded-full blur-3xl"></div>
          </div>
          <div className="mx-auto max-w-2xl text-center relative z-10">
            <p className="text-xl text-slate-700 dark:text-slate-300 mb-8 transition-colors duration-300">
              Start for free - no risk, no setup, just time saved.
            </p>
            <Button
              size="lg"
              className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-600 hover:via-teal-600 hover:to-cyan-600 text-white text-lg px-8 py-3 shadow-lg transition-colors duration-300"
            >
              Try it Free 🚀
            </Button>
          </div>
        </section>
      </div>
    </Layout>
  )
}
