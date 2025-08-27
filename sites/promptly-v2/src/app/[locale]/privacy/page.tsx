import type { Metadata } from 'next';
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Shield, Lock, Eye, Server, Mail, Users } from 'lucide-react'

// Disable static generation - render pages dynamically to prevent build errors
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Privacy Policy | Data Protection & Security - Zaza Technologies',
  description: 'Learn how Zaza Technologies protects your privacy and student data. GDPR & FERPA compliant AI teaching tools with secure data handling.',
  keywords: 'privacy policy, data protection, GDPR compliant, FERPA compliant, secure AI tools, educational data privacy',
  openGraph: {
    title: 'Privacy Policy - Zaza Technologies',
    description: 'Your privacy and data security are our top priorities. Learn how we protect and handle your information.',
    type: 'website',
    url: 'https://zazapromptly.com/privacy',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privacy Policy - Zaza Technologies',
    description: 'Your privacy and data security are our top priorities. Learn how we protect and handle your information.',
  },
  alternates: {
    canonical: 'https://zazapromptly.com/privacy',
  },
};

export default function Privacy() {
  return (
    <>
      <Header />
      
      <main className="min-h-screen pt-16 lg:pt-20 bg-white">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-purple-50 to-pink-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex items-center justify-center mb-6">
              <Shield className="w-12 h-12 text-purple-600 mr-4" />
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-800">
                Privacy Policy
              </h1>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Your privacy and data security are our top priorities. Learn how we protect and handle your information.
            </p>
            <div className="mt-8 text-sm text-gray-500">
              Last updated: December 1, 2024
            </div>
          </div>
        </section>

        {/* Quick Overview */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Privacy at a Glance</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="text-center p-6 bg-gray-50 rounded-xl">
                <Lock className="w-8 h-8 text-green-600 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-800 mb-2">GDPR & FERPA Compliant</h3>
                <p className="text-sm text-gray-600">Full compliance with international privacy regulations</p>
              </div>
              
              <div className="text-center p-6 bg-gray-50 rounded-xl">
                <Eye className="w-8 h-8 text-blue-600 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-800 mb-2">No Data Selling</h3>
                <p className="text-sm text-gray-600">We never sell, rent, or trade your personal information</p>
              </div>
              
              <div className="text-center p-6 bg-gray-50 rounded-xl">
                <Server className="w-8 h-8 text-purple-600 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-800 mb-2">Secure Storage</h3>
                <p className="text-sm text-gray-600">All data encrypted and stored securely in Australia</p>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Privacy Policy */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
              
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">1. Information We Collect</h2>
                  <div className="prose prose-gray max-w-none">
                    <h3 className="text-lg font-semibold text-gray-700 mb-3">Personal Information</h3>
                    <ul className="list-disc pl-6 space-y-2 text-gray-600">
                      <li>Name and email address (for account creation and communication)</li>
                      <li>School or institution name (optional, for educational context)</li>
                      <li>Grade level and subject areas (to personalize AI responses)</li>
                      <li>Payment information (processed securely through Stripe)</li>
                    </ul>

                    <h3 className="text-lg font-semibold text-gray-700 mb-3 mt-6">Usage Data</h3>
                    <ul className="list-disc pl-6 space-y-2 text-gray-600">
                      <li>AI interaction logs (to improve our services)</li>
                      <li>Feature usage patterns (for product development)</li>
                      <li>Technical information (IP address, browser type, device information)</li>
                      <li>Performance metrics (response times, error rates)</li>
                    </ul>

                    <h3 className="text-lg font-semibold text-gray-700 mb-3 mt-6">Student Information</h3>
                    <p className="text-gray-600 mb-3">
                      <strong>Important:</strong> We do not store specific student names or personally identifiable information. 
                      Teachers input general observations (e.g., "student improved in math") and our AI generates appropriate feedback.
                    </p>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">2. How We Use Your Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <Mail className="w-6 h-6 text-purple-600 mb-2" />
                      <h3 className="font-semibold text-gray-800 mb-2">Service Delivery</h3>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Generate AI-powered feedback</li>
                        <li>• Personalize user experience</li>
                        <li>• Process payments securely</li>
                        <li>• Provide customer support</li>
                      </ul>
                    </div>
                    
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <Users className="w-6 h-6 text-blue-600 mb-2" />
                      <h3 className="font-semibold text-gray-800 mb-2">Communication</h3>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Send service updates</li>
                        <li>• Educational newsletters (opt-in)</li>
                        <li>• Technical support messages</li>
                        <li>• Account security notifications</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">3. Data Security & Protection</h2>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                    <h3 className="font-semibold text-green-800 mb-3">Our Security Measures:</h3>
                    <ul className="space-y-2 text-green-700">
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span><strong>Encryption:</strong> All data encrypted in transit (TLS 1.3) and at rest (AES-256)</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span><strong>Access Control:</strong> Role-based permissions and multi-factor authentication</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span><strong>Regular Audits:</strong> Third-party security assessments and vulnerability testing</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span><strong>Data Minimization:</strong> Collect only necessary data, delete when no longer needed</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">4. Educational Compliance</h2>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                    <p className="text-blue-800 mb-4">
                      <strong>FERPA Compliance:</strong> Zaza Promptly is designed to be FERPA-compliant for US educational institutions. 
                      We act as a service provider under FERPA guidelines.
                    </p>
                    <p className="text-blue-800 mb-4">
                      <strong>GDPR Compliance:</strong> Full compliance with European privacy regulations, including data subject rights 
                      and lawful basis for processing.
                    </p>
                    <p className="text-blue-800">
                      <strong>Australian Privacy Act:</strong> Compliance with Australian privacy principles and data handling requirements.
                    </p>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">5. Your Rights & Choices</h2>
                  <div className="space-y-4">
                    <div className="p-4 border border-gray-200 rounded-lg">
                      <h3 className="font-semibold text-gray-800 mb-2">Access & Portability</h3>
                      <p className="text-gray-600 text-sm">Request a copy of your personal data in a machine-readable format</p>
                    </div>
                    
                    <div className="p-4 border border-gray-200 rounded-lg">
                      <h3 className="font-semibold text-gray-800 mb-2">Correction & Updates</h3>
                      <p className="text-gray-600 text-sm">Update or correct your personal information at any time</p>
                    </div>
                    
                    <div className="p-4 border border-gray-200 rounded-lg">
                      <h3 className="font-semibold text-gray-800 mb-2">Deletion</h3>
                      <p className="text-gray-600 text-sm">Request deletion of your account and associated data</p>
                    </div>
                    
                    <div className="p-4 border border-gray-200 rounded-lg">
                      <h3 className="font-semibold text-gray-800 mb-2">Marketing Preferences</h3>
                      <p className="text-gray-600 text-sm">Opt-out of marketing communications (unsubscribe links in all emails)</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">6. Third-Party Services</h2>
                  <div className="space-y-3">
                    <p className="text-gray-600">We use trusted third-party services to deliver our platform:</p>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span><strong>Stripe:</strong> Secure payment processing (PCI DSS compliant)</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span><strong>Amazon Web Services:</strong> Cloud hosting and data storage (ISO 27001 certified)</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span><strong>Google Analytics:</strong> Website analytics (anonymized data only)</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">7. Data Retention</h2>
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                    <ul className="space-y-2 text-yellow-800">
                      <li><strong>Account Data:</strong> Retained while account is active + 2 years</li>
                      <li><strong>Usage Logs:</strong> Retained for 12 months for service improvement</li>
                      <li><strong>Payment Data:</strong> Retained per legal requirements (7 years)</li>
                      <li><strong>Marketing Data:</strong> Until you unsubscribe or request deletion</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">8. Contact Us</h2>
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                    <p className="text-purple-800 mb-4">
                      Questions about this privacy policy or your data? We're here to help.
                    </p>
                    <div className="space-y-2 text-purple-700">
                      <p><strong>Email:</strong> privacy@zazapromptly.com</p>
                      <p><strong>Mail:</strong> Zaza Technologies UG, Privacy Officer, Melbourne, VIC, Australia</p>
                      <p><strong>Response Time:</strong> Within 48 hours for privacy inquiries</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
} 