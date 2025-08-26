import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import EmailSignupForm from '@/components/forms/EmailSignupForm'

export const metadata: Metadata = {
  title: 'AI for Primary Teachers | Report Comments & Parent Messages | Promptly',
  description: 'Stop recycling old report comments. Get empathetic, age-appropriate drafts in minutes with hallucination-safe AI built specifically for primary teachers.',
  keywords: ['primary teachers', 'report comments', 'parent communication', 'safe AI for teachers', 'primary education AI', 'teacher workload'],
  openGraph: {
    title: 'AI for Primary Teachers | Report Comments & Parent Messages | Promptly',
    description: 'Stop recycling old report comments. Get empathetic, age-appropriate drafts in minutes with hallucination-safe AI built specifically for primary teachers.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI for Primary Teachers | Report Comments & Parent Messages | Promptly',
    description: 'Stop recycling old report comments. Get empathetic, age-appropriate drafts in minutes with hallucination-safe AI built specifically for primary teachers.',
  },
}

export default function PrimaryTeachersPage() {
  return (
    <main className="min-h-screen bg-slate-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-pink-900/20 to-purple-900/20 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                {/* Target Badge */}
                <div className="inline-flex items-center px-4 py-2 bg-pink-600/20 border border-pink-500/30 rounded-full text-pink-300 text-sm font-medium mb-6">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  For Primary Teachers
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                  Write better reports in <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">minutes, not hours</span>
                </h1>
                
                <p className="text-xl text-slate-300 mb-8 leading-relaxed">
                  Stop staying up past midnight writing the same comments. Get empathetic, age-appropriate drafts that sound like you—in seconds.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Link
                    href="/waitlist"
                    className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 text-lg inline-flex items-center justify-center"
                  >
                    Try Promptly free
                    <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                  <Link
                    href="/#demo"
                    className="border-2 border-pink-500 text-pink-300 hover:bg-pink-500 hover:text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 text-lg inline-flex items-center justify-center"
                  >
                    See how it works
                  </Link>
                </div>

                <p className="text-slate-400 text-sm">
                  5 free comments this month • No credit card required • Built by educators
                </p>
              </div>

              <div className="relative">
                <div className="bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-2xl p-8">
                  <div className="bg-slate-800/60 rounded-lg p-6 mb-4">
                    <h3 className="text-white font-semibold mb-3 flex items-center">
                      <span className="w-3 h-3 bg-red-400 rounded-full mr-3"></span>
                      The Problem
                    </h3>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      "Report comments for 30 students take hours. You end up recycling old comments or using risky AI that misses the right tone."
                    </p>
                  </div>
                  <div className="bg-slate-800/60 rounded-lg p-6">
                    <h3 className="text-white font-semibold mb-3 flex items-center">
                      <span className="w-3 h-3 bg-green-400 rounded-full mr-3"></span>
                      The Solution
                    </h3>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      Empathetic, age-appropriate drafts in minutes. Safe, tuned to your teacher voice.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Email Signup Form */}
      <section className="py-12 bg-slate-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto flex justify-center">
            <EmailSignupForm 
              variant="compact"
              headline="Get updates made for primary teachers like you"
              subtext="We'll share practical tips and new features built to save your time."
              showNameFields={false}
              buttonText="Get Updates"
              className="w-full max-w-md"
            />
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-16 bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
                You know this pain too well
              </h2>
              <div className="bg-red-900/20 border border-red-500/30 rounded-2xl p-8 text-left">
                <p className="text-lg text-slate-200 leading-relaxed mb-6">
                  <strong className="text-red-400">"It's Sunday night again. You're staring at 30 blank report cards, knowing each child deserves personal, meaningful comments.</strong>
                </p>
                <p className="text-lg text-slate-200 leading-relaxed mb-6">
                  But you're exhausted. You start copy-pasting from last term, tweaking a word here and there. Or worse—you try ChatGPT and get comments that sound robotic or completely wrong.
                </p>
                <p className="text-lg text-white font-semibold">
                  There has to be a better way."
                </p>
              </div>
            </div>

            {/* Pain Points */}
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-3">Hours Per Report</h3>
                <p className="text-slate-400 text-sm">Writing 30 meaningful comments takes your entire weekend</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-3">Copy-Paste Fatigue</h3>
                <p className="text-slate-400 text-sm">Recycling old comments feels impersonal and generic</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-3">Risky AI</h3>
                <p className="text-slate-400 text-sm">Generic AI gives inappropriate or inaccurate comments</p>
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
                Finally—AI that understands primary teaching
              </h2>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                Promptly gives you empathetic, age-appropriate drafts that capture each child's unique progress and personality.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">Age-Appropriate Language</h3>
                      <p className="text-slate-300 text-sm">Comments perfectly tuned for primary age groups, using language parents understand</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">Empathetic Tone</h3>
                      <p className="text-slate-300 text-sm">Celebrates every child's journey with warmth and encouragement</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">Minutes Not Hours</h3>
                      <p className="text-slate-300 text-sm">Generate personalized drafts in seconds, refine in minutes</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-pink-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">Safe & Tuned to You</h3>
                      <p className="text-slate-300 text-sm">Hallucination-safe AI that learns your teaching voice and style</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="bg-slate-800/60 rounded-xl p-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                        1
                      </div>
                      <span className="text-white font-medium">Write your rough draft</span>
                    </div>
                    <div className="bg-slate-700/50 rounded p-3 text-sm text-slate-300">
                      "Emma has improved her reading this term..."
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                        2
                      </div>
                      <span className="text-white font-medium">Promptly enhances it</span>
                    </div>
                    <div className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded p-3 text-sm text-slate-200">
                      "Emma has made wonderful progress with her reading this term. She approaches new stories with enthusiasm and is building confidence in sounding out unfamiliar words. Her comprehension skills are developing beautifully—she loves discussing characters and predicting what might happen next."
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
              Why primary teachers choose Promptly over ChatGPT
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-red-900/20 border border-red-500/30 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-red-300 mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Generic AI (ChatGPT)
                </h3>
                <ul className="space-y-2 text-sm text-slate-300">
                  <li>• Can hallucinate or give inappropriate advice</li>
                  <li>• Sounds robotic and impersonal</li>
                  <li>• Not trained on educational contexts</li>
                  <li>• No understanding of primary pedagogy</li>
                  <li>• Risk of inappropriate content</li>
                </ul>
              </div>

              <div className="bg-green-900/20 border border-green-500/30 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-green-300 mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Promptly (Safe AI)
                </h3>
                <ul className="space-y-2 text-sm text-slate-300">
                  <li>• Hallucination-safe, education-specific AI</li>
                  <li>• Warm, empathetic tone for families</li>
                  <li>• Built by educators, for educators</li>
                  <li>• Primary pedagogy expertise built-in</li>
                  <li>• Age-appropriate language guaranteed</li>
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
              What primary teachers are saying
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-slate-800/60 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    SJ
                  </div>
                  <div>
                    <p className="text-slate-300 text-sm mb-3 leading-relaxed">
                      "I used to spend my entire Sunday writing reports. Now I finish them in 2 hours and actually have time for my family. The comments sound exactly like something I'd write—but better!"
                    </p>
                    <div className="text-xs text-slate-400">
                      <strong className="text-pink-400">Sarah J.</strong> - Year 2 Teacher, Manchester
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-800/60 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    MT
                  </div>
                  <div>
                    <p className="text-slate-300 text-sm mb-3 leading-relaxed">
                      "Parents have commented on how personal and thoughtful the reports are this term. They have no idea I'm using AI—because it genuinely captures each child's personality."
                    </p>
                    <div className="text-xs text-slate-400">
                      <strong className="text-purple-400">Mike T.</strong> - Year 4 Teacher, Birmingham
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center mt-12">
              <div className="inline-flex items-center gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-pink-400">95%</div>
                  <div className="text-xs text-slate-400">Time Saved</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400">4.9/5</div>
                  <div className="text-xs text-slate-400">Teacher Rating</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400">1000+</div>
                  <div className="text-xs text-slate-400">Primary Teachers</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-br from-pink-900/20 to-purple-900/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Get your Sunday evenings back
            </h2>
            <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
              Join hundreds of primary teachers who've stopped staying up late writing reports. Start with 5 free comments this month.
            </p>
            
            <Link 
              href="/waitlist"
              className="inline-flex items-center px-10 py-5 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-colors shadow-2xl text-xl"
            >
              Try Promptly free
              <svg className="ml-3 w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            
            <p className="text-slate-400 text-sm mt-6">
              No credit card required • Safe for schools • Built by primary teachers
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}