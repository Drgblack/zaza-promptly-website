"use client"

import Script from 'next/script'
import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

declare global {
  interface Window {
    gtag: (...args: any[]) => void
    plausible: (event: string, options?: { props: Record<string, any> }) => void
  }
}

interface AnalyticsProps {
  googleAnalyticsId?: string
  plausibleDomain?: string
  enableConsent?: boolean
}

export function ComprehensiveAnalytics({ 
  googleAnalyticsId = process.env.NEXT_PUBLIC_GA_ID,
  plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN,
  enableConsent = true 
}: AnalyticsProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Track page views
  useEffect(() => {
    if (typeof window === 'undefined') return

    const url = `${pathname}${searchParams?.toString() ? '?' + searchParams.toString() : ''}`
    
    // Google Analytics page view
    if (googleAnalyticsId && window.gtag) {
      window.gtag('config', googleAnalyticsId, {
        page_path: url,
        anonymize_ip: true,
        allow_display_features: false,
        allow_ad_personalization_signals: false
      })
    }

    // Plausible page view (automatic, but we can customize)
    if (plausibleDomain && window.plausible) {
      window.plausible('pageview', { 
        props: { 
          path: url,
          referrer: document.referrer 
        } 
      })
    }
  }, [pathname, searchParams, googleAnalyticsId, plausibleDomain])

  return (
    <>
      {/* Google Analytics 4 */}
      {googleAnalyticsId && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              
              gtag('config', '${googleAnalyticsId}', {
                anonymize_ip: true,
                allow_display_features: false,
                allow_ad_personalization_signals: false,
                cookie_flags: 'max-age=7200;secure;samesite=none',
                send_page_view: false // We'll handle this manually
              });

              // Enhanced e-commerce events
              gtag('config', '${googleAnalyticsId}', {
                custom_map: {
                  'custom_parameter_1': 'teacher_type',
                  'custom_parameter_2': 'product_interest'
                }
              });
            `}
          </Script>
        </>
      )}

      {/* Plausible Analytics */}
      {plausibleDomain && (
        <Script
          src="https://plausible.io/js/script.js"
          data-domain={plausibleDomain}
          data-api="https://plausible.io/api/event"
          strategy="afterInteractive"
        />
      )}

      {/* Privacy-focused tracking initialization */}
      <Script id="analytics-init" strategy="afterInteractive">
        {`
          // Initialize privacy-focused tracking
          window.trackEvent = function(event, properties = {}) {
            // Enhanced privacy tracking
            const commonProps = {
              timestamp: Date.now(),
              user_agent: navigator.userAgent.substring(0, 200),
              screen_resolution: screen.width + 'x' + screen.height,
              viewport: window.innerWidth + 'x' + window.innerHeight,
              language: navigator.language,
              timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
            };

            // Google Analytics 4 event
            if (window.gtag && '${googleAnalyticsId}') {
              window.gtag('event', event, {
                ...properties,
                ...commonProps,
                anonymize_ip: true
              });
            }

            // Plausible event
            if (window.plausible && '${plausibleDomain}') {
              window.plausible(event, { 
                props: {
                  ...properties,
                  ...commonProps
                }
              });
            }

            // Console log for development
            if (process.env.NODE_ENV === 'development') {
              console.log('Analytics Event:', event, properties);
            }
          };

          // Track user engagement
          let engagementTimer = 0;
          const trackEngagement = () => {
            engagementTimer += 15;
            if (engagementTimer % 60 === 0) { // Every minute
              window.trackEvent('user_engagement', {
                engagement_time_msec: 60000,
                page_title: document.title,
                page_location: window.location.href
              });
            }
          };
          
          const engagementInterval = setInterval(trackEngagement, 15000);

          // Track scroll depth
          let maxScrollDepth = 0;
          const trackScrollDepth = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            const scrollDepth = Math.round((scrollTop + windowHeight) / documentHeight * 100);
            
            if (scrollDepth > maxScrollDepth) {
              maxScrollDepth = scrollDepth;
              if (scrollDepth >= 25 && scrollDepth % 25 === 0) {
                window.trackEvent('scroll_depth', {
                  scroll_depth: scrollDepth,
                  page_title: document.title
                });
              }
            }
          };
          
          window.addEventListener('scroll', trackScrollDepth, { passive: true });

          // Track form interactions
          document.addEventListener('focusin', (e) => {
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
              window.trackEvent('form_interaction', {
                form_element: e.target.tagName.toLowerCase(),
                form_id: e.target.form?.id || 'unknown'
              });
            }
          });

          // Track click events on buttons and links
          document.addEventListener('click', (e) => {
            if (e.target.tagName === 'BUTTON' || e.target.tagName === 'A') {
              const text = e.target.textContent?.trim().substring(0, 50) || 'unknown';
              const href = e.target.href || e.target.getAttribute('href');
              
              window.trackEvent('click', {
                element_type: e.target.tagName.toLowerCase(),
                element_text: text,
                element_url: href,
                page_title: document.title
              });
            }
          });

          // Track performance metrics
          window.addEventListener('load', () => {
            setTimeout(() => {
              const perfData = performance.getEntriesByType('navigation')[0];
              if (perfData) {
                window.trackEvent('page_performance', {
                  page_load_time: Math.round(perfData.loadEventEnd - perfData.fetchStart),
                  dom_content_loaded: Math.round(perfData.domContentLoadedEventEnd - perfData.fetchStart),
                  first_contentful_paint: Math.round(perfData.fetchStart),
                  page_title: document.title
                });
              }
            }, 1000);
          });

          // Clean up on page unload
          window.addEventListener('beforeunload', () => {
            clearInterval(engagementInterval);
            
            // Send final engagement data
            if (maxScrollDepth > 0) {
              window.trackEvent('session_end', {
                final_scroll_depth: maxScrollDepth,
                session_duration: engagementTimer,
                page_title: document.title
              });
            }
          });
        `}
      </Script>

      {/* Consent Management */}
      {enableConsent && (
        <Script id="consent-management" strategy="afterInteractive">
          {`
            // Check for existing consent
            const consent = localStorage.getItem('analytics-consent');
            if (consent === 'granted') {
              // Analytics already loaded
            } else if (consent === 'denied') {
              // Disable analytics
              window['ga-disable-${googleAnalyticsId}'] = true;
            } else {
              // Show consent banner (implement your own UI)
              console.log('Analytics consent required');
            }
          `}
        </Script>
      )}
    </>
  )
}

// Hook for tracking events throughout the app
export function useAnalytics() {
  const trackEvent = (event: string, properties: Record<string, any> = {}) => {
    if (typeof window !== 'undefined' && window.trackEvent) {
      window.trackEvent(event, properties)
    }
  }

  const trackConversion = (conversionType: string, value?: number, currency = 'USD') => {
    trackEvent('conversion', {
      conversion_type: conversionType,
      value: value,
      currency: currency,
      timestamp: Date.now()
    })
  }

  const trackFormSubmission = (formId: string, formType: string) => {
    trackEvent('form_submit', {
      form_id: formId,
      form_type: formType,
      page_title: document.title
    })
  }

  const trackDownload = (fileName: string, fileType: string) => {
    trackEvent('file_download', {
      file_name: fileName,
      file_type: fileType,
      page_title: document.title
    })
  }

  const trackVideoPlay = (videoTitle: string, videoDuration?: number) => {
    trackEvent('video_start', {
      video_title: videoTitle,
      video_duration: videoDuration,
      page_title: document.title
    })
  }

  return {
    trackEvent,
    trackConversion,
    trackFormSubmission,
    trackDownload,
    trackVideoPlay
  }
}