'use client'

import React from 'react'
import { Disclosure } from '@headlessui/react'
import { ChevronUp } from 'lucide-react'
import { useAnalytics } from '@/lib/analytics'

// Organize FAQs by category for better user experience
const faqCategories = [
  {
    title: 'Getting Started',
    faqs: [
      {
        question: 'Will this actually save me time?',
        answer: 'Yes — teachers report saving 3-5 hours per week on report writing and parent communication. What used to take 15-20 minutes per comment now takes 2-3 minutes, giving you time back for lesson planning, marking, or simply going home earlier.'
      },
      {
        question: 'How quickly can I get started?',
        answer: 'You can generate your first parent message in under 2 minutes. Sign up, add a few notes about a student, pick your template, and Promptly handles the rest. No training courses or complex setup required.'
      },
      {
        question: 'Does it work for all ages and subjects?',
        answer: 'Absolutely. From Reception to Year 13, maths to music, Promptly adapts to your teaching context. Primary teachers love the parent communication features, while secondary teachers find the report writing tools especially helpful during assessment periods.'
      }
    ]
  },
  {
    title: 'Using Promptly',
    faqs: [
      {
        question: 'What if I don\'t like the generated content?',
        answer: 'Every suggestion is fully editable. Promptly gives you a strong starting point, then you tweak, personalise, or completely rewrite as needed. Many teachers use it as a first draft, then add their personal touch and specific examples.'
      },
      {
        question: 'Does it understand British/Australian/US school systems?',
        answer: 'Yes. Promptly recognises different educational contexts, terminology, and communication styles. Whether you need "maths" or "math," "Year 6" or "6th Grade," it adapts to your local conventions.'
      },
      {
        question: 'Can I use my own writing style?',
        answer: 'Definitely. The more you use Promptly, the better it understands your tone. You can also give it examples of your preferred style, and it will match your voice while maintaining professionalism.'
      }
    ]
  },
  {
    title: 'Technical & Practical',
    faqs: [
      {
        question: 'Does it work on mobile devices?',
        answer: 'Yes, Promptly works seamlessly on phones, tablets, and computers. Many teachers draft comments on their phone during break time, then copy them into their school\'s reporting system.'
      },
      {
        question: 'Can my school pay for this?',
        answer: 'Absolutely. We offer school-wide licenses with bulk pricing, admin controls, and easy billing. Many schools find the time savings across their teaching staff easily justifies the investment.'
      },
      {
        question: 'What if my school has strict data policies?',
        answer: 'We\'re designed for schools with stringent requirements. SOC 2 compliance, GDPR adherence, and data processing agreements available. We can work with your IT team to meet any specific security needs.'
      }
    ]
  },
  {
    title: 'Pricing & Support',
    faqs: [
      {
        question: 'How much does Promptly cost?',
        answer: 'Individual plans start at just £8/month (about 25p per day), with a free trial to get started. School licenses offer significant savings. Compare that to the hours of your time it saves — it pays for itself in the first week.'
      },
      {
        question: 'What support do you offer?',
        answer: 'Email support typically responds within 4 hours, plus extensive help guides and video tutorials. Our founder (a teacher with 20+ years experience) personally reviews feedback to keep improving the product.'
      },
      {
        question: 'Can I cancel anytime?',
        answer: 'Yes, no long-term contracts. Cancel with one click if it\'s not saving you time. We\'re confident you\'ll love the extra hours Promptly gives you back each week.'
      }
    ]
  },
  {
    title: 'Advanced Features',
    faqs: [
      {
        question: 'Can multiple teachers share templates?',
        answer: 'With school accounts, yes. Share successful comment templates, maintain consistent communication standards, and build a library of approaches that work for your school community.'
      },
      {
        question: 'Does it integrate with school management systems?',
        answer: 'We\'re working on direct integrations with major systems. Currently, you can easily copy-paste from Promptly into any platform — many teachers find this workflow actually faster than native tools.'
      }
    ]
  }
]

// Flatten for the component
const faqs = faqCategories.flatMap(category => 
  category.faqs.map(faq => ({ ...faq, category: category.title }))
)

export default function FAQ() {
  const { trackFAQExpanded } = useAnalytics();

  return (
    <div className="w-full px-4 pt-16 pb-20 mx-auto max-w-3xl" id="faq">
      <h2 className="text-center text-3xl font-bold text-gray-800 mb-2">
        Complete Support Hub
      </h2>
      <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
        Everything you need to know about using Promptly effectively in your classroom.
      </p>
      
      {/* Organized by categories */}
      <div className="space-y-8">
        {faqCategories.map((category, categoryIdx) => (
          <div key={categoryIdx}>
            <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b-2 border-purple-100 pb-2">
              {category.title}
            </h3>
            <div className="space-y-3">
              {category.faqs.map((faq, faqIdx) => (
                <Disclosure key={`${categoryIdx}-${faqIdx}`}>
                  {({ open }) => (
                    <>
                      <Disclosure.Button 
                        className="flex w-full justify-between rounded-lg bg-purple-50 px-4 py-3 text-left text-base font-medium text-purple-900 hover:bg-purple-100 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75 transition-colors"
                        onClick={() => {
                          if (!open) { // Only track when opening, not closing
                            trackFAQExpanded(faq.question);
                          }
                        }}
                      >
                        <span className="pr-4">{faq.question}</span>
                        <ChevronUp
                          className={`${
                            open ? 'rotate-180 transform' : ''
                          } h-5 w-5 text-purple-500 flex-shrink-0`}
                        />
                      </Disclosure.Button>
                      <Disclosure.Panel className="px-4 pt-3 pb-4 text-gray-700 leading-relaxed">
                        {faq.answer}
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
