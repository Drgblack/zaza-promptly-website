import Image from 'next/image'
import Link from 'next/link'
import { getAuthorMeta } from '@/lib/blog'
import { AuthorAvatar, getAuthorPersonJsonLd } from '@zaza/shared-brand'

interface AuthorBylineProps {
  authorName: string
  publishDate: string
  readTime?: string
  showBio?: boolean
  className?: string
}

export default function AuthorByline({ 
  authorName, 
  publishDate, 
  readTime, 
  showBio = false,
  className = '' 
}: AuthorBylineProps) {
  const authorMeta = getAuthorMeta(authorName)
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  // Generate structured data for the author
  const authorStructuredData = getAuthorPersonJsonLd({
    urlBase: 'https://www.zazapromptly.com',
    name: authorName,
    sameAs: authorMeta?.social.linkedin ? [authorMeta.social.linkedin] : []
  })

  return (
    <>
      {authorStructuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(authorStructuredData) }}
        />
      )}
      
      <div className={`flex items-start gap-4 ${className}`}>
        {/* Author Avatar */}
        <div className="flex-shrink-0">
          <AuthorAvatar 
            name={authorName}
            size={56}
            className="border-2 border-white/10"
          />
        </div>

        {/* Author Info */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-white">
                {authorMeta?.social.linkedin ? (
                  <Link
                    href={authorMeta.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-brand-400 transition-colors"
                  >
                    {authorName}
                  </Link>
                ) : (
                  authorName
                )}
              </span>
              {authorMeta?.social.email && (
                <Link
                  href={`mailto:${authorMeta.social.email}`}
                  className="text-slate-400 hover:text-brand-400 transition-colors"
                  aria-label={`Email ${authorName}`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </Link>
              )}
            </div>
            
            <div className="flex items-center gap-3 text-sm text-slate-400">
              <time dateTime={publishDate}>
                {formatDate(publishDate)}
              </time>
              {readTime && (
                <>
                  <span>•</span>
                  <span>{readTime}</span>
                </>
              )}
            </div>
          </div>

          {/* Author Bio */}
          {showBio && authorMeta?.bio && (
            <p className="text-sm text-slate-300 leading-relaxed">
              {authorMeta.bio}
            </p>
          )}
        </div>
      </div>
    </>
  )
}
