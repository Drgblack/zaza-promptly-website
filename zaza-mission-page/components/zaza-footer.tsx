import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Shield, Lock, Heart } from "lucide-react"

interface ZazaFooterProps {
  currentPage?: string
}

export default function ZazaFooter({ currentPage }: ZazaFooterProps) {
  const ecosystemLinks = [
    { name: "Zaza Teach", href: "/zaza-teach-website" },
    { name: "Zaza Promptly", href: "/zaza-promptly-site" },
    { name: "Zaza Inbox", href: "/zaza-inbox" },
            { name: "Zaza Visuals", href: "/zaza-visuals-landing (1)" },
            { name: "Zaza ClarityDeck", href: "/claritydeck-landing" },
    { name: "Zaza Schwoop", href: "/zaza-schwoop" },
  ]

  const isCurrentPage = (href: string) => {
    return currentPage === href
  }

  return (
    <footer className="text-white py-20" style={{ backgroundColor: "#0a0a23" }}>
      <div className="container mx-auto px-4">
        {/* Main Footer Content - 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-16">
          {/* Column 1 - Zaza Branding */}
          <div className="lg:col-span-1 space-y-6">
            <div className="flex items-center space-x-3 mb-4">
              <Image src="/zaza-logo.png" alt="Zaza Technologies Logo" width={40} height={40} className="rounded-lg" />
              <span className="text-xl font-semibold text-white">Zaza Technologies</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              Empowering teachers through emotionally intelligent AI.
            </p>
            <Button
              asChild
              className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white border-0 px-6 py-2 rounded-lg font-medium transition-all duration-200"
            >
              <Link href="/products">Explore Zaza</Link>
            </Button>
          </div>

          {/* Column 2 - Support */}
          <div>
            <h3 className="font-semibold text-lg mb-6 text-gray-200">Support</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Terms of Use
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 - Trust & Security */}
          <div>
            <h3 className="font-semibold text-lg mb-6 text-gray-200">Trust & Security</h3>
            <ul className="space-y-4">
              <li className="flex items-center text-gray-300 text-sm">
                <Shield className="w-4 h-4 mr-3 text-purple-400" />
                GDPR Compliant
              </li>
              <li className="flex items-center text-gray-300 text-sm">
                <Lock className="w-4 h-4 mr-3 text-pink-400" />
                FERPA Safe
              </li>
              <li className="flex items-center text-gray-300 text-sm">
                <Heart className="w-4 h-4 mr-3 text-purple-400" />
                Built by Educators
              </li>
            </ul>
          </div>

          {/* Column 4 - Zaza Ecosystem */}
          <div>
            <h3 className="font-semibold text-lg mb-6 text-gray-200">Zaza Ecosystem</h3>
            <ul className="space-y-4">
              {ecosystemLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`text-sm transition-colors ${
                      isCurrentPage(link.href) ? "text-purple-300 font-medium" : "text-gray-300 hover:text-white"
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
        <div className="flex flex-col items-center mb-12">
          <p className="text-gray-400 text-sm font-medium mb-6 tracking-wider">FOLLOW US</p>
          <div className="flex space-x-8">
            <Link href="#" className="text-gray-400 hover:text-purple-300 transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-2.08v5.73a3.87 3.87 0 0 1-3.87 3.87 3.87 3.87 0 0 1-3.87-3.87V2H4.08v5.73a4.83 4.83 0 0 1-3.77 4.25 4.83 4.83 0 0 1 3.77 4.25V22h2.08v-5.73a3.87 3.87 0 0 1 3.87-3.87 3.87 3.87 0 0 1 3.87 3.87V22h2.08v-5.73a4.83 4.83 0 0 1 3.77-4.25z" />
              </svg>
              <span className="sr-only">TikTok</span>
            </Link>
            <Link href="#" className="text-gray-400 hover:text-purple-300 transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              <span className="sr-only">LinkedIn</span>
            </Link>
            <Link href="#" className="text-gray-400 hover:text-purple-300 transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              <span className="sr-only">X (Twitter)</span>
            </Link>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            <p className="text-gray-400 text-sm text-center lg:text-left">
              © 2025 Zaza Technologies UG (haftungsbeschränkt). All rights reserved.
            </p>
            <p className="text-gray-300 text-sm text-center lg:text-right">
              Made with 💙 by teachers, for learners. · Trusted by educators worldwide.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
