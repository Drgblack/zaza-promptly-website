"use client"

import Link from 'next/link'
import { 
  Sparkles, 
  GraduationCap, 
  Palette, 
  Zap,
  ExternalLink,
  Globe,
  Mail,
  Twitter,
  Linkedin,
  Github,
  Heart
} from 'lucide-react'

interface UnifiedFooterProps {
  currentApp?: string
  className?: string
}

const ZAZA_APPS = [
  {
    id: 'promptly',
    name: 'Zaza Promptly',
    url: '/',
    description: 'Free AI teaching resources',
    icon: <Sparkles className="w-4 h-4" />,
    status: 'live'
  },
  {
    id: 'teach',
    name: 'Zaza Teach',
    url: 'https://zazateach.com',
    description: 'Complete lesson planning',
    icon: <GraduationCap className="w-4 h-4" />,
    status: 'live'
  },
  {
    id: 'visuals',
    name: 'Zaza Visuals',
    url: 'https://zazavisuals.com',
    description: 'AI classroom graphics',
    icon: <Palette className="w-4 h-4" />,
    status: 'beta'
  },
  {
    id: 'autoplanner',
    name: 'Zaza AutoPlanner',
    url: '#',
    description: 'Automated planning',
    icon: <Zap className="w-4 h-4" />,
    status: 'coming_soon'
  }
]

const FOOTER_LINKS = {
  promptly: [
    { name: 'Free Resources', href: '/free-resources' },
    { name: 'Blog', href: '/blog' },
    { name: 'Community', href: '/community' },
    { name: 'AI Prompts', href: '/prompts' }
  ],
  teach: [
    { name: 'Lesson Plans', href: '/lesson-plans' },
    { name: 'Templates', href: '/templates' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Support', href: '/support' }
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Careers', href: '/careers' },
    { name: 'Contact', href: '/contact' },
    { name: 'Press Kit', href: '/press' }
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Cookie Policy', href: '/cookies' },
    { name: 'GDPR', href: '/gdpr' }
  ]
}

export function UnifiedFooter({ 
  currentApp = 'promptly', 
  className = '' 
}: UnifiedFooterProps) {
  const currentYear = new Date().getFullYear()

  const getStatusIndicator = (status: string) => {
    const indicators = {
      live: <span className="w-2 h-2 bg-green-400 rounded-full"></span>,
      beta: <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>,
      coming_soon: <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
    }
    return indicators[status as keyof typeof indicators]
  }

  return (
    <footer className={`bg-gray-900 text-gray-300 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">Z</span>
              </div>
              <div>
                <div className="font-bold text-white text-lg">Zaza Technologies</div>
                <div className="text-sm text-gray-400">AI-powered tools for educators</div>
              </div>
            </div>
            
            <p className="text-gray-400 mb-6 max-w-md">
              Empowering teachers worldwide with intelligent tools that save time, 
              enhance learning, and make education more effective for everyone.
            </p>

            {/* Social Links */}
            <div className="flex space-x-4">
              <a 
                href="https://twitter.com/zazateach" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a 
                href="https://linkedin.com/company/zaza-technologies" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a 
                href="mailto:hello@zazatechnologies.com"
                className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a 
                href="https://github.com/zaza-technologies" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Zaza Apps */}
          <div>
            <h3 className="font-semibold text-white mb-4 flex items-center">
              <Globe className="w-4 h-4 mr-2" />
              Zaza Apps
            </h3>
            <ul className="space-y-3">
              {ZAZA_APPS.map((app) => (
                <li key={app.id}>
                  {app.url.startsWith('http') ? (
                    <a
                      href={app.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between group hover:text-white transition-colors"
                    >
                      <div className="flex items-center space-x-2">
                        {app.icon}
                        <span className="text-sm">{app.name}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        {getStatusIndicator(app.status)}
                        {app.status !== 'coming_soon' && (
                          <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                        )}
                      </div>
                    </a>
                  ) : (
                    <Link
                      href={app.url}
                      className="flex items-center justify-between group hover:text-white transition-colors"
                    >
                      <div className="flex items-center space-x-2">
                        {app.icon}
                        <span className="text-sm">{app.name}</span>
                      </div>
                      {getStatusIndicator(app.status)}
                    </Link>
                  )}
                  <p className="text-xs text-gray-500 ml-6 mt-1">{app.description}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">
              {currentApp === 'promptly' ? 'Promptly' : 'Products'}
            </h3>
            <ul className="space-y-2">
              {FOOTER_LINKS[currentApp as keyof typeof FOOTER_LINKS]?.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              )) || FOOTER_LINKS.promptly.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company & Legal */}
          <div>
            <h3 className="font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-2 mb-6">
              {FOOTER_LINKS.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            
            <h4 className="font-semibold text-white mb-3 text-sm">Legal</h4>
            <ul className="space-y-2">
              {FOOTER_LINKS.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-xs hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <span>© {currentYear} Zaza Technologies. All rights reserved.</span>
            </div>
            
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500 fill-current" />
              <span>for teachers worldwide</span>
            </div>
          </div>
          
          {/* Cross-app Discovery Banner */}
          <div className="mt-6 p-4 bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-lg border border-purple-800/30">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0">
              <div className="text-center md:text-left">
                <h4 className="font-semibold text-white mb-1">
                  Discover the Complete Zaza Ecosystem
                </h4>
                <p className="text-sm text-gray-300">
                  From free resources to full lesson planning - we have tools for every teaching need.
                </p>
              </div>
              <div className="flex space-x-3">
                <Link
                  href="/zaza-ecosystem"
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-sm font-medium rounded-lg transition-colors"
                >
                  Explore All Apps
                </Link>
                {currentApp === 'promptly' && (
                  <a
                    href="https://zazateach.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors flex items-center space-x-1"
                  >
                    <GraduationCap className="w-4 h-4" />
                    <span>Try Zaza Teach</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

// Cross-app navigation data export for other components
export { ZAZA_APPS }
export type { UnifiedFooterProps }