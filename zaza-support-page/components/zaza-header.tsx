"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronDown, Menu, X } from "lucide-react"
import ThemeToggle from "./theme-toggle"

export default function ZazaHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  const closeDropdowns = () => {
    setOpenDropdown(null)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  const solutions = [
    { name: "Zaza Promptly", href: "/zaza-promptly-site", available: true },
    { name: "Zaza Teach", href: "/zaza-teach-website", available: true },
            { name: "Zaza Study", href: "/zaza-study-landing", available: false },
    { name: "Zaza Visuals", href: "#", available: false },
    { name: "Zaza Coach", href: "#", available: false },
    { name: "Zaza ClarityDeck", href: "#", available: false },
    { name: "Zaza Schwoop", href: "#", available: false },
    { name: "Zaza HR Spark", href: "/zaza-hr-spark", available: false },
  ]

  const learningCentre = [
    { name: "Blog", href: "/blog" },
    { name: "Free Resources", href: "/resources" },
    { name: "FAQs", href: "/faq" },
    { name: "Privacy & Data Policy", href: "/privacy" },
  ]

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div className="flex items-center">
            <a href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
              <img src="/z-logo.png" alt="Zaza" className="w-8 h-8" />
              <span className="text-xl font-bold text-gray-900 dark:text-white">Zaza</span>
            </a>
          </div>

          {/* Desktop Navigation - Centered */}
          <nav className="hidden lg:flex items-center space-x-8">
            {/* Our Solutions Dropdown */}
            <div className="relative">
              <button
                onMouseEnter={() => setOpenDropdown("solutions")}
                className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <span>Our Solutions</span>
                <ChevronDown className="w-4 h-4" />
              </button>

              {openDropdown === "solutions" && (
                <div
                  className="absolute top-full left-0 mt-1 w-72 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 transition-colors duration-200"
                  onMouseLeave={closeDropdowns}
                >
                  <div className="space-y-1">
                    {solutions.map((solution) => (
                      <div key={solution.name}>
                        {solution.available ? (
                          <a
                            href={solution.href}
                            className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition-colors"
                          >
                            {solution.name}
                          </a>
                        ) : (
                          <div className="flex items-center justify-between px-4 py-2 text-sm text-gray-500 dark:text-gray-400">
                            <span>{solution.name}</span>
                            <span className="bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300 text-xs px-2 py-1 rounded-full font-medium">
                              Coming Soon
                            </span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-gray-200 dark:border-gray-700 mt-2 pt-2">
                    <a
                      href="/products"
                      className="flex items-center justify-end px-4 py-2 text-sm font-medium text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors"
                    >
                      See All Products →
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Learning Centre Dropdown */}
            <div className="relative">
              <button
                onMouseEnter={() => setOpenDropdown("learning")}
                className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <span>Learning Centre</span>
                <ChevronDown className="w-4 h-4" />
              </button>

              {openDropdown === "learning" && (
                <div
                  className="absolute top-full left-0 mt-1 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 transition-colors duration-200"
                  onMouseLeave={closeDropdowns}
                >
                  <div className="space-y-1">
                    {learningCentre.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition-colors"
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Simple Navigation Links */}
            <a
              href="/about"
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              About Us
            </a>
            <a
              href="/support"
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              Support
            </a>
            <a
              href="/contact"
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              Contact
            </a>
            <a
              href="/vision"
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              Vision & Mission
            </a>
          </nav>

          {/* Right Section - CTA Buttons + Theme Toggle */}
          <div className="hidden lg:flex items-center space-x-3">
            <Button
              className="bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white rounded-lg px-6 py-2 text-sm font-medium transition-all duration-200 shadow-md hover:shadow-lg"
              asChild
            >
                              <a href="/zaza-promptly-site">Try Zaza Promptly</a>
            </Button>
            <Button
              className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-lg px-6 py-2 text-sm font-medium transition-all duration-200 shadow-md hover:shadow-lg"
              asChild
            >
                              <a href="/zaza-teach-website">Try Zaza Teach</a>
            </Button>
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 transition-colors duration-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {/* Mobile Navigation Links */}
              <div className="space-y-1">
                <button
                  onClick={() => setOpenDropdown(openDropdown === "solutions" ? null : "solutions")}
                  className="flex items-center justify-between w-full px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <span>Our Solutions</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${openDropdown === "solutions" ? "rotate-180" : ""}`}
                  />
                </button>
                {openDropdown === "solutions" && (
                  <div className="pl-4 space-y-1">
                    {solutions.map((solution) => (
                      <div key={solution.name}>
                        {solution.available ? (
                          <a
                            href={solution.href}
                            onClick={closeMobileMenu}
                            className="block px-3 py-2 rounded-md text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                          >
                            {solution.name}
                          </a>
                        ) : (
                          <div className="flex items-center justify-between px-3 py-2 rounded-md text-sm text-gray-500 dark:text-gray-400">
                            <span>{solution.name}</span>
                            <span className="bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300 text-xs px-2 py-1 rounded-full font-medium">
                              Coming Soon
                            </span>
                          </div>
                        )}
                      </div>
                    ))}
                    <a
                      href="/products"
                      onClick={closeMobileMenu}
                      className="block px-3 py-2 rounded-md text-sm font-medium text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors"
                    >
                      See All Products →
                    </a>
                  </div>
                )}

                <button
                  onClick={() => setOpenDropdown(openDropdown === "learning" ? null : "learning")}
                  className="flex items-center justify-between w-full px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <span>Learning Centre</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${openDropdown === "learning" ? "rotate-180" : ""}`}
                  />
                </button>
                {openDropdown === "learning" && (
                  <div className="pl-4 space-y-1">
                    {learningCentre.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        onClick={closeMobileMenu}
                        className="block px-3 py-2 rounded-md text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                )}

                <a
                  href="/about"
                  onClick={closeMobileMenu}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  About Us
                </a>
                <a
                  href="/support"
                  onClick={closeMobileMenu}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  Support
                </a>
                <a
                  href="/contact"
                  onClick={closeMobileMenu}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  Contact
                </a>
                <a
                  href="/vision"
                  onClick={closeMobileMenu}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  Vision & Mission
                </a>
              </div>

              {/* Mobile CTA Buttons + Theme Toggle */}
              <div className="pt-4 space-y-2">
                <Button
                  className="w-full bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white rounded-lg py-2 text-sm font-medium transition-all duration-200"
                  asChild
                >
                  <a href="/zaza-promptly-site" onClick={closeMobileMenu}>
                    Try Zaza Promptly
                  </a>
                </Button>
                <Button
                  className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-lg py-2 text-sm font-medium transition-all duration-200"
                  asChild
                >
                  <a href="/zaza-teach-website" onClick={closeMobileMenu}>
                    Try Zaza Teach
                  </a>
                </Button>
                <div className="flex justify-center pt-2">
                  <ThemeToggle />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
