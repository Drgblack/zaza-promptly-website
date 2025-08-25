import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Confident Report Comments & Parent Messages - US Secondary | Promptly',
  description: 'Promptly understands the demands of US teaching — from Common Core to state standards — and helps you draft professional, parent-friendly communication in seconds.',
  keywords: ['US secondary teachers', 'middle school', 'high school', 'Common Core', 'state standards', 'parent communication', 'report writing'],
  openGraph: {
    title: 'Confident Report Comments & Parent Messages - US Secondary | Promptly',
    description: 'Professional, parent-friendly communication tools for US middle & high school teachers.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Confident Report Comments & Parent Messages - US Secondary | Promptly',
    description: 'Professional communication tools for US secondary teachers.',
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
              Confident report comments and parent messages for US middle &amp; high school teachers
            </h1>
            <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Promptly understands the demands of US teaching — from Common Core to state standards — and helps you draft professional, parent-friendly communication in seconds.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/pricing"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 text-lg"
              >
                Try Promptly Free →
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
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Standards-Friendly</h3>
                <p className="text-slate-300 mb-4">
                  Comments designed around Common Core and state requirements.
                </p>
                <ul className="text-slate-400 space-y-2">
                  <li>• Common Core alignment</li>
                  <li>• State standards integration</li>
                  <li>• Grade-appropriate expectations</li>
                </ul>
              </div>

              <div className="bg-slate-800 rounded-xl p-8 border border-slate-700">
                <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Behaviour &amp; Progress Notes</h3>
                <p className="text-slate-300 mb-4">
                  Balanced, supportive language for sensitive topics.
                </p>
                <ul className="text-slate-400 space-y-2">
                  <li>• Constructive behavioral feedback</li>
                  <li>• Academic progress tracking</li>
                  <li>• Parent-friendly explanations</li>
                </ul>
              </div>

              <div className="bg-slate-800 rounded-xl p-8 border border-slate-700">
                <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Save Time, Reduce Stress</h3>
                <p className="text-slate-300 mb-4">
                  Finish parent emails and progress reports faster.
                </p>
                <ul className="text-slate-400 space-y-2">
                  <li>• 80% faster communication drafts</li>
                  <li>• Consistent professional tone</li>
                  <li>• More time for instruction</li>
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
            <h2 className="text-3xl font-bold text-white mb-8">Built for US Teachers, by Educators</h2>
            <p className="text-xl text-slate-300 mb-8">
              Dr. Greg Blackburn (PhD Professional Education) understands US educational demands. Promptly is GDPR-compliant and hallucination-resistant, trusted by thousands of teachers.
            </p>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-blue-400 mb-2">PhD-Backed</div>
                <div className="text-slate-400">Educational expertise</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-indigo-400 mb-2">US Standards</div>
                <div className="text-slate-400">Common Core aligned</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-400 mb-2">12,000+</div>
                <div className="text-slate-400">Teachers worldwide</div>
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
              Ready to Streamline Your Communication?
            </h2>
            <p className="text-xl text-slate-300 mb-8">
              Join US secondary teachers who save hours every week with professional, parent-friendly communication.
            </p>
            <Link
              href="/pricing"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-12 rounded-lg transition-all duration-300 text-xl inline-block"
            >
              Try Promptly Free →
            </Link>
            <p className="text-slate-400 mt-4 text-sm">14-day free trial • Cancel anytime • No setup fees</p>
          </div>
        </div>
      </section>
    </main>
  )
}