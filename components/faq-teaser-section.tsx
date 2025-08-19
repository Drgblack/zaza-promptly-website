"use client"

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { useAnalytics } from '@/hooks/useAnalytics'

const faqs = [
  {
    id: 'different-from-chatgpt',
    question: 'How is Zaza Promptly different from ChatGPT?',
    answer: 'Zaza Promptly is built for teachers, not generic users. It understands classroom language, keeps your tone kind and professional, and saves you from endless re-prompting.'
  },
  {
    id: 'data-privacy',
    question: 'Is my data private?',
    answer: 'Yes. We never train on your school\'s data. Everything you write stays secure and private.'
  },
  {
    id: 'use-at-school',
    question: 'Can I use this at my school?',
    answer: 'Absolutely. Teachers already use Zaza Promptly worldwide. It works with any curriculum, grade level, or subject.'
  },
  {
    id: 'is-cheating',
    question: 'Is this cheating?',
    answer: 'No. Zaza Promptly doesn\'t replace your judgment as a teacher — it helps you put into words what you already know about your students. Think of it like a trusted teaching assistant for admin tasks.'
  },
  {
    id: 'cost',
    question: 'How much does it cost?',
    answer: 'You can try Promptly free. After that, we offer affordable monthly plans so teachers and schools can save time every week.'
  },
  {
    id: 'different-countries',
    question: 'Does it work in different countries?',
    answer: 'Yes. Promptly is already in use across the UK, US, Europe, and beyond. We\'re also adding more language support soon.'
  },
  {
    id: 'free-trial',
    question: 'Can I try it for free?',
    answer: 'Yes. Sign up today and you\'ll get 5 free snippets every month to test it out.'
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