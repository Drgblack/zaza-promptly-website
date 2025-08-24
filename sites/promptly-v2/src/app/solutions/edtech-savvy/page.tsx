import { Metadata } from 'next'
import EmailCaptureSection from '@/components/email/EmailCaptureSection'

export const metadata: Metadata = {
  title: 'EdTech-Savvy Teachers - AI Solutions | Promptly',
  description: 'Advanced AI tools for tech-forward educators. API access, integrations, and power user features.',
  keywords: ['edtech teachers', 'technology integration', 'API access', 'advanced AI tools'],
  openGraph: {
    title: 'EdTech-Savvy Teachers - AI Solutions | Promptly',
    description: 'Advanced AI tools for tech-forward educators.',
    type: 'website',
  },
}

export default function EdTechSavvyPage() {
  return (
    <main className="min-h-screen">
      <section className="bg-gradient-to-br from-orange-50 to-amber-100 dark:from-slate-900 dark:to-slate-800 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              AI Solutions for EdTech-Savvy Teachers
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Advanced features for tech-forward educators including API access and custom integrations.
            </p>
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Coming Soon for EdTech Leaders
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                We're developing advanced features for technology-forward educators.
              </p>
            </div>
          </div>
        </div>
      </section>

      <EmailCaptureSection 
        title="Early Access for EdTech-Savvy Teachers"
        description="Be the first to access advanced AI tools and integrations."
        placeholder="Enter your email for EdTech updates"
        buttonText="Get Early Access"
        source="edtech-savvy-solutions"
      />
    </main>
  )
}