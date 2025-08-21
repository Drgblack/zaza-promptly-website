import { Metadata } from 'next'
import Link from 'next/link'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.zazapromptly.com'
const lastUpdated = '21 August 2025'

export const metadata: Metadata = {
  title: 'Privacy Policy | Promptly',
  description: 'Learn how Promptly collects, uses, and protects your personal information. Our commitment to privacy and data protection for educators.',
  alternates: {
    canonical: '/privacy',
  },
  openGraph: {
    title: 'Privacy Policy | Promptly',
    description: 'Learn how Promptly collects, uses, and protects your personal information. Our commitment to privacy and data protection for educators.',
    url: `${baseUrl}/privacy`,
    images: [
      {
        url: '/og-default.png',
        width: 1200,
        height: 630,
        alt: 'Promptly Privacy Policy',
      },
    ],
    siteName: 'Promptly',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privacy Policy | Promptly',
    description: 'Learn how Promptly collects, uses, and protects your personal information. Our commitment to privacy and data protection for educators.',
    images: ['/og-default.png'],
  },
  robots: 'index, follow',
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-slate-900">
      {/* Hero Section */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-white mb-6">
              Privacy Policy
            </h1>
            <p className="text-xl text-slate-300 mb-6">
              Your privacy is important to us. This policy explains how we collect, use, and protect your information.
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
                    At Promptly (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;), we are committed to protecting your privacy and personal information. 
                    This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you 
                    use our website and services.
                  </p>
                  <p>
                    This policy applies to all users of our website at {baseUrl} and our AI-powered 
                    educational tools and services (collectively, the &quot;Services&quot;).
                  </p>
                </div>
              </section>

              {/* Data We Collect */}
              <section className="mb-12">
                <h2 className="text-2xl font-semibold text-white mb-4">Data We Collect</h2>
                <div className="text-slate-300 space-y-4">
                  <p>We may collect the following types of information:</p>
                  
                  <div className="ml-6">
                    <h3 className="text-xl font-medium text-white mb-3">Personal Information</h3>
                    <ul className="space-y-2">
                      <li>• Name and email address when you contact us or sign up for our waitlist</li>
                      <li>• Professional role and school information you provide</li>
                      <li>• Messages and communications you send to us</li>
                    </ul>
                  </div>

                  <div className="ml-6">
                    <h3 className="text-xl font-medium text-white mb-3">Usage Information</h3>
                    <ul className="space-y-2">
                      <li>• Pages you visit on our website</li>
                      <li>• Time spent on our site and interaction patterns</li>
                      <li>• Device information (browser type, operating system)</li>
                      <li>• IP address and general location information</li>
                    </ul>
                  </div>

                  <div className="ml-6">
                    <h3 className="text-xl font-medium text-white mb-3">Cookies and Tracking</h3>
                    <ul className="space-y-2">
                      <li>• Essential cookies for website functionality</li>
                      <li>• Analytics cookies to understand site usage (only with consent)</li>
                      <li>• Preference cookies to remember your settings</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* How We Use Data */}
              <section className="mb-12">
                <h2 className="text-2xl font-semibold text-white mb-4">How We Use Your Data</h2>
                <div className="text-slate-300 space-y-4">
                  <p>We use the collected information for the following purposes:</p>
                  
                  <ul className="space-y-3 ml-6">
                    <li>• <strong className="text-white">Service Provision:</strong> To provide, maintain, and improve our Services</li>
                    <li>• <strong className="text-white">Communication:</strong> To respond to your inquiries and provide customer support</li>
                    <li>• <strong className="text-white">Product Development:</strong> To understand how our Services are used and develop new features</li>
                    <li>• <strong className="text-white">Marketing:</strong> To send you updates about our products (with your consent)</li>
                    <li>• <strong className="text-white">Analytics:</strong> To analyze website traffic and user behavior</li>
                    <li>• <strong className="text-white">Legal Compliance:</strong> To comply with applicable laws and regulations</li>
                  </ul>

                  <p>
                    We process your data based on legitimate interests, consent, or contractual necessity. 
                    You have the right to withdraw consent at any time where applicable.
                  </p>
                </div>
              </section>

              {/* Data Sharing */}
              <section className="mb-12">
                <h2 className="text-2xl font-semibold text-white mb-4">Data Sharing and Disclosure</h2>
                <div className="text-slate-300 space-y-4">
                  <p>We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:</p>
                  
                  <ul className="space-y-3 ml-6">
                    <li>• <strong className="text-white">Service Providers:</strong> With trusted third-party service providers who assist us in operating our website and Services</li>
                    <li>• <strong className="text-white">Legal Requirements:</strong> When required by law or to protect our rights, safety, or property</li>
                    <li>• <strong className="text-white">Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
                    <li>• <strong className="text-white">Consent:</strong> With your explicit consent for specific purposes</li>
                  </ul>

                  <p>
                    All third-party service providers are bound by confidentiality agreements and are prohibited 
                    from using your information for purposes other than providing services to us.
                  </p>
                </div>
              </section>

              {/* Data Security */}
              <section className="mb-12">
                <h2 className="text-2xl font-semibold text-white mb-4">Data Security</h2>
                <div className="text-slate-300 space-y-4">
                  <p>
                    We implement appropriate technical and organizational measures to protect your personal information 
                    against unauthorized access, alteration, disclosure, or destruction. These measures include:
                  </p>
                  
                  <ul className="space-y-2 ml-6">
                    <li>• Encryption of data in transit and at rest</li>
                    <li>• Regular security assessments and updates</li>
                    <li>• Access controls and authentication measures</li>
                    <li>• Employee training on data protection</li>
                  </ul>

                  <p>
                    However, no method of transmission over the Internet or electronic storage is 100% secure. 
                    While we strive to protect your personal information, we cannot guarantee its absolute security.
                  </p>
                </div>
              </section>

              {/* Your Rights */}
              <section className="mb-12">
                <h2 className="text-2xl font-semibold text-white mb-4">Your Rights</h2>
                <div className="text-slate-300 space-y-4">
                  <p>Depending on your location, you may have the following rights regarding your personal information:</p>
                  
                  <ul className="space-y-2 ml-6">
                    <li>• <strong className="text-white">Access:</strong> Request access to your personal information</li>
                    <li>• <strong className="text-white">Rectification:</strong> Request correction of inaccurate information</li>
                    <li>• <strong className="text-white">Erasure:</strong> Request deletion of your personal information</li>
                    <li>• <strong className="text-white">Portability:</strong> Request transfer of your data</li>
                    <li>• <strong className="text-white">Restriction:</strong> Request limitation of processing</li>
                    <li>• <strong className="text-white">Objection:</strong> Object to processing based on legitimate interests</li>
                  </ul>

                  <p>
                    To exercise any of these rights, please contact us using the information provided below. 
                    We will respond to your request within 30 days.
                  </p>
                </div>
              </section>

              {/* Contact */}
              <section className="mb-12">
                <h2 className="text-2xl font-semibold text-white mb-4">Contact Us</h2>
                <div className="text-slate-300 space-y-4">
                  <p>
                    If you have any questions about this Privacy Policy or our data practices, please contact us:
                  </p>
                  
                  <div className="ml-6">
                    <p>
                      <strong className="text-white">Email:</strong>{' '}
                      <Link 
                        href="mailto:privacy@zazapromptly.com" 
                        className="text-brand-400 hover:text-brand-300 underline decoration-brand-400/50 hover:decoration-brand-300/50 transition-colors"
                      >
                        privacy@zazapromptly.com
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

              {/* Effective Date */}
              <section className="mb-12">
                <h2 className="text-2xl font-semibold text-white mb-4">Changes to This Policy</h2>
                <div className="text-slate-300 space-y-4">
                  <p>
                    We may update this Privacy Policy from time to time to reflect changes in our practices 
                    or applicable laws. We will notify you of any material changes by posting the new 
                    Privacy Policy on this page and updating the &quot;Last updated&quot; date.
                  </p>
                  <p>
                    Your continued use of our Services after any changes indicates your acceptance of the updated policy.
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