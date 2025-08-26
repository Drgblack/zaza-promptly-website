import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'AI for International Teachers | Multilingual Parent Communication | Promptly',
  description: 'Bridge language barriers effortlessly. Get multilingual drafts with tone tutor, built for global classrooms and international teaching contexts.',
  keywords: ['international teachers', 'multilingual communication', 'ESL teachers', 'global classrooms', 'translation for teachers', 'international schools'],
  openGraph: {
    title: 'AI for International Teachers | Multilingual Parent Communication | Promptly',
    description: 'Bridge language barriers effortlessly. Get multilingual drafts with tone tutor, built for global classrooms and international teaching contexts.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI for International Teachers | Multilingual Parent Communication | Promptly',
    description: 'Bridge language barriers effortlessly. Get multilingual drafts with tone tutor, built for global classrooms and international teaching contexts.',
  },
}

export default function InternationalTeachersPage() {
  return (
    <main className="min-h-screen bg-slate-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-900/20 to-teal-900/20 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                {/* Target Badge */}
                <div className="inline-flex items-center px-4 py-2 bg-green-600/20 border border-green-500/30 rounded-full text-green-300 text-sm font-medium mb-6">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  For International Teachers
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                  Break down <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-teal-400">language barriers</span> effortlessly
                </h1>
                
                <p className="text-xl text-slate-300 mb-8 leading-relaxed">
                  Stop struggling with translation tools that miss cultural nuances. Communicate with all families confidently—in their language, with perfect tone.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Link
                    href="/waitlist"
                    className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 text-lg inline-flex items-center justify-center"
                  >
                    Try free — multilingual support included
                    <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                  <Link
                    href="/#demo"
                    className="border-2 border-green-500 text-green-300 hover:bg-green-500 hover:text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 text-lg inline-flex items-center justify-center"
                  >
                    See translation demo
                  </Link>
                </div>

                <p className="text-slate-400 text-sm">
                  25+ languages supported • Cultural context included • Built for global education
                </p>
              </div>

              <div className="relative">
                <div className="bg-gradient-to-br from-green-500/20 to-teal-500/20 rounded-2xl p-8">
                  <div className="bg-slate-800/60 rounded-lg p-6 mb-4">
                    <h3 className="text-white font-semibold mb-3 flex items-center">
                      <span className="w-3 h-3 bg-red-400 rounded-full mr-3"></span>
                      The Cultural Barrier
                    </h3>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      "Communicating across languages and cultures is exhausting. Translation tools are clunky and risky."
                    </p>
                  </div>
                  <div className="bg-slate-800/60 rounded-lg p-6">
                    <h3 className="text-white font-semibold mb-3 flex items-center">
                      <span className="w-3 h-3 bg-green-400 rounded-full mr-3"></span>
                      The Global Solution
                    </h3>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      Multilingual drafts + tone tutor. Built for global classrooms with cultural sensitivity.
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
                The international teacher's daily challenge
              </h2>
              <div className="bg-red-900/20 border border-red-500/30 rounded-2xl p-8 text-left">
                <p className="text-lg text-slate-200 leading-relaxed mb-6">
                  <strong className="text-red-400">"You have students from 15 different countries. Each parent deserves communication in their language, but Google Translate sounds robotic and misses cultural context.</strong>
                </p>
                <p className="text-lg text-slate-200 leading-relaxed mb-6">
                  You spend hours crafting messages, second-guessing tone, worrying about offending. Some parents don't respond because they don't understand. Others feel excluded from their child's education.
                </p>
                <p className="text-lg text-white font-semibold">
                  Language shouldn't be a barrier to building relationships with families."
                </p>
              </div>
            </div>

            {/* Global Challenges */}
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-3">Language Barriers</h3>
                <p className="text-slate-400 text-sm">Multiple languages, cultural nuances, and tone considerations</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-3">Clunky Tools</h3>
                <p className="text-slate-400 text-sm">Generic translation tools miss context and sound robotic</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-3">Time Exhaustion</h3>
                <p className="text-slate-400 text-sm">Hours spent crafting and checking multilingual messages</p>
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
                AI that speaks every parent's language
              </h2>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                Promptly bridges cultural gaps with multilingual drafts that maintain warmth, respect, and educational context in every language.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">25+ Languages</h3>
                      <p className="text-slate-300 text-sm">Seamless translation that preserves meaning and educational terminology</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">Cultural Tone Tutor</h3>
                      <p className="text-slate-300 text-sm">Adapts communication style to cultural expectations and family dynamics</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">Global Classroom Ready</h3>
                      <p className="text-slate-300 text-sm">Understands international curricula, diverse learning styles, and family expectations</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-teal-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">Context Preservation</h3>
                      <p className="text-slate-300 text-sm">Educational meaning stays intact across languages—no robotic translations</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="bg-slate-800/60 rounded-xl p-6">
                  <div className="space-y-4">
                    <div className="text-center mb-6">
                      <h3 className="text-white font-semibold">From English to Any Language</h3>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="bg-slate-700/50 rounded p-3">
                        <div className="text-xs text-blue-400 font-medium mb-1">🇺🇸 Your English Draft:</div>
                        <div className="text-sm text-slate-200">"Maria has shown excellent progress in her reading comprehension this term..."</div>
                      </div>

                      <div className="flex items-center justify-center">
                        <div className="flex items-center gap-2 text-green-400">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                          </svg>
                          <span className="text-xs font-medium">Cultural Tone Tutor</span>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="bg-green-900/20 border border-green-500/30 rounded p-3">
                          <div className="text-xs text-green-400 font-medium mb-1">🇪🇸 Spanish (Formal):</div>
                          <div className="text-sm text-slate-200">"María ha demostrado un progreso excelente en su comprensión de lectura este trimestre..."</div>
                        </div>

                        <div className="bg-green-900/20 border border-green-500/30 rounded p-3">
                          <div className="text-xs text-green-400 font-medium mb-1">🇨🇳 Mandarin (Respectful):</div>
                          <div className="text-sm text-slate-200">"玛丽亚在本学期的阅读理解方面有了极好的进步..."</div>
                        </div>

                        <div className="bg-green-900/20 border border-green-500/30 rounded p-3">
                          <div className="text-xs text-green-400 font-medium mb-1">🇦🇪 Arabic (Culturally Sensitive):</div>
                          <div className="text-sm text-slate-200">"أظهرت ماريا تقدماً ممتازاً في فهم القراءة هذا الفصل..."</div>
                        </div>
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
              Why international teachers choose Promptly over generic translation
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-red-900/20 border border-red-500/30 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-red-300 mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Generic Translation Tools
                </h3>
                <ul className="space-y-2 text-sm text-slate-300">
                  <li>• Robotic, literal translations</li>
                  <li>• No cultural context awareness</li>
                  <li>• Misses educational terminology</li>
                  <li>• One-size-fits-all approach</li>
                  <li>• Risk of offensive or inappropriate tone</li>
                  <li>• No understanding of school communication</li>
                </ul>
              </div>

              <div className="bg-green-900/20 border border-green-500/30 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-green-300 mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Promptly (Global Education AI)
                </h3>
                <ul className="space-y-2 text-sm text-slate-300">
                  <li>• Culturally sensitive, warm translations</li>
                  <li>• Deep understanding of global family dynamics</li>
                  <li>• Education-specific vocabulary preserved</li>
                  <li>• Adapts to cultural communication styles</li>
                  <li>• Respectful, appropriate tone guaranteed</li>
                  <li>• Built for international school contexts</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Language Support */}
      <section className="py-16 bg-slate-800/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-white text-center mb-12">
              Communicate in every family's language
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {[
                { flag: '🇪🇸', name: 'Spanish', speakers: '500M+' },
                { flag: '🇨🇳', name: 'Mandarin', speakers: '900M+' },
                { flag: '🇫🇷', name: 'French', speakers: '280M+' },
                { flag: '🇩🇪', name: 'German', speakers: '130M+' },
                { flag: '🇮🇹', name: 'Italian', speakers: '65M+' },
                { flag: '🇵🇹', name: 'Portuguese', speakers: '260M+' },
                { flag: '🇯🇵', name: 'Japanese', speakers: '125M+' },
                { flag: '🇰🇷', name: 'Korean', speakers: '77M+' },
                { flag: '🇦🇪', name: 'Arabic', speakers: '400M+' },
                { flag: '🇷🇺', name: 'Russian', speakers: '150M+' },
                { flag: '🇮🇳', name: 'Hindi', speakers: '600M+' },
                { flag: '🇳🇱', name: 'Dutch', speakers: '24M+' },
              ].map((lang) => (
                <div key={lang.name} className="bg-slate-800/60 rounded-lg p-4 text-center">
                  <div className="text-3xl mb-2">{lang.flag}</div>
                  <div className="text-white font-medium text-sm">{lang.name}</div>
                  <div className="text-xs text-slate-400">{lang.speakers}</div>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-8">
              <p className="text-slate-400">+ 13 more languages supported</p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16 bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white text-center mb-12">
              International teachers building stronger connections
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-slate-800/60 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    LK
                  </div>
                  <div>
                    <p className="text-slate-300 text-sm mb-3 leading-relaxed">
                      "I teach in Dubai with families from 20+ countries. Promptly helps me communicate warmly with Arabic, Hindi, and Tagalog-speaking parents. Parent engagement has never been higher."
                    </p>
                    <div className="text-xs text-slate-400">
                      <strong className="text-green-400">Lina K.</strong> - International School, Dubai
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-800/60 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-teal-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    JW
                  </div>
                  <div>
                    <p className="text-slate-300 text-sm mb-3 leading-relaxed">
                      "As an ESL teacher in Singapore, I need to be culturally sensitive. Promptly understands that Chinese parents prefer formal tone while Aussie parents like casual—it adapts perfectly."
                    </p>
                    <div className="text-xs text-slate-400">
                      <strong className="text-teal-400">James W.</strong> - ESL Teacher, Singapore
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center mt-12">
              <div className="inline-flex items-center gap-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400">25+</div>
                  <div className="text-xs text-slate-400">Languages</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-teal-400">90%</div>
                  <div className="text-xs text-slate-400">Parent Response Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400">800+</div>
                  <div className="text-xs text-slate-400">International Teachers</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-br from-green-900/20 to-teal-900/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Connect with every family, in every language
            </h2>
            <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
              Join international teachers who've broken down language barriers. Build stronger relationships with all families, regardless of their native language.
            </p>
            
            <Link 
              href="/waitlist"
              className="inline-flex items-center px-10 py-5 bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white font-semibold rounded-xl transition-colors shadow-2xl text-xl"
            >
              Try free — multilingual support included
              <svg className="ml-3 w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            
            <p className="text-slate-400 text-sm mt-6">
              25+ languages • Cultural tone tutor • Built for global classrooms
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}