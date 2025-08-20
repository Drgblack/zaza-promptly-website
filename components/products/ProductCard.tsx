'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Clock, Check } from 'lucide-react'
import { Product } from '@/lib/products'
import { useAnalytics } from '@/hooks/useAnalytics'

interface ProductCardProps {
  product: Product
  featured?: boolean
}

export function ProductCard({ product, featured = false }: ProductCardProps) {
  const { trackEvent } = useAnalytics()

  const handlePrimaryCTA = () => {
    trackEvent('product_cta_primary', {
      product: product.id,
      source: 'products_page',
      status: product.status
    })
  }

  const handleSecondaryCTA = () => {
    trackEvent('product_cta_secondary', {
      product: product.id,
      source: 'products_page'
    })
  }

  const handleCrossLink = () => {
    trackEvent('product_cross_link', {
      from: product.id,
      to: product.crossLink?.href,
      source: 'products_page'
    })
  }

  const statusStyles = {
    available: 'bg-green-100 text-green-800 border-green-200',
    waitlist: 'bg-amber-100 text-amber-800 border-amber-200', 
    'coming-soon': 'bg-blue-100 text-blue-800 border-blue-200'
  }

  const statusText = {
    available: 'Available now',
    waitlist: 'Join waitlist',
    'coming-soon': 'Coming soon'
  }

  return (
    <div className={`relative bg-white rounded-2xl border transition-all duration-300 hover:shadow-xl hover:shadow-purple-100/50 hover:-translate-y-1 group ${
      featured 
        ? 'border-purple-200 shadow-lg shadow-purple-100/30 ring-2 ring-purple-100' 
        : 'border-gray-200 shadow-md hover:border-purple-200'
    }`}>
      {/* Featured badge */}
      {featured && (
        <div className="absolute -top-3 left-6 z-10">
          <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-1.5 text-xs font-semibold shadow-lg">
            Most Popular
          </Badge>
        </div>
      )}

      {/* Status badge */}
      <div className="absolute top-4 right-4">
        <Badge 
          variant="secondary" 
          className={`text-xs font-medium ${statusStyles[product.status]} border`}
        >
          {statusText[product.status]}
        </Badge>
      </div>

      <div className="p-8">
        {/* Icon and header */}
        <div className="flex items-center space-x-4 mb-6">
          <div className={`flex items-center justify-center w-14 h-14 rounded-2xl ${
            featured 
              ? 'bg-gradient-to-br from-purple-500 to-blue-600 text-white shadow-lg'
              : 'bg-gray-100 text-gray-700 group-hover:bg-purple-100 group-hover:text-purple-700'
          } transition-colors duration-300`}>
            <product.icon className="w-7 h-7" />
          </div>
          
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 mb-1">
              {product.name}
            </h3>
            {product.stats && (
              <div className="flex items-center text-sm text-purple-600 font-medium">
                <Clock className="w-4 h-4 mr-1" />
                {product.stats}
              </div>
            )}
          </div>
        </div>

        {/* Tagline */}
        <p className="text-lg font-semibold text-gray-800 mb-4 leading-tight">
          {product.tagline}
        </p>

        {/* Description */}
        <p className="text-gray-600 mb-6 leading-relaxed">
          {product.description}
        </p>

        {/* Feature bullets */}
        <div className="space-y-3 mb-8">
          {product.bullets.map((bullet, index) => (
            <div key={index} className="flex items-start space-x-3">
              <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700 text-sm">{bullet}</span>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="space-y-3 mb-6">
          <Link href={product.href} onClick={handlePrimaryCTA}>
            <Button 
              className={`w-full font-semibold transition-all duration-200 ${
                featured
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl'
                  : product.status === 'available'
                  ? 'bg-purple-600 hover:bg-purple-700 text-white'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
              disabled={product.status === 'coming-soon'}
            >
              {product.ctaPrimary}
              {product.status === 'available' && <ArrowRight className="w-4 h-4 ml-2" />}
            </Button>
          </Link>

          {product.ctaSecondary && (
            <Link href={`${product.href}#examples`} onClick={handleSecondaryCTA}>
              <Button 
                variant="outline" 
                className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-purple-300 hover:text-purple-700 font-medium"
              >
                {product.ctaSecondary}
              </Button>
            </Link>
          )}
        </div>

        {/* Cross-link */}
        {product.crossLink && (
          <Link 
            href={product.crossLink.href}
            onClick={handleCrossLink}
            className="block text-center text-sm text-purple-600 hover:text-purple-800 font-medium transition-colors duration-200 hover:underline"
          >
            {product.crossLink.text}
          </Link>
        )}
      </div>
    </div>
  )
}