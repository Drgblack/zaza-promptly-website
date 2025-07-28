import React from 'react'
import { FreeResourcesHub } from '../resources/free-resources-hub'
import { ProductivityCalculator } from '../tools/productivity-calculator'
import { TestimonialsHub } from '../social-proof/testimonials-hub'
import { BlogHub } from '../content/blog-hub'
import { PricingOptimizer } from '../pricing/pricing-optimizer'

/**
 * Demo Page - Showcase All Conversion Optimization Components
 * 
 * This page demonstrates all the components we've built for the Zaza conversion optimization system.
 * You can view this page to see how each component looks and functions.
 */

export function DemoPage() {
  const [activeComponent, setActiveComponent] = React.useState('resources')

  const components = {
    resources: {
      name: 'Free Resources Hub',
      component: <FreeResourcesHub />,
      description: 'Downloadable resources that provide value and build trust'
    },
    calculator: {
      name: 'Productivity Calculator',
      component: <ProductivityCalculator />,
      description: 'Interactive tool showing personalized time and money savings'
    },
    testimonials: {
      name: 'Testimonials Hub',
      component: <TestimonialsHub />,
      description: 'Social proof with video testimonials and case studies'
    },
    blog: {
      name: 'Blog Content Hub',
      component: <BlogHub />,
      description: 'Educational content that drives conversions'
    },
    pricing: {
      name: 'Pricing Optimizer',
      component: <PricingOptimizer />,
      description: 'Transparent pricing with ROI calculations'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">Zaza Conversion Demo</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">Select a component to view:</span>
              <select
                value={activeComponent}
                onChange={(e) => setActiveComponent(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {Object.entries(components).map(([key, { name }]) => (
                  <option key={key} value={key}>{name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </header>

      {/* Component Description */}
      <div className="bg-blue-600 text-white py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-semibold mb-2">
            {components[activeComponent as keyof typeof components].name}
          </h2>
          <p className="text-blue-100">
            {components[activeComponent as keyof typeof components].description}
          </p>
        </div>
      </div>

      {/* Active Component */}
      <main>
        {components[activeComponent as keyof typeof components].component}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-4">Conversion Optimization Components</h3>
            <p className="text-gray-300 mb-6">
              These components are designed to maximize conversions across all Zaza websites.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-sm">
              {Object.entries(components).map(([key, { name }]) => (
                <button
                  key={key}
                  onClick={() => setActiveComponent(key)}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    activeComponent === key
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default DemoPage 