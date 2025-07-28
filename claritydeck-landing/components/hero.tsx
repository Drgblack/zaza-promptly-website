"use client"

import { Button } from "@/components/ui/button"

export function Hero() {
  const scrollToWaitlist = () => {
    document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="pt-24 pb-20 px-4 bg-hero-gradient relative overflow-hidden min-h-[90vh] flex items-center">
      {/* Animated background shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-40 h-40 bg-vivid-mint/20 rounded-full animate-blob blur-xl"></div>
        <div
          className="absolute top-40 right-20 w-32 h-32 bg-accent-pink/25 rounded-full animate-float blur-lg"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-32 left-1/4 w-48 h-48 bg-primary-cta/15 rounded-full animate-blob blur-2xl"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/3 right-1/3 w-36 h-36 bg-vivid-mint/15 rounded-full animate-float blur-xl"
          style={{ animationDelay: "3s" }}
        ></div>
        <div
          className="absolute bottom-20 right-10 w-44 h-44 bg-accent-pink/20 rounded-full animate-blob blur-xl"
          style={{ animationDelay: "1.5s" }}
        ></div>
      </div>

      <div className="container mx-auto text-center relative z-10">
        <div className="max-w-4xl mx-auto animate-slide-up">
          {/* Primary Heading */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-text-primary mb-6 leading-tight">
            Goodbye cramming.{" "}
            <span className="bg-gradient-to-r from-primary-cta via-accent-pink to-vivid-mint bg-clip-text text-transparent">
              Hello clarity.
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-text-secondary mb-12 max-w-3xl mx-auto leading-relaxed font-medium">
            ClarityDeck turns your notes into mastery-level quizzes, maps, and flashcards - in seconds.
          </p>

          {/* CTA Button */}
          <Button
            onClick={scrollToWaitlist}
            size="lg"
            className="bg-primary-cta hover:bg-primary-cta/90 text-white px-12 py-6 text-xl font-semibold rounded-full transition-all duration-300 hover:scale-105 shadow-soft-glow hover:shadow-xl border-0 animate-pulse-soft"
          >
            Join the Waitlist ✨
          </Button>
        </div>
      </div>
    </section>
  )
}
