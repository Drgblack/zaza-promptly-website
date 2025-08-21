import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Teaching Solutions | Promptly - AI Comments for Every Education Role',
  description: 'Discover AI comment solutions tailored to your specific teaching context. From classroom teachers to senior leadership, find the perfect tool for your role.',
}

export default function PersonasPage() {
  const personas = [
    {
      id: 'teacher',
      title: 'Classroom Teacher',
      description: 'Primary, secondary, and subject-specific comment templates for all your students',
      color: 'blue',
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      features: ['Subject-specific templates', 'Progress tracking comments', 'Behavior management', 'Achievement recognition']
    },
    {
      id: 'head-of-year',
      title: 'Head of Year',
      description: 'Pastoral care and behavioral comments for year group management',
      color: 'purple',
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      features: ['Pastoral care comments', 'Behavioral interventions', 'Parent communication', 'Year group overview']
    },
    {
      id: 'slt',
      title: 'Senior Leadership',
      description: 'Strategic, whole-school perspective comments for leadership teams',
      color: 'green',
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      features: ['Strategic overview', 'School-wide initiatives', 'Leadership feedback', 'Policy implementation']
    },
    {
      id: 'senco',
      title: 'SENCO',
      description: 'Specialized comments for students with additional learning needs',
      color: 'orange',
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      features: ['SEN-focused templates', 'Individual needs assessment', 'Support strategies', 'Progress monitoring']
    },
    {
      id: 'tutor',
      title: 'Form Tutor',
      description: 'Personal development and tutor time comments for your tutor group',
      color: 'red',
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      features: ['Personal development', 'Tutor time activities', 'Wellbeing check-ins', 'Goal setting']
    },
    {
      id: 'admin',
      title: 'School Admin',
      description: 'Administrative and communication templates for school operations',
      color: 'indigo',
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v6a2 2 0 002 2h2m0 0h2m-2 0v4a2 2 0 002 2h6a2 2 0 002-2v-4m-8 0V9a2 2 0 012-2h2M9 5V3a2 2 0 012-2h2a2 2 0 012 2v2M9 5h4" />
        </svg>
      ),
      features: ['Administrative templates', 'Communication tools', 'Data management', 'Operational efficiency']
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              AI Solutions for Every Education Role
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Discover comment generation tools tailored to your specific teaching context and responsibilities. 
              Each solution is designed with your unique challenges in mind.
            </p>
          </div>
        </div>
      </section>

      {/* Personas Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {personas.map((persona) => (
              <Link key={persona.id} href={`/personas/${persona.id}`} className="group">
                <div className={`bg-gradient-to-br from-${persona.color}-50 to-${persona.color}-100 dark:from-${persona.color}-900 dark:to-${persona.color}-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 h-full`}>
                  <div className={`w-16 h-16 bg-${persona.color}-600 rounded-full flex items-center justify-center mb-6 mx-auto`}>
                    {persona.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center">
                    {persona.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-center mb-6">
                    {persona.description}
                  </p>
                  
                  {/* Features List */}
                  <ul className="space-y-2">
                    {persona.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                        <svg className={`w-4 h-4 text-${persona.color}-600 mr-2 flex-shrink-0`} fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <div className="mt-6 text-center">
                    <span className={`inline-flex items-center text-${persona.color}-600 dark:text-${persona.color}-400 font-medium group-hover:text-${persona.color}-700 dark:group-hover:text-${persona.color}-300`}>
                      Learn More
                      <svg className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 dark:bg-blue-700 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Transform Your Comment Writing?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of educators who are already saving hours every week with AI-powered comment generation.
          </p>
          <Link 
            href="/waitlist"
            className="inline-flex items-center px-8 py-4 bg-white hover:bg-gray-100 text-blue-600 font-semibold rounded-lg transition-colors shadow-lg"
          >
            Start Free Trial
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  )
}