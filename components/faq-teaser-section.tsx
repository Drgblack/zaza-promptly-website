"use client"

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { useAnalytics } from '@/hooks/useAnalytics'

const faqs = [
  {
    id: 'safety',
    question: 'Is this safe for my school?',
    answer: 'Yes. We avoid student PII in prompts and encourage school-aligned tone.'
  },
  {
    id: 'voice',
    question: 'Will it sound like me?',
    answer: 'Yes. You can set a voice guide and reuse templates.'
  },
  {
    id: 'time-saving',
    question: 'How much time can it save?',
    answer: 'Most teachers report saving 1-2 hours per heavy writing week.'
  }
]

export function FAQTeaserSection() {
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
    trackEvent('button_click', { button_text: label, section: 'faq' })
  }

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Questions?
          </h2>
        </div>

        <div className="space-y-4 mb-12">
          {faqs.map((faq) => {
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
                      <h3 className="text-lg font-semibold text-slate-900">
                        {faq.question}
                      </h3>
                      {isOpen ? (
                        <ChevronUp className="w-5 h-5 text-slate-600 flex-shrink-0 ml-4" aria-hidden="true" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-slate-600 flex-shrink-0 ml-4" aria-hidden="true" />
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

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/examples">
            <Button
              size="lg"
              variant="outline"
              onClick={() => handleCTAClick('faq_examples')}
              className="w-full sm:w-auto border-2 border-slate-300 text-slate-700 hover:bg-slate-50 font-semibold px-8 py-4 text-lg rounded-full transition-all duration-200"
            >
              See Examples
            </Button>
          </Link>
          
          <Button
            size="lg"
            onClick={() => {
              handleCTAClick('faq_try')
              const demoSection = document.getElementById('demo-section')
              if (demoSection) {
                demoSection.scrollIntoView({ behavior: 'smooth' })
              }
            }}
            className="w-full sm:w-auto bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold px-8 py-4 text-lg rounded-full shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            Try Promptly Free
          </Button>
        </div>
      </div>
    </section>
  )
}