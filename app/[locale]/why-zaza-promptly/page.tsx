import { useTranslations } from 'next-intl';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Check,
  X,
  Clock,
  Settings,
  Users,
  Shield,
  TrendingUp,
  Star,
  ArrowRight,
  Download,
  Zap
} from 'lucide-react';
import Link from 'next/link';

export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  
  const titles = {
    en: 'Why Choose Zaza Promptly? - Compare Free vs Premium',
    de: 'Warum Zaza Promptly wählen? - Kostenlos vs Premium vergleichen',
    fr: 'Pourquoi choisir Zaza Promptly ? - Comparer gratuit vs premium',
    es: '¿Por qué elegir Zaza Promptly? - Comparar gratis vs premium',
    it: 'Perché scegliere Zaza Promptly? - Confronta gratuito vs premium'
  };
  
  const descriptions = {
    en: 'Compare our free resources with premium AI-powered features. See why thousands of teachers choose Zaza Promptly for parent communication.',
    de: 'Vergleichen Sie unsere kostenlosen Ressourcen mit Premium-KI-Features. Sehen Sie, warum Tausende von Lehrern Zaza Promptly für die Elternkommunikation wählen.',
    fr: 'Comparez nos ressources gratuites avec les fonctionnalités premium alimentées par l\'IA. Découvrez pourquoi des milliers d\'enseignants choisissent Zaza Promptly pour la communication parentale.',
    es: 'Compara nuestros recursos gratuitos con las características premium impulsadas por IA. Ve por qué miles de maestros eligen Zaza Promptly para la comunicación parental.',
    it: 'Confronta le nostre risorse gratuite con le funzionalità premium alimentate dall\'IA. Scopri perché migliaia di insegnanti scelgono Zaza Promptly per la comunicazione genitoriale.'
  };

  return {
    title: titles[locale as keyof typeof titles] || titles.en,
    description: descriptions[locale as keyof typeof descriptions] || descriptions.en,
    alternates: {
      canonical: `https://zazapromptly.com${locale === 'en' ? '' : `/${locale}`}/why-zaza-promptly`,
      languages: {
        'en': 'https://zazapromptly.com/why-zaza-promptly',
        'de': 'https://zazapromptly.com/de/why-zaza-promptly',
        'fr': 'https://zazapromptly.com/fr/why-zaza-promptly',
        'es': 'https://zazapromptly.com/es/why-zaza-promptly',
        'it': 'https://zazapromptly.com/it/why-zaza-promptly',
        'x-default': 'https://zazapromptly.com/why-zaza-promptly'
      }
    },
    openGraph: {
      title: titles[locale as keyof typeof titles] || titles.en,
      description: descriptions[locale as keyof typeof descriptions] || descriptions.en,
      url: `https://zazapromptly.com${locale === 'en' ? '' : `/${locale}`}/why-zaza-promptly`,
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

export default function WhyZazaPage() {
  const t = useTranslations();

  const freeFeatures = [
    'Basic AI prompts',
    'Email templates',
    'PDF downloads',
    'Community access'
  ];

  const premiumFeatures = [
    'AI-powered comment generation',
    'Multi-language translation',
    'Tone customization',
    'Quick action templates',
    'Time tracking & analytics',
    'FERPA compliance',
    'Priority support',
    'Advanced integrations'
  ];

  const comparisonData = [
    {
      feature: t('WhyZaza.comparison.timeToSetup'),
      free: '2-3 hours',
      premium: '15 minutes',
      premiumBetter: true
    },
    {
      feature: t('WhyZaza.comparison.customization'),
      free: 'Limited',
      premium: 'Extensive',
      premiumBetter: true
    },
    {
      feature: t('WhyZaza.comparison.support'),
      free: 'Community',
      premium: 'Priority + Phone',
      premiumBetter: true
    },
    {
      feature: t('WhyZaza.comparison.dataPrivacy'),
      free: 'Basic',
      premium: 'FERPA Compliant',
      premiumBetter: true
    },
    {
      feature: t('WhyZaza.comparison.scalability'),
      free: 'Individual',
      premium: 'Team & District',
      premiumBetter: true
    }
  ];

  return (
    <>
      <Header />
      
      <main className="min-h-screen pt-16 lg:pt-20">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-purple-50 to-pink-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Badge className="mb-6 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 border-purple-200">
              <TrendingUp className="w-3 h-3 mr-1" />
              Compare Options
            </Badge>
            
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              {t('WhyZaza.title')}
            </h1>
            
            <p className="text-xl text-gray-600 leading-relaxed">
              {t('WhyZaza.subtitle')}
            </p>
          </div>
        </section>

        {/* Comparison Cards */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Free Resources Card */}
              <Card className="border-2 border-gray-200 shadow-lg">
                <CardContent className="p-8">
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Download className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {t('WhyZaza.freeResources.title')}
                    </h3>
                    <p className="text-gray-600">
                      {t('WhyZaza.freeResources.description')}
                    </p>
                  </div>

                  <div className="space-y-4 mb-8">
                    {freeFeatures.map((feature, index) => (
                      <div key={index} className="flex items-center">
                        <Check className="w-5 h-5 text-green-600 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="text-center">
                    <div className="text-3xl font-bold text-gray-900 mb-2">Free</div>
                    <Button 
                      variant="outline" 
                      className="w-full border-2 border-green-500 text-green-600 hover:bg-green-50"
                      asChild
                    >
                      <Link href="/free-resources">
                        Get Free Resources
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Premium Platform Card */}
              <Card className="border-2 border-purple-500 shadow-xl relative">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-1">
                    <Star className="w-3 h-3 mr-1" />
                    {t('Common.recommended')}
                  </Badge>
                </div>
                
                <CardContent className="p-8">
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Zap className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {t('WhyZaza.zazaPromptly.title')}
                    </h3>
                    <p className="text-gray-600">
                      {t('WhyZaza.zazaPromptly.description')}
                    </p>
                  </div>

                  <div className="space-y-4 mb-8">
                    {premiumFeatures.map((feature, index) => (
                      <div key={index} className="flex items-center">
                        <Check className="w-5 h-5 text-purple-600 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="text-center">
                    <div className="text-3xl font-bold text-gray-900 mb-2">
                      $9<span className="text-lg text-gray-500">/month</span>
                    </div>
                    <Button 
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg"
                    >
                      Start Free Trial
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Detailed Comparison Table */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Detailed Feature Comparison
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                See exactly how our premium platform compares to free resources
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Feature</th>
                      <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Free Resources</th>
                      <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Zaza Promptly</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {comparisonData.map((row, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                          {row.feature}
                        </td>
                        <td className="px-6 py-4 text-center text-sm text-gray-600">
                          {row.free}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <div className="flex items-center justify-center">
                            {row.premiumBetter && (
                              <Check className="w-4 h-4 text-green-600 mr-2" />
                            )}
                            <span className={`text-sm ${row.premiumBetter ? 'text-green-600 font-medium' : 'text-gray-600'}`}>
                              {row.premium}
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Success Stories */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Why Teachers Choose the Premium Platform
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Clock className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">Save 10+ Hours Weekly</h3>
                  <p className="text-gray-600 text-sm">
                    Automated parent communication generation means more time for actual teaching
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Settings className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">Perfect Customization</h3>
                  <p className="text-gray-600 text-sm">
                    Tone adjustment and personalization features for every communication style
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">Enterprise Security</h3>
                  <p className="text-gray-600 text-sm">
                    FERPA compliance and enterprise-grade security for student data protection
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 bg-gradient-to-r from-purple-600 to-pink-600">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Transform Your Teaching?
            </h2>
            <p className="text-xl text-purple-100 mb-8">
              Join thousands of teachers who've already made the switch to efficient, AI-powered parent communication.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
              >
                Start Your Free Trial
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              
              <Button 
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-purple-600 px-8 py-4 text-lg font-semibold border-2"
                asChild
              >
                <Link href="/free-resources">
                  Try Free Resources First
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}