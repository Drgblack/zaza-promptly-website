import Link from 'next/link'
import SnippetToolV2 from '@/components/sections/SnippetToolV2'
import LogoCloud from '@/components/marketing/LogoCloud'
import TestimonialsSection from '@/components/testimonials/TestimonialsSection'
import TrustBadges from '@/components/trust/TrustBadges'
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
          name: 'Greg Beams',
          jobTitle: 'PhD, Educational Technology',
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
        priceCurrency: 'GBP',
        price: '14.99',
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
        name: 'Greg Beams',
        jobTitle: 'PhD, Educational Technology'
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
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'AI Tool for Teachers | Safe AI for Teacher Reports & Parent Communication',
      description: 'Hallucination-safe AI tool for teachers. Generate parent communications, student reports & professional messages. Reduce teacher workload with GDPR-compliant AI.',
      url: 'https://www.zazapromptly.com',
      primaryImageOfPage: 'https://www.zazapromptly.com/og-default.png',
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://www.zazapromptly.com'
          }
        ]
      },
      mainEntity: {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Is using AI for teachers cheating?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'No, using AI tools like Promptly for administrative tasks is not cheating—it\'s working smarter. AI assists with time-consuming tasks while you focus on what matters most: teaching and connecting with students.'
            }
          },
          {
            '@type': 'Question',
            name: 'How is Promptly different from ChatGPT for teachers?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Promptly is specifically designed for education with hallucination-safe AI, GDPR compliance, and education-specific training. Unlike ChatGPT, it\'s built for the strict privacy and accuracy requirements of schools.'
            }
          },
          {
            '@type': 'Question',
            name: 'What makes AI hallucination-safe for teachers?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Hallucination-safe AI means the system won\'t generate false or inappropriate information. Promptly includes safety guardrails and is trained specifically on educational contexts to ensure accurate, appropriate content for school communications.'
            }
          }
        ]
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
        {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container py-20 md:py-32">
          <div className="text-center">
            {/* Main headline */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 dark:text-white mb-6 leading-tight max-w-[720px] mx-auto">
              AI Tool for Teachers:{' '}
              <span className="text-blue-600 dark:text-blue-400 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Safe AI for Teacher Reports
              </span>
            </h1>
            
            {/* Subheading */}
            <p className="text-xl md:text-[22px] text-slate-300 leading-relaxed mb-8 max-w-3xl mx-auto">
              Hallucination-safe AI for parent communication, student reports & professional messages. 
              Reduce teacher workload with GDPR-compliant AI that understands education.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link 
                href="/pricing" 
                className="group inline-flex items-center justify-center h-12 px-8 bg-purple-600 hover:bg-purple-700 text-white text-lg font-semibold rounded-lg transition-colors shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
              >
                <span className="mr-2">Start Free</span>
                <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
              </Link>
              <Link 
                href="/#snippet"
                className="inline-flex items-center justify-center h-12 px-8 border border-slate-600/60 hover:border-slate-400/60 bg-transparent text-slate-300 hover:text-white text-lg font-semibold rounded-lg transition-colors"
              >
                Try Snippet Tool
              </Link>
            </div>

            {/* Trust Indicators & Authority Signals */}
            <div className="mt-8 flex flex-col items-center justify-center gap-6">
              <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  7-day free trial
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  No credit card required
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  12,000+ teachers trust us
                </div>
              </div>
              
              {/* Authority Badges */}
              <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-gray-500 dark:text-gray-500">
                <div className="flex items-center bg-slate-800/60 px-3 py-2 rounded-full border border-green-600/20">
                  <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  GDPR Compliant
                </div>
                <div className="flex items-center bg-slate-800/60 px-3 py-2 rounded-full border border-blue-600/20">
                  <svg className="w-4 h-4 text-blue-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.84L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" clipRule="evenodd" />
                  </svg>
                  PhD-Designed Pedagogy
                </div>
                <div className="flex items-center bg-slate-800/60 px-3 py-2 rounded-full border border-purple-600/20">
                  <svg className="w-4 h-4 text-purple-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  Hallucination-Safe AI
                </div>
                <div className="flex items-center bg-slate-800/60 px-3 py-2 rounded-full border border-yellow-600/20">
                  <svg className="w-4 h-4 text-yellow-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  4.9/5 Teacher Rating
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            className="relative block w-full h-16 md:h-24 -mt-8"
            viewBox="0 0 1200 80"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M0,40 C300,10 600,70 900,40 C1000,25 1100,55 1200,40 L1200,80 L0,80 Z"
              className="fill-slate-800 stroke-white/10"
              strokeWidth="1"
            />
          </svg>
        </div>
      </section>

      {/* Logo Cloud Section */}
      <LogoCloud className="bg-slate-900" />

      {/* Snippet Tool Section */}
      <section id="snippet" className="section bg-slate-900">
        <div className="container">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">
              AI for Parent Communication & Teacher Reports
            </h2>
            <p className="text-slate-300 mb-6">
              Experience safe AI for teachers. Write your draft and let our hallucination-safe AI enhance it with perfect tone, length, and reading level—no signup required.
            </p>
          </div>
          <SnippetToolV2 />
          
          {/* Enhanced CTA after snippet tool */}
          <div className="text-center mt-12">
            <h3 className="text-xl font-semibold text-white mb-4">
              Ready to Save Hours Every Week?
            </h3>
            <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
              Created by <strong>Dr Greg Blackburn, PhD in Professional Education</strong> — 
              join 12,000+ teachers using hallucination-safe AI designed specifically for education.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/waitlist"
                className="inline-flex items-center px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors shadow-lg"
              >
                Start Free Trial — No Credit Card
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link 
                href="/personas"
                className="inline-flex items-center px-8 py-4 border border-purple-600 text-purple-400 hover:bg-purple-600/10 font-semibold rounded-lg transition-colors"
              >
                Find Your Teaching Role
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Persona Tiles Section */}
      <section className="section bg-white dark:bg-gray-900">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Best AI Tools for Teachers 2025: Built for Every Education Role
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Discover teacher productivity apps and AI solutions tailored to your specific teaching context. From report writing to parent emails, reduce teacher workload with AI.
            </p>
          </div>
          
          {/* Persona Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* UK Primary */}
            <Link href="/personas/uk-primary" className="group">
              <div className="rounded-2xl shadow-card border border-white/5 bg-slate-800/60 hover:bg-slate-800/80 transition p-8">
                <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mb-6 mx-auto">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-4 text-center">UK Primary Teacher</h3>
                <p className="text-slate-300 text-center text-sm">Stop losing evenings and weekends to report writing with UK curriculum-aligned AI</p>
              </div>
            </Link>

            {/* US Secondary */}
            <Link href="/personas/us-secondary" className="group">
              <div className="rounded-2xl shadow-card border border-white/5 bg-slate-800/60 hover:bg-slate-800/80 transition p-8">
                <div className="w-16 h-16 bg-red-600 rounded-xl flex items-center justify-center mb-6 mx-auto">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-4 text-center">US Secondary Teacher</h3>
                <p className="text-slate-300 text-center text-sm">Handle parent communication overload with confidence and perfect tone</p>
              </div>
            </Link>

            {/* Special Education */}
            <Link href="/personas/special-needs" className="group">
              <div className="rounded-2xl shadow-card border border-white/5 bg-slate-800/60 hover:bg-slate-800/80 transition p-8">
                <div className="w-16 h-16 bg-orange-600 rounded-xl flex items-center justify-center mb-6 mx-auto">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-4 text-center">Special Education Teacher</h3>
                <p className="text-slate-300 text-center text-sm">Celebrate every child&apos;s unique journey with sensitive, strength-based communication</p>
              </div>
            </Link>

            {/* International */}
            <Link href="/personas/international" className="group">
              <div className="rounded-2xl shadow-card border border-white/5 bg-slate-800/60 hover:bg-slate-800/80 transition p-8">
                <div className="w-16 h-16 bg-green-600 rounded-xl flex items-center justify-center mb-6 mx-auto">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-4 text-center">International Teacher</h3>
                <p className="text-slate-300 text-center text-sm">Break down language barriers and communicate with all families confidently</p>
              </div>
            </Link>

            {/* EdTech-Savvy */}
            <Link href="/personas/edtech-savvy" className="group">
              <div className="rounded-2xl shadow-card border border-white/5 bg-slate-800/60 hover:bg-slate-800/80 transition p-8">
                <div className="w-16 h-16 bg-purple-600 rounded-xl flex items-center justify-center mb-6 mx-auto">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-4 text-center">EdTech-Savvy Teacher</h3>
                <p className="text-slate-300 text-center text-sm">Modern AI that&apos;s actually designed for education, not just repurposed ChatGPT</p>
              </div>
            </Link>

            {/* Head Teacher */}
            <Link href="/personas/head-teacher" className="group">
              <div className="rounded-2xl shadow-card border border-white/5 bg-slate-800/60 hover:bg-slate-800/80 transition p-8">
                <div className="w-16 h-16 bg-indigo-600 rounded-xl flex items-center justify-center mb-6 mx-auto">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-4 text-center">Head Teacher / School Leader</h3>
                <p className="text-slate-300 text-center text-sm">Ensure whole-school excellence while supporting your teachers&apos; wellbeing</p>
              </div>
            </Link>
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/personas"
                className="inline-flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors shadow-lg"
              >
                Explore All Solutions
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <Link 
                href="/waitlist"
                className="inline-flex items-center px-8 py-4 border border-blue-600 text-blue-400 hover:bg-blue-600/10 font-semibold rounded-lg transition-colors"
              >
                Try Free Today
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* New Trust Badges Section */}
      <TrustBadges variant="default" showTitle={true} className="bg-slate-900/50" />

      {/* New Testimonials Section */}
      <TestimonialsSection variant="quick" className="bg-slate-900" />

      {/* Original Testimonials Section */}
      <Testimonials className="bg-slate-900/50" />

      {/* Case Studies Section */}
      <section className="bg-slate-800/30 py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">
              From the Classroom
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Real stories from educators who&rsquo;ve transformed their practice with Promptly. 
              Discover measurable results and practical insights.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/case-studies"
              className="inline-flex items-center px-8 py-4 bg-brand-600 hover:bg-brand-700 text-white font-semibold rounded-lg transition-colors shadow-card"
            >
              Read Success Stories
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              href="/waitlist"
              className="inline-flex items-center px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors shadow-card"
            >
              Start Your Journey Today
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Learning Centre Link */}
      <section className="bg-slate-800/30 py-12">
        <div className="container text-center">
          <h2 className="text-xl font-semibold text-white mb-4">
            Need More Resources?
          </h2>
          <p className="text-slate-300 mb-6">
            Explore our Learning Centre for expert insights, practical guides, and free resources.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/learning-centre"
              className="inline-flex items-center px-6 py-3 bg-slate-700/60 hover:bg-slate-700/80 text-white font-medium rounded-lg transition-colors border border-white/10"
            >
              Visit Learning Centre
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <Link 
              href="/free-resources"
              className="inline-flex items-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
            >
              Download Free Resources
            </Link>
          </div>
        </div>
      </section>
      </div>
    </>
  )
}
