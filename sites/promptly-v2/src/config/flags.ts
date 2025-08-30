export const FLAGS = {
  STRIPE_ENABLED: !!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
  NEWSLETTER_ENABLED: true,
  BLOG_ENABLED: true,
  CASE_STUDIES_ENABLED: true,
} as const

export type FeatureFlags = typeof FLAGS