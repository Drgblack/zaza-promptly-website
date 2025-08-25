import { Metadata } from 'next'
import EmailCaptureSection from '@/components/email/EmailCaptureSection'

export const metadata: Metadata = {
  title: 'Head Teachers & Leaders - AI Solutions | Promptly',
  description: 'Leadership tools for head teachers, principals, and school administrators. Strategic AI for educational leadership.',
  keywords: ['head teachers', 'school leaders', 'principals', 'educational leadership', 'admin tools'],
  openGraph: {
    title: 'Head Teachers & Leaders - AI Solutions | Promptly',
    description: 'Leadership tools for head teachers and school administrators.',
    type: 'website',
  },
}

export default function HeadTeachersLeadersPage() {
  return (
    <main className="min-h-screen">
      <section className="bg-gradient-to-br from-slate-50 to-gray-100 dark:from-slate-900 dark:to-slate-800 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-100 dark:text-white mb-6">
              AI Solutions for Head Teachers & Leaders
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Strategic AI tools for educational leadership, school management, and administrative efficiency.
            </p>
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-semibold text-slate-100 dark:text-white mb-4">
                Coming Soon for School Leaders
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                We're developing leadership-focused AI tools for head teachers and administrators.
              </p>
            </div>
          </div>
        </div>
      </section>

      <EmailCaptureSection 
        title="Early Access for School Leaders"
        description="Be the first to access AI tools designed for educational leadership."
        placeholder="Enter your email for leadership updates"
        buttonText="Get Early Access"
        source="head-teachers-leaders-solutions"
      />
    </main>
  )
}