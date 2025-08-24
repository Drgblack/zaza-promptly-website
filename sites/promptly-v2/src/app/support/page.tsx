import { Metadata } from 'next'
import Link from 'next/link'
import EmailCaptureSection from '@/components/email/EmailCaptureSection'

export const metadata: Metadata = {
  title: 'Support Center - Get Help | Promptly',
  description: 'Find answers to your questions, get technical support, and learn how to make the most of Promptly for your classroom.',
  keywords: ['support', 'help', 'teacher support', 'technical help', 'contact support'],
  openGraph: {
    title: 'Support Center - Get Help | Promptly',
    description: 'Find answers to your questions and get the help you need with Promptly.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Support Center - Get Help | Promptly',
    description: 'Find answers to your questions and get the help you need with Promptly.',
  },
}

export default function SupportPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 to-emerald-100 dark:from-slate-900 dark:to-slate-800 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Support Center
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              We're here to help you succeed. Find answers, get support, and make the most of your Promptly experience.
            </p>
          </div>
        </div>
      </section>

      {/* Support Options */}
      <section className="py-16 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
              How Can We Help?
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* FAQ */}
              <Link href="/faq" className="group">
                <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-6 h-full hover:shadow-xl transition-shadow">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    Frequently Asked Questions
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Find quick answers to the most common questions about Promptly and our AI tools.
                  </p>
                </div>
              </Link>

              {/* Contact */}
              <Link href="/contact" className="group">
                <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-6 h-full hover:shadow-xl transition-shadow">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                    Contact Support
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Get in touch with our support team for personalized help and technical assistance.
                  </p>
                </div>
              </Link>

              {/* Learning Centre */}
              <Link href="/learning-centre" className="group">
                <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-6 h-full hover:shadow-xl transition-shadow">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                    Learning Centre
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Explore guides, tutorials, and best practices to maximize your teaching efficiency.
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Help */}
      <section className="py-16 bg-gray-50 dark:bg-slate-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white dark:bg-slate-900 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Can't Find What You're Looking For?
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Our comprehensive support system is coming soon. Leave your email to be notified when it's ready.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-600 dark:text-gray-400">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Coming Soon:</h3>
                  <ul className="space-y-1">
                    <li>• Live chat support</li>
                    <li>• Video tutorials</li>
                    <li>• Teacher community forums</li>
                    <li>• Comprehensive help documentation</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">For Now:</h3>
                  <ul className="space-y-1">
                    <li>• Check our <Link href="/faq" className="text-blue-600 dark:text-blue-400 hover:underline">FAQ page</Link></li>
                    <li>• Use our <Link href="/contact" className="text-blue-600 dark:text-blue-400 hover:underline">contact form</Link></li>
                    <li>• Browse our <Link href="/learning-centre" className="text-blue-600 dark:text-blue-400 hover:underline">Learning Centre</Link></li>
                    <li>• Read our <Link href="/blog" className="text-blue-600 dark:text-blue-400 hover:underline">latest blog posts</Link></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Email Capture */}
      <EmailCaptureSection 
        title="Stay Updated on Support Improvements"
        description="Be the first to know when our full support center launches."
        placeholder="Enter your email for support updates"
        buttonText="Notify Me"
        source="support"
      />
    </main>
  )
}