'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Top Section with Logo */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 pb-8 border-b border-gray-800">
          <div className="flex items-center space-x-4 mb-6 md:mb-0">
            <div className="relative">
              <img 
                src="/zaza-logo.png" 
                alt="Zaza Technologies Logo" 
                className="w-12 h-12 rounded-xl shadow-lg"
                width={48}
                height={48}
              />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse"></div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">Zaza Technologies</div>
              <div className="text-sm text-gray-400 font-medium">AI for Educators</div>
            </div>
          </div>
          
          {/* Social Links */}
          <div className="flex space-x-4">
            <a href="https://tiktok.com/@zazateach" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 hover:bg-purple-600 rounded-lg flex items-center justify-center transition-colors duration-200">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
              </svg>
            </a>
            <a href="https://twitter.com/zazatechnologies" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 hover:bg-purple-600 rounded-lg flex items-center justify-center transition-colors duration-200">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </a>
            <a href="https://www.linkedin.com/company/zaza-technologies/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 hover:bg-purple-600 rounded-lg flex items-center justify-center transition-colors duration-200">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 text-sm">
          <div>
            <h3 className="text-lg font-bold mb-4 text-white">Zaza Ecosystem</h3>
            <ul className="space-y-3">
              <li><Link href="https://zazapromptly.com" className="hover:text-purple-400 transition-colors duration-200">Zaza Promptly</Link></li>
              <li><Link href="https://zazateach.com" className="hover:text-purple-400 transition-colors duration-200">Zaza Teach</Link></li>
              <li><Link href="https://zazainbox.com" className="hover:text-purple-400 transition-colors duration-200">Zaza Inbox</Link></li>
              <li><Link href="https://zazavisuals.com" className="hover:text-purple-400 transition-colors duration-200">Zaza Visuals</Link></li>
              <li><Link href="https://zazaclaritydeck.com" className="hover:text-purple-400 transition-colors duration-200">Zaza ClarityDeck</Link></li>
              <li><Link href="https://zazaschwoop.com" className="hover:text-purple-400 transition-colors duration-200">Zaza Schwoop</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4 text-white">Support</h3>
            <ul className="space-y-3">
              <li><Link href="/contact" className="hover:text-purple-400 transition-colors duration-200">Contact Us</Link></li>
              <li><Link href="/privacy" className="hover:text-purple-400 transition-colors duration-200">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-purple-400 transition-colors duration-200">Terms of Use</Link></li>
              <li><Link href="/support" className="hover:text-purple-400 transition-colors duration-200">Help Center</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4 text-white">Learning Centre</h3>
            <ul className="space-y-3">
              <li><Link href="/blog" className="hover:text-purple-400 transition-colors duration-200">Blog</Link></li>
              <li><Link href="/free-resources" className="hover:text-purple-400 transition-colors duration-200">Free Resources</Link></li>
              <li><Link href="/faqs" className="hover:text-purple-400 transition-colors duration-200">FAQs</Link></li>
              <li><Link href="/about-founder" className="hover:text-purple-400 transition-colors duration-200">About the Founder</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4 text-white">Newsletter</h3>
            <p className="text-gray-400 mb-4">Get AI teaching tips and updates delivered to your inbox.</p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-l-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
              />
              <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-r-lg transition-colors duration-200">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-800 text-center">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-xs text-gray-400">
              © {new Date().getFullYear()} Zaza Technologies UG. All rights reserved.
            </div>
            <div className="flex space-x-6 text-xs text-gray-400">
              <Link href="/privacy" className="hover:text-purple-400 transition-colors duration-200">Privacy</Link>
              <Link href="/terms" className="hover:text-purple-400 transition-colors duration-200">Terms</Link>
              <Link href="/cookies" className="hover:text-purple-400 transition-colors duration-200">Cookies</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
