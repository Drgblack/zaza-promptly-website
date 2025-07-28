"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronDown, Menu, X, Sun, Moon } from "lucide-react"

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Initialize theme on mount
  useEffect(() => {
    const initializeTheme = () => {
      const savedTheme = localStorage.getItem("theme")
      const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

      const shouldBeDark = savedTheme === "dark" || (!savedTheme && systemPrefersDark)

      setIsDarkMode(shouldBeDark)

      if (shouldBeDark) {
        document.documentElement.classList.add("dark")
      } else {
        document.documentElement.classList.remove("dark")
      }

      setMounted(true)
    }

    initializeTheme()
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

  const handleDropdownToggle = (dropdownName: string) => {
    setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName)
  }

  const closeAllDropdowns = () => {
    setActiveDropdown(null)
    setIsMobileMenuOpen(false)
  }

  const navigationItems = [
    { name: "Our Solutions", href: "#", hasDropdown: true },
    { name: "Learning Centre", href: "#", hasDropdown: true },
    { name: "About Us", href: "#", hasDropdown: true },
  ]

  const solutionsDropdown = [
    { name: "Zaza Promptly", href: "https://zazapromptly.com", comingSoon: false, external: true },
    { name: "Zaza Teach", href: "https://zazateach.com", comingSoon: false, external: true },
    { name: "Zaza Study", href: "#", comingSoon: true, external: false },
    { name: "Zaza Visuals", href: "#", comingSoon: true, external: false },
    { name: "Zaza Coach", href: "#", comingSoon: true, external: false },
    { name: "Zaza ClarityDeck", href: "#", comingSoon: true, external: false },
    { name: "Zaza Schwoop", href: "#", comingSoon: true, external: false },
    { name: "Zaza HR Spark", href: "#", comingSoon: true, external: false },
  ]

  const learningCentreDropdown = [
    { name: "Blog", href: "/blog", external: false },
    { name: "Free Resources", href: "/resources", external: false },
    { name: "FAQs", href: "/faqs", external: false },
    { name: "Privacy & Data Policy", href: "/privacy", external: false },
  ]

  const aboutUsDropdown = [
    { name: "Vision & Mission", href: "/mission", external: false },
    { name: "Zaza Product List", href: "/products", external: false },
    { name: "Why Not Just Use ChatGPT?", href: "/why-not-chatgpt", external: false },
    { name: "About the Founder", href: "/founder-manifesto", external: false },
    { name: "Zaza Quote Wall", href: "/quote-wall", external: false },
    { name: "Zaza Feature Request", href: "/feature-request", external: false },
    { name: "Support", href: "/support", external: false },
    { name: "Contact", href: "/contact", external: false },
  ]

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gray-200 rounded-lg animate-pulse" />
              <div className="w-32 h-6 bg-gray-200 rounded animate-pulse" />
            </div>
            <div className="hidden lg:flex items-center space-x-8">
              <div className="w-24 h-4 bg-gray-200 rounded animate-pulse" />
              <div className="w-24 h-4 bg-gray-200 rounded animate-pulse" />
              <div className="w-24 h-4 bg-gray-200 rounded animate-pulse" />
            </div>
            <div className="hidden lg:flex items-center space-x-3">
              <div className="w-10 h-10 bg-gray-200 rounded-lg animate-pulse" />
              <div className="w-32 h-8 bg-gray-200 rounded-lg animate-pulse" />
              <div className="w-24 h-8 bg-gray-200 rounded-lg animate-pulse" />
            </div>
          </div>
        </div>
      </header>
    )
  }

  const renderLink = (
    item: { name: string; href: string; external?: boolean; comingSoon?: boolean },
    className: string,
    onClick?: () => void,
  ) => {
    if (item.external) {
      return (
        <a href={item.href} className={className} onClick={onClick} target="_blank" rel="noopener noreferrer">
          {item.name}
          {item.comingSoon && (
            <span className="bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 text-xs px-2 py-0.5 rounded-full ml-2">
              Coming Soon
            </span>
          )}
        </a>
      )
    }

    return (
      <Link href={item.href} className={className} onClick={onClick}>
        {item.name}
        {item.comingSoon && (
          <span className="bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 text-xs px-2 py-0.5 rounded-full ml-2">
            Coming Soon
          </span>
        )}
      </Link>
    )
  }

  return (
    <header className="bg-white dark:bg-[#111827] border-b border-gray-100 dark:border-gray-800 sticky top-0 z-50 shadow-sm dark:shadow-gray-900/20 transition-all duration-300">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left Section - Logo */}
          <a
            href="https://zazatechnologies.com"
            className="flex items-center space-x-3 hover:opacity-80 transition-opacity group"
            onClick={closeAllDropdowns}
          >
            <Image
              src="/images/zaza-logo.png"
              alt="Zaza Technologies Logo"
              width={32}
              height={32}
              className="rounded-lg"
            />
            <span className="text-xl font-bold text-slate-800 dark:text-white group-hover:underline decoration-2 underline-offset-4">
              Zaza Technologies
            </span>
          </a>

          {/* Center Navigation - Desktop */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <div key={item.name} className="relative group">
                <button
                  className="flex items-center space-x-1 text-slate-800 dark:text-white hover:text-purple-600 dark:hover:text-purple-400 transition-colors font-medium py-2 hover:underline decoration-2 underline-offset-4"
                  onMouseEnter={() => item.hasDropdown && setActiveDropdown(item.name)}
                  onClick={() => item.hasDropdown && handleDropdownToggle(item.name)}
                >
                  <span>{item.name}</span>
                  {item.hasDropdown && (
                    <ChevronDown
                      className={`h-4 w-4 opacity-60 transition-transform duration-200 ${
                        activeDropdown === item.name ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </button>

                {/* Our Solutions Dropdown */}
                {item.name === "Our Solutions" && (
                  <div
                    className={`absolute top-full left-0 w-72 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-lg shadow-lg dark:shadow-gray-900/20 transition-all duration-200 mt-1 ${
                      activeDropdown === "Our Solutions" ? "opacity-100 visible" : "opacity-0 invisible"
                    }`}
                    onMouseEnter={() => setActiveDropdown("Our Solutions")}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <div className="p-2">
                      {solutionsDropdown.map((solution) => (
                        <div key={solution.name}>
                          {renderLink(
                            solution,
                            "flex items-center justify-between px-3 py-2 text-slate-800 dark:text-white hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors group/item font-medium",
                            closeAllDropdowns,
                          )}
                        </div>
                      ))}
                      <div className="border-t border-gray-100 dark:border-gray-700 mt-2 pt-2">
                        <Link
                          href="/products"
                          className="block px-3 py-2 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-lg transition-colors font-medium text-sm"
                          onClick={closeAllDropdowns}
                        >
                          See All Products →
                        </Link>
                      </div>
                    </div>
                  </div>
                )}

                {/* Learning Centre Dropdown */}
                {item.name === "Learning Centre" && (
                  <div
                    className={`absolute top-full left-0 w-56 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-lg shadow-lg dark:shadow-gray-900/20 transition-all duration-200 mt-1 ${
                      activeDropdown === "Learning Centre" ? "opacity-100 visible" : "opacity-0 invisible"
                    }`}
                    onMouseEnter={() => setActiveDropdown("Learning Centre")}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <div className="p-2">
                      {learningCentreDropdown.map((item) => (
                        <div key={item.name}>
                          {renderLink(
                            item,
                            "block px-3 py-2 text-slate-800 dark:text-white hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors font-medium",
                            closeAllDropdowns,
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* About Us Dropdown */}
                {item.name === "About Us" && (
                  <div
                    className={`absolute top-full left-0 w-64 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-lg shadow-lg dark:shadow-gray-900/20 transition-all duration-200 mt-1 ${
                      activeDropdown === "About Us" ? "opacity-100 visible" : "opacity-0 invisible"
                    }`}
                    onMouseEnter={() => setActiveDropdown("About Us")}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <div className="p-2">
                      {aboutUsDropdown.map((item) => (
                        <div key={item.name}>
                          {renderLink(
                            item,
                            "block px-3 py-2 text-slate-800 dark:text-white hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors font-medium",
                            closeAllDropdowns,
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right Section - Buttons and Dark Mode Toggle */}
          <div className="hidden lg:flex items-center space-x-3">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="relative inline-flex items-center justify-center w-10 h-10 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
              title="Toggle Dark Mode"
              aria-label="Toggle Dark Mode"
            >
              <div className="relative w-5 h-5">
                <Sun
                  className={`absolute inset-0 w-5 h-5 text-yellow-500 transition-all duration-300 ${
                    !isDarkMode ? "opacity-100 rotate-0 scale-100" : "opacity-0 rotate-90 scale-75"
                  }`}
                />
                <Moon
                  className={`absolute inset-0 w-5 h-5 text-blue-400 transition-all duration-300 ${
                    isDarkMode ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-75"
                  }`}
                />
              </div>
            </button>

            {/* CTA Buttons */}
            <a
              href="https://zazapromptly.com"
              className="px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg hover:opacity-90 transition-opacity font-medium text-sm shadow-sm"
              onClick={closeAllDropdowns}
              target="_blank"
              rel="noopener noreferrer"
            >
              Try Zaza Promptly
            </a>
            <a
              href="https://zazateach.com"
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium text-sm shadow-sm"
              onClick={closeAllDropdowns}
              target="_blank"
              rel="noopener noreferrer"
            >
              Try Zaza Teach
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden p-2 text-slate-800 dark:text-white hover:text-purple-600 dark:hover:text-purple-400 transition-colors rounded-lg"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-[#111827] animate-in slide-in-from-top-2 duration-200">
            <nav className="py-4 space-y-1">
              {navigationItems.map((item) => (
                <div key={item.name}>
                  {item.hasDropdown ? (
                    <div>
                      <button
                        onClick={() => handleDropdownToggle(item.name)}
                        className="flex items-center justify-between w-full px-4 py-3 text-slate-800 dark:text-white hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors font-medium rounded-lg mx-2"
                      >
                        <span>{item.name}</span>
                        <ChevronDown
                          className={`h-4 w-4 opacity-60 transition-transform duration-200 ${
                            activeDropdown === item.name ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      {/* Mobile dropdowns */}
                      {item.name === "Our Solutions" && activeDropdown === "Our Solutions" && (
                        <div className="ml-4 mt-2 space-y-1 animate-in slide-in-from-top-1 duration-200">
                          {solutionsDropdown.map((solution) => (
                            <div key={solution.name}>
                              {renderLink(
                                solution,
                                "flex items-center justify-between px-4 py-2 text-slate-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors rounded-lg mx-2",
                                closeAllDropdowns,
                              )}
                            </div>
                          ))}
                          <Link
                            href="/products"
                            className="block px-4 py-2 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors font-medium text-sm rounded-lg mx-2"
                            onClick={closeAllDropdowns}
                          >
                            See All Products →
                          </Link>
                        </div>
                      )}

                      {item.name === "Learning Centre" && activeDropdown === "Learning Centre" && (
                        <div className="ml-4 mt-2 space-y-1 animate-in slide-in-from-top-1 duration-200">
                          {learningCentreDropdown.map((learningItem) => (
                            <div key={learningItem.name}>
                              {renderLink(
                                learningItem,
                                "block px-4 py-2 text-slate-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors rounded-lg mx-2",
                                closeAllDropdowns,
                              )}
                            </div>
                          ))}
                        </div>
                      )}

                      {item.name === "About Us" && activeDropdown === "About Us" && (
                        <div className="ml-4 mt-2 space-y-1 animate-in slide-in-from-top-1 duration-200">
                          {aboutUsDropdown.map((aboutItem) => (
                            <div key={aboutItem.name}>
                              {renderLink(
                                aboutItem,
                                "block px-4 py-2 text-slate-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors rounded-lg mx-2",
                                closeAllDropdowns,
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className="flex items-center justify-between px-4 py-3 text-slate-800 dark:text-white hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors font-medium rounded-lg mx-2"
                      onClick={closeAllDropdowns}
                    >
                      <span>{item.name}</span>
                    </Link>
                  )}
                </div>
              ))}

              {/* Mobile Dark Mode Toggle and CTA Buttons */}
              <div className="px-2 pt-4 space-y-3 border-t border-gray-100 dark:border-gray-800 mt-4">
                <div className="flex justify-center">
                  <button
                    onClick={toggleDarkMode}
                    className="relative inline-flex items-center justify-center w-10 h-10 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    title="Toggle Dark Mode"
                    aria-label="Toggle Dark Mode"
                  >
                    <div className="relative w-5 h-5">
                      <Sun
                        className={`absolute inset-0 w-5 h-5 text-yellow-500 transition-all duration-300 ${
                          !isDarkMode ? "opacity-100 rotate-0 scale-100" : "opacity-0 rotate-90 scale-75"
                        }`}
                      />
                      <Moon
                        className={`absolute inset-0 w-5 h-5 text-blue-400 transition-all duration-300 ${
                          isDarkMode ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-75"
                        }`}
                      />
                    </div>
                  </button>
                </div>
                <a
                  href="https://zazapromptly.com"
                  className="block w-full px-4 py-3 text-center bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg hover:opacity-90 transition-opacity font-medium shadow-sm"
                  onClick={closeAllDropdowns}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Try Zaza Promptly
                </a>
                <a
                  href="https://zazateach.com"
                  className="block w-full px-4 py-3 text-center bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium shadow-sm"
                  onClick={closeAllDropdowns}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Try Zaza Teach
                </a>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
