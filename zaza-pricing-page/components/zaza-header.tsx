"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Menu, X, ChevronDown, Sun, Moon } from "lucide-react"
import { cn } from "@/lib/utils"

const navigation = [
  {
    name: "Our Solutions",
    items: [
      { name: "Zaza Promptly", href: "/promptly-pricing" },
      { name: "Zaza Teach", href: "/teach" },
      { name: "Zaza Study", href: "#", comingSoon: true },
      { name: "Zaza Visuals", href: "#", comingSoon: true },
      { name: "Zaza Coach", href: "#", comingSoon: true },
      { name: "Zaza ClarityDeck", href: "#", comingSoon: true },
      { name: "Zaza Schwoop", href: "#", comingSoon: true },
      { name: "Zaza HR Spark", href: "#", comingSoon: true },
      { name: "See All Products", href: "/products", separator: true },
    ],
  },
  {
    name: "Learning Centre",
    items: [
      { name: "Blog", href: "/blog" },
      { name: "Free Resources", href: "/resources" },
      { name: "FAQs", href: "/faqs" },
      { name: "Privacy & Data Policy", href: "/privacy" },
    ],
  },
  {
    name: "About Us",
    items: [
      { name: "Vision & Mission", href: "/mission" },
      { name: "Zaza Product List", href: "/products" },
      { name: "Why Not Just Use ChatGPT?", href: "/why-not-chatgpt" },
      { name: "About the Founder", href: "/founder-manifesto" },
      { name: "Zaza Quote Wall", href: "/quote-wall" },
      { name: "Zaza Feature Request", href: "/feature-request" },
      { name: "Support", href: "/support" },
      { name: "Contact", href: "/contact" },
    ],
  },
]

export default function ZazaHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [mobileActiveDropdown, setMobileActiveDropdown] = useState<string | null>(null)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Dark mode functionality
  useEffect(() => {
    // Check localStorage first, then system preference
    const savedTheme = localStorage.getItem("theme")
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

    const shouldUseDark = savedTheme === "dark" || (!savedTheme && systemPrefersDark)
    setIsDarkMode(shouldUseDark)

    if (shouldUseDark) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
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

  const handleMouseEnter = (name: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setActiveDropdown(name)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null)
    }, 150)
  }

  const handleKeyDown = (event: React.KeyboardEvent, name: string) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault()
      setActiveDropdown(activeDropdown === name ? null : name)
    } else if (event.key === "Escape") {
      setActiveDropdown(null)
    }
  }

  const toggleMobileDropdown = (name: string) => {
    setMobileActiveDropdown(mobileActiveDropdown === name ? null : name)
  }

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return (
    <header className="sticky top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200 dark:bg-[#111827]/95 dark:border-slate-700 transition-colors duration-300">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Global">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex lg:flex-1">
            <Link
              href="/"
              className="-m-1.5 p-1.5 flex items-center gap-3 hover:opacity-80 transition-all duration-300 group"
            >
              <span className="sr-only">Zaza Technologies</span>
              <Image
                src="/images/zaza-logo.png"
                alt="Zaza Technologies logo"
                width={32}
                height={32}
                className="h-8 w-8 transition-transform duration-300 group-hover:scale-105"
              />
              <span className="text-xl font-bold text-slate-800 dark:text-white transition-colors duration-300 group-hover:underline underline-offset-4">
                Zaza Technologies
              </span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors duration-300 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800"
              onClick={() => setMobileMenuOpen(true)}
              aria-expanded="false"
              aria-label="Open main menu"
            >
              <Menu className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          {/* Desktop navigation */}
          <div className="hidden lg:flex lg:gap-x-2">
            {navigation.map((section) => (
              <div
                key={section.name}
                className="relative"
                onMouseEnter={() => handleMouseEnter(section.name)}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  className={cn(
                    "flex items-center gap-1 text-sm font-medium leading-6 px-3 py-2 rounded-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2",
                    activeDropdown === section.name
                      ? "text-violet-600 bg-violet-50 dark:text-violet-400 dark:bg-violet-900/20"
                      : "text-slate-700 hover:text-slate-900 hover:bg-slate-50 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800",
                  )}
                  onKeyDown={(e) => handleKeyDown(e, section.name)}
                  aria-expanded={activeDropdown === section.name}
                  aria-haspopup="true"
                >
                  {section.name}
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 transition-transform duration-200",
                      activeDropdown === section.name ? "rotate-180" : "",
                    )}
                  />
                </button>

                {/* Dropdown menu */}
                {activeDropdown === section.name && (
                  <div className="absolute top-full left-0 mt-1 w-64 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 py-2 animate-in fade-in-0 zoom-in-95 duration-200">
                    {section.items.map((item, index) => (
                      <div key={item.name}>
                        {item.separator && index > 0 && (
                          <div className="my-2 border-t border-slate-200 dark:border-slate-700" />
                        )}
                        <Link
                          href={item.href}
                          className="flex items-center justify-between px-4 py-2 text-sm text-slate-700 hover:text-slate-900 hover:bg-slate-50 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-800"
                          onClick={() => setActiveDropdown(null)}
                        >
                          <span>{item.name}</span>
                          {item.comingSoon && (
                            <span className="bg-purple-200 text-purple-800 text-xs px-2 py-0.5 rounded-full ml-2 dark:bg-purple-900/30 dark:text-purple-300">
                              Coming Soon
                            </span>
                          )}
                        </Link>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Desktop actions */}
          <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4 lg:items-center">
            <Button
              asChild
              className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold px-4 py-2 text-sm rounded-md transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <Link href="/promptly-pricing">Try Zaza Promptly</Link>
            </Button>
            <Button
              asChild
              className="bg-purple-600 hover:bg-purple-700 text-white font-medium px-4 py-2 text-sm rounded-md transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <Link href="/teach">Try Zaza Teach</Link>
            </Button>
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-md text-slate-700 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2"
              aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={cn("lg:hidden", mobileMenuOpen ? "fixed inset-0 z-50" : "hidden")}>
        <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white dark:bg-[#111827] px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-slate-900/10 dark:sm:ring-slate-100/10">
          <div className="flex items-center justify-between">
            <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-3">
              <span className="sr-only">Zaza Technologies</span>
              <Image
                src="/images/zaza-logo.png"
                alt="Zaza Technologies logo"
                width={32}
                height={32}
                className="h-8 w-8"
              />
              <span className="text-xl font-bold text-slate-800 dark:text-white">Zaza Technologies</span>
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors duration-300 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <X className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-slate-500/10 dark:divide-slate-400/10">
              <div className="space-y-2 py-6">
                {navigation.map((section) => (
                  <div key={section.name}>
                    <button
                      onClick={() => toggleMobileDropdown(section.name)}
                      className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-base font-medium leading-7 text-slate-800 hover:bg-slate-50 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 dark:text-white dark:hover:bg-slate-800"
                      aria-expanded={mobileActiveDropdown === section.name}
                    >
                      {section.name}
                      <ChevronDown
                        className={cn(
                          "h-5 w-5 transition-transform duration-200",
                          mobileActiveDropdown === section.name ? "rotate-180" : "",
                        )}
                      />
                    </button>
                    {mobileActiveDropdown === section.name && (
                      <div className="mt-2 space-y-1 pl-4 animate-in slide-in-from-top-2 duration-200">
                        {section.items.map((item, index) => (
                          <div key={item.name}>
                            {item.separator && index > 0 && (
                              <div className="my-2 border-t border-slate-200 dark:border-slate-700" />
                            )}
                            <Link
                              href={item.href}
                              className="flex items-center justify-between rounded-lg px-3 py-2 text-sm text-slate-700 hover:text-slate-900 hover:bg-slate-50 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800"
                              onClick={() => {
                                setMobileMenuOpen(false)
                                setMobileActiveDropdown(null)
                              }}
                            >
                              <span>{item.name}</span>
                              {item.comingSoon && (
                                <span className="bg-purple-200 text-purple-800 text-xs px-2 py-0.5 rounded-full ml-2 dark:bg-purple-900/30 dark:text-purple-300">
                                  Coming Soon
                                </span>
                              )}
                            </Link>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="py-6 space-y-4">
                <button
                  onClick={toggleDarkMode}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-base font-medium leading-7 text-slate-800 hover:bg-slate-50 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 dark:text-white dark:hover:bg-slate-800"
                  aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
                >
                  {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                  {isDarkMode ? "Light Mode" : "Dark Mode"}
                </button>
                <Button
                  asChild
                  className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold transition-colors duration-300"
                >
                  <Link href="/promptly-pricing" onClick={() => setMobileMenuOpen(false)}>
                    Try Zaza Promptly
                  </Link>
                </Button>
                <Button
                  asChild
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium transition-colors duration-300"
                >
                  <Link href="/teach" onClick={() => setMobileMenuOpen(false)}>
                    Try Zaza Teach
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
