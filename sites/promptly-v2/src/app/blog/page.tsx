import Link from 'next/link'
import { Metadata } from 'next'
import { getAllPostsMeta } from '@/lib/blog'

// Blog listing page - revalidate every hour
export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Blog | Promptly - Education Insights & Tips',
  description: 'Latest insights, tips, and best practices for educators using AI-powered tools in the classroom.',
}

export default async function BlogPage() {
  const posts = await getAllPostsMeta()

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long', 
      day: 'numeric'
    })
  }

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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {posts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
                <article className="rounded-2xl shadow-card border border-white/5 bg-slate-800/60 hover:bg-slate-800/80 transition p-6 h-full">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags?.map((tag) => (
                      <span 
                        key={tag}
                        className="px-2 py-1 bg-brand-600/20 text-brand-400 text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <h2 className="text-lg font-semibold text-white mb-3 group-hover:text-brand-400 transition-colors">
                    {post.title}
                  </h2>
                  
                  <p className="text-slate-300 mb-4 line-clamp-3">
                    {post.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-slate-400">
                    <span>{formatDate(post.date)}</span>
                    {post.author && <span>by {post.author}</span>}
                  </div>
                </article>
              </Link>
            ))}
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