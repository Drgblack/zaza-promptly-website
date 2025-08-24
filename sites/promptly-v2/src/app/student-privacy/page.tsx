import { Metadata } from 'next'
import EmailCaptureSection from '@/components/email/EmailCaptureSection'

export const metadata: Metadata = {
  title: 'Student Privacy Protected | Promptly',
  description: 'Learn how we protect student data and privacy. Our comprehensive approach to keeping student information safe and secure.',
  keywords: ['student privacy', 'data protection', 'FERPA', 'GDPR', 'student safety'],
  openGraph: {
    title: 'Student Privacy Protected | Promptly',
    description: 'Learn how we protect student data and privacy.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Student Privacy Protected | Promptly',
    description: 'Learn how we protect student data and privacy.',
  },
}

export default function StudentPrivacyPage() {
  return (
    <main className="min-h-screen">
      <section className="bg-gradient-to-br from-violet-50 to-purple-100 dark:from-slate-900 dark:to-slate-800 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Student Privacy Protected
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Your students' privacy and data security are our top priorities. Learn about our comprehensive protection measures.
            </p>
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Comprehensive Privacy Documentation Coming Soon
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                We're finalizing our detailed privacy documentation, including FERPA compliance, data handling procedures, and security measures. Be the first to access this important information.
              </p>
            </div>
          </div>
        </div>
      </section>

      <EmailCaptureSection 
        title="Get Privacy Documentation Updates"
        description="Be notified when our comprehensive student privacy documentation is available."
        placeholder="Enter your email for privacy updates"
        buttonText="Notify Me"
        source="student-privacy"
      />
    </main>
  )
}