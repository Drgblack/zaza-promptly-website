"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { X, Zap } from "lucide-react"

export function StickyCTA() {
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky CTA after scrolling past hero section
      const scrollPosition = window.scrollY
      const windowHeight = window.innerHeight

      if (scrollPosition > windowHeight * 0.5 && !isDismissed) {
        setIsVisible(true)
      } else if (scrollPosition <= windowHeight * 0.3) {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [isDismissed])

  const handleDismiss = () => {
    setIsDismissed(true)
    setIsVisible(false)
  }

  if (!isVisible || isDismissed) return null

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 md:hidden">
      <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl shadow-2xl border border-orange-400/20 p-4">
        <div className="flex items-center justify-between">
          <div className="flex-1 mr-3">
            <p className="text-white font-semibold text-sm mb-1">Ready to save hours?</p>
            <p className="text-orange-100 text-xs">Start your free trial now</p>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              asChild
              className="bg-white hover:bg-gray-100 text-orange-600 font-semibold px-4 py-2 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 touch-manipulation min-h-[44px]"
            >
              <a href="/signup" className="flex items-center space-x-2">
                <Zap className="w-4 h-4" />
                <span className="text-sm">Try Free</span>
              </a>
            </Button>

            <button
              onClick={handleDismiss}
              className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors duration-200 touch-manipulation"
              aria-label="Dismiss"
            >
              <X className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
