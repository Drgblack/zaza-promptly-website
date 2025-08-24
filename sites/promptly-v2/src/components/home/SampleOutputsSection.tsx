'use client'

import { useState } from 'react'
import ScrollReveal from '@/components/animations/ScrollReveal'

interface SampleOutput {
  id: string
  type: string
  title: string
  input: string
  output: string
  icon: JSX.Element
}

const sampleOutputs: SampleOutput[] = [
  {
    id: 'student-report',
    type: 'Student Report',
    title: 'Year 6 Student Report Comment',
    input: 'Emma: strong reader, struggles with maths word problems, creative writing excellent, needs confidence boost',
    output: 'Emma consistently demonstrates exceptional reading comprehension skills, often choosing challenging texts during independent reading time. Her creative writing showcases remarkable imagination and strong narrative voice, particularly in her recent fantasy story series. While Emma sometimes finds maths word problems challenging, she shows determination and resilience when working through complex scenarios. With continued encouragement and targeted support in mathematical reasoning, Emma is well-positioned to build greater confidence in this area. Her positive attitude and willingness to take risks in her learning make her a joy to teach.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    )
  },
  {
    id: 'parent-email',
    type: 'Parent Communication',
    title: 'Parent Update Email',
    input: 'Jack had incident at lunch, hit another child, talked to him, seems remorseful, parents should know',
    output: 'I wanted to update you about an incident involving Jack during lunch today. He was involved in a physical altercation with another student, which resulted in him hitting the other child. I spoke with Jack immediately afterward, and he expressed genuine remorse for his actions. He understood that his behavior was inappropriate and showed concern for the other student\'s wellbeing. We discussed better ways to handle frustrating situations, and Jack committed to using his words next time. I believe this was a learning moment for him, and I wanted to keep you informed so we can work together to reinforce these important social skills. Please let me know if you\'d like to discuss this further.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    )
  },
  {
    id: 'behavior-note',
    type: 'Behavior Documentation',
    title: 'Positive Behavior Note',
    input: 'Sophie helped new student settle in, showed her around, shared her snacks, very kind',
    output: 'Sophie demonstrated exceptional kindness and leadership today by taking initiative to welcome our new student. Without being asked, she offered to show the new student around our classroom and school grounds, explaining our routines and helping her feel comfortable in her new environment. During snack time, Sophie generously shared her food and invited the new student to sit with her friendship group. Her natural empathy and inclusive behavior created a positive first impression and helped ease what can often be an anxious transition for new students. Sophie\'s actions exemplify the caring community values we strive for in our classroom.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    )
  }
]

export default function SampleOutputsSection() {
  const [activeTab, setActiveTab] = useState('student-report')
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const activeSample = sampleOutputs.find(sample => sample.id === activeTab) || sampleOutputs[0]

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedId(id)
      setTimeout(() => setCopiedId(null), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  return (
    <section className="py-20 bg-slate-900/50">
      <div className="container">
        <ScrollReveal duration={0.22}>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              What Good Looks Like
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              See real examples of AI-generated feedback that teachers love. 
              Professional, personal, and perfectly pitched for your audience.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal duration={0.26} delay={0.1}>
          <div className="max-w-5xl mx-auto">
            {/* Tab Navigation */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {sampleOutputs.map((sample) => (
                <button
                  key={sample.id}
                  onClick={() => setActiveTab(sample.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all duration-200 ${
                    activeTab === sample.id
                      ? 'bg-purple-600 text-white shadow-lg'
                      : 'bg-slate-800/60 text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <span className="text-current">{sample.icon}</span>
                  <span className="text-sm">{sample.type}</span>
                </button>
              ))}
            </div>

            {/* Sample Output Display */}
            <div className="bg-slate-800/40 rounded-2xl border border-white/10 overflow-hidden">
              <div className="p-6 border-b border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">
                    {activeSample.title}
                  </h3>
                  <span className="text-xs text-slate-400 bg-slate-700/50 px-3 py-1 rounded-full">
                    {activeSample.type}
                  </span>
                </div>

                {/* Input Section */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                    <span className="text-sm font-medium text-slate-400">Your quick notes:</span>
                  </div>
                  <p className="text-sm text-slate-300 bg-slate-900/50 p-3 rounded-lg italic border-l-4 border-orange-500/50">
                    "{activeSample.input}"
                  </p>
                </div>

                {/* Arrow */}
                <div className="flex justify-center mb-6">
                  <div className="flex items-center gap-2 text-slate-400">
                    <div className="w-8 h-px bg-gradient-to-r from-transparent to-purple-500"></div>
                    <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                    <div className="w-8 h-px bg-gradient-to-r from-purple-500 to-transparent"></div>
                  </div>
                </div>

                {/* Output Section */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-sm font-medium text-green-400">AI-enhanced result:</span>
                    </div>
                    <button
                      onClick={() => copyToClipboard(activeSample.output, activeSample.id)}
                      className="flex items-center gap-1 text-xs text-slate-400 hover:text-white transition-colors"
                    >
                      {copiedId === activeSample.id ? (
                        <>
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Copied!
                        </>
                      ) : (
                        <>
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                          Copy
                        </>
                      )}
                    </button>
                  </div>
                  <div className="text-sm text-slate-200 bg-slate-900/50 p-4 rounded-lg border-l-4 border-green-500/50 leading-relaxed">
                    {activeSample.output}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="p-4 bg-slate-800/20 text-center">
                <p className="text-xs text-slate-400">
                  ✨ Generated in seconds • 🔒 GDPR compliant • 🎯 Maintains your teaching voice
                </p>
              </div>
            </div>

            {/* CTA */}
            <div className="text-center mt-8">
              <p className="text-slate-300 mb-4">
                Ready to transform your feedback writing?
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="#snippet"
                  className="inline-flex items-center px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors shadow-lg"
                >
                  Try the Tool Above
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
                  </svg>
                </a>
                <a
                  href="/pricing"
                  className="inline-flex items-center px-6 py-3 border border-slate-600/60 text-slate-300 hover:text-white hover:border-slate-400/60 font-semibold rounded-lg transition-colors"
                >
                  Start Free Trial
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}