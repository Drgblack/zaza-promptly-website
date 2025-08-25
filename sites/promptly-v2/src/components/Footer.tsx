import Link from 'next/link'
import CookieSettingsButton from '@/components/cookies/CookieSettingsButton'
import MotionSettingsButton from '@/components/motion/MotionSettingsButton'
import SocialLinks from '@/components/common/SocialLinks'
import ThemeToggle from '@/components/common/ThemeToggle'
import LanguageSelect from '@/components/common/LanguageSelect'
import { getLinkProps } from '@/lib/link-utils'

interface FooterSection {
  title: string
  links: {
    title: string
    href: string
  }[]
}

const FOOTER_SECTIONS: FooterSection[] = [
  {
    title: 'Zaza Ecosystem',
    links: [
      { title: 'Zaza Promptly', href: '/' },
      { title: 'Zaza Teach', href: 'https://zazateach.com' },
      { title: 'Zaza Notably', href: 'https://zazanotably.com' },
    ]
  },
  {
    title: 'Products',
    links: [
      { title: 'Promptly', href: '/' },
      { title: 'Pricing', href: '/pricing' },
      { title: 'Quick Comment Helper', href: '/quick-comment-helper' },
      { title: 'Try Free Classroom Tool', href: '/tools/classroom' }, // TODO: Create placeholder page
    ]
  },
  {
    title: 'Resources',
    links: [
      { title: 'Learning Centre', href: '/learning-centre' },
      { title: 'Free Resources', href: '/free-resources' },
      { title: 'Case Studies', href: '/case-studies' },
      { title: 'Blog', href: '/blog' },
      { title: 'FAQ', href: '/faq' },
    ]
  },
  {
    title: 'Company',
    links: [
      { title: 'Meet Your Fellow Educator', href: '/about/founder' },
      { title: 'Contact', href: '/contact' },
      { title: 'Reliable AI That Won\'t Make Things Up', href: '/reliable-ai' }, // TODO: Create placeholder
      { title: 'Student Privacy Protected', href: '/student-privacy' }, // TODO: Create placeholder
      { title: 'Privacy Policy', href: '/privacy-policy' },
      { title: 'Terms of Service', href: '/terms' },
    ]
  }
]

export default function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Top section - ESLint style social icons, theme toggle, language selector */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-12">
          
          {/* Logo and Social links */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <Link href="/" className="flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-50 dark:focus:ring-offset-gray-900 rounded-lg p-1">
              <img 
                src="/images/zaza-logo.svg" 
                alt="Zaza Logo" 
                className="w-7 h-7"
                width={28}
                height={28}
              />
              <span className="text-lg font-bold text-slate-100 dark:text-white">Zaza Technologies</span>
            </Link>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <span className="text-sm font-medium text-slate-100 dark:text-white">
                Follow us:
              </span>
              <SocialLinks />
            </div>
          </div>
          
          {/* Controls - Theme toggle and Language selector */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <LanguageSelect />
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 dark:border-gray-800 mb-12"></div>
        
        {/* Main footer content - Link columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {FOOTER_SECTIONS.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold text-slate-100 dark:text-white mb-4 uppercase tracking-wide">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link 
                      href={link.href}
                      {...getLinkProps(link.href)}
                      className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-50 dark:focus-visible:ring-offset-gray-900 rounded-sm px-1 py-1"
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom divider */}
        <div className="border-t border-gray-200 dark:border-gray-800 pt-8">
          
          {/* Bottom legal/info bar */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            
            {/* Left side - Copyright and address */}
            <div className="text-sm text-gray-500 dark:text-gray-400 space-y-2">
              <div>
                © 2024 Zaza Technologies. All rights reserved.
              </div>
              <address className="not-italic">
                Königsallee 92a, 40212 Düsseldorf, Germany
              </address>
              <div className="italic">
                Built by educators for educators
              </div>
            </div>
            
            {/* Right side - Settings and utilities */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex flex-wrap items-center gap-4">
                <CookieSettingsButton />
                <MotionSettingsButton />
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}