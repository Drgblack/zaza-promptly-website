"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { MenuIcon, XIcon, ChevronDownIcon, SunIcon, MoonIcon } from "lucide-react"

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [solutionsDropdownOpen, setSolutionsDropdownOpen] = useState(false)
  const [learningDropdownOpen, setLearningDropdownOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)

  // Initialize dark mode from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme")
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      setIsDarkMode(true)
      document.documentElement.classList.add("dark")
    } else {
      setIsDarkMode(false)
      document.documentElement.classList.remove("dark")
    }
  }, [])

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode
    setIsDarkMode(newDarkMode)

    if (newDarkMode) {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
    }
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-300">
      {/* Header */}
      <header className="bg-white dark:bg-gray-900 border-b border-slate-200 dark:border-gray-700 sticky top-0 z-50 transition-colors duration-300">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <a href="/" className="flex items-center">
                <img src="/images/zaza-logo.png" alt="Zaza Logo" className="w-8 h-8 rounded-lg" />
                <span className="ml-3 text-xl font-semibold text-slate-800 dark:text-white transition-colors duration-300">
                  Zaza
                </span>
              </a>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {/* Our Solutions Dropdown */}
              <div
                className="relative group"
                onMouseEnter={() => setSolutionsDropdownOpen(true)}
                onMouseLeave={() => setSolutionsDropdownOpen(false)}
              >
                <button className="flex items-center gap-1 text-slate-600 dark:text-gray-300 hover:text-slate-800 dark:hover:text-white font-medium transition-colors duration-300">
                  Our Solutions
                  <ChevronDownIcon className="h-4 w-4" />
                </button>

                {solutionsDropdownOpen && (
                  <div className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-slate-200 dark:border-gray-600 py-2 z-50 transition-colors duration-300">
                    <a
                      href="/zaza-promptly-site"
                      className="flex items-center px-4 py-2 text-sm text-slate-700 dark:text-gray-200 hover:bg-slate-50 dark:hover:bg-gray-700 transition-colors duration-300"
                    >
                      Zaza Promptly
                    </a>
                    <a
                      href="/zaza-teach-website"
                      className="flex items-center px-4 py-2 text-sm text-slate-700 dark:text-gray-200 hover:bg-slate-50 dark:hover:bg-gray-700 transition-colors duration-300"
                    >
                      Zaza Teach
                    </a>
                    <a
                      href="/zaza-study-landing"
                      className="flex items-center px-4 py-2 text-sm text-slate-700 dark:text-gray-200 hover:bg-slate-50 dark:hover:bg-gray-700 transition-colors duration-300"
                      title="Landing page in development"
                    >
                      Zaza Study
                      <span className="bg-purple-200 dark:bg-purple-800 text-purple-800 dark:text-purple-200 text-xs px-2 py-0.5 rounded-full ml-2 transition-colors duration-300">
                        Coming Soon
                      </span>
                    </a>
                    <a
                      href="/zaza-visuals-landing (1)"
                      className="flex items-center px-4 py-2 text-sm text-slate-700 dark:text-gray-200 hover:bg-slate-50 dark:hover:bg-gray-700 transition-colors duration-300"
                      title="Landing page in development"
                    >
                      Zaza Visuals
                      <span className="bg-purple-200 dark:bg-purple-800 text-purple-800 dark:text-purple-200 text-xs px-2 py-0.5 rounded-full ml-2 transition-colors duration-300">
                        Coming Soon
                      </span>
                    </a>
                    <a
                      href="/zaza-coach"
                      className="flex items-center px-4 py-2 text-sm text-slate-700 dark:text-gray-200 hover:bg-slate-50 dark:hover:bg-gray-700 transition-colors duration-300"
                      title="Landing page in development"
                    >
                      Zaza Coach
                      <span className="bg-purple-200 dark:bg-purple-800 text-purple-800 dark:text-purple-200 text-xs px-2 py-0.5 rounded-full ml-2 transition-colors duration-300">
                        Coming Soon
                      </span>
                    </a>
                    <a
                      href="/claritydeck-landing"
                      className="flex items-center px-4 py-2 text-sm text-slate-700 dark:text-gray-200 hover:bg-slate-50 dark:hover:bg-gray-700 transition-colors duration-300"
                      title="Landing page in development"
                    >
                      Zaza ClarityDeck
                      <span className="bg-purple-200 dark:bg-purple-800 text-purple-800 dark:text-purple-200 text-xs px-2 py-0.5 rounded-full ml-2 transition-colors duration-300">
                        Coming Soon
                      </span>
                    </a>
                    <a
                      href="/zaza-schwoop"
                      className="flex items-center px-4 py-2 text-sm text-slate-700 dark:text-gray-200 hover:bg-slate-50 dark:hover:bg-gray-700 transition-colors duration-300"
                      title="Landing page in development"
                    >
                      Zaza Schwoop
                      <span className="bg-purple-200 dark:bg-purple-800 text-purple-800 dark:text-purple-200 text-xs px-2 py-0.5 rounded-full ml-2 transition-colors duration-300">
                        Coming Soon
                      </span>
                    </a>
                    <a
                      href="/zaza-hr-spark"
                      className="flex items-center px-4 py-2 text-sm text-slate-700 dark:text-gray-200 hover:bg-slate-50 dark:hover:bg-gray-700 transition-colors duration-300"
                      title="Landing page in development"
                    >
                      Zaza HR Spark
                      <span className="bg-purple-200 dark:bg-purple-800 text-purple-800 dark:text-purple-200 text-xs px-2 py-0.5 rounded-full ml-2 transition-colors duration-300">
                        Coming Soon
                      </span>
                    </a>
                    <div className="border-t border-slate-200 dark:border-gray-600 mt-2 pt-2 transition-colors duration-300">
                      <a
                        href="/products"
                        className="flex items-center px-4 py-2 text-sm font-medium text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors duration-300"
                      >
                        See All Products
                      </a>
                    </div>
                  </div>
                )}
              </div>

              {/* Learning Centre Dropdown */}
              <div
                className="relative group"
                onMouseEnter={() => setLearningDropdownOpen(true)}
                onMouseLeave={() => setLearningDropdownOpen(false)}
              >
                <button className="flex items-center gap-1 text-slate-600 dark:text-gray-300 hover:text-slate-800 dark:hover:text-white font-medium transition-colors duration-300">
                  Learning Centre
                  <ChevronDownIcon className="h-4 w-4" />
                </button>

                {learningDropdownOpen && (
                  <div className="absolute top-full left-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-slate-200 dark:border-gray-600 py-2 z-50 transition-colors duration-300">
                    <a
                      href="/blog"
                      className="flex items-center px-4 py-2 text-sm text-slate-700 dark:text-gray-200 hover:bg-slate-50 dark:hover:bg-gray-700 transition-colors duration-300"
                    >
                      Blog
                    </a>
                    <a
                      href="/resources"
                      className="flex items-center px-4 py-2 text-sm text-slate-700 dark:text-gray-200 hover:bg-slate-50 dark:hover:bg-gray-700 transition-colors duration-300"
                    >
                      Free Resources
                    </a>
                    <a
                      href="/faq"
                      className="flex items-center px-4 py-2 text-sm text-slate-700 dark:text-gray-200 hover:bg-slate-50 dark:hover:bg-gray-700 transition-colors duration-300"
                    >
                      FAQs
                    </a>
                    <a
                      href="/privacy"
                      className="flex items-center px-4 py-2 text-sm text-slate-700 dark:text-gray-200 hover:bg-slate-50 dark:hover:bg-gray-700 transition-colors duration-300"
                    >
                      Privacy & Data Policy
                    </a>
                  </div>
                )}
              </div>

              <a
                href="/about"
                className="text-slate-600 dark:text-gray-300 hover:text-slate-800 dark:hover:text-white font-medium transition-colors duration-300"
              >
                About Us
              </a>
              <a
                href="/contact"
                className="text-slate-600 dark:text-gray-300 hover:text-slate-800 dark:hover:text-white font-medium transition-colors duration-300"
              >
                Contact
              </a>
              <a
                href="/vision-mission"
                className="text-slate-600 dark:text-gray-300 hover:text-slate-800 dark:hover:text-white font-medium transition-colors duration-300"
              >
                Vision & Mission
              </a>
            </nav>

            {/* Right Side: Dark Mode Toggle + CTA Buttons */}
            <div className="hidden lg:flex items-center space-x-3">
              {/* Dark Mode Toggle */}
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-lg bg-slate-100 dark:bg-gray-700 hover:bg-slate-200 dark:hover:bg-gray-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
                title="Toggle Dark Mode"
                aria-label="Toggle Dark Mode"
              >
                {isDarkMode ? (
                  <SunIcon className="h-5 w-5 text-yellow-500 transition-transform duration-300 rotate-0" />
                ) : (
                  <MoonIcon className="h-5 w-5 text-slate-600 transition-transform duration-300 rotate-0" />
                )}
              </button>

              <a
                href="/zaza-teach-website"
                className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 rounded-lg transition-all duration-200 transform hover:scale-105"
              >
                Try Zaza Teach
              </a>
              <a
                href="/zaza-promptly-site"
                className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 rounded-lg transition-all duration-200 transform hover:scale-105"
              >
                Try Zaza Promptly
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden p-2 rounded-md text-slate-600 dark:text-gray-300 hover:text-slate-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-gray-700 transition-colors duration-300"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="lg:hidden border-t border-slate-200 dark:border-gray-700 py-4 transition-colors duration-300">
              <nav className="flex flex-col space-y-4">
                {/* Mobile Dark Mode Toggle */}
                <div className="flex items-center justify-between">
                  <span className="text-slate-600 dark:text-gray-300 font-medium">Dark Mode</span>
                  <button
                    onClick={toggleDarkMode}
                    className="p-2 rounded-lg bg-slate-100 dark:bg-gray-700 hover:bg-slate-200 dark:hover:bg-gray-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    title="Toggle Dark Mode"
                    aria-label="Toggle Dark Mode"
                  >
                    {isDarkMode ? (
                      <SunIcon className="h-5 w-5 text-yellow-500 transition-transform duration-300" />
                    ) : (
                      <MoonIcon className="h-5 w-5 text-slate-600 transition-transform duration-300" />
                    )}
                  </button>
                </div>

                {/* Mobile Our Solutions */}
                <div>
                  <button
                    onClick={() => setSolutionsDropdownOpen(!solutionsDropdownOpen)}
                    className="flex items-center justify-between w-full text-slate-600 dark:text-gray-300 hover:text-slate-800 dark:hover:text-white font-medium transition-colors duration-300 text-left"
                  >
                    Our Solutions
                    <ChevronDownIcon
                      className={`h-4 w-4 transition-transform duration-300 ${solutionsDropdownOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  {solutionsDropdownOpen && (
                    <div className="mt-2 ml-4 space-y-2">
                      <a
                        href="/zaza-promptly-site"
                        className="block text-sm text-slate-600 dark:text-gray-300 hover:text-slate-800 dark:hover:text-white transition-colors duration-300"
                      >
                        Zaza Promptly
                      </a>
                      <a
                        href="/zaza-teach-website"
                        className="block text-sm text-slate-600 dark:text-gray-300 hover:text-slate-800 dark:hover:text-white transition-colors duration-300"
                      >
                        Zaza Teach
                      </a>
                      <a
                        href="/zaza-study-landing"
                        className="flex items-center text-sm text-slate-600 dark:text-gray-300 hover:text-slate-800 dark:hover:text-white transition-colors duration-300"
                      >
                        Zaza Study
                        <span className="bg-purple-200 dark:bg-purple-800 text-purple-800 dark:text-purple-200 text-xs px-2 py-0.5 rounded-full ml-2 transition-colors duration-300">
                          Coming Soon
                        </span>
                      </a>
                      <a
                        href="/zaza-visuals-landing (1)"
                        className="flex items-center text-sm text-slate-600 dark:text-gray-300 hover:text-slate-800 dark:hover:text-white transition-colors duration-300"
                      >
                        Zaza Visuals
                        <span className="bg-purple-200 dark:bg-purple-800 text-purple-800 dark:text-purple-200 text-xs px-2 py-0.5 rounded-full ml-2 transition-colors duration-300">
                          Coming Soon
                        </span>
                      </a>
                      <a
                        href="/zaza-coach"
                        className="flex items-center text-sm text-slate-600 dark:text-gray-300 hover:text-slate-800 dark:hover:text-white transition-colors duration-300"
                      >
                        Zaza Coach
                        <span className="bg-purple-200 dark:bg-purple-800 text-purple-800 dark:text-purple-200 text-xs px-2 py-0.5 rounded-full ml-2 transition-colors duration-300">
                          Coming Soon
                        </span>
                      </a>
                      <a
                        href="/claritydeck-landing"
                        className="flex items-center text-sm text-slate-600 dark:text-gray-300 hover:text-slate-800 dark:hover:text-white transition-colors duration-300"
                      >
                        Zaza ClarityDeck
                        <span className="bg-purple-200 dark:bg-purple-800 text-purple-800 dark:text-purple-200 text-xs px-2 py-0.5 rounded-full ml-2 transition-colors duration-300">
                          Coming Soon
                        </span>
                      </a>
                      <a
                        href="/zaza-schwoop"
                        className="flex items-center text-sm text-slate-600 dark:text-gray-300 hover:text-slate-800 dark:hover:text-white transition-colors duration-300"
                      >
                        Zaza Schwoop
                        <span className="bg-purple-200 dark:bg-purple-800 text-purple-800 dark:text-purple-200 text-xs px-2 py-0.5 rounded-full ml-2 transition-colors duration-300">
                          Coming Soon
                        </span>
                      </a>
                      <a
                        href="/zaza-hr-spark"
                        className="flex items-center text-sm text-slate-600 dark:text-gray-300 hover:text-slate-800 dark:hover:text-white transition-colors duration-300"
                      >
                        Zaza HR Spark
                        <span className="bg-purple-200 dark:bg-purple-800 text-purple-800 dark:text-purple-200 text-xs px-2 py-0.5 rounded-full ml-2 transition-colors duration-300">
                          Coming Soon
                        </span>
                      </a>
                      <a
                        href="/products"
                        className="block text-sm font-medium text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors duration-300 pt-2 border-t border-slate-200 dark:border-gray-600"
                      >
                        See All Products
                      </a>
                    </div>
                  )}
                </div>

                {/* Mobile Learning Centre */}
                <div>
                  <button
                    onClick={() => setLearningDropdownOpen(!learningDropdownOpen)}
                    className="flex items-center justify-between w-full text-slate-600 dark:text-gray-300 hover:text-slate-800 dark:hover:text-white font-medium transition-colors duration-300 text-left"
                  >
                    Learning Centre
                    <ChevronDownIcon
                      className={`h-4 w-4 transition-transform duration-300 ${learningDropdownOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  {learningDropdownOpen && (
                    <div className="mt-2 ml-4 space-y-2">
                      <a
                        href="/blog"
                        className="block text-sm text-slate-600 dark:text-gray-300 hover:text-slate-800 dark:hover:text-white transition-colors duration-300"
                      >
                        Blog
                      </a>
                      <a
                        href="/resources"
                        className="block text-sm text-slate-600 dark:text-gray-300 hover:text-slate-800 dark:hover:text-white transition-colors duration-300"
                      >
                        Free Resources
                      </a>
                      <a
                        href="/faq"
                        className="block text-sm text-slate-600 dark:text-gray-300 hover:text-slate-800 dark:hover:text-white transition-colors duration-300"
                      >
                        FAQs
                      </a>
                      <a
                        href="/privacy"
                        className="block text-sm text-slate-600 dark:text-gray-300 hover:text-slate-800 dark:hover:text-white transition-colors duration-300"
                      >
                        Privacy & Data Policy
                      </a>
                    </div>
                  )}
                </div>

                <a
                  href="/about"
                  className="text-slate-600 dark:text-gray-300 hover:text-slate-800 dark:hover:text-white font-medium transition-colors duration-300"
                >
                  About Us
                </a>
                <a
                  href="/contact"
                  className="text-slate-600 dark:text-gray-300 hover:text-slate-800 dark:hover:text-white font-medium transition-colors duration-300"
                >
                  Contact
                </a>
                <a
                  href="/vision-mission"
                  className="text-slate-600 dark:text-gray-300 hover:text-slate-800 dark:hover:text-white font-medium transition-colors duration-300"
                >
                  Vision & Mission
                </a>

                {/* Mobile CTA Buttons */}
                <div className="pt-4 border-t border-slate-200 dark:border-gray-700 space-y-3 transition-colors duration-300">
                  <a
                    href="/zaza-teach-website"
                    className="block w-full px-4 py-2 text-sm font-medium text-center text-white bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 rounded-lg transition-all duration-200"
                  >
                    Try Zaza Teach
                  </a>
                  <a
                    href="/zaza-promptly-site"
                    className="block w-full px-4 py-2 text-sm font-medium text-center text-white bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 rounded-lg transition-all duration-200"
                  >
                    Try Zaza Promptly
                  </a>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 bg-white dark:bg-gray-900 transition-colors duration-300">{children}</main>

      {/* Footer */}
      <footer className="bg-[#0B1021] text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Zaza Branding Column */}
            <div className="space-y-4">
              <div className="flex items-center mb-4">
                <img src="/images/zaza-logo.png" alt="Zaza Logo" className="w-8 h-8 rounded-lg" />
                <span className="ml-2 text-xl font-bold text-white">Zaza Technologies</span>
              </div>
              <p className="text-gray-300 leading-relaxed text-sm mb-6">
                Empowering teachers through emotionally intelligent AI.
              </p>
              <a
                href="/products"
                className="inline-block bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200 transform hover:scale-105"
              >
                Explore Zaza
              </a>
            </div>

            {/* Support Column */}
            <div>
              <h3 className="font-bold text-white mb-4 text-sm uppercase tracking-wide">Support</h3>
              <nav className="space-y-3">
                <a href="/contact" className="block text-gray-300 hover:text-white transition-colors text-sm">
                  Contact Us
                </a>
                <a href="/privacy" className="block text-gray-300 hover:text-white transition-colors text-sm">
                  Privacy Policy
                </a>
                <a href="/terms" className="block text-gray-300 hover:text-white transition-colors text-sm">
                  Terms of Use
                </a>
              </nav>
            </div>

            {/* Trust & Security Column */}
            <div>
              <h3 className="font-bold text-white mb-4 text-sm uppercase tracking-wide">Trust & Security</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">🛡️</span>
                  </div>
                  <span className="text-gray-300 text-sm">GDPR Compliant</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-pink-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">🔒</span>
                  </div>
                  <span className="text-gray-300 text-sm">FERPA Safe</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-purple-400 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">💜</span>
                  </div>
                  <span className="text-gray-300 text-sm">Built by Educators</span>
                </div>
              </div>
            </div>

            {/* Zaza Ecosystem Column */}
            <div>
              <h3 className="font-bold text-white mb-4 text-sm uppercase tracking-wide">Zaza Ecosystem</h3>
              <nav className="space-y-3">
                <a href="/zaza-teach-website" className="block text-gray-300 hover:text-white transition-colors text-sm">
                  Zaza Teach
                </a>
                <a
                  href="/zaza-promptly-site"
                  className="block text-purple-300 hover:text-purple-200 transition-colors text-sm font-medium"
                >
                  Zaza Promptly
                </a>
                <a href="/zaza-inbox" className="block text-gray-300 hover:text-white transition-colors text-sm">
                  Zaza Inbox
                </a>
                <a href="/zaza-visuals-landing (1)" className="block text-gray-300 hover:text-white transition-colors text-sm">
                  Zaza Visuals
                </a>
                <a href="/claritydeck-landing" className="block text-gray-300 hover:text-white transition-colors text-sm">
                  Zaza ClarityDeck
                </a>
                <a href="/zaza-schwoop" className="block text-gray-300 hover:text-white transition-colors text-sm">
                  Zaza Schwoop
                </a>
              </nav>
            </div>
          </div>

          {/* Social Media Section */}
          <div className="text-center mb-8">
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wide">Follow Us</h4>
            <div className="flex justify-center items-center space-x-6">
              <a
                href="https://tiktok.com/@zazatechnologies"
                className="text-gray-400 hover:text-white transition-colors duration-200"
                aria-label="Follow us on TikTok"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43V7.56a8.16 8.16 0 0 0 4.77 1.52v-3.39a4.85 4.85 0 0 1-1-.05z" />
                </svg>
              </a>
              <a
                href="https://linkedin.com/company/zazatechnologies"
                className="text-gray-400 hover:text-white transition-colors duration-200"
                aria-label="Follow us on LinkedIn"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href="https://twitter.com/zazatechnologies"
                className="text-gray-400 hover:text-white transition-colors duration-200"
                aria-label="Follow us on Twitter"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Bottom Line */}
          <div className="pt-8 border-t border-gray-700">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
              <div className="text-gray-400 text-sm">
                © 2025 Zaza Technologies UG (haftungsbeschränkt). All rights reserved.
              </div>
              <div className="text-gray-300 text-sm text-center lg:text-right">
                Made with 💙 by teachers, for learners. · Trusted by educators worldwide.
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
