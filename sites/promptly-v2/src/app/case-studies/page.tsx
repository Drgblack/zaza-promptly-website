import { Metadata } from 'next'
import Link from 'next/link'
import { getAllCaseStudies } from '@/content/case-studies'
import CaseStudyCard from '@/components/marketing/CaseStudyCard'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.zazapromptly.com'

export const metadata: Metadata = {
  title: 'Case Studies | Promptly - Real Stories from Educators',
  description: 'Discover how teachers worldwide are saving time, improving feedback, and transforming their practice with Promptly. Real stories, measurable results.',
  alternates: {
    canonical: `${baseUrl}/case-studies`,
  },
  openGraph: {
    title: 'Case Studies | Promptly',
    description: 'Real stories from educators transforming their practice with AI-powered teaching tools',
    type: 'website',
    url: 'https://www.zazapromptly.com/case-studies',
  },
}

export default async function CaseStudiesPage() {
  const caseStudies = getAllCaseStudies()
  
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    numberOfItems: caseStudies.length,
    itemListElement: caseStudies.map((caseStudy, index) => ({
      '@type': 'Article',
      position: index + 1,
      url: `https://www.zazapromptly.com/case-studies/${caseStudy.slug}`,
      headline: caseStudy.title,
      description: caseStudy.excerpt,
      author: {
        '@type': 'Person',
        name: caseStudy.author,
        jobTitle: caseStudy.role,
        worksFor: {
          '@type': 'EducationalOrganization',
          name: caseStudy.org
        }
      },
      publisher: {
        '@type': 'Organization',
        name: 'Zaza Technologies',
        logo: {
          '@type': 'ImageObject',
          url: 'https://www.zazapromptly.com/images/zaza-logo.png'
        }
      },
      datePublished: caseStudy.dateISO,
      image: caseStudy.cover
    }))
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen bg-slate-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-800 to-slate-900 py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-white mb-6">
              Real Stories from the Classroom
            </h1>
            <p className="text-xl text-slate-300 mb-8">
              Discover how educators worldwide are transforming their practice with Promptly. 
              Real challenges, practical solutions, measurable results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/waitlist"
                className="inline-flex items-center px-8 py-4 bg-brand-600 hover:bg-brand-700 text-white font-semibold rounded-lg transition-colors shadow-card focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 focus:ring-offset-slate-900"
              >
                Start Your Story
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                href="/blog"
                className="inline-flex items-center px-8 py-4 bg-transparent hover:bg-white/5 text-white font-semibold rounded-lg border border-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 focus:ring-offset-slate-900"
              >
                Read Our Blog
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="section">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            {caseStudies.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {caseStudies.map((caseStudy) => (
                  <div 
                    key={caseStudy.slug}
                    className="group bg-slate-800/60 rounded-2xl border border-white/10 hover:bg-slate-800 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 overflow-hidden"
                  >
                    <Link href={`/case-studies/${caseStudy.slug}`} className="block">
                      {/* Image */}
                      <div className="aspect-video bg-slate-700 relative overflow-hidden">
                        {caseStudy.cover ? (
                          <img
                            src={caseStudy.cover}
                            alt={caseStudy.heroAlt || caseStudy.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-brand-600/20 to-brand-800/20 flex items-center justify-center">
                            <div className="text-center text-slate-400">
                              <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                              </svg>
                              <div className="text-sm font-medium">Case Study</div>
                            </div>
                          </div>
                        )}
                        
                        {/* Badge */}
                        <div className="absolute top-4 left-4">
                          <span className="inline-flex items-center px-2.5 py-1 bg-brand-600/90 text-white text-xs font-medium rounded-full backdrop-blur-sm">
                            {caseStudy.kicker || 'Case Study'}
                          </span>
                        </div>
                      </div>
                      
                      {/* Content */}
                      <div className="p-6">
                        <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-brand-300 transition-colors line-clamp-2">
                          {caseStudy.title}
                        </h3>
                        
                        <p className="text-slate-400 mb-4 line-clamp-2 leading-relaxed">
                          {caseStudy.excerpt}
                        </p>
                        
                        {/* Author Info */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-brand-600 to-brand-800 rounded-full flex items-center justify-center">
                              <span className="text-white font-semibold text-sm">
                                {caseStudy.author.split(' ').map(n => n[0]).join('')}
                              </span>
                            </div>
                            <div>
                              <div className="font-medium text-white text-sm">
                                {caseStudy.author}
                              </div>
                              <div className="text-slate-500 text-xs">
                                {caseStudy.role}
                              </div>
                            </div>
                          </div>
                          
                          <div className="text-right">
                            <div className="text-slate-500 text-xs">
                              {caseStudy.org}
                            </div>
                            <div className="text-slate-600 text-xs mt-1">
                              {new Date(caseStudy.dateISO).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                              })}
                            </div>
                          </div>
                        </div>
                        
                        {/* Read More */}
                        <div className="flex items-center text-brand-400 text-sm font-medium mt-4 group-hover:text-brand-300 transition-colors">
                          Read the case study
                          <svg className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <h2 className="text-2xl font-semibold text-white mb-8">
                  Real teacher success stories
                </h2>
                
                {/* Success Stories Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 max-w-6xl mx-auto">
                  <div className="bg-slate-800/60 rounded-xl p-6 border border-slate-700 text-left">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        SM
                      </div>
                      <div className="ml-3">
                        <h3 className="text-white font-semibold">Sarah M.</h3>
                        <p className="text-slate-400 text-xs">Year 4 Teacher, London</p>
                      </div>
                    </div>
                    <p className="text-slate-300 text-sm mb-4">
                      "Report card comments used to take me 4 hours. Now I write my thoughts naturally and Promptly makes them sound professional. Cut my time to 45 minutes!"
                    </p>
                    <div className="text-green-400 text-xs font-semibold">
                      ⏱️ Saved 3+ hours per term
                    </div>
                  </div>

                  <div className="bg-slate-800/60 rounded-xl p-6 border border-slate-700 text-left">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        JT
                      </div>
                      <div className="ml-3">
                        <h3 className="text-white font-semibold">James T.</h3>
                        <p className="text-slate-400 text-xs">Secondary Maths, Manchester</p>
                      </div>
                    </div>
                    <p className="text-slate-300 text-sm mb-4">
                      "Parent emails about behavior issues are so much easier now. I write what happened, Promptly helps me say it diplomatically. Parents respond so much better."
                    </p>
                    <div className="text-blue-400 text-xs font-semibold">
                      📈 Improved parent relationships
                    </div>
                  </div>

                  <div className="bg-slate-800/60 rounded-xl p-6 border border-slate-700 text-left">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        LR
                      </div>
                      <div className="ml-3">
                        <h3 className="text-white font-semibold">Lisa R.</h3>
                        <p className="text-slate-400 text-xs">Primary Teacher, Birmingham</p>
                      </div>
                    </div>
                    <p className="text-slate-300 text-sm mb-4">
                      "I was staying up until midnight writing personalized comments for 30 students. Promptly keeps the personal touch but saves me hours every week."
                    </p>
                    <div className="text-purple-400 text-xs font-semibold">
                      🌙 Got evenings back
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/signup"
                    className="inline-flex items-center px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors"
                  >
                    Join These Teachers
                    <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                  <Link
                    href="/blog"
                    className="inline-flex items-center px-8 py-4 border-2 border-slate-600 text-slate-300 hover:bg-slate-800/50 font-semibold rounded-lg transition-colors"
                  >
                    Read More Stories
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-slate-800/50 py-16">
        <div className="container text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Write Your Success Story?
          </h2>
          <p className="text-xl text-slate-300 mb-8">
            Join thousands of educators who are already transforming their practice with Promptly.
          </p>
          <Link 
            href="/waitlist"
            className="inline-flex items-center px-8 py-4 bg-brand-600 hover:bg-brand-700 text-white font-semibold rounded-lg transition-colors shadow-card focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 focus:ring-offset-slate-900"
          >
            Get Started Today
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
