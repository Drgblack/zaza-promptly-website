import Link from 'next/link'
import { Metadata } from 'next'
import { PERSONAS } from '@/content/personas'

// Static page - revalidate every hour
export const revalidate = 3600

export const metadata: Metadata = {
  title: 'AI Tools for Teachers by Role – UK Primary, US Secondary & More | Promptly',
  description: 'Discover AI solutions for your teaching context: UK Primary, US Secondary, Special Education, International, EdTech-Savvy, and Head Teachers. Safe AI built for schools.',
  keywords: 'AI tools for teachers, UK primary teacher AI, US secondary teacher AI, special education AI, international teacher tools, edtech AI tools, head teacher AI, teacher productivity apps',
  alternates: {
    canonical: '/personas',
  },
  openGraph: {
    title: 'AI Tools for Teachers by Role – UK Primary, US Secondary & More | Promptly',
    description: 'Discover AI solutions for your teaching context: UK Primary, US Secondary, Special Education, International, EdTech-Savvy, and Head Teachers. Safe AI built for schools.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Tools for Teachers by Role – UK Primary, US Secondary & More | Promptly',
    description: 'Discover AI solutions for your teaching context: UK Primary, US Secondary, Special Education, International, EdTech-Savvy, and Head Teachers. Safe AI built for schools.',
  },
}

export default function PersonasPage() {
  return (
    <div className="min-h-screen bg-slate-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-20">
        <div className="container">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              AI Solutions for Every Education Role
            </h1>
            <p className="text-lg text-slate-300 mb-4 max-w-[720px] mx-auto">
              Promptly serves teachers, leaders, and support staff across all education roles. 
              Each solution is tailored to your specific responsibilities and challenges.
            </p>
            <p className="text-slate-400 max-w-[720px] mx-auto">
              From classroom teachers managing 30+ students to SENCOs supporting individual needs, 
              discover how AI can transform your feedback process.
            </p>
          </div>
        </div>
      </section>

      {/* Personas Grid */}
      <section className="py-20">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {PERSONAS.map((persona) => (
              <Link 
                key={persona.slug} 
                href={`/personas/${persona.slug}`} 
                className="group focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-900 rounded-2xl"
              >
                <div className={`bg-gradient-to-br from-${persona.color}-500/10 to-${persona.color}-600/10 border border-${persona.color}-500/20 hover:border-${persona.color}-500/40 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 h-full`}>
                  <div className={`w-16 h-16 bg-${persona.color}-600 rounded-xl flex items-center justify-center mb-6 mx-auto`}>
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                      <path d={persona.icon} />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4 text-center">
                    {persona.name}
                  </h3>
                  <p className="text-slate-300 text-center mb-6 text-sm leading-relaxed">
                    {persona.tagline}
                  </p>
                  
                  {/* Key Features */}
                  <ul className="space-y-2 mb-6">
                    {persona.features.slice(0, 3).map((feature, index) => (
                      <li key={index} className="flex items-start text-xs text-slate-400">
                        <svg className={`w-3 h-3 text-${persona.color}-500 mr-2 flex-shrink-0 mt-0.5`} fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {feature.title}
                      </li>
                    ))}
                  </ul>
                  
                  <div className="text-center">
                    <span className={`inline-flex items-center text-${persona.color}-400 font-medium group-hover:text-${persona.color}-300 transition-colors`}>
                      Explore Solutions
                      <svg className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Links Band */}
      <section className="py-12 bg-slate-800/30 border-y border-white/5">
        <div className="container">
          <div className="text-center mb-8">
            <h2 className="text-lg font-semibold text-white mb-2">
              Explore More Resources
            </h2>
            <p className="text-slate-400 text-sm">
              Additional tools and resources to support your teaching
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/#snippet"
              className="inline-flex items-center px-6 py-3 bg-slate-700/60 hover:bg-slate-700/80 border border-white/10 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Try Snippet Tool
            </Link>
            <Link 
              href="/blog"
              className="inline-flex items-center px-6 py-3 bg-slate-700/60 hover:bg-slate-700/80 border border-white/10 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
              Learning Centre
            </Link>
            <Link 
              href="/free-resources"
              className="inline-flex items-center px-6 py-3 bg-slate-700/60 hover:bg-slate-700/80 border border-white/10 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Free Resources
            </Link>
            <Link 
              href="/pricing"
              className="inline-flex items-center px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-900"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              View Pricing
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="container text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Transform Your Comment Writing?
          </h2>
          <p className="text-lg text-purple-100 mb-8 max-w-2xl mx-auto">
            Join over 12,000 educators who are already saving hours every week with AI-powered comment generation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/pricing"
              className="inline-flex items-center px-8 py-4 bg-white hover:bg-gray-100 text-purple-600 font-semibold rounded-lg transition-colors shadow-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-purple-600"
            >
              Start Free Trial
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <Link 
              href="/#snippet"
              className="inline-flex items-center px-8 py-4 border-2 border-white hover:bg-white hover:text-purple-600 text-white font-semibold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-purple-600"
            >
              Try Demo Tool
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}