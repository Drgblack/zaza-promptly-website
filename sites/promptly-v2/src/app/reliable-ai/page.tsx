import { Metadata } from 'next'
import { Shield, Target, Users, CheckCircle2, AlertTriangle, Brain, FileCheck } from 'lucide-react'
import EmailCaptureSection from '@/components/email/EmailCaptureSection'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.zazapromptly.com"

export const metadata: Metadata = {
  title: 'Reliable AI That Won\'t Make Things Up | Promptly',
  description: 'Hallucination-safe AI for education with safety rails, teacher-in-the-loop validation, and bounded outputs designed for school contexts.',
  keywords: ['reliable AI', 'hallucination-free', 'accurate AI', 'trustworthy AI', 'AI safety', 'educational AI', 'bounded AI', 'teacher validation'],
  openGraph: {
    title: 'Reliable AI That Won\'t Make Things Up | Promptly',
    description: 'Hallucination-safe AI for education with safety rails and teacher validation.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Reliable AI That Won\'t Make Things Up | Promptly',
    description: 'Hallucination-safe AI for education with safety rails and teacher validation.',
  },
}

// FAQ Schema for rich snippets
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How do you reduce hallucinations?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We use instruction-following templates tuned for education, bounded output formats, and continuous validation against school communication standards. Our AI stays within defined parameters rather than generating creative content."
      }
    },
    {
      "@type": "Question",
      "name": "Will the tool invent student facts?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. Our AI focuses on improving tone and clarity of existing text, not creating new factual claims. Teachers maintain control over all factual content about students."
      }
    },
    {
      "@type": "Question",
      "name": "Can it cite sources?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Promptly doesn't generate citations as it works with your existing text. It helps improve communication style while preserving your original meaning and facts."
      }
    },
    {
      "@type": "Question",
      "name": "What if I disagree with a suggestion?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "You have complete control. All suggestions are just that - suggestions. You can edit, reject, or regenerate alternatives. The teacher is always in the loop."
      }
    },
    {
      "@type": "Question",
      "name": "Is this safer than general chatbots?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Unlike general chatbots, Promptly is specifically designed for educational communication with safety rails, toxicity prevention, and bounded outputs appropriate for school contexts."
      }
    }
  ]
}

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${baseUrl}/reliable-ai`,
  "name": "Reliable AI That Won't Make Things Up",
  "description": "How Promptly ensures accuracy and reliability in educational AI tools through safety rails and validation.",
  "url": `${baseUrl}/reliable-ai`,
  "inLanguage": "en",
  "isPartOf": {
    "@type": "WebSite",
    "@id": `${baseUrl}/#website`
  },
  "about": {
    "@type": "Thing",
    "name": "AI Safety and Reliability"
  }
}

export default function ReliableAIPage() {
  return (
    <>
      {/* Schema.org structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50/50 to-purple-100/50 dark:from-slate-900 dark:to-slate-800 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-6">
                <Shield className="w-8 h-8 text-blue-600 dark:text-blue-400" aria-hidden="true" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                Reliable AI That Won't Make Things Up
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                Our AI is specifically designed for education with built-in safety rails, accuracy controls, and teacher oversight to prevent hallucinations.
              </p>
            </div>
          </div>
        </section>

        {/* Safety Rails */}
        <section className="py-16 bg-white dark:bg-slate-900">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  Built-in Safety Rails
                </h2>
                <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                  Every interaction is protected by multiple layers of safety measures designed specifically for educational contexts.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg mb-4">
                    <Target className="w-6 h-6 text-green-600 dark:text-green-400" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    School-Context Templates
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                    Our AI uses instruction-following templates specifically tuned for educational communication, not general-purpose generation.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-lg mb-4">
                    <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    Toxicity Prevention
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                    Automatic filtering prevents inappropriate language, bias, or harmful content that would be unsuitable for school communications.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg mb-4">
                    <Brain className="w-6 h-6 text-purple-600 dark:text-purple-400" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    Tone Guards
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                    Built-in controls ensure outputs maintain supportive, professional tone appropriate for parent and student communication.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg mb-4">
                    <FileCheck className="w-6 h-6 text-orange-600 dark:text-orange-400" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    Session Privacy
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                    Processing happens in secure, isolated sessions with automatic cleanup. No long-term storage of sensitive educational content.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quality System */}
        <section className="py-16 bg-slate-50 dark:bg-slate-800">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                Quality Assurance System
              </h2>

              <div className="space-y-8">
                <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-8">
                  <div className="flex items-start gap-4">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex-shrink-0">
                      <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                        Teacher-in-the-Loop Validation
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                        Every output is reviewed by the teacher before use. We don't automate away teacher judgment - we enhance it with helpful suggestions.
                      </p>
                      <ul className="text-gray-600 dark:text-gray-300 space-y-2">
                        <li className="flex items-start">
                          <CheckCircle2 className="w-5 h-5 text-emerald-500 mr-3 flex-shrink-0 mt-0.5" />
                          Teachers maintain full control over final content
                        </li>
                        <li className="flex items-start">
                          <CheckCircle2 className="w-5 h-5 text-emerald-500 mr-3 flex-shrink-0 mt-0.5" />
                          Clear explanations of suggested changes
                        </li>
                        <li className="flex items-start">
                          <CheckCircle2 className="w-5 h-5 text-emerald-500 mr-3 flex-shrink-0 mt-0.5" />
                          Easy rejection or modification of suggestions
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-8">
                  <div className="flex items-start gap-4">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg flex-shrink-0">
                      <Target className="w-6 h-6 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                        School Scenario Testing
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                        We continuously test our AI against common school communication scenarios to ensure appropriate, helpful responses.
                      </p>
                      <ul className="text-gray-600 dark:text-gray-300 space-y-2">
                        <li className="flex items-start">
                          <CheckCircle2 className="w-5 h-5 text-emerald-500 mr-3 flex-shrink-0 mt-0.5" />
                          Regular evaluation against education-specific test cases
                        </li>
                        <li className="flex items-start">
                          <CheckCircle2 className="w-5 h-5 text-emerald-500 mr-3 flex-shrink-0 mt-0.5" />
                          Validation of tone appropriateness for different contexts
                        </li>
                        <li className="flex items-start">
                          <CheckCircle2 className="w-5 h-5 text-emerald-500 mr-3 flex-shrink-0 mt-0.5" />
                          Monitoring for accuracy and helpfulness metrics
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What Hallucination-safe Means */}
        <section className="py-16 bg-white dark:bg-slate-900">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                What "Hallucination-safe" Means
              </h2>
              
              <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-8 mb-8">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Our Definition
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                  Hallucination-safe means our AI works with your existing content to improve tone and clarity, rather than generating new factual claims. We focus on style enhancement, not content creation.
                </p>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-lg font-semibold text-emerald-400 mb-3 flex items-center">
                      <CheckCircle2 className="w-5 h-5 mr-2" />
                      What we DO
                    </h4>
                    <ul className="text-gray-600 dark:text-gray-300 space-y-2 text-sm">
                      <li>• Improve tone and clarity of your text</li>
                      <li>• Suggest more supportive language</li>
                      <li>• Help with professional phrasing</li>
                      <li>• Maintain your original meaning</li>
                      <li>• Preserve all factual content you provide</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold text-red-400 mb-3 flex items-center">
                      <AlertTriangle className="w-5 h-5 mr-2" />
                      What we DON'T do
                    </h4>
                    <ul className="text-gray-600 dark:text-gray-300 space-y-2 text-sm">
                      <li>• Invent student information or behavior</li>
                      <li>• Create new factual claims</li>
                      <li>• Generate academic assessments</li>
                      <li>• Make up incidents or events</li>
                      <li>• Add information not in your original text</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Example: Safe vs. Unsafe
                </h4>
                <div className="space-y-4 text-sm">
                  <div>
                    <p className="font-medium text-gray-700 dark:text-gray-300 mb-1">Your input:</p>
                    <p className="text-gray-600 dark:text-gray-400 italic">"Johnny was disruptive in class today."</p>
                  </div>
                  <div>
                    <p className="font-medium text-emerald-700 dark:text-emerald-400 mb-1">✅ Safe improvement:</p>
                    <p className="text-gray-600 dark:text-gray-400 italic">"Johnny had some challenges staying focused during today's lesson."</p>
                  </div>
                  <div>
                    <p className="font-medium text-red-700 dark:text-red-400 mb-1">❌ Unsafe (what we prevent):</p>
                    <p className="text-gray-600 dark:text-gray-400 italic">"Johnny was disruptive because he didn't sleep well last night and forgot his homework."</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 bg-slate-50 dark:bg-slate-800">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                AI Safety Questions
              </h2>

              <div className="space-y-6">
                <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    How do you reduce hallucinations?
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    We use instruction-following templates tuned for education, bounded output formats, and continuous validation against school communication standards. Our AI stays within defined parameters rather than generating creative content.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    Will the tool invent student facts?
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    No. Our AI focuses on improving tone and clarity of existing text, not creating new factual claims. Teachers maintain control over all factual content about students.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    Can it cite sources?
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    Promptly doesn't generate citations as it works with your existing text. It helps improve communication style while preserving your original meaning and facts.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    What if I disagree with a suggestion?
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    You have complete control. All suggestions are just that - suggestions. You can edit, reject, or regenerate alternatives. The teacher is always in the loop.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    Is this safer than general chatbots?
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    Yes. Unlike general chatbots, Promptly is specifically designed for educational communication with safety rails, toxicity prevention, and bounded outputs appropriate for school contexts.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-white mb-6">
                Experience Reliable AI for Education
              </h2>
              <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
                Try our hallucination-safe AI designed specifically for teachers and school communication.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/pricing"
                  className="inline-flex items-center justify-center px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600"
                >
                  Try Promptly Free
                </a>
                <a
                  href="/"
                  className="inline-flex items-center justify-center px-8 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600"
                >
                  See how it works
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Email Capture */}
        <EmailCaptureSection 
          title="Stay Updated on AI Safety"
          description="Get notified about AI safety improvements and new reliability features."
          placeholder="Enter your email for AI safety updates"
          buttonText="Stay Informed"
          source="reliable-ai"
        />
      </main>
    </>
  )
}