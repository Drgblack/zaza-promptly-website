import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'UK Primary Teacher Comment Helper | Zaza Promptly',
  description: 'EYFS & Key Stage-aligned report comments and parent messages—save hours every week with safe, teacher-first AI.',
  keywords: ['UK primary teachers', 'EYFS', 'Key Stage 1', 'Key Stage 2', 'report comments', 'parent communication', 'teacher workload'],
  openGraph: {
    title: 'UK Primary Teacher Comment Helper | Zaza Promptly',
    description: 'EYFS & Key Stage-aligned report comments and parent messages—save hours every week with safe, teacher-first AI.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'UK Primary Teacher Comment Helper | Zaza Promptly',
    description: 'EYFS & Key Stage-aligned report comments and parent messages—save hours every week with safe, teacher-first AI.',
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
              Spend less time on reports—more time with your class.
            </h1>
            <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Promptly helps UK primary teachers write clear, parent-friendly comments aligned with EYFS and Key Stage 1–2, so Sunday nights aren't for paperwork.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/pricing"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 text-lg"
              >
                Start Free Trial
              </Link>
              <Link
                href="/snippet"
                className="border-2 border-white text-white hover:bg-white hover:text-slate-900 font-semibold py-4 px-8 rounded-lg transition-all duration-300 text-lg"
              >
                See a quick demo
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
                <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Curriculum-aligned comments</h3>
                <p className="text-slate-300">
                  Report lines that reference EYFS goals and National Curriculum areas. Helpful, age-appropriate language for pupils and families.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-6">
                <div className="w-12 h-12 bg-pink-600 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Parent-friendly tone</h3>
                <p className="text-slate-300">
                  Warm, professional wording that's easy to understand—great for sensitive messages and everyday updates.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-6">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Time back for teaching</h3>
                <p className="text-slate-300">
                  Draft in seconds, then personalise. Save your favourites as reusable snippets for next term.
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
              Trusted by 10,000+ teachers • GDPR compliant • Hallucination-resistant
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/pricing"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300"
              >
                Start Free Trial
              </Link>
              <Link
                href="/snippet"
                className="border border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300"
              >
                See a quick demo
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
                <h3 className="text-xl font-semibold text-white mb-3">Does Promptly cover EYFS/KS1/KS2?</h3>
                <p className="text-slate-300">Yes—comments are written for UK primary contexts.</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-6">
                <h3 className="text-xl font-semibold text-white mb-3">Will it write everything for me?</h3>
                <p className="text-slate-300">It drafts sensible wording—you stay in control.</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-6">
                <h3 className="text-xl font-semibold text-white mb-3">Is it safe for pupil data?</h3>
                <p className="text-slate-300">Yes—see our Student Privacy page.</p>
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
              Ready to Get Your Evenings Back?
            </h2>
            <p className="text-xl text-slate-300 mb-8">
              Join thousands of UK primary teachers saving hours every week with Promptly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/pricing"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-12 rounded-lg transition-all duration-300 text-xl"
              >
                Start Free Trial
              </Link>
              <Link
                href="/snippet"
                className="border border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white font-semibold py-4 px-12 rounded-lg transition-all duration-300 text-xl"
              >
                See a quick demo
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}