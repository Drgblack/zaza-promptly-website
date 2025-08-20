"use client"

import Link from 'next/link'
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useAnalytics } from "@/hooks/useAnalytics"
import { AnimatedWords } from "@/components/animated-words"

export function HeroSection() {
  const { trackEvent } = useAnalytics()

  const handleCTAClick = (label: string) => {
    trackEvent('button_click', { button_text: label, section: 'hero' })
  }

  return (
    <div className="py-20 sm:py-28 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Main Headline with Animation */}
        <header>
          <h1>
            <AnimatedWords 
              text="You know your students better than anyone."
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight"
              highlightWords={["students", "better"]}
            />
          </h1>

          {/* Subheading with delayed animation */}
          <motion.p
            className="mt-6 text-lg sm:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed"
            role="doc-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2, ease: "easeOut" }}
          >
            Join 12,000+ teachers who've reclaimed their evenings with hallucination-safe AI designed by a PhD educator. Get professional parent communication and report comments in minutes, not hours.
          </motion.p>
        </header>

        {/* CTA Buttons */}
        <motion.div
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center"
          role="group"
          aria-label="Call to action buttons"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.8, ease: "easeOut" }}
        >
          <Button
            size="lg"
            onClick={() => {
              handleCTAClick('hero_try')
              const demoSection = document.getElementById('demo-section')
              if (demoSection) {
                demoSection.scrollIntoView({ behavior: 'smooth' })
              }
            }}
            className="w-full sm:w-auto min-h-[44px] bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold px-8 py-4 text-base sm:text-lg rounded-full shadow-2xl transform hover:scale-105 transition-all duration-200 touch-manipulation focus:outline-none focus:ring-4 focus:ring-amber-500/50"
            aria-label="Try Promptly free demo"
          >
            Save Hours This Week
          </Button>
          <Link href="/free-resources">
            <Button
              size="lg"
              variant="outline"
              onClick={() => handleCTAClick('hero_examples')}
              className="w-full sm:w-auto min-h-[44px] border-2 border-white text-white hover:bg-white hover:text-blue-900 font-semibold px-8 py-4 text-base sm:text-lg rounded-full bg-transparent touch-manipulation focus:outline-none focus:ring-4 focus:ring-white/50"
              aria-label="See examples of AI-generated teacher comments"
            >
              See Teacher Examples
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
