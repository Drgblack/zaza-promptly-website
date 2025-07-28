"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight, Sparkles } from "lucide-react"

export function Waitlist() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubmitted(true)
      // Here you would typically send the email to your backend
      console.log("Email submitted:", email)
    }
  }

  return (
    <section
      id="waitlist"
      className="py-20 px-4 bg-gradient-to-br from-violet/5 via-mint/10 to-accent-pink/5 relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-20 h-20 bg-violet/10 rounded-full animate-pulse-soft"></div>
        <div
          className="absolute bottom-20 right-20 w-32 h-32 bg-mint/10 rounded-full animate-pulse-soft"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/4 w-16 h-16 bg-accent-pink/10 rounded-full animate-pulse-soft"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="container mx-auto text-center relative z-10">
        <div className="max-w-2xl mx-auto">
          <Sparkles className="w-12 h-12 text-violet mx-auto mb-6 animate-float" />

          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">Be First to Master with ClarityDeck</h2>

          <p className="text-lg text-navy/70 mb-8">Early access. Special rewards. Join the first wave.</p>

          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto mb-8">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-6 py-4 text-lg rounded-full border-2 border-gray-200 focus:border-violet focus:ring-0"
                required
              />
              <Button
                type="submit"
                size="lg"
                className="bg-violet hover:bg-violet/90 text-white px-8 py-4 text-lg rounded-full transition-all duration-200 hover:scale-105 flex items-center justify-center gap-2"
              >
                Join Now
                <ArrowRight className="w-5 h-5" />
              </Button>
            </form>
          ) : (
            <div className="bg-mint/20 border border-mint rounded-2xl p-6 max-w-md mx-auto mb-8">
              <h3 className="text-xl font-bold text-navy mb-2">{"🎉 You're in!"}</h3>
              <p className="text-navy/70">{"We'll notify you when ClarityDeck is ready for early access."}</p>
            </div>
          )}

          {/* Animated pointing element */}
          <div className="flex justify-center mb-8">
            <div className="animate-float">
              <span className="text-2xl">👆</span>
            </div>
          </div>

          <p className="text-navy/60 text-sm">Made with 💙 by teachers, for teachers.</p>
        </div>
      </div>
    </section>
  )
}
