'use client'

import React from 'react'
import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/20/solid'

const faqs = [
  {
    question: 'Will this actually save me time or just create more work?',
    answer: 'Zaza Promptly is designed to reduce mental load, not increase it. You don’t need perfect prompts - just pick a student and get tailored, editable comments in seconds.',
  },
  {
    question: 'Is it safe to use AI for student reports?',
    answer: 'Yes. Promptly avoids plagiarism, doesn’t reuse data, and is built with privacy in mind. It’s safer than copying past reports or Googling ideas.',
  },
  {
    question: 'How is this different from ChatGPT or other AI tools?',
    answer: 'It’s made for teachers - not tech pros. It remembers your tone, aligns to your rubrics, works on mobile, and doesn’t “hallucinate” or go off track.',
  },
  {
    question: 'Will the comments sound like me?',
    answer: 'Yes. Promptly can match your tone, whether you’re empathetic, direct, or positive-but-honest. You can tweak responses with one tap or write your own templates.',
  },
  {
    question: 'Does it work for all subjects and ages?',
    answer: 'Yes - teachers use Promptly from Kindergarten through Year 12, across subjects like English, Math, Science, Arts, and more.',
  },
  {
    question: 'Can my school pay for this?',
    answer: 'Absolutely. We offer school licenses and can provide custom pricing or quotes if your leadership team needs them.',
  },
  {
    question: 'Is there a free version?',
    answer: 'Yes! You can use Promptly for free to get started, with paid upgrades if you need more lesson comments or features.',
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
                  <ChevronUpIcon
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
