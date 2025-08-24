import { Metadata } from 'next'
import EmailCaptureSection from '@/components/email/EmailCaptureSection'

export const metadata: Metadata = {
  title: 'Reliable AI That Won\'t Make Things Up | Promptly',
  description: 'Learn about our commitment to hallucination-free AI. Understand how Promptly ensures accuracy and reliability in educational AI tools.',
  keywords: ['reliable AI', 'hallucination-free', 'accurate AI', 'trustworthy AI', 'AI safety'],
  openGraph: {
    title: 'Reliable AI That Won\'t Make Things Up | Promptly',
    description: 'Our commitment to hallucination-free AI for education.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Reliable AI That Won\'t Make Things Up | Promptly',
    description: 'Our commitment to hallucination-free AI for education.',
  },
}

export default function ReliableAIPage() {
  return (
    <main className="min-h-screen">
      <section className="bg-gradient-to-br from-emerald-50 to-teal-100 dark:from-slate-900 dark:to-slate-800 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Reliable AI That Won't Make Things Up
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Our commitment to accuracy, transparency, and trustworthy AI in education.
            </p>
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Trust & Accuracy Documentation Coming Soon
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                We're preparing detailed documentation about our AI safety measures, accuracy protocols, and reliability standards. Be notified when it's ready.
              </p>
            </div>
          </div>
        </div>
      </section>

      <EmailCaptureSection 
        title="Stay Informed About Our AI Safety Standards"
        description="Get notified when we publish our comprehensive AI reliability documentation."
        placeholder="Enter your email for AI safety updates"
        buttonText="Notify Me"
        source="reliable-ai"
      />
    </main>
  )
}