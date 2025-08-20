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
  // FORCE DEPLOYMENT: 2025-08-20-v3 - New pricing $14.99 and navigation
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
          
          {/* Modern Wave Divider */}
          <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
            <svg 
              className="relative block w-full h-[80px] sm:h-[120px]" 
              data-name="Layer 1" 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 1200 120" 
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path 
                d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" 
                opacity=".25" 
                className="fill-white"
              />
              <path 
                d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" 
                opacity=".5" 
                className="fill-white"
              />
              <path 
                d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" 
                className="fill-white"
              />
            </svg>
          </div>
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