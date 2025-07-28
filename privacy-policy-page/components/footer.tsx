"use client"

import { Twitter, Linkedin, Shield, Lock, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"

interface FooterProps {
  currentPage?: string
}

export default function Footer({ currentPage }: FooterProps) {
  const ecosystemLinks = [
            { name: "Zaza Teach", href: "/zaza-teach-website", key: "teach" },
    { name: "Zaza Promptly", href: "/zaza-promptly-site", key: "promptly" },
    { name: "Zaza Inbox", href: "/zaza-inbox", key: "inbox" },
            { name: "Zaza Visuals", href: "/zaza-visuals-landing (1)", key: "visuals" },
    { name: "Zaza ClarityDeck", href: "/zaza-claritydeck", key: "claritydeck" },
    { name: "Zaza Schwoop", href: "/zaza-schwoop", key: "schwoop" },
  ]

  return (
    <footer className="bg-slate-900 dark:bg-slate-900 text-white transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Four Main Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {/* Column 1 - Zaza Branding */}
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <img src="/logo.png" alt="Zaza Technologies" className="h-8 w-8" />
                <span className="text-xl font-semibold text-white">Zaza Technologies</span>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed max-w-sm">
                Empowering teachers through emotionally intelligent AI.
              </p>
            </div>
            <Button
              asChild
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold px-6 py-2 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <a href="/products">Explore Zaza</a>
            </Button>
          </div>

          {/* Column 2 - Support */}
          <div>
            <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase mb-6">Support</h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="/contact"
                  className="text-gray-300 hover:text-white text-sm transition-colors duration-200 hover:underline"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="/privacy-policy"
                  className="text-gray-300 hover:text-white text-sm transition-colors duration-200 hover:underline"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="/terms"
                  className="text-gray-300 hover:text-white text-sm transition-colors duration-200 hover:underline"
                >
                  Terms of Use
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3 - Trust & Security */}
          <div>
            <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase mb-6">Trust & Security</h3>
            <ul className="space-y-4">
              <li className="flex items-center text-sm text-gray-300">
                <Shield className="w-4 h-4 text-purple-400 mr-3 flex-shrink-0" />
                GDPR Compliant
              </li>
              <li className="flex items-center text-sm text-gray-300">
                <Lock className="w-4 h-4 text-pink-400 mr-3 flex-shrink-0" />
                FERPA Safe
              </li>
              <li className="flex items-center text-sm text-gray-300">
                <Heart className="w-4 h-4 text-purple-400 mr-3 flex-shrink-0 fill-current" />
                Built by Educators
              </li>
            </ul>
          </div>

          {/* Column 4 - Zaza Ecosystem */}
          <div>
            <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase mb-6">Zaza Ecosystem</h3>
            <ul className="space-y-4">
              {ecosystemLinks.map((link) => (
                <li key={link.key}>
                  <a
                    href={link.href}
                    className={`text-sm transition-colors duration-200 hover:underline ${
                      currentPage === link.key ? "text-purple-300 font-medium" : "text-gray-300 hover:text-white"
                    }`}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Media Section */}
        <div className="mb-8">
          <div className="text-center">
            <span className="text-xs font-semibold text-gray-400 tracking-wider uppercase mb-4 block">Follow Us</span>
            <div className="flex justify-center space-x-6">
              <a
                href="#"
                className="text-gray-400 hover:text-purple-400 transition-colors duration-200 group"
                aria-label="Follow us on TikTok"
              >
                <svg
                  className="h-6 w-6 group-hover:scale-110 transition-transform duration-200"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-blue-400 transition-colors duration-200 group"
                aria-label="Connect with us on LinkedIn"
              >
                <Linkedin className="h-6 w-6 group-hover:scale-110 transition-transform duration-200" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-gray-300 transition-colors duration-200 group"
                aria-label="Follow us on X (Twitter)"
              >
                <Twitter className="h-6 w-6 group-hover:scale-110 transition-transform duration-200" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="pt-8 border-t border-gray-700">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <p className="text-gray-400 text-xs order-2 lg:order-1">
              © 2025 Zaza Technologies UG (haftungsbeschränkt). All rights reserved.
            </p>
            <p className="text-gray-400 text-xs order-1 lg:order-2 text-center lg:text-right">
              Made with 💙 by teachers, for learners. · Trusted by educators worldwide.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
