"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Menu, X, Sun, Moon, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"

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

  const dropdownMenus = {
    solutions: [
      { name: "Zaza Promptly", href: "https://zazapromptly.com", external: true },
      { name: "Zaza Teach", href: "https://zazateach.com", external: true },
      { name: "Zaza Study", href: "https://zazastudy.com", external: true },
      { name: "Zaza Visuals", href: "https://zazavisuals.com", external: true },
      { name: "Zaza Coach", href: "https://zazacoach.com", external: true },
      { name: "Zaza ClarityDeck", href: "https://zazaclaritydeck.com", external: true },
      { name: "Zaza Schwoop", href: "https://zazaschwoop.com", external: true },
      { name: "Zaza HR Spark", href: "https://zazahrspark.com", external: true },
      { name: "See All Products", href: "/products", separator: true },
    ],
    learning: [
      { name: "Blog", href: "/blog" },
      { name: "Free Resources", href: "/resources" },
      { name: "FAQs", href: "/faq" },
      { name: "Privacy & Data Policy", href: "/privacy-policy" },
    ],
    why: [
      { name: "How It Works", href: "/how-it-works" },
      { name: "Why Not Just Use ChatGPT?", href: "/chatgpt" },
      { name: "Pricing", href: "/pricing" },
      { name: "Join Waitlist", href: "/waitlist" },
    ],
    about: [
      { name: "Blog", href: "/blog" },
      { name: "Free Resources", href: "/resources" },
      { name: "FAQs", href: "/faq" },
      { name: "Privacy & Data Policy", href: "/privacy-policy" },
    ],
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200/20 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:bg-[#121212]/95 dark:border-gray-700/20 transition-colors duration-300">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Left - Logo & Product Name */}
        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <Image src="/zaza_logo.png" alt="Zaza Promptly" width={32} height={32} className="rounded-lg" />
          <span className="text-xl font-semibold text-gray-900 dark:text-[#F3F3F3] transition-colors duration-300">
            Zaza{" "}
            <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">Promptly</span>
          </span>
        </Link>

        {/* Center - Navigation Links (Desktop) */}
        <nav className="hidden lg:flex" aria-label="Main navigation">
          <ul className="flex items-center gap-8">
            {/* Our Solutions Dropdown */}
            <li className="relative" ref={(el) => (dropdownRefs.current.solutions = el)}>
              <button
                onClick={() => handleDropdownToggle("solutions")}
                className="flex items-center gap-1 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-[#F3F3F3] transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 rounded-sm px-2 py-1"
                aria-expanded={openDropdown === "solutions"}
              >
                Our Solutions
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${openDropdown === "solutions" ? "rotate-180" : ""}`}
                />
              </button>
              {openDropdown === "solutions" && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-[#1E1E1E] rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 animate-in fade-in-0 zoom-in-95 duration-200">
                  {dropdownMenus.solutions.map((item, index) => (
                    <div key={index}>
                      {item.separator && <hr className="my-2 border-gray-200 dark:border-gray-700" />}
                      <Link
                        href={item.href}
                        className="flex items-center justify-between px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-[#F3F3F3] transition-colors duration-300"
                        onClick={() => setOpenDropdown(null)}
                        {...(item.external && { target: "_blank", rel: "noopener noreferrer" })}
                      >
                        <span>{item.name}</span>
                        {item.comingSoon && (
                          <span className="bg-purple-200 dark:bg-purple-800 text-purple-800 dark:text-purple-200 text-xs px-2 py-0.5 rounded-full ml-2">
                            Coming Soon
                          </span>
                        )}
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </li>

            {/* Learning Centre Dropdown */}
            <li className="relative" ref={(el) => (dropdownRefs.current.learning = el)}>
              <button
                onClick={() => handleDropdownToggle("learning")}
                className="flex items-center gap-1 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-[#F3F3F3] transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 rounded-sm px-2 py-1"
                aria-expanded={openDropdown === "learning"}
              >
                Learning Centre
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${openDropdown === "learning" ? "rotate-180" : ""}`}
                />
              </button>
              {openDropdown === "learning" && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-white dark:bg-[#1E1E1E] rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 animate-in fade-in-0 zoom-in-95 duration-200">
                  {dropdownMenus.learning.map((item, index) => (
                    <Link
                      key={index}
                      href={item.href}
                      className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-[#F3F3F3] transition-colors duration-300"
                      onClick={() => setOpenDropdown(null)}
                      {...(item.external && { target: "_blank", rel: "noopener noreferrer" })}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </li>

            {/* Why Zaza Promptly Dropdown */}
            <li className="relative" ref={(el) => (dropdownRefs.current.why = el)}>
              <button
                onClick={() => handleDropdownToggle("why")}
                className="flex items-center gap-1 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-[#F3F3F3] transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 rounded-sm px-2 py-1"
                aria-expanded={openDropdown === "why"}
              >
                Why Zaza Promptly?
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${openDropdown === "why" ? "rotate-180" : ""}`}
                />
              </button>
              {openDropdown === "why" && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-white dark:bg-[#1E1E1E] rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 animate-in fade-in-0 zoom-in-95 duration-200">
                  {dropdownMenus.why.map((item, index) => (
                    <Link
                      key={index}
                      href={item.href}
                      className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-[#F3F3F3] transition-colors duration-300"
                      onClick={() => setOpenDropdown(null)}
                      {...(item.external && { target: "_blank", rel: "noopener noreferrer" })}
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
                className="flex items-center gap-1 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-[#F3F3F3] transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 rounded-sm px-2 py-1"
                aria-expanded={openDropdown === "about"}
              >
                About Us
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${openDropdown === "about" ? "rotate-180" : ""}`}
                />
              </button>
              {openDropdown === "about" && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-[#1E1E1E] rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 animate-in fade-in-0 zoom-in-95 duration-200">
                  {dropdownMenus.about.map((item, index) => (
                    <Link
                      key={index}
                      href={item.href}
                      className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-[#F3F3F3] transition-colors duration-300"
                      onClick={() => setOpenDropdown(null)}
                      {...(item.external && { target: "_blank", rel: "noopener noreferrer" })}
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
            className="hidden sm:flex p-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-[#F3F3F3] focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 rounded-sm transition-colors duration-300"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>

          {/* CTA Buttons (Desktop) */}
          <div className="hidden md:flex items-center gap-3">
            <Button
              asChild
              className="bg-gradient-to-r from-pink-600 to-purple-600 text-white font-medium px-4 py-2 rounded-md shadow-sm hover:from-pink-700 hover:to-purple-700 transition-all duration-300"
            >
                              <Link href="/zaza-teach-website">Try Zaza Teach</Link>
            </Button>
            <Button
              asChild
              className="bg-pink-600 hover:bg-pink-700 text-white font-semibold px-4 py-2 rounded-md transition-colors duration-300"
            >
              <Link href="/waitlist">Join Waitlist</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden p-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-[#F3F3F3] focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 rounded-sm transition-colors duration-300"
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-200 dark:border-gray-700 bg-white/95 dark:bg-[#121212]/95 backdrop-blur transition-colors duration-300">
          <div className="px-6 py-4 space-y-4">
            {/* Mobile Navigation Links */}
            <nav className="space-y-3">
              {/* Our Solutions Mobile Dropdown */}
              <div>
                <button
                  onClick={() => handleMobileDropdownToggle("solutions")}
                  className="flex items-center justify-between w-full text-left text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-[#F3F3F3] py-2 transition-colors duration-300"
                >
                  Our Solutions
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-200 ${openMobileDropdown === "solutions" ? "rotate-180" : ""}`}
                  />
                </button>
                {openMobileDropdown === "solutions" && (
                  <div className="pl-4 mt-2 space-y-2 animate-in fade-in-0 slide-in-from-top-2 duration-200">
                    {dropdownMenus.solutions.map((item, index) => (
                      <div key={index}>
                        {item.separator && <hr className="my-2 border-gray-200 dark:border-gray-700" />}
                        <Link
                          href={item.href}
                          className="flex items-center justify-between py-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-[#F3F3F3] transition-colors duration-300"
                          onClick={() => setIsMobileMenuOpen(false)}
                          {...(item.external && { target: "_blank", rel: "noopener noreferrer" })}
                        >
                          <span>{item.name}</span>
                          {item.comingSoon && (
                            <span className="bg-purple-200 dark:bg-purple-800 text-purple-800 dark:text-purple-200 text-xs px-2 py-0.5 rounded-full ml-2">
                              Coming Soon
                            </span>
                          )}
                        </Link>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Learning Centre Mobile Dropdown */}
              <div>
                <button
                  onClick={() => handleMobileDropdownToggle("learning")}
                  className="flex items-center justify-between w-full text-left text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-[#F3F3F3] py-2 transition-colors duration-300"
                >
                  Learning Centre
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-200 ${openMobileDropdown === "learning" ? "rotate-180" : ""}`}
                  />
                </button>
                {openMobileDropdown === "learning" && (
                  <div className="pl-4 mt-2 space-y-2 animate-in fade-in-0 slide-in-from-top-2 duration-200">
                    {dropdownMenus.learning.map((item, index) => (
                      <Link
                        key={index}
                        href={item.href}
                        className="block py-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-[#F3F3F3] transition-colors duration-300"
                        onClick={() => setIsMobileMenuOpen(false)}
                        {...(item.external && { target: "_blank", rel: "noopener noreferrer" })}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Why Zaza Promptly Mobile Dropdown */}
              <div>
                <button
                  onClick={() => handleMobileDropdownToggle("why")}
                  className="flex items-center justify-between w-full text-left text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-[#F3F3F3] py-2 transition-colors duration-300"
                >
                  Why Zaza Promptly?
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-200 ${openMobileDropdown === "why" ? "rotate-180" : ""}`}
                  />
                </button>
                {openMobileDropdown === "why" && (
                  <div className="pl-4 mt-2 space-y-2 animate-in fade-in-0 slide-in-from-top-2 duration-200">
                    {dropdownMenus.why.map((item, index) => (
                      <Link
                        key={index}
                        href={item.href}
                        className="block py-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-[#F3F3F3] transition-colors duration-300"
                        onClick={() => setIsMobileMenuOpen(false)}
                        {...(item.external && { target: "_blank", rel: "noopener noreferrer" })}
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
                  className="flex items-center justify-between w-full text-left text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-[#F3F3F3] py-2 transition-colors duration-300"
                >
                  About Us
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-200 ${openMobileDropdown === "about" ? "rotate-180" : ""}`}
                  />
                </button>
                {openMobileDropdown === "about" && (
                  <div className="pl-4 mt-2 space-y-2 animate-in fade-in-0 slide-in-from-top-2 duration-200">
                    {dropdownMenus.about.map((item, index) => (
                      <Link
                        key={index}
                        href={item.href}
                        className="block py-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-[#F3F3F3] transition-colors duration-300"
                        onClick={() => setIsMobileMenuOpen(false)}
                        {...(item.external && { target: "_blank", rel: "noopener noreferrer" })}
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
              className="flex items-center gap-2 w-full text-left text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-[#F3F3F3] py-2 transition-colors duration-300"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              <span>{isDarkMode ? "Light Mode" : "Dark Mode"}</span>
            </button>

            {/* Mobile CTA Buttons */}
            <div className="pt-4 border-t border-gray-200 dark:border-gray-700 space-y-3">
              <Button
                asChild
                className="w-full bg-gradient-to-r from-pink-600 to-purple-600 text-white font-medium py-2 rounded-md shadow-sm hover:from-pink-700 hover:to-purple-700 transition-all duration-300"
              >
                <Link href="/zaza-teach-website" onClick={() => setIsMobileMenuOpen(false)}>
                  Try Zaza Teach
                </Link>
              </Button>
              <Button
                asChild
                className="w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold py-2 rounded-md transition-colors duration-300"
              >
                <Link href="/waitlist" onClick={() => setIsMobileMenuOpen(false)}>
                  Join Waitlist
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Subtle shadow */}
      <div className="absolute inset-x-0 top-full h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent transition-colors duration-300"></div>
    </header>
  )
}
