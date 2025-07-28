"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Shield, Lock, Heart } from "lucide-react"

interface SharedFooterProps {
  currentProduct?: string
}

export function SharedFooter({ currentProduct }: SharedFooterProps) {
  const ecosystemProducts = [
    { name: "Zaza Teach", href: "/zaza-teach-website" },
    { name: "Zaza Promptly", href: "/zaza-promptly-site" },
    { name: "Zaza Inbox", href: "/zaza-inbox" },
            { name: "Zaza Visuals", href: "/zaza-visuals-landing (1)" },
            { name: "Zaza ClarityDeck", href: "/claritydeck-landing" },
    { name: "Zaza Schwoop", href: "/zaza-schwoop" },
  ]

  const socialLinks = [
    {
      name: "TikTok",
      href: "#",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
        </svg>
      ),
    },
    {
      name: "LinkedIn",
      href: "#",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
    {
      name: "Twitter",
      href: "#",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
  ]

  return (
    <footer className="bg-[#0C0C2C] text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            {/* Column 1 - Zaza Branding */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <Image
                  src="/zaza-logo.png"
                  alt="Zaza Technologies Logo"
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-xl"
                />
                <span className="text-2xl font-bold">Zaza Technologies</span>
              </div>
              <p className="text-gray-300 leading-relaxed max-w-sm">
                Empowering teachers through emotionally intelligent AI.
              </p>
              <Link href="/products">
                <Button className="bg-gradient-to-r from-[#9C27B0] to-[#E91E63] hover:from-[#7B1FA2] hover:to-[#C2185B] text-white rounded-xl px-6 py-3 font-semibold transition-all duration-300 hover:scale-105">
                  Explore Zaza
                </Button>
              </Link>
            </div>

            {/* Column 2 - Support */}
            <div className="space-y-6">
              <h4 className="text-lg font-bold text-white">Support</h4>
              <ul className="space-y-4">
                <li>
                  <Link
                    href="/contact"
                    className="text-gray-300 hover:text-white transition-all duration-200 hover:translate-x-1 inline-block"
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy"
                    className="text-gray-300 hover:text-white transition-all duration-200 hover:translate-x-1 inline-block"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="text-gray-300 hover:text-white transition-all duration-200 hover:translate-x-1 inline-block"
                  >
                    Terms of Use
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3 - Trust & Security */}
            <div className="space-y-6">
              <h4 className="text-lg font-bold text-white">Trust & Security</h4>
              <ul className="space-y-4">
                <li className="flex items-center space-x-3">
                  <div className="w-5 h-5 bg-gradient-to-r from-[#9C27B0] to-[#E91E63] rounded-full flex items-center justify-center">
                    <Shield className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-gray-300">GDPR Compliant ✅</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-5 h-5 bg-gradient-to-r from-[#E91E63] to-[#9C27B0] rounded-full flex items-center justify-center">
                    <Lock className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-gray-300">FERPA Safe 🔒</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-5 h-5 bg-gradient-to-r from-[#9C27B0] to-[#E91E63] rounded-full flex items-center justify-center">
                    <Heart className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-gray-300">Built by Educators 💜</span>
                </li>
              </ul>
            </div>

            {/* Column 4 - Zaza Ecosystem */}
            <div className="space-y-6">
              <h4 className="text-lg font-bold text-white">Zaza Ecosystem</h4>
              <ul className="space-y-4">
                {ecosystemProducts.map((product) => (
                  <li key={product.name}>
                    <Link
                      href={product.href}
                      className={`transition-all duration-200 hover:translate-x-1 inline-block ${
                        currentProduct === product.name.toLowerCase().replace(" ", "-")
                          ? "text-purple-300 bg-gradient-to-r from-[#9C27B0] to-[#E91E63] bg-clip-text text-transparent font-medium"
                          : "text-gray-300 hover:text-white"
                      }`}
                    >
                      {product.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Social Media Section */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center">
              <h5 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-6">Follow Us</h5>
              <div className="flex justify-center space-x-6">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center hover:bg-gradient-to-r hover:from-[#9C27B0] hover:to-[#E91E63] transition-all duration-300 hover:scale-105 text-gray-300 hover:text-white"
                    aria-label={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0">
              {/* Left side - Copyright */}
              <div className="text-center lg:text-left">
                <p className="text-gray-400 text-sm">
                  © 2025 Zaza Technologies UG (haftungsbeschränkt). All rights reserved.
                </p>
              </div>

              {/* Right side - Tagline */}
              <div className="text-center lg:text-right">
                <p className="text-gray-300 text-sm">
                  Made with 💙 by teachers, for learners. · Trusted by educators worldwide.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
