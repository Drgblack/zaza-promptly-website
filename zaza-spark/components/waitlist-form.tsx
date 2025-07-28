"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sparkles } from "lucide-react"

export function WaitlistForm() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    try {
      // In a real implementation, you would send this to your API
      // await fetch("https://yourlistprovider.com/form-endpoint", {
      //   method: "POST",
      //   body: JSON.stringify({ email }),
      //   headers: { "Content-Type": "application/json" }
      // });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setIsSuccess(true)
      setEmail("")
    } catch (err) {
      setError("Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      {!isSuccess ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="h-12 px-4 bg-white/90 border-purple-100 focus:border-purple-300 focus:ring focus:ring-purple-200 focus:ring-opacity-50"
              disabled={isSubmitting}
            />
            <Button
              type="submit"
              disabled={isSubmitting}
              className="h-12 px-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all"
            >
              {isSubmitting ? (
                "Joining..."
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Join Waitlist
                </>
              )}
            </Button>
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </form>
      ) : (
        <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-4 rounded-lg text-center">
          <Sparkles className="w-6 h-6 text-purple-600 mx-auto mb-2" />
          <h4 className="font-medium text-purple-800">You're on the list!</h4>
          <p className="text-sm text-purple-700">We'll notify you when Zaza Spark is ready.</p>
        </div>
      )}
    </div>
  )
}
