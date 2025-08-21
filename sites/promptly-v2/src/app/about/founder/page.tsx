import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.zazapromptly.com'

export const metadata: Metadata = {
  title: 'About the Founder | Promptly',
  description: 'Meet the founder behind Promptly - passionate about transforming education through AI tools that help teachers save time while maintaining quality.',
  alternates: {
    canonical: '/about/founder',
  },
  openGraph: {
    title: 'About the Founder | Promptly',
    description: 'Meet the founder behind Promptly - passionate about transforming education through AI tools that help teachers save time while maintaining quality.',
    url: `${baseUrl}/about/founder`,
    images: [
      {
        url: '/og-default.png',
        width: 1200,
        height: 630,
        alt: 'About the Founder - Promptly',
      },
    ],
    siteName: 'Promptly',
    type: 'profile',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About the Founder | Promptly',
    description: 'Meet the founder behind Promptly - passionate about transforming education through AI tools that help teachers save time while maintaining quality.',
    images: ['/og-default.png'],
  },
}

const PersonSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Founder Name",
  "jobTitle": "Founder",
  "worksFor": {
    "@type": "Organization",
    "name": "Promptly",
    "url": baseUrl
  },
  "url": `${baseUrl}/about/founder`,
  "image": `${baseUrl}/images/founder/portrait.jpg`,
  "sameAs": [
    "https://twitter.com/placeholder",
    "https://linkedin.com/in/placeholder"
  ],
  "description": "Founder of Promptly, dedicated to transforming education through AI tools that help teachers save time while maintaining quality."
}

export default function FounderPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(PersonSchema) }}
      />
      
      <div className="min-h-screen bg-slate-900">
        {/* Hero Section with Soft Radial Background */}
        <section className="relative py-20 overflow-hidden">
          {/* Soft radial gradient background */}
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              background: 'radial-gradient(circle at 30% 50%, rgba(59, 130, 246, 0.3) 0%, transparent 50%)'
            }}
          />
          
          <div className="container relative">
            <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
              {/* Left Column - Photo */}
              <div className="text-center lg:text-left">
                <p className="text-brand-400 font-medium mb-6 tracking-wide uppercase text-sm">
                  About the founder
                </p>
                
                <div className="relative inline-block">
                  <div className="w-64 h-64 mx-auto lg:mx-0 rounded-full overflow-hidden ring-4 ring-brand-600/20 shadow-card">
                    <Image
                      src="/images/founder/portrait.jpg"
                      alt="Founder Portrait"
                      width={256}
                      height={256}
                      className="w-full h-full object-cover"
                      priority
                    />
                  </div>
                  {/* Subtle glow effect */}
                  <div className="absolute inset-0 w-64 h-64 mx-auto lg:mx-0 rounded-full bg-gradient-to-br from-brand-600/20 to-purple-600/20 blur-xl -z-10" />
                </div>
              </div>

              {/* Right Column - Content */}
              <div className="max-w-[720px]">
                <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-white mb-6">
                  Hi, I&apos;m <span className="text-brand-400">Alex</span>
                </h1>
                
                <div className="space-y-6 text-lg text-slate-300 leading-relaxed">
                  <p>
                    I founded Promptly because I believe teachers deserve tools that actually save them time without compromising the quality of their work. After seeing countless educators burn out from administrative overhead, I knew there had to be a better way.
                  </p>
                  
                  <p>
                    My mission is simple: build AI tools that feel intuitive, respect pedagogical principles, and give teachers back their most precious resource—time. Every feature we ship is designed with real classroom needs in mind.
                  </p>
                  
                  <p>
                    When I&apos;m not working on Promptly, you&apos;ll find me reading education research, talking to teachers about their daily challenges, or exploring how technology can enhance rather than replace human connection in learning.
                  </p>
                </div>

                {/* CTA Row */}
                <div className="flex flex-col sm:flex-row gap-4 mt-8">
                  <a
                    href="mailto:founder@zazapromptly.com"
                    className="inline-flex items-center justify-center px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-card hover:shadow-focus focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 focus:ring-offset-slate-900"
                  >
                    <svg className="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Connect with me
                  </a>
                  
                  <Link
                    href="/blog"
                    className="inline-flex items-center justify-center px-6 py-3 bg-slate-800/60 hover:bg-slate-800/80 text-slate-200 font-semibold rounded-xl border border-white/10 hover:border-white/20 transition-all duration-200 shadow-card focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:ring-offset-slate-900"
                  >
                    <svg className="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Read the blog
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Stats Band */}
        <section className="border-t border-white/10 py-16">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto text-center">
              <div className="p-6 rounded-2xl bg-slate-800/40 border border-white/5">
                <div className="text-3xl font-bold text-white mb-2">12,000+</div>
                <div className="text-slate-400">Teachers using our tools</div>
              </div>
              
              <div className="p-6 rounded-2xl bg-slate-800/40 border border-white/5">
                <div className="text-3xl font-bold text-white mb-2">500+</div>
                <div className="text-slate-400">Schools worldwide</div>
              </div>
              
              <div className="p-6 rounded-2xl bg-slate-800/40 border border-white/5">
                <div className="text-3xl font-bold text-white mb-2">45</div>
                <div className="text-slate-400">Minutes saved weekly</div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-20">
          <div className="container">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">
                Ready to transform your teaching workflow?
              </h2>
              <p className="text-lg text-slate-300 mb-8">
                Join thousands of educators who are already saving time with Promptly&apos;s AI-powered tools.
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