"use client"

import { Separator } from "@/components/ui/separator"
import { Layout } from "@zaza/shared-components"

export default function TermsOfService() {
  return (
    <Layout currentProduct="Terms of Service">
      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8 md:p-12 transition-colors duration-300">
          {/* Page Title */}
          <header className="mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
              Terms of Service
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed transition-colors duration-300">
              Last updated: July 3, 2025
            </p>
            <p className="text-gray-600 dark:text-gray-300 mt-4 leading-relaxed transition-colors duration-300">
              These Terms of Service govern your use of all Zaza Technologies products and services, including Zaza
              Teach, Zaza Promptly, and Zaza Visuals. By using any of our services, you agree to these terms.
            </p>
          </header>

          <Separator className="my-8 bg-gray-200 dark:bg-gray-600 transition-colors duration-300" />

          {/* Section 1: Acceptance of Terms */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
              1. Acceptance of Terms
            </h2>
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4 transition-colors duration-300">
                By accessing or using any Zaza Technologies service, you agree to be bound by these Terms of Service. If
                you do not agree to these terms, please do not use our services.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed transition-colors duration-300">
                These terms apply to all users of our services, whether you are using our free or paid features. Your
                continued use of our services constitutes acceptance of any updates to these terms.
              </p>
            </div>
          </section>

          <Separator className="my-8 bg-gray-200 dark:bg-gray-600 transition-colors duration-300" />

          {/* Section 2: Service Description */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
              2. Service Description
            </h2>
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4 transition-colors duration-300">
                Zaza Technologies provides AI-powered educational tools designed to help educators and students. Our
                services include:
              </p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 leading-relaxed space-y-2 transition-colors duration-300">
                <li>
                  <strong>Zaza Teach:</strong> Comprehensive teaching assistance and lesson planning tools
                </li>
                <li>
                  <strong>Zaza Promptly:</strong> AI-powered student feedback generation
                </li>
                <li>
                  <strong>Zaza Visuals:</strong> Educational content creation and visual design tools
                </li>
                <li>Additional educational technology solutions as they become available</li>
              </ul>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4 transition-colors duration-300">
                We continuously improve our services and may add new features or modify existing ones. While we strive
                for accuracy and reliability, AI-generated content should always be reviewed before use.
              </p>
            </div>
          </section>

          <Separator className="my-8 bg-gray-200 dark:bg-gray-600 transition-colors duration-300" />

          {/* Section 3: User Responsibilities */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
              3. User Responsibilities
            </h2>
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4 transition-colors duration-300">
                When using our services, you agree to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 leading-relaxed space-y-2 transition-colors duration-300">
                <li>Use our services only for lawful educational purposes</li>
                <li>Provide accurate information when creating accounts</li>
                <li>Keep your account credentials secure and confidential</li>
                <li>Respect the privacy and rights of students and other users</li>
                <li>Comply with all applicable laws and educational regulations</li>
                <li>Review and verify AI-generated content before sharing or using it</li>
                <li>Report any technical issues or inappropriate content to our support team</li>
                <li>Not attempt to hack, reverse engineer, or compromise our systems</li>
              </ul>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4 transition-colors duration-300">
                Violation of these responsibilities may result in account suspension or termination.
              </p>
            </div>
          </section>

          <Separator className="my-8 bg-gray-200 dark:bg-gray-600 transition-colors duration-300" />

          {/* Section 4: Intellectual Property */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
              4. Intellectual Property
            </h2>
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4 transition-colors duration-300">
                Zaza Technologies owns all rights to our services, including software, designs, trademarks, and
                proprietary technology. This includes all Zaza brand names, logos, and service marks.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4 transition-colors duration-300">
                <strong>Your Content:</strong> You retain ownership of educational materials, lesson plans, and other
                content you create or upload. However, you grant us permission to process this content to provide our
                services.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4 transition-colors duration-300">
                <strong>AI-Generated Content:</strong> Content created by our AI tools may be used by you for
                educational purposes. We do not claim ownership of this content, but we may use anonymized usage data to
                improve our services.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed transition-colors duration-300">
                <strong>Third-Party Content:</strong> Some features may integrate with third-party services. You are
                responsible for complying with their terms of use.
              </p>
            </div>
          </section>

          <Separator className="my-8 bg-gray-200 dark:bg-gray-600 transition-colors duration-300" />

          {/* Section 5: Account & Access */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
              5. Account & Access
            </h2>
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4 transition-colors duration-300">
                We offer different types of access to our services:
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4 transition-colors duration-300">
                <strong>Free Access:</strong> Basic features with usage limitations and standard support.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4 transition-colors duration-300">
                <strong>Premium Accounts:</strong> Enhanced features, higher usage limits, priority support, and
                additional tools.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4 transition-colors duration-300">
                <strong>Educational Institution Accounts:</strong> Special pricing and features for schools and
                educational organizations.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4 transition-colors duration-300">
                You are responsible for maintaining the security of your account. We implement industry-standard
                security measures and comply with educational privacy laws including FERPA and GDPR where applicable.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed transition-colors duration-300">
                We reserve the right to suspend or terminate accounts that violate these terms or engage in harmful
                activities.
              </p>
            </div>
          </section>

          <Separator className="my-8 bg-gray-200 dark:bg-gray-600 transition-colors duration-300" />

          {/* Section 6: Payment & Subscriptions */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
              6. Payment & Subscriptions
            </h2>
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4 transition-colors duration-300">
                Our services operate on a freemium model with optional paid subscriptions:
              </p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 leading-relaxed space-y-2 transition-colors duration-300">
                <li>Free tiers provide access to basic features with usage limits</li>
                <li>Premium subscriptions unlock advanced features and higher usage limits</li>
                <li>Subscription fees are billed monthly or annually as selected</li>
                <li>All payments are processed securely through trusted payment providers</li>
                <li>You may cancel your subscription at any time through your account settings</li>
                <li>Refunds are provided according to our refund policy</li>
                <li>Price changes will be communicated at least 30 days in advance</li>
                <li>Failed payments may result in service limitations or suspension</li>
              </ul>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4 transition-colors duration-300">
                Educational institutions may be eligible for special pricing. Contact our support team for more
                information.
              </p>
            </div>
          </section>

          <Separator className="my-8 bg-gray-200 dark:bg-gray-600 transition-colors duration-300" />

          {/* Section 7: Limitation of Liability */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
              7. Limitation of Liability
            </h2>
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4 transition-colors duration-300">
                <strong>Service Availability:</strong> While we strive for high uptime and reliability, we cannot
                guarantee uninterrupted service. We are not liable for temporary outages or technical issues.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4 transition-colors duration-300">
                <strong>AI Content Accuracy:</strong> Our AI tools are designed to assist educators, but generated
                content should always be reviewed for accuracy and appropriateness. We do not guarantee the accuracy of
                AI-generated content.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4 transition-colors duration-300">
                <strong>Educational Outcomes:</strong> Our tools are designed to support teaching and learning, but we
                cannot guarantee specific educational outcomes or results.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed transition-colors duration-300">
                <strong>Damages:</strong> To the maximum extent permitted by law, Zaza Technologies shall not be liable
                for any indirect, incidental, special, or consequential damages arising from your use of our services.
              </p>
            </div>
          </section>

          <Separator className="my-8 bg-gray-200 dark:bg-gray-600 transition-colors duration-300" />

          {/* Section 8: Modifications */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
              8. Modifications
            </h2>
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4 transition-colors duration-300">
                We may update these Terms of Service from time to time to reflect changes in our services, legal
                requirements, or business practices.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4 transition-colors duration-300">
                When we make significant changes, we will:
              </p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 leading-relaxed space-y-2 transition-colors duration-300">
                <li>Notify users via email or through our services</li>
                <li>Provide at least 30 days notice for material changes</li>
                <li>Update the "Last updated" date at the top of this document</li>
                <li>Maintain previous versions for reference when possible</li>
              </ul>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4 transition-colors duration-300">
                Your continued use of our services after changes take effect constitutes acceptance of the updated
                terms.
              </p>
            </div>
          </section>

          <Separator className="my-8 bg-gray-200 dark:bg-gray-600 transition-colors duration-300" />

          {/* Section 9: Governing Law */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
              9. Governing Law
            </h2>
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4 transition-colors duration-300">
                These Terms of Service are governed by and construed in accordance with the laws of Germany and the
                European Union, without regard to conflict of law principles.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4 transition-colors duration-300">
                Any disputes arising from these terms or your use of our services will be subject to the exclusive
                jurisdiction of the courts in Germany.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed transition-colors duration-300">
                For users outside the European Union, we will make reasonable efforts to resolve disputes through
                alternative dispute resolution methods before pursuing legal action.
              </p>
            </div>
          </section>

          <Separator className="my-8 bg-gray-200 dark:bg-gray-600 transition-colors duration-300" />

          {/* Section 10: Contact Us */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
              10. Contact Us
            </h2>
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4 transition-colors duration-300">
                If you have questions about these Terms of Service or need assistance with our services, please contact
                us:
              </p>
              <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg transition-colors duration-300">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-2 transition-colors duration-300">
                  <strong>Email:</strong> support@zazatechnologies.com
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-2 transition-colors duration-300">
                  <strong>Subject Line:</strong> Terms of Service Inquiry
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed transition-colors duration-300">
                  <strong>Response Time:</strong> We aim to respond to all inquiries within 2 business days.
                </p>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4 transition-colors duration-300">
                For technical support or account-related questions, please use the same email address with an
                appropriate subject line describing your issue.
              </p>
            </div>
          </section>
        </div>
      </main>
    </Layout>
  )
}
