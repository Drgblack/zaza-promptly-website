"use client"

import type React from "react"

import Link from "next/link"
import { Moon, Sun, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useRef, useEffect } from "react"
import { useTheme } from "@/hooks/use-theme"

export function Header() {
  const { theme, toggleTheme } = useTheme()
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleMouseEnter = (dropdown: string) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current)
    }
    setActiveDropdown(dropdown)
  }

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null)
    }, 150)
  }

  const handleKeyDown = (e: React.KeyboardEvent, dropdown: string) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      setActiveDropdown(activeDropdown === dropdown ? null : dropdown)
    } else if (e.key === "Escape") {
      setActiveDropdown(null)
    }
  }

  useEffect(() => {
    return () => {
      if (dropdownTimeoutRef.current) {
        clearTimeout(dropdownTimeoutRef.current)
      }
    }
  }, [])

  return (
    <header className="sticky top-0 z-50 w-full border-b border-orange-100 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side - Logo */}
          <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm"
              style={{ background: "linear-gradient(135deg, #f97316, #ea580c)" }}
            >
              Z
            </div>
            <span className="text-xl font-bold text-slate-900 dark:text-gray-100 transition-colors duration-300">
              Zaza <span style={{ color: "#f97316" }}>Inbox</span>
            </span>
          </Link>

          {/* Center - Navigation (hidden on mobile) */}
          <nav className="hidden lg:flex items-center space-x-8">
            {/* Our Solutions Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter("solutions")}
              onMouseLeave={handleMouseLeave}
            >
              <button
                className="flex items-center space-x-1 text-sm font-medium text-slate-700 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 transition-colors duration-300 focus:outline-none focus:text-orange-500"
                onKeyDown={(e) => handleKeyDown(e, "solutions")}
                aria-expanded={activeDropdown === "solutions"}
                aria-haspopup="true"
              >
                <span>Our Solutions</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-300 ${activeDropdown === "solutions" ? "rotate-180" : ""}`}
                />
              </button>

              {activeDropdown === "solutions" && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-orange-100 dark:border-gray-600 py-2 z-50 transition-colors duration-300">
                  <Link
                    href="/zaza-promptly-site"
                    className="flex items-center px-4 py-3 text-sm text-slate-700 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-gray-700 hover:text-orange-600 dark:hover:text-orange-400 transition-colors duration-300"
                  >
                    Zaza Promptly
                  </Link>
                  <Link
                    href="/zaza-teach-website"
                    className="flex items-center px-4 py-3 text-sm text-slate-700 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-gray-700 hover:text-orange-600 dark:hover:text-orange-400 transition-colors duration-300"
                  >
                    Zaza Teach
                  </Link>
                  <Link
                    href="/zaza-study-landing"
                    className="flex items-center justify-between px-4 py-3 text-sm text-slate-700 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-gray-700 hover:text-orange-600 dark:hover:text-orange-400 transition-colors duration-300"
                  >
                    <span>Zaza Study</span>
                    <span className="bg-purple-200 dark:bg-purple-800 text-purple-800 dark:text-purple-200 text-xs rounded-full px-2 py-1 ml-2 transition-colors duration-300">
                      Coming Soon
                    </span>
                  </Link>
                  <Link
                    href="/zaza-visuals-landing (1)"
                    className="flex items-center justify-between px-4 py-3 text-sm text-slate-700 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-gray-700 hover:text-orange-600 dark:hover:text-orange-400 transition-colors duration-300"
                  >
                    <span>Zaza Visuals</span>
                    <span className="bg-purple-200 dark:bg-purple-800 text-purple-800 dark:text-purple-200 text-xs rounded-full px-2 py-1 ml-2 transition-colors duration-300">
                      Coming Soon
                    </span>
                  </Link>
                  <Link
                    href="/zaza-coach"
                    className="flex items-center justify-between px-4 py-3 text-sm text-slate-700 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-gray-700 hover:text-orange-600 dark:hover:text-orange-400 transition-colors duration-300"
                  >
                    <span>Zaza Coach</span>
                    <span className="bg-purple-200 dark:bg-purple-800 text-purple-800 dark:text-purple-200 text-xs rounded-full px-2 py-1 ml-2 transition-colors duration-300">
                      Coming Soon
                    </span>
                  </Link>
                  <Link
                    href="/claritydeck-landing"
                    className="flex items-center justify-between px-4 py-3 text-sm text-slate-700 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-gray-700 hover:text-orange-600 dark:hover:text-orange-400 transition-colors duration-300"
                  >
                    <span>Zaza ClarityDeck</span>
                    <span className="bg-purple-200 dark:bg-purple-800 text-purple-800 dark:text-purple-200 text-xs rounded-full px-2 py-1 ml-2 transition-colors duration-300">
                      Coming Soon
                    </span>
                  </Link>
                  <Link
                    href="/zaza-schwoop"
                    className="flex items-center justify-between px-4 py-3 text-sm text-slate-700 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-gray-700 hover:text-orange-600 dark:hover:text-orange-400 transition-colors duration-300"
                  >
                    <span>Zaza Schwoop</span>
                    <span className="bg-purple-200 dark:bg-purple-800 text-purple-800 dark:text-purple-200 text-xs rounded-full px-2 py-1 ml-2 transition-colors duration-300">
                      Coming Soon
                    </span>
                  </Link>
                  <Link
                    href="/zaza-hr-spark"
                    className="flex items-center justify-between px-4 py-3 text-sm text-slate-700 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-gray-700 hover:text-orange-600 dark:hover:text-orange-400 transition-colors duration-300"
                  >
                    <span>Zaza HR Spark</span>
                    <span className="bg-purple-200 dark:bg-purple-800 text-purple-800 dark:text-purple-200 text-xs rounded-full px-2 py-1 ml-2 transition-colors duration-300">
                      Coming Soon
                    </span>
                  </Link>
                  <div className="border-t border-orange-100 dark:border-gray-600 mt-2 pt-2 transition-colors duration-300">
                    <Link
                      href="/products"
                      className="flex items-center px-4 py-3 text-sm font-medium text-orange-600 dark:text-orange-400 hover:bg-orange-50 dark:hover:bg-gray-700 transition-colors duration-300"
                    >
                      See All Products
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Learning Centre Dropdown */}
            <div className="relative" onMouseEnter={() => handleMouseEnter("learning")} onMouseLeave={handleMouseLeave}>
              <button
                className="flex items-center space-x-1 text-sm font-medium text-slate-700 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 transition-colors duration-300 focus:outline-none focus:text-orange-500"
                onKeyDown={(e) => handleKeyDown(e, "learning")}
                aria-expanded={activeDropdown === "learning"}
                aria-haspopup="true"
              >
                <span>Learning Centre</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-300 ${activeDropdown === "learning" ? "rotate-180" : ""}`}
                />
              </button>

              {activeDropdown === "learning" && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-orange-100 dark:border-gray-600 py-2 z-50 transition-colors duration-300">
                  <Link
                    href="/blog"
                    className="flex items-center px-4 py-3 text-sm text-slate-700 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-gray-700 hover:text-orange-600 dark:hover:text-orange-400 transition-colors duration-300"
                  >
                    Blog
                  </Link>
                  <Link
                    href="/resources"
                    className="flex items-center px-4 py-3 text-sm text-slate-700 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-gray-700 hover:text-orange-600 dark:hover:text-orange-400 transition-colors duration-300"
                  >
                    Free Resources
                  </Link>
                  <Link
                    href="/faq"
                    className="flex items-center px-4 py-3 text-sm text-slate-700 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-gray-700 hover:text-orange-600 dark:hover:text-orange-400 transition-colors duration-300"
                  >
                    FAQs
                  </Link>
                  <Link
                    href="/privacy"
                    className="flex items-center px-4 py-3 text-sm text-slate-700 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-gray-700 hover:text-orange-600 dark:hover:text-orange-400 transition-colors duration-300"
                  >
                    Privacy & Data Policy
                  </Link>
                </div>
              )}
            </div>

            {/* Regular Navigation Items */}
            <Link
              href="/about"
              className="text-sm font-medium text-slate-700 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 transition-colors duration-300"
            >
              About Us
            </Link>
            <Link
              href="/contact"
              className="text-sm font-medium text-slate-700 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 transition-colors duration-300"
            >
              Contact
            </Link>
            <Link
              href="/vision"
              className="text-sm font-medium text-slate-700 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 transition-colors duration-300"
            >
              Vision & Mission
            </Link>
          </nav>

          {/* Right side - Dark mode toggle and buttons */}
          <div className="flex items-center space-x-3">
            {/* Dark mode toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-md text-slate-700 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 hover:bg-orange-50 dark:hover:bg-gray-700 transition-colors duration-300"
              aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            >
              {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>

            {/* Desktop buttons */}
            <div className="hidden md:flex items-center space-x-2">
              <Link href="/zaza-teach-website">
                <Button
                  size="sm"
                  className="text-white font-medium px-3 py-2 rounded-md shadow-sm hover:shadow-md transition-all duration-200"
                  style={{ background: "linear-gradient(135deg, #ec4899, #8b5cf6)" }}
                >
                  Try Zaza Teach
                </Button>
              </Link>
              <Link href="/zaza-promptly-site">
                <Button
                  size="sm"
                  className="text-white font-medium px-3 py-2 rounded-md shadow-sm hover:shadow-md transition-all duration-200"
                  style={{ background: "linear-gradient(135deg, #ec4899, #8b5cf6)" }}
                >
                  Try Zaza Promptly
                </Button>
              </Link>
              <Link href="/waitlist">
                <Button
                  size="sm"
                  className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-4 py-2 rounded-md shadow-sm hover:shadow-md transition-all duration-200"
                >
                  Join Waitlist
                </Button>
              </Link>
            </div>

            {/* Mobile hamburger and Join Waitlist */}
            <div className="lg:hidden flex items-center space-x-2">
              <Link href="/waitlist">
                <Button
                  size="sm"
                  className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-3 py-2 rounded-md shadow-sm hover:shadow-md transition-all duration-200"
                >
                  Join Waitlist
                </Button>
              </Link>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-md text-slate-700 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 hover:bg-orange-50 dark:hover:bg-gray-700 transition-colors duration-300"
                aria-label="Toggle mobile menu"
              >
                <div className="w-5 h-5 flex flex-col justify-center space-y-1">
                  <div
                    className={`w-full h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? "rotate-45 translate-y-1.5" : ""}`}
                  ></div>
                  <div
                    className={`w-full h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? "opacity-0" : ""}`}
                  ></div>
                  <div
                    className={`w-full h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""}`}
                  ></div>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={`lg:hidden border-t border-orange-100 dark:border-gray-700 transition-colors duration-300 ${isMobileMenuOpen ? "block" : "hidden"}`}
        >
          <nav className="py-4 space-y-4">
            {/* Mobile Our Solutions */}
            <div>
              <button
                onClick={() => setActiveDropdown(activeDropdown === "mobile-solutions" ? null : "mobile-solutions")}
                className="flex items-center justify-between w-full text-left text-sm font-medium text-slate-700 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 transition-colors duration-300 py-2"
              >
                <span>Our Solutions</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-300 ${activeDropdown === "mobile-solutions" ? "rotate-180" : ""}`}
                />
              </button>
              {activeDropdown === "mobile-solutions" && (
                <div className="pl-4 mt-2 space-y-2">
                  <Link
                    href="/zaza-promptly-site"
                    className="block text-sm text-slate-600 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400 transition-colors duration-300 py-1"
                  >
                    Zaza Promptly
                  </Link>
                  <Link
                    href="/zaza-teach-website"
                    className="block text-sm text-slate-600 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400 transition-colors duration-300 py-1"
                  >
                    Zaza Teach
                  </Link>
                  <Link
                    href="/zaza-study-landing"
                    className="flex items-center justify-between text-sm text-slate-600 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400 transition-colors duration-300 py-1"
                  >
                    <span>Zaza Study</span>
                    <span className="bg-purple-200 dark:bg-purple-800 text-purple-800 dark:text-purple-200 text-xs rounded-full px-2 py-1 ml-2 transition-colors duration-300">
                      Coming Soon
                    </span>
                  </Link>
                  <Link
                    href="/zaza-visuals-landing (1)"
                    className="flex items-center justify-between text-sm text-slate-600 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400 transition-colors duration-300 py-1"
                  >
                    <span>Zaza Visuals</span>
                    <span className="bg-purple-200 dark:bg-purple-800 text-purple-800 dark:text-purple-200 text-xs rounded-full px-2 py-1 ml-2 transition-colors duration-300">
                      Coming Soon
                    </span>
                  </Link>
                  <Link
                    href="/zaza-coach"
                    className="flex items-center justify-between text-sm text-slate-600 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400 transition-colors duration-300 py-1"
                  >
                    <span>Zaza Coach</span>
                    <span className="bg-purple-200 dark:bg-purple-800 text-purple-800 dark:text-purple-200 text-xs rounded-full px-2 py-1 ml-2 transition-colors duration-300">
                      Coming Soon
                    </span>
                  </Link>
                  <Link
                    href="/claritydeck-landing"
                    className="flex items-center justify-between text-sm text-slate-600 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400 transition-colors duration-300 py-1"
                  >
                    <span>Zaza ClarityDeck</span>
                    <span className="bg-purple-200 dark:bg-purple-800 text-purple-800 dark:text-purple-200 text-xs rounded-full px-2 py-1 ml-2 transition-colors duration-300">
                      Coming Soon
                    </span>
                  </Link>
                  <Link
                    href="/zaza-schwoop"
                    className="flex items-center justify-between text-sm text-slate-600 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400 transition-colors duration-300 py-1"
                  >
                    <span>Zaza Schwoop</span>
                    <span className="bg-purple-200 dark:bg-purple-800 text-purple-800 dark:text-purple-200 text-xs rounded-full px-2 py-1 ml-2 transition-colors duration-300">
                      Coming Soon
                    </span>
                  </Link>
                  <Link
                    href="/zaza-hr-spark"
                    className="flex items-center justify-between text-sm text-slate-600 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400 transition-colors duration-300 py-1"
                  >
                    <span>Zaza HR Spark</span>
                    <span className="bg-purple-200 dark:bg-purple-800 text-purple-800 dark:text-purple-200 text-xs rounded-full px-2 py-1 ml-2 transition-colors duration-300">
                      Coming Soon
                    </span>
                  </Link>
                  <Link
                    href="/products"
                    className="block text-sm font-medium text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 transition-colors duration-300 py-1 border-t border-orange-100 dark:border-gray-600 pt-2 mt-2"
                  >
                    See All Products
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Learning Centre */}
            <div>
              <button
                onClick={() => setActiveDropdown(activeDropdown === "mobile-learning" ? null : "mobile-learning")}
                className="flex items-center justify-between w-full text-left text-sm font-medium text-slate-700 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 transition-colors duration-300 py-2"
              >
                <span>Learning Centre</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-300 ${activeDropdown === "mobile-learning" ? "rotate-180" : ""}`}
                />
              </button>
              {activeDropdown === "mobile-learning" && (
                <div className="pl-4 mt-2 space-y-2">
                  <Link
                    href="/blog"
                    className="block text-sm text-slate-600 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400 transition-colors duration-300 py-1"
                  >
                    Blog
                  </Link>
                  <Link
                    href="/resources"
                    className="block text-sm text-slate-600 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400 transition-colors duration-300 py-1"
                  >
                    Free Resources
                  </Link>
                  <Link
                    href="/faq"
                    className="block text-sm text-slate-600 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400 transition-colors duration-300 py-1"
                  >
                    FAQs
                  </Link>
                  <Link
                    href="/privacy"
                    className="block text-sm text-slate-600 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400 transition-colors duration-300 py-1"
                  >
                    Privacy & Data Policy
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Regular Navigation */}
            <Link
              href="/about"
              className="block text-sm font-medium text-slate-700 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 transition-colors duration-300 py-2"
            >
              About Us
            </Link>
            <Link
              href="/contact"
              className="block text-sm font-medium text-slate-700 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 transition-colors duration-300 py-2"
            >
              Contact
            </Link>
            <Link
              href="/vision"
              className="block text-sm font-medium text-slate-700 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 transition-colors duration-300 py-2"
            >
              Vision & Mission
            </Link>

            {/* Mobile Action Buttons */}
            <div className="flex flex-col space-y-2 pt-4 border-t border-orange-100 dark:border-gray-600 transition-colors duration-300">
              <Link href="/zaza-teach-website">
                <Button
                  size="sm"
                  className="w-full text-white font-medium py-2 rounded-md shadow-sm hover:shadow-md transition-all duration-200"
                  style={{ background: "linear-gradient(135deg, #ec4899, #8b5cf6)" }}
                >
                  Try Zaza Teach
                </Button>
              </Link>
              <Link href="/zaza-promptly-site">
                <Button
                  size="sm"
                  className="w-full text-white font-medium py-2 rounded-md shadow-sm hover:shadow-md transition-all duration-200"
                  style={{ background: "linear-gradient(135deg, #ec4899, #8b5cf6)" }}
                >
                  Try Zaza Promptly
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}
