"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Moon, Sun, Menu, X, ChevronDown } from "lucide-react"
import Link from "next/link"

export function ZazaVisualsHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Handle hydration and initial theme setup
  useEffect(() => {
    setMounted(true)

    // Check localStorage first, then system preference
    const savedTheme = localStorage.getItem("theme")
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

    const shouldBeDark = savedTheme === "dark" || (!savedTheme && systemPrefersDark)

    setIsDarkMode(shouldBeDark)

    if (shouldBeDark) {
      document.documentElement.classList.add("dark")
      document.documentElement.style.backgroundColor = "#121212"
    } else {
      document.documentElement.classList.remove("dark")
      document.documentElement.style.backgroundColor = ""
    }
  }, [])

  const navigationItems = [
    { name: "Our Solutions", href: "#", hasDropdown: true },
    { name: "Learning Centre", href: "#", hasDropdown: true },
    { name: "Why Zaza Visuals?", href: "#", hasDropdown: true },
    { name: "About Us", href: "#", hasDropdown: true },
  ]

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode
    setIsDarkMode(newDarkMode)

    // Save preference to localStorage
    localStorage.setItem("theme", newDarkMode ? "dark" : "light")

    // Apply theme to document
    if (newDarkMode) {
      document.documentElement.classList.add("dark")
      document.documentElement.style.backgroundColor = "#121212"
    } else {
      document.documentElement.classList.remove("dark")
      document.documentElement.style.backgroundColor = ""
    }
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  // Prevent hydration mismatch
  if (!mounted) {
    return null
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 dark:bg-[#121212]/90 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-700/50 shadow-sm transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 min-h-[64px]">
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <img
              src="/zaza-logo.png"
              alt="Zaza Logo"
              className="w-8 h-8 rounded-lg"
              onError={(e) => {
                e.currentTarget.style.display = "none"
              }}
            />
            <div className="text-xl font-bold">
              <span className="text-gray-900 dark:text-white transition-colors duration-300">Zaza </span>
              <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                Visuals
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <div key={item.name} className="relative group">
                <Link
                  href={item.href}
                  className="flex items-center gap-1 text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors duration-200 font-medium"
                >
                  {item.name}
                  {item.hasDropdown && (
                    <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform duration-200" />
                  )}
                </Link>
                {/* Dropdown menu */}
                {item.hasDropdown && (
                  <div className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-[#1e1e1e] rounded-lg shadow-lg border border-gray-200 dark:border-gray-600 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="p-2">
                      {item.name === "Our Solutions" && (
                        <>
                          <Link
                            href="/zaza-promptly-site"
                            className="block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
                          >
                            Zaza Promptly
                          </Link>
                          <Link
                            href="/zaza-teach-website"
                            className="block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
                          >
                            Zaza Teach
                          </Link>
                          <div className="px-3 py-2 text-sm text-gray-900 dark:text-white font-medium bg-pink-50 dark:bg-pink-900/30 rounded-md">
                            Zaza Visuals (current)
                          </div>
                          <div className="px-3 py-2 text-sm text-gray-500 dark:text-gray-400">
                            Zaza Coach (Coming Soon)
                          </div>
                          <div className="px-3 py-2 text-sm text-gray-500 dark:text-gray-400">
                            Zaza ClarityDeck (Coming Soon)
                          </div>
                          <div className="px-3 py-2 text-sm text-gray-500 dark:text-gray-400">
                            Zaza Schwoop (Coming Soon)
                          </div>
                          <Link
                            href="/zaza-hr-spark"
                            className="block px-3 py-2 text-sm text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
                          >
                            Zaza HR Spark (Coming Soon)
                          </Link>
                          <div className="border-t border-gray-200 dark:border-gray-600 mt-2 pt-2">
                            <Link
                              href="/products"
                              className="block px-3 py-2 text-sm font-medium text-pink-600 dark:text-pink-400 hover:bg-pink-50 dark:hover:bg-pink-900/20 rounded-md transition-colors"
                            >
                              See All Products →
                            </Link>
                          </div>
                        </>
                      )}

                      {item.name === "Learning Centre" && (
                        <>
                          <Link
                            href="/blog"
                            className="block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
                          >
                            Blog
                          </Link>
                          <Link
                            href="/resources"
                            className="block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
                          >
                            Free Resources
                          </Link>
                          <Link
                            href="/faq"
                            className="block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
                          >
                            FAQs
                          </Link>
                          <Link
                            href="/privacy"
                            className="block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
                          >
                            Privacy & Data Policy
                          </Link>
                        </>
                      )}

                      {item.name === "Why Zaza Visuals?" && (
                        <>
                          <Link
                            href="/benefits"
                            className="block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
                          >
                            How Zaza Visuals Helps Teachers
                          </Link>
                          <Link
                            href="/community"
                            className="block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
                          >
                            Built for Sharing & Visibility
                          </Link>
                          <Link
                            href="/about-the-founder"
                            className="block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
                          >
                            Created by Educators
                          </Link>
                        </>
                      )}

                      {item.name === "About Us" && (
                        <>
                          <Link
                            href="/about"
                            className="block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
                          >
                            About Zaza Technologies
                          </Link>
                          <Link
                            href="/how-it-works"
                            className="block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
                          >
                            How it Works
                          </Link>
                          <Link
                            href="/mission"
                            className="block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
                          >
                            Vision & Mission
                          </Link>
                          <Link
                            href="/contact"
                            className="block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
                          >
                            Contact
                          </Link>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right Section - Dark Mode Toggle + CTA Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2.5 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-105"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5 text-yellow-500 transition-transform duration-300" />
              ) : (
                <Moon className="w-5 h-5 text-gray-600 dark:text-gray-400 transition-transform duration-300" />
              )}
            </button>

            {/* CTA Buttons */}
            <Button
              asChild
              variant="outline"
              className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white border-0 font-semibold px-6 py-2 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
            >
              <Link href="/zaza-teach-website">Try Zaza Teach</Link>
            </Button>

            <Button
              asChild
              className="bg-pink-600 hover:bg-pink-700 dark:bg-pink-500 dark:hover:bg-pink-600 text-white font-semibold px-6 py-2 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
            >
              <Link href="/waitlist">Join Waitlist</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden p-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors duration-200"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-gray-600 dark:text-gray-400" />
            ) : (
              <Menu className="w-6 h-6 text-gray-600 dark:text-gray-400" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 dark:border-gray-700 bg-white/95 dark:bg-[#121212]/95 backdrop-blur-md transition-colors duration-300">
            <div className="px-4 py-6 space-y-6">
              {/* Mobile Navigation */}
              <nav className="space-y-4">
                {navigationItems.map((item) => (
                  <div key={item.name} className="space-y-2">
                    <div className="flex items-center justify-between text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors duration-200 font-medium py-2">
                      <span>{item.name}</span>
                      {item.hasDropdown && <ChevronDown className="w-4 h-4" />}
                    </div>

                    {/* Mobile dropdown content */}
                    {item.hasDropdown && (
                      <div className="pl-4 space-y-2 border-l-2 border-gray-200 dark:border-gray-600">
                        {item.name === "Our Solutions" && (
                          <>
                            <Link
                              href="/zaza-promptly-site"
                              className="block py-1 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              Zaza Promptly
                            </Link>
                            <Link
                              href="/zaza-teach-website"
                              className="block py-1 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              Zaza Teach
                            </Link>
                            <div className="py-1 text-sm text-pink-600 dark:text-pink-400 font-medium">
                              Zaza Visuals (current)
                            </div>
                            <div className="py-1 text-sm text-gray-500 dark:text-gray-500">
                              Zaza Coach (Coming Soon)
                            </div>
                            <div className="py-1 text-sm text-gray-500 dark:text-gray-500">
                              Zaza ClarityDeck (Coming Soon)
                            </div>
                            <div className="py-1 text-sm text-gray-500 dark:text-gray-500">
                              Zaza Schwoop (Coming Soon)
                            </div>
                            <Link
                              href="/zaza-hr-spark"
                              className="block py-1 text-sm text-gray-500 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              Zaza HR Spark (Coming Soon)
                            </Link>
                            <Link
                              href="/products"
                              className="block py-1 text-sm font-medium text-pink-600 dark:text-pink-400 hover:text-pink-700 dark:hover:text-pink-300 transition-colors"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              See All Products →
                            </Link>
                          </>
                        )}

                        {item.name === "Learning Centre" && (
                          <>
                            <Link
                              href="/blog"
                              className="block py-1 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              Blog
                            </Link>
                            <Link
                              href="/resources"
                              className="block py-1 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              Free Resources
                            </Link>
                            <Link
                              href="/faq"
                              className="block py-1 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              FAQs
                            </Link>
                            <Link
                              href="/privacy"
                              className="block py-1 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              Privacy & Data Policy
                            </Link>
                          </>
                        )}

                        {item.name === "Why Zaza Visuals?" && (
                          <>
                            <Link
                              href="/benefits"
                              className="block py-1 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              How Zaza Visuals Helps Teachers
                            </Link>
                            <Link
                              href="/community"
                              className="block py-1 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              Built for Sharing & Visibility
                            </Link>
                            <Link
                              href="/about-the-founder"
                              className="block py-1 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              Created by Educators
                            </Link>
                          </>
                        )}

                        {item.name === "About Us" && (
                          <>
                            <Link
                              href="/about"
                              className="block py-1 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              About Zaza Technologies
                            </Link>
                            <Link
                              href="/how-it-works"
                              className="block py-1 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              How it Works
                            </Link>
                            <Link
                              href="/mission"
                              className="block py-1 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              Vision & Mission
                            </Link>
                            <Link
                              href="/contact"
                              className="block py-1 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              Contact
                            </Link>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </nav>

              {/* Mobile Dark Mode Toggle */}
              <div className="flex items-center justify-between py-2 border-t border-gray-200 dark:border-gray-700">
                <span className="text-gray-700 dark:text-gray-300 font-medium">Dark Mode</span>
                <button
                  onClick={toggleDarkMode}
                  className="p-2.5 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-105"
                  aria-label="Toggle dark mode"
                >
                  {isDarkMode ? (
                    <Sun className="w-5 h-5 text-yellow-500 transition-transform duration-300" />
                  ) : (
                    <Moon className="w-5 h-5 text-gray-600 dark:text-gray-400 transition-transform duration-300" />
                  )}
                </button>
              </div>

              {/* Mobile CTA Buttons */}
              <div className="space-y-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                <Button
                  asChild
                  variant="outline"
                  className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white border-0 font-semibold py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <Link href="/zaza-teach-website" onClick={() => setIsMobileMenuOpen(false)}>
                    Try Zaza Teach
                  </Link>
                </Button>

                <Button
                  asChild
                  className="w-full bg-pink-600 hover:bg-pink-700 dark:bg-pink-500 dark:hover:bg-pink-600 text-white font-semibold py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <Link href="/waitlist" onClick={() => setIsMobileMenuOpen(false)}>
                    Join Waitlist
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
