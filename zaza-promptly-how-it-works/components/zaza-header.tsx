"use client"

import { Button } from "@/components/ui/button"
import { useState, useEffect, useRef } from "react"
import { Sun, Moon, Menu, X, ChevronDown, ChevronRight } from "lucide-react"

export default function ZazaHeader() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [mobileDropdowns, setMobileDropdowns] = useState<{ [key: string]: boolean }>({})
  const dropdownRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})

  useEffect(() => {
    // Dark mode initialization
    if (
      localStorage.getItem("theme") === "dark" ||
      (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
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
    <span className="bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 text-xs px-2 py-1 rounded-full ml-2 font-medium">
      Coming Soon
    </span>
  )

  const dropdownMenus = {
    solutions: [
      { name: "Zaza Promptly", href: "/promptly" },
      { name: "Zaza Teach", href: "/teach" },
      { name: "Zaza Study", href: "#", comingSoon: true },
      { name: "Zaza Visuals", href: "#", comingSoon: true },
      { name: "Zaza Coach", href: "#", comingSoon: true },
      { name: "Zaza ClarityDeck", href: "#", comingSoon: true },
      { name: "Zaza Schwoop", href: "#", comingSoon: true },
      { name: "Zaza HR Spark", href: "#", comingSoon: true },
      { name: "See All Products", href: "/products", separator: true },
    ],
    learning: [
      { name: "Blog", href: "/blog" },
      { name: "Free Resources", href: "/resources" },
      { name: "FAQs", href: "/faqs" },
      { name: "Privacy & Data Policy", href: "/privacy" },
    ],
    about: [
      { name: "Vision & Mission", href: "/mission" },
      { name: "Zaza Product List", href: "/products" },
      { name: "Why Not Just Use ChatGPT?", href: "/why-not-chatgpt" },
      { name: "About the Founder", href: "/founder-manifesto" },
      { name: "Zaza Quote Wall", href: "/quote-wall" },
      { name: "Zaza Feature Request", href: "/feature-request" },
      { name: "Support", href: "/support" },
      { name: "Contact", href: "/contact" },
    ],
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 dark:bg-[#111827]/95 backdrop-blur-md shadow-lg"
          : "bg-white/90 dark:bg-[#111827]/90 backdrop-blur-sm"
      }`}
      role="banner"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo and Brand - Left Section */}
          <a
            href="/"
            className="flex items-center space-x-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-[#111827] rounded-md transition-all duration-300 flex-shrink-0 group"
            aria-label="Go to Zaza Technologies homepage"
          >
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IOS%20App%20icon%20-%201024x1024-eHnj4OltdQLbYrwYvzhe7JPAeEheOz.png"
              alt="Zaza Technologies logo"
              className="w-8 h-8 lg:w-10 lg:h-10 rounded-lg transition-transform duration-300 group-hover:scale-105"
            />
            <div className="text-xl lg:text-2xl font-bold text-slate-800 dark:text-white transition-colors duration-300 whitespace-nowrap">
              <span className="relative">
                Zaza Technologies
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-pink-600 transition-all duration-300 group-hover:w-full"></span>
              </span>
            </div>
          </a>

          {/* Navigation Links - Center */}
          <nav className="hidden lg:flex items-center space-x-8" role="navigation" aria-label="Primary navigation">
            {/* Our Solutions Dropdown */}
            <div className="relative" ref={(el) => (dropdownRefs.current.solutions = el)}>
              <button
                onClick={() => handleDropdownToggle("solutions")}
                className="text-slate-700 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 font-medium transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-[#111827] rounded-md px-3 py-2 flex items-center space-x-1 group"
                aria-expanded={activeDropdown === "solutions"}
                aria-haspopup="true"
              >
                <span className="relative">
                  Our Solutions
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-600 transition-all duration-300 group-hover:w-full"></span>
                </span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === "solutions" ? "rotate-180" : ""}`}
                />
              </button>
              {activeDropdown === "solutions" && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-[#1f2937] rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 py-2 animate-in fade-in-0 zoom-in-95 duration-200 z-50">
                  {dropdownMenus.solutions.map((item, index) => (
                    <div key={index}>
                      {item.separator && <hr className="my-2 border-gray-200 dark:border-gray-600" />}
                      <a
                        href={item.href}
                        className="flex items-center justify-between px-4 py-3 text-slate-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300"
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
                className="text-slate-700 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 font-medium transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-[#111827] rounded-md px-3 py-2 flex items-center space-x-1 group"
                aria-expanded={activeDropdown === "learning"}
                aria-haspopup="true"
              >
                <span className="relative">
                  Learning Centre
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-600 transition-all duration-300 group-hover:w-full"></span>
                </span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === "learning" ? "rotate-180" : ""}`}
                />
              </button>
              {activeDropdown === "learning" && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-white dark:bg-[#1f2937] rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 py-2 animate-in fade-in-0 zoom-in-95 duration-200 z-50">
                  {dropdownMenus.learning.map((item, index) => (
                    <a
                      key={index}
                      href={item.href}
                      className="block px-4 py-3 text-slate-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300"
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
                className="text-slate-700 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 font-medium transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-[#111827] rounded-md px-3 py-2 flex items-center space-x-1 group"
                aria-expanded={activeDropdown === "about"}
                aria-haspopup="true"
              >
                <span className="relative">
                  About Us
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-600 transition-all duration-300 group-hover:w-full"></span>
                </span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === "about" ? "rotate-180" : ""}`}
                />
              </button>
              {activeDropdown === "about" && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-[#1f2937] rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 py-2 animate-in fade-in-0 zoom-in-95 duration-200 z-50">
                  {dropdownMenus.about.map((item, index) => (
                    <a
                      key={index}
                      href={item.href}
                      className="block px-4 py-3 text-slate-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Right Section - Action Buttons & Dark Mode */}
          <div className="flex items-center space-x-3 flex-shrink-0">
            {/* CTA Buttons - Hidden on mobile */}
            <div className="hidden md:flex items-center space-x-3">
              <Button
                className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                asChild
              >
                <a href="/promptly">Try Zaza Promptly</a>
              </Button>
              <Button
                className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                asChild
              >
                <a href="/teach">Try Zaza Teach</a>
              </Button>
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 text-slate-600 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-[#111827] rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden p-2 text-slate-600 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-[#111827] rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label="Toggle mobile menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-200 dark:border-gray-700 bg-white/95 dark:bg-[#111827]/95 backdrop-blur-md">
          <div className="px-4 pt-2 pb-3 space-y-1 max-h-96 overflow-y-auto">
            {/* Mobile Our Solutions */}
            <div>
              <button
                onClick={() => toggleMobileDropdown("solutions")}
                className="flex items-center justify-between w-full px-3 py-3 text-slate-700 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg font-medium transition-colors duration-300"
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
                      className="flex items-center justify-between px-3 py-2 text-sm text-slate-600 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors duration-300"
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
                className="flex items-center justify-between w-full px-3 py-3 text-slate-700 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg font-medium transition-colors duration-300"
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
                      className="block px-3 py-2 text-sm text-slate-600 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors duration-300"
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
                className="flex items-center justify-between w-full px-3 py-3 text-slate-700 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg font-medium transition-colors duration-300"
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
                      className="block px-3 py-2 text-sm text-slate-600 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors duration-300"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile CTAs */}
            <div className="pt-4 space-y-3 border-t border-gray-200 dark:border-gray-700">
              <Button
                className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 shadow-lg"
                asChild
              >
                <a href="/promptly">Try Zaza Promptly</a>
              </Button>
              <Button
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 shadow-lg"
                asChild
              >
                <a href="/teach">Try Zaza Teach</a>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
