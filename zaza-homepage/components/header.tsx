"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/theme-toggle"

const solutionsMenu = [
  {
    title: "Zaza Promptly",
            href: "/zaza-promptly-site",
    description: "Write 100 report comments in minutes",
  },
  {
    title: "Zaza Teach",
            href: "/zaza-teach-website",
    description: "Generate lesson plans that actually work",
  },
  {
    title: "Zaza Study",
            href: "/zaza-study-landing",
    description: "AI-powered study assistant",
    comingSoon: true,
  },
  {
    title: "Zaza Visuals",
            href: "/zaza-visuals-landing (1)",
    description: "Create classroom-ready visuals instantly",
    comingSoon: true,
  },
  {
    title: "Zaza Coach",
    href: "/zaza-coach",
    description: "Performance reviews with human-centred AI",
    comingSoon: true,
  },
  {
    title: "Zaza ClarityDeck",
    href: "/zaza-claritydeck",
    description: "Clear presentations made simple",
    comingSoon: true,
  },
  {
    title: "Zaza Schwoop",
    href: "/zaza-schwoop",
    description: "Streamlined workflow management",
    comingSoon: true,
  },
  {
    title: "Zaza HR Spark",
    href: "/zaza-hr-spark",
    description: "AI-powered HR tools for real workplaces",
    comingSoon: true,
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
  { name: "About Us", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "Vision & Mission", href: "/vision-mission" },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const [solutionsDropdownOpen, setSolutionsDropdownOpen] = useState(false)
  const [learningDropdownOpen, setLearningDropdownOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Dropdown handlers
  const handleSolutionsMouseEnter = () => {
    setSolutionsDropdownOpen(true)
    setLearningDropdownOpen(false)
  }

  const handleSolutionsMouseLeave = () => {
    setTimeout(() => setSolutionsDropdownOpen(false), 150)
  }

  const handleLearningMouseEnter = () => {
    setLearningDropdownOpen(true)
    setSolutionsDropdownOpen(false)
  }

  const handleLearningMouseLeave = () => {
    setTimeout(() => setLearningDropdownOpen(false), 150)
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 transition-all duration-200 border-b border-gray-200 dark:bg-gray-900/95 dark:supports-[backdrop-filter]:bg-gray-900/60 dark:border-gray-800",
        isScrolled && "shadow-sm",
      )}
    >
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo - Left */}
          <div className="flex items-center">
            <a href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
              <img src="/assets/zaza-logo.png" alt="Zaza Technologies Logo" className="h-8 w-8" />
              <span className="font-bold text-xl text-gray-900 dark:text-white">Zaza</span>
            </a>
          </div>

          {/* Desktop Navigation - Center */}
          <nav className="hidden lg:flex items-center space-x-8">
            {/* Our Solutions Dropdown */}
            <div
              className="relative group"
              onMouseEnter={handleSolutionsMouseEnter}
              onMouseLeave={handleSolutionsMouseLeave}
            >
              <button
                className={cn(
                  "flex items-center space-x-1 font-medium transition-colors",
                  solutionsDropdownOpen
                    ? "text-purple-600 dark:text-purple-400"
                    : "text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white",
                )}
              >
                <span>Our Solutions</span>
                <ChevronDown className="h-4 w-4" />
              </button>

              {/* Solutions Dropdown Menu */}
              {solutionsDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-80 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg py-2 z-50">
                  {solutionsMenu.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group/item"
                    >
                      <div className="flex-1">
                        <div className="flex items-center">
                          <span className="font-medium text-gray-900 dark:text-white group-hover/item:text-purple-600 dark:group-hover/item:text-purple-400">
                            {item.title}
                          </span>
                          {item.comingSoon && (
                            <span className="bg-purple-200 text-purple-800 text-xs px-2 py-0.5 rounded-full ml-2 dark:bg-purple-900 dark:text-purple-300">
                              Coming Soon
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{item.description}</p>
                      </div>
                    </a>
                  ))}
                  <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>
                  <a
                    href="/products"
                    className="flex items-center px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group/item"
                  >
                    <span className="font-medium text-purple-600 dark:text-purple-400 group-hover/item:text-purple-700 dark:group-hover/item:text-purple-300">
                      See All Products
                    </span>
                  </a>
                </div>
              )}
            </div>

            {/* Learning Centre Dropdown */}
            <div
              className="relative group"
              onMouseEnter={handleLearningMouseEnter}
              onMouseLeave={handleLearningMouseLeave}
            >
              <button
                className={cn(
                  "flex items-center space-x-1 font-medium transition-colors",
                  learningDropdownOpen
                    ? "text-purple-600 dark:text-purple-400"
                    : "text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white",
                )}
              >
                <span>Learning Centre</span>
                <ChevronDown className="h-4 w-4" />
              </button>

              {/* Learning Dropdown Menu */}
              {learningDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-72 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg py-2 z-50">
                  {learningMenu.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      className="flex items-center px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group/item"
                    >
                      <div className="flex-1">
                        <span className="font-medium text-gray-900 dark:text-white group-hover/item:text-purple-600 dark:group-hover/item:text-purple-400">
                          {item.title}
                        </span>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{item.description}</p>
                      </div>
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Regular Navigation Items */}
            {navigationItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-gray-900 font-medium transition-colors dark:text-gray-300 dark:hover:text-white"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Desktop CTA Buttons - Right */}
          <div className="hidden lg:flex items-center space-x-3">
            <ThemeToggle />
            <Button
              asChild
              className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-300"
            >
                              <a href="/zaza-teach-website">Try Zaza Teach</a>
            </Button>
            <Button
              asChild
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-300"
            >
                              <a href="/zaza-promptly-site">Try Zaza Promptly</a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 dark:border-gray-800 py-4">
            <div className="flex flex-col space-y-4">
              {/* Mobile Theme Toggle */}
              <div className="flex justify-between items-center px-2">
                <span className="font-semibold text-gray-900 dark:text-white">Theme</span>
                <ThemeToggle />
              </div>

              {/* Mobile Solutions Menu */}
              <div className="space-y-2">
                <p className="font-semibold text-gray-900 dark:text-white px-2">Our Solutions</p>
                {solutionsMenu.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span>{item.title}</span>
                    {item.comingSoon && (
                      <span className="bg-purple-200 text-purple-800 text-xs px-2 py-0.5 rounded-full dark:bg-purple-900 dark:text-purple-300">
                        Coming Soon
                      </span>
                    )}
                  </a>
                ))}
                <a
                  href="/products"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-2 text-sm text-purple-600 hover:text-purple-700 hover:bg-gray-50 rounded-md transition-colors dark:text-purple-400 dark:hover:text-purple-300 dark:hover:bg-gray-800"
                >
                  See All Products
                </a>
              </div>

              {/* Mobile Learning Centre Menu */}
              <div className="space-y-2 border-t border-gray-200 dark:border-gray-800 pt-4">
                <p className="font-semibold text-gray-900 dark:text-white px-2">Learning Centre</p>
                {learningMenu.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-4 py-2 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800"
                  >
                    {item.title}
                  </a>
                ))}
              </div>

              {/* Mobile Regular Navigation */}
              <div className="space-y-1 border-t border-gray-200 dark:border-gray-800 pt-4">
                {navigationItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="block px-2 py-2 text-sm font-semibold text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                ))}
              </div>

              {/* Mobile CTA Buttons */}
              <div className="flex flex-col space-y-3 pt-4 border-t border-gray-200 dark:border-gray-800">
                <Button
                  asChild
                  className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <a href="/zaza-teach-website" onClick={() => setIsMobileMenuOpen(false)}>
                    Try Zaza Teach
                  </a>
                </Button>
                <Button
                  asChild
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <a href="/zaza-promptly-site" onClick={() => setIsMobileMenuOpen(false)}>
                    Try Zaza Promptly
                  </a>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
