"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown, ChevronRight } from "lucide-react"

const faqs = [
  {
    question: "Will it match my school's tone?",
    answer:
      "Yes. Zaza Promptly learns your writing style from the notes you enter. It mirrors the tone you'd use naturally, so comments sound like you - not like AI.",
  },
  {
    question: "Do I need to train the AI first?",
    answer:
      "No training required. Promptly works out of the box. Just write a few student notes like you normally would, and it will produce professional, personalised comments.",
  },
  {
    question: "Is it really safe to use for reports?",
    answer:
      "Yes. You're always in control - every comment is editable, and we don't use your data to train third-party models.",
  },
  {
    question: "Can I edit the comments it gives me?",
    answer:
      "Absolutely. Think of Promptly as a smart assistant - you can tweak, expand, or shorten any comment before using it. Many teachers say they barely need to touch them.",
  },
  {
    question: "Isn't using AI to write reports a form of cheating?",
    answer:
      "No. Zaza Promptly doesn't replace your judgement - it supports it. You still decide what to say about each pupil. Promptly simply helps you express it more clearly and efficiently. Think of it like a spellchecker or a planner: it saves you time, but the insight still comes from you. Teachers who've used it say it helps them write better, more thoughtful comments - not less.",
  },
  {
    question: "Will this actually save me time?",
    answer:
      "Yes. Most teachers report saving 5–10+ hours during report season. With Promptly, you focus on what your students need - not how to word it 30 times.",
  },
  {
    question: "How is this different from ChatGPT?",
    answer:
      "ChatGPT is general-purpose. Zaza Promptly is purpose-built for teachers. It understands tone, curriculum, learning goals, and school standards - and requires no prompting or setup.",
  },
  {
    question: "What's included in the free plan?",
    answer:
      "The free plan includes 5 AI-generated comments per month, basic tone matching, and curriculum-aware feedback. No credit card is required to get started.",
  },
  {
    question: "Can I use it on mobile?",
    answer:
      "Yes. Zaza Promptly works on mobile and tablet, so you can use it on the go - whether at school, at home, or in between lessons.",
  },
  {
    question: "Will it work for UK, Australian, and US curriculum?",
    answer:
      "Yes. Promptly has been tested with national curriculum standards in the UK, Australia, and the US. It generates appropriate language for each region automatically.",
  },
  {
    question: "Who built this?",
    answer:
      "Zaza Promptly was created by Dr Greg Blackburn - a PhD-qualified educator with 20 years' experience in digital learning. It's built by teachers, for teachers.",
  },
  {
    question: "Is Zaza Promptly GDPR compliant?",
    answer:
      "Yes. We fully comply with GDPR. Your data is stored securely, not shared with third parties, and never used to train third-party models. You can request deletion at any time.",
  },
  {
    question: "Is it safe to use for US FERPA-protected data?",
    answer:
      "Yes. Promptly does not collect identifiable student data and adheres to FERPA-aligned handling. You are always in control of what's entered, and nothing is used beyond your session.",
  },
]

export function FAQSection() {
  const [openItems, setOpenItems] = useState<number[]>([])

  const toggleItem = (index: number) => {
    setOpenItems((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]))
  }

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <Card
          key={index}
          className="overflow-hidden border-0 shadow-md hover:shadow-lg transition-all duration-300 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm"
        >
          <Collapsible open={openItems.includes(index)} onOpenChange={() => toggleItem(index)}>
            <CollapsibleTrigger className="w-full">
              <CardContent className="p-6 hover:bg-gray-50/50 dark:hover:bg-gray-700/50 transition-colors duration-300">
                <div className="flex items-center justify-between text-left">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-[#F3F3F3] pr-4 transition-colors duration-300">
                    {faq.question}
                  </h3>
                  <div className="flex-shrink-0">
                    {openItems.includes(index) ? (
                      <ChevronDown className="h-5 w-5 text-gray-500 dark:text-gray-400 transition-all duration-300" />
                    ) : (
                      <ChevronRight className="h-5 w-5 text-gray-500 dark:text-gray-400 transition-all duration-300" />
                    )}
                  </div>
                </div>
              </CardContent>
            </CollapsibleTrigger>
            <CollapsibleContent className="transition-all duration-300 ease-in-out">
              <CardContent className="px-6 pb-6 pt-0">
                <div className="border-t border-gray-100 dark:border-gray-700 pt-4 transition-colors duration-300">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed transition-colors duration-300">
                    {faq.answer}
                  </p>
                </div>
              </CardContent>
            </CollapsibleContent>
          </Collapsible>
        </Card>
      ))}
    </div>
  )
}
