"use client"

import { useState, useCallback } from "react"

interface EmailSignupData {
  email: string
  firstName?: string
  lastName?: string
  teacherGrade?: string
  schoolType?: string
  source: string
  tags?: string[]
}

export function useEmailMarketing() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const subscribeToMailchimp = useCallback(async (data: EmailSignupData) => {
    try {
      const response = await fetch("/api/integrations/mailchimp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email_address: data.email,
          status: "subscribed",
          merge_fields: {
            FNAME: data.firstName || "",
            LNAME: data.lastName || "",
            GRADE: data.teacherGrade || "",
            SCHOOL: data.schoolType || "",
          },
          tags: data.tags || [],
          source: data.source,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to subscribe to newsletter")
      }

      return await response.json()
    } catch (error) {
      console.error("Mailchimp subscription error:", error)
      throw error
    }
  }, [])

  const subscribeToConvertKit = useCallback(async (data: EmailSignupData) => {
    try {
      const response = await fetch("/api/integrations/convertkit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.email,
          first_name: data.firstName,
          fields: {
            teacher_grade: data.teacherGrade,
            school_type: data.schoolType,
            signup_source: data.source,
          },
          tags: data.tags,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to subscribe to ConvertKit")
      }

      return await response.json()
    } catch (error) {
      console.error("ConvertKit subscription error:", error)
      throw error
    }
  }, [])

  const handleEmailSignup = useCallback(
    async (data: EmailSignupData) => {
      setIsSubmitting(true)
      setError(null)

      try {
        // Subscribe to primary email platform (Mailchimp)
        await subscribeToMailchimp(data)

        // Also subscribe to ConvertKit for segmentation
        await subscribeToConvertKit(data)

        // Track conversion
            if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "email_signup_success", {
            event_category: "conversion",
            event_label: data.source,
            value: 150,
          })
        }

        // Facebook Pixel
        if (typeof window !== "undefined" && window.fbq) {
          window.fbq("track", "Lead", {
            content_name: "Email Signup",
            content_category: data.source,
            value: 150,
            currency: "USD",
          })
        }

        return { success: true }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Subscription failed"
        setError(errorMessage)

        // Track error
            if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "email_signup_error", {
            event_category: "error",
            event_label: errorMessage,
          })
        }

        return { success: false, error: errorMessage }
      } finally {
        setIsSubmitting(false)
      }
    },
    [subscribeToMailchimp, subscribeToConvertKit],
  )

  return {
    handleEmailSignup,
    isSubmitting,
    error,
  }
}
