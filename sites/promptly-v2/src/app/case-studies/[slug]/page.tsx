import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getCaseStudyMeta, getCaseStudySlugs, getRelatedCaseStudies, calculateReadingTime } from '@/lib/case-studies'
import CaseStudyCard from '@/components/marketing/CaseStudyCard'

type Props = {
  params: { slug: string }
}

export async function generateStaticParams() {
  const slugs = getCaseStudySlugs()
  return slugs.map((slug) => ({
    slug,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const caseStudy = await getCaseStudyMeta(params.slug)
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.zazapromptly.com'
  
  if (!caseStudy) {
    return {
      title: 'Case Study Not Found | Promptly',
      alternates: {
        canonical: '/404',
      },
    }
  }

  const { metadata } = caseStudy
  const caseStudyUrl = `${baseUrl}/case-studies/${params.slug}`

  return {
    title: `${metadata.title} | Promptly Case Studies`,
    description: metadata.description,
    authors: [{ name: metadata.author }],
    alternates: {
      canonical: `/case-studies/${params.slug}`,
    },
    openGraph: {
      title: metadata.title,
      description: metadata.description,
      type: 'article',
      publishedTime: new Date(metadata.date).toISOString(),
      authors: [metadata.author],
      url: caseStudyUrl,
      images: [
        {
          url: metadata.image || '/og-default.png',
          width: 1200,
          height: 630,
          alt: metadata.title,
        },
      ],
      siteName: 'Promptly',
    },
    twitter: {
      card: 'summary_large_image',
      title: metadata.title,
      description: metadata.description,
      images: [metadata.image || '/og-default.png'],
    },
  }
}

export default async function CaseStudyPage({ params }: Props) {
  const caseStudy = await getCaseStudyMeta(params.slug)
  
  if (!caseStudy) {
    notFound()
  }

  // Dynamically import the MDX case study
  let CaseStudyContent
  try {
    const caseStudyModule = await import(`../../../../content/case-studies/${params.slug}.mdx`)
    CaseStudyContent = caseStudyModule.default
  } catch (error) {
    console.error(`Failed to load case study ${params.slug}:`, error)
    notFound()
  }

  // Get related case studies and reading time
  const relatedCaseStudies = await getRelatedCaseStudies(params.slug)
  const readingTime = calculateReadingTime(caseStudy.content)

  const { metadata } = caseStudy

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
    headline: metadata.title,
    description: metadata.description,
    image: metadata.image,
    author: {
      '@type': 'Person',
      name: metadata.author,
      jobTitle: metadata.role,
      worksFor: {
        '@type': 'EducationalOrganization',
        name: metadata.school
      }
    },
    publisher: {
      '@type': 'Organization',
      name: 'Promptly',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.zazapromptly.com/logo.png'
      }
    },
    datePublished: new Date(metadata.date).toISOString(),
    dateModified: new Date(metadata.date).toISOString(),
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
                    {metadata.title}
                  </span>
                </li>
              </ol>
            </nav>

            <div className="max-w-4xl mx-auto">
              <div className="mb-6">
                <div className="inline-flex items-center px-3 py-1 bg-brand-600/20 text-brand-400 text-sm rounded-full">
                  Case Study
                </div>
              </div>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-white mb-6">
                {metadata.title}
              </h1>
              
              <p className="text-xl text-slate-300 mb-8">
                {metadata.description}
              </p>
              
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-slate-400">
                <div className="flex items-center gap-4">
                  <div>
                    <span className="font-semibold text-white">{metadata.author}</span>
                    <div className="text-sm">
                      {metadata.role} at {metadata.school}
                    </div>
                  </div>
                </div>
                <div className="hidden sm:block">•</div>
                <div className="flex items-center gap-4 text-sm">
                  <span>{formatDate(metadata.date)}</span>
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
              <article className="prose prose-invert prose-lg max-w-none">
                <CaseStudyContent />
              </article>
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
                    <CaseStudyCard 
                      key={relatedCaseStudy.slug} 
                      caseStudy={relatedCaseStudy}
                    />
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
              Join {metadata.author} and thousands of other educators saving time with Promptly.
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