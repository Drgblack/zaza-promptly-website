"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronDown, Menu, X, Sun, Moon } from "lucide-react"
import { useState, useEffect } from "react"

export default function NewZazaHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [theme, setTheme] = useState<"light" | "dark">("light")
  const [mounted, setMounted] = useState(false)

  // Dark mode logic
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark"
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
    const initialTheme = savedTheme || systemTheme

    setTheme(initialTheme)
    setMounted(true)

    if (initialTheme === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)

    if (newTheme === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }

  const navigationItems = [
    { name: "Our Solutions", hasDropdown: true },
    { name: "Learning Centre", hasDropdown: true },
    { name: "About Us", hasDropdown: true },
  ]

  const solutionsDropdown = [
    { name: "Zaza Promptly", href: "/promptly", comingSoon: false },
    { name: "Zaza Teach", href: "/teach", comingSoon: false },
    { name: "Zaza Study", href: "#", comingSoon: true },
    { name: "Zaza Visuals", href: "#", comingSoon: true },
    { name: "Zaza Coach", href: "#", comingSoon: true },
    { name: "Zaza ClarityDeck", href: "#", comingSoon: true },
    { name: "Zaza Schwoop", href: "#", comingSoon: true },
    { name: "Zaza HR Spark", href: "#", comingSoon: true },
  ]

  const learningDropdown = [
    { name: "Blog", href: "/blog" },
    { name: "Free Resources", href: "/resources" },
    { name: "FAQs", href: "/faqs" },
    { name: "Privacy & Data Policy", href: "/privacy" },
  ]

  const aboutDropdown = [
    { name: "Vision & Mission", href: "/vision" },
    { name: "Zaza Product List", href: "/products" },
    { name: "Why Not Just Use ChatGPT?", href: "/why-not-chatgpt" },
    { name: "About the Founder", href: "/founder-manifesto" },
    { name: "Zaza Quote Wall", href: "/quote-wall" },
    { name: "Zaza Feature Request", href: "/feature-request" },
    { name: "Support", href: "/support" },
    { name: "Contact", href: "/contact" },
  ]

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const getDropdownItems = (itemName: string) => {
    switch (itemName) {
      case "Our Solutions":
        return solutionsDropdown
      case "Learning Centre":
        return learningDropdown
      case "About Us":
        return aboutDropdown
      default:
        return []
    }
  }

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-[#111827] border-b border-gray-200 dark:border-gray-700 backdrop-blur-sm bg-white/95 dark:bg-[#111827]/95 transition-all duration-300">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Left Section - Logo */}
          <Link
            href="/"
            className="flex items-center space-x-3 flex-shrink-0 group transition-all duration-200 hover:opacity-80"
          >
            <Image
              src="/zaza-logo.png"
              alt="Zaza Technologies Logo"
              width={40}
              height={40}
              className="rounded-lg transition-transform duration-200 group-hover:scale-105"
            />
            <span className="text-xl font-bold text-slate-800 dark:text-white font-sans group-hover:underline decoration-2 underline-offset-4 decoration-purple-500 transition-all duration-200">
              Zaza Technologies
            </span>
          </Link>

          {/* Center Navigation - Desktop */}
          <nav className="hidden lg:flex items-center space-x-8 flex-1 justify-center">
            {navigationItems.map((item) => (
              <div key={item.name} className="relative group">
                <button className="flex items-center space-x-1 text-slate-800 dark:text-white hover:text-purple-600 dark:hover:text-purple-400 transition-colors font-medium font-sans py-2">
                  <span>{item.name}</span>
                  <ChevronDown className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" />
                </button>

                {/* Dropdown Menu */}
                <div className="absolute top-full left-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-100 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
                  <div className="p-4">
                    <div className="space-y-2">
                      {getDropdownItems(item.name).map((dropdownItem) => (
                        <Link
                          key={dropdownItem.name}
                          href={dropdownItem.href}
                          className="flex items-center justify-between p-3 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors group/item"
                        >
                          <span className="text-slate-700 dark:text-gray-300 group-hover/item:text-purple-600 dark:group-hover/item:text-purple-400 font-medium font-sans">
                            {dropdownItem.name}
                          </span>
                          {dropdownItem.comingSoon && (
                            <span className="bg-purple-100 dark:bg-purple-800 text-purple-800 dark:text-purple-200 text-xs px-2 py-1 rounded-full font-medium">
                              Coming Soon
                            </span>
                          )}
                        </Link>
                      ))}
                    </div>
                    {item.name === "Our Solutions" && (
                      <div className="border-t border-gray-100 dark:border-gray-700 mt-4 pt-4">
                        <Link
                          href="/products"
                          className="block p-3 text-center text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-lg font-medium transition-colors font-sans"
                        >
                          See All Products
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </nav>

          {/* Right Section - CTA Buttons & Dark Mode Toggle */}
          <div className="hidden lg:flex items-center space-x-3 flex-shrink-0">
            <Button
              asChild
              className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white border-0 font-medium font-sans transition-all duration-200 hover:scale-105"
            >
              <Link href="/promptly">Try Zaza Promptly</Link>
            </Button>
            <Button
              asChild
              className="bg-purple-600 hover:bg-purple-700 text-white font-medium font-sans transition-all duration-200 hover:scale-105"
            >
              <Link href="/teach">Try Zaza Teach</Link>
            </Button>

            {/* Dark Mode Toggle */}
            {mounted && (
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors duration-200"
                aria-label="Toggle Dark Mode"
              >
                {theme === "light" ? (
                  <Moon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                ) : (
                  <Sun className="w-5 h-5 text-yellow-500" />
                )}
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-3">
            {/* Mobile Dark Mode Toggle */}
            {mounted && (
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors duration-200"
                aria-label="Toggle Dark Mode"
              >
                {theme === "light" ? (
                  <Moon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                ) : (
                  <Sun className="w-5 h-5 text-yellow-500" />
                )}
              </button>
            )}

            <button
              onClick={toggleMobileMenu}
              className="p-2 text-slate-800 dark:text-white hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-[#111827] animate-in slide-in-from-top-2 duration-200">
            <nav className="py-4 space-y-2">
              {navigationItems.map((item) => (
                <div key={item.name} className="space-y-2">
                  <div className="px-4 py-3 text-slate-600 dark:text-gray-400 font-medium text-sm uppercase tracking-wide font-sans">
                    {item.name}
                  </div>
                  <div className="pl-6 space-y-1">
                    {getDropdownItems(item.name).map((dropdownItem) => (
                      <Link
                        key={dropdownItem.name}
                        href={dropdownItem.href}
                        className="flex items-center justify-between px-4 py-2 text-slate-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors rounded-lg mx-2 font-sans"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <span className="text-sm">{dropdownItem.name}</span>
                        {dropdownItem.comingSoon && (
                          <span className="bg-purple-100 dark:bg-purple-800 text-purple-800 dark:text-purple-200 text-xs px-2 py-0.5 rounded-full font-medium">
                            Coming Soon
                          </span>
                        )}
                      </Link>
                    ))}
                    {item.name === "Our Solutions" && (
                      <Link
                        href="/products"
                        className="block px-4 py-2 mx-2 text-center text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-lg font-medium transition-colors text-sm font-sans"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        See All Products
                      </Link>
                    )}
                  </div>
                </div>
              ))}

              {/* Mobile CTA Buttons */}
              <div className="px-2 pt-4 space-y-3 border-t border-gray-200 dark:border-gray-700 mt-4">
                <Button
                  asChild
                  className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white border-0 font-medium font-sans"
                >
                  <Link href="/promptly" onClick={() => setIsMobileMenuOpen(false)}>
                    Try Zaza Promptly
                  </Link>
                </Button>
                <Button asChild className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium font-sans">
                  <Link href="/teach" onClick={() => setIsMobileMenuOpen(false)}>
                    Try Zaza Teach
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
