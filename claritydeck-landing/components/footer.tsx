"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Shield, Lock, Heart } from "lucide-react"

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="bg-[#0C0E21] text-white font-sans">
      {/* Main footer content */}
      <div className="container mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
          {/* Column 1: Zaza Branding */}
          <div className="space-y-6 text-center md:text-left">
            <button
              onClick={scrollToTop}
              className="flex items-center gap-3 hover:opacity-80 transition-opacity duration-200 mx-auto md:mx-0"
            >
              <Image
                src="/images/zaza-logo.png"
                alt="Zaza Technologies Logo"
                width={44}
                height={44}
                className="rounded-full"
              />
              <span className="text-xl font-bold text-white">Zaza Technologies</span>
            </button>
            <p className="text-white/70 text-sm leading-relaxed max-w-xs mx-auto md:mx-0">
              Empowering teachers through emotionally intelligent AI.
            </p>
            <Button
              asChild
              className="bg-gradient-to-r from-[#FF6B9D] to-[#8B5CF6] hover:from-[#FF6B9D]/90 hover:to-[#8B5CF6]/90 text-white px-6 py-3 rounded-full transition-all duration-200 hover:scale-105 text-sm font-medium shadow-lg"
            >
              <a href="/products">Explore Zaza</a>
            </Button>
          </div>

          {/* Column 2: Support */}
          <div className="space-y-4 text-center md:text-left">
            <h3 className="text-lg font-semibold text-white mb-6">Support</h3>
            <nav className="space-y-4">
              <a
                href="/contact"
                className="block text-white/70 hover:text-white hover:underline hover:decoration-[#8B5CF6] transition-all duration-200 text-sm"
              >
                Contact Us
              </a>
              <a
                href="/privacy"
                className="block text-white/70 hover:text-white hover:underline hover:decoration-[#8B5CF6] transition-all duration-200 text-sm"
              >
                Privacy Policy
              </a>
              <a
                href="/terms"
                className="block text-white/70 hover:text-white hover:underline hover:decoration-[#8B5CF6] transition-all duration-200 text-sm"
              >
                Terms of Use
              </a>
            </nav>
          </div>

          {/* Column 3: Trust & Security */}
          <div className="space-y-4 text-center md:text-left">
            <h3 className="text-lg font-semibold text-white mb-6">Trust & Security</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3 justify-center md:justify-start">
                <Shield className="w-4 h-4 text-[#8B5CF6]" />
                <span className="text-white/70 text-sm">GDPR Compliant ✅</span>
              </div>
              <div className="flex items-center gap-3 justify-center md:justify-start">
                <Lock className="w-4 h-4 text-[#FF6B9D]" />
                <span className="text-white/70 text-sm">FERPA Safe 🔒</span>
              </div>
              <div className="flex items-center gap-3 justify-center md:justify-start">
                <Heart className="w-4 h-4 text-[#8B5CF6]" />
                <span className="text-white/70 text-sm">Built by Educators 💜</span>
              </div>
            </div>
          </div>

          {/* Column 4: Zaza Ecosystem */}
          <div className="space-y-4 text-center md:text-left">
            <h3 className="text-lg font-semibold text-white mb-6">Zaza Ecosystem</h3>
            <nav className="space-y-4">
              <a
                href="/zaza-teach-website"
                className="block text-white/70 hover:text-white hover:underline hover:decoration-[#8B5CF6] transition-all duration-200 text-sm"
              >
                Zaza Teach
              </a>
              <a
                href="/zaza-promptly-site"
                className="block text-white/70 hover:text-white hover:underline hover:decoration-[#8B5CF6] transition-all duration-200 text-sm"
              >
                Zaza Promptly
              </a>
              <a
                href="/zaza-inbox"
                className="block text-white/70 hover:text-white hover:underline hover:decoration-[#8B5CF6] transition-all duration-200 text-sm"
              >
                Zaza Inbox
              </a>
              <a
                href="/zaza-visuals-landing (1)"
                className="block text-white/70 hover:text-white hover:underline hover:decoration-[#8B5CF6] transition-all duration-200 text-sm"
              >
                Zaza Visuals
              </a>
              <span className="block text-[#8B5CF6] font-medium text-sm cursor-default">Zaza ClarityDeck</span>
              <a
                href="/zaza-schwoop"
                className="block text-white/70 hover:text-white hover:underline hover:decoration-[#8B5CF6] transition-all duration-200 text-sm"
              >
                Zaza Schwoop
              </a>
            </nav>
          </div>
        </div>
      </div>

      {/* Social Media Section */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-6 py-8">
          <div className="text-center">
            <h4 className="text-sm font-semibold text-white/80 mb-6 tracking-wider">FOLLOW US</h4>
            <div className="flex justify-center items-center gap-8">
              <a
                href="https://tiktok.com/@zazatechnologies"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-[#FF6B9D] transition-colors duration-200"
                aria-label="Follow us on TikTok"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43V7.56a8.16 8.16 0 0 0 4.77 1.52v-3.39z" />
                </svg>
              </a>
              <a
                href="https://linkedin.com/company/zaza-technologies"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-[#8B5CF6] transition-colors duration-200"
                aria-label="Follow us on LinkedIn"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href="https://twitter.com/zazatechnologies"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-[#8B5CF6] transition-colors duration-200"
                aria-label="Follow us on Twitter"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4 text-xs text-white/60">
            <p className="text-center lg:text-left">
              © 2025 Zaza Technologies UG (haftungsbeschränkt). All rights reserved.
            </p>
            <p className="text-center lg:text-right">
              Made with 💙 by teachers, for learners. · Trusted by educators worldwide.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
