import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'AI Comment Support for International Schools & Global Classrooms | Promptly',
  description: 'Promptly supports teachers worldwide with translation, cultural adaptability, and safe AI you can trust, so you can focus on teaching, not paperwork.',
  keywords: ['international teachers', 'global classrooms', 'international schools', 'multi-language', 'translation', 'cultural adaptability', 'multilingual education'],
  openGraph: {
    title: 'AI Comment Support for International Schools & Global Classrooms | Promptly',
    description: 'Translation and cultural adaptability for international teachers worldwide.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Comment Support for International Schools & Global Classrooms | Promptly',
    description: 'Translation and cultural adaptability for international teachers.',
  },
  alternates: {
    languages: {
      'en': '/solutions/international',
      'de-DE': '/solutions/international',
    },
  },
}

export default function InternationalPage() {
  return (
    <main className="min-h-screen bg-slate-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-teal-900/20 to-cyan-900/20 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              AI comment support built for international schools and global classrooms
            </h1>
            <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Promptly supports teachers worldwide with translation, cultural adaptability, and safe AI you can trust, so you can focus on teaching, not paperwork.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/pricing"
                className="bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 text-lg"
              >
                Start Free Trial
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
                <div className="w-12 h-12 bg-teal-600 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Multi-Language Support</h3>
                <p className="text-slate-300 mb-4">
                  Draft and translate comments in EN/DE/FR/ES/IT.
                </p>
                <ul className="text-slate-400 space-y-2">
                  <li>• English, German, French support</li>
                  <li>• Spanish and Italian translations</li>
                  <li>• Cultural tone adaptation</li>
                </ul>
              </div>

              <div className="bg-slate-800 rounded-xl p-8 border border-slate-700">
                <div className="w-12 h-12 bg-cyan-600 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Cultural Awareness</h3>
                <p className="text-slate-300 mb-4">
                  Professional tone adapted for diverse parent communities.
                </p>
                <ul className="text-slate-400 space-y-2">
                  <li>• Culturally sensitive language</li>
                  <li>• Regional communication styles</li>
                  <li>• Global education standards</li>
                </ul>
              </div>

              <div className="bg-slate-800 rounded-xl p-8 border border-slate-700">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Save Time Across Subjects</h3>
                <p className="text-slate-300 mb-4">
                  Instant drafts for reports, emails, and updates.
                </p>
                <ul className="text-slate-400 space-y-2">
                  <li>• Multiple curriculum support</li>
                  <li>• Fast multilingual drafts</li>
                  <li>• Global time zone support</li>
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
            <h2 className="text-3xl font-bold text-white mb-8">Trusted by International Educators Worldwide</h2>
            <p className="text-xl text-slate-300 mb-8">
              Dr. Greg Blackburn (PhD Professional Education) understands global education needs. Promptly provides culturally-aware, multilingual support that respects diverse learning communities.
            </p>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-teal-400 mb-2">PhD-Backed</div>
                <div className="text-slate-400">Global education expertise</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-cyan-400 mb-2">5+ Languages</div>
                <div className="text-slate-400">Multi-language support</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-400 mb-2">GDPR Safe</div>
                <div className="text-slate-400">International compliance</div>
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
              Ready to Connect with Global Communities?
            </h2>
            <p className="text-xl text-slate-300 mb-8">
              Join international teachers who trust Promptly for multilingual, culturally-aware communication.
            </p>
            <Link
              href="/pricing"
              className="bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white font-semibold py-4 px-12 rounded-lg transition-all duration-300 text-xl inline-block"
            >
              Start Free Trial
            </Link>
            <p className="text-slate-400 mt-4 text-sm">14-day free trial • Cancel anytime • No setup fees</p>
          </div>
        </div>
      </section>
    </main>
  )
}