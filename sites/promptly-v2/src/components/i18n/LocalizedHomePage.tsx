'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useTranslation } from '@/hooks/useTranslation'
import ScrollReveal from '@/components/animations/ScrollReveal'
import EmailSignupForm from '@/components/forms/EmailSignupForm'
import TrustBadges from '@/components/trust/TrustBadges'
import TestimonialsSection from '@/components/testimonials/TestimonialsSection'
import SnippetToolV2 from '@/components/sections/SnippetToolV2'
import { useState } from 'react'

export default function LocalizedHomePage() {
  const { t, locale } = useTranslation()

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-900 min-h-[90vh] flex items-center overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal isLCPElement={true}>
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-blue-600/20 text-blue-300 px-4 py-2 rounded-full text-sm mb-8 border border-blue-600/20">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                For teachers who write parent messages & report comments
              </div>
              
              {/* Main Headline */}
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                Safe AI that saves teachers hours - without losing empathy
              </h1>
              
              {/* Subtext */}
              <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                Write better parent messages and report comments in half the time. Hallucination-safe AI designed by teachers, for teachers.
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
                <Link
                  href="/pricing#free"
                  className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold rounded-lg transition-all hover:scale-105 shadow-xl"
                >
                  Start Free Today
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link
                  href="#demo"
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-slate-600 text-slate-300 hover:bg-slate-800/50 text-lg font-semibold rounded-lg transition-all hover:scale-105"
                >
                  See How It Works
                </Link>
              </div>
            </ScrollReveal>

            {/* Hero Email Signup */}
            <ScrollReveal delay={0.2}>
              <EmailSignupForm
                variant="hero"
                headline="Join 12,000+ educators saving hours every week"
                subtext="Get free time-saving tools and tips. No spam, just practical help for teachers."
                buttonText="Join Free Today ->"
                className="mt-12"
              />
            </ScrollReveal>
              
            {/* Credibility line */}
            <ScrollReveal delay={0.3}>
              <p className="text-slate-400 text-sm mt-8">
                Trusted by teachers in 50+ countries • GDPR compliant • Created by Dr. Greg Blackburn, PhD
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Trust Strip */}
      <section className="py-12 bg-slate-800/30">
        <div className="container">
          <ScrollReveal>
            <TrustBadges variant="inline" className="text-center" />
          </ScrollReveal>
        </div>
      </section>

      {/* PROBLEM SECTION - Anthony Pierri Flow Step 1 */}
      <section className="py-20 bg-slate-900">
        <div className="container">
          <ScrollReveal>
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Writing parent messages shouldn't take all evening
              </h2>
              <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-8">
                Every teacher knows the struggle: 30+ report comments due tomorrow, difficult conversations with parents, and no time for your own life.
              </p>
            </div>
          </ScrollReveal>
          
          <ScrollReveal delay={0.1}>
            <div className="max-w-6xl mx-auto">
              {/* Pain Points */}
              <div className="bg-red-900/20 border border-red-500/30 rounded-2xl p-8 mb-8">
                <div className="text-red-400 font-semibold mb-6 text-center">
                  <svg className="w-6 h-6 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  The Reality for Most Teachers
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-2xl mb-2">⏰</div>
                    <h4 className="font-semibold text-red-300 mb-2">Hours Every Week</h4>
                    <p className="text-slate-300 text-sm">Spent writing the same types of messages over and over</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl mb-2">😰</div>
                    <h4 className="font-semibold text-red-300 mb-2">Difficult Conversations</h4>
                    <p className="text-slate-300 text-sm">Struggling to find the right tone for sensitive topics</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl mb-2">🔥</div>
                    <h4 className="font-semibold text-red-300 mb-2">Teacher Burnout</h4>
                    <p className="text-slate-300 text-sm">No time for lesson planning or personal life</p>
                  </div>
                </div>
              </div>
              
              {/* Example Problem */}
              <div className="bg-slate-800/40 rounded-2xl p-6">
                <h4 className="text-slate-300 font-medium mb-4 text-center">Sound familiar?</h4>
                <blockquote className="text-slate-300 italic text-center text-lg mb-4">
                  "Hi, your child has been disruptive in class today and needs to focus more on their work instead of talking to friends..."
                </blockquote>
                <div className="text-center text-sm text-red-400">
                  😬 Sounds harsh • 😰 Makes parents defensive • ⏰ Took 15 minutes to write
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* SOLUTION SECTION - Anthony Pierri Flow Step 2 */}
      <section className="py-20 bg-slate-800/50">
        <div className="container">
          <ScrollReveal>
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                What if AI could write like you - but better and faster?
              </h2>
              <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                Promptly transforms your rushed drafts into professional, empathetic messages that strengthen parent relationships.
              </p>
            </div>
          </ScrollReveal>
          
          <ScrollReveal delay={0.1}>
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
              {/* Before */}
              <div className="bg-slate-900/60 border border-slate-600/50 rounded-2xl p-8">
                <div className="text-slate-400 font-semibold mb-4 text-center">
                  Your Draft (2 minutes)
                </div>
                <blockquote className="text-slate-300 mb-6">
                  "Hi, your child has been disruptive in class today and needs to focus more on their work instead of talking to friends..."
                </blockquote>
              </div>
              
              {/* After */}
              <div className="bg-green-900/20 border border-green-500/30 rounded-2xl p-8">
                <div className="text-green-400 font-semibold mb-4 text-center">
                  Promptly's Improvement (30 seconds)
                </div>
                <blockquote className="text-slate-300 mb-6">
                  "I wanted to touch base about [Child's name]'s social engagement in class. While their enthusiasm for connecting with peers shows wonderful social skills, I'd love to work with you on channeling this energy to support their learning..."
                </blockquote>
                <div className="text-center text-sm text-green-400">
                  ✨ Professional tone • 🤝 Builds partnership • ⚡ Generated in seconds
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* PRODUCT DEMO SECTION - Anthony Pierri Flow Step 3 */}
      <section id="demo" className="py-20 bg-gradient-to-b from-slate-900 to-purple-900/30">
        <div className="container">
          <ScrollReveal>
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Try it yourself - improve any comment instantly
              </h2>
              <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                Paste your draft, choose your tone, and watch Promptly make it better. Experience the Improve/Explain/History tabs that teachers love.
              </p>
            </div>
          </ScrollReveal>
          
          <ScrollReveal delay={0.1}>
            <div className="max-w-6xl mx-auto">
              {/* Advanced Demo Tool with Zara and tabs */}
              <SnippetToolV2 />
              
              <div className="text-center mt-8">
                <p className="text-slate-400 text-sm mb-4">
                  This demo shows Promptly's core features. The full version includes parent email templates, report generators, and 25+ languages.
                </p>
                <Link
                  href="/pricing#free"
                  className="inline-flex items-center px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors"
                >
                  Get Full Access Free
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* MID-PAGE CTA - Anthony Pierri Flow */}
      <section className="py-16 bg-blue-600">
        <div className="container">
          <ScrollReveal>
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-white mb-4">
                Ready to get your evenings back?
              </h2>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Start with 5 free comments this month. No credit card required.
              </p>
              
              <Link 
                href="/pricing#free"
                className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors shadow-lg text-lg"
              >
                Start Your Free Trial
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Features Section - Why Promptly Works */}
      <section id="features" className="py-20 bg-slate-900">
        <div className="container">
          <ScrollReveal>
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Why teachers choose Promptly over generic AI
              </h2>
              <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                Purpose-built tools that understand education, not generic AI that might get things wrong.
              </p>
            </div>
          </ScrollReveal>
          
          <ScrollReveal delay={0.1}>
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-6 text-center">
                <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-3">Hallucination-Safe AI</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  No false facts or inappropriate content. Our AI is specifically trained and tested for educational contexts.
                </p>
              </div>
              
              {/* Feature 2 */}
              <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-6 text-center">
                <div className="w-12 h-12 bg-green-600/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-3">Parent Communication</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Turn difficult conversations into collaborative partnerships with empathetic, professional language.
                </p>
              </div>
              
              {/* Feature 3 */}
              <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-6 text-center">
                <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-3">Report Comments</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Generate personalized, meaningful report comments that reflect each student's unique progress.
                </p>
              </div>
              
              {/* Feature 4 */}
              <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-6 text-center">
                <div className="w-12 h-12 bg-orange-600/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21L6 10l.5 3L8 16l-.5.5h3a1 1 0 011 1V19a1 1 0 01-1 1H5a2 2 0 01-2-2V5z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-3">25+ Languages</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Communicate with multilingual families in their preferred language, with cultural context included.
                </p>
              </div>
              
              {/* Feature 5 */}
              <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-6 text-center">
                <div className="w-12 h-12 bg-red-600/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-3">GDPR Compliant</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Student data stays private and secure. We never train AI models on your conversations.
                </p>
              </div>
              
              {/* Feature 6 */}
              <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-6 text-center">
                <div className="w-12 h-12 bg-yellow-600/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-3">Save Hours Weekly</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Most teachers save 3-5 hours per week. Get your evenings back without compromising quality.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Promptly vs ChatGPT Comparison - PROOF Section */}
      <section className="py-20 bg-slate-800/50">
        <div className="container">
          <ScrollReveal>
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Promptly vs ChatGPT - Why teachers make the switch
              </h2>
              <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                Both are AI tools, but only one is built specifically for education with safety guardrails.
              </p>
            </div>
          </ScrollReveal>
          
          <ScrollReveal delay={0.1}>
            <div className="max-w-6xl mx-auto overflow-x-auto">
              <table className="w-full bg-slate-800/30 rounded-2xl overflow-hidden">
                <thead className="bg-slate-800/60">
                  <tr>
                    <th className="text-left px-6 py-4 text-slate-300 font-medium">Feature</th>
                    <th className="text-center px-6 py-4 text-white font-semibold bg-blue-600/20">Promptly</th>
                    <th className="text-center px-6 py-4 text-white font-semibold">ChatGPT Plus</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  <tr>
                    <td className="px-6 py-4 text-slate-300">Price per month</td>
                    <td className="px-6 py-4 text-center text-green-400 bg-blue-600/10">€14.99</td>
                    <td className="px-6 py-4 text-center text-slate-400">€20+</td>
                  </tr>
                  <tr className="bg-slate-800/20">
                    <td className="px-6 py-4 text-slate-300">Hallucination-safe for education</td>
                    <td className="px-6 py-4 text-center bg-blue-600/10">
                      <svg className="w-5 h-5 text-green-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <svg className="w-5 h-5 text-red-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-slate-300">Built-in education templates</td>
                    <td className="px-6 py-4 text-center bg-blue-600/10">
                      <svg className="w-5 h-5 text-green-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <svg className="w-5 h-5 text-red-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </td>
                  </tr>
                  <tr className="bg-slate-800/20">
                    <td className="px-6 py-4 text-slate-300">GDPR compliant</td>
                    <td className="px-6 py-4 text-center bg-blue-600/10">
                      <svg className="w-5 h-5 text-green-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-slate-400 text-sm">Complex</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-slate-300">Created by educators</td>
                    <td className="px-6 py-4 text-center bg-blue-600/10">
                      <svg className="w-5 h-5 text-green-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <svg className="w-5 h-5 text-red-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* PROOF SECTION - Testimonials */}
      <TestimonialsSection 
        variant="quick" 
        title="Trusted by 12,000+ teachers worldwide"
        subtitle="Real educators sharing how Promptly transformed their practice"
        className="bg-slate-900"
      />

      {/* Founder Block - Trust Building */}
      <section className="py-20 bg-slate-800/50">
        <div className="container">
          <ScrollReveal>
            <div className="max-w-4xl mx-auto">
              <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 border border-purple-500/30 rounded-2xl p-8 md:p-12">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden bg-purple-600/20 flex items-center justify-center flex-shrink-0">
                    <Image
                      src="/images/founder-new.jpg"
                      alt="Dr. Greg Blackburn, PhD in Professional Education, Founder of Promptly"
                      width={160}
                      height={160}
                      className="rounded-full object-cover w-full h-full"
                      priority={false}
                    />
                  </div>
                  <div className="text-center md:text-left">
                    <h3 className="text-2xl font-bold text-white mb-4">
                      Built by an educator who understands your challenges
                    </h3>
                    <p className="text-slate-300 mb-6 leading-relaxed">
                      "I'm Dr. Greg Blackburn, PhD in Professional Education. After 20+ years building tools for teachers, I created Promptly because educators deserve AI that actually understands education - not generic tools that might get things wrong."
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Link 
                        href="/about-founder"
                        className="inline-flex items-center text-purple-400 hover:text-purple-300 font-medium"
                      >
                        Learn more about my story
                        <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </Link>
                      <span className="text-slate-400 text-sm">
                        PhD in Professional Education • 20+ years in EdTech
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* FINAL CTA - Anthony Pierri Flow Step 5 */}
      <section className="py-20 bg-gradient-to-b from-slate-900 to-indigo-900">
        <div className="container">
          <ScrollReveal>
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Ready to reclaim your evenings?
              </h2>
              <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
                Start with 5 free comments this month. No credit card required. Cancel anytime.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
                <Link 
                  href="/pricing#free"
                  className="inline-flex items-center px-10 py-5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors shadow-2xl text-xl"
                >
                  Start Your Free Trial
                  <svg className="ml-3 w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link 
                  href="/pricing#download"
                  className="inline-flex items-center px-8 py-4 border-2 border-slate-600 text-slate-300 hover:bg-slate-800/50 font-semibold rounded-lg transition-all text-lg"
                >
                  Download the App
                </Link>
              </div>
              
              <EmailSignupForm
                variant="compact"
                headline="Or get free tips while you decide"
                subtext="Join 12,000+ educators. Unsubscribe anytime."
                showNameFields={false}
                buttonText="Get Tips ->"
                className="mt-8 max-w-md mx-auto"
              />
              
              <p className="text-slate-400 text-sm mt-8">
                Trusted by teachers in 50+ countries • GDPR compliant • Created by educators
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}