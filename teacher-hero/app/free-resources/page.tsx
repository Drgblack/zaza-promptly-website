"use client"

import { useEffect, Suspense } from "react"
import dynamic from "next/dynamic"
import { Layout } from "@zaza/shared-components"
import HeroSection from "@/components/hero-section"
import BreadcrumbNavigation from "@/components/breadcrumb-navigation"
import ResourceGridSkeleton from "@/components/skeletons/resource-grid-skeleton"
import SpotlightSkeleton from "@/components/skeletons/spotlight-skeleton"
import TestimonialSkeleton from "@/components/skeletons/testimonial-skeleton"
import { useOnboardingTrigger } from "@/hooks/use-onboarding-trigger"
import { useRecommendations } from "@/hooks/use-recommendations"
import type { UserInteraction } from "@/types/recommendations"

// Lazy load components for better performance
const ResourceGrid = dynamic(() => import("@/components/resource-grid"), {
  loading: () => <ResourceGridSkeleton />,
  ssr: false,
})

const SpotlightResource = dynamic(() => import("@/components/spotlight-resource"), {
  loading: () => <SpotlightSkeleton />,
})

const TestimonialCarousel = dynamic(() => import("@/components/testimonial-carousel"), {
  loading: () => <TestimonialSkeleton />,
})

const RecommendationsSection = dynamic(() => import("@/components/recommendations-section"), {
  ssr: false,
})

const SoftOnboarding = dynamic(() => import("@/components/soft-onboarding"), {
  ssr: false,
})

// Import data
import { sampleResources } from "@/data/sample-resources"
import { currentSpotlightResource } from "@/data/spotlight-resource"
import { sampleTestimonials } from "@/data/testimonials"
import { miniResourcesData } from "@/data/mini-resources"

export default function Page() {
  const { shouldShow, trackCardInteraction, dismissOnboarding, handleSignUp } = useOnboardingTrigger()
  const { userInteractions, trackInteraction, loadStoredInteractions } = useRecommendations()

  // Load stored interactions on mount
  useEffect(() => {
    loadStoredInteractions()
  }, [loadStoredInteractions])

  const handleResourceInteraction = (
    resourceId: string,
    category: string,
    accessLevel: "instant" | "email" | "enhanced",
  ) => {
    trackCardInteraction()

    const interaction: UserInteraction = {
      resourceId,
      category,
      accessLevel,
      timestamp: Date.now(),
      action: "view",
    }
    trackInteraction(interaction)
  }

  const handleRecommendationInteraction = (interaction: UserInteraction) => {
    trackInteraction(interaction)
  }

  return (
    <Layout currentProduct="Teacher Hero">
      {/* Structured Data for Educational Resources */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Free Teacher Resources",
            description:
              "Download free lesson planners, comment banks, printable posters, and teaching tools. Created by teachers, for teachers.",
            url: "https://zaza.tech/free-resources",
            mainEntity: {
              "@type": "ItemList",
              numberOfItems: sampleResources.length,
              itemListElement: sampleResources.map((resource, index) => ({
                "@type": "ListItem",
                position: index + 1,
                item: {
                  "@type": "EducationalResource",
                  name: resource.title,
                  description: resource.description,
                  educationalLevel: resource.category,
                  learningResourceType: "Lesson Plan",
                  isAccessibleForFree: true,
                  publisher: {
                    "@type": "Organization",
                    name: "Zaza Technologies",
                  },
                },
              })),
            },
          }),
        }}
      />

      {/* Breadcrumb Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://zaza.tech",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Free Resources",
                item: "https://zaza.tech/free-resources",
              },
            ],
          }),
        }}
      />

      <main id="main-content" className="min-h-screen">
        <BreadcrumbNavigation />

        <HeroSection />

        <Suspense fallback={<ResourceGridSkeleton />}>
          <ResourceGrid resources={sampleResources} onCardInteraction={() => trackCardInteraction()} />
        </Suspense>

        <Suspense fallback={null}>
          <RecommendationsSection
            userInteractions={userInteractions}
            allResources={miniResourcesData}
            onResourceInteraction={handleRecommendationInteraction}
          />
        </Suspense>

        <Suspense fallback={<SpotlightSkeleton />}>
          <SpotlightResource resource={currentSpotlightResource} />
        </Suspense>

        <Suspense fallback={<TestimonialSkeleton />}>
          <TestimonialCarousel testimonials={sampleTestimonials} />
        </Suspense>

        <Suspense fallback={null}>
          <SoftOnboarding isVisible={shouldShow} onDismiss={dismissOnboarding} onSignUp={handleSignUp} />
        </Suspense>
      </main>
    </Layout>
  )
}
