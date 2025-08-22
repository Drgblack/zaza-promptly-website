import { Metadata } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://promptly.zazatechnologies.com'

export const metadata: Metadata = {
  title: 'Cookie Policy | Promptly',
  description: 'Learn how Promptly uses cookies to improve your experience and protect your privacy.',
  alternates: {
    canonical: '/cookies',
  },
  openGraph: {
    title: 'Cookie Policy | Promptly',
    description: 'Learn how Promptly uses cookies to improve your experience and protect your privacy.',
    url: `${baseUrl}/cookies`,
    images: [
      {
        url: '/og-default.png',
        width: 1200,
        height: 630,
        alt: 'Promptly Cookie Policy',
      },
    ],
    siteName: 'Promptly',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cookie Policy | Promptly',
    description: 'Learn how Promptly uses cookies to improve your experience and protect your privacy.',
    images: ['/og-default.png'],
  },
}

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-slate-900">
      {/* Hero Section */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-white mb-6">
              Cookie Policy
            </h1>
            <p className="text-xl text-slate-300 mb-8 max-w-[720px] mx-auto">
              We use cookies to improve your experience and understand how our site is used. 
              Here's how and why we use them.
            </p>
            <div className="text-sm text-slate-400">
              Last updated: {new Date().toLocaleDateString('en-GB', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="pb-20">
        <div className="container">
          <div className="max-w-4xl mx-auto prose prose-slate prose-invert prose-lg">
            <div className="bg-slate-800/50 rounded-2xl p-8 border border-white/10 space-y-8">
              
              {/* What Are Cookies */}
              <div>
                <h2 className="text-2xl font-semibold text-white mb-4">What Are Cookies?</h2>
                <p className="text-slate-300 leading-relaxed">
                  Cookies are small text files that are stored on your device when you visit our website. 
                  They help us provide you with a better experience by remembering your preferences and 
                  understanding how you use our site.
                </p>
              </div>

              {/* Types of Cookies */}
              <div>
                <h2 className="text-2xl font-semibold text-white mb-6">Types of Cookies We Use</h2>
                
                {/* Essential Cookies */}
                <div className="mb-6">
                  <div className="flex items-center mb-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                    <h3 className="text-xl font-semibold text-white">Essential Cookies</h3>
                  </div>
                  <p className="text-slate-300 leading-relaxed ml-6">
                    These cookies are necessary for our website to function properly. They enable core functionality 
                    such as page navigation, security, and basic features. Without these cookies, our site cannot 
                    work correctly. These cookies do not store personally identifiable information.
                  </p>
                  <div className="ml-6 mt-3">
                    <p className="text-sm text-slate-400">
                      <strong>Examples:</strong> Session management, security tokens, cookie consent preferences
                    </p>
                    <p className="text-sm text-slate-400">
                      <strong>Storage duration:</strong> Session or up to 1 year
                    </p>
                  </div>
                </div>

                {/* Analytics Cookies */}
                <div className="mb-6">
                  <div className="flex items-center mb-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                    <h3 className="text-xl font-semibold text-white">Analytics Cookies</h3>
                  </div>
                  <p className="text-slate-300 leading-relaxed ml-6">
                    We use privacy-friendly analytics (Plausible) to understand how visitors interact with our site. 
                    These cookies help us improve our content and user experience by showing us which pages are 
                    most popular and how users navigate our site. All data is anonymized and we never track 
                    individual users.
                  </p>
                  <div className="ml-6 mt-3">
                    <p className="text-sm text-slate-400">
                      <strong>Examples:</strong> Page views, session duration, traffic sources
                    </p>
                    <p className="text-sm text-slate-400">
                      <strong>Storage duration:</strong> Up to 24 months
                    </p>
                    <p className="text-sm text-slate-400">
                      <strong>Third party:</strong> Plausible Analytics (privacy-focused, GDPR compliant)
                    </p>
                  </div>
                </div>

                {/* Preference Cookies */}
                <div className="mb-6">
                  <div className="flex items-center mb-3">
                    <div className="w-3 h-3 bg-purple-500 rounded-full mr-3"></div>
                    <h3 className="text-xl font-semibold text-white">Preference Cookies</h3>
                  </div>
                  <p className="text-slate-300 leading-relaxed ml-6">
                    These cookies remember your choices and preferences to provide you with a personalized 
                    experience. They remember settings like your preferred language, theme, and other 
                    customizable features.
                  </p>
                  <div className="ml-6 mt-3">
                    <p className="text-sm text-slate-400">
                      <strong>Examples:</strong> Theme preferences, language settings, form auto-fill
                    </p>
                    <p className="text-sm text-slate-400">
                      <strong>Storage duration:</strong> Up to 1 year
                    </p>
                  </div>
                </div>
              </div>

              {/* Your Choices */}
              <div>
                <h2 className="text-2xl font-semibold text-white mb-4">Your Cookie Choices</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Cookie Consent</h3>
                    <p className="text-slate-300 leading-relaxed">
                      When you first visit our site, you'll see a cookie banner asking for your consent. 
                      You can choose to accept all cookies, decline non-essential cookies, or manage your 
                      preferences individually.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Do Not Track</h3>
                    <p className="text-slate-300 leading-relaxed">
                      We respect the "Do Not Track" setting in your browser. If you have Do Not Track enabled, 
                      we will not load analytics cookies automatically, even if you haven't explicitly 
                      declined them.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Browser Settings</h3>
                    <p className="text-slate-300 leading-relaxed">
                      You can control cookies through your browser settings. Most browsers allow you to 
                      delete cookies, block cookies, or receive notifications when cookies are being set. 
                      Please note that blocking essential cookies may affect the functionality of our website.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Update Your Preferences</h3>
                    <p className="text-slate-300 leading-relaxed mb-4">
                      You can change your cookie preferences at any time by clicking the cookie settings 
                      button in our footer or by clearing your browser cookies and revisiting our site.
                    </p>
                    <button
                      onClick={() => {
                        // Trigger cookie banner
                        if (typeof window !== 'undefined') {
                          localStorage.removeItem('cookie-consent')
                          window.location.reload()
                        }
                      }}
                      className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-900"
                    >
                      Update Cookie Preferences
                    </button>
                  </div>
                </div>
              </div>

              {/* Data Protection */}
              <div>
                <h2 className="text-2xl font-semibold text-white mb-4">Data Protection</h2>
                <p className="text-slate-300 leading-relaxed mb-4">
                  We are committed to protecting your privacy. All cookies we use comply with applicable 
                  data protection laws, including GDPR. We only collect the minimum data necessary to 
                  provide and improve our services.
                </p>
                <p className="text-slate-300 leading-relaxed">
                  For more information about how we handle your personal data, please read our{' '}
                  <a 
                    href="/privacy" 
                    className="text-purple-400 hover:text-purple-300 underline decoration-purple-400/50 hover:decoration-purple-300/50 transition-colors"
                  >
                    Privacy Policy
                  </a>.
                </p>
              </div>

              {/* Contact */}
              <div>
                <h2 className="text-2xl font-semibold text-white mb-4">Questions?</h2>
                <p className="text-slate-300 leading-relaxed">
                  If you have any questions about our use of cookies, please{' '}
                  <a 
                    href="/contact" 
                    className="text-purple-400 hover:text-purple-300 underline decoration-purple-400/50 hover:decoration-purple-300/50 transition-colors"
                  >
                    contact us
                  </a>{' '}
                  or email us at{' '}
                  <a 
                    href="mailto:privacy@zazapromptly.com"
                    className="text-purple-400 hover:text-purple-300 underline decoration-purple-400/50 hover:decoration-purple-300/50 transition-colors"
                  >
                    privacy@zazapromptly.com
                  </a>.
                </p>
              </div>

              {/* Updates */}
              <div className="border-t border-white/10 pt-6">
                <p className="text-sm text-slate-400">
                  We may update this Cookie Policy from time to time. Any changes will be posted on this page 
                  with an updated revision date. We encourage you to review this policy periodically.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}