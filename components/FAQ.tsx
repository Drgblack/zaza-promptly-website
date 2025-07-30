'use client'

import React from 'react'
import { Disclosure } from '@headlessui/react'
import { ChevronUp } from 'lucide-react'

const faqs = [
  {
    question: 'Will this actually save me time or just create more work?',
    answer: 'Zaza Promptly is designed to reduce mental load, not increase it. You don't need perfect prompts - just pick a student and get tailored, editable comments in seconds. Most teachers save 2-3 hours per week on report writing alone.',
  },
  {
    question: 'Is it safe to use AI for student reports?',
    answer: 'Yes. Promptly avoids plagiarism, doesn't reuse data, and is built with privacy in mind. It's safer than copying past reports or Googling ideas, and we never store or share student information.',
  },
  {
    question: 'Why not just use ChatGPT?',
    answer: 'ChatGPT is a general tool that requires complex prompting and often produces generic responses. Zaza Promptly is specifically designed for teachers - it understands educational contexts, maintains your teaching voice, and provides curriculum-aligned suggestions without the trial-and-error of generic AI tools.',
  },
  {
    question: 'Will the comments sound like me?',
    answer: 'Yes. Promptly can match your tone, whether you're empathetic, direct, or positive-but-honest. You can tweak responses with one tap or write your own templates that the AI learns from.',
  },
  {
    question: 'Does it work for all subjects and ages?',
    answer: 'Yes - teachers use Promptly from Kindergarten through Year 12, across subjects like English, Math, Science, Arts, and more. The AI adapts to subject-specific vocabulary and age-appropriate language automatically.',
  },
  {
    question: 'How much does it cost?',
    answer: 'We offer a free tier to get started, with premium plans starting from affordable monthly rates. School licenses and bulk pricing are available for educational institutions.',
  },
  {
    question: 'Can my school pay for this?',
    answer: 'Absolutely. We offer school licenses and can provide custom pricing or quotes if your leadership team needs them. Many schools appreciate the time savings and consistency benefits for their staff.',
  },
  {
    question: 'How do I know the AI suggestions are accurate?',
    answer: 'All suggestions are designed to be starting points that you review and edit. Promptly uses educational best practices and can align to your specific rubrics and assessment criteria. You always have final control over what goes into reports.',
  },
  {
    question: 'Will this replace my professional judgment?',
    answer: 'Never. Zaza Promptly is a writing assistant, not a replacement for your expertise. It helps you articulate your observations more efficiently while you maintain complete control over all educational decisions and assessments.',
  },
  {
    question: 'How quickly can I get started?',
    answer: 'You can be up and running in under 5 minutes. Simply sign up, add your first class, and start generating comments. No complex setup or training required.',
  },
  {
    question: 'What if I don't like the generated content?',
    answer: 'Every suggestion is fully editable, and you can regenerate alternatives with different tones or focuses. Over time, the AI learns your preferences and becomes more accurate to your style.',
  },
  {
    question: 'Does it work on mobile devices?',
    answer: 'Yes! Zaza Promptly is fully responsive and works seamlessly on phones and tablets. You can write reports anywhere, anytime - perfect for busy teachers on the go.',
  },
  {
    question: 'How does it handle student privacy?',
    answer: 'We take privacy seriously. Student data is encrypted, never shared with third parties, and you control what information you input. We comply with educational privacy standards and regulations.',
  },
  {
    question: 'Can I use it for parent communication too?',
    answer: 'Absolutely! Promptly helps with parent emails, meeting notes, and communication templates. It can adjust tone for difficult conversations or help articulate student progress clearly.',
  },
  {
    question: 'What support do you offer?',
    answer: 'We provide comprehensive support including tutorials, email assistance, and educational resources. Our team understands teaching challenges and provides practical, teacher-focused help when you need it.',
  },
]

export default function FAQ() {
  return (
    <div className="w-full px-4 pt-16 pb-20 mx-auto max-w-3xl" id="faq">
      <h2 className="text-center text-3xl font-bold text-gray-800 mb-10">
        Frequently Asked Questions
      </h2>
      <div className="space-y-4">
        {faqs.map((faq, idx) => (
          <Disclosure key={idx}>
            {({ open }) => (
              <>
                <Disclosure.Button className="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-3 text-left text-base font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                  <span>{faq.question}</span>
                  <ChevronUp
                    className={`${
                      open ? 'rotate-180 transform' : ''
                    } h-5 w-5 text-purple-500`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="px-4 pt-3 pb-2 text-sm text-gray-700">
                  {faq.answer}
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        ))}
      </div>
    </div>
  )
}
