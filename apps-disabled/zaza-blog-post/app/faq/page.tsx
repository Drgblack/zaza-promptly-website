import type { Metadata } from "next"
import { NewHeader } from "@/components/new-header"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "FAQs | Zaza Technologies",
  description: "Frequently asked questions about Zaza AI tools for educators and professionals.",
}

export default function FAQPage() {
  const faqs = [
    {
      question: "What makes Zaza different from other AI tools?",
      answer:
        "Zaza is specifically designed for educators, with features that respect pedagogy and enhance rather than replace human teaching. Our tools are FERPA-compliant and built with educational ethics in mind.",
    },
    {
      question: "Is Zaza safe for student data?",
      answer:
        "Yes, all Zaza tools are FERPA-compliant and GDPR-compliant. We prioritize data privacy and security, ensuring that student information is protected at all times.",
    },
    {
      question: "How much does Zaza cost?",
      answer:
        "We offer various pricing tiers to accommodate different needs, from individual educators to entire school districts. Contact us for detailed pricing information.",
    },
    {
      question: "Can I try Zaza before purchasing?",
      answer:
        "We offer free trials for all our tools. You can start with Zaza Teach or Zaza Promptly to experience the difference AI can make in your workflow.",
    },
    {
      question: "Do you provide training and support?",
      answer:
        "Yes, we provide comprehensive training materials, video tutorials, and ongoing support to help you get the most out of Zaza tools.",
    },
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <NewHeader />

      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
              Find answers to common questions about Zaza AI tools and how they can transform your teaching and
              productivity.
            </p>
          </div>

          <div className="space-y-8">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">{faq.question}</h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Still have questions?</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                Our support team is here to help you get the most out of Zaza tools.
              </p>
              <a
                href="/contact"
                className="inline-flex items-center px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors duration-200"
              >
                Contact Support
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
