import Link from 'next/link'

export default function TutorPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <section className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900 dark:to-red-800 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Form Tutor Solutions
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Personal development and tutor time comments designed for your tutor group responsibilities.
          </p>
          <Link 
            href="/waitlist"
            className="inline-flex items-center px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg"
          >
            Start Free Trial
          </Link>
        </div>
      </section>
    </div>
  )
}