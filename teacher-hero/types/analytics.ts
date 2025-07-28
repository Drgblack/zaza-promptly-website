export interface ResourceEvent {
  eventType: "download" | "preview" | "share" | "save"
  resourceId: string
  category: string
  userSession: string
  timestamp: Date
  metadata?: {
    downloadMethod?: "direct" | "email" | "enhanced"
    deviceType?: "desktop" | "tablet" | "mobile"
    connectionSpeed?: "slow" | "fast"
    abTestVariant?: string
  }
}

export interface ConversionEvent {
  eventType: "page_visit" | "resource_interaction" | "download" | "account_creation"
  userSession: string
  timestamp: Date
  pageUrl: string
  referrer?: string
  metadata?: Record<string, any>
}

export interface AnalyticsConfig {
  trackingId: string
  enableDebug: boolean
  sampleRate: number
}
