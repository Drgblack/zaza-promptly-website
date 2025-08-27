import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { EmailCaptureForm } from '@/components/EmailCaptureForm';
import { 
  MessageSquare, 
  BookOpen, 
  Brain,
  FileText,
  Users,
  Globe,
  Archive,
  ArrowRight,
  Clock
} from 'lucide-react';

interface PageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const isGerman = locale === 'de';

  return {
    title: isGerman ? 'Zaza Produkte - KI-Tools für Lehrkräfte' : 'Zaza Products - AI tools for teachers',
    description: isGerman 
      ? 'Entdecken Sie alle Zaza-Tools - Lehrkräfte zuerst, KI, die entlastet, mit Fokus auf Schüler.'
      : 'Explore all Zaza tools - teacher-first AI that lightens the load so you can focus on students.',
    keywords: isGerman 
      ? 'KI-Tools für Lehrkräfte, Zaza Promptly, Zaza Teach, Bildungstechnologie, Lehrkräfte-Produktivität'
      : 'AI tools for teachers, Zaza Promptly, Zaza Teach, educational technology, teacher productivity',
    openGraph: {
      title: isGerman ? 'Zaza Produkte - KI-Tools für Lehrkräfte' : 'Zaza Products - AI tools for teachers',
      description: isGerman 
        ? 'Entdecken Sie alle Zaza-Tools - Lehrkräfte zuerst, KI, die entlastet, mit Fokus auf Schüler.'
        : 'Explore all Zaza tools - teacher-first AI that lightens the load so you can focus on students.',
      type: 'website',
      url: `https://www.zazapromptly.com/${locale}/products`,
    },
    twitter: {
      card: 'summary_large_image',
      title: isGerman ? 'Zaza Produkte - KI-Tools für Lehrkräfte' : 'Zaza Products - AI tools for teachers',
      description: isGerman 
        ? 'Entdecken Sie alle Zaza-Tools - Lehrkräfte zuerst, KI, die entlastet, mit Fokus auf Schüler.'
        : 'Explore all Zaza tools - teacher-first AI that lightens the load so you can focus on students.',
    },
    alternates: {
      canonical: `https://www.zazapromptly.com/${locale}/products`,
    },
  };
}

// Product data with exact copy as specified
const getTeachingTools = (isGerman: boolean) => [
  {
    id: 'promptly',
    name: 'Zaza Promptly',
    description: isGerman
      ? 'KI-gestützter Helfer für Lehrkräfte. Schreiben Sie einfühlsame, professionelle Elternnachrichten und Zeugnisbemerkungen in Minuten statt Stunden.'
      : 'AI-powered helper for teachers. Write caring, professional parent messages and report comments in minutes, not hours.',
    primaryCTA: isGerman ? 'Mehr erfahren' : 'Learn more',
    primaryLink: '/promptly',
    icon: MessageSquare,
    color: 'from-purple-500 to-pink-500',
    bgColor: 'bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20',
    imageAlt: isGerman
      ? 'Zaza Promptly - Lehrkraft schreibt mit KI-Hilfe warme Elternnachrichten'
      : 'Zaza Promptly - teacher writing warm parent messages with AI help'
  },
  {
    id: 'teach',
    name: 'Zaza Teach',
    description: isGerman
      ? 'Ihr KI-Assistent für die Unterrichtsplanung. Erstellen Sie ansprechende, lehrplankonforme Stunden schneller - mit weniger Stress.'
      : 'Your AI lesson planning assistant. Build engaging, curriculum-aligned lessons faster - with less stress.',
    primaryCTA: isGerman ? 'Mehr erfahren' : 'Learn more',
    primaryLink: '/teach',
    icon: BookOpen,
    color: 'from-blue-500 to-indigo-500',
    bgColor: 'bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20',
    imageAlt: isGerman
      ? 'Zaza Teach - KI-gestützter Unterrichtsplan auf einem Laptop'
      : 'Zaza Teach - AI-supported lesson plan on a laptop'
  },
  {
    id: 'autoplanner',
    name: 'Zaza AutoPlanner',
    description: isGerman
      ? 'Unser Flaggschiff-Agent für multimodale Unterrichtsplanung. Adaptiv, klassenraumgerecht und zukunftsorientiert.'
      : 'Our flagship intelligent agent for multimodal lesson planning. Adaptive, classroom-aware, and built for the future of teaching.',
    primaryCTA: isGerman ? 'Mehr erfahren' : 'Learn more',
    primaryLink: '/autoplanner',
    icon: Brain,
    color: 'from-emerald-500 to-teal-500',
    bgColor: 'bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20',
    imageAlt: isGerman
      ? 'Zaza AutoPlanner - intelligenter Agent orchestriert Unterrichtsbausteine'
      : 'Zaza AutoPlanner - intelligent agent orchestrating lesson components'
  }
];

const getOtherZazaApps = (isGerman: boolean) => [
  {
    id: 'notably',
    name: 'Zaza Notably Suite',
    description: isGerman
      ? 'KI-Kommunikationstools für die Arbeit - hilfreich für Lehrkräfte bei Richtlinien, Konzepten oder Berichten.'
      : 'AI communication tools for work - helpful for educators writing policies, proposals, or reports.',
    primaryCTA: isGerman ? 'Mehr erfahren' : 'Learn more',
    primaryLink: '/notably',
    secondaryCTA: isGerman ? 'Warteliste beitreten' : 'Join waitlist',
    secondaryLink: '/waitlist',
    icon: FileText,
    color: 'from-amber-500 to-orange-500',
    bgColor: 'bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20',
    imageAlt: isGerman
      ? 'Zaza Notably - professionelle Kommunikation mit KI-Unterstützung'
      : 'Zaza Notably - professional communication with AI assistance'
  },
  {
    id: 'spark',
    name: 'Zaza Spark (HR)',
    description: isGerman
      ? 'KI-Produktivität für HR-Teams. Nützlich für Schulen: Onboarding, Schulungen und Mitarbeiterkommunikation werden einfacher.'
      : 'AI productivity for HR teams. Useful for schools: onboarding, training, and staff communication made simpler.',
    primaryCTA: isGerman ? 'Mehr erfahren' : 'Learn more',
    primaryLink: '/spark',
    secondaryCTA: isGerman ? 'Warteliste beitreten' : 'Join waitlist',
    secondaryLink: '/waitlist',
    icon: Users,
    color: 'from-rose-500 to-pink-500',
    bgColor: 'bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-900/20 dark:to-pink-900/20',
    imageAlt: isGerman
      ? 'Zaza Spark - HR-Onboarding und Schulungen mit KI'
      : 'Zaza Spark - HR onboarding and training flows with AI'
  },
  {
    id: 'looop',
    name: 'Zaza Looop',
    description: isGerman
      ? 'Kulturell immersives KI-Sprachlernen. Für bilinguale Klassen oder Lehrkräfte, die ihre Sprachkompetenz ausbauen.'
      : 'Culturally immersive AI language learning. For bilingual classrooms or teachers growing their own language skills.',
    primaryCTA: isGerman ? 'Mehr erfahren' : 'Learn more',
    primaryLink: '/looop',
    secondaryCTA: isGerman ? 'Warteliste beitreten' : 'Join waitlist',
    secondaryLink: '/waitlist',
    icon: Globe,
    color: 'from-cyan-500 to-blue-500',
    bgColor: 'bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20',
    imageAlt: isGerman
      ? 'Zaza Looop - Sprachlernen mit kulturellem Kontext'
      : 'Zaza Looop - language learning with cultural context'
  },
  {
    id: 'knowledgecore',
    name: 'Zaza KnowledgeCore',
    description: isGerman
      ? 'Das Gedächtnis der Lehre. Erfassen, organisieren und aktivieren Sie Ihre besten Ideen und Ressourcen über die gesamte Karriere hinweg.'
      : 'The memory spine for teaching. Capture, organise, and resurface your best ideas and resources across your career.',
    primaryCTA: isGerman ? 'Mehr erfahren' : 'Learn more',
    primaryLink: '/knowledgecore',
    secondaryCTA: isGerman ? 'Warteliste beitreten' : 'Join waitlist',
    secondaryLink: '/waitlist',
    icon: Archive,
    color: 'from-violet-500 to-purple-500',
    bgColor: 'bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20',
    imageAlt: isGerman
      ? 'Zaza KnowledgeCore - organisierter Wissensspeicher für Lehrkräfte'
      : 'Zaza KnowledgeCore - organised knowledge vault for teachers'
  }
];

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    description: string;
    primaryCTA: string;
    primaryLink: string;
    secondaryCTA?: string;
    secondaryLink?: string;
    icon: any;
    color: string;
    bgColor: string;
    imageAlt: string;
  };
}

function ProductCard({ product }: ProductCardProps) {
  const IconComponent = product.icon;
  
  return (
    <Card className="group relative overflow-hidden border-0 bg-white dark:bg-gray-900 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-purple-500 rounded-2xl">
      {/* TODO: Replace with actual product image */}
      <div className={`${product.bgColor} p-8 flex items-center justify-center h-48 relative`}>
        <div className={`w-16 h-16 bg-gradient-to-r ${product.color} rounded-2xl shadow-lg flex items-center justify-center`}>
          <IconComponent className="w-8 h-8 text-white" />
        </div>
        {/* Placeholder for actual image */}
        <div className="absolute inset-0 flex items-center justify-center opacity-10">
          <span className="text-xs text-gray-500 font-mono">TODO: {product.imageAlt}</span>
        </div>
      </div>
      
      <CardContent className="p-6">
        <CardHeader className="p-0 mb-4">
          <CardTitle className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            {product.name}
          </CardTitle>
        </CardHeader>
        
        <CardDescription className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
          {product.description}
        </CardDescription>
        
        <div className="flex flex-col gap-3">
          <Button 
            asChild
            className={`w-full bg-gradient-to-r ${product.color} hover:opacity-90 text-white font-semibold rounded-xl shadow-lg transition-all duration-200`}
            aria-label={`${product.primaryCTA} about ${product.name}`}
          >
            <Link href={product.primaryLink}>
              {product.primaryCTA}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
          
          {product.secondaryCTA && product.secondaryLink && (
            <Button 
              asChild
              variant="outline" 
              className="w-full border-2 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl"
              aria-label={`${product.secondaryCTA} for ${product.name}`}
            >
              <Link href={product.secondaryLink}>
                <Clock className="w-4 h-4 mr-2" />
                {product.secondaryCTA}
              </Link>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default async function ProductsPage({ params }: PageProps) {
  const { locale } = await params;
  const isGerman = locale === 'de';
  
  const teachingTools = getTeachingTools(isGerman);
  const otherZazaApps = getOtherZazaApps(isGerman);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-blue-900 dark:to-indigo-900">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.1),transparent_50%)]" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              {isGerman ? 'Alle Zaza-Tools an einem Ort' : 'All Zaza tools in one place'}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {isGerman 
                ? 'Lehrkräfte zuerst - KI, die entlastet, damit Sie sich auf Ihre Schüler konzentrieren.'
                : 'Teacher-first AI that lightens the load - so you can focus on your students.'
              }
            </p>
          </div>
        </div>
      </section>

      {/* Teaching Tools Section */}
      <section className="relative py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {isGerman ? 'Unterrichtswerkzeuge' : 'Teaching Tools'}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {isGerman 
                ? 'KI-Tools, die Lehrkräften Zeit sparen'
                : 'AI tools designed to save teachers time'
              }
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teachingTools.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Other Zaza Apps Section */}
      <section className="relative py-16 lg:py-24 bg-white/50 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {isGerman ? 'Weitere Zaza-Apps' : 'Other Zaza Apps'}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {isGerman 
                ? 'Zukünftige Zaza-Projekte zum Entdecken'
                : 'Future Zaza projects you can explore'
              }
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {otherZazaApps.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Email Capture Section */}
      <section className="relative py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <EmailCaptureForm
            title={isGerman ? 'Bleiben Sie auf dem Laufenden' : 'Stay in the loop'}
            subtitle={isGerman 
              ? 'Erhalten Sie Early Access und Produkt-Updates'
              : 'Get early access and product updates'
            }
            source="products_page"
            variant="hero"
            size="lg"
            className="mx-auto"
          />
        </div>
      </section>
    </div>
  );
}