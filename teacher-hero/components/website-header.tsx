"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  ChevronDown,
  Menu,
  X,
  Sun,
  Moon,
  ExternalLink,
  BookOpen,
  Lightbulb,
  FileText,
  HelpCircle,
  Shield,
  Target,
  Heart,
  Mail,
  Zap,
  Eye,
  UserCheck,
  Presentation,
  Sparkles,
} from "lucide-react"
import { useTheme } from "next-themes"

interface NavigationItem {
  label: string
  href: string
  icon?: React.ComponentType<{ className?: string }>
  external?: boolean
  disabled?: boolean
}

interface DropdownSection {
  label: string
  items: NavigationItem[]
}

const navigationData: Record<string, DropdownSection> = {
  "Our Solutions": {
    label: "Our Solutions",
    items: [
      {
        label: "Zaza Promptly",
        href: "https://zazapromptly.com",
        icon: Lightbulb,
        external: true,
      },
      {
        label: "Zaza Teach",
        href: "https://zazateach.com",
        icon: BookOpen,
        external: true,
      },
      {
        label: "Zaza Study",
        href: "#",
        icon: FileText,
        disabled: true,
      },
      {
        label: "Zaza Visuals",
        href: "#",
        icon: Eye,
        disabled: true,
      },
      {
        label: "Zaza Coach",
        href: "#",
        icon: UserCheck,
        disabled: true,
      },
      {
        label: "Zaza ClarityDeck",
        href: "https://zazaclaritydeck.com",
        icon: Presentation,
        external: true,
      },
      {
        label: "Zaza Schwoop",
        href: "https://zazaschwoop.com",
        icon: Zap,
        external: true,
      },
      {
        label: "Zaza HR Spark",
        href: "#",
        icon: Sparkles,
        disabled: true,
      },
    ],
  },
  "Learning Centre": {
    label: "Learning Centre",
    items: [
      {
        label: "Blog",
        href: "/blog",
        icon: FileText,
      },
      {
        label: "Free Resources",
        href: "/free-resources",
        icon: BookOpen,
      },
      {
        label: "FAQs",
        href: "/faq",
        icon: HelpCircle,
      },
      {
        label: "Privacy & Data Policy",
        href: "/privacy",
        icon: Shield,
      },
    ],
  },
  "About Us": {
    label: "About Us",
    items: [
      {
        label: "Vision & Mission",
        href: "/vision",
        icon: Target,
      },
      {
        label: "Zaza Story",
        href: "/story",
        icon: Heart,
      },
      {
        label: "Contact",
        href: "/contact",
        icon: Mail,
      },
    ],
  },
}

export default function WebsiteHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()
  const dropdownRef = useRef<HTMLDivElement>(null)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const isActiveLink = (href: string) => {
    if (href === "/") return pathname === "/"
    return pathname.startsWith(href)
  }

  const toggleDropdown = (label: string) => {
    setActiveDropdown(activeDropdown === label ? null : label)
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:border-gray-800 dark:bg-gray-950/95 dark:supports-[backdrop-filter]:bg-gray-950/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Left Section - Logo */}
          <div className="flex-shrink-0">
            <Link
              href="https://zazatechnologies.com"
              className="flex items-center space-x-3 transition-opacity hover:opacity-80"
              aria-label="Zaza Technologies homepage"
            >
              <img
                src="/images/z-logo.png"
                alt="Zaza Technologies Logo"
                className="h-8 w-8 rounded-lg"
                width={32}
                height={32}
              />
              <span className="text-xl font-bold text-gray-900 dark:text-white">Zaza Technologies</span>
            </Link>
          </div>

          {/* Center Navigation - Desktop */}
          <nav className="hidden lg:block" aria-label="Main navigation">
            <div className="flex items-center space-x-1" ref={dropdownRef}>
              {Object.entries(navigationData).map(([key, section]) => (
                <div key={key} className="relative">
                  <Button
                    variant="ghost"
                    className="px-4 py-2 text-sm font-medium text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
                    onClick={() => toggleDropdown(key)}
                    aria-expanded={activeDropdown === key}
                    aria-haspopup="true"
                  >
                    {section.label}
                    <ChevronDown
                      className={`ml-1 h-4 w-4 transition-transform duration-200 ${
                        activeDropdown === key ? "rotate-180" : ""
                      }`}
                    />
                  </Button>

                  {/* Dropdown Menu */}
                  {activeDropdown === key && (
                    <div className="absolute left-0 mt-2 w-64 animate-in fade-in-0 zoom-in-95 slide-in-from-top-2 duration-200">
                      <div className="rounded-lg border border-gray-200 bg-white p-2 shadow-lg ring-1 ring-black/5 dark:border-gray-700 dark:bg-gray-800">
                        <div className="space-y-1" role="menu">
                          {section.items.map((item) => (
                            <Link
                              key={item.href}
                              href={item.disabled ? "#" : item.href}
                              target={item.external ? "_blank" : undefined}
                              rel={item.external ? "noopener noreferrer" : undefined}
                              className={`flex items-center rounded-md px-3 py-2 text-sm transition-colors duration-150 ${
                                item.disabled
                                  ? "cursor-not-allowed text-gray-400 dark:text-gray-600"
                                  : isActiveLink(item.href)
                                    ? "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400"
                                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
                              }`}
                              role="menuitem"
                              onClick={() => !item.disabled && setActiveDropdown(null)}
                            >
                              {item.icon && <item.icon className="mr-3 h-4 w-4 flex-shrink-0" />}
                              <span className="flex-1">{item.label}</span>
                              {item.external && !item.disabled && <ExternalLink className="ml-2 h-3 w-3 opacity-50" />}
                              {item.disabled && <span className="ml-2 text-xs text-gray-400">Soon</span>}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </nav>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Dark Mode Toggle */}
            {mounted && (
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="h-9 w-9 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
                aria-label="Toggle dark mode"
              >
                {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
            )}

            {/* CTA Buttons - Desktop */}
            <div className="hidden md:flex items-center space-x-3">
              <Button
                asChild
                variant="outline"
                className="border-blue-200 text-blue-700 hover:bg-blue-50 dark:border-blue-800 dark:text-blue-400 dark:hover:bg-blue-900/20 bg-transparent"
              >
                <Link href="https://zazateach.com" target="_blank" rel="noopener noreferrer">
                  Try Zaza Teach
                  <ExternalLink className="ml-2 h-3 w-3" />
                </Link>
              </Button>
              <Button
                asChild
                className="bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700"
              >
                <Link href="/waitlist">Join Waitlist</Link>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden animate-in slide-in-from-top-2 duration-200">
            <div className="border-t border-gray-200 bg-white px-2 pb-3 pt-2 dark:border-gray-700 dark:bg-gray-950">
              <div className="space-y-1">
                {Object.entries(navigationData).map(([key, section]) => (
                  <div key={key}>
                    <Button
                      variant="ghost"
                      className="w-full justify-start px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
                      onClick={() => toggleDropdown(key)}
                    >
                      {section.label}
                      <ChevronDown
                        className={`ml-auto h-4 w-4 transition-transform duration-200 ${
                          activeDropdown === key ? "rotate-180" : ""
                        }`}
                      />
                    </Button>

                    {activeDropdown === key && (
                      <div className="ml-4 space-y-1 animate-in slide-in-from-top-1 duration-150">
                        {section.items.map((item) => (
                          <Link
                            key={item.href}
                            href={item.disabled ? "#" : item.href}
                            target={item.external ? "_blank" : undefined}
                            rel={item.external ? "noopener noreferrer" : undefined}
                            className={`flex items-center rounded-md px-3 py-2 text-sm transition-colors duration-150 ${
                              item.disabled
                                ? "cursor-not-allowed text-gray-400 dark:text-gray-600"
                                : isActiveLink(item.href)
                                  ? "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400"
                                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
                            }`}
                            onClick={() => !item.disabled && setIsMobileMenuOpen(false)}
                          >
                            {item.icon && <item.icon className="mr-3 h-4 w-4 flex-shrink-0" />}
                            <span className="flex-1">{item.label}</span>
                            {item.external && !item.disabled && <ExternalLink className="ml-2 h-3 w-3 opacity-50" />}
                            {item.disabled && <span className="ml-2 text-xs text-gray-400">Soon</span>}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Mobile CTA Buttons */}
              <div className="mt-6 space-y-3 border-t border-gray-200 pt-4 dark:border-gray-700">
                <Button
                  asChild
                  variant="outline"
                  className="w-full border-blue-200 text-blue-700 hover:bg-blue-50 dark:border-blue-800 dark:text-blue-400 dark:hover:bg-blue-900/20 bg-transparent"
                >
                  <Link href="https://zazateach.com" target="_blank" rel="noopener noreferrer">
                    Try Zaza Teach
                    <ExternalLink className="ml-2 h-3 w-3" />
                  </Link>
                </Button>
                <Button
                  asChild
                  className="w-full bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700"
                >
                  <Link href="/waitlist">Join Waitlist</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
