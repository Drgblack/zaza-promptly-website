"use client"

import { Clock, Heart, School } from 'lucide-react'

const promises = [
  {
    id: 'save-hours',
    icon: Clock,
    title: 'Save hours',
    description: 'Generate caring, professional comments in minutes - not Sunday night.'
  },
  {
    id: 'personal-professional',
    icon: Heart,
    title: 'Personal + professional',
    description: 'Sounds like you. Keeps school tone and expectations.'
  },
  {
    id: 'built-for-classrooms',
    icon: School,
    title: 'Built for real classrooms',
    description: 'Templates for parent messages, reports, feedback - aligned and practical.'
  }
]

export function CorePromisesSection() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            What Promptly does for you
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {promises.map((promise) => {
            const IconComponent = promise.icon
            return (
              <div 
                key={promise.id}
                className="bg-gradient-to-br from-slate-50 to-white rounded-2xl p-8 border border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <IconComponent className="w-8 h-8 text-white" aria-hidden="true" />
                </div>
                
                <h3 className="text-xl md:text-2xl font-semibold text-slate-900 mb-4">
                  {promise.title}
                </h3>
                
                <p className="text-slate-700 leading-relaxed">
                  {promise.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}