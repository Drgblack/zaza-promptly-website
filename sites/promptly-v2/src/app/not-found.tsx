import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Page Not Found | Promptly',
  description: 'The page you are looking for could not be found. Explore our blog, free resources, and AI tools for teachers.',
  robots: 'noindex, follow',
}

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
      <div className="text-center max-w-2xl mx-auto">
        {/* Error Illustration */}
        <div className="mb-8">
          <div className="w-32 h-32 bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-card border border-white/10">
            <svg className="w-16 h-16 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0012 15c-2.34 0-4.44-1.01-5.879-2.614M16.114 12.5A6.966 6.966 0 0112 11c-1.613 0-3.078.558-4.242 1.486M12 21a9 9 0 110-18 9 9 0 010 18z" />
            </svg>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-semibold text-white mb-4 tracking-tight">
            Page Not Found
          </h1>
          
          <p className="text-xl text-slate-300 mb-8 leading-relaxed">
            Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been moved, deleted, or the URL might be incorrect.
          </p>
        </div>

        {/* Primary CTA */}
        <div className="mb-8">
          <Link 
            href="/"
            className="inline-flex items-center justify-center px-8 py-4 bg-brand-600 hover:bg-brand-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-card hover:shadow-focus focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 focus:ring-offset-slate-900"
          >
            <svg className="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Go Home
          </Link>
        </div>

        {/* Secondary Navigation */}
        <div className="text-slate-400 mb-6">
          <p className="text-sm mb-4">Or explore these popular sections:</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto">
          <Link 
            href="/about/founder"
            className="group p-4 rounded-2xl bg-slate-800/60 hover:bg-slate-800/80 border border-white/5 hover:border-white/10 transition-all duration-200 shadow-card hover:shadow-focus focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900"
          >
            <div className="w-10 h-10 bg-blue-600/20 rounded-xl flex items-center justify-center mb-3 mx-auto group-hover:bg-blue-600/30 transition-colors">
              <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h3 className="font-medium text-white text-sm mb-1">About</h3>
            <p className="text-xs text-slate-400">Our story</p>
          </Link>

          <Link 
            href="/blog"
            className="group p-4 rounded-2xl bg-slate-800/60 hover:bg-slate-800/80 border border-white/5 hover:border-white/10 transition-all duration-200 shadow-card hover:shadow-focus focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 focus:ring-offset-slate-900"
          >
            <div className="w-10 h-10 bg-brand-600/20 rounded-xl flex items-center justify-center mb-3 mx-auto group-hover:bg-brand-600/30 transition-colors">
              <svg className="w-5 h-5 text-brand-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="font-medium text-white text-sm mb-1">Blog</h3>
            <p className="text-xs text-slate-400">Latest insights</p>
          </Link>

          <Link 
            href="/pricing"
            className="group p-4 rounded-2xl bg-slate-800/60 hover:bg-slate-800/80 border border-white/5 hover:border-white/10 transition-all duration-200 shadow-card hover:shadow-focus focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-slate-900"
          >
            <div className="w-10 h-10 bg-green-600/20 rounded-xl flex items-center justify-center mb-3 mx-auto group-hover:bg-green-600/30 transition-colors">
              <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <h3 className="font-medium text-white text-sm mb-1">Pricing</h3>
            <p className="text-xs text-slate-400">Plans & features</p>
          </Link>

          <Link 
            href="/contact"
            className="group p-4 rounded-2xl bg-slate-800/60 hover:bg-slate-800/80 border border-white/5 hover:border-white/10 transition-all duration-200 shadow-card hover:shadow-focus focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-900"
          >
            <div className="w-10 h-10 bg-purple-600/20 rounded-xl flex items-center justify-center mb-3 mx-auto group-hover:bg-purple-600/30 transition-colors">
              <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h3 className="font-medium text-white text-sm mb-1">Support</h3>
            <p className="text-xs text-slate-400">Get help</p>
          </Link>
        </div>

        {/* Help Text */}
        <div className="mt-8 p-4 rounded-xl bg-slate-800/40 border border-white/5">
          <p className="text-sm text-slate-400">
            Still having trouble finding what you need?{' '}
            <Link 
              href="/waitlist" 
              className="text-brand-400 hover:text-brand-300 underline decoration-brand-400/50 hover:decoration-brand-300/50 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 focus:ring-offset-slate-800 rounded"
            >
              Contact us
            </Link>{' '}
            and we&apos;ll help you find the right resources.
          </p>
        </div>
      </div>
    </div>
  )
}