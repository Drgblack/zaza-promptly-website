import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface PersonaData {
  slug: string
  name: string
  title: string
  description: string
  features: string[]
  challenges: string[]
  solutions: string[]
  color: string
  bgColor: string
}

const personas: Record<string, PersonaData> = {
  'primary-teacher': {
    slug: 'primary-teacher',
    name: 'Primary School Teacher',
    title: 'Nurturing Young Minds',
    description: 'Supporting early childhood education with age-appropriate communication and developmental feedback.',
    features: [
      'Age-appropriate language for young learners',
      'Developmental milestone tracking',
      'Parent-friendly progress updates',
      'Positive reinforcement strategies',
    ],
    challenges: [
      'Writing comments suitable for young children',
      'Explaining complex concepts simply',
      'Maintaining engagement with diverse learning styles',
    ],
    solutions: [
      'AI generates age-appropriate vocabulary automatically',
      'Built-in developmental frameworks and milestones',
      'Positive psychology-based feedback generation',
    ],
    color: 'bg-green-500',
    bgColor: 'bg-green-50',
  },
  'secondary-teacher': {
    slug: 'secondary-teacher',
    name: 'Secondary School Teacher',
    title: 'Academic Excellence Focus',
    description: 'Subject-specific expertise with detailed academic progress tracking for teenage students.',
    features: [
      'Subject-specific terminology and frameworks',
      'Academic goal setting and tracking',
      'Grade-level appropriate complexity',
      'Future pathway guidance',
    ],
    challenges: [
      'Balancing academic rigor with encouragement',
      'Addressing diverse ability levels in one class',
      'Preparing students for next academic levels',
    ],
    solutions: [
      'Subject-specific AI training for accuracy',
      'Differentiated feedback for various ability levels',
      'Integration with curriculum standards',
    ],
    color: 'bg-blue-500',
    bgColor: 'bg-blue-50',
  },
  'special-education': {
    slug: 'special-education',
    name: 'Special Education Teacher',
    title: 'Individualized Learning Support',
    description: 'Specialized support with IEP-aligned comments and individualized progress tracking.',
    features: [
      'IEP goal alignment and tracking',
      'Sensory and accommodation awareness',
      'Strength-based feedback approach',
      'Family collaboration tools',
    ],
    challenges: [
      'Creating truly individualized feedback',
      'Tracking multiple accommodation needs',
      'Maintaining dignity while addressing challenges',
    ],
    solutions: [
      'IEP goal integration and automated tracking',
      'Strength-based language patterns',
      'Accommodation-aware comment generation',
    ],
    color: 'bg-purple-500',
    bgColor: 'bg-purple-50',
  },
  'head-teacher': {
    slug: 'head-teacher',
    name: 'Head of Department',
    title: 'Leadership & Strategic Oversight',
    description: 'Leadership-focused communication with strategic oversight and team coordination capabilities.',
    features: [
      'Department-wide consistency tools',
      'Strategic planning integration',
      'Team collaboration features',
      'Data-driven insights',
    ],
    challenges: [
      'Maintaining consistency across multiple teachers',
      'Balancing administrative duties with teaching',
      'Strategic planning and implementation',
    ],
    solutions: [
      'Standardized comment templates and frameworks',
      'Analytics for department-wide trends',
      'Collaborative review and approval workflows',
    ],
    color: 'bg-orange-500',
    bgColor: 'bg-orange-50',
  },
  'private-tutor': {
    slug: 'private-tutor',
    name: 'Private Tutor',
    title: 'Personalized One-on-One Learning',
    description: 'Intensive individual support with detailed progress reports and parent communication.',
    features: [
      'Highly personalized feedback',
      'Flexible pacing and goals',
      'Parent progress reports',
      'Session-by-session tracking',
    ],
    challenges: [
      'Justifying costs with detailed progress reports',
      'Maintaining detailed records for multiple students',
      'Communicating value to parents effectively',
    ],
    solutions: [
      'Professional-grade progress reports',
      'Session notes and learning outcome tracking',
      'ROI-focused parent communication tools',
    ],
    color: 'bg-pink-500',
    bgColor: 'bg-pink-50',
  },
  'international-teacher': {
    slug: 'international-teacher',
    name: 'International Educator',
    title: 'Cross-Cultural Learning Excellence',
    description: 'Culturally sensitive education across diverse international learning environments.',
    features: [
      'Cultural sensitivity awareness',
      'Multi-language support considerations',
      'International curriculum alignment',
      'Global citizenship focus',
    ],
    challenges: [
      'Navigating cultural differences in communication',
      'Adapting to different educational systems',
      'Language barriers with students and families',
    ],
    solutions: [
      'Culturally aware language patterns',
      'International curriculum framework integration',
      'Multi-cultural communication strategies',
    ],
    color: 'bg-indigo-500',
    bgColor: 'bg-indigo-50',
  },
}

interface PageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const persona = personas[params.slug]
  
  if (!persona) {
    return {
      title: 'Persona Not Found - Zaza Promptly'
    }
  }

  return {
    title: `${persona.name} - Zaza Promptly`,
    description: persona.description,
  }
}

export function generateStaticParams() {
  return Object.keys(personas).map((slug) => ({
    slug,
  }))
}

export default function PersonaPage({ params }: PageProps) {
  const persona = personas[params.slug]

  if (!persona) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className={`py-16 md:py-24 ${persona.bgColor} dark:bg-gray-800`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/personas"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-8 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to All Personas
          </Link>
          
          <div className="flex items-start space-x-4 mb-8">
            <div className={`w-16 h-16 rounded-full ${persona.color} flex-shrink-0`} />
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                {persona.name}
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                {persona.title}
              </p>
            </div>
          </div>
          
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            {persona.description}
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Tailored Features for {persona.name}s
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {persona.features.map((feature, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className={`w-6 h-6 rounded-full ${persona.color} flex-shrink-0 mt-0.5`} />
                <p className="text-gray-700 dark:text-gray-300">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Challenges & Solutions */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 md:grid-cols-2">
            {/* Challenges */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Common Challenges
              </h3>
              <ul className="space-y-4">
                {persona.challenges.map((challenge, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <svg className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300">{challenge}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Solutions */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                How Zaza Promptly Helps
              </h3>
              <ul className="space-y-4">
                {persona.solutions.map((solution, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300">{solution}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Ready to Experience Personalized AI?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            Join thousands of {persona.name.toLowerCase()}s using Zaza Promptly to save time and improve outcomes.
          </p>
          <Link
            href="/waitlist"
            className="inline-flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
          >
            Start Your Free Trial
          </Link>
        </div>
      </section>
    </div>
  )
}