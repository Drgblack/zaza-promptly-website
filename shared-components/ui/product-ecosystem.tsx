"use client"

import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { ZAZA_LINKS, getLiveProducts, getComingSoonProducts } from "@/shared-components/config/links"
import { Sparkles, ExternalLink, Clock, Play } from "lucide-react"

interface ProductEcosystemProps {
  currentProduct?: string
  title?: string
  description?: string
  showComingSoon?: boolean
  maxProducts?: number
  className?: string
  variant?: "default" | "compact" | "featured"
}

export function ProductEcosystem({
  currentProduct,
  title = "Zaza Ecosystem",
  description = "Discover our complete suite of AI-powered tools for education and productivity",
  showComingSoon = true,
  maxProducts,
  className,
  variant = "default"
}: ProductEcosystemProps) {
  const liveProducts = getLiveProducts()
  const comingSoonProducts = getComingSoonProducts()
  
  let displayProducts = liveProducts
  if (showComingSoon) {
    displayProducts = [...liveProducts, ...comingSoonProducts]
  }
  
  if (maxProducts) {
    displayProducts = displayProducts.slice(0, maxProducts)
  }

  const getProductIcon = (productKey: string) => {
    const icons: Record<string, React.ReactNode> = {
      teach: <Sparkles className="w-5 h-5" />,
      promptly: <Play className="w-5 h-5" />,
      inbox: <ExternalLink className="w-5 h-5" />,
      visuals: <Sparkles className="w-5 h-5" />,
      claritydeck: <Sparkles className="w-5 h-5" />,
      schwoop: <Sparkles className="w-5 h-5" />,
      "hr-spark": <Sparkles className="w-5 h-5" />,
      study: <Sparkles className="w-5 h-5" />,
      coach: <Sparkles className="w-5 h-5" />,
    }
    return icons[productKey] || <Sparkles className="w-5 h-5" />
  }

  const getProductGradient = (productKey: string) => {
    const gradients: Record<string, string> = {
      teach: "from-purple-600 to-pink-600",
      promptly: "from-blue-600 to-purple-600",
      inbox: "from-green-600 to-blue-600",
      visuals: "from-orange-500 to-pink-500",
      claritydeck: "from-indigo-600 to-purple-600",
      schwoop: "from-yellow-500 to-orange-500",
      "hr-spark": "from-red-600 to-pink-600",
      study: "from-teal-600 to-blue-600",
      coach: "from-emerald-600 to-green-600",
    }
    return gradients[productKey] || "from-gray-600 to-gray-700"
  }

  if (variant === "compact") {
    return (
      <div className={cn("space-y-4", className)}>
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
          {description && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{description}</p>
          )}
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {displayProducts.map(([key, product]) => (
            <Link
              key={key}
              href={product.main}
              className={cn(
                "group relative p-3 rounded-lg border transition-all duration-200 hover:shadow-md",
                currentProduct === key
                  ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20"
                  : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
              )}
            >
              <div className="flex items-center gap-2">
                <div className={cn(
                  "w-8 h-8 rounded-lg flex items-center justify-center bg-gradient-to-r",
                  getProductGradient(key)
                )}>
                  <div className="text-white">
                    {getProductIcon(key)}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {product.name}
                  </p>
                  {product.status === "coming-soon" && (
                    <Badge variant="purple" className="text-xs mt-1">
                      <Clock className="w-3 h-3 mr-1" />
                      Soon
                    </Badge>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    )
  }

  if (variant === "featured") {
    const featuredProducts = liveProducts.slice(0, 3)
    
    return (
      <div className={cn("space-y-6", className)}>
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h3>
          {description && (
            <p className="text-lg text-gray-600 dark:text-gray-400 mt-2 max-w-2xl mx-auto">
              {description}
            </p>
          )}
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {featuredProducts.map(([key, product]) => (
            <Card
              key={key}
              className={cn(
                "group hover:shadow-lg transition-all duration-300 cursor-pointer",
                currentProduct === key && "ring-2 ring-purple-500"
              )}
            >
              <Link href={product.main}>
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-r",
                      getProductGradient(key)
                    )}>
                      <div className="text-white">
                        {getProductIcon(key)}
                      </div>
                    </div>
                    <div>
                      <CardTitle className="text-lg">{product.name}</CardTitle>
                      <Badge variant="green" className="mt-1">
                        <Play className="w-3 h-3 mr-1" />
                        Live
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm leading-relaxed">
                    {product.description}
                  </CardDescription>
                  <div className="mt-4 flex items-center text-purple-600 dark:text-purple-400 text-sm font-medium group-hover:underline">
                    Try {product.name}
                    <ExternalLink className="w-4 h-4 ml-1" />
                  </div>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>
        
        {showComingSoon && comingSoonProducts.length > 0 && (
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              More products coming soon
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {comingSoonProducts.slice(0, 4).map(([key, product]) => (
                <Badge key={key} variant="purple" className="text-xs">
                  <Clock className="w-3 h-3 mr-1" />
                  {product.name}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }

  // Default variant
  return (
    <div className={cn("space-y-6", className)}>
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h3>
        {description && (
          <p className="text-lg text-gray-600 dark:text-gray-400 mt-2 max-w-3xl mx-auto">
            {description}
          </p>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayProducts.map(([key, product]) => (
          <Card
            key={key}
            className={cn(
              "group hover:shadow-lg transition-all duration-300 cursor-pointer",
              currentProduct === key && "ring-2 ring-purple-500"
            )}
          >
            <Link href={product.main}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-r",
                    getProductGradient(key)
                  )}>
                    <div className="text-white">
                      {getProductIcon(key)}
                    </div>
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg">{product.name}</CardTitle>
                    {product.status === "live" ? (
                      <Badge variant="green" className="mt-1">
                        <Play className="w-3 h-3 mr-1" />
                        Live
                      </Badge>
                    ) : (
                      <Badge variant="purple" className="mt-1">
                        <Clock className="w-3 h-3 mr-1" />
                        Coming Soon
                      </Badge>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm leading-relaxed mb-4">
                  {product.description}
                </CardDescription>
                <div className="flex items-center text-purple-600 dark:text-purple-400 text-sm font-medium group-hover:underline">
                  {product.status === "live" ? `Try ${product.name}` : "Learn More"}
                  <ExternalLink className="w-4 h-4 ml-1" />
                </div>
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>
      
      <div className="text-center pt-6 border-t border-gray-200 dark:border-gray-700">
        <Link
          href={ZAZA_LINKS.main.products}
          className="inline-flex items-center text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium"
        >
          View all Zaza products
          <ExternalLink className="w-4 h-4 ml-1" />
        </Link>
      </div>
    </div>
  )
} 