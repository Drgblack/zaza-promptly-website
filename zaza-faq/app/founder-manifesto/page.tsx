import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "About the Founder - Zaza Technologies",
  description: "Meet Dr. Greg Blackburn, founder of Zaza Technologies and advocate for human-centered AI in education.",
}

export default function FounderManifestoPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
              About the Founder
            </h1>
            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-12">
              Meet Dr. Greg Blackburn, the educator and learning scientist behind Zaza Technologies.
            </p>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="md:col-span-1">
                <div className="bg-gradient-to-br from-pink-100 to-purple-100 dark:from-pink-900/20 dark:to-purple-900/20 rounded-lg p-8 text-center">
                  <div className="w-32 h-32 bg-gray-300 dark:bg-gray-600 rounded-full mx-auto mb-4"></div>
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">Dr. Greg Blackburn</h2>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Global Director of Learning
                    <br />
                    20+ Years in Education
                  </p>
                </div>
              </div>

              <div className="md:col-span-2">
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">The Journey</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    With over 20 years in education and learning science, Dr. Greg Blackburn has seen firsthand how
                    technology can either enhance or hinder the teaching and learning process. As a Global Director of
                    Learning, he witnessed the gap between what educators need and what technology companies typically
                    deliver.
                  </p>

                  <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">The Problem</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Most AI tools are built by technologists for technologists. They require extensive prompting, lack
                    educational context, and often produce generic outputs that don't serve the nuanced needs of
                    educators. Teachers deserve better.
                  </p>

                  <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">The Solution</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Zaza Technologies was founded on a simple principle: AI should amplify human potential, not replace
                    it. Every tool we build is designed by educators, for educators, with real classroom needs at the
                    center.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8 mb-12">
              <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-200">Core Beliefs</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Teachers Are Irreplaceable</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    No AI can replace the human connection, empathy, and intuition that great teachers bring to
                    learning.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Context Matters</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Educational AI must understand pedagogy, curriculum standards, and classroom dynamics.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Transparency is Essential</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Educators deserve to know how AI tools work and what happens to their data.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Joy in Learning</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Technology should bring joy back to teaching and learning, not create more stress.
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Join the Mission</h2>
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
      <Footer currentPage="founder-manifesto" />
    </>
  )
}
