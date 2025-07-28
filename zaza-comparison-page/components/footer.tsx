"use client"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-[#111111] text-[#eeeeee] border-t border-gray-800">
      <div className="mx-auto max-w-7xl px-6 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Column 1 - Zaza Ecosystem */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white mb-4 font-inter">Zaza Ecosystem</h3>
            <nav className="space-y-3">
              <Link
                href="https://zazapromptly.com"
                className="block text-gray-300 hover:text-white transition-colors duration-200 font-medium"
                target="_blank"
                rel="noopener noreferrer"
              >
                Zaza Promptly
              </Link>
              <Link
                href="https://zazateach.com"
                className="block text-gray-300 hover:text-white transition-colors duration-200 font-medium"
                target="_blank"
                rel="noopener noreferrer"
              >
                Zaza Teach
              </Link>
              <Link
                href="https://zazainbox.com"
                className="block text-gray-300 hover:text-white transition-colors duration-200 font-medium"
                target="_blank"
                rel="noopener noreferrer"
              >
                Zaza Inbox
              </Link>
              <Link
                href="https://zazavisuals.com"
                className="block text-gray-300 hover:text-white transition-colors duration-200 font-medium"
                target="_blank"
                rel="noopener noreferrer"
              >
                Zaza Visuals
              </Link>
              <Link
                href="https://zazaclaritydeck.com"
                className="block text-gray-300 hover:text-white transition-colors duration-200 font-medium"
                target="_blank"
                rel="noopener noreferrer"
              >
                Zaza ClarityDeck
              </Link>
              <Link
                href="https://zazaschwoop.com"
                className="block text-gray-300 hover:text-white transition-colors duration-200 font-medium"
                target="_blank"
                rel="noopener noreferrer"
              >
                Zaza Schwoop
              </Link>
            </nav>
          </div>

          {/* Column 2 - Support */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white mb-4 font-inter">Support</h3>
            <nav className="space-y-3">
              <Link
                href="/contact"
                className="block text-gray-300 hover:text-white transition-colors duration-200 font-medium"
              >
                Contact Us
              </Link>
              <Link
                href="/privacy"
                className="block text-gray-300 hover:text-white transition-colors duration-200 font-medium"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="block text-gray-300 hover:text-white transition-colors duration-200 font-medium"
              >
                Terms of Use
              </Link>
            </nav>
          </div>

          {/* Column 3 - Learning Centre */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white mb-4 font-inter">Learning Centre</h3>
            <nav className="space-y-3">
              <Link
                href="/blog"
                className="block text-gray-300 hover:text-white transition-colors duration-200 font-medium"
              >
                Blog
              </Link>
              <Link
                href="/free-resources"
                className="block text-gray-300 hover:text-white transition-colors duration-200 font-medium"
              >
                Free Resources
              </Link>
              <Link
                href="/faqs"
                className="block text-gray-300 hover:text-white transition-colors duration-200 font-medium"
              >
                FAQs
              </Link>
            </nav>
          </div>

          {/* Column 4 - Follow Us */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white mb-4 font-inter">Follow Us</h3>
            <div className="flex flex-col space-y-4">
              <Link
                href="https://www.tiktok.com/@zazatechnologies"
                className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors duration-200 font-medium"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow Zaza Technologies on TikTok"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                </svg>
                <span>TikTok</span>
              </Link>
              <Link
                href="https://www.linkedin.com/company/zazatechnologies"
                className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors duration-200 font-medium"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow Zaza Technologies on LinkedIn"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                <span>LinkedIn</span>
              </Link>
              <Link
                href="https://twitter.com/zazatechnology"
                className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors duration-200 font-medium"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow Zaza Technologies on X (Twitter)"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                <span>X (Twitter)</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="text-center">
            <p className="text-sm text-gray-400 font-inter">© Zaza Technologies 2025. All rights reserved.</p>
          </div>
        </div>
      </div>

      {/* Add Inter font styles */}
      <style jsx global>{`
        .font-inter {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
        }
      `}</style>
    </footer>
  )
}
