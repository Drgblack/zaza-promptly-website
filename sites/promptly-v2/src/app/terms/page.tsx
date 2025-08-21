import { Metadata } from 'next'
import Link from 'next/link'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.zazapromptly.com'
const lastUpdated = '21 August 2025'

export const metadata: Metadata = {
  title: 'Terms of Service | Promptly',
  description: 'Terms and conditions for using Promptly&apos;s AI-powered educational tools and services. Read our terms of service for educators.',
  alternates: {
    canonical: '/terms',
  },
  openGraph: {
    title: 'Terms of Service | Promptly',
    description: 'Terms and conditions for using Promptly&apos;s AI-powered educational tools and services. Read our terms of service for educators.',
    url: `${baseUrl}/terms`,
    images: [
      {
        url: '/og-default.png',
        width: 1200,
        height: 630,
        alt: 'Promptly Terms of Service',
      },
    ],
    siteName: 'Promptly',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Terms of Service | Promptly',
    description: 'Terms and conditions for using Promptly&apos;s AI-powered educational tools and services. Read our terms of service for educators.',
    images: ['/og-default.png'],
  },
  robots: 'index, follow',
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-900">
      {/* Hero Section */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-white mb-6">
              Terms of Service
            </h1>
            <p className="text-xl text-slate-300 mb-6">
              These terms govern your use of Promptly&apos;s services and website.
            </p>
            <p className="text-sm text-slate-400">
              Last updated: {lastUpdated}
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="pb-20">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-invert prose-lg max-w-none">
              
              {/* Introduction */}
              <section className="mb-12">
                <h2 className="text-2xl font-semibold text-white mb-4">Introduction</h2>
                <div className="text-slate-300 space-y-4">
                  <p>
                    Welcome to Promptly (&quot;we,&quot; &quot;us,&quot; &quot;our,&quot; or &quot;the Service&quot;). These Terms of Service 
                    (&quot;Terms&quot;) govern your use of our website located at {baseUrl} and our 
                    AI-powered educational tools and services.
                  </p>
                  <p>
                    By accessing or using our Service, you agree to be bound by these Terms. 
                    If you disagree with any part of these terms, then you may not access the Service.
                  </p>
                </div>
              </section>

              {/* Acceptance of Terms */}
              <section className="mb-12">
                <h2 className="text-2xl font-semibold text-white mb-4">Acceptance of Terms</h2>
                <div className="text-slate-300 space-y-4">
                  <p>
                    By accessing and using Promptly, you accept and agree to be bound by the terms 
                    and provision of this agreement. Additionally, when using this website&apos;s particular 
                    services, you shall be subject to any posted guidelines or rules applicable to such services.
                  </p>
                  <p>
                    These Terms apply to all visitors, users, and others who access or use the Service.
                  </p>
                </div>
              </section>

              {/* Use License */}
              <section className="mb-12">
                <h2 className="text-2xl font-semibold text-white mb-4">Use License</h2>
                <div className="text-slate-300 space-y-4">
                  <p>
                    Permission is granted to temporarily access and use Promptly for personal, 
                    non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
                  </p>
                  
                  <ul className="space-y-2 ml-6">
                    <li>• Modify or copy the materials</li>
                    <li>• Use the materials for any commercial purpose or for any public display (commercial or non-commercial)</li>
                    <li>• Attempt to decompile or reverse engineer any software contained on the website</li>
                    <li>• Remove any copyright or other proprietary notations from the materials</li>
                    <li>• Use the service to generate content that violates applicable laws or regulations</li>
                  </ul>

                  <p>
                    This license shall automatically terminate if you violate any of these restrictions 
                    and may be terminated by us at any time.
                  </p>
                </div>
              </section>

              {/* User Accounts */}
              <section className="mb-12">
                <h2 className="text-2xl font-semibold text-white mb-4">User Accounts</h2>
                <div className="text-slate-300 space-y-4">
                  <p>
                    When you create an account with us, you must provide information that is accurate, 
                    complete, and current at all times. You are responsible for safeguarding the password 
                    and for all activities that occur under your account.
                  </p>
                  <p>
                    You agree to immediately notify us of any unauthorized use of your account or any 
                    other breach of security. We will not be liable for any loss or damage arising from 
                    your failure to comply with this section.
                  </p>
                </div>
              </section>

              {/* Prohibited Uses */}
              <section className="mb-12">
                <h2 className="text-2xl font-semibold text-white mb-4">Prohibited Uses</h2>
                <div className="text-slate-300 space-y-4">
                  <p>You may not use our Service:</p>
                  
                  <ul className="space-y-2 ml-6">
                    <li>• For any unlawful purpose or to solicit others to commit unlawful acts</li>
                    <li>• To violate any international, federal, provincial, or state regulations or laws</li>
                    <li>• To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
                    <li>• To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
                    <li>• To submit false or misleading information</li>
                    <li>• To upload or transmit viruses or any other type of malicious code</li>
                    <li>• To spam, phish, pharm, pretext, spider, crawl, or scrape</li>
                    <li>• For any obscene or immoral purpose</li>
                    <li>• To interfere with or circumvent the security features of the Service</li>
                  </ul>
                </div>
              </section>

              {/* Content and Intellectual Property */}
              <section className="mb-12">
                <h2 className="text-2xl font-semibold text-white mb-4">Content and Intellectual Property</h2>
                <div className="text-slate-300 space-y-4">
                  <p>
                    Our Service and its original content, features, and functionality are and will remain 
                    the exclusive property of Promptly and its licensors. The Service is protected by 
                    copyright, trademark, and other laws.
                  </p>
                  <p>
                    You retain ownership of any content you submit to our Service (&quot;User Content&quot;). 
                    However, by submitting User Content, you grant us a worldwide, non-exclusive, 
                    royalty-free license to use, reproduce, modify, and display such content solely 
                    for the purpose of providing the Service.
                  </p>
                  <p>
                    Content generated by our AI tools may be used by you for educational purposes. 
                    However, you acknowledge that AI-generated content should be reviewed and may 
                    require human oversight before use with students.
                  </p>
                </div>
              </section>

              {/* Privacy Policy */}
              <section className="mb-12">
                <h2 className="text-2xl font-semibold text-white mb-4">Privacy Policy</h2>
                <div className="text-slate-300 space-y-4">
                  <p>
                    Your privacy is important to us. Please review our Privacy Policy, which also 
                    governs your use of the Service, to understand our practices.
                  </p>
                  <p>
                    <Link 
                      href="/privacy" 
                      className="text-brand-400 hover:text-brand-300 underline decoration-brand-400/50 hover:decoration-brand-300/50 transition-colors"
                    >
                      View our Privacy Policy
                    </Link>
                  </p>
                </div>
              </section>

              {/* Disclaimers */}
              <section className="mb-12">
                <h2 className="text-2xl font-semibold text-white mb-4">Disclaimers</h2>
                <div className="text-slate-300 space-y-4">
                  <p>
                    The Service is provided on an &quot;as is&quot; and &quot;as available&quot; basis. Promptly makes no 
                    representations or warranties of any kind, express or implied, as to the operation 
                    of the Service or the information, content, materials, or products included on the Service.
                  </p>
                  <p>
                    We do not warrant that the Service will be uninterrupted or error-free, and we will 
                    not be responsible for interruptions (including, but not limited to, power outages, 
                    system failures, or other interruptions that may affect the receipt, processing, 
                    acceptance, completion, or settlement of transactions).
                  </p>
                  <p>
                    <strong className="text-white">Educational Use Disclaimer:</strong> Our AI-generated 
                    content is designed to assist educators but should not replace professional judgment. 
                    All AI-generated content should be reviewed before use with students.
                  </p>
                </div>
              </section>

              {/* Limitation of Liability */}
              <section className="mb-12">
                <h2 className="text-2xl font-semibold text-white mb-4">Limitation of Liability</h2>
                <div className="text-slate-300 space-y-4">
                  <p>
                    In no event shall Promptly, nor its directors, employees, partners, agents, suppliers, 
                    or affiliates, be liable for any indirect, incidental, special, consequential, or 
                    punitive damages, including without limitation, loss of profits, data, use, goodwill, 
                    or other intangible losses, resulting from your use of the Service.
                  </p>
                </div>
              </section>

              {/* Termination */}
              <section className="mb-12">
                <h2 className="text-2xl font-semibold text-white mb-4">Termination</h2>
                <div className="text-slate-300 space-y-4">
                  <p>
                    We may terminate or suspend your account and bar access to the Service immediately, 
                    without prior notice or liability, under our sole discretion, for any reason whatsoever 
                    and without limitation, including but not limited to a breach of the Terms.
                  </p>
                  <p>
                    If you wish to terminate your account, you may simply discontinue using the Service 
                    or contact us to request account deletion.
                  </p>
                </div>
              </section>

              {/* Contact Information */}
              <section className="mb-12">
                <h2 className="text-2xl font-semibold text-white mb-4">Contact Information</h2>
                <div className="text-slate-300 space-y-4">
                  <p>
                    If you have any questions about these Terms of Service, please contact us:
                  </p>
                  
                  <div className="ml-6">
                    <p>
                      <strong className="text-white">Email:</strong>{' '}
                      <Link 
                        href="mailto:legal@zazapromptly.com" 
                        className="text-brand-400 hover:text-brand-300 underline decoration-brand-400/50 hover:decoration-brand-300/50 transition-colors"
                      >
                        legal@zazapromptly.com
                      </Link>
                    </p>
                    <p>
                      <strong className="text-white">General Contact:</strong>{' '}
                      <Link 
                        href="/contact" 
                        className="text-brand-400 hover:text-brand-300 underline decoration-brand-400/50 hover:decoration-brand-300/50 transition-colors"
                      >
                        Contact Form
                      </Link>
                    </p>
                  </div>
                </div>
              </section>

              {/* Changes to Terms */}
              <section className="mb-12">
                <h2 className="text-2xl font-semibold text-white mb-4">Changes to Terms</h2>
                <div className="text-slate-300 space-y-4">
                  <p>
                    We reserve the right, at our sole discretion, to modify or replace these Terms 
                    at any time. If a revision is material, we will try to provide at least 30 days&apos; 
                    notice prior to any new terms taking effect.
                  </p>
                  <p>
                    What constitutes a material change will be determined at our sole discretion. 
                    By continuing to access or use our Service after any revisions become effective, 
                    you agree to be bound by the revised terms.
                  </p>
                  <p className="text-slate-400 text-sm">
                    <strong>Effective Date:</strong> {lastUpdated}
                  </p>
                </div>
              </section>

            </div>
          </div>
        </div>
      </section>
    </div>
  )
}