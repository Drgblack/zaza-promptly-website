import React from "react"
import { FAQSection } from "@/components/faq-section"

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-[#F3F3F3] mb-4 transition-colors duration-300">
            Frequently Asked Questions
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed transition-colors duration-300">
            Everything you need to know about using Zaza Promptly in your classroom, your workflow, and your school.
          </p>
        </div>

        {/* FAQ Section */}
        <FAQSection />
      </div>
    </div>
  )
}
