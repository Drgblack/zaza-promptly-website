"use client"

import { useState, useEffect } from "react"
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { EmailCaptureForm } from "@/components/EmailCaptureForm"
import { Star, Zap, Target } from "lucide-react"

const rotatingTexts = [
  "Your teaching wisdom deserves the right words...",
  "Write with confidence, every single time...",
  "From your heart to perfect comments...",
  "The more we work together, the better it gets...",
  "You bring the expertise, we bring the words...",
  "Never lose your voice in the writing...",
]

export function HeroSection() {
  const [currentTextIndex, setCurrentTextIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % rotatingTexts.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Static Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-amber-500">
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
        <div className="text-center">
          {/* Main Headline */}
          <header className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              You know your{" "}
              <span className="bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent">
                students better
              </span>
              <br />
              than anyone.
              <br />
              <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
                Let's put that into words.
              </span>
            </h1>

            <p
              className="text-lg sm:text-xl md:text-2xl text-blue-100 mb-8 max-w-4xl mx-auto leading-relaxed px-4"
              role="doc-subtitle"
            >
              Zaza Promptly learns your voice, remembers your style, and helps you write with the confidence you already have. 
              Because your insights matter—they just need the right words.
            </p>
          </header>

          {/* Rotating Text */}
          <div className="h-16 flex items-center justify-center mb-12">
            <p className="text-lg sm:text-xl text-amber-200 italic animate-fade-in-out">
              {rotatingTexts[currentTextIndex]}
            </p>
          </div>

          {/* CTA Buttons */}
          <div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
            role="group"
            aria-label="Call to action buttons"
          >
            <Button
              size="lg"
              onClick={() => {
                const demoSection = document.getElementById('demo-section');
                if (demoSection) {
                  demoSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="w-full sm:w-auto min-h-[44px] bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold px-8 py-4 text-base sm:text-lg rounded-full shadow-2xl transform hover:scale-105 transition-all duration-200 touch-manipulation focus:outline-none focus:ring-4 focus:ring-amber-500/50"
              aria-label="Scroll to demo section to try AI-powered comments"
            >
              Reclaim Your Evenings
            </Button>
            <Link href="/free-resources">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto min-h-[44px] border-2 border-white text-white hover:bg-white hover:text-blue-900 font-semibold px-8 py-4 text-base sm:text-lg rounded-full bg-transparent touch-manipulation focus:outline-none focus:ring-4 focus:ring-white/50"
                aria-label="Watch demonstration video"
              >
                See AI in Action
              </Button>
            </Link>
          </div>

          {/* Quick Email Signup */}
          <div className="max-w-lg mx-auto mb-16">
            <div className="text-center mb-4">
              <p className="text-blue-100 text-sm">
                Or get instant access to free AI teaching resources:
              </p>
            </div>
            <EmailCaptureForm
              title=""
              subtitle=""
              placeholder="Enter your email for instant access"
              buttonText="Feel Confident Again"
              source="hero_section"
              tags={['hero_signup', 'instant_access', 'lead_magnet']}
              className="bg-white/10 backdrop-blur-sm border-white/20"
              size="md"
              variant="hero"
            />
          </div>

          {/* Trust Badges */}
          <section
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto px-4"
            aria-label="Trust indicators"
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-1 min-h-[80px] flex flex-col justify-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Star className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 fill-current" aria-hidden="true" />
                <span className="text-white font-bold text-base sm:text-lg">4.9/5</span>
              </div>
              <p className="text-blue-100 text-sm text-center">by 50K+ Teachers</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-1 min-h-[80px] flex flex-col justify-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" />
                <span className="text-white font-bold text-base sm:text-lg">3 Hours</span>
              </div>
              <p className="text-blue-100 text-sm text-center">Saved Per Week</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-1 min-h-[80px] flex flex-col justify-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Target className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" />
                <span className="text-white font-bold text-base sm:text-lg">95%</span>
              </div>
              <p className="text-blue-100 text-sm text-center">AI Accuracy</p>
            </div>
          </section>
        </div>
      </div>

      {/* Static accent elements */}
      <div className="absolute top-1/4 left-10 w-20 h-20 bg-white/5 rounded-full" />
      <div className="absolute top-1/3 right-20 w-16 h-16 bg-amber-400/10 rounded-full" />
      <div className="absolute bottom-1/4 left-1/4 w-12 h-12 bg-purple-400/10 rounded-full" />
    </div>
  )
}
