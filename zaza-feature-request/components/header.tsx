"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"
import { useState } from "react"
import { ThemeToggle } from "./theme-toggle"

export function Header() {
  const [solutionsOpen, setSolutionsOpen] = useState(false)
  const [learningOpen, setLearningOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <img src="/zaza-logo.png" alt="Zaza Logo" className="w-8 h-8 rounded-lg" />
            <span className="text-xl font-bold text-gray-900 dark:text-white">Zaza</span>
          </Link>

          {/* Navigation Items - Hidden on mobile, shown on desktop */}
          <nav className="hidden lg:flex items-center space-x-8">
            {/* Our Solutions Dropdown */}
            <div className="relative group">
              <button
                className="flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium transition-colors"
                onMouseEnter={() => setSolutionsOpen(true)}
                onMouseLeave={() => setSolutionsOpen(false)}
              >
                <span>Our Solutions</span>
                <ChevronDown className="w-4 h-4" />
              </button>

              {solutionsOpen && (
                <div
                  className="absolute top-full left-0 mt-1 w-64 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg py-2 z-50 transition-colors duration-200"
                  onMouseEnter={() => setSolutionsOpen(true)}
                  onMouseLeave={() => setSolutionsOpen(false)}
                >
                  <Link
                    href="/zaza-promptly-site"
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    Zaza Promptly
                  </Link>
                  <Link
                    href="/zaza-teach-website"
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    Zaza Teach
                  </Link>
                  <Link
                    href="/zaza-study-landing"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition-colors"
                    title="Landing page in development"
                  >
                    Zaza Study
                    <span className="bg-purple-200 dark:bg-purple-800 text-purple-800 dark:text-purple-200 text-xs px-2 py-0.5 rounded-full ml-2">
                      Coming Soon
                    </span>
                  </Link>
                  <Link
                    href="/zaza-visuals-landing (1)"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition-colors"
                    title="Landing page in development"
                  >
                    Zaza Visuals
                    <span className="bg-purple-200 dark:bg-purple-800 text-purple-800 dark:text-purple-200 text-xs px-2 py-0.5 rounded-full ml-2">
                      Coming Soon
                    </span>
                  </Link>
                  <Link
                    href="/zaza-coach"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition-colors"
                    title="Landing page in development"
                  >
                    Zaza Coach
                    <span className="bg-purple-200 dark:bg-purple-800 text-purple-800 dark:text-purple-200 text-xs px-2 py-0.5 rounded-full ml-2">
                      Coming Soon
                    </span>
                  </Link>
                  <Link
                    href="/zaza-claritydeck"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition-colors"
                    title="Landing page in development"
                  >
                    Zaza ClarityDeck
                    <span className="bg-purple-200 dark:bg-purple-800 text-purple-800 dark:text-purple-200 text-xs px-2 py-0.5 rounded-full ml-2">
                      Coming Soon
                    </span>
                  </Link>
                  <Link
                    href="/zaza-schwoop"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition-colors"
                    title="Landing page in development"
                  >
                    Zaza Schwoop
                    <span className="bg-purple-200 dark:bg-purple-800 text-purple-800 dark:text-purple-200 text-xs px-2 py-0.5 rounded-full ml-2">
                      Coming Soon
                    </span>
                  </Link>
                  <Link
                    href="/zaza-hr-spark"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition-colors"
                    title="Landing page in development"
                  >
                    Zaza HR Spark
                    <span className="bg-purple-200 dark:bg-purple-800 text-purple-800 dark:text-purple-200 text-xs px-2 py-0.5 rounded-full ml-2">
                      Coming Soon
                    </span>
                  </Link>
                  <div className="border-t border-gray-100 dark:border-gray-700 mt-2 pt-2">
                    <Link
                      href="/products"
                      className="block px-4 py-2 text-sm font-medium text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:text-purple-700 dark:hover:text-purple-300 transition-colors"
                    >
                      See All Products
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Learning Centre Dropdown */}
            <div className="relative group">
              <button
                className="flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium transition-colors"
                onMouseEnter={() => setLearningOpen(true)}
                onMouseLeave={() => setLearningOpen(false)}
              >
                <span>Learning Centre</span>
                <ChevronDown className="w-4 h-4" />
              </button>

              {learningOpen && (
                <div
                  className="absolute top-full left-0 mt-1 w-56 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg py-2 z-50 transition-colors duration-200"
                  onMouseEnter={() => setLearningOpen(true)}
                  onMouseLeave={() => setLearningOpen(false)}
                >
                  <Link
                    href="/blog"
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    Blog
                  </Link>
                  <Link
                    href="/resources"
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    Free Resources
                  </Link>
                  <Link
                    href="/faq"
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    FAQs
                  </Link>
                  <Link
                    href="/privacy"
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    Privacy & Data Policy
                  </Link>
                </div>
              )}
            </div>

            <Link
              href="/about"
              className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium transition-colors"
            >
              About Us
            </Link>

            <Link
              href="/contact"
              className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium transition-colors"
            >
              Contact
            </Link>

            <Link
              href="/vision-mission"
              className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium transition-colors"
            >
              Vision & Mission
            </Link>
          </nav>

          {/* Right Side: Theme Toggle + CTA Buttons - Hidden on mobile, shown on desktop */}
          <div className="hidden lg:flex items-center space-x-3">
            <ThemeToggle />

            <Button
              asChild
              className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-medium shadow-sm transition-all"
            >
              <Link href="/zaza-teach-website">Try Zaza Teach</Link>
            </Button>

            <Button
              asChild
              className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-medium shadow-sm transition-all"
            >
              <Link href="/zaza-promptly-site">Try Zaza Promptly</Link>
            </Button>
          </div>

          {/* Mobile Menu Button - Shown on mobile, hidden on desktop */}
          <button
            className="lg:hidden p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 dark:border-gray-700 py-4 transition-colors duration-200">
            <div className="space-y-4">
              {/* Mobile Theme Toggle */}
              <div className="flex items-center justify-between">
                <span className="text-gray-700 dark:text-gray-300 font-medium">Dark Mode</span>
                <ThemeToggle />
              </div>

              <div>
                <button
                  className="flex items-center justify-between w-full text-left text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium py-2 transition-colors"
                  onClick={() => setSolutionsOpen(!solutionsOpen)}
                >
                  <span>Our Solutions</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${solutionsOpen ? "rotate-180" : ""}`} />
                </button>
                {solutionsOpen && (
                  <div className="ml-4 mt-2 space-y-2">
                    <Link
                      href="/zaza-promptly"
                      className="block text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white py-1 transition-colors"
                    >
                      Zaza Promptly
                    </Link>
                    <Link
                      href="/zaza-teach-website"
                      className="block text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white py-1 transition-colors"
                    >
                      Zaza Teach
                    </Link>
                    <Link
                      href="/zaza-study-landing"
                      className="flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white py-1 transition-colors"
                    >
                      Zaza Study
                      <span className="bg-purple-200 dark:bg-purple-800 text-purple-800 dark:text-purple-200 text-xs px-2 py-0.5 rounded-full ml-2">
                        Coming Soon
                      </span>
                    </Link>
                    <Link
                      href="/zaza-visuals-landing (1)"
                      className="flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white py-1 transition-colors"
                    >
                      Zaza Visuals
                      <span className="bg-purple-200 dark:bg-purple-800 text-purple-800 dark:text-purple-200 text-xs px-2 py-0.5 rounded-full ml-2">
                        Coming Soon
                      </span>
                    </Link>
                    <Link
                      href="/zaza-coach"
                      className="flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white py-1 transition-colors"
                    >
                      Zaza Coach
                      <span className="bg-purple-200 dark:bg-purple-800 text-purple-800 dark:text-purple-200 text-xs px-2 py-0.5 rounded-full ml-2">
                        Coming Soon
                      </span>
                    </Link>
                    <Link
                      href="/zaza-claritydeck"
                      className="flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white py-1 transition-colors"
                    >
                      Zaza ClarityDeck
                      <span className="bg-purple-200 dark:bg-purple-800 text-purple-800 dark:text-purple-200 text-xs px-2 py-0.5 rounded-full ml-2">
                        Coming Soon
                      </span>
                    </Link>
                    <Link
                      href="/zaza-schwoop"
                      className="flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white py-1 transition-colors"
                    >
                      Zaza Schwoop
                      <span className="bg-purple-200 dark:bg-purple-800 text-purple-800 dark:text-purple-200 text-xs px-2 py-0.5 rounded-full ml-2">
                        Coming Soon
                      </span>
                    </Link>
                    <Link
                      href="/zaza-hr-spark"
                      className="flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white py-1 transition-colors"
                    >
                      Zaza HR Spark
                      <span className="bg-purple-200 dark:bg-purple-800 text-purple-800 dark:text-purple-200 text-xs px-2 py-0.5 rounded-full ml-2">
                        Coming Soon
                      </span>
                    </Link>
                    <Link
                      href="/products"
                      className="block text-sm font-medium text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 py-1 mt-2 pt-2 border-t border-gray-200 dark:border-gray-700 transition-colors"
                    >
                      See All Products
                    </Link>
                  </div>
                )}
              </div>

              <div>
                <button
                  className="flex items-center justify-between w-full text-left text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium py-2 transition-colors"
                  onClick={() => setLearningOpen(!learningOpen)}
                >
                  <span>Learning Centre</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${learningOpen ? "rotate-180" : ""}`} />
                </button>
                {learningOpen && (
                  <div className="ml-4 mt-2 space-y-2">
                    <Link
                      href="/blog"
                      className="block text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white py-1 transition-colors"
                    >
                      Blog
                    </Link>
                    <Link
                      href="/resources"
                      className="block text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white py-1 transition-colors"
                    >
                      Free Resources
                    </Link>
                    <Link
                      href="/faq"
                      className="block text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white py-1 transition-colors"
                    >
                      FAQs
                    </Link>
                    <Link
                      href="/privacy"
                      className="block text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white py-1 transition-colors"
                    >
                      Privacy & Data Policy
                    </Link>
                  </div>
                )}
              </div>

              <Link
                href="/about"
                className="block text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium py-2 transition-colors"
              >
                About Us
              </Link>

              <Link
                href="/contact"
                className="block text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium py-2 transition-colors"
              >
                Contact
              </Link>

              <Link
                href="/vision-mission"
                className="block text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium py-2 transition-colors"
              >
                Vision & Mission
              </Link>

              <div className="pt-4 space-y-3 border-t border-gray-200 dark:border-gray-700">
                <Button
                  asChild
                  className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-medium shadow-sm transition-all"
                >
                  <Link href="/zaza-teach-website">Try Zaza Teach</Link>
                </Button>

                <Button
                  asChild
                  className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-medium shadow-sm transition-all"
                >
                  <Link href="/zaza-promptly">Try Zaza Promptly</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
