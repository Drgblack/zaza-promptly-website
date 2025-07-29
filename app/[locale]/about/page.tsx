import { useTranslations } from 'next-intl';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Heart,
  Shield,
  Lightbulb,
  Users,
  Target,
  BookOpen,
  Zap,
  Globe
} from 'lucide-react';

export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  
  const titles = {
    en: 'About Zaza Promptly - AI-Powered Education Tools',
    de: 'Über Zaza Promptly - KI-gestützte Bildungstools',
    fr: 'À propos de Zaza Promptly - Outils éducatifs alimentés par l\'IA',
    es: 'Acerca de Zaza Promptly - Herramientas educativas impulsadas por IA',
    it: 'Chi è Zaza Promptly - Strumenti educativi potenziati dall\'IA'
  };
  
  const descriptions = {
    en: 'Learn about our mission to empower teachers with AI-powered tools for better parent communication and classroom efficiency.',
    de: 'Erfahren Sie mehr über unsere Mission, Lehrer mit KI-gestützten Tools für bessere Elternkommunikation und Klasseneffizienz zu stärken.',
    fr: 'Découvrez notre mission d\'autonomiser les enseignants avec des outils alimentés par l\'IA pour une meilleure communication parentale et une efficacité en classe.',
    es: 'Conoce nuestra misión de empoderar a los maestros con herramientas impulsadas por IA para mejor comunicación parental y eficiencia en el aula.',
    it: 'Scopri la nostra missione di potenziare gli insegnanti con strumenti alimentati dall\'IA per una migliore comunicazione genitoriale ed efficienza in classe.'
  };

  return {
    title: titles[locale as keyof typeof titles] || titles.en,
    description: descriptions[locale as keyof typeof descriptions] || descriptions.en,
    alternates: {
      canonical: `https://zazapromptly.com${locale === 'en' ? '' : `/${locale}`}/about`,
      languages: {
        'en': 'https://zazapromptly.com/about',
        'de': 'https://zazapromptly.com/de/about',
        'fr': 'https://zazapromptly.com/fr/about',
        'es': 'https://zazapromptly.com/es/about',
        'it': 'https://zazapromptly.com/it/about',
        'x-default': 'https://zazapromptly.com/about'
      }
    },
    openGraph: {
      title: titles[locale as keyof typeof titles] || titles.en,
      description: descriptions[locale as keyof typeof descriptions] || descriptions.en,
      url: `https://zazapromptly.com${locale === 'en' ? '' : `/${locale}`}/about`,
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

export default function AboutPage() {
  const t = useTranslations();

  const values = [
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: t('About.values.education'),
      description: 'We prioritize educational impact above all else, ensuring every feature serves teachers and students.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: t('About.values.privacy'),
      description: 'Student data security and teacher privacy are fundamental to everything we build.',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: t('About.values.innovation'),
      description: 'We continuously evolve our AI technology to meet the changing needs of modern education.',
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: t('About.values.community'),
      description: 'Our platform thrives on the collective wisdom and collaboration of educators worldwide.',
      color: 'from-purple-500 to-pink-500'
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
              <Heart className="w-3 h-3 mr-1" />
              Made for Teachers
            </Badge>
            
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              {t('About.title')}
            </h1>
            
            <p className="text-xl text-gray-600 leading-relaxed">
              {t('About.subtitle')}
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  {t('About.mission.title')}
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-8">
                  {t('About.mission.description')}
                </p>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600 mb-1">2,400+</div>
                    <div className="text-sm text-gray-600">Teachers Served</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600 mb-1">50,000+</div>
                    <div className="text-sm text-gray-600">Hours Saved</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600 mb-1">25+</div>
                    <div className="text-sm text-gray-600">Countries</div>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600 mb-1">5</div>
                    <div className="text-sm text-gray-600">Languages</div>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div className="w-full h-80 bg-gradient-to-br from-purple-400 to-pink-400 rounded-2xl shadow-2xl flex items-center justify-center">
                  <Globe className="w-24 h-24 text-white opacity-80" />
                </div>
                <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-xl shadow-lg flex items-center justify-center">
                  <Zap className="w-8 h-8 text-white" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                {t('About.story.title')}
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                {t('About.story.description')}
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-12">
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-600 leading-relaxed mb-6">
                  It started with a simple observation: teachers were spending more time on paperwork than actually teaching. 
                  Late nights writing parent communications, weekends crafting report card comments, and countless hours on 
                  administrative tasks that kept educators from their true passion - inspiring students.
                </p>
                
                <p className="text-gray-600 leading-relaxed mb-6">
                  Our founding team, all former educators, experienced this frustration firsthand. We knew there had to be a 
                  better way. That's when we discovered the potential of AI to handle the routine while preserving the personal 
                  touch that makes great teaching possible.
                </p>
                
                <p className="text-gray-600 leading-relaxed">
                  Today, Zaza Promptly serves thousands of teachers worldwide, giving them back precious hours to focus on 
                  what matters most: their students. Every feature we build is tested by real teachers in real classrooms, 
                  ensuring we never lose sight of our mission to empower educators.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                {t('About.values.title')}
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                These core principles guide every decision we make and every feature we develop.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {values.map((value, index) => (
                <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-8">
                    <div className={`w-16 h-16 bg-gradient-to-br ${value.color} rounded-2xl flex items-center justify-center mb-6 text-white`}>
                      {value.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      {value.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 bg-gradient-to-r from-purple-600 to-pink-600">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">
              Built by Educators, for Educators
            </h2>
            <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
              Our team combines decades of classroom experience with cutting-edge AI expertise 
              to create tools that truly understand the needs of modern educators.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-white mb-2">15+</div>
                <div className="text-purple-200">Years Teaching Experience</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-2">100%</div>
                <div className="text-purple-200">Teacher-Tested Features</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-2">24/7</div>
                <div className="text-purple-200">Support Commitment</div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}