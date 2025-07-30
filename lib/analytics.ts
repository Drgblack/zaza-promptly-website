import { track } from '@vercel/analytics';

// Privacy-friendly analytics helper for Zaza Promptly
// Uses Vercel Analytics - GDPR compliant, no cookies, no personal data

interface AnalyticsEvent {
  name: string;
  properties?: Record<string, string | number | boolean>;
}

// Common event types for type safety
export type EventName = 
  | 'page_view'
  | 'button_click'
  | 'form_submit'
  | 'email_submitted'
  | 'comment_rewrite_used'
  | 'upgrade_clicked'
  | 'demo_viewed'
  | 'resource_downloaded'
  | 'pricing_viewed'
  | 'trial_started'
  | 'contact_form_submitted'
  | 'newsletter_subscribed'
  | 'feature_clicked'
  | 'testimonial_viewed'
  | 'comparison_viewed'
  | 'faq_expanded'
  | 'social_share'
  | 'external_link_clicked';

interface EventProperties {
  // Common properties
  source?: string;
  section?: string;
  value?: number;
  
  // Form-specific
  form_type?: string;
  form_location?: string;
  
  // Button-specific  
  button_text?: string;
  button_location?: string;
  
  // Page-specific
  page_title?: string;
  referrer?: string;
  
  // Feature-specific
  feature_name?: string;
  plan_type?: string;
  resource_type?: string;
  
  // Allow additional properties
  [key: string]: string | number | boolean | undefined;
}

class Analytics {
  private isProduction = process.env.NODE_ENV === 'production';
  private domain = process.env.NEXT_PUBLIC_VERCEL_URL || 'zazapromptly.com';
  
  // Only track events in production on the correct domain
  private shouldTrack(): boolean {
    if (typeof window === 'undefined') return false;
    
    return (
      this.isProduction && 
      (window.location.hostname === 'zazapromptly.com' || 
       window.location.hostname.includes('vercel.app'))
    );
  }

  // Track custom events
  track(eventName: EventName, properties?: EventProperties) {
    if (!this.shouldTrack()) {
      console.log(`[Analytics] ${eventName}`, properties);
      return;
    }

    try {
      track(eventName, properties);
    } catch (error) {
      console.error('Analytics tracking error:', error);
    }
  }

  // Convenience methods for common events
  trackPageView(page: string, title?: string) {
    this.track('page_view', {
      page_title: title || document.title,
      source: page,
      referrer: document.referrer
    });
  }

  trackButtonClick(buttonText: string, location: string, value?: number) {
    this.track('button_click', {
      button_text: buttonText,
      button_location: location,
      value
    });
  }

  trackFormSubmit(formType: string, location: string, success: boolean) {
    this.track('form_submit', {
      form_type: formType,
      form_location: location,
      value: success ? 1 : 0
    });
  }

  trackEmailSubmitted(source: string, listType: string = 'newsletter') {
    this.track('email_submitted', {
      source,
      form_type: listType,
      value: 1
    });
  }

  trackCommentRewrite(feature: string, source: string) {
    this.track('comment_rewrite_used', {
      feature_name: feature,
      source,
      value: 1
    });
  }

  trackUpgradeClick(planType: string, source: string) {
    this.track('upgrade_clicked', {
      plan_type: planType,
      source,
      value: 1
    });
  }

  trackResourceDownload(resourceType: string, resourceName: string) {
    this.track('resource_downloaded', {
      resource_type: resourceType,
      feature_name: resourceName,
      value: 1
    });
  }

  trackTrialStart(planType: string, source: string) {
    this.track('trial_started', {
      plan_type: planType,
      source,
      value: 1
    });
  }

  trackFAQExpanded(question: string) {
    this.track('faq_expanded', {
      feature_name: question.substring(0, 50), // Truncate long questions
      value: 1
    });
  }

  trackFeatureClick(feature: string, location: string) {
    this.track('feature_clicked', {
      feature_name: feature,
      section: location,
      value: 1
    });
  }

  trackExternalLink(url: string, linkText: string) {
    this.track('external_link_clicked', {
      feature_name: linkText,
      source: url,
      value: 1
    });
  }
}

// Export singleton instance
export const analytics = new Analytics();

// React hook for analytics
export function useAnalytics() {
  return {
    track: analytics.track.bind(analytics),
    trackPageView: analytics.trackPageView.bind(analytics),
    trackButtonClick: analytics.trackButtonClick.bind(analytics),
    trackFormSubmit: analytics.trackFormSubmit.bind(analytics),
    trackEmailSubmitted: analytics.trackEmailSubmitted.bind(analytics),
    trackCommentRewrite: analytics.trackCommentRewrite.bind(analytics),
    trackUpgradeClick: analytics.trackUpgradeClick.bind(analytics),
    trackResourceDownload: analytics.trackResourceDownload.bind(analytics),
    trackTrialStart: analytics.trackTrialStart.bind(analytics),
    trackFAQExpanded: analytics.trackFAQExpanded.bind(analytics),
    trackFeatureClick: analytics.trackFeatureClick.bind(analytics),
    trackExternalLink: analytics.trackExternalLink.bind(analytics),
  };
}

// Helper for tracking clicks on any element
export function trackClick(element: HTMLElement, eventName: EventName, properties?: EventProperties) {
  element.addEventListener('click', () => {
    analytics.track(eventName, properties);
  });
}

export default analytics;