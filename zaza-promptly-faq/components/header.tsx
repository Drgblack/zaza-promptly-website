"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, Sun, Moon, ChevronDown } from "lucide-react"

interface DropdownItem {
  name: string
  href: string
  comingSoon?: boolean
}

interface NavItem {
  name: string
  href: string
  hasDropdown: boolean
  dropdownItems?: DropdownItem[]
}

export function Header() {
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

  const handleDropdownToggle = (itemName: string) => {
    setOpenDropdown(openDropdown === itemName ? null : itemName)
  }

  const handleMobileDropdownToggle = (itemName: string) => {
    setOpenMobileDropdown(openMobileDropdown === itemName ? null : itemName)
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node
      const isInsideDropdown = Object.values(dropdownRefs.current).some((ref) => ref && ref.contains(target))
      if (!isInsideDropdown) {
        setOpenDropdown(null)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const navItems: NavItem[] = [
    {
      name: "Our Solutions",
      href: "#",
      hasDropdown: true,
      dropdownItems: [
        { name: "Zaza Promptly", href: "/zaza-promptly-site" },
        { name: "Zaza Teach", href: "/zaza-teach-website" },
        { name: "Zaza Study", href: "/zaza-study-landing", comingSoon: true },
        { name: "Zaza Visuals", href: "/zaza-visuals-landing (1)", comingSoon: true },
        { name: "Zaza Coach", href: "/zaza-coach", comingSoon: true },
        { name: "Zaza ClarityDeck", href: "/claritydeck-landing", comingSoon: true },
        { name: "Zaza Schwoop", href: "/zaza-schwoop", comingSoon: true },
        { name: "Zaza HR Spark", href: "/zaza-hr-spark", comingSoon: true },
        { name: "See All Products", href: "/products" },
      ],
    },
    {
      name: "Learning Centre",
      href: "#",
      hasDropdown: true,
      dropdownItems: [
        { name: "Promptly Blog", href: "/blog" },
        { name: "Promptly FAQs", href: "/promptly-faq" },
        { name: "Free Resources", href: "/resources" },
        { name: "Privacy & Data Policy", href: "/privacy" },
      ],
    },
    {
      name: "Why Zaza Promptly?",
      href: "#",
      hasDropdown: true,
      dropdownItems: [
        { name: "How It Works", href: "/how-it-works" },
        { name: "Why Not Just Use ChatGPT?", href: "/why-not-chatgpt" },
        { name: "Pricing", href: "/pricing" },
        { name: "Join Waitlist", href: "/waitlist" },
      ],
    },
    {
      name: "About Us",
      href: "#",
      hasDropdown: true,
      dropdownItems: [
        { name: "Company Overview", href: "/about" },
        { name: "Contact", href: "/contact" },
        { name: "Vision & Mission", href: "/mission" },
      ],
    },
  ]

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 dark:bg-[#121212]/90 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-700/50 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Left - Logo and Brand */}
          <a href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <img src="/zaza-icon.png" alt="Zaza Promptly" className="w-8 h-8 rounded-lg" />
            <div className="text-xl font-semibold">
              <span className="text-gray-900 dark:text-[#F3F3F3] transition-colors duration-300">Zaza </span>
              <span className="text-pink-600 dark:text-pink-400 transition-colors duration-300">Promptly</span>
            </div>
          </a>

          {/* Center - Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <div key={item.name} className="relative" ref={(el) => (dropdownRefs.current[item.name] = el)}>
                <button
                  onClick={() => handleDropdownToggle(item.name)}
                  className="flex items-center text-gray-700 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400 font-medium transition-colors duration-300 group"
                  aria-expanded={openDropdown === item.name}
                  aria-haspopup="true"
                >
                  {item.name}
                  <ChevronDown
                    className={`ml-1 h-4 w-4 text-gray-400 dark:text-gray-500 group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-all duration-300 ${
                      openDropdown === item.name ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Desktop Dropdown */}
                {openDropdown === item.name && (
                  <div className="absolute top-full left-0 mt-2 w-64 bg-white/95 dark:bg-[#121212]/95 backdrop-blur-md rounded-lg shadow-lg border border-gray-200/50 dark:border-gray-700/50 py-2 animate-in fade-in-0 zoom-in-95 duration-200">
                    {item.dropdownItems?.map((dropdownItem) => (
                      <a
                        key={dropdownItem.name}
                        href={dropdownItem.comingSoon ? "#" : dropdownItem.href}
                        className={`flex items-center justify-between px-4 py-2 text-sm transition-colors duration-300 ${
                          dropdownItem.comingSoon
                            ? "text-gray-400 dark:text-gray-600 cursor-not-allowed"
                            : "text-gray-700 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400 hover:bg-gray-50/50 dark:hover:bg-gray-800/50"
                        }`}
                        onClick={() => !dropdownItem.comingSoon && setOpenDropdown(null)}
                      >
                        <span>{dropdownItem.name}</span>
                        {dropdownItem.comingSoon && (
                          <span className="bg-purple-200 dark:bg-purple-900/50 text-purple-800 dark:text-purple-300 text-xs px-2 py-0.5 rounded-full ml-2 transition-colors duration-300">
                            Coming Soon
                          </span>
                        )}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right - Dark Mode Toggle and CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 text-gray-600 dark:text-gray-400 hover:text-pink-600 dark:hover:text-pink-400 transition-colors duration-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            {/* CTA Buttons */}
            <Button
              asChild
              className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 dark:from-pink-500 dark:to-purple-500 dark:hover:from-pink-600 dark:hover:to-purple-600 text-white font-semibold px-4 py-2 rounded-md transition-colors duration-300"
            >
                              <a href="/zaza-teach-website">Try Zaza Teach</a>
            </Button>
            <Button
              asChild
              className="bg-pink-600 hover:bg-pink-700 dark:bg-pink-500 dark:hover:bg-pink-600 text-white font-semibold px-4 py-2 rounded-md transition-colors duration-300"
            >
              <a href="/waitlist">Join Waitlist</a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden p-2 text-gray-700 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400 transition-colors duration-300"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200/50 dark:border-gray-700/50 bg-white/95 dark:bg-[#121212]/95 backdrop-blur-md transition-colors duration-300">
            <nav className="py-4 space-y-2">
              {navItems.map((item) => (
                <div key={item.name}>
                  <button
                    onClick={() => handleMobileDropdownToggle(item.name)}
                    className="flex items-center justify-between w-full px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400 hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors duration-300"
                    aria-expanded={openMobileDropdown === item.name}
                  >
                    <span className="font-medium">{item.name}</span>
                    <ChevronDown
                      className={`h-4 w-4 text-gray-400 dark:text-gray-500 transition-transform duration-300 ${
                        openMobileDropdown === item.name ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Mobile Dropdown */}
                  {openMobileDropdown === item.name && (
                    <div className="bg-gray-50/50 dark:bg-gray-800/30 animate-in slide-in-from-top-2 duration-200 transition-colors duration-300">
                      {item.dropdownItems?.map((dropdownItem) => (
                        <a
                          key={dropdownItem.name}
                          href={dropdownItem.comingSoon ? "#" : dropdownItem.href}
                          className={`flex items-center justify-between px-8 py-2 text-sm transition-colors duration-300 ${
                            dropdownItem.comingSoon
                              ? "text-gray-400 dark:text-gray-600 cursor-not-allowed"
                              : "text-gray-600 dark:text-gray-400 hover:text-pink-600 dark:hover:text-pink-400"
                          }`}
                          onClick={() => !dropdownItem.comingSoon && setIsMobileMenuOpen(false)}
                        >
                          <span>{dropdownItem.name}</span>
                          {dropdownItem.comingSoon && (
                            <span className="bg-purple-200 dark:bg-purple-900/50 text-purple-800 dark:text-purple-300 text-xs px-2 py-0.5 rounded-full ml-2 transition-colors duration-300">
                              Coming Soon
                            </span>
                          )}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Mobile CTA Section */}
              <div className="px-4 pt-4 space-y-3 border-t border-gray-200/50 dark:border-gray-700/50 mt-4 transition-colors duration-300">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400 transition-colors duration-300">
                    Theme
                  </span>
                  <button
                    onClick={toggleDarkMode}
                    className="p-2 text-gray-600 dark:text-gray-400 hover:text-pink-600 dark:hover:text-pink-400 transition-colors duration-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                    aria-label="Toggle dark mode"
                  >
                    {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                  </button>
                </div>
                <Button
                  asChild
                  className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 dark:from-pink-500 dark:to-purple-500 dark:hover:from-pink-600 dark:hover:to-purple-600 text-white font-semibold py-2 rounded-md transition-colors duration-300"
                >
                  <a href="/zaza-teach-website">Try Zaza Teach</a>
                </Button>
                <Button
                  asChild
                  className="w-full bg-pink-600 hover:bg-pink-700 dark:bg-pink-500 dark:hover:bg-pink-600 text-white font-semibold py-2 rounded-md transition-colors duration-300"
                >
                  <a href="/waitlist">Join Waitlist</a>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
