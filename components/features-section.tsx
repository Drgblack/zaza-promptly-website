"use client"

import { useEffect, useRef, useState } from "react"
import { Target, MessageCircle, Save, Shield, Zap, Palette } from "lucide-react"

const features = [
  {
    emoji: "🎯",
    icon: Target,
    title: "AI That Understands Teaching",
    description: "Advanced machine learning trained on educational content and teacher feedback patterns",
    size: "large",
    delay: 0,
  },
  {
    emoji: "🗣️",
    icon: MessageCircle,
    title: "Natural Language AI",
    description: "AI-powered tone customization: encouraging, constructive, formal, warm - all in your voice",
    size: "medium",
    delay: 200,
  },
  {
    emoji: "💾",
    icon: Save,
    title: "AI Learning Library",
    description: "Machine learning remembers your style and builds a personalized comment library",
    size: "medium",
    delay: 400,
  },
  {
    emoji: "🔒",
    icon: Shield,
    title: "AI-Powered Security",
    description: "FERPA-compliant AI with no hallucinations, no data concerns, just reliable results",
    size: "large",
    delay: 600,
  },
  {
    emoji: "⚡",
    icon: Zap,
    title: "Instant AI Adaptation",
    description: "Artificial intelligence that adapts to any student, any subject, any situation instantly",
    size: "medium",
    delay: 800,
  },
  {
    emoji: "🎨",
    icon: Palette,
    title: "AI Personalization",
    description: "Machine learning ensures every AI-generated comment feels handwritten and personal",
    size: "large",
    delay: 1000,
  },
]

export function FeaturesSection() {
  const [visibleCards, setVisibleCards] = useState<boolean[]>(new Array(features.length).fill(false))
  const [titleVisible, setTitleVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === titleRef.current) {
              setTitleVisible(true)
            }

            if (entry.target === sectionRef.current) {
              // Animate feature cards with staggered delays
              features.forEach((_, index) => {
                setTimeout(() => {
                  setVisibleCards((prev) => {
                    const newVisible = [...prev]
                    newVisible[index] = true
                    return newVisible
                  })
                }, features[index].delay)
              })
            }
          }
        })
      },
      { threshold: 0.2 },
    )

    if (titleRef.current) observer.observe(titleRef.current)
    if (sectionRef.current) observer.observe(sectionRef.current)

    return () => observer.disconnect()
  }, [])

  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50">
        {/* Flowing gradient overlays */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-purple-200/30 to-pink-200/30 rounded-full blur-3xl animate-float-gentle" />
          <div className="absolute top-60 right-20 w-80 h-80 bg-gradient-to-r from-pink-200/40 to-rose-200/40 rounded-full blur-3xl animate-float-gentle-delayed" />
          <div className="absolute bottom-40 left-1/4 w-72 h-72 bg-gradient-to-r from-rose-200/35 to-purple-200/35 rounded-full blur-3xl animate-float-gentle-slow" />
        </div>

        {/* Subtle texture */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(139,69,19,0.03)_1px,transparent_0)] bg-[length:24px_24px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div
          ref={titleRef}
          className={`text-center mb-20 transition-all duration-1000 ${
            titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-800 mb-6 leading-tight">
            AI Features That Feel Like{" "}
            <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-rose-500 bg-clip-text text-transparent">
              Teaching Superpowers
            </span>
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-purple-400 via-pink-400 to-rose-400 mx-auto rounded-full" />
          <p className="text-xl text-gray-600 mt-6 max-w-3xl mx-auto">
            Advanced artificial intelligence and machine learning designed specifically for educators. 
            Every AI feature built to make your teaching life easier, more joyful, and more impactful.
          </p>
        </div>

        {/* Features Grid - Organic Layout */}
        <div ref={sectionRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon
            return (
              <div
                key={index}
                className={`group relative transition-all duration-700 ${
                  visibleCards[index] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                } ${
                  feature.size === "large"
                    ? "md:col-span-2 lg:col-span-2"
                    : feature.size === "medium"
                      ? "md:col-span-1 lg:col-span-1"
                      : "md:col-span-1 lg:col-span-1"
                }`}
                style={{
                  transitionDelay: `${feature.delay}ms`,
                }}
              >
                {/* Card */}
                <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 lg:p-10 shadow-xl border border-white/60 hover:shadow-2xl hover:scale-105 transition-all duration-500 hover:bg-white/90 overflow-hidden h-full">
                  {/* Animated background glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-100/50 via-pink-100/30 to-rose-100/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />

                  {/* Content */}
                  <div className="relative z-10 h-full flex flex-col">
                    {/* Icon Section */}
                    <div className="flex items-center space-x-4 mb-6">
                      {/* Emoji */}
                      <div className="text-4xl lg:text-5xl group-hover:animate-gentle-bounce">{feature.emoji}</div>

                      {/* Lucide Icon with gradient background */}
                      <div className="w-12 h-12 lg:w-14 lg:h-14 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <IconComponent className="w-6 h-6 lg:w-7 lg:h-7 text-white" />
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-4 leading-tight">{feature.title}</h3>

                    {/* Description */}
                    <p className="text-lg lg:text-xl text-gray-600 leading-relaxed flex-grow">{feature.description}</p>

                    {/* Decorative elements */}
                    <div className="flex justify-between items-end mt-6">
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="w-2 h-2 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="w-2 h-2 bg-gradient-to-r from-rose-400 to-purple-400 rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                      <div className="text-sm text-gray-400 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        Learn More →
                      </div>
                    </div>
                  </div>

                  {/* Corner sparkles */}
                  <div className="absolute top-4 right-4 w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-opacity duration-300" />
                  <div
                    className="absolute bottom-4 left-4 w-2 h-2 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-opacity duration-300"
                    style={{ animationDelay: "0.5s" }}
                  />
                </div>

                {/* Floating sparkle effects */}
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-r from-purple-300 to-pink-300 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-opacity duration-300" />
                <div
                  className="absolute -bottom-2 -left-2 w-3 h-3 bg-gradient-to-r from-pink-300 to-rose-300 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-opacity duration-300"
                  style={{ animationDelay: "0.3s" }}
                />
              </div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-20">
          <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 rounded-3xl p-1 max-w-3xl mx-auto">
            <div className="bg-white rounded-3xl p-8 lg:p-12">
              <h3 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
                Ready to Unlock Your Teaching Superpowers?
              </h3>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Join thousands of teachers who've transformed their feedback process and reclaimed their time
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold px-10 py-5 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200 text-lg">
                  Start Your Free Trial
                </button>
                <button className="border-2 border-purple-500 text-purple-600 hover:bg-purple-50 font-semibold px-10 py-5 rounded-full transition-all duration-200 text-lg bg-transparent">
                  See All Features
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
