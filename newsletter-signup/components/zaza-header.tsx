"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronDown, Menu, X } from "lucide-react"
import Link from "next/link"
import ThemeToggle from "./theme-toggle"

interface ZazaHeaderProps {
  currentPage?: string
}

export default function ZazaHeader({ currentPage }: ZazaHeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  const navItems = [
    {
      name: "Our Solutions",
      href: "/solutions",
      hasDropdown: true,
      dropdownItems: [
        { name: "Zaza Promptly", href: "/zaza-promptly-site", available: true },
        { name: "Zaza Teach", href: "/zaza-teach-website", available: true },
        { name: "Zaza Study", href: "/zaza-study-landing", available: false, comingSoon: true },
        { name: "Zaza Visuals", href: "/zaza-visuals-landing (1)", available: false, comingSoon: true },
        { name: "Zaza Coach", href: "/zaza-coach", available: false, comingSoon: true },
        { name: "Zaza ClarityDeck", href: "/zaza-claritydeck", available: false, comingSoon: true },
        { name: "Zaza Schwoop", href: "/zaza-schwoop", available: false, comingSoon: true },
        { name: "Zaza HR Spark", href: "/zaza-hr-spark", available: false, comingSoon: true },
      ],
      bottomLink: { name: "See All Products", href: "/products" },
    },
    {
      name: "Learning Centre",
      href: "/learning",
      hasDropdown: true,
      dropdownItems: [
        { name: "Blog", href: "/blog", available: true },
        { name: "Free Resources", href: "/resources", available: true },
        { name: "FAQs", href: "/faq", available: true },
        { name: "Privacy & Data Policy", href: "/privacy", available: true },
      ],
    },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Vision & Mission", href: "/vision-mission" },
  ]

  const ctaButtons = [
            { name: "Try Zaza Teach", href: "/zaza-teach-website", variant: "outline" as const },
    { name: "Try Zaza Promptly", href: "/zaza-promptly-site", variant: "default" as const },
  ]

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
    setActiveDropdown(null)
  }

  const handleDropdownToggle = (itemName: string) => {
    setActiveDropdown(activeDropdown === itemName ? null : itemName)
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 shadow-sm transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 rounded-lg overflow-hidden">
              <img src="/images/zaza-logo.png" alt="Zaza Technologies Logo" className="w-full h-full object-cover" />
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-gray-100 font-sans transition-colors duration-200">
              Zaza
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <div key={item.name} className="relative">
                {item.hasDropdown ? (
                  <button
                    onClick={() => handleDropdownToggle(item.name)}
                    className={`flex items-center space-x-1 text-sm font-medium transition-colors hover:text-purple-600 dark:hover:text-purple-400 ${
                      currentPage === item.href
                        ? "text-purple-600 dark:text-purple-400"
                        : "text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    <span>{item.name}</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${activeDropdown === item.name ? "rotate-180" : ""}`}
                    />
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className={`text-sm font-medium transition-colors hover:text-purple-600 dark:hover:text-purple-400 ${
                      currentPage === item.href
                        ? "text-purple-600 dark:text-purple-400"
                        : "text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    {item.name}
                  </Link>
                )}

                {/* Desktop Dropdown Menu */}
                {item.hasDropdown && activeDropdown === item.name && (
                  <div className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50 transition-colors duration-200">
                    <div className="py-1">
                      {item.dropdownItems?.map((dropdownItem, index) => (
                        <div key={index}>
                          <Link
                            href={dropdownItem.href}
                            className="flex items-center justify-between px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                            onClick={() => setActiveDropdown(null)}
                          >
                            <div className="flex items-center">
                              <span>{dropdownItem.name}</span>
                              {dropdownItem.comingSoon && (
                                <span className="bg-purple-200 dark:bg-purple-800 text-purple-800 dark:text-purple-200 text-xs px-2 py-0.5 rounded-full ml-2 transition-colors duration-200">
                                  Coming Soon
                                </span>
                              )}
                            </div>
                          </Link>
                        </div>
                      ))}

                      {item.bottomLink && (
                        <>
                          <div className="border-t border-gray-100 dark:border-gray-700 my-1"></div>
                          <Link
                            href={item.bottomLink.href}
                            className="flex items-center px-4 py-2 text-sm font-medium text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors"
                            onClick={() => setActiveDropdown(null)}
                          >
                            <span>{item.bottomLink.name}</span>
                            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </Link>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Desktop CTA Buttons + Theme Toggle */}
          <div className="hidden lg:flex items-center space-x-3">
            {ctaButtons.map((button) => (
              <Link key={button.name} href={button.href}>
                <Button
                  variant={button.variant}
                  size="sm"
                  className={`font-medium transition-colors duration-200 ${
                    button.variant === "default"
                      ? "bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white"
                      : "border-purple-200 dark:border-purple-700 text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20"
                  }`}
                >
                  {button.name}
                </Button>
              </Link>
            ))}
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-2">
            <ThemeToggle />
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-md text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 transition-colors duration-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <div key={item.name}>
                  {item.hasDropdown ? (
                    <button
                      onClick={() => handleDropdownToggle(item.name)}
                      className={`w-full flex items-center justify-between px-3 py-2 text-base font-medium rounded-md transition-colors ${
                        currentPage === item.href
                          ? "text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20"
                          : "text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                      }`}
                    >
                      <span>{item.name}</span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${activeDropdown === item.name ? "rotate-180" : ""}`}
                      />
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`block px-3 py-2 text-base font-medium rounded-md transition-colors ${
                        currentPage === item.href
                          ? "text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20"
                          : "text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                      }`}
                    >
                      {item.name}
                    </Link>
                  )}

                  {/* Mobile Dropdown */}
                  {item.hasDropdown && activeDropdown === item.name && (
                    <div className="ml-4 mt-2 space-y-1">
                      {item.dropdownItems?.map((dropdownItem, index) => (
                        <div key={index}>
                          <Link
                            href={dropdownItem.href}
                            className="flex items-center justify-between px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-md transition-colors"
                            onClick={() => {
                              setIsMobileMenuOpen(false)
                              setActiveDropdown(null)
                            }}
                          >
                            <div className="flex items-center">
                              <span>{dropdownItem.name}</span>
                              {dropdownItem.comingSoon && (
                                <span className="bg-purple-200 dark:bg-purple-800 text-purple-800 dark:text-purple-200 text-xs px-2 py-0.5 rounded-full ml-2 transition-colors duration-200">
                                  Coming Soon
                                </span>
                              )}
                            </div>
                          </Link>
                        </div>
                      ))}

                      {item.bottomLink && (
                        <>
                          <div className="border-t border-gray-200 dark:border-gray-700 my-2 mx-3"></div>
                          <Link
                            href={item.bottomLink.href}
                            className="flex items-center px-3 py-2 text-sm font-medium text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-md transition-colors"
                            onClick={() => {
                              setIsMobileMenuOpen(false)
                              setActiveDropdown(null)
                            }}
                          >
                            <span>{item.bottomLink.name}</span>
                            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </Link>
                        </>
                      )}
                    </div>
                  )}
                </div>
              ))}

              {/* Mobile CTA Buttons */}
              <div className="pt-4 space-y-2">
                {ctaButtons.map((button) => (
                  <Link key={button.name} href={button.href} className="block">
                    <Button
                      variant={button.variant}
                      size="sm"
                      className={`w-full font-medium transition-colors duration-200 ${
                        button.variant === "default"
                          ? "bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white"
                          : "border-purple-200 dark:border-purple-700 text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20"
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {button.name}
                    </Button>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Backdrop for dropdowns */}
      {activeDropdown && <div className="fixed inset-0 z-40" onClick={() => setActiveDropdown(null)} />}
    </header>
  )
}
