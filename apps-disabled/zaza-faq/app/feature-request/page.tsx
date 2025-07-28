import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Lightbulb, Send, Users, Zap } from "lucide-react"

export const metadata: Metadata = {
  title: "Zaza Feature Request - Zaza Technologies",
  description: "Help shape the future of Zaza tools by sharing your ideas and feature requests.",
}

export default function FeatureRequestPage() {
  const categories = [
    {
      name: "Zaza Promptly",
      description: "Parent communication improvements",
      icon: Send,
      color: "text-blue-500",
    },
    {
      name: "Zaza Teach",
      description: "Lesson planning enhancements",
      icon: Lightbulb,
      color: "text-green-500",
    },
    {
      name: "New Tools",
      description: "Ideas for entirely new products",
      icon: Zap,
      color: "text-purple-500",
    },
    {
      name: "General",
      description: "Platform-wide improvements",
      icon: Users,
      color: "text-pink-500",
    },
  ]

  return (
    <>
      <Header />
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
              Feature Requests
            </h1>
            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-12">
              Help us build better tools for educators. Your ideas drive our development roadmap.
            </p>

            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-12">
              <h2 className="text-xl font-semibold text-blue-800 dark:text-blue-200 mb-3">We Listen to Educators</h2>
              <p className="text-blue-700 dark:text-blue-300">
                Every feature in Zaza tools comes from real educator feedback. Your classroom experience shapes our
                product development, ensuring we build what teachers actually need.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {categories.map((category, index) => {
                const Icon = category.icon
                return (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-center mb-4">
                      <Icon className={`h-8 w-8 ${category.color} mr-3`} />
                      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">{category.name}</h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">{category.description}</p>
                    <button className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium">
                      Submit Idea →
                    </button>
                  </div>
                )
              })}
            </div>

            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8 mb-12">
              <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-200">
                Submit Your Feature Request
              </h2>
              <form className="space-y-6">
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Category
                  </label>
                  <select
                    id="category"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  >
                    <option>Select a category</option>
                    <option>Zaza Promptly</option>
                    <option>Zaza Teach</option>
                    <option>New Tools</option>
                    <option>General</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Feature Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    placeholder="Brief description of your feature idea"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  />
                </div>

                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Detailed Description
                  </label>
                  <textarea
                    id="description"
                    rows={6}
                    placeholder="Describe your feature idea in detail. What problem would it solve? How would you use it in your classroom?"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  ></textarea>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email (Optional)
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="your.email@school.edu"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  />
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    We'll reach out if we need more details about your request.
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg hover:opacity-90 transition-opacity font-medium"
                >
                  Submit Feature Request
                </button>
              </form>
            </div>

            <div className="text-center">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">What Happens Next?</h2>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="bg-purple-100 dark:bg-purple-900/20 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                    <span className="text-purple-600 dark:text-purple-400 font-bold">1</span>
                  </div>
                  <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Review</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Our team reviews all submissions</p>
                </div>
                <div>
                  <div className="bg-purple-100 dark:bg-purple-900/20 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                    <span className="text-purple-600 dark:text-purple-400 font-bold">2</span>
                  </div>
                  <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Prioritize</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Features are added to our roadmap</p>
                </div>
                <div>
                  <div className="bg-purple-100 dark:bg-purple-900/20 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                    <span className="text-purple-600 dark:text-purple-400 font-bold">3</span>
                  </div>
                  <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Build</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">We develop and release new features</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer currentPage="feature-request" />
    </>
  )
}
