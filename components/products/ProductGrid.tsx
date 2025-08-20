'use client'

import { ProductCard } from './ProductCard'
import { getProductsByCategory, getFeaturedProduct } from '@/lib/products'

export function ProductGrid() {
  const teachingTools = getProductsByCategory('teaching')
  const otherProducts = getProductsByCategory('other')
  const featured = getFeaturedProduct()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Teaching Tools Section */}
      <div className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Teaching Tools
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Purpose-built AI that understands your classroom challenges and saves you hours every week.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teachingTools.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product}
              featured={product.id === featured.id}
            />
          ))}
        </div>

        {/* Teaching tools comparison hint */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            Not sure which teaching tool fits your workflow?
          </p>
          <a 
            href="#comparison"
            className="inline-flex items-center text-purple-600 hover:text-purple-800 font-semibold transition-colors"
          >
            Compare teaching tools →
          </a>
        </div>
      </div>

      {/* Other Zaza Apps Section */}
      <div className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Coming Soon
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            More Zaza tools to streamline school operations, communications, and professional growth.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {otherProducts.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product}
            />
          ))}
        </div>

        {/* Early access CTA */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-8 max-w-3xl mx-auto border border-purple-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Get early access to new tools
            </h3>
            <p className="text-gray-600 mb-6">
              Join our waitlist to be the first to try new Zaza apps as they launch.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="mailto:team@zazatechnologies.com?subject=Early Access Interest"
                className="inline-flex items-center justify-center px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors"
              >
                Join Early Access
              </a>
              <a 
                href="/#newsletter"
                className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 hover:border-purple-300 hover:text-purple-700 transition-colors"
              >
                Get Updates
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}