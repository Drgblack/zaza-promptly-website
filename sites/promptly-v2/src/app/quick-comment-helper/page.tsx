import { Metadata } from 'next'
import EmailCaptureSection from '@/components/email/EmailCaptureSection'

export const metadata: Metadata = {
  title: 'Quick Comment Helper - AI Report Comments | Promptly',
  description: 'Generate professional report comments instantly with our AI-powered Quick Comment Helper. Save time on student reports with context-aware suggestions.',
  keywords: ['report comments', 'teacher reports', 'AI comments', 'student assessments', 'report writing'],
  openGraph: {
    title: 'Quick Comment Helper - AI Report Comments | Promptly',
    description: 'Generate professional report comments instantly with our AI-powered Quick Comment Helper.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Quick Comment Helper - AI Report Comments | Promptly',
    description: 'Generate professional report comments instantly with our AI-powered Quick Comment Helper.',
  },
}

export default function QuickCommentHelperPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-900 dark:to-slate-800 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Quick Comment Helper
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Generate professional, personalized report comments in seconds with our AI-powered tool designed specifically for teachers.
            </p>
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Coming Soon!
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                We're putting the finishing touches on our Quick Comment Helper tool. 
                Leave your email below to be the first to know when it's ready.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Preview */}
      <section className="py-16 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
              What to Expect
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Instant Generation</h3>
                <p className="text-gray-600 dark:text-gray-400">Generate contextual comments in seconds, not minutes</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Smart Suggestions</h3>
                <p className="text-gray-600 dark:text-gray-400">AI-powered recommendations based on student performance</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Privacy First</h3>
                <p className="text-gray-600 dark:text-gray-400">Student data never stored, always protected</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Email Capture */}
      <EmailCaptureSection 
        title="Get Early Access"
        description="Be among the first teachers to try our Quick Comment Helper tool."
        placeholder="Enter your email for early access"
        buttonText="Notify Me"
        source="quick-comment-helper"
      />
    </main>
  )
}