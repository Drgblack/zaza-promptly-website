import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Blog - Zaza Technologies",
  description: "Latest insights, updates, and educational content from Zaza Technologies.",
}

export default function BlogPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
              Zaza Blog
            </h1>
            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8">
              Insights, updates, and educational content from the Zaza Technologies team.
            </p>

            <div className="prose prose-lg dark:prose-invert max-w-none">
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8 mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Coming Soon</h2>
                <p className="text-gray-600 dark:text-gray-400">
                  We're working on bringing you valuable content about AI in education, teaching best practices, and
                  insights from our product development journey. Stay tuned for regular updates!
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">Educational AI</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Exploring the intersection of artificial intelligence and pedagogy.
                  </p>
                </div>

                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">Product Updates</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Latest features and improvements across the Zaza ecosystem.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer currentPage="blog" />
    </>
  )
}
