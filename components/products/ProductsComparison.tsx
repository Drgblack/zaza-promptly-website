'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Check, ArrowRight } from 'lucide-react'
import { teachingToolsComparison, getProductsByCategory } from '@/lib/products'
import { useAnalytics } from '@/hooks/useAnalytics'

export function ProductsComparison() {
  const { trackEvent } = useAnalytics()
  const teachingTools = getProductsByCategory('teaching')

  const handleToolCTA = (toolId: string, action: string) => {
    trackEvent('comparison_cta', {
      tool: toolId,
      action,
      source: 'products_comparison'
    })
  }

  return (
    <div id="comparison" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Compare Teaching Tools
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Choose the right AI assistant for your workflow. Each tool is designed for different teaching challenges.
        </p>
      </div>

      {/* Comparison Table */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden mb-12">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-purple-50 to-blue-50 border-b border-gray-200">
                <th className="text-left py-6 px-6 font-semibold text-gray-900">
                  Features
                </th>
                {teachingTools.map((tool) => (
                  <th key={tool.id} className="text-center py-6 px-6 font-semibold text-gray-900 min-w-[200px]">
                    <div className="flex flex-col items-center space-y-2">
                      <tool.icon className="w-8 h-8 text-purple-600" />
                      <span>{tool.name}</span>
                      {tool.id === 'promptly' && (
                        <Badge className="bg-purple-100 text-purple-800 text-xs">
                          Most Popular
                        </Badge>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {teachingToolsComparison.map((row, index) => (
                <tr key={index} className={`border-b border-gray-100 ${index % 2 === 0 ? 'bg-gray-50/50' : ''}`}>
                  <td className="py-4 px-6 font-medium text-gray-900">
                    {row.feature}
                  </td>
                  <td className="py-4 px-6 text-center text-gray-700">
                    {row.promptly}
                  </td>
                  <td className="py-4 px-6 text-center text-gray-700">
                    {row.teach}
                  </td>
                  <td className="py-4 px-6 text-center text-gray-700">
                    {row.autoplanner}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* CTAs Row */}
        <div className="bg-gray-50 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6">
            <div className="md:col-span-1 flex items-center">
              <span className="font-semibold text-gray-900">Get started:</span>
            </div>
            {teachingTools.map((tool) => (
              <div key={tool.id} className="flex flex-col space-y-2">
                <Link href={tool.href} onClick={() => handleToolCTA(tool.id, 'primary')}>
                  <Button 
                    className={`w-full font-semibold ${
                      tool.id === 'promptly'
                        ? 'bg-purple-600 hover:bg-purple-700 text-white'
                        : tool.status === 'available'
                        ? 'bg-purple-600 hover:bg-purple-700 text-white'
                        : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                    }`}
                    disabled={tool.status === 'coming-soon'}
                  >
                    {tool.ctaPrimary}
                    {tool.status === 'available' && <ArrowRight className="w-4 h-4 ml-1" />}
                  </Button>
                </Link>
                {tool.ctaSecondary && (
                  <Link href={`${tool.href}#examples`} onClick={() => handleToolCTA(tool.id, 'secondary')}>
                    <Button variant="outline" size="sm" className="w-full text-xs">
                      {tool.ctaSecondary}
                    </Button>
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Decision helper */}
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        <div className="bg-green-50 rounded-2xl p-8 border border-green-200">
          <div className="flex items-center space-x-3 mb-4">
            <Check className="w-6 h-6 text-green-600" />
            <h3 className="text-xl font-bold text-green-900">
              New to AI tools?
            </h3>
          </div>
          <p className="text-green-800 mb-6">
            Start with <strong>Zaza Promptly</strong> for immediate impact on your communication workload.
          </p>
          <Link href="/promptly" onClick={() => handleToolCTA('promptly', 'recommendation')}>
            <Button className="bg-green-600 hover:bg-green-700 text-white font-semibold">
              Try Promptly Free
            </Button>
          </Link>
        </div>

        <div className="bg-blue-50 rounded-2xl p-8 border border-blue-200">
          <div className="flex items-center space-x-3 mb-4">
            <Check className="w-6 h-6 text-blue-600" />
            <h3 className="text-xl font-bold text-blue-900">
              Planning takes forever?
            </h3>
          </div>
          <p className="text-blue-800 mb-6">
            <strong>Zaza Teach</strong> will cut your lesson planning time by hours each week.
          </p>
          <Link href="/teach" onClick={() => handleToolCTA('teach', 'recommendation')}>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold">
              Start Planning
            </Button>
          </Link>
        </div>

        <div className="bg-purple-50 rounded-2xl p-8 border border-purple-200">
          <div className="flex items-center space-x-3 mb-4">
            <Check className="w-6 h-6 text-purple-600" />
            <h3 className="text-xl font-bold text-purple-900">
              Ready for next-level AI?
            </h3>
          </div>
          <p className="text-purple-800 mb-6">
            <strong>Zaza AutoPlanner</strong> handles complex workflows with multimodal intelligence.
          </p>
          <Link href="/autoplanner" onClick={() => handleToolCTA('autoplanner', 'recommendation')}>
            <Button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold">
              Join Early Access
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}