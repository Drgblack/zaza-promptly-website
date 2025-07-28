"use client"

import { useRouter } from "next/navigation"
import { Shield, Lock, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SharedFooterProps {
  currentPage?: string
}

export default function SharedFooter({ currentPage }: SharedFooterProps) {
  const router = useRouter()

  const ecosystemLinks = [
    { name: "Zaza Teach", href: "/zaza-teach-website" },
    { name: "Zaza Promptly", href: "/zaza-promptly-site" },
    { name: "Zaza Inbox", href: "/zaza-inbox" },
            { name: "Zaza Visuals", href: "/zaza-visuals-landing (1)" },
            { name: "Zaza ClarityDeck", href: "/claritydeck-landing" },
    { name: "Zaza Schwoop", href: "/zaza-schwoop" },
  ]

  const supportLinks = [
    { name: "Contact Us", href: "/contact" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Use", href: "/terms" },
  ]

  const trustItems = [
    {
      name: "GDPR Compliant",
      icon: <Shield className="w-4 h-4 text-purple-400" />,
      checkmark: "✅",
    },
    {
      name: "FERPA Safe",
      icon: <Lock className="w-4 h-4 text-pink-400" />,
      checkmark: "🔒",
    },
    {
      name: "Built by Educators",
      icon: <Heart className="w-4 h-4 text-purple-400" />,
      checkmark: "💜",
    },
  ]

  return (
    <footer className="bg-[#0a0a23] text-gray-100 border-t border-gray-800">
      <div className="container mx-auto px-4 py-16">
        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Column 1: Zaza Branding */}
          <div className="lg:col-span-1 space-y-6">
            <a href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity duration-200 group">
              <img
                src="/images/zaza-logo-final.png"
                alt="Zaza Technologies Logo"
                className="h-10 w-auto object-contain"
              />
              <h3 className="text-xl font-bold text-white relative">
                Zaza Technologies
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
              </h3>
            </a>

            <p className="text-gray-300 leading-relaxed text-sm">
              Empowering teachers through emotionally intelligent AI.
            </p>

            <Button
              onClick={() => router.push("/products")}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium px-6 py-2 rounded-lg transition-all duration-200 hover:scale-105 shadow-lg"
            >
              Explore Zaza
            </Button>
          </div>

          {/* Column 2: Support */}
          <div>
            <h4 className="text-lg font-semibold text-gray-200 mb-6">Support</h4>
            <ul className="space-y-3">
              {supportLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200 text-sm hover:underline"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Trust & Security */}
          <div>
            <h4 className="text-lg font-semibold text-gray-200 mb-6">Trust & Security</h4>
            <ul className="space-y-4">
              {trustItems.map((item) => (
                <li key={item.name} className="flex items-center space-x-3">
                  <span className="text-lg">{item.checkmark}</span>
                  <span className="text-gray-400 text-sm">{item.name}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Zaza Ecosystem */}
          <div>
            <h4 className="text-lg font-semibold text-gray-200 mb-6">Zaza Ecosystem</h4>
            <ul className="space-y-3">
              {ecosystemLinks.map((link) => {
                const isCurrentPage = currentPage && link.href.includes(currentPage)
                return (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className={`text-sm transition-colors duration-200 hover:underline ${
                        isCurrentPage ? "text-purple-300 font-medium" : "text-gray-400 hover:text-white"
                      }`}
                    >
                      {link.name}
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>

        {/* Social Media Section */}
        <div className="border-t border-gray-700 pt-8 mb-8">
          <div className="text-center">
            <p className="text-gray-400 text-sm font-medium mb-6 tracking-wider">FOLLOW US</p>
            <div className="flex justify-center space-x-8">
              {/* TikTok */}
              <a
                href="#"
                className="text-gray-400 hover:text-purple-400 transition-colors duration-200"
                aria-label="Follow us on TikTok"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="#"
                className="text-gray-400 hover:text-purple-400 transition-colors duration-200"
                aria-label="Follow us on LinkedIn"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>

              {/* X (Twitter) */}
              <a
                href="#"
                className="text-gray-400 hover:text-purple-400 transition-colors duration-200"
                aria-label="Follow us on X"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Legal Section */}
        <div className="border-t border-gray-700 pt-6">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            <p className="text-gray-400 text-sm text-center lg:text-left">
              © 2025 Zaza Technologies UG (haftungsbeschränkt). All rights reserved.
            </p>
            <p className="text-gray-400 text-sm text-center lg:text-right">
              Made with 💙 by teachers, for learners. Trusted by educators worldwide.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
