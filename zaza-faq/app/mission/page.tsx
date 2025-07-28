import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Target, Eye, Heart } from "lucide-react"

export const metadata: Metadata = {
  title: "Vision & Mission - Zaza Technologies",
  description: "Our vision and mission to transform education through human-centered AI.",
}

export default function MissionPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
              Vision & Mission
            </h1>
            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-12">
              Building the future of education through human-centered AI.
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8">
                <div className="flex items-center mb-4">
                  <Eye className="h-8 w-8 text-purple-500 mr-3" />
                  <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">Our Vision</h2>
                </div>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  A world where AI empowers educators to focus on what matters most: inspiring, connecting with, and
                  nurturing the growth of every learner. We envision classrooms where technology amplifies human
                  potential rather than replacing it.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8">
                <div className="flex items-center mb-4">
                  <Target className="h-8 w-8 text-pink-500 mr-3" />
                  <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">Our Mission</h2>
                </div>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  To create transparent, ethical AI tools that save teachers time without replacing them. Built for
                  pedagogy, trusted by educators, and focused on learning—not shortcuts. Every tool we build puts human
                  connection at the center.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 rounded-lg p-8 mb-12">
              <div className="flex items-center mb-4">
                <Heart className="h-8 w-8 text-purple-500 mr-3" />
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">Our Values</h2>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Educator-First</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Every decision is made with teachers' real needs in mind.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Transparency</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Clear about how our AI works and what it does with your data.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Human-Centered</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Technology that enhances human connection, not replaces it.
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Join Our Mission</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Ready to experience AI tools built by educators, for educators?
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/promptly"
                  className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg hover:opacity-90 transition-opacity font-medium"
                >
                  Try Zaza Promptly
                </a>
                <a
                  href="/teach"
                  className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
                >
                  Try Zaza Teach
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer currentPage="mission" />
    </>
  )
}
