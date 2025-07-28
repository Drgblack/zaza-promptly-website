import type { Metadata } from "next"
import { NewHeader } from "@/components/new-header"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Zaza Quote Wall | Zaza Technologies",
  description: "Inspiring quotes about education, AI, and the future of learning from the Zaza community.",
}

export default function QuotesPage() {
  const quotes = [
    {
      text: "The goal isn't to replace the human touch in education, but to give teachers more time to focus on what they do best—inspiring and connecting with students.",
      author: "Dr. Greg Blackburn",
      role: "Founder, Zaza Technologies",
    },
    {
      text: "AI doesn't replace creativity—it amplifies it. The best results come from combining human insight with machine efficiency.",
      author: "Dr. Emily Rodriguez",
      role: "AI Research Director",
    },
    {
      text: "Technology should serve pedagogy, not the other way around. Every tool we build must respect the art and science of teaching.",
      author: "Sarah Chen",
      role: "Educational Technology Specialist",
    },
    {
      text: "The future of education isn't about choosing between human and artificial intelligence—it's about creating harmony between them.",
      author: "Michael Torres",
      role: "Remote Work Strategist",
    },
    {
      text: "When we build AI tools for educators, we're not just creating software—we're crafting instruments that can transform lives.",
      author: "Dr. Greg Blackburn",
      role: "Founder, Zaza Technologies",
    },
    {
      text: "The most powerful AI is the one that makes you forget it's there, seamlessly enhancing your natural abilities.",
      author: "Lisa Park",
      role: "UX Design Lead",
    },
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <NewHeader />

      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">Zaza Quote Wall</h1>
            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
              Inspiring thoughts about education, AI, and the future of learning from our community of educators and
              innovators.
            </p>
          </div>

          <div className="space-y-8 mb-16">
            {quotes.map((quote, index) => (
              <div
                key={index}
                className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-8 border border-purple-100 dark:border-purple-800"
              >
                <blockquote className="text-center">
                  <p className="text-lg md:text-xl italic text-gray-800 dark:text-gray-200 mb-6 leading-relaxed">
                    "{quote.text}"
                  </p>
                  <footer>
                    <cite className="not-italic">
                      <div className="font-semibold text-gray-900 dark:text-white">{quote.author}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">{quote.role}</div>
                    </cite>
                  </footer>
                </blockquote>
              </div>
            ))}
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Share Your Thoughts</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              Have an inspiring quote about education or AI? We'd love to feature your thoughts on our quote wall.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors duration-200"
            >
              Submit a Quote
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
