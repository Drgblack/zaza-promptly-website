"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronDown, Menu, X, Sun, Moon, ExternalLink, Sparkles } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const DropdownMenu = ({
  title,
  items,
  isOpen,
  onToggle,
  onClose,
}: {
  title: string
  items: Array<{ label: string; href: string; comingSoon?: boolean; external?: boolean }>
  isOpen: boolean
  onToggle: () => void
  onClose: () => void
}) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const shouldShowDropdown = isMobile ? isOpen : isHovered

  return (
    <div
      className="relative"
      onMouseEnter={() => !isMobile && setIsHovered(true)}
      onMouseLeave={() => !isMobile && setIsHovered(false)}
    >
      <button
        onClick={isMobile ? onToggle : undefined}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault()
            if (isMobile) {
              onToggle()
            } else {
              setIsHovered(!isHovered)
            }
          }
        }}
        className="flex items-center space-x-1 px-3 py-2 rounded-lg text-gray-700 dark:text-gray-200 hover:text-[#4A235A] dark:hover:text-purple-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
        aria-expanded={shouldShowDropdown}
        aria-haspopup="true"
      >
        <span className="font-medium">{title}</span>
        <motion.div animate={{ rotate: shouldShowDropdown ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </button>

      <AnimatePresence>
        {shouldShowDropdown && (
          <>
            {isMobile && <div className="fixed inset-0 z-10" onClick={onClose} aria-hidden="true" />}

            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute top-full left-0 mt-2 w-56 bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-20"
              onMouseEnter={() => !isMobile && setIsHovered(true)}
              onMouseLeave={() => !isMobile && setIsHovered(false)}
            >
              {items.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  onClick={onClose}
                  className="flex items-center justify-between px-4 py-3 text-gray-700 dark:text-gray-200 hover:text-[#4A235A] dark:hover:text-purple-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-150 focus:outline-none focus:bg-gray-50 dark:focus:bg-gray-800"
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                >
                  <span className="font-medium">{item.label}</span>
                  <div className="flex items-center space-x-2">
                    {item.comingSoon && (
                      <span className="px-2 py-1 text-xs font-medium bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-full">
                        Coming Soon
                      </span>
                    )}
                    {item.external && <ExternalLink className="w-3 h-3 opacity-50" />}
                  </div>
                </Link>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

const MobileMenu = ({
  isOpen,
  onClose,
  isDarkMode,
  toggleDarkMode,
}: {
  isOpen: boolean
  onClose: () => void
  isDarkMode: boolean
  toggleDarkMode: () => void
}) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  const menuItems = [
    {
      title: "Our Solutions",
      items: [
        { label: "Zaza Promptly", href: "/promptly" },
        { label: "Zaza Teach", href: "/teach" },
        { label: "Zaza Coach", href: "/coach", comingSoon: true },
        { label: "Zaza Visuals", href: "/visuals", comingSoon: true },
        { label: "Zaza ClarityDeck", href: "/claritydeck" },
        { label: "Zaza Schwoop", href: "/schwoop", comingSoon: true },
      ],
    },
    {
      title: "Learning Centre",
      items: [
        { label: "Blog", href: "/blog" },
        { label: "Free Resources", href: "/resources" },
        { label: "FAQs", href: "/faq" },
      ],
    },
    {
      title: "About Us",
      items: [
        { label: "Vision & Mission", href: "/vision" },
        { label: "Our Story", href: "/story" },
        { label: "Careers", href: "/careers" },
      ],
    },
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
            onClick={onClose}
          />

          {/* Mobile Menu */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white dark:bg-gray-900 shadow-2xl z-50 lg:hidden"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Menu</h2>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation */}
              <div className="flex-1 overflow-y-auto py-4">
                {menuItems.map((section) => (
                  <div key={section.title} className="mb-4">
                    <button
                      onClick={() => setOpenDropdown(openDropdown === section.title ? null : section.title)}
                      className="flex items-center justify-between w-full px-6 py-3 text-left font-medium text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      <span>{section.title}</span>
                      <motion.div
                        animate={{ rotate: openDropdown === section.title ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown className="w-4 h-4" />
                      </motion.div>
                    </button>

                    <AnimatePresence>
                      {openDropdown === section.title && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden bg-gray-50 dark:bg-gray-800"
                        >
                          {section.items.map((item, index) => (
                            <Link
                              key={index}
                              href={item.href}
                              onClick={onClose}
                              className="flex items-center justify-between px-8 py-3 text-gray-600 dark:text-gray-300 hover:text-[#4A235A] dark:hover:text-purple-300 hover:bg-white dark:hover:bg-gray-700 transition-colors"
                            >
                              <span>{item.label}</span>
                              {item.comingSoon && (
                                <span className="px-2 py-1 text-xs font-medium bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-full">
                                  Coming Soon
                                </span>
                              )}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="p-6 border-t border-gray-200 dark:border-gray-700 space-y-4">
                {/* Dark Mode Toggle */}
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Dark Mode</span>
                  <button
                    onClick={toggleDarkMode}
                    className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 dark:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                    aria-label="Toggle dark mode"
                  >
                    <motion.span
                      animate={{ x: isDarkMode ? 20 : 2 }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      className="inline-block h-4 w-4 transform rounded-full bg-white shadow-lg"
                    />
                  </button>
                </div>

                {/* CTA Buttons */}
                <div className="space-y-3">
                  <Link href="/promptly" onClick={onClose}>
                    <Button className="w-full bg-gradient-to-r from-[#4A235A] to-purple-600 hover:from-[#5A2C6A] hover:to-purple-700 text-white">
                      <Sparkles className="w-4 h-4 mr-2" />
                      Try Zaza Promptly
                    </Button>
                  </Link>

                  <Link href="/teach" onClick={onClose}>
                    <Button className="w-full bg-gradient-to-r from-[#4A235A] to-purple-600 hover:from-[#5A2C6A] hover:to-purple-700 text-white">
                      <Sparkles className="w-4 h-4 mr-2" />
                      Try Zaza Teach
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default function SiteHeader() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [isScrolled, setIsScrolled] = useState(false)

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Handle dark mode
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [isDarkMode])

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setOpenDropdown(null)
    }

    document.addEventListener("click", handleClickOutside)
    return () => document.removeEventListener("click", handleClickOutside)
  }, [])

  const navigationItems = [
    {
      title: "Our Solutions",
      items: [
        { label: "Zaza Promptly", href: "/promptly" },
        { label: "Zaza Teach", href: "/teach" },
        { label: "Zaza Coach", href: "/coach", comingSoon: true },
        { label: "Zaza Visuals", href: "/visuals", comingSoon: true },
        { label: "Zaza ClarityDeck", href: "/claritydeck" },
        { label: "Zaza Schwoop", href: "/schwoop", comingSoon: true },
      ],
    },
    {
      title: "Learning Centre",
      items: [
        { label: "Blog", href: "/blog" },
        { label: "Free Resources", href: "/resources" },
        { label: "FAQs", href: "/faq" },
      ],
    },
    {
      title: "About Us",
      items: [
        { label: "Vision & Mission", href: "/vision" },
        { label: "Our Story", href: "/story" },
        { label: "Careers", href: "/careers" },
      ],
    },
  ]

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-lg border-b border-gray-200/20 dark:border-gray-700/20"
            : "bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center space-x-3 hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 rounded-lg"
            >
              <Image
                src="/images/zaza-logo.png"
                alt="Zaza Technologies"
                width={40}
                height={40}
                className="rounded-lg"
              />
              <span className="text-xl font-bold text-gray-900 dark:text-white">Zaza Technologies</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navigationItems.map((item) => (
                <DropdownMenu
                  key={item.title}
                  title={item.title}
                  items={item.items}
                  isOpen={openDropdown === item.title}
                  onToggle={() => setOpenDropdown(openDropdown === item.title ? null : item.title)}
                  onClose={() => setOpenDropdown(null)}
                />
              ))}
            </nav>

            {/* Desktop Right Side */}
            <div className="hidden lg:flex items-center space-x-4">
              {/* Dark Mode Toggle */}
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              {/* CTA Buttons */}
              <div className="flex items-center space-x-2">
                <Link href="/promptly">
                  <Button className="bg-gradient-to-r from-[#4A235A] to-purple-600 hover:from-[#5A2C6A] hover:to-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">
                    <Sparkles className="w-4 h-4 mr-2" />
                    Try Zaza Promptly
                  </Button>
                </Link>

                <Link href="/teach">
                  <Button className="bg-gradient-to-r from-[#4A235A] to-purple-600 hover:from-[#5A2C6A] hover:to-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">
                    <Sparkles className="w-4 h-4 mr-2" />
                    Try Zaza Teach
                  </Button>
                </Link>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        isDarkMode={isDarkMode}
        toggleDarkMode={() => setIsDarkMode(!isDarkMode)}
      />
    </>
  )
}
