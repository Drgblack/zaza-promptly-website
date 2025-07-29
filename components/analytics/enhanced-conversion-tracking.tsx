"use client"

import { useEffect, useCallback } from 'react'

// Enhanced conversion tracking for Zaza Promptly
export function EnhancedConversionTracking() {
  const trackCustomEvent = useCallback((eventName: string, parameters: Record<string, any> = {}) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', eventName, {
        event_category: 'zaza_promptly',
        event_label: 'teacher_engagement',
        ...parameters,
      })
    }
  }, [])

  useEffect(() => {
    // Enhanced window analytics object for global use
    if (typeof window !== 'undefined') {
      (window as any).zazeAnalytics = {
        // Waitlist and signup tracking
        trackWaitlistSignup: (source: string) => {
          trackCustomEvent('waitlist_signup', {
            signup_source: source,
            conversion_type: 'lead_generation',
            value: 1,
          })
        },

        // Brevo form submissions
        trackBrevoSubscribe: (listId: string, source: string) => {
          trackCustomEvent('brevo_subscribe', {
            list_id: listId,
            subscribe_source: source,
            conversion_type: 'email_subscription',
            value: 2,
          })
        },

        // Stripe payment events
        trackStripeCheckoutStart: (priceId: string, amount: number) => {
          trackCustomEvent('begin_checkout', {
            price_id: priceId,
            currency: 'USD',
            value: amount / 100,
            items: [{
              item_id: priceId,
              item_name: 'Zaza Promptly Subscription',
              category: 'subscription',
              quantity: 1,
              price: amount / 100,
            }],
          })
        },

        trackStripePaymentSuccess: (sessionId: string, amount: number, priceId: string) => {
          trackCustomEvent('purchase', {
            transaction_id: sessionId,
            value: amount / 100,
            currency: 'USD',
            items: [{
              item_id: priceId,
              item_name: 'Zaza Promptly Subscription',
              category: 'subscription',
              quantity: 1,
              price: amount / 100,
            }],
          })
        },

        trackStripePaymentFailed: (error: string) => {
          trackCustomEvent('payment_failed', {
            error_message: error,
            conversion_type: 'payment_failure',
          })
        },

        // CTA and engagement tracking
        trackCTAClick: (ctaText: string, location: string) => {
          trackCustomEvent('cta_click', {
            cta_text: ctaText,
            cta_location: location,
            engagement_type: 'button_click',
          })
        },

        // Resource downloads
        trackResourceDownload: (resourceName: string, resourceType: string) => {
          trackCustomEvent('file_download', {
            file_name: resourceName,
            file_type: resourceType,
            conversion_type: 'content_engagement',
            value: 1,
          })
        },

        // Blog and content engagement
        trackBlogRead: (articleTitle: string, readTime: number) => {
          trackCustomEvent('blog_read', {
            article_title: articleTitle,
            read_time: readTime,
            content_type: 'blog_post',
            engagement_level: readTime > 120 ? 'high' : readTime > 60 ? 'medium' : 'low',
          })
        },

        // GPT Assistant usage
        trackGPTUsage: (promptType: string, responseLength: number) => {
          trackCustomEvent('gpt_usage', {
            prompt_type: promptType,
            response_length: responseLength,
            feature_type: 'ai_assistant',
            value: 3,
          })
        },

        // Contact form submissions
        trackContactSubmit: (formType: string) => {
          trackCustomEvent('form_submit', {
            form_type: formType,
            conversion_type: 'lead_generation',
            value: 2,
          })
        },

        // Referral tracking
        trackReferral: (referrerEmail: string | null, utmData: Record<string, any>) => {
          trackCustomEvent('referral_visit', {
            has_referrer: !!referrerEmail,
            utm_source: utmData.utm_source || 'unknown',
            utm_medium: utmData.utm_medium || 'unknown',
            utm_campaign: utmData.utm_campaign || 'unknown',
            conversion_type: 'referral_attribution',
          })
        },

        trackReferralConversion: (referrerEmail: string, newUserEmail: string, utmData: Record<string, any>) => {
          trackCustomEvent('referral_conversion', {
            utm_source: utmData.utm_source || 'direct',
            utm_medium: utmData.utm_medium || 'referral',
            utm_campaign: utmData.utm_campaign || 'word_of_mouth',
            conversion_type: 'successful_referral',
            value: 10,
          })
        },

        // UTM campaign tracking
        trackCampaignVisit: (utmData: Record<string, any>) => {
          trackCustomEvent('campaign_visit', {
            campaign_source: utmData.utm_source || 'direct',
            campaign_medium: utmData.utm_medium || 'unknown',
            campaign_name: utmData.utm_campaign || 'unnamed',
            campaign_term: utmData.utm_term || '',
            campaign_content: utmData.utm_content || '',
          })
        },

        // Social sharing tracking
        trackSocialShare: (platform: string, content: string) => {
          trackCustomEvent('share', {
            method: platform,
            content_type: content,
            engagement_type: 'social_share',
            value: 1,
          })
        },
      }
    }
  }, [trackCustomEvent])

  return null // This component doesn't render anything
}