"use client"

import { Clock, Heart, School, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAnalytics } from '@/hooks/useAnalytics'

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
  const { trackEvent } = useAnalytics()

  const handleCTAClick = (action: string) => {
    trackEvent('button_click', { button_text: action, section: 'core_promises' })
  }

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            What Promptly does for you
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Built by Dr. Greg Blackburn (PhD in Professional Education) to solve teachers' biggest communication challenges
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
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

        {/* Strong CTA Section */}
        <div className="text-center bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-200">
          <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
            Ready to save hours this week?
          </h3>
          <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
            Join 12,000+ teachers using AI designed by educators, for educators. Try your first snippet now.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              onClick={() => {
                handleCTAClick('try_snippet_now')
                const demoSection = document.getElementById('demo-section')
                if (demoSection) {
                  demoSection.scrollIntoView({ behavior: 'smooth' })
                }
              }}
              className="w-full sm:w-auto bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              Try a snippet now
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => handleCTAClick('join_waitlist')}
              className="w-full sm:w-auto border-2 border-blue-300 text-blue-700 hover:bg-blue-50 font-semibold px-8 py-4 text-lg rounded-full transition-all duration-200"
            >
              Join the waitlist
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}