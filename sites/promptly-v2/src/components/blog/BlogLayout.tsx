import { ReactNode } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { founder, calculateReadingTime, extractExcerpt } from '@/config/founder'
import { SaveTimeCTA, GetStartedCTA } from './InlineCTA'
import RelatedPosts from './RelatedPosts'
import { marked } from 'marked'

interface BlogLayoutProps {
  title: string
  description?: string
  content: string
  publishDate: string
  slug: string
  author?: string
  tags?: string[]
  children?: ReactNode
}

// Auto-insert CTAs into content at strategic positions
function processContentWithCTAs(content: string): ReactNode[] {
  const htmlContent = marked.parse(content) as string
  const paragraphs = htmlContent.split('</p>')
  const elements: ReactNode[] = []
  
  paragraphs.forEach((paragraph, index) => {
    if (paragraph.trim()) {
      // Add back the closing p tag
      const pContent = paragraph.includes('<p>') ? paragraph + '</p>' : '<p>' + paragraph + '</p>'
      
      elements.push(
        <div 
          key={`content-${index}`}
          dangerouslySetInnerHTML={{ __html: pContent }} 
        />
      )
      
      // Insert CTA after ~30% of content
      if (index === Math.floor(paragraphs.length * 0.3)) {
        elements.push(
          <SaveTimeCTA key="mid-cta" className="my-12" />
        )
      }
    }
  })
  
  return elements
}

// Author Card Component (embedded in layout)
function AuthorCard({ variant = 'header' }: { variant?: 'header' | 'footer' }) {
  const cardClass = variant === 'footer' 
    ? 'bg-slate-800/40 border border-white/10 rounded-2xl p-6' 
    : ''

  return (
    <div className={cardClass}>
      <div className="flex flex-col sm:flex-row items-start gap-4">
        {/* Founder Photo */}
        <div className="flex-shrink-0">
          <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-white/20">
            <Image
              src={founder.photo}
              alt={`${founder.name} photo`}
              width={64}
              height={64}
              className="object-cover"
              priority={variant === 'header'}
            />
          </div>
        </div>

        {/* Author Info */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col gap-2">
            {/* Name & Title */}
            <div className="flex items-center gap-3">
              <h3 className="font-semibold text-white text-lg">
                <Link
                  href={founder.profileUrl}
                  className="hover:text-brand-400 transition-colors"
                >
                  {founder.name}
                </Link>
              </h3>
              
              {/* Social Links */}
              <div className="flex items-center gap-2">
                {founder.social.email && (
                  <Link
                    href={`mailto:${founder.social.email}`}
                    className="text-slate-400 hover:text-brand-400 transition-colors"
                    aria-label={`Email ${founder.name}`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </Link>
                )}
                {founder.social.linkedin && (
                  <Link
                    href={founder.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 hover:text-brand-400 transition-colors"
                    aria-label={`${founder.name} on LinkedIn`}
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </Link>
                )}
              </div>
            </div>
            
            <p className="text-slate-400 text-sm font-medium">
              {founder.title}
            </p>

            {/* Bio */}
            <div className="mt-2">
              <p className="text-slate-300 text-sm leading-relaxed">
                {variant === 'header' ? founder.shortBio : founder.bio}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Final CTA Component (embedded in layout)
function FinalCTA() {
  return (
    <section className="bg-gradient-to-br from-slate-800 to-slate-900 py-16">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <div className="bg-slate-800/40 border border-white/10 rounded-2xl p-8">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              {/* Founder Photo */}
              <div className="flex-shrink-0">
                <div className="relative w-24 h-24 rounded-full overflow-hidden border-3 border-brand-500/30">
                  <Image
                    src={founder.photo}
                    alt={founder.name}
                    width={96}
                    height={96}
                    className="object-cover"
                  />
                </div>
              </div>
              
              {/* Content */}
              <div className="flex-1 text-center lg:text-left">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  Ready to Reclaim Your Evenings?
                </h2>
                <p className="text-lg text-slate-300 mb-6 leading-relaxed">
                  "I built Promptly because I understand how overwhelming teaching can feel. You shouldn't have to choose between great feedback and personal time."
                </p>
                <p className="text-sm text-slate-400 mb-6">
                  <strong className="text-white">{founder.name}</strong> • {founder.title}
                </p>
                
                <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                  <Link 
                    href="/waitlist"
                    className="inline-flex items-center px-8 py-4 bg-brand-600 hover:bg-brand-700 text-white font-semibold rounded-lg transition-colors shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 focus:ring-offset-slate-900"
                  >
                    Start Saving Time Today
                    <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                  <Link 
                    href="/about"
                    className="text-brand-400 hover:text-brand-300 font-medium transition-colors"
                  >
                    Learn more about our story →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function BlogLayout({
  title,
  description,
  content,
  publishDate,
  slug,
  author = founder.name,
  tags = [],
}: BlogLayoutProps) {
  const readingTime = calculateReadingTime(content)
  const excerpt = description || extractExcerpt(content)
  const processedContent = processContentWithCTAs(content)

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header Section */}
      <section className="bg-gradient-to-br from-slate-800 to-slate-900 py-20">
        <div className="container">
          {/* Breadcrumb */}
          <nav className="mb-8 max-w-4xl mx-auto" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 text-sm text-slate-400">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </li>
              <li>
                <span className="text-white font-medium">
                  {title}
                </span>
              </li>
            </ol>
          </nav>

          <div className="max-w-4xl mx-auto text-center">
            {/* Tags */}
            {tags.length > 0 && (
              <div className="flex flex-wrap justify-center gap-2 mb-6">
                {tags.map((tag: string) => (
                  <Link
                    key={tag}
                    href={`/blog/tag/${encodeURIComponent(tag.toLowerCase())}`}
                    className="px-3 py-1 bg-brand-600/20 text-brand-400 hover:bg-brand-600/30 hover:text-brand-300 text-sm rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 focus:ring-offset-slate-900"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            )}
            
            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-white mb-6">
              {title}
            </h1>
            
            {/* Description */}
            {excerpt && (
              <p className="text-xl text-slate-300 mb-8 leading-relaxed">
                {excerpt}
              </p>
            )}
            
            {/* Reading Time */}
            <div className="flex justify-center mb-8">
              <span className="bg-brand-600/20 text-brand-400 px-4 py-2 rounded-full text-sm font-medium">
                📚 {readingTime} min read
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Author Card - Top */}
      <section className="section-sm bg-slate-800/30">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <AuthorCard variant="header" />
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="section">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <article className="blog-content">
              {processedContent}
            </article>
            
            {/* End-of-article CTA */}
            <GetStartedCTA className="my-12" />
          </div>
        </div>
      </section>
      
      {/* Author Card - Bottom */}
      <section className="section-sm border-t border-white/10">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <AuthorCard variant="footer" />
          </div>
        </div>
      </section>

      {/* Related Posts */}
      <section className="border-t border-white/10 py-16">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <RelatedPosts currentSlug={slug} />
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <FinalCTA />
    </div>
  )
}