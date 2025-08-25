import { Metadata } from 'next'
import EmailCaptureSection from '@/components/email/EmailCaptureSection'

export const metadata: Metadata = {
  title: 'International Teachers - AI Solutions | Promptly',
  description: 'AI tools for international teachers. Multi-curriculum support and culturally-aware educational AI.',
  keywords: ['international teachers', 'global education', 'multi-curriculum', 'international schools'],
  openGraph: {
    title: 'International Teachers - AI Solutions | Promptly',
    description: 'AI tools for international teachers and global education.',
    type: 'website',
  },
}

export default function InternationalPage() {
  return (
    <main className="min-h-screen">
      <section className="bg-gradient-to-br from-teal-50 to-cyan-100 dark:from-slate-900 dark:to-slate-800 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-100 dark:text-white mb-6">
              AI Solutions for International Teachers
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Multi-curriculum support and culturally-aware AI tools for global education.
            </p>
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-semibold text-slate-100 dark:text-white mb-4">
                Coming Soon for International Educators
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                We're developing multi-curriculum support for international teachers and schools.
              </p>
            </div>
          </div>
        </div>
      </section>

      <EmailCaptureSection 
        title="Early Access for International Teachers"
        description="Be the first to access AI tools designed for international education."
        placeholder="Enter your email for international updates"
        buttonText="Get Early Access"
        source="international-solutions"
      />
    </main>
  )
}