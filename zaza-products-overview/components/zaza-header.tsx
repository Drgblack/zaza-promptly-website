"use client"

import { useState, useRef, useEffect } from "react"
import { Menu, X, ChevronDown, Sun, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useDarkMode } from "@/contexts/dark-mode-context"

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

export default function ZazaHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const { isDarkMode, toggleDarkMode, mounted } = useDarkMode()

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
    { name: "About Us", href: "/about", hasDropdown: true },
  ]

  const ctaButtons = [
    { name: "Try Zaza Promptly", href: "/promptly", variant: "gradient" as const },
    { name: "Try Zaza Teach", href: "/teach", variant: "purple" as const },
  ]

  const dropdownContent: Record<string, DropdownSection> = {
    "Our Solutions": {
      items: [
        { name: "Zaza Promptly", href: "/promptly" },
        { name: "Zaza Teach", href: "/teach" },
        { name: "Zaza Study", href: "#", comingSoon: true },
        { name: "Zaza Visuals", href: "#", comingSoon: true },
        { name: "Zaza Coach", href: "#", comingSoon: true },
        { name: "Zaza ClarityDeck", href: "#", comingSoon: true },
        { name: "Zaza Schwoop", href: "#", comingSoon: true },
        { name: "Zaza HR Spark", href: "#", comingSoon: true },
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
        { name: "FAQs", href: "/faqs" },
        { name: "Privacy & Data Policy", href: "/privacy" },
      ],
    },
    "About Us": {
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
  }

  const DropdownMenu = ({ name, content }: { name: string; content: DropdownSection }) => (
    <div
      className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-64 bg-white dark:bg-[#111827] rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50 transition-colors duration-200"
      onMouseEnter={() => handleDropdownEnter(name)}
      onMouseLeave={handleDropdownLeave}
    >
      <div className="py-1">
        {content.items.map((item) => (
          <a
            key={item.name}
            href={item.href}
            className="flex items-center justify-between px-4 py-2.5 text-sm text-slate-800 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150"
            title={item.comingSoon ? "Coming Soon" : undefined}
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
            className="block px-4 py-2.5 text-sm font-semibold text-slate-800 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150"
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
          className="flex items-center justify-between py-2 px-3 text-sm text-slate-800 dark:text-white hover:bg-white dark:hover:bg-gray-700 rounded transition-colors duration-150"
          onClick={() => setIsMobileMenuOpen(false)}
          title={item.comingSoon ? "Coming Soon" : undefined}
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
            className="block py-2 px-3 text-sm font-semibold text-slate-800 dark:text-white hover:bg-white dark:hover:bg-gray-700 rounded transition-colors duration-150"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {content.bottomLink.name}
          </a>
        </>
      )}
    </div>
  )

  return (
    <>
      {/* Dark Mode Script */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            if (
              localStorage.getItem('theme') === 'dark' ||
              (!('theme' in localStorage) &&
                window.matchMedia('(prefers-color-scheme: dark)').matches)
            ) {
              document.documentElement.classList.add('dark');
            } else {
              document.documentElement.classList.remove('dark');
            }
          `,
        }}
      />

      <header className="sticky top-0 z-50 bg-white/95 dark:bg-[#111827]/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 shadow-sm transition-colors duration-200">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-18">
            {/* Logo Section */}
            <a
              href="/"
              className="flex items-center space-x-3 hover:opacity-80 transition-opacity duration-200 flex-shrink-0 group"
            >
              <img
                src="/images/zaza-logo-final.png"
                alt="Zaza Technologies Logo"
                className="h-8 lg:h-10 w-auto object-contain"
              />
              <span className="text-xl lg:text-2xl font-bold text-slate-800 dark:text-white font-sans tracking-tight transition-colors duration-200 relative">
                Zaza Technologies
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-slate-800 dark:bg-white transition-all duration-300 group-hover:w-full"></span>
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
                    className="group flex items-center space-x-1 text-slate-800 dark:text-white hover:text-slate-600 dark:hover:text-gray-300 font-medium text-sm transition-colors duration-200 relative py-2"
                  >
                    <span>{item.name}</span>
                    {item.hasDropdown && (
                      <ChevronDown className="w-4 h-4 text-slate-600 dark:text-gray-400 group-hover:text-slate-800 dark:group-hover:text-white transition-colors duration-200" />
                    )}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-slate-800 dark:bg-white transition-all duration-300 group-hover:w-full"></span>
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
                  size="sm"
                  asChild
                  className={`
                    font-medium text-sm px-4 py-2 transition-all duration-200
                    ${
                      button.variant === "gradient"
                        ? "bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white border-0 hover:shadow-md"
                        : "bg-purple-600 hover:bg-purple-700 text-white hover:shadow-md"
                    }
                  `}
                >
                  <a href={button.href}>{button.name}</a>
                </Button>
              ))}

              {/* Dark Mode Toggle */}
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleDarkMode}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
                aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
                title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
              >
                <div className="relative w-5 h-5">
                  {mounted && (
                    <>
                      <Sun
                        className={`absolute inset-0 w-5 h-5 text-slate-800 dark:text-white transition-all duration-300 ${
                          isDarkMode ? "opacity-0 rotate-90 scale-0" : "opacity-100 rotate-0 scale-100"
                        }`}
                      />
                      <Moon
                        className={`absolute inset-0 w-5 h-5 text-slate-800 dark:text-white transition-all duration-300 ${
                          isDarkMode ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-0"
                        }`}
                      />
                    </>
                  )}
                </div>
              </Button>
            </div>

            {/* Mobile Menu Button + Dark Mode Toggle */}
            <div className="lg:hidden flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleDarkMode}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
                aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
              >
                <div className="relative w-5 h-5">
                  {mounted && (
                    <>
                      <Sun
                        className={`absolute inset-0 w-5 h-5 text-slate-800 dark:text-white transition-all duration-300 ${
                          isDarkMode ? "opacity-0 rotate-90 scale-0" : "opacity-100 rotate-0 scale-100"
                        }`}
                      />
                      <Moon
                        className={`absolute inset-0 w-5 h-5 text-slate-800 dark:text-white transition-all duration-300 ${
                          isDarkMode ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-0"
                        }`}
                      />
                    </>
                  )}
                </div>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="p-2"
                onClick={toggleMobileMenu}
                aria-label="Toggle navigation menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6 text-slate-800 dark:text-white" />
                ) : (
                  <Menu className="w-6 h-6 text-slate-800 dark:text-white" />
                )}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-[#111827] transition-colors duration-200">
              <nav className="py-4 space-y-1">
                {navigationItems.map((item) => (
                  <div key={item.name}>
                    <a
                      href={item.href}
                      className="flex items-center justify-between px-4 py-3 text-slate-800 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 font-medium text-base transition-colors duration-200 rounded-md mx-2"
                      onClick={() => !item.hasDropdown && setIsMobileMenuOpen(false)}
                    >
                      <span>{item.name}</span>
                      {item.hasDropdown && <ChevronDown className="w-4 h-4 text-slate-600 dark:text-gray-400" />}
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
                      size="sm"
                      asChild
                      className={`
                        w-full font-medium text-sm py-2.5 transition-all duration-200
                        ${
                          button.variant === "gradient"
                            ? "bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white border-0"
                            : "bg-purple-600 hover:bg-purple-700 text-white"
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
    </>
  )
}
