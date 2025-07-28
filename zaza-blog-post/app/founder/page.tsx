import type { Metadata } from "next"
import { NewHeader } from "@/components/new-header"
import { Footer } from "@/components/footer"
import Image from "next/image"

export const metadata: Metadata = {
  title: "About the Founder | Zaza Technologies",
  description: "Learn about Dr. Greg Blackburn, founder of Zaza Technologies and his vision for AI in education.",
}

export default function FounderPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <NewHeader />

      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">About the Founder</h1>
            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
              Meet Dr. Greg Blackburn, the educator and technologist behind Zaza Technologies' mission to transform
              education through ethical AI.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
            <div className="lg:col-span-1">
              <div className="relative">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 opacity-75 animate-pulse blur-sm"></div>
                <div className="relative p-1 rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 shadow-lg">
                  <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-white p-1">
                    <Image
                      src="/images/greg-headshot.jpg"
                      alt="Dr. Greg Blackburn"
                      fill
                      className="rounded-xl object-cover"
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="prose prose-lg prose-gray dark:prose-invert max-w-none">
                <h2>Dr. Greg Blackburn</h2>
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  Chief Learning Officer at Communardo and founder of Zaza Technologies, Dr. Greg Blackburn brings
                  together decades of educational experience with cutting-edge AI innovation.
                </p>

                <h3>Educational Background</h3>
                <p>
                  With a deep understanding of both pedagogy and technology, Greg has spent his career at the
                  intersection of education and innovation. His work focuses on creating AI tools that respect and
                  enhance human teaching rather than replacing it.
                </p>

                <h3>Vision for AI in Education</h3>
                <p>
                  Greg believes that AI should amplify human creativity and connection in education. His approach
                  prioritizes ethical AI development, data privacy, and tools that give teachers more time for what
                  matters most—inspiring and connecting with students.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-4">Core Beliefs</h3>
              <ul className="space-y-2 text-blue-800 dark:text-blue-200 text-sm">
                <li>• AI should enhance, not replace, human expertise</li>
                <li>• Privacy and ethics must be built into every tool</li>
                <li>• Technology should respect pedagogical principles</li>
                <li>• Teachers deserve tools built specifically for them</li>
              </ul>
            </div>

            <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-purple-900 dark:text-purple-100 mb-4">Professional Focus</h3>
              <ul className="space-y-2 text-purple-800 dark:text-purple-200 text-sm">
                <li>• Chief Learning Officer at Communardo</li>
                <li>• Founder of Zaza Technologies</li>
                <li>• AI ethics and educational technology advocate</li>
                <li>• Speaker on human-centered AI design</li>
              </ul>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8">
            <blockquote className="text-center">
              <p className="text-xl italic text-gray-800 dark:text-gray-200 mb-6">
                "The goal isn't to replace the human touch in education, but to give teachers more time to focus on what
                they do best—inspiring and connecting with students."
              </p>
              <cite className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                — Dr. Greg Blackburn, Founder of Zaza Technologies
              </cite>
            </blockquote>
          </div>

          <div className="mt-16 text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Connect with Greg</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Interested in learning more about the vision behind Zaza Technologies?
            </p>
            <a
              href="/contact"
              className="inline-flex items-center px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors duration-200"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
