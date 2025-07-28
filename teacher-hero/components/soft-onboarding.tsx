"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { X } from "lucide-react"
import { useEffect, useState } from "react"
import type { SoftOnboardingProps } from "@/types/onboarding"

export default function SoftOnboarding({ isVisible, onDismiss, onSignUp, className = "" }: SoftOnboardingProps) {
  const [shouldRender, setShouldRender] = useState(false)
  const [animationClass, setAnimationClass] = useState("opacity-0 translate-y-4")

  useEffect(() => {
    if (isVisible) {
      setShouldRender(true)
      // Trigger animation after component mounts
      setTimeout(() => {
        setAnimationClass("opacity-100 translate-y-0")
      }, 50)
    } else {
      // Start exit animation
      setAnimationClass("opacity-0 translate-y-4")
      // Remove from DOM after animation completes
      setTimeout(() => {
        setShouldRender(false)
      }, 300)
    }
  }, [isVisible])

  const handleDismiss = () => {
    // Save dismissal to localStorage
    localStorage.setItem("zaza-onboarding-dismissed", "true")
    onDismiss()
  }

  const handleSignUp = () => {
    // Save signup interaction to localStorage
    localStorage.setItem("zaza-onboarding-clicked", "true")
    onSignUp()
  }

  if (!shouldRender) return null

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm ${className}`}>
      <div className="mx-4 max-w-2xl w-full">
        <Card
          className={`relative overflow-hidden bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl shadow-2xl transition-all duration-300 ease-out transform ${animationClass}`}
          style={{
            animation: isVisible ? "gentle-float 3s ease-in-out infinite" : "none",
          }}
        >
          {/* Dismiss Button */}
          <Button
            onClick={handleDismiss}
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4 h-8 w-8 text-gray-500 hover:text-gray-700 hover:bg-white/50"
          >
            <X className="h-4 w-4" />
          </Button>

          <CardContent className="p-8">
            <div className="text-center space-y-6">
              {/* Headline */}
              <h3 className="text-2xl font-bold text-gray-900 leading-tight">
                Want to save your favourites and get personalised tools?
              </h3>

              {/* Subtext */}
              <p className="text-lg text-gray-600">
                Create your free Zaza account in 30 seconds — no credit card needed.
              </p>

              {/* Benefits List */}
              <div className="space-y-3">
                <div className="flex items-center justify-center gap-3 text-gray-700">
                  <span className="text-xl">📚</span>
                  <span className="font-medium">Save resources to your library</span>
                </div>
                <div className="flex items-center justify-center gap-3 text-gray-700">
                  <span className="text-xl">🎯</span>
                  <span className="font-medium">Get personalised recommendations</span>
                </div>
                <div className="flex items-center justify-center gap-3 text-gray-700">
                  <span className="text-xl">⚡</span>
                  <span className="font-medium">Access enhanced tools</span>
                </div>
              </div>

              {/* CTA Button */}
              <div className="space-y-3">
                <Button
                  onClick={handleSignUp}
                  size="lg"
                  className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  Create Free Account
                </Button>

                {/* Small Text */}
                <p className="text-sm text-gray-500">Always free for teachers</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <style jsx>{`
        @keyframes gentle-float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-4px);
          }
        }
      `}</style>
    </div>
  )
}
