import Image from "next/image"

interface BlogPost {
  title: string
  category: string
  author: {
    name: string
    bio: string
    avatar: string
  }
  publishedAt: string
  readTime: string
  featuredImage: string
  excerpt: string
}

interface BlogHeroProps {
  post: BlogPost
}

export function BlogHero({ post }: BlogHeroProps) {
  return (
    <section className="pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Category Badge */}
        <div className="mb-6">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
            {post.category}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">{post.title}</h1>

        {/* Author and Date */}
        <div className="flex items-center space-x-4 mb-8 text-gray-600">
          <div className="flex items-center space-x-2">
            <Image
              src={post.author.avatar || "/placeholder.svg"}
              alt={post.author.name}
              width={32}
              height={32}
              className="rounded-full"
            />
            <span className="font-medium">{post.author.name}</span>
          </div>
          <span>•</span>
          <time className="italic">{post.publishedAt}</time>
          <span>•</span>
          <span>{post.readTime}</span>
        </div>

        {/* Featured Image */}
        <div className="relative aspect-video rounded-lg overflow-hidden mb-8">
          <Image
            src={post.featuredImage || "/placeholder.svg"}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Excerpt */}
        <p className="text-xl text-gray-700 leading-relaxed max-w-3xl">{post.excerpt}</p>
      </div>
    </section>
  )
}
