import Link from 'next/link'
import CookieSettingsButton from '@/components/cookies/CookieSettingsButton'
import MotionSettingsButton from '@/components/motion/MotionSettingsButton'

export default function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">Promptly</span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Hallucination-safe AI created by <strong>Dr Greg Blackburn, PhD in Professional Education</strong>. 
              Trusted by 12,000+ teachers worldwide for reports and parent communication.
            </p>
            <div className="text-sm text-gray-500 dark:text-gray-500">
              © 2024 Zaza Technologies. All rights reserved.
            </div>
          </div>

          {/* Solutions by Teaching Role */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Solutions by Teaching Role</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/personas/uk-primary" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-1 py-1">
                  UK Primary Teachers
                </Link>
              </li>
              <li>
                <Link href="/personas/us-secondary" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-1 py-1">
                  US Secondary Teachers
                </Link>
              </li>
              <li>
                <Link href="/personas/special-needs" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-1 py-1">
                  Special Education Teachers
                </Link>
              </li>
              <li>
                <Link href="/personas/international" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-1 py-1">
                  International Teachers
                </Link>
              </li>
              <li>
                <Link href="/personas/edtech-savvy" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-1 py-1">
                  EdTech-Savvy Teachers
                </Link>
              </li>
              <li>
                <Link href="/personas/head-teacher" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-1 py-1">
                  Head Teachers & Leaders
                </Link>
              </li>
            </ul>
          </div>

          {/* Company & Support */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about/founder" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-1 py-1">
                  PhD Founder & Education Expert
                </Link>
              </li>
              <li>
                <Link href="/faq#privacy" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-1 py-1">
                  GDPR Compliant AI
                </Link>
              </li>
              <li>
                <Link href="/faq#safety" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-1 py-1">
                  Hallucination-Safe AI
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-1 py-1">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-1 py-1">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <CookieSettingsButton />
              </li>
              <li>
                <MotionSettingsButton />
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-500 dark:text-gray-500 mb-4 md:mb-0">
              Built by educators for educators — <Link href="/about/founder" className="text-blue-600 hover:text-blue-700">Created by Dr Greg Blackburn, PhD</Link>
            </div>
            
            <div className="flex flex-wrap items-center gap-4 md:gap-6">
              <Link 
                href="/waitlist"
                className="inline-flex items-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold rounded-lg transition-colors"
              >
                Start Free Trial
                <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              
              <Link 
                href="/faq#ethics"
                className="text-sm text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
              >
                AI Ethics for Teachers
              </Link>
              
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-500">
                <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                GDPR Compliant AI for Education
              </div>
              
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-500">
                <svg className="w-4 h-4 text-blue-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Hallucination-Safe AI
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}