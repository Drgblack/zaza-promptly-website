import { Metadata } from 'next'
import Link from 'next/link'
import { getAllCaseStudies } from '@/lib/case-studies'
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
  const caseStudies = await getAllCaseStudies()

  return (
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {caseStudies.map((caseStudy) => (
                  <CaseStudyCard 
                    key={caseStudy.slug} 
                    caseStudy={caseStudy} 
                  />
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
  )
}
