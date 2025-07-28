// SEO meta tags injected by automation
"use client"

import type React from "react"

import { useState } from "react"
import { Moon, Sun, Menu, X, Users, Heart, Video, Mail, Sparkles, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { Layout } from "@zaza/shared-components"
import Head from "next/head";
import { BRAND_NAME, DEFAULT_DESCRIPTION, DEFAULT_OG_IMAGE, BASE_URL } from "@zaza/shared-components/lib/seo";

export default function SchwoopPrelaunch() {
  const [isDark, setIsDark] = useState(true)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [footerEmail, setFooterEmail] = useState("")
  const [footerSubmitted, setFooterSubmitted] = useState(false)

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubmitted(true)
      console.log("Email submitted:", email)
    }
  }

  const handleFooterEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (footerEmail) {
      setFooterSubmitted(true)
      console.log("Footer email submitted:", footerEmail)
    }
  }

  return (
    <>
      <Head>
        <title>Schwoop Homepage | {BRAND_NAME}</title>
        <meta name="description" content="Welcome to Zaza Schwoop: AI-powered student engagement platform. {DEFAULT_DESCRIPTION}" />
        <meta property="og:title" content="Schwoop Homepage | {BRAND_NAME}" />
        <meta property="og:description" content="Welcome to Zaza Schwoop: AI-powered student engagement platform. {DEFAULT_DESCRIPTION}" />
        <meta property="og:image" content={DEFAULT_OG_IMAGE} />
        <meta property="og:url" content={`${BASE_URL}/schwoop-homepage`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Schwoop Homepage | {BRAND_NAME}" />
        <meta name="twitter:description" content="Welcome to Zaza Schwoop: AI-powered student engagement platform. {DEFAULT_DESCRIPTION}" />
        <meta name="twitter:image" content={DEFAULT_OG_IMAGE} />
      </Head>
      <Layout currentProduct="Schwoop">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#1E1F4A] via-[#B57EDC]/10 to-[#86BA90]/10">
            <div className="absolute inset-0">
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="absolute animate-float"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 3}s`,
                    animationDuration: `${3 + Math.random() * 2}s`,
                  }}
                >
                  <Sparkles className="h-4 w-4 text-[#B57EDC]/20" />
                </div>
              ))}
            </div>
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
            <div className="text-center">
              <h1
                className={`text-4xl sm:text-6xl lg:text-7xl font-bold mb-6 ${isDark ? "text-white" : "text-gray-900"}`}
              >
                <span className="inline-block animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
                  School is brutal.
                </span>{" "}
                <span
                  className="bg-gradient-to-r from-[#B57EDC] to-[#86BA90] bg-clip-text text-transparent inline-block animate-fade-in-up animate-pulse-slow"
                  style={{ animationDelay: "0.8s" }}
                >
                  Schwoop is coming.
                </span>
              </h1>
              <p className={`text-xl sm:text-2xl mb-8 max-w-3xl mx-auto ${isDark ? "text-[#B2D3E6]" : "text-gray-600"}`}>
                We're building the world's first vibe-based study app – but we need your help to finish it. 🧠✨
              </p>

              {/* Email Capture Form */}
              <div className="max-w-md mx-auto mb-8">
                {!isSubmitted ? (
                  <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-4">
                    <Input
                      type="email"
                      placeholder="Enter your email for early access"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className={`flex-1 px-4 py-3 rounded-full text-lg ${
                        isDark
                          ? "bg-[#B57EDC]/10 border-[#B57EDC]/30 text-white placeholder-[#B2D3E6]/70"
                          : "bg-white border-gray-300 text-gray-900"
                      }`}
                    />
                    <Button
                      type="submit"
                      size="lg"
                      className="bg-[#86BA90] hover:bg-[#86BA90]/90 text-white px-8 py-3 rounded-full transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                    >
                      Get Early Access
                    </Button>
                  </form>
                ) : (
                  <div className="bg-gradient-to-r from-[#86BA90]/20 to-[#B57EDC]/20 rounded-2xl p-6 border border-[#86BA90]/30">
                    <div className="flex items-center justify-center space-x-2 text-[#86BA90] text-xl font-semibold">
                      <Sparkles className="h-6 w-6" />
                      <span>You're in the inner circle! 🔥</span>
                    </div>
                  </div>
                )}
              </div>

              <p className={`text-sm ${isDark ? "text-[#B2D3E6]/70" : "text-gray-500"}`}>
                Join 3,247 students shaping the future of studying
              </p>
            </div>
          </div>
        </section>

        {/* TikTok Challenge Hub */}
        <section id="challenges" className={`py-20 ${isDark ? "bg-[#1E1F4A]/50" : "bg-white"}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className={`text-3xl sm:text-4xl font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
                Help Us Build Schwoop
              </h2>
              <p className={`text-lg ${isDark ? "text-[#B2D3E6]" : "text-gray-600"}`}>
                Two viral challenges. Infinite possibilities. Your chaos = our inspiration.
              </p>
            </div>

            {/* Challenge Cards */}
            <div className="grid lg:grid-cols-2 gap-8 mb-12">
              {/* Save Me, Schwoop Challenge */}
              <div
                className={`group relative overflow-hidden rounded-3xl p-8 transition-all duration-500 hover:scale-105 cursor-pointer ${
                  isDark
                    ? "bg-gradient-to-br from-[#B57EDC]/20 to-[#F9B87F]/20 border border-[#B57EDC]/30"
                    : "bg-gradient-to-br from-[#B57EDC]/10 to-[#F9B87F]/10 border border-gray-200"
                }`}
              >
                <div className="absolute top-4 right-4">
                  <Video className="h-8 w-8 text-[#F9B87F]" />
                </div>

                <div className="mb-6">
                  <h3 className={`text-2xl sm:text-3xl font-bold mb-3 ${isDark ? "text-white" : "text-gray-900"}`}>
                    🎥 Save Me, Schwoop
                  </h3>
                  <p className={`text-lg mb-6 ${isDark ? "text-[#B2D3E6]" : "text-gray-600"}`}>
                    Show us your study chaos and tag @schwoopapp + #SaveMeSchwoop
                  </p>
                </div>

                <div className="space-y-4 mb-6">
                  <div className={`flex items-center space-x-3 ${isDark ? "text-[#B2D3E6]" : "text-gray-600"}`}>
                    <div className="w-2 h-2 bg-[#F9B87F] rounded-full"></div>
                    <span>Your messy desk? Perfect.</span>
                  </div>
                  <div className={`flex items-center space-x-3 ${isDark ? "text-[#B2D3E6]" : "text-gray-600"}`}>
                    <div className="w-2 h-2 bg-[#F9B87F] rounded-full"></div>
                    <span>3am breakdown? We need to see it.</span>
                  </div>
                  <div className={`flex items-center space-x-3 ${isDark ? "text-[#B2D3E6]" : "text-gray-600"}`}>
                    <div className="w-2 h-2 bg-[#F9B87F] rounded-full"></div>
                    <span>Procrastination station? Show us.</span>
                  </div>
                </div>

                <Button className="w-full bg-[#F9B87F] hover:bg-[#F9B87F]/90 text-white mb-4 group-hover:shadow-lg transition-all">
                  Join the Challenge
                </Button>

                <p className={`text-xs ${isDark ? "text-[#B2D3E6]/70" : "text-gray-500"}`}>
                  Top entries get early access, Discord shoutouts, and maybe a feature named after them.
                </p>
              </div>

              {/* What Is Schwoop Challenge */}
              <div
                className={`group relative overflow-hidden rounded-3xl p-8 transition-all duration-500 hover:scale-105 cursor-pointer ${
                  isDark
                    ? "bg-gradient-to-br from-[#86BA90]/20 to-[#B57EDC]/20 border border-[#86BA90]/30"
                    : "bg-gradient-to-br from-[#86BA90]/10 to-[#B57EDC]/10 border border-gray-200"
                }`}
              >
                <div className="absolute top-4 right-4">
                  <TrendingUp className="h-8 w-8 text-[#86BA90]" />
                </div>

                <div className="mb-6">
                  <h3 className={`text-2xl sm:text-3xl font-bold mb-3 ${isDark ? "text-white" : "text-gray-900"}`}>
                    🔮 What Is Schwoop?
                  </h3>
                  <p className={`text-lg mb-6 ${isDark ? "text-[#B2D3E6]" : "text-gray-600"}`}>
                    Take a wild guess – the weirder, the better. Post and tag #WhatIsSchwoop
                  </p>
                </div>

                <div className="space-y-4 mb-6">
                  <div className={`flex items-center space-x-3 ${isDark ? "text-[#B2D3E6]" : "text-gray-600"}`}>
                    <div className="w-2 h-2 bg-[#86BA90] rounded-full"></div>
                    <span>A study app? Maybe...</span>
                  </div>
                  <div className={`flex items-center space-x-3 ${isDark ? "text-[#B2D3E6]" : "text-gray-600"}`}>
                    <div className="w-2 h-2 bg-[#86BA90] rounded-full"></div>
                    <span>A time machine? Could be...</span>
                  </div>
                  <div className={`flex items-center space-x-3 ${isDark ? "text-[#B2D3E6]" : "text-gray-600"}`}>
                    <div className="w-2 h-2 bg-[#86BA90] rounded-full"></div>
                    <span>Pure chaos energy? Definitely.</span>
                  </div>
                </div>

                <Button className="w-full bg-[#86BA90] hover:bg-[#86BA90]/90 text-white mb-4 group-hover:shadow-lg transition-all">
                  Submit a Guess
                </Button>

                <p className={`text-xs ${isDark ? "text-[#B2D3E6]/70" : "text-gray-500"}`}>
                  Best guesses get beta access + TikTok fame.
                </p>
              </div>
            </div>

            {/* Bottom Message */}
            <div className="text-center">
              <div
                className={`inline-block px-8 py-4 rounded-2xl ${
                  isDark
                    ? "bg-gradient-to-r from-[#B57EDC]/10 to-[#86BA90]/10 border border-[#B57EDC]/20"
                    : "bg-gradient-to-r from-[#B57EDC]/5 to-[#86BA90]/5 border border-gray-200"
                }`}
              >
                <p className={`text-lg font-medium ${isDark ? "text-white" : "text-gray-900"}`}>
                  The world's first study app built with the people who need it most - students.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Social Join Section */}
        <section id="social" className={`py-20 ${isDark ? "bg-[#1E1F4A]" : "bg-[#F6F6F2]"}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className={`text-3xl sm:text-4xl font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
              Join the Movement
            </h2>
            <p className={`text-lg mb-12 ${isDark ? "text-[#B2D3E6]" : "text-gray-600"}`}>
              Be part of the chaos. Shape the future. Get the inside scoop.
            </p>

            <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-[#B57EDC] text-white rounded-xl p-6 hover:scale-105 transition-transform cursor-pointer group">
                <Users className="h-8 w-8 mx-auto mb-3 group-hover:animate-bounce" />
                <h3 className="font-semibold mb-2">Join Discord</h3>
                <p className="text-sm opacity-90">
                  Where the real magic happens. Memes, updates, and pure student energy.
                </p>
              </div>

              <div className="bg-[#F9B87F] text-white rounded-xl p-6 hover:scale-105 transition-transform cursor-pointer group">
                <Heart className="h-8 w-8 mx-auto mb-3 group-hover:animate-pulse" />
                <h3 className="font-semibold mb-2">Follow on TikTok</h3>
                <p className="text-sm opacity-90">Behind-the-scenes chaos, study tips, and challenge highlights.</p>
              </div>

              <div className="bg-[#86BA90] text-white rounded-xl p-6 hover:scale-105 transition-transform cursor-pointer group">
                <Video className="h-8 w-8 mx-auto mb-3 group-hover:animate-spin" />
                <h3 className="font-semibold mb-2">View Top Videos</h3>
                <p className="text-sm opacity-90">See what other students are creating. Get inspired. Get competitive.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className={`py-12 ${isDark ? "bg-[#1E1F4A] border-t border-[#B57EDC]/20" : "bg-gray-900 text-white"}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <Image src="/zaza-logo.png" alt="Zaza Logo" width={32} height={32} className="rounded-lg" />
                <div className="text-2xl font-bold bg-gradient-to-r from-[#B57EDC] to-[#86BA90] bg-clip-text text-transparent">
                  Schwoop
                </div>
              </div>
              <p className={`mb-6 text-lg ${isDark ? "text-[#B2D3E6]" : "text-gray-300"}`}>
                Made for students who procrastinate like pros
              </p>

              {/* Footer Email Capture */}
              {!footerSubmitted ? (
                <div className="max-w-sm mx-auto mb-6">
                  <form onSubmit={handleFooterEmailSubmit} className="flex gap-2">
                    <Input
                      type="email"
                      placeholder="Your email"
                      value={footerEmail}
                      onChange={(e) => setFooterEmail(e.target.value)}
                      required
                      className={`flex-1 ${
                        isDark ? "bg-[#B57EDC]/10 border-[#B57EDC]/30 text-white" : "bg-white border-gray-300"
                      }`}
                    />
                    <Button type="submit" className="bg-[#86BA90] hover:bg-[#86BA90]/90 text-white">
                      <Mail className="h-4 w-4" />
                    </Button>
                  </form>
                </div>
              ) : (
                <div className="mb-6">
                  <p className="text-[#86BA90] font-medium">✨ Another one joins the chaos!</p>
                </div>
              )}

              <div className="flex justify-center space-x-6 mb-6">
                <a
                  href="#"
                  className={`hover:text-[#B57EDC] transition-colors ${isDark ? "text-[#B2D3E6]" : "text-gray-300"}`}
                >
                  About
                </a>
                <a
                  href="#"
                  className={`hover:text-[#B57EDC] transition-colors ${isDark ? "text-[#B2D3E6]" : "text-gray-300"}`}
                >
                  Privacy
                </a>
                <a
                  href="#"
                  className={`hover:text-[#B57EDC] transition-colors ${isDark ? "text-[#B2D3E6]" : "text-gray-300"}`}
                >
                  Contact
                </a>
              </div>
            </div>

            <div className={`pt-6 border-t ${isDark ? "border-[#B57EDC]/20" : "border-gray-700"} text-center`}>
              <p className={`text-sm ${isDark ? "text-[#B2D3E6]" : "text-gray-400"}`}>
                © 2025 Schwoop. All rights reserved. Built with ✨ and lots of coffee.
              </p>
            </div>
          </div>
        </footer>

        <style jsx>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.3; }
            50% { transform: translateY(-20px) rotate(180deg); opacity: 0.7; }
          }
          .animate-float {
            animation: float 3s ease-in-out infinite;
          }
        `}</style>
      </Layout>
    </>
  )
}
