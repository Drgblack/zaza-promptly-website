"use client"

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { useAnalytics } from '@/hooks/useAnalytics'
import { SingleTestimonial } from '@/components/teacher-testimonials'
import { TrustBadges } from '@/components/trust-badges'

// Core trust-building FAQs for homepage
const trustFAQs = [
  {
    id: 'is-cheating',
    question: 'Is using Promptly cheating?',
    answer: 'Not at all. Promptly is like having a teaching assistant who helps you draft ideas — but you\'re always the decision-maker. Every suggestion can be reviewed, adapted, and personalised by you. It\'s your professional judgement and classroom knowledge that matters.'
  },
  {
    id: 'replace-teachers',
    question: 'Will AI replace teachers?',
    answer: 'Never. Promptly handles the repetitive admin work so you can focus on what only humans can do — inspiring students, building relationships, and making those crucial teaching decisions that shape young minds.'
  },
  {
    id: 'data-privacy',
    question: 'How does Promptly keep my data safe?',
    answer: 'Your privacy is our priority. We use bank-level encryption, never share your data with third parties, and you can delete your information anytime. Built by teachers, for teachers — we understand how sensitive classroom information is.'
  },
  {
    id: 'trust-suggestions',
    question: 'Can I trust Promptly\'s suggestions?',
    answer: 'Absolutely. Think of Promptly as a colleague who offers starting points — you decide what works for your students. Every suggestion can be edited or ignored. You stay in complete control of what goes to parents and in reports.'
  },
  {
    id: 'different-from-chatgpt',
    question: 'How is Promptly different from ChatGPT?',
    answer: 'ChatGPT is a general tool. Promptly is built specifically for teachers, with classroom-tested prompts, educational guardrails, and deep understanding of school communication needs. It speaks your language from day one.'
  }
]

// Strategic testimonial placement
const featuredTestimonials = [
  'sarah-manchester', // Time savings
  'jake-texas', // Professional improvement  
  'emma-sydney' // New teacher confidence
]

interface TrustBlockProps {
  className?: string
}

export function TrustBlock({ className = "" }: TrustBlockProps) {
  const [openItems, setOpenItems] = useState<string[]>([])
  const { trackEvent } = useAnalytics()

  const toggleItem = (id: string) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    )
  }

  const handleCTAClick = (label: string) => {
    trackEvent('button_click', { button_text: label, section: 'trust_block' })
  }

  return (
    <section className={`py-16 md:py-24 bg-white ${className}`.trim()}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Safe AI Designed by Educators
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Dr. Greg Blackburn (PhD in Professional Education) built Zaza Promptly to address teachers' biggest concerns about AI in education.
          </p>
        </div>

        {/* Main Trust Block Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          
          {/* FAQ Section - Takes up 2 columns on large screens */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {trustFAQs.map((faq) => {
                const isOpen = openItems.includes(faq.id)
                return (
                  <Card key={faq.id} className="rounded-2xl border-2 border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-200">
                    <CardContent className="p-0">
                      <button
                        onClick={() => toggleItem(faq.id)}
                        className="w-full p-6 text-left focus:outline-none focus:ring-4 focus:ring-blue-500/20 rounded-2xl"
                        aria-expanded={isOpen}
                        aria-controls={`faq-answer-${faq.id}`}
                      >
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-semibold text-slate-900 pr-4">
                            {faq.question}
                          </h3>
                          {isOpen ? (
                            <ChevronUp className="w-5 h-5 text-slate-600 flex-shrink-0" aria-hidden="true" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-slate-600 flex-shrink-0" aria-hidden="true" />
                          )}
                        </div>
                      </button>
                      
                      {isOpen && (
                        <div
                          id={`faq-answer-${faq.id}`}
                          className="px-6 pb-6"
                          role="region"
                          aria-labelledby={`faq-question-${faq.id}`}
                        >
                          <div className="border-t border-slate-200 pt-4">
                            <p className="text-slate-700 leading-relaxed">
                              {faq.answer}
                            </p>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>

          {/* Testimonials & Social Proof - Right column */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-4">What teachers say</h3>
              <div className="space-y-4">
                {featuredTestimonials.map((testimonialId, index) => (
                  <SingleTestimonial 
                    key={testimonialId}
                    testimonialId={testimonialId}
                    compact
                  />
                ))}
              </div>
            </div>

            {/* Call to action */}
            <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
              <CardContent className="p-6 text-center">
                <h3 className="font-semibold text-slate-900 mb-2">Start Saving Hours This Week</h3>
                <p className="text-sm text-slate-600 mb-4">
                  Join 12,000+ teachers using PhD-designed AI that never compromises on safety.
                </p>
                <Button
                  size="sm"
                  onClick={() => {
                    handleCTAClick('trust_block_try')
                    const demoSection = document.getElementById('demo-section')
                    if (demoSection) {
                      demoSection.scrollIntoView({ behavior: 'smooth' })
                    }
                  }}
                  className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold rounded-full shadow-lg"
                >
                  Get Early Access
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Trust Badges Row */}
        <div className="mt-16 pt-8 border-t border-slate-200">
          <TrustBadges 
            layout="row" 
            showDescriptions={false}
            limit={6}
            className="opacity-70 hover:opacity-100 transition-opacity"
          />
        </div>

        {/* CTA Section */}
        <div className="mt-12 text-center">
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/free-resources">
              <Button
                size="lg"
                variant="outline"
                onClick={() => handleCTAClick('trust_block_resources')}
                className="w-full sm:w-auto border-2 border-slate-300 text-slate-700 hover:bg-slate-50 font-semibold px-8 py-4 text-lg rounded-full transition-all duration-200"
              >
                Free Teacher Examples
              </Button>
            </Link>
            
            <Link href="/faqs">
              <Button
                size="lg"
                variant="outline"
                onClick={() => handleCTAClick('trust_block_full_faqs')}
                className="w-full sm:w-auto border-2 border-blue-300 text-blue-700 hover:bg-blue-50 font-semibold px-8 py-4 text-lg rounded-full transition-all duration-200"
              >
                Complete FAQ Guide
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}