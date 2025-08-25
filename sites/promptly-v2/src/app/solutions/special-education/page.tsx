import { Metadata } from 'next'
import EmailCaptureSection from '@/components/email/EmailCaptureSection'

export const metadata: Metadata = {
  title: 'Special Education Teachers - AI Solutions | Promptly',
  description: 'AI tools designed for special education teachers. Streamline IEP writing, behavior tracking, and individualized communication.',
  keywords: ['special education', 'SENCO', 'SEN', 'IEP', 'special needs teachers'],
  openGraph: {
    title: 'Special Education Teachers - AI Solutions | Promptly',
    description: 'AI tools designed for special education teachers.',
    type: 'website',
  },
}

export default function SpecialEducationPage() {
  return (
    <main className="min-h-screen">
      <section className="bg-gradient-to-br from-purple-50 to-pink-100 dark:from-slate-900 dark:to-slate-800 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-100 dark:text-white mb-6">
              AI Solutions for Special Education Teachers
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Specialized tools for IEP writing, behavior tracking, and individualized student support.
            </p>
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-semibold text-slate-100 dark:text-white mb-4">
                Coming Soon for Special Education
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                We're developing specialized features for special education teachers and SENCOs.
              </p>
            </div>
          </div>
        </div>
      </section>

      <EmailCaptureSection 
        title="Early Access for Special Education Teachers"
        description="Be the first to access AI tools designed for special education and SEN support."
        placeholder="Enter your email for special education updates"
        buttonText="Get Early Access"
        source="special-education-solutions"
      />
    </main>
  )
}