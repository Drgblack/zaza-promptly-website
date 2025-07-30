import { useTranslations } from 'next-intl'
import Link from 'next/link'

export function TranslatedHero() {
  const t = useTranslations('Hero')

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-purple-50 via-white to-pink-50 pt-20 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            {t('headline')}
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            {t('subheadline')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link 
              href="/signup"
              className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              {t('primaryCta')}
            </Link>
            
            <Link 
              href="/demo"
              className="px-8 py-4 bg-white text-purple-600 font-semibold rounded-lg border border-purple-200 hover:bg-purple-50 hover:border-purple-300 transition-all duration-200"
            >
              {t('secondaryCta')}
            </Link>
          </div>
          
          <p className="text-sm text-gray-500">
            {t('trustText')}
          </p>
        </div>
      </div>
    </section>
  )
}