"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function EmailCapture() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubmitted(true)
      console.log("Email submitted:", email)
    }
  }

  return (
    <section
      id="waitlist"
      className="py-24 px-4 bg-gradient-to-br from-primary-cta/5 via-vivid-mint/5 to-accent-pink/5 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-32 h-32 bg-primary-cta/10 rounded-full animate-pulse-soft blur-xl"></div>
        <div
          className="absolute bottom-20 right-20 w-40 h-40 bg-vivid-mint/10 rounded-full animate-pulse-soft blur-xl"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      <div className="container mx-auto text-center relative z-10">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">
            Be first in line for{" "}
            <span className="bg-gradient-to-r from-primary-cta to-vivid-mint bg-clip-text text-transparent">
              clarity.
            </span>
          </h2>

          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-6 py-4 text-lg rounded-full border-2 border-gray-200 focus:border-primary-cta focus:ring-0 bg-white/80 backdrop-blur-sm"
                  required
                />
                <Button
                  type="submit"
                  size="lg"
                  className="bg-primary-cta hover:bg-primary-cta/90 text-white px-8 py-4 text-lg rounded-full transition-all duration-200 hover:scale-105 shadow-soft-glow"
                >
                  Join the Waitlist
                </Button>
              </div>
              <p className="text-text-secondary text-sm">No spam. Just smarter study.</p>
            </form>
          ) : (
            <div className="bg-vivid-mint/20 border border-vivid-mint/30 rounded-3xl p-8 max-w-md mx-auto backdrop-blur-sm">
              <div className="text-4xl mb-4">🎉</div>
              <h3 className="text-xl font-bold text-text-primary mb-2">{"You're in!"}</h3>
              <p className="text-text-secondary">{"We'll notify you when ClarityDeck is ready for early access."}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
