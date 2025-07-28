"use client"

import { Button } from "@/components/ui/button"
import { useState, useEffect, useRef } from "react"
import { Sun, Moon, Menu, X, ChevronDown, ChevronRight } from "lucide-react"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [mobileDropdowns, setMobileDropdowns] = useState<{ [key: string]: boolean }>({})
  const dropdownRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})

  useEffect(() => {
    // Check for saved theme preference or default to system preference
    const savedTheme = localStorage.getItem("theme")
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

    if (savedTheme === "dark" || (!savedTheme && systemPrefersDark)) {
      setIsDarkMode(true)
      document.documentElement.classList.add("dark")
    } else {
      setIsDarkMode(false)
      document.documentElement.classList.remove("dark")
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (
        activeDropdown &&
        dropdownRefs.current[activeDropdown] &&
        !dropdownRefs.current[activeDropdown]?.contains(event.target as Node)
      ) {
        setActiveDropdown(null)
      }
    }

    window.addEventListener("scroll", handleScroll)
    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [activeDropdown])

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
    setMobileDropdowns({})
  }

  const handleDropdownToggle = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown)
  }

  const toggleMobileDropdown = (dropdown: string) => {
    setMobileDropdowns((prev) => ({
      ...prev,
      [dropdown]: !prev[dropdown],
    }))
  }

  const ComingSoonBadge = () => (
    <span className="bg-purple-200 dark:bg-purple-800 text-purple-800 dark:text-purple-200 text-xs px-2 py-0.5 rounded-full ml-2 transition-colors duration-300">
      Coming Soon
    </span>
  )

  const dropdownMenus = {
    solutions: [
      { name: "Zaza Promptly", href: "/zaza-promptly-site" },
      { name: "Zaza Teach", href: "/zaza-teach-website" },
              { name: "Zaza Study", href: "/zaza-study-landing", comingSoon: true },
              { name: "Zaza Visuals", href: "/zaza-visuals-landing (1)", comingSoon: true },
      { name: "Zaza Coach", href: "/zaza-coach", comingSoon: true },
              { name: "Zaza ClarityDeck", href: "/claritydeck-landing", comingSoon: true },
      { name: "Zaza Schwoop", href: "/zaza-schwoop", comingSoon: true },
      { name: "Zaza HR Spark", href: "/zaza-hr-spark", comingSoon: true },
      { name: "See All Products", href: "/products", separator: true },
    ],
    learning: [
      { name: "Promptly Blog", href: "/blog" },
      { name: "Promptly FAQs", href: "/faq" },
      { name: "Free Resources", href: "/resources" },
      { name: "Privacy & Data Policy", href: "/privacy" },
    ],
    why: [
      { name: "How It Works", href: "/how-it-works" },
      { name: "Pricing", href: "/pricing" },
    ],
    about: [
      { name: "Company Overview", href: "/about" },
      { name: "Contact", href: "/contact" },
      { name: "Vision & Mission", href: "/mission" },
    ],
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 dark:bg-[#121212]/95 backdrop-blur-md shadow-lg"
          : "bg-white/90 dark:bg-[#121212]/90 backdrop-blur-sm"
      }`}
      role="banner"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo and Brand - Left Side */}
          <a
            href="/"
            className="flex items-center space-x-2 md:space-x-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-[#121212] rounded-md transition-colors duration-300 flex-shrink-0"
            aria-label="Go to Zaza Promptly homepage"
          >
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IOS%20App%20icon%20-%201024x1024-eHnj4OltdQLbYrwYvzhe7JPAeEheOz.png"
              alt="Zaza logo"
              className="w-7 h-7 md:w-10 md:h-10 rounded-lg"
            />
            <div className="text-lg md:text-2xl font-bold whitespace-nowrap">
              <span className="text-gray-900 dark:text-gray-100 transition-colors duration-300">Zaza </span>
              <span className="text-pink-600 dark:text-pink-400 transition-colors duration-300">Promptly</span>
            </div>
          </a>

          {/* Navigation Links - Center */}
          <nav
            className="hidden lg:flex items-center space-x-4 xl:space-x-6"
            role="navigation"
            aria-label="Primary navigation"
          >
            {/* Our Solutions Dropdown */}
            <div className="relative" ref={(el) => (dropdownRefs.current.solutions = el)}>
              <button
                onClick={() => handleDropdownToggle("solutions")}
                className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 font-medium transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-[#121212] rounded-md px-2 py-2 flex items-center space-x-1 text-sm xl:text-base whitespace-nowrap"
                aria-expanded={activeDropdown === "solutions"}
                aria-haspopup="true"
              >
                <span>Our Solutions</span>
                <ChevronDown
                  className={`w-3 h-3 xl:w-4 xl:h-4 transition-transform duration-200 ${activeDropdown === "solutions" ? "rotate-180" : ""}`}
                />
              </button>
              {activeDropdown === "solutions" && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-[#1e1e1e] rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 animate-in fade-in-0 zoom-in-95 duration-200 transition-colors z-50">
                  {dropdownMenus.solutions.map((item, index) => (
                    <div key={index}>
                      {item.separator && <hr className="my-2 border-gray-200 dark:border-gray-700" />}
                      <a
                        href={item.href}
                        className="flex items-center justify-between px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300"
                      >
                        <span>{item.name}</span>
                        {item.comingSoon && <ComingSoonBadge />}
                      </a>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Learning Centre Dropdown */}
            <div className="relative" ref={(el) => (dropdownRefs.current.learning = el)}>
              <button
                onClick={() => handleDropdownToggle("learning")}
                className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 font-medium transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-[#121212] rounded-md px-2 py-2 flex items-center space-x-1 text-sm xl:text-base whitespace-nowrap"
                aria-expanded={activeDropdown === "learning"}
                aria-haspopup="true"
              >
                <span>Learning Centre</span>
                <ChevronDown
                  className={`w-3 h-3 xl:w-4 xl:h-4 transition-transform duration-200 ${activeDropdown === "learning" ? "rotate-180" : ""}`}
                />
              </button>
              {activeDropdown === "learning" && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-white dark:bg-[#1e1e1e] rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 animate-in fade-in-0 zoom-in-95 duration-200 transition-colors z-50">
                  {dropdownMenus.learning.map((item, index) => (
                    <a
                      key={index}
                      href={item.href}
                      className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Why Zaza Promptly Dropdown */}
            <div className="relative" ref={(el) => (dropdownRefs.current.why = el)}>
              <button
                onClick={() => handleDropdownToggle("why")}
                className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 font-medium transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-[#121212] rounded-md px-2 py-2 flex items-center space-x-1 text-sm xl:text-base whitespace-nowrap"
                aria-expanded={activeDropdown === "why"}
                aria-haspopup="true"
              >
                <span>Why Zaza Promptly?</span>
                <ChevronDown
                  className={`w-3 h-3 xl:w-4 xl:h-4 transition-transform duration-200 ${activeDropdown === "why" ? "rotate-180" : ""}`}
                />
              </button>
              {activeDropdown === "why" && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-white dark:bg-[#1e1e1e] rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 animate-in fade-in-0 zoom-in-95 duration-200 transition-colors z-50">
                  {dropdownMenus.why.map((item, index) => (
                    <a
                      key={index}
                      href={item.href}
                      className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* About Us Dropdown */}
            <div className="relative" ref={(el) => (dropdownRefs.current.about = el)}>
              <button
                onClick={() => handleDropdownToggle("about")}
                className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 font-medium transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-[#121212] rounded-md px-2 py-2 flex items-center space-x-1 text-sm xl:text-base whitespace-nowrap"
                aria-expanded={activeDropdown === "about"}
                aria-haspopup="true"
              >
                <span>About Us</span>
                <ChevronDown
                  className={`w-3 h-3 xl:w-4 xl:h-4 transition-transform duration-200 ${activeDropdown === "about" ? "rotate-180" : ""}`}
                />
              </button>
              {activeDropdown === "about" && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-[#1e1e1e] rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 animate-in fade-in-0 zoom-in-95 duration-200 transition-colors z-50">
                  {dropdownMenus.about.map((item, index) => (
                    <a
                      key={index}
                      href={item.href}
                      className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-2 md:space-x-3 flex-shrink-0">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-[#121212] rounded-md"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <Sun className="w-4 h-4 md:w-5 md:h-5" /> : <Moon className="w-4 h-4 md:w-5 md:h-5" />}
            </button>

            {/* CTA Buttons - Hidden on small screens */}
            <div className="hidden md:flex items-center space-x-2">
              <Button
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold px-3 py-2 text-sm rounded-md transition-all duration-300 hover:scale-105 whitespace-nowrap"
                asChild
              >
                <a href="/zaza-teach-website">Try Zaza Teach</a>
              </Button>
              <Button
                className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold px-3 py-2 text-sm rounded-md transition-colors duration-300 whitespace-nowrap"
                asChild
              >
                <a href="/signup">Try Zaza Promptly</a>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden p-2 text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-[#121212] rounded-md"
              aria-label="Toggle mobile menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5 md:w-6 md:h-6" /> : <Menu className="w-5 h-5 md:w-6 md:h-6" />}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-200 dark:border-gray-700 bg-white/95 dark:bg-[#121212]/95 backdrop-blur-md transition-colors duration-300">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {/* Mobile Our Solutions */}
            <div>
              <button
                onClick={() => toggleMobileDropdown("solutions")}
                className="flex items-center justify-between w-full px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md font-medium transition-colors duration-300"
              >
                <span>Our Solutions</span>
                <ChevronRight
                  className={`w-4 h-4 transition-transform duration-200 ${mobileDropdowns.solutions ? "rotate-90" : ""}`}
                />
              </button>
              {mobileDropdowns.solutions && (
                <div className="ml-4 mt-2 space-y-1">
                  {dropdownMenus.solutions.map((item, index) => (
                    <a
                      key={index}
                      href={item.href}
                      className="flex items-center justify-between px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md transition-colors duration-300"
                    >
                      <span>{item.name}</span>
                      {item.comingSoon && <ComingSoonBadge />}
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Learning Centre */}
            <div>
              <button
                onClick={() => toggleMobileDropdown("learning")}
                className="flex items-center justify-between w-full px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md font-medium transition-colors duration-300"
              >
                <span>Learning Centre</span>
                <ChevronRight
                  className={`w-4 h-4 transition-transform duration-200 ${mobileDropdowns.learning ? "rotate-90" : ""}`}
                />
              </button>
              {mobileDropdowns.learning && (
                <div className="ml-4 mt-2 space-y-1">
                  {dropdownMenus.learning.map((item, index) => (
                    <a
                      key={index}
                      href={item.href}
                      className="block px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md transition-colors duration-300"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Why Zaza Promptly */}
            <div>
              <button
                onClick={() => toggleMobileDropdown("why")}
                className="flex items-center justify-between w-full px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md font-medium transition-colors duration-300"
              >
                <span>Why Zaza Promptly?</span>
                <ChevronRight
                  className={`w-4 h-4 transition-transform duration-200 ${mobileDropdowns.why ? "rotate-90" : ""}`}
                />
              </button>
              {mobileDropdowns.why && (
                <div className="ml-4 mt-2 space-y-1">
                  {dropdownMenus.why.map((item, index) => (
                    <a
                      key={index}
                      href={item.href}
                      className="block px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md transition-colors duration-300"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile About Us */}
            <div>
              <button
                onClick={() => toggleMobileDropdown("about")}
                className="flex items-center justify-between w-full px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md font-medium transition-colors duration-300"
              >
                <span>About Us</span>
                <ChevronRight
                  className={`w-4 h-4 transition-transform duration-200 ${mobileDropdowns.about ? "rotate-90" : ""}`}
                />
              </button>
              {mobileDropdowns.about && (
                <div className="ml-4 mt-2 space-y-1">
                  {dropdownMenus.about.map((item, index) => (
                    <a
                      key={index}
                      href={item.href}
                      className="block px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md transition-colors duration-300"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile CTAs */}
            <div className="pt-4 space-y-2">
              <Button
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-2 rounded-md transition-all duration-300"
                asChild
              >
                <a href="/zaza-teach-website">Try Zaza Teach</a>
              </Button>
              <Button
                className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold py-2 rounded-md transition-colors duration-300"
                asChild
              >
                <a href="/signup">Try Zaza Promptly</a>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
