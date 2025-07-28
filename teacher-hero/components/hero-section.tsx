"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowDown } from "lucide-react"
import { useABTest } from "@/hooks/use-ab-testing"
import { analytics } from "@/utils/analytics"

interface HeroSectionProps {
  className?: string
}

export default function HeroSection({ className = "" }: HeroSectionProps) {
  const { variant, trackOutcome } = useABTest({
    testName: "hero_cta_button",
    variants: ["browse_tools", "explore_resources", "get_started"],
    weights: [1, 1, 1], // Equal distribution
  })

  const getButtonText = () => {
    switch (variant) {
      case "browse_tools":
        return "Browse All Free Tools"
      case "explore_resources":
        return "Explore Free Resources"
      case "get_started":
        return "Get Started Free"
      default:
        return "Browse All Free Tools"
    }
  }

  const handleScrollToResources = () => {
    // Track A/B test outcome
    trackOutcome("cta_clicked")

    // Track conversion event
    analytics.trackConversionEvent({
      eventType: "resource_interaction",
      pageUrl: window.location.href,
      referrer: document.referrer,
    })

    const resourcesGrid = document.getElementById("resources-grid")
    if (resourcesGrid) {
      resourcesGrid.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  }

  return (
    <section className={`w-full bg-gradient-to-br from-slate-50 to-blue-50 ${className}`} role="banner">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <Badge
            variant="secondary"
            className="mb-6 bg-blue-100 px-4 py-2 text-sm font-medium text-blue-800 hover:bg-blue-200"
          >
            New resources added monthly
          </Badge>

          {/* Main Headline - H1 for SEO */}
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-gray-900 md:text-6xl">
            Real resources. Built for real teachers. <span className="text-blue-600">Free.</span>
          </h1>

          {/* Subheadline */}
          <p className="mb-10 text-lg leading-8 text-gray-600 md:text-xl">
            From lesson kits to feedback banks, Zaza's free tools are made to save you time, spark ideas, and help you
            thrive — no sign-up required (unless you want more).
          </p>

          {/* Primary CTA with A/B Testing */}
          <Button
            onClick={handleScrollToResources}
            size="lg"
            className="group bg-blue-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-200 hover:bg-blue-700 hover:shadow-xl focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 touch-manipulation"
            aria-describedby="cta-description"
          >
            {getButtonText()}
            <ArrowDown
              className="ml-2 h-5 w-5 transition-transform duration-200 group-hover:translate-y-1"
              aria-hidden="true"
            />
          </Button>
          <p id="cta-description" className="sr-only">
            Scroll down to view all available free teaching resources
          </p>
        </div>
      </div>
    </section>
  )
}
