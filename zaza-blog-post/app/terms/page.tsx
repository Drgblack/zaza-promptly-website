import type { Metadata } from "next"
import { NewHeader } from "@/components/new-header"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Terms of Use | Zaza Technologies",
  description: "Terms of use and service agreement for Zaza Technologies AI tools and services.",
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <NewHeader />

      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">Terms of Use</h1>
            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
              Please read these terms carefully before using Zaza Technologies services and tools.
            </p>
          </div>

          <div className="prose prose-lg prose-gray dark:prose-invert max-w-none">
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-8">
              <p className="text-blue-800 dark:text-blue-200 m-0">
                <strong>Last Updated:</strong> January 15, 2025
              </p>
            </div>

            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing or using Zaza Technologies services, you agree to be bound by these Terms of Use and all
              applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from
              using our services.
            </p>

            <h2>2. Description of Service</h2>
            <p>
              Zaza Technologies provides AI-powered tools and services designed specifically for educational purposes.
              Our services include but are not limited to:
            </p>
            <ul>
              <li>Zaza Teach - AI-powered lesson planning and curriculum development</li>
              <li>Zaza Promptly - Advanced prompt engineering tools</li>
              <li>Other educational AI tools and services as they become available</li>
            </ul>

            <h2>3. User Accounts and Responsibilities</h2>
            <p>
              To access certain features of our services, you may be required to create an account. You are responsible
              for:
            </p>
            <ul>
              <li>Maintaining the confidentiality of your account credentials</li>
              <li>All activities that occur under your account</li>
              <li>Providing accurate and complete information</li>
              <li>Notifying us immediately of any unauthorized use of your account</li>
            </ul>

            <h2>4. Acceptable Use Policy</h2>
            <p>
              You agree to use our services only for lawful purposes and in accordance with these Terms. You agree not
              to:
            </p>
            <ul>
              <li>Use the services for any illegal or unauthorized purpose</li>
              <li>Violate any applicable laws or regulations</li>
              <li>Infringe upon the rights of others</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Interfere with or disrupt the services</li>
            </ul>

            <h2>5. Educational Use and FERPA Compliance</h2>
            <p>
              Our services are designed for educational use and comply with FERPA (Family Educational Rights and Privacy
              Act) requirements. We:
            </p>
            <ul>
              <li>Protect student educational records and personally identifiable information</li>
              <li>Only use data for educational purposes as directed by educational institutions</li>
              <li>Provide appropriate security measures for educational data</li>
              <li>Allow educational institutions to control and delete their data</li>
            </ul>

            <h2>6. Intellectual Property Rights</h2>
            <p>
              The services and their original content, features, and functionality are owned by Zaza Technologies and
              are protected by international copyright, trademark, patent, trade secret, and other intellectual property
              laws.
            </p>

            <h2>7. User-Generated Content</h2>
            <p>
              You retain ownership of content you create using our services. However, by using our services, you grant
              us a limited license to use, store, and process your content solely for the purpose of providing our
              services to you.
            </p>

            <h2>8. Privacy and Data Protection</h2>
            <p>
              Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the
              services, to understand our practices regarding the collection and use of your information.
            </p>

            <h2>9. Service Availability</h2>
            <p>
              We strive to maintain high availability of our services, but we do not guarantee uninterrupted access. We
              may temporarily suspend or restrict access for maintenance, updates, or other operational reasons.
            </p>

            <h2>10. Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by law, Zaza Technologies shall not be liable for any indirect,
              incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether
              incurred directly or indirectly.
            </p>

            <h2>11. Termination</h2>
            <p>
              We may terminate or suspend your account and access to our services immediately, without prior notice, for
              conduct that we believe violates these Terms or is harmful to other users, us, or third parties.
            </p>

            <h2>12. Changes to Terms</h2>
            <p>
              We reserve the right to modify these Terms at any time. We will notify users of any material changes by
              posting the new Terms on this page and updating the "Last Updated" date.
            </p>

            <h2>13. Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which
              Zaza Technologies operates, without regard to conflict of law principles.
            </p>

            <h2>14. Contact Information</h2>
            <p>
              If you have any questions about these Terms of Use, please contact us through our support channels or
              visit our contact page.
            </p>

            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 mt-8">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Questions about our terms?</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                We're here to help clarify any questions you may have about our terms of service.
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
