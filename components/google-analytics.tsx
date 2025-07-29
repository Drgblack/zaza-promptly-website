"use client"

import Script from 'next/script'
import { useEffect } from 'react'

// Google Analytics types
interface GtagFunction {
  (...args: any[]): void
}

declare global {
  interface Window {
    gtag?: GtagFunction
    dataLayer?: any[]
  }
}

interface GoogleAnalyticsProps {
  measurementId?: string
}

export function GoogleAnalytics({ measurementId = 'G-XXXXXXXXXX' }: GoogleAnalyticsProps) {
  const isProduction = process.env.NODE_ENV === 'production'
  const hasValidId = measurementId && measurementId !== 'G-XXXXXXXXXX'
  
  useEffect(() => {
    if (hasValidId && isProduction) {
      // Initialize dataLayer
      window.dataLayer = window.dataLayer || []
      
      // Configure gtag
      window.gtag = function gtag() {
        window.dataLayer.push(arguments)
      }
      
      // Initialize Analytics
      window.gtag('js', new Date())
      window.gtag('config', measurementId, {
        // Enhanced privacy settings for educational use
        anonymize_ip: true,
        cookie_expires: 63072000, // 2 years
        cookie_update: true,
        allow_google_signals: false, // Disable for education privacy
        allow_ad_personalization_signals: false, // Disable ads for education
      })
      
      // Track page view
      window.gtag('event', 'page_view', {
        page_title: document.title,
        page_location: window.location.href,
        custom_parameter: 'zaza_promptly_education'
      })
    }
  }, [measurementId, hasValidId, isProduction])

  // Custom event tracking functions for education
  const trackEvent = (eventName: string, parameters: Record<string, any> = {}) => {
    if (hasValidId && isProduction && window.gtag) {
      window.gtag('event', eventName, {
        ...parameters,
        event_category: 'education',
        custom_parameter: 'zaza_promptly'
      })
    }
  }

  // Education-specific tracking events
  useEffect(() => {
    if (typeof window !== 'undefined' && hasValidId && isProduction) {
      // Add tracking to global window for use in components
      window.zazeAnalytics = {
        trackFeatureUse: (feature: string) => trackEvent('feature_use', { feature_name: feature }),
        trackSubscription: (plan: string) => trackEvent('subscription', { plan_type: plan }),
        trackFeedbackGeneration: (tone: string) => trackEvent('feedback_generated', { tone: tone }),
        trackBlogRead: (article: string) => trackEvent('blog_read', { article_title: article }),
        trackResourceDownload: (resource: string) => trackEvent('resource_download', { resource_name: resource }),
        trackSupport: (type: string) => trackEvent('support_interaction', { support_type: type }),
        trackReferral: (referrerEmail: string | null, utmData: any) => trackEvent('referral', { referrer_email: referrerEmail, utm_data: utmData }),
        trackReferralConversion: (referrerEmail: string, newUserEmail: string, utmData: any) => trackEvent('referral_conversion', { referrer_email: referrerEmail, new_user_email: newUserEmail, utm_data: utmData }),
        trackSocialShare: (platform: string, title: string) => trackEvent('social_share', { platform: platform, title: title }),
      }
    }
  }, [hasValidId, isProduction])

  // Only render in production with valid ID
  if (!hasValidId || !isProduction) {
    return (
      <div className="hidden">
        {/* Analytics disabled in development or without valid ID */}
        {process.env.NODE_ENV === 'development' && (
          <div className="fixed bottom-4 right-4 bg-yellow-100 border border-yellow-400 text-yellow-800 px-3 py-2 rounded text-xs z-50">
            Analytics: Development Mode
          </div>
        )}
      </div>
    )
  }

  return (
    <>
      {/* Google Analytics */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${measurementId}', {
            anonymize_ip: true,
            cookie_expires: 63072000,
            cookie_update: true,
            allow_google_signals: false,
            allow_ad_personalization_signals: false,
            custom_parameter: 'zaza_promptly_education'
          });
        `}
      </Script>
      
      {/* Educational Privacy Notice */}
      <Script id="education-privacy" strategy="afterInteractive">
        {`
          // Enhanced privacy for educational use
          gtag('consent', 'default', {
            'analytics_storage': 'granted',
            'ad_storage': 'denied',
            'personalization_storage': 'denied',
            'functionality_storage': 'granted',
            'security_storage': 'granted'
          });
          
          // Track educational context
          gtag('event', 'education_site_visit', {
            'custom_parameter': 'teacher_focused_analytics'
          });
        `}
      </Script>
    </>
  )
}

