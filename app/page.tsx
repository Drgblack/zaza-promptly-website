import type { Metadata } from 'next'
import { HeroSection } from "@/components/hero-section"
import { SocialProofSection } from "@/components/social-proof-section"
import { CorePromisesSection } from "@/components/core-promises-section"
import { TeacherDifferentiatorSection } from "@/components/teacher-differentiator-section"
import { SnippetDemo } from "@/components/snippet-demo"
import { MainEmailCaptureSection } from "@/components/main-email-capture-section"
import { TrustBlock } from "@/components/trust-block"
import { SEOHead } from "@/components/seo-head"
import { SkipLink } from "@/components/skip-link"
import { PerformanceMonitor } from "@/components/performance-monitor"
import { AccessibilityAnnouncer } from "@/components/accessibility-announcer"
import { StructuredData } from "@/components/structured-data"
import { generateWebsiteSchema, generateOrganizationSchema, generateSoftwareSchema } from "@/lib/structured-data"

export const metadata: Metadata = {
  title: 'AI for Teacher Reports & Parent Communication | Zaza Promptly - Safe AI Tool for Teachers',
  description: 'Hallucination-safe AI tool for teachers writing parent communications, reports & professional messages. Join 12,000+ teachers reducing workload with GDPR-compliant AI. Free trial available.',
  keywords: [
    'AI for teacher reports', 'AI for parent communication', 'safe AI for teachers', 
    'AI tool for teachers', 'teacher productivity apps', 'report writing for teachers AI',
    'parent email generator for teachers', 'hallucination-safe AI', 'GDPR compliant AI for teachers',
    'reduce teacher workload with AI', 'teacher comment bank AI', 'AI vs ChatGPT for teachers'
  ],
  openGraph: {
    title: 'AI for Teacher Reports & Parent Communication | Safe AI Tool for Teachers',
    description: 'Hallucination-safe AI tool trusted by 12,000+ teachers. Write better parent communications and reports 10x faster. GDPR compliant, designed by educators.',
    images: ['/og-image.png'],
    type: 'website',
    locale: 'en_US',
    siteName: 'Zaza Promptly'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Safe AI Tool for Teachers - Reports & Parent Communication',
    description: 'Join 12,000+ teachers using hallucination-safe AI for reports and parent communications. GDPR compliant, designed by PhD educator.',
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
        
        {/* 7. Email Capture */}
        <section className="py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <MainEmailCaptureSection />
          </div>
        </section>
        
        {/* 8. Trust Block - FAQ, Testimonials, Badges */}
        <TrustBlock />
        
        {/* 9. Footer - handled by root layout */}
      </main>
    </>
  )
}