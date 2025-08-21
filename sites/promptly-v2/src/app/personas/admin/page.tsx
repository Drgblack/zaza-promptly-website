import Link from 'next/link'

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <section className="bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900 dark:to-indigo-800 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
            School Admin Solutions
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Administrative and communication templates designed for efficient school operations and management.
          </p>
          <Link 
            href="/waitlist"
            className="inline-flex items-center px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg"
          >
            Start Free Trial
          </Link>
        </div>
      </section>
    </div>
  )
}