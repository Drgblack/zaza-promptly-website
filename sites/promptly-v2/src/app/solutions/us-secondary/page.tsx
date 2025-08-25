import { Metadata } from 'next'
import EmailCaptureSection from '@/components/email/EmailCaptureSection'

export const metadata: Metadata = {
  title: 'US Secondary Teachers - AI Solutions | Promptly',
  description: 'AI tools designed for US high school and middle school teachers. Streamline grading, feedback, and communication.',
  keywords: ['US secondary teachers', 'high school teachers', 'middle school', 'US education', 'teacher AI tools'],
  openGraph: {
    title: 'US Secondary Teachers - AI Solutions | Promptly',
    description: 'AI tools designed for US high school and middle school teachers.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'US Secondary Teachers - AI Solutions | Promptly',
    description: 'AI tools designed for US high school and middle school teachers.',
  },
}

export default function USSecondaryPage() {
  return (
    <main className="min-h-screen">
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-900 dark:to-slate-800 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-100 dark:text-white mb-6">
              AI Solutions for US Secondary Teachers
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Tools built for the unique demands of US middle and high school education, from Common Core to state standards.
            </p>
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-semibold text-slate-100 dark:text-white mb-4">
                Coming Soon for US Secondary
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                We're developing tools specifically for US secondary teachers. Get early access to features designed for your grade levels and standards.
              </p>
            </div>
          </div>
        </div>
      </section>

      <EmailCaptureSection 
        title="Early Access for US Secondary Teachers"
        description="Be the first to access AI tools designed for US middle and high school teachers."
        placeholder="Enter your email for US secondary early access"
        buttonText="Get Early Access"
        source="us-secondary-solutions"
      />
    </main>
  )
}