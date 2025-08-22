import Link from 'next/link'
import { getRelatedPosts, type PostMeta } from '@/lib/blog'

interface RelatedPostsProps {
  currentSlug: string
  className?: string
}

export default async function RelatedPosts({ currentSlug, className = '' }: RelatedPostsProps) {
  const relatedPosts = await getRelatedPosts(currentSlug, 3)

  if (relatedPosts.length === 0) {
    return null
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <section className={`${className}`}>
      <h2 className="text-2xl font-semibold text-white mb-8">Related Articles</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {relatedPosts.map((post) => (
          <article
            key={post.slug}
            className="group rounded-2xl shadow-card border border-white/10 bg-slate-900/60 hover:bg-slate-900/80 transition-all duration-200"
          >
            <div className="p-6">
              {/* Category/Tags */}
              <div className="flex items-center gap-2 mb-3">
                {post.category && (
                  <span className="px-2 py-1 bg-brand-600/20 text-brand-400 text-xs rounded-full font-medium">
                    {post.category}
                  </span>
                )}
                {post.tags && post.tags.length > 0 && (
                  <span className="px-2 py-1 bg-slate-700/50 text-slate-400 text-xs rounded-full">
                    {post.tags[0]}
                  </span>
                )}
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold text-white mb-3 leading-tight">
                <Link 
                  href={`/blog/${post.slug}`}
                  className="hover:text-brand-400 transition-colors"
                >
                  {post.title}
                </Link>
              </h3>

              {/* Description */}
              <p className="text-slate-300 text-sm mb-4 line-clamp-3 leading-relaxed">
                {post.description}
              </p>

              {/* Meta */}
              <div className="flex items-center justify-between text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <span>{post.author}</span>
                  <span>•</span>
                  <time dateTime={post.date}>
                    {formatDate(post.date)}
                  </time>
                </div>
                {post.readTime && (
                  <span>{post.readTime}</span>
                )}
              </div>
            </div>

            {/* Read more hover effect */}
            <div className="px-6 pb-6">
              <Link
                href={`/blog/${post.slug}`}
                className="inline-flex items-center text-brand-400 hover:text-brand-300 text-sm font-medium transition-colors group-hover:translate-x-1 transform duration-200"
              >
                Read more
                <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}