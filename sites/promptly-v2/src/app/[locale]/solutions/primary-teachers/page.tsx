import type { Metadata } from 'next'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { CheckCircle, Users, BookOpen, MessageSquare, Clock } from 'lucide-react'

export const metadata: Metadata = {
  title: 'AI for Primary Teachers - Zaza Promptly',
  description: 'Designed specifically for primary school teachers. Save hours on student comments, parent communication, and report writing with AI built for education.',
}

export async function generateStaticParams() {
  const locales = ['en','de','fr','es','it']
  return locales.map(locale => ({ locale }))
}

export default function PrimaryTeachersPage() {
  return (
    <div className="min-h-screen pt-16 lg:pt-20">
      {/* Hero Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-800 mb-6">
              AI Built for{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Primary Teachers
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Spend less time on paperwork, more time inspiring young minds. 
              Purpose-built AI tools for primary school teachers.
            </p>
            
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              Start Free Trial
            </Button>
          </div>
        </div>
      </section>

      {/* Key Challenges Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">
            We Understand Primary Teaching Challenges
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardContent className="p-8">
                <Users className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-3">Large Class Sizes</h3>
                <p className="text-gray-600">
                  Writing individual comments for 30+ students takes forever. 
                  Our AI helps personalize feedback efficiently.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-8">
                <MessageSquare className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-3">Parent Communication</h3>
                <p className="text-gray-600">
                  Sensitive conversations with parents require the right tone. 
                  Get AI-powered templates for every situation.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-8">
                <Clock className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-3">Evening Workload</h3>
                <p className="text-gray-600">
                  Report writing shouldn't consume your weekends. 
                  Generate comprehensive reports in minutes.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">
            Primary-Specific AI Tools
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-6">Student Comment Generation</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                  <span>Age-appropriate language for primary students</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                  <span>Covers all curriculum subjects (Math, English, Science, etc.)</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                  <span>Positive, encouraging tone for young learners</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                  <span>Personalizable based on individual progress</span>
                </div>
              </div>
            </div>
            
            <Card>
              <CardContent className="p-6">
                <h4 className="font-bold mb-3">Example Output:</h4>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-700 italic">
                    "Jamie has shown wonderful progress in mathematics this term. 
                    Their enthusiasm for problem-solving is evident, particularly in 
                    our multiplication work. I've noticed Jamie is gaining confidence 
                    with mental math strategies. For continued growth, practicing 
                    times tables at home would be beneficial."
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16 lg:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">
            Primary Teachers Love Zaza Promptly
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-bold">Sarah M.</h4>
                    <p className="text-sm text-gray-600">Year 6 Teacher</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">
                  "Writing comments for 32 students used to take me 4 hours every weekend. 
                  Now it takes 30 minutes, and the quality is actually better!"
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                    <BookOpen className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-bold">Emma L.</h4>
                    <p className="text-sm text-gray-600">Year 3 Teacher</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">
                  "Parent emails are no longer stressful. The AI helps me find 
                  the perfect words for difficult conversations."
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Ready to Reclaim Your Evenings?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of primary teachers already saving 5+ hours weekly.
          </p>
          
          <Button 
            size="lg" 
            className="bg-white text-blue-600 hover:bg-gray-100"
          >
            Start Free Trial - No Credit Card Required
          </Button>
        </div>
      </section>
    </div>
  )
}