import Link from 'next/link'
import { Metadata } from 'next'
import { getLatestPost } from '@/lib/blog'
import resourcesData from '../../../content/resources.json'

export const metadata: Metadata = {
  title: 'Learning Centre | Promptly - Resources for Educators',
  description: 'Access our blog, free resources, and educational content to enhance your teaching with AI-powered tools.',
}

export default async function LearningCentrePage() {
  const latestPost = await getLatestPost()
  const resourcesCount = resourcesData.length

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-800 to-slate-900 py-20">
        <div className="container text-center">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-white mb-6">
            Learning Centre
          </h1>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Discover resources, insights, and practical guides to enhance your teaching with AI-powered tools.
          </p>
        </div>
      </section>

      {/* Resource Cards */}
      <section className="section">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            
            {/* Blog Card */}
            <Link href="/blog" className="group">
              <div className="rounded-2xl shadow-card border border-white/5 bg-slate-800/60 hover:bg-slate-800/80 transition p-8 h-full">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-brand-600/20 rounded-xl flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-brand-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold text-white mb-1">Blog</h2>
                    <p className="text-brand-400 text-sm">Latest insights & tips</p>
                  </div>
                </div>
                
                <p className="text-slate-300 mb-6">
                  Practical advice, best practices, and insights from education experts on using AI tools effectively in the classroom.
                </p>

                {latestPost && (
                  <div className="mb-6 p-4 bg-slate-700/50 rounded-lg border border-white/5">
                    <p className="text-sm text-slate-400 mb-1">Latest post:</p>
                    <p className="text-white font-medium">{latestPost.title}</p>
                  </div>
                )}

                <div className="flex items-center text-brand-400 group-hover:text-brand-300 transition-colors">
                  <span className="font-medium">Read the blog</span>
                  <svg className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>

            {/* Free Resources Card */}
            <Link href="/free-resources" className="group">
              <div className="rounded-2xl shadow-card border border-white/5 bg-slate-800/60 hover:bg-slate-800/80 transition p-8 h-full">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-green-600/20 rounded-xl flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold text-white mb-1">Free Resources</h2>
                    <p className="text-green-400 text-sm">Templates & guides</p>
                  </div>
                </div>
                
                <p className="text-slate-300 mb-6">
                  Downloadable templates, checklists, and guides to help you implement AI tools in your teaching practice effectively.
                </p>

                <div className="mb-6 p-4 bg-slate-700/50 rounded-lg border border-white/5">
                  <p className="text-sm text-slate-400 mb-1">Available resources:</p>
                  <p className="text-white font-medium">{resourcesCount} free downloads ready</p>
                </div>

                <div className="flex items-center text-green-400 group-hover:text-green-300 transition-colors">
                  <span className="font-medium">Browse resources</span>
                  <svg className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="bg-slate-800/50 py-16">
        <div className="container">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">
              Quick Links
            </h2>
            <p className="text-slate-300">
              Jump to popular sections and tools
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            <Link 
              href="/#snippet"
              className="p-4 text-center rounded-lg bg-slate-800/60 hover:bg-slate-800/80 transition border border-white/5"
            >
              <div className="text-brand-400 font-medium text-sm">Try Tool</div>
              <div className="text-slate-300 text-xs">Snippet Generator</div>
            </Link>
            
            <Link 
              href="/personas"
              className="p-4 text-center rounded-lg bg-slate-800/60 hover:bg-slate-800/80 transition border border-white/5"
            >
              <div className="text-purple-400 font-medium text-sm">Solutions</div>
              <div className="text-slate-300 text-xs">By Role</div>
            </Link>
            
            <Link 
              href="/products"
              className="p-4 text-center rounded-lg bg-slate-800/60 hover:bg-slate-800/80 transition border border-white/5"
            >
              <div className="text-orange-400 font-medium text-sm">Products</div>
              <div className="text-slate-300 text-xs">Our Tools</div>
            </Link>
            
            <Link 
              href="/about"
              className="p-4 text-center rounded-lg bg-slate-800/60 hover:bg-slate-800/80 transition border border-white/5"
            >
              <div className="text-blue-400 font-medium text-sm">About</div>
              <div className="text-slate-300 text-xs">Our Story</div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
