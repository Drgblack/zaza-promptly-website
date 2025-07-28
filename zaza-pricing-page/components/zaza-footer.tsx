import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Heart, Shield, Lock } from "lucide-react"

interface ZazaFooterProps {
  currentProduct?: string
}

const footerNavigation = {
  support: [
    { name: "Contact Us", href: "/contact" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Use", href: "/terms" },
  ],
  trustSecurity: [
    { name: "GDPR Compliant", icon: Shield, color: "text-violet-400" },
    { name: "FERPA Safe", icon: Lock, color: "text-pink-400" },
    { name: "Built by Educators", icon: Heart, color: "text-purple-400" },
  ],
  ecosystem: [
    { name: "Zaza Teach", href: "/zaza-teach-website", key: "teach" },
    { name: "Zaza Promptly", href: "/zaza-promptly-site", key: "promptly" },
    { name: "Zaza Inbox", href: "/zaza-inbox", key: "inbox" },
            { name: "Zaza Visuals", href: "/zaza-visuals-landing (1)", key: "visuals" },
            { name: "Zaza ClarityDeck", href: "/claritydeck-landing", key: "claritydeck" },
    { name: "Zaza Schwoop", href: "/zaza-schwoop", key: "schwoop" },
  ],
  social: [
    {
      name: "TikTok",
      href: "https://tiktok.com/@zazatechnologies",
      icon: "M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43V7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.43z",
    },
    {
      name: "LinkedIn",
      href: "https://linkedin.com/company/zaza-technologies",
      icon: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
    },
    {
      name: "Twitter",
      href: "https://twitter.com/zazatechnologies",
      icon: "M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z",
    },
  ],
}

export default function ZazaFooter({ currentProduct }: ZazaFooterProps) {
  return (
    <footer className="bg-[#0B0B2B] dark:bg-[#121212] text-white transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12">
        {/* Main footer content */}
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Column 1 - Zaza Branding */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <Image
                src="/images/zaza-logo.png"
                alt="Zaza Technologies logo"
                width={40}
                height={40}
                className="h-10 w-10"
              />
              <span className="text-xl font-bold text-white">Zaza Technologies</span>
            </div>
            <p className="text-gray-300 dark:text-gray-400 text-sm leading-relaxed transition-colors duration-300">
              Empowering teachers through emotionally intelligent AI.
            </p>
            <Button
              asChild
              className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white font-medium px-6 py-2 rounded-lg shadow-lg transition-all duration-200"
            >
              <Link href="/products">Explore Zaza</Link>
            </Button>
          </div>

          {/* Column 2 - Support */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white">Support</h3>
            <ul className="space-y-4">
              {footerNavigation.support.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-300 dark:text-gray-400 hover:text-violet-300 transition-colors duration-300 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-[#0B0B2B] dark:focus:ring-offset-[#121212] rounded-sm"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Trust & Security */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white">Trust & Security</h3>
            <ul className="space-y-4">
              {footerNavigation.trustSecurity.map((item) => {
                const IconComponent = item.icon
                return (
                  <li key={item.name} className="flex items-center gap-3">
                    <IconComponent className={`h-4 w-4 ${item.color}`} />
                    <span className="text-gray-300 dark:text-gray-400 text-sm transition-colors duration-300">
                      {item.name}
                    </span>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Column 4 - Zaza Ecosystem */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white">Zaza Ecosystem</h3>
            <ul className="space-y-4">
              {footerNavigation.ecosystem.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`text-sm transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-[#0B0B2B] dark:focus:ring-offset-[#121212] rounded-sm ${
                      currentProduct === item.key
                        ? "text-purple-300 font-medium"
                        : "text-gray-300 dark:text-gray-400 hover:text-violet-300"
                    }`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Media Section */}
        <div className="mt-16 pt-8 border-t border-gray-700 dark:border-gray-600 transition-colors duration-300">
          <div className="flex flex-col items-center space-y-6">
            <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Follow Us</h4>
            <div className="flex items-center space-x-8">
              {footerNavigation.social.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-[#0B0B2B] dark:focus:ring-offset-[#121212] rounded-sm"
                  aria-label={`Follow us on ${item.name}`}
                >
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d={item.icon} />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Bottom Line */}
        <div className="mt-12 pt-8 border-t border-gray-700 dark:border-gray-600 transition-colors duration-300">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 text-center lg:text-left">
            <div className="text-sm text-gray-400">
              © 2025 Zaza Technologies UG (haftungsbeschränkt). All rights reserved.
            </div>
            <div className="text-sm text-gray-300 dark:text-gray-400 flex items-center justify-center lg:justify-end gap-1 transition-colors duration-300">
              Made with <Heart className="h-4 w-4 text-blue-500 fill-current" aria-hidden="true" />
              by teachers, for learners. · Trusted by educators worldwide.
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
