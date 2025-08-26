import Link from 'next/link'
import { getRelatedPosts } from '@/lib/blog'

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
      <div className="text-center mb-12">
        <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">
          Continue Your Learning Journey
        </h2>
        <p className="text-slate-400 text-lg">
          More teacher-friendly insights to help you save time and reduce stress
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {relatedPosts.map((post) => (
          <article
            key={post.slug}
            className="group rounded-2xl shadow-lg border border-white/10 bg-slate-800/40 hover:bg-slate-800/60 hover:border-brand-500/30 transition-all duration-300 overflow-hidden"
          >
            {/* Card Image Placeholder */}
            <div className="h-48 bg-gradient-to-br from-brand-600/20 to-slate-700/40 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                {post.category && (
                  <span className="inline-block px-3 py-1 bg-brand-600 text-white text-xs rounded-full font-medium mb-2">
                    {post.category}
                  </span>
                )}
              </div>
            </div>
            
            <div className="p-6">
              {/* Title */}
              <h3 className="text-lg font-semibold text-white mb-3 leading-tight group-hover:text-brand-400 transition-colors">
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
              <div className="flex items-center justify-between text-xs text-slate-400 mb-4">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{post.author}</span>
                  <span>•</span>
                  <time dateTime={post.date}>
                    {formatDate(post.date)}
                  </time>
                </div>
                {post.readTime && (
                  <span className="bg-slate-700/50 px-2 py-1 rounded text-xs">
                    {post.readTime}
                  </span>
                )}
              </div>

              {/* Read more button */}
              <Link
                href={`/blog/${post.slug}`}
                className="inline-flex items-center w-full justify-center px-4 py-2 bg-brand-600/20 hover:bg-brand-600/30 text-brand-400 hover:text-brand-300 text-sm font-medium rounded-lg transition-all duration-200 group-hover:bg-brand-600 group-hover:text-white"
              >
                Read Article
                <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
