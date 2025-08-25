import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <img 
                src="/images/logo/zaza-logo-dark.svg" 
                alt="Zaza Logo"
                className="w-8 h-8"
              />
              <span className="font-semibold text-xl">Promptly</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              AI-powered teaching assistant helping educators save time while maintaining quality feedback.
            </p>
            <p className="text-gray-500 text-xs">
              Built by PhD educator • Trusted by 12,000+ teachers
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/pricing" className="text-gray-400 hover:text-white transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/personas" className="text-gray-400 hover:text-white transition-colors">
                  Teaching Personas
                </Link>
              </li>
              <li>
                <Link href="/waitlist" className="text-gray-400 hover:text-white transition-colors">
                  Join Waitlist
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/learning-centre" className="text-gray-400 hover:text-white transition-colors">
                  Learning Centre
                </Link>
              </li>
              <li>
                <Link href="/about-us" className="text-gray-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Support: hello@zazapromptly.com</li>
              <li>GDPR Compliant</li>
              <li>24/7 Support Available</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 Zaza Technologies. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <Link href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
              Terms
            </Link>
            <Link href="/accessibility" className="text-gray-400 hover:text-white text-sm transition-colors">
              Accessibility
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}