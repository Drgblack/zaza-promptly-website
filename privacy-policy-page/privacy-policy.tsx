export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <header className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-light text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Your privacy is important to us. This policy explains how Zaza Promptly collects, uses, and protects your
            information.
          </p>
          <div className="mt-6 text-sm text-gray-500">Last updated: December 6, 2025</div>
        </header>

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          {/* Introduction */}
          <section className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-light text-gray-900 mb-6 pb-3 border-b border-gray-200">
              Introduction
            </h2>
            <div className="text-gray-700 leading-relaxed space-y-4">
              <p>
                Welcome to Zaza Promptly, an innovative edtech platform that empowers teachers to generate meaningful
                student feedback using artificial intelligence. We understand that trust is fundamental to our
                relationship with educators and students.
              </p>
              <p>
                This Privacy Policy outlines our commitment to protecting your personal information and explains how we
                collect, use, store, and safeguard your data. We believe in transparency and want you to feel confident
                about how your information is handled when you use our service.
              </p>
              <p>
                By using Zaza Promptly, you agree to the collection and use of information in accordance with this
                policy. We encourage you to read this document carefully and contact us if you have any questions.
              </p>
            </div>
          </section>

          {/* What Data We Collect */}
          <section className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-light text-gray-900 mb-6 pb-3 border-b border-gray-200">
              What Data We Collect
            </h2>
            <div className="text-gray-700 leading-relaxed space-y-6">
              <div>
                <h3 className="text-xl font-medium text-gray-900 mb-3">Personal Information</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Email address for account creation and communication</li>
                  <li>Name and professional information you provide</li>
                  <li>School or institution affiliation (optional)</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-medium text-gray-900 mb-3">Usage Data</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Feedback comments and prompts you create</li>
                  <li>Platform usage patterns and feature interactions</li>
                  <li>Device information and browser type</li>
                  <li>IP address and general location data</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-medium text-gray-900 mb-3">Educational Content</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Student work samples (when uploaded for feedback generation)</li>
                  <li>Generated feedback and comments</li>
                  <li>Custom templates and preferences</li>
                </ul>
              </div>
            </div>
          </section>

          {/* How We Use Your Data */}
          <section className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-light text-gray-900 mb-6 pb-3 border-b border-gray-200">
              How We Use Your Data
            </h2>
            <div className="text-gray-700 leading-relaxed space-y-4">
              <p>
                We use the information we collect to provide, maintain, and improve Zaza Promptly's services. Our
                primary goals are to enhance your teaching experience and help you provide better feedback to your
                students.
              </p>
              <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-200">
                <h3 className="text-lg font-medium text-gray-900 mb-3">Specific Uses Include:</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>Generating AI-powered feedback based on your inputs</li>
                  <li>Personalizing your experience and saving your preferences</li>
                  <li>Communicating important updates and educational resources</li>
                  <li>Analyzing usage patterns to improve our AI models</li>
                  <li>Providing customer support and technical assistance</li>
                  <li>Ensuring platform security and preventing misuse</li>
                </ul>
              </div>
              <p>
                We do not sell your personal information to third parties, and we only share data as described in this
                policy or with your explicit consent.
              </p>
            </div>
          </section>

          {/* Third-Party Services */}
          <section className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-light text-gray-900 mb-6 pb-3 border-b border-gray-200">
              Third-Party Services
            </h2>
            <div className="text-gray-700 leading-relaxed space-y-6">
              <p>
                To provide our AI-powered feedback generation service, we work with trusted third-party providers. We
                carefully select partners who meet our high standards for data protection and privacy.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Firebase (Google)</h3>
                  <p className="text-sm text-gray-600">
                    Used for secure authentication, database storage, and hosting. Data is encrypted and stored in
                    compliance with Google's privacy standards.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">OpenAI</h3>
                  <p className="text-sm text-gray-600">
                    Powers our AI feedback generation. Content is processed according to OpenAI's usage policies and is
                    not used to train their models.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Analytics Tools</h3>
                  <p className="text-sm text-gray-600">
                    We use privacy-focused analytics to understand how teachers use our platform and identify areas for
                    improvement.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Email Services</h3>
                  <p className="text-sm text-gray-600">
                    Trusted email providers help us send important updates, educational content, and support
                    communications.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Data Security */}
          <section className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-light text-gray-900 mb-6 pb-3 border-b border-gray-200">
              Data Security
            </h2>
            <div className="text-gray-700 leading-relaxed space-y-6">
              <p>
                Protecting your data is our top priority. We implement multiple layers of security to ensure your
                information remains safe and confidential.
              </p>
              <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-200">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Our Security Measures:</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Encryption</h4>
                    <p className="text-sm text-gray-600">
                      All data is encrypted in transit and at rest using industry-standard protocols.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Access Control</h4>
                    <p className="text-sm text-gray-600">
                      Strict access controls ensure only authorized personnel can access your data.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Regular Audits</h4>
                    <p className="text-sm text-gray-600">
                      We conduct regular security audits and vulnerability assessments.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Secure Infrastructure</h4>
                    <p className="text-sm text-gray-600">
                      Our platform runs on secure, monitored cloud infrastructure.
                    </p>
                  </div>
                </div>
              </div>
              <p>
                While we implement robust security measures, no system is 100% secure. We continuously monitor and
                update our security practices to protect against emerging threats.
              </p>
            </div>
          </section>

          {/* Your Rights */}
          <section className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-light text-gray-900 mb-6 pb-3 border-b border-gray-200">
              Your Rights
            </h2>
            <div className="text-gray-700 leading-relaxed space-y-6">
              <p>
                You have important rights regarding your personal data. We respect these rights and provide easy ways
                for you to exercise them.
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-1">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">Access Your Data</h3>
                    <p className="text-gray-600">Request a copy of all personal data we have about you.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-1">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">Correct Information</h3>
                    <p className="text-gray-600">Update or correct any inaccurate personal information.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-1">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">Delete Your Data</h3>
                    <p className="text-gray-600">
                      Request deletion of your personal data, subject to legal requirements.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-1">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">Withdraw Consent</h3>
                    <p className="text-gray-600">Withdraw your consent for data processing at any time.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-1">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">Data Portability</h3>
                    <p className="text-gray-600">Export your data in a commonly used format.</p>
                  </div>
                </div>
              </div>
              <div className="bg-amber-50 p-6 rounded-lg border-l-4 border-amber-200">
                <p className="text-sm text-amber-800">
                  <strong>Note:</strong> To exercise any of these rights, please contact us using the information
                  provided below. We will respond to your request within 30 days.
                </p>
              </div>
            </div>
          </section>

          {/* Contact */}
          <section className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-light text-gray-900 mb-6 pb-3 border-b border-gray-200">
              Contact Us
            </h2>
            <div className="text-gray-700 leading-relaxed space-y-6">
              <p>
                We're here to help with any questions or concerns about your privacy and data protection. Don't hesitate
                to reach out to us.
              </p>
              <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">General Support</h3>
                    <p className="text-gray-600">
                      <a
                        href="mailto:support@zazapromptly.com"
                        className="text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        support@zazapromptly.com
                      </a>
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Response Time</h3>
                    <p className="text-gray-600">We typically respond within 24-48 hours during business days.</p>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-500">
                This Privacy Policy may be updated from time to time. We will notify you of any significant changes by
                email or through our platform.
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
