import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'AI for Secondary Teachers | Scale Report Comments & Parent Messages | Promptly',
  description: 'Stop copy-paste templates. Get personalised, professional drafts at scale with pedagogy-first AI that saves hours weekly for secondary teachers.',
  keywords: ['secondary teachers', 'high school teachers', 'report comments', 'parent communication', 'teacher workload', 'AI for educators'],
  openGraph: {
    title: 'AI for Secondary Teachers | Scale Report Comments & Parent Messages | Promptly',
    description: 'Stop copy-paste templates. Get personalised, professional drafts at scale with pedagogy-first AI that saves hours weekly for secondary teachers.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI for Secondary Teachers | Scale Report Comments & Parent Messages | Promptly',
    description: 'Stop copy-paste templates. Get personalised, professional drafts at scale with pedagogy-first AI that saves hours weekly for secondary teachers.',
  },
}

export default function SecondaryTeachersPage() {
  return (
    <main className="min-h-screen bg-slate-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900/20 to-cyan-900/20 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                {/* Target Badge */}
                <div className="inline-flex items-center px-4 py-2 bg-blue-600/20 border border-blue-500/30 rounded-full text-blue-300 text-sm font-medium mb-6">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  For Secondary Teachers
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                  Handle <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">hundreds of comments</span> with confidence
                </h1>
                
                <p className="text-xl text-slate-300 mb-8 leading-relaxed">
                  Stop copy-paste templates that feel robotic. Get personalised, professional drafts at scale—saving hours every week.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Link
                    href="/waitlist"
                    className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 text-lg inline-flex items-center justify-center"
                  >
                    Start saving time today
                    <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                  <Link
                    href="/#demo"
                    className="border-2 border-blue-500 text-blue-300 hover:bg-blue-500 hover:text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 text-lg inline-flex items-center justify-center"
                  >
                    See how it works
                  </Link>
                </div>

                <p className="text-slate-400 text-sm">
                  Unlimited comments for Pro users • Pedagogy-first AI • Built for scale
                </p>
              </div>

              <div className="relative">
                <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl p-8">
                  <div className="bg-slate-800/60 rounded-lg p-6 mb-4">
                    <h3 className="text-white font-semibold mb-3 flex items-center">
                      <span className="w-3 h-3 bg-red-400 rounded-full mr-3"></span>
                      The Scale Problem
                    </h3>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      "You have hundreds of comments to write. Copy-paste templates feel robotic, generic AI is unsafe."
                    </p>
                  </div>
                  <div className="bg-slate-800/60 rounded-lg p-6">
                    <h3 className="text-white font-semibold mb-3 flex items-center">
                      <span className="w-3 h-3 bg-green-400 rounded-full mr-3"></span>
                      The Scale Solution
                    </h3>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      Personalised, professional drafts at scale. Pedagogy-first, saves hours weekly.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-16 bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
                The secondary teacher's endless cycle
              </h2>
              <div className="bg-red-900/20 border border-red-500/30 rounded-2xl p-8 text-left">
                <p className="text-lg text-slate-200 leading-relaxed mb-6">
                  <strong className="text-red-400">"150 students. 6 classes. Multiple subjects. Each student deserves meaningful feedback, but there aren't enough hours in the week.</strong>
                </p>
                <p className="text-lg text-slate-200 leading-relaxed mb-6">
                  You resort to templates: 'Shows good effort' and 'Could improve focus.' But they sound robotic. Parents notice. Students deserve better. Generic AI? Too risky for school communications.
                </p>
                <p className="text-lg text-white font-semibold">
                  You need something that scales without losing the human touch."
                </p>
              </div>
            </div>

            {/* Scale Challenges */}
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-3">Overwhelming Scale</h3>
                <p className="text-slate-400 text-sm">150+ students means 150+ unique comments to write</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-3">Template Fatigue</h3>
                <p className="text-slate-400 text-sm">Copy-paste comments feel impersonal and robotic</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-3">Unsafe AI</h3>
                <p className="text-slate-400 text-sm">Generic AI risks inappropriate or inaccurate feedback</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-16 bg-slate-800/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Scale without losing the personal touch
              </h2>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                Promptly handles hundreds of comments while keeping each one personalised, professional, and pedagogically sound.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">Unlimited Scale</h3>
                      <p className="text-slate-300 text-sm">Handle 150+ comments with the same quality as 15—no copy-paste needed</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">Personalised at Scale</h3>
                      <p className="text-slate-300 text-sm">Each comment reflects individual student progress and personality</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">Pedagogy-First</h3>
                      <p className="text-slate-300 text-sm">Built on secondary teaching principles—developmentally appropriate feedback</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">Hours Saved Weekly</h3>
                      <p className="text-slate-300 text-sm">What took 8 hours now takes 2—get your weekends back</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="bg-slate-800/60 rounded-xl p-6">
                  <div className="space-y-4">
                    <div className="text-center mb-6">
                      <h3 className="text-white font-semibold">From Template to Personal</h3>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="bg-red-900/20 border border-red-500/30 rounded p-3">
                        <div className="text-xs text-red-400 font-medium mb-1">❌ Generic Template:</div>
                        <div className="text-sm text-slate-300">"Shows good effort in class. Could improve focus."</div>
                      </div>

                      <div className="text-center">
                        <svg className="w-6 h-6 text-blue-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                      </div>

                      <div className="bg-green-900/20 border border-green-500/30 rounded p-3">
                        <div className="text-xs text-green-400 font-medium mb-1">✅ Promptly Enhanced:</div>
                        <div className="text-sm text-slate-200">"Jake has shown genuine enthusiasm for our history topics this term, particularly when discussing the causes of WWI. His analytical thinking is developing well—he's starting to connect events across different time periods. To further strengthen his work, focusing on including more specific evidence in his essays would help support his already insightful arguments."</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Differentiation Section */}
      <section className="py-16 bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
              Why secondary teachers trust Promptly over generic AI
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-red-900/20 border border-red-500/30 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-red-300 mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Generic AI Solutions
                </h3>
                <ul className="space-y-2 text-sm text-slate-300">
                  <li>• Risk of hallucinated or inappropriate content</li>
                  <li>• Doesn't understand secondary pedagogy</li>
                  <li>• One-size-fits-all approach</li>
                  <li>• No subject-specific understanding</li>
                  <li>• Robotic, impersonal tone</li>
                  <li>• Data privacy concerns</li>
                </ul>
              </div>

              <div className="bg-green-900/20 border border-green-500/30 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-green-300 mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Promptly (Pedagogy-First)
                </h3>
                <ul className="space-y-2 text-sm text-slate-300">
                  <li>• Hallucination-safe, education-trained AI</li>
                  <li>• Deep secondary teaching expertise</li>
                  <li>• Adapts to your teaching style</li>
                  <li>• Subject-aware feedback patterns</li>
                  <li>• Professional, empathetic tone</li>
                  <li>• GDPR compliant, school-safe</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16 bg-slate-800/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white text-center mb-12">
              Secondary teachers saving hours every week
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-slate-800/60 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    RH
                  </div>
                  <div>
                    <p className="text-slate-300 text-sm mb-3 leading-relaxed">
                      "I teach 160 students across 5 classes. What used to take me 12 hours of weekend work now takes 3. The comments are so much better than my old templates—parents have noticed the difference."
                    </p>
                    <div className="text-xs text-slate-400">
                      <strong className="text-blue-400">Rachel H.</strong> - English Teacher, London
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-800/60 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    DM
                  </div>
                  <div>
                    <p className="text-slate-300 text-sm mb-3 leading-relaxed">
                      "As a science teacher, I was skeptical about AI helping with feedback. But Promptly actually understands practical work, lab skills, and scientific thinking—it's like having a teaching assistant."
                    </p>
                    <div className="text-xs text-slate-400">
                      <strong className="text-cyan-400">David M.</strong> - Science Teacher, Edinburgh
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center mt-12">
              <div className="inline-flex items-center gap-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400">8 hrs</div>
                  <div className="text-xs text-slate-400">Average Weekly Savings</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-cyan-400">92%</div>
                  <div className="text-xs text-slate-400">Time Reduction</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400">2400+</div>
                  <div className="text-xs text-slate-400">Secondary Teachers</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-br from-blue-900/20 to-cyan-900/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to scale without losing quality?
            </h2>
            <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
              Join thousands of secondary teachers who've stopped dreading report season. Handle hundreds of comments with confidence.
            </p>
            
            <Link 
              href="/waitlist"
              className="inline-flex items-center px-10 py-5 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold rounded-xl transition-colors shadow-2xl text-xl"
            >
              Start saving time today
              <svg className="ml-3 w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            
            <p className="text-slate-400 text-sm mt-6">
              Unlimited comments with Pro • Pedagogy-first AI • Scales to 1000+ students
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}