import { Metadata } from 'next'
import { Shield, Lock, FileText, CheckCircle2, Eye, Globe } from 'lucide-react'
import EmailCaptureSection from '@/components/email/EmailCaptureSection'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.zazapromptly.com"

export const metadata: Metadata = {
  title: 'Student Privacy Protected | Promptly',
  description: 'Comprehensive student privacy protection with GDPR, FERPA alignment, data minimisation, and secure processing. Your students\' data is safe with us.',
  keywords: ['student privacy', 'data protection', 'FERPA', 'GDPR', 'student safety', 'data minimisation', 'privacy by design', 'educational data'],
  openGraph: {
    title: 'Student Privacy Protected | Promptly',
    description: 'Comprehensive student privacy protection with GDPR, FERPA alignment, and secure processing.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Student Privacy Protected | Promptly', 
    description: 'Comprehensive student privacy protection with GDPR, FERPA alignment, and secure processing.',
  },
}

// FAQ Schema for rich snippets
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Do you store student names?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No, we practice data minimisation. Teachers can anonymise content before processing, and we don't require or store student names or identifiers. You control what information is shared."
      }
    },
    {
      "@type": "Question", 
      "name": "Can we request deletion of our data?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, absolutely. You can export or delete your data at any time through your account settings. For school-wide deletions, contact your school administrator or reach out to us directly."
      }
    },
    {
      "@type": "Question",
      "name": "Where is our data processed?",
      "acceptedAnswer": {
        "@type": "Answer", 
        "text": "By default, data is processed in secure EU facilities for GDPR compliance. We offer data residency options and can accommodate specific regional requirements for your school."
      }
    },
    {
      "@type": "Question",
      "name": "Is AI output stored permanently?", 
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "AI outputs are stored temporarily in your session for improvement suggestions, then deleted according to our retention policy. You control what gets saved long-term."
      }
    },
    {
      "@type": "Question",
      "name": "How do we request a Data Processing Agreement?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "School administrators can request a DPA by contacting our sales team. We provide standard contractual clauses and can accommodate specific compliance requirements."
      }
    }
  ]
}

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage", 
  "@id": `${baseUrl}/student-privacy`,
  "name": "Student Privacy Protected",
  "description": "Comprehensive approach to protecting student data and privacy in educational AI tools.",
  "url": `${baseUrl}/student-privacy`,
  "inLanguage": "en",
  "isPartOf": {
    "@type": "WebSite",
    "@id": `${baseUrl}/#website`
  },
  "about": {
    "@type": "Thing",
    "name": "Student Privacy Protection"
  },
  "alternates": {
    "@type": "Thing",
    "name": "Alternate Language",
    "url": `${baseUrl}/de/student-privacy`
  }
}

export default function StudentPrivacyPage() {
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
        <section className="bg-gradient-to-br from-emerald-50/50 to-blue-100/50 dark:from-slate-900 dark:to-slate-800 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full mb-6">
                <Shield className="w-8 h-8 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-100 dark:text-white mb-6">
                Student Privacy Protected
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                Your students' data is safe with us. We follow strict privacy-by-design principles and comply with education data protection standards.
              </p>
            </div>
          </div>
        </section>

        {/* Our Commitments */}
        <section className="py-16 bg-white dark:bg-slate-900">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-slate-100 dark:text-white mb-4">
                  Our Privacy Commitments
                </h2>
                <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                  We've built Promptly with privacy at its core, following best practices for educational technology.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg mb-4">
                    <Eye className="w-6 h-6 text-blue-600 dark:text-blue-400" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-100 dark:text-white mb-3">
                    Data Minimisation
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                    We only collect and process the minimum data needed for our service. Teachers can anonymise content, and we don't require student names or identifiers.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg mb-4">
                    <Lock className="w-6 h-6 text-purple-600 dark:text-purple-400" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-100 dark:text-white mb-3">
                    Purpose Limitation
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                    Your data is used solely for improving educational communications. We never sell, rent, or share student data with third parties for marketing.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg mb-4">
                    <Shield className="w-6 h-6 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-100 dark:text-white mb-3">
                    No Student Profiles
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                    We don't build profiles or track individual students. Our AI processes anonymous content to help with communication, not surveillance.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg mb-4">
                    <Globe className="w-6 h-6 text-orange-600 dark:text-orange-400" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-100 dark:text-white mb-3">
                    Regional Hosting
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                    Data is processed in secure EU facilities by default for GDPR compliance. We offer data residency options for specific regional requirements.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg mb-4">
                    <CheckCircle2 className="w-6 h-6 text-green-600 dark:text-green-400" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-100 dark:text-white mb-3">
                    Transparent Retention
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                    Clear data retention policies with automatic deletion schedules. Teachers maintain control over what's saved and for how long.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-lg mb-4">
                    <FileText className="w-6 h-6 text-red-600 dark:text-red-400" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-100 dark:text-white mb-3">
                    User Control & Rights
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                    Export, correct, or delete your data anytime. Full transparency about what's collected and how it's used, with easy opt-out options.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Compliance & Standards */}
        <section className="py-16 bg-slate-50 dark:bg-slate-800">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-slate-100 dark:text-white mb-8 text-center">
                Compliance & Standards
              </h2>

              <div className="space-y-8">
                <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-8">
                  <h3 className="text-2xl font-semibold text-slate-100 dark:text-white mb-4">
                    GDPR Compliance
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                    We operate as a data processor under GDPR, with your school as the data controller. This ensures:
                  </p>
                  <ul className="text-gray-600 dark:text-gray-300 space-y-2 ml-4">
                    <li className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 mr-2 flex-shrink-0 mt-0.5" />
                      Lawful basis for processing (legitimate educational interest)
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 mr-2 flex-shrink-0 mt-0.5" />
                      Data Processing Agreements available for all schools
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 mr-2 flex-shrink-0 mt-0.5" />
                      Standard Contractual Clauses for international transfers
                    </li>
                  </ul>
                </div>

                <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-8">
                  <h3 className="text-2xl font-semibold text-slate-100 dark:text-white mb-4">
                    FERPA Alignment (US Schools)
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                    While Promptly is primarily designed for international schools, we understand US schools' FERPA requirements:
                  </p>
                  <ul className="text-gray-600 dark:text-gray-300 space-y-2 ml-4">
                    <li className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 mr-2 flex-shrink-0 mt-0.5" />
                      Teachers can anonymise all student-identifying information
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 mr-2 flex-shrink-0 mt-0.5" />
                      Purpose-limited processing aligned with educational objectives
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 mr-2 flex-shrink-0 mt-0.5" />
                      No disclosure of educational records to unauthorised parties
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Data Flow */}
        <section className="py-16 bg-white dark:bg-slate-900">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-slate-100 dark:text-white mb-8 text-center">
                How Your Data Flows
              </h2>
              
              <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-8">
                <div className="prose max-w-none text-gray-600 dark:text-gray-300">
                  <div className="grid md:grid-cols-3 gap-6 text-center">
                    <div>
                      <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-blue-600 dark:text-blue-400 font-bold">1</span>
                      </div>
                      <h4 className="font-semibold text-slate-100 dark:text-white mb-2">Input</h4>
                      <p className="text-sm">Teacher pastes draft text (can be anonymised)</p>
                    </div>
                    <div>
                      <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-purple-600 dark:text-purple-400 font-bold">2</span>
                      </div>
                      <h4 className="font-semibold text-slate-100 dark:text-white mb-2">Processing</h4>
                      <p className="text-sm">AI improves tone & clarity in secure EU facilities</p>
                    </div>
                    <div>
                      <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-emerald-600 dark:text-emerald-400 font-bold">3</span>
                      </div>
                      <h4 className="font-semibold text-slate-100 dark:text-white mb-2">Output</h4>
                      <p className="text-sm">Improved text returned, session data auto-deleted</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* School Controls */}
        <section className="py-16 bg-slate-50 dark:bg-slate-800">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-slate-100 dark:text-white mb-8 text-center">
                School Controls
              </h2>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-6">
                  <h3 className="text-xl font-semibold text-slate-100 dark:text-white mb-4">
                    Teacher Controls
                  </h3>
                  <ul className="text-gray-600 dark:text-gray-300 space-y-3">
                    <li className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 mr-3 flex-shrink-0 mt-0.5" />
                      Export all personal data in portable format
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 mr-3 flex-shrink-0 mt-0.5" />
                      Delete account and associated data instantly
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 mr-3 flex-shrink-0 mt-0.5" />
                      Anonymise content before processing
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 mr-3 flex-shrink-0 mt-0.5" />
                      Control what data gets saved vs. discarded
                    </li>
                  </ul>
                </div>

                <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-6">
                  <h3 className="text-xl font-semibold text-slate-100 dark:text-white mb-4">
                    School Administration
                  </h3>
                  <ul className="text-gray-600 dark:text-gray-300 space-y-3">
                    <li className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 mr-3 flex-shrink-0 mt-0.5" />
                      Data Processing Agreements available on request
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 mr-3 flex-shrink-0 mt-0.5" />
                      Bulk data export for compliance audits
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 mr-3 flex-shrink-0 mt-0.5" />
                      Optional data residency (EU default)
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 mr-3 flex-shrink-0 mt-0.5" />
                      Dedicated support for privacy questions
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 bg-white dark:bg-slate-900">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-slate-100 dark:text-white mb-8 text-center">
                Privacy Questions
              </h2>

              <div className="space-y-6">
                <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-6">
                  <h3 className="text-lg font-semibold text-slate-100 dark:text-white mb-3">
                    Do you store student names?
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    No, we practice data minimisation. Teachers can anonymise content before processing, and we don't require or store student names or identifiers. You control what information is shared.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-6">
                  <h3 className="text-lg font-semibold text-slate-100 dark:text-white mb-3">
                    Can we request deletion of our data?
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    Yes, absolutely. You can export or delete your data at any time through your account settings. For school-wide deletions, contact your school administrator or reach out to us directly.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-6">
                  <h3 className="text-lg font-semibold text-slate-100 dark:text-white mb-3">
                    Where is our data processed?
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    By default, data is processed in secure EU facilities for GDPR compliance. We offer data residency options and can accommodate specific regional requirements for your school.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-6">
                  <h3 className="text-lg font-semibold text-slate-100 dark:text-white mb-3">
                    Is AI output stored permanently?
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    AI outputs are stored temporarily in your session for improvement suggestions, then deleted according to our retention policy. You control what gets saved long-term.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-6">
                  <h3 className="text-lg font-semibold text-slate-100 dark:text-white mb-3">
                    How do we request a Data Processing Agreement?
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    School administrators can request a DPA by contacting our sales team. We provide standard contractual clauses and can accommodate specific compliance requirements.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-emerald-600 to-blue-600">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-white mb-6">
                Need More Information?
              </h2>
              <p className="text-emerald-100 mb-8 max-w-2xl mx-auto">
                We're here to answer your privacy questions and provide the documentation you need for compliance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center px-8 py-3 bg-white text-emerald-600 font-semibold rounded-lg hover:bg-emerald-50 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-emerald-600"
                >
                  Contact sales for DPA
                </a>
                <a
                  href="/faq"
                  className="inline-flex items-center justify-center px-8 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-emerald-600 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-emerald-600"
                >
                  Read our FAQ
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Email Capture */}
        <EmailCaptureSection 
          title="Stay Updated on Privacy Practices"
          description="Get notified about privacy policy updates and new compliance features."
          placeholder="Enter your email for privacy updates"
          buttonText="Stay Informed"
          source="student-privacy"
        />
      </main>
    </>
  )
}