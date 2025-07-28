import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Quote } from "lucide-react"

export const metadata: Metadata = {
  title: "Zaza Quote Wall - Zaza Technologies",
  description: "Inspiring quotes and testimonials from educators using Zaza tools.",
}

export default function QuoteWallPage() {
  const quotes = [
    {
      text: "Zaza Promptly has transformed how I communicate with parents. What used to take me hours now takes minutes, and the tone is always professional.",
      author: "Sarah M.",
      role: "5th Grade Teacher",
      location: "California, USA",
    },
    {
      text: "Finally, an AI tool that understands education! The lesson plans from Zaza Teach are actually usable and aligned with my curriculum.",
      author: "James K.",
      role: "High School Science Teacher",
      location: "Ontario, Canada",
    },
    {
      text: "I was skeptical about AI in education, but Zaza tools feel different. They enhance my teaching rather than replace it.",
      author: "Maria L.",
      role: "Elementary Principal",
      location: "Madrid, Spain",
    },
    {
      text: "The time I save with Zaza tools goes back to my students. That's what matters most.",
      author: "David R.",
      role: "Middle School Math Teacher",
      location: "London, UK",
    },
    {
      text: "Zaza understands that teaching is about relationships, not just content delivery. These tools support that philosophy.",
      author: "Jennifer W.",
      role: "Special Education Teacher",
      location: "Sydney, Australia",
    },
    {
      text: "I love that Zaza tools are built by educators. You can tell the difference in every feature.",
      author: "Michael T.",
      role: "High School English Teacher",
      location: "Berlin, Germany",
    },
  ]

  return (
    <>
      <Header />
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent text-center">
              Zaza Quote Wall
            </h1>
            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-12 text-center">
              Hear from educators around the world who are using Zaza tools to enhance their teaching.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {quotes.map((quote, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-lg transition-shadow"
                >
                  <Quote className="h-8 w-8 text-purple-500 mb-4" />
                  <blockquote className="text-gray-600 dark:text-gray-400 mb-4 italic">"{quote.text}"</blockquote>
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                    <p className="font-semibold text-gray-800 dark:text-gray-200">{quote.author}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{quote.role}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{quote.location}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 rounded-lg p-8 text-center">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Share Your Experience</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Using Zaza tools in your classroom? We'd love to hear about your experience and share it with other
                educators.
              </p>
              <a
                href="/contact"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg hover:opacity-90 transition-opacity font-medium"
              >
                Share Your Story
              </a>
            </div>
          </div>
        </div>
      </div>
      <Footer currentPage="quote-wall" />
    </>
  )
}
