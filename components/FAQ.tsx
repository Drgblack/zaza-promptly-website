'use client'

import React from 'react'
import { Disclosure } from '@headlessui/react'
import { ChevronUp } from 'lucide-react'
import { useAnalytics } from '@/lib/analytics'
import { FAQSchema } from './faq-schema'

// Organize FAQs by category for better user experience and SEO targeting
const faqCategories = [
  {
    title: 'AI Safety & Trust for Teachers',
    faqs: [
      {
        question: 'Is using AI for teaching cheating or unprofessional?',
        answer: 'No. Using AI for teacher reports and parent communication is a productivity tool, like spell-check or a calculator. Zaza Promptly is hallucination-safe AI designed specifically for educational contexts, ensuring accurate and appropriate content. You maintain full control and professional judgment over all communications.'
      },
      {
        question: 'How is Zaza Promptly different from ChatGPT for teachers?',
        answer: 'ChatGPT is a general-purpose AI that can hallucinate or invent false information about students. Zaza Promptly is specifically designed for education with built-in safeguards against hallucinations, GDPR compliance, and educational context understanding. Created by Dr. Greg Blackburn (PhD in Professional Education), it speaks your professional language from day one and never compromises student privacy.'
      },
      {
        question: 'Why do 12,000+ teachers trust Zaza Promptly over other AI tools?',
        answer: 'Teachers choose Promptly because it\'s the only AI tool designed by a PhD educator specifically for the classroom. Unlike generic AI, it understands pedagogical principles, maintains professional communication standards, and includes safety features that prevent inappropriate content. Plus, it\'s GDPR-compliant and never trains on your student data.'
      },
      {
        question: 'Will my school data be safe with AI?',
        answer: 'Absolutely. Zaza Promptly meets the highest privacy standards: GDPR compliant, bank-level encryption, EU-only data processing, and zero data retention after processing. Your student information NEVER trains other models or leaves secure servers. We provide data processing agreements for schools and full audit trails for compliance officers.'
      },
      {
        question: 'What prevents AI from creating inappropriate content about students?',
        answer: 'Zaza Promptly includes multiple safety layers: content filtering prevents inappropriate language, context awareness ensures age-appropriate communication, tone validation maintains professional standards, and hallucination prevention guarantees factual accuracy. Every output is checked against educational communication standards before delivery.'
      },
      {
        question: 'Can I trust Promptly\'s suggestions?',
        answer: 'Absolutely. Promptly gives you helpful starting points, but you\'re always the one in charge. Every suggestion can be edited, tweaked, or ignored — nothing is locked in. Think of it as a colleague who throws out ideas, but you decide what actually goes home to parents or into your reports.'
      }
    ]
  },
  {
    title: 'Reducing Teacher Workload',
    faqs: [
      {
        question: 'Does Zaza Promptly actually reduce teacher workload?',
        answer: 'Yes — teachers report saving 3-5 hours per week on report writing and parent communication. What used to take 15-20 minutes per comment now takes 2-3 minutes, giving you time back for lesson planning, marking, or simply going home earlier. This AI tool for teachers specifically targets the most time-consuming administrative tasks.'
      },
      {
        question: 'How quickly can I get started with AI for teacher reports?',
        answer: 'You can generate your first parent message or report comment in under 2 minutes. Sign up, add a few notes about a student, pick your template, and our safe AI for teachers handles the rest. No training courses or complex setup required.'
      },
      {
        question: 'Does this AI tool work for all ages and subjects?',
        answer: 'Absolutely. From Reception to Year 13, maths to music, this teacher productivity app adapts to your teaching context. Primary teachers love the parent communication AI features, while secondary teachers find the report writing AI tools especially helpful during assessment periods.'
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
      },
      {
        question: 'Can I trust Promptly\'s suggestions?',
        answer: 'Absolutely. Promptly gives you helpful starting points, but you\'re always the one in charge. Every suggestion can be edited, tweaked, or ignored — nothing is locked in. Think of it as a colleague who throws out ideas, but you decide what actually goes home to parents or into your reports.'
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
    <div className="w-full px-4 pt-16 pb-20 mx-auto max-w-3xl" id="faq" role="main">
      <FAQSchema faqs={faqs} />
      <header>
        <h1 className="text-center text-3xl font-bold text-gray-800 mb-2">
          AI for Teachers FAQ - Safe AI Tool Questions Answered
        </h1>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Everything you need to know about using hallucination-safe AI for teacher reports, parent communication, and reducing workload. Get answers about GDPR compliance, AI vs ChatGPT, and more.
        </p>
      </header>
      
      {/* Organized by categories with semantic markup for AI SEO */}
      <div className="space-y-8" itemScope itemType="https://schema.org/FAQPage">
        {faqCategories.map((category, categoryIdx) => (
          <section key={categoryIdx} role="region" aria-labelledby={`category-${categoryIdx}`}>
            <h2 id={`category-${categoryIdx}`} className="text-xl font-semibold text-gray-800 mb-4 border-b-2 border-purple-100 pb-2">
              {category.title}
            </h2>
            <dl className="space-y-3">
              {category.faqs.map((faq, faqIdx) => (
                <div key={`${categoryIdx}-${faqIdx}`} itemScope itemType="https://schema.org/Question">
                  <Disclosure>
                    {({ open }) => (
                      <>
                        <dt>
                          <Disclosure.Button 
                            className="flex w-full justify-between rounded-lg bg-purple-50 px-4 py-3 text-left text-base font-medium text-purple-900 hover:bg-purple-100 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75 transition-colors"
                            onClick={() => {
                              if (!open) { // Only track when opening, not closing
                                trackFAQExpanded(faq.question);
                              }
                            }}
                            itemProp="name"
                          >
                            <span className="pr-4">{faq.question}</span>
                            <ChevronUp
                              className={`${
                                open ? 'rotate-180 transform' : ''
                              } h-5 w-5 text-purple-500 flex-shrink-0`}
                              aria-hidden="true"
                            />
                          </Disclosure.Button>
                        </dt>
                        <dd>
                          <Disclosure.Panel 
                            className="px-4 pt-3 pb-4 text-gray-700 leading-relaxed"
                            itemScope 
                            itemType="https://schema.org/Answer"
                            itemProp="acceptedAnswer"
                          >
                            <div itemProp="text">{faq.answer}</div>
                          </Disclosure.Panel>
                        </dd>
                      </>
                    )}
                  </Disclosure>
                </div>
              ))}
            </dl>
          </section>
        ))}
      </div>
    </div>
  )
}
