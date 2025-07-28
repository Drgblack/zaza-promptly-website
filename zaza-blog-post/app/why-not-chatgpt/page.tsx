import type { Metadata } from "next"
import { NewHeader } from "@/components/new-header"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Why Not Just Use ChatGPT? | Zaza Technologies",
  description: "Discover why specialized AI tools for education offer advantages over general-purpose AI like ChatGPT.",
}

export default function WhyNotChatGPTPage() {
  const comparisons = [
    {
      category: "Educational Focus",
      chatgpt: "General-purpose AI for all domains",
      zaza: "Purpose-built for education with pedagogical understanding",
    },
    {
      category: "Data Privacy",
      chatgpt: "Data may be used for training",
      zaza: "FERPA-compliant with strict privacy controls",
    },
    {
      category: "Curriculum Alignment",
      chatgpt: "Generic responses without curriculum context",
      zaza: "Aligned to educational standards and frameworks",
    },
    {
      category: "Teacher Workflow",
      chatgpt: "Requires extensive prompt engineering",
      zaza: "Designed for educator workflows and time constraints",
    },
    {
      category: "Student Safety",
      chatgpt: "General content filters",
      zaza: "Education-specific safety and appropriateness checks",
    },
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <NewHeader />

      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Why Not Just Use ChatGPT?
            </h1>
            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
              While ChatGPT is a powerful general-purpose AI, Zaza tools are specifically designed for the unique needs
              of educators and learners.
            </p>
          </div>

          <div className="mb-16">
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-8">
              <h2 className="text-xl font-semibold text-blue-900 dark:text-blue-100 mb-3">The Short Answer</h2>
              <p className="text-blue-800 dark:text-blue-200">
                ChatGPT is like a Swiss Army knife—versatile but not specialized. Zaza tools are like professional
                instruments designed specifically for education, offering precision, safety, and efficiency that general
                AI cannot match.
              </p>
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Key Differences</h2>

            <div className="overflow-x-auto">
              <table className="w-full bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Feature</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">ChatGPT</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">
                      Zaza Tools
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {comparisons.map((item, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">{item.category}</td>
                      <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{item.chatgpt}</td>
                      <td className="px-6 py-4 text-sm text-green-700 dark:text-green-400 font-medium">{item.zaza}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-red-900 dark:text-red-100 mb-4">
                ChatGPT Challenges for Educators
              </h3>
              <ul className="space-y-2 text-red-800 dark:text-red-200 text-sm">
                <li>• Time-consuming prompt engineering</li>
                <li>• No curriculum alignment</li>
                <li>• Privacy concerns with student data</li>
                <li>• Generic responses lacking context</li>
                <li>• No integration with educational workflows</li>
              </ul>
            </div>

            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-4">Zaza Advantages</h3>
              <ul className="space-y-2 text-green-800 dark:text-green-200 text-sm">
                <li>• Ready-to-use educational templates</li>
                <li>• Standards-aligned content generation</li>
                <li>• FERPA-compliant data handling</li>
                <li>• Context-aware educational responses</li>
                <li>• Seamless integration with teaching workflows</li>
              </ul>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Experience the Difference</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              Try Zaza tools and see how purpose-built AI can transform your educational practice in ways that general
              AI simply cannot.
            </p>
            <div className="space-x-4">
              <a
                href="https://zazateach.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors duration-200"
              >
                Try Zaza Teach Free
              </a>
              <a
                href="/products"
                className="inline-flex items-center px-6 py-3 border border-purple-600 text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20 font-medium rounded-lg transition-colors duration-200"
              >
                See All Products
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
