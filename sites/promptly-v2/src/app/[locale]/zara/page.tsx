import type { Metadata } from 'next'
import Link from 'next/link'

export const dynamic = 'force-dynamic'
export const revalidate = 0

interface ZaraPageProps {
  params: { locale: string }
}

export function generateMetadata({ params }: ZaraPageProps): Metadata {
  const { locale } = params
  
  return {
    title: 'Meet Zara: Your AI Teaching Assistant | Zaza Promptly',
    description: 'Discover Zara, the hallucination-safe AI assistant designed specifically for teachers. Learn about safety features, supported languages, and how to get the best results.',
    keywords: ['AI teaching assistant', 'Zara AI', 'safe AI for teachers', 'educational AI', 'teacher AI assistant'],
    openGraph: {
      title: 'Meet Zara: Your AI Teaching Assistant',
      description: 'Discover Zara, the hallucination-safe AI assistant designed specifically for teachers.',
      type: 'article',
    },
    alternates: {
      canonical: `/${locale}/zara`,
      languages: {
        'en': '/zara',
        'de': '/de/zara',
        'fr': '/fr/zara',
        'es': '/es/zara',
        'it': '/it/zara',
        'x-default': '/zara'
      }
    }
  }
}

export default function ZaraPage({ params }: ZaraPageProps) {
  const { locale } = params

  const faqs = [
    {
      question: "What makes Zara different from ChatGPT?",
      answer: "Zara is specifically designed for education with built-in safety guardrails to prevent hallucinations. Unlike general AI tools, Zara understands educational contexts and won't generate inappropriate content or false information about students."
    },
    {
      question: "Is Zara safe to use with student information?",
      answer: "Yes, Zara is built with privacy-first design. We never train our models on your conversations, all data is encrypted, and we're fully GDPR compliant. Your student information stays private and secure."
    },
    {
      question: "What languages does Zara support?",
      answer: "Zara supports 25+ languages including English, Spanish, French, German, Italian, Portuguese, Chinese, Arabic, and many more. Perfect for communicating with multilingual families."
    },
    {
      question: "How do I get the best results from Zara?",
      answer: "Be specific about your context (student age, subject, situation), provide clear examples when possible, and specify the tone you want. The more context you give Zara, the better and more personalized the output will be."
    }
  ]

  // JSON-LD for FAQPage
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      
      <main className="min-h-screen bg-slate-50">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 py-20">
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Meet Zara, Your AI Teaching Assistant
              </h1>
              <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto">
                Designed specifically for educators, Zara helps you write better parent communications, student reports, and professional messages — safely and efficiently.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href={`/${locale}/pricing`}
                  className="inline-flex items-center px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors"
                >
                  Start Using Zara
                </Link>
                <Link
                  href="#how-it-works"
                  className="inline-flex items-center px-8 py-4 border-2 border-white/30 text-white hover:bg-white/10 font-semibold rounded-lg transition-colors"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Who is Zara Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                Who is Zara?
              </h2>
              <p className="text-xl text-slate-600">
                Zara is your AI teaching assistant, built specifically for educators by educators. 
                Unlike generic AI tools, Zara understands the unique challenges of teaching and helps you communicate more effectively with students, parents, and colleagues.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">Built for Education</h3>
                <p className="text-slate-600">
                  Trained specifically on educational contexts and communication styles that work with students and families.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">Hallucination-Safe</h3>
                <p className="text-slate-600">
                  Designed with safety guardrails to prevent false information and inappropriate content generation.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">Privacy First</h3>
                <p className="text-slate-600">
                  GDPR compliant, encrypted data, and we never train our models on your conversations or student information.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Safety & Guardrails Section */}
        <section id="safety" className="py-20 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                Safety & Guardrails
              </h2>
              <p className="text-xl text-slate-600">
                Your peace of mind is our priority. Zara includes multiple layers of protection to ensure safe, appropriate output every time.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl p-8 shadow-sm border">
                <h3 className="text-2xl font-semibold text-slate-900 mb-4">Content Safety</h3>
                <ul className="space-y-3 text-slate-600">
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    No inappropriate language or content generation
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Fact-checking protocols to prevent false information
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Educational context awareness and appropriateness
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-sm border">
                <h3 className="text-2xl font-semibold text-slate-900 mb-4">Data Protection</h3>
                <ul className="space-y-3 text-slate-600">
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    End-to-end encryption for all communications
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    No training on your data or conversations
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Full GDPR compliance and data residency options
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Supported Languages */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                Supported Languages
              </h2>
              <p className="text-xl text-slate-600">
                Connect with multilingual families in their preferred language. Zara supports 25+ languages with cultural context included.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 text-center">
              {[
                'English', 'Spanish', 'French', 'German', 'Italian', 'Portuguese',
                'Chinese', 'Japanese', 'Korean', 'Arabic', 'Hindi', 'Russian',
                'Dutch', 'Polish', 'Swedish', 'Norwegian', 'Danish', 'Finnish',
                'Turkish', 'Greek', 'Hebrew', 'Thai', 'Vietnamese', 'Indonesian'
              ].map((language, index) => (
                <div key={index} className="py-3 px-4 bg-slate-50 rounded-lg text-slate-700 font-medium">
                  {language}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How to Get Best Results */}
        <section id="how-it-works" className="py-20 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                How to Get the Best Results from Zara
              </h2>
              <p className="text-xl text-slate-600">
                Follow these simple tips to get the most helpful and accurate responses from your AI teaching assistant.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-2xl p-8 shadow-sm border">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-xl font-bold text-purple-600">1</span>
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-4">Provide Context</h3>
                <p className="text-slate-600">
                  Include student age/year level, subject area, and the specific situation you're addressing. More context = better results.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-sm border">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-xl font-bold text-purple-600">2</span>
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-4">Specify Your Tone</h3>
                <p className="text-slate-600">
                  Tell Zara if you want the message to be formal, friendly, encouraging, or constructive. This helps match your communication style.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-sm border">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-xl font-bold text-purple-600">3</span>
                </div>
                <h3 className="text-xl font-semibent text-slate-900 mb-4">Give Examples</h3>
                <p className="text-slate-600">
                  Share what the student did well or areas for improvement. Specific examples help Zara create more personalized messages.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-sm border">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-xl font-bold text-purple-600">4</span>
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-4">Review & Personalize</h3>
                <p className="text-slate-600">
                  Always review Zara's suggestions and add your personal touch. You know your students best!
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-sm border">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-xl font-bold text-purple-600">5</span>
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-4">Iterate & Refine</h3>
                <p className="text-slate-600">
                  If the first result isn't perfect, ask Zara to adjust the tone, length, or focus. She learns from your feedback.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-sm border">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-xl font-bold text-purple-600">6</span>
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-4">Use Templates</h3>
                <p className="text-slate-600">
                  Take advantage of Zara's built-in templates for common situations like parent meetings, progress reports, and behavior updates.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 text-center mb-16">
                Frequently Asked Questions
              </h2>

              <div className="space-y-8">
                {faqs.map((faq, index) => (
                  <div key={index} className="border-b border-slate-200 pb-8">
                    <h3 className="text-xl font-semibold text-slate-900 mb-4">
                      {faq.question}
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Ready to Meet Zara?
              </h2>
              <p className="text-xl text-slate-300 mb-8">
                Join thousands of teachers who are already saving hours every week with Zara's help.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href={`/${locale}/pricing`}
                  className="inline-flex items-center px-8 py-4 bg-white text-purple-900 font-semibold rounded-lg hover:bg-slate-100 transition-colors"
                >
                  Start Free Today
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link
                  href={`/${locale}#demo`}
                  className="inline-flex items-center px-8 py-4 border-2 border-white/30 text-white hover:bg-white/10 font-semibold rounded-lg transition-colors"
                >
                  Try the Demo
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}