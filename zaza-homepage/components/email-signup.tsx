"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, CheckCircle } from "lucide-react"

export default function EmailSignup() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsSubmitted(true)
    setIsLoading(false)
    setEmail("")
  }

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center space-y-4 p-6 bg-green-50 rounded-2xl border border-green-200">
        <CheckCircle className="h-12 w-12 text-green-600" />
        <h3 className="text-xl font-semibold text-green-800">Thank you for subscribing!</h3>
        <p className="text-green-700 text-center">{"You'll receive our latest updates and educator insights soon."}</p>
        <Button
          variant="outline"
          onClick={() => setIsSubmitted(false)}
          className="border-green-300 text-green-700 hover:bg-green-100"
        >
          Subscribe Another Email
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-sm sm:max-w-md mx-auto">
      <div className="relative flex-1">
        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        <Input
          type="email"
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="pl-10 py-2.5 sm:py-3 text-sm sm:text-base bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>
      <Button
        type="submit"
        disabled={isLoading}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 sm:px-8 sm:py-3 text-sm sm:text-base font-semibold whitespace-nowrap w-full sm:w-auto"
      >
        {isLoading ? "Joining..." : "Join the Newsletter"}
      </Button>
    </form>
  )
}
