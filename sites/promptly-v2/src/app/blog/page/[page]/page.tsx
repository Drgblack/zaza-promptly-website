import Link from 'next/link'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPaginatedPosts, getAllPostsMeta } from '@/lib/blog'
import BlogCard from '@/components/blog/BlogCard'
import Pagination from '@/components/blog/Pagination'

// Disable static generation - render pages dynamically to prevent build errors
export const dynamic = 'force-dynamic'
export const revalidate = 0

interface BlogPageProps {
  params: {
    page: string
  }
}

export async function generateStaticParams() {
  const allPosts = await getAllPostsMeta()
  const totalPages = Math.ceil(allPosts.length / 10)
  
  return Array.from({ length: totalPages }, (_, i) => ({
    page: (i + 1).toString(),
  })).filter(({ page }) => page !== '1') // Exclude page 1 as it's handled by /blog
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const page = parseInt(params.page)
  
  if (isNaN(page) || page < 1) {
    return {
      title: 'Page Not Found | Promptly Blog'
    }
  }

  return {
    title: `Blog - Page ${page} | Promptly - Education Insights & Tips`,
    description: `Latest insights, tips, and best practices for educators using AI-powered tools in the classroom. Page ${page}`,
    robots: page === 1 ? 'index, follow' : 'noindex, follow',
  }
}

export default async function BlogPagePaginated({ params }: BlogPageProps) {
  const page = parseInt(params.page)
  
  if (isNaN(page) || page < 1) {
    notFound()
  }

  const { posts, totalPages, currentPage, totalPosts } = await getPaginatedPosts(page, 10)
  
  if (posts.length === 0 && page > 1) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-800 to-slate-900 py-20">
        <div className="container text-center">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-white mb-6">
            Education Blog
          </h1>
          <p className="text-xl text-slate-300 mb-4 max-w-2xl mx-auto">
            Insights, tips, and best practices for modern educators embracing AI-powered teaching tools.
          </p>
          <p className="text-slate-400">
            Page {currentPage} of {totalPages}
          </p>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="section">
        <div className="container">
          <div className="mb-8">
            <p className="text-slate-400 text-center">
              Showing {posts.length} of {totalPosts} articles • Page {currentPage} of {totalPages}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>

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