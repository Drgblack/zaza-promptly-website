import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'US Secondary Teacher Comments & Parent Emails | Zaza Promptly',
  description: 'Standards-friendly, parent-readable comments for US middle & high school—save time and reduce stress.',
  keywords: ['US secondary teachers', 'middle school', 'high school', 'Common Core', 'state standards', 'parent communication', 'report writing'],
  openGraph: {
    title: 'US Secondary Teacher Comments & Parent Emails | Zaza Promptly',
    description: 'Standards-friendly, parent-readable comments for US middle & high school—save time and reduce stress.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'US Secondary Teacher Comments & Parent Emails | Zaza Promptly',
    description: 'Standards-friendly, parent-readable comments for US middle & high school—save time and reduce stress.',
  },
  alternates: {
    languages: {
      'en-US': '/solutions/us-secondary',
      'de-DE': '/solutions/us-secondary',
    },
  },
}

export default function USSecondaryPage() {
  return (
    <main className="min-h-screen bg-slate-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900/20 to-indigo-900/20 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Confident report comments and parent messages—without the late nights.
            </h1>
            <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Promptly supports US middle &amp; high school teachers with clear, standards-friendly comments and balanced language for behaviour and progress.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/pricing"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 text-lg"
              >
                Try Promptly Free
              </Link>
              <Link
                href="/snippet"
                className="border-2 border-white text-white hover:bg-white hover:text-slate-900 font-semibold py-4 px-8 rounded-lg transition-all duration-300 text-lg"
              >
                See example comments
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
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Standards-friendly wording</h3>
                <p className="text-slate-300">
                  Drafts that reflect Common Core and state expectations while staying practical for your classroom.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-6">
                <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Sensitive topics, handled well</h3>
                <p className="text-slate-300">
                  Balanced language for behaviour, attendance, and progress—firm, respectful, and parent-readable.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-6">
                <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Faster, calmer workflow</h3>
                <p className="text-slate-300">
                  Turn notes into comments in seconds. Adjust tone/length, save as snippets, stay consistent across classes.
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
              Used by 10,000+ teachers • Hallucination-resistant • No credit card to start
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/pricing"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300"
              >
                Try Promptly Free
              </Link>
              <Link
                href="/snippet"
                className="border border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300"
              >
                See example comments
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
                <h3 className="text-xl font-semibold text-white mb-3">Can I choose tone and length?</h3>
                <p className="text-slate-300">Yes—Neutral, Warm, Formal and Short/Medium/Full.</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-6">
                <h3 className="text-xl font-semibold text-white mb-3">Does it keep my data?</h3>
                <p className="text-slate-300">We minimise data and offer deletion/export controls.</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-6">
                <h3 className="text-xl font-semibold text-white mb-3">Will it invent facts?</h3>
                <p className="text-slate-300">We tune for reliability; you still approve every draft.</p>
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
              Ready to Streamline Your Communication?
            </h2>
            <p className="text-xl text-slate-300 mb-8">
              Join US secondary teachers who save hours every week with professional, parent-friendly communication.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/pricing"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-12 rounded-lg transition-all duration-300 text-xl"
              >
                Try Promptly Free
              </Link>
              <Link
                href="/snippet"
                className="border border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white font-semibold py-4 px-12 rounded-lg transition-all duration-300 text-xl"
              >
                See example comments
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}