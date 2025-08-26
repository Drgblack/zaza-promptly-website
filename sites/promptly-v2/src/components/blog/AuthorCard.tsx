import Image from 'next/image'
import Link from 'next/link'
import { getAuthorMeta } from '@/lib/blog'

interface AuthorCardProps {
  authorName: string
  publishDate?: string
  readTime?: string
  showFullBio?: boolean
  className?: string
  variant?: 'header' | 'footer'
}

export default function AuthorCard({ 
  authorName, 
  publishDate, 
  readTime, 
  showFullBio = true,
  className = '',
  variant = 'header'
}: AuthorCardProps) {
  const authorMeta = getAuthorMeta(authorName)
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  // Use founder image for Dr. Greg Blackburn or any variation
  const isFounder = authorName.toLowerCase().includes('greg') || authorName.toLowerCase().includes('blackburn')
  const authorImage = isFounder ? '/images/founder-gb-v1.jpg' : authorMeta?.image

  return (
    <div className={`${variant === 'footer' ? 'bg-slate-800/40 border border-white/10 rounded-2xl p-6' : ''} ${className}`}>
      <div className="flex flex-col sm:flex-row items-start gap-4">
        {/* Author Photo */}
        <div className="flex-shrink-0">
          {authorImage ? (
            <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-white/20">
              <Image
                src={authorImage}
                alt={`${authorName} photo`}
                width={64}
                height={64}
                className="object-cover"
                priority={variant === 'header'}
              />
            </div>
          ) : (
            <div className="w-16 h-16 rounded-full bg-brand-600 flex items-center justify-center border-2 border-white/20">
              <span className="text-white font-semibold text-lg">
                {authorName.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
          )}
        </div>

        {/* Author Info */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col gap-2">
            {/* Author Name & Links */}
            <div className="flex items-center gap-3">
              <h3 className="font-semibold text-white text-lg">
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
              </h3>
              
              {/* Social Links */}
              <div className="flex items-center gap-2">
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
                {authorMeta?.social.linkedin && (
                  <Link
                    href={authorMeta.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 hover:text-brand-400 transition-colors"
                    aria-label={`${authorName} on LinkedIn`}
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </Link>
                )}
              </div>
            </div>
            
            {/* Meta Information */}
            {(publishDate || readTime) && (
              <div className="flex items-center gap-3 text-sm text-slate-400">
                {publishDate && (
                  <time dateTime={publishDate}>
                    {formatDate(publishDate)}
                  </time>
                )}
                {publishDate && readTime && <span>•</span>}
                {readTime && <span>{readTime}</span>}
              </div>
            )}

            {/* Author Bio */}
            {showFullBio && (
              <div className="mt-3">
                {isFounder ? (
                  <p className="text-slate-300 text-sm leading-relaxed">
                    Dr. Greg Blackburn is the founder of Zaza Technologies and creator of Promptly. With over 20 years of experience building educational tools and a PhD in Professional Education, he understands the daily challenges teachers face and is passionate about creating AI solutions that truly serve educators.
                  </p>
                ) : authorMeta?.bio ? (
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {authorMeta.bio}
                  </p>
                ) : (
                  <p className="text-slate-300 text-sm leading-relaxed">
                    Part of the Promptly team, dedicated to creating AI tools that help teachers save time while maintaining the personal touch that makes great education possible.
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}