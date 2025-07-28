"use client"

import type React from "react"
import Link from "next/link"
import { Moon, Sun, ChevronDown, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useRef, useEffect } from "react"
import { useTheme } from "@/hooks/use-theme"
import { cn } from "@/lib/utils"

interface HeaderProps {
  variant?: "default" | "minimal"
  showProductButtons?: boolean
  currentProduct?: string
}

const solutionsMenu = [
  {
    title: "Zaza Promptly",
            href: "/zaza-promptly-site",
    description: "Write 100 report comments in minutes",
    external: false,
  },
  {
    title: "Zaza Teach",
            href: "/zaza-teach-website",
    description: "Generate lesson plans that actually work",
    external: false,
  },
  {
    title: "Zaza Study",
            href: "/zaza-study-landing",
    description: "AI-powered study assistant",
    comingSoon: true,
    external: false,
  },
  {
    title: "Zaza Visuals",
            href: "/zaza-visuals-landing (1)",
    description: "Create classroom-ready visuals instantly",
    comingSoon: true,
    external: false,
  },
  {
    title: "Zaza Coach",
    href: "/zaza-coach",
    description: "Performance reviews with human-centred AI",
    comingSoon: true,
    external: false,
  },
  {
    title: "Zaza ClarityDeck",
    href: "/zaza-claritydeck",
    description: "Clear presentations made simple",
    comingSoon: true,
    external: false,
  },
  {
    title: "Zaza Schwoop",
    href: "/zaza-schwoop",
    description: "Streamlined workflow management",
    comingSoon: true,
    external: false,
  },
  {
    title: "Zaza HR Spark",
    href: "/zaza-hr-spark",
    description: "AI-powered HR tools for real workplaces",
    comingSoon: true,
    external: false,
  },
]

const learningMenu = [
  {
    title: "Blog",
    href: "/blog",
    description: "Latest insights and educational content",
  },
  {
    title: "Free Resources",
    href: "/resources",
    description: "Templates, guides, and teaching materials",
  },
  {
    title: "FAQs",
    href: "/faq",
    description: "Common questions and answers",
  },
  {
    title: "Privacy & Data Policy",
    href: "/privacy",
    description: "How we protect your information",
  },
]

const navigationItems = [
  { name: "Home", href: "/" },
  { name: "Products", href: "/products" },
  { name: "Pricing", href: "/pricing" },
  { name: "About", href: "/about" },
  { name: "Support", href: "/support" },
]

export function Header({ variant = "default", showProductButtons = true, currentProduct }: HeaderProps) {
  const { theme, setTheme } = useTheme()
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleMouseEnter = (dropdown: string) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current)
    }
    setActiveDropdown(dropdown)
  }

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null)
    }, 150)
  }

  const handleKeyDown = (e: React.KeyboardEvent, dropdown: string) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      setActiveDropdown(activeDropdown === dropdown ? null : dropdown)
    } else if (e.key === "Escape") {
      setActiveDropdown(null)
    }
  }

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }

  useEffect(() => {
    return () => {
      if (dropdownTimeoutRef.current) {
        clearTimeout(dropdownTimeoutRef.current)
      }
    }
  }, [])

  const isCurrentProduct = (productKey: string) => {
    return currentProduct === productKey
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-all duration-300 backdrop-blur-md",
        isScrolled ? "shadow-sm" : "",
        variant === "default"
          ? "border-orange-100 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80"
          : "border-gray-200 dark:border-gray-800 bg-white/95 dark:bg-gray-900/95"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side - Logo */}
          <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm"
              style={{ background: "linear-gradient(135deg, #f97316, #ea580c)" }}
            >
              Z
            </div>
            <span className="text-xl font-bold text-slate-900 dark:text-gray-100 transition-colors duration-300">
              Zaza <span style={{ color: "#f97316" }}>Technologies</span>
            </span>
          </Link>

          {/* Center - Navigation (hidden on mobile) */}
          <nav className="hidden lg:flex items-center space-x-8">
            {/* Our Solutions Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter("solutions")}
              onMouseLeave={handleMouseLeave}
            >
              <button
                className="flex items-center space-x-1 text-sm font-medium text-slate-700 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 transition-colors duration-300 focus:outline-none focus:text-orange-500"
                onKeyDown={(e) => handleKeyDown(e, "solutions")}
                aria-expanded={activeDropdown === "solutions"}
                aria-haspopup="true"
              >
                <span>Our Solutions</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-300 ${activeDropdown === "solutions" ? "rotate-180" : ""}`}
                />
              </button>

              {activeDropdown === "solutions" && (
                <div className="absolute top-full left-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-orange-100 dark:border-gray-600 py-2 z-50 transition-colors duration-300">
                  {solutionsMenu.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "flex items-center justify-between px-4 py-3 text-sm hover:bg-orange-50 dark:hover:bg-gray-700 transition-colors duration-300",
                        isCurrentProduct(item.title.toLowerCase().replace(" ", "-"))
                          ? "text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-gray-700"
                          : "text-slate-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400"
                      )}
                    >
                      <div className="flex-1">
                        <div className="flex items-center">
                          <span className="font-medium">{item.title}</span>
                          {item.comingSoon && (
                            <span className="bg-purple-200 dark:bg-purple-800 text-purple-800 dark:text-purple-200 text-xs rounded-full px-2 py-1 ml-2 transition-colors duration-300">
                              Coming Soon
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-500 dark:text-gray-400 mt-1">{item.description}</p>
                      </div>
                    </Link>
                  ))}
                  <div className="border-t border-orange-100 dark:border-gray-600 mt-2 pt-2 transition-colors duration-300">
                    <Link
                      href="/products"
                      className="flex items-center px-4 py-3 text-sm font-medium text-orange-600 dark:text-orange-400 hover:bg-orange-50 dark:hover:bg-gray-700 transition-colors duration-300"
                    >
                      See All Products
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Learning Centre Dropdown */}
            <div className="relative" onMouseEnter={() => handleMouseEnter("learning")} onMouseLeave={handleMouseLeave}>
              <button
                className="flex items-center space-x-1 text-sm font-medium text-slate-700 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 transition-colors duration-300 focus:outline-none focus:text-orange-500"
                onKeyDown={(e) => handleKeyDown(e, "learning")}
                aria-expanded={activeDropdown === "learning"}
                aria-haspopup="true"
              >
                <span>Learning Centre</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-300 ${activeDropdown === "learning" ? "rotate-180" : ""}`}
                />
              </button>

              {activeDropdown === "learning" && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-orange-100 dark:border-gray-600 py-2 z-50 transition-colors duration-300">
                  {learningMenu.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-center px-4 py-3 text-sm text-slate-700 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-gray-700 hover:text-orange-600 dark:hover:text-orange-400 transition-colors duration-300"
                    >
                      <div>
                        <div className="font-medium">{item.title}</div>
                        <p className="text-xs text-slate-500 dark:text-gray-400 mt-1">{item.description}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Regular Navigation Items */}
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-slate-700 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 transition-colors duration-300"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right side - Dark mode toggle and buttons */}
          <div className="flex items-center space-x-3">
            {/* Dark mode toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-md text-slate-700 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 hover:bg-orange-50 dark:hover:bg-gray-700 transition-colors duration-300"
              aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            >
              {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>

            {/* Desktop buttons */}
            {showProductButtons && (
              <div className="hidden md:flex items-center space-x-2">
                <Link href="/zaza-teach-website">
                  <Button
                    size="sm"
                    className="text-white font-medium px-3 py-2 rounded-md shadow-sm hover:shadow-md transition-all duration-200"
                    style={{ background: "linear-gradient(135deg, #ec4899, #8b5cf6)" }}
                  >
                    Try Zaza Teach
                  </Button>
                </Link>
                <Link href="/zaza-promptly-site">
                  <Button
                    size="sm"
                    className="text-white font-medium px-3 py-2 rounded-md shadow-sm hover:shadow-md transition-all duration-200"
                    style={{ background: "linear-gradient(135deg, #ec4899, #8b5cf6)" }}
                  >
                    Try Zaza Promptly
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile hamburger */}
            <div className="lg:hidden flex items-center space-x-2">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-md text-slate-700 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 hover:bg-orange-50 dark:hover:bg-gray-700 transition-colors duration-300"
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={cn(
            "lg:hidden border-t transition-colors duration-300",
            isMobileMenuOpen ? "block" : "hidden",
            variant === "default"
              ? "border-orange-100 dark:border-gray-700"
              : "border-gray-200 dark:border-gray-800"
          )}
        >
          <nav className="py-4 space-y-4">
            {/* Mobile Our Solutions */}
            <div>
              <button
                onClick={() => setActiveDropdown(activeDropdown === "mobile-solutions" ? null : "mobile-solutions")}
                className="flex items-center justify-between w-full text-left text-sm font-medium text-slate-700 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 transition-colors duration-300 py-2"
              >
                <span>Our Solutions</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-300 ${activeDropdown === "mobile-solutions" ? "rotate-180" : ""}`}
                />
              </button>
              {activeDropdown === "mobile-solutions" && (
                <div className="pl-4 mt-2 space-y-2">
                  {solutionsMenu.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "block text-sm transition-colors duration-300 py-1",
                        isCurrentProduct(item.title.toLowerCase().replace(" ", "-"))
                          ? "text-orange-600 dark:text-orange-400 font-medium"
                          : "text-slate-600 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400"
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <span>{item.title}</span>
                        {item.comingSoon && (
                          <span className="bg-purple-200 dark:bg-purple-800 text-purple-800 dark:text-purple-200 text-xs rounded-full px-2 py-1 ml-2 transition-colors duration-300">
                            Coming Soon
                          </span>
                        )}
                      </div>
                    </Link>
                  ))}
                  <Link
                    href="/products"
                    className="block text-sm font-medium text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 transition-colors duration-300 py-1 border-t border-orange-100 dark:border-gray-600 pt-2 mt-2"
                  >
                    See All Products
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Learning Centre */}
            <div>
              <button
                onClick={() => setActiveDropdown(activeDropdown === "mobile-learning" ? null : "mobile-learning")}
                className="flex items-center justify-between w-full text-left text-sm font-medium text-slate-700 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 transition-colors duration-300 py-2"
              >
                <span>Learning Centre</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-300 ${activeDropdown === "mobile-learning" ? "rotate-180" : ""}`}
                />
              </button>
              {activeDropdown === "mobile-learning" && (
                <div className="pl-4 mt-2 space-y-2">
                  {learningMenu.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block text-sm text-slate-600 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400 transition-colors duration-300 py-1"
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Regular Navigation */}
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block text-sm font-medium text-slate-700 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 transition-colors duration-300 py-2"
              >
                {item.name}
              </Link>
            ))}

            {/* Mobile Action Buttons */}
            {showProductButtons && (
              <div className="flex flex-col space-y-2 pt-4 border-t border-orange-100 dark:border-gray-600 transition-colors duration-300">
                <Link href="/zaza-teach-website">
                  <Button
                    size="sm"
                    className="w-full text-white font-medium py-2 rounded-md shadow-sm hover:shadow-md transition-all duration-200"
                    style={{ background: "linear-gradient(135deg, #ec4899, #8b5cf6)" }}
                  >
                    Try Zaza Teach
                  </Button>
                </Link>
                <Link href="/zaza-promptly-site">
                  <Button
                    size="sm"
                    className="w-full text-white font-medium py-2 rounded-md shadow-sm hover:shadow-md transition-all duration-200"
                    style={{ background: "linear-gradient(135deg, #ec4899, #8b5cf6)" }}
                  >
                    Try Zaza Promptly
                  </Button>
                </Link>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
} 