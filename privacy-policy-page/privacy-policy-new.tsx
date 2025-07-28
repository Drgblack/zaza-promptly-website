export default function PrivacyPolicyNew() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 font-['Inter',sans-serif] transition-colors duration-300">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 py-16 transition-colors duration-300">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
            Privacy Policy
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 transition-colors duration-300">
            Your privacy matters to us. This policy explains how we handle your information.
          </p>
          <div className="inline-flex items-center px-4 py-2 bg-blue-50 dark:bg-blue-900/30 rounded-full transition-colors duration-300">
            <span className="text-sm font-medium text-blue-800 dark:text-blue-200">Last updated: July 3, 2025</span>
          </div>
        </div>
      </section>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Introduction */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 transition-colors duration-300">
            Introduction
          </h2>
          <div className="prose prose-lg max-w-none text-gray-700 dark:text-gray-300 leading-relaxed space-y-4 transition-colors duration-300">
            <p>
              At Zaza Technologies, we believe privacy is a fundamental right. We're committed to being transparent
              about how we collect, use, and protect your personal information when you use our educational technology
              platform.
            </p>
            <p>
              This Privacy Policy explains our practices in clear, straightforward language. We've designed our platform
              with privacy in mind, implementing strong security measures and giving you control over your data.
            </p>
            <p>
              By using Zaza Technologies' services, you agree to the practices described in this policy. If you have any
              questions, we encourage you to contact us directly.
            </p>
          </div>
        </section>

        {/* What Information We Collect */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 transition-colors duration-300">
            What Information We Collect
          </h2>

          <div className="space-y-8">
            {/* Personal Info */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 transition-colors duration-300">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
                Personal Information
              </h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300 transition-colors duration-300">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Email address for account creation and communication
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Name and professional information you provide
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  School or institution details (optional)
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Profile preferences and settings
                </li>
              </ul>
            </div>

            {/* Usage Data */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 transition-colors duration-300">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
                Usage Data
              </h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300 transition-colors duration-300">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  How you interact with our platform and features
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Device information, browser type, and operating system
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  IP address and general location data
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Session duration and page views
                </li>
              </ul>
            </div>

            {/* Content Data */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 transition-colors duration-300">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
                Content Data
              </h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300 transition-colors duration-300">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Educational content you create or upload
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Student feedback and assessment data
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Custom templates and teaching materials
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Communications and support messages
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* How We Use Your Information */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 transition-colors duration-300">
            How We Use Your Information
          </h2>
          <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-6 transition-colors duration-300">
            <p className="text-gray-700 dark:text-gray-300 mb-6 transition-colors duration-300">
              We use your information to provide, improve, and personalize our educational technology services:
            </p>
            <ul className="space-y-3 text-gray-700 dark:text-gray-300 transition-colors duration-300">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Provide and maintain our educational platform
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Generate AI-powered feedback and educational content
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Personalize your experience and save your preferences
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Communicate important updates and educational resources
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Analyze usage patterns to improve our services
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Provide customer support and technical assistance
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Ensure platform security and prevent misuse
              </li>
            </ul>
          </div>
        </section>

        {/* Third-Party Services */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 transition-colors duration-300">
            Third-Party Services
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6 transition-colors duration-300">
            We work with trusted third-party services to provide our platform. These partners meet our high standards
            for data protection:
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 transition-colors duration-300">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2 transition-colors duration-300">
                • Firebase (Google)
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">
                Authentication, database, and hosting services
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 transition-colors duration-300">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2 transition-colors duration-300">
                • OpenAI
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">
                AI-powered content generation and feedback
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 transition-colors duration-300">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2 transition-colors duration-300">
                • Analytics Services
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">
                Privacy-focused usage analytics and insights
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 transition-colors duration-300">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2 transition-colors duration-300">
                • Email Services
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">
                Transactional and educational communications
              </p>
            </div>
          </div>
        </section>

        {/* Data Security */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 transition-colors duration-300">
            Data Security
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6 transition-colors duration-300">
            We implement comprehensive security measures to protect your information:
          </p>
          <div className="bg-green-50 dark:bg-green-900/30 rounded-lg p-6 transition-colors duration-300">
            <ul className="space-y-3 text-gray-700 dark:text-gray-300 transition-colors duration-300">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <strong>Encryption:</strong> All data encrypted in transit and at rest using industry standards
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <strong>Access Control:</strong> Strict authentication and authorization for all data access
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <strong>Regular Audits:</strong> Ongoing security assessments and vulnerability testing
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <strong>Secure Infrastructure:</strong> Cloud hosting with enterprise-grade security controls
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <strong>Data Minimization:</strong> We only collect and retain data necessary for our services
              </li>
            </ul>
          </div>
        </section>

        {/* Your Rights */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 transition-colors duration-300">
            Your Rights
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6 transition-colors duration-300">
            You have important rights regarding your personal data:
          </p>
          <div className="space-y-4">
            <div className="flex items-start p-4 bg-gray-50 dark:bg-gray-800 rounded-lg transition-colors duration-300">
              <span className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0 transition-colors duration-300">
                <span className="text-blue-600 dark:text-blue-300 font-bold text-sm">1</span>
              </span>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-1 transition-colors duration-300">
                  Access Your Data
                </h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm transition-colors duration-300">
                  Request a copy of all personal information we have about you
                </p>
              </div>
            </div>
            <div className="flex items-start p-4 bg-gray-50 dark:bg-gray-800 rounded-lg transition-colors duration-300">
              <span className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0 transition-colors duration-300">
                <span className="text-blue-600 dark:text-blue-300 font-bold text-sm">2</span>
              </span>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-1 transition-colors duration-300">
                  Correct Information
                </h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm transition-colors duration-300">
                  Update or fix any inaccurate personal information
                </p>
              </div>
            </div>
            <div className="flex items-start p-4 bg-gray-50 dark:bg-gray-800 rounded-lg transition-colors duration-300">
              <span className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0 transition-colors duration-300">
                <span className="text-blue-600 dark:text-blue-300 font-bold text-sm">3</span>
              </span>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-1 transition-colors duration-300">
                  Delete Your Data
                </h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm transition-colors duration-300">
                  Request deletion of your personal data (subject to legal requirements)
                </p>
              </div>
            </div>
            <div className="flex items-start p-4 bg-gray-50 dark:bg-gray-800 rounded-lg transition-colors duration-300">
              <span className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0 transition-colors duration-300">
                <span className="text-blue-600 dark:text-blue-300 font-bold text-sm">4</span>
              </span>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-1 transition-colors duration-300">
                  Export Your Data
                </h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm transition-colors duration-300">
                  Download your data in a portable, commonly-used format
                </p>
              </div>
            </div>
            <div className="flex items-start p-4 bg-gray-50 dark:bg-gray-800 rounded-lg transition-colors duration-300">
              <span className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0 transition-colors duration-300">
                <span className="text-blue-600 dark:text-blue-300 font-bold text-sm">5</span>
              </span>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-1 transition-colors duration-300">
                  Withdraw Consent
                </h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm transition-colors duration-300">
                  Opt out of data processing based on consent at any time
                </p>
              </div>
            </div>
          </div>
          <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800 rounded-lg transition-colors duration-300">
            <p className="text-amber-800 dark:text-amber-200 text-sm transition-colors duration-300">
              <strong>Note:</strong> To exercise any of these rights, please email us at{" "}
              <a href="mailto:support@zazatechnologies.com" className="underline hover:no-underline">
                support@zazatechnologies.com
              </a>
              . We'll respond within 30 days.
            </p>
          </div>
        </section>

        {/* Contact Us */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 transition-colors duration-300">
            Contact Us
          </h2>
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8 shadow-sm transition-colors duration-300">
            <p className="text-gray-700 dark:text-gray-300 mb-6 transition-colors duration-300">
              Have questions about this Privacy Policy or how we handle your data? We're here to help.
            </p>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2 transition-colors duration-300">
                  Email Support
                </h4>
                <p className="text-gray-600 dark:text-gray-400 transition-colors duration-300">
                  <a
                    href="mailto:support@zazatechnologies.com"
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline hover:no-underline transition-colors"
                  >
                    support@zazatechnologies.com
                  </a>
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2 transition-colors duration-300">
                  Response Time
                </h4>
                <p className="text-gray-600 dark:text-gray-400 transition-colors duration-300">
                  We typically respond within 24–48 hours during business days.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Policy Updates */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 transition-colors duration-300">
            Policy Updates
          </h2>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 transition-colors duration-300">
            <p className="text-gray-700 dark:text-gray-300 mb-4 transition-colors duration-300">
              We may update this Privacy Policy from time to time to reflect changes in our practices, technology, or
              legal requirements.
            </p>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300 transition-colors duration-300">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-gray-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                We'll notify you of significant changes via email or platform notification
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-gray-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                The "Last updated" date at the top reflects when changes were made
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-gray-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Continued use of our services after updates means you accept the revised policy
              </li>
            </ul>
          </div>
        </section>
      </main>
    </div>
  )
}
