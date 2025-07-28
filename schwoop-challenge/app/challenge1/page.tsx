"use client"

import type React from "react"
import SchwoopFooter from "@/components/schwoop-footer"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function HomePage() {
  // State management for the form - PROPERLY INITIALIZED
  const [tiktokUrl, setTiktokUrl] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  // DEBUGGING: Log current state
  console.log("Current tiktokUrl state:", tiktokUrl)

  // TikTok URL validation function
  const validateTikTokUrl = (url: string): boolean => {
    const tiktokRegex = /^https?:\/\/(www\.)?(tiktok\.com|vm\.tiktok\.com)\/.+/
    return tiktokRegex.test(url)
  }

  // Form submission handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess(false)

    if (!validateTikTokUrl(tiktokUrl)) {
      setError("Please enter a valid TikTok URL")
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch("/api/submit-tiktok", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: tiktokUrl }),
      })

      if (response.ok) {
        setSuccess(true)
        setTiktokUrl("")
        // Show success screen after a brief delay
        setTimeout(() => {
          setIsSubmitted(true)
        }, 1500)
      } else {
        setError("Failed to submit TikTok link")
      }
    } catch (error) {
      setError("Network error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  const scrollToForm = () => {
    document.getElementById("submission-form")?.scrollIntoView({
      behavior: "smooth",
    })
  }

  // Success screen after submission
  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-[#1E1F4A] flex items-center justify-center p-4">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <div className="animate-bounce">
            <div className="text-8xl mb-4">🎉</div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Nice one! You're officially in the{" "}
            <span className="bg-gradient-to-r from-[#B57EDC] to-[#F9B87F] bg-clip-text text-transparent">
              Schwoopverse
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-lg mx-auto leading-relaxed">
            Follow @schwoopapp and check your DMs — you might get early access or a feature named after you 👀
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button
              onClick={() => window.open("https://tiktok.com/@schwoopapp", "_blank")}
              className="bg-[#86BA90] hover:bg-[#86BA90]/90 text-[#1E1F4A] font-semibold px-8 py-3 rounded-full text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              Follow @schwoopapp 📱
            </Button>
            <Button
              onClick={() => {
                setIsSubmitted(false)
                setTiktokUrl("")
                setError("")
                setSuccess(false)
              }}
              variant="outline"
              className="border-[#B57EDC] text-[#B57EDC] hover:bg-[#B57EDC] hover:text-white px-8 py-3 rounded-full text-lg transition-all duration-300 bg-transparent"
            >
              Submit Another 🔄
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#1E1F4A] flex flex-col text-white">
      {/* Main content area */}
      <main className="flex-1 flex items-center justify-center p-8">
        <div className="text-center space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold text-white">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-[#B57EDC] to-[#F9B87F] bg-clip-text text-transparent">Schwoop</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Your AI-powered study companion is coming soon. Get ready to transform your academic chaos into organized
            success! 🚀
          </p>
          <div className="space-y-4">
            <div className="text-6xl animate-bounce">📚</div>
            <Button
              onClick={scrollToForm}
              className="bg-[#B57EDC] hover:bg-[#B57EDC]/90 text-white px-6 py-2 rounded-full transition-all duration-300 hover:scale-105"
            >
              Join the Challenge! 🔥
            </Button>
          </div>
        </div>
      </main>

      {/* CRITICAL FIX: SUBMISSION FORM WITH EXACT INPUT CODE */}
      <section id="submission-form" className="py-20 px-4">
        <div className="max-w-2xl mx-auto">
          <Card className="bg-gradient-to-br from-white/10 to-white/5 border-white/20 p-8 md:p-12 rounded-3xl backdrop-blur-sm">
            <h3 className="text-3xl md:text-4xl font-bold text-center mb-8">
              Drop your TikTok link here to join the{" "}
              <span className="bg-gradient-to-r from-[#B57EDC] to-[#F9B87F] bg-clip-text text-transparent">
                Schwoopverse
              </span>
            </h3>

            {/* EXACT INPUT CODE AS REQUESTED */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                value={tiktokUrl}
                onChange={(e) => {
                  console.log("Input changing:", e.target.value)
                  setTiktokUrl(e.target.value)
                }}
                placeholder="Paste your TikTok link here..."
                className="w-full p-4 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none bg-white"
                style={{
                  backgroundColor: "white",
                  color: "black",
                  border: "2px solid #ccc",
                  pointerEvents: "auto",
                  userSelect: "text",
                }}
                autoComplete="off"
                spellCheck={false}
                readOnly={false}
                disabled={false}
              />

              {/* Error message */}
              {error && (
                <p className="text-red-400 text-sm flex items-center gap-2">
                  <span>⚠️</span>
                  {error}
                </p>
              )}

              {/* Success message */}
              {success && (
                <p className="text-green-400 text-sm flex items-center gap-2">
                  <span>✅</span>
                  TikTok link submitted successfully!
                </p>
              )}

              {/* SUBMIT BUTTON */}
              <button
                type="submit"
                disabled={isLoading || !tiktokUrl.trim()}
                className="w-full bg-gradient-to-r from-[#B57EDC] to-[#F9B87F] text-white py-4 rounded-lg font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Submitting...
                  </span>
                ) : (
                  "Rescue Me 🔥"
                )}
              </button>
            </form>

            <div className="text-center text-gray-400 mt-6 space-y-2">
              <p className="text-sm">Make sure your TikTok is public so we can see your chaos! 👀</p>
              <div className="text-xs space-y-1">
                <p>Supported formats:</p>
                <p>• https://tiktok.com/@user/video/123456789</p>
                <p>• https://vm.tiktok.com/abc123</p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <SchwoopFooter />
    </div>
  )
}
