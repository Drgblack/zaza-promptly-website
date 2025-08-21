import { Metadata } from 'next'
import Link from 'next/link'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.zazapromptly.com'

export const metadata: Metadata = {
  title: 'Thank You | Promptly',
  description: 'Welcome to Promptly! Your subscription is confirmed and you&apos;re ready to transform your teaching with AI.',
  alternates: {
    canonical: '/thank-you',
  },
  openGraph: {
    title: 'Thank You | Promptly',
    description: 'Welcome to Promptly! Your subscription is confirmed and you&apos;re ready to transform your teaching with AI.',
    url: `${baseUrl}/thank-you`,
    images: [
      {
        url: '/og-default.png',
        width: 1200,
        height: 630,
        alt: 'Welcome to Promptly - AI Tools for Teachers',
      },
    ],
    siteName: 'Promptly',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Thank You | Promptly',
    description: 'Welcome to Promptly! Your subscription is confirmed and you&apos;re ready to transform your teaching with AI.',
    images: ['/og-default.png'],
  },
  robots: {
    index: false, // Don't index thank you pages
    follow: true,
  },
}

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* Success Icon */}
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-500/20 mb-8">
          <svg 
            className="w-10 h-10 text-green-400" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M5 13l4 4L19 7" 
            />
          </svg>
        </div>

        {/* Main Content */}
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-white mb-6">
          Welcome to Promptly! 🎉
        </h1>
        
        <p className="text-xl text-slate-300 mb-8 max-w-[600px] mx-auto">
          Your subscription is confirmed and you're ready to transform your teaching with AI. 
          Get started with lesson planning, assessment creation, and personalized learning tools.
        </p>

        {/* Next Steps */}
        <div className="bg-slate-900/60 border border-white/10 rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-semibold text-white mb-6">What's next?</h2>
          
          <div className="grid md:grid-cols-2 gap-6 text-left">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center mt-0.5">
                  <span className="text-purple-400 text-sm font-semibold">1</span>
                </div>
                <div>
                  <h3 className="text-white font-medium mb-1">Explore Your Dashboard</h3>
                  <p className="text-slate-300 text-sm">Access all your AI tools and start creating content for your classroom.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center mt-0.5">
                  <span className="text-purple-400 text-sm font-semibold">2</span>
                </div>
                <div>
                  <h3 className="text-white font-medium mb-1">Try Lesson Planning</h3>
                  <p className="text-slate-300 text-sm">Create engaging lessons tailored to your curriculum and teaching style.</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center mt-0.5">
                  <span className="text-purple-400 text-sm font-semibold">3</span>
                </div>
                <div>
                  <h3 className="text-white font-medium mb-1">Generate Assessments</h3>
                  <p className="text-slate-300 text-sm">Create quizzes, tests, and rubrics aligned with your learning objectives.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center mt-0.5">
                  <span className="text-purple-400 text-sm font-semibold">4</span>
                </div>
                <div>
                  <h3 className="text-white font-medium mb-1">Get Support</h3>
                  <p className="text-slate-300 text-sm">Visit our Learning Centre for tutorials and best practices.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="https://app.zazapromptly.com"
            className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-purple-600 hover:bg-purple-700 text-white font-medium transition-colors shadow-lg"
          >
            Access Your Dashboard
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          
          <Link 
            href="/learning-centre"
            className="inline-flex items-center justify-center px-8 py-4 rounded-full border border-white/20 text-white font-medium hover:bg-white/5 transition-colors"
          >
            Visit Learning Centre
          </Link>
        </div>

        {/* Support Note */}
        <p className="text-slate-400 text-sm mt-8">
          Need help getting started? 
          <Link href="/contact" className="text-purple-400 hover:text-purple-300 ml-1">
            Contact our support team
          </Link>
        </p>
      </div>
    </div>
  )
}