import Link from 'next/link'
import { Metadata } from 'next'
import { getPaginatedPosts } from '@/lib/blog'
import Pagination from '@/components/blog/Pagination'
import BlogList from '@/components/blog/BlogList'

// Blog listing page - revalidate every hour
export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Zaza Promptly Blog – AI Teaching Tips, Strategies & Research',
  description: 'Practical advice, research-backed insights, and AI strategies to reduce teacher workload, improve parent communication, and future-proof education.',
  keywords: 'AI teaching tips, teacher AI strategies, AI for parent communication, teacher productivity tips, AI lesson planning, education AI research, safe AI for teachers',
  alternates: {
    canonical: '/blog',
  },
  openGraph: {
    title: 'Zaza Promptly Blog – AI Teaching Tips, Strategies & Research',
    description: 'Practical advice, research-backed insights, and AI strategies to reduce teacher workload, improve parent communication, and future-proof education.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zaza Promptly Blog – AI Teaching Tips, Strategies & Research',
    description: 'Practical advice, research-backed insights, and AI strategies to reduce teacher workload, improve parent communication, and future-proof education.',
  },
}

export default async function BlogPage() {
  const { posts, totalPages, currentPage, totalPosts } = await getPaginatedPosts(1, 10)

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-800 to-slate-900 py-20">
        <div className="container text-center">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-white mb-6">
            Education Blog
          </h1>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Insights, tips, and best practices for modern educators embracing AI-powered teaching tools.
          </p>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="section">
        <div className="container">
          <div className="mb-8">
            <p className="text-slate-400 text-center">
              Showing {posts.length} of {totalPosts} articles
            </p>
          </div>
          
          <BlogList posts={posts} />

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            basePath="/blog"
            className="mb-16"
          />
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
