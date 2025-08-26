'use client';

import Image from 'next/image';
import SocialLinks from '@/components/common/SocialLinks';
import ThemeToggle from '@/components/common/ThemeToggle';
import LanguageSelect from '@/components/common/LanguageSelect';

export default function SiteFooter() {
  // Navigation data for easy editing
  const productLinks = [
    { name: 'Promptly', href: '/' },
    { name: 'Quick Comment Helper', href: '#' }, // TODO(route): find existing route
    { name: 'Zaza Notably', href: 'https://zazanotably.com' },
    { name: 'Classroom Tool', href: '#' }, // TODO(route): find existing route
  ];

  const solutionLinks = [
    { name: 'UK Primary Teachers', href: '#' }, // TODO(route): use existing site routes
    { name: 'US Secondary Teachers', href: '#' }, // TODO(route): use existing site routes
    { name: 'Special Education Teachers', href: '#' }, // TODO(route): use existing site routes
    { name: 'International Teachers', href: '#' }, // TODO(route): use existing site routes
    { name: 'EdTech-Savvy Teachers', href: '#' }, // TODO(route): use existing site routes
    { name: 'Head Teachers & Leaders', href: '#' }, // TODO(route): use existing site routes
  ];

  const companyLinks = [
    { name: 'Meet Your Fellow Educator', href: '/about' },
    { name: 'Student Privacy Protected', href: '/privacy' },
    { name: 'Reliable AI That Won\'t Make Things Up', href: '/faq' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Contact', href: '/contact' },
  ];

  const legalLinks = [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Use', href: '/terms' },
    { name: 'Cookie Policy', href: '/cookies' },
    { name: 'Brand Assets', href: '#' }, // TODO(route): /brand if not present
  ];

  return (
    <footer className="bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
      {/* Top utility row */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
          <SocialLinks />
          <div className="flex items-center space-x-6">
            <ThemeToggle />
            <LanguageSelect />
          </div>
        </div>
        
        {/* Divider */}
        <div className="border-t border-slate-200 dark:border-white/10 my-6"></div>
      </div>

      {/* Bottom row */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Products */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider">
              Products
            </h3>
            <ul className="mt-4 space-y-3">
              {productLinks.map((link) => (
                <li key={link.name}>
                  {link.href.startsWith('http') ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-600 dark:text-slate-300/90 hover:text-slate-900 dark:hover:text-white hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50 dark:focus-visible:ring-offset-slate-900 transition-colors"
                    >
                      {link.name}
                    </a>
                  ) : (
                    <a
                      href={link.href}
                      className="text-slate-600 dark:text-slate-300/90 hover:text-slate-900 dark:hover:text-white hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50 dark:focus-visible:ring-offset-slate-900 transition-colors"
                    >
                      {link.name}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Solutions by Role */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider">
              Solutions by Role
            </h3>
            <ul className="mt-4 space-y-3">
              {solutionLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-slate-600 dark:text-slate-300/90 hover:text-slate-900 dark:hover:text-white hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50 dark:focus-visible:ring-offset-slate-900 transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider">
              Company
            </h3>
            <ul className="mt-4 space-y-3">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-slate-600 dark:text-slate-300/90 hover:text-slate-900 dark:hover:text-white hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50 dark:focus-visible:ring-offset-slate-900 transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider">
              Legal
            </h3>
            <ul className="mt-4 space-y-3">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-slate-600 dark:text-slate-300/90 hover:text-slate-900 dark:hover:text-white hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50 dark:focus-visible:ring-offset-slate-900 transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Get the app */}
        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800">
          <div className="text-center">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-4">
              Get the app
            </h3>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a 
                href="https://placeholder-ios-store-link.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
              >
                <Image 
                  src="/images/appstore-badge.svg" 
                  alt="Download on the App Store" 
                  width={120} 
                  height={36} 
                  className="rounded-md"
                />
              </a>
              <a 
                href="https://placeholder-google-play-link.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
              >
                <Image 
                  src="/images/googleplay-badge.svg" 
                  alt="Get it on Google Play" 
                  width={120} 
                  height={36} 
                  className="rounded-md"
                />
              </a>
            </div>
          </div>
        </div>

        {/* Legal line */}
        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800">
          <p className="text-center text-sm text-slate-600 dark:text-slate-400">
            © 2025 Zaza Technologies. All rights reserved.
            <br className="sm:hidden" />
            <span className="hidden sm:inline"> · </span>
            Zaza Technologies · Königsallee 92a, 40212 Düsseldorf, Germany
          </p>
        </div>
      </div>
    </footer>
  );
}