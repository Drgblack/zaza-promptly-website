import { useMemo } from "react"
import { ZAZA_LINKS, getRelatedProducts, getLiveProducts, getComingSoonProducts } from "@/shared-components/config/links"

interface CrossPromotionOptions {
  currentProduct?: string
  maxRelated?: number
  includeComingSoon?: boolean
  filterByStatus?: "live" | "coming-soon" | "all"
}

interface RelatedProduct {
  key: string
  name: string
  description: string
  main: string
  status: "live" | "coming-soon"
  relationship: "direct" | "indirect"
}

export function useCrossPromotion(options: CrossPromotionOptions = {}) {
  const {
    currentProduct,
    maxRelated = 3,
    includeComingSoon = true,
    filterByStatus = "all"
  } = options

  const relatedProducts = useMemo(() => {
    if (!currentProduct) return []

    const relatedKeys = getRelatedProducts(currentProduct)
    const allProducts = Object.entries(ZAZA_LINKS.products)
    
    const related = allProducts
      .filter(([key, product]) => {
        // Filter by relationship
        const isRelated = relatedKeys.includes(key)
        
        // Filter by status
        if (filterByStatus === "live" && product.status !== "live") return false
        if (filterByStatus === "coming-soon" && product.status !== "coming-soon") return false
        if (!includeComingSoon && product.status === "coming-soon") return false
        
        return isRelated
      })
      .map(([key, product]) => ({
        key,
        name: product.name,
        description: product.description,
        main: product.main,
        status: product.status,
        relationship: "direct" as const
      }))
      .slice(0, maxRelated)

    return related
  }, [currentProduct, maxRelated, includeComingSoon, filterByStatus])

  const recommendedProducts = useMemo(() => {
    const liveProducts = getLiveProducts()
    const comingSoonProducts = getComingSoonProducts()
    
    let recommendations = liveProducts
    
    if (includeComingSoon) {
      recommendations = [...liveProducts, ...comingSoonProducts]
    }
    
    // Filter out current product
    const filtered = recommendations.filter(([key]) => key !== currentProduct)
    
    // Sort by status (live first) and take top recommendations
    const sorted = filtered.sort(([, a], [, b]) => {
      if (a.status === "live" && b.status === "coming-soon") return -1
      if (a.status === "coming-soon" && b.status === "live") return 1
      return 0
    })
    
    return sorted.slice(0, maxRelated).map(([key, product]) => ({
      key,
      name: product.name,
      description: product.description,
      main: product.main,
      status: product.status,
      relationship: "recommended" as const
    }))
  }, [currentProduct, maxRelated, includeComingSoon])

  const productSuggestions = useMemo(() => {
    const suggestions: Record<string, string[]> = {
      'zaza-teach': [
        "Perfect for lesson planning and curriculum creation",
        "Try Zaza Promptly for AI prompt optimization",
        "Use Zaza Visuals for classroom imagery"
      ],
      'zaza-promptly': [
        "Optimize your AI prompts for better results",
        "Combine with Zaza Teach for lesson planning",
        "Use Zaza Inbox for email management"
      ],
      'zaza-visuals': [
        "Create curriculum-aligned images instantly",
        "Pair with Zaza Teach for complete lesson plans",
        "Use Zaza ClarityDeck for presentations"
      ],
      'zaza-inbox': [
        "Organize your emails with AI assistance",
        "Combine with Zaza Promptly for email optimization",
        "Use Zaza Coach for productivity coaching"
      ],
      'zaza-claritydeck': [
        "Create stunning presentations with AI",
        "Use with Zaza Teach for lesson materials",
        "Combine with Zaza Visuals for rich content"
      ],
      'zaza-schwoop': [
        "Engage students with AI-powered activities",
        "Pair with Zaza Study for learning optimization",
        "Use Zaza Coach for student mentoring"
      ],
      'zaza-hr-spark': [
        "Streamline HR processes with AI",
        "Combine with Zaza Coach for employee development",
        "Use Zaza Inbox for HR communications"
      ],
      'zaza-study': [
        "Optimize your study plans with AI",
        "Use with Zaza Schwoop for engagement",
        "Pair with Zaza Coach for academic coaching"
      ],
      'zaza-coach': [
        "Get AI-powered coaching and mentoring",
        "Use with Zaza Study for academic support",
        "Combine with Zaza HR Spark for employee development"
      ]
    }
    
    return suggestions[currentProduct || ''] || [
      "Discover our complete suite of AI tools",
      "Find the perfect tool for your needs",
      "Explore the Zaza ecosystem"
    ]
  }, [currentProduct])

  const getProductComparison = (productKey1: string, productKey2: string) => {
    const product1 = ZAZA_LINKS.products[productKey1 as keyof typeof ZAZA_LINKS.products]
    const product2 = ZAZA_LINKS.products[productKey2 as keyof typeof ZAZA_LINKS.products]
    
    if (!product1 || !product2) return null
    
    return {
      product1: {
        name: product1.name,
        description: product1.description,
        status: product1.status,
        main: product1.main
      },
      product2: {
        name: product2.name,
        description: product2.description,
        status: product2.status,
        main: product2.main
      },
      comparison: `${product1.name} focuses on ${product1.description.toLowerCase()}, while ${product2.name} specializes in ${product2.description.toLowerCase()}.`
    }
  }

  const getEcosystemStats = () => {
    const liveCount = getLiveProducts().length
    const comingSoonCount = getComingSoonProducts().length
    const totalCount = liveCount + comingSoonCount
    
    return {
      live: liveCount,
      comingSoon: comingSoonCount,
      total: totalCount,
      livePercentage: Math.round((liveCount / totalCount) * 100)
    }
  }

  return {
    relatedProducts,
    recommendedProducts,
    productSuggestions,
    getProductComparison,
    getEcosystemStats,
    currentProduct,
    allProducts: Object.entries(ZAZA_LINKS.products).map(([key, product]) => ({
      key,
      name: product.name,
      description: product.description,
      main: product.main,
      status: product.status
    }))
  }
} 