import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CheckCircle, XCircle, ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "Why Not Just Use ChatGPT? - Zaza Technologies",
  description: "Understanding the difference between general AI tools and purpose-built educational AI.",
}

export default function WhyNotChatGPTPage() {
  const comparisons = [
    {
      feature: "Educational Context",
      chatgpt: "Generic responses, requires extensive prompting",
      zaza: "Built-in understanding of pedagogy and classroom needs",
      zazaWins: true,
    },
    {
      feature: "Curriculum Alignment",
      chatgpt: "Manual alignment required for each request",
      zaza: "Pre-aligned with educational standards and frameworks",
      zazaWins: true,
    },
    {
      feature: "Professional Tone",
      chatgpt: "Inconsistent, requires careful prompt engineering",
      zaza: "Consistently appropriate for parent-teacher communication",
      zazaWins: true,
    },
    {
      feature: "Time Investment",
      chatgpt: "High - requires learning complex prompting techniques",
      zaza: "Low - ready-to-use templates and workflows",
      zazaWins: true,
    },
    {
      feature: "Data Privacy",
      chatgpt: "General privacy policy, data used for training",
      zaza: "GDPR compliant, FERPA safe, education-focused privacy",
      zazaWins: true,
    },
    {
      feature: "Cost",
      chatgpt: "Free tier available, paid plans for advanced features",
      zaza: "Education-focused pricing with free tiers",
      zazaWins: false,
    },
  ]

  return (
    <>
      <Header />
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
              Why Not Just Use ChatGPT?
            </h1>
            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-12">
              A fair question that deserves a thoughtful answer. Here's why purpose-built educational AI matters.
            </p>

            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-12">
              <h2 className="text-xl font-semibold text-blue-800 dark:text-blue-200 mb-3">The Short Answer</h2>
              <p className="text-blue-700 dark:text-blue-300">
                ChatGPT is a powerful general-purpose tool, but Zaza is purpose-built for education. It's the difference
                between using a Swiss Army knife and using the right tool for the job.
              </p>
            </div>

            <div className="mb-12">
              <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-200">Feature Comparison</h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-gray-700">
                      <th className="text-left p-4 font-semibold text-gray-800 dark:text-gray-200">Feature</th>
                      <th className="text-left p-4 font-semibold text-gray-800 dark:text-gray-200">ChatGPT</th>
                      <th className="text-left p-4 font-semibold text-gray-800 dark:text-gray-200">Zaza</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisons.map((comparison, index) => (
                      <tr key={index} className="border-t border-gray-200 dark:border-gray-700">
                        <td className="p-4 font-medium text-gray-800 dark:text-gray-200">{comparison.feature}</td>
                        <td className="p-4 text-gray-600 dark:text-gray-400">
                          <div className="flex items-start space-x-2">
                            <XCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                            <span>{comparison.chatgpt}</span>
                          </div>
                        </td>
                        <td className="p-4 text-gray-600 dark:text-gray-400">
                          <div className="flex items-start space-x-2">
                            <CheckCircle
                              className={`h-5 w-5 mt-0.5 flex-shrink-0 ${comparison.zazaWins ? "text-green-500" : "text-yellow-500"}`}
                            />
                            <span>{comparison.zaza}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">ChatGPT is Great For...</h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li>• General writing and brainstorming</li>
                  <li>• Creative projects and exploration</li>
                  <li>• Learning new topics</li>
                  <li>• One-off questions and tasks</li>
                </ul>
              </div>

              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Zaza is Built For...</h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li>• Daily teaching workflows</li>
                  <li>• Parent-teacher communication</li>
                  <li>• Curriculum-aligned content</li>
                  <li>• Professional educational contexts</li>
                </ul>
              </div>
            </div>

            <div className="bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 rounded-lg p-8 text-center">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Try the Difference</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Experience purpose-built educational AI that understands your context from day one.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/promptly"
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg hover:opacity-90 transition-opacity font-medium"
                >
                  Try Zaza Promptly <ArrowRight className="ml-2 h-4 w-4" />
                </a>
                <a
                  href="/teach"
                  className="inline-flex items-center px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
                >
                  Try Zaza Teach <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer currentPage="why-not-chatgpt" />
    </>
  )
}
