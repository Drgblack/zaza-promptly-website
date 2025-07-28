"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { CheckCircle, AlertCircle, Mail } from "lucide-react"
import { cn } from "@/lib/utils"

interface EmailSignupProps {
  title?: string
  description?: string
  placeholder?: {
    name?: string
    email?: string
  }
  buttonText?: string
  successMessage?: string
  errorMessage?: string
  onSubmit?: (data: { name: string; email: string }) => Promise<void>
  className?: string
  variant?: "default" | "minimal" | "gradient"
}

export function EmailSignup({
  title = "Join 1,000+ Teachers Already Using Zaza",
  description = "Get early access to our tools plus exclusive teaching resources.",
  placeholder = {
    name: "Enter your first name",
    email: "Enter your email"
  },
  buttonText = "Get Early Access",
  successMessage = "Thanks! We'll be in touch soon.",
  errorMessage = "Something went wrong. Please try again.",
  onSubmit,
  className,
  variant = "default"
}: EmailSignupProps) {
  const [formData, setFormData] = useState({ name: "", email: "" })
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")

    try {
      if (onSubmit) {
        await onSubmit(formData)
      } else {
        // Simulate API call - replace with actual endpoint
        await new Promise((resolve) => setTimeout(resolve, 1500))
      }

      setStatus("success")
      setMessage(successMessage)
      setFormData({ name: "", email: "" })
    } catch (error) {
      setStatus("error")
      setMessage(errorMessage)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const cardVariants = {
    default: "bg-white/90 backdrop-blur-sm border-0 shadow-xl rounded-3xl",
    minimal: "bg-white border border-gray-200 shadow-lg rounded-xl",
    gradient: "bg-gradient-to-br from-white/95 to-gray-50/95 backdrop-blur-sm border-0 shadow-xl rounded-3xl"
  }

  const iconVariants = {
    default: "bg-gradient-to-br from-orange-400 to-pink-500",
    minimal: "bg-gray-100",
    gradient: "bg-gradient-to-br from-purple-400 to-pink-500"
  }

  return (
    <section className={cn("py-16 px-4", className)}>
      <div className="max-w-2xl mx-auto">
        <Card className={cn("overflow-hidden", cardVariants[variant])}>
          <CardContent className="p-8 md:p-12">
            <div className="text-center mb-8">
              <div className={cn(
                "w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4",
                iconVariants[variant]
              )}>
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                {title}
              </h3>
              <p className="text-lg text-gray-600">
                {description}
              </p>
            </div>

            {status === "success" ? (
              <div className="text-center py-8">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h4 className="text-xl font-semibold text-gray-900 mb-2">You're all set!</h4>
                <p className="text-gray-600">{message}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      First Name
                    </label>
                    <Input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder={placeholder.name}
                      disabled={status === "loading"}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder={placeholder.email}
                      disabled={status === "loading"}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={status === "loading"}
                  variant="gradient"
                  className="w-full py-4 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
                >
                  {status === "loading" ? "Signing Up..." : buttonText}
                </Button>

                {status === "error" && (
                  <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg">
                    <AlertCircle className="w-5 h-5" />
                    <span className="text-sm">{message}</span>
                  </div>
                )}

                <p className="text-xs text-gray-500 text-center">
                  No spam, ever. Unsubscribe anytime. By signing up, you agree to our privacy policy.
                </p>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  )
} 