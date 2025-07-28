"use client"

import { useState } from "react"
import { type LucideIcon, ChevronDown } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { cn } from "@/lib/utils"
import type { FaqQuestion } from "@/lib/faq-data"

interface FaqSectionProps {
  id: string
  title: string
  icon: LucideIcon
  questions: FaqQuestion[]
  isMobileView: boolean
}

export function FaqSection({ id, title, icon: Icon, questions, isMobileView }: FaqSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  // For mobile view, we use a collapsible section header
  const MobileHeader = () => (
    <button
      onClick={() => setIsExpanded(!isExpanded)}
      className="flex items-center justify-between w-full py-4 text-left"
    >
      <div className="flex items-center">
        <Icon className="h-6 w-6 mr-3 text-purple-500" />
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">{title}</h2>
      </div>
      <ChevronDown
        className={cn(
          "h-5 w-5 text-gray-500 dark:text-gray-400 transition-transform",
          isExpanded ? "transform rotate-180" : "",
        )}
      />
    </button>
  )

  // For desktop view, we use a static section header
  const DesktopHeader = () => (
    <div className="flex items-center mb-6">
      <Icon className="h-7 w-7 mr-3 text-purple-500" />
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">{title}</h2>
    </div>
  )

  return (
    <section id={id} className="mb-12 scroll-mt-8">
      {isMobileView ? <MobileHeader /> : <DesktopHeader />}

      <div className={cn("mt-4", isMobileView && !isExpanded ? "hidden" : "block")}>
        <Accordion type="single" collapsible className="w-full">
          {questions.map((question, index) => (
            <AccordionItem
              key={index}
              value={`${id}-question-${index}`}
              className="border-gray-200 dark:border-gray-700"
            >
              <AccordionTrigger className="text-left font-medium text-gray-700 dark:text-gray-300 hover:text-purple-700 dark:hover:text-purple-400">
                {question.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 dark:text-gray-400">{question.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
