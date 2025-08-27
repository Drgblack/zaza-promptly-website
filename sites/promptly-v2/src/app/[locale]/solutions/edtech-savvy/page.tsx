import type { Metadata } from 'next'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Code, Zap, Settings, Users } from 'lucide-react'

export const metadata: Metadata = {
  title: 'AI for EdTech-Savvy Teachers - Advanced Integration | Zaza Promptly',
  description: 'Advanced AI tools for tech-savvy educators. API access, custom integrations, and powerful automation features.',
}

export async function generateStaticParams() {
  const locales = ['en','de','fr','es','it']
  return locales.map(locale => ({ locale }))
}

export default function EdTechSavvyPage() {
  return (
    <div className="min-h-screen pt-16 lg:pt-20">
      <section className="py-16 lg:py-24 bg-gradient-to-br from-green-50 via-teal-50 to-blue-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-800 mb-6">
            AI for{" "}
            <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              EdTech Experts
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Advanced AI tools with API access, custom integrations, and powerful automation features for technology-forward educators.
          </p>
          
          <Button size="lg" className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
            Explore Advanced Features
          </Button>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">
            Advanced Integration Features
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <Card>
              <CardContent className="p-8">
                <Code className="w-12 h-12 text-green-600 mb-4" />
                <h3 className="text-xl font-bold mb-4">API Access</h3>
                <p className="text-gray-600 mb-4">
                  Full REST API access for custom integrations with your existing school systems.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Integration with SIS platforms</li>
                  <li>• Bulk comment generation</li>
                  <li>• Custom data workflows</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-8">
                <Zap className="w-12 h-12 text-green-600 mb-4" />
                <h3 className="text-xl font-bold mb-4">Automation Tools</h3>
                <p className="text-gray-600 mb-4">
                  Set up automated workflows to handle repetitive tasks without manual intervention.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Scheduled report generation</li>
                  <li>• Auto-parent notifications</li>
                  <li>• Smart data processing</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-gradient-to-r from-green-600 to-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Ready for Advanced AI Integration?
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Unlock the full power of AI for education with our advanced tools and integrations.
          </p>
          
          <Button 
            size="lg" 
            className="bg-white text-green-600 hover:bg-gray-100"
          >
            Contact Our Tech Team
          </Button>
        </div>
      </section>
    </div>
  )
}