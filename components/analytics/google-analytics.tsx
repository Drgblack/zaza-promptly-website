"use client"

import { useEffect } from "react"
import Script from "next/script"

interface GoogleAnalyticsProps {
  measurementId: string
}

export function GoogleAnalytics({ measurementId }: GoogleAnalyticsProps) {
  useEffect(() => {
    // Initialize GA4 with enhanced ecommerce and custom dimensions
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("config", measurementId, {
        page_title: document.title,
        page_location: window.location.href,
        custom_map: {
          custom_parameter_1: "user_type",
          custom_parameter_2: "engagement_level",
          custom_parameter_3: "demo_completion",
        },
        // Enhanced ecommerce settings
        send_page_view: true,
        allow_google_signals: true,
        allow_ad_personalization_signals: false, // GDPR compliance
      })

      // Set custom dimensions
      (window as any).gtag("config", measurementId, {
        custom_map: {
          custom_parameter_1: "teacher_grade_level",
          custom_parameter_2: "school_type",
          custom_parameter_3: "experience_level",
        },
      })
    }
  }, [measurementId])

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`} strategy="afterInteractive" />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${measurementId}', {
            page_title: document.title,
            page_location: window.location.href,
            send_page_view: true
          });
        `}
      </Script>
    </>
  )
}
