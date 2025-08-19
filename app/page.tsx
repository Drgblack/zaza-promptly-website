import type { Metadata } from 'next'
import { HeroSection } from "@/components/hero-section"
import { SocialProofSection } from "@/components/social-proof-section"
import { CorePromisesSection } from "@/components/core-promises-section"
import { TeacherDifferentiatorSection } from "@/components/teacher-differentiator-section"
import { LiveDemoSection } from "@/components/live-demo-section"
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
      
      {/* Refactored Homepage - New Information Architecture */}
      <main>
        {/* 1. Hero - concise + single CTA row */}
        <HeroSection />
        
        {/* 2. Social Proof - compact carousel/quotes */}
        <SocialProofSection />
        
        {/* 3. Three Core Promises - replace many feature tiles */}
        <CorePromisesSection />
        
        {/* 4. Teacher-Friendly Differentiator - Generic AI vs Teacher AI */}
        <TeacherDifferentiatorSection />
        
        {/* 5. Live Demo Snapshot - one focused card/screenshot */}
        <LiveDemoSection />
        
        {/* 6. Email Capture - the only form on page */}
        <MainEmailCaptureSection />
        
        {/* 7. FAQ teaser + secondary CTA */}
        <FAQTeaserSection />
        
        {/* 8. Footer - unchanged structure (handled by root layout) */}
      </main>
    </>
  )
}