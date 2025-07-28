import type { Metadata } from "next"
import { NewHeader } from "@/components/new-header"
import { BlogHero } from "@/components/blog-hero"
import { RemoteWorkContent } from "@/components/remote-work-content"
import { EmailCTA } from "@/components/email-cta"
import { AuthorBox } from "@/components/author-box"
import { SuggestedPosts } from "@/components/suggested-posts"
import { Footer } from "@/components/footer"

const blogPost = {
  title: "The Future of Remote Work: AI Tools Every Team Needs",
  category: "Remote Work",
  author: {
    name: "Michael Torres",
    bio: "Remote work strategist and AI consultant. Helping distributed teams leverage technology to build stronger connections and achieve better outcomes.",
    avatar: "/placeholder.svg?height=80&width=80",
  },
  publishedAt: "May 22, 2024",
  readTime: "7 min read",
  featuredImage: "/placeholder.svg?height=400&width=800",
  excerpt:
    "Remote work is here to stay. Learn about the essential AI tools that are helping distributed teams collaborate more effectively and maintain productivity.",
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

export default function RemoteWorkPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <NewHeader />
      <BlogHero post={blogPost} />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <RemoteWorkContent />
        <EmailCTA />
        <AuthorBox author={blogPost.author} />
      </main>
      <SuggestedPosts currentPostSlug="future-remote-work-ai-tools" />
      <Footer />
    </div>
  )
}
