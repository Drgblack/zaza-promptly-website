// Zaza Ecosystem Link Configuration
// This file centralizes all URLs for consistent linking across the Zaza product ecosystem

export const ZAZA_LINKS = {
  // Main company pages (zazatechnologies.com)
  main: {
    home: "https://zazatechnologies.com",
    about: "https://zazatechnologies.com/about",
    contact: "https://zazatechnologies.com/contact",
    support: "https://zazatechnologies.com/support",
    blog: "https://zazatechnologies.com/blog",
    faq: "https://zazatechnologies.com/faq",
    privacy: "https://zazatechnologies.com/privacy",
    terms: "https://zazatechnologies.com/terms",
    products: "https://zazatechnologies.com/products",
    pricing: "https://zazatechnologies.com/pricing",
    mission: "https://zazatechnologies.com/mission",
    "about-founder": "https://zazatechnologies.com/about-founder",
    "free-resources": "https://zazatechnologies.com/free-resources",
    "vision-mission": "https://zazatechnologies.com/vision-mission",
  },

  // Product pages - Live Products
  products: {
    teach: {
      name: "Zaza Teach",
      description: "AI-powered lesson planning and curriculum creation",
      main: "https://zazateach.com",
      about: "https://zazateach.com/about",
      contact: "https://zazateach.com/contact",
      pricing: "https://zazateach.com/pricing",
      support: "https://zazateach.com/support",
      blog: "https://zazateach.com/blog",
      faq: "https://zazateach.com/faq",
      status: "live" as const,
    },
    promptly: {
      name: "Zaza Promptly",
      description: "AI prompt engineering and optimization platform",
      main: "https://zazapromptly.com",
      about: "https://zazapromptly.com/about",
      contact: "https://zazapromptly.com/contact",
      pricing: "https://zazapromptly.com/pricing",
      support: "https://zazapromptly.com/support",
      blog: "https://zazapromptly.com/blog",
      faq: "https://zazapromptly.com/faq",
      status: "live" as const,
    },
    inbox: {
      name: "Zaza Inbox",
      description: "AI-powered email management and organization",
      main: "https://zazainbox.com",
      about: "https://zazainbox.com/about",
      contact: "https://zazainbox.com/contact",
      pricing: "https://zazainbox.com/pricing",
      support: "https://zazainbox.com/support",
      blog: "https://zazainbox.com/blog",
      faq: "https://zazainbox.com/faq",
      status: "live" as const,
    },
    visuals: {
      name: "Zaza Visuals",
      description: "AI visual generator for classrooms",
      main: "https://zazavisuals.com",
      about: "https://zazavisuals.com/about",
      contact: "https://zazavisuals.com/contact",
      pricing: "https://zazavisuals.com/pricing",
      support: "https://zazavisuals.com/support",
      blog: "https://zazavisuals.com/blog",
      faq: "https://zazavisuals.com/faq",
      status: "coming-soon" as const,
    },
    claritydeck: {
      name: "Zaza ClarityDeck",
      description: "AI presentation and slide creation tool",
      main: "https://zazaclaritydeck.com",
      about: "https://zazaclaritydeck.com/about",
      contact: "https://zazaclaritydeck.com/contact",
      pricing: "https://zazaclaritydeck.com/pricing",
      support: "https://zazaclaritydeck.com/support",
      blog: "https://zazaclaritydeck.com/blog",
      faq: "https://zazaclaritydeck.com/faq",
      status: "coming-soon" as const,
    },
    schwoop: {
      name: "Zaza Schwoop",
      description: "AI-powered student engagement platform",
      main: "https://zazaschwoop.com",
      about: "https://zazaschwoop.com/about",
      contact: "https://zazaschwoop.com/contact",
      pricing: "https://zazaschwoop.com/pricing",
      support: "https://zazaschwoop.com/support",
      blog: "https://zazaschwoop.com/blog",
      faq: "https://zazaschwoop.com/faq",
      status: "coming-soon" as const,
    },
    "hr-spark": {
      name: "Zaza HR Spark",
      description: "AI-powered HR and recruitment platform",
      main: "https://zazahrspark.com",
      about: "https://zazahrspark.com/about",
      contact: "https://zazahrspark.com/contact",
      pricing: "https://zazahrspark.com/pricing",
      support: "https://zazahrspark.com/support",
      blog: "https://zazahrspark.com/blog",
      faq: "https://zazahrspark.com/faq",
      status: "coming-soon" as const,
    },
    study: {
      name: "Zaza Study",
      description: "AI-powered study planning and optimization",
      main: "https://zazastudy.com",
      about: "https://zazastudy.com/about",
      contact: "https://zazastudy.com/contact",
      pricing: "https://zazastudy.com/pricing",
      support: "https://zazastudy.com/support",
      blog: "https://zazastudy.com/blog",
      faq: "https://zazastudy.com/faq",
      status: "coming-soon" as const,
    },
    coach: {
      name: "Zaza Coach",
      description: "AI-powered coaching and mentoring platform",
      main: "https://zazacoach.com",
      about: "https://zazacoach.com/about",
      contact: "https://zazacoach.com/contact",
      pricing: "https://zazacoach.com/pricing",
      support: "https://zazacoach.com/support",
      blog: "https://zazacoach.com/blog",
      faq: "https://zazacoach.com/faq",
      status: "coming-soon" as const,
    },
  },

  // Social media links
  social: {
    linkedin: "https://linkedin.com/company/zazatechnologies",
    twitter: "https://twitter.com/zazatechnologies",
    tiktok: "https://tiktok.com/@zazatechnologies",
    youtube: "https://youtube.com/@zazatechnologies",
  },

  // Contact information
  contact: {
    email: "support@zazatechnologies.com",
    "teach-email": "schools@zazateach.com",
    "promptly-email": "support@zazapromptly.com",
  },
} as const

// Helper functions for link management
export const getProductLink = (productKey: keyof typeof ZAZA_LINKS.products, page?: string) => {
  const product = ZAZA_LINKS.products[productKey]
  if (!product) return ZAZA_LINKS.main.home
  
  if (page && page in product) {
    return product[page as keyof typeof product] as string
  }
  
  return product.main
}

export const getLiveProducts = () => {
  return Object.entries(ZAZA_LINKS.products).filter(([_, product]) => product.status === "live")
}

export const getComingSoonProducts = () => {
  return Object.entries(ZAZA_LINKS.products).filter(([_, product]) => product.status === "coming-soon")
}

export const getAllProducts = () => {
  return Object.entries(ZAZA_LINKS.products)
}

// Cross-promotion relationships
export const PRODUCT_RELATIONSHIPS = {
  'zaza-teach': ['zaza-promptly', 'zaza-visuals', 'zaza-claritydeck'],
  'zaza-promptly': ['zaza-teach', 'zaza-visuals', 'zaza-inbox'],
  'zaza-visuals': ['zaza-teach', 'zaza-promptly', 'zaza-claritydeck'],
  'zaza-inbox': ['zaza-promptly', 'zaza-teach', 'zaza-coach'],
  'zaza-claritydeck': ['zaza-teach', 'zaza-visuals', 'zaza-promptly'],
  'zaza-schwoop': ['zaza-teach', 'zaza-study', 'zaza-coach'],
  'zaza-hr-spark': ['zaza-coach', 'zaza-promptly', 'zaza-inbox'],
  'zaza-study': ['zaza-teach', 'zaza-schwoop', 'zaza-coach'],
  'zaza-coach': ['zaza-teach', 'zaza-study', 'zaza-hr-spark'],
} as const

export const getRelatedProducts = (currentProduct: string) => {
  return PRODUCT_RELATIONSHIPS[currentProduct as keyof typeof PRODUCT_RELATIONSHIPS] || []
} 