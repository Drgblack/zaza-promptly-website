import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Advanced Teacher Tools & Presets | Zaza Promptly',
  description: 'Custom tone/length presets, reusable libraries, and integration-ready exports for EdTech-savvy teachers.',
  keywords: ['edtech teachers', 'technology integration', 'API access', 'advanced AI tools', 'teacher productivity', 'custom presets'],
  openGraph: {
    title: 'Advanced Teacher Tools & Presets | Zaza Promptly',
    description: 'Custom tone/length presets, reusable libraries, and integration-ready exports for EdTech-savvy teachers.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Advanced Teacher Tools & Presets | Zaza Promptly',
    description: 'Custom tone/length presets, reusable libraries, and integration-ready exports for EdTech-savvy teachers.',
  },
}

export default function EdTechSavvyPage() {
  return (
    <main className="min-h-screen bg-slate-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-900/20 to-amber-900/20 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Advanced features for education innovators
            </h1>
            <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              You're always exploring the latest EdTech tools to improve your practice. Promptly's advanced features help you create systematic, scalable communication workflows that adapt as your teaching evolves.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/pricing"
                className="bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 text-lg"
              >
                Start Free
              </Link>
              <Link
                href="/snippet"
                className="border-2 border-white text-white hover:bg-white hover:text-slate-900 font-semibold py-4 px-8 rounded-lg transition-all duration-300 text-lg"
              >
                Try the demo
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
                <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Custom tone profiles</h3>
                <p className="text-slate-300">
                  Build signature communication styles—create "Warm Progress Update" or "Formal Academic Concern" presets that match your teaching philosophy.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-6">
                <div className="w-12 h-12 bg-amber-600 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Scalable content libraries</h3>
                <p className="text-slate-300">
                  Organize your best comments by subject, learning objective, or student need—build a system that grows with your expertise.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-6">
                <div className="w-12 h-12 bg-yellow-600 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Future-ready workflows</h3>
                <p className="text-slate-300">
                  Seamless export to your school's systems—with API access coming to connect your entire EdTech ecosystem.
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
              Fast, reliable, educator-built
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/pricing"
                className="bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300"
              >
                Start Free
              </Link>
              <Link
                href="/snippet"
                className="border border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300"
              >
                Try the demo
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
                <h3 className="text-xl font-semibold text-white mb-3">Can I share presets with my department?</h3>
                <p className="text-slate-300">Yes—team sharing is supported/road-mapped.</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-6">
                <h3 className="text-xl font-semibold text-white mb-3">Is there an API?</h3>
                <p className="text-slate-300">Public API is planned; register interest on the page.</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-6">
                <h3 className="text-xl font-semibold text-white mb-3">Will this stay teacher-first?</h3>
                <p className="text-slate-300">Yes—advanced features never add friction.</p>
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
              Try Promptly Free — Build your teaching system
            </h2>
            <p className="text-xl text-slate-300 mb-8">
              Join education innovators who've made Promptly the backbone of their communication workflow.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/pricing"
                className="bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-semibold py-4 px-12 rounded-lg transition-all duration-300 text-xl"
              >
                Start Free
              </Link>
              <Link
                href="/about"
                className="border border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white font-semibold py-4 px-12 rounded-lg transition-all duration-300 text-xl"
              >
                About Our Approach
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}