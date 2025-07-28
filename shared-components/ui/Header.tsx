import React from 'react'
import Link from 'next/link'
import { Menu, X, ChevronDown, Search, User, Zap } from 'lucide-react'
import { cn } from '../lib/utils'

/**
 * Zaza Shared Header Component
 * 
 * Unified header component for all Zaza applications with:
 * - Responsive navigation
 * - Product ecosystem dropdown
 * - Search functionality
 * - User account access
 * - Mobile menu
 */

interface HeaderProps {
  currentProduct?: string
  showSearch?: boolean
  showUserMenu?: boolean
  transparent?: boolean
  className?: string
}

interface NavigationItem {
  name: string
  href: string
  external?: boolean
  description?: string
}

interface ProductItem {
  name: string
  description: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  status: 'live' | 'coming-soon' | 'beta'
}

const PRODUCTS: ProductItem[] = [
  {
    name: 'Zaza Promptly',
    description: 'AI-powered student feedback generation',
    href: 'https://zazapromptly.com',
    icon: Zap,
    status: 'live'
  },
  {
    name: 'Zaza Visuals',
    description: 'AI image generation for educators',
    href: 'https://zazavisuals.com',
    icon: Zap,
    status: 'live'
  },
  {
    name: 'Zaza Study',
    description: 'AI-powered study tools and flashcards',
    href: 'https://zazastudy.com',
    icon: Zap,
    status: 'coming-soon'
  },
  {
    name: 'Zaza Spark',
    description: 'AI lesson planning and curriculum design',
    href: 'https://zazaspark.com',
    icon: Zap,
    status: 'coming-soon'
  },
  {
    name: 'Zaza Inbox',
    description: 'AI email management for teachers',
    href: 'https://zazainbox.com',
    icon: Zap,
    status: 'beta'
  }
]

const NAVIGATION: NavigationItem[] = [
  { name: 'Features', href: '/features' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'Resources', href: '/resources' },
  { name: 'Blog', href: '/blog' },
  { name: 'Support', href: '/support' },
  { name: 'About', href: '/about' }
]

export function Header({ 
  currentProduct, 
  showSearch = true, 
  showUserMenu = true, 
  transparent = false,
  className 
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  const [productsMenuOpen, setProductsMenuOpen] = React.useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'live': return 'bg-green-100 text-green-800'
      case 'coming-soon': return 'bg-yellow-100 text-yellow-800'
      case 'beta': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'live': return 'Live'
      case 'coming-soon': return 'Coming Soon'
      case 'beta': return 'Beta'
      default: return status
    }
  }

  return (
    <header className={cn(
      "relative z-50",
      transparent ? "bg-transparent" : "bg-white shadow-sm border-b border-gray-200",
      className
    )}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">
                {currentProduct ? `${currentProduct} by Zaza` : 'Zaza'}
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {/* Products Dropdown */}
            <div className="relative">
              <button
                onMouseEnter={() => setProductsMenuOpen(true)}
                onMouseLeave={() => setProductsMenuOpen(false)}
                className="flex items-center space-x-1 text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                <span>Products</span>
                <ChevronDown className="w-4 h-4" />
              </button>

              {productsMenuOpen && (
                <div
                  onMouseEnter={() => setProductsMenuOpen(true)}
                  onMouseLeave={() => setProductsMenuOpen(false)}
                  className="absolute top-full left-0 mt-1 w-80 bg-white rounded-lg shadow-lg border border-gray-200 py-2"
                >
                  <div className="px-4 py-2 border-b border-gray-100">
                    <h3 className="text-sm font-semibold text-gray-900">Zaza Ecosystem</h3>
                    <p className="text-xs text-gray-500">AI tools for every educator</p>
                  </div>
                  {PRODUCTS.map((product) => {
                    const IconComponent = product.icon
                    return (
                      <Link
                        key={product.name}
                        href={product.href}
                        className="flex items-center px-4 py-3 hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                          <IconComponent className="w-4 h-4 text-blue-600" />
                        </div>
                        <div className="ml-3 flex-1">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-gray-900">{product.name}</p>
                            <span className={cn(
                              "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium",
                              getStatusColor(product.status)
                            )}>
                              {getStatusText(product.status)}
                            </span>
                          </div>
                          <p className="text-xs text-gray-500">{product.description}</p>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              )}
            </div>

            {/* Main Navigation */}
            {NAVIGATION.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right side actions */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {/* Search */}
            {showSearch && (
              <button className="p-2 text-gray-400 hover:text-gray-500">
                <Search className="w-5 h-5" />
              </button>
            )}

            {/* User Menu */}
            {showUserMenu && (
              <div className="relative">
                <button className="flex items-center space-x-2 text-gray-700 hover:text-gray-900">
                  <User className="w-5 h-5" />
                  <span className="text-sm font-medium">Sign In</span>
                </button>
              </div>
            )}

            {/* CTA Button */}
            <Link
              href="/pricing"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-400 hover:text-gray-500"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200">
              {/* Mobile Products */}
              <div className="px-3 py-2">
                <h3 className="text-sm font-semibold text-gray-900 mb-2">Products</h3>
                <div className="space-y-2">
                  {PRODUCTS.map((product) => {
                    const IconComponent = product.icon
                    return (
                      <Link
                        key={product.name}
                        href={product.href}
                        className="flex items-center px-3 py-2 rounded-md text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                      >
                        <IconComponent className="w-4 h-4 text-blue-600 mr-3" />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span>{product.name}</span>
                            <span className={cn(
                              "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium",
                              getStatusColor(product.status)
                            )}>
                              {getStatusText(product.status)}
                            </span>
                          </div>
                          <p className="text-xs text-gray-500">{product.description}</p>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              </div>

              {/* Mobile Navigation */}
              {NAVIGATION.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                >
                  {item.name}
                </Link>
              ))}

              {/* Mobile Actions */}
              <div className="pt-4 pb-3 border-t border-gray-200">
                {showUserMenu && (
                  <Link
                    href="/signin"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                  >
                    Sign In
                  </Link>
                )}
                <Link
                  href="/pricing"
                  className="block px-3 py-2 rounded-md text-base font-medium bg-blue-600 text-white hover:bg-blue-700"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
} 