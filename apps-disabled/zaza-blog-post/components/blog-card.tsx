import Image from "next/image"
import Link from "next/link"

interface BlogPost {
  id: number
  title: string
  category: string
  author: string
  publishedAt: string
  readTime: string
  excerpt: string
  featuredImage: string
  slug: string
}

interface BlogCardProps {
  post: BlogPost
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-100"
    >
      <div className="relative aspect-video">
        <Image
          src={post.featuredImage || "/placeholder.svg"}
          alt={post.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <span className="inline-block px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
            {post.category}
          </span>
          <span className="text-xs text-gray-500">{post.readTime}</span>
        </div>

        <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-3 line-clamp-2">
          {post.title}
        </h3>

        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{post.excerpt}</p>

        <div className="flex items-center text-sm text-gray-500">
          <span className="font-medium">{post.author}</span>
          <span className="mx-2">•</span>
          <time>{post.publishedAt}</time>
        </div>
      </div>
    </Link>
  )
}
