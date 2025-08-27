import type { Metadata } from 'next'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { CheckCircle, GraduationCap, FileText, Users } from 'lucide-react'

export const metadata: Metadata = {
  title: 'AI for Secondary Teachers - Subject-Specific Tools | Zaza Promptly',
  description: 'AI tools designed for secondary education. Generate subject-specific comments, manage multiple classes, and streamline assessment feedback.',
}

export async function generateStaticParams() {
  const locales = ['en','de','fr','es','it']
  return locales.map(locale => ({ locale }))
}

export default function SecondaryTeachersPage() {
  return (
    <div className="min-h-screen pt-16 lg:pt-20">
      {/* Hero Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-800 mb-6">
            AI for{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent">
              Secondary Teachers
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Subject-specific AI tools that understand your curriculum. 
            Handle 150+ students efficiently with personalized feedback.
          </p>
          
          <Button size="lg" className="bg-gradient-to-r from-indigo-600 to-pink-600 hover:from-indigo-700 hover:to-pink-700">
            Start Free Trial
          </Button>
        </div>
      </section>

      {/* Subject-Specific Tools */}
      <section className="py-16 lg:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">
            Subject-Specific AI Tools
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { subject: 'English', icon: FileText, features: ['Essay feedback', 'Creative writing comments', 'Reading comprehension'] },
              { subject: 'Mathematics', icon: GraduationCap, features: ['Problem-solving feedback', 'Method analysis', 'Progress tracking'] },
              { subject: 'Science', icon: Users, features: ['Lab report comments', 'Practical skills', 'Theory understanding'] },
              { subject: 'History', icon: FileText, features: ['Source analysis', 'Essay structure', 'Historical thinking'] },
              { subject: 'Languages', icon: GraduationCap, features: ['Grammar feedback', 'Vocabulary development', 'Cultural awareness'] },
              { subject: 'Art & Design', icon: Users, features: ['Creative process', 'Technique development', 'Artistic expression'] }
            ].map((item, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-8">
                  <item.icon className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-4">{item.subject}</h3>
                  <ul className="space-y-2">
                    {item.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Multi-Class Management */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Manage Multiple Classes Efficiently</h2>
              <p className="text-gray-600 mb-6">
                Teaching 5+ classes with 30 students each? Our AI scales with your workload, 
                maintaining personalization across all your students.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                  <span>Batch process assignments by class or subject</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                  <span>Consistent assessment criteria across classes</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                  <span>Track student progress over time</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                  <span>Generate parent evening reports instantly</span>
                </div>
              </div>
            </div>
            
            <Card>
              <CardContent className="p-6">
                <h4 className="font-bold mb-3">Time Savings Example:</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Report cards (150 students):</span>
                    <span className="font-bold text-green-600">25 hours → 3 hours</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Weekly feedback:</span>
                    <span className="font-bold text-green-600">8 hours → 1 hour</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Parent communications:</span>
                    <span className="font-bold text-green-600">5 hours → 30 min</span>
                  </div>
                  <hr />
                  <div className="flex justify-between items-center font-bold">
                    <span>Weekly time saved:</span>
                    <span className="text-green-600">29.5 hours!</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-r from-indigo-600 to-pink-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Transform Your Secondary Teaching
          </h2>
          <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
            Join secondary teachers already saving 20+ hours weekly with subject-specific AI tools.
          </p>
          
          <Button 
            size="lg" 
            className="bg-white text-indigo-600 hover:bg-gray-100"
          >
            Start Free Trial
          </Button>
        </div>
      </section>
    </div>
  )
}