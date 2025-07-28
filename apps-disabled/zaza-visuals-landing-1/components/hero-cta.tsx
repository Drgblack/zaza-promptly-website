"use client"

import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"

export function HeroCTA() {
  const scrollToSignup = () => {
    document.getElementById("email-signup")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="bg-gradient-to-br from-orange-500 via-pink-500 to-purple-600 py-16 px-4">
      <div className="max-w-4xl mx-auto text-center text-white">
        <div className="flex items-center justify-center gap-2 mb-6">
          <Sparkles className="w-8 h-8 text-yellow-300" />
          <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold">
            New for 2025
          </span>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          The AI Visual Generator
          <br />
          <span className="text-yellow-300">Built for Classrooms</span>
        </h1>

        <p className="text-xl md:text-2xl mb-8 text-orange-100 max-w-3xl mx-auto leading-relaxed">
          Instantly create curriculum-aligned images and explainer videos — inclusive, shareable, and ready to teach
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            onClick={scrollToSignup}
            size="lg"
            className="bg-white text-orange-600 hover:bg-gray-100 px-12 py-4 rounded-2xl text-xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
          >
            Try Free
          </Button>
          <p className="text-sm text-orange-200">✨ No credit card required • 5 free images to start</p>
        </div>
      </div>
    </section>
  )
}
