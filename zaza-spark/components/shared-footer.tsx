"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Shield, Lock, Heart } from "lucide-react"

interface SharedFooterProps {
  currentProduct?: string
}

export function SharedFooter({ currentProduct = "spark" }: SharedFooterProps) {
  const products = [
    { name: "Zaza Teach", href: "/zaza-teach-website", key: "teach" },
    { name: "Zaza Promptly", href: "/zaza-promptly-site", key: "promptly" },
    { name: "Zaza Inbox", href: "/zaza-inbox", key: "inbox" },
            { name: "Zaza Visuals", href: "/zaza-visuals-landing (1)", key: "visuals" },
            { name: "Zaza ClarityDeck", href: "/claritydeck-landing", key: "claritydeck" },
    { name: "Zaza Schwoop", href: "/zaza-schwoop", key: "schwoop" },
  ]

  const socialLinks = [
    {
      name: "TikTok",
      href: "https://tiktok.com/@zazatech",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
        </svg>
      ),
    },
    {
      name: "LinkedIn",
      href: "https://linkedin.com/company/zaza-technologies",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
    {
      name: "Twitter",
      href: "https://twitter.com/zazatech",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
  ]

  return (
    <footer className="bg-slate-900 text-slate-100 border-t border-slate-800">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Zaza Branding Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10">
                <Image
                  src="/images/zaza_logo.png"
                  alt="Zaza Technologies"
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Zaza Technologies</h3>
              </div>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed">
              Empowering teachers through emotionally intelligent AI.
            </p>
            <Button
              asChild
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 transition-all duration-200"
            >
              <Link href="/products">Explore Zaza</Link>
            </Button>
          </div>

          {/* Support Column */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold text-base">Support</h4>
            <nav className="space-y-3">
              <Link
                href="/contact"
                className="block text-slate-300 hover:text-white transition-colors duration-200 text-sm"
              >
                Contact Us
              </Link>
              <Link
                href="/privacy"
                className="block text-slate-300 hover:text-white transition-colors duration-200 text-sm"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="block text-slate-300 hover:text-white transition-colors duration-200 text-sm"
              >
                Terms of Use
              </Link>
            </nav>
          </div>

          {/* Trust & Security Column */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold text-base">Trust & Security</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <Shield className="w-4 h-4 text-purple-400" />
                <span className="text-slate-300">GDPR Compliant</span>
                <span className="text-green-400 text-xs">✓</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Lock className="w-4 h-4 text-pink-400" />
                <span className="text-slate-300">FERPA Safe</span>
                <span className="text-slate-400 text-xs">🔒</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Heart className="w-4 h-4 text-purple-400" />
                <span className="text-slate-300">Built by Educators</span>
                <span className="text-purple-400 text-xs">💜</span>
              </div>
            </div>
          </div>

          {/* Zaza Ecosystem Column */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold text-base">Zaza Ecosystem</h4>
            <nav className="space-y-3">
              {products.map((product) => (
                <Link
                  key={product.key}
                  href={product.href}
                  className={`block transition-colors duration-200 text-sm ${
                    currentProduct === product.key ? "text-purple-300 font-medium" : "text-slate-300 hover:text-white"
                  }`}
                >
                  {product.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Social Media Section */}
        <div className="mt-12 pt-8 border-t border-slate-800">
          <div className="text-center">
            <h4 className="text-white font-semibold text-sm mb-4 tracking-wider">FOLLOW US</h4>
            <div className="flex justify-center items-center gap-6">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-white transition-colors duration-200 p-2 rounded-full hover:bg-slate-800"
                  aria-label={social.name}
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="mt-8 pt-6 border-t border-slate-800">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4 text-xs text-slate-400">
            <div className="text-center lg:text-left">
              © 2025 Zaza Technologies UG (haftungsbeschränkt). All rights reserved.
            </div>
            <div className="text-center lg:text-right">
              Made with{" "}
              <span className="text-blue-400" aria-label="love">
                💙
              </span>{" "}
              by teachers, for learners. · Trusted by educators worldwide.
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
