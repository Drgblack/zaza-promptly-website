export default function LocalizedHomePage() {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <section className="py-20 text-center">
        <div className="container">
          <h1 className="text-4xl font-bold mb-6">AI-powered writing tool for teachers</h1>
          <p className="text-xl mb-8">Hallucination-safe AI for parent communications, student reports, and professional messages.</p>
          <div className="space-y-4">
            <a href="/pricing" className="inline-block px-8 py-4 bg-blue-600 rounded-lg">Try Free</a>
          </div>
        </div>
      </section>
    </div>
  )
}