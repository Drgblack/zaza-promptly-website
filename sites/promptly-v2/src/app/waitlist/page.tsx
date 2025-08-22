import { Metadata } from 'next'
import WaitlistForm from '@/components/WaitlistForm'

export const metadata: Metadata = {
  title: 'Join the Waitlist | Promptly - AI Comments for Teachers',
  description: 'Be the first to access Promptly when it launches. Join thousands of educators already on our waitlist.',
}

export default function WaitlistPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center py-12">
      <WaitlistForm />
    </div>
  )
}