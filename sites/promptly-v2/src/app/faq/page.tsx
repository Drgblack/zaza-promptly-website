import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'FAQ: Is Using AI for Teachers Cheating? Safe AI vs ChatGPT | Promptly',
  description: 'Common questions about AI tools for teachers. Learn why Promptly\'s hallucination-safe AI is different from ChatGPT, GDPR compliance, and how to reduce teacher workload ethically.',
  keywords: 'is using AI for teachers cheating, AI vs ChatGPT for teachers, safe AI for teachers, GDPR compliant AI for teachers, hallucination-safe AI, AI tool for teacher reports, best AI tools for teachers 2025',
  alternates: {
    canonical: '/faq',
  },
  openGraph: {
    title: 'FAQ: Is Using AI for Teachers Cheating? Safe AI vs ChatGPT | Promptly',
    description: 'Common questions about AI tools for teachers. Learn why Promptly\'s hallucination-safe AI is different from ChatGPT, GDPR compliance, and how to reduce teacher workload ethically.',
    type: 'article',
  }
}

export default function FAQ() {
  const faqData = [
    {
      question: "Is using AI for teaching cheating?",
      answer: "No, using AI tools like Promptly for administrative tasks is not cheating—it's working smarter. Just like using spell-check or a calculator, AI assists with time-consuming tasks while you focus on what matters most: teaching and connecting with students. Promptly helps with parent communications and report writing, freeing up hours for lesson planning and student interaction.",
      category: "ethics"
    },
    {
      question: "How is Zaza Promptly different from ChatGPT?",
      answer: "Promptly is specifically designed for education with hallucination-safe AI that understands teaching contexts. Unlike ChatGPT, Promptly is GDPR-compliant, doesn't store student data, and is trained on educational best practices. It provides accurate, contextually appropriate content for parent communications and student reports without the risk of generating inappropriate or incorrect information.",
      category: "comparison"
    },
    {
      question: "Will my school data be safe with AI tools?",
      answer: "Yes, Promptly is GDPR-compliant and designed with education-specific privacy protections. We don't store personal student information, use bank-level encryption, and comply with all UK and EU data protection laws. Unlike general AI tools, Promptly is built specifically for the strict privacy requirements of educational institutions.",
      category: "privacy"
    },
    {
      question: "Does Zaza Promptly reduce teacher workload?",
      answer: "Absolutely. Teachers using Promptly report saving 3-5 hours per week on administrative tasks like parent emails and report writing. This time can be redirected to lesson planning, professional development, or achieving better work-life balance. The AI handles repetitive communication tasks while maintaining your professional voice.",
      category: "productivity"
    },
    {
      question: "What makes AI 'hallucination-safe' for teachers?",
      answer: "Hallucination-safe AI means the system won't generate false or inappropriate information. Promptly is trained specifically on educational contexts and includes safety guardrails to ensure all generated content is accurate, appropriate for school communications, and aligned with educational best practices. This is crucial when communicating with parents or writing official reports.",
      category: "safety"
    },
    {
      question: "Can I use Promptly for parent email generation?",
      answer: "Yes, Promptly excels at parent communication. It helps you craft professional, empathetic emails for various situations—progress updates, behavior concerns, meeting requests, or celebration messages. The AI understands the delicate balance needed in parent-teacher communication and helps you maintain positive relationships.",
      category: "features"
    },
    {
      question: "How does AI help with teacher report writing?",
      answer: "Promptly streamlines report writing by helping you transform brief notes into comprehensive, professional reports. Input key points about a student's progress, and the AI expands them into well-structured comments that meet school standards. It maintains your teaching voice while ensuring consistency and professional language across all reports.",
      category: "features"
    },
    {
      question: "Are there free AI tools for teachers available?",
      answer: "Promptly offers a free trial and free tier with limited usage, perfect for trying our hallucination-safe AI. While there are other free tools available, most lack the education-specific training and safety features needed for professional school communications. Promptly's free version gives you access to our safe, education-focused AI.",
      category: "pricing"
    },
    {
      question: "What are the best AI tools for teachers in 2025?",
      answer: "The best AI tools for teachers combine safety, education-specific training, and practical functionality. Promptly leads in parent communication and report writing, while other Zaza products cover lesson planning (Zaza Teach), multimodal planning (Zaza AutoPlanner), and knowledge management (Zaza KnowledgeCore). Look for GDPR-compliant, hallucination-safe tools designed specifically for education.",
      category: "comparison"
    },
    {
      question: "How can teachers use AI ethically in education?",
      answer: "Ethical AI use in education focuses on enhancing—not replacing—human teaching. Use AI for administrative tasks like communications and reports, but maintain human judgment for pedagogical decisions. Always be transparent about AI assistance when required by your school policy, and choose education-specific tools like Promptly that prioritize student privacy and appropriate content generation.",
      category: "ethics"
    },
    {
      question: "Does Promptly work for different types of schools?",
      answer: "Yes, Promptly works across all educational settings—primary schools, secondary schools, special educational needs schools, and international schools. The AI adapts to different educational systems, age groups, and communication styles. Whether you're writing reports for 5-year-olds or 18-year-olds, Promptly understands the appropriate tone and content.",
      category: "features"
    },
    {
      question: "Can AI help reduce teacher burnout and stress?",
      answer: "AI tools like Promptly directly address major sources of teacher stress by automating time-consuming administrative tasks. By reducing the hours spent on report writing and parent communications, teachers have more time for actual teaching, self-care, and work-life balance. This technological support helps combat the epidemic of teacher burnout.",
      category: "wellbeing"
    }
  ]

  const categories = [
    { key: "ethics", label: "Ethics & Professionalism", icon: "⚖️" },
    { key: "comparison", label: "AI Comparison", icon: "🔍" },
    { key: "privacy", label: "Data Privacy & Safety", icon: "🔒" },
    { key: "productivity", label: "Teacher Productivity", icon: "⚡" },
    { key: "safety", label: "AI Safety", icon: "🛡️" },
    { key: "features", label: "Features & Usage", icon: "🚀" },
    { key: "pricing", label: "Pricing & Access", icon: "💰" },
    { key: "wellbeing", label: "Teacher Wellbeing", icon: "💚" }
  ]

  // Generate FAQ Schema for rich snippets
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.map(faq => ({
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      
      <div className="min-h-screen bg-slate-900">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-slate-800 to-slate-900 py-20">
          <div className="container text-center">
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-white mb-6">
              AI Tools for Teachers: Frequently Asked Questions
            </h1>
            <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
              Get answers about using AI ethically in education. Learn about safe AI for teachers, 
              data privacy, and how Promptly differs from ChatGPT for educational use.
            </p>
            
            {/* Trust indicators */}
            <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <span className="text-green-400">🛡️</span>
                <span>Hallucination-Safe AI</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-blue-400">🔒</span>
                <span>GDPR Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-purple-400">🎓</span>
                <span>PhD-Designed Pedagogy</span>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Navigation */}
        <section className="py-12 bg-slate-800/50">
          <div className="container">
            <h2 className="text-xl font-semibold text-white mb-6 text-center">Browse by Topic</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {categories.map(category => (
                <a
                  key={category.key}
                  href={`#${category.key}`}
                  className="flex items-center gap-3 p-3 bg-slate-800 hover:bg-slate-700 rounded-lg transition text-slate-300 hover:text-white"
                >
                  <span className="text-lg">{category.icon}</span>
                  <span className="text-sm font-medium">{category.label}</span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Content */}
        <section className="py-16">
          <div className="container max-w-4xl">
            {categories.map(category => {
              const categoryFaqs = faqData.filter(faq => faq.category === category.key)
              if (categoryFaqs.length === 0) return null

              return (
                <div key={category.key} id={category.key} className="mb-16">
                  <h2 className="flex items-center gap-3 text-2xl font-semibold text-white mb-8">
                    <span className="text-3xl">{category.icon}</span>
                    {category.label}
                  </h2>
                  
                  <dl className="space-y-6">
                    {categoryFaqs.map((faq, index) => (
                      <div key={index} className="bg-slate-800/60 rounded-xl p-6 border border-slate-700/50">
                        <dt className="text-lg font-semibold text-white mb-3">
                          {faq.question}
                        </dt>
                        <dd className="text-slate-300 leading-relaxed">
                          {faq.answer}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )
            })}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-slate-800/50 py-16">
          <div className="container text-center">
            <h2 className="text-2xl font-semibold text-white mb-4">
              Ready to Try Safe AI for Teachers?
            </h2>
            <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
              Join thousands of teachers using Promptly to reduce workload while maintaining the highest standards of professional communication.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/pricing"
                className="px-8 py-4 bg-brand-600 hover:bg-brand-700 text-white font-semibold rounded-lg transition-colors shadow-lg"
              >
                Start Free Trial
              </Link>
              <Link 
                href="/#snippet"
                className="px-8 py-4 border border-brand-600 text-brand-400 hover:bg-brand-600/10 font-semibold rounded-lg transition-colors"
              >
                Try Snippet Tool
              </Link>
            </div>
            
            {/* Additional links */}
            <div className="mt-8 text-slate-400 text-sm">
              <p>Still have questions? 
                <Link href="/contact" className="text-brand-400 hover:text-brand-300 ml-1">Contact our education specialists</Link> or 
                <Link href="/about/founder" className="text-brand-400 hover:text-brand-300 ml-1">learn about our PhD founder</Link>
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}