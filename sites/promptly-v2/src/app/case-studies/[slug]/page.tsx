import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getCaseStudy, getAllCaseStudies, getRelatedCaseStudies, calculateReadingTime, CASE_STUDIES } from '@/content/case-studies'

// Disable static generation - render pages dynamically to prevent build errors
export const dynamic = 'force-dynamic'
export const revalidate = 0

type Props = {
  params: { slug: string }
}

export async function generateStaticParams() {
  return CASE_STUDIES.map((caseStudy) => ({
    slug: caseStudy.slug,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const caseStudy = getCaseStudy(params.slug)
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.zazapromptly.com'
  
  if (!caseStudy) {
    return {
      title: 'Case Study Not Found | Promptly',
      alternates: {
        canonical: '/404',
      },
    }
  }

  const caseStudyUrl = `${baseUrl}/case-studies/${params.slug}`

  return {
    title: `${caseStudy.title} | Promptly Case Studies`,
    description: caseStudy.excerpt,
    authors: [{ name: caseStudy.author }],
    alternates: {
      canonical: `/case-studies/${params.slug}`,
    },
    openGraph: {
      title: caseStudy.title,
      description: caseStudy.excerpt,
      type: 'article',
      publishedTime: new Date(caseStudy.dateISO).toISOString(),
      authors: [caseStudy.author],
      url: caseStudyUrl,
      images: [
        {
          url: caseStudy.cover || '/og-default.png',
          width: 1200,
          height: 630,
          alt: caseStudy.heroAlt || caseStudy.title,
        },
      ],
      siteName: 'Promptly',
    },
    twitter: {
      card: 'summary_large_image',
      title: caseStudy.title,
      description: caseStudy.excerpt,
      images: [caseStudy.cover || '/og-default.png'],
    },
  }
}

export default async function CaseStudyPage({ params }: Props) {
  const caseStudy = getCaseStudy(params.slug)
  
  if (!caseStudy) {
    notFound()
  }

  // Get related case studies and reading time
  const relatedCaseStudies = getRelatedCaseStudies(params.slug)
  const readingTime = calculateReadingTime(caseStudy.body)

  // Simple markdown renderer for body content
  const renderMarkdown = (content: string) => {
    let result = content
      .replace(/^### (.*$)/gm, '<h3 class="text-xl font-semibold text-white mb-4 mt-8">$1</h3>')
      .replace(/^## (.*$)/gm, '<h2 class="text-2xl font-semibold text-white mb-6 mt-10">$1</h2>')
      .replace(/^# (.*$)/gm, '<h1 class="text-3xl font-bold text-white mb-8 mt-12">$1</h1>')
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-white">$1</strong>')
      .replace(/^- (.*$)/gm, '<li class="text-slate-300 mb-2">$1</li>')
      .replace(/^> (.*$)/gm, '<blockquote class="border-l-4 border-brand-500 pl-4 italic text-slate-300 bg-slate-800/50 p-4 rounded-r-lg mb-6">$1</blockquote>')
      .replace(/\n\n/g, '</p><p class="text-slate-300 mb-6 leading-relaxed">')
    
    // Convert list items to proper ul wrapper (without 's' flag)
    result = result.replace(/(<li.*<\/li>)/g, '<ul class="list-disc list-inside mb-6 space-y-2">$1</ul>')
    
    // Add paragraph tags to remaining content
    result = result.replace(/^(?!<[h|u|b|l])(.*$)/gm, '<p class="text-slate-300 mb-6 leading-relaxed">$1</p>')
    
    return result
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long', 
      day: 'numeric'
    })
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: caseStudy.title,
    description: caseStudy.excerpt,
    ...(caseStudy.cover && { image: caseStudy.cover }),
    author: {
      '@type': 'Person',
      name: caseStudy.author,
      jobTitle: caseStudy.role,
      worksFor: {
        '@type': 'EducationalOrganization',
        name: caseStudy.org
      }
    },
    publisher: {
      '@type': 'Organization',
      name: 'Zaza Technologies',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.zazapromptly.com/images/zaza-logo.png'
      }
    },
    datePublished: new Date(caseStudy.dateISO).toISOString(),
    dateModified: new Date(caseStudy.dateISO).toISOString(),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://www.zazapromptly.com/case-studies/${params.slug}`
    },
    about: 'education',
    articleSection: 'Case Studies',
    keywords: ['education', 'teaching', 'AI', 'teacher tools', 'classroom management']
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="min-h-screen bg-slate-900">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-slate-800 to-slate-900 py-20">
          <div className="container">
            {/* Breadcrumb */}
            <nav className="mb-8 max-w-4xl mx-auto" aria-label="Breadcrumb">
              <ol className="flex items-center space-x-2 text-sm text-slate-400">
                <li>
                  <Link href="/" className="hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </li>
                <li>
                  <Link href="/case-studies" className="hover:text-white transition-colors">
                    Case Studies
                  </Link>
                </li>
                <li>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </li>
                <li>
                  <span className="text-white font-medium">
                    {caseStudy.title}
                  </span>
                </li>
              </ol>
            </nav>

            <div className="max-w-4xl mx-auto">
              <div className="mb-6">
                <div className="inline-flex items-center px-3 py-1 bg-brand-600/20 text-brand-400 text-sm rounded-full">
                  {caseStudy.kicker || 'Case Study'}
                </div>
              </div>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-white mb-6">
                {caseStudy.title}
              </h1>
              
              <p className="text-xl text-slate-300 mb-8">
                {caseStudy.excerpt}
              </p>
              
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-slate-400">
                <div className="flex items-center gap-4">
                  <div>
                    <span className="font-semibold text-white">{caseStudy.author}</span>
                    <div className="text-sm">
                      {caseStudy.role} at {caseStudy.org}
                    </div>
                  </div>
                </div>
                <div className="hidden sm:block">•</div>
                <div className="flex items-center gap-4 text-sm">
                  <span>{formatDate(caseStudy.dateISO)}</span>
                  <span>•</span>
                  <span>{readingTime} min read</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Article Content */}
        <section className="section">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <article 
                className="prose prose-invert prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: renderMarkdown(caseStudy.body) }}
              />
            </div>
          </div>
        </section>

        {/* Related Case Studies */}
        {relatedCaseStudies.length > 0 && (
          <section className="border-t border-white/10 py-16">
            <div className="container">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-2xl font-semibold text-white mb-8 text-center">
                  More Success Stories
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {relatedCaseStudies.map((relatedCaseStudy) => (
                    <div 
                      key={relatedCaseStudy.slug}
                      className="group bg-slate-800/60 rounded-2xl border border-white/10 hover:bg-slate-800 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 overflow-hidden"
                    >
                      <Link href={`/case-studies/${relatedCaseStudy.slug}`} className="block">
                        {/* Content */}
                        <div className="p-6">
                          <div className="inline-flex items-center px-2.5 py-1 bg-brand-600/20 text-brand-400 text-xs font-medium rounded-full mb-3">
                            {relatedCaseStudy.kicker || 'Case Study'}
                          </div>
                          <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-brand-300 transition-colors line-clamp-2">
                            {relatedCaseStudy.title}
                          </h3>
                          
                          <p className="text-slate-400 mb-4 line-clamp-2 leading-relaxed">
                            {relatedCaseStudy.excerpt}
                          </p>
                          
                          {/* Author Info */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-gradient-to-br from-brand-600 to-brand-800 rounded-full flex items-center justify-center">
                                <span className="text-white font-semibold text-sm">
                                  {relatedCaseStudy.author.split(' ').map(n => n[0]).join('')}
                                </span>
                              </div>
                              <div>
                                <div className="font-medium text-white text-sm">
                                  {relatedCaseStudy.author}
                                </div>
                                <div className="text-slate-500 text-xs">
                                  {relatedCaseStudy.role}
                                </div>
                              </div>
                            </div>
                            
                            <div className="text-right">
                              <div className="text-slate-500 text-xs">
                                {relatedCaseStudy.org}
                              </div>
                            </div>
                          </div>
                          
                          {/* Read More */}
                          <div className="flex items-center text-brand-400 text-sm font-medium mt-4 group-hover:text-brand-300 transition-colors">
                            Read case study
                            <svg className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="bg-slate-800/50 py-16">
          <div className="container text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Transform Your Teaching?
            </h2>
            <p className="text-xl text-slate-300 mb-8">
              Join {caseStudy.author} and thousands of other educators saving time with Promptly.
            </p>
            <Link 
              href="/waitlist"
              className="inline-flex items-center px-8 py-4 bg-brand-600 hover:bg-brand-700 text-white font-semibold rounded-lg transition-colors shadow-card focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 focus:ring-offset-slate-900"
            >
              Start Your Free Trial
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </section>
      </div>
    </>
  )
}