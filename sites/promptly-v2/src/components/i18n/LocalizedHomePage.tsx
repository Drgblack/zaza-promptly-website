'use client'

import Link from 'next/link'
import { useTranslation } from '@/hooks/useTranslation'
import ScrollReveal from '@/components/animations/ScrollReveal'

export default function LocalizedHomePage() {
  const { t, locale } = useTranslation()

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
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-blue-600/20 text-blue-300 px-4 py-2 rounded-full text-sm mb-8 border border-blue-600/20">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                For teachers who write parent messages & report comments
              </div>
              
              {/* Main Headline */}
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                {t('home.hero.title')}
              </h1>
              
              {/* Subtext */}
              <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                {t('home.hero.subtitle')}
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
                <Link
                  href="/pricing#free"
                  className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold rounded-lg transition-all hover:scale-105 shadow-xl"
                >
                  {t('home.hero.tryFree')}
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link
                  href="#features"
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-slate-600 text-slate-300 hover:bg-slate-800/50 text-lg font-semibold rounded-lg transition-all hover:scale-105"
                >
                  {t('cta.seeHowItWorks')}
                </Link>
              </div>
              
              {/* Credibility line */}
              <p className="text-slate-400 text-sm">
                {t('home.hero.credibility')}
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-16 bg-slate-800/50">
        <div className="container">
          <ScrollReveal>
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                {t('home.problem.title')}
              </h2>
              <div className="bg-slate-800/60 border border-red-500/30 rounded-2xl p-8 text-left">
                <p className="text-xl text-slate-300 leading-relaxed">
                  {t('home.problem.description')}
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-16 bg-slate-900">
        <div className="container">
          <ScrollReveal>
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                {t('home.solution.title')}
              </h2>
              <p className="text-xl text-slate-300 mb-8">
                {t('home.solution.subtitle')}
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-slate-800/30">
        <div className="container">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                {t('home.differentiation.title')}
              </h2>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                {t('home.differentiation.subtitle')}
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Safe & Accurate */}
            <ScrollReveal delay={0.1}>
              <div className="text-center bg-slate-900/50 p-6 rounded-2xl border border-slate-700/50 hover:border-green-500/30 transition-all hover:bg-slate-800/60">
                <div className="w-16 h-16 bg-green-600/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-3">{t('home.differentiation.features.safe.title')}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {t('home.differentiation.features.safe.description')}
                </p>
              </div>
            </ScrollReveal>

            {/* Tone Tutor */}
            <ScrollReveal delay={0.2}>
              <div className="text-center bg-slate-900/50 p-6 rounded-2xl border border-slate-700/50 hover:border-blue-500/30 transition-all hover:bg-slate-800/60">
                <div className="w-16 h-16 bg-blue-600/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-3">{t('home.differentiation.features.tone.title')}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {t('home.differentiation.features.tone.description')}
                </p>
              </div>
            </ScrollReveal>

            {/* Educator-Built */}
            <ScrollReveal delay={0.3}>
              <div className="text-center bg-slate-900/50 p-6 rounded-2xl border border-slate-700/50 hover:border-purple-500/30 transition-all hover:bg-slate-800/60">
                <div className="w-16 h-16 bg-purple-600/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-3">{t('home.differentiation.features.pedagogy.title')}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {t('home.differentiation.features.pedagogy.description')}
                </p>
              </div>
            </ScrollReveal>

            {/* Translation */}
            <ScrollReveal delay={0.4}>
              <div className="text-center bg-slate-900/50 p-6 rounded-2xl border border-slate-700/50 hover:border-orange-500/30 transition-all hover:bg-slate-800/60">
                <div className="w-16 h-16 bg-orange-600/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-3">{t('home.differentiation.features.translation.title')}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {t('home.differentiation.features.translation.description')}
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="text-center py-20 bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="container">
          <ScrollReveal>
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">{t('home.finalCTA.title')}</h2>
              <p className="mb-8 text-xl text-slate-300 max-w-2xl mx-auto">{t('home.finalCTA.subtitle')}</p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link 
                  href="/pricing#free" 
                  className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg transition-all hover:scale-105 shadow-xl"
                >
                  {t('cta.tryPromptlyFree')}
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link 
                  href="/pricing" 
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/20 text-white hover:bg-white/5 font-medium rounded-lg transition-all hover:scale-105 hover:border-white/40"
                >
                  {t('cta.viewPricing')}
                </Link>
              </div>
              
              {/* Quick stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 text-center">
                <div>
                  <div className="text-3xl md:text-4xl font-bold text-blue-400 mb-2">12,000+</div>
                  <p className="text-slate-400">Teachers worldwide</p>
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-bold text-green-400 mb-2">10x</div>
                  <p className="text-slate-400">Faster than manual writing</p>
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-bold text-purple-400 mb-2">5+ languages</div>
                  <p className="text-slate-400">Supported worldwide</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}