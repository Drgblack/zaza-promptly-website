import Image from "next/image"

export function TeacherTipsContent() {
  return (
    <article className="max-w-3xl mx-auto prose prose-lg prose-gray">
      <div className="space-y-8">
        {/* Introduction */}
        <div className="text-xl leading-relaxed text-gray-700 font-light space-y-4">
          <p>
            Teachers are some of the busiest professionals in the world. From planning lessons to marking work, handling
            admin, and responding to parents — it's no wonder burnout is on the rise.
          </p>
          <p>
            But with the right AI tools, you can reclaim hours each week. In this post, we share 5 practical AI tips to
            give you back time, headspace, and — yes — the joy of teaching.
          </p>
        </div>

        <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">1. Use AI to Draft Parent Messages</h2>

        <p className="text-gray-700 leading-relaxed">
          Tired of rephrasing the same things over and over? Use tools like Zaza Promptly to instantly draft clear,
          kind, and professional parent messages. You can tweak the tone, reuse common structures, and save custom
          templates.
        </p>

        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
          <p className="text-blue-800 font-medium">🧠 Bonus: It learns your preferred style over time.</p>
        </div>

        <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">2. Auto-Generate Lesson Plans</h2>

        <p className="text-gray-700 leading-relaxed">
          Planning doesn't need to take hours. With Zaza Teach, simply describe your topic and student level, and get a
          full, editable lesson plan in seconds — aligned to curriculum standards and adaptable to your needs.
        </p>

        <div className="bg-orange-50 border-l-4 border-orange-400 p-4 rounded-r-lg">
          <p className="text-orange-800 font-medium">
            💡 Save your favourites, remix past lessons, and even collaborate with colleagues.
          </p>
        </div>

        <figure className="my-8">
          <div className="relative aspect-video rounded-lg overflow-hidden">
            <Image
              src="/placeholder.svg?height=300&width=600"
              alt="AI lesson planning interface showing curriculum alignment"
              fill
              className="object-cover"
              loading="lazy"
            />
          </div>
          <figcaption className="text-center text-sm text-gray-600 mt-3 italic">
            AI-generated lesson plans can be customized and aligned to your curriculum standards
          </figcaption>
        </figure>

        <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">3. Reuse Student Feedback Smarter</h2>

        <p className="text-gray-700 leading-relaxed">
          Stop rewriting the same feedback 30 times. AI can help you batch-generate comments based on your key points.
          Save comment banks, auto-detect learning gaps, and reduce marking fatigue.
        </p>

        <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-r-lg">
          <p className="text-green-800 font-medium">
            ✍️ Try combining this with scaffolded writing frameworks (see Zaza ScaffoldAI) to give formative feedback
            earlier.
          </p>
        </div>

        <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">4. Summarise Meetings and PD Notes</h2>

        <p className="text-gray-700 leading-relaxed">
          Missed a meeting or swamped after a workshop? Use AI to summarise transcripts, extract actions, and tag key
          takeaways. No more digging through long docs.
        </p>

        <div className="bg-purple-50 border-l-4 border-purple-400 p-4 rounded-r-lg">
          <p className="text-purple-800 font-medium">
            🗂 Tip: Combine with Zaza StackMate to turn ideas into action plans.
          </p>
        </div>

        <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">5. Use AI as Your Thinking Partner</h2>

        <p className="text-gray-700 leading-relaxed">
          Sometimes, the best time-saver is having someone to bounce ideas off. AI can brainstorm lesson starters, write
          rubrics, or even help script your next class podcast. It's not cheating — it's collaborating.
        </p>

        <div className="bg-indigo-50 border-l-4 border-indigo-400 p-4 rounded-r-lg">
          <p className="text-indigo-800 font-medium">
            🎙 Educators who embrace AI now are laying the groundwork for future-ready classrooms.
          </p>
        </div>

        <blockquote className="border-l-4 border-blue-500 pl-6 py-4 my-8 bg-blue-50 rounded-r-lg">
          <p className="text-lg italic text-gray-800 mb-2">
            "The goal isn't to replace the human touch in education, but to give teachers more time to focus on what
            they do best — inspiring and connecting with students."
          </p>
          <cite className="text-sm text-gray-600 font-medium">— Greg Blackburn, Founder of Zaza</cite>
        </blockquote>

        <div className="bg-gray-50 p-6 rounded-lg my-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Start Checklist</h3>
          <ul className="space-y-2">
            <li className="flex items-center">
              <span className="w-4 h-4 bg-blue-500 rounded-full mr-3 flex-shrink-0"></span>
              <span className="text-gray-700">Choose one AI tool to try this week</span>
            </li>
            <li className="flex items-center">
              <span className="w-4 h-4 bg-blue-500 rounded-full mr-3 flex-shrink-0"></span>
              <span className="text-gray-700">Start with parent communication or lesson planning</span>
            </li>
            <li className="flex items-center">
              <span className="w-4 h-4 bg-blue-500 rounded-full mr-3 flex-shrink-0"></span>
              <span className="text-gray-700">Track time saved over one week</span>
            </li>
            <li className="flex items-center">
              <span className="w-4 h-4 bg-blue-500 rounded-full mr-3 flex-shrink-0"></span>
              <span className="text-gray-700">Share your experience with colleagues</span>
            </li>
          </ul>
        </div>
      </div>
    </article>
  )
}
