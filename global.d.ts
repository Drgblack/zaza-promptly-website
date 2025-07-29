interface UTMData {
  source?: string;
  medium?: string;
  campaign?: string;
  term?: string;
  content?: string;
}

interface Window {
  gtag?: (...args: any[]) => void;
  fbq?: (...args: any[]) => void;
  zazeAnalytics?: {
    [key: string]: any;
    trackFeatureUse: (feature: string) => void;
    trackSubscription: (plan: string) => void;
    trackFeedbackGeneration: (tone: string) => void;
    trackBlogRead: (article: string) => void;
    trackResourceDownload: (resource: string) => void;
    trackSupport: (type: string) => void;
    trackReferral: (referrerEmail: string | null, utmData: UTMData) => void;
    trackReferralConversion: (referrerEmail: string, newUserEmail: string, utmData: UTMData) => void;
    trackSocialShare?: (platform: string, title: string) => void;
  };
} 