import Link from 'next/link'
import Image from 'next/image'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPostsByAuthor, getAllAuthors, slugifyAuthor, getAuthorFromSlug } from '@/lib/blog'
import BlogCard from '@/components/blog/BlogCard'

// Disable static generation - render pages dynamically to prevent build errors
export const dynamic = 'force-dynamic'
export const revalidate = 0

interface AuthorPageProps {
  params: {
    author: string
  }
}

export async function generateStaticParams() {
  const authors = await getAllAuthors()
  
  return authors.map((author) => ({
    author: slugifyAuthor(author),
  }))
}

export async function generateMetadata({ params }: AuthorPageProps): Promise<Metadata> {
  const authorName = getAuthorFromSlug(params.author)
  const posts = await getPostsByAuthor(authorName)
  
  if (posts.length === 0) {
    return {
      title: 'Author Not Found | Draft Blog'
    }
  }

  return {
    title: `${authorName} | Draft Blog`,
    description: `Browse all articles by ${authorName}. Discover insights, tips, and best practices for educators using AI-powered tools.`,
    openGraph: {
      title: `${authorName} | Draft Blog`,
      description: `Browse all articles by ${authorName}. Discover insights, tips, and best practices for educators using AI-powered tools.`,
      url: `/blog/author/${params.author}`,
    },
  }
}

export default async function AuthorPage({ params }: AuthorPageProps) {
  const authorName = getAuthorFromSlug(params.author)
  const posts = await getPostsByAuthor(authorName)
  
  if (posts.length === 0) {
    notFound()
  }

  // Get author bio from the first post (if available)
  const hasAuthorImage = authorName === 'Dr. Greg Blackburn' || authorName === 'Greg Blackburn'

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
                  {authorName}
                </span>
              </li>
            </ol>
          </nav>

          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8 text-center md:text-left">
              {/* Author Avatar */}
              <div className="flex-shrink-0">
                {hasAuthorImage ? (
                  <Image
                    src="/images/authors/greg-blackburn.jpg"
                    alt={authorName}
                    width={96}
                    height={96}
                    className="w-24 h-24 rounded-full object-cover border-2 border-white/20"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-slate-700 flex items-center justify-center border-2 border-white/20">
                    <svg className="w-12 h-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                )}
              </div>

              {/* Author Info */}
              <div className="flex-1">
                <div className="inline-flex items-center rounded-full border border-white/10 bg-slate-800/60 px-4 py-2 text-slate-300 mb-4">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Author
                </div>
                
                <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-white mb-4">
                  {authorName}
                </h1>
                
                <p className="text-xl text-slate-300 mb-6">
                  {posts.length} article{posts.length === 1 ? '' : 's'} published
                </p>

                {/* Author Bio */}
                {authorName === 'Dr. Greg Blackburn' && (
                  <div className="text-slate-300 space-y-2">
                    <p>PhD-qualified educator and founder of Zaza Technologies. Expert in EdTech and AI-powered teaching tools.</p>
                    <p>Passionate about helping educators save time and improve student outcomes through innovative technology.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="section">
        <div className="container">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">
              Articles by {authorName}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {posts.map((post) => (
              <BlogCard 
                key={post.slug} 
                post={post}
                showAuthor={false} // Hide author since we're on their page
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