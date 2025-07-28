"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ExternalLink } from "lucide-react"

export function ClarityChallenge() {
  const [tiktokLink, setTiktokLink] = useState("")
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)

  const scrollToWaitlist = () => {
    document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (tiktokLink && email) {
      setIsSubmitted(true)
      setShowConfetti(true)
      console.log("Challenge entry submitted:", { tiktokLink, email })

      // Hide confetti after animation
      setTimeout(() => {
        setShowConfetti(false)
      }, 3000)
    }
  }

  return (
    <section
      id="claritychallenge"
      className="py-24 px-4 bg-gradient-to-br from-[#E8F5E8] via-[#F0E8FF] to-[#E8F0FF] relative overflow-hidden"
    >
      {/* Floating background shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-16 left-12 w-8 h-8 text-2xl animate-float opacity-60">📚</div>
        <div
          className="absolute top-32 right-20 w-8 h-8 text-2xl animate-float opacity-60"
          style={{ animationDelay: "1s" }}
        >
          ✨
        </div>
        <div
          className="absolute bottom-40 left-1/4 w-8 h-8 text-2xl animate-float opacity-60"
          style={{ animationDelay: "2s" }}
        >
          🧠
        </div>
        <div
          className="absolute top-1/2 right-1/3 w-8 h-8 text-2xl animate-float opacity-60"
          style={{ animationDelay: "3s" }}
        >
          💡
        </div>
        <div
          className="absolute bottom-20 right-16 w-8 h-8 text-2xl animate-float opacity-60"
          style={{ animationDelay: "1.5s" }}
        >
          🎯
        </div>
        <div
          className="absolute top-20 left-1/2 w-8 h-8 text-2xl animate-float opacity-60"
          style={{ animationDelay: "2.5s" }}
        >
          📝
        </div>
      </div>

      {/* Confetti Animation */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-primary-cta rounded-full animate-ping"
                style={{
                  left: `${Math.random() * 200 - 100}px`,
                  top: `${Math.random() * 200 - 100}px`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: "1s",
                }}
              />
            ))}
          </div>
        </div>
      )}

      <div className="container mx-auto text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Title */}
          <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
            <span className="bg-gradient-to-r from-primary-cta to-accent-pink bg-clip-text text-transparent">
              #ClarityChallenge
            </span>{" "}
            - Win Early Access
          </h2>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-text-secondary mb-12 max-w-3xl mx-auto leading-relaxed">
            Show how you ditch chaos and study smarter. Share your routine on TikTok and win free access + exclusive
            merch.
          </p>

          {/* Instructions Block */}
          <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 mb-12 border border-white/50 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center space-y-3">
                <div className="text-3xl mb-2">1️⃣</div>
                <p className="text-sm text-text-primary font-medium">
                  Record a TikTok showing your real (or chaotic) study routine
                </p>
              </div>
              <div className="text-center space-y-3">
                <div className="text-3xl mb-2">2️⃣</div>
                <p className="text-sm text-text-primary font-medium">
                  Cut to your 'clarity' moment (flashcards, mind map, etc.)
                </p>
              </div>
              <div className="text-center space-y-3">
                <div className="text-3xl mb-2">3️⃣</div>
                <p className="text-sm text-text-primary font-medium">
                  Tag <strong>@ClarityDeck</strong> and use <strong>#ClarityChallenge</strong>
                </p>
              </div>
              <div className="text-center space-y-3">
                <div className="text-3xl mb-2">4️⃣</div>
                <p className="text-sm text-text-primary font-medium">Submit your video below 👇</p>
              </div>
            </div>
          </div>

          {/* Entry Form */}
          {!isSubmitted ? (
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 mb-8 border border-white/50 shadow-lg max-w-2xl mx-auto">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <Input
                    type="url"
                    placeholder="Paste your TikTok link here"
                    value={tiktokLink}
                    onChange={(e) => setTiktokLink(e.target.value)}
                    className="w-full px-6 py-4 text-lg rounded-full border-2 border-gray-200 focus:border-primary-cta focus:ring-0 bg-white"
                    required
                  />
                  <Input
                    type="email"
                    placeholder="Your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-6 py-4 text-lg rounded-full border-2 border-gray-200 focus:border-primary-cta focus:ring-0 bg-white"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  size="lg"
                  className="bg-gradient-to-r from-primary-cta to-accent-pink hover:from-primary-cta/90 hover:to-accent-pink/90 text-white px-10 py-4 text-lg font-semibold rounded-full transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  Submit My Entry ✨
                </Button>
              </form>
            </div>
          ) : (
            <div className="bg-vivid-mint/20 border border-vivid-mint/30 rounded-3xl p-8 max-w-2xl mx-auto mb-8 backdrop-blur-sm">
              <div className="text-4xl mb-4">🎉</div>
              <h3 className="text-xl font-bold text-text-primary mb-2">✅ {"You're in!"}</h3>
              <p className="text-text-secondary">Check your inbox for next steps.</p>
            </div>
          )}

          {/* View Entries Button */}
          <div className="mb-8">
            <Button
              asChild
              variant="outline"
              className="bg-white/60 hover:bg-white/80 text-text-primary border-2 border-primary-cta/30 hover:border-primary-cta px-6 py-3 rounded-full transition-all duration-200 hover:scale-105"
            >
              <a href="https://www.tiktok.com/tag/claritychallenge" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4 mr-2" />
                View TikToks
              </a>
            </Button>
          </div>

          {/* Waitlist Prompt */}
          <div className="bg-white/40 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
            <p className="text-text-secondary mb-4">Still not on the list?</p>
            <Button
              onClick={scrollToWaitlist}
              className="bg-primary-cta hover:bg-primary-cta/90 text-white px-6 py-2 rounded-full transition-all duration-200 hover:scale-105"
            >
              👉 Join the Waitlist
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
