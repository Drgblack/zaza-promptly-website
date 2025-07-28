"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Mail, Sparkles, Zap } from "lucide-react"

interface EmailSignupFormProps {
  source?: string
}

function EmailSignupForm({ source = "hero-section" }: EmailSignupFormProps) {
  const [email, setEmail] = useState("")
  const [firstName, setFirstName] = useState("")
  const [surname, setSurname] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(false)
    try {
      const res = await fetch("/api/email-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, firstName, surname, source }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || "Subscription failed. Please try again.")
      }
      setSuccess(true)
      setEmail("")
      setFirstName("")
      setSurname("")
    } catch (err: any) {
      setError(err.message || "Subscription failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto" aria-label="Email signup form">
      <input type="hidden" name="source" value={source} />
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <input
          id="firstName"
          type="text"
          required
          placeholder="First name"
          className="flex-1 px-4 py-3 border-2 border-white/30 rounded-xl focus:border-white focus:outline-none text-base text-white placeholder-white/70 bg-white/10 backdrop-blur-sm"
          value={firstName}
          onChange={e => setFirstName(e.target.value)}
          disabled={loading}
          autoComplete="given-name"
          aria-label="First name"
        />
        <input
          id="surname"
          type="text"
          required
          placeholder="Surname"
          className="flex-1 px-4 py-3 border-2 border-white/30 rounded-xl focus:border-white focus:outline-none text-base text-white placeholder-white/70 bg-white/10 backdrop-blur-sm"
          value={surname}
          onChange={e => setSurname(e.target.value)}
          disabled={loading}
          autoComplete="family-name"
          aria-label="Surname"
        />
      </div>
      <input
        id="email"
        type="email"
        required
        placeholder="Enter your email"
        className="w-full px-4 py-3 border-2 border-white/30 rounded-xl focus:border-white focus:outline-none text-base text-white placeholder-white/70 bg-white/10 backdrop-blur-sm mb-4"
        value={email}
        onChange={e => setEmail(e.target.value)}
        disabled={loading}
        autoComplete="email"
        aria-label="Email address"
      />
      <Button 
        type="submit" 
        disabled={loading || !email.trim() || !firstName.trim() || !surname.trim()} 
        className="w-full min-h-[48px] bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none" 
        aria-label="Get AI-powered teaching tips"
      >
        {loading ? (
          <div className="flex items-center justify-center space-x-2">
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            <span>Signing up...</span>
          </div>
        ) : (
          <div className="flex items-center justify-center space-x-2">
            <Zap className="w-5 h-5" />
            <span>Get AI Teaching Tips</span>
          </div>
        )}
      </Button>
      <div aria-live="polite" className="min-h-[24px] mt-3">
        {success && <div className="text-amber-200 font-medium text-center">🎉 Welcome to the AI teaching revolution!</div>}
        {error && <div className="text-red-300 font-medium text-center">{error}</div>}
      </div>
    </form>
  )
}

export function EmailSignupSection() {
  return (
    <section className="relative py-20 lg:py-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.1),transparent_50%)]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Section Title */}
          <div className="flex items-center justify-center mb-6">
            <Mail className="w-8 h-8 text-amber-300 mr-3" />
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
              Get{" "}
              <span className="bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent">
                AI Teaching Tips
              </span>{" "}
              Delivered
            </h2>
            <Sparkles className="w-8 h-8 text-amber-300 ml-3" />
          </div>
          
          <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto leading-relaxed">
            Join thousands of teachers getting weekly AI-powered insights, teaching strategies, and exclusive access to new features.
          </p>

          {/* Email Signup Form */}
          <EmailSignupForm source="hero-section" />

          {/* Trust Indicators */}
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-blue-100 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span>No spam, ever</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span>Unsubscribe anytime</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span>AI insights only</span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-1/4 left-10 w-16 h-16 bg-white/5 rounded-full animate-float-slow" />
      <div className="absolute top-1/3 right-20 w-12 h-12 bg-amber-400/10 rounded-full animate-float-medium" />
      <div className="absolute bottom-1/4 left-1/4 w-20 h-20 bg-purple-400/10 rounded-full animate-float-fast" />
    </section>
  )
} 