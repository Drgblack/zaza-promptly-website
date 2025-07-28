// SEO meta tags injected by automation
"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { BookOpen, Brain, Trophy, Heart, Menu, X, CheckCircle, Gamepad2, Zap, Target, Rocket } from "lucide-react"
import { Layout } from "@zaza/shared-components"
import Head from "next/head";
import { BRAND_NAME, DEFAULT_DESCRIPTION, DEFAULT_OG_IMAGE, BASE_URL } from "@zaza/shared-components/lib/seo";

export default function ZazaStudyLanding() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")

  const handleWaitlistSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Waitlist signup:", { name, email })
    setName("")
    setEmail("")
    alert("Thanks for joining our waitlist! We'll be in touch soon.")
  }

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" })
    setIsMenuOpen(false)
  }

  const scrollToWaitlist = () => {
    document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <>
      <Head>
        <title>Zaza Study | {BRAND_NAME}</title>
        <meta name="description" content="Zaza Study: AI-powered study planning and optimization. {DEFAULT_DESCRIPTION}" />
        <meta property="og:title" content="Zaza Study | {BRAND_NAME}" />
        <meta property="og:description" content="Zaza Study: AI-powered study planning and optimization. {DEFAULT_DESCRIPTION}" />
        <meta property="og:image" content={DEFAULT_OG_IMAGE} />
        <meta property="og:url" content={`${BASE_URL}/zaza-study-landing`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Zaza Study | {BRAND_NAME}" />
        <meta name="twitter:description" content="Zaza Study: AI-powered study planning and optimization. {DEFAULT_DESCRIPTION}" />
        <meta name="twitter:image" content={DEFAULT_OG_IMAGE} />
      </Head>
      <Layout currentProduct="Study">
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-white">
          {/* Hero Section */}
          <section className="py-20 px-6 overflow-hidden">
            <div className="container mx-auto max-w-7xl">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                {/* Left Content */}
                <div className="text-center lg:text-left space-y-8">
                  {/* Interactive Announcement Banner */}
                  <button
                    onClick={scrollToWaitlist}
                    className="group inline-flex items-center space-x-2 bg-gradient-to-r from-pink-100 to-purple-100 hover:from-pink-200 hover:to-purple-200 text-pink-700 border-2 border-pink-200 hover:border-pink-300 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer"
                  >
                    <Rocket className="w-4 h-4 group-hover:animate-bounce" />
                    <span>🚀 Coming Soon - Join the Waitlist!</span>
                    <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse"></div>
                  </button>

                  {/* Main Heading */}
                  <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                    <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-purple-700 bg-clip-text text-transparent animate-gradient">
                      Gamified AI Study Help
                    </span>
                    <br />
                    <span className="text-gray-800">That Actually Works</span>
                  </h1>

                  {/* Subheading */}
                  <p className="text-xl md:text-2xl text-gray-600 font-medium leading-relaxed">
                    Zaza Study is your AI-powered learning companion - built to reduce stress, increase motivation, and help
                    you achieve better grades.
                  </p>

                  {/* Description */}
                  <p className="text-lg text-gray-500 leading-relaxed">
                    Say goodbye to late-night study battles. Zaza Study makes learning fun, social, and effective - backed
                    by science.
                  </p>

                  {/* Email Signup Form */}
                  <form
                    onSubmit={handleWaitlistSubmit}
                    className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto lg:mx-0"
                  >
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="flex-1 rounded-full border-2 border-purple-200 focus:border-purple-400 px-6 py-3 text-lg transition-all duration-200 hover:border-purple-300"
                    />
                    <Button
                      type="submit"
                      className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-full px-8 py-3 font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200 whitespace-nowrap hover:scale-105 btn-primary"
                    >
                      Get Early Access
                    </Button>
                  </form>

                  {/* Trust Indicators */}
                  <div className="flex flex-wrap justify-center lg:justify-start items-center gap-6 text-sm text-gray-500">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span>No spam, ever</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                      <span>Early bird pricing</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                      <span>Beta access first</span>
                    </div>
                  </div>
                </div>

                {/* Right Visual - Animated Phone Mockup */}
                <div className="relative flex justify-center lg:justify-end">
                  <div className="relative">
                    {/* Phone Frame */}
                    <div className="relative w-80 h-[600px] bg-gradient-to-br from-gray-800 to-gray-900 rounded-[3rem] p-3 shadow-2xl animate-float hover:animate-bounce-gentle transition-all duration-300">
                      {/* Screen */}
                      <div className="w-full h-full bg-gradient-to-br from-purple-500 via-pink-500 to-purple-600 rounded-[2.5rem] overflow-hidden relative animate-pulse-glow">
                        {/* Status Bar */}
                        <div className="flex justify-between items-center px-6 py-3 text-white text-sm">
                          <span className="font-semibold">9:41</span>
                          <div className="flex space-x-1">
                            <div className="w-4 h-2 bg-white rounded-sm opacity-80"></div>
                            <div className="w-4 h-2 bg-white rounded-sm opacity-60"></div>
                            <div className="w-4 h-2 bg-white rounded-sm opacity-40"></div>
                          </div>
                        </div>

                        {/* App Content */}
                        <div className="px-6 py-4 text-white space-y-6">
                          {/* Header */}
                          <div className="text-center">
                            <h3 className="text-2xl font-bold mb-2 animate-bounce-gentle">Smart Study Sessions</h3>
                            <p className="text-lg opacity-90">AI-powered learning for Gen Z</p>
                          </div>

                          {/* Progress Section */}
                          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 space-y-4 hover:bg-white/30 transition-all duration-300">
                            <div className="flex justify-between items-center">
                              <span className="font-semibold">Today's Progress</span>
                              <span className="text-sm opacity-80 bg-yellow-400/20 px-2 py-1 rounded-full">Level 12</span>
                            </div>

                            {/* Animated Progress Bar */}
                            <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
                              <div
                                className="bg-gradient-to-r from-yellow-400 to-orange-400 h-3 rounded-full animate-pulse transition-all duration-1000"
                                style={{ width: "75%" }}
                              ></div>
                            </div>

                            <div className="flex justify-between text-sm">
                              <span>750 / 1000 XP</span>
                              <span className="text-green-300 font-semibold">75% Complete</span>
                            </div>
                          </div>

                          {/* Subject Cards */}
                          <div className="space-y-3">
                            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 flex items-center justify-between hover:bg-white/30 transition-all duration-300 hover:scale-105">
                              <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-blue-400 rounded-lg flex items-center justify-center animate-bounce-gentle">
                                  <span className="text-white font-bold">📊</span>
                                </div>
                                <div>
                                  <p className="font-semibold">Math</p>
                                  <p className="text-sm opacity-80">Algebra II</p>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="font-bold text-green-300 animate-pulse">+25 XP</p>
                                <p className="text-xs opacity-80">Completed</p>
                              </div>
                            </div>

                            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 flex items-center justify-between hover:bg-white/30 transition-all duration-300 hover:scale-105">
                              <div className="flex items-center space-x-3">
                                <div
                                  className="w-10 h-10 bg-green-400 rounded-lg flex items-center justify-center animate-bounce-gentle"
                                  style={{ animationDelay: "0.5s" }}
                                >
                                  <span className="text-white font-bold">🧪</span>
                                </div>
                                <div>
                                  <p className="font-semibold">Chemistry</p>
                                  <p className="text-sm opacity-80">In Progress</p>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="font-bold text-yellow-300 animate-pulse">+15 XP</p>
                                <p className="text-xs opacity-80">80% Done</p>
                              </div>
                            </div>
                          </div>

                          {/* Achievement Badge */}
                          <div className="text-center">
                            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-800 rounded-full px-4 py-2 font-bold animate-bounce hover:scale-110 transition-all duration-300 cursor-pointer">
                              <Trophy className="w-5 h-5" />
                              <span>Study Streak: 7 days!</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Enhanced Floating UI Elements */}
                    <div
                      className="absolute -top-4 -right-4 bg-white rounded-2xl p-4 shadow-xl animate-bounce hover:scale-110 transition-all duration-300 cursor-pointer"
                      style={{ animationDelay: "1s" }}
                    >
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="font-bold text-green-600">+50 XP</span>
                      </div>
                    </div>

                    <div
                      className="absolute -bottom-4 -left-4 bg-white rounded-2xl p-4 shadow-xl animate-bounce hover:scale-110 transition-all duration-300 cursor-pointer"
                      style={{ animationDelay: "2s" }}
                    >
                      <div className="flex items-center space-x-2">
                        <Zap className="w-5 h-5 text-purple-500" />
                        <span className="font-bold text-purple-600">Level Up!</span>
                      </div>
                    </div>

                    <div
                      className="absolute top-1/3 -left-8 bg-white rounded-2xl p-3 shadow-xl animate-bounce hover:scale-110 transition-all duration-300 cursor-pointer"
                      style={{ animationDelay: "0.5s" }}
                    >
                      <div className="flex items-center space-x-2">
                        <Target className="w-4 h-4 text-pink-500" />
                        <span className="text-sm font-bold text-pink-600">Goal Reached!</span>
                      </div>
                    </div>

                    {/* Enhanced Background Decorative Elements */}
                    <div className="absolute -top-8 -left-8 w-24 h-24 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20 animate-pulse hover:opacity-30 transition-all duration-300"></div>
                    <div
                      className="absolute -bottom-8 -right-8 w-32 h-32 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full opacity-20 animate-pulse hover:opacity-30 transition-all duration-300"
                      style={{ animationDelay: "1s" }}
                    ></div>
                    <div
                      className="absolute top-1/2 -right-12 w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full opacity-30 animate-pulse hover:opacity-40 transition-all duration-300"
                      style={{ animationDelay: "2s" }}
                    ></div>

                    {/* Sparkle Effects */}
                    <div className="absolute top-8 right-8 w-3 h-3 bg-white rounded-full opacity-80 animate-ping"></div>
                    <div
                      className="absolute bottom-12 left-12 w-2 h-2 bg-yellow-300 rounded-full opacity-90 animate-ping"
                      style={{ animationDelay: "1s" }}
                    ></div>
                    <div
                      className="absolute top-1/2 right-4 w-2 h-2 bg-pink-300 rounded-full opacity-70 animate-ping"
                      style={{ animationDelay: "2s" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* How It Works */}
          <section id="how-it-works" className="py-20 px-6 bg-white/70">
            <div className="container mx-auto max-w-6xl">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    How It Works
                  </span>
                </h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  Three simple steps to transform your learning experience
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                <Card className="text-center p-8 rounded-3xl border-0 shadow-xl bg-gradient-to-br from-purple-50 to-pink-50 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 card-hover">
                  <CardContent className="pt-6">
                    <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 hover:scale-110 transition-all duration-300">
                      <BookOpen className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-gray-800">1. Choose Your Subject</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Pick any school subject or homework area. From math to science, we've got comprehensive coverage.
                    </p>
                  </CardContent>
                </Card>

                <Card className="text-center p-8 rounded-3xl border-0 shadow-xl bg-gradient-to-br from-pink-50 to-purple-50 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 card-hover">
                  <CardContent className="pt-6">
                    <div className="w-20 h-20 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6 hover:scale-110 transition-all duration-300">
                      <Brain className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-gray-800">2. AI-Powered Learning</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Get personalized tutoring, adaptive quizzes, and study paths tailored to your unique learning style.
                    </p>
                  </CardContent>
                </Card>

                <Card className="text-center p-8 rounded-3xl border-0 shadow-xl bg-gradient-to-br from-purple-50 to-pink-50 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 card-hover">
                  <CardContent className="pt-6">
                    <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 hover:scale-110 transition-all duration-300">
                      <Trophy className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-gray-800">3. Level Up & Achieve</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Earn XP, unlock achievements, and compete with friends in a safe, motivating environment.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Benefits */}
          <section id="benefits" className="py-20 px-6">
            <div className="container mx-auto max-w-6xl">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Benefits for Everyone
                  </span>
                </h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  Designed to work for students, parents, and educators
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-12">
                {/* Students Benefits */}
                <Card className="p-8 rounded-3xl border-0 shadow-xl bg-gradient-to-br from-blue-50 to-purple-50 hover:shadow-2xl transition-all duration-300 card-hover">
                  <CardContent className="pt-6">
                    <div className="flex items-center mb-6">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mr-4 hover:scale-110 transition-all duration-300">
                        <Gamepad2 className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-3xl font-bold text-gray-800">For Students</h3>
                    </div>
                    <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                      Fun and motivating. Learn smarter, not harder. Like your favorite game, but for school.
                    </p>
                    <ul className="space-y-4">
                      <li className="flex items-center">
                        <CheckCircle className="w-6 h-6 text-green-500 mr-4 flex-shrink-0" />
                        <span className="text-gray-600">Interactive AI tutoring that adapts to your learning style</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-6 h-6 text-green-500 mr-4 flex-shrink-0" />
                        <span className="text-gray-600">Earn badges, XP, and level up as you master concepts</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-6 h-6 text-green-500 mr-4 flex-shrink-0" />
                        <span className="text-gray-600">Study with friends and compete in a safe environment</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-6 h-6 text-green-500 mr-4 flex-shrink-0" />
                        <span className="text-gray-600">Get instant help when you're stuck on problems</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Parents Benefits */}
                <Card className="p-8 rounded-3xl border-0 shadow-xl bg-gradient-to-br from-pink-50 to-red-50 hover:shadow-2xl transition-all duration-300 card-hover">
                  <CardContent className="pt-6">
                    <div className="flex items-center mb-6">
                      <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center mr-4 hover:scale-110 transition-all duration-300">
                        <Heart className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-3xl font-bold text-gray-800">For Parents</h3>
                    </div>
                    <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                      Build study habits without nagging. Track progress. Reduce family stress.
                    </p>
                    <ul className="space-y-4">
                      <li className="flex items-center">
                        <CheckCircle className="w-6 h-6 text-green-500 mr-4 flex-shrink-0" />
                        <span className="text-gray-600">Weekly progress reports and detailed insights</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-6 h-6 text-green-500 mr-4 flex-shrink-0" />
                        <span className="text-gray-600">Reduce homework battles and family stress</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-6 h-6 text-green-500 mr-4 flex-shrink-0" />
                        <span className="text-gray-600">Safe, monitored learning environment with privacy controls</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-6 h-6 text-green-500 mr-4 flex-shrink-0" />
                        <span className="text-gray-600">See real improvement in grades and confidence</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Waitlist Section */}
          <section id="waitlist" className="py-20 px-6">
            <div className="container mx-auto max-w-4xl text-center">
              <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 rounded-3xl p-12 text-white shadow-2xl relative overflow-hidden hover:shadow-3xl transition-all duration-300">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-10 left-10 w-20 h-20 border-2 border-white rounded-full animate-pulse"></div>
                  <div
                    className="absolute bottom-10 right-10 w-16 h-16 border-2 border-white rounded-full animate-pulse"
                    style={{ animationDelay: "1s" }}
                  ></div>
                  <div
                    className="absolute top-1/2 right-20 w-12 h-12 border-2 border-white rounded-full animate-pulse"
                    style={{ animationDelay: "2s" }}
                  ></div>
                </div>

                <div className="relative z-10">
                  <h2 className="text-4xl md:text-5xl font-bold mb-6">Be the First to Try Zaza Study</h2>
                  <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                    Join our waitlist and get exclusive early access when we launch. Plus, special pricing for early
                    adopters!
                  </p>

                  <form onSubmit={handleWaitlistSubmit} className="max-w-md mx-auto">
                    <div className="space-y-4">
                      <Input
                        type="text"
                        placeholder="Your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="rounded-full bg-white/20 border-white/30 text-white placeholder:text-white/70 focus:bg-white/30 py-3 px-6 transition-all duration-200 hover:bg-white/25"
                      />
                      <Input
                        type="email"
                        placeholder="Your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="rounded-full bg-white/20 border-white/30 text-white placeholder:text-white/70 focus:bg-white/30 py-3 px-6 transition-all duration-200 hover:bg-white/25"
                      />
                      <Button
                        type="submit"
                        className="w-full bg-white text-purple-600 hover:bg-gray-100 rounded-full py-3 font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 btn-primary"
                      >
                        Join the Waitlist
                      </Button>
                    </div>
                  </form>

                  <p className="text-sm mt-6 opacity-75">We'll only send you launch updates. No spam, promise! 🤝</p>

                  {/* Trust badges */}
                  <div className="flex justify-center items-center space-x-6 mt-8 text-sm opacity-80">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span>Early bird pricing</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                      <span>Beta access first</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                      <span>Exclusive updates</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* FAQs */}
          <section id="faqs" className="py-20 px-6 bg-white/70">
            <div className="container mx-auto max-w-4xl">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Frequently Asked Questions
                  </span>
                </h2>
                <p className="text-xl text-gray-600">Everything you need to know about Zaza Study</p>
              </div>

              <Accordion type="single" collapsible className="space-y-4">
                <AccordionItem
                  value="item-1"
                  className="bg-white rounded-2xl border-0 shadow-lg px-6 hover:shadow-xl transition-all duration-300"
                >
                  <AccordionTrigger className="text-left font-semibold text-gray-800 text-lg hover:text-purple-600 transition-colors">
                    Is Zaza Study safe for kids?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 leading-relaxed">
                    Zaza Study is designed with safety and privacy as our top priorities. We use industry-standard
                    encryption, never share personal data, and provide parents with full visibility and control over their
                    child's learning experience. All interactions are monitored and age-appropriate.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem
                  value="item-2"
                  className="bg-white rounded-2xl border-0 shadow-lg px-6 hover:shadow-xl transition-all duration-300"
                >
                  <AccordionTrigger className="text-left font-semibold text-gray-800 text-lg hover:text-purple-600 transition-colors">
                    When does Zaza Study launch?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 leading-relaxed">
                    We're currently in beta testing with select families. Public beta access starts in early 2025 – join our
                    waitlist to be among the first to try Zaza Study and help shape the future of learning!
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem
                  value="item-3"
                  className="bg-white rounded-2xl border-0 shadow-lg px-6 hover:shadow-xl transition-all duration-300"
                >
                  <AccordionTrigger className="text-left font-semibold text-gray-800 text-lg hover:text-purple-600 transition-colors">
                    What age groups is Zaza Study designed for?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 leading-relaxed">
                    Zaza Study is specifically designed for students aged 10-18, covering elementary through high school
                    subjects. Our adaptive AI personalizes the experience for each age group, ensuring age-appropriate
                    content and interactions.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem
                  value="item-4"
                  className="bg-white rounded-2xl border-0 shadow-lg px-6 hover:shadow-xl transition-all duration-300"
                >
                  <AccordionTrigger className="text-left font-semibold text-gray-800 text-lg hover:text-purple-600 transition-colors">
                    How much will Zaza Study cost?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 leading-relaxed">
                    We're committed to making quality education accessible to all families. Pricing will be announced closer
                    to launch, but we're planning affordable subscription options with family discounts. Waitlist members
                    will receive special early-bird pricing!
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem
                  value="item-5"
                  className="bg-white rounded-2xl border-0 shadow-lg px-6 hover:shadow-xl transition-all duration-300"
                >
                  <AccordionTrigger className="text-left font-semibold text-gray-800 text-lg hover:text-purple-600 transition-colors">
                    What subjects does Zaza Study cover?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 leading-relaxed">
                    Zaza Study covers all major school subjects including Math, Science, English, History, and more. Our AI
                    adapts to different curricula and can help with homework, test prep, concept reinforcement, and skill
                    building across all grade levels.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </section>

          {/* Contact Section */}
          <section id="contact" className="py-20 px-6">
            <div className="container mx-auto max-w-4xl text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Get in Touch
                </span>
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
              </p>
              <Button
                onClick={scrollToWaitlist}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-full px-8 py-3 font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
              >
                Join Our Community
              </Button>
            </div>
          </section>
        </div>
      </Layout>
    </>
  )
}
