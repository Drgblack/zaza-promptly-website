"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronDown, Menu, X, Sun, Moon } from "lucide-react"

interface HeaderProps {
  currentPage?: string
}

export function Header({ currentPage }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [isDarkMode, setIsDarkMode] = useState(false)

  const headerRef = useRef<HTMLDivElement>(null)

  // Initialize dark mode from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("darkMode")
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

    if (savedTheme === "true" || (!savedTheme && prefersDark)) {
      setIsDarkMode(true)
      document.documentElement.classList.add("dark")
    } else {
      setIsDarkMode(false)
      document.documentElement.classList.remove("dark")
    }
  }, [])

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode
    setIsDarkMode(newDarkMode)
    localStorage.setItem("darkMode", newDarkMode.toString())

    if (newDarkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setActiveDropdown(null)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const navigationItems = [
    { name: "Our Solutions", href: "#", hasDropdown: true },
    { name: "Learning Centre", href: "#", hasDropdown: true },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Vision & Mission", href: "/vision-mission" },
  ]

  const handleDropdownToggle = (itemName: string) => {
    setActiveDropdown(activeDropdown === itemName ? null : itemName)
  }

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div className="flex items-center space-x-3">
            <a href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
              <img src="/new-logo.png" alt="Zaza Technologies" className="w-8 h-8" />
              <span className="text-xl font-semibold text-gray-900 dark:text-white transition-colors duration-300">
                Zaza
              </span>
            </a>
          </div>

          {/* Desktop Navigation - Centered */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <div key={item.name} className="relative">
                {item.hasDropdown ? (
                  <button
                    onClick={() => handleDropdownToggle(item.name)}
                    className="flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-300 font-medium py-2"
                  >
                    <span>{item.name}</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-300 ${activeDropdown === item.name ? "rotate-180" : ""}`}
                    />
                  </button>
                ) : (
                  <a
                    href={item.href}
                    className={`text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-300 font-medium py-2 ${
                      currentPage === item.name.toLowerCase().replace(/\s+/g, "-")
                        ? "text-purple-600 dark:text-purple-400 font-semibold"
                        : ""
                    }`}
                  >
                    {item.name}
                  </a>
                )}

                {/* Our Solutions Dropdown */}
                {item.hasDropdown && activeDropdown === item.name && item.name === "Our Solutions" && (
                  <div className="absolute top-full left-0 mt-1 w-80 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg py-3 z-50 transition-colors duration-300">
                    <div className="px-4 py-2">
                      <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 transition-colors duration-300">
                        Our AI-Powered Solutions
                      </h3>
                      <div className="space-y-1">
                        <a
                          href="/zaza-promptly-site"
                          className="flex items-center justify-between px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md transition-colors duration-300"
                        >
                          <span>Zaza Promptly</span>
                        </a>
                        <a
                          href="/zaza-teach-website"
                          className="flex items-center justify-between px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md transition-colors duration-300"
                        >
                          <span>Zaza Teach</span>
                        </a>
                        <a
                          href="/zaza-study-landing"
                          className="flex items-center justify-between px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md transition-colors duration-300 group"
                          title="Landing page in development"
                        >
                          <span>Zaza Study</span>
                          <span className="bg-purple-200 dark:bg-purple-800 text-purple-800 dark:text-purple-200 text-xs px-2 py-0.5 rounded-full ml-2 group-hover:bg-purple-300 dark:group-hover:bg-purple-700 transition-colors duration-300">
                            Coming Soon
                          </span>
                        </a>
                        <a
                          href="/zaza-visuals-landing (1)"
                          className="flex items-center justify-between px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md transition-colors duration-300 group"
                          title="Landing page in development"
                        >
                          <span>Zaza Visuals</span>
                          <span className="bg-purple-200 dark:bg-purple-800 text-purple-800 dark:text-purple-200 text-xs px-2 py-0.5 rounded-full ml-2 group-hover:bg-purple-300 dark:group-hover:bg-purple-700 transition-colors duration-300">
                            Coming Soon
                          </span>
                        </a>
                        <a
                          href="/zaza-coach"
                          className="flex items-center justify-between px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md transition-colors duration-300 group"
                          title="Landing page in development"
                        >
                          <span>Zaza Coach</span>
                          <span className="bg-purple-200 dark:bg-purple-800 text-purple-800 dark:text-purple-200 text-xs px-2 py-0.5 rounded-full ml-2 group-hover:bg-purple-300 dark:group-hover:bg-purple-700 transition-colors duration-300">
                            Coming Soon
                          </span>
                        </a>
                        <a
                          href="/zaza-claritydeck"
                          className="flex items-center justify-between px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md transition-colors duration-300 group"
                          title="Landing page in development"
                        >
                          <span>Zaza ClarityDeck</span>
                          <span className="bg-purple-200 dark:bg-purple-800 text-purple-800 dark:text-purple-200 text-xs px-2 py-0.5 rounded-full ml-2 group-hover:bg-purple-300 dark:group-hover:bg-purple-700 transition-colors duration-300">
                            Coming Soon
                          </span>
                        </a>
                        <a
                          href="/zaza-schwoop"
                          className="flex items-center justify-between px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md transition-colors duration-300 group"
                          title="Landing page in development"
                        >
                          <span>Zaza Schwoop</span>
                          <span className="bg-purple-200 dark:bg-purple-800 text-purple-800 dark:text-purple-200 text-xs px-2 py-0.5 rounded-full ml-2 group-hover:bg-purple-300 dark:group-hover:bg-purple-700 transition-colors duration-300">
                            Coming Soon
                          </span>
                        </a>
                        <a
                          href="/zaza-hr-spark"
                          className="flex items-center justify-between px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md transition-colors duration-300 group"
                          title="Landing page in development"
                        >
                          <span>Zaza HR Spark</span>
                          <span className="bg-purple-200 dark:bg-purple-800 text-purple-800 dark:text-purple-200 text-xs px-2 py-0.5 rounded-full ml-2 group-hover:bg-purple-300 dark:group-hover:bg-purple-700 transition-colors duration-300">
                            Coming Soon
                          </span>
                        </a>
                      </div>
                      <div className="border-t border-gray-100 dark:border-gray-600 mt-3 pt-3 transition-colors duration-300">
                        <a
                          href="/products"
                          className="flex items-center px-3 py-2 text-sm font-medium text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-md transition-colors duration-300"
                        >
                          <span>See All Products</span>
                          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                )}

                {/* Learning Centre Dropdown */}
                {item.hasDropdown && activeDropdown === item.name && item.name === "Learning Centre" && (
                  <div className="absolute top-full left-0 mt-1 w-64 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg py-3 z-50 transition-colors duration-300">
                    <div className="px-4 py-2">
                      <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 transition-colors duration-300">
                        Learning Centre
                      </h3>
                      <div className="space-y-1">
                        <a
                          href="/blog"
                          className="block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md transition-colors duration-300"
                        >
                          Blog
                        </a>
                        <a
                          href="/resources"
                          className="block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md transition-colors duration-300"
                        >
                          Free Resources
                        </a>
                        <a
                          href="/faq"
                          className="block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md transition-colors duration-300"
                        >
                          FAQs
                        </a>
                        <a
                          href="/privacy"
                          className="block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md transition-colors duration-300"
                        >
                          Privacy & Data Policy
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Desktop Right Section - Dark Mode Toggle + CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-3">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
              aria-label="Toggle Dark Mode"
              title="Toggle Dark Mode"
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5 text-yellow-500 transition-transform duration-300 hover:rotate-12" />
              ) : (
                <Moon className="w-5 h-5 text-gray-600 transition-transform duration-300 hover:-rotate-12" />
              )}
            </button>

            <a
              href="/zaza-teach-website"
              className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all shadow-sm"
            >
              Try Zaza Teach
            </a>
            <a
              href="/zaza-promptly-site"
              className="px-4 py-2 text-sm font-medium bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all shadow-sm"
            >
              Try Zaza Promptly
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-gray-600 dark:text-gray-300 transition-colors duration-300" />
            ) : (
              <Menu className="w-6 h-6 text-gray-600 dark:text-gray-300 transition-colors duration-300" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden border-t border-gray-200 dark:border-gray-700 transform transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? "opacity-100 max-h-screen" : "opacity-0 max-h-0 overflow-hidden pointer-events-none"
          }`}
        >
          <div className="py-4 space-y-1">
            {/* Mobile Navigation Items */}
            {navigationItems.map((item) => (
              <div key={item.name}>
                {item.hasDropdown ? (
                  <button
                    onClick={() => handleDropdownToggle(item.name)}
                    className="flex items-center justify-between w-full px-4 py-3 text-left text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300 font-medium"
                  >
                    <span>{item.name}</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-300 ${activeDropdown === item.name ? "rotate-180" : ""}`}
                    />
                  </button>
                ) : (
                  <a
                    href={item.href}
                    className="block px-4 py-3 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300 font-medium"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                )}

                {/* Mobile Our Solutions Dropdown */}
                {item.hasDropdown && activeDropdown === item.name && item.name === "Our Solutions" && (
                  <div className="bg-gray-50 dark:bg-gray-800 px-4 py-3 transition-colors duration-300">
                    <div className="space-y-2">
                      <a
                        href="/zaza-promptly-site"
                        className="block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-white dark:hover:bg-gray-700 rounded-md transition-colors duration-300"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Zaza Promptly
                      </a>
                      <a
                        href="/zaza-teach-website"
                        className="block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-white dark:hover:bg-gray-700 rounded-md transition-colors duration-300"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Zaza Teach
                      </a>
                      <a
                        href="/zaza-study-landing"
                        className="flex items-center justify-between px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-white dark:hover:bg-gray-700 rounded-md transition-colors duration-300"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <span>Zaza Study</span>
                        <span className="bg-purple-200 dark:bg-purple-800 text-purple-800 dark:text-purple-200 text-xs px-2 py-0.5 rounded-full transition-colors duration-300">
                          Coming Soon
                        </span>
                      </a>
                      <a
                        href="/zaza-visuals-landing (1)"
                        className="flex items-center justify-between px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-white dark:hover:bg-gray-700 rounded-md transition-colors duration-300"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <span>Zaza Visuals</span>
                        <span className="bg-purple-200 dark:bg-purple-800 text-purple-800 dark:text-purple-200 text-xs px-2 py-0.5 rounded-full transition-colors duration-300">
                          Coming Soon
                        </span>
                      </a>
                      <a
                        href="/zaza-coach"
                        className="flex items-center justify-between px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-white dark:hover:bg-gray-700 rounded-md transition-colors duration-300"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <span>Zaza Coach</span>
                        <span className="bg-purple-200 dark:bg-purple-800 text-purple-800 dark:text-purple-200 text-xs px-2 py-0.5 rounded-full transition-colors duration-300">
                          Coming Soon
                        </span>
                      </a>
                      <a
                        href="/zaza-claritydeck"
                        className="flex items-center justify-between px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-white dark:hover:bg-gray-700 rounded-md transition-colors duration-300"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <span>Zaza ClarityDeck</span>
                        <span className="bg-purple-200 dark:bg-purple-800 text-purple-800 dark:text-purple-200 text-xs px-2 py-0.5 rounded-full transition-colors duration-300">
                          Coming Soon
                        </span>
                      </a>
                      <a
                        href="/zaza-schwoop"
                        className="flex items-center justify-between px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-white dark:hover:bg-gray-700 rounded-md transition-colors duration-300"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <span>Zaza Schwoop</span>
                        <span className="bg-purple-200 dark:bg-purple-800 text-purple-800 dark:text-purple-200 text-xs px-2 py-0.5 rounded-full transition-colors duration-300">
                          Coming Soon
                        </span>
                      </a>
                      <a
                        href="/zaza-hr-spark"
                        className="flex items-center justify-between px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-white dark:hover:bg-gray-700 rounded-md transition-colors duration-300"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <span>Zaza HR Spark</span>
                        <span className="bg-purple-200 dark:bg-purple-800 text-purple-800 dark:text-purple-200 text-xs px-2 py-0.5 rounded-full transition-colors duration-300">
                          Coming Soon
                        </span>
                      </a>
                      <div className="border-t border-gray-200 dark:border-gray-600 mt-3 pt-3 transition-colors duration-300">
                        <a
                          href="/products"
                          className="flex items-center px-3 py-2 text-sm font-medium text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 hover:bg-white dark:hover:bg-gray-700 rounded-md transition-colors duration-300"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <span>See All Products</span>
                          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                )}

                {/* Mobile Learning Centre Dropdown */}
                {item.hasDropdown && activeDropdown === item.name && item.name === "Learning Centre" && (
                  <div className="bg-gray-50 dark:bg-gray-800 px-4 py-3 transition-colors duration-300">
                    <div className="space-y-2">
                      <a
                        href="/blog"
                        className="block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-white dark:hover:bg-gray-700 rounded-md transition-colors duration-300"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Blog
                      </a>
                      <a
                        href="/resources"
                        className="block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-white dark:hover:bg-gray-700 rounded-md transition-colors duration-300"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Free Resources
                      </a>
                      <a
                        href="/faq"
                        className="block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-white dark:hover:bg-gray-700 rounded-md transition-colors duration-300"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        FAQs
                      </a>
                      <a
                        href="/privacy"
                        className="block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-white dark:hover:bg-gray-700 rounded-md transition-colors duration-300"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Privacy & Data Policy
                      </a>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Mobile Dark Mode Toggle + CTA Buttons */}
            <div className="px-4 pt-4 space-y-3 border-t border-gray-200 dark:border-gray-700 mt-4 transition-colors duration-300">
              {/* Mobile Dark Mode Toggle */}
              <button
                onClick={toggleDarkMode}
                className="flex items-center justify-center w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
                aria-label="Toggle Dark Mode"
              >
                {isDarkMode ? (
                  <>
                    <Sun className="w-5 h-5 text-yellow-500 mr-2 transition-transform duration-300" />
                    <span className="text-gray-700 dark:text-gray-300 font-medium">Switch to Light Mode</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-5 h-5 text-gray-600 mr-2 transition-transform duration-300" />
                    <span className="text-gray-700 dark:text-gray-300 font-medium">Switch to Dark Mode</span>
                  </>
                )}
              </button>

              <a
                href="/zaza-teach-website"
                className="block w-full px-4 py-3 text-center text-white bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all font-medium shadow-sm"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Try Zaza Teach
              </a>
              <a
                href="/zaza-promptly-site"
                className="block w-full px-4 py-3 text-center bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all font-medium shadow-sm"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Try Zaza Promptly
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
