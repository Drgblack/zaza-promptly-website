import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Terms of Use - Zaza Technologies",
  description: "Terms of use and service agreement for Zaza Technologies products.",
}

export default function TermsPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
              Terms of Use
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">Last updated: January 2025</p>

            <div className="prose prose-lg dark:prose-invert max-w-none">
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-8">
                <h2 className="text-xl font-semibold text-blue-800 dark:text-blue-200 mb-2">Agreement Overview</h2>
                <p className="text-blue-700 dark:text-blue-300">
                  By using Zaza Technologies services, you agree to these terms. Please read them carefully as they
                  contain important information about your rights and obligations.
                </p>
              </div>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">1. Acceptance of Terms</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  By accessing or using any Zaza Technologies service, you agree to be bound by these Terms of Use and
                  all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited
                  from using our services.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">2. Service Description</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Zaza Technologies provides AI-powered tools designed specifically for educators, including but not
                  limited to:
                </p>
                <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 space-y-2">
                  <li>Lesson planning and curriculum development tools</li>
                  <li>Parent-teacher communication assistance</li>
                  <li>Educational content generation</li>
                  <li>Classroom management support</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
                  3. User Responsibilities
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">As a user of our services, you agree to:</p>
                <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 space-y-2">
                  <li>Use our services only for lawful educational purposes</li>
                  <li>Provide accurate and complete information when creating an account</li>
                  <li>Maintain the security of your account credentials</li>
                  <li>Respect intellectual property rights</li>
                  <li>Not attempt to reverse engineer or compromise our systems</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
                  4. Intellectual Property
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  All content, features, and functionality of our services are owned by Zaza Technologies UG and are
                  protected by international copyright, trademark, and other intellectual property laws.
                </p>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Content you create using our tools remains your intellectual property, while we retain rights to the
                  underlying technology and platform.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">5. Privacy and Data</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Your privacy is important to us. Our collection and use of personal information is governed by our
                  Privacy Policy, which is incorporated into these terms by reference.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
                  6. Limitation of Liability
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Zaza Technologies shall not be liable for any indirect, incidental, special, consequential, or
                  punitive damages resulting from your use of our services.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">7. Termination</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  We may terminate or suspend your account and access to our services at our sole discretion, without
                  prior notice, for conduct that we believe violates these terms or is harmful to other users or our
                  business.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">8. Changes to Terms</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  We reserve the right to modify these terms at any time. We will notify users of any material changes
                  via email or through our service.
                </p>
              </section>

              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">Questions?</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  If you have any questions about these Terms of Use, please contact us at legal@zazatechnologies.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer currentPage="terms" />
    </>
  )
}
