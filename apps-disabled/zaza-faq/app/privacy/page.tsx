import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Privacy & Data Policy - Zaza Technologies",
  description: "Our commitment to protecting your privacy and data security.",
}

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
              Privacy & Data Policy
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">Last updated: January 2025</p>

            <div className="prose prose-lg dark:prose-invert max-w-none">
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6 mb-8">
                <h2 className="text-xl font-semibold text-green-800 dark:text-green-200 mb-2">Our Commitment</h2>
                <p className="text-green-700 dark:text-green-300">
                  Zaza Technologies is committed to protecting your privacy and ensuring the security of your data. We
                  are GDPR compliant and FERPA safe.
                </p>
              </div>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Data Collection</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  We collect only the minimum data necessary to provide our services effectively:
                </p>
                <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 space-y-2">
                  <li>Account information (email, name) for service access</li>
                  <li>Usage data to improve our products</li>
                  <li>Content you create using our tools (stored securely)</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Data Protection</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">Your data is protected through:</p>
                <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 space-y-2">
                  <li>End-to-end encryption for all data transmission</li>
                  <li>Secure cloud storage with regular backups</li>
                  <li>Limited access controls and regular security audits</li>
                  <li>No sharing of personal data with third parties</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Your Rights</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Under GDPR and other privacy regulations, you have the right to:
                </p>
                <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 space-y-2">
                  <li>Access your personal data</li>
                  <li>Correct inaccurate information</li>
                  <li>Delete your account and associated data</li>
                  <li>Export your data in a portable format</li>
                </ul>
              </section>

              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">Questions?</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  If you have any questions about our privacy policy or data practices, please contact us at
                  privacy@zazatechnologies.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer currentPage="privacy" />
    </>
  )
}
