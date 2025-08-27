import type { Metadata } from 'next'
import { HeroSection } from "@/components/hero-section"
import { SocialProofSection } from "@/components/social-proof-section"
import { CorePromisesSection } from "@/components/core-promises-section"
import { TeacherDifferentiatorSection } from "@/components/teacher-differentiator-section"
import { SnippetDemo } from "@/components/snippet-demo"
import { MainEmailCaptureSection } from "@/components/main-email-capture-section"
import { InlineEmailCapture } from "@/components/inline-email-capture"
import { TrustBlock } from "@/components/trust-block"
import { TrustBadges } from "@/components/trust-badges"
import { TeacherTestimonials } from "@/components/teacher-testimonials"
import { SEOInternalLinks } from "@/components/seo-internal-links"
import { LazyContent } from "@/components/lazy-loading"
import { EnhancedCTA, HeroCTASection, BottomCTASection } from "@/components/enhanced-cta"
import { StripeCheckout, ProductPricing } from "@/components/stripe-checkout"
import { SEOHead } from "@/components/seo-head"
import { SkipLink } from "@/components/skip-link"
import { PerformanceMonitor } from "@/components/performance-monitor"
import { AccessibilityAnnouncer } from "@/components/accessibility-announcer"
import { StructuredData } from "@/components/structured-data"
import { ComprehensiveSchemas } from "@/components/structured-data/comprehensive-schemas"
import { generateWebsiteSchema, generateOrganizationSchema, generateSoftwareSchema } from "@/lib/structured-data"
import { StreakCounter } from "@/components/habit-building/StreakCounter"
import { SampleGenerator } from "@/components/ai-transparency/SampleGenerator"
import { AccessibleCard } from "@/components/accessibility/AccessibleCard"
import EmailSignupForm from "@/src/components/forms/EmailSignupForm"
import SnippetToolV2 from "@/src/components/sections/SnippetToolV2"
import FounderCard from "@/src/components/FounderCard"

// Multilingual content
const content = {
  en: {
    title: 'AI for Teachers - Parent Communications & Student Reports | Zaza Promptly',
    description: 'PhD-designed AI tool for teachers. Write professional parent emails, student comments & reports 10x faster. Starting at $14.99/month. Join 12,000+ educators using GDPR-compliant, hallucination-safe AI. Built by Dr. Greg Blackburn.',
    hero: {
      title: 'AI Teaching Assistant Built by PhD Educator',
      subtitle: '12,000+ Teachers Trust Zaza Promptly'
    }
  },
  de: {
    title: 'KI für Lehrer - Elternkommunikation & Schülerberichte | Zaza Promptly',
    description: 'Von einem Doktor entworfenes KI-Tool für Lehrer. Schreiben Sie professionelle Eltern-E-Mails, Schülerkommentare und Berichte 10x schneller. Ab 14,99€/Monat. Treten Sie 12.000+ Pädagogen bei, die DSGVO-konforme, halluzinationssichere KI verwenden.',
    hero: {
      title: 'KI-Lehrassistent von Doktor entwickelt',
      subtitle: '12.000+ Lehrer vertrauen Zaza Promptly'
    }
  },
  fr: {
    title: 'IA pour Enseignants - Communications Parents & Rapports Étudiants | Zaza Promptly',
    description: 'Outil IA conçu par un docteur pour les enseignants. Rédigez des emails aux parents, commentaires d\'élèves et rapports professionnels 10x plus vite. À partir de 14,99€/mois. Rejoignez 12 000+ éducateurs utilisant une IA conforme RGPD et sans hallucinations.',
    hero: {
      title: 'Assistant IA Enseignant conçu par un Docteur',
      subtitle: '12 000+ Enseignants font confiance à Zaza Promptly'
    }
  },
  es: {
    title: 'IA para Profesores - Comunicaciones con Padres y Reportes Estudiantiles | Zaza Promptly',
    description: 'Herramienta de IA diseñada por un doctor para profesores. Escriba emails profesionales a padres, comentarios de estudiantes y reportes 10x más rápido. Desde €14,99/mes. Únase a 12,000+ educadores usando IA compatible con GDPR y sin alucinaciones.',
    hero: {
      title: 'Asistente IA para Profesores diseñado por Doctor',
      subtitle: '12,000+ Profesores confían en Zaza Promptly'
    }
  },
  it: {
    title: 'IA per Insegnanti - Comunicazioni Genitori & Report Studenti | Zaza Promptly',
    description: 'Strumento IA progettato da un dottore per insegnanti. Scrivi email professionali ai genitori, commenti degli studenti e report 10x più velocemente. Da €14,99/mese. Unisciti a 12.000+ educatori che usano IA conforme GDPR e senza allucinazioni.',
    hero: {
      title: 'Assistente IA Insegnanti progettato da Dottore',
      subtitle: '12.000+ Insegnanti si fidano di Zaza Promptly'
    }
  }
}

export async function generateStaticParams() {
  const locales = ['en', 'de', 'fr', 'es', 'it']
  return locales.map(locale => ({ locale }))
}

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const locale = params.locale as keyof typeof content
  const t = content[locale] || content.en

  return {
    title: t.title,
    description: t.description,
    keywords: [
      'AI for teachers', 'AI teacher assistant', 'parent communication AI', 'student report AI',
      'teacher productivity tools', 'AI comment generator teachers', 'professional education AI',
      'PhD designed AI teachers', 'Dr Greg Blackburn AI', 'GDPR compliant teacher AI',
      'hallucination-safe AI education', 'teacher workload reduction', 'AI vs ChatGPT teachers',
      'safe AI classroom tools', 'AI for parent emails', 'teacher communication assistant',
      'education technology AI', 'pedagogically sound AI', 'AI built by educators'
    ],
    openGraph: {
      title: t.hero.title + ' | ' + t.hero.subtitle,
      description: t.description,
      images: ['/og-image.png'],
      type: 'website',
      locale: locale === 'en' ? 'en_US' : locale,
      siteName: 'Zaza Promptly'
    },
    twitter: {
      card: 'summary_large_image',
      title: t.hero.title + ' - ' + t.hero.subtitle,
      description: t.description,
      images: ['/og-image.png'],
      creator: '@zazateachapp',
      site: '@zazateachapp'
    },
    alternates: {
      canonical: `https://zazapromptly.com/${locale === 'en' ? '' : locale}`
    }
  }
}

export default function Home({ params }: { params: { locale: string } }) {
  const locale = params.locale as keyof typeof content
  const t = content[locale] || content.en
  const siteUrl = 'https://zazapromptly.com'
  
  // Generate structured data schemas for homepage
  const websiteSchema = generateWebsiteSchema({
    name: 'Zaza Promptly',
    url: siteUrl,
    description: 'AI-powered teaching assistant that helps teachers write student comments and parent messages 10x faster',
    sameAs: [
      'https://linkedin.com/company/zaza-technologies',
      'https://twitter.com/zazateachapp'
    ]
  })
  
  const organizationSchema = generateOrganizationSchema(siteUrl)
  const softwareSchema = generateSoftwareSchema(siteUrl)
  
  return (
    <>
      <ComprehensiveSchemas url={siteUrl} />
      <SEOHead pageType="home" />
      <StructuredData data={[websiteSchema, organizationSchema, softwareSchema]} />
      <SkipLink />
      <AccessibilityAnnouncer />
      <PerformanceMonitor />
      
      <main>
        {/* 1. Full-bleed Hero */}
        <section className="relative w-full overflow-hidden">
          {/* Background gradient spans full width */}
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-900 via-blue-800 to-amber-500">
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            {/* Static accent elements */}
            <div className="absolute top-1/4 left-10 w-20 h-20 bg-white/5 rounded-full" />
            <div className="absolute top-1/3 right-20 w-16 h-16 bg-amber-400/10 rounded-full" />
            <div className="absolute bottom-1/4 left-1/4 w-12 h-12 bg-purple-400/10 rounded-full" />
          </div>
          <HeroSection />
        </section>
        
        {/* 2. Social Proof */}
        <section className="py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SocialProofSection />
          </div>
        </section>
        
        {/* 3. Core Promises */}
        <section className="py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <CorePromisesSection />
          </div>
        </section>
        
        {/* 4. Teacher Differentiator - Full Bleed */}
        <section className="relative w-full overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950">
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            {/* Premium accent elements */}
            <div className="absolute top-1/4 left-16 w-24 h-24 bg-blue-400/10 rounded-full blur-xl" />
            <div className="absolute bottom-1/3 right-20 w-32 h-32 bg-indigo-400/10 rounded-full blur-2xl" />
            <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-purple-400/15 rounded-full" />
          </div>
          <TeacherDifferentiatorSection />
        </section>
        
        {/* 5. See it in action - Full Bleed with centralized SnippetToolV2 */}
        <section className="relative w-full overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
            <div className="absolute inset-0 bg-gradient-to-t from-white/50 to-transparent" />
            {/* Subtle accent elements */}
            <div className="absolute top-1/4 right-16 w-20 h-20 bg-blue-200/20 rounded-full" />
            <div className="absolute bottom-1/4 left-20 w-28 h-28 bg-emerald-200/15 rounded-full blur-xl" />
          </div>
          <div className="py-16 md:py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  See AI Comment Generation in Action
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Try our AI tool with your own text and see how it improves your comments instantly.
                </p>
              </div>
              <SnippetToolV2 />
            </div>
          </div>
        </section>
        
        {/* 6. AI Transparency & Habit Building */}
        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Experience the Difference
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                See AI transparency in action and build teaching habits that save you hours every week.
              </p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {/* Streak Counter */}
              <AccessibleCard
                title="Build Your Teaching Streak"
                description="Track your AI-assisted teaching journey"
                variant="elevated"
                focusable={true}
                announcement="Habit tracking card with streak counter and weekly goals"
              >
                <StreakCounter />
              </AccessibleCard>
              
              {/* AI Sample Generator */}
              <AccessibleCard
                title="Try AI Sample Generator"
                description="See real examples before you commit"
                variant="gradient" 
                focusable={true}
                announcement="Interactive AI demo showing real comment examples"
              >
                <SampleGenerator compact={true} />
              </AccessibleCard>
            </div>
          </div>
        </section>
        
        {/* 7. Trust Badges Section */}
        <section className="py-16 md:py-20 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Built by Educators, for Educators
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Unlike generic AI tools, Zaza Promptly is designed specifically for teachers with safety, privacy, and pedagogy at its core.
              </p>
            </div>
            <TrustBadges layout="grid" limit={6} className="max-w-4xl mx-auto" />
          </div>
        </section>

        {/* 8. Teacher Testimonials */}
        <LazyContent>
          <section className="py-16 md:py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                  Join 12,000+ Teachers Who've Reclaimed Their Evenings
                </h2>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                  Real teachers sharing how Zaza Promptly transformed their work-life balance
                </p>
              </div>
              <TeacherTestimonials limit={6} />
            </div>
          </section>
        </LazyContent>
        
        {/* 9. Email Capture with centralized EmailSignupForm */}
        <section className="py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Ready to Transform Your Teaching?
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Join thousands of teachers who are already saving hours every week with AI-powered tools.
              </p>
            </div>
            <EmailSignupForm 
              variant="hero"
              source="homepage"
              headline="Take back your evenings - join thousands of teachers already saving hours."
              subtext="Sign up free today. No spam, just time-saving tools for teachers."
            />
          </div>
        </section>

        {/* 10. Inline Email Capture - Additional opportunity */}
        <section className="py-8 md:py-12 bg-gradient-to-r from-purple-50 to-blue-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <InlineEmailCapture 
              variant="compact" 
              source="homepage_bottom" 
              title="Don't miss free teacher resources"
              description="Join thousands of educators getting weekly AI prompts and productivity tips"
              className="mb-6"
            />
            <div className="text-center">
              <SEOInternalLinks context="homepage" />
            </div>
          </div>
        </section>
        
        {/* 11. Founder Section */}
        <section className="py-16 md:py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Built by an Educator, for Educators
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Meet the PhD educator who understands your classroom challenges and built AI specifically for teachers.
              </p>
            </div>
            <FounderCard />
          </div>
        </section>

        {/* 12. Pricing Preview */}
        <LazyContent>
          <section className="py-16 md:py-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                  Simple, Transparent Pricing
                </h2>
                <p className="text-lg text-slate-600">
                  Start free, upgrade when you're ready. Used by teachers worldwide.
                </p>
              </div>
              <ProductPricing productId="individual" />
            </div>
          </section>
        </LazyContent>

        {/* 13. Trust Block - FAQ, Testimonials, Badges */}
        <TrustBlock />

        {/* 14. Bottom CTA Section */}
        <BottomCTASection />
        
        {/* 14. Footer - handled by root layout */}
      </main>
    </>
  )
}