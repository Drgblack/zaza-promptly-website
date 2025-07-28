import { Shield, Lock, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Footer() {
  return (
    <footer className="bg-[#0a0a23] text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
        {/* Main Footer Content - 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-16">
          {/* Column 1 - Zaza Branding */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IOS%20App%20icon%20-%201024x1024-eHnj4OltdQLbYrwYvzhe7JPAeEheOz.png"
                alt="Zaza Technologies logo"
                className="w-10 h-10 rounded-lg"
              />
              <span className="text-xl font-bold text-white">Zaza Technologies</span>
            </div>
            <p className="text-gray-300 leading-relaxed text-sm">
              Empowering teachers through emotionally intelligent AI.
            </p>
            <Button
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-lg px-6 py-2 transition-all duration-200 hover:scale-105"
              asChild
            >
              <a href="/products">Explore Zaza</a>
            </Button>
          </div>

          {/* Column 2 - Support */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-200">Support</h3>
            <nav className="space-y-4" role="navigation" aria-label="Support navigation">
              <a
                href="/contact"
                className="block text-gray-300 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-[#0a0a23] rounded-md px-1 py-1"
              >
                Contact Us
              </a>
              <a
                href="/privacy"
                className="block text-gray-300 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-[#0a0a23] rounded-md px-1 py-1"
              >
                Privacy Policy
              </a>
              <a
                href="/terms"
                className="block text-gray-300 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-[#0a0a23] rounded-md px-1 py-1"
              >
                Terms of Use
              </a>
            </nav>
          </div>

          {/* Column 3 - Trust & Security */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-200">Trust & Security</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Shield className="w-5 h-5 text-purple-400" />
                <span className="text-gray-300 text-sm">GDPR Compliant</span>
              </div>
              <div className="flex items-center space-x-3">
                <Lock className="w-5 h-5 text-pink-400" />
                <span className="text-gray-300 text-sm">FERPA Safe</span>
              </div>
              <div className="flex items-center space-x-3">
                <Heart className="w-5 h-5 text-purple-300" />
                <span className="text-gray-300 text-sm">Built by Educators</span>
              </div>
            </div>
          </div>

          {/* Column 4 - Zaza Ecosystem */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-200">Zaza Ecosystem</h3>
            <nav className="space-y-4" role="navigation" aria-label="Zaza Ecosystem">
              <a
                href="/zaza-teach-website"
                className="block text-gray-300 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-[#0a0a23] rounded-md px-1 py-1"
              >
                Zaza Teach
              </a>
                              <a href="/zaza-promptly-site" className="block text-purple-300 font-medium px-1 py-1" aria-current="page">
                Zaza Promptly
              </a>
              <a
                href="/zaza-inbox"
                className="block text-gray-300 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-[#0a0a23] rounded-md px-1 py-1"
              >
                Zaza Inbox
              </a>
              <a
                href="/zaza-visuals-landing (1)"
                className="block text-gray-300 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-[#0a0a23] rounded-md px-1 py-1"
              >
                Zaza Visuals
              </a>
              <a
                href="/claritydeck-landing"
                className="block text-gray-300 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-[#0a0a23] rounded-md px-1 py-1"
              >
                Zaza ClarityDeck
              </a>
              <a
                href="/zaza-schwoop"
                className="block text-gray-300 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-[#0a0a23] rounded-md px-1 py-1"
              >
                Zaza Schwoop
              </a>
            </nav>
          </div>
        </div>

        {/* Social Media Section */}
        <div className="flex flex-col items-center space-y-6 mb-12">
          <p className="text-gray-400 text-sm font-medium tracking-wider">FOLLOW US</p>
          <div className="flex items-center space-x-8">
            <a
              href="#"
              className="text-gray-400 hover:text-purple-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-[#0a0a23] rounded-md p-2"
              aria-label="Follow us on TikTok"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
              </svg>
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-purple-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-[#0a0a23] rounded-md p-2"
              aria-label="Follow us on LinkedIn"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-purple-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-[#0a0a23] rounded-md p-2"
              aria-label="Follow us on X (Twitter)"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            <p className="text-gray-400 text-sm text-center lg:text-left">
              © 2025 Zaza Technologies UG (haftungsbeschränkt). All rights reserved.
            </p>
            <p className="text-gray-400 text-sm text-center lg:text-right">
              Made with 💙 by teachers, for learners. · Trusted by educators worldwide.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
