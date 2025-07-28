"use client"

import Script from "next/script"
import { useEffect } from "react"

interface GTMConfig {
  gtmId: string
  dataLayerName?: string
  auth?: string
  preview?: string
}

export function GoogleTagManager({ gtmId, dataLayerName = "dataLayer", auth, preview }: GTMConfig) {
  useEffect(() => {
    // Initialize dataLayer
    if (typeof window !== "undefined") {
      window[dataLayerName as any] = window[dataLayerName as any] || []
      window[dataLayerName as any].push({
        "gtm.start": new Date().getTime(),
        event: "gtm.js",
      })
    }
  }, [dataLayerName])

  const gtmUrl = `https://www.googletagmanager.com/gtm.js?id=${gtmId}${auth ? `&gtm_auth=${auth}` : ""}${
    preview ? `&gtm_preview=${preview}` : ""
  }`

  return (
    <>
      {/* GTM Script */}
      <Script id="google-tag-manager" strategy="afterInteractive">
        {`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl+'${auth ? `&gtm_auth=${auth}` : ""}${
            preview ? `&gtm_preview=${preview}` : ""
          }';f.parentNode.insertBefore(j,f);
          })(window,document,'script','${dataLayerName}','${gtmId}');
        `}
      </Script>

      {/* GTM NoScript */}
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${gtmId}${auth ? `&gtm_auth=${auth}` : ""}${
            preview ? `&gtm_preview=${preview}` : ""
          }`}
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
        />
      </noscript>
    </>
  )
}

export function useGTMTracking() {
  const pushToDataLayer = (data: Record<string, any>) => {
    if (typeof window !== "undefined" && window.dataLayer) {
      window.dataLayer.push(data)
    }
  }

  const trackEvent = (eventName: string, parameters: Record<string, any> = {}) => {
    pushToDataLayer({
      event: eventName,
      ...parameters,
    })
  }

  const trackPageView = (pagePath: string, pageTitle?: string) => {
    pushToDataLayer({
      event: "page_view",
      page_path: pagePath,
      page_title: pageTitle || document.title,
      page_location: window.location.href,
    })
  }

  const trackPurchase = (transactionId: string, value: number, currency = "USD", items: any[] = []) => {
    pushToDataLayer({
      event: "purchase",
      transaction_id: transactionId,
      value: value,
      currency: currency,
      items: items,
    })
  }

  const trackLead = (leadId: string, value?: number, currency = "USD") => {
    pushToDataLayer({
      event: "generate_lead",
      lead_id: leadId,
      value: value,
      currency: currency,
    })
  }

  return {
    pushToDataLayer,
    trackEvent,
    trackPageView,
    trackPurchase,
    trackLead,
  }
}
