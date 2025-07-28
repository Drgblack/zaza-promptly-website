"use client"

import type React from "react"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"

interface FooterProps {
  currentProduct?: string
}

export function Footer({ currentProduct }: FooterProps) {
  const pathname = usePathname()

  const ecosystemLinks = [
    { name: "Zaza Promptly", href: "https://zazapromptly.com", key: "promptly", external: true },
    { name: "Zaza Teach", href: "https://zazateach.com", key: "teach", external: true },
    { name: "Zaza Inbox", href: "https://zazainbox.com", key: "inbox", external: true },
    { name: "Zaza Visuals", href: "https://zazavisuals.com", key: "visuals", external: true },
    { name: "Zaza ClarityDeck", href: "https://zazaclaritydeck.com", key: "claritydeck", external: true },
    { name: "Zaza Schwoop", href: "https://zazaschwoop.com", key: "schwoop", external: true },
  ]

  const supportLinks = [
    { name: "Contact Us", href: "/contact" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Use", href: "/terms" },
  ]

  const socialLinks = [
    { name: "TikTok", href: "https://www.tiktok.com/@zazateach", icon: "tiktok" },
    { name: "LinkedIn", href: "https://www.linkedin.com/company/zazatechnologies", icon: "linkedin" },
    { name: "X (Twitter)", href: "https://twitter.com/zazateach", icon: "twitter" },
  ]

  const isCurrentProduct = (key: string) => {
    if (currentProduct) return currentProduct === key
    return pathname?.includes(key.toLowerCase())
  }

  const LinkComponent = ({
    href,
    external,
    children,
    className,
  }: {
    href: string
    external?: boolean
    children: React.ReactNode
    className?: string
  }) => {
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
          {children}
        </a>
      )
    }
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    )
  }

  return (
    <footer className="bg-[#0a0a23] text-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
          {/* Column 1 - Zaza Branding */}
          <div className="lg:pr-8">
            <div className="flex items-center space-x-3 mb-6">
              <Image src="/zaza-logo.png" alt="Zaza Technologies" width={40} height={40} className="rounded-lg" />
              <span className="text-xl font-bold text-white">Zaza Technologies</span>
            </div>
            <p className="text-gray-300 leading-relaxed mb-8 text-sm">
              Empowering education and productivity through innovative AI solutions.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium rounded-lg transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Explore Zaza
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {/* Column 2 - Support */}
          <div>
            <h3 className="text-white font-semibold mb-8 text-sm uppercase tracking-wider">Support</h3>
            <ul className="space-y-5">
              {supportLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200 text-sm hover:translate-x-1 inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Trust & Security */}
          <div>
            <h3 className="text-white font-semibold mb-8 text-sm uppercase tracking-wider">Trust & Security</h3>
            <ul className="space-y-5">
              <li className="flex items-center space-x-3">
                <div className="flex items-center justify-center w-5 h-5 bg-purple-600/20 rounded-full">
                  <svg className="w-3 h-3 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span className="text-gray-300 text-sm">GDPR Compliant</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="flex items-center justify-center w-5 h-5 bg-pink-600/20 rounded-full">
                  <svg className="w-3 h-3 text-pink-400" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span className="text-gray-300 text-sm">FERPA Safe</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="flex items-center justify-center w-5 h-5 bg-purple-600/20 rounded-full">
                  <svg className="w-3 h-3 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span className="text-gray-300 text-sm">Built by Educators</span>
              </li>
            </ul>
          </div>

          {/* Column 4 - Zaza Ecosystem */}
          <div>
            <h3 className="text-white font-semibold mb-8 text-sm uppercase tracking-wider">Zaza Ecosystem</h3>
            <ul className="space-y-5">
              {ecosystemLinks.map((link) => (
                <li key={link.key}>
                  <LinkComponent
                    href={link.href}
                    external={link.external}
                    className={`text-sm transition-all duration-200 hover:translate-x-1 inline-flex items-center space-x-1 ${
                      isCurrentProduct(link.key) ? "text-purple-300 font-medium" : "text-gray-300 hover:text-white"
                    }`}
                  >
                    <span>{link.name}</span>
                    {link.external && (
                      <svg className="w-3 h-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    )}
                  </LinkComponent>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Media Section */}
        <div className="mt-16 pt-12 border-t border-gray-700">
          <div className="text-center mb-12">
            <h3 className="text-white font-semibold mb-6 text-sm uppercase tracking-wider">Follow Us</h3>
            <div className="flex justify-center space-x-8">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-purple-400 transition-all duration-200 hover:scale-110"
                  aria-label={`Follow us on ${social.name}`}
                >
                  {social.icon === "tiktok" && (
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                    </svg>
                  )}
                  {social.icon === "linkedin" && (
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  )}
                  {social.icon === "twitter" && (
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  )}
                </a>
              ))}
            </div>
          </div>

          {/* Bottom Legal Section */}
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center text-center lg:text-left space-y-4 lg:space-y-0">
            <p className="text-gray-400 text-sm">© 2025 Zaza Technologies. All rights reserved.</p>
            <p className="text-gray-400 text-sm">
              Empowering education and productivity through innovative AI solutions.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
