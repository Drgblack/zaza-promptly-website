"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Star, Zap, Target } from "lucide-react"

const rotatingTexts = [
  "No more Sunday night report card panic...",
  "No more staring at blank comment boxes...",
  "No more choosing between quality and time...",
  "AI-powered feedback that sounds like you...",
  "Machine learning that understands teaching...",
  "Artificial intelligence built for educators...",
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
              The{" "}
              <span className="bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent">
                AI Teaching Assistant
              </span>
              <br />
              That Actually Gets You
            </h1>

            <p
              className="text-lg sm:text-xl md:text-2xl text-blue-100 mb-8 max-w-4xl mx-auto leading-relaxed px-4"
              role="doc-subtitle"
            >
              Advanced artificial intelligence that writes meaningful student feedback in minutes, not hours. 
              Built by teachers, for teachers - with machine learning that understands your classroom.
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
              className="w-full sm:w-auto min-h-[44px] bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold px-8 py-4 text-base sm:text-lg rounded-full shadow-2xl transform hover:scale-105 transition-all duration-200 touch-manipulation focus:outline-none focus:ring-4 focus:ring-amber-500/50"
              aria-label="Start free trial to save your weekends"
            >
              Try AI-Powered Comments Free
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto min-h-[44px] border-2 border-white text-white hover:bg-white hover:text-blue-900 font-semibold px-8 py-4 text-base sm:text-lg rounded-full bg-transparent touch-manipulation focus:outline-none focus:ring-4 focus:ring-white/50"
              aria-label="Watch demonstration video"
            >
              See AI in Action
            </Button>
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
