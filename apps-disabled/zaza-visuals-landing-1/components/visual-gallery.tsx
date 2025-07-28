"use client"

import { Card, CardContent } from "@/components/ui/card"

const sampleVisuals = [
  {
    id: 1,
    title: "Solar System Diagram",
    subject: "Science",
    style: "Educational Diagram",
    alt: "Solar system diagram with planets",
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/solar-system.jpg-0X5VcsEV8OIeqI8B5EOeewIKudyd2c.jpeg",
  },
  {
    id: 2,
    title: "Fraction Pizza",
    subject: "Mathematics",
    style: "Cartoon Illustration",
    alt: "Pizza slice diagram used to teach fractions",
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/fraction-pizza.jpg-Z11ZglRj17uT6aRmY6G7uSUnJApI7N.jpeg",
  },
  {
    id: 3,
    title: "Parts of Speech Poster",
    subject: "English",
    style: "Educational Poster",
    alt: "Parts of speech poster with colourful word categories",
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/parts-of-speech.jpg-ytXsk6DX9AZznMLBxDg8txYASBO9vU.jpeg",
    customDescription: "Created with Zaza Visuals to support early grammar lessons in Year 3.",
  },
  {
    id: 4,
    title: "Water Cycle Process",
    subject: "Science",
    style: "Process Diagram",
    alt: "Illustration showing evaporation, condensation, precipitation and collection",
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/water-cycle-process.jpg-4IWZFS5OaPQ9CZmnE1CdCja24sKg8u.jpeg",
    customDescription: "A science diagram created with Zaza Visuals to support primary environmental science lessons.",
  },
  {
    id: 5,
    title: "World Map – Continents",
    subject: "Geography",
    style: "Educational Map",
    alt: "Educational world map showing continents with labels",
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/world-map-continents.jpg-uxOx6fQd400uueUpkUUpzyJ80C4TSo.jpeg",
    customDescription: "Geography visual designed with Zaza Visuals to support continent recognition and map reading.",
  },
  {
    id: 6,
    title: "Ancient Rome Timeline",
    subject: "History",
    style: "Timeline Infographic",
    alt: "Timeline of key events from Ancient Roman history",
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ancient-rome-timeline.jpg-Za0HK7uHohrKM2rKeVbPHp55FBStGz.jpeg",
    customDescription:
      "This history timeline was created with Zaza Visuals to help students understand the rise and fall of Ancient Rome.",
  },
]

export function VisualGallery() {
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            See the Images and Videos Teachers Are Creating
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            From science diagrams to classroom explainer videos, Zaza helps teachers create both images and videos for
            every subject and grade level.
          </p>
        </div>

        <div className="overflow-x-auto pb-4">
          <div className="flex gap-6 w-max md:grid md:grid-cols-3 md:w-full lg:grid-cols-3 md:gap-8">
            {sampleVisuals.map((visual) => (
              <Card
                key={visual.id}
                className="flex-shrink-0 w-80 md:w-full bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl group hover:-translate-y-2"
              >
                <CardContent className="p-0">
                  <div className="relative overflow-hidden rounded-t-2xl">
                    <img
                      src={visual.src || "/placeholder.svg"}
                      alt={visual.alt}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="bg-white/90 backdrop-blur-sm text-xs font-semibold px-2 py-1 rounded-full text-gray-700">
                        {visual.subject}
                      </span>
                    </div>
                    <div className="absolute top-3 right-3">
                      <span className="bg-gradient-to-r from-orange-500 to-pink-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                        {visual.style}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-semibold text-lg text-gray-900 mb-2">{visual.title}</h3>
                    <p className="text-sm text-gray-600">
                      {visual.customDescription ||
                        `Perfect for ${visual.subject.toLowerCase()} lessons and classroom displays.`}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-6">Ready to create your own classroom visuals and videos?</p>
          <button
            onClick={() => document.getElementById("email-signup")?.scrollIntoView({ behavior: "smooth" })}
            className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-8 py-4 rounded-2xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Start Creating Now
          </button>
        </div>
      </div>
    </section>
  )
}
