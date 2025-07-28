import type { Metadata } from "next"
import { NewHeader } from "@/components/new-header"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Support | Zaza Technologies",
  description: "Get help with Zaza AI tools. Find answers, tutorials, and contact our support team.",
}

export default function SupportPage() {
  const supportOptions = [
    {
      title: "Knowledge Base",
      description: "Find answers to common questions and step-by-step guides.",
      icon: "book",
      link: "/faq",
      color: "blue",
    },
    {
      title: "Video Tutorials",
      description: "Watch detailed tutorials on using Zaza tools effectively.",
      icon: "video",
      link: "/resources",
      color: "green",
    },
    {
      title: "Contact Support",
      description: "Get personalized help from our support team.",
      icon: "support",
      link: "/contact",
      color: "purple",
    },
    {
      title: "Feature Requests",
      description: "Suggest new features or improvements to existing tools.",
      icon: "lightbulb",
      link: "/feature-request",
      color: "orange",
    },
  ]

  const getIconSvg = (icon: string) => {
    switch (icon) {
      case "book":
        return (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        )
      case "video":
        return (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
          />
        )
      case "support":
        return (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
          />
        )
      case "lightbulb":
        return (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
          />
        )
      default:
        return null
    }
  }

  const getColorClasses = (color: string) => {
    const colors = {
      blue: "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400",
      green: "bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400",
      purple: "bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400",
      orange: "bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-400",
    }
    return colors[color as keyof typeof colors] || colors.blue
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <NewHeader />

      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">Support Center</h1>
            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
              Get the help you need to make the most of Zaza AI tools. We're here to support your educational journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {supportOptions.map((option, index) => (
              <a
                key={index}
                href={option.link}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-200 hover:-translate-y-1 group"
              >
                <div
                  className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${getColorClasses(option.color)}`}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {getIconSvg(option.icon)}
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                  {option.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{option.description}</p>
              </a>
            ))}
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-8 mb-16">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Quick Start Guide</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
                New to Zaza tools? Follow these steps to get started quickly and effectively.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 text-sm font-bold">
                  1
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Choose Your Tool</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Start with Zaza Teach or Zaza Promptly based on your needs.
                </p>
              </div>

              <div className="text-center">
                <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 text-sm font-bold">
                  2
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Watch Tutorials</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Learn the basics with our step-by-step video guides.
                </p>
              </div>

              <div className="text-center">
                <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 text-sm font-bold">
                  3
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Get Support</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Reach out if you need help or have questions.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-200 dark:border-gray-700 text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Still Need Help?</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              Our support team is ready to help you succeed with Zaza tools. Don't hesitate to reach out with any
              questions.
            </p>
            <div className="space-x-4">
              <a
                href="/contact"
                className="inline-flex items-center px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors duration-200"
              >
                Contact Support
              </a>
              <a
                href="/faq"
                className="inline-flex items-center px-6 py-3 border border-purple-600 text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20 font-medium rounded-lg transition-colors duration-200"
              >
                Browse FAQ
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
