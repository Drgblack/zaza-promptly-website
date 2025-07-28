"use client"

import ResourceCard from "./resource-card"
import type { ResourceGridProps as GridProps } from "@/types/resource"

export default function ResourceGrid({ resources, onCardInteraction, className = "" }: GridProps) {
  return (
    <section id="resources-grid" className={`bg-white py-16 ${className}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900">Free Teaching Resources</h2>
          <p className="text-lg text-gray-600">
            Discover our collection of classroom-ready materials designed by teachers, for teachers
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
          {resources.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} onInteraction={onCardInteraction} />
          ))}
        </div>

        {resources.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-gray-500">No resources available at the moment.</p>
          </div>
        )}
      </div>
    </section>
  )
}
