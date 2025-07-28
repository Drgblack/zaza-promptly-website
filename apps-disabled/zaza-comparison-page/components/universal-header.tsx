"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { Menu, X, Sun, Moon, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { btnPrimary, btnSecondary } from "../../shared-components/styles/ui"

export function UniversalHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(null)
  const dropdownRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})

  // Initialize dark mode from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme")
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

    if (savedTheme === "dark" || (!savedTheme && systemPrefersDark)) {
      setIsDarkMode(true)
      document.documentElement.classList.add("dark")
    } else {
      setIsDarkMode(false)
      document.documentElement.classList.remove("dark")
    }
  }, [])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
    setOpenMobileDropdown(null)
  }

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

  const handleDropdownToggle = (dropdown: string) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown)
  }

  const handleMobileDropdownToggle = (dropdown: string) => {
    setOpenMobileDropdown(openMobileDropdown === dropdown ? null : dropdown)
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        openDropdown &&
        dropdownRefs.current[openDropdown] &&
        !dropdownRefs.current[openDropdown]?.contains(event.target as Node)
      ) {
        setOpenDropdown(null)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [openDropdown])

  const navigationMenus = {
    solutions: [
      { name: "Zaza Promptly", href: "https://zazapromptly.com", external: true },
      { name: "Zaza Teach", href: "https://zazateach.com", external: true },
      { name: "Zaza Study", href: "https://zazastudy.com", external: true },
      { name: "Zaza Visuals", href: "https://zazavisuals.com", external: true },
      { name: "Zaza Coach", href: "https://zazacoach.com", external: true },
      { name: "Zaza ClarityDeck", href: "https://zazaclaritydeck.com", external: true },
      { name: "Zaza Schwoop", href: "https://zazaschwoop.com", external: true },
      { name: "Zaza HR Spark", href: "https://zazahrspark.com", external: true },
    ],
    learning: [
      { name: "Blog", href: "/blog" },
      { name: "Free Resources", href: "/free-resources" },
      { name: "FAQs", href: "/faqs" },
    ],
    about: [
      { name: "Vision & Mission", href: "/about" },
      { name: "Contact", href: "/contact" },
    ],
  }

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-gray-200/30 bg-white/90 backdrop-blur-lg supports-[backdrop-filter]:bg-white/75 dark:bg-gray-900/90 dark:border-gray-700/30 dark:supports-[backdrop-filter]:bg-gray-900/75 transition-all duration-300 shadow-sm">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          {/* Left - Logo & Brand Name */}
          <Link
            href="https://zazatechnologies.com"
            className="flex items-center gap-3 hover:opacity-80 transition-opacity duration-200 group"
            target="_blank"
            rel="noopener noreferrer"
          >
            {/* Zaza Logo */}
            <div className="w-9 h-9 bg-gradient-to-br from-purple-600 via-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md group-hover:shadow-lg transition-shadow duration-200">
              Z
            </div>
            <span className="text-xl font-semibold text-gray-900 dark:text-white transition-colors duration-300 font-inter">
              Zaza Technologies
            </span>
          </Link>

          {/* Center - Navigation Links (Desktop) */}
          <nav className="hidden lg:flex" aria-label="Main navigation">
            <ul className="flex items-center gap-8">
              {/* Our Solutions Dropdown */}
              <li className="relative" ref={(el) => (dropdownRefs.current.solutions = el)}>
                <button
                  onClick={() => handleDropdownToggle("solutions")}
                  className="flex items-center gap-1 text-gray-700 hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 rounded-md px-3 py-2 font-medium"
                  aria-expanded={openDropdown === "solutions"}
                >
                  Our Solutions
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-200 ${openDropdown === "solutions" ? "rotate-180" : ""}`}
                  />
                </button>
                {openDropdown === "solutions" && (
                  <div className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 py-2 animate-in fade-in-0 zoom-in-95 duration-200 backdrop-blur-sm">
                    {navigationMenus.solutions.map((item, index) => (
                      <Link
                        key={index}
                        href={item.href}
                        className="block px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200 font-medium"
                        onClick={() => setOpenDropdown(null)}
                        {...(item.external && { target: "_blank", rel: "noopener noreferrer" })}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </li>

              {/* Learning Centre Dropdown */}
              <li className="relative" ref={(el) => (dropdownRefs.current.learning = el)}>
                <button
                  onClick={() => handleDropdownToggle("learning")}
                  className="flex items-center gap-1 text-gray-700 hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 rounded-md px-3 py-2 font-medium"
                  aria-expanded={openDropdown === "learning"}
                >
                  Learning Centre
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-200 ${openDropdown === "learning" ? "rotate-180" : ""}`}
                  />
                </button>
                {openDropdown === "learning" && (
                  <div className="absolute top-full left-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 py-2 animate-in fade-in-0 zoom-in-95 duration-200 backdrop-blur-sm">
                    {navigationMenus.learning.map((item, index) => (
                      <Link
                        key={index}
                        href={item.href}
                        className="block px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200 font-medium"
                        onClick={() => setOpenDropdown(null)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </li>

              {/* About Us Dropdown */}
              <li className="relative" ref={(el) => (dropdownRefs.current.about = el)}>
                <button
                  onClick={() => handleDropdownToggle("about")}
                  className="flex items-center gap-1 text-gray-700 hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 rounded-md px-3 py-2 font-medium"
                  aria-expanded={openDropdown === "about"}
                >
                  About Us
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-200 ${openDropdown === "about" ? "rotate-180" : ""}`}
                  />
                </button>
                {openDropdown === "about" && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 py-2 animate-in fade-in-0 zoom-in-95 duration-200 backdrop-blur-sm">
                    {navigationMenus.about.map((item, index) => (
                      <Link
                        key={index}
                        href={item.href}
                        className="block px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200 font-medium"
                        onClick={() => setOpenDropdown(null)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </li>
            </ul>
          </nav>

          {/* Right - Dark Mode Toggle & CTA Buttons */}
          <div className="flex items-center gap-4">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="hidden sm:flex p-2.5 text-gray-600 hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 rounded-lg transition-colors duration-200 hover:bg-purple-50 dark:hover:bg-purple-900/20"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            {/* CTA Buttons (Desktop) */}
            <div className="hidden md:flex items-center gap-3">
              <Button
                asChild
                className={btnPrimary}
              >
                <Link href="https://zazateach.com" target="_blank" rel="noopener noreferrer">
                  Try Zaza Teach
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className={btnSecondary}
              >
                <Link href="/waitlist">Join Waitlist</Link>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden p-2.5 text-gray-600 hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 rounded-lg transition-colors duration-200 hover:bg-purple-50 dark:hover:bg-purple-900/20"
              aria-label="Toggle mobile menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 dark:border-gray-700 bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg transition-colors duration-300">
            <div className="px-6 py-6 space-y-6">
              {/* Mobile Navigation Links */}
              <nav className="space-y-4">
                {/* Our Solutions Mobile Dropdown */}
                <div>
                  <button
                    onClick={() => handleMobileDropdownToggle("solutions")}
                    className="flex items-center justify-between w-full text-left text-gray-700 hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400 py-3 transition-colors duration-200 font-semibold text-lg"
                  >
                    Our Solutions
                    <ChevronDown
                      className={`h-5 w-5 transition-transform duration-200 ${openMobileDropdown === "solutions" ? "rotate-180" : ""}`}
                    />
                  </button>
                  {openMobileDropdown === "solutions" && (
                    <div className="pl-4 mt-3 space-y-3 animate-in fade-in-0 slide-in-from-top-2 duration-200">
                      {navigationMenus.solutions.map((item, index) => (
                        <Link
                          key={index}
                          href={item.href}
                          className="block py-2 text-gray-600 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400 transition-colors duration-200 font-medium"
                          onClick={() => setIsMobileMenuOpen(false)}
                          {...(item.external && { target: "_blank", rel: "noopener noreferrer" })}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                {/* Learning Centre Mobile Dropdown */}
                <div>
                  <button
                    onClick={() => handleMobileDropdownToggle("learning")}
                    className="flex items-center justify-between w-full text-left text-gray-700 hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400 py-3 transition-colors duration-200 font-semibold text-lg"
                  >
                    Learning Centre
                    <ChevronDown
                      className={`h-5 w-5 transition-transform duration-200 ${openMobileDropdown === "learning" ? "rotate-180" : ""}`}
                    />
                  </button>
                  {openMobileDropdown === "learning" && (
                    <div className="pl-4 mt-3 space-y-3 animate-in fade-in-0 slide-in-from-top-2 duration-200">
                      {navigationMenus.learning.map((item, index) => (
                        <Link
                          key={index}
                          href={item.href}
                          className="block py-2 text-gray-600 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400 transition-colors duration-200 font-medium"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                {/* About Us Mobile Dropdown */}
                <div>
                  <button
                    onClick={() => handleMobileDropdownToggle("about")}
                    className="flex items-center justify-between w-full text-left text-gray-700 hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400 py-3 transition-colors duration-200 font-semibold text-lg"
                  >
                    About Us
                    <ChevronDown
                      className={`h-5 w-5 transition-transform duration-200 ${openMobileDropdown === "about" ? "rotate-180" : ""}`}
                    />
                  </button>
                  {openMobileDropdown === "about" && (
                    <div className="pl-4 mt-3 space-y-3 animate-in fade-in-0 slide-in-from-top-2 duration-200">
                      {navigationMenus.about.map((item, index) => (
                        <Link
                          key={index}
                          href={item.href}
                          className="block py-2 text-gray-600 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400 transition-colors duration-200 font-medium"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </nav>

              {/* Mobile Dark Mode Toggle */}
              <button
                onClick={toggleDarkMode}
                className="flex items-center gap-3 w-full text-left text-gray-700 hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400 py-3 transition-colors duration-200 font-medium"
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                <span>{isDarkMode ? "Light Mode" : "Dark Mode"}</span>
              </button>

              {/* Mobile CTA Buttons */}
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700 space-y-4">
                <Button
                  asChild
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white font-semibold py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
                >
                  <Link
                    href="https://zazateach.com"
                    onClick={() => setIsMobileMenuOpen(false)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Try Zaza Teach
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="w-full border-2 border-purple-600 text-purple-600 hover:bg-purple-50 dark:border-purple-400 dark:text-purple-400 dark:hover:bg-purple-900/20 font-semibold py-3 rounded-lg transition-all duration-200 bg-transparent"
                >
                  <Link href="/waitlist" onClick={() => setIsMobileMenuOpen(false)}>
                    Join Waitlist
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Add Inter font */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        
        .font-inter {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
        }
        
        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
        }
      `}</style>
    </>
  )
}
