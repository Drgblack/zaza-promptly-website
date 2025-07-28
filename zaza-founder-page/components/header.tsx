"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Moon, Sun, Menu, X, ChevronDown } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function Header() {
  const [isDark, setIsDark] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Initialize theme from localStorage or system preference
    const savedTheme = localStorage.getItem("theme")
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      setIsDark(true)
      document.documentElement.classList.add("dark")
    } else {
      setIsDark(false)
      document.documentElement.classList.remove("dark")
    }
  }, [])

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const toggleDarkMode = () => {
    const newTheme = !isDark
    setIsDark(newTheme)

    if (newTheme) {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
    }
  }

  const handleDropdownToggle = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown)
  }

  const closeDropdown = () => {
    setActiveDropdown(null)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        closeDropdown()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const solutionsItems = [
    { name: "Zaza Promptly", href: "/promptly", available: true },
    { name: "Zaza Teach", href: "/teach", available: true },
    { name: "Zaza Study", href: "#", available: false },
    { name: "Zaza Visuals", href: "#", available: false },
    { name: "Zaza Coach", href: "#", available: false },
    { name: "Zaza ClarityDeck", href: "#", available: false },
    { name: "Zaza Schwoop", href: "#", available: false },
    { name: "Zaza HR Spark", href: "#", available: false },
  ]

  const learningItems = [
    { name: "Blog", href: "/blog" },
    { name: "Free Resources", href: "/resources" },
    { name: "FAQs", href: "/faqs" },
    { name: "Privacy & Data Policy", href: "/privacy" },
  ]

  const aboutUsItems = [
    { name: "Vision & Mission", href: "/mission" },
    { name: "Zaza Product List", href: "/products" },
    { name: "Why Not Just Use ChatGPT?", href: "/why-not-chatgpt" },
    { name: "About the Founder", href: "/founder-manifesto" },
    { name: "Zaza Quote Wall", href: "/quote-wall" },
    { name: "Zaza Feature Request", href: "/feature-request" },
    { name: "Support", href: "/support" },
    { name: "Contact", href: "/contact" },
  ]

  const handleMouseEnter = (dropdown: string) => {
    if (isMobile) return // Skip hover on mobile

    if (hoverTimeout) {
      clearTimeout(hoverTimeout)
      setHoverTimeout(null)
    }
    setActiveDropdown(dropdown)
  }

  const handleMouseLeave = () => {
    if (isMobile) return // Skip hover on mobile

    const timeout = setTimeout(() => {
      setActiveDropdown(null)
    }, 150)
    setHoverTimeout(timeout)
  }

  const handleKeyDown = (event: React.KeyboardEvent, dropdown: string) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault()
      handleDropdownToggle(dropdown)
    }
    if (event.key === "Escape") {
      setActiveDropdown(null)
    }
  }

  useEffect(() => {
    return () => {
      if (hoverTimeout) {
        clearTimeout(hoverTimeout)
      }
    }
  }, [hoverTimeout])

  return (
    <motion.header
      className="sticky top-0 z-50 backdrop-blur-md bg-white/95 dark:bg-[#111827]/95 border-b border-gray-200/50 dark:border-gray-700/50 transition-colors duration-300"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Left Section - Logo */}
          <Link href="/" className="flex items-center group">
            <Image src="/images/zaza-logo.png" alt="Zaza Technologies" width={40} height={40} className="rounded-lg" />
            <span className="ml-3 text-xl font-bold text-slate-800 dark:text-white group-hover:underline transition-all duration-200">
              Zaza Technologies
            </span>
          </Link>

          {/* Center Navigation - Desktop */}
          <nav className="hidden lg:flex items-center space-x-8" ref={dropdownRef}>
            {/* Our Solutions Dropdown */}
            <div className="relative">
              <button
                onClick={() => handleDropdownToggle("solutions")}
                onMouseEnter={() => handleMouseEnter("solutions")}
                onKeyDown={(e) => handleKeyDown(e, "solutions")}
                className="flex items-center space-x-1 text-slate-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors font-medium"
              >
                <span>Our Solutions</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${activeDropdown === "solutions" ? "rotate-180" : ""}`}
                />
              </button>

              <AnimatePresence>
                {activeDropdown === "solutions" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    onMouseLeave={handleMouseLeave}
                    className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2"
                  >
                    {solutionsItems.map((item, index) => (
                      <Link
                        key={index}
                        href={item.href}
                        onClick={closeDropdown}
                        className="flex items-center justify-between px-4 py-2 text-sm text-slate-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      >
                        <span>{item.name}</span>
                        {!item.available && (
                          <span className="text-xs bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 px-2 py-1 rounded-full">
                            Coming Soon
                          </span>
                        )}
                      </Link>
                    ))}
                    <div className="border-t border-gray-200 dark:border-gray-700 mt-2 pt-2">
                      <Link
                        href="/products"
                        onClick={closeDropdown}
                        className="block px-4 py-2 text-sm font-medium text-purple-600 dark:text-purple-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      >
                        See All Products →
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Learning Centre Dropdown */}
            <div className="relative">
              <button
                onClick={() => handleDropdownToggle("learning")}
                onMouseEnter={() => handleMouseEnter("learning")}
                onKeyDown={(e) => handleKeyDown(e, "learning")}
                className="flex items-center space-x-1 text-slate-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors font-medium"
              >
                <span>Learning Centre</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${activeDropdown === "learning" ? "rotate-180" : ""}`}
                />
              </button>

              <AnimatePresence>
                {activeDropdown === "learning" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    onMouseLeave={handleMouseLeave}
                    className="absolute top-full left-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2"
                  >
                    {learningItems.map((item, index) => (
                      <Link
                        key={index}
                        href={item.href}
                        onClick={closeDropdown}
                        className="block px-4 py-2 text-sm text-slate-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* About Us Dropdown */}
            <div className="relative">
              <button
                onClick={() => handleDropdownToggle("about")}
                onMouseEnter={() => handleMouseEnter("about")}
                onKeyDown={(e) => handleKeyDown(e, "about")}
                className="flex items-center space-x-1 text-slate-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors font-medium"
              >
                <span>About Us</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${activeDropdown === "about" ? "rotate-180" : ""}`}
                />
              </button>

              <AnimatePresence>
                {activeDropdown === "about" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    onMouseLeave={handleMouseLeave}
                    className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2"
                  >
                    {aboutUsItems.map((item, index) => (
                      <Link
                        key={index}
                        href={item.href}
                        onClick={closeDropdown}
                        className="block px-4 py-2 text-sm text-slate-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          {/* Right Section - CTA Buttons & Dark Mode Toggle */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button
              asChild
              className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold rounded-lg px-6"
            >
              <Link href="/promptly">Try Zaza Promptly</Link>
            </Button>
            <Button asChild className="bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg px-6">
              <Link href="/teach">Try Zaza Teach</Link>
            </Button>
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              aria-label="Toggle dark mode"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-slate-700 dark:text-gray-300"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden mt-4 pb-4 border-t border-gray-200 dark:border-gray-700"
            >
              <nav className="flex flex-col space-y-4 mt-4">
                {/* Mobile Solutions */}
                <div>
                  <h3 className="font-semibold text-slate-800 dark:text-white mb-2">Our Solutions</h3>
                  <div className="pl-4 space-y-2">
                    {solutionsItems.map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <Link
                          href={item.href}
                          className="text-slate-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {item.name}
                        </Link>
                        {!item.available && (
                          <span className="text-xs bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 px-2 py-1 rounded-full">
                            Coming Soon
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Mobile Learning Centre */}
                <div>
                  <h3 className="font-semibold text-slate-800 dark:text-white mb-2">Learning Centre</h3>
                  <div className="pl-4 space-y-2">
                    {learningItems.map((item, index) => (
                      <Link
                        key={index}
                        href={item.href}
                        className="block text-slate-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Mobile About Us */}
                <div>
                  <h3 className="font-semibold text-slate-800 dark:text-white mb-2">About Us</h3>
                  <div className="pl-4 space-y-2">
                    {aboutUsItems.map((item, index) => (
                      <Link
                        key={index}
                        href={item.href}
                        className="block text-slate-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Mobile CTA Buttons */}
                <div className="flex flex-col space-y-2 pt-4">
                  <Button
                    asChild
                    className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold rounded-lg"
                  >
                    <Link href="/promptly" onClick={() => setIsMobileMenuOpen(false)}>
                      Try Zaza Promptly
                    </Link>
                  </Button>
                  <Button asChild className="bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg">
                    <Link href="/teach" onClick={() => setIsMobileMenuOpen(false)}>
                      Try Zaza Teach
                    </Link>
                  </Button>
                  <button
                    onClick={toggleDarkMode}
                    className="flex items-center justify-center space-x-2 p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                    <span>{isDark ? "Light Mode" : "Dark Mode"}</span>
                  </button>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  )
}
