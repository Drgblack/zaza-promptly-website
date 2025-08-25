'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { getCurrentLanguage } from '@/lib/lang'
import SnippetToolV2 from '@/components/sections/SnippetToolV2'

// Bilingual content configuration
const content = {
  en: {
    title: 'Quick Comment Helper',
    subtitle: 'See how AI can help you write better parent messages and report comments',
    intro: 'This demo shows how Promptly\'s AI can improve your teacher communications. It\'s safe, teacher-first, and designed to enhance—never replace—your professional judgement.',
    tryToolHeading: 'Try the Demo Tool',
    tryToolDescription: 'Select a sample comment below and see how AI can help improve it while keeping your authentic teacher voice.',
    reassuranceHeading: 'Built for Teachers, by Teachers',
    reassuranceItems: [
      {
        icon: '🛡️',
        title: 'Safe & Secure',
        description: 'Your data is protected. Student information is never stored or shared.'
      },
      {
        icon: '🎯',
        title: 'Teacher-First Design',
        description: 'Built by educators who understand the classroom. Every feature serves teachers.'
      },
      {
        icon: '💡',
        title: 'Enhances Your Judgement',
        description: 'AI provides suggestions, you make decisions. Your professional expertise always comes first.'
      }
    ],
    ctaHeading: 'Ready to Try Promptly?',
    ctaDescription: 'See how AI can save you hours every week while improving your parent communication.',
    ctaButton: 'Try Promptly Free',
    learnMoreButton: 'Learn More About Promptly'
  },
  de: {
    title: 'Schneller Kommentar-Helfer',
    subtitle: 'Erleben Sie, wie KI Ihnen bei besseren Eltern-Nachrichten und Berichtskommentaren helfen kann',
    intro: 'Diese Demo zeigt, wie Promptlys KI Ihre Lehrerkommunikation verbessern kann. Es ist sicher, lehrerorientiert und darauf ausgelegt, Ihr professionelles Urteil zu ergänzen—niemals zu ersetzen.',
    tryToolHeading: 'Probieren Sie das Demo-Tool aus',
    tryToolDescription: 'Wählen Sie unten einen Beispielkommentar aus und sehen Sie, wie KI dabei helfen kann, ihn zu verbessern, während Ihre authentische Lehrerstimme erhalten bleibt.',
    reassuranceHeading: 'Von Lehrern für Lehrer entwickelt',
    reassuranceItems: [
      {
        icon: '🛡️',
        title: 'Sicher & Geschützt',
        description: 'Ihre Daten sind geschützt. Schülerinformationen werden niemals gespeichert oder geteilt.'
      },
      {
        icon: '🎯',
        title: 'Lehrerorientiertes Design',
        description: 'Von Pädagogen entwickelt, die das Klassenzimmer verstehen. Jede Funktion dient Lehrern.'
      },
      {
        icon: '💡',
        title: 'Ergänzt Ihr Urteil',
        description: 'KI macht Vorschläge, Sie treffen Entscheidungen. Ihre fachliche Expertise steht immer an erster Stelle.'
      }
    ],
    ctaHeading: 'Bereit, Promptly auszuprobieren?',
    ctaDescription: 'Sehen Sie, wie KI Ihnen jede Woche Stunden sparen und gleichzeitig Ihre Elternkommunikation verbessern kann.',
    ctaButton: 'Promptly kostenlos testen',
    learnMoreButton: 'Mehr über Promptly erfahren'
  }
}

export default function QuickCommentHelperContent() {
  const [currentLanguage, setCurrentLanguage] = useState('en')
  
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
    <main className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-900 dark:to-slate-800 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              {copy.title}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              {copy.subtitle}
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-400 max-w-3xl mx-auto">
              {copy.intro}
            </p>
          </div>
        </div>
      </section>

      {/* Demo Tool Section */}
      <section className="py-16 bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              {copy.tryToolHeading}
            </h2>
            <p className="text-slate-300 text-lg">
              {copy.tryToolDescription}
            </p>
          </div>
          
          {/* Integrate the existing SnippetToolV2 component */}
          <SnippetToolV2 />
        </div>
      </section>

      {/* Reassurance Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
              {copy.reassuranceHeading}
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {copy.reassuranceItems.map((item, index) => (
                <div key={index} className="text-center p-6 rounded-2xl bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-gray-700">
                  <div className="text-4xl mb-4" role="img" aria-label={item.title}>
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              {copy.ctaHeading}
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              {copy.ctaDescription}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/pricing"
                className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-50 transition-colors shadow-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600"
              >
                {copy.ctaButton}
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              
              <Link
                href="/"
                className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600"
              >
                {copy.learnMoreButton}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}