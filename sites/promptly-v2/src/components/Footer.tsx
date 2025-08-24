import Link from 'next/link'
import CookieSettingsButton from '@/components/cookies/CookieSettingsButton'
import MotionSettingsButton from '@/components/motion/MotionSettingsButton'

interface FooterSection {
  title: string
  links: {
    title: string
    href: string
  }[]
}

const FOOTER_SECTIONS: FooterSection[] = [
  {
    title: 'Products',
    links: [
      { title: 'Promptly', href: '/' },
      { title: 'Quick Comment Helper', href: '/quick-comment-helper' },
      { title: 'Try Free Classroom Tool', href: '/tools/classroom' }, // TODO: Create placeholder page
    ]
  },
  {
    title: 'Solutions by Teaching Role',
    links: [
      { title: 'UK Primary Teachers', href: '/solutions/uk-primary' }, // TODO: Create or link to existing
      { title: 'US Secondary Teachers', href: '/solutions/us-secondary' }, // TODO: Create or link to existing
      { title: 'Special Education Teachers', href: '/solutions/special-education' }, // TODO: Create or link to existing
      { title: 'International Teachers', href: '/solutions/international' }, // TODO: Create or link to existing
      { title: 'EdTech-Savvy Teachers', href: '/solutions/edtech-savvy' }, // TODO: Create or link to existing
      { title: 'Head Teachers & Leaders', href: '/solutions/head-teachers-leaders' }, // TODO: Create or link to existing
    ]
  },
  {
    title: 'Resources',
    links: [
      { title: 'Learning Centre', href: '/learning-centre' },
      { title: 'Free Resources', href: '/resources' }, // TODO: Check if /resources exists vs /free-resources
      { title: 'Case Studies', href: '/case-studies' },
      { title: 'Blog', href: '/blog' },
      { title: 'FAQ', href: '/faq' },
    ]
  },
  {
    title: 'Company',
    links: [
      { title: 'Meet Your Fellow Educator', href: '/about' }, // TODO: Check if /about exists vs /about/founder
      { title: 'Contact', href: '/contact' },
      { title: 'Reliable AI That Won\'t Make Things Up', href: '/reliable-ai' }, // TODO: Create placeholder
      { title: 'Student Privacy Protected', href: '/student-privacy' }, // TODO: Create placeholder
      { title: 'Privacy Policy', href: '/privacy-policy' }, // TODO: Check if exists vs /privacy
      { title: 'FAQ', href: '/faq' },
    ]
  }
]

export default function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Main footer content - ESLint style columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {FOOTER_SECTIONS.map((section, index) => (
            <div key={section.title} className={index === 0 ? 'sm:col-span-2 lg:col-span-1' : ''}>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 uppercase tracking-wide">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link 
                      href={link.href} 
                      className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-sm px-1 py-1"
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="mt-12 border-t border-gray-200 dark:border-gray-800 pt-8">
          
          {/* Bottom legal/info bar */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            
            {/* Left side - Copyright and address */}
            <div className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
              <div>
                © 2024 Zaza Technologies. All rights reserved.
              </div>
              <div>
                Königsallee 92a, 40212 Düsseldorf, Germany
              </div>
              <div className="italic">
                Built by educators for educators
              </div>
            </div>
            
            {/* Right side - Settings and utilities */}
            <div className="flex flex-wrap items-center gap-4">
              <CookieSettingsButton />
              <MotionSettingsButton />
              
              {/* Build timestamp */}
              <span id="build-marker" className="text-xs text-gray-400 dark:text-gray-500">
                build 2025-08-24 10:50 UTC
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}