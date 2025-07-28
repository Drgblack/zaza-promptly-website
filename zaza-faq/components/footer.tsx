"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Twitter, Linkedin, Shield, Lock, Heart } from "lucide-react"

// TikTok icon component since it's not in Lucide
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
)

interface FooterProps {
  currentPage?: string
}

export function Footer({ currentPage }: FooterProps) {
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    // Check system preference for dark mode
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    setIsDarkMode(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => {
      setIsDarkMode(e.matches)
    }

    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  const ecosystemLinks = [
    { name: "Zaza Teach", href: "https://zazateach.com", key: "zaza-teach", external: true },
    { name: "Zaza Promptly", href: "https://zazapromptly.com", key: "zaza-promptly", external: true },
    { name: "Zaza Inbox", href: "#", key: "zaza-inbox", external: false },
    { name: "Zaza Visuals", href: "#", key: "zaza-visuals", external: false },
    { name: "Zaza ClarityDeck", href: "#", key: "zaza-claritydeck", external: false },
    { name: "Zaza Schwoop", href: "#", key: "zaza-schwoop", external: false },
  ]

  const supportLinks = [
    { name: "Contact Us", href: "/contact", external: false },
    { name: "Privacy Policy", href: "/privacy", external: false },
    { name: "Terms of Use", href: "/terms", external: false },
  ]

  const trustItems = [
    {
      text: "GDPR Compliant",
      icon: Shield,
      iconColor: "text-purple-400",
      emoji: "✅",
    },
    {
      text: "FERPA Safe",
      icon: Lock,
      iconColor: "text-pink-400",
      emoji: "🔒",
    },
    {
      text: "Built by Educators",
      icon: Heart,
      iconColor: "text-purple-400",
      emoji: "💜",
    },
  ]

  const renderLink = (link: { name: string; href: string; external: boolean; key?: string }, className: string) => {
    const isActive = currentPage === link.key
    const finalClassName = `${className} ${
      isActive
        ? "text-purple-500 font-medium"
        : `${isDarkMode ? "text-slate-300 hover:text-purple-400" : "text-slate-600 hover:text-purple-600"}`
    }`

    if (link.external) {
      return (
        <a href={link.href} className={finalClassName} target="_blank" rel="noopener noreferrer">
          {link.name}
        </a>
      )
    }

    return (
      <Link href={link.href} className={finalClassName}>
        {link.name}
      </Link>
    )
  }

  return (
    <footer
      className={`${isDarkMode ? "bg-slate-900 text-slate-100" : "bg-slate-50 text-slate-800"} border-t ${isDarkMode ? "border-slate-700" : "border-slate-200"} mt-16 transition-colors duration-300`}
    >
      <div className="container mx-auto px-6 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Zaza Branding Column */}
          <div className="lg:col-span-1">
            <a href="https://zazatechnologies.com" className="flex items-center space-x-3 mb-4 group">
              <Image
                src="/images/z-logo.png"
                alt="Zaza Logo"
                width={40}
                height={40}
                className="rounded-lg group-hover:scale-105 transition-transform duration-200"
              />
              <div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                  Zaza Technologies
                </h3>
              </div>
            </a>
            <p className={`${isDarkMode ? "text-slate-300" : "text-slate-600"} text-sm mb-6 leading-relaxed`}>
              Empowering teachers through emotionally intelligent AI.
            </p>
            <Link
              href="/products"
              className="inline-block bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-lg hover:opacity-90 transition-opacity font-medium shadow-sm text-sm"
            >
              Explore Zaza
            </Link>
          </div>

          {/* Support Column */}
          <div>
            <h4
              className={`font-semibold ${isDarkMode ? "text-slate-200" : "text-slate-800"} mb-4 text-sm uppercase tracking-wide`}
            >
              Support
            </h4>
            <ul className="space-y-3 text-sm">
              {supportLinks.map((link) => (
                <li key={link.name}>{renderLink(link, "transition-colors hover:underline")}</li>
              ))}
            </ul>
          </div>

          {/* Trust & Security Column */}
          <div>
            <h4
              className={`font-semibold ${isDarkMode ? "text-slate-200" : "text-slate-800"} mb-4 text-sm uppercase tracking-wide`}
            >
              Trust & Security
            </h4>
            <ul className="space-y-3 text-sm">
              {trustItems.map((item, index) => {
                const IconComponent = item.icon
                return (
                  <li key={index} className="flex items-center space-x-2">
                    <IconComponent className={`h-4 w-4 ${item.iconColor}`} />
                    <span className={`${isDarkMode ? "text-slate-300" : "text-slate-600"}`}>{item.text}</span>
                    <span className="text-xs">{item.emoji}</span>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Zaza Ecosystem Column */}
          <div>
            <h4
              className={`font-semibold ${isDarkMode ? "text-slate-200" : "text-slate-800"} mb-4 text-sm uppercase tracking-wide`}
            >
              Zaza Ecosystem
            </h4>
            <ul className="space-y-3 text-sm">
              {ecosystemLinks.map((link) => (
                <li key={link.key}>{renderLink(link, "transition-colors hover:underline")}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Media Section */}
        <div className={`border-t ${isDarkMode ? "border-slate-700" : "border-slate-200"} mt-12 pt-8`}>
          <div className="text-center mb-8">
            <h4
              className={`font-semibold ${isDarkMode ? "text-slate-200" : "text-slate-800"} mb-4 text-sm uppercase tracking-wide`}
            >
              Follow Us
            </h4>
            <div className="flex justify-center space-x-6">
              <a
                href="#"
                className={`${isDarkMode ? "text-slate-400 hover:text-pink-400" : "text-slate-500 hover:text-pink-500"} transition-colors`}
                aria-label="Follow us on TikTok"
              >
                <TikTokIcon className="h-6 w-6" />
              </a>
              <a
                href="#"
                className={`${isDarkMode ? "text-slate-400 hover:text-purple-400" : "text-slate-500 hover:text-purple-500"} transition-colors`}
                aria-label="Follow us on LinkedIn"
              >
                <Linkedin className="h-6 w-6" />
              </a>
              <a
                href="#"
                className={`${isDarkMode ? "text-slate-400 hover:text-blue-400" : "text-slate-500 hover:text-blue-500"} transition-colors`}
                aria-label="Follow us on Twitter"
              >
                <Twitter className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Bottom Copyright Section */}
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            <p className={`${isDarkMode ? "text-slate-400" : "text-slate-500"} text-sm text-center lg:text-left`}>
              © 2025 Zaza Technologies UG (haftungsbeschränkt). All rights reserved.
            </p>
            <p
              className={`${isDarkMode ? "text-slate-400" : "text-slate-500"} text-sm text-center lg:text-right flex items-center space-x-1`}
            >
              <span>Made with</span>
              <span className="text-blue-500">💙</span>
              <span>by teachers, for learners.</span>
              <span className="hidden sm:inline">·</span>
              <span className="block sm:inline">Trusted by educators worldwide.</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
