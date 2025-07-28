"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import { Layout } from "@zaza/shared-components"
import Head from "next/head";
import { BRAND_NAME, DEFAULT_DESCRIPTION, DEFAULT_OG_IMAGE, BASE_URL } from "@zaza/shared-components/lib/seo";

// SEO meta tags injected by automation

// FAQ Item Component
function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="bg-orange-50 dark:bg-gray-800 rounded-lg shadow-sm border border-orange-100 dark:border-gray-700 overflow-hidden transition-all duration-200 hover:shadow-md">
      <button
        className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-orange-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-inset"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className="font-semibold text-gray-900 dark:text-white text-base sm:text-lg pr-4">{question}</span>
        <ChevronRight
          className={`h-5 w-5 text-slate-500 transition-transform duration-200 flex-shrink-0 ${
            isOpen ? "rotate-90" : ""
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 pb-4 pt-2">
          <p className="text-slate-600 dark:text-gray-300 leading-relaxed">{answer}</p>
        </div>
      </div>
    </div>
  )
}

export default function LandingPage() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [showBefore, setShowBefore] = useState(true)
  const [visibleCards, setVisibleCards] = useState<number[]>([])
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const featuresRef = useRef<HTMLElement>(null)

  const testimonials = [
    {
      quote: "I used to spend hours drafting emails. Now I feel calm and professional — every time.",
      author: "Jennifer K.",
      role: "3rd Grade Teacher",
      initials: "JK",
    },
    {
      quote: "Finally something built for teachers, not generic AI tools.",
      author: "Michael R.",
      role: "High School Math",
      initials: "MR",
    },
    {
      quote: "I went from dreading parent emails to handling them like a pro!",
      author: "Sarah M.",
      role: "Elementary Teacher",
      initials: "SM",
    },
  ]

  const features = [
    {
      emoji: "🧠",
      title: "Memory Recall",
      description: "Remembers every parent and their concerns",
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50",
      delay: 0,
    },
    {
      emoji: "✍️",
      title: "Tone Matching",
      description: "Writes in your personal style",
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50",
      delay: 200,
    },
    {
      emoji: "⏱",
      title: "Time Saver",
      description: "Replies in 3 taps",
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50",
      delay: 400,
    },
    {
      emoji: "🎯",
      title: "Confidence Coach",
      description: "Built-in tone feedback",
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50",
      delay: 600,
    },
    {
      emoji: "🫶",
      title: "Designed by Educators",
      description: "Not just marketers",
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50",
      delay: 800,
    },
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Trigger staggered animation for cards
            features.forEach((_, index) => {
              setTimeout(() => {
                setVisibleCards((prev) => [...prev, index])
              }, index * 150)
            })
          }
        })
      },
      { threshold: 0.3 },
    )

    if (featuresRef.current) {
      observer.observe(featuresRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <>
      <Head>
        <title>Zaza Inbox | {BRAND_NAME}</title>
        <meta name="description" content="Zaza Inbox: AI-powered communication and workflow for educators. {DEFAULT_DESCRIPTION}" />
        <meta property="og:title" content="Zaza Inbox | {BRAND_NAME}" />
        <meta property="og:description" content="Zaza Inbox: AI-powered communication and workflow for educators. {DEFAULT_DESCRIPTION}" />
        <meta property="og:image" content={DEFAULT_OG_IMAGE} />
        <meta property="og:url" content={`${BASE_URL}/zaza-inbox-landing`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Zaza Inbox | {BRAND_NAME}" />
        <meta name="twitter:description" content="Zaza Inbox: AI-powered communication and workflow for educators. {DEFAULT_DESCRIPTION}" />
        <meta name="twitter:image" content={DEFAULT_OG_IMAGE} />
      </Head>
      <Layout currentProduct="Inbox">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-orange-100 via-orange-50 to-orange-100 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 px-4 py-16 sm:px-6 lg:px-8">
          {/* Enhanced layered background gradients */}
          <div className="absolute inset-0 bg-gradient-to-r from-orange-200/40 to-orange-300/40" />
          <div className="absolute inset-0 bg-gradient-to-bl from-orange-200/30 via-transparent to-orange-100/30" />
          <div className="absolute inset-0 bg-gradient-to-tr from-orange-100/20 via-transparent to-orange-200/20" />

          {/* Floating color orbs for depth */}
          <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-orange-300 to-orange-400 rounded-full opacity-20 blur-3xl animate-pulse"></div>
          <div
            className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full opacity-15 blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-orange-200 to-orange-300 rounded-full opacity-10 blur-3xl animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>

          {/* Animated gradient mesh overlay */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-orange-300/20 via-transparent to-transparent animate-pulse"></div>
            <div
              className="absolute bottom-0 right-0 w-full h-full bg-gradient-to-tl from-orange-300/20 via-transparent to-transparent animate-pulse"
              style={{ animationDelay: "1.5s" }}
            ></div>
          </div>

          <div className="relative mx-auto max-w-4xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl lg:text-6xl">
              Turn Teacher Emails into{" "}
              <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent drop-shadow-sm">
                Confidence Moments
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600 dark:text-gray-300 sm:text-xl font-medium">
              Zaza Inbox helps you write perfect parent replies in seconds - in your tone, with full memory of every
              conversation.
            </p>
            <div className="mt-8">
              <Button
                size="lg"
                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-3 text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                Join the Waitlist - It's Free
              </Button>
            </div>
            <div className="mt-8 rounded-xl bg-orange-50/80 backdrop-blur-md p-6 shadow-xl border border-orange-100/50">
              <div className="flex items-center justify-center space-x-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-orange-400 text-orange-500 drop-shadow-sm" />
                ))}
              </div>
              <blockquote className="text-gray-800 italic font-medium">
                "I went from dreading parent emails to handling them like a pro!"
              </blockquote>
              <cite className="text-sm text-slate-600 not-italic font-medium">- Sarah M.</cite>
            </div>
          </div>
        </section>

        {/* Pain → Promise → Proof Section */}
        <section className="px-4 py-16 sm:px-6 lg:px-8 bg-white">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-8 md:grid-cols-3">
              <Card className="border-red-100 bg-red-50/50">
                <CardContent className="p-6">
                  <div className="mb-4">
                    <Badge variant="destructive" className="mb-2">
                      Pain
                    </Badge>
                  </div>
                  <p className="text-slate-600 dark:text-gray-300">
                    Teacher emails are emotionally exhausting. You're expected to respond fast, professionally, and
                    empathetically, even after hours.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-blue-100 bg-blue-50/50">
                <CardContent className="p-6">
                  <div className="mb-4">
                    <Badge className="mb-2 bg-blue-500">Promise</Badge>
                  </div>
                  <p className="text-slate-600 dark:text-gray-300">
                    Zaza Inbox makes it easy. AI replies in your voice, based on parent history, tone, and context.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-green-100 bg-green-50/50">
                <CardContent className="p-6">
                  <div className="mb-4">
                    <Badge className="mb-2 bg-green-500">Proof</Badge>
                  </div>
                  <p className="text-slate-600 dark:text-gray-300">
                    "Saved 45 minutes on day one. Sounded more like me than I expected!" - Beta Tester
                  </p>
                  <cite className="text-sm text-slate-500 not-italic">— Beta Tester</cite>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Feature Highlights */}
        <section
          ref={featuresRef}
          id="features"
          className="bg-orange-50 dark:bg-gray-800 px-4 py-16 sm:px-6 lg:px-8 relative overflow-hidden"
        >
          {/* Floating background elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-orange-200 to-orange-300 rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-r from-orange-300 to-orange-400 rounded-full opacity-20 animate-bounce"></div>
            <div className="absolute bottom-20 left-1/4 w-20 h-20 bg-gradient-to-r from-orange-200 to-orange-300 rounded-full opacity-20 animate-ping"></div>
            <div className="absolute bottom-40 right-1/3 w-16 h-16 bg-gradient-to-r from-orange-300 to-orange-400 rounded-full opacity-20 animate-pulse"></div>
          </div>

          <div className="mx-auto max-w-6xl relative">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl mb-4 animate-fade-in">
                Why Teachers Love Zaza Inbox
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-orange-600 mx-auto rounded-full animate-scale-in"></div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => (
                <Card
                  key={index}
                  className={`group relative overflow-hidden transition-all duration-700 cursor-pointer bg-orange-50 dark:bg-gray-800 border-orange-100 dark:border-gray-700 ${
                    visibleCards.includes(index)
                      ? "opacity-100 translate-y-0 scale-100"
                      : "opacity-0 translate-y-8 scale-95"
                  } ${
                    hoveredCard === index ? "shadow-2xl -translate-y-2 scale-105" : "hover:shadow-lg hover:-translate-y-1"
                  }`}
                  style={{
                    transitionDelay: visibleCards.includes(index) ? "0ms" : `${feature.delay}ms`,
                  }}
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  {/* Animated gradient background */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                  ></div>

                  {/* Floating particles effect */}
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {hoveredCard === index && (
                      <>
                        <div className="absolute top-4 right-4 w-2 h-2 bg-orange-400 rounded-full animate-ping opacity-60"></div>
                        <div className="absolute bottom-6 left-6 w-1 h-1 bg-orange-400 rounded-full animate-bounce opacity-40"></div>
                        <div className="absolute top-1/2 right-8 w-1.5 h-1.5 bg-orange-400 rounded-full animate-pulse opacity-50"></div>
                      </>
                    )}
                  </div>

                  <CardContent className="p-6 relative z-10">
                    <div
                      className={`text-4xl mb-4 transition-all duration-500 ${
                        hoveredCard === index ? "scale-110 rotate-12" : "scale-100 rotate-0"
                      }`}
                    >
                      {feature.emoji}
                    </div>
                    <h3
                      className={`text-xl font-semibold mb-2 transition-colors duration-300 ${
                        hoveredCard === index ? "text-orange-600" : "text-gray-900 dark:text-white"
                      }`}
                    >
                      {feature.title}
                    </h3>
                    <p className="text-slate-600 dark:text-gray-300 transition-colors duration-300 group-hover:text-slate-700">
                      {feature.description}
                    </p>

                    {/* Progress bar animation */}
                    <div className="mt-4 h-1 bg-orange-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${feature.color} transition-all duration-1000 ${
                          hoveredCard === index ? "w-full" : "w-0"
                        }`}
                      ></div>
                    </div>
                  </CardContent>

                  {/* Shine effect */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-r from-transparent via-orange-100 to-transparent opacity-0 -skew-x-12 transition-all duration-1000 ${
                      hoveredCard === index ? "opacity-20 translate-x-full" : "opacity-0 -translate-x-full"
                    }`}
                  ></div>
                </Card>
              ))}
            </div>

            {/* Magical sparkles */}
            <div className="absolute inset-0 pointer-events-none">
              {visibleCards.length === features.length && (
                <>
                  <div className="absolute top-1/4 left-1/4 animate-ping">
                    <Star className="w-4 h-4 text-orange-400 fill-current" />
                  </div>
                  <div className="absolute top-3/4 right-1/4 animate-pulse">
                    <Star className="w-3 h-3 text-orange-400 fill-current" />
                  </div>
                  <div className="absolute top-1/2 left-3/4 animate-bounce">
                    <Star className="w-2 h-2 text-orange-400 fill-current" />
                  </div>
                </>
              )}
            </div>
          </div>

          <style jsx>{`
            @keyframes fade-in {
              from { opacity: 0; transform: translateY(20px); }
              to { opacity: 1; transform: translateY(0); }
            }
            @keyframes scale-in {
              from { transform: scaleX(0); }
              to { transform: scaleX(1); }
            }
            .animate-fade-in {
              animation: fade-in 0.8s ease-out;
            }
            .animate-scale-in {
              animation: scale-in 0.8s ease-out 0.3s both;
            }
          `}</style>
        </section>

        {/* Screenshots Section */}
        <section className="px-4 py-16 sm:px-6 lg:px-8 bg-white">
          <div className="mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl mb-6">See It In Action</h2>
              <div className="flex items-center justify-center space-x-4 mb-8">
                <span
                  className={`text-sm font-medium transition-colors ${!showBefore ? "text-slate-400" : "text-gray-900 dark:text-white"}`}
                >
                  Before Zaza
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowBefore(!showBefore)}
                  className="px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white border-0 hover:from-orange-600 hover:to-orange-700"
                >
                  {showBefore ? "Show After" : "Show Before"}
                </Button>
                <span
                  className={`text-sm font-medium transition-colors ${showBefore ? "text-slate-400" : "text-gray-900 dark:text-white"}`}
                >
                  With Zaza
                </span>
              </div>
            </div>

            {/* Before/After Display */}
            <div className="relative max-w-4xl mx-auto">
              <div className="relative overflow-hidden rounded-xl shadow-2xl bg-orange-50">
                {/* Before Zaza State */}
                <div
                  className={`transition-all duration-700 ease-in-out ${showBefore ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full absolute inset-0"}`}
                >
                  <div className="aspect-video bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-8">
                    <div className="w-full max-w-2xl bg-orange-50 rounded-lg shadow-lg p-6">
                      {/* Cluttered Inbox Mockup */}
                      <div className="space-y-3">
                        <div className="flex items-center justify-between border-b pb-2">
                          <h3 className="font-semibold text-gray-800">Inbox (47 unread)</h3>
                          <div className="flex space-x-1">
                            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                          </div>
                        </div>

                        {/* Email Items */}
                        <div className="space-y-2">
                          <div className="flex items-start space-x-3 p-3 bg-red-50 rounded border-l-4 border-red-400">
                            <span className="text-red-500 font-bold">!</span>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                Sarah Johnson - URGENT: Tommy's behavior
                              </p>
                              <p className="text-xs text-slate-600 dark:text-gray-300">
                                I need to speak with you immediately about Tommy's behavior in class today. This is the
                                third incident this week and I'm very concerned about...
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded border-l-4 border-yellow-400">
                            <span className="text-yellow-500 font-bold">!</span>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                Mike Chen - Re: Homework concerns
                              </p>
                              <p className="text-xs text-slate-600 dark:text-gray-300">
                                I don't understand why Emma is getting so much homework. She's spending 3 hours every
                                night and still struggling. Can we discuss...
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start space-x-3 p-3 bg-red-50 rounded border-l-4 border-red-400">
                            <span className="text-red-500 font-bold">!</span>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                Lisa Martinez - Meeting request
                              </p>
                              <p className="text-xs text-slate-600 dark:text-gray-300">
                                We need to schedule a meeting ASAP to discuss Alex's grades. I'm not happy with the
                                current situation and need answers...
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="text-center text-xs text-slate-500 pt-2">+ 44 more unread messages</div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-red-50 p-6 text-center">
                    <p className="text-lg font-medium text-gray-800 mb-2">Overwhelmed?</p>
                    <p className="text-slate-600 dark:text-gray-300">
                      Teachers spend 1-2 hours daily managing inbox chaos.
                    </p>
                  </div>
                </div>

                {/* After Zaza State */}
                <div
                  className={`transition-all duration-700 ease-in-out ${!showBefore ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-full absolute inset-0"}`}
                >
                  <div className="aspect-video bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-8">
                    <div className="w-full max-w-2xl bg-orange-50 rounded-lg shadow-lg p-6">
                      {/* Clean Inbox Mockup */}
                      <div className="space-y-3">
                        <div className="flex items-center justify-between border-b pb-2">
                          <h3 className="font-semibold text-gray-800">Inbox (3 to review)</h3>
                          <div className="flex space-x-2">
                            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                              All caught up!
                            </span>
                          </div>
                        </div>

                        {/* Organized Categories */}
                        <div className="grid grid-cols-3 gap-2 mb-4">
                          <div className="text-center p-2 bg-blue-50 rounded">
                            <div className="text-sm font-medium text-blue-800">Parents</div>
                            <div className="text-xs text-blue-600">2 pending</div>
                          </div>
                          <div className="text-center p-2 bg-orange-100 rounded">
                            <div className="text-sm font-medium text-orange-800">Students</div>
                            <div className="text-xs text-orange-600">1 pending</div>
                          </div>
                          <div className="text-center p-2 bg-orange-50 rounded">
                            <div className="text-sm font-medium text-gray-800">Admin</div>
                            <div className="text-xs text-slate-600 dark:text-gray-300">0 pending</div>
                          </div>
                        </div>

                        {/* AI-Powered Replies */}
                        <div className="space-y-2">
                          <div className="flex items-start space-x-3 p-3 bg-green-50 rounded border-l-4 border-green-400">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center space-x-2 mb-1">
                                <p className="text-sm font-medium text-gray-900 dark:text-white">
                                  Sarah Johnson - Tommy's behavior
                                </p>
                                <span className="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded">Supportive</span>
                              </div>
                              <p className="text-xs text-slate-600 dark:text-gray-300 mb-2">AI suggested reply ready:</p>
                              <div className="bg-orange-50 p-2 rounded text-xs text-slate-700 border">
                                "Hi Sarah, I understand your concerns about Tommy. Let's schedule a brief chat tomorrow
                                after class to discuss strategies that work well for him..."
                              </div>
                            </div>
                          </div>

                          <div className="flex items-start space-x-3 p-3 bg-green-50 rounded border-l-4 border-green-400">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center space-x-2 mb-1">
                                <p className="text-sm font-medium text-gray-900 dark:text-white">
                                  Mike Chen - Homework concerns
                                </p>
                                <span className="px-2 py-0.5 bg-orange-100 text-orange-800 text-xs rounded">
                                  Empathetic
                                </span>
                              </div>
                              <p className="text-xs text-slate-600 dark:text-gray-300 mb-2">AI suggested reply ready:</p>
                              <div className="bg-orange-50 p-2 rounded text-xs text-slate-700 border">
                                "Thanks for reaching out, Mike. I hear your concerns about Emma's homework load. Let me
                                share some strategies that might help..."
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-green-50 p-6 text-center">
                    <p className="text-lg font-medium text-gray-800 mb-2">Inbox, sorted.</p>
                    <p className="text-slate-600 dark:text-gray-300">
                      Save 5+ hours per week with Zaza's AI-powered clarity.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Carousel */}
        <section id="testimonials" className="bg-orange-50 dark:bg-gray-800 px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">What Teachers Are Saying</h2>
            </div>

            <div className="relative">
              <Card className="bg-orange-50 dark:bg-gray-800 shadow-lg border-orange-100 dark:border-gray-700">
                <CardContent className="p-8 text-center">
                  <div className="mb-6">
                    <div className="mx-auto w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                      {testimonials[currentTestimonial].initials}
                    </div>
                  </div>
                  <blockquote className="text-lg text-slate-700 mb-4 italic">
                    "{testimonials[currentTestimonial].quote}"
                  </blockquote>
                  <cite className="text-slate-600 dark:text-gray-300 not-italic">
                    <div className="font-semibold">{testimonials[currentTestimonial].author}</div>
                    <div className="text-sm">{testimonials[currentTestimonial].role}</div>
                  </cite>
                </CardContent>
              </Card>

              <div className="flex justify-center space-x-4 mt-6">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={prevTestimonial}
                  className="rounded-full p-2 bg-transparent border-orange-200 hover:bg-orange-100"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={nextTestimonial}
                  className="rounded-full p-2 bg-transparent border-orange-200 hover:bg-orange-100"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative overflow-hidden bg-gradient-to-r from-orange-500 to-orange-600 px-4 py-16 sm:px-6 lg:px-8">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-white/5 animate-pulse" />
            <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/20 rounded-full animate-bounce" />
            <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-white/30 rounded-full animate-ping" />
            <div className="absolute top-1/2 left-3/4 w-1.5 h-1.5 bg-white/25 rounded-full animate-pulse" />
          </div>
          <div className="relative mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold text-white sm:text-4xl mb-6">Ready to feel confident in your inbox?</h2>
            <Button size="lg" className="bg-white text-orange-600 hover:bg-orange-50 px-8 py-3 text-lg font-semibold">
              Join the Waitlist - Get Early Access
            </Button>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-orange-50 dark:bg-gray-800 px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl mb-4">
                Frequently Asked Questions
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-orange-600 mx-auto rounded-full"></div>
            </div>

            <div className="space-y-4">
              {[
                {
                  question: "What is Zaza Inbox?",
                  answer:
                    "Zaza Inbox is an AI-powered communication assistant designed to help teachers manage parent, student, and admin messages with clarity, empathy, and speed.",
                },
                {
                  question: "How does the AI know what to say?",
                  answer:
                    "The AI uses GPT-4 and your selected tone (e.g. professional, friendly, assertive) to draft messages based on your past communication style, saved responses, and message history.",
                },
                {
                  question: "Isn't using AI to write emails considered cheating?",
                  answer:
                    "Not at all. Zaza Inbox is a support tool – you remain in full control. Think of it like Grammarly or spell-check (but better) for tone and clarity. You approve every message before sending, so the final voice is always yours.",
                },
                {
                  question: "Is Zaza Inbox safe to use with sensitive student data?",
                  answer:
                    "Yes - Zaza Inbox is fully GDPR compliant and US FERPA safe. All data is encrypted and securely stored following education data protection standards.",
                },
                {
                  question: "Do I have to use the AI suggestions?",
                  answer:
                    "Not at all. You can edit, reject, or rewrite any draft before sending. You're always in control of what gets sent.",
                },
                {
                  question: "Can I connect Zaza Inbox to my existing email or LMS system?",
                  answer:
                    "We're working on integrations with platforms like Gmail, Outlook, and Google Classroom. Let us know what integrations you need!",
                },
                {
                  question: "Does this work on mobile devices?",
                  answer: "Absolutely - Zaza Inbox is fully responsive and works on your phone, tablet, or laptop.",
                },
                {
                  question: "How much does it cost?",
                  answer:
                    "You can try Zaza Inbox for free. Paid plans start from $14.99/month for unlimited messages and priority AI support.",
                },
                {
                  question: "Is this only for teachers?",
                  answer:
                    "While designed for educators, Zaza Inbox can also be helpful for school administrators, coaches, and learning support staff who manage regular communications.",
                },
              ].map((faq, index) => (
                <FAQItem key={index} question={faq.question} answer={faq.answer} />
              ))}
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="border-t border-orange-200"></div>

        <footer className="bg-slate-900 text-slate-50 px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 mb-12">
              {/* Column 1 - Zaza Inbox */}
              <div className="sm:col-span-2 lg:col-span-1">
                <div className="flex items-center space-x-3 mb-4">
                  <img src="/images/zaza-logo.png" alt="Zaza Technologies Logo" className="h-8 w-8" />
                  <div className="text-xl font-bold text-slate-50">
                    Zaza{" "}
                    <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                      Inbox
                    </span>
                  </div>
                </div>
                <p className="text-slate-300 text-sm mb-6 leading-relaxed max-w-xs">
                  The AI inbox assistant built by educators to save you hours every week.
                </p>
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-4 py-2 text-sm font-medium shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  Start Free
                </Button>
              </div>

              {/* Column 2 - Support */}
              <div>
                <h4 className="font-semibold mb-6 text-slate-50 text-base">Support</h4>
                <ul className="space-y-4 text-slate-300 text-sm">
                  <li>
                    <a href="#" className="hover:text-orange-400 transition-colors duration-200 flex items-center">
                      Contact Us
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-orange-400 transition-colors duration-200 flex items-center">
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-orange-400 transition-colors duration-200 flex items-center">
                      Terms of Use
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-orange-400 transition-colors duration-200 flex items-center">
                      Help Centre
                    </a>
                  </li>
                </ul>
              </div>

              {/* Column 3 - Trust & Security */}
              <div>
                <h4 className="font-semibold mb-6 text-slate-50 text-base">Trust & Security</h4>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">🔒</span>
                    <span className="text-slate-300 text-sm">GDPR Compliant</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">🛡️</span>
                    <span className="text-slate-300 text-sm">FERPA Safe</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">❤️</span>
                    <span className="text-slate-300 text-sm">Built by Educators</span>
                  </div>
                </div>
              </div>

              {/* Column 4 - Zaza Ecosystem */}
              <div>
                <h4 className="font-semibold mb-6 text-slate-50 text-base">Zaza Ecosystem</h4>
                <ul className="space-y-4 text-slate-300 text-sm">
                  <li>
                    <a href="#" className="hover:text-orange-400 transition-colors duration-200">
                      Zaza Teach
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-orange-400 transition-colors duration-200">
                      Zaza Promptly
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-orange-400 font-medium hover:text-orange-300 transition-colors duration-200"
                    >
                      Zaza Inbox
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-orange-400 transition-colors duration-200">
                      Zaza Visuals
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-orange-400 transition-colors duration-200">
                      Zaza ClarityDeck
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-orange-400 transition-colors duration-200">
                      Zaza Schwoop
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Bottom Footer */}
            <div className="border-t border-slate-700 pt-8">
              <div className="text-center space-y-3">
                <p className="text-slate-400 text-sm">
                  © 2025 Zaza Technologies UG (haftungsbeschränkt). All rights reserved.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-8">
                  <p className="text-slate-400 text-sm flex items-center">
                    Made with <span className="mx-1">💙</span> by teachers, for teachers.
                  </p>
                  <div className="flex items-center space-x-2 text-slate-400 text-sm">
                    <span>🛡️</span>
                    <span>Trusted by educators worldwide</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </Layout>
    </>
  )
}
