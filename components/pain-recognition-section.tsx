"use client"

import { useEffect, useRef, useState } from "react"

const painPoints = [
  {
    emoji: "📚",
    text: "It's 10 PM and you're still writing report cards",
    delay: 0,
  },
  {
    emoji: "🥱",
    text: "You've rewritten the same comment 5 times",
    delay: 200,
  },
  {
    emoji: "😰",
    text: "Parents deserve better, but you're out of words",
    delay: 400,
  },
  {
    emoji: "⏰",
    text: "Report card season steals your life for weeks",
    delay: 600,
  },
  {
    emoji: "💔",
    text: "You care too much to write generic feedback",
    delay: 800,
  },
  {
    emoji: "😴",
    text: "You dream about unfinished feedback in your sleep",
    delay: 1000,
  },
]

export function PainRecognitionSection() {
  const [visibleCards, setVisibleCards] = useState<boolean[]>(new Array(painPoints.length).fill(false))
  const [bridgeVisible, setBridgeVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const bridgeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === sectionRef.current) {
              // Animate pain point cards with staggered delays
              painPoints.forEach((_, index) => {
                setTimeout(() => {
                  setVisibleCards((prev) => {
                    const newVisible = [...prev]
                    newVisible[index] = true
                    return newVisible
                  })
                }, painPoints[index].delay)
              })
            }

            if (entry.target === bridgeRef.current) {
              setBridgeVisible(true)
            }
          }
        })
      },
      { threshold: 0.3 },
    )

    if (sectionRef.current) observer.observe(sectionRef.current)
    if (bridgeRef.current) observer.observe(bridgeRef.current)

    return () => observer.disconnect()
  }, [])

  return (
    <section className="relative py-20 lg:py-32 overflow-hidden" aria-labelledby="pain-recognition-heading">
      {/* Background with classroom imagery suggestion */}
      <div className="absolute inset-0 bg-gradient-to-br from-rose-50 via-orange-50 to-emerald-50">
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-32 h-32 bg-rose-200 rounded-full blur-3xl" />
          <div className="absolute top-32 right-20 w-40 h-40 bg-emerald-200 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-1/4 w-36 h-36 bg-orange-200 rounded-full blur-3xl" />
          <div className="absolute bottom-32 right-1/3 w-28 h-28 bg-rose-200 rounded-full blur-3xl" />
        </div>

        {/* Subtle texture overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.05)_1px,transparent_0)] bg-[length:20px_20px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <header className="text-center mb-16">
          <h2
            id="pain-recognition-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-4 leading-tight"
          >
            If This Is{" "}
            <span className="bg-gradient-to-r from-rose-600 to-orange-600 bg-clip-text text-transparent">
              Your Life
            </span>{" "}
            Right Now...
          </h2>
          <div
            className="w-24 h-1 bg-gradient-to-r from-rose-400 to-orange-400 mx-auto rounded-full"
            aria-hidden="true"
          />
        </header>

        {/* Pain Points Grid */}
        <div
          ref={sectionRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20"
          role="list"
          aria-label="Common teaching challenges"
        >
          {painPoints.map((point, index) => (
            <article
              key={index}
              role="listitem"
              className={`group relative bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/50 transition-all duration-700 hover:shadow-xl hover:scale-105 hover:bg-white/80 ${
                visibleCards[index] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{
                transitionDelay: `${point.delay}ms`,
              }}
            >
              <div className="group-hover:animate-gentle-shake">
                <div className="text-4xl mb-4 text-center" role="img" aria-label={`Emoji representing: ${point.text}`}>
                  {point.emoji}
                </div>
                <p className="text-gray-700 text-lg leading-relaxed text-center font-medium">{point.text}</p>
              </div>
            </article>
          ))}
        </div>

        {/* Emotional Bridge Text */}
        <div
          ref={bridgeRef}
          className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${
            bridgeVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 lg:p-12 shadow-xl border border-white/50">
            <p className="text-xl lg:text-2xl text-gray-700 leading-relaxed mb-6">
              You became a teacher to <span className="font-semibold text-emerald-700">inspire</span>, not to spend your
              evenings struggling with comment boxes. <span className="font-semibold text-indigo-700">AI can help.</span>
            </p>
            <p className="text-lg lg:text-xl text-gray-600 leading-relaxed">
              Every minute you spend on admin is a minute stolen from your{" "}
              <span className="font-semibold text-rose-600">students</span>,{" "}
              <span className="font-semibold text-orange-600">your family</span>, and{" "}
              <span className="font-semibold text-emerald-600">yourself</span>.{" "}
              <span className="font-semibold text-purple-600">Let AI handle the rest.</span>
            </p>

            {/* Decorative elements */}
            <div className="flex justify-center items-center mt-8 space-x-4">
              <div className="w-2 h-2 bg-rose-400 rounded-full animate-pulse" />
              <div className="w-3 h-3 bg-orange-400 rounded-full animate-pulse" style={{ animationDelay: "0.5s" }} />
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" style={{ animationDelay: "1s" }} />
            </div>
          </div>
        </div>
      </div>

      {/* Floating comfort elements */}
      <div className="absolute top-1/4 left-8 w-16 h-16 bg-rose-200/30 rounded-full animate-float-gentle" />
      <div className="absolute top-1/2 right-12 w-12 h-12 bg-emerald-200/30 rounded-full animate-float-gentle-delayed" />
      <div className="absolute bottom-1/4 left-1/3 w-20 h-20 bg-orange-200/30 rounded-full animate-float-gentle-slow" />
    </section>
  )
}
