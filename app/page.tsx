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
import StreakCounter from "@/components/gamification/StreakCounter"
import SampleOutputs from "@/components/ai/SampleOutputs"

export const metadata: Metadata = {
  title: 'AI for Teachers - Parent Communications & Student Reports | Zaza Promptly',
  description: 'PhD-designed AI tool for teachers. Write professional parent emails, student comments & reports 10x faster. Join 12,000+ educators using GDPR-compliant, hallucination-safe AI. Built by Dr. Greg Blackburn. Starting at $14.99/month.',
  keywords: [
    'AI for teachers', 'AI teacher assistant', 'parent communication AI', 'student report AI',
    'teacher productivity tools', 'AI comment generator teachers', 'professional education AI',
    'PhD designed AI teachers', 'Dr Greg Blackburn AI', 'GDPR compliant teacher AI',
    'hallucination-safe AI education', 'teacher workload reduction', 'AI vs ChatGPT teachers',
    'safe AI classroom tools', 'AI for parent emails', 'teacher communication assistant',
    'education technology AI', 'pedagogically sound AI', 'AI built by educators'
  ],
  openGraph: {
    title: 'AI Teaching Assistant Built by PhD Educator | 12,000+ Teachers Trust Zaza Promptly',
    description: 'Professional AI for teachers designed by Dr. Greg Blackburn (PhD in Professional Education). Write better parent communications & student reports 10x faster. GDPR compliant & hallucination-safe.',
    images: ['/og-image.png'],
    type: 'website',
    locale: 'en_US',
    siteName: 'Zaza Promptly'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Teaching Assistant - Built by PhD Educator for 12,000+ Teachers',
    description: 'Professional AI tool for teachers designed by Dr. Greg Blackburn. GDPR-compliant, hallucination-safe AI for parent communications & student reports.',
    images: ['/og-image.png'],
    creator: '@zazateachapp',
    site: '@zazateachapp'
  },
  alternates: {
    canonical: 'https://zazapromptly.com'
  }
}

export default function Home() {
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
        
        {/* 2.5. Streak Counter (Gamification) */}
        <section className="py-8 bg-gradient-to-r from-purple-50 to-blue-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <StreakCounter />
          </div>
        </section>
        
        {/* 3. Core Promises */}
        <section className="py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <CorePromisesSection />
          </div>
        </section>
        
        {/* 3.5. AI Transparency & Sample Outputs */}
        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SampleOutputs />
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
        
        {/* 5. See it in action - Full Bleed */}
        <section className="relative w-full overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
            <div className="absolute inset-0 bg-gradient-to-t from-white/50 to-transparent" />
            {/* Subtle accent elements */}
            <div className="absolute top-1/4 right-16 w-20 h-20 bg-blue-200/20 rounded-full" />
            <div className="absolute bottom-1/4 left-20 w-28 h-28 bg-emerald-200/15 rounded-full blur-xl" />
          </div>
          <SnippetDemo />
        </section>
        
        {/* 6. Trust Badges Section */}
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

        {/* 7. Teacher Testimonials */}
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
        
        {/* 8. Email Capture */}
        <section className="py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <MainEmailCaptureSection />
          </div>
        </section>

        {/* 9. Inline Email Capture - Additional opportunity */}
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
        
        {/* 10. Pricing Preview */}
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

        {/* 11. Trust Block - FAQ, Testimonials, Badges */}
        <TrustBlock />

        {/* 12. Bottom CTA Section */}
        <BottomCTASection />
        
        {/* 13. Footer - handled by root layout */}
      </main>
    </>
  )
}