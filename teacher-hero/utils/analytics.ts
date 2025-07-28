import type { ResourceEvent, ConversionEvent, AnalyticsConfig } from "@/types/analytics"

class AnalyticsService {
  private config: AnalyticsConfig
  private userSession: string
  private isInitialized = false

  constructor(config: AnalyticsConfig) {
    this.config = config
    this.userSession = this.generateSessionId()
  }

  initialize() {
    if (this.isInitialized) return

    // Initialize Google Analytics 4
    if (typeof window !== "undefined" && this.config.trackingId) {
      const script = document.createElement("script")
      script.src = `https://www.googletagmanager.com/gtag/js?id=${this.config.trackingId}`
      script.async = true
      document.head.appendChild(script)

      window.dataLayer = window.dataLayer || []
      window.gtag = function gtag() {
        window.dataLayer.push(arguments)
      }

      window.gtag("js", new Date())
      window.gtag("config", this.config.trackingId, {
        page_title: document.title,
        page_location: window.location.href,
        debug_mode: this.config.enableDebug,
        sample_rate: this.config.sampleRate,
      })

      this.isInitialized = true
    }
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  private getDeviceType(): "desktop" | "tablet" | "mobile" {
    if (typeof window === "undefined") return "desktop"

    const width = window.innerWidth
    if (width < 768) return "mobile"
    if (width < 1024) return "tablet"
    return "desktop"
  }

  private getConnectionSpeed(): "slow" | "fast" {
    if (typeof navigator === "undefined" || !("connection" in navigator)) return "fast"

    const connection = (navigator as any).connection
    if (!connection) return "fast"

    const effectiveType = connection.effectiveType
    return effectiveType === "slow-2g" || effectiveType === "2g" ? "slow" : "fast"
  }

  trackResourceEvent(event: Omit<ResourceEvent, "userSession" | "timestamp" | "metadata">, metadata?: any) {
    const fullEvent: ResourceEvent = {
      ...event,
      userSession: this.userSession,
      timestamp: new Date(),
      metadata: {
        deviceType: this.getDeviceType(),
        connectionSpeed: this.getConnectionSpeed(),
        ...metadata,
      },
    }

    // Send to Google Analytics
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", event.eventType, {
        event_category: "Resource",
        event_label: event.resourceId,
        custom_parameter_category: event.category,
        custom_parameter_session: this.userSession,
        custom_parameter_device: fullEvent.metadata?.deviceType,
      })
    }

    // Send to custom analytics endpoint
    this.sendToAnalyticsEndpoint("resource_event", fullEvent)

    if (this.config.enableDebug) {
      console.log("Resource Event Tracked:", fullEvent)
    }
  }

  trackConversionEvent(event: Omit<ConversionEvent, "userSession" | "timestamp">) {
    const fullEvent: ConversionEvent = {
      ...event,
      userSession: this.userSession,
      timestamp: new Date(),
    }

    // Send to Google Analytics
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "conversion", {
        event_category: "Funnel",
        event_label: event.eventType,
        page_location: event.pageUrl,
        custom_parameter_session: this.userSession,
      })
    }

    // Send to custom analytics endpoint
    this.sendToAnalyticsEndpoint("conversion_event", fullEvent)

    if (this.config.enableDebug) {
      console.log("Conversion Event Tracked:", fullEvent)
    }
  }

  trackABTest(testName: string, variant: string, outcome?: string) {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "ab_test", {
        event_category: "Experiment",
        event_label: testName,
        custom_parameter_variant: variant,
        custom_parameter_outcome: outcome,
        custom_parameter_session: this.userSession,
      })
    }

    this.sendToAnalyticsEndpoint("ab_test", {
      testName,
      variant,
      outcome,
      userSession: this.userSession,
      timestamp: new Date(),
    })
  }

  private async sendToAnalyticsEndpoint(eventType: string, data: any) {
    try {
      await fetch("/api/analytics", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          eventType,
          data,
        }),
      })
    } catch (error) {
      if (this.config.enableDebug) {
        console.error("Failed to send analytics data:", error)
      }
    }
  }
}

// Global analytics instance
export const analytics = new AnalyticsService({
  trackingId: process.env.NEXT_PUBLIC_GA_TRACKING_ID || "",
  enableDebug: process.env.NODE_ENV === "development",
  sampleRate: 100,
})

// Initialize analytics
if (typeof window !== "undefined") {
  analytics.initialize()
}
