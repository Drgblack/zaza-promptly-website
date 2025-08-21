import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Teaching Personas - Zaza Promptly',
  description: 'Discover how Zaza Promptly adapts to different teaching styles and personas. Find your perfect match for AI-powered comment generation.',
}

const personas = [
  {
    slug: 'primary-teacher',
    name: 'Primary School Teacher',
    description: 'Nurturing young minds with age-appropriate feedback and parent communication.',
    color: 'bg-green-500',
    textColor: 'text-green-700',
    bgColor: 'bg-green-50',
  },
  {
    slug: 'secondary-teacher',
    name: 'Secondary School Teacher',
    description: 'Subject-specific feedback and academic progress tracking for teenagers.',
    color: 'bg-blue-500',
    textColor: 'text-blue-700',
    bgColor: 'bg-blue-50',
  },
  {
    slug: 'special-education',
    name: 'Special Education Teacher',
    description: 'Individualized support with IEP-aligned comments and progress tracking.',
    color: 'bg-purple-500',
    textColor: 'text-purple-700',
    bgColor: 'bg-purple-50',
  },
  {
    slug: 'head-teacher',
    name: 'Head of Department',
    description: 'Leadership-focused communication with strategic oversight capabilities.',
    color: 'bg-orange-500',
    textColor: 'text-orange-700',
    bgColor: 'bg-orange-50',
  },
  {
    slug: 'private-tutor',
    name: 'Private Tutor',
    description: 'One-on-one learning with personalized progress reports for parents.',
    color: 'bg-pink-500',
    textColor: 'text-pink-700',
    bgColor: 'bg-pink-50',
  },
  {
    slug: 'international-teacher',
    name: 'International Educator',
    description: 'Culturally sensitive communication across diverse learning environments.',
    color: 'bg-indigo-500',
    textColor: 'text-indigo-700',
    bgColor: 'bg-indigo-50',
  },
]

export default function PersonasHub() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Find Your Teaching Persona
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Zaza Promptly adapts to your unique teaching style. Discover how our AI 
            understands and enhances your specific approach to education.
          </p>
        </div>
      </section>

      {/* Personas Grid */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {personas.map((persona) => (
              <Link
                key={persona.slug}
                href={`/personas/${persona.slug}`}
                className="group relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <div className={`h-2 ${persona.color}`} />
                <div className="p-8">
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${persona.bgColor} mb-6`}>
                    <div className={`w-6 h-6 rounded-full ${persona.color}`} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    {persona.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {persona.description}
                  </p>
                  <div className="flex items-center text-blue-600 dark:text-blue-400 font-medium group-hover:text-blue-700 dark:group-hover:text-blue-300">
                    Learn more
                    <svg className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Ready to Transform Your Teaching?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            Join thousands of educators using AI to save time while improving student outcomes.
          </p>
          <Link
            href="/waitlist"
            className="inline-flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
          >
            Join the Waitlist
          </Link>
        </div>
      </section>
    </div>
  )
}