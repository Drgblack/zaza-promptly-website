import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import SnippetDemo from '@/components/sections/SnippetDemo'
import { getPersona, PERSONAS, type Persona } from '@/content/personas'

interface PersonaPageProps {
  params: { slug: string }
}

// Generate static params for all personas
export async function generateStaticParams() {
  return PERSONAS.map((persona) => ({
    slug: persona.slug,
  }))
}

// Generate metadata for each persona
export async function generateMetadata({ params }: PersonaPageProps): Promise<Metadata> {
  const persona = PERSONAS.find((p) => p.slug === params.slug)
  
  if (!persona) {
    return {
      title: 'Persona Not Found | Promptly',
      description: 'The requested teaching role page could not be found.',
    }
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.zazapromptly.com'

  return {
    title: `${persona.name} Solutions | Promptly - ${persona.tagline}`,
    description: `${persona.tagline}. Discover how Promptly's AI-powered comment generation supports ${persona.name.toLowerCase()}s in education.`,
    alternates: {
      canonical: `/personas/${persona.slug}`,
    },
    openGraph: {
      title: `${persona.name} Solutions | Promptly`,
      description: persona.tagline,
      url: `${baseUrl}/personas/${persona.slug}`,
      images: [
        {
          url: '/og-default.png',
          width: 1200,
          height: 630,
          alt: `${persona.name} AI Solutions - Promptly`,
        },
      ],
      siteName: 'Promptly',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${persona.name} Solutions | Promptly`,
      description: persona.tagline,
      images: ['/og-default.png'],
    },
  }
}

// FAQ JSON-LD structured data
function generateFAQStructuredData(persona: Persona) {
  if (!persona.faq || persona.faq.length === 0) return null

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: persona.faq.map(item => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a
      }
    }))
  }
}

// Breadcrumb JSON-LD structured data
function generateBreadcrumbStructuredData(persona: Persona) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.zazapromptly.com'
  
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: baseUrl
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Teaching Solutions',
        item: `${baseUrl}/personas`
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: persona.name,
        item: `${baseUrl}/personas/${persona.slug}`
      }
    ]
  }
}

export default function PersonaPage({ params }: PersonaPageProps) {
  const persona = PERSONAS.find((p) => p.slug === params.slug)
  
  if (!persona) {
    notFound()
  }

  const faqStructuredData = generateFAQStructuredData(persona)
  const breadcrumbStructuredData = generateBreadcrumbStructuredData(persona)

  return (
    <>
      {/* Structured Data */}
      {faqStructuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqStructuredData),
          }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbStructuredData),
        }}
      />

      <div className="min-h-screen bg-slate-900">
        {/* Hero Section */}
        <section className={`relative overflow-hidden bg-gradient-to-br from-${persona.color}-900/30 via-slate-900 to-slate-900 py-20`}>
          <div className="container">
            <div className="text-center max-w-4xl mx-auto">
              {/* Breadcrumb */}
              <nav className="mb-8" aria-label="Breadcrumb">
                <ol className="flex items-center justify-center space-x-2 text-sm">
                  <li>
                    <Link href="/" className="text-slate-400 hover:text-white transition-colors">
                      Home
                    </Link>
                  </li>
                  <li>
                    <svg className="w-4 h-4 text-slate-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </li>
                  <li>
                    <Link href="/personas" className="text-slate-400 hover:text-white transition-colors">
                      Teaching Solutions
                    </Link>
                  </li>
                  <li>
                    <svg className="w-4 h-4 text-slate-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </li>
                  <li>
                    <span className="text-white font-medium">{persona.name}</span>
                  </li>
                </ol>
              </nav>

              {/* Icon */}
              <div className={`w-20 h-20 bg-${persona.color}-600 rounded-2xl flex items-center justify-center mx-auto mb-8`}>
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <path d={persona.icon} />
                </svg>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                {persona.name}
              </h1>
              <p className="text-xl text-slate-300 max-w-[720px] mx-auto mb-8">
                {persona.tagline}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href={persona.primaryCTA?.href || '/pricing'}
                  className={`inline-flex items-center px-8 py-4 bg-${persona.color}-600 hover:bg-${persona.color}-700 text-white font-semibold rounded-lg transition-colors shadow-lg focus:outline-none focus:ring-2 focus:ring-${persona.color}-500 focus:ring-offset-2 focus:ring-offset-slate-900`}
                >
                  {persona.primaryCTA?.label || 'Start Free Trial'}
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
                <Link 
                  href={persona.secondaryCTA?.href || '/#snippet'}
                  className="inline-flex items-center px-8 py-4 border-2 border-white hover:bg-white hover:text-slate-900 text-white font-semibold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-slate-900"
                >
                  {persona.secondaryCTA?.label || 'Try Demo'}
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Pains → Outcomes Section */}
        <section className="py-20">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
              {/* Pain Points */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-8 text-center lg:text-left">
                  Common Challenges
                </h2>
                <div className="space-y-6">
                  {persona.pains.map((pain, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center mt-1">
                        <svg className="w-3 h-3 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p className="text-slate-300 leading-relaxed">{pain}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Outcomes */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-8 text-center lg:text-left">
                  With Promptly You Can
                </h2>
                <div className="space-y-6">
                  {persona.outcomes.map((outcome, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className={`flex-shrink-0 w-6 h-6 rounded-full bg-${persona.color}-500/20 flex items-center justify-center mt-1`}>
                        <svg className={`w-3 h-3 text-${persona.color}-400`} fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p className="text-slate-300 leading-relaxed">{outcome}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How Promptly Helps */}
        <section className="py-20 bg-slate-800/30">
          <div className="container">
            <h2 className="text-3xl font-bold text-white text-center mb-12">
              How Promptly Supports {persona.name}s
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {persona.features.map((feature, index) => (
                <div key={index} className="bg-slate-900/60 border border-white/10 p-6 rounded-2xl shadow-lg">
                  <div className={`w-12 h-12 bg-${persona.color}-600/20 rounded-lg flex items-center justify-center mb-4`}>
                    <svg className={`w-6 h-6 text-${persona.color}-400`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-3">{feature.title}</h3>
                  <p className="text-slate-300 text-sm leading-relaxed">{feature.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mini Demo */}
        <section className="py-20">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                Try It Yourself
              </h2>
              <p className="text-slate-300 max-w-[720px] mx-auto">
                Experience how Promptly generates personalized comments for {persona.name.toLowerCase()}s. 
                No signup required.
              </p>
            </div>
            <SnippetDemo />
          </div>
        </section>

        {/* Social Proof */}
        {(persona.testimonial || persona.statBand) && (
          <section className="py-20 bg-slate-800/30">
            <div className="container">
              <div className="max-w-6xl mx-auto">
                {/* Testimonial */}
                {persona.testimonial && (
                  <div className="text-center mb-16">
                    <blockquote className="text-xl text-white italic mb-6 max-w-[720px] mx-auto">
                      "{persona.testimonial.quote}"
                    </blockquote>
                    <cite className="text-slate-300 not-italic">
                      <span className="font-semibold">{persona.testimonial.author}</span>
                      {persona.testimonial.role && (
                        <span className="text-slate-400"> • {persona.testimonial.role}</span>
                      )}
                    </cite>
                  </div>
                )}

                {/* Stats */}
                {persona.statBand && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {persona.statBand.map((stat, index) => (
                      <div key={index} className="text-center">
                        <div className={`text-4xl font-bold text-${persona.color}-400 mb-2`}>
                          {stat.value}
                        </div>
                        <div className="text-slate-300 font-medium">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* FAQ */}
        {persona.faq && (
          <section className="py-20">
            <div className="container">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-white text-center mb-12">
                  Frequently Asked Questions
                </h2>
                
                <div className="space-y-6">
                  {persona.faq.map((item, index) => (
                    <details key={index} className="group bg-slate-900/60 border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-colors">
                      <summary className="flex items-center justify-between cursor-pointer text-lg font-semibold text-white group-open:mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900 rounded">
                        {item.q}
                        <svg className="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </summary>
                      <p className="text-slate-300 leading-relaxed">{item.a}</p>
                    </details>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* CTA Band */}
        <section className={`py-16 bg-gradient-to-r from-${persona.color}-600 to-${persona.color}-700`}>
          <div className="container text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Transform Your Workflow?
            </h2>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of {persona.name.toLowerCase()}s who are already saving time with Promptly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href={persona.primaryCTA?.href || '/pricing'}
                className="inline-flex items-center px-8 py-4 bg-white hover:bg-gray-100 text-gray-900 font-semibold rounded-lg transition-colors shadow-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-current"
              >
                {persona.primaryCTA?.label || 'Start Free Trial'}
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <Link 
                href={persona.secondaryCTA?.href || '/free-resources'}
                className="inline-flex items-center px-8 py-4 border-2 border-white hover:bg-white hover:text-gray-900 text-white font-semibold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-current"
              >
                {persona.secondaryCTA?.label || 'Free Resources'}
              </Link>
            </div>
          </div>
        </section>

        {/* Keep Exploring */}
        <section className="py-16 bg-slate-800/30">
          <div className="container">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">
                Keep Exploring
              </h2>
              <p className="text-slate-400">
                More resources to support your teaching
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <Link 
                href="/#snippet"
                className="inline-flex items-center px-6 py-3 bg-slate-700/60 hover:bg-slate-700/80 border border-white/10 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Try Snippet Tool
              </Link>
              <Link 
                href="/learning-centre"
                className="inline-flex items-center px-6 py-3 bg-slate-700/60 hover:bg-slate-700/80 border border-white/10 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
                Learning Centre
              </Link>
              <Link 
                href="/pricing"
                className={`inline-flex items-center px-6 py-3 bg-${persona.color}-600 hover:bg-${persona.color}-700 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-${persona.color}-500 focus:ring-offset-2 focus:ring-offset-slate-900`}
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                View Pricing
              </Link>
            </div>

            {/* Other Personas */}
            <div className="text-center">
              <p className="text-slate-400 mb-4">Explore solutions for other roles</p>
              <div className="flex flex-wrap justify-center gap-2">
                {PERSONAS.filter(p => p.slug !== persona.slug).map((otherPersona) => (
                  <Link
                    key={otherPersona.slug}
                    href={`/personas/${otherPersona.slug}`}
                    className="px-4 py-2 text-sm bg-slate-700/40 hover:bg-slate-700/60 text-slate-300 hover:text-white rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900"
                  >
                    {otherPersona.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}