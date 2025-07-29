import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { FileText, Scale, Users, CreditCard, AlertTriangle, Mail } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Terms of Service | Legal Agreement - Zaza Technologies',
  description: 'Read Zaza Technologies\' terms of service for using our AI-powered teaching tools. Fair, transparent terms for educational technology use.',
  keywords: 'terms of service, legal agreement, AI teaching tools terms, educational technology agreement, Zaza Promptly terms',
  openGraph: {
    title: 'Terms of Service - Zaza Technologies',
    description: 'Our commitment to fair, transparent terms for using Zaza Promptly\'s AI-powered teaching tools.',
    type: 'website',
    url: 'https://zazapromptly.com/terms',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Terms of Service - Zaza Technologies',
    description: 'Our commitment to fair, transparent terms for using Zaza Promptly\'s AI-powered teaching tools.',
  },
  alternates: {
    canonical: 'https://zazapromptly.com/terms',
  },
};

export default function Terms() {
  return (
    <>
      <Header />
      
      <main className="min-h-screen pt-16 lg:pt-20 bg-white">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-purple-50 to-pink-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex items-center justify-center mb-6">
              <Scale className="w-12 h-12 text-purple-600 mr-4" />
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-800">
                Terms of Service
              </h1>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our commitment to fair, transparent terms for using Zaza Promptly's AI-powered teaching tools.
            </p>
            <div className="mt-8 text-sm text-gray-500">
              Last updated: December 1, 2024
            </div>
          </div>
        </section>

        {/* Terms Content */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
              
              {/* Introduction */}
              <div className="mb-12">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
                  <h2 className="text-xl font-bold text-blue-800 mb-3">Agreement Overview</h2>
                  <p className="text-blue-700">
                    By accessing and using Zaza Promptly ("Service"), you agree to be bound by these Terms of Service. 
                    This agreement is between you and Zaza Technologies UG ("we," "us," or "our"). 
                    Please read these terms carefully before using our AI-powered educational tools.
                  </p>
                </div>
              </div>

              <div className="space-y-12">
                
                {/* 1. Service Description */}
                <div>
                  <div className="flex items-center mb-4">
                    <FileText className="w-6 h-6 text-purple-600 mr-3" />
                    <h2 className="text-2xl font-bold text-gray-800">1. Service Description</h2>
                  </div>
                  
                  <div className="space-y-4 text-gray-600">
                    <p>
                      Zaza Promptly is an AI-powered platform designed specifically for educators to:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Generate personalized student feedback and comments</li>
                      <li>Create educational content and lesson materials</li>
                      <li>Streamline administrative tasks through AI automation</li>
                      <li>Improve teaching efficiency and student outcomes</li>
                    </ul>
                    <p>
                      Our service is intended for professional educational use by teachers, administrators, and educational institutions.
                    </p>
                  </div>
                </div>

                {/* 2. User Accounts and Eligibility */}
                <div>
                  <div className="flex items-center mb-4">
                    <Users className="w-6 h-6 text-purple-600 mr-3" />
                    <h2 className="text-2xl font-bold text-gray-800">2. User Accounts & Eligibility</h2>
                  </div>
                  
                  <div className="space-y-4 text-gray-600">
                    <h3 className="text-lg font-semibold text-gray-800">Eligibility Requirements:</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Must be at least 18 years old</li>
                      <li>Must be a current educator, teacher, or education professional</li>
                      <li>Must provide accurate registration information</li>
                      <li>Must comply with your institution's technology policies</li>
                    </ul>
                    
                    <h3 className="text-lg font-semibold text-gray-800 mt-6">Account Responsibilities:</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Maintain confidentiality of your login credentials</li>
                      <li>Notify us immediately of any unauthorized access</li>
                      <li>Use the service only for legitimate educational purposes</li>
                      <li>Comply with all applicable laws and regulations</li>
                    </ul>
                  </div>
                </div>

                {/* 3. Acceptable Use Policy */}
                <div>
                  <div className="flex items-center mb-4">
                    <AlertTriangle className="w-6 h-6 text-purple-600 mr-3" />
                    <h2 className="text-2xl font-bold text-gray-800">3. Acceptable Use Policy</h2>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                      <h3 className="font-semibold text-green-800 mb-3">✅ Permitted Uses:</h3>
                      <ul className="space-y-2 text-green-700">
                        <li>• Generate student feedback and educational content</li>
                        <li>• Create lesson plans and teaching materials</li>
                        <li>• Automate administrative educational tasks</li>
                        <li>• Professional development and training purposes</li>
                      </ul>
                    </div>
                    
                    <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                      <h3 className="font-semibold text-red-800 mb-3">❌ Prohibited Uses:</h3>
                      <ul className="space-y-2 text-red-700">
                        <li>• Violating student privacy or FERPA regulations</li>
                        <li>• Generating harmful, discriminatory, or inappropriate content</li>
                        <li>• Sharing accounts or login credentials</li>
                        <li>• Using the service for non-educational commercial purposes</li>
                        <li>• Attempting to reverse engineer or exploit our AI systems</li>
                        <li>• Uploading malicious code or harmful content</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* 4. Privacy and Data Protection */}
                <div>
                  <div className="flex items-center mb-4">
                    <Users className="w-6 h-6 text-purple-600 mr-3" />
                    <h2 className="text-2xl font-bold text-gray-800">4. Privacy & Data Protection</h2>
                  </div>
                  
                  <div className="space-y-4 text-gray-600">
                    <p>
                      Your privacy and student data protection are our highest priorities. Our practices include:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li><strong>FERPA Compliance:</strong> Full compliance with US educational privacy regulations</li>
                      <li><strong>GDPR Compliance:</strong> European data protection standards</li>
                      <li><strong>Data Minimization:</strong> We collect only necessary information</li>
                      <li><strong>Secure Storage:</strong> All data encrypted and stored securely</li>
                    </ul>
                    <p className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-blue-800">
                      <strong>Important:</strong> For complete details on data handling, please review our 
                      <Link href="/privacy" className="underline ml-1">Privacy Policy</Link>.
                    </p>
                  </div>
                </div>

                {/* 5. Subscription and Payment Terms */}
                <div>
                  <div className="flex items-center mb-4">
                    <CreditCard className="w-6 h-6 text-purple-600 mr-3" />
                    <h2 className="text-2xl font-bold text-gray-800">5. Subscription & Payment Terms</h2>
                  </div>
                  
                  <div className="space-y-4 text-gray-600">
                    <h3 className="text-lg font-semibold text-gray-800">Pricing and Billing:</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Subscription fees are billed monthly or annually as selected</li>
                      <li>All payments processed securely through Stripe</li>
                      <li>Prices may change with 30 days' notice to existing subscribers</li>
                      <li>No refunds for partial months, but cancellation stops future billing</li>
                    </ul>
                    
                    <h3 className="text-lg font-semibold text-gray-800 mt-6">Free Trial and Cancellation:</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>30-day money-back guarantee for new subscribers</li>
                      <li>Cancel anytime through your account settings</li>
                      <li>Access continues until the end of your billing period</li>
                      <li>No cancellation fees or penalties</li>
                    </ul>
                  </div>
                </div>

                {/* 6. Intellectual Property */}
                <div>
                  <div className="flex items-center mb-4">
                    <FileText className="w-6 h-6 text-purple-600 mr-3" />
                    <h2 className="text-2xl font-bold text-gray-800">6. Intellectual Property</h2>
                  </div>
                  
                  <div className="space-y-4 text-gray-600">
                    <h3 className="text-lg font-semibold text-gray-800">Our Intellectual Property:</h3>
                    <p>
                      All aspects of the Zaza Promptly platform, including AI models, software, designs, 
                      and content, are owned by Zaza Technologies UG and protected by intellectual property laws.
                    </p>
                    
                    <h3 className="text-lg font-semibold text-gray-800 mt-6">Your Content Rights:</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>You retain ownership of content you input into our system</li>
                      <li>AI-generated content based on your input belongs to you</li>
                      <li>You grant us limited rights to process your content to provide our service</li>
                      <li>You may use AI-generated content for educational purposes without restriction</li>
                    </ul>
                  </div>
                </div>

                {/* 7. Service Availability and Support */}
                <div>
                  <div className="flex items-center mb-4">
                    <Mail className="w-6 h-6 text-purple-600 mr-3" />
                    <h2 className="text-2xl font-bold text-gray-800">7. Service Availability & Support</h2>
                  </div>
                  
                  <div className="space-y-4 text-gray-600">
                    <h3 className="text-lg font-semibold text-gray-800">Service Levels:</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>We strive for 99.9% uptime but don't guarantee continuous availability</li>
                      <li>Scheduled maintenance will be announced in advance</li>
                      <li>Emergency maintenance may occur with minimal notice</li>
                    </ul>
                    
                    <h3 className="text-lg font-semibold text-gray-800 mt-6">Customer Support:</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Email support available to all subscribers</li>
                      <li>Response within 24 hours for standard inquiries</li>
                      <li>Priority support for urgent educational needs</li>
                      <li>Comprehensive help documentation and resources</li>
                    </ul>
                  </div>
                </div>

                {/* 8. Limitation of Liability */}
                <div>
                  <div className="flex items-center mb-4">
                    <AlertTriangle className="w-6 h-6 text-purple-600 mr-3" />
                    <h2 className="text-2xl font-bold text-gray-800">8. Limitation of Liability</h2>
                  </div>
                  
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                    <div className="space-y-4 text-yellow-800">
                      <p>
                        <strong>Service Disclaimer:</strong> While we strive to provide accurate AI-generated content, 
                        you are responsible for reviewing and validating all outputs before use with students.
                      </p>
                      <p>
                        <strong>Liability Limitation:</strong> Our liability is limited to the amount you paid for 
                        the service in the 12 months preceding any claim.
                      </p>
                      <p>
                        <strong>Educational Responsibility:</strong> Teachers remain fully responsible for educational 
                        decisions and student outcomes when using our AI assistance.
                      </p>
                    </div>
                  </div>
                </div>

                {/* 9. Termination */}
                <div>
                  <div className="flex items-center mb-4">
                    <Users className="w-6 h-6 text-purple-600 mr-3" />
                    <h2 className="text-2xl font-bold text-gray-800">9. Account Termination</h2>
                  </div>
                  
                  <div className="space-y-4 text-gray-600">
                    <h3 className="text-lg font-semibold text-gray-800">Termination by You:</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Cancel your subscription anytime through account settings</li>
                      <li>Request complete account deletion with 30 days' notice</li>
                      <li>Export your data before account closure</li>
                    </ul>
                    
                    <h3 className="text-lg font-semibold text-gray-800 mt-6">Termination by Us:</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>We may suspend accounts for Terms violations</li>
                      <li>30 days' notice for service discontinuation</li>
                      <li>Immediate termination for serious violations</li>
                      <li>Refund of unused subscription fees when appropriate</li>
                    </ul>
                  </div>
                </div>

                {/* 10. Changes to Terms */}
                <div>
                  <div className="flex items-center mb-4">
                    <FileText className="w-6 h-6 text-purple-600 mr-3" />
                    <h2 className="text-2xl font-bold text-gray-800">10. Changes to These Terms</h2>
                  </div>
                  
                  <div className="space-y-4 text-gray-600">
                    <p>
                      We may update these Terms of Service periodically. When we do:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>We'll notify you via email and platform announcement</li>
                      <li>Changes take effect 30 days after notification</li>
                      <li>Continued use indicates acceptance of updated terms</li>
                      <li>You may cancel if you disagree with changes</li>
                    </ul>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="mt-12 pt-8 border-t border-gray-200">
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                    <h3 className="text-lg font-bold text-purple-800 mb-3">Questions About These Terms?</h3>
                    <div className="space-y-2 text-purple-700">
                      <p><strong>Email:</strong> legal@zazapromptly.com</p>
                      <p><strong>Mail:</strong> Zaza Technologies UG, Legal Department, Melbourne, VIC, Australia</p>
                      <p><strong>Response Time:</strong> Within 3 business days</p>
                    </div>
                  </div>
                  
                  <div className="mt-6 text-center text-sm text-gray-500">
                    <p>Effective Date: December 1, 2024</p>
                    <p>© 2024 Zaza Technologies UG. All rights reserved.</p>
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
