"use client"

import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import MiniResourceCard from "./mini-resource-card"
import { RecommendationEngine } from "@/utils/recommendation-engine"
import type { RecommendationsSectionProps } from "@/types/recommendations"

export default function RecommendationsSection({
  userInteractions,
  allResources,
  onResourceInteraction,
  className = "",
}: RecommendationsSectionProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  // Generate recommendations
  const recommendations = RecommendationEngine.generateRecommendations(userInteractions, allResources, 8)

  // Don't show if not enough interactions or no recommendations
  if (userInteractions.length < 2 || recommendations.length === 0) {
    return null
  }

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -280, behavior: "smooth" })
    }
  }

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 280, behavior: "smooth" })
    }
  }

  return (
    <section className={`py-12 bg-gray-50 ${className}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Recommended for You</h2>
            <p className="text-gray-600">Based on your recent activity and interests</p>
          </div>

          {/* Navigation Arrows */}
          <div className="hidden md:flex gap-2">
            <Button onClick={scrollLeft} variant="outline" size="icon" className="h-8 w-8 bg-transparent">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button onClick={scrollRight} variant="outline" size="icon" className="h-8 w-8 bg-transparent">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Recommendations Container */}
        <div className="relative">
          <div
            ref={scrollContainerRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {recommendations.map((resource) => (
              <div key={resource.id} className="snap-start">
                <MiniResourceCard resource={resource} onInteraction={onResourceInteraction} />
              </div>
            ))}
          </div>
        </div>

        {/* Topic Legend */}
        <div className="mt-6 flex flex-wrap gap-2 justify-center text-xs text-gray-500">
          <span>🎓 Key Stages</span>
          <span>💝 Wellbeing</span>
          <span>🔄 Differentiation</span>
          <span>📊 Assessment</span>
          <span>🎨 Creative Arts</span>
          <span>🔢 STEM</span>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  )
}
