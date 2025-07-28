"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, Sun, Moon, ChevronDown } from "lucide-react"

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  // Handle scroll effect for backdrop blur and shadow
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Handle dark mode toggle
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [isDarkMode])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  const handleDropdownEnter = (dropdown: string) => {
    setActiveDropdown(dropdown)
  }

  const handleDropdownLeave = () => {
    setActiveDropdown(null)
  }

  const handleKeyDown = (event: React.KeyboardEvent, dropdown: string) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault()
      setActiveDropdown(activeDropdown === dropdown ? null : dropdown)
    }
    if (event.key === "Escape") {
      setActiveDropdown(null)
    }
  }

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-700/50 shadow-lg"
          : "bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center">
            <a href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity duration-200">
              <img src="/images/zaza-logo.png" alt="Zaza Technologies Logo" className="h-8 w-8" />
              <div className="text-xl font-bold text-gray-900 dark:text-white font-sans">
                Zaza <span className="text-orange-500">Inbox</span>
              </div>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {/* Our Solutions Dropdown */}
            <div
              className="relative group"
              onMouseEnter={() => handleDropdownEnter("solutions")}
              onMouseLeave={handleDropdownLeave}
            >
              <button
                className="flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 font-medium transition-colors duration-200 relative group font-sans"
                onKeyDown={(e) => handleKeyDown(e, "solutions")}
                aria-expanded={activeDropdown === "solutions"}
                aria-haspopup="true"
              >
                <span>Our Solutions</span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${activeDropdown === "solutions" ? "rotate-180" : ""}`}
                />
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all duration-300 group-hover:w-full"></span>
              </button>

              {/* Solutions Dropdown Menu */}
              <div
                className={`absolute top-full left-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 transition-all duration-200 ${
                  activeDropdown === "solutions"
                    ? "opacity-100 visible translate-y-0"
                    : "opacity-0 invisible -translate-y-2"
                }`}
              >
                <div className="py-2">
                  <a
                    href="/zaza-promptly-site"
                    className="flex items-center px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-gray-700 hover:text-orange-600 dark:hover:text-orange-400 transition-colors duration-200"
                  >
                    <span className="font-medium">Zaza Promptly</span>
                  </a>
                  <a
                    href="/zaza-teach-website"
                    className="flex items-center px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-gray-700 hover:text-orange-600 dark:hover:text-orange-400 transition-colors duration-200"
                  >
                    <span className="font-medium">Zaza Teach</span>
                  </a>
                  <a
                    href="/zaza-study-landing"
                    className="flex items-center justify-between px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-gray-700 hover:text-orange-600 dark:hover:text-orange-400 transition-colors duration-200"
                  >
                    <span className="font-medium">Zaza Study</span>
                    <span className="bg-purple-200 text-purple-800 text-xs rounded-full px-2 py-1 ml-2">
                      Coming Soon
                    </span>
                  </a>
                  <a
                    href="/zaza-visuals-landing (1)"
                    className="flex items-center justify-between px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-gray-700 hover:text-orange-600 dark:hover:text-orange-400 transition-colors duration-200"
                  >
                    <span className="font-medium">Zaza Visuals</span>
                    <span className="bg-purple-200 text-purple-800 text-xs rounded-full px-2 py-1 ml-2">
                      Coming Soon
                    </span>
                  </a>
                  <a
                    href="/zaza-coach"
                    className="flex items-center justify-between px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-gray-700 hover:text-orange-600 dark:hover:text-orange-400 transition-colors duration-200"
                  >
                    <span className="font-medium">Zaza Coach</span>
                    <span className="bg-purple-200 text-purple-800 text-xs rounded-full px-2 py-1 ml-2">
                      Coming Soon
                    </span>
                  </a>
                  <a
                    href="/zaza-claritydeck"
                    className="flex items-center justify-between px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-gray-700 hover:text-orange-600 dark:hover:text-orange-400 transition-colors duration-200"
                  >
                    <span className="font-medium">Zaza ClarityDeck</span>
                    <span className="bg-purple-200 text-purple-800 text-xs rounded-full px-2 py-1 ml-2">
                      Coming Soon
                    </span>
                  </a>
                  <a
                    href="/zaza-schwoop"
                    className="flex items-center justify-between px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-gray-700 hover:text-orange-600 dark:hover:text-orange-400 transition-colors duration-200"
                  >
                    <span className="font-medium">Zaza Schwoop</span>
                    <span className="bg-purple-200 text-purple-800 text-xs rounded-full px-2 py-1 ml-2">
                      Coming Soon
                    </span>
                  </a>
                  <a
                    href="/zaza-hr-spark"
                    className="flex items-center justify-between px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-gray-700 hover:text-orange-600 dark:hover:text-orange-400 transition-colors duration-200"
                  >
                    <span className="font-medium">Zaza HR Spark</span>
                    <span className="bg-purple-200 text-purple-800 text-xs rounded-full px-2 py-1 ml-2">
                      Coming Soon
                    </span>
                  </a>
                  <div className="border-t border-gray-200 dark:border-gray-600 my-2"></div>
                  <a
                    href="/products"
                    className="flex items-center px-4 py-3 text-orange-600 dark:text-orange-400 hover:bg-orange-50 dark:hover:bg-gray-700 font-medium transition-colors duration-200"
                  >
                    <span>See All Products</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Learning Centre Dropdown */}
            <div
              className="relative group"
              onMouseEnter={() => handleDropdownEnter("learning")}
              onMouseLeave={handleDropdownLeave}
            >
              <button
                className="flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 font-medium transition-colors duration-200 relative group font-sans"
                onKeyDown={(e) => handleKeyDown(e, "learning")}
                aria-expanded={activeDropdown === "learning"}
                aria-haspopup="true"
              >
                <span>Learning Centre</span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${activeDropdown === "learning" ? "rotate-180" : ""}`}
                />
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all duration-300 group-hover:w-full"></span>
              </button>

              {/* Learning Centre Dropdown Menu */}
              <div
                className={`absolute top-full left-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 transition-all duration-200 ${
                  activeDropdown === "learning"
                    ? "opacity-100 visible translate-y-0"
                    : "opacity-0 invisible -translate-y-2"
                }`}
              >
                <div className="py-2">
                  <a
                    href="/blog"
                    className="flex items-center px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-gray-700 hover:text-orange-600 dark:hover:text-orange-400 transition-colors duration-200"
                  >
                    <span className="font-medium">Blog</span>
                  </a>
                  <a
                    href="/resources"
                    className="flex items-center px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-gray-700 hover:text-orange-600 dark:hover:text-orange-400 transition-colors duration-200"
                  >
                    <span className="font-medium">Free Resources</span>
                  </a>
                  <a
                    href="/faq"
                    className="flex items-center px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-gray-700 hover:text-orange-600 dark:hover:text-orange-400 transition-colors duration-200"
                  >
                    <span className="font-medium">FAQs</span>
                  </a>
                  <a
                    href="/privacy"
                    className="flex items-center px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-gray-700 hover:text-orange-600 dark:hover:text-orange-400 transition-colors duration-200"
                  >
                    <span className="font-medium">Privacy & Data Policy</span>
                  </a>
                </div>
              </div>
            </div>

            <a
              href="/about"
              className="text-gray-700 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 font-medium transition-colors duration-200 relative group font-sans"
            >
              About Us
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a
              href="/contact"
              className="text-gray-700 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 font-medium transition-colors duration-200 relative group font-sans"
            >
              Contact
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a
              href="/vision-mission"
              className="text-gray-700 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 font-medium transition-colors duration-200 relative group font-sans"
            >
              Vision & Mission
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all duration-300 group-hover:w-full"></span>
            </a>
          </nav>

          {/* Right Section - Buttons and Dark Mode Toggle */}
          <div className="flex items-center space-x-3">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="hidden sm:flex p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? (
                <Sun className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              ) : (
                <Moon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              )}
            </button>

            {/* Try Zaza Teach Button */}
            <Button
              asChild
              className="hidden xl:inline-flex bg-gradient-to-r from-pink-500 to-violet-500 hover:from-pink-600 hover:to-violet-600 text-white font-semibold px-3 py-2 rounded-md text-sm shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              <a href="/zaza-teach-website">Try Zaza Teach</a>
            </Button>

            {/* Try Zaza Promptly Button */}
            <Button
              asChild
              className="hidden xl:inline-flex bg-gradient-to-r from-pink-500 to-violet-500 hover:from-pink-600 hover:to-violet-600 text-white font-semibold px-3 py-2 rounded-md text-sm shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              <a href="/zaza-promptly-site">Try Zaza Promptly</a>
            </Button>

            {/* Join Waitlist Button */}
            <Button
              asChild
              className="hidden sm:inline-flex bg-orange-500 hover:bg-orange-600 text-white font-semibold px-4 py-2 rounded-md shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              <a href="/waitlist">Join Waitlist</a>
            </Button>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5 text-gray-700 dark:text-gray-300" />
              ) : (
                <Menu className="h-5 w-5 text-gray-700 dark:text-gray-300" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={`lg:hidden transition-all duration-300 ease-in-out overflow-hidden ${
            isMobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <nav className="py-4 space-y-4 border-t border-gray-200/50 dark:border-gray-700/50">
            {/* Mobile Our Solutions */}
            <div className="px-4">
              <div className="font-medium text-gray-900 dark:text-white mb-2">Our Solutions</div>
              <div className="pl-4 space-y-2">
                <a
                  href="/zaza-promptly"
                  className="block py-2 text-gray-700 dark:text-gray-300 hover:text-orange-500 transition-colors duration-200"
                >
                  Zaza Promptly
                </a>
                <a
                  href="/zaza-teach-website"
                  className="block py-2 text-gray-700 dark:text-gray-300 hover:text-orange-500 transition-colors duration-200"
                >
                  Zaza Teach
                </a>
                <a
                  href="/zaza-study-landing"
                  className="flex items-center justify-between py-2 text-gray-700 dark:text-gray-300 hover:text-orange-500 transition-colors duration-200"
                >
                  <span>Zaza Study</span>
                  <span className="bg-purple-200 text-purple-800 text-xs rounded-full px-2 py-1">Coming Soon</span>
                </a>
                <a
                  href="/zaza-visuals-landing (1)"
                  className="flex items-center justify-between py-2 text-gray-700 dark:text-gray-300 hover:text-orange-500 transition-colors duration-200"
                >
                  <span>Zaza Visuals</span>
                  <span className="bg-purple-200 text-purple-800 text-xs rounded-full px-2 py-1">Coming Soon</span>
                </a>
                <a
                  href="/zaza-coach"
                  className="flex items-center justify-between py-2 text-gray-700 dark:text-gray-300 hover:text-orange-500 transition-colors duration-200"
                >
                  <span>Zaza Coach</span>
                  <span className="bg-purple-200 text-purple-800 text-xs rounded-full px-2 py-1">Coming Soon</span>
                </a>
                <a
                  href="/zaza-claritydeck"
                  className="flex items-center justify-between py-2 text-gray-700 dark:text-gray-300 hover:text-orange-500 transition-colors duration-200"
                >
                  <span>Zaza ClarityDeck</span>
                  <span className="bg-purple-200 text-purple-800 text-xs rounded-full px-2 py-1">Coming Soon</span>
                </a>
                <a
                  href="/zaza-schwoop"
                  className="flex items-center justify-between py-2 text-gray-700 dark:text-gray-300 hover:text-orange-500 transition-colors duration-200"
                >
                  <span>Zaza Schwoop</span>
                  <span className="bg-purple-200 text-purple-800 text-xs rounded-full px-2 py-1">Coming Soon</span>
                </a>
                <a
                  href="/zaza-hr-spark"
                  className="flex items-center justify-between py-2 text-gray-700 dark:text-gray-300 hover:text-orange-500 transition-colors duration-200"
                >
                  <span>Zaza HR Spark</span>
                  <span className="bg-purple-200 text-purple-800 text-xs rounded-full px-2 py-1">Coming Soon</span>
                </a>
                <a href="/products" className="block py-2 text-orange-600 dark:text-orange-400 font-medium">
                  See All Products
                </a>
              </div>
            </div>

            {/* Mobile Learning Centre */}
            <div className="px-4">
              <div className="font-medium text-gray-900 dark:text-white mb-2">Learning Centre</div>
              <div className="pl-4 space-y-2">
                <a
                  href="/blog"
                  className="block py-2 text-gray-700 dark:text-gray-300 hover:text-orange-500 transition-colors duration-200"
                >
                  Blog
                </a>
                <a
                  href="/resources"
                  className="block py-2 text-gray-700 dark:text-gray-300 hover:text-orange-500 transition-colors duration-200"
                >
                  Free Resources
                </a>
                <a
                  href="/faq"
                  className="block py-2 text-gray-700 dark:text-gray-300 hover:text-orange-500 transition-colors duration-200"
                >
                  FAQs
                </a>
                <a
                  href="/privacy"
                  className="block py-2 text-gray-700 dark:text-gray-300 hover:text-orange-500 transition-colors duration-200"
                >
                  Privacy & Data Policy
                </a>
              </div>
            </div>

            {/* Other Mobile Navigation Links */}
            <a
              href="/about"
              className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-md font-medium transition-all duration-200 font-sans"
              onClick={closeMobileMenu}
            >
              About Us
            </a>
            <a
              href="/contact"
              className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-md font-medium transition-all duration-200 font-sans"
              onClick={closeMobileMenu}
            >
              Contact
            </a>
            <a
              href="/vision-mission"
              className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-md font-medium transition-all duration-200 font-sans"
              onClick={closeMobileMenu}
            >
              Vision & Mission
            </a>

            {/* Mobile Dark Mode Toggle */}
            <div className="px-4 py-2">
              <button
                onClick={toggleDarkMode}
                className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 transition-colors duration-200"
              >
                {isDarkMode ? (
                  <>
                    <Sun className="h-5 w-5" />
                    <span className="font-medium">Light Mode</span>
                  </>
                ) : (
                  <>
                    <Moon className="h-5 w-5" />
                    <span className="font-medium">Dark Mode</span>
                  </>
                )}
              </button>
            </div>

            {/* Mobile Action Buttons */}
            <div className="px-4 space-y-3 pt-2">
              <Button
                asChild
                className="w-full bg-gradient-to-r from-pink-500 to-violet-500 hover:from-pink-600 hover:to-violet-600 text-white font-semibold px-4 py-2 rounded-md shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <a href="/zaza-teach" onClick={closeMobileMenu}>
                  Try Zaza Teach
                </a>
              </Button>
              <Button
                asChild
                className="w-full bg-gradient-to-r from-pink-500 to-violet-500 hover:from-pink-600 hover:to-violet-600 text-white font-semibold px-4 py-2 rounded-md shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <a href="/zaza-promptly" onClick={closeMobileMenu}>
                  Try Zaza Promptly
                </a>
              </Button>
              <Button
                asChild
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold px-4 py-2 rounded-md shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <a href="/waitlist" onClick={closeMobileMenu}>
                  Join Waitlist
                </a>
              </Button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}
