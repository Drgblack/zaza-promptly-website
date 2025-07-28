import type { Metadata } from "next"
import { NewHeader } from "@/components/new-header"
import { BlogHero } from "@/components/blog-hero"
import { TeacherTipsContent } from "@/components/teacher-tips-content"
import { EmailCTA } from "@/components/email-cta"
import { AuthorBox } from "@/components/author-box"
import { SuggestedPosts } from "@/components/suggested-posts"
import { Footer } from "@/components/footer"

const blogPost = {
  title: "5 Time-Saving AI Tips Every Teacher Should Know",
  category: "Time-Saving Tips",
  author: {
    name: "Greg Blackburn",
    bio: "Chief Learning Officer at Communardo and founder of Zaza, an AI-powered platform designed to help educators do more with less. Passionate about creating tech that respects teacher time and elevates the craft of teaching.",
    avatar: "/images/greg-headshot.jpg",
  },
  publishedAt: "June 11, 2025",
  readTime: "6 min read",
  featuredImage: "/placeholder.svg?height=400&width=800",
  excerpt:
    "Teachers are some of the busiest professionals in the world. From planning lessons to marking work, handling admin, and responding to parents — it's no wonder burnout is on the rise. But with the right AI tools, you can reclaim hours each week.",
}

export const metadata: Metadata = {
  title: `${blogPost.title} | Zaza Blog`,
  description: blogPost.excerpt,
  openGraph: {
    title: blogPost.title,
    description: blogPost.excerpt,
    images: [blogPost.featuredImage],
  },
}

export default function TeacherTipsPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <NewHeader />
      <BlogHero post={blogPost} />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <TeacherTipsContent />
        <EmailCTA />
        <AuthorBox author={blogPost.author} />
      </main>
      <SuggestedPosts currentPostSlug="ai-tips-for-teachers" />
      <Footer />
    </div>
  )
}
