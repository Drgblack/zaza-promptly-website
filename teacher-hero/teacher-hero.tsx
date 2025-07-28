"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowDown } from "lucide-react"

export default function Component() {
  const scrollToResources = () => {
    const resourceGrid = document.getElementById("resource-grid")
    if (resourceGrid) {
      resourceGrid.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="w-full py-16 md:py-24 lg:py-32 bg-gradient-to-br from-slate-50 to-blue-50/30">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center text-center space-y-6 max-w-4xl mx-auto">
            {/* Badge */}
            <Badge
              variant="secondary"
              className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200 px-4 py-2 text-sm font-medium"
            >
              New resources added monthly
            </Badge>

            {/* Main Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900">
              Real resources. Built for real teachers. <span className="text-emerald-600">Free.</span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg md:text-xl text-slate-600 max-w-3xl leading-relaxed">
              From lesson kits to feedback banks, Zaza's free tools are made to save you time, spark ideas, and help you
              thrive — no sign-up required (unless you want more).
            </p>

            {/* CTA Button */}
            <Button
              onClick={scrollToResources}
              size="lg"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 group mt-8"
            >
              Browse All Free Tools
              <ArrowDown className="ml-2 h-5 w-5 group-hover:translate-y-1 transition-transform duration-200" />
            </Button>
          </div>
        </div>
      </section>

      {/* Placeholder for Resource Grid */}
      <section id="resource-grid" className="w-full py-16 bg-white">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Free Teaching Resources</h2>
            <p className="text-slate-600 mb-8">Your resource grid would go here</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Placeholder cards */}
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div key={item} className="bg-slate-100 rounded-lg p-6 h-48 flex items-center justify-center">
                  <span className="text-slate-500">Resource Card {item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
