import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Download, BookOpen, Video, FileText } from "lucide-react"

export const metadata: Metadata = {
  title: "Free Resources - Zaza Technologies",
  description: "Free educational resources, templates, and guides for educators.",
}

export default function ResourcesPage() {
  const resources = [
    {
      title: "AI Prompt Templates",
      description: "Ready-to-use prompt templates for educational tasks",
      icon: FileText,
      type: "Templates",
    },
    {
      title: "Educator's Guide to AI",
      description: "Comprehensive guide for integrating AI in the classroom",
      icon: BookOpen,
      type: "Guide",
    },
    {
      title: "Video Tutorials",
      description: "Step-by-step tutorials for using Zaza tools",
      icon: Video,
      type: "Videos",
    },
  ]

  return (
    <>
      <Header />
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
              Free Resources
            </h1>
            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-12">
              Educational resources, templates, and guides to help you get the most out of AI in education.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {resources.map((resource, index) => {
                const Icon = resource.icon
                return (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-center mb-4">
                      <Icon className="h-8 w-8 text-purple-500 mr-3" />
                      <span className="bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 text-xs px-2 py-1 rounded-full">
                        {resource.type}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">{resource.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">{resource.description}</p>
                    <button className="flex items-center text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium">
                      <Download className="h-4 w-4 mr-2" />
                      Coming Soon
                    </button>
                  </div>
                )
              })}
            </div>

            <div className="bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 rounded-lg p-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Stay Updated</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                We're constantly creating new resources for educators. Join our mailing list to be notified when new
                materials are available.
              </p>
              <button className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-lg hover:opacity-90 transition-opacity font-medium">
                Subscribe for Updates
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer currentPage="resources" />
    </>
  )
}
