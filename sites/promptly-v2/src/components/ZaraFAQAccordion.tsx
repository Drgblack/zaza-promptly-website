'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

interface FAQ {
  question: string
  answer: string
}

interface ZaraFAQAccordionProps {
  faqs: FAQ[]
}

export function ZaraFAQAccordion({ faqs }: ZaraFAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <div 
          key={index} 
          className="border border-slate-200 rounded-lg bg-white shadow-sm overflow-hidden"
        >
          <button
            className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-slate-50 transition-colors"
            onClick={() => toggleAccordion(index)}
            aria-expanded={openIndex === index}
            aria-controls={`faq-answer-${index}`}
          >
            <h3 className="text-lg font-semibold text-slate-900 pr-4">
              {faq.question}
            </h3>
            <ChevronDown 
              className={`w-5 h-5 text-slate-500 transition-transform duration-200 flex-shrink-0 ${
                openIndex === index ? 'rotate-180' : ''
              }`}
            />
          </button>
          
          <div 
            id={`faq-answer-${index}`}
            className={`transition-all duration-200 ease-in-out ${
              openIndex === index 
                ? 'max-h-96 opacity-100' 
                : 'max-h-0 opacity-0 overflow-hidden'
            }`}
          >
            <div className="px-6 pb-4 pt-0">
              <p className="text-slate-600 leading-relaxed">
                {faq.answer}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}