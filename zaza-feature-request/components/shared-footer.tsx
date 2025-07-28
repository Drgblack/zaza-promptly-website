import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Shield, Lock, Heart } from "lucide-react"

interface SharedFooterProps {
  currentPage?: string
}

export function SharedFooter({ currentPage }: SharedFooterProps) {
  const ecosystemLinks = [
    { name: "Zaza Teach", href: "/zaza-teach-website", key: "teach" },
    { name: "Zaza Promptly", href: "/zaza-promptly-site", key: "promptly" },
    { name: "Zaza Inbox", href: "/zaza-inbox", key: "inbox" },
            { name: "Zaza Visuals", href: "/zaza-visuals-landing (1)", key: "visuals" },
    { name: "Zaza ClarityDeck", href: "/zaza-claritydeck", key: "claritydeck" },
    { name: "Zaza Schwoop", href: "/zaza-schwoop", key: "schwoop" },
  ]

  return (
    <footer className="bg-[#0E1328] text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Zaza Branding Column */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <img src="/zaza-logo.png" alt="Zaza Logo" className="w-10 h-10 rounded-xl" />
              <h3 className="text-xl font-bold">Zaza Technologies</h3>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed max-w-xs">
              Empowering teachers through emotionally intelligent AI.
            </p>
            <Button
              asChild
              className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <Link href="/products">Explore Zaza</Link>
            </Button>
          </div>

          {/* Support Column */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Support</h3>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/contact"
                  className="text-gray-300 hover:text-purple-400 text-sm transition-colors duration-200"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-gray-300 hover:text-purple-400 text-sm transition-colors duration-200"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-gray-300 hover:text-purple-400 text-sm transition-colors duration-200"
                >
                  Terms of Use
                </Link>
              </li>
            </ul>
          </div>

          {/* Trust & Security Column */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Trust & Security</h3>
            <ul className="space-y-4">
              <li className="text-gray-300 text-sm flex items-center">
                <Shield className="w-4 h-4 text-purple-400 mr-3 flex-shrink-0" />
                GDPR Compliant
              </li>
              <li className="text-gray-300 text-sm flex items-center">
                <Lock className="w-4 h-4 text-pink-400 mr-3 flex-shrink-0" />
                FERPA Safe
              </li>
              <li className="text-gray-300 text-sm flex items-center">
                <Heart className="w-4 h-4 text-purple-400 mr-3 flex-shrink-0" />
                Built by Educators
              </li>
            </ul>
          </div>

          {/* Zaza Ecosystem Column */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Zaza Ecosystem</h3>
            <ul className="space-y-4">
              {ecosystemLinks.map((link) => (
                <li key={link.key}>
                  <Link
                    href={link.href}
                    className={`text-sm transition-colors duration-200 ${
                      currentPage === link.key ? "text-purple-400 font-medium" : "text-gray-300 hover:text-purple-400"
                    }`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Media Section */}
        <div className="mt-16 pt-8 border-t border-gray-700">
          <div className="text-center">
            <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-6">Follow Us</h4>
            <div className="flex justify-center items-center space-x-8">
              <Link
                href="https://tiktok.com/@zazatechnologies"
                className="text-gray-400 hover:text-white transition-colors duration-200"
                aria-label="Follow us on TikTok"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                </svg>
              </Link>
              <Link
                href="https://linkedin.com/company/zaza-technologies"
                className="text-gray-400 hover:text-white transition-colors duration-200"
                aria-label="Follow us on LinkedIn"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </Link>
              <Link
                href="https://twitter.com/zazatechnologies"
                className="text-gray-400 hover:text-white transition-colors duration-200"
                aria-label="Follow us on Twitter"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            <div className="text-gray-400 text-sm text-center lg:text-left">
              © 2025 Zaza Technologies UG (haftungsbeschränkt). All rights reserved.
            </div>
            <div className="text-gray-300 text-sm text-center lg:text-right">
              Made with 💙 by teachers, for learners. · Trusted by educators worldwide.
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
