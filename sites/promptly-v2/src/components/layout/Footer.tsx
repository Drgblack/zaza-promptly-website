'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import LanguageSwitcher from '@/components/nav/LanguageSwitcher'

interface FooterLink {
  name: string
  href: string
  external?: boolean
}

interface FooterSection {
  title: string
  links: FooterLink[]
}

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const pathname = usePathname()
  
  // Extract locale from pathname
  const locale = pathname.startsWith('/en') ? 'en' : 
                 pathname.startsWith('/de') ? 'de' :
                 pathname.startsWith('/fr') ? 'fr' :
                 pathname.startsWith('/es') ? 'es' :
                 pathname.startsWith('/it') ? 'it' : 'en'

  const footerSections: Record<string, FooterSection> = {
    product: {
      title: 'Product',
      links: [
        { name: 'Features', href: `/${locale}/zara` },
        { name: 'Pricing', href: `/${locale}/pricing` },
        { name: 'Case Studies', href: `/${locale}/case-studies` }
      ]
    },
    ecosystem: {
      title: 'Zaza Ecosystem',
      links: [
        { name: 'Zaza Teach', href: 'https://zazateach.com', external: true },
        { name: 'Zaza Draft', href: 'https://zazadraft.com', external: true },
        { name: 'Zaza Technologies', href: 'https://zazatechnologies.com', external: true },
      ]
    },
    resources: {
      title: 'Resources',
      links: [
        { name: 'Blog', href: `/${locale}/blog` },
        { name: 'Teacher Resources', href: `/${locale}/resources` },
        { name: 'Support', href: `/${locale}/support` },
        { name: 'FAQ', href: `/${locale}/faq` }
      ]
    },
    company: {
      title: 'Company',
      links: [
        { name: 'About', href: `/${locale}/about-founder` },
        { name: 'Privacy Policy', href: `/${locale}/privacy` },
        { name: 'Terms of Service', href: `/${locale}/terms` },
        { name: 'Contact', href: `/${locale}/contact` }
      ]
    }
  }

  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-1">
            <Link href="/" className="flex items-center space-x-3 mb-4">
              <Image
                src="/images/logo/zaza-logo-icon.svg"
                alt="Zaza Draft"
                width={32}
                height={32}
                className="w-8 h-8"
              />
              <span className="text-xl font-bold">Zaza Draft</span>
            </Link>
            <p className="text-slate-300 mb-4">
              AI-powered teaching assistant that helps teachers write student comments and parent messages 10x faster.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://x.com/zazateachapp" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition-colors"
                aria-label="X (Twitter)"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a 
                href="https://www.linkedin.com/company/zaza-technologies" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a 
                href="https://www.tiktok.com/@zazatechnologies" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition-colors"
                aria-label="TikTok"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-.88-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Footer Sections */}
          {Object.entries(footerSections).map(([key, section]) => (
            <div key={key} className="col-span-1">
              <h3 className="text-lg font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    {link.external ? (
                      <a 
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-300 hover:text-white transition-colors"
                      >
                        {link.name}
                      </a>
                    ) : (
                      <Link 
                        href={link.href}
                        className="text-slate-300 hover:text-white transition-colors"
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

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-400 text-sm">
            © {currentYear} Zaza Technologies. All rights reserved.
          </p>
          <div className="flex flex-col md:flex-row items-center gap-4 mt-4 md:mt-0">
            <LanguageSwitcher />
            <p className="text-slate-400 text-sm">
              Built by educators, for educators.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
