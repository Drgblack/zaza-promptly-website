import type { Metadata } from 'next'
import Link from 'next/link'
import ScrollReveal from '@/components/animations/ScrollReveal'

export const metadata: Metadata = {
  title: 'Quick Comment Helper | Free AI Writing Tool for Teachers',
  description: 'Try our free comment helper - transform your rough draft into professional parent communication in seconds. No signup required.',
  keywords: ['free AI for teachers', 'comment helper', 'parent communication tool', 'teacher writing assistant'],
}

export default function ClassroomToolPage() {
  return (
    <div className="min-h-screen bg-slate-900">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 to-indigo-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Quick Comment Helper
              </h1>
              <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
                Transform your rough drafts into professional parent communications in seconds. 
                <strong className="text-blue-400"> No signup required.</strong>
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Link 
                  href="/#demo"
                  className="inline-flex items-center px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors shadow-xl text-lg"
                >
                  Try the Free Tool
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </Link>
                <Link 
                  href="/signup"
                  className="inline-flex items-center px-8 py-4 border-2 border-slate-600 text-slate-300 hover:bg-slate-800/50 font-semibold rounded-lg transition-colors text-lg"
                >
                  Get 5 Free Comments This Month
                </Link>
              </div>

              <p className="text-slate-400 text-sm">
                Perfect for report cards, parent emails, and behavior notes
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-slate-800/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-white mb-4">
                  From draft to done in 30 seconds
                </h2>
                <p className="text-slate-300 max-w-2xl mx-auto">
                  Write what you really want to say, then let our AI make it sound professional and parent-friendly.
                </p>
              </div>
            </ScrollReveal>

            <div className="grid md:grid-cols-3 gap-8">
              <ScrollReveal delay={0.1}>
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-600/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <span className="text-2xl">✏️</span>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">1. Write Your Draft</h3>
                  <p className="text-slate-400">
                    Type what you're really thinking. Don't worry about tone or politeness yet.
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-600/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <span className="text-2xl">✨</span>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">2. AI Enhancement</h3>
                  <p className="text-slate-400">
                    Our education-specific AI transforms it into professional, empathetic language.
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.3}>
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-600/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <span className="text-2xl">📤</span>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">3. Copy & Send</h3>
                  <p className="text-slate-400">
                    Copy the improved text and paste it anywhere - email, report cards, or messaging apps.
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Perfect For */}
      <section className="py-16 bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal>
              <h2 className="text-3xl font-bold text-white text-center mb-12">
                Perfect for every parent communication
              </h2>
            </ScrollReveal>

            <div className="grid md:grid-cols-2 gap-8">
              <ScrollReveal delay={0.1}>
                <div className="bg-slate-800/60 rounded-xl p-6 border border-slate-700">
                  <h3 className="text-lg font-semibold text-white mb-3">📝 Report Card Comments</h3>
                  <p className="text-slate-400 text-sm">
                    Transform "Emma is bad at math" into "Emma would benefit from additional practice with foundational concepts to build her confidence in mathematics."
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <div className="bg-slate-800/60 rounded-xl p-6 border border-slate-700">
                  <h3 className="text-lg font-semibold text-white mb-3">📧 Parent Emails</h3>
                  <p className="text-slate-400 text-sm">
                    Turn urgent concerns into diplomatic, solution-focused messages that maintain positive relationships.
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.3}>
                <div className="bg-slate-800/60 rounded-xl p-6 border border-slate-700">
                  <h3 className="text-lg font-semibold text-white mb-3">⚠️ Behavior Notes</h3>
                  <p className="text-slate-400 text-sm">
                    Convert "Your child was disruptive" into constructive feedback that focuses on growth and collaboration.
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.4}>
                <div className="bg-slate-800/60 rounded-xl p-6 border border-slate-700">
                  <h3 className="text-lg font-semibold text-white mb-3">🎯 Progress Updates</h3>
                  <p className="text-slate-400 text-sm">
                    Share achievements and areas for growth in language that celebrates effort and encourages improvement.
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-purple-900/30 to-blue-900/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <ScrollReveal>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Try it right now - completely free
              </h2>
              <p className="text-xl text-slate-300 mb-8">
                No signup, no credit card, no strings attached. Just better parent communication in 30 seconds.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/#demo"
                  className="inline-flex items-center px-10 py-5 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl transition-colors shadow-2xl text-xl"
                >
                  Try the Free Tool Now
                  <svg className="ml-3 w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </Link>
              </div>

              <p className="text-slate-400 text-sm mt-6">
                Love it? Sign up for 5 free comments every month.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  )
}