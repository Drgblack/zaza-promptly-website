"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { ChevronLeft, ChevronRight, Quote, Star, Clock, Heart, MessageCircle, Users } from "lucide-react"
import { formatNumber } from "../utils/format";

const testimonials = [
  {
    name: "Sam M.",
    role: "3rd Grade Teacher",
    location: "Texas",
    quote:
      "I used to dread report card season. Now I finish comments in one afternoon and spend the weekend with my kids. My principal asked what changed—I told her about Zaza Promptly.",
    avatar:
      "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    rating: 5,
  },
  {
    name: "Marcus J.",
    role: "High School Science",
    location: "California",
    quote:
      "Parents are commenting on how thoughtful and personal my feedback has become. Little do they know, I'm spending half the time I used to!",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    rating: 5,
  },
  {
    name: "Lisa R.",
    role: "Special Education",
    location: "Florida",
    quote: "Finally, feedback that honors my students' unique journeys. The IEP-aware suggestions are game-changing.",
    avatar:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    rating: 5,
  },
  {
    name: "David K.",
    role: "Middle School Math",
    location: "New York",
    quote:
      "My comments used to be generic. Now they're so specific that parents think I have a PhD in child psychology. It's still my voice, just... better.",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    rating: 5,
  },
]

const statistics = [
  {
    value: 3.2,
    suffix: " hours",
    label: "saved per week",
    icon: Clock,
    color: "from-blue-500 to-cyan-500",
  },
  {
    value: 94,
    suffix: "%",
    label: "report improved work-life balance",
    icon: Heart,
    color: "from-pink-500 to-rose-500",
  },
  {
    value: 89,
    suffix: "%",
    label: "receive more positive parent feedback",
    icon: MessageCircle,
    color: "from-green-500 to-emerald-500",
  },
  {
    value: 97,
    suffix: "%",
    label: "would recommend to colleagues",
    icon: Users,
    color: "from-purple-500 to-indigo-500",
  },
]

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [titleVisible, setTitleVisible] = useState(false)
  const [statsVisible, setStatsVisible] = useState(false)
  const [animatedStats, setAnimatedStats] = useState<number[]>(new Array(statistics.length).fill(0))
  const titleRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Add touch handling state and refs
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const carouselRef = useRef<HTMLDivElement>(null)

  // Auto-rotation
  useEffect(() => {
    if (isAutoPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length)
      }, 5000)
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isAutoPlaying])

  // Scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === titleRef.current) {
              setTitleVisible(true)
            }

            if (entry.target === statsRef.current) {
              setStatsVisible(true)
              // Animate statistics counters
              statistics.forEach((stat, index) => {
                let start = 0
                const end = stat.value
                const duration = 2000
                const increment = end / (duration / 16)

                const timer = setInterval(() => {
                  start += increment
                  if (start >= end) {
                    start = end
                    clearInterval(timer)
                  }
                  setAnimatedStats((prev) => {
                    const newStats = [...prev]
                    newStats[index] = start
                    return newStats
                  })
                }, 16)
              })
            }
          }
        })
      },
      { threshold: 0.3 },
    )

    if (titleRef.current) observer.observe(titleRef.current)
    if (statsRef.current) observer.observe(statsRef.current)

    return () => observer.disconnect()
  }, [])

  // Add touch event handlers after the existing useEffect hooks
  const minSwipeDistance = 50

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe) {
      nextTestimonial()
    } else if (isRightSwipe) {
      prevTestimonial()
    }
  }

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index)
  }

  return (
    <section className="relative py-20 lg:py-32 overflow-hidden" aria-labelledby="testimonials-heading">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-200/30 to-indigo-200/30 rounded-full blur-3xl animate-float-gentle" />
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-purple-200/30 to-pink-200/30 rounded-full blur-3xl animate-float-gentle-delayed" />
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <header
          ref={titleRef}
          className={`text-center mb-16 transition-all duration-1000 ${
            titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2
            id="testimonials-heading"
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-800 mb-6 leading-tight"
          >
            Join{" "}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              50,000+ Teachers
            </span>
            <br />
            Who Got Their Lives Back
          </h2>
        </header>

        {/* Testimonials Carousel */}
        <div
          ref={carouselRef}
          className="relative mb-20"
          role="region"
          aria-label="Teacher testimonials carousel"
          aria-live="polite"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden max-w-4xl mx-auto">
            <div className="relative h-auto min-h-[400px] sm:h-96 lg:h-80">
              {testimonials.map((testimonial, index) => (
                <article
                  key={index}
                  className={`absolute inset-0 transition-all duration-500 ${
                    index === currentIndex ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full"
                  }`}
                  aria-hidden={index !== currentIndex}
                  role="tabpanel"
                  id={`testimonial-${index}`}
                  aria-labelledby={`testimonial-tab-${index}`}
                >
                  <div className="p-6 sm:p-8 lg:p-12 h-full flex flex-col justify-center">
                    <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6">
                      {/* Avatar */}
                      <div className="flex-shrink-0 mx-auto sm:mx-0">
                        <img
                          src={testimonial.avatar || "/placeholder-user.jpg"}
                          alt={`${testimonial.name}, ${testimonial.role} from ${testimonial.location}`}
                          className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-4 border-indigo-100 object-cover"
                          width={80}
                          height={80}
                        />
                      </div>

                      {/* Content */}
                      <div className="flex-1 text-center sm:text-left">
                        <Quote
                          className="w-6 h-6 sm:w-8 sm:h-8 text-indigo-400 mb-4 mx-auto sm:mx-0"
                          aria-hidden={true}
                        />

                        <blockquote className="text-lg sm:text-xl lg:text-2xl text-gray-700 leading-relaxed mb-6 italic">
                          "{testimonial.quote}"
                        </blockquote>

                        <footer className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0">
                          <div className="text-center sm:text-left">
                            <cite className="font-bold text-gray-800 text-base sm:text-lg not-italic">
                              {testimonial.name}
                            </cite>
                            <div className="text-gray-600 text-sm sm:text-base">
                              {testimonial.role} • {testimonial.location}
                            </div>
                          </div>

                          <div
                            className="flex space-x-1"
                            role="img"
                            aria-label={`${testimonial.rating} out of 5 stars`}
                          >
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <Star
                                key={i}
                                className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-current"
                                aria-hidden={true}
                              />
                            ))}
                          </div>
                        </footer>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevTestimonial}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-12 h-12 sm:w-12 sm:h-12 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110 touch-manipulation focus:outline-none focus:ring-4 focus:ring-indigo-500/50"
              aria-label="Previous testimonial"
            >
                              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" aria-hidden={true} />
            </button>
            <button
              onClick={nextTestimonial}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-12 h-12 sm:w-12 sm:h-12 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110 touch-manipulation focus:outline-none focus:ring-4 focus:ring-indigo-500/50"
              aria-label="Next testimonial"
            >
                              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" aria-hidden={true} />
            </button>
          </div>

          {/* Dots Navigation */}
          <nav className="flex justify-center space-x-3 mt-8" role="tablist" aria-label="Testimonial navigation">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToTestimonial(index)}
                className={`w-4 h-4 sm:w-3 sm:h-3 rounded-full transition-all duration-200 touch-manipulation focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                  index === currentIndex ? "bg-indigo-500 scale-125" : "bg-gray-300 hover:bg-gray-400"
                }`}
                role="tab"
                id={`testimonial-tab-${index}`}
                aria-controls={`testimonial-${index}`}
                aria-selected={index === currentIndex}
                aria-label={`Go to testimonial ${index + 1} from ${testimonials[index].name}`}
              />
            ))}
          </nav>
        </div>

        {/* Statistics */}
        <div
          ref={statsRef}
          className={`transition-all duration-1000 ${
            statsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {statistics.map((stat, index) => {
              const IconComponent = stat.icon
              return (
                <div
                  key={index}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/60 text-center hover:scale-105 transition-transform duration-300"
                >
                  <div
                    className={`w-16 h-16 bg-gradient-to-r ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}
                  >
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl lg:text-4xl font-bold text-gray-800 mb-2">
                    {formatNumber(Number(animatedStats[index].toFixed(stat.suffix === "%" ? 0 : 1)))}
                    {stat.suffix}
                  </div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-3xl p-1 max-w-2xl mx-auto">
            <div className="bg-white rounded-3xl p-8">
              <h3 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-4">Ready to Join Them?</h3>
              <p className="text-gray-600 mb-6">
                Start your free trial and see why teachers everywhere are getting their lives back
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-semibold px-8 py-4 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200">
                  Start Free Trial
                </button>
                <button className="border-2 border-indigo-500 text-indigo-600 hover:bg-indigo-50 font-semibold px-8 py-4 rounded-full transition-all duration-200 bg-transparent">
                  Read More Stories
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
