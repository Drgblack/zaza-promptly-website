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
        {/* 1. Hero */}
        <div className="max-w-6xl mx-auto px-4">
          <div className="py-16 md:py-20">
            <HeroSection />
          </div>
        </div>
        
        {/* 2. TestimonialCarousel (Social Proof) */}
        <div className="max-w-6xl mx-auto px-4">
          <div className="py-16 md:py-20">
            <SocialProofSection />
          </div>
        </div>
        
        {/* 3. ValueCards (Core Promises) */}
        <div className="max-w-6xl mx-auto px-4">
          <div className="py-16 md:py-20">
            <CorePromisesSection />
          </div>
        </div>
        
        {/* 4. ComparisonBlock (Teacher Differentiator) */}
        <div className="max-w-6xl mx-auto px-4">
          <div className="py-16 md:py-20">
            <TeacherDifferentiatorSection />
          </div>
        </div>
        
        {/* 5. ActionMiniDemo (Live Demo) */}
        <div className="max-w-6xl mx-auto px-4">
          <div className="py-16 md:py-20">
            <LiveDemoSection />
          </div>
        </div>
        
        {/* 6. SnippetDemo */}
        <SnippetDemo />
        
        {/* 7. EmailCapture */}
        <div className="max-w-6xl mx-auto px-4">
          <div className="py-16 md:py-20">
            <MainEmailCaptureSection />
          </div>
        </div>
        
        {/* 8. FAQ */}
        <div className="max-w-6xl mx-auto px-4">
          <div className="py-16 md:py-20">
            <FAQTeaserSection />
          </div>
        </div>
        
        {/* 9. Footer - handled by root layout */}
      </main>
    </>
  )
}