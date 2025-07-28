"use client"

import { Quote } from "lucide-react"

export function Testimonial() {
  return (
    <section className="py-16 px-4 bg-gradient-to-r from-mint/20 to-violet/10">
      <div className="container mx-auto text-center">
        <div className="max-w-3xl mx-auto">
          <Quote className="w-12 h-12 text-violet mx-auto mb-6 opacity-50" />

          <blockquote className="text-2xl md:text-3xl font-medium text-navy mb-6 leading-relaxed">
            "I finally understand the things I used to memorise — this app changed how I study."
          </blockquote>

          <cite className="text-navy/70 font-medium">– Beta Tester</cite>
        </div>
      </div>
    </section>
  )
}
