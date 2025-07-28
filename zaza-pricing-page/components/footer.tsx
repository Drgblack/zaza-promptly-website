import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Heart, Shield, Lock } from "lucide-react"

const footerNavigation = {
  support: [
    { name: "Contact Us", href: "mailto:hello@zazatechnologies.com" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Use", href: "/terms" },
  ],
  trustSecurity: [
    { name: "GDPR Compliant", icon: Shield },
    { name: "FERPA Safe", icon: Lock },
    { name: "Built by Educators", icon: Heart },
  ],
  ecosystem: [
    { name: "Zaza Teach", href: "https://zazateach.com", external: true },
    { name: "Zaza Promptly", href: "/", current: true },
    { name: "Zaza Inbox", href: "https://zazainbox.com", external: true },
    { name: "Zaza Visuals", href: "https://zazavisuals.com", external: true },
    { name: "Zaza ClarityDeck", href: "https://zazaclaritydeck.com", external: true },
    { name: "Zaza Schwoop", href: "https://zazaschwoop.com", external: true },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-[#0B0B2B] text-white">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12">
        {/* Main footer content */}
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Column 1 - Logo & Brand Summary */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <Image
                src="/images/zaza-logo.png"
                alt="Zaza Promptly logo"
                width={40}
                height={40}
                className="h-10 w-10"
              />
              <span className="text-xl font-bold text-white">Zaza Promptly</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              The AI feedback assistant that helps teachers write smarter, faster comments.
            </p>
            <Button
              asChild
              className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white font-medium px-6 py-2 rounded-lg shadow-lg transition-all duration-200"
            >
              <Link href="/signup">Start Free</Link>
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
                    className="text-gray-300 hover:text-violet-300 transition-colors duration-200 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-[#0B0B2B] rounded-sm"
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
                    <IconComponent className="h-4 w-4 text-violet-400" />
                    <span className="text-gray-300 text-sm">{item.name}</span>
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
                  {item.current ? (
                    <span className="text-violet-300 font-medium text-sm">{item.name}</span>
                  ) : item.external ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-300 hover:text-violet-300 transition-colors duration-200 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-[#0B0B2B] rounded-sm"
                    >
                      {item.name}
                    </a>
                  ) : (
                    <Link
                      href={item.href}
                      className="text-gray-300 hover:text-violet-300 transition-colors duration-200 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-[#0B0B2B] rounded-sm"
                    >
                      {item.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-gray-700">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 text-center lg:text-left">
            <div className="text-sm text-gray-400">
              © 2025 Zaza Technologies UG (haftungsbeschränkt). All rights reserved.
            </div>
            <div className="text-sm text-gray-300 flex items-center justify-center gap-1">
              Made with <Heart className="h-4 w-4 text-blue-500 fill-current" aria-hidden="true" />
              by teachers, for learners.
            </div>
            <div className="flex items-center justify-center lg:justify-end gap-2 text-sm text-gray-300">
              <div className="w-2 h-2 bg-violet-500 rounded-full"></div>
              <span>Trusted by teachers worldwide</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
