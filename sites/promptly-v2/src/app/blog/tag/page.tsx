import Link from 'next/link'
import { Metadata } from 'next'
import { getAllTags, getPostsByTag } from '@/lib/blog'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Browse by Tag | Promptly Blog',
  description: 'Discover articles by topic. Browse our comprehensive collection of education and AI teaching insights organized by tag.',
}

export default async function TagIndexPage() {
  const tags = await getAllTags()
  
  // Get post counts for each tag
  const tagsWithCounts = await Promise.all(
    tags.map(async (tag) => {
      const posts = await getPostsByTag(tag)
      return {
        name: tag,
        count: posts.length,
        slug: encodeURIComponent(tag.toLowerCase())
      }
    })
  )

  // Sort by post count (most popular first)
  tagsWithCounts.sort((a, b) => b.count - a.count)

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
                  Tags
                </span>
              </li>
            </ol>
          </nav>

          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-white mb-6">
              Browse by Tag
            </h1>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Discover articles by topic. Find exactly what you&apos;re looking for with our organized tag system.
            </p>
          </div>
        </div>
      </section>

      {/* Tags Grid */}
      <section className="section">
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-12">
            {tagsWithCounts.map(({ name, count, slug }) => (
              <Link
                key={name}
                href={`/blog/tag/${slug}`}
                className="group p-4 rounded-xl border border-white/5 bg-slate-800/60 hover:bg-slate-800/80 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-900"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-white font-medium group-hover:text-brand-400 transition-colors">
                    {name}
                  </h3>
                  <span className="text-xs text-slate-400 bg-slate-700/60 px-2 py-1 rounded-full">
                    {count} article{count === 1 ? '' : 's'}
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* Back to blog */}
          <div className="text-center">
            <Link
              href="/blog"
              className="inline-flex items-center px-6 py-3 border border-slate-600 text-slate-300 hover:text-white hover:border-slate-500 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-900"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Blog
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
