import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Save Hours Every Week - UK Primary Teachers | Promptly',
  description: 'Promptly helps UK primary teachers with safe, ready-to-use comments aligned with EYFS and Key Stage 1–2, so you spend less time on paperwork and more time teaching.',
  keywords: ['UK primary teachers', 'EYFS', 'Key Stage 1', 'Key Stage 2', 'report comments', 'parent communication', 'teacher workload'],
  openGraph: {
    title: 'Save Hours Every Week - UK Primary Teachers | Promptly',
    description: 'Safe, EYFS-aligned comments for UK primary teachers. Spend less time on paperwork, more time teaching.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Save Hours Every Week - UK Primary Teachers | Promptly',
    description: 'Safe, EYFS-aligned comments for UK primary teachers.',
  },
  alternates: {
    languages: {
      'en-GB': '/solutions/uk-primary',
      'de-DE': '/solutions/uk-primary',
    },
  },
}

export default function UKPrimaryPage() {
  return (
    <main className="min-h-screen bg-slate-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-red-900/20 to-pink-900/20 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Save hours every week writing reports and parent updates for your UK primary class
            </h1>
            <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Promptly helps UK primary teachers with safe, ready-to-use comments aligned with EYFS and Key Stage 1–2, so you spend less time on paperwork and more time teaching.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/pricing"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 text-lg"
              >
                Start Free Trial — No Credit Card
              </Link>
              <Link
                href="/#examples"
                className="border-2 border-white text-white hover:bg-white hover:text-slate-900 font-semibold py-4 px-8 rounded-lg transition-all duration-300 text-lg"
              >
                See Example Comments
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-slate-800 rounded-xl p-8 border border-slate-700">
                <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Curriculum-Aligned Comments</h3>
                <p className="text-slate-300 mb-4">
                  Report comments matched to EYFS goals and National Curriculum subjects.
                </p>
                <ul className="text-slate-400 space-y-2">
                  <li>• EYFS Development Matters alignment</li>
                  <li>• National Curriculum subject references</li>
                  <li>• Age-appropriate language and expectations</li>
                </ul>
              </div>

              <div className="bg-slate-800 rounded-xl p-8 border border-slate-700">
                <div className="w-12 h-12 bg-pink-600 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Parent-Friendly Tone</h3>
                <p className="text-slate-300 mb-4">
                  Professional and caring wording that parents understand.
                </p>
                <ul className="text-slate-400 space-y-2">
                  <li>• Clear, jargon-free language</li>
                  <li>• Positive, constructive messaging</li>
                  <li>• Culturally sensitive approach</li>
                </ul>
              </div>

              <div className="bg-slate-800 rounded-xl p-8 border border-slate-700">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Time Back for Teaching</h3>
                <p className="text-slate-300 mb-4">
                  Reduce your Sunday night workload with one-click drafts.
                </p>
                <ul className="text-slate-400 space-y-2">
                  <li>• 80% faster report writing</li>
                  <li>• Instant parent communication drafts</li>
                  <li>• More time for lesson planning</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 bg-gradient-to-br from-slate-800 to-slate-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-8">Trusted by 12,000+ Teachers Worldwide</h2>
            <p className="text-xl text-slate-300 mb-8">
              Created by Dr. Greg Blackburn (PhD Professional Education), Promptly is GDPR-compliant and hallucination-resistant, so you can trust every suggestion.
            </p>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-blue-400 mb-2">PhD-Backed</div>
                <div className="text-slate-400">Educational expertise</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-400 mb-2">GDPR Safe</div>
                <div className="text-slate-400">Student data protected</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-pink-400 mb-2">12,000+</div>
                <div className="text-slate-400">Teachers trust Promptly</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Get Your Evenings Back?
            </h2>
            <p className="text-xl text-slate-300 mb-8">
              Join thousands of UK primary teachers saving hours every week with Promptly.
            </p>
            <Link
              href="/pricing"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-12 rounded-lg transition-all duration-300 text-xl inline-block"
            >
              Start Free Trial — No Credit Card
            </Link>
            <p className="text-slate-400 mt-4 text-sm">14-day free trial • Cancel anytime • No setup fees</p>
          </div>
        </div>
      </section>
    </main>
  )
}