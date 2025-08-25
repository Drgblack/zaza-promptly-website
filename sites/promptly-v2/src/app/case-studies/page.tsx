import { Metadata } from 'next'
import Link from 'next/link'
import { getAllCaseStudies } from '@/lib/case-studies'
import CaseStudyCard from '@/components/marketing/CaseStudyCard'

export const metadata: Metadata = {
  title: 'Case Studies | Promptly - Real Stories from Educators',
  description: 'Discover how teachers worldwide are saving time, improving feedback, and transforming their practice with Promptly. Real stories, measurable results.',
  alternates: {
    canonical: '/case-studies',
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
                <h2 className="text-2xl font-semibold text-white mb-4">
                  Case studies coming soon
                </h2>
                <p className="text-slate-400 mb-8">
                  We&rsquo;re working with educators to share their amazing stories. Check back soon!
                </p>
                <Link
                  href="/blog"
                  className="inline-flex items-center px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white font-semibold rounded-lg transition-colors"
                >
                  Read Our Blog Instead
                </Link>
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
