import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free Classroom Tool | Promptly',
  description: 'Start with our free classroom toolkit designed for teachers.',
}

export default function ClassroomToolPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
          Free Classroom Tool
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
          Start with our free classroom toolkit designed specifically for teachers.
        </p>
        
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-blue-900 dark:text-blue-100 mb-4">
            Coming Soon
          </h2>
          <p className="text-blue-800 dark:text-blue-200">
            We're currently developing this free classroom toolkit. Check back soon for updates!
          </p>
        </div>

        <div className="text-center">
          <a
            href="/contact"
            className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
          >
            Get Notified When Available
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  )
}