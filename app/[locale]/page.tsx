import { useTranslations } from 'next-intl';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  MessageSquare, 
  Globe, 
  Palette, 
  Zap, 
  Clock, 
  Shield,
  Star,
  ArrowRight,
  CheckCircle2,
  Users,
  TrendingUp
} from 'lucide-react';
import Link from 'next/link';

export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  
  const titles = {
    en: 'Zaza Promptly - AI-Powered Parent Communication for Teachers',
    de: 'Zaza Promptly - KI-gestützte Elternkommunikation für Lehrer',
    fr: 'Zaza Promptly - Communication parent-enseignant alimentée par l\'IA',
    es: 'Zaza Promptly - Comunicación parental impulsada por IA para maestros',
    it: 'Zaza Promptly - Comunicazione genitore-insegnante potenziata dall\'IA'
  };
  
  const descriptions = {
    en: 'Transform your teaching with AI-powered tools for professional parent communication. Save hours every week while building stronger family relationships.',
    de: 'Transformieren Sie Ihren Unterricht mit KI-gestützten Tools für professionelle Elternkommunikation. Sparen Sie jede Woche Stunden und bauen Sie stärkere Familienbeziehungen auf.',
    fr: 'Transformez votre enseignement avec des outils alimentés par l\'IA pour la communication parentale professionnelle. Économisez des heures chaque semaine tout en renforçant les relations familiales.',
    es: 'Transforma tu enseñanza con herramientas impulsadas por IA para comunicación parental profesional. Ahorra horas cada semana mientras fortaleces las relaciones familiares.',
    it: 'Trasforma il tuo insegnamento con strumenti potenziati dall\'IA per la comunicazione genitoriale professionale. Risparmia ore ogni settimana mentre rafforzi le relazioni familiari.'
  };

  return {
    title: titles[locale as keyof typeof titles] || titles.en,
    description: descriptions[locale as keyof typeof descriptions] || descriptions.en,
    alternates: {
      canonical: `https://zazapromptly.com${locale === 'en' ? '' : `/${locale}`}`,
      languages: {
        'en': 'https://zazapromptly.com',
        'de': 'https://zazapromptly.com/de',
        'fr': 'https://zazapromptly.com/fr',
        'es': 'https://zazapromptly.com/es',
        'it': 'https://zazapromptly.com/it',
        'x-default': 'https://zazapromptly.com'
      }
    },
    openGraph: {
      title: titles[locale as keyof typeof titles] || titles.en,
      description: descriptions[locale as keyof typeof descriptions] || descriptions.en,
      url: `https://zazapromptly.com${locale === 'en' ? '' : `/${locale}`}`,
      siteName: 'Zaza Promptly',
      locale: locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      site: '@ZazaPromptly',
      title: titles[locale as keyof typeof titles] || titles.en,
      description: descriptions[locale as keyof typeof descriptions] || descriptions.en,
    }
  };
}

export default function HomePage() {
  const t = useTranslations();

  return (
    <>
      <Header />
      
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="pt-16 lg:pt-20 pb-16 bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <Badge className="mb-6 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 border-purple-200">
                <Zap className="w-3 h-3 mr-1" />
                {t('Common.newFeature')}
              </Badge>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                {t('Hero.headline')}
              </h1>
              
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
                {t('Hero.subheadline')}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                >
                  {t('Hero.primaryCta')}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                
                <Button 
                  variant="outline" 
                  size="lg"
                  className="px-8 py-4 text-lg font-semibold border-2 hover:bg-gray-50"
                >
                  {t('Hero.secondaryCta')}
                </Button>
              </div>
              
              <div className="flex items-center justify-center text-sm text-gray-500">
                <Users className="w-4 h-4 mr-2" />
                {t('Hero.trustText')}
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                {t('Features.title')}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {t('Features.subtitle')}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-8">
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6">
                    <MessageSquare className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {t('Features.aiComments.title')}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {t('Features.aiComments.description')}
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-8">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-6">
                    <Globe className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {t('Features.multiLanguage.title')}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {t('Features.multiLanguage.description')}
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-8">
                  <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mb-6">
                    <Palette className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {t('Features.toneCustomization.title')}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {t('Features.toneCustomization.description')}
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-8">
                  <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mb-6">
                    <Zap className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {t('Features.quickActions.title')}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {t('Features.quickActions.description')}
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-8">
                  <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center mb-6">
                    <Clock className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {t('Features.timeTracking.title')}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {t('Features.timeTracking.description')}
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-8">
                  <div className="w-14 h-14 bg-gradient-to-br from-gray-700 to-gray-900 rounded-2xl flex items-center justify-center mb-6">
                    <Shield className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {t('Features.privacy.title')}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {t('Features.privacy.description')}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                {t('Testimonials.title')}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {t('Testimonials.subtitle')}
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <Card className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <blockquote className="text-gray-700 mb-6 italic leading-relaxed">
                    "{t('Testimonials.testimonial1.quote')}"
                  </blockquote>
                  <div>
                    <div className="font-semibold text-gray-900">
                      {t('Testimonials.testimonial1.author')}
                    </div>
                    <div className="text-gray-500 text-sm">
                      {t('Testimonials.testimonial1.role')}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <blockquote className="text-gray-700 mb-6 italic leading-relaxed">
                    "{t('Testimonials.testimonial2.quote')}"
                  </blockquote>
                  <div>
                    <div className="font-semibold text-gray-900">
                      {t('Testimonials.testimonial2.author')}
                    </div>
                    <div className="text-gray-500 text-sm">
                      {t('Testimonials.testimonial2.role')}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <blockquote className="text-gray-700 mb-6 italic leading-relaxed">
                    "{t('Testimonials.testimonial3.quote')}"
                  </blockquote>
                  <div>
                    <div className="font-semibold text-gray-900">
                      {t('Testimonials.testimonial3.author')}
                    </div>
                    <div className="text-gray-500 text-sm">
                      {t('Testimonials.testimonial3.role')}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-purple-600 to-pink-600">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              {t('CallToAction.title')}
            </h2>
            <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
              {t('CallToAction.subtitle')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button 
                size="lg" 
                className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                {t('CallToAction.primaryButton')}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="border-white text-white hover:bg-white hover:text-purple-600 px-8 py-4 text-lg font-semibold border-2"
              >
                {t('CallToAction.secondaryButton')}
              </Button>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center text-purple-200 text-sm">
              <div className="flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4 mr-2" />
                {t('CallToAction.noCredit')}
              </div>
              <div className="flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4 mr-2" />
                {t('CallToAction.freeForever')}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}