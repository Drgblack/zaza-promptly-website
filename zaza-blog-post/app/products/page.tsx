import type { Metadata } from "next"
import React from "react"

export const metadata: Metadata = {
  title: "Zaza Product List | Zaza Technologies",
  description: "Explore the complete suite of Zaza AI tools designed for educators and professionals.",
}

export default function ProductsPage() {
  const products = [
    {
      name: "Zaza Teach",
      description: "AI-powered lesson planning and curriculum development tool designed specifically for educators.",
      status: "Live",
      link: "https://zazateach.com",
      external: true,
      color: "purple",
    },
    {
      name: "Zaza Promptly",
      description: "Advanced prompt engineering tool for creating effective AI interactions and workflows.",
      status: "Live",
      link: "https://zazapromptly.com",
      external: true,
      color: "pink",
    },
    {
      name: "Zaza Study",
      description: "Personalized study companion that adapts to individual learning styles and needs.",
      status: "Coming Soon",
              link: "/zaza-study-landing",
      external: false,
      color: "blue",
    },
    {
      name: "Zaza Visuals",
      description: "Create stunning educational visuals and infographics with AI assistance.",
      status: "Coming Soon",
              link: "/zaza-visuals-landing (1)",
      external: false,
      color: "green",
    },
    {
      name: "Zaza Coach",
      description: "AI-powered coaching platform for professional development and skill building.",
      status: "Coming Soon",
      link: "/zaza-coach",
      external: false,
      color: "orange",
    },
    {
      name: "Zaza ClarityDeck",
      description: "Transform complex information into clear, engaging presentations automatically.",
      status: "Coming Soon",
      link: "/zaza-claritydeck",
      external: false,
      color: "indigo",
    },
    {
      name: "Zaza Schwoop",
      description: "Streamlined communication tool for educators, parents, and administrators.",
      status: "Coming Soon",
      link: "/zaza-schwoop",
      external: false,
      color: "teal",
    },
    {
      name: "Zaza HR Spark",
      description: "AI-powered human resources tool for educational institutions and organizations.",
      status: "Coming Soon",
      link: "/zaza-hr-spark",
      external: false,
      color: "red",
    },
  ]

  const getColorClasses = (color: string) => {
    const colors = {
      purple: "bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400",
      pink: "bg-pink-100 dark:bg-pink-900 text-pink-600 dark:text-pink-400",
      blue: "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400",
      green: "bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400",
      orange: "bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-400",
      indigo: "bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400",
      teal: "bg-teal-100 dark:bg-teal-900 text-teal-600 dark:text-teal-400",
      red: "bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400",
    }
    return colors[color as keyof typeof colors] || colors.purple
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <main className="pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">Zaza Product Suite</h1>
            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              Discover our comprehensive suite of AI-powered tools designed to enhance education and productivity while
              respecting human expertise.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {products.map((product, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow duration-200"
              >
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center ${getColorClasses(product.color)}`}
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <span
                    className={`px-3 py-1 text-xs font-medium rounded-full ${
                      product.status === "Live"
                        ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200"
                        : "bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200"
                    }`}
                  >
                    {product.status}
                  </span>
                </div>

                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{product.name}</h3>

                <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm leading-relaxed">{product.description}</p>

                {product.external ? (
                  <a
                    href={product.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium text-sm transition-colors duration-200"
                  >
                    Try Now
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                ) : (
                  <span className="inline-flex items-center text-gray-400 dark:text-gray-500 font-medium text-sm">
                    Coming Soon
                  </span>
                )}
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Ready to Transform Your Workflow?</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              Start with our live tools today and experience the difference AI can make in your educational practice.
            </p>
            <div className="space-x-4">
              <a
                href="https://zazateach.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors duration-200"
              >
                Try Zaza Teach
              </a>
              <a
                href="https://zazapromptly.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-medium rounded-lg transition-colors duration-200"
              >
                Try Zaza Promptly
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
