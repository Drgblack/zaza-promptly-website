import React from 'react'
import Link from 'next/link'
import { Zap, Twitter, Linkedin, Github, Mail, Heart } from 'lucide-react'
import { cn } from '../lib/utils'

/**
 * Zaza Shared Footer Component
 * 
 * Unified footer component for all Zaza applications with:
 * - Product ecosystem links
 * - Company information
 * - Social media links
 * - Legal links
 * - Newsletter signup
 */

interface FooterProps {
  currentProduct?: string
  showNewsletter?: boolean
  showSocial?: boolean
  className?: string
}

interface FooterLink {
  name: string
  href: string
  external?: boolean
}

interface FooterSection {
  title: string
  links: FooterLink[]
}

const FOOTER_SECTIONS: FooterSection[] = [
  {
    title: 'Products',
    links: [
      { name: 'Zaza Promptly', href: 'https://zazapromptly.com', external: true },
      { name: 'Zaza Visuals', href: 'https://zazavisuals.com', external: true },
      { name: 'Zaza Study', href: 'https://zazastudy.com', external: true },
      { name: 'Zaza Spark', href: 'https://zazaspark.com', external: true },
      { name: 'Zaza Inbox', href: 'https://zazainbox.com', external: true },
    ]
  },
  {
    title: 'Resources',
    links: [
      { name: 'Free Templates', href: '/resources' },
      { name: 'Blog', href: '/blog' },
      { name: 'Help Center', href: '/support' },
      { name: 'API Documentation', href: '/docs' },
      { name: 'Community', href: '/community' },
    ]
  },
  {
    title: 'Company',
    links: [
      { name: 'About Us', href: '/about' },
      { name: 'Careers', href: '/careers' },
      { name: 'Press', href: '/press' },
      { name: 'Contact', href: '/contact' },
      { name: 'Partners', href: '/partners' },
    ]
  },
  {
    title: 'Legal',
    links: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Cookie Policy', href: '/cookies' },
      { name: 'GDPR', href: '/gdpr' },
      { name: 'Security', href: '/security' },
    ]
  }
]

const SOCIAL_LINKS = [
  { name: 'Twitter', href: 'https://twitter.com/zaza', icon: Twitter },
  { name: 'LinkedIn', href: 'https://linkedin.com/company/zaza', icon: Linkedin },
  { name: 'GitHub', href: 'https://github.com/zaza', icon: Github },
  { name: 'Email', href: 'mailto:hello@zaza.com', icon: Mail },
]

export function Footer({ 
  currentProduct, 
  showNewsletter = true, 
  showSocial = true,
  className 
}: FooterProps) {
  const currentYear = new Date().getFullYear()

  return (
    <footer className={cn("bg-gray-900 text-white", className)}>
      {/* Newsletter Section */}
      {showNewsletter && (
        <div className="border-b border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4">
                Stay Updated with Zaza
              </h3>
              <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
                Get the latest updates on new features, educational resources, and AI insights delivered to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                  Subscribe
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-3">
                Join 25,000+ educators. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">
                {currentProduct ? `${currentProduct} by Zaza` : 'Zaza'}
              </span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Empowering educators with AI tools that save time, improve student outcomes, and transform teaching.
            </p>
            {showSocial && (
              <div className="flex space-x-4">
                {SOCIAL_LINKS.map((social) => {
                  const IconComponent = social.icon
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      className="text-gray-400 hover:text-white transition-colors"
                      aria-label={social.name}
                    >
                      <IconComponent className="w-5 h-5" />
                    </a>
                  )
                })}
              </div>
            )}
          </div>

          {/* Footer Sections */}
          {FOOTER_SECTIONS.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold text-white mb-4">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    {link.external ? (
                      <a
                        href={link.href}
                        className="text-gray-400 hover:text-white transition-colors text-sm"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {link.name}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-gray-400 hover:text-white transition-colors text-sm"
                      >
                        {link.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 text-gray-400 text-sm mb-4 md:mb-0">
              <span>© {currentYear} Zaza. All rights reserved.</span>
              <span>•</span>
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500" />
              <span>for educators</span>
            </div>
            
            <div className="flex items-center space-x-6 text-sm">
              <Link href="/status" className="text-gray-400 hover:text-white transition-colors">
                System Status
              </Link>
              <Link href="/sitemap" className="text-gray-400 hover:text-white transition-colors">
                Sitemap
              </Link>
              <Link href="/accessibility" className="text-gray-400 hover:text-white transition-colors">
                Accessibility
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
} 