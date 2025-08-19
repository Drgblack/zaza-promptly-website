"use client"

import { useEffect } from "react"
import Link from 'next/link'
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useAnalytics } from "@/hooks/useAnalytics"

export function HeroSection() {
  const { trackEvent } = useAnalytics()

  useEffect(() => {
    // Check for prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReducedMotion) {
      // Disable animations by setting duration to 0
      document.documentElement.style.setProperty('--animation-duration', '0s')
    }
  }, [])

  const handleCTAClick = (label: string) => {
    trackEvent('button_click', { button_text: label, section: 'hero' })
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Static Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-amber-500">
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
        <div className="text-center">
          {/* Main Headline with Animation */}
          <header className="text-center">
            <motion.h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight"
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: { staggerChildren: 0.15 }
                }
              }}
            >
              {/* Animated headline: "You know your students better than anyone." */}
              <div className="mb-2">
                {["You", "know", "your", "students", "better", "than", "anyone."].map((word, i) => (
                  <motion.span
                    key={`word-${i}`}
                    className={`inline-block mr-3 ${["students", "better"].includes(word) ? "bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent" : ""}`}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 }
                    }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  >
                    {word}
                  </motion.span>
                ))}
              </div>
            </motion.h1>

            {/* Subheading with staggered animation */}
            <motion.p
              className="text-lg sm:text-xl md:text-2xl text-blue-100 mb-12 max-w-4xl mx-auto leading-relaxed px-4"
              role="doc-subtitle"
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: { staggerChildren: 0.1, delayChildren: 1 }
                }
              }}
            >
              {["Let's", "put", "that", "into", "words", "-", "faster,", "kinder,", "and", "consistent."].map((word, i) => (
                <motion.span
                  key={`sub-${i}`}
                  className="inline-block mr-2"
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  {word}
                </motion.span>
              ))}
            </motion.p>
          </header>

          {/* CTA Buttons */}
          <div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            role="group"
            aria-label="Call to action buttons"
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
              Try Promptly Free
            </Button>
            <Link href="/examples">
              <Button
                size="lg"
                variant="outline"
                onClick={() => handleCTAClick('hero_examples')}
                className="w-full sm:w-auto min-h-[44px] border-2 border-white text-white hover:bg-white hover:text-blue-900 font-semibold px-8 py-4 text-base sm:text-lg rounded-full bg-transparent touch-manipulation focus:outline-none focus:ring-4 focus:ring-white/50"
                aria-label="See examples of AI-generated teacher comments"
              >
                See Examples
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Static accent elements */}
      <div className="absolute top-1/4 left-10 w-20 h-20 bg-white/5 rounded-full" />
      <div className="absolute top-1/3 right-20 w-16 h-16 bg-amber-400/10 rounded-full" />
      <div className="absolute bottom-1/4 left-1/4 w-12 h-12 bg-purple-400/10 rounded-full" />
    </div>
  )
}
