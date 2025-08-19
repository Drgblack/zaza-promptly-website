import type { Metadata } from 'next'
import { HeroSection } from "@/components/hero-section"
import { SocialProofSection } from "@/components/social-proof-section"
import { CorePromisesSection } from "@/components/core-promises-section"
import { TeacherDifferentiatorSection } from "@/components/teacher-differentiator-section"
import { LiveDemoSection } from "@/components/live-demo-section"
import { SnippetDemo } from "@/components/snippet-demo"
import { MainEmailCaptureSection } from "@/components/main-email-capture-section"
import { FAQTeaserSection } from "@/components/faq-teaser-section"
import { SEOHead } from "@/components/seo-head"
import { SkipLink } from "@/components/skip-link"
import { PerformanceMonitor } from "@/components/performance-monitor"
import { AccessibilityAnnouncer } from "@/components/accessibility-announcer"
import { StructuredData } from "@/components/structured-data"
import { generateWebsiteSchema, generateOrganizationSchema, generateSoftwareSchema } from "@/lib/structured-data"

export const metadata: Metadata = {
  title: 'Zaza Promptly - AI Teaching Assistant That Saves Teachers 5+ Hours/Week',
  description: 'Join 12,000+ teachers using AI to write better student feedback faster. Generate personalized comments, parent messages, and assessments in seconds with Zaza Promptly.',
  openGraph: {
    title: 'Zaza Promptly - AI Teaching Assistant That Saves Teachers 5+ Hours/Week',
    description: 'Join 12,000+ teachers using AI to write better student feedback faster. Try free today!',
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zaza Promptly - AI Teaching Assistant That Saves Teachers 5+ Hours/Week',
    description: 'Join 12,000+ teachers using AI to write better student feedback faster. Try free today!',
    images: ['/og-image.png'],
  },
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
        
        {/* 4. Teacher Differentiator */}
        <section className="py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <TeacherDifferentiatorSection />
          </div>
        </section>
        
        {/* 5. Live Demo */}
        <section className="py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <LiveDemoSection />
          </div>
        </section>
        
        {/* 6. Snippet Demo */}
        <SnippetDemo />
        
        {/* 7. Email Capture */}
        <section className="py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <MainEmailCaptureSection />
          </div>
        </section>
        
        {/* 8. FAQ */}
        <section className="py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FAQTeaserSection />
          </div>
        </section>
        
        {/* 9. Footer - handled by root layout */}
      </main>
    </>
  )
}