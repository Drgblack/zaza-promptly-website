import Link from 'next/link'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPostsByTag, getAllTags, slugifyTag, unslugifyTag } from '@/lib/blog'
import BlogCard from '@/components/blog/BlogCard'

// Disable static generation - render pages dynamically to prevent build errors
export const dynamic = 'force-dynamic'
export const revalidate = 0

interface TagPageProps {
  params: {
    tag: string
  }
}

export async function generateStaticParams() {
  const tags = await getAllTags()
  
  return tags.map((tag) => ({
    tag: slugifyTag(tag),
  }))
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  // Handle both URL-encoded and slugified tag formats
  let tag = decodeURIComponent(params.tag)
  
  // If it's a slugified tag (contains hyphens), convert it back
  if (tag.includes('-') && !tag.includes(' ')) {
    tag = unslugifyTag(tag)
  }
  
  // Try to find posts with exact tag match first
  let posts = await getPostsByTag(tag)
  
  // If no posts found, try lowercase version
  if (posts.length === 0) {
    posts = await getPostsByTag(tag.toLowerCase())
  }
  
  // If still no posts found, try title case version
  if (posts.length === 0) {
    const titleCaseTag = tag.split(' ').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    ).join(' ')
    posts = await getPostsByTag(titleCaseTag)
  }
  
  if (posts.length === 0) {
    return {
      title: 'Tag Not Found | Promptly Blog'
    }
  }

  // Use the actual tag from the first post for display consistency
  const displayTag = posts[0].tags?.find(t => 
    t.toLowerCase() === tag.toLowerCase()
  ) || tag

  return {
    title: `${displayTag} Articles | Promptly Blog`,
    description: `Browse all articles tagged with "${displayTag}". Find insights, tips, and best practices for educators using AI-powered tools.`,
    openGraph: {
      title: `${displayTag} Articles | Promptly Blog`,
      description: `Browse all articles tagged with "${displayTag}". Find insights, tips, and best practices for educators using AI-powered tools.`,
      url: `/blog/tag/${params.tag}`,
    },
  }
}

export default async function TagPage({ params }: TagPageProps) {
  // Handle both URL-encoded and slugified tag formats
  let tag = decodeURIComponent(params.tag)
  
  // If it's a slugified tag (contains hyphens), convert it back
  if (tag.includes('-') && !tag.includes(' ')) {
    tag = unslugifyTag(tag)
  }
  
  // Try to find posts with exact tag match first
  let posts = await getPostsByTag(tag)
  
  // If no posts found, try lowercase version (common in many blog posts)
  if (posts.length === 0) {
    posts = await getPostsByTag(tag.toLowerCase())
  }
  
  // If still no posts found, try title case version
  if (posts.length === 0) {
    const titleCaseTag = tag.split(' ').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    ).join(' ')
    posts = await getPostsByTag(titleCaseTag)
  }
  
  if (posts.length === 0) {
    notFound()
  }
  
  // Use the actual tag from the first post for display consistency
  const displayTag = posts[0].tags?.find(t => 
    t.toLowerCase() === tag.toLowerCase()
  ) || tag

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-800 to-slate-900 py-20">
        <div className="container">
          {/* Breadcrumb */}
          <nav className="mb-8" aria-label="Breadcrumb">
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
                  {displayTag}
                </span>
              </li>
            </ol>
          </nav>

          <div className="text-center">
            <div className="inline-flex items-center rounded-full border border-white/10 bg-slate-800/60 px-4 py-2 text-slate-300 mb-6">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
              Tag
            </div>
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-white mb-6">
              Posts tagged &ldquo;{displayTag}&rdquo;
            </h1>
            <p className="text-xl text-slate-300 mb-4 max-w-2xl mx-auto">
              {posts.length} article{posts.length === 1 ? '' : 's'} about {displayTag.toLowerCase()}
            </p>
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="section">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {posts.map((post) => (
              <BlogCard 
                key={post.slug} 
                post={post}
                showTags={true}
              />
            ))}
          </div>

          {/* Back to all posts */}
          <div className="text-center">
            <Link
              href="/blog"
              className="inline-flex items-center px-6 py-3 border border-slate-600 text-slate-300 hover:text-white hover:border-slate-500 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-900"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              View All Posts
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-slate-800/50 py-16">
        <div className="container text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Transform Your Teaching?
          </h2>
          <p className="text-xl text-slate-300 mb-8">
            Join thousands of educators who are saving time while improving student outcomes.
          </p>
          <Link 
            href="/waitlist"
            className="inline-flex items-center px-8 py-4 bg-brand-600 hover:bg-brand-700 text-white font-semibold rounded-lg transition-colors shadow-card"
          >
            Get Started Today
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  )
}