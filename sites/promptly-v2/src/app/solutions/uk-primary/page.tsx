import { Metadata } from 'next'
import EmailCaptureSection from '@/components/email/EmailCaptureSection'

export const metadata: Metadata = {
  title: 'UK Primary Teachers - AI Solutions | Promptly',
  description: 'Specialized AI tools designed for UK Primary teachers. Streamline your report writing, planning, and communication with curriculum-aligned solutions.',
  keywords: ['UK primary teachers', 'primary education', 'UK curriculum', 'teacher tools', 'AI for primary'],
  openGraph: {
    title: 'UK Primary Teachers - AI Solutions | Promptly',
    description: 'Specialized AI tools designed for UK Primary teachers.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'UK Primary Teachers - AI Solutions | Promptly',
    description: 'Specialized AI tools designed for UK Primary teachers.',
  },
}

export default function UKPrimaryPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-red-50 to-pink-100 dark:from-slate-900 dark:to-slate-800 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              AI Solutions for UK Primary Teachers
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Purpose-built tools that understand the UK primary curriculum, EYFS, and the unique challenges of teaching Key Stages 1 and 2.
            </p>
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Coming Soon - Tailored for UK Primary
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                We're developing specialized features for UK primary teachers. Leave your email to be the first to access tools designed specifically for your classroom needs.
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
              What's Coming for UK Primary Teachers
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gray-50 dark:bg-slate-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Curriculum-Aligned Comments</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Report comments that reference UK curriculum objectives, EYFS goals, and age-appropriate language for Key Stages 1 & 2.
                </p>
                <ul className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
                  <li>• EYFS Development Matters alignment</li>
                  <li>• National Curriculum subject references</li>
                  <li>• Age-appropriate language and expectations</li>
                </ul>
              </div>
              <div className="bg-gray-50 dark:bg-slate-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">UK-Specific Templates</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Pre-built templates for UK primary schools, including statutory assessments and progress tracking.
                </p>
                <ul className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
                  <li>• End-of-year report templates</li>
                  <li>• Parent consultation preparation</li>
                  <li>• SEN support documentation</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <EmailCaptureSection 
        title="Early Access for UK Primary Teachers"
        description="Be among the first primary teachers to access our UK-specific AI tools."
        placeholder="Enter your email for UK primary early access"
        buttonText="Get Early Access"
        source="uk-primary-solutions"
      />
    </main>
  )
}