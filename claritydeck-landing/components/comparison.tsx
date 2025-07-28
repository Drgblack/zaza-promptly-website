"use client"

import { Check, X } from "lucide-react"

const features = [
  { name: "Deep Understanding", claritydeck: true, others: false },
  { name: "Visual Output", claritydeck: true, others: false },
  { name: "Learning Scaffolding", claritydeck: true, others: false },
  { name: "Easy Sharing", claritydeck: true, others: true },
  { name: "AI-Powered", claritydeck: true, others: true },
  { name: "Citation-Backed", claritydeck: true, others: false },
]

export function Comparison() {
  return (
    <section className="py-16 px-4 bg-off-white">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">Why Choose ClarityDeck?</h2>
          <p className="text-navy/70 text-lg max-w-2xl mx-auto">See how we compare to generic study tools</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* ClarityDeck Column */}
            <div className="md:col-span-1 bg-gradient-to-br from-violet to-violet/80 rounded-2xl p-6 text-white transform hover:scale-105 transition-all duration-200">
              <h3 className="text-xl font-bold mb-6 text-center">ClarityDeck</h3>
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-mint flex-shrink-0" />
                    <span className="text-sm">{feature.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Generic Tools Column */}
            <div className="md:col-span-2 bg-white rounded-2xl p-6 border border-gray-200">
              <h3 className="text-xl font-bold mb-6 text-center text-navy">
                Generic Tools (Quizlet, Notion AI, ChatGPT)
              </h3>
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    {feature.others ? (
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                    ) : (
                      <X className="w-5 h-5 text-red-400 flex-shrink-0" />
                    )}
                    <span className="text-sm text-navy/70">{feature.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
