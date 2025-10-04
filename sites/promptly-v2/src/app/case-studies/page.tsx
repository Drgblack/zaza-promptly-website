import { Metadata } from 'next'
import CaseStudyCard from '@/components/case-studies/CaseStudyCard'
import { getAllCaseStudies } from '@/content/case-studies'

// Disable static generation - render pages dynamically to prevent build errors
export const dynamic = 'force-dynamic'
export const revalidate = 0

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.zazapromptly.com'

export const metadata: Metadata = {
  title: 'Case Studies | Draft - Real Stories from Educators',
  description: 'Discover how teachers worldwide are saving time, improving feedback, and transforming their practice with Draft. Real stories, measurable results.',
  alternates: {
    canonical: `${baseUrl}/case-studies`,
  },
  openGraph: {
    title: 'Case Studies | Draft',
    description: 'Real stories from educators transforming their practice with AI-powered teaching tools',
    type: 'website',
    url: 'https://www.zazapromptly.com/case-studies',
  },
}

export default async function CaseStudiesPage() {
  const caseStudies = getAllCaseStudies()
  
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    numberOfItems: caseStudies.length,
    itemListElement: caseStudies.map((caseStudy, index) => ({
      '@type': 'Article',
      position: index + 1,
      url: `https://www.zazapromptly.com/case-studies/${caseStudy.slug}`,
      headline: caseStudy.title,
      description: caseStudy.excerpt,
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
      datePublished: caseStudy.dateISO,
      ...(caseStudy.cover && { image: caseStudy.cover })
    }))
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="min-h-screen bg-slate-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <header className="mx-auto max-w-3xl text-center py-10 sm:py-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-white">
              Real Stories from the Classroom
            </h1>
            <p className="mt-3 text-slate-300">
              Discover how educators worldwide are transforming their practice with Draft.
            </p>
          </header>

          <ul
            className={[
              "grid gap-6",
              "sm:grid-cols-2 lg:grid-cols-3",
              "auto-rows-fr", // ensure equal-height rows
            ].join(" ")}
          >
            {caseStudies.map(cs => (
              <CaseStudyCard
                key={cs.slug}
                href={`/case-studies/${cs.slug}`}
                kicker={cs.kicker}
                title={cs.title}
                excerpt={cs.excerpt}
                cover={cs.cover}
                heroAlt={cs.heroAlt}
                author={cs.author}
                org={cs.org}
                date={new Date(cs.dateISO).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}
              />
            ))}
          </ul>

          {/* CTA band */}
          <section className="mx-auto mt-14 mb-12 max-w-3xl rounded-2xl border border-white/10 bg-slate-900/50 p-6 text-center">
            <h2 className="text-lg font-semibold text-white">Ready to write your success story?</h2>
            <p className="mt-2 text-slate-300">Join thousands of educators saving hours every week with Draft.</p>
            <div className="mt-4 flex justify-center gap-3">
              <a className="rounded-xl bg-indigo-500 px-4 py-2 text-white hover:bg-indigo-400" href="/waitlist">Get Started</a>
              <a className="rounded-xl border border-white/10 px-4 py-2 text-slate-100 hover:bg-white/5" href="/blog">Read Our Blog</a>
            </div>
          </section>
        </div>
      </main>
    </>
  )
}