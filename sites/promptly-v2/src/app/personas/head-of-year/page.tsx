import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Head of Year Solutions | Promptly - AI Comments for Pastoral Care',
  description: 'AI-powered comment generation for Heads of Year. Pastoral care, behavioral interventions, and year group management made simple.',
}

export default function HeadOfYearPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <section className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900 dark:to-purple-800 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-20 h-20 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-8">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Head of Year Solutions
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Streamline your pastoral care responsibilities with AI-powered comments designed for year group management, behavioral interventions, and parent communication.
          </p>
          <Link 
            href="/waitlist"
            className="inline-flex items-center px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors shadow-lg"
          >
            Start Free Trial
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Pastoral Care Comments</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Generate thoughtful, empathetic comments for pastoral care situations, student wellbeing check-ins, and personal development discussions.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Behavioral Interventions</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Professional, constructive comments for addressing behavioral concerns, celebrating improvements, and communicating with parents.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Year Group Overview</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Comprehensive comments that capture the bigger picture of student development across your year group.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Parent Communication</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Clear, sensitive communication templates for difficult conversations and celebrating student achievements.
              </p>
            </div>
          </div>

          <div className="text-center">
            <Link 
              href="/personas"
              className="inline-flex items-center text-purple-600 hover:text-purple-700 font-medium"
            >
              ← Back to All Solutions
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}