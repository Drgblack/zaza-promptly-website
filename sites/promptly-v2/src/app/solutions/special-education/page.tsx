import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Special Education (SEN) Comment Helper | Zaza Promptly',
  description: 'IEP-aware, empathetic comments and parent messages—reduce admin while staying personal and respectful.',
  keywords: ['special education', 'SEN', 'SENCO', 'IEP', 'special needs teachers', 'individualised education', 'empathy', 'parent communication'],
  openGraph: {
    title: 'Special Education (SEN) Comment Helper | Zaza Promptly',
    description: 'IEP-aware, empathetic comments and parent messages—reduce admin while staying personal and respectful.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Special Education (SEN) Comment Helper | Zaza Promptly',
    description: 'IEP-aware, empathetic comments and parent messages—reduce admin while staying personal and respectful.',
  },
  alternates: {
    languages: {
      'en-GB': '/solutions/special-education',
      'de-DE': '/solutions/special-education',
    },
  },
}

export default function SpecialEducationPage() {
  return (
    <main className="min-h-screen bg-slate-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Thoughtful, IEP-sensitive communication—ready to personalise.
            </h1>
            <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Promptly helps Special Education teachers create caring, goal-aligned comments and parent messages without losing nuance or time.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/snippet"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 text-lg"
              >
                See example comments
              </Link>
              <Link
                href="/pricing"
                className="border-2 border-white text-white hover:bg-white hover:text-slate-900 font-semibold py-4 px-8 rounded-lg transition-all duration-300 text-lg"
              >
                Start Free
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
              <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-6">
                <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">IEP-aware drafts</h3>
                <p className="text-slate-300">
                  Respectful language aligned to individual learning goals and accommodations.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-6">
                <div className="w-12 h-12 bg-pink-600 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Care, clarity, and dignity</h3>
                <p className="text-slate-300">
                  Tone options designed for sensitive contexts—supportive, patient, and precise.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-6">
                <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Less admin, more support</h3>
                <p className="text-slate-300">
                  Draft quickly, then adapt to the student. Save personalised templates for future reviews.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Proof/CTA band */}
      <section className="py-16 bg-gradient-to-br from-slate-800 to-slate-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-lg text-slate-300 mb-8">
              Designed with educators • Privacy-first • Easy to adapt
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/snippet"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300"
              >
                See example comments
              </Link>
              <Link
                href="/pricing"
                className="border border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300"
              >
                Start Free
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">Frequently Asked Questions</h2>
            <div className="space-y-8">
              <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-6">
                <h3 className="text-xl font-semibold text-white mb-3">Is it personalised enough?</h3>
                <p className="text-slate-300">It drafts thoughtfully—you add specifics.</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-6">
                <h3 className="text-xl font-semibold text-white mb-3">Can I keep my own phrasing?</h3>
                <p className="text-slate-300">Yes—save custom snippets and reuse.</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-6">
                <h3 className="text-xl font-semibold text-white mb-3">Does it handle translation?</h3>
                <p className="text-slate-300">Yes—common school languages supported.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Support Your Students Better?
            </h2>
            <p className="text-xl text-slate-300 mb-8">
              Join Special Education teachers who trust Promptly for thoughtful, individualised communication.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/snippet"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-4 px-12 rounded-lg transition-all duration-300 text-xl"
              >
                See example comments
              </Link>
              <Link
                href="/pricing"
                className="border border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white font-semibold py-4 px-12 rounded-lg transition-all duration-300 text-xl"
              >
                Start Free
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}