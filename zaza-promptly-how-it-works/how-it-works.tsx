"use client"

import React, { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Clock, RefreshCw, Zap, CheckCircle, FileText, Edit3 } from "lucide-react"


export default function Component() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#121212] transition-colors duration-300">
      {/* Hero Section */}
      <section className="px-4 py-16 md:py-24 pt-24 md:pt-32 bg-gradient-to-br from-purple-600 via-purple-500 to-pink-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-transparent to-pink-500/20"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-400/30 via-transparent to-transparent"></div>

        {/* Floating Paper Animation */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Paper sheets floating and dissolving */}
          <div className="absolute top-20 left-10 w-8 h-10 bg-white/20 rounded-sm animate-float-dissolve delay-1000 transform rotate-12"></div>
          <div className="absolute top-32 right-16 w-6 h-8 bg-white/15 rounded-sm animate-float-dissolve delay-1500 transform -rotate-6"></div>
          <div className="absolute top-40 left-1/4 w-7 h-9 bg-white/10 rounded-sm animate-float-dissolve delay-2000 transform rotate-3"></div>
          <div className="absolute top-28 right-1/3 w-5 h-7 bg-white/20 rounded-sm animate-float-dissolve delay-2500 transform -rotate-12"></div>
          <div className="absolute top-48 left-1/2 w-6 h-8 bg-white/15 rounded-sm animate-float-dissolve delay-3000 transform rotate-8"></div>

          {/* Digital particles emerging */}
          <div className="absolute top-24 left-20 w-2 h-2 bg-purple-200 rounded-full animate-digital-emerge delay-1200"></div>
          <div className="absolute top-36 right-24 w-1.5 h-1.5 bg-pink-200 rounded-full animate-digital-emerge delay-1700"></div>
          <div className="absolute top-44 left-1/3 w-2.5 h-2.5 bg-purple-300 rounded-full animate-digital-emerge delay-2200"></div>
          <div className="absolute top-30 right-1/4 w-1 h-1 bg-pink-300 rounded-full animate-digital-emerge delay-2700"></div>
          <div className="absolute top-52 left-2/3 w-2 h-2 bg-purple-200 rounded-full animate-digital-emerge delay-3200"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight animate-in fade-in-0 slide-in-from-bottom-6 duration-700">
            Stop Sacrificing Your Weekends to Report Cards
          </h1>
          <p className="text-xl md:text-2xl text-purple-100 max-w-3xl mx-auto leading-relaxed animate-in fade-in-0 slide-in-from-bottom-4 duration-700 delay-300">
            It's Sunday night. You're staring at{" "}
            <span className="font-semibold text-white relative">
              28 blank comment boxes
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-white/50 animate-pulse"></span>
            </span>
            . Again.{" "}
            <span className="block mt-2 text-2xl md:text-3xl font-semibold text-white animate-pulse delay-1000">
              There's a better way.
            </span>
          </p>
        </div>
      </section>

      {/* Problem Statement Section */}
      <section className="px-4 py-16 md:py-20 bg-white dark:bg-[#121212] transition-colors duration-300 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-gray-100 mb-12 transition-colors duration-300 animate-in fade-in-0 slide-in-from-top-4 duration-700">
            What teachers told us
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 - Late Night Exhaustion */}
            <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 transition-all duration-500 hover:shadow-xl hover:scale-105 animate-in fade-in-0 slide-in-from-left-8 duration-700 delay-200 group animate-subtle-shake">
              <CardContent className="p-8 text-center relative overflow-hidden">
                {/* Late night atmosphere particles */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-4 left-4 w-1 h-1 bg-purple-400 rounded-full animate-ping delay-1000 opacity-60"></div>
                  <div className="absolute top-8 right-6 w-1 h-1 bg-purple-300 rounded-full animate-ping delay-1500 opacity-40"></div>
                  <div className="absolute bottom-6 left-8 w-1 h-1 bg-purple-400 rounded-full animate-ping delay-2000 opacity-50"></div>
                  {/* Moon/night indicator */}
                  <div className="absolute top-2 right-2 text-purple-300 text-xs opacity-30">🌙</div>
                </div>

                <div className="relative z-10">
                  <Clock className="w-12 h-12 text-purple-600 dark:text-purple-400 mx-auto mb-4 transition-all duration-500 group-hover:scale-110 group-hover:animate-spin" />
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4 transition-colors duration-300 group-hover:text-purple-700 dark:group-hover:text-purple-300">
                    It's 11 PM and you're still writing comments
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed transition-colors duration-300 group-hover:text-gray-700 dark:group-hover:text-gray-200">
                    While your{" "}
                    <span className="font-semibold text-purple-700 dark:text-purple-300 relative">
                      family sleeps
                      <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 delay-300"></span>
                    </span>
                    , you're sacrificing your evening to feedback that feels{" "}
                    <span className="font-semibold text-purple-700 dark:text-purple-300 italic">never-ending</span>.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Card 2 - Repetitive Struggle */}
            <Card className="border-0 shadow-lg bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-900/20 dark:to-pink-800/20 transition-all duration-500 hover:shadow-xl hover:scale-105 animate-in fade-in-0 slide-in-from-bottom-8 duration-700 delay-400 group animate-subtle-shake delay-200">
              <CardContent className="p-8 text-center relative overflow-hidden">
                {/* Repetition visual effect - more intense */}
                <div className="absolute inset-0 pointer-events-none opacity-25">
                  <div className="absolute top-6 left-6 text-xs text-pink-400 animate-pulse delay-500 font-mono">
                    rewrite...
                  </div>
                  <div className="absolute top-12 right-8 text-xs text-pink-400 animate-pulse delay-1000 font-mono">
                    rewrite...
                  </div>
                  <div className="absolute bottom-8 left-10 text-xs text-pink-400 animate-pulse delay-1500 font-mono">
                    rewrite...
                  </div>
                  <div className="absolute bottom-12 right-6 text-xs text-pink-400 animate-pulse delay-2000 font-mono">
                    rewrite...
                  </div>
                  <div className="absolute top-16 left-1/2 text-xs text-pink-400 animate-pulse delay-2500 font-mono">
                    rewrite...
                  </div>
                </div>

                <div className="relative z-10">
                  <RefreshCw className="w-12 h-12 text-pink-600 dark:text-pink-400 mx-auto mb-4 transition-all duration-500 group-hover:scale-110 group-hover:rotate-180" />
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4 transition-colors duration-300 group-hover:text-pink-700 dark:group-hover:text-pink-300">
                    You've rewritten the same feedback 5 times
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed transition-colors duration-300 group-hover:text-gray-700 dark:group-hover:text-gray-200">
                    The{" "}
                    <span className="font-semibold text-pink-700 dark:text-pink-300 relative">
                      words blur together
                      <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 delay-300"></span>
                    </span>{" "}
                    as you struggle to make each comment feel{" "}
                    <span className="font-semibold text-pink-700 dark:text-pink-300 italic">
                      personal and meaningful
                    </span>
                    .
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Card 3 - AI Disconnect */}
            <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-pink-100 dark:from-purple-900/20 dark:to-pink-800/20 transition-all duration-500 hover:shadow-xl hover:scale-105 animate-in fade-in-0 slide-in-from-right-8 duration-700 delay-600 group animate-subtle-shake delay-400">
              <CardContent className="p-8 text-center relative overflow-hidden">
                {/* Corporate vs authentic visual indicators */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-4 right-4 text-red-400 text-xs animate-bounce delay-700 opacity-60">
                    🤖
                  </div>
                  <div className="absolute top-10 left-6 text-red-400 text-xs animate-bounce delay-1200 opacity-40">
                    generic
                  </div>
                  <div className="absolute bottom-6 right-8 text-red-400 text-xs animate-bounce delay-1700 opacity-50">
                    cold
                  </div>
                  <div className="absolute bottom-10 left-4 text-green-400 text-xs animate-pulse delay-2200 opacity-60">
                    ❤️
                  </div>
                </div>

                <div className="relative z-10">
                  <Zap className="w-12 h-12 text-purple-600 dark:text-purple-400 mx-auto mb-4 transition-all duration-500 group-hover:scale-110 group-hover:text-red-500 dark:group-hover:text-red-400" />
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4 transition-colors duration-300 group-hover:text-purple-700 dark:group-hover:text-purple-300">
                    Generic AI tools don't understand your students
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed transition-colors duration-300 group-hover:text-gray-700 dark:group-hover:text-gray-200">
                    ChatGPT gives you{" "}
                    <span className="font-semibold text-red-600 dark:text-red-400 relative">
                      corporate speak
                      <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-red-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 delay-300"></span>
                    </span>{" "}
                    when you need{" "}
                    <span className="font-semibold text-purple-700 dark:text-purple-300 relative">
                      authentic teacher voice
                      <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 delay-500"></span>
                    </span>{" "}
                    that honors your relationships.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Animated empathy message */}
          <div className="mt-12 text-center animate-in fade-in-0 slide-in-from-bottom-4 duration-700 delay-1000">
            <p className="text-lg text-gray-500 dark:text-gray-400 italic transition-colors duration-300">
              We hear you. We built Zaza Promptly to solve exactly these problems.
            </p>
            <div className="mt-4 flex justify-center">
              <div className="w-16 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Imagine Tomorrow's You Section - NEW */}
      <section className="px-4 py-16 md:py-20 bg-gradient-to-br from-white via-purple-50/30 to-pink-50/30 dark:from-[#121212] dark:via-purple-900/10 dark:to-pink-900/10 transition-colors duration-300 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-6 transition-colors duration-300 animate-in fade-in-0 slide-in-from-top-4 duration-700">
              Imagine Tomorrow's You
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed transition-colors duration-300 animate-in fade-in-0 slide-in-from-bottom-4 duration-700 delay-300">
              Picture this: It's Sunday evening. Your feedback is done. Your family has your full attention. You're not
              just <span className="font-semibold text-gray-700 dark:text-gray-200">surviving</span> teaching - you're{" "}
              <span className="font-semibold text-purple-600 dark:text-purple-400 relative">
                thriving
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 animate-pulse"></span>
              </span>
              .
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Benefit Card 1 - Sunday Morning Coffee */}
            <Card className="border-0 shadow-lg bg-gradient-to-br from-amber-50 to-orange-100 dark:from-amber-900/20 dark:to-orange-800/20 transition-all duration-500 hover:shadow-xl hover:scale-105 animate-in fade-in-0 slide-in-from-left-8 duration-700 delay-500 group">
              <CardContent className="p-8 text-center relative overflow-hidden">
                {/* Warm morning atmosphere particles */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-4 left-4 w-1 h-1 bg-amber-400 rounded-full animate-ping delay-1000 opacity-60"></div>
                  <div className="absolute top-8 right-6 w-1 h-1 bg-orange-300 rounded-full animate-ping delay-1500 opacity-40"></div>
                  <div className="absolute bottom-6 left-8 w-1 h-1 bg-amber-400 rounded-full animate-ping delay-2000 opacity-50"></div>
                  {/* Sun/morning indicator */}
                  <div className="absolute top-2 right-2 text-amber-400 text-lg opacity-60 animate-pulse">☀️</div>
                </div>

                <div className="relative z-10">
                  <div className="text-4xl mb-4 animate-bounce delay-1000">☀️</div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4 transition-colors duration-300 group-hover:text-amber-700 dark:group-hover:text-amber-300">
                    Sunday Morning Coffee
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed transition-colors duration-300 group-hover:text-gray-700 dark:group-hover:text-gray-200">
                    While other teachers{" "}
                    <span className="font-semibold text-red-600 dark:text-red-400 relative">
                      panic
                      <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-red-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 delay-300"></span>
                    </span>
                    , you're enjoying{" "}
                    <span className="font-semibold text-amber-700 dark:text-amber-300 italic">
                      breakfast with your family
                    </span>
                    .
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Benefit Card 2 - 5-Minute Feedback */}
            <Card className="border-0 shadow-lg bg-gradient-to-br from-emerald-50 to-green-100 dark:from-emerald-900/20 dark:to-green-800/20 transition-all duration-500 hover:shadow-xl hover:scale-105 animate-in fade-in-0 slide-in-from-bottom-8 duration-700 delay-700 group">
              <CardContent className="p-8 text-center relative overflow-hidden">
                {/* Speed/efficiency visual effects */}
                <div className="absolute inset-0 pointer-events-none opacity-30">
                  <div className="absolute top-6 left-6 text-xs text-emerald-500 animate-pulse delay-500 font-mono">
                    ✓ done
                  </div>
                  <div className="absolute top-12 right-8 text-xs text-emerald-500 animate-pulse delay-1000 font-mono">
                    ✓ done
                  </div>
                  <div className="absolute bottom-8 left-10 text-xs text-emerald-500 animate-pulse delay-1500 font-mono">
                    ✓ done
                  </div>
                  <div className="absolute bottom-12 right-6 text-xs text-emerald-500 animate-pulse delay-2000 font-mono">
                    ✓ done
                  </div>
                </div>

                <div className="relative z-10">
                  <div className="text-4xl mb-4 animate-pulse delay-1200">⚡</div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4 transition-colors duration-300 group-hover:text-emerald-700 dark:group-hover:text-emerald-300">
                    5-Minute Feedback
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed transition-colors duration-300 group-hover:text-gray-700 dark:group-hover:text-gray-200">
                    Write{" "}
                    <span className="font-semibold text-emerald-700 dark:text-emerald-300 relative">
                      personalized comments
                      <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-emerald-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 delay-300"></span>
                    </span>{" "}
                    faster than you can drink your{" "}
                    <span className="font-semibold text-emerald-700 dark:text-emerald-300 italic">morning coffee</span>.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Benefit Card 3 - Parent Praise */}
            <Card className="border-0 shadow-lg bg-gradient-to-br from-rose-50 to-pink-100 dark:from-rose-900/20 dark:to-pink-800/20 transition-all duration-500 hover:shadow-xl hover:scale-105 animate-in fade-in-0 slide-in-from-right-8 duration-700 delay-900 group">
              <CardContent className="p-8 text-center relative overflow-hidden">
                {/* Love/appreciation visual indicators */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-4 right-4 text-rose-400 text-xs animate-bounce delay-700 opacity-60">
                    💝
                  </div>
                  <div className="absolute top-10 left-6 text-pink-400 text-xs animate-bounce delay-1200 opacity-40">
                    thank you
                  </div>
                  <div className="absolute bottom-6 right-8 text-rose-400 text-xs animate-bounce delay-1700 opacity-50">
                    amazing
                  </div>
                  <div className="absolute bottom-10 left-4 text-pink-400 text-xs animate-pulse delay-2200 opacity-60">
                    ❤️
                  </div>
                </div>

                <div className="relative z-10">
                  <div className="text-4xl mb-4 animate-pulse delay-1400">💝</div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4 transition-colors duration-300 group-hover:text-rose-700 dark:group-hover:text-rose-300">
                    Parent Praise
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed transition-colors duration-300 group-hover:text-gray-700 dark:group-hover:text-gray-200">
                    Receive messages from parents{" "}
                    <span className="font-semibold text-rose-700 dark:text-rose-300 relative">
                      thanking you
                      <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-rose-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 delay-300"></span>
                    </span>{" "}
                    for truly{" "}
                    <span className="font-semibold text-pink-700 dark:text-pink-300 italic">'seeing' their child</span>.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Inspirational bridge message */}
          <div className="mt-16 text-center animate-in fade-in-0 slide-in-from-bottom-4 duration-700 delay-1200">
            <p className="text-lg text-gray-500 dark:text-gray-400 italic transition-colors duration-300 mb-4">
              This isn't just a dream. This is your new reality with Zaza Promptly.
            </p>
            <div className="flex justify-center">
              <div className="w-24 h-0.5 bg-gradient-to-r from-amber-400 via-emerald-400 to-rose-400 animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* 3-Step Explainer Section */}
      <section
        id="how-it-works"
        className="px-4 py-16 md:py-20 bg-gray-50 dark:bg-[#1a1a1a] transition-colors duration-300 overflow-hidden"
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-gray-100 mb-16 transition-colors duration-300 animate-in fade-in-0 slide-in-from-bottom-4 duration-700">
            Here's how it works
          </h2>

          {/* Desktop Horizontal Layout */}
          <div className="hidden md:grid md:grid-cols-3 gap-8 lg:gap-12">
            {/* Step 1 */}
            <Card className="border-0 shadow-lg bg-white dark:bg-[#1e1e1e] p-8 text-center transition-all duration-500 hover:shadow-xl hover:scale-105 animate-in fade-in-0 slide-in-from-left-8 duration-700 delay-200 group">
              <CardContent className="p-0">
                <div className="flex flex-col items-center space-y-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg group-hover:shadow-purple-500/50 transition-all duration-300 group-hover:scale-110 animate-gentle-pulse">
                    1
                  </div>
                  <Edit3 className="w-12 h-12 text-purple-500 dark:text-purple-400 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12" />
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 transition-colors duration-300">
                      Capture your teacher instincts
                    </h3>
                    <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed transition-colors duration-300">
                      Jot down what you'd tell a parent{" "}
                      <span className="font-semibold text-purple-600 dark:text-purple-400">face-to-face</span> - your{" "}
                      <span className="font-semibold text-purple-600 dark:text-purple-400 relative">
                        authentic observations and care
                        <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 delay-300"></span>
                      </span>
                      .
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Step 2 */}
            <Card className="border-0 shadow-lg bg-white dark:bg-[#1e1e1e] p-8 text-center transition-all duration-500 hover:shadow-xl hover:scale-105 animate-in fade-in-0 slide-in-from-bottom-8 duration-700 delay-500 group">
              <CardContent className="p-0">
                <div className="flex flex-col items-center space-y-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-pink-600 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg group-hover:shadow-pink-500/50 transition-all duration-300 group-hover:scale-110 animate-gentle-pulse delay-500">
                    2
                  </div>
                  <div className="relative">
                    <FileText className="w-12 h-12 text-pink-500 dark:text-pink-400 transition-all duration-300 group-hover:scale-110" />
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse group-hover:animate-ping"></div>
                    {/* Magic sparkles */}
                    <div className="absolute -top-2 -left-2 w-1 h-1 bg-yellow-400 rounded-full animate-ping delay-1000 group-hover:animate-bounce"></div>
                    <div className="absolute -bottom-2 -right-2 w-1 h-1 bg-yellow-400 rounded-full animate-ping delay-1500 group-hover:animate-bounce"></div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 transition-colors duration-300">
                      Watch your words become magic
                    </h3>
                    <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed transition-colors duration-300">
                      Zaza transforms your notes into{" "}
                      <span className="font-semibold text-pink-600 dark:text-pink-400">polished, professional</span>{" "}
                      comments that sound{" "}
                      <span className="font-semibold text-purple-600 dark:text-purple-400 relative">
                        exactly like you
                        <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-pink-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 delay-300"></span>
                      </span>{" "}
                      - curriculum-aligned and{" "}
                      <span className="font-semibold text-pink-600 dark:text-pink-400">relationship-building</span>.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Step 3 */}
            <Card className="border-0 shadow-lg bg-white dark:bg-[#1e1e1e] p-8 text-center transition-all duration-500 hover:shadow-xl hover:scale-105 animate-in fade-in-0 slide-in-from-right-8 duration-700 delay-700 group">
              <CardContent className="p-0">
                <div className="flex flex-col items-center space-y-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg group-hover:shadow-purple-500/50 transition-all duration-300 group-hover:scale-110 animate-gentle-pulse delay-1000">
                    3
                  </div>
                  <CheckCircle className="w-12 h-12 text-purple-500 dark:text-purple-400 transition-all duration-300 group-hover:scale-110 group-hover:text-green-500 dark:group-hover:text-green-400" />
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 transition-colors duration-300">
                      Copy, paste, reclaim your evening
                    </h3>
                    <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed transition-colors duration-300">
                      What used to steal{" "}
                      <span className="font-semibold text-red-600 dark:text-red-400 line-through">20 minutes</span> now
                      takes{" "}
                      <span className="font-semibold text-green-600 dark:text-green-400 relative">
                        30 seconds
                        <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-green-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></span>
                      </span>
                      .{" "}
                      <span className="block mt-2 font-semibold text-purple-600 dark:text-purple-400 text-xl">
                        Your Sunday nights are yours again.
                      </span>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Mobile Vertical Layout */}
          <div className="md:hidden space-y-8">
            {/* Step 1 Mobile */}
            <Card className="border-0 shadow-lg bg-white dark:bg-[#1e1e1e] p-6 transition-all duration-500 hover:shadow-xl animate-in fade-in-0 slide-in-from-left-4 duration-700 delay-200 group">
              <CardContent className="p-0">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white text-lg font-bold shadow-lg group-hover:shadow-purple-500/50 transition-all duration-300 group-hover:scale-110 animate-gentle-pulse">
                      1
                    </div>
                  </div>
                  <Edit3 className="w-8 h-8 text-purple-500 dark:text-purple-400 flex-shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12" />
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2 transition-colors duration-300">
                      Capture your teacher instincts
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">
                      Jot down what you'd tell a parent{" "}
                      <span className="font-semibold text-purple-600 dark:text-purple-400">face-to-face</span> - your
                      authentic observations and care.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Step 2 Mobile */}
            <Card className="border-0 shadow-lg bg-white dark:bg-[#1e1e1e] p-6 transition-all duration-500 hover:shadow-xl animate-in fade-in-0 slide-in-from-left-4 duration-700 delay-500 group">
              <CardContent className="p-0">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-pink-600 rounded-full flex items-center justify-center text-white text-lg font-bold shadow-lg group-hover:shadow-pink-500/50 transition-all duration-300 group-hover:scale-110 animate-gentle-pulse delay-500">
                      2
                    </div>
                  </div>
                  <div className="relative flex-shrink-0">
                    <FileText className="w-8 h-8 text-pink-500 dark:text-pink-400 transition-all duration-300 group-hover:scale-110" />
                    <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse group-hover:animate-ping"></div>
                    <div className="absolute -top-1 -left-1 w-0.5 h-0.5 bg-yellow-400 rounded-full animate-ping delay-1000"></div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2 transition-colors duration-300">
                      Watch your words become magic
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">
                      Zaza transforms your notes into polished comments that sound{" "}
                      <span className="font-semibold text-purple-600 dark:text-purple-400">exactly like you</span> -
                      curriculum-aligned and relationship-building.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Step 3 Mobile */}
            <Card className="border-0 shadow-lg bg-white dark:bg-[#1e1e1e] p-6 transition-all duration-500 hover:shadow-xl animate-in fade-in-0 slide-in-from-left-4 duration-700 delay-700 group">
              <CardContent className="p-0">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-lg font-bold shadow-lg group-hover:shadow-purple-500/50 transition-all duration-300 group-hover:scale-110 animate-gentle-pulse delay-1000">
                      3
                    </div>
                  </div>
                  <CheckCircle className="w-8 h-8 text-purple-500 dark:text-purple-400 flex-shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:text-green-500 dark:group-hover:text-green-400" />
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2 transition-colors duration-300">
                      Copy, paste, reclaim your evening
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">
                      What used to steal{" "}
                      <span className="font-semibold text-red-600 dark:text-red-400 line-through">20 minutes</span> now
                      takes <span className="font-semibold text-green-600 dark:text-green-400">30 seconds</span>.{" "}
                      <span className="font-semibold text-purple-600 dark:text-purple-400">
                        Your Sunday nights are yours again.
                      </span>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Animated Connection Lines (Desktop Only) */}
          <div className="hidden md:block absolute inset-0 pointer-events-none">
            <svg className="w-full h-full" viewBox="0 0 800 400">
              <defs>
                <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#a855f7" stopOpacity="0.6" />
                  <stop offset="50%" stopColor="#ec4899" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.6" />
                </linearGradient>
              </defs>
              <path
                d="M 200 200 Q 400 150 600 200"
                stroke="url(#connectionGradient)"
                strokeWidth="2"
                fill="none"
                strokeDasharray="5,5"
                className="animate-pulse"
                style={{
                  animation: "dash 3s linear infinite, fadeInOut 4s ease-in-out infinite",
                }}
              />
            </svg>
          </div>
        </div>
      </section>

      {/* Trust Reassurance Section */}
      <section className="px-4 py-16 md:py-20 bg-white dark:bg-[#121212] transition-colors duration-300">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8 transition-colors duration-300">
            No risk. No fluff. No prompt engineering.
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto transition-colors duration-300">
            Zaza Promptly works straight away. No training needed. No technical setup. No credit card required for the
            free plan. You'll know in five minutes whether it's for you.
          </p>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="px-4 py-16 md:py-24 bg-gradient-to-br from-purple-100 via-pink-50 to-purple-50 dark:from-purple-900/30 dark:via-pink-900/20 dark:to-purple-900/30 transition-colors duration-300">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6 leading-tight transition-colors duration-300">
            Give Your Sunday Evenings Back to Your Family
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed transition-colors duration-300">
            Your students deserve the best version of you - the one who isn't exhausted from writing comments all
            weekend. You became a teacher to{" "}
            <span className="font-semibold text-purple-600 dark:text-purple-400">inspire</span>, not to sacrifice your
            personal time to administrative tasks.
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 animate-gradient-pulse"
          >
            Reclaim My Weekends Now
          </Button>
        </div>
      </section>
    </div>
  )
}


