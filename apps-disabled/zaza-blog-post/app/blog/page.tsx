import type { Metadata } from "next"
import { NewHeader } from "@/components/new-header"
import { Footer } from "@/components/footer"
import { BlogCard } from "@/components/blog-card"
import { ZazaLogo } from "@/components/zaza-logo"

export const metadata: Metadata = {
  title: "Blog | Zaza - AI-Powered Productivity Insights",
  description:
    "Discover the latest AI tools, productivity hacks, and workflow optimization strategies for educators and professionals.",
}

const blogPosts = [
  {
    id: 1,
    title: "5 Time-Saving AI Tips Every Teacher Should Know",
    category: "Time-Saving Tips",
    author: "Greg Blackburn",
    publishedAt: "June 11, 2025",
    readTime: "6 min read",
    excerpt:
      "Teachers are some of the busiest professionals in the world. Discover 5 practical AI tips to reclaim hours each week and bring back the joy of teaching.",
    featuredImage: "/placeholder.svg?height=300&width=500",
    slug: "ai-tips-for-teachers",
  },
  {
    id: 2,
    title: "10 AI-Powered Productivity Hacks That Will Transform Your Workflow",
    category: "Time-Saving Tips",
    author: "Sarah Chen",
    publishedAt: "March 15, 2024",
    readTime: "8 min read",
    excerpt:
      "Discover how artificial intelligence can revolutionize your daily workflow with these proven productivity strategies that top performers use to stay ahead.",
    featuredImage: "/placeholder.svg?height=300&width=500",
    slug: "ai-productivity-hacks",
  },
  {
    id: 3,
    title: "The Future of Remote Work: AI Tools Every Team Needs",
    category: "Remote Work",
    author: "Michael Torres",
    publishedAt: "May 22, 2024",
    readTime: "7 min read",
    excerpt:
      "Remote work is here to stay. Learn about the essential AI tools that are helping distributed teams collaborate more effectively and maintain productivity.",
    featuredImage: "/placeholder.svg?height=300&width=500",
    slug: "future-remote-work-ai-tools",
  },
]

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <NewHeader />

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-b from-blue-50 to-white dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-6">
            <ZazaLogo size="lg" showText={false} href="/" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">The Zaza Blog</h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            AI-powered insights, productivity tips, and workflow strategies to help you work smarter, not harder.
          </p>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
