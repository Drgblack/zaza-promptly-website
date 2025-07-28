"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Quote } from "lucide-react"
import Image from "next/image"
import type { TestimonialCardProps } from "@/types/testimonial"

export default function TestimonialCard({ testimonial, className = "" }: TestimonialCardProps) {
  const { teacherName, school, subject, quote, resourceUsed, avatarUrl } = testimonial

  return (
    <Card
      className={`w-80 h-48 flex-shrink-0 bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 ${className}`}
    >
      <CardContent className="p-4 h-full flex flex-col">
        {/* Header with Avatar and Quote Icon */}
        <div className="flex items-center gap-3 mb-3">
          <div className="relative">
            {avatarUrl ? (
              <Image
                src={avatarUrl || "/placeholder.svg"}
                alt={`${teacherName} avatar`}
                width={48}
                height={48}
                className="rounded-full object-cover"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-blue-600 font-semibold text-lg">
                  {teacherName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)}
                </span>
              </div>
            )}
          </div>
          <Quote className="h-4 w-4 text-blue-400 ml-auto" />
        </div>

        {/* Quote */}
        <blockquote className="flex-1 text-sm italic text-gray-700 leading-relaxed mb-3 line-clamp-3">
          "{quote}"
        </blockquote>

        {/* Attribution and Resource */}
        <div className="space-y-2">
          <div className="text-xs text-gray-600">
            <span className="font-medium text-gray-900">{teacherName}</span>
            <br />
            {school} • {subject}
          </div>
          <Badge variant="outline" className="text-xs px-2 py-1">
            Used: {resourceUsed}
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}
