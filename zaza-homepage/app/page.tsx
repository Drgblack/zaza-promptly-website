// SEO meta tags injected by automation
"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Heart, GraduationCap, Lightbulb, ChevronRight, Quote } from "lucide-react"
import Head from "next/head";
import { BRAND_NAME, DEFAULT_DESCRIPTION, DEFAULT_OG_IMAGE, BASE_URL } from "@zaza/shared-components/lib/seo";

export default function HomePage() {
  const products = [
    {
      name: "Zaza Promptly",
      description: "Write 100 report comments in minutes — hallucination-safe, tone-aware, and teacher-trusted.",
      icon: "📝",
      href: "/promptly",
      cta: "Learn More",
      color:
        "bg-blue-50 border-blue-200 hover:border-blue-300 hover:shadow-blue-100 dark:bg-blue-950/20 dark:border-blue-800 dark:hover:border-blue-700",
      iconBg: "bg-blue-100 dark:bg-blue-900/30",
      ctaColor: "bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700",
    },
    {
      name: "Zaza Teach",
      description: "Plan lessons in seconds with AI that understands curriculum, context, and creativity.",
      icon: "📚",
      href: "/teach",
      cta: "Learn More",
      color:
        "bg-green-50 border-green-200 hover:border-green-300 hover:shadow-green-100 dark:bg-green-950/20 dark:border-green-800 dark:hover:border-green-700",
      iconBg: "bg-green-100 dark:bg-green-900/30",
      ctaColor: "bg-green-600 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700",
    },
    {
      name: "Zaza Visuals",
      description: "Create classroom-ready posters, slides, and visuals in seconds.",
      icon: "🎨",
      href: "/visuals",
      cta: "Notify Me",
      comingSoon: true,
      color:
        "bg-purple-50 border-purple-200 hover:border-purple-300 hover:shadow-purple-100 dark:bg-purple-950/20 dark:border-purple-800 dark:hover:border-purple-700",
      iconBg: "bg-purple-100 dark:bg-purple-900/30",
      ctaColor: "bg-purple-600 hover:bg-purple-700 dark:bg-purple-600 dark:hover:bg-purple-700",
    },
    {
      name: "Zaza Study",
      description: "AI-powered study assistant. Gamified, social, and built for deep learning.",
      icon: "🎓",
      href: "/study",
      cta: "Notify Me",
      comingSoon: true,
      color:
        "bg-cyan-50 border-cyan-200 hover:border-cyan-300 hover:shadow-cyan-100 dark:bg-cyan-950/20 dark:border-cyan-800 dark:hover:border-cyan-700",
      iconBg: "bg-gradient-to-br from-cyan-400 to-blue-600",
      ctaColor: "bg-cyan-600 hover:bg-cyan-700 dark:bg-cyan-600 dark:hover:bg-cyan-700",
    },
    {
      name: "Zaza HR Spark",
      description: "AI-powered onboarding, training, and employee messaging built for real-world HR.",
      icon: "💼",
      href: "/hr-spark",
      cta: "Learn More",
      comingSoon: true,
      color:
        "bg-orange-50 border-orange-200 hover:border-orange-300 hover:shadow-orange-100 dark:bg-orange-950/20 dark:border-orange-800 dark:hover:border-orange-700",
      iconBg: "bg-orange-100 dark:bg-orange-900/30",
      ctaColor: "bg-orange-600 hover:bg-orange-700 dark:bg-orange-600 dark:hover:bg-orange-700",
    },
    {
      name: "Zaza Coach",
      description: "AI-powered performance reviews and coaching built for human connection.",
      icon: "🧠",
      href: "/coach",
      cta: "Notify Me",
      comingSoon: true,
      color:
        "bg-teal-50 border-teal-200 hover:border-teal-300 hover:shadow-teal-100 dark:bg-teal-950/20 dark:border-teal-800 dark:hover:border-teal-700",
      iconBg: "bg-teal-100 dark:bg-teal-900/30",
      ctaColor: "bg-teal-600 hover:bg-teal-700 dark:bg-teal-600 dark:hover:bg-teal-700",
    },
  ]

  const values = [
    {
      title: "Human-Centred",
      description: "AI that amplifies human creativity and connection, never replaces it",
      icon: <Heart className="h-12 w-12 text-red-500 dark:text-red-400" />,
    },
    {
      title: "Pedagogically Sound",
      description: "Built on proven educational research and best practices",
      icon: <BookOpen className="h-12 w-12 text-blue-500 dark:text-blue-400" />,
    },
    {
      title: "Built by Educators",
      description: "Created by teachers, for teachers, with real classroom experience",
      icon: <GraduationCap className="h-12 w-12 text-green-500 dark:text-green-400" />,
    },
  ]

  const classroomVoices = [
    {
      quote: "Zaza has given me back my evenings. I can focus on what matters most - my students.",
      author: "Maria Santos",
      role: "3rd Grade Teacher",
      school: "Riverside Elementary",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face",
    },
    {
      quote: "The AI understands my teaching style. It's like having a co-teacher who never gets tired.",
      author: "David Kim",
      role: "High School Math Teacher",
      school: "Central High School",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    },
    {
      quote: "My students are more engaged than ever. Zaza helps me create lessons they actually want to learn.",
      author: "Jennifer Walsh",
      role: "Middle School Science",
      school: "Oak Valley Middle",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    },
    {
      quote: "Finally, technology that actually makes teaching easier, not harder.",
      author: "Robert Chen",
      role: "Elementary Principal",
      school: "Maple Grove Elementary",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    },
    {
      quote: "I've rediscovered my passion for teaching. Zaza handles the busy work so I can inspire.",
      author: "Amanda Foster",
      role: "English Teacher",
      school: "Westfield High School",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
    },
    {
      quote: "The time I save on planning goes straight back to my students. That's what teaching should be.",
      author: "Michael Torres",
      role: "4th Grade Teacher",
      school: "Sunshine Elementary",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    },
  ]

  return (
    <>
      <Head>
        <title>Zaza Homepage | {BRAND_NAME}</title>
        <meta name="description" content="Welcome to Zaza Technologies: AI-powered tools for education, HR, and more. {DEFAULT_DESCRIPTION}" />
        <meta property="og:title" content="Zaza Homepage | {BRAND_NAME}" />
        <meta property="og:description" content="Welcome to Zaza Technologies: AI-powered tools for education, HR, and more. {DEFAULT_DESCRIPTION}" />
        <meta property="og:image" content={DEFAULT_OG_IMAGE} />
        <meta property="og:url" content={`${BASE_URL}/`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Zaza Homepage | {BRAND_NAME}" />
        <meta name="twitter:description" content="Welcome to Zaza Technologies: AI-powered tools for education, HR, and more. {DEFAULT_DESCRIPTION}" />
        <meta name="twitter:image" content={DEFAULT_OG_IMAGE} />
      </Head>
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">

        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-blue-100 via-blue-50/50 to-purple-100 dark:from-blue-900/30 dark:via-gray-900 dark:to-purple-900/30 py-12 sm:py-16 md:py-20 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto text-center">
            <Badge variant="secondary" className="mb-6 px-4 py-2 text-sm font-medium dark:bg-gray-800 dark:text-gray-300">
              Trusted by 10,000+ educators worldwide
            </Badge>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              Human-Centred AI,{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Built for the Classroom
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Zaza Technologies helps teachers thrive with ethical, purpose-built AI tools that save time, reduce burnout,
              and bring back the joy of teaching.
            </p>
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 text-base sm:px-8 sm:py-4 sm:text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={() => document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })}
            >
              Explore Our Products
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </section>

        {/* Products Section */}
        <section id="products" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Explore the Zaza Suite
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Discover our comprehensive collection of AI-powered tools designed specifically for educators and HR
                professionals
              </p>
            </div>

            {/* Responsive Grid - 3 cols desktop, 2 cols tablet, 1 col mobile */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {/* Card 1: Zaza Promptly */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 relative group hover:-translate-y-1 border border-gray-100 dark:border-gray-700 flex flex-col justify-between h-full min-h-[24rem]">
                <div className="text-center">
                  {/* Icon with Lavender Halo */}
                  <div className="relative mb-6">
                    <div className="w-20 h-20 bg-purple-100 dark:bg-purple-900/30 rounded-2xl mx-auto flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-300">
                      <span className="text-4xl">📝</span>
                    </div>
                  </div>

                  {/* Product Name */}
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Zaza Promptly</h3>

                  {/* One-line Descriptor */}
                  <p className="text-lg font-medium text-gray-600 dark:text-gray-300 mb-4">
                    Instantly generate engaging lesson plans and activities.
                  </p>

                  {/* Detailed Description */}
                  <p className="text-gray-600 dark:text-gray-400 text-base leading-relaxed mb-6 min-h-[3rem]">
                    Write 100 report comments in minutes—hallucination-safe, tone-aware, and teacher-trusted.
                  </p>

                  {/* CTA Button */}
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 hover:shadow-lg">
                    Learn More
                  </button>
                </div>
              </div>

              {/* Card 2: Zaza Teach */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 relative group hover:-translate-y-1 border border-gray-100 dark:border-gray-700 flex flex-col justify-between h-full min-h-[24rem]">
                <div className="text-center">
                  {/* Icon with Blue Halo */}
                  <div className="relative mb-6">
                    <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/30 rounded-2xl mx-auto flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-300">
                      <span className="text-4xl">📚</span>
                    </div>
                  </div>

                  {/* Product Name */}
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Zaza Teach</h3>

                  {/* One-line Descriptor */}
                  <p className="text-lg font-medium text-gray-600 dark:text-gray-300 mb-4">
                    Streamline classroom management and student collaboration.
                  </p>

                  {/* Detailed Description */}
                  <p className="text-gray-600 dark:text-gray-400 text-base leading-relaxed mb-6 min-h-[3rem]">
                    Plan lessons in seconds with AI that understands curriculum, context, and creativity.
                  </p>

                  {/* CTA Button */}
                  <button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 hover:shadow-lg">
                    Learn More
                  </button>
                </div>
              </div>

              {/* Card 3: Zaza Visuals (Coming Soon) */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 relative group hover:-translate-y-1 border border-gray-100 dark:border-gray-700 flex flex-col justify-between h-full min-h-[24rem]">
                {/* Coming Soon Badge */}
                <div className="absolute top-4 right-4 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs px-3 py-1 rounded-full font-medium">
                  Coming Soon
                </div>

                <div className="text-center">
                  {/* Icon with Peach Halo */}
                  <div className="relative mb-6">
                    <div className="w-20 h-20 bg-orange-100 dark:bg-orange-900/30 rounded-2xl mx-auto flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-300">
                      <span className="text-4xl">🎨</span>
                    </div>
                  </div>

                  {/* Product Name */}
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Zaza Visuals</h3>

                  {/* One-line Descriptor */}
                  <p className="text-lg font-medium text-gray-600 dark:text-gray-300 mb-4">
                    Transform text into engaging classroom visuals.
                  </p>

                  {/* Detailed Description */}
                  <p className="text-gray-600 dark:text-gray-400 text-base leading-relaxed mb-6 min-h-[3rem]">
                    Create classroom-ready posters, slides, and visuals in seconds.
                  </p>

                  {/* CTA Button - Outlined */}
                  <button className="w-full border-2 border-orange-300 dark:border-orange-600 text-orange-600 dark:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-900/20 font-semibold py-3 px-6 rounded-lg transition-all duration-300">
                    Get Early Access
                  </button>
                </div>
              </div>

              {/* Card 4: Zaza Study (Coming Soon) */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 relative group hover:-translate-y-1 border border-gray-100 dark:border-gray-700 flex flex-col justify-between h-full min-h-[24rem]">
                {/* Coming Soon Badge */}
                <div className="absolute top-4 right-4 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs px-3 py-1 rounded-full font-medium">
                  Coming Soon
                </div>

                <div className="text-center">
                  {/* Icon with Blue-Green Gradient Halo */}
                  <div className="relative mb-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-2xl mx-auto flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-300">
                      <span className="text-4xl">🎓</span>
                    </div>
                  </div>

                  {/* Product Name */}
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Zaza Study</h3>

                  {/* One-line Descriptor */}
                  <p className="text-lg font-medium text-gray-600 dark:text-gray-300 mb-4">
                    Gamified learning with AI-powered study assistance.
                  </p>

                  {/* Detailed Description */}
                  <p className="text-gray-600 dark:text-gray-400 text-base leading-relaxed mb-6 min-h-[3rem]">
                    AI-powered study assistant. Gamified, social, and built for deep learning.
                  </p>

                  {/* CTA Button - Outlined */}
                  <button className="w-full border-2 border-orange-300 dark:border-orange-600 text-orange-600 dark:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-900/20 font-semibold py-3 px-6 rounded-lg transition-all duration-300">
                    Get Early Access
                  </button>
                </div>
              </div>

              {/* Card 5: Zaza HR Spark (Coming Soon) */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 relative group hover:-translate-y-1 border border-gray-100 dark:border-gray-700 flex flex-col justify-between h-full min-h-[24rem]">
                {/* Coming Soon Badge */}
                <div className="absolute top-4 right-4 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs px-3 py-1 rounded-full font-medium">
                  Coming Soon
                </div>

                <div className="text-center">
                  {/* Icon with Mint Halo */}
                  <div className="relative mb-6">
                    <div className="w-20 h-20 bg-orange-100 dark:bg-orange-900/30 rounded-2xl mx-auto flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-300">
                      <span className="text-4xl">💼</span>
                    </div>
                  </div>

                  {/* Product Name */}
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Zaza HR Spark</h3>

                  {/* One-line Descriptor */}
                  <p className="text-lg font-medium text-gray-600 dark:text-gray-300 mb-4">
                    Automate HR tasks with human-centred AI.
                  </p>

                  {/* Detailed Description */}
                  <p className="text-gray-600 dark:text-gray-400 text-base leading-relaxed mb-6 min-h-[3rem]">
                    AI-powered onboarding, training, and employee messaging built for real-world HR.
                  </p>

                  {/* CTA Button - Outlined */}
                  <button className="w-full border-2 border-orange-300 dark:border-orange-600 text-orange-600 dark:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-900/20 font-semibold py-3 px-6 rounded-lg transition-all duration-300">
                    Get Early Access
                  </button>
                </div>
              </div>

              {/* Card 6: Zaza Coach (Coming Soon) */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 relative group hover:-translate-y-1 border border-gray-100 dark:border-gray-700 flex flex-col justify-between h-full min-h-[24rem]">
                {/* Coming Soon Badge */}
                <div className="absolute top-4 right-4 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs px-3 py-1 rounded-full font-medium">
                  Coming Soon
                </div>

                <div className="text-center">
                  {/* Icon with Soft Orange Halo */}
                  <div className="relative mb-6">
                    <div className="w-20 h-20 bg-orange-100 dark:bg-orange-900/30 rounded-2xl mx-auto flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-300">
                      <span className="text-4xl">🧠</span>
                    </div>
                  </div>

                  {/* Product Name */}
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Zaza Coach</h3>

                  {/* One-line Descriptor */}
                  <p className="text-lg font-medium text-gray-600 dark:text-gray-300 mb-4">
                    Empower growth with AI-driven performance insights.
                  </p>

                  {/* Detailed Description */}
                  <p className="text-gray-600 dark:text-gray-400 text-base leading-relaxed mb-6 min-h-[3rem]">
                    AI-powered performance reviews and coaching built for human connection.
                  </p>

                  {/* CTA Button - Outlined */}
                  <button className="w-full border-2 border-orange-300 dark:border-orange-600 text-orange-600 dark:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-900/20 font-semibold py-3 px-6 rounded-lg transition-all duration-300">
                    Get Early Access
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Zaza Section */}
        <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Why Choose Zaza?
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Our commitment to ethical AI and educator empowerment sets us apart
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
              {values.map((value, index) => (
                <div key={index} className="text-center group">
                  <div className="flex justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    {value.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{value.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Voices from the Classroom Section */}
        <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Voices from the Classroom
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Real teachers sharing how Zaza has transformed their daily practice
              </p>
            </div>

            {/* Quote Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
              {classroomVoices.map((voice, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-100 dark:border-gray-700 group"
                >
                  {/* Quote Icon */}
                  <div className="mb-4">
                    <Quote className="h-6 w-6 text-gray-300 dark:text-gray-600" />
                  </div>

                  {/* Quote Text */}
                  <blockquote className="text-gray-600 dark:text-gray-400 text-base leading-relaxed mb-6 italic">
                    "{voice.quote}"
                  </blockquote>

                  {/* Author Info */}
                  <div className="flex items-center space-x-3">
                    <img
                      src={voice.avatar || "/placeholder.svg"}
                      alt={`${voice.author} avatar`}
                      className="w-12 h-12 rounded-full object-cover border-2 border-gray-200 dark:border-gray-600"
                    />
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white text-sm">{voice.author}</p>
                      <p className="text-gray-500 dark:text-gray-400 text-xs">{voice.role}</p>
                      <p className="text-gray-400 dark:text-gray-500 text-xs">{voice.school}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Meet the Founder Section */}
        <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="md:w-1/3">
                <div className="relative flex justify-center items-center">
                  {/* ENHANCED SVG ELEMENT WITH SOFT GLOW EFFECT */}
                  <svg
                    className="absolute inset-0 w-72 h-72 -translate-x-4 -translate-y-4"
                    viewBox="0 0 180 180"
                    fill="none"
                  >
                    <defs>
                      <linearGradient id="founderGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#ec4899" />
                        <stop offset="50%" stopColor="#a855f7" />
                        <stop offset="100%" stopColor="#7c3aed" />
                      </linearGradient>

                      {/* Glow Filter Definition */}
                      <filter id="glowFilter" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                        <feMerge>
                          <feMergeNode in="coloredBlur" />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>

                      {/* Outer Glow Filter */}
                      <filter id="outerGlow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="8" result="outerBlur" />
                        <feFlood floodColor="#a855f7" floodOpacity="0.3" />
                        <feComposite in2="outerBlur" operator="in" />
                        <feMerge>
                          <feMergeNode />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>
                    </defs>

                    {/* Outer glow layer */}
                    <path
                      d="M 30 90 A 50 50 0 1 1 150 90"
                      fill="none"
                      stroke="url(#founderGradient)"
                      strokeWidth="3"
                      strokeLinecap="round"
                      opacity="0.4"
                      filter="url(#outerGlow)"
                    />

                    {/* Main circle with inner glow */}
                    <path
                      d="M 30 90 A 50 50 0 1 1 150 90"
                      fill="none"
                      stroke="url(#founderGradient)"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      opacity="0.8"
                      filter="url(#glowFilter)"
                    />
                  </svg>

                  {/* EXISTING PHOTO */}
                  <img
                    src="/images/greg-headshot.jpg"
                    alt="Dr. Greg Blackburn, Founder of Zaza Technologies"
                    className="relative z-10 w-64 h-64 rounded-full object-cover shadow-2xl mx-auto dark:shadow-gray-900/50"
                  />

                  {/* EXISTING LIGHTBULB */}
                  <div className="absolute -bottom-4 -right-4 bg-white dark:bg-gray-800 rounded-full p-3 shadow-lg dark:shadow-gray-900/50 z-20">
                    <Lightbulb className="h-8 w-8 text-yellow-500 dark:text-yellow-400" />
                  </div>
                </div>
              </div>
              <div className="md:w-2/3 text-center md:text-left">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                  Meet the Founder
                </h2>
                <div className="space-y-4 text-lg sm:text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
                  <p>
                    <strong className="text-gray-900 dark:text-white">Dr. Greg Blackburn</strong> is a PhD-qualified
                    educator and Global Director of Learning with over 20 years' experience in digital learning,
                    instructional design, and workplace education. A recognised EdTech thought leader, Greg is widely
                    published and known for turning research into practical tools that work in real classrooms. He's also
                    lived the pressures that drive teacher burnout — and is building solutions from the ground up.
                  </p>
                  <p>
                    {'"I built Zaza to give teachers the tools I wish existed 20 years ago. Every feature '}
                    {"is tested by real teachers in real classrooms — so our AI truly supports both the "}
                    {'art and science of teaching."'}
                  </p>
                </div>
                <div className="mt-8">
                  <Badge variant="outline" className="px-4 py-2 text-sm dark:border-gray-600 dark:text-gray-300">
                    Ph.D. in Education • Global Director of Learning • 20+ Years Experience
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Value Proposition Section */}
        <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-gray-900 dark:bg-gray-950">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
              Save Hours of Prep Time Every Week
            </h2>
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-300 mb-6">Where Pedagogy Meets Innovation</h3>
            <p className="text-lg sm:text-xl text-gray-300 dark:text-gray-400 mb-10 max-w-3xl mx-auto leading-relaxed">
              We build transparent, ethical AI tools that amplify great teaching without replacing the human connection at
              the heart of education.
            </p>

            {/* Key Benefits Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
              <div className="bg-gray-800/50 dark:bg-gray-800/30 rounded-lg p-6 border border-gray-700">
                <div className="text-3xl mb-3">⚡</div>
                <h3 className="text-lg font-semibold text-white mb-2">10x Faster Planning</h3>
                <p className="text-gray-400 text-sm">Generate complete lesson plans in seconds, not hours</p>
              </div>
              <div className="bg-gray-800/50 dark:bg-gray-800/30 rounded-lg p-6 border border-gray-700">
                <div className="text-3xl mb-3">🎯</div>
                <h3 className="text-lg font-semibold text-white mb-2">Curriculum-Aligned</h3>
                <p className="text-gray-400 text-sm">AI that understands your standards and requirements</p>
              </div>
              <div className="bg-gray-800/50 dark:bg-gray-800/30 rounded-lg p-6 border border-gray-700">
                <div className="text-3xl mb-3">💡</div>
                <h3 className="text-lg font-semibold text-white mb-2">Creativity Enhanced</h3>
                <p className="text-gray-400 text-sm">Amplify your teaching style, never replace it</p>
              </div>
            </div>

            {/* Impact Stats */}
            <div className="text-center">
              <p className="text-lg font-semibold text-gray-300">
                1000+ educators worldwide • 50,000+ hours saved monthly • 25+ countries
              </p>
            </div>
          </div>
        </section>

      </div>
    </>
  )
}
