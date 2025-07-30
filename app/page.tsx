import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Zaza Promptly - AI-Powered Feedback Generation for Teachers',
  description: 'Save hours with Zaza Promptly – the AI-powered tool that helps teachers write student comments and parent messages faster, better, and stress-free.',
  keywords: ['AI teacher tools', 'student comments', 'report writing', 'teacher feedback', 'education technology', 'AI for teachers'],
  openGraph: {
    title: 'Zaza Promptly - AI-Powered Feedback Generation for Teachers',
    description: 'Save hours with Zaza Promptly – the AI-powered tool that helps teachers write student comments and parent messages faster, better, and stress-free.',
    images: ['/opengraph-image'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zaza Promptly - AI-Powered Feedback Generation for Teachers',
    description: 'Save hours with Zaza Promptly – the AI-powered tool that helps teachers write student comments and parent messages faster, better, and stress-free.',
    images: ['/opengraph-image'],
  },
  alternates: {
    canonical: '/',
  },
}
import { HeroSection } from "@/components/hero-section"
import { EmailSignupSection } from "@/components/email-signup-section"
import { PainRecognitionSection } from "@/components/pain-recognition-section"
import { TransformationSection } from "@/components/transformation-section"
import { FeaturesSection } from "@/components/features-section"
import { ComparisonSection } from "@/components/comparison-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { DemoSection } from "@/components/demo-section"
import { FinalCTASection } from "@/components/final-cta-section"
import { StickyCTA } from "@/components/sticky-cta"
import { MobileOptimizations } from "@/components/mobile-optimizations"
import { SEOHead } from "@/components/seo-head"
import { SkipLink } from "@/components/skip-link"
import { PerformanceMonitor } from "@/components/performance-monitor"
import { AccessibilityAnnouncer } from "@/components/accessibility-announcer"
import { LazyGPTAssistant } from "@/components/lazy-gpt-assistant"

export default function Home() {
  return (
    <>
      <SEOHead pageType="home" />
      <SkipLink />
      <AccessibilityAnnouncer />
      <PerformanceMonitor />
      {/* Main Content */}
      <HeroSection />
      <EmailSignupSection />
      <PainRecognitionSection />
      <TransformationSection />
      <FeaturesSection />
      <ComparisonSection />
      <TestimonialsSection />
      <DemoSection />
      <FinalCTASection />
      <MobileOptimizations />
      <StickyCTA />
      <LazyGPTAssistant />
    </>
  )
}
