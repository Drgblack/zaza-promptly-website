"use client"

import { Shield, Lock, Heart, TwitterIcon as TikTok, Linkedin, Twitter } from "lucide-react"

interface FooterProps {
  currentPage?: string
}

export function Footer({ currentPage }: FooterProps) {
  const isCurrentPage = (page: string) => currentPage === page

  return (
    <footer className="bg-slate-900 text-slate-100">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Column 1: Zaza Branding */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img src="/new-logo.png" alt="Zaza Technologies" className="w-8 h-8" />
              <span className="text-xl font-semibold text-white">Zaza Technologies</span>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed">
              Empowering teachers through emotionally intelligent AI.
            </p>
            <div className="pt-2">
              <a
                href="/products"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-sm"
              >
                Explore Zaza
              </a>
            </div>
          </div>

          {/* Column 2: Support */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Support</h3>
            <nav className="space-y-3">
              <a href="/contact" className="block text-slate-300 hover:text-white transition-colors duration-200">
                Contact Us
              </a>
              <a href="/privacy" className="block text-slate-300 hover:text-white transition-colors duration-200">
                Privacy Policy
              </a>
              <a href="/tos" className="block text-slate-300 hover:text-white transition-colors duration-200">
                Terms of Use
              </a>
            </nav>
          </div>

          {/* Column 3: Trust & Security */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Trust & Security</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Shield className="w-5 h-5 text-purple-400" />
                <span className="text-slate-300 text-sm">GDPR Compliant ✅</span>
              </div>
              <div className="flex items-center space-x-3">
                <Lock className="w-5 h-5 text-pink-400" />
                <span className="text-slate-300 text-sm">FERPA Safe 🔒</span>
              </div>
              <div className="flex items-center space-x-3">
                <Heart className="w-5 h-5 text-purple-400" />
                <span className="text-slate-300 text-sm">Built by Educators 💜</span>
              </div>
            </div>
          </div>

          {/* Column 4: Zaza Ecosystem */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Zaza Ecosystem</h3>
            <nav className="space-y-3">
              <a
                href="/zaza-teach-website"
                className={`block transition-colors duration-200 ${
                  isCurrentPage("zaza-teach") ? "text-purple-300" : "text-slate-300 hover:text-white"
                }`}
              >
                Zaza Teach
              </a>
              <a
                href="/zaza-promptly-site"
                className={`block transition-colors duration-200 ${
                  isCurrentPage("zaza-promptly") ? "text-purple-300" : "text-slate-300 hover:text-white"
                }`}
              >
                Zaza Promptly
              </a>
              <a
                href="/zaza-inbox"
                className={`block transition-colors duration-200 ${
                  isCurrentPage("zaza-inbox") ? "text-purple-300" : "text-slate-300 hover:text-white"
                }`}
              >
                Zaza Inbox
              </a>
              <a
                href="/zaza-visuals-landing (1)"
                className={`block transition-colors duration-200 ${
                  isCurrentPage("zaza-visuals") ? "text-purple-300" : "text-slate-300 hover:text-white"
                }`}
              >
                Zaza Visuals
              </a>
              <a
                href="/zaza-claritydeck"
                className={`block transition-colors duration-200 ${
                  isCurrentPage("zaza-claritydeck") ? "text-purple-300" : "text-slate-300 hover:text-white"
                }`}
              >
                Zaza ClarityDeck
              </a>
              <a
                href="/zaza-schwoop"
                className={`block transition-colors duration-200 ${
                  isCurrentPage("zaza-schwoop") ? "text-purple-300" : "text-slate-300 hover:text-white"
                }`}
              >
                Zaza Schwoop
              </a>
            </nav>
          </div>
        </div>

        {/* Social Media Section */}
        <div className="mt-12 pt-8 border-t border-slate-700">
          <div className="text-center">
            <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Follow Us</h4>
            <div className="flex justify-center items-center space-x-6">
              <a
                href="#"
                className="text-slate-400 hover:text-purple-400 transition-colors duration-200"
                aria-label="Follow us on TikTok"
              >
                <TikTok className="w-6 h-6" />
              </a>
              <a
                href="#"
                className="text-slate-400 hover:text-purple-400 transition-colors duration-200"
                aria-label="Follow us on LinkedIn"
              >
                <Linkedin className="w-6 h-6" />
              </a>
              <a
                href="#"
                className="text-slate-400 hover:text-purple-400 transition-colors duration-200"
                aria-label="Follow us on Twitter"
              >
                <Twitter className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Line */}
        <div className="mt-8 pt-8 border-t border-slate-700">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            <div className="text-sm text-slate-400">
              © 2025 Zaza Technologies UG (haftungsbeschränkt). All rights reserved.
            </div>
            <div className="text-sm text-slate-400 text-center lg:text-right">
              Made with 💙 by teachers, for learners. · Trusted by educators worldwide.
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
