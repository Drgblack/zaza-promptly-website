"use client"

import { BrevoForm } from "@/components/brevo-form"
import { Mail, Sparkles } from "lucide-react"

export function EmailSignupSection() {
  return (
    <section className="relative py-20 lg:py-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.1),transparent_50%)]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Section Title */}
          <div className="flex items-center justify-center mb-6">
            <Mail className="w-8 h-8 text-amber-300 mr-3" />
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
              Get{" "}
              <span className="bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent">
                AI Teaching Tips
              </span>{" "}
              Delivered
            </h2>
            <Sparkles className="w-8 h-8 text-amber-300 ml-3" />
          </div>
          
          <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto leading-relaxed">
            Join thousands of teachers getting weekly AI-powered insights, teaching strategies, and exclusive access to new features.
          </p>

          {/* Brevo Email Signup Form */}
          <div className="max-w-md mx-auto">
            <BrevoForm
              title="Join 5,000+ Teachers"
              description="Get weekly AI tools and time-saving strategies"
              buttonText="Get Free AI Tips"
              placeholder="Your email address"
              className="bg-white/10 backdrop-blur-sm border-white/20"
            />
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-blue-100 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span>No spam, ever</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span>Unsubscribe anytime</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span>AI insights only</span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-1/4 left-10 w-16 h-16 bg-white/5 rounded-full animate-float-slow" />
      <div className="absolute top-1/3 right-20 w-12 h-12 bg-amber-400/10 rounded-full animate-float-medium" />
      <div className="absolute bottom-1/4 left-1/4 w-20 h-20 bg-purple-400/10 rounded-full animate-float-fast" />
    </section>
  )
}