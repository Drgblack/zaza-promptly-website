import type { Metadata } from 'next'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Shield, BarChart, Users, Target } from 'lucide-react'

export const metadata: Metadata = {
  title: 'AI for Head Teachers & School Leaders | Zaza Promptly',
  description: 'School-wide AI implementation, staff training, and leadership tools for head teachers and educational leaders.',
}

export async function generateStaticParams() {
  const locales = ['en','de','fr','es','it']
  return locales.map(locale => ({ locale }))
}

export default function HeadTeachersLeadersPage() {
  return (
    <div className="min-h-screen pt-16 lg:pt-20">
      <section className="py-16 lg:py-24 bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-800 mb-6">
            AI for{" "}
            <span className="bg-gradient-to-r from-amber-600 to-red-600 bg-clip-text text-transparent">
              School Leaders
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            School-wide AI implementation, staff training programs, and leadership dashboards for educational leaders.
          </p>
          
          <Button size="lg" className="bg-gradient-to-r from-amber-600 to-red-600 hover:from-amber-700 hover:to-red-700">
            Schedule Leadership Demo
          </Button>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">
            Leadership & Management Tools
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center">
              <CardContent className="p-8">
                <Shield className="w-12 h-12 text-amber-600 mx-auto mb-4" />
                <h3 className="text-lg font-bold mb-3">Safe Implementation</h3>
                <p className="text-sm text-gray-600">
                  GDPR-compliant AI with full data control and security measures.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-8">
                <BarChart className="w-12 h-12 text-amber-600 mx-auto mb-4" />
                <h3 className="text-lg font-bold mb-3">Usage Analytics</h3>
                <p className="text-sm text-gray-600">
                  Track adoption, time savings, and impact across your school.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-8">
                <Users className="w-12 h-12 text-amber-600 mx-auto mb-4" />
                <h3 className="text-lg font-bold mb-3">Staff Training</h3>
                <p className="text-sm text-gray-600">
                  Comprehensive training programs for all staff levels.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-8">
                <Target className="w-12 h-12 text-amber-600 mx-auto mb-4" />
                <h3 className="text-lg font-bold mb-3">School Goals</h3>
                <p className="text-sm text-gray-600">
                  Align AI implementation with your school improvement plans.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-gradient-to-r from-amber-600 to-red-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Lead Your School into the AI Era
          </h2>
          <p className="text-xl text-amber-100 mb-8 max-w-2xl mx-auto">
            Join forward-thinking school leaders already transforming education with AI.
          </p>
          
          <Button 
            size="lg" 
            className="bg-white text-amber-600 hover:bg-gray-100"
          >
            Schedule Leadership Consultation
          </Button>
        </div>
      </section>
    </div>
  )
}