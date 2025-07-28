"use client"

import { useEffect, useRef, useState } from "react"

const benefitScenarios = [
  {
    emoji: "🌅",
    title: "Sunday Morning Coffee",
    description: "While other teachers panic, you're enjoying breakfast with your family",
    delay: 0,
  },
  {
    emoji: "⚡",
    title: "5-Minute Feedback",
    description: "Write personalized comments faster than you can drink your morning coffee",
    delay: 200,
  },
  {
    emoji: "💝",
    title: "Parent Praise",
    description: "Receive texts from parents thanking you for 'seeing' their child",
    delay: 400,
  },
  {
    emoji: "🎉",
    title: "Report Card Day",
    description: "Actually look forward to feedback time",
    delay: 600,
  },
]

export function TransformationSection() {
  const [visibleCards, setVisibleCards] = useState<boolean[]>(new Array(benefitScenarios.length).fill(false))
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
              // Animate benefit cards with staggered delays
              benefitScenarios.forEach((_, index) => {
                setTimeout(() => {
                  setVisibleCards((prev) => {
                    const newVisible = [...prev]
                    newVisible[index] = true
                    return newVisible
                  })
                }, benefitScenarios[index].delay)
              })
            }
          }
        })
      },
      { threshold: 0.3 },
    )

    if (titleRef.current) observer.observe(titleRef.current)
    if (sectionRef.current) observer.observe(sectionRef.current)

    return () => observer.disconnect()
  }, [])

  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      {/* Bright, hopeful background */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
        {/* Sunrise-inspired gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-orange-100/50 via-transparent to-yellow-100/30" />

        {/* Floating light elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-40 h-40 bg-gradient-to-r from-amber-200/30 to-orange-200/30 rounded-full blur-3xl animate-float-gentle" />
          <div className="absolute top-40 right-20 w-32 h-32 bg-gradient-to-r from-yellow-200/40 to-amber-200/40 rounded-full blur-3xl animate-float-gentle-delayed" />
          <div className="absolute bottom-32 left-1/4 w-36 h-36 bg-gradient-to-r from-orange-200/35 to-yellow-200/35 rounded-full blur-3xl animate-float-gentle-slow" />
          <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-gradient-to-r from-amber-200/40 to-orange-200/40 rounded-full blur-3xl animate-float-gentle" />
        </div>

        {/* Subtle light rays effect */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,191,0,0.1),transparent_50%)]" />
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
            Picture This:{" "}
            <span className="bg-gradient-to-r from-amber-600 via-orange-500 to-yellow-600 bg-clip-text text-transparent">
              Tomorrow's You
            </span>
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-amber-400 via-orange-400 to-yellow-400 mx-auto rounded-full" />
          <p className="text-xl text-gray-600 mt-6 max-w-3xl mx-auto">
            Imagine a world where teaching feels joyful again, where you have time for what truly matters
          </p>
        </div>

        {/* Before/After Split Concept with Cards */}
        <div ref={sectionRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 lg:gap-12">
          {benefitScenarios.map((scenario, index) => (
            <div
              key={index}
              className={`group relative transition-all duration-700 ${
                visibleCards[index] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
              style={{
                transitionDelay: `${scenario.delay}ms`,
              }}
            >
              {/* Card */}
              <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 lg:p-10 shadow-xl border border-white/60 hover:shadow-2xl hover:scale-105 transition-all duration-500 hover:bg-white/90 overflow-hidden">
                {/* Animated background glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-amber-100/50 via-orange-100/30 to-yellow-100/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />

                {/* Content */}
                <div className="relative z-10">
                  {/* Emoji with floating animation */}
                  <div className="text-6xl lg:text-7xl mb-6 text-center group-hover:animate-gentle-bounce">
                    {scenario.emoji}
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-4 text-center">{scenario.title}</h3>

                  {/* Description */}
                  <p className="text-lg lg:text-xl text-gray-600 leading-relaxed text-center">{scenario.description}</p>
                </div>

                {/* Decorative corner elements */}
                <div className="absolute top-4 right-4 w-3 h-3 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 w-2 h-2 bg-gradient-to-r from-yellow-400 to-amber-400 rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Floating sparkle effects */}
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-r from-amber-300 to-yellow-300 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-opacity duration-300" />
              <div
                className="absolute -bottom-2 -left-2 w-3 h-3 bg-gradient-to-r from-orange-300 to-amber-300 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-opacity duration-300"
                style={{ animationDelay: "0.5s" }}
              />
            </div>
          ))}
        </div>

        {/* Inspirational Call-to-Action */}
        <div className="text-center mt-20">
          <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 rounded-3xl p-1 max-w-2xl mx-auto">
            <div className="bg-white rounded-3xl p-8 lg:p-10">
              <h3 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-4">This Could Be Your Reality</h3>
              <p className="text-lg text-gray-600 mb-6">
                Join thousands of teachers who've already transformed their teaching experience
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold px-8 py-4 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200">
                  Start My Transformation
                </button>
                <button className="border-2 border-amber-500 text-amber-600 hover:bg-amber-50 font-semibold px-8 py-4 rounded-full transition-all duration-200">
                  See Success Stories
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional floating elements for atmosphere */}
      <div className="absolute top-1/4 left-4 w-6 h-6 bg-amber-300/40 rounded-full animate-float-sparkle" />
      <div className="absolute top-1/2 right-8 w-4 h-4 bg-orange-300/40 rounded-full animate-float-sparkle-delayed" />
      <div className="absolute bottom-1/3 left-1/5 w-5 h-5 bg-yellow-300/40 rounded-full animate-float-sparkle-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-3 h-3 bg-amber-300/40 rounded-full animate-float-sparkle" />
    </section>
  )
}
