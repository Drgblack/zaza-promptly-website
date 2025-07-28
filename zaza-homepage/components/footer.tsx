"use client"
import { Button } from "@/components/ui/button"
import { Twitter, Linkedin, Shield, Lock, Heart } from "lucide-react"

export default function Footer() {
  const supportLinks = [
    { name: "Contact Us", href: "/contact" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Use", href: "/terms" },
  ]

  const trustItems = [
    { name: "GDPR Compliant", icon: Shield, color: "text-purple-400" },
    { name: "FERPA Safe", icon: Lock, color: "text-pink-400" },
    { name: "Built by Educators", icon: Heart, color: "text-purple-400" },
  ]

  const ecosystemLinks = [
            { name: "Zaza Teach", href: "/zaza-teach-website" },
    { name: "Zaza Promptly", href: "/zaza-promptly-site" },
    { name: "Zaza Inbox", href: "/zaza-inbox" },
            { name: "Zaza Visuals", href: "/zaza-visuals-landing (1)" },
    { name: "Zaza ClarityDeck", href: "/zaza-claritydeck" },
    { name: "Zaza Schwoop", href: "/zaza-schwoop" },
  ]

  const socialLinks = [
    {
      name: "TikTok",
      href: "https://tiktok.com/@zazatech",
      icon: () => (
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
        </svg>
      ),
    },
    {
      name: "LinkedIn",
      href: "https://linkedin.com/company/zaza-technologies",
      icon: Linkedin,
    },
    {
      name: "Twitter",
      href: "https://twitter.com/ZazaTech",
      icon: Twitter,
    },
  ]

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 transition-colors">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content - 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {/* Column 1 - Zaza Branding */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <img src="/assets/zaza-logo.png" alt="Zaza Technologies Logo" className="h-8 w-8" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Zaza Technologies</h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Empowering teachers through emotionally intelligent AI.
            </p>
            <Button
              asChild
              className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold px-6 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
            >
              <a href="/products">Explore Zaza</a>
            </Button>
          </div>

          {/* Column 2 - Support */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Support</h4>
            <ul className="space-y-3">
              {supportLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300 text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Trust & Security */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Trust & Security</h4>
            <ul className="space-y-3">
              {trustItems.map((item) => {
                const IconComponent = item.icon
                return (
                  <li key={item.name} className="flex items-center gap-3">
                    <IconComponent className={`h-4 w-4 ${item.color}`} />
                    <span className="text-gray-600 dark:text-gray-400 text-sm">{item.name}</span>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Column 4 - Zaza Ecosystem */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Zaza Ecosystem</h4>
            <ul className="space-y-3">
              {ecosystemLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300 text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Media Section */}
        <div className="text-center mb-8">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4 tracking-wider">FOLLOW US</p>
          <div className="flex items-center justify-center space-x-8">
            {socialLinks.map((social) => {
              const IconComponent = social.icon
              return (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300"
                  aria-label={`Follow us on ${social.name}`}
                >
                  <IconComponent />
                </a>
              )
            })}
          </div>
        </div>

        {/* Bottom Line */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center space-y-4 lg:space-y-0">
            <p className="text-xs text-gray-500 dark:text-gray-400 text-center lg:text-left">
              © 2025 Zaza Technologies UG (haftungsbeschränkt). All rights reserved.
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 text-center lg:text-right">
              Made with 💙 by teachers, for learners. · Trusted by educators worldwide.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
