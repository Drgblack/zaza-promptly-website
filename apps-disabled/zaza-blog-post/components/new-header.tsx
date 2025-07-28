"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"

export function NewHeader() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const pathname = usePathname()

  // Dark mode logic
  useEffect(() => {
    // Check localStorage and system preference on mount
    const stored = localStorage.getItem("theme")
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

    const shouldBeDark = stored ? stored === "dark" : systemPrefersDark
    setIsDarkMode(shouldBeDark)

    // Apply to document
    if (shouldBeDark) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [])

  const toggleDarkMode = () => {
    const newMode = !isDarkMode
    setIsDarkMode(newMode)
    localStorage.setItem("theme", newMode ? "dark" : "light")

    if (newMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false)
    setActiveDropdown(null)
  }, [pathname])

  const solutionsItems = [
    { name: "Zaza Promptly", href: "https://zazapromptly.com", external: true, comingSoon: false },
    { name: "Zaza Teach", href: "https://zazateach.com", external: true, comingSoon: false },
            { name: "Zaza Study", href: "/zaza-study-landing", external: false, comingSoon: true },
            { name: "Zaza Visuals", href: "/zaza-visuals-landing (1)", external: false, comingSoon: true },
    { name: "Zaza Coach", href: "/zaza-coach", external: false, comingSoon: true },
    { name: "Zaza ClarityDeck", href: "/zaza-claritydeck", external: false, comingSoon: true },
    { name: "Zaza Schwoop", href: "/zaza-schwoop", external: false, comingSoon: true },
    { name: "Zaza HR Spark", href: "/zaza-hr-spark", external: false, comingSoon: true },
  ]

  const learningItems = [
    { name: "Blog", href: "/blog", external: false },
    { name: "Free Resources", href: "/resources", external: false },
    { name: "FAQs", href: "/faq", external: false },
    { name: "Privacy & Data Policy", href: "/privacy", external: false },
  ]

  const aboutItems = [
    { name: "Vision & Mission", href: "/vision", external: false },
    { name: "Zaza Product List", href: "/products", external: false },
    { name: "Why Not Just Use ChatGPT?", href: "/why-not-chatgpt", external: false },
    { name: "About the Founder", href: "/founder", external: false },
    { name: "Zaza Quote Wall", href: "/quotes", external: false },
    { name: "Zaza Feature Request", href: "/feature-request", external: false },
    { name: "Support", href: "/support", external: false },
    { name: "Contact", href: "/contact", external: false },
  ]

  const navItems = [
    { name: "Our Solutions", hasDropdown: true, dropdownItems: solutionsItems },
    { name: "Learning Centre", hasDropdown: true, dropdownItems: learningItems },
    { name: "About Us", hasDropdown: true, dropdownItems: aboutItems },
  ]

  const isCurrentPage = (href: string) => {
    return pathname === href || pathname?.startsWith(href + "/")
  }

  const handleDropdownToggle = (itemName: string) => {
    setActiveDropdown(activeDropdown === itemName ? null : itemName)
  }

  const LinkComponent = ({
    href,
    external,
    children,
    className,
    onClick,
  }: {
    href: string
    external?: boolean
    children: React.ReactNode
    className?: string
    onClick?: () => void
  }) => {
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={className} onClick={onClick}>
          {children}
        </a>
      )
    }
    return (
      <Link href={href} className={className} onClick={onClick}>
        {children}
      </Link>
    )
  }

  return (
    <header
      className={`sticky top-0 z-50 bg-white dark:bg-[#111827] transition-all duration-300 ${
        isScrolled
          ? "shadow-sm border-b border-gray-200 dark:border-gray-700"
          : "border-b border-gray-200 dark:border-gray-700"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a
            href="https://zazatechnologies.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-3 hover:opacity-80 transition-opacity group"
          >
            <Image src="/zaza-logo.png" alt="Zaza Technologies" width={32} height={32} className="rounded-lg" />
            <span className="text-xl font-bold text-slate-800 dark:text-white group-hover:underline">
              Zaza Technologies
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <div key={item.name} className="relative group">
                <button
                  className="flex items-center space-x-1 text-sm font-medium text-slate-800 dark:text-white hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200"
                  onMouseEnter={() => setActiveDropdown(item.name)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <span>{item.name}</span>
                  <svg
                    className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {item.hasDropdown && item.dropdownItems && (
                  <div
                    className={`absolute top-full left-0 mt-2 w-72 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-200 ${
                      activeDropdown === item.name
                        ? "opacity-100 visible translate-y-0"
                        : "opacity-0 invisible translate-y-2"
                    }`}
                    onMouseEnter={() => setActiveDropdown(item.name)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <div className="p-2">
                      {item.dropdownItems.map((dropdownItem) => (
                        <LinkComponent
                          key={dropdownItem.name}
                          href={dropdownItem.href}
                          external={dropdownItem.external}
                          className="flex items-center justify-between w-full px-3 py-2 text-sm text-slate-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-gray-800 rounded-md transition-colors duration-200 group/item"
                        >
                          <span>{dropdownItem.name}</span>
                          {dropdownItem.comingSoon && (
                            <span className="bg-purple-200 dark:bg-purple-900 text-purple-800 dark:text-purple-200 text-xs px-2 py-0.5 rounded-full ml-2 group-hover/item:bg-purple-300 dark:group-hover/item:bg-purple-800">
                              Coming Soon
                            </span>
                          )}
                          {dropdownItem.external && (
                            <svg
                              className="w-3 h-3 ml-1 opacity-50"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                              />
                            </svg>
                          )}
                        </LinkComponent>
                      ))}
                      {item.name === "Our Solutions" && (
                        <>
                          <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>
                          <Link
                            href="/products"
                            className="flex items-center w-full px-3 py-2 text-sm font-medium text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 hover:bg-purple-50 dark:hover:bg-gray-800 rounded-md transition-colors duration-200"
                          >
                            <span>See All Products</span>
                            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

          {/* Right Section: Dark Mode Toggle + CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-3">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="relative inline-flex items-center justify-center w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
              aria-label="Toggle Dark Mode"
              title="Toggle Dark Mode"
            >
              <div className="relative w-5 h-5">
                {/* Sun Icon */}
                <svg
                  className={`absolute inset-0 w-5 h-5 text-yellow-500 transition-all duration-300 ${
                    isDarkMode ? "opacity-0 rotate-90 scale-0" : "opacity-100 rotate-0 scale-100"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                    clipRule="evenodd"
                  />
                </svg>

                {/* Moon Icon */}
                <svg
                  className={`absolute inset-0 w-5 h-5 text-blue-400 transition-all duration-300 ${
                    isDarkMode ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-0"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              </div>
            </button>

            <a
              href="https://zazapromptly.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 dark:from-pink-400 dark:to-purple-500 dark:hover:from-pink-500 dark:hover:to-purple-600 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
            >
              Try Zaza Promptly
            </a>
            <a
              href="https://zazateach.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
            >
              Try Zaza Teach
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-md text-slate-800 dark:text-white hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle mobile menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-200 dark:border-gray-700">
            {/* Mobile Dark Mode Toggle */}
            <div className="flex justify-center mb-4">
              <button
                onClick={toggleDarkMode}
                className="relative inline-flex items-center justify-center w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
                aria-label="Toggle Dark Mode"
                title="Toggle Dark Mode"
              >
                <div className="relative w-5 h-5">
                  {/* Sun Icon */}
                  <svg
                    className={`absolute inset-0 w-5 h-5 text-yellow-500 transition-all duration-300 ${
                      isDarkMode ? "opacity-0 rotate-90 scale-0" : "opacity-100 rotate-0 scale-100"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                      clipRule="evenodd"
                    />
                  </svg>

                  {/* Moon Icon */}
                  <svg
                    className={`absolute inset-0 w-5 h-5 text-blue-400 transition-all duration-300 ${
                      isDarkMode ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-0"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                </div>
              </button>
            </div>

            <nav className="flex flex-col space-y-1">
              {navItems.map((item) => (
                <div key={item.name}>
                  <div className="flex items-center justify-between">
                    <span className="flex-1 px-3 py-2 rounded-md text-sm font-medium text-slate-800 dark:text-white">
                      {item.name}
                    </span>
                    {item.hasDropdown && (
                      <button
                        onClick={() => handleDropdownToggle(item.name)}
                        className="p-2 text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                      >
                        <svg
                          className={`w-4 h-4 transition-transform duration-200 ${
                            activeDropdown === item.name ? "rotate-180" : ""
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    )}
                  </div>

                  {/* Mobile Dropdown */}
                  {item.hasDropdown && item.dropdownItems && activeDropdown === item.name && (
                    <div className="ml-4 mt-2 space-y-1">
                      {item.dropdownItems.map((dropdownItem) => (
                        <LinkComponent
                          key={dropdownItem.name}
                          href={dropdownItem.href}
                          external={dropdownItem.external}
                          className="flex items-center justify-between w-full px-3 py-2 text-sm text-slate-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-gray-800 rounded-md transition-colors duration-200"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <span>{dropdownItem.name}</span>
                          {dropdownItem.comingSoon && (
                            <span className="bg-purple-200 dark:bg-purple-900 text-purple-800 dark:text-purple-200 text-xs px-2 py-0.5 rounded-full ml-2">
                              Coming Soon
                            </span>
                          )}
                          {dropdownItem.external && (
                            <svg
                              className="w-3 h-3 ml-1 opacity-50"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                              />
                            </svg>
                          )}
                        </LinkComponent>
                      ))}
                      {item.name === "Our Solutions" && (
                        <Link
                          href="/products"
                          className="flex items-center w-full px-3 py-2 text-sm font-medium text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 hover:bg-purple-50 dark:hover:bg-gray-800 rounded-md transition-colors duration-200"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <span>See All Products</span>
                          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Mobile CTA Buttons */}
            <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700 space-y-3">
              <a
                href="https://zazapromptly.com"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full px-3 py-2 text-center text-sm font-medium text-white bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 dark:from-pink-400 dark:to-purple-500 dark:hover:from-pink-500 dark:hover:to-purple-600 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Try Zaza Promptly
              </a>
              <a
                href="https://zazateach.com"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full px-3 py-2 text-center text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 rounded-lg transition-all duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Try Zaza Teach
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
