import Link from 'next/link'
import SnippetToolV2 from '@/components/sections/SnippetToolV2'
import LogoCloud from '@/components/marketing/LogoCloud'
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
  // Aggregate rating data from testimonials
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'Promptly',
    description: 'AI-powered comment generation for teachers. Save hours every week while maintaining the quality your students deserve.',
    brand: {
      '@type': 'Brand',
      name: 'Promptly'
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '10000',
      bestRating: '5',
      worstRating: '1'
    },
    offers: {
      '@type': 'Offer',
      url: 'https://www.zazapromptly.com/pricing',
      priceCurrency: 'GBP',
      price: '14.99',
      availability: 'https://schema.org/InStock',
      validFrom: '2024-01-01'
    },
    category: 'Educational Software',
    audience: {
      '@type': 'EducationalAudience',
      educationalRole: 'teacher'
    }
  }
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
              AI comments.{' '}
              <span className="text-blue-600 dark:text-blue-400 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Done in seconds.
              </span>
            </h1>
            
            {/* Subheading */}
            <p className="text-xl md:text-[22px] text-slate-300 leading-relaxed mb-8 max-w-3xl mx-auto">
              Transform your teaching with AI-powered comment generation. 
              Save hours every week while maintaining the quality your students deserve.
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

            {/* Trust Indicators */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-gray-600 dark:text-gray-400">
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
              Transform Your Comments with AI
            </h2>
            <p className="text-slate-300 mb-6">
              Write your draft comment and let AI enhance it with the perfect tone, length, and reading level—no signup required.
            </p>
          </div>
          <SnippetToolV2 />
        </div>
      </section>

      {/* Persona Tiles Section */}
      <section className="section bg-white dark:bg-gray-900">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Built for Every Education Role
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Discover AI comment solutions tailored to your specific teaching context and responsibilities.
            </p>
          </div>
          
          {/* Persona Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Teacher */}
            <Link href="/personas/teacher" className="group">
              <div className="rounded-2xl shadow-card border border-white/5 bg-slate-800/60 hover:bg-slate-800/80 transition p-8">
                <div className="size-8 bg-blue-600 rounded-lg flex items-center justify-center mb-6 mx-auto">
                  <svg className="size-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-4 text-center">Classroom Teacher</h3>
                <p className="text-slate-300 text-center">Primary, secondary, and subject-specific comment templates for all your students</p>
              </div>
            </Link>

            {/* Head of Year */}
            <Link href="/personas/head-of-year" className="group">
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900 dark:to-purple-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center">Head of Year</h3>
                <p className="text-gray-600 dark:text-gray-300 text-center">Pastoral care and behavioral comments for year group management</p>
              </div>
            </Link>

            {/* SLT */}
            <Link href="/personas/slt" className="group">
              <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900 dark:to-green-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center">Senior Leadership</h3>
                <p className="text-gray-600 dark:text-gray-300 text-center">Strategic, whole-school perspective comments for leadership teams</p>
              </div>
            </Link>

            {/* SENCO */}
            <Link href="/personas/senco" className="group">
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900 dark:to-orange-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center">SENCO</h3>
                <p className="text-gray-600 dark:text-gray-300 text-center">Specialized comments for students with additional learning needs</p>
              </div>
            </Link>

            {/* Tutor */}
            <Link href="/personas/tutor" className="group">
              <div className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900 dark:to-red-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center">Form Tutor</h3>
                <p className="text-gray-600 dark:text-gray-300 text-center">Personal development and tutor time comments for your tutor group</p>
              </div>
            </Link>

            {/* Admin */}
            <Link href="/personas/admin" className="group">
              <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900 dark:to-indigo-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v6a2 2 0 002 2h2m0 0h2m-2 0v4a2 2 0 002 2h6a2 2 0 002-2v-4m-8 0V9a2 2 0 012-2h2M9 5V3a2 2 0 012-2h2a2 2 0 012 2v2M9 5h4" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center">School Admin</h3>
                <p className="text-gray-600 dark:text-gray-300 text-center">Administrative and communication templates for school operations</p>
              </div>
            </Link>
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <Link 
              href="/personas"
              className="inline-flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Explore All Solutions
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <Testimonials className="bg-slate-900" />

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
              className="inline-flex items-center px-8 py-4 bg-brand-600 hover:bg-brand-700 text-white font-semibold rounded-lg transition-colors shadow-card focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 focus:ring-offset-slate-900"
            >
              Read Success Stories
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              href="/blog"
              className="inline-flex items-center px-8 py-4 bg-transparent hover:bg-white/5 text-white font-semibold rounded-lg border border-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 focus:ring-offset-slate-900"
            >
              Browse Teaching Tips
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
          <Link 
            href="/learning-centre"
            className="inline-flex items-center px-6 py-3 bg-slate-700/60 hover:bg-slate-700/80 text-white font-medium rounded-lg transition-colors border border-white/10"
          >
            Visit Learning Centre
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>
      </div>
    </>
  )
}
