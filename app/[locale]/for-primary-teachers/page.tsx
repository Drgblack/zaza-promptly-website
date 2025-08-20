import type { Metadata } from 'next'
import { BookOpen, Clock, Heart, MessageSquare, Star, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { BrevoForm } from '@/components/brevo-form'

export const metadata: Metadata = {
  title: 'AI Teaching Assistant for Primary Teachers | Zaza Promptly',
  description: 'Save 5+ hours weekly on parent communications and student reports. AI specifically trained for primary education by PhD educator. Trusted by 12,000+ teachers.',
  keywords: [
    'primary teacher AI',
    'elementary school AI assistant',
    'parent communication AI',
    'student report comments',
    'primary education technology',
    'teacher time saving tools',
    'AI for elementary teachers'
  ],
  openGraph: {
    title: 'AI Teaching Assistant Built for Primary Teachers',
    description: 'Transform parent communications and student feedback with AI designed specifically for primary education. Save hours weekly.',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
}

interface Props {
  params: { locale: string }
}

export default async function ForPrimaryTeachersPage({ params }: Props) {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-indigo-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="inline-flex items-center mb-6 bg-blue-100 text-blue-800 hover:bg-blue-200">
                <BookOpen className="w-4 h-4 mr-2" />
                Built for Primary Teachers
              </Badge>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                The AI Assistant That Understands Primary School
              </h1>
              
              <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
                Stop spending evenings writing parent emails and student reports. Our PhD-designed AI creates professional, age-appropriate communications in seconds.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button 
                  asChild
                  size="lg" 
                  className="bg-white text-blue-700 hover:bg-blue-50 text-lg px-8 py-4"
                >
                  <Link href="/?utm_source=primary_landing&utm_medium=hero_cta&utm_campaign=primary_teachers">
                    Try Free Demo
                  </Link>
                </Button>
                <Button 
                  asChild
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white/10 text-lg px-8 py-4"
                >
                  <Link href="#examples">
                    See Examples
                  </Link>
                </Button>
              </div>
              
              <div className="flex items-center space-x-6 text-blue-100">
                <div className="flex items-center">
                  <Star className="w-5 h-5 mr-1 text-yellow-300" />
                  <span>4.9/5 rating</span>
                </div>
                <div className="flex items-center">
                  <Users className="w-5 h-5 mr-1" />
                  <span>12,000+ teachers</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-5 h-5 mr-1" />
                  <span>5+ hours saved weekly</span>
                </div>
              </div>
            </div>
            
            <div className="lg:text-right">
              <div className="bg-white/10 backdrop-blur rounded-xl p-6 border border-white/20">
                <h3 className="text-xl font-semibold mb-4 text-center">Perfect for Primary Teachers:</h3>
                <div className="space-y-3 text-blue-100">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-yellow-300 rounded-full mr-3"></div>
                    Age-appropriate language and tone
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-yellow-300 rounded-full mr-3"></div>
                    Primary curriculum understanding
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-yellow-300 rounded-full mr-3"></div>
                    Parent-friendly explanations
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-yellow-300 rounded-full mr-3"></div>
                    Developmental milestone awareness
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Problem/Solution Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                We Know Primary Teaching Is Different
              </h2>
              
              <div className="space-y-4 text-lg text-gray-600 mb-8">
                <p>
                  <strong>You're dealing with:</strong> Young learners with diverse needs, parents who want detailed updates, and the pressure to communicate clearly about foundational skills.
                </p>
                <p>
                  <strong>You need:</strong> Professional language that explains complex developmental concepts in parent-friendly terms, while maintaining the caring tone that primary families expect.
                </p>
                <p>
                  <strong>The reality:</strong> You spend 2-3 hours each evening crafting emails and report comments that hit the right balance of professional and nurturing.
                </p>
              </div>
              
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <h3 className="font-semibold text-red-800 mb-3">Sound familiar?</h3>
                <div className="space-y-2 text-red-700">
                  <div>❌ Staying late to write parent communications</div>
                  <div>❌ Struggling to explain early literacy development</div>
                  <div>❌ Repeating the same report comments</div>
                  <div>❌ Worrying about appropriate tone with parents</div>
                </div>
              </div>
            </div>
            
            <div>
              <div className="bg-white rounded-xl shadow-lg p-8 border">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Here's the solution:</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-green-600 font-bold text-sm">✓</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Primary-Specific Language</h4>
                      <p className="text-gray-600 text-sm">AI trained on primary education vocabulary and developmental concepts</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-green-600 font-bold text-sm">✓</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Age-Appropriate Tone</h4>
                      <p className="text-gray-600 text-sm">Balances professionalism with the warmth primary families expect</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-green-600 font-bold text-sm">✓</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Developmental Understanding</h4>
                      <p className="text-gray-600 text-sm">Knows what's appropriate to expect at each primary year level</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Examples Section */}
      <div id="examples" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              See How It Works for Primary Teachers
            </h2>
            <p className="text-xl text-gray-600">
              Real examples from primary classrooms
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <Card className="overflow-hidden">
              <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-4">
                <h3 className="font-semibold flex items-center">
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Before: Your Draft
                </h3>
              </div>
              <CardContent className="p-6">
                <div className="bg-gray-100 p-4 rounded font-mono text-sm">
                  "Emma needs to work on her reading. She's struggling with some words."
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4">
                <h3 className="font-semibold flex items-center">
                  <Heart className="w-5 h-5 mr-2" />
                  After: AI-Enhanced
                </h3>
              </div>
              <CardContent className="p-6">
                <div className="bg-green-50 p-4 rounded font-mono text-sm">
                  "Emma is making steady progress in her reading journey! She's showing great confidence with familiar sight words and is beginning to apply phonetic strategies with new vocabulary. To support her continued growth, I'd recommend practicing sight words for 5-10 minutes daily at home. Her enthusiasm for stories is wonderful to see, and with consistent practice, I'm confident she'll continue building these important foundational skills."
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden lg:col-span-2">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4">
                <h3 className="font-semibold">Primary Report Comment Example</h3>
              </div>
              <CardContent className="p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Your Input:</h4>
                    <div className="bg-gray-100 p-3 rounded text-sm">
                      "Mathematics - addition and subtraction, good effort, needs practice with number bonds"
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">AI Output:</h4>
                    <div className="bg-blue-50 p-3 rounded text-sm">
                      "Jake demonstrates a solid understanding of addition and subtraction concepts and consistently shows excellent effort in mathematics lessons. He works methodically through problems and isn't afraid to ask for help when needed. To further strengthen his computational fluency, continued practice with number bonds to 10 and 20 would be beneficial. Jake's positive attitude toward mathematics and willingness to persevere through challenges are commendable qualities that will serve him well as he continues developing these foundational skills."
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-16 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Primary Teachers Choose Zaza Promptly
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Save 5+ Hours Weekly</h3>
              <p className="text-gray-600">
                Spend time planning engaging lessons instead of writing communications
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Maintain Your Caring Voice</h3>
              <p className="text-gray-600">
                AI that understands the nurturing tone primary families expect
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Primary Curriculum Expert</h3>
              <p className="text-gray-600">
                Understands developmental stages and age-appropriate expectations
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Primary Teachers Are Saying
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <Card className="p-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="font-bold text-yellow-600">SM</span>
                </div>
                <div>
                  <div className="flex items-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4">
                    "As a Year 2 teacher, I was spending hours explaining phonics progress to parents. Now the AI creates detailed, parent-friendly explanations that actually help families understand how to support their child at home."
                  </p>
                  <div className="text-sm text-gray-500">
                    <strong>Sarah M.</strong> - Year 2 Teacher, Birmingham
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="font-bold text-blue-600">JT</span>
                </div>
                <div>
                  <div className="flex items-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4">
                    "The AI understands primary school challenges perfectly. It helps me communicate about early maths concepts in ways that don't overwhelm parents but still provide the detail they want."
                  </p>
                  <div className="text-sm text-gray-500">
                    <strong>Jenny T.</strong> - Reception Teacher, Manchester
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Primary Teacher FAQs
            </h2>
          </div>

          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="font-semibold text-gray-900 mb-2">
                Will it work for early years (Reception/Year 1)?
              </h3>
              <p className="text-gray-600">
                Absolutely! The AI is specifically trained on early childhood development and understands the unique communication needs for foundation stage parents.
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold text-gray-900 mb-2">
                Can it help with SEND student communications?
              </h3>
              <p className="text-gray-600">
                Yes, it understands inclusive language and can help you communicate about differentiation, support strategies, and individual progress in sensitive, professional ways.
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold text-gray-900 mb-2">
                Does it understand the UK Primary curriculum?
              </h3>
              <p className="text-gray-600">
                The AI is trained on UK curriculum standards and understands year group expectations, helping you communicate about statutory requirements and assessment criteria clearly.
              </p>
            </Card>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Get Your Evenings Back?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Join thousands of primary teachers already saving 5+ hours weekly
          </p>
          
          <div className="max-w-md mx-auto">
            <BrevoForm
              title="Start Your Free Trial"
              description="Get 7 days free access to all features"
              buttonText="Start Free Trial"
              source="primary_teachers_landing"
              tags={['primary_teachers', 'landing_page_signup']}
              className="bg-white text-gray-900 shadow-xl"
            />
          </div>
          
          <div className="mt-8 text-sm text-blue-100">
            <p>✓ 7-day free trial ✓ No credit card required ✓ Cancel anytime</p>
          </div>
        </div>
      </div>
    </div>
  )
}