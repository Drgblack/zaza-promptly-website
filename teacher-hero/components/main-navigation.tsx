"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ChevronDown, Menu, X, BookOpen, Download, Users } from "lucide-react"

interface NavigationItem {
  label: string
  href: string
  icon?: React.ComponentType<{ className?: string }>
  children?: NavigationItem[]
}

const navigationItems: NavigationItem[] = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Learning Centre",
    href: "/learning-centre",
    icon: BookOpen,
    children: [
      {
        label: "Free Resources",
        href: "/free-resources",
        icon: Download,
      },
      {
        label: "Lesson Plans",
        href: "/learning-centre/lesson-plans",
      },
      {
        label: "Teaching Guides",
        href: "/learning-centre/teaching-guides",
      },
      {
        label: "Webinars",
        href: "/learning-centre/webinars",
      },
    ],
  },
  {
    label: "Community",
    href: "/community",
    icon: Users,
  },
  {
    label: "Pricing",
    href: "/pricing",
  },
]

export default function MainNavigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const pathname = usePathname()
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const isActiveLink = (href: string) => {
    if (href === "/") return pathname === "/"
    return pathname.startsWith(href)
  }

  const isActiveParent = (item: NavigationItem) => {
    if (isActiveLink(item.href)) return true
    return item.children?.some((child) => isActiveLink(child.href)) || false
  }

  const toggleDropdown = (label: string) => {
    setActiveDropdown(activeDropdown === label ? null : label)
  }

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50" role="navigation" aria-label="Main navigation">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center space-x-2" aria-label="Zaza Technologies homepage">
              <img
                src="/images/z-logo.png"
                alt="Zaza Technologies Logo"
                className="w-8 h-8 rounded-lg"
                width={32}
                height={32}
              />
              <span className="text-xl font-bold text-gray-900">Zaza</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4" ref={dropdownRef}>
              {navigationItems.map((item) => (
                <div key={item.label} className="relative">
                  {item.children ? (
                    <div>
                      <Button
                        variant="ghost"
                        className={`px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                          isActiveParent(item)
                            ? "text-blue-600 bg-blue-50"
                            : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                        }`}
                        onClick={() => toggleDropdown(item.label)}
                        aria-expanded={activeDropdown === item.label}
                        aria-haspopup="true"
                      >
                        {item.icon && <item.icon className="w-4 h-4 mr-2" />}
                        {item.label}
                        <ChevronDown
                          className={`ml-1 h-4 w-4 transition-transform duration-200 ${
                            activeDropdown === item.label ? "rotate-180" : ""
                          }`}
                        />
                      </Button>

                      {activeDropdown === item.label && (
                        <div className="absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <div className="py-1" role="menu">
                            {item.children.map((child) => (
                              <Link
                                key={child.href}
                                href={child.href}
                                className={`flex items-center px-4 py-2 text-sm transition-colors duration-200 ${
                                  isActiveLink(child.href)
                                    ? "text-blue-600 bg-blue-50 font-medium"
                                    : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                                }`}
                                role="menuitem"
                                onClick={() => setActiveDropdown(null)}
                              >
                                {child.icon && <child.icon className="w-4 h-4 mr-3" />}
                                {child.label}
                                {isActiveLink(child.href) && (
                                  <span className="ml-auto w-2 h-2 bg-blue-600 rounded-full" aria-hidden="true" />
                                )}
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                        isActiveLink(item.href)
                          ? "text-blue-600 bg-blue-50"
                          : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                      }`}
                    >
                      {item.icon && <item.icon className="w-4 h-4 mr-2 inline" />}
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2">Get Started Free</Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navigationItems.map((item) => (
                <div key={item.label}>
                  {item.children ? (
                    <div>
                      <Button
                        variant="ghost"
                        className={`w-full justify-start px-3 py-2 text-base font-medium ${
                          isActiveParent(item)
                            ? "text-blue-600 bg-blue-50"
                            : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                        }`}
                        onClick={() => toggleDropdown(item.label)}
                      >
                        {item.icon && <item.icon className="w-5 h-5 mr-3" />}
                        {item.label}
                        <ChevronDown
                          className={`ml-auto h-4 w-4 transition-transform duration-200 ${
                            activeDropdown === item.label ? "rotate-180" : ""
                          }`}
                        />
                      </Button>

                      {activeDropdown === item.label && (
                        <div className="pl-6 space-y-1">
                          {item.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className={`flex items-center px-3 py-2 text-sm rounded-md transition-colors duration-200 ${
                                isActiveLink(child.href)
                                  ? "text-blue-600 bg-blue-50 font-medium"
                                  : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                              }`}
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              {child.icon && <child.icon className="w-4 h-4 mr-3" />}
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className={`flex items-center px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                        isActiveLink(item.href)
                          ? "text-blue-600 bg-blue-50"
                          : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.icon && <item.icon className="w-5 h-5 mr-3" />}
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}

              <div className="pt-4 border-t border-gray-200">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">Get Started Free</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
