import Link from 'next/link'

export default function SENCOPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <section className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900 dark:to-orange-800 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
            SENCO Solutions
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Specialized comment generation for students with additional learning needs and individual support plans.
          </p>
          <Link 
            href="/waitlist"
            className="inline-flex items-center px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg"
          >
            Start Free Trial
          </Link>
        </div>
      </section>
    </div>
  )
}