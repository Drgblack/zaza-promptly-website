'use client';

import { useCallback } from 'react';

// Plausible analytics hook for tracking custom events
// Only tracks on production domain zazapromptly.com
// No cookies, GDPR compliant

interface PlausibleEvent {
  name: string;
  props?: Record<string, string | number>;
}

// Define custom event types for type safety
export type CustomEventName = 
  | 'comment_rewrite_used'
  | 'email_submitted'
  | 'upgrade_clicked'
  | 'form_submit'
  | 'button_click'
  | 'resource_downloaded'
  | 'demo_viewed'
  | 'pricing_viewed'
  | 'trial_started'
  | 'contact_form_submitted'
  | 'newsletter_subscribed'
  | 'feature_clicked'
  | 'testimonial_viewed'
  | 'faq_expanded'
  | 'social_share'
  | 'external_link_clicked'
  | 'cross_product_click'
  | 'inline_cross_product_click'
  | 'product_page_cta'
  | 'blog_post_click'
  | 'checkout_initiated'
  | 'checkout_error'
  | 'conversion'
  | 'file_download'
  | 'video_start'
  | 'user_engagement'
  | 'scroll_depth'
  | 'form_interaction'
  | 'click'
  | 'faq_feedback'
  | 'faq_sticky_cta_clicked'
  | 'try_demo_clicked'
  | 'page_performance'
  | 'session_end'
  | 'free_trial_started'
  | 'quick_free_trial'
  | 'quick_checkout_view'
  | 'cta_clicked'
  | 'product_cta_primary'
  | 'product_cta_secondary'
  | 'product_cross_link'
  | 'product_hero_cta'
  | 'products_bottom_cta'
  | 'comparison_cta'
  | 'blog_hero'
  | 'blog_bottom';

export interface EventProperties {
  source?: string;
  section?: string;
  value?: number;
  form_type?: string;
  button_text?: string;
  page_title?: string;
  feature_name?: string;
  plan_type?: string;
  resource_type?: string;
  [key: string]: string | number | boolean | undefined;
}

declare global {
  interface Window {
    plausible?: (eventName: string, options?: { props?: Record<string, string | number> }) => void;
  }
}

export function useAnalytics() {
  const isProduction = process.env.NODE_ENV === 'production';
  const isDomain = typeof window !== 'undefined' && window.location.hostname === 'zazapromptly.com';
  const shouldTrack = isProduction && isDomain;

  const trackEvent = useCallback((eventName: CustomEventName, properties?: EventProperties) => {
    // Only track on production domain
    if (!shouldTrack) {
      console.log(`[Plausible] ${eventName}`, properties);
      return;
    }

    // Convert boolean values to strings for Plausible compatibility
    const convertedProps: Record<string, string | number> = {};
    if (properties) {
      Object.entries(properties).forEach(([key, value]) => {
        if (typeof value === 'boolean') {
          convertedProps[key] = value ? 'true' : 'false';
        } else if (value !== undefined && value !== null) {
          convertedProps[key] = value as string | number;
        }
      });
    }

    try {
      if (typeof window !== 'undefined' && window.plausible) {
        window.plausible(eventName, {
          props: convertedProps
        });
      }
    } catch (error) {
      console.error('Plausible tracking error:', error);
    }
  }, [shouldTrack]);

  // Convenience methods for common events
  const trackButtonClick = useCallback((buttonText: string, section?: string) => {
    trackEvent('button_click', {
      button_text: buttonText,
      section: section || 'unknown'
    });
  }, [trackEvent]);

  const trackFormSubmit = useCallback((formType: string, source?: string) => {
    trackEvent('form_submit', {
      form_type: formType,
      source: source || 'unknown'
    });
  }, [trackEvent]);

  const trackEmailSubmit = useCallback((source?: string, formType?: string) => {
    trackEvent('email_submitted', {
      source: source || 'unknown',
      form_type: formType || 'email_capture'
    });
  }, [trackEvent]);

  const trackUpgradeClick = useCallback((planType?: string, source?: string) => {
    trackEvent('upgrade_clicked', {
      plan_type: planType || 'unknown',
      source: source || 'unknown'
    });
  }, [trackEvent]);

  const trackCommentRewrite = useCallback(() => {
    trackEvent('comment_rewrite_used');
  }, [trackEvent]);

  const trackResourceDownload = useCallback((resourceType: string, resourceName?: string) => {
    trackEvent('resource_downloaded', {
      resource_type: resourceType,
      resource_name: resourceName || 'unknown'
    });
  }, [trackEvent]);

  const trackFeatureClick = useCallback((featureName: string, section?: string) => {
    trackEvent('feature_clicked', {
      feature_name: featureName,
      section: section || 'unknown'
    });
  }, [trackEvent]);

  return {
    trackEvent,
    trackButtonClick,
    trackFormSubmit,
    trackEmailSubmit,
    trackUpgradeClick,
    trackCommentRewrite,
    trackResourceDownload,
    trackFeatureClick,
    shouldTrack
  };
}