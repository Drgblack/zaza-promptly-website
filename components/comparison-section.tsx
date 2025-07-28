"use client"

import { useEffect, useRef, useState } from "react"
import { Check, X, Shield, Heart, BookOpen, Users } from "lucide-react"

const comparisonFeatures = [
  {
    feature: "AI Built for Teachers",
    zaza: "Machine learning trained on education",
    chatgpt: "Generic AI for everyone",
    icon: Users,
    delay: 0,
  },
  {
    feature: "Educational AI Language",
    zaza: "Curriculum-aware vocabulary",
    chatgpt: "Corporate AI speak",
    icon: BookOpen,
    delay: 100,
  },
  {
    feature: "AI Student Privacy",
    zaza: "FERPA-compliant AI processing",
    chatgpt: "Public AI training data",
    icon: Shield,
    delay: 200,
  },
  {
    feature: "AI Tone Consistency",
    zaza: "Machine learning preserves your voice",
    chatgpt: "Robotic AI responses",
    icon: Heart,
    delay: 300,
  },
  {
    feature: "AI-Powered Comments",
    zaza: "One-click AI templates",
    chatgpt: "Start from scratch with AI",
    icon: BookOpen,
    delay: 400,
  },
  {
    feature: "No AI Hallucinations",
    zaza: "Education-trained AI model",
    chatgpt: "AI makes up facts",
    icon: Shield,
    delay: 500,
  },
  {
    feature: "AI Learning Memory",
    zaza: "Machine learning library",
    chatgpt: "Lose everything",
    icon: Heart,
    delay: 600,
  },
  {
    feature: "AI Teaching Intelligence",
    zaza: "Pedagogy-aware AI",
    chatgpt: "Generic AI feedback",
    icon: Users,
    delay: 700,
  },
]

export function ComparisonSection() {
  const [visibleRows, setVisibleRows] = useState<boolean[]>(new Array(comparisonFeatures.length).fill(false))
  const [titleVisible, setTitleVisible] = useState(false)
  const [calloutVisible, setCalloutVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const calloutRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === titleRef.current) {
              setTitleVisible(true)
            }

            if (entry.target === sectionRef.current) {
              // Animate comparison rows with staggered delays
              comparisonFeatures.forEach((_, index) => {
                setTimeout(() => {
                  setVisibleRows((prev) => {
                    const newVisible = [...prev]
                    newVisible[index] = true
                    return newVisible
                  })
                }, comparisonFeatures[index].delay)
              })
            }

            if (entry.target === calloutRef.current) {
              setCalloutVisible(true)
            }
          }
        })
      },
      { threshold: 0.3 },
    )

    if (titleRef.current) observer.observe(titleRef.current)
    if (sectionRef.current) observer.observe(sectionRef.current)
    if (calloutRef.current) observer.observe(calloutRef.current)

    return () => observer.disconnect()
  }, [])

  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(99,102,241,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,rgba(139,92,246,0.1),transparent_50%)]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div
          ref={titleRef}
          className={`text-center mb-16 transition-all duration-1000 ${
            titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-800 mb-6 leading-tight">
            <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">Generic AI</span>{" "}
            vs.{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              AI Built for Teachers
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See why teachers choose purpose-built artificial intelligence over generic AI tools
          </p>
        </div>

        {/* Comparison Table */}
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden mb-16">
          {/* Table Header */}
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-4 sm:px-6 py-4 sm:py-6">
            <div className="hidden md:grid md:grid-cols-4 gap-4 items-center">
              <div className="text-white font-bold text-lg md:text-xl">Feature</div>
              <div className="text-center">
                <div className="text-white font-bold text-lg md:text-xl mb-2">Zaza Promptly</div>
                <div className="text-indigo-100 text-sm">Built for Teachers</div>
              </div>
              <div className="text-center">
                <div className="text-white font-bold text-lg md:text-xl mb-2">ChatGPT</div>
                <div className="text-indigo-100 text-sm">Generic AI Tool</div>
              </div>
              <div className="text-white font-bold text-lg md:text-xl text-center">Winner</div>
            </div>

            {/* Mobile Header */}
            <div className="md:hidden text-center">
              <h3 className="text-white font-bold text-xl mb-2">Feature Comparison</h3>
              <p className="text-indigo-100 text-sm">Zaza Promptly vs ChatGPT</p>
            </div>
          </div>

          {/* Table Body */}
          <div ref={sectionRef} className="divide-y divide-gray-100">
            {comparisonFeatures.map((item, index) => {
              const IconComponent = item.icon
              return (
                <div
                  key={index}
                  className={`transition-all duration-700 ${
                    visibleRows[index] ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
                  }`}
                  style={{
                    transitionDelay: `${item.delay}ms`,
                  }}
                >
                  {/* Desktop Layout */}
                  <div className="hidden md:grid md:grid-cols-4 gap-4 items-center p-6 hover:bg-gray-50 transition-all duration-300">
                    {/* Feature Name */}
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-xl flex items-center justify-center">
                        <IconComponent className="w-5 h-5 text-indigo-600" />
                      </div>
                      <span className="font-semibold text-gray-800 text-lg">{item.feature}</span>
                    </div>

                    {/* Zaza Promptly */}
                    <div className="text-center">
                      <div className="flex items-center justify-center space-x-2 mb-2">
                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center animate-check-bounce">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                      </div>
                      <p className="text-gray-700 font-medium">{item.zaza}</p>
                    </div>

                    {/* ChatGPT */}
                    <div className="text-center">
                      <div className="flex items-center justify-center space-x-2 mb-2">
                        <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center animate-x-shake">
                          <X className="w-4 h-4 text-white" />
                        </div>
                      </div>
                      <p className="text-gray-600">{item.chatgpt}</p>
                    </div>

                    {/* Winner */}
                    <div className="text-center">
                      <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2 rounded-full font-semibold">
                        <span>Zaza</span>
                        <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center">
                          <Check className="w-3 h-3 text-indigo-600" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Mobile Layout */}
                  <div className="md:hidden p-6 hover:bg-gray-50 transition-all duration-300">
                    {/* Feature Header */}
                    <div className="flex items-center space-x-3 mb-6">
                      <div className="w-10 h-10 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-xl flex items-center justify-center">
                        <IconComponent className="w-5 h-5 text-indigo-600" />
                      </div>
                      <span className="font-semibold text-gray-800 text-lg">{item.feature}</span>
                    </div>

                    {/* Comparison Cards */}
                    <div className="space-y-4">
                      {/* Zaza Promptly Card */}
                      <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                            <Check className="w-4 h-4 text-white" />
                          </div>
                          <span className="font-semibold text-green-800">Zaza Promptly</span>
                        </div>
                        <p className="text-gray-700 font-medium">{item.zaza}</p>
                      </div>

                      {/* ChatGPT Card */}
                      <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                            <X className="w-4 h-4 text-white" />
                          </div>
                          <span className="font-semibold text-red-800">ChatGPT</span>
                        </div>
                        <p className="text-gray-600">{item.chatgpt}</p>
                      </div>
                    </div>

                    {/* Winner Badge */}
                    <div className="text-center mt-4">
                      <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2 rounded-full font-semibold">
                        <span>Winner: Zaza</span>
                        <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center">
                          <Check className="w-3 h-3 text-indigo-600" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Callout Box */}
        <div
          ref={calloutRef}
          className={`transition-all duration-1000 ${
            calloutVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 rounded-3xl p-1 max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl p-8 lg:p-12 text-center">
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center">
                  <Heart className="w-8 h-8 text-white" />
                </div>
              </div>
              <h3 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">The Bottom Line</h3>
              <p className="text-xl lg:text-2xl text-gray-700 leading-relaxed mb-8">
                <span className="font-semibold text-red-600">ChatGPT</span> is a tool.{" "}
                <span className="font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Zaza Promptly
                </span>{" "}
                is your teaching partner.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold px-10 py-5 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200 text-lg">
                  Choose Your Teaching Partner
                </button>
                <button className="border-2 border-indigo-500 text-indigo-600 hover:bg-indigo-50 font-semibold px-10 py-5 rounded-full transition-all duration-200 text-lg bg-transparent">
                  See the Difference
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Scroll Hint */}
        <div className="md:hidden text-center mt-8">
          <p className="text-sm text-gray-500">← Scroll table horizontally to see all features →</p>
        </div>
      </div>
    </section>
  )
}
