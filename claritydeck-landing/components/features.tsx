"use client"

const features = [
  {
    emoji: "📚",
    title: "Smart Quizzes",
    description: "Auto-generate test-ready questions from any input.",
    gradient: "from-primary-cta/10 to-primary-cta/5",
    shadow: "shadow-soft-glow",
  },
  {
    emoji: "⚡",
    title: "Visual Learning",
    description: "Concept maps and flashcards from your notes.",
    gradient: "from-vivid-mint/10 to-vivid-mint/5",
    shadow: "shadow-mint-glow",
  },
  {
    emoji: "🧠",
    title: "Built for You",
    description: "Study tools that match your vibe, energy, and goals.",
    gradient: "from-accent-pink/10 to-accent-pink/5",
    shadow: "shadow-pink-glow",
  },
]

export function Features() {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-white to-hero-from">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group bg-gradient-to-br ${feature.gradient} backdrop-blur-sm rounded-3xl p-8 border border-white/50 hover:border-white/80 transition-all duration-300 hover:-translate-y-2 ${feature.shadow} hover:shadow-xl`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-5xl mb-6 animate-float" style={{ animationDelay: `${index * 0.5}s` }}>
                {feature.emoji}
              </div>

              <h3 className="text-xl font-bold text-text-primary mb-4">{feature.title}</h3>
              <p className="text-text-secondary leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
