"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Download, Calendar, Quote } from "lucide-react"
import Image from "next/image"
import type { SpotlightResourceProps } from "@/types/spotlight"

const fileTypeIcons = {
  pdf: "📄",
  docx: "📝",
  pptx: "📊",
  zip: "📦",
}

export default function SpotlightResource({ resource, className = "" }: SpotlightResourceProps) {
  const {
    title,
    description,
    category,
    fileType,
    downloadUrl,
    thumbnailUrl,
    month,
    year,
    rating,
    downloadCount,
    testimonial,
  } = resource

  const handleDownload = () => {
    window.open(downloadUrl, "_blank")
  }

  const renderStars = () => {
    return (
      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }, (_, i) => (
          <svg
            key={i}
            className={`h-5 w-5 ${i < rating ? "text-yellow-400" : "text-gray-300"}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
        <span className="ml-2 text-sm font-medium text-gray-700">{rating}.0 stars</span>
      </div>
    )
  }

  return (
    <section className={`py-16 bg-gradient-to-r from-blue-50 to-indigo-50 ${className}`}>
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900">Spotlight Resource of the Month</h2>
          <p className="text-lg text-gray-600">Hand-picked by our education team for maximum classroom impact</p>
        </div>

        <Card className="relative overflow-hidden shadow-2xl transition-all duration-300 hover:shadow-3xl">
          {/* Month Badge - Top Right */}
          <div className="absolute right-4 top-4 z-10">
            <Badge className="bg-blue-600 text-white px-3 py-1 text-sm font-medium">
              <Calendar className="mr-1 h-3 w-3" />
              {month} {year} Pick
            </Badge>
          </div>

          <CardContent className="p-0">
            <div className="flex flex-col lg:flex-row">
              {/* Thumbnail/Icon Section */}
              <div className="flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-100 p-8 lg:w-2/5">
                {thumbnailUrl ? (
                  <Image
                    src={thumbnailUrl || "/placeholder.svg"}
                    alt={title}
                    width={300}
                    height={200}
                    className="rounded-lg object-cover shadow-lg"
                  />
                ) : (
                  <div className="flex h-[200px] w-[300px] items-center justify-center rounded-lg bg-white shadow-lg">
                    <span className="text-8xl">{fileTypeIcons[fileType]}</span>
                  </div>
                )}
              </div>

              {/* Content Section */}
              <div className="flex-1 p-8 pt-16 lg:pt-8">
                <div className="mb-4">
                  <Badge variant="outline" className="mb-3">
                    {category}
                  </Badge>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{title}</h3>
                </div>

                <p className="text-gray-700 mb-6 leading-relaxed">{description}</p>

                {/* Star Rating */}
                <div className="mb-6">{renderStars()}</div>

                {/* Download Count */}
                {downloadCount && (
                  <div className="mb-6 flex items-center gap-2 text-sm text-gray-600">
                    <Download className="h-4 w-4" />
                    <span className="font-medium">Downloaded {downloadCount.toLocaleString()} times</span>
                  </div>
                )}

                {/* Testimonial */}
                {testimonial && (
                  <div className="mb-6 rounded-lg bg-gray-50 p-4">
                    <Quote className="h-5 w-5 text-gray-400 mb-2" />
                    <blockquote className="text-sm italic text-gray-700 mb-2">"{testimonial.quote}"</blockquote>
                    <cite className="text-xs text-gray-600 not-italic">
                      — {testimonial.author}
                      {testimonial.school && `, ${testimonial.school}`}
                    </cite>
                  </div>
                )}

                {/* CTA Button */}
                <Button
                  onClick={handleDownload}
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-200 hover:shadow-xl focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  <Download className="mr-2 h-5 w-5" />
                  Download Now
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
