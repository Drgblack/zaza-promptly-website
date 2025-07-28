import Image from "next/image"
import Link from "next/link"

const allPosts = [
  {
    id: 1,
    title: "5 Time-Saving AI Tips Every Teacher Should Know",
    category: "Time-Saving Tips",
    image: "/placeholder.svg?height=200&width=300",
    slug: "ai-tips-for-teachers",
  },
  {
    id: 2,
    title: "10 AI-Powered Productivity Hacks That Will Transform Your Workflow",
    category: "Time-Saving Tips",
    image: "/placeholder.svg?height=200&width=300",
    slug: "ai-productivity-hacks",
  },
  {
    id: 3,
    title: "The Future of Remote Work: AI Tools Every Team Needs",
    category: "Remote Work",
    image: "/placeholder.svg?height=200&width=300",
    slug: "future-remote-work-ai-tools",
  },
  {
    id: 4,
    title: "5 ChatGPT Prompts That Will Change How You Write",
    category: "Writing Tips",
    image: "/placeholder.svg?height=200&width=300",
    slug: "chatgpt-prompts-writing",
  },
  {
    id: 5,
    title: "Building Your Personal AI Assistant: A Step-by-Step Guide",
    category: "Tutorials",
    image: "/placeholder.svg?height=200&width=300",
    slug: "personal-ai-assistant-guide",
  },
]

interface SuggestedPostsProps {
  currentPostSlug?: string
}

export function SuggestedPosts({ currentPostSlug }: SuggestedPostsProps) {
  // Filter out the current post and take first 3
  const suggestedPosts = allPosts.filter((post) => post.slug !== currentPostSlug).slice(0, 3)

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Continue Reading</h2>
          <Link href="/blog" className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
            ← Back to Blog
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {suggestedPosts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative aspect-video">
                <Image
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="p-6">
                <span className="inline-block px-3 py-1 text-xs font-medium bg-orange-100 text-orange-800 rounded-full mb-3">
                  {post.category}
                </span>

                <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                  {post.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
