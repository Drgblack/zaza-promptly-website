"use client"

export function ProblemSolution() {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="container mx-auto text-center">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Problem */}
          <div className="animate-slide-up">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6">
              Studying shouldn't feel like <span className="text-accent-pink">drowning in highlighters.</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-accent-pink to-vivid-mint mx-auto rounded-full shadow-pink-glow"></div>
          </div>

          {/* Solution */}
          <div className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <h3 className="text-2xl md:text-3xl font-semibold text-text-primary mb-4">
              ClarityDeck gives you{" "}
              <span className="bg-gradient-to-r from-primary-cta to-vivid-mint bg-clip-text text-transparent">
                instant clarity
              </span>{" "}
              from messy notes.
            </h3>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
              No more endless re-reading. No more panic before exams. Just smart, personalized study tools that actually
              help you learn.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
