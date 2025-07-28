import type { Metadata } from "next"
import { NewHeader } from "@/components/new-header"
import { BlogHero } from "@/components/blog-hero"
import { BlogContent } from "@/components/blog-content"
import { EmailCTA } from "@/components/email-cta"
import { AuthorBox } from "@/components/author-box"
import { SuggestedPosts } from "@/components/suggested-posts"
import { Footer } from "@/components/footer"

const blogPost = {
  title: "10 AI-Powered Productivity Hacks That Will Transform Your Workflow",
  category: "Time-Saving Tips",
  author: {
    name: "Dr. Greg Blackburn",
    bio: "Chief Learning Officer at Communardo and founder of Zaza, an AI-powered platform designed to help educators do more with less. Passionate about creating tech that respects teacher time and elevates the craft of teaching.",
    avatar: "/images/greg-headshot.jpg",
  },
  publishedAt: "March 15, 2024",
  readTime: "8 min read",
  featuredImage: "/placeholder.svg?height=400&width=800",
  excerpt:
    "Discover how artificial intelligence can revolutionize your daily workflow with these proven productivity strategies that top performers use to stay ahead.",
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

export default function ProductivityHacksPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <NewHeader />
      <BlogHero post={blogPost} />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <BlogContent />
        <EmailCTA />
        <AuthorBox author={blogPost.author} />
      </main>
      <SuggestedPosts currentPostSlug="ai-productivity-hacks" />
      <Footer />
    </div>
  )
}
