"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"

// Social media icons as SVG components for better performance
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
)

const LinkedInIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
)

const TwitterIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)

interface QuickLink {
  label: string
  href: string
}

const quickLinks: QuickLink[] = [
  { label: "Home", href: "/" },
  { label: "Our Solutions", href: "#" },
  { label: "Blog", href: "/blog" },
  { label: "Free Resources", href: "/free-resources" },
  { label: "FAQs", href: "/faq" },
  { label: "Privacy & Data Policy", href: "/privacy" },
  { label: "Contact", href: "/contact" },
]

interface SocialLink {
  label: string
  href: string
  icon: React.ComponentType<{ className?: string }>
}

const socialLinks: SocialLink[] = [
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@zazateach",
    icon: TikTokIcon,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/zazatechnologies",
    icon: LinkedInIcon,
  },
  {
    label: "Twitter",
    href: "https://twitter.com/zazateach",
    icon: TwitterIcon,
  },
]

export default function WebsiteFooter() {
  const pathname = usePathname()
  const currentYear = new Date().getFullYear()

  const isActiveLink = (href: string) => {
    if (href === "/") return pathname === "/"
    return pathname.startsWith(href)
  }

  return (
    <footer className="bg-gray-50 border-t border-gray-200 dark:bg-gray-900 dark:border-gray-800">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Left Column - Brand */}
          <div className="space-y-4">
            <Link
              href="https://zazatechnologies.com"
              className="flex items-center space-x-3 transition-opacity hover:opacity-80 group"
              aria-label="Zaza Technologies homepage"
            >
              <img
                src="/images/z-logo.png"
                alt="Zaza Technologies Logo"
                className="h-10 w-10 rounded-lg transition-transform duration-200 group-hover:scale-105"
                width={40}
                height={40}
              />
              <span className="text-2xl font-bold text-gray-900 dark:text-white">Zaza Technologies</span>
            </Link>

            <p className="text-lg text-gray-600 dark:text-gray-400 font-medium">Zaza helps teachers thrive.</p>

            <p className="text-sm text-gray-500 dark:text-gray-500">
              © {currentYear} Zaza Technologies. All rights reserved.
            </p>
          </div>

          {/* Middle Column - Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Quick Links</h3>
            <nav aria-label="Footer navigation">
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`text-sm transition-colors duration-200 hover:text-blue-600 dark:hover:text-blue-400 ${
                        isActiveLink(link.href)
                          ? "text-blue-600 dark:text-blue-400 font-medium"
                          : "text-gray-600 dark:text-gray-400"
                      } hover:translate-x-1 transform transition-transform duration-200 inline-block`}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Right Column - Social Media */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Follow Us</h3>
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const IconComponent = social.icon
                return (
                  <Link
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-blue-100 dark:hover:bg-blue-900/20 transition-all duration-200 hover:scale-110 hover:shadow-md"
                    aria-label={`Follow us on ${social.label}`}
                  >
                    <IconComponent className="h-5 w-5 text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200" />
                  </Link>
                )
              })}
            </div>

            {/* Additional social media info */}
            <p className="text-xs text-gray-500 dark:text-gray-500">
              Connect with us for the latest updates and educational insights.
            </p>
          </div>
        </div>

        {/* Bottom Border */}
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div className="flex flex-wrap gap-4 text-xs text-gray-500 dark:text-gray-500">
              <Link
                href="/terms"
                className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-200"
              >
                Terms of Service
              </Link>
              <Link
                href="/privacy"
                className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-200"
              >
                Privacy Policy
              </Link>
              <Link
                href="/cookies"
                className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-200"
              >
                Cookie Policy
              </Link>
            </div>

            <p className="text-xs text-gray-500 dark:text-gray-500">Made with ❤️ for educators worldwide</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
