import Link from 'next/link'
import { PostMeta, slugifyAuthor } from '@/lib/blog-types'

interface BlogCardProps {
  post: PostMeta
  showTags?: boolean
  showAuthor?: boolean
  showDate?: boolean
  showReadTime?: boolean
}

export default function BlogCard({
  post,
  showTags = true,
  showAuthor = true,
  showDate = true,
  showReadTime = true
}: BlogCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <article className="rounded-2xl shadow-card border border-white/5 bg-slate-800/60 hover:bg-slate-800/80 hover:shadow-lg hover:-translate-y-0.5 hover:scale-[1.01] transition-all duration-[120ms] ease-out p-6 h-full flex flex-col">
      {/* Tags */}
      {showTags && post.tags && post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.slice(0, 3).map((tag) => (
            <Link
              key={tag}
              href={`/blog/tag/${encodeURIComponent(tag.toLowerCase())}`}
              className="rounded-full border border-white/10 bg-slate-800/60 px-3 py-1 text-sm text-slate-300 hover:text-white hover:bg-slate-700/60 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-900"
            >
              {tag}
            </Link>
          ))}
          {post.tags.length > 3 && (
            <span className="rounded-full border border-white/10 bg-slate-800/60 px-3 py-1 text-sm text-slate-400">
              +{post.tags.length - 3} more
            </span>
          )}
        </div>
      )}

      {/* Title */}
      <Link href={`/blog/${post.slug}`} className="group flex-1">
        <h2 className="text-lg font-semibold text-white mb-3 group-hover:text-brand-400 transition-colors line-clamp-2">
          {post.title}
        </h2>
      </Link>

      {/* Description */}
      <p className="text-slate-300 mb-4 line-clamp-3 flex-1">
        {post.description}
      </p>

      {/* Meta information */}
      <div className="flex items-center justify-between text-sm text-slate-400">
        <div className="flex items-center space-x-3">
          {showDate && (
            <span>{formatDate(post.date)}</span>
          )}
          {showReadTime && post.readTime && (
            <span>• {post.readTime}</span>
          )}
        </div>
        {showAuthor && post.author && (
          <Link
            href={`/blog/author/${slugifyAuthor(post.author)}`}
            className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-900 rounded px-1"
          >
            by {post.author}
          </Link>
        )}
      </div>
    </article>
  )
}