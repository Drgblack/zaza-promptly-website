import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.zazapromptly.com'

export const metadata: Metadata = {
  title: 'About Dr. Greg Blackburn — Founder | Promptly',
  description: 'Dr. Greg Blackburn is a globally recognised EdTech expert, PhD-qualified educator, and founder of Zaza Technologies. Over 20 years of experience building AI tools for teachers.',
  alternates: {
    canonical: '/about/founder',
  },
  openGraph: {
    title: 'About Dr. Greg Blackburn — Founder | Promptly',
    description: 'Dr. Greg Blackburn is a globally recognised EdTech expert, PhD-qualified educator, and founder of Zaza Technologies. Over 20 years of experience building AI tools for teachers.',
    url: `${baseUrl}/about/founder`,
    images: [
      {
        url: '/images/founder/portrait.jpg',
        width: 800,
        height: 800,
        alt: 'Dr. Greg Blackburn headshot',
      },
    ],
    siteName: 'Promptly',
    type: 'profile',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Dr. Greg Blackburn — Founder | Promptly',
    description: 'Dr. Greg Blackburn is a globally recognised EdTech expert, PhD-qualified educator, and founder of Zaza Technologies. Over 20 years of experience building AI tools for teachers.',
    images: ['/images/founder/portrait.jpg'],
  },
}

const PersonSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Dr. Greg Blackburn",
  "jobTitle": "Founder",
  "worksFor": {
    "@type": "Organization",
    "name": "Zaza Technologies",
    "url": "https://zazatechnologies.com"
  },
  "url": `${baseUrl}/about/founder`,
  "image": `${baseUrl}/images/founder/portrait.jpg`,
  "sameAs": [
    "https://www.linkedin.com/in/drgregblackburn/"
  ],
  "description": "Dr. Greg Blackburn is a globally recognised EdTech expert, PhD-qualified educator, and founder of Zaza Technologies. Over 20 years of experience in digital learning and instructional design."
}

export default function FounderPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(PersonSchema) }}
      />
      
      <div className="min-h-screen bg-slate-900">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
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
                      alt="Dr. Greg Blackburn headshot"
                      width={256}
                      height={256}
                      className="w-full h-full object-cover"
                      priority
                    />
                  </div>
                  <div className="absolute inset-0 w-64 h-64 mx-auto lg:mx-0 rounded-full bg-gradient-to-br from-brand-600/20 to-purple-600/20 blur-xl -z-10" />
                </div>
              </div>

              {/* Right Column - Content */}
              <div className="max-w-[720px]">
                <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-white mb-6">
                  Hi, I&apos;m <span className="text-brand-400">Dr. Greg Blackburn</span>
                </h1>
                
                <div className="space-y-6 text-lg text-slate-300 leading-relaxed">
                  <p>
                    I&apos;m a globally recognised EdTech expert, PhD-qualified educator, and founder of Zaza Technologies. With over 20 years of experience in digital learning and instructional design, I&apos;ve built tools used by thousands of teachers worldwide.
                  </p>
                  
                  <p>
                    My mission is simple: to give teachers back their time so they can focus on what they do best—inspiring and educating the next generation. Before founding Zaza Technologies, I spent years in classrooms, educational leadership roles, and EdTech companies, gaining deep insights into the challenges teachers face daily.
                  </p>
                  
                  <p>
                    This experience drives my commitment to creating AI-powered solutions that actually work for educators. Every feature we ship is designed with real classroom needs in mind, grounded in evidence and practical application.
                  </p>
                </div>

                {/* CTA Row */}
                <div className="flex flex-col sm:flex-row gap-4 mt-8">
                  <a
                    href="mailto:greg@zazatechnologies.com"
                    className="inline-flex items-center justify-center px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-card hover:shadow-focus focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 focus:ring-offset-slate-900"
                  >
                    <svg className="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Connect with me
                  </a>
                  
                  <a
                    href="https://www.linkedin.com/in/drgregblackburn/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-6 py-3 bg-slate-800/60 hover:bg-slate-800/80 text-slate-200 font-semibold rounded-xl border border-white/10 hover:border-white/20 transition-all duration-200 shadow-card focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:ring-offset-slate-900"
                  >
                    <svg className="mr-2 w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    LinkedIn Profile
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Journey Section */}
        <section className="py-20 border-t border-white/10">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-semibold text-white text-center mb-16">The Journey</h2>
              
              <div className="space-y-12">
                {/* Timeline items */}
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="md:w-48 flex-shrink-0">
                    <div className="text-brand-400 font-semibold text-sm uppercase tracking-wide mb-1">1980s</div>
                    <h3 className="text-xl font-semibold text-white">Painter&apos;s Apprenticeship</h3>
                  </div>
                  <div className="flex-1">
                    <div className="p-6 bg-slate-800/40 border border-white/10 rounded-2xl">
                      <p className="text-slate-300">Started at Cascade Brewery via father&apos;s connection at Tas Paints. Learned perseverance by finishing the trade.</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="md:w-48 flex-shrink-0">
                    <div className="text-brand-400 font-semibold text-sm uppercase tracking-wide mb-1">Early 1990s</div>
                    <h3 className="text-xl font-semibold text-white">World Travel</h3>
                  </div>
                  <div className="flex-1">
                    <div className="p-6 bg-slate-800/40 border border-white/10 rounded-2xl">
                      <p className="text-slate-300">Backpacked globally, immersed in new cultures, and realised the power of education.</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="md:w-48 flex-shrink-0">
                    <div className="text-brand-400 font-semibold text-sm uppercase tracking-wide mb-1">1994–1995</div>
                    <h3 className="text-xl font-semibold text-white">German Language Course</h3>
                  </div>
                  <div className="flex-1">
                    <div className="p-6 bg-slate-800/40 border border-white/10 rounded-2xl">
                      <p className="text-slate-300">Completed a Diploma in German in Frankfurt, which opened doors to university.</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="md:w-48 flex-shrink-0">
                    <div className="text-brand-400 font-semibold text-sm uppercase tracking-wide mb-1">1995–1999</div>
                    <h3 className="text-xl font-semibold text-white">UTAS — Information Systems</h3>
                  </div>
                  <div className="flex-1">
                    <div className="p-6 bg-slate-800/40 border border-white/10 rounded-2xl">
                      <p className="text-slate-300">University of Tasmania: Information Systems through to Honours.</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="md:w-48 flex-shrink-0">
                    <div className="text-brand-400 font-semibold text-sm uppercase tracking-wide mb-1">2000–2004</div>
                    <h3 className="text-xl font-semibold text-white">MBA — University of Queensland</h3>
                  </div>
                  <div className="flex-1">
                    <div className="p-6 bg-slate-800/40 border border-white/10 rounded-2xl">
                      <p className="text-slate-300">Master of Business Administration.</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="md:w-48 flex-shrink-0">
                    <div className="text-brand-400 font-semibold text-sm uppercase tracking-wide mb-1">2016–2019</div>
                    <h3 className="text-xl font-semibold text-white">PhD — Professional Education</h3>
                  </div>
                  <div className="flex-1">
                    <div className="p-6 bg-slate-800/40 border border-white/10 rounded-2xl">
                      <p className="text-slate-300">City, University of London: research in educational technology and professional development.</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="md:w-48 flex-shrink-0">
                    <div className="text-brand-400 font-semibold text-sm uppercase tracking-wide mb-1">2025</div>
                    <h3 className="text-xl font-semibold text-white">Zaza Technologies</h3>
                  </div>
                  <div className="flex-1">
                    <div className="p-6 bg-gradient-to-br from-brand-600/20 to-purple-600/20 border border-brand-500/30 rounded-2xl">
                      <p className="text-slate-200">Founded to build teacher-first AI tools, informed by decades of work across education and professional learning.</p>
                    </div>
                  </div>
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
                <div className="text-3xl font-bold text-white mb-2">20+</div>
                <div className="text-slate-400">Years in EdTech</div>
              </div>
              
              <div className="p-6 rounded-2xl bg-slate-800/40 border border-white/5">
                <div className="text-3xl font-bold text-white mb-2">12,000+</div>
                <div className="text-slate-400">Teachers supported globally</div>
              </div>
              
              <div className="p-6 rounded-2xl bg-slate-800/40 border border-white/5">
                <div className="text-3xl font-bold text-white mb-2">PhD</div>
                <div className="text-slate-400">Educational Technology</div>
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