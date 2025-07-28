"use client"

import { useState, useRef, useEffect } from "react"
import { Menu, X, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import DarkModeToggle from "./dark-mode-toggle"

interface DropdownItem {
  name: string
  href: string
  comingSoon?: boolean
}

interface DropdownSection {
  items: DropdownItem[]
  bottomLink?: {
    name: string
    href: string
  }
}

export default function NewHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const handleDropdownEnter = (dropdownName: string) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current)
    }
    setActiveDropdown(dropdownName)
  }

  const handleDropdownLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null)
    }, 150)
  }

  useEffect(() => {
    return () => {
      if (dropdownTimeoutRef.current) {
        clearTimeout(dropdownTimeoutRef.current)
      }
    }
  }, [])

  const navigationItems = [
    { name: "Our Solutions", href: "/solutions", hasDropdown: true },
    { name: "Learning Centre", href: "/learning", hasDropdown: true },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Vision & Mission", href: "/vision-mission" },
  ]

  const ctaButtons = [
    { name: "Try Zaza Teach", href: "/zaza-teach-website", variant: "outline" as const },
    { name: "Try Zaza Promptly", href: "/zaza-promptly-site", variant: "default" as const },
  ]

  const dropdownContent: Record<string, DropdownSection> = {
    "Our Solutions": {
      items: [
        { name: "Zaza Promptly", href: "/zaza-promptly-site" },
        { name: "Zaza Teach", href: "/zaza-teach-website" },
        { name: "Zaza Study", href: "/zaza-study-landing", comingSoon: true },
        { name: "Zaza Visuals", href: "/zaza-visuals-landing (1)", comingSoon: true },
        { name: "Zaza Coach", href: "/zaza-coach", comingSoon: true },
        { name: "Zaza ClarityDeck", href: "/claritydeck-landing", comingSoon: true },
        { name: "Zaza Schwoop", href: "/zaza-schwoop", comingSoon: true },
        { name: "Zaza HR Spark", href: "/zaza-hr-spark", comingSoon: true },
      ],
      bottomLink: {
        name: "See All Products",
        href: "/products",
      },
    },
    "Learning Centre": {
      items: [
        { name: "Blog", href: "/blog" },
        { name: "Free Resources", href: "/resources" },
        { name: "FAQs", href: "/faq" },
        { name: "Privacy & Data Policy", href: "/privacy" },
      ],
    },
  }

  const DropdownMenu = ({ name, content }: { name: string; content: DropdownSection }) => (
    <div
      className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50 transition-colors duration-200"
      onMouseEnter={() => handleDropdownEnter(name)}
      onMouseLeave={handleDropdownLeave}
    >
      <div className="py-1">
        {content.items.map((item) => (
          <a
            key={item.name}
            href={item.href}
            className="flex items-center justify-between px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition-colors duration-150"
            title={item.comingSoon ? "Landing page in development" : undefined}
          >
            <span className="font-medium">{item.name}</span>
            {item.comingSoon && (
              <span className="bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 text-xs px-2 py-0.5 rounded-full ml-2 font-medium">
                Coming Soon
              </span>
            )}
          </a>
        ))}
      </div>

      {content.bottomLink && (
        <>
          <div className="border-t border-gray-100 dark:border-gray-700 my-1"></div>
          <a
            href={content.bottomLink.href}
            className="block px-4 py-2.5 text-sm font-semibold text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150"
          >
            {content.bottomLink.name}
          </a>
        </>
      )}
    </div>
  )

  const MobileDropdownMenu = ({ name, content }: { name: string; content: DropdownSection }) => (
    <div className="pl-4 py-2 space-y-1 bg-gray-50 dark:bg-gray-800 rounded-md mx-2 mt-2 transition-colors duration-200">
      {content.items.map((item) => (
        <a
          key={item.name}
          href={item.href}
          className="flex items-center justify-between py-2 px-3 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-white dark:hover:bg-gray-700 rounded transition-colors duration-150"
          onClick={() => setIsMobileMenuOpen(false)}
          title={item.comingSoon ? "Landing page in development" : undefined}
        >
          <span>{item.name}</span>
          {item.comingSoon && (
            <span className="bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 text-xs px-2 py-0.5 rounded-full ml-2 font-medium">
              Coming Soon
            </span>
          )}
        </a>
      ))}

      {content.bottomLink && (
        <>
          <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>
          <a
            href={content.bottomLink.href}
            className="block py-2 px-3 text-sm font-semibold text-gray-900 dark:text-white hover:bg-white dark:hover:bg-gray-700 rounded transition-colors duration-150"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {content.bottomLink.name}
          </a>
        </>
      )}
    </div>
  )

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 shadow-sm transition-colors duration-200">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-18">
          {/* Logo Section */}
          <a
            href="/"
            className="flex items-center space-x-3 hover:opacity-80 transition-opacity duration-200 flex-shrink-0"
          >
            <img src="/images/zaza-logo.png" alt="Zaza Technologies Logo" className="w-8 h-8 lg:w-9 lg:h-9" />
            <span className="text-xl lg:text-2xl font-semibold text-gray-900 dark:text-white font-sans tracking-tight transition-colors duration-200">
              Zaza
            </span>
          </a>

          {/* Desktop Navigation - Centered */}
          <nav className="hidden lg:flex items-center space-x-8 flex-1 justify-center">
            {navigationItems.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => item.hasDropdown && handleDropdownEnter(item.name)}
                onMouseLeave={() => item.hasDropdown && handleDropdownLeave()}
              >
                <a
                  href={item.href}
                  className="group flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium text-sm transition-colors duration-200 relative py-2"
                >
                  <span>{item.name}</span>
                  {item.hasDropdown && (
                    <ChevronDown className="w-4 h-4 text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-200" />
                  )}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gray-900 dark:bg-white transition-all duration-300 group-hover:w-full"></span>
                </a>

                {/* Desktop Dropdown */}
                {item.hasDropdown && activeDropdown === item.name && (
                  <DropdownMenu name={item.name} content={dropdownContent[item.name]} />
                )}
              </div>
            ))}
          </nav>

          {/* Desktop Right Section - CTA Buttons + Dark Mode Toggle */}
          <div className="hidden lg:flex items-center space-x-3 flex-shrink-0">
            {ctaButtons.map((button) => (
              <Button
                key={button.name}
                variant={button.variant}
                size="sm"
                asChild
                className={`
                  font-medium text-sm px-4 py-2 transition-all duration-200
                  ${
                    button.variant === "outline"
                      ? "bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white border-0 hover:shadow-md"
                      : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white hover:shadow-md"
                  }
                `}
              >
                <a href={button.href}>{button.name}</a>
              </Button>
            ))}
            <DarkModeToggle />
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-2">
            <DarkModeToggle />
            <Button
              variant="ghost"
              size="sm"
              className="p-2"
              onClick={toggleMobileMenu}
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 transition-colors duration-200">
            <nav className="py-4 space-y-1">
              {navigationItems.map((item) => (
                <div key={item.name}>
                  <a
                    href={item.href}
                    className="flex items-center justify-between px-4 py-3 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 font-medium text-base transition-colors duration-200 rounded-md mx-2"
                    onClick={() => !item.hasDropdown && setIsMobileMenuOpen(false)}
                  >
                    <span>{item.name}</span>
                    {item.hasDropdown && <ChevronDown className="w-4 h-4 text-gray-500 dark:text-gray-400" />}
                  </a>

                  {/* Mobile Dropdown */}
                  {item.hasDropdown && <MobileDropdownMenu name={item.name} content={dropdownContent[item.name]} />}
                </div>
              ))}

              {/* Mobile CTA Buttons */}
              <div className="px-6 pt-4 space-y-3 border-t border-gray-100 dark:border-gray-700 mt-4">
                {ctaButtons.map((button) => (
                  <Button
                    key={button.name}
                    variant={button.variant}
                    size="sm"
                    asChild
                    className={`
                      w-full font-medium text-sm py-2.5 transition-all duration-200
                      ${
                        button.variant === "outline"
                          ? "bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white border-0"
                          : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                      }
                    `}
                  >
                    <a href={button.href} onClick={() => setIsMobileMenuOpen(false)}>
                      {button.name}
                    </a>
                  </Button>
                ))}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
