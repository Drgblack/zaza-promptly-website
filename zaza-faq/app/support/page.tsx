import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { MessageCircle, Mail, Book, Video, Clock, Users } from "lucide-react"

export const metadata: Metadata = {
  title: "Support - Zaza Technologies",
  description: "Get help with Zaza tools, find resources, and connect with our support team.",
}

export default function SupportPage() {
  const supportOptions = [
    {
      title: "Live Chat",
      description: "Get instant help from our support team",
      icon: MessageCircle,
      availability: "Mon-Fri, 9AM-5PM EST",
      action: "Start Chat",
      color: "text-green-500",
    },
    {
      title: "Email Support",
      description: "Send us a detailed message about your issue",
      icon: Mail,
      availability: "Response within 24 hours",
      action: "Send Email",
      color: "text-blue-500",
    },
    {
      title: "Help Center",
      description: "Browse articles and tutorials",
      icon: Book,
      availability: "Available 24/7",
      action: "Browse Articles",
      color: "text-purple-500",
    },
    {
      title: "Video Tutorials",
      description: "Watch step-by-step guides",
      icon: Video,
      availability: "Available 24/7",
      action: "Watch Videos",
      color: "text-pink-500",
    },
  ]

  const commonIssues = [
    "How do I reset my password?",
    "Why isn't my lesson plan generating?",
    "How do I change my subscription plan?",
    "Can I export my data?",
    "How do I delete my account?",
    "Why are my prompts not working?",
  ]

  return (
    <>
      <Header />
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent text-center">
              Support Center
            </h1>
            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-12 text-center">
              We're here to help you get the most out of your Zaza tools.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {supportOptions.map((option, index) => {
                const Icon = option.icon
                return (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-lg transition-shadow text-center"
                  >
                    <Icon className={`h-12 w-12 ${option.color} mx-auto mb-4`} />
                    <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">{option.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-3 text-sm">{option.description}</p>
                    <div className="flex items-center justify-center mb-4">
                      <Clock className="h-4 w-4 text-gray-400 mr-1" />
                      <span className="text-xs text-gray-500 dark:text-gray-400">{option.availability}</span>
                    </div>
                    <button className="w-full px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg hover:opacity-90 transition-opacity font-medium text-sm">
                      {option.action}
                    </button>
                  </div>
                )
              })}
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8">
                <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-200">Common Questions</h2>
                <ul className="space-y-3">
                  {commonIssues.map((issue, index) => (
                    <li key={index}>
                      <button className="text-left w-full text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                        {issue}
                      </button>
                    </li>
                  ))}
                </ul>
                <button className="mt-6 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium">
                  View All FAQs →
                </button>
              </div>

              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8">
                <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-200">Contact Information</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">General Support</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">support@zazatechnologies.com</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Technical Issues</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">tech@zazatechnologies.com</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Billing Questions</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">billing@zazatechnologies.com</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Partnership Inquiries</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">partnerships@zazatechnologies.com</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 rounded-lg p-8 text-center">
              <Users className="h-12 w-12 text-purple-500 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Community Support</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Connect with other educators using Zaza tools. Share tips, ask questions, and learn from the community.
              </p>
              <button className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg hover:opacity-90 transition-opacity font-medium">
                Join Community
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer currentPage="support" />
    </>
  )
}
