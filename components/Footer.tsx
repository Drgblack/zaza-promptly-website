'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathname = usePathname();
  const locale = pathname.startsWith('/de') ? 'de' : 'en';
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  // Accessibility labels and tooltips for product links
  const productLabels = {
    en: {
      promptly: "Zaza Promptly - AI helper for caring parent messages and report comments",
      teach: "Zaza Teach - AI lesson planning assistant for engaging, curriculum-aligned lessons",
      autoplanner: "Zaza AutoPlanner - Flagship AI agent for multimodal, adaptive lesson planning",
      notably: "Zaza Notably Suite - AI professional communication tools for work",
      spark: "Zaza Spark - AI productivity for HR onboarding, training, and communication",
      looop: "Zaza Looop - Culturally immersive AI language learning",
      knowledgecore: "Zaza KnowledgeCore - The memory spine to capture and resurface your teaching knowledge"
    },
    de: {
      promptly: "Zaza Promptly - KI-Helfer für einfühlsame Elternnachrichten und Zeugnisbemerkungen",
      teach: "Zaza Teach - KI-Unterrichtsplanung für ansprechende, lehrplankonforme Stunden",
      autoplanner: "Zaza AutoPlanner - Flaggschiff-KI für multimodale, adaptive Unterrichtsplanung",
      notably: "Zaza Notably Suite - KI-Kommunikationstools für professionelle Arbeit",
      spark: "Zaza Spark - KI-Produktivität für HR-Onboarding, Schulungen und Kommunikation",
      looop: "Zaza Looop - Kulturell immersives KI-Sprachlernen",
      knowledgecore: "Zaza KnowledgeCore - Das Gedächtnis der Lehre für Erfassung und Wiederauffindbarkeit von Wissen"
    }
  };

  // Social media accessibility labels
  const socialLabels = {
    en: {
      tiktok: "Follow Zaza on TikTok",
      twitter: "Follow Zaza on X (Twitter)",
      linkedin: "Connect with Zaza on LinkedIn"
    },
    de: {
      tiktok: "Folgen Sie Zaza auf TikTok",
      twitter: "Folgen Sie Zaza auf X (Twitter)",
      linkedin: "Vernetzen Sie sich mit Zaza auf LinkedIn"
    }
  };

  // Section headings and descriptions
  const sectionTexts = {
    en: {
      coreProducts: "Core EdTech Products",
      coreDescription: "AI tools designed to save teachers time",
      adjacentProducts: "Adjacent Opportunities",
      adjacentDescription: "Future Zaza projects you can explore"
    },
    de: {
      coreProducts: "Unterrichtswerkzeuge",
      coreDescription: "KI-Tools, die Lehrkräften Zeit sparen",
      adjacentProducts: "Weitere Zaza-Apps",
      adjacentDescription: "Zukünftige Zaza-Projekte zum Entdecken"
    }
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    setMessage('');

    try {
      const response = await fetch('/api/brevo-subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          source: 'footer',
          tags: ['newsletter_signup', 'footer_subscription'],
          listId: 1
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage('Successfully subscribed! Check your email.');
        setEmail('');
        
        // Track successful subscription
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'newsletter_subscribe', {
            event_category: 'engagement',
            event_label: 'footer',
            value: 1
          });
        }
      } else {
        setMessage(result.error || 'Subscription failed. Please try again.');
      }
    } catch (error) {
      setMessage('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

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
            <a 
              href="https://www.tiktok.com/@zazatechnologies" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-10 h-10 bg-gray-800 hover:bg-purple-600 rounded-lg flex items-center justify-center transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900"
              aria-label={socialLabels[locale].tiktok}
              title={socialLabels[locale].tiktok}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
              </svg>
            </a>
            <a 
              href="https://twitter.com/zazateachapp" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-10 h-10 bg-gray-800 hover:bg-purple-600 rounded-lg flex items-center justify-center transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900"
              aria-label={socialLabels[locale].twitter}
              title={socialLabels[locale].twitter}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </a>
            <a 
              href="https://www.linkedin.com/company/zaza-technologies/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-10 h-10 bg-gray-800 hover:bg-purple-600 rounded-lg flex items-center justify-center transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900"
              aria-label={socialLabels[locale].linkedin}
              title={socialLabels[locale].linkedin}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 text-sm">
          {/* Products */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-white">Products</h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  href="/promptly" 
                  className="hover:text-purple-400 transition-all duration-300 hover:translate-x-1 focus:outline-none focus:text-purple-400 focus:translate-x-1"
                  aria-label={productLabels[locale].promptly}
                  title={productLabels[locale].promptly}
                >
                  Zaza Promptly
                </Link>
              </li>
              <li>
                <Link 
                  href="/teach" 
                  className="hover:text-purple-400 transition-all duration-300 hover:translate-x-1 focus:outline-none focus:text-purple-400 focus:translate-x-1"
                  aria-label={productLabels[locale].teach}
                  title={productLabels[locale].teach}
                >
                  Zaza Teach
                </Link>
              </li>
              <li>
                <Link 
                  href="/notably" 
                  className="hover:text-purple-400 transition-all duration-300 hover:translate-x-1 focus:outline-none focus:text-purple-400 focus:translate-x-1"
                  aria-label={productLabels[locale].notably}
                  title={productLabels[locale].notably}
                >
                  Zaza Inbox
                </Link>
              </li>
              <li>
                <Link 
                  href="/products" 
                  className="text-gray-400 hover:text-purple-400 transition-colors duration-200 focus:outline-none focus:text-purple-400"
                >
                  All Products →
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-white">Resources</h3>
            <ul className="space-y-3">
              <li><Link href="/blog" className="hover:text-purple-400 transition-colors duration-200 focus:outline-none focus:text-purple-400">Blog</Link></li>
              <li><Link href="/free-resources" className="hover:text-purple-400 transition-colors duration-200 focus:outline-none focus:text-purple-400">Free Resources</Link></li>
              <li><Link href="/faqs" className="hover:text-purple-400 transition-colors duration-200 focus:outline-none focus:text-purple-400">FAQs</Link></li>
              <li><Link href="/why-zaza-promptly" className="hover:text-purple-400 transition-colors duration-200 focus:outline-none focus:text-purple-400">Why Zaza Promptly?</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-white">Company</h3>
            <ul className="space-y-3">
              <li><Link href="/about-founder" className="hover:text-purple-400 transition-colors duration-200 focus:outline-none focus:text-purple-400">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-purple-400 transition-colors duration-200 focus:outline-none focus:text-purple-400">Contact</Link></li>
              <li><Link href="/support" className="hover:text-purple-400 transition-colors duration-200 focus:outline-none focus:text-purple-400">Support</Link></li>
              <li><Link href="/pricing" className="hover:text-purple-400 transition-colors duration-200 focus:outline-none focus:text-purple-400">Pricing</Link></li>
            </ul>
          </div>

          {/* Follow Us */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-white">Follow Us</h3>
            <p className="text-gray-400 mb-4">Join our community of educators transforming teaching with AI.</p>
            
            {/* Social Links Grid */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              <a 
                href="https://www.tiktok.com/@zazatechnologies" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex flex-col items-center p-3 bg-gray-800 hover:bg-purple-600 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                aria-label={socialLabels[locale].tiktok}
                title={socialLabels[locale].tiktok}
              >
                <svg className="w-5 h-5 mb-1" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                </svg>
                <span className="text-xs">TikTok</span>
              </a>
              <a 
                href="https://www.linkedin.com/company/zaza-technologies/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex flex-col items-center p-3 bg-gray-800 hover:bg-purple-600 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                aria-label={socialLabels[locale].linkedin}
                title={socialLabels[locale].linkedin}
              >
                <svg className="w-5 h-5 mb-1" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                <span className="text-xs">LinkedIn</span>
              </a>
              <a 
                href="https://twitter.com/zazateachapp" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex flex-col items-center p-3 bg-gray-800 hover:bg-purple-600 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                aria-label={socialLabels[locale].twitter}
                title={socialLabels[locale].twitter}
              >
                <svg className="w-5 h-5 mb-1" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
                <span className="text-xs">X/Twitter</span>
              </a>
            </div>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
            <div className="text-xs text-gray-400">
              <div className="mb-2">© 2025 Zaza Technologies. All rights reserved.</div>
              <div className="text-xs text-gray-500">
                Gumbertstraße 150, 40229 Düsseldorf, Germany
              </div>
            </div>
            <div className="flex flex-wrap gap-6 text-xs text-gray-400">
              <Link href="/terms" className="hover:text-purple-400 transition-colors duration-200 focus:outline-none focus:text-purple-400">Terms of Service</Link>
              <Link href="/privacy" className="hover:text-purple-400 transition-colors duration-200 focus:outline-none focus:text-purple-400">Privacy Policy</Link>
              <Link href="/support" className="hover:text-purple-400 transition-colors duration-200 focus:outline-none focus:text-purple-400">Support</Link>
              <Link href="/cookies" className="hover:text-purple-400 transition-colors duration-200 focus:outline-none focus:text-purple-400">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
