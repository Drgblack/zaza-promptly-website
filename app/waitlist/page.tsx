import type { Metadata } from 'next'
import { EmailCaptureForm } from '@/components/EmailCaptureForm'

export const metadata: Metadata = {
  title: 'Join Waitlist - Zaza',
  description: 'Be the first to know when new Zaza tools launch. Get early access and exclusive updates.',
}

export default function WaitlistPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-blue-900 dark:to-indigo-900">
      <div className="relative pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.1),transparent_50%)]" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Get Early Access
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Be among the first to try new Zaza tools as they become available. Join our waitlist for exclusive early access and updates.
            </p>
          </div>
          
          <EmailCaptureForm
            title="Join the Waitlist"
            subtitle="Get early access to new AI tools for teachers"
            source="waitlist_page"
            variant="hero"
            size="lg"
            className="mx-auto"
          />
        </div>
      </div>
    </div>
  )
}