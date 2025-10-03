'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { getCurrentLanguage } from '@/lib/lang'
import ScrollReveal from '@/components/animations/ScrollReveal'

// Bilingual content configuration
const content = {
  en: {
    title: 'Support Center',
    subtitle: 'Get help with Promptly, find answers to common questions, and connect with our team',
    searchPlaceholder: 'Search for help...',
    quickLinksTitle: 'Quick Links',
    quickLinks: [
      {
        title: 'Getting Started Guide',
        description: 'New to Promptly? Start here for a complete walkthrough',
        href: '/faq',
        icon: '🚀'
      },
      {
        title: 'Free Resources',
        description: 'Download free teaching templates and guides',
        href: '/free-resources',
        icon: '📚'
      },
      {
        title: 'Pricing & Plans',
        description: 'View pricing options and plan features',
        href: '/pricing',
        icon: '💳'
      },
      {
        title: 'FAQ',
        description: 'Frequently asked questions and answers',
        href: '/faq',
        icon: '❓'
      }
    ],
    supportChannelsTitle: 'Get Support',
    supportChannels: [
      {
        title: 'Email Support',
        description: 'Get help from our support team within 24 hours',
        action: 'Send Email',
        href: 'mailto:help@zazatechnologies.com',
        icon: '📧',
        availability: 'Response within 24 hours'
      },
      {
        title: 'Live Chat',
        description: 'Chat with our team for immediate assistance',
        action: 'Start Chat',
        href: '#chat',
        icon: '💬',
        availability: 'Mon-Fri, 9am-5pm GMT'
      },
      {
        title: 'Video Tutorial',
        description: 'Watch step-by-step guides for common tasks',
        action: 'Watch Tutorials',
        href: '/learning-centre',
        icon: '🎥',
        availability: 'Available 24/7'
      }
    ],
    resourcesTitle: 'Helpful Resources',
    resources: [
      {
        title: 'Learning Centre',
        description: 'Comprehensive guides and best practices',
        href: '/learning-centre'
      },
      {
        title: 'Blog',
        description: 'Latest tips, updates, and teacher insights',
        href: '/blog'
      },
      {
        title: 'Case Studies',
        description: 'See how other teachers use Promptly',
        href: '/case-studies'
      }
    ],
    contactTitle: 'Still Need Help?',
    contactDescription: 'Our team is here to help you succeed with Promptly.',
    contactButton: 'Contact Our Team'
  },
  de: {
    title: 'Support-Center',
    subtitle: 'Erhalten Sie Hilfe mit Promptly, finden Sie Antworten auf häufige Fragen und kontaktieren Sie unser Team',
    searchPlaceholder: 'Nach Hilfe suchen...',
    quickLinksTitle: 'Schnellzugriff',
    quickLinks: [
      {
        title: 'Erste Schritte Leitfaden',
        description: 'Neu bei Promptly? Beginnen Sie hier für eine vollständige Anleitung',
        href: '/faq',
        icon: '🚀'
      },
      {
        title: 'Kostenlose Ressourcen',
        description: 'Laden Sie kostenlose Unterrichtsvorlagen und Leitfäden herunter',
        href: '/free-resources',
        icon: '📚'
      },
      {
        title: 'Preise & Pläne',
        description: 'Preisoptionen und Plan-Features anzeigen',
        href: '/pricing',
        icon: '💳'
      },
      {
        title: 'FAQ',
        description: 'Häufig gestellte Fragen und Antworten',
        href: '/faq',
        icon: '❓'
      }
    ],
    supportChannelsTitle: 'Support erhalten',
    supportChannels: [
      {
        title: 'E-Mail-Support',
        description: 'Erhalten Sie Hilfe von unserem Support-Team innerhalb von 24 Stunden',
        action: 'E-Mail senden',
        href: 'mailto:help@zazatechnologies.com',
        icon: '📧',
        availability: 'Antwort innerhalb von 24 Stunden'
      },
      {
        title: 'Live-Chat',
        description: 'Chatten Sie mit unserem Team für sofortige Hilfe',
        action: 'Chat starten',
        href: '#chat',
        icon: '💬',
        availability: 'Mo-Fr, 9-17 Uhr GMT'
      },
      {
        title: 'Video-Tutorial',
        description: 'Schauen Sie sich Schritt-für-Schritt-Anleitungen für häufige Aufgaben an',
        action: 'Tutorials ansehen',
        href: '/learning-centre',
        icon: '🎥',
        availability: 'Rund um die Uhr verfügbar'
      }
    ],
    resourcesTitle: 'Hilfreiche Ressourcen',
    resources: [
      {
        title: 'Lernzentrum',
        description: 'Umfassende Leitfäden und bewährte Praktiken',
        href: '/learning-centre'
      },
      {
        title: 'Blog',
        description: 'Neueste Tipps, Updates und Lehrereinblicke',
        href: '/blog'
      },
      {
        title: 'Fallstudien',
        description: 'Sehen Sie, wie andere Lehrer Promptly nutzen',
        href: '/case-studies'
      }
    ],
    contactTitle: 'Brauchen Sie noch Hilfe?',
    contactDescription: 'Unser Team ist hier, um Ihnen beim Erfolg mit Promptly zu helfen.',
    contactButton: 'Kontaktieren Sie unser Team'
  }
}

export default function SupportClient() {
  const [currentLanguage, setCurrentLanguage] = useState('en')
  const [searchTerm, setSearchTerm] = useState('')
  
  // Get content for current language
  const copy = content[currentLanguage as keyof typeof content] || content.en
  
  // Track language changes
  useEffect(() => {
    setCurrentLanguage(getCurrentLanguage())
    
    const handleLanguageChange = (event: CustomEvent) => {
      setCurrentLanguage(event.detail)
    }
    
    window.addEventListener('languageChange', handleLanguageChange as EventListener)
    return () => window.removeEventListener('languageChange', handleLanguageChange as EventListener)
  }, [])

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-800 to-slate-900 py-20">
        <div className="container text-center">
          <ScrollReveal duration={0.22}>
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-white mb-6">
              {copy.title}
            </h1>
            <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
              {copy.subtitle}
            </p>
            
            {/* Search Bar */}
            <div className="max-w-md mx-auto">
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder={copy.searchPlaceholder}
                  className="w-full px-4 py-3 pl-12 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                />
                <svg className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-16">
        <div className="container">
          <ScrollReveal duration={0.24} delay={0.1}>
            <h2 className="text-3xl font-semibold text-white text-center mb-12">
              {copy.quickLinksTitle}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {copy.quickLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="group p-6 rounded-2xl bg-slate-800/60 border border-white/10 hover:bg-slate-800/80 hover:border-brand-500/30 transition-all duration-200 hover:-translate-y-1"
                >
                  <div className="text-3xl mb-4" role="img" aria-label={link.title}>
                    {link.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-brand-400 transition-colors">
                    {link.title}
                  </h3>
                  <p className="text-slate-400 text-sm">
                    {link.description}
                  </p>
                </Link>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Support Channels Section */}
      <section className="py-16 bg-slate-800/30">
        <div className="container">
          <ScrollReveal duration={0.26} delay={0.15}>
            <h2 className="text-3xl font-semibold text-white text-center mb-12">
              {copy.supportChannelsTitle}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {copy.supportChannels.map((channel, index) => (
                <div
                  key={index}
                  className="p-6 rounded-2xl bg-slate-900/60 border border-white/10"
                >
                  <div className="text-3xl mb-4" role="img" aria-label={channel.title}>
                    {channel.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {channel.title}
                  </h3>
                  <p className="text-slate-300 mb-4">
                    {channel.description}
                  </p>
                  <p className="text-sm text-slate-400 mb-6">
                    {channel.availability}
                  </p>
                  <a
                    href={channel.href}
                    className="inline-flex items-center px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white font-semibold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 focus:ring-offset-slate-900"
                  >
                    {channel.action}
                    <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Helpful Resources Section */}
      <section className="py-16">
        <div className="container">
          <ScrollReveal duration={0.28} delay={0.2}>
            <h2 className="text-3xl font-semibold text-white text-center mb-12">
              {copy.resourcesTitle}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {copy.resources.map((resource, index) => (
                <Link
                  key={index}
                  href={resource.href}
                  className="group p-6 rounded-2xl bg-slate-800/60 border border-white/10 hover:bg-slate-800/80 hover:border-white/20 transition-all duration-200 text-center"
                >
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-brand-400 transition-colors">
                    {resource.title}
                  </h3>
                  <p className="text-slate-400 text-sm">
                    {resource.description}
                  </p>
                </Link>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-20 bg-gradient-to-r from-brand-600 to-purple-600">
        <div className="container text-center">
          <ScrollReveal duration={0.3} delay={0.25}>
            <h2 className="text-3xl font-bold text-white mb-4">
              {copy.contactTitle}
            </h2>
            <p className="text-xl text-brand-100 mb-8 max-w-2xl mx-auto">
              {copy.contactDescription}
            </p>
            
            <a
              href="mailto:help@zazatechnologies.com"
              className="inline-flex items-center px-8 py-4 bg-white text-brand-600 font-semibold rounded-lg hover:bg-gray-50 transition-colors shadow-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-brand-600"
            >
              {copy.contactButton}
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </a>
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}