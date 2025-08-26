import Link from 'next/link'
import Image from 'next/image'
import SnippetToolV2 from '@/components/sections/SnippetToolV2'
import LogoCloud from '@/components/marketing/LogoCloud'
import EnhancedTestimonials from '@/components/testimonials/EnhancedTestimonials'
import { quickTestimonials } from '@/data/teacherTestimonials'
import ScrollReveal from '@/components/animations/ScrollReveal'
import dynamic from 'next/dynamic'

// Lazy load testimonials as they're below the fold
const Testimonials = dynamic(() => import('@/components/marketing/Testimonials'), {
  ssr: false,
  loading: () => (
    <div className="py-16 bg-slate-900">
      <div className="container">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="h-8 bg-slate-800 rounded animate-pulse mb-4 max-w-sm mx-auto" />
            <div className="h-4 bg-slate-800 rounded animate-pulse max-w-lg mx-auto" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="rounded-2xl bg-slate-900/60 p-6 animate-pulse">
                <div className="h-4 bg-slate-800 rounded mb-4" />
                <div className="space-y-2 mb-6">
                  <div className="h-3 bg-slate-800 rounded" />
                  <div className="h-3 bg-slate-800 rounded" />
                  <div className="h-3 bg-slate-800 rounded w-3/4" />
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-slate-800 rounded-full" />
                  <div className="space-y-1 flex-1">
                    <div className="h-3 bg-slate-800 rounded w-1/2" />
                    <div className="h-2 bg-slate-800 rounded w-3/4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
})

// Static page - revalidate every hour
export const revalidate = 3600

export default function Home() {
  // Enhanced structured data for SEO and AI search
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'Promptly - AI Tool for Teachers',
      description: 'Hallucination-safe AI tool for teachers. Generate parent communications, student reports & professional messages. Reduce teacher workload with GDPR-compliant AI.',
      url: 'https://www.zazapromptly.com',
      applicationCategory: 'EducationalApplication',
      operatingSystem: 'Web',
      keywords: 'AI tool for teachers, AI for teacher reports, AI for parent communication, safe AI for teachers, hallucination-safe AI, teacher productivity apps',
      author: {
        '@type': 'Organization',
        name: 'Zaza Technologies',
        founder: {
          '@type': 'Person',
          name: 'Dr. Greg Blackburn',
          jobTitle: 'PhD, Professional Education',
          description: 'PhD-qualified founder with expertise in educational technology and AI safety'
        }
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.8',
        reviewCount: '12000',
        bestRating: '5',
        worstRating: '1'
      },
      offers: {
        '@type': 'Offer',
        url: 'https://www.zazapromptly.com/pricing',
        priceCurrency: 'USD',
        price: '15.00',
        availability: 'https://schema.org/InStock',
        validFrom: '2024-01-01',
        priceValidUntil: '2025-12-31'
      },
      audience: {
        '@type': 'EducationalAudience',
        educationalRole: 'teacher',
        geographicArea: ['United Kingdom', 'United States', 'Germany', 'France', 'Spain', 'Italy']
      },
      featureList: [
        'Hallucination-safe AI for accurate content',
        'Parent communication templates',
        'Student report generation',
        'GDPR-compliant data handling',
        'Multi-language support',
        'Education-specific AI training'
      ]
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Zaza Technologies',
      url: 'https://www.zazapromptly.com',
      logo: 'https://www.zazapromptly.com/og-default.png',
      description: 'Educational technology company providing AI tools for teachers, including Promptly for parent communication and report writing.',
      foundingDate: '2023',
      founder: {
        '@type': 'Person',
        name: 'Dr. Greg Blackburn',
        jobTitle: 'PhD, Professional Education'
      },
      sameAs: [
        'https://twitter.com/zazapromptly',
        'https://www.linkedin.com/company/zaza-technologies'
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        email: 'hello@zazatechnologies.com',
        availableLanguage: ['English', 'German', 'French', 'Spanish', 'Italian']
      }
    }
  ]
  
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="relative">
        {/* 1. HERO SECTION */}
        <section className="relative bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-900 min-h-[90vh] flex items-center overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"></div>
          </div>
          
          <div className="container relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              {/* Who it's for - Clear targeting */}
              <div className="inline-flex items-center px-4 py-2 bg-blue-600/20 border border-blue-500/30 rounded-full text-blue-300 text-sm font-medium mb-6">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                For teachers who write parent messages & report comments
              </div>
              
              {/* Main Headline */}
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                Write better parent messages in <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">minutes — not hours</span>
              </h1>
              
              {/* Subtext - Clear differentiation */}
              <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                The only <strong className="text-blue-400">hallucination-safe AI</strong> built for teachers writing report cards and parent communications.
              </p>
              
              {/* Primary CTA */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Link 
                  href="/signup"
                  className="inline-flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors shadow-xl text-lg"
                >
                  Try it free — 5 comments this month
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link 
                  href="#demo"
                  className="inline-flex items-center px-8 py-4 border-2 border-slate-600 text-slate-300 hover:bg-slate-800/50 font-semibold rounded-lg transition-colors text-lg"
                >
                  See how it works
                </Link>
              </div>
              
              {/* Quick credibility */}
              <p className="text-slate-400 text-sm">
                Created by <strong>Dr. Greg Blackburn, PhD in Professional Education</strong> • Trusted by 12,000+ teachers
              </p>
            </div>
          </div>
        </section>

        {/* Logo Cloud - Social Proof */}
        <LogoCloud className="bg-slate-800/50" />

        {/* BEFORE/AFTER PRODUCT PROOF */}
        <section className="py-16 bg-gradient-to-br from-slate-800 to-slate-900">
          <div className="container">
            <ScrollReveal>
              <div className="text-center mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  See Promptly transform your comments in seconds
                </h2>
                <p className="text-slate-300 max-w-2xl mx-auto">
                  Real examples from teachers using Promptly. Same information, professional tone, parent-friendly language.
                </p>
              </div>
            </ScrollReveal>

            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
              {/* Example 1 */}
              <ScrollReveal delay={0.1}>
                <div className="bg-slate-900/60 rounded-2xl p-6 border border-slate-700">
                  <div className="mb-6">
                    <div className="flex items-center mb-3">
                      <div className="w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center mr-3">
                        <span className="text-red-400 text-sm">⚠️</span>
                      </div>
                      <span className="text-red-400 font-medium text-sm">BEFORE</span>
                    </div>
                    <div className="bg-red-950/30 border border-red-500/30 rounded-lg p-4">
                      <p className="text-slate-300 text-sm leading-relaxed">
                        "Emma struggles with fractions and needs extra support at home."
                      </p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-center mb-3">
                      <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center mr-3">
                        <span className="text-green-400 text-sm">✨</span>
                      </div>
                      <span className="text-green-400 font-medium text-sm">AFTER (Supportive tone)</span>
                    </div>
                    <div className="bg-green-950/30 border border-green-500/30 rounded-lg p-4">
                      <p className="text-slate-200 text-sm leading-relaxed">
                        "Emma is working hard to understand fractions, which can be challenging for many Year 4 students. With some additional practice at home—perhaps using visual aids like pizza slices or fraction strips—I'm confident she'll make great progress. I'd be happy to share some specific activities that might help."
                      </p>
                    </div>
                  </div>

                  <div className="text-center">
                    <span className="inline-flex items-center px-3 py-1 bg-blue-600/20 border border-blue-500/50 rounded-full text-blue-300 text-xs">
                      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      Transformed in 3 seconds
                    </span>
                  </div>
                </div>
              </ScrollReveal>

              {/* Example 2 */}
              <ScrollReveal delay={0.2}>
                <div className="bg-slate-900/60 rounded-2xl p-6 border border-slate-700">
                  <div className="mb-6">
                    <div className="flex items-center mb-3">
                      <div className="w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center mr-3">
                        <span className="text-red-400 text-sm">⚠️</span>
                      </div>
                      <span className="text-red-400 font-medium text-sm">BEFORE</span>
                    </div>
                    <div className="bg-red-950/30 border border-red-500/30 rounded-lg p-4">
                      <p className="text-slate-300 text-sm leading-relaxed">
                        "Jake was talking during quiet reading time and disturbed others."
                      </p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-center mb-3">
                      <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center mr-3">
                        <span className="text-green-400 text-sm">✨</span>
                      </div>
                      <span className="text-green-400 font-medium text-sm">AFTER (Firm but Kind tone)</span>
                    </div>
                    <div className="bg-green-950/30 border border-green-500/30 rounded-lg p-4">
                      <p className="text-slate-200 text-sm leading-relaxed">
                        "During today's reading time, Jake found it challenging to maintain the quiet environment we need for concentration. We discussed the importance of respecting others' learning time, and he was receptive to the conversation. Moving forward, we'll work together on strategies to help him channel his enthusiasm more appropriately during independent work."
                      </p>
                    </div>
                  </div>

                  <div className="text-center">
                    <span className="inline-flex items-center px-3 py-1 bg-blue-600/20 border border-blue-500/50 rounded-full text-blue-300 text-xs">
                      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      Transformed in 3 seconds
                    </span>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* CTA after proof */}
            <ScrollReveal delay={0.3}>
              <div className="text-center mt-12">
                <Link 
                  href="#demo"
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg transition-colors shadow-xl text-lg"
                >
                  Try it with your own comment
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 13l-7 7-7-7m14-8l-7 7-7-7" />
                  </svg>
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* 2. PROBLEM SECTION - Workflow Pain */}
        <section className="section bg-slate-900">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <ScrollReveal>
                <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
                    You're not alone in this struggle
                  </h2>
                  <div className="bg-slate-800/60 border border-red-500/30 rounded-2xl p-8 text-left">
                    <p className="text-lg text-slate-200 leading-relaxed mb-6">
                      <strong className="text-red-400">"You stay up past midnight rewriting the same parent messages, second-guessing your tone, and copy-pasting from last year's reports.</strong>
                    </p>
                    <p className="text-lg text-slate-200 leading-relaxed mb-6">
                      Generic AI can hallucinate, misstate facts, or sound robotic. 
                    </p>
                    <p className="text-lg text-white font-semibold">
                      Teachers deserve better."
                    </p>
                  </div>
                </div>
              </ScrollReveal>

              {/* Competitive Alternatives - What teachers currently do */}
              <ScrollReveal delay={0.1}>
                <div className="grid md:grid-cols-3 gap-6 mb-16">
                  <div className="bg-slate-800/40 border border-slate-700 rounded-xl p-6 text-center">
                    <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">Copy-Pasting</h3>
                    <p className="text-slate-400 text-sm">From old reports and comment banks</p>
                  </div>
                  
                  <div className="bg-slate-800/40 border border-slate-700 rounded-xl p-6 text-center">
                    <div className="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">Spreadsheets</h3>
                    <p className="text-slate-400 text-sm">Google Docs comment banks</p>
                  </div>
                  
                  <div className="bg-slate-800/40 border border-slate-700 rounded-xl p-6 text-center">
                    <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">Generic AI</h3>
                    <p className="text-slate-400 text-sm">Risky hallucinations, robotic tone</p>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* 3. SOLUTION SECTION - Demo */}
        <section id="demo" className="section bg-slate-800/30">
          <div className="container">
            <ScrollReveal>
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  Promptly gives you trusted, ready-to-send drafts in your own professional voice — in seconds
                </h2>
                <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
                  Experience safe AI for teachers. Write your draft and let our hallucination-safe AI enhance it with perfect tone, length, and reading level.
                </p>
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={0.1}>
              <SnippetToolV2 />
            </ScrollReveal>

            {/* Post-demo CTA */}
            <ScrollReveal delay={0.2}>
              <div className="text-center mt-12">
                <Link 
                  href="/signup"
                  className="inline-flex items-center px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors shadow-lg text-lg"
                >
                  Start saving hours today — free plan included
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* 4. DIFFERENTIATION & FEATURES */}
        <section className="section bg-slate-900">
          <div className="container">
            <ScrollReveal>
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  Why teachers choose Promptly over ChatGPT
                </h2>
                <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                  Built specifically for education with the safety and accuracy teachers require.
                </p>
              </div>
            </ScrollReveal>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Safe & Accurate */}
              <ScrollReveal delay={0.1}>
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-600/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-3">Hallucination-Safe</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    <strong>Binary advantage:</strong> Won't generate false information or inappropriate content like generic AI
                  </p>
                </div>
              </ScrollReveal>

              {/* Tone Tutor */}
              <ScrollReveal delay={0.2}>
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-600/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-3">Emotional Tone Tutor</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    <strong>10x faster</strong> than rewriting — perfect professional tone every time
                  </p>
                </div>
              </ScrollReveal>

              {/* Educator-Built */}
              <ScrollReveal delay={0.3}>
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-600/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-3">Pedagogy-First AI</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    <strong>Built by educators</strong> who understand the nuances of school communication
                  </p>
                </div>
              </ScrollReveal>

              {/* Translation */}
              <ScrollReveal delay={0.4}>
                <div className="text-center">
                  <div className="w-16 h-16 bg-orange-600/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-3">Instant Translation</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Communicate with all families — <strong>translation included</strong> in every plan
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* CHATGPT COMPARISON TABLE */}
        <section className="py-20 bg-gradient-to-br from-slate-800 to-slate-900">
          <div className="container">
            <ScrollReveal>
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  Promptly vs ChatGPT for Teachers
                </h2>
                <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                  See why 12,000+ teachers switched from generic AI to education-specific tools.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <div className="max-w-5xl mx-auto">
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                  {/* Table Header */}
                  <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-6">
                    <div className="grid grid-cols-3 gap-8 items-center">
                      <div className="text-center">
                        <h3 className="text-xl font-bold text-white">Feature</h3>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center mb-2">
                          <img src="/images/logo/zaza-logo.svg" alt="Promptly" className="h-6 w-6 mr-2" />
                          <h3 className="text-xl font-bold text-white">Promptly</h3>
                        </div>
                        <div className="text-purple-200 text-sm">€14.99/month</div>
                      </div>
                      <div className="text-center">
                        <h3 className="text-xl font-bold text-white">ChatGPT Plus</h3>
                        <div className="text-purple-200 text-sm">€20/month</div>
                      </div>
                    </div>
                  </div>

                  {/* Table Body */}
                  <div className="divide-y divide-slate-200">
                    <div className="px-8 py-6 grid grid-cols-3 gap-8 items-center">
                      <div className="font-semibold text-slate-900">Hallucination Safety</div>
                      <div className="text-center">
                        <div className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          Built-in safeguards
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="inline-flex items-center px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-semibold">
                          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                          Can hallucinate
                        </div>
                      </div>
                    </div>

                    <div className="px-8 py-6 grid grid-cols-3 gap-8 items-center bg-slate-50">
                      <div className="font-semibold text-slate-900">Education-Specific Training</div>
                      <div className="text-center">
                        <div className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          Pedagogy-first AI
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="inline-flex items-center px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-semibold">
                          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                          General purpose
                        </div>
                      </div>
                    </div>

                    <div className="px-8 py-6 grid grid-cols-3 gap-8 items-center">
                      <div className="font-semibold text-slate-900">GDPR Compliance</div>
                      <div className="text-center">
                        <div className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          Full compliance
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="inline-flex items-center px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-semibold">
                          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          May train on data
                        </div>
                      </div>
                    </div>

                    <div className="px-8 py-6 grid grid-cols-3 gap-8 items-center bg-slate-50">
                      <div className="font-semibold text-slate-900">Parent-Appropriate Tone</div>
                      <div className="text-center">
                        <div className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          Always professional
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="inline-flex items-center px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-semibold">
                          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                          Inconsistent tone
                        </div>
                      </div>
                    </div>

                    <div className="px-8 py-6 grid grid-cols-3 gap-8 items-center">
                      <div className="font-semibold text-slate-900">Setup Complexity</div>
                      <div className="text-center">
                        <div className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          Ready to use
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="inline-flex items-center px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-semibold">
                          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                          Requires prompting
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Table Footer */}
                  <div className="bg-gradient-to-r from-purple-50 to-blue-50 px-8 py-6">
                    <div className="grid grid-cols-3 gap-8 items-center">
                      <div className="text-slate-600 text-sm font-medium">
                        Best Choice for Teachers
                      </div>
                      <div className="text-center">
                        <Link 
                          href="/signup"
                          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-lg transition-colors"
                        >
                          Try Promptly Free
                          <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </Link>
                      </div>
                      <div className="text-center">
                        <div className="text-slate-600 text-sm">
                          Requires subscription + complex prompting
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Quick benefit callout */}
            <ScrollReveal delay={0.2}>
              <div className="text-center mt-12">
                <div className="inline-flex items-center px-6 py-3 bg-green-900/20 border border-green-500/30 rounded-full text-green-300">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                  <span className="font-semibold">Save €60+ per year + get education-specific AI</span>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* 5. SOCIAL PROOF */}
        <section className="section bg-slate-800/30">
          <div className="container">
            <ScrollReveal>
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  Trusted by teachers worldwide
                </h2>
                <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                  Join thousands of educators who've transformed their practice with AI writing assistance designed specifically for teachers.
                </p>
              </div>
            </ScrollReveal>

            <EnhancedTestimonials 
              testimonials={quickTestimonials}
              title=""
              subtitle=""
              className=""
              variant="grid"
            />

            {/* Stats */}
            <ScrollReveal delay={0.2}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 text-center">
                <div>
                  <div className="text-4xl font-bold text-blue-400 mb-2">12,000+</div>
                  <p className="text-slate-400">Teachers using Promptly</p>
                </div>
                <div>
                  <div className="text-4xl font-bold text-green-400 mb-2">10x</div>
                  <p className="text-slate-400">Faster than manual writing</p>
                </div>
                <div>
                  <div className="text-4xl font-bold text-purple-400 mb-2">5 mins</div>
                  <p className="text-slate-400">Average time saved per comment</p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Traditional testimonials for additional social proof */}
        <Testimonials className="bg-slate-900" />

        {/* FOUNDER SECTION - Trust Building */}
        <section className="py-20 bg-white">
          <div className="container">
            <div className="max-w-6xl mx-auto">
              <ScrollReveal>
                <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-slate-200">
                  <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left side: Founder Photo */}
                    <div className="order-2 lg:order-1 flex justify-center lg:justify-start">
                      <div className="relative">
                        <div className="w-80 h-80 rounded-full overflow-hidden shadow-xl border-4 border-slate-100">
                          <Image
                            src="/images/founder-new.jpg"
                            alt="Dr Greg Blackburn — Founder & CEO, Zaza Technologies"
                            width={320}
                            height={320}
                            loading="lazy"
                            decoding="async"
                            className="w-full h-full object-cover"
                            sizes="(max-width: 768px) 240px, 320px"
                            priority={false}
                          />
                        </div>
                        {/* Decorative elements */}
                        <div className="absolute -top-4 -right-4 w-8 h-8 bg-blue-500 rounded-full opacity-20"></div>
                        <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-purple-500 rounded-full opacity-15"></div>
                      </div>
                    </div>
                    
                    {/* Right side: Founder Bio */}
                    <div className="order-1 lg:order-2 space-y-6">
                      <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
                          Dr Greg Blackburn
                        </h2>
                        <p className="text-xl text-blue-600 font-semibold mb-6">
                          Founder & CEO, Zaza Technologies
                        </p>
                      </div>
                      
                      <div className="prose prose-lg max-w-none">
                        <p className="text-slate-700 leading-relaxed mb-4">
                          Dr Greg Blackburn holds a <strong className="text-slate-900">PhD in Professional Education</strong> from City, University of London, where his research focused on <strong className="text-slate-900">critical thinking and problem-solving in student-centred eLearning</strong>. With over 20 years' experience in <strong className="text-slate-900">Learning & Development and educational technology</strong>, Greg has worked across universities, corporate training, and EdTech innovation.
                        </p>
                        
                        <p className="text-slate-700 leading-relaxed">
                          He founded <strong className="text-slate-900">Zaza Technologies</strong> with a simple mission: to give teachers back their <strong className="text-slate-900">time, confidence, and creativity</strong> by building safe, empathetic AI tools that actually reduce workload. As both a researcher and a parent, Greg understands the pressures teachers face and is committed to creating trustworthy solutions that empower educators worldwide.
                        </p>
                      </div>
                      
                      {/* Credentials badges */}
                      <div className="flex flex-wrap gap-3 pt-4">
                        <div className="inline-flex items-center px-4 py-2 bg-blue-50 border border-blue-200 rounded-full">
                          <svg className="w-4 h-4 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253" />
                          </svg>
                          <span className="text-sm font-medium text-blue-700">PhD in Professional Education</span>
                        </div>
                        
                        <div className="inline-flex items-center px-4 py-2 bg-purple-50 border border-purple-200 rounded-full">
                          <svg className="w-4 h-4 text-purple-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                          </svg>
                          <span className="text-sm font-medium text-purple-700">20+ Years EdTech</span>
                        </div>
                        
                        <div className="inline-flex items-center px-4 py-2 bg-green-50 border border-green-200 rounded-full">
                          <svg className="w-4 h-4 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                          <span className="text-sm font-medium text-green-700">Parent & Educator</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* 6. FINAL CTA */}
        <section className="section bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-900">
          <div className="container">
            <ScrollReveal>
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                  Ready to get your evenings back?
                </h2>
                <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
                  Join 12,000+ teachers who've stopped staying up late writing reports. Start with 5 free comments this month.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                  <Link 
                    href="/signup"
                    className="inline-flex items-center px-10 py-5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors shadow-2xl text-xl"
                  >
                    Start saving hours today — free plan included
                    <svg className="ml-3 w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
                
                <p className="text-slate-400 text-sm">
                  No credit card required • 5 comments free this month • Created by teachers, for teachers
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </div>
    </>
  )
}