'use client'

import Link from 'next/link'
import { useTranslation } from '@/hooks/useTranslation'
import ScrollReveal from '@/components/animations/ScrollReveal'
import DemoTabs from '@/components/sections/DemoTabs'
import { useState } from 'react'

interface LocalizedHomePageProps {
  locale: string;
}

export default function LocalizedHomePage({ locale: propLocale }: LocalizedHomePageProps) {
  const { t, locale } = useTranslation()
  
  // Check if Stripe is available
  const hasStripe = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY && process.env.STRIPE_SECRET_KEY
  
  // Check if demo is enabled
  const isDemoEnabled = process.env.NEXT_PUBLIC_DEMO_ENABLED === 'true'
  
  // Use passed locale or fall back to detected locale
  const currentLocale = propLocale || locale

  const handleCTAClick = (location: string) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'storybrand_cta_click', {
        location,
        product: 'draft',
        locale: currentLocale
      })
    }
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-900 min-h-[90vh] flex items-center overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal isLCPElement={true}>
              {/* Main Headline */}
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                {t('home.hero.title')}
              </h1>
              
              {/* Subtext */}
              <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                {t('home.hero.subtitle')}
              </p>
              
              {/* Primary CTA */}
              <div className="flex justify-center mb-12">
                <Link
                  href={currentLocale === 'de' ? '/de/signup' : '/signup'}
                  onClick={() => handleCTAClick('hero')}
                  className="inline-flex items-center justify-center px-10 py-5 bg-blue-600 hover:bg-blue-700 text-white text-xl font-semibold rounded-xl transition-all hover:scale-105 shadow-xl"
                >
                  {t('home.hero.tryFree')} →
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Safety Microline */}
      <section className="py-6 bg-slate-800/30 border-b border-slate-700/50">
        <div className="container">
          <ScrollReveal>
            <p className="text-center text-slate-400 text-sm max-w-2xl mx-auto">
              {t('home.hero.safetyMicroline')}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Hook Row - 3 Cards */}
      <section className="py-20 bg-slate-900">
        <div className="container">
          <ScrollReveal>
            <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
              {/* The Hole */}
              <div className="text-center">
                <div className="w-16 h-16 bg-red-600/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-red-400 mb-4">{t('home.hook.hole.title')}</h3>
                <p className="text-slate-300 leading-relaxed">{t('home.hook.hole.description')}</p>
              </div>

              {/* The Turn */}
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-blue-400 mb-4">{t('home.hook.turn.title')}</h3>
                <p className="text-slate-300 leading-relaxed">{t('home.hook.turn.description')}</p>
              </div>

              {/* The Change */}
              <div className="text-center">
                <div className="w-16 h-16 bg-green-600/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-green-400 mb-4">{t('home.hook.change.title')}</h3>
                <p className="text-slate-300 leading-relaxed">{t('home.hook.change.description')}</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Product Bullets */}
      <section className="py-20 bg-slate-800/50">
        <div className="container">
          <ScrollReveal>
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                {t('home.productBullets.title')}
              </h2>
            </div>
          </ScrollReveal>
          
          <ScrollReveal delay={0.1}>
            <div className="max-w-3xl mx-auto">
              <ul className="space-y-4">
                {t('home.productBullets.features').map((feature: string, index: number) => (
                  <li key={index} className="flex items-start gap-4 text-lg text-slate-300">
                    <svg className="w-6 h-6 text-green-400 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Demo Section */}
      {isDemoEnabled && (
        <section id="demo" className="py-20 bg-gradient-to-b from-slate-900 to-purple-900/30">
          <div className="container">
            <ScrollReveal>
              <div className="max-w-4xl mx-auto text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  Try it yourself
                </h2>
                <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-4">
                  See how Draft transforms your communication.
                </p>
                <p className="text-sm text-slate-400">
                  Please don't enter sensitive or student-identifying data.
                </p>
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={0.1}>
              <div className="max-w-6xl mx-auto">
                <DemoTabs />
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* Social Proof Band */}
      <section className="py-20 bg-slate-900">
        <div className="container">
          <ScrollReveal>
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-12">
                {t('home.socialProof.title')}
              </h2>
              
              <div className="grid md:grid-cols-3 gap-8">
                {t('home.socialProof.quotes').map((quote: string, index: number) => (
                  <div key={index} className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-6">
                    <blockquote className="text-slate-300 text-lg italic">
                      "{quote}"
                    </blockquote>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* FAQ Band */}
      <section className="py-20 bg-slate-800/50">
        <div className="container">
          <ScrollReveal>
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
                {t('home.faq.title')}
              </h2>
              
              <div className="space-y-6">
                {t('home.faq.questions').map((item: any, index: number) => (
                  <div key={index} className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-6">
                    <h3 className="text-xl font-semibold text-white mb-3">
                      {item.question}
                    </h3>
                    <p className="text-slate-300">
                      {item.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Final Dual CTA */}
      <section className="py-20 bg-gradient-to-b from-slate-900 to-indigo-900">
        <div className="container">
          <ScrollReveal>
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Ready to reclaim your evenings?
              </h2>
              <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
                Start with 5 free comments this month. No credit card required. Cancel anytime.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
                <Link 
                  href={currentLocale === 'de' ? '/de/signup' : '/signup'}
                  onClick={() => handleCTAClick('final')}
                  className="inline-flex items-center px-10 py-5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors shadow-2xl text-xl"
                >
                  {t('home.hero.tryFree')}
                  <svg className="ml-3 w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link 
                  href={`/${currentLocale}/pricing`}
                  className="inline-flex items-center px-8 py-4 border-2 border-slate-600 text-slate-300 hover:bg-slate-800/50 font-semibold rounded-lg transition-all text-lg"
                >
                  See Plans
                </Link>
              </div>
              
              <p className="text-slate-400 text-sm">
                {t('home.hero.credibility')}
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}