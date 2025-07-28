"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, School, CheckCircle } from "lucide-react"
import Link from "next/link"
import { Layout } from "@zaza/shared-components"
import { ThemeProvider } from "@/hooks/use-theme"

const animationStyles = `
  @keyframes gentleNudge {
    0%, 20%, 50%, 80%, 100% {
      transform: translateX(0) rotate(10deg);
    }
    40% {
      transform: translateX(-8px) rotate(10deg);
    }
    60% {
      transform: translateX(-4px) rotate(10deg);
    }
  }

  @keyframes fadeInSlide {
    0% {
      opacity: 0;
      transform: translateX(30px) rotate(10deg);
    }
    100% {
      opacity: 1;
      transform: translateX(0) rotate(10deg);
    }
  }

  @keyframes pulseGlow {
    0%, 100% {
      filter: drop-shadow(0 0 8px #fb923c60) drop-shadow(0 0 16px #fdba7440);
    }
    50% {
      filter: drop-shadow(0 0 12px #fb923c80) drop-shadow(0 0 24px #fdba7460);
    }
  }

  @keyframes tooltipFade {
    0%, 70%, 100% {
      opacity: 0;
      transform: translateY(5px);
    }
    80%, 90% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .animated-pointer {
    animation: fadeInSlide 1s ease-out, gentleNudge 2.5s ease-in-out 1.5s infinite, pulseGlow 3s ease-in-out 1.5s infinite;
  }

  .tooltip-text {
    animation: tooltipFade 4s ease-in-out 2s infinite;
  }

  @media (prefers-reduced-motion: reduce) {
    .animated-pointer, .tooltip-text {
      animation: none;
    }
  }
`

function WaitlistPageContent() {
  const [email, setEmail] = useState("")
  const [school, setSchool] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsSubmitted(true)
    setIsLoading(false)
  }

  if (isSubmitted) {
    return (
      <Layout currentProduct="Inbox">
        {/* Confirmation Content */}
        <main className="px-4 py-12 sm:px-6 lg:px-8">
          <div className="max-w-md mx-auto text-center">
            <div className="mb-8">
              <CheckCircle className="w-16 h-16 mx-auto mb-4" style={{ color: "#f97316" }} />
              <h1 className="text-3xl font-bold mb-4 text-slate-900 dark:text-gray-100 transition-colors duration-300">
                🎉 You're on the list!
              </h1>
              <p className="text-lg text-slate-600 dark:text-gray-400 transition-colors duration-300">
                We'll let you know as soon as Zaza Inbox is live.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-orange-100 dark:border-gray-700 transition-colors duration-300">
              <p className="text-sm text-slate-600 dark:text-gray-400 transition-colors duration-300">
                Keep an eye on{" "}
                <strong className="text-slate-900 dark:text-gray-100 transition-colors duration-300">{email}</strong>{" "}
                for updates and early access.
              </p>
            </div>

            <Link href="/">
              <Button
                className="mt-8 px-8 py-3 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
                style={{ background: "linear-gradient(135deg, #f97316, #ea580c)" }}
              >
                Back to Home
              </Button>
            </Link>
          </div>
        </main>
      </Layout>
    )
  }

  return (
    <Layout currentProduct="Inbox">
      {/* Main Content */}
      <main className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 text-slate-900 dark:text-gray-100 transition-colors duration-300">
              Join the Zaza Inbox Waitlist
            </h1>
            <p className="text-lg leading-relaxed text-slate-600 dark:text-gray-400 transition-colors duration-300">
              Be the first to experience the AI inbox assistant that saves teachers hours every week.
            </p>
          </div>

          {/* Waitlist Form */}
          <div className="relative">
            <style dangerouslySetInnerHTML={{ __html: animationStyles }} />

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-orange-100 dark:border-gray-700 transition-colors duration-300">
              {/* Animated Pointer */}
              <div className="absolute -right-16 top-16 hidden lg:block">
                <div className="animated-pointer relative">
                  <div
                    className="text-5xl transform"
                    style={{
                      color: "#f97316",
                      filter: "drop-shadow(3px 3px 6px rgba(251, 146, 60, 0.4))",
                    }}
                    aria-hidden="true"
                  >
                    👈
                  </div>
                  {/* Tooltip */}
                  <div className="tooltip-text absolute -top-12 left-1/2 transform -translate-x-1/2">
                    <div
                      className="bg-white dark:bg-gray-700 px-3 py-2 rounded-lg shadow-lg border border-orange-200 dark:border-gray-600 text-sm font-medium whitespace-nowrap transition-colors duration-300"
                      style={{
                        color: "#f97316",
                      }}
                    >
                      Start here
                      <div
                        className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent"
                        style={{ borderTopColor: "#f97316" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile version - smaller and positioned differently */}
              <div className="absolute -right-8 top-20 block lg:hidden md:block sm:hidden">
                <div className="animated-pointer relative">
                  <div
                    className="text-3xl transform"
                    style={{
                      color: "#f97316",
                      filter: "drop-shadow(2px 2px 4px rgba(251, 146, 60, 0.4))",
                    }}
                    aria-hidden="true"
                  >
                    👈
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Input */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-2 text-slate-900 dark:text-gray-100 transition-colors duration-300"
                  >
                    School Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-500 dark:text-gray-400 transition-colors duration-300" />
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your school email address"
                      required
                      className="pl-10 py-3 border-2 border-orange-100 dark:border-gray-600 focus:border-orange-300 dark:focus:border-orange-400 focus:ring-0 rounded-lg transition-all duration-200 bg-orange-50 dark:bg-gray-700 text-slate-900 dark:text-gray-100 placeholder:text-slate-500 dark:placeholder:text-gray-400"
                    />
                  </div>
                </div>

                {/* School Input */}
                <div>
                  <label
                    htmlFor="school"
                    className="block text-sm font-medium mb-2 text-slate-900 dark:text-gray-100 transition-colors duration-300"
                  >
                    Where do you teach?{" "}
                    <span className="text-sm font-normal text-slate-600 dark:text-gray-400 transition-colors duration-300">
                      (Optional)
                    </span>
                  </label>
                  <div className="relative">
                    <School className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-500 dark:text-gray-400 transition-colors duration-300" />
                    <Input
                      id="school"
                      type="text"
                      value={school}
                      onChange={(e) => setSchool(e.target.value)}
                      placeholder="School name or district"
                      className="pl-10 py-3 border-2 border-orange-100 dark:border-gray-600 focus:border-orange-300 dark:focus:border-orange-400 focus:ring-0 rounded-lg bg-orange-50 dark:bg-gray-700 text-slate-900 dark:text-gray-100 placeholder:text-slate-500 dark:placeholder:text-gray-400 transition-colors duration-300"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isLoading || !email}
                  className="w-full py-3 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50"
                  style={{ background: "linear-gradient(135deg, #f97316, #ea580c)" }}
                >
                  {isLoading ? "Joining..." : "Join Waitlist"}
                </Button>

                {/* GDPR Notice */}
                <p className="text-xs text-center leading-relaxed text-slate-600 dark:text-gray-400 transition-colors duration-300">
                  We'll never spam you. Only relevant updates and launch info.
                </p>
              </form>
            </div>
          </div>

          {/* Visual Accent */}
          <div className="mt-12 text-center">
            <div
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-full transition-colors duration-300"
              style={{ backgroundColor: "#fb923c20" }}
            >
              <span className="text-sm font-medium" style={{ color: "#ea580c" }}>
                🍎 Built specifically for educators
              </span>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  )
}

export default function WaitlistPage() {
  return (
    <ThemeProvider>
      <WaitlistPageContent />
    </ThemeProvider>
  )
}
