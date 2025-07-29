import { useTranslations } from 'next-intl';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Download,
  FileText,
  Users,
  Lightbulb,
  BookOpen,
  PenTool,
  Star,
  ArrowRight,
  CheckCircle2,
  Zap,
  Gift
} from 'lucide-react';
import Link from 'next/link';

export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  
  const titles = {
    en: 'Free Teaching Resources - AI Prompts, Templates & Guides',
    de: 'Kostenlose Unterrichtsressourcen - KI-Prompts, Vorlagen & Leitfäden',
    fr: 'Ressources d\'enseignement gratuites - Prompts IA, modèles et guides',
    es: 'Recursos de enseñanza gratuitos - Prompts de IA, plantillas y guías',
    it: 'Risorse didattiche gratuite - Prompt IA, template e guide'
  };
  
  const descriptions = {
    en: 'Download free AI prompts, email templates, and teaching guides. Over 50 resources tested by teachers to save you time.',
    de: 'Laden Sie kostenlose KI-Prompts, E-Mail-Vorlagen und Unterrichtsleitfäden herunter. Über 50 von Lehrern getestete Ressourcen, um Ihnen Zeit zu sparen.',
    fr: 'Téléchargez des prompts IA gratuits, des modèles d\'email et des guides d\'enseignement. Plus de 50 ressources testées par des enseignants pour vous faire gagner du temps.',
    es: 'Descarga prompts de IA gratuitos, plantillas de email y guías de enseñanza. Más de 50 recursos probados por maestros para ahorrarte tiempo.',
    it: 'Scarica prompt IA gratuiti, template email e guide didattiche. Oltre 50 risorse testate da insegnanti per farti risparmiare tempo.'
  };

  return {
    title: titles[locale as keyof typeof titles] || titles.en,
    description: descriptions[locale as keyof typeof descriptions] || descriptions.en,
    alternates: {
      canonical: `https://zazapromptly.com${locale === 'en' ? '' : `/${locale}`}/free-resources`,
      languages: {
        'en': 'https://zazapromptly.com/free-resources',
        'de': 'https://zazapromptly.com/de/free-resources',
        'fr': 'https://zazapromptly.com/fr/free-resources',
        'es': 'https://zazapromptly.com/es/free-resources',
        'it': 'https://zazapromptly.com/it/free-resources',
        'x-default': 'https://zazapromptly.com/free-resources'
      }
    },
    openGraph: {
      title: titles[locale as keyof typeof titles] || titles.en,
      description: descriptions[locale as keyof typeof descriptions] || descriptions.en,
      url: `https://zazapromptly.com${locale === 'en' ? '' : `/${locale}`}/free-resources`,
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

export default function FreeResourcesPage() {
  const t = useTranslations();

  const resourceCategories = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: t('FreeResources.categories.aiPrompts'),
      description: 'Ready-to-use AI prompts for lesson planning, parent communication, and classroom management',
      color: 'from-purple-500 to-pink-500',
      bgColor: 'from-purple-50 to-pink-50',
      resources: [
        'Parent Communication Prompts',
        'Lesson Plan Generation Templates',
        'Assessment Creation Prompts',
        'Behavior Management Scripts'
      ]
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: t('FreeResources.categories.templates'),
      description: 'Professional templates for reports, emails, newsletters, and classroom documents',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'from-blue-50 to-cyan-50',
      resources: [
        'Email Templates Collection',
        'Report Card Comments',
        'Newsletter Templates',
        'Meeting Request Forms'
      ]
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: t('FreeResources.categories.guides'),
      description: 'Step-by-step guides for implementing AI tools in your teaching practice',
      color: 'from-green-500 to-emerald-500',
      bgColor: 'from-green-50 to-emerald-50',
      resources: [
        'AI Tools Setup Guide',
        'Time Management Strategies',
        'Digital Communication Best Practices',
        'FERPA Compliance Checklist'
      ]
    },
    {
      icon: <PenTool className="w-8 h-8" />,
      title: t('FreeResources.categories.worksheets'),
      description: 'Printable worksheets and planning tools for classroom organization',
      color: 'from-orange-500 to-red-500',
      bgColor: 'from-orange-50 to-red-50',
      resources: [
        'Weekly Planning Sheets',
        'Student Progress Trackers',
        'Communication Log Templates',
        'Goal Setting Worksheets'
      ]
    }
  ];

  const featuredResources = [
    {
      title: 'Complete AI Prompt Library for Teachers',
      description: 'Over 100 tested AI prompts for every teaching situation',
      downloadCount: '15,000+',
      fileType: 'DOCX',
      fileSize: '2.5 MB',
      downloadLink: '/downloads/AI_Prompt_Templates_for_Teachers.docx'
    },
    {
      title: 'Assessment Rubrics and Templates',
      description: 'Professional assessment tools and rubric templates',
      downloadCount: '12,000+',
      fileType: 'DOCX',
      fileSize: '1.8 MB',
      downloadLink: '/downloads/Assessment_Rubrics_and_Templates.docx'
    },
    {
      title: 'Teacher Time Management Guide',
      description: 'Weekly and monthly planning templates with AI integration tips',
      downloadCount: '8,500+',
      fileType: 'DOCX',
      fileSize: '3.2 MB',
      downloadLink: '/downloads/Teacher_Time_Management_Guide.docx'
    }
  ];

  return (
    <>
      <Header />
      
      <main className="min-h-screen pt-16 lg:pt-20">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-purple-50 to-pink-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Badge className="mb-6 bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border-green-200">
              <Gift className="w-3 h-3 mr-1" />
              100% Free
            </Badge>
            
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              {t('FreeResources.title')}
            </h1>
            
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              {t('FreeResources.subtitle')}
            </p>

            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
              <div className="flex items-center">
                <Download className="w-4 h-4 mr-2 text-purple-600" />
                50+ Resources
              </div>
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-2 text-purple-600" />
                35,000+ Downloads
              </div>
              <div className="flex items-center">
                <CheckCircle2 className="w-4 h-4 mr-2 text-purple-600" />
                Teacher Tested
              </div>
            </div>
          </div>
        </section>

        {/* Featured Resources */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Most Popular Downloads
              </h2>
              <p className="text-lg text-gray-600">
                These resources have helped thousands of teachers save time and improve communication
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {featuredResources.map((resource, index) => (
                <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                        <Star className="w-3 h-3 mr-1" />
                        Featured
                      </Badge>
                      <div className="text-right text-sm text-gray-500">
                        <div>{resource.fileType}</div>
                        <div>{resource.fileSize}</div>
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-gray-900 mb-3">
                      {resource.title}
                    </h3>
                    
                    <p className="text-gray-600 text-sm mb-4">
                      {resource.description}
                    </p>

                    <div className="flex items-center justify-between mb-4">
                      <div className="text-sm text-gray-500">
                        {resource.downloadCount} downloads
                      </div>
                      <div className="flex items-center text-sm text-green-600">
                        <CheckCircle2 className="w-4 h-4 mr-1" />
                        Free
                      </div>
                    </div>

                    <Button 
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                      asChild
                    >
                      <a href={resource.downloadLink} download target="_blank" rel="noopener noreferrer">
                        <Download className="w-4 h-4 mr-2" />
                        {t('FreeResources.downloadButton')}
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Resource Categories */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Browse by Category
              </h2>
              <p className="text-lg text-gray-600">
                Find exactly what you need for your teaching toolkit
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {resourceCategories.map((category, index) => (
                <Card key={index} className={`border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-gradient-to-br ${category.bgColor}`}>
                  <CardContent className="p-8">
                    <div className={`w-16 h-16 bg-gradient-to-br ${category.color} rounded-2xl flex items-center justify-center mb-6 text-white`}>
                      {category.icon}
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {category.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-6">
                      {category.description}
                    </p>

                    <div className="space-y-2 mb-6">
                      {category.resources.map((resource, resourceIndex) => (
                        <div key={resourceIndex} className="flex items-center text-sm text-gray-700">
                          <CheckCircle2 className="w-4 h-4 mr-2 text-green-600" />
                          {resource}
                        </div>
                      ))}
                    </div>

                    <Button variant="outline" className="w-full border-gray-300 hover:bg-white">
                      {t('FreeResources.viewAll')}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Community Section */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 lg:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Join Our Teacher Community
                  </h2>
                  <p className="text-lg text-gray-600 mb-6">
                    Connect with 2,400+ educators worldwide who are using AI to transform their teaching. 
                    Share experiences, get support, and discover new strategies.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                      <div className="text-2xl font-bold text-blue-600">2,400+</div>
                      <div className="text-sm text-gray-600">Active Teachers</div>
                    </div>
                    <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                      <div className="text-2xl font-bold text-green-600">50+</div>
                      <div className="text-sm text-gray-600">Countries</div>
                    </div>
                  </div>

                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    <Users className="w-4 h-4 mr-2" />
                    Join Community
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>

                <div className="relative">
                  <div className="w-full h-64 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-2xl shadow-xl flex items-center justify-center">
                    <Users className="w-20 h-20 text-white opacity-80" />
                  </div>
                  <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl shadow-lg flex items-center justify-center">
                    <Lightbulb className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Upgrade CTA */}
        <section className="py-16 bg-gradient-to-r from-purple-600 to-pink-600">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready for the Complete Solution?
            </h2>
            <p className="text-xl text-purple-100 mb-8">
              While our free resources are great for getting started, our premium platform offers 
              complete automation and advanced features to save you even more time.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
                asChild
              >
                <Link href="/why-zaza-promptly">
                  Compare Free vs Premium
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              
              <Button 
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-purple-600 px-8 py-4 text-lg font-semibold border-2"
              >
                Start Free Trial
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}