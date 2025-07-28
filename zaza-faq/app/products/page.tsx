import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { MessageSquare, BookOpen, GraduationCap, ImageIcon, Users, Presentation, Zap, Briefcase } from "lucide-react"

export const metadata: Metadata = {
  title: "Zaza Product List - Zaza Technologies",
  description: "Complete list of AI-powered tools in the Zaza ecosystem for educators.",
}

export default function ProductsPage() {
  const products = [
    {
      name: "Zaza Promptly",
      description: "AI-powered communication tool for parent-teacher interactions",
      icon: MessageSquare,
      status: "live",
      href: "/promptly",
    },
    {
      name: "Zaza Teach",
      description: "Lesson planning and curriculum development assistant",
      icon: BookOpen,
      status: "live",
      href: "/teach",
    },
    {
      name: "Zaza Study",
      description: "Personalized learning companion for students",
      icon: GraduationCap,
      status: "coming-soon",
      href: "#",
    },
    {
      name: "Zaza Visuals",
      description: "AI-generated educational visuals and graphics",
      icon: ImageIcon,
      status: "coming-soon",
      href: "#",
    },
    {
      name: "Zaza Coach",
      description: "Professional development and feedback tool for educators",
      icon: Users,
      status: "coming-soon",
      href: "#",
    },
    {
      name: "Zaza ClarityDeck",
      description: "Presentation and slide creation tool",
      icon: Presentation,
      status: "coming-soon",
      href: "#",
    },
    {
      name: "Zaza Schwoop",
      description: "Classroom management and engagement platform",
      icon: Zap,
      status: "coming-soon",
      href: "#",
    },
    {
      name: "Zaza HR Spark",
      description: "Human resources and staff development tool",
      icon: Briefcase,
      status: "coming-soon",
      href: "#",
    },
  ]

  return (
    <>
      <Header />
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent text-center">
              Zaza Product Suite
            </h1>
            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-12 text-center">
              AI-powered tools for educators, learners, and builders who want more than just productivity—who want joy.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {products.map((product, index) => {
                const Icon = product.icon
                return (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-lg transition-all duration-200 hover:scale-105"
                  >
                    <div className="flex items-center mb-4">
                      <Icon className="h-8 w-8 text-purple-500 mr-3" />
                      <div className="flex items-center space-x-2">
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">{product.name}</h3>
                        {product.status === "live" ? (
                          <span className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 text-xs px-2 py-1 rounded-full">
                            Live
                          </span>
                        ) : (
                          <span className="bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 text-xs px-2 py-1 rounded-full">
                            Coming Soon
                          </span>
                        )}
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">{product.description}</p>
                    {product.status === "live" ? (
                      <a
                        href={product.href}
                        className="inline-flex items-center text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium"
                      >
                        Try Now →
                      </a>
                    ) : (
                      <span className="text-gray-400 dark:text-gray-500 font-medium">Coming Soon</span>
                    )}
                  </div>
                )
              })}
            </div>

            <div className="bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 rounded-lg p-8 text-center">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Ready to Get Started?</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Join thousands of educators who are already using Zaza tools to enhance their teaching.
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
      <Footer currentPage="products" />
    </>
  )
}
