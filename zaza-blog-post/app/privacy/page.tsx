import type { Metadata } from "next"
import { NewHeader } from "@/components/new-header"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Privacy & Data Policy | Zaza Technologies",
  description: "Learn about how Zaza Technologies protects your privacy and handles your data.",
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <NewHeader />

      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">Privacy & Data Policy</h1>
            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
              Your privacy is our priority. Learn how we protect and handle your data with the highest standards of
              security and compliance.
            </p>
          </div>

          <div className="prose prose-lg prose-gray dark:prose-invert max-w-none">
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-8">
              <div className="flex items-center mb-4">
                <svg
                  className="w-6 h-6 text-blue-600 dark:text-blue-400 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h2 className="text-xl font-semibold text-blue-900 dark:text-blue-100 m-0">Our Commitment</h2>
              </div>
              <p className="text-blue-800 dark:text-blue-200 m-0">
                Zaza Technologies is committed to protecting your privacy and ensuring the security of your personal
                information. We are FERPA-compliant and GDPR-compliant, meeting the highest standards for educational
                data protection.
              </p>
            </div>

            <h2>Data Collection</h2>
            <p>We collect only the information necessary to provide our services effectively. This includes:</p>
            <ul>
              <li>Account information (name, email, institution)</li>
              <li>Usage data to improve our services</li>
              <li>Content you create using our tools (stored securely and privately)</li>
            </ul>

            <h2>Data Protection</h2>
            <p>Your data is protected through:</p>
            <ul>
              <li>End-to-end encryption for all data transmission</li>
              <li>Secure cloud storage with regular backups</li>
              <li>Regular security audits and compliance checks</li>
              <li>Limited access controls for our team members</li>
            </ul>

            <h2>FERPA Compliance</h2>
            <p>As an educational technology provider, we understand the importance of FERPA compliance. We:</p>
            <ul>
              <li>Never share student data with third parties</li>
              <li>Provide schools with full control over their data</li>
              <li>Maintain detailed audit logs of data access</li>
              <li>Offer data deletion upon request</li>
            </ul>

            <h2>Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Access your personal data</li>
              <li>Correct inaccurate information</li>
              <li>Delete your account and associated data</li>
              <li>Export your data in a portable format</li>
            </ul>

            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 mt-8">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Questions about our privacy policy?
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                We're here to help you understand how we protect your data.
              </p>
              <a
                href="/contact"
                className="inline-flex items-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors duration-200"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
