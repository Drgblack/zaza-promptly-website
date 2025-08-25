import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Supportive, Personalised Communication - Special Education | Promptly',
  description: 'Promptly helps SEN teachers create thoughtful IEP-aligned comments and parent messages with extra care and empathy, without adding to your workload.',
  keywords: ['special education', 'SEN', 'SENCO', 'IEP', 'special needs teachers', 'individualised education', 'empathy', 'parent communication'],
  openGraph: {
    title: 'Supportive, Personalised Communication - Special Education | Promptly',
    description: 'Thoughtful, IEP-aligned communication tools for Special Education teachers.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Supportive, Personalised Communication - Special Education | Promptly',
    description: 'Thoughtful communication tools for Special Education teachers.',
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
              Supportive, personalised communication for Special Education needs
            </h1>
            <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Promptly helps SEN teachers create thoughtful IEP-aligned comments and parent messages with extra care and empathy, without adding to your workload.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/#examples"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 text-lg"
              >
                See Example Comments
              </Link>
              <Link
                href="/pricing"
                className="border-2 border-white text-white hover:bg-white hover:text-slate-900 font-semibold py-4 px-8 rounded-lg transition-all duration-300 text-lg"
              >
                Start Free Trial
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
                <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">IEP-Sensitive Drafts</h3>
                <p className="text-slate-300 mb-4">
                  Respectful, individualised comments aligned to learning goals.
                </p>
                <ul className="text-slate-400 space-y-2">
                  <li>• IEP goal alignment</li>
                  <li>• Strength-based language</li>
                  <li>• Progress-focused messaging</li>
                </ul>
              </div>

              <div className="bg-slate-800 rounded-xl p-8 border border-slate-700">
                <div className="w-12 h-12 bg-pink-600 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Empathy Built-In</h3>
                <p className="text-slate-300 mb-4">
                  Tone options that reflect care, patience, and encouragement.
                </p>
                <ul className="text-slate-400 space-y-2">
                  <li>• Compassionate language choices</li>
                  <li>• Celebrating small victories</li>
                  <li>• Encouraging growth mindset</li>
                </ul>
              </div>

              <div className="bg-slate-800 rounded-xl p-8 border border-slate-700">
                <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Reduce Stress</h3>
                <p className="text-slate-300 mb-4">
                  Simplify documentation and communication without losing nuance.
                </p>
                <ul className="text-slate-400 space-y-2">
                  <li>• Faster documentation</li>
                  <li>• Consistent positive tone</li>
                  <li>• More time for students</li>
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
            <h2 className="text-3xl font-bold text-white mb-8">Created with Special Education in Mind</h2>
            <p className="text-xl text-slate-300 mb-8">
              Dr. Greg Blackburn (PhD Professional Education) understands the unique challenges of SEN teaching. Promptly provides safe, empathetic communication tools that respect every child's journey.
            </p>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-purple-400 mb-2">PhD-Backed</div>
                <div className="text-slate-400">Educational expertise</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-pink-400 mb-2">Empathy-First</div>
                <div className="text-slate-400">Strength-based approach</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-indigo-400 mb-2">Safe &amp; Secure</div>
                <div className="text-slate-400">GDPR compliant</div>
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
              Ready to Support Your Students Better?
            </h2>
            <p className="text-xl text-slate-300 mb-8">
              Join Special Education teachers who trust Promptly for thoughtful, individualised communication.
            </p>
            <Link
              href="/#examples"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-4 px-12 rounded-lg transition-all duration-300 text-xl inline-block"
            >
              See Example Comments
            </Link>
            <p className="text-slate-400 mt-4 text-sm">14-day free trial • Cancel anytime • No setup fees</p>
          </div>
        </div>
      </section>
    </main>
  )
}