"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronDown, Menu, X } from "lucide-react"
import { useState } from "react"
import DarkModeToggle from "./dark-mode-toggle"

export default function ZazaHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navigationItems = [
    { name: "Our Solutions", href: "/solutions", hasDropdown: true },
    { name: "Learning Centre", href: "/learning", hasDropdown: true },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Vision & Mission", href: "/about-us/vision" },
  ]

  const solutionsDropdown = [
    { name: "Zaza Promptly", href: "/zaza-promptly-site", comingSoon: false },
    { name: "Zaza Teach", href: "/zaza-teach-website", comingSoon: false },
            { name: "Zaza Study", href: "/zaza-study-landing", comingSoon: true },
            { name: "Zaza Visuals", href: "/zaza-visuals-landing (1)", comingSoon: true },
    { name: "Zaza Coach", href: "/zaza-coach", comingSoon: true },
            { name: "Zaza ClarityDeck", href: "/claritydeck-landing", comingSoon: true },
    { name: "Zaza Schwoop", href: "/zaza-schwoop", comingSoon: true },
    { name: "Zaza HR Spark", href: "/zaza-hr-spark", comingSoon: true },
  ]

  const learningDropdown = [
    { name: "Blog", href: "/blog" },
    { name: "Free Resources", href: "/resources" },
    { name: "FAQs", href: "/faq" },
    { name: "Privacy & Data Policy", href: "/privacy" },
  ]

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 sticky top-0 z-50 backdrop-blur-sm bg-white/95 dark:bg-gray-900/95 transition-colors duration-200">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <Link href="/" className="flex items-center space-x-3 flex-shrink-0">
            <Image src="/zaza-logo.png" alt="Zaza Technologies Logo" width={32} height={32} className="rounded-lg" />
            <span className="text-xl font-semibold text-gray-900 dark:text-white">Zaza</span>
          </Link>

          {/* Desktop Navigation - Centered */}
          <nav className="hidden lg:flex items-center space-x-8 flex-1 justify-center">
            {navigationItems.map((item) => (
              <div key={item.name} className="relative group">
                <Link
                  href={item.href}
                  className="flex items-center space-x-1 text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors font-medium"
                >
                  <span>{item.name}</span>
                  {item.hasDropdown && <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />}
                </Link>

                {/* Our Solutions Dropdown */}
                {item.name === "Our Solutions" && (
                  <div className="absolute top-full left-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-100 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="p-4">
                      <div className="space-y-2">
                        {solutionsDropdown.map((solution) => (
                          <Link
                            key={solution.name}
                            href={solution.href}
                            className="flex items-center justify-between p-3 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors group/item"
                            title={solution.comingSoon ? "Landing page in development" : undefined}
                          >
                            <span className="text-gray-700 dark:text-gray-300 group-hover/item:text-purple-600 dark:group-hover/item:text-purple-400 font-medium">
                              {solution.name}
                            </span>
                            {solution.comingSoon && (
                              <span className="bg-purple-200 dark:bg-purple-800 text-purple-800 dark:text-purple-200 text-xs px-2 py-0.5 rounded-full ml-2">
                                Coming Soon
                              </span>
                            )}
                          </Link>
                        ))}
                      </div>
                      <div className="border-t border-gray-100 dark:border-gray-700 mt-4 pt-4">
                        <Link
                          href="/products"
                          className="block p-3 text-center text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-lg font-medium transition-colors"
                        >
                          See All Products
                        </Link>
                      </div>
                    </div>
                  </div>
                )}

                {/* Learning Centre Dropdown */}
                {item.name === "Learning Centre" && (
                  <div className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-100 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="p-4">
                      <div className="space-y-2">
                        {learningDropdown.map((learningItem) => (
                          <Link
                            key={learningItem.name}
                            href={learningItem.href}
                            className="block p-3 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors group/item"
                          >
                            <span className="text-gray-700 dark:text-gray-300 group-hover/item:text-purple-600 dark:group-hover/item:text-purple-400 font-medium">
                              {learningItem.name}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Desktop CTA Buttons and Dark Mode Toggle */}
          <div className="hidden lg:flex items-center space-x-3 flex-shrink-0">
            <DarkModeToggle />
            <Button
              asChild
              variant="outline"
              className="border-2 border-transparent bg-gradient-to-r from-pink-100 to-purple-100 dark:from-pink-900/30 dark:to-purple-900/30 text-purple-700 dark:text-purple-300 hover:from-pink-200 hover:to-purple-200 dark:hover:from-pink-800/40 dark:hover:to-purple-800/40 hover:text-purple-800 dark:hover:text-purple-200 font-medium"
            >
                              <Link href="/zaza-teach-website">Try Zaza Teach</Link>
            </Button>
            <Button
              asChild
              className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white border-0"
            >
                              <Link href="/zaza-promptly-site">Try Zaza Promptly</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden p-2 text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
            <nav className="py-4 space-y-2">
              {navigationItems.map((item) => (
                <div key={item.name}>
                  {/* Mobile menu items with dropdowns */}
                  {item.hasDropdown ? (
                    <div className="space-y-2">
                      <div className="px-4 py-3 text-gray-600 dark:text-gray-400 font-medium text-sm uppercase tracking-wide">
                        {item.name}
                      </div>

                      {/* Our Solutions Mobile Dropdown */}
                      {item.name === "Our Solutions" && (
                        <div className="pl-6 space-y-1">
                          {solutionsDropdown.map((solution) => (
                            <Link
                              key={solution.name}
                              href={solution.href}
                              className="flex items-center justify-between px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors rounded-lg mx-2"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              <span className="text-sm">{solution.name}</span>
                              {solution.comingSoon && (
                                <span className="bg-purple-200 dark:bg-purple-800 text-purple-800 dark:text-purple-200 text-xs px-2 py-0.5 rounded-full">
                                  Coming Soon
                                </span>
                              )}
                            </Link>
                          ))}
                          <Link
                            href="/products"
                            className="block px-4 py-2 mx-2 text-center text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-lg font-medium transition-colors text-sm"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            See All Products
                          </Link>
                        </div>
                      )}

                      {/* Learning Centre Mobile Dropdown */}
                      {item.name === "Learning Centre" && (
                        <div className="pl-6 space-y-1">
                          {learningDropdown.map((learningItem) => (
                            <Link
                              key={learningItem.name}
                              href={learningItem.href}
                              className="block px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors rounded-lg mx-2 text-sm"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              {learningItem.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className="flex items-center justify-between px-4 py-3 text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors rounded-lg mx-2"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <span className="font-medium">{item.name}</span>
                    </Link>
                  )}
                </div>
              ))}

              {/* Mobile Dark Mode Toggle and CTA Buttons */}
              <div className="px-2 pt-4 space-y-3 border-t border-gray-100 dark:border-gray-800 mt-4">
                <div className="flex justify-center mb-4">
                  <DarkModeToggle />
                </div>
                <Button
                  asChild
                  variant="outline"
                  className="w-full border-2 border-transparent bg-gradient-to-r from-pink-100 to-purple-100 dark:from-pink-900/30 dark:to-purple-900/30 text-purple-700 dark:text-purple-300 hover:from-pink-200 hover:to-purple-200 dark:hover:from-pink-800/40 dark:hover:to-purple-800/40 hover:text-purple-800 dark:hover:text-purple-200 font-medium"
                >
                  <Link href="/zaza-teach-website" onClick={() => setIsMobileMenuOpen(false)}>
                    Try Zaza Teach
                  </Link>
                </Button>
                <Button
                  asChild
                  className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white border-0"
                >
                  <Link href="/zaza-promptly-site" onClick={() => setIsMobileMenuOpen(false)}>
                    Try Zaza Promptly
                  </Link>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
