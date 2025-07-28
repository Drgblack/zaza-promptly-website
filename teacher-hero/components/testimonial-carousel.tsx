"use client"

import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import TestimonialCard from "./testimonial-card"
import type { TestimonialCarouselProps } from "@/types/testimonial"

export default function TestimonialCarousel({ testimonials, className = "" }: TestimonialCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [isHovered, setIsHovered] = useState(false)
  const autoScrollRef = useRef<NodeJS.Timeout>()

  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1)
    }
  }

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -320, behavior: "smooth" })
    }
  }

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 320, behavior: "smooth" })
    }
  }

  const startAutoScroll = () => {
    if (!isHovered) {
      autoScrollRef.current = setInterval(() => {
        if (scrollContainerRef.current) {
          const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
          if (scrollLeft >= scrollWidth - clientWidth - 1) {
            // Reset to beginning
            scrollContainerRef.current.scrollTo({ left: 0, behavior: "smooth" })
          } else {
            scrollRight()
          }
        }
      }, 4000)
    }
  }

  const stopAutoScroll = () => {
    if (autoScrollRef.current) {
      clearInterval(autoScrollRef.current)
    }
  }

  useEffect(() => {
    checkScrollButtons()
    startAutoScroll()

    return () => stopAutoScroll()
  }, [isHovered])

  const handleMouseEnter = () => {
    setIsHovered(true)
    stopAutoScroll()
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    startAutoScroll()
  }

  const handleGoogleFormClick = () => {
    window.open("https://forms.google.com/", "_blank")
  }

  return (
    <section className={`py-12 bg-blue-50 ${className}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-8 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900">Zaza in the Wild</h2>
          <p className="text-lg text-gray-600 mb-6">
            Real stories from teachers using Zaza's resources in their classrooms
          </p>
          <Button
            onClick={handleGoogleFormClick}
            variant="outline"
            className="bg-white hover:bg-gray-50 border-blue-200 text-blue-700 hover:text-blue-800"
          >
            Submit Your Story
            <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
        </div>

        {/* Carousel Container */}
        <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          {/* Arrow Controls */}
          <Button
            onClick={scrollLeft}
            disabled={!canScrollLeft}
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <Button
            onClick={scrollRight}
            disabled={!canScrollRight}
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>

          {/* Scrollable Container */}
          <div
            ref={scrollContainerRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory px-8"
            onScroll={checkScrollButtons}
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="snap-start">
                <TestimonialCard testimonial={testimonial} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  )
}
