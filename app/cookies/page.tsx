import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Cookie Policy - Zaza Promptly',
  description: 'Learn about how Zaza Promptly uses cookies to improve your experience.',
}

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Cookie Policy</h1>
            
            <div className="prose max-w-none">
              <p className="text-lg text-gray-600 mb-6">
                Last updated: {new Date().toLocaleDateString()}
              </p>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">What Are Cookies</h2>
                <p className="text-gray-600 mb-4">
                  Cookies are small text files that are stored on your computer or mobile device when you visit our website.
                  They help us provide you with a better experience by remembering your preferences and understanding how you use our site.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">How We Use Cookies</h2>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>Essential cookies: Required for the website to function properly</li>
                  <li>Analytics cookies: Help us understand how visitors interact with our website</li>
                  <li>Preference cookies: Remember your settings and preferences</li>
                  <li>Marketing cookies: Used to deliver relevant advertisements</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Managing Cookies</h2>
                <p className="text-gray-600 mb-4">
                  You can control and manage cookies through your browser settings. Please note that removing or blocking cookies
                  may impact your user experience and parts of our website may no longer be fully accessible.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Us</h2>
                <p className="text-gray-600">
                  If you have any questions about our Cookie Policy, please contact us through our 
                  <Link href="/contact" className="text-indigo-600 hover:text-indigo-500 ml-1">contact page</Link>.
                </p>
              </section>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200 flex space-x-4">
              <Link 
                href="/privacy" 
                className="text-indigo-600 hover:text-indigo-500"
              >
                Privacy Policy
              </Link>
              <Link 
                href="/terms" 
                className="text-indigo-600 hover:text-indigo-500"
              >
                Terms of Service
              </Link>
              <Link 
                href="/" 
                className="text-indigo-600 hover:text-indigo-500"
              >
                Back to Homepage
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}