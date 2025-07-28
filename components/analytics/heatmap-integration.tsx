"use client"

import { useCallback } from "react"

import { useEffect } from "react"
import Script from "next/script"

interface HeatmapConfig {
  hotjarId?: string
  crazyEggId?: string
  enableRecordings?: boolean
  enableHeatmaps?: boolean
  enableFeedback?: boolean
}

export function HeatmapIntegration({
  hotjarId,
  crazyEggId,
  enableRecordings = true,
  enableHeatmaps = true,
  enableFeedback = false,
}: HeatmapConfig) {
  useEffect(() => {
    // Initialize Hotjar
    if (hotjarId && typeof window !== "undefined") {
      ;((h: any, o: any, t: any, j: any, a?: any, r?: any) => {
        h.hj =
          h.hj ||
          (() => {
            ;(h.hj.q = h.hj.q || []).push(arguments)
          })
        h._hjSettings = { hjid: hotjarId, hjsv: 6 }
        a = o.getElementsByTagName("head")[0]
        r = o.createElement("script")
        r.async = 1
        r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv
        a.appendChild(r)
      })(window, document, "https://static.hotjar.com/c/hotjar-", ".js?sv=")

      // Configure Hotjar settings
      window.hj =
        window.hj ||
        (() => {
          ;(window.hj.q = window.hj.q || []).push(arguments)
        })

      // Set user attributes for better segmentation
      window.hj("identify", "USER_ID", {
        user_type: "teacher",
        signup_date: new Date().toISOString(),
      })

      // Configure what to track
      if (!enableRecordings) {
        window.hj("do_not_track")
      }
    }
  }, [hotjarId, enableRecordings])

  return (
    <>
      {/* Hotjar Script */}
      {hotjarId && (
        <Script id="hotjar-script" strategy="afterInteractive">
          {`
            (function(h,o,t,j,a,r){
              h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
              h._hjSettings={hjid:${hotjarId},hjsv:6};
              a=o.getElementsByTagName('head')[0];
              r=o.createElement('script');r.async=1;
              r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
              a.appendChild(r);
            })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
          `}
        </Script>
      )}

      {/* Crazy Egg Script */}
      {crazyEggId && (
        <Script src={`//script.crazyegg.com/pages/scripts/${crazyEggId}.js`} strategy="afterInteractive" async />
      )}
    </>
  )
}

export function useHeatmapTracking() {
  const trackHeatmapEvent = useCallback((eventName: string, properties?: Record<string, any>) => {
    // Hotjar event tracking
    if (typeof window !== "undefined" && window.hj) {
      window.hj("event", eventName)
    }

    // Custom heatmap event tracking
    if (typeof window !== "undefined") {
      fetch("/api/analytics/heatmap-event", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          event: eventName,
          properties,
          timestamp: Date.now(),
          page_url: window.location.href,
        }),
      }).catch(console.error)
    }
  }, [])

  const identifyUser = useCallback((userId: string, attributes?: Record<string, any>) => {
    if (typeof window !== "undefined" && window.hj) {
      window.hj("identify", userId, attributes)
    }
  }, [])

  return {
    trackHeatmapEvent,
    identifyUser,
  }
}
