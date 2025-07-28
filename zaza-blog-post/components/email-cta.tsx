"use client"

import type React from "react"
import { useState } from "react"
import { usePathname } from "next/navigation"

export function EmailCTA() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const pathname = usePathname()

  const isTeacherPost = pathname?.includes("ai-tips-for-teachers")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
    setTimeout(() => setIsSubmitted(false), 3000)
    setEmail("")
  }

  return (
    <div className="my-16 p-8 bg-gradient-to-r from-blue-50 to-orange-50 rounded-2xl border border-gray-100">
      <div className="text-center max-w-2xl mx-auto">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          {isTeacherPost ? "Want more AI tips like these? 🚀" : "Enjoying this post? 📚"}
        </h3>
        <p className="text-gray-700 mb-6">
          {isTeacherPost
            ? "Join 1,000+ educators using Zaza to reclaim time and joy. Get weekly AI tips delivered to your inbox."
            : "Join the Zaza list for weekly AI tips, productivity hacks, and exclusive insights delivered straight to your inbox."}
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
          <button
            type="submit"
            disabled={isSubmitted}
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitted ? "✓ Joined!" : "Join the List →"}
          </button>
        </form>

        <p className="text-xs text-gray-500 mt-3">No spam, unsubscribe anytime. We respect your privacy.</p>
      </div>
    </div>
  )
}
