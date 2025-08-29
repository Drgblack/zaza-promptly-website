export function useAnalytics() {
  return {
    track: (...args: any[]) => {},
    page: (...args: any[]) => {},
    identify: (...args: any[]) => {},
    trackPricingInterest: (...args: any[]) => {},
    trackCheckoutClick: (...args: any[]) => {},
    trackEmailSubmitted: (...args: any[]) => {},
    trackFormSubmit: (...args: any[]) => {},
    trackLeadSubmit: (...args: any[]) => {},
    canTrack: true,
    trackEvent: (...args: any[]) => {},
    faq: {
      search: (...args: any[]) => {},
      expand: (...args: any[]) => {},
      helpful: (...args: any[]) => {}
    }
  };
}