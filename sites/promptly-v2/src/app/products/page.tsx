import { Metadata } from 'next'
import Link from 'next/link'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.zazapromptly.com'

export const metadata: Metadata = {
  title: 'Zaza AI Products – Tools for Teachers, Schools & HR Professionals',
  description: 'Explore Zaza\'s AI suite: Promptly for communication, Teach for lesson planning, AutoPlanner for classrooms. Safe AI built to help teachers thrive.',
  keywords: 'AI tools for teachers, teacher productivity apps, AI lesson planning assistant, AI for parent communication, AI for teacher reports, safe AI for teachers, best AI tools for teachers 2025',
  alternates: {
    canonical: '/products',
  },
  openGraph: {
    title: 'Zaza AI Products – Tools for Teachers, Schools & HR Professionals',
    description: 'Explore Zaza\'s AI suite: Promptly for communication, Teach for lesson planning, AutoPlanner for classrooms. Safe AI built to help teachers thrive.',
    url: `${baseUrl}/products`,
    images: [
      {
        url: '/og-default.png',
        width: 1200,
        height: 630,
        alt: 'Promptly Products - AI Tools for Education',
      },
    ],
    siteName: 'Promptly',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zaza AI Products – Tools for Teachers, Schools & HR Professionals',
    description: 'Explore Zaza\'s AI suite: Promptly for communication, Teach for lesson planning, AutoPlanner for classrooms. Safe AI built to help teachers thrive.',
    images: ['/og-default.png'],
  },
}

const ProductsSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Promptly Products",
  "description": "AI-powered educational tools for teachers and schools",
  "itemListElement": [
    {
      "@type": "Product",
      "position": 1,
      "name": "Promptly",
      "description": "AI-powered comment generation that saves teachers hours every week while maintaining quality and personal touch.",
      "url": baseUrl,
      "category": "Educational Software"
    },
    {
      "@type": "Product", 
      "position": 2,
      "name": "Teach",
      "description": "Comprehensive lesson planning and curriculum management tools designed for modern educators.",
      "url": `${baseUrl}/products#teach`,
      "category": "Educational Software"
    },
    {
      "@type": "Product",
      "position": 3, 
      "name": "Technologies",
      "description": "Custom AI solutions and educational technology consulting for schools and institutions.",
      "url": `${baseUrl}/products#technologies`,
      "category": "Educational Consulting"
    }
  ]
}

export default function ProductsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ProductsSchema) }}
      />
      
      <div className="min-h-screen bg-slate-900">
        {/* Hero Section */}
        <section className="py-20">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-white mb-6">
                Our Products
              </h1>
              <p className="text-xl text-slate-300 mb-12 max-w-[720px] mx-auto">
                A comprehensive suite of AI-powered tools designed to transform education, save teachers time, and improve student outcomes.
              </p>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="pb-20">
          <div className="container">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              
              {/* Promptly Card */}
              <div className="rounded-2xl shadow-card border border-white/10 bg-slate-900/60 p-6 hover:bg-slate-900/80 transition-all duration-200 group">
                <div className="w-16 h-16 bg-brand-600/20 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-brand-600/30 transition-colors">
                  <svg className="w-8 h-8 text-brand-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                
                <h3 className="text-2xl font-semibold text-white mb-4">Promptly</h3>
                <p className="text-slate-300 mb-6 leading-relaxed">
                  AI-powered comment generation that saves teachers hours every week while maintaining quality and personal touch. Perfect for busy educators who want to provide meaningful feedback efficiently.
                </p>
                
                <div className="space-y-3">
                  <Link
                    href="/"
                    className="block w-full text-center px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white font-semibold rounded-xl transition-colors shadow-card"
                  >
                    Get Started
                  </Link>
                  <a
                    href="#promptly-details"
                    className="block w-full text-center px-6 py-3 text-slate-300 hover:text-white border border-white/20 hover:border-white/40 rounded-xl transition-colors"
                  >
                    Learn More
                  </a>
                </div>
              </div>

              {/* Teach Card */}
              <div id="teach" className="rounded-2xl shadow-card border border-white/10 bg-slate-900/60 p-6 hover:bg-slate-900/80 transition-all duration-200 group">
                <div className="w-16 h-16 bg-green-600/20 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-green-600/30 transition-colors">
                  <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                
                <h3 className="text-2xl font-semibold text-white mb-4">Teach</h3>
                <p className="text-slate-300 mb-6 leading-relaxed">
                  Comprehensive lesson planning and curriculum management tools designed for modern educators. Streamline your planning process and create engaging learning experiences.
                </p>
                
                <div className="space-y-3">
                  <a
                    href="#teach"
                    className="block w-full text-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition-colors shadow-card"
                  >
                    Try Teach
                  </a>
                  <a
                    href="#teach-details"
                    className="block w-full text-center px-6 py-3 text-slate-300 hover:text-white border border-white/20 hover:border-white/40 rounded-xl transition-colors"
                  >
                    Learn More
                  </a>
                </div>
              </div>

              {/* Technologies Card */}
              <div className="rounded-2xl shadow-card border border-white/10 bg-slate-900/60 p-6 hover:bg-slate-900/80 transition-all duration-200 group md:col-span-2 lg:col-span-1">
                <div className="w-16 h-16 bg-purple-600/20 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-purple-600/30 transition-colors">
                  <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                
                <h3 className="text-2xl font-semibold text-white mb-4">Technologies</h3>
                <p className="text-slate-300 mb-6 leading-relaxed">
                  Custom AI solutions and educational technology consulting for schools and institutions. We build bespoke tools that fit your unique educational challenges.
                </p>
                
                <div className="space-y-3">
                  <a
                    href="mailto:solutions@zazapromptly.com"
                    className="block w-full text-center px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl transition-colors shadow-card"
                  >
                    Get in Touch
                  </a>
                  <a
                    href="#technologies-details"
                    className="block w-full text-center px-6 py-3 text-slate-300 hover:text-white border border-white/20 hover:border-white/40 rounded-xl transition-colors"
                  >
                    Learn More
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison Section */}
        <section className="border-t border-white/10 py-20">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-semibold text-white text-center mb-12">
                Choose the right solution for your needs
              </h2>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-brand-400 mb-4">Promptly</h3>
                  <ul className="space-y-2 text-slate-300">
                    <li>• Individual teachers</li>
                    <li>• Comment generation</li>
                    <li>• Quick setup</li>
                    <li>• Affordable pricing</li>
                  </ul>
                </div>
                
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-green-400 mb-4">Teach</h3>
                  <ul className="space-y-2 text-slate-300">
                    <li>• Departments & schools</li>
                    <li>• Full lesson planning</li>
                    <li>• Curriculum management</li>
                    <li>• Collaboration tools</li>
                  </ul>
                </div>
                
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-purple-400 mb-4">Technologies</h3>
                  <ul className="space-y-2 text-slate-300">
                    <li>• Large institutions</li>
                    <li>• Custom solutions</li>
                    <li>• Full integration</li>
                    <li>• Ongoing support</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Sections - Hidden anchors for smooth scrolling */}
        <div id="promptly-details" className="scroll-mt-20"></div>
        <div id="teach-details" className="scroll-mt-20"></div>
        <div id="technologies-details" className="scroll-mt-20"></div>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-semibold text-white mb-4">
                Ready to get started?
              </h2>
              <p className="text-lg text-slate-300 mb-8">
                Join thousands of educators who are transforming their workflow with our AI-powered tools.
              </p>
              <Link
                href="/waitlist"
                className="inline-flex items-center justify-center px-8 py-4 bg-brand-600 hover:bg-brand-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-card hover:shadow-focus focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 focus:ring-offset-slate-900"
              >
                Join the waitlist
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}