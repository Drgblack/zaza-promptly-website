import type { Metadata } from 'next'
import { Heart, Clock, Shield, MessageSquare, Star, Users, FileText, Target } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { BrevoForm } from '@/components/brevo-form'

export const metadata: Metadata = {
  title: 'AI Assistant for Special Education Teachers & IEP Support | Zaza Promptly',
  description: 'Sensitive, professional communication support for SEND teachers. AI that understands IEP language, inclusive terminology, and special education best practices.',
  keywords: [
    'special education AI',
    'SEND teacher AI',
    'IEP communication AI',
    'special needs teacher assistant',
    'inclusive education AI',
    'disability communication AI',
    'SEND parent communication'
  ],
  openGraph: {
    title: 'AI Assistant for Special Education Teachers',
    description: 'Professional, sensitive communication support for SEND teachers. Understanding IEPs, accommodations, and inclusive language.',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default async function ForSpecialEducationPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-emerald-600 to-teal-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="inline-flex items-center mb-6 bg-emerald-100 text-emerald-800 hover:bg-emerald-200">
                <Heart className="w-4 h-4 mr-2" />
                For Special Education Teachers
              </Badge>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                AI That Understands SEND Communication
              </h1>
              
              <p className="text-xl md:text-2xl text-emerald-100 mb-8 leading-relaxed">
                Navigate sensitive conversations with confidence. Get professional, inclusive language for IEPs, parent communications, and progress reports that honor each student's unique journey.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button 
                  asChild
                  size="lg" 
                  className="bg-white text-emerald-700 hover:bg-emerald-50 text-lg px-8 py-4"
                >
                  <Link href="/?utm_source=send_landing&utm_medium=hero_cta&utm_campaign=special_education">
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
                    See IEP Examples
                  </Link>
                </Button>
              </div>
              
              <div className="flex items-center space-x-6 text-emerald-100">
                <div className="flex items-center">
                  <Star className="w-5 h-5 mr-1 text-yellow-300" />
                  <span>4.9/5 rating</span>
                </div>
                <div className="flex items-center">
                  <Users className="w-5 h-5 mr-1" />
                  <span>1,500+ SEND teachers</span>
                </div>
                <div className="flex items-center">
                  <Shield className="w-5 h-5 mr-1" />
                  <span>GDPR compliant</span>
                </div>
              </div>
            </div>
            
            <div className="lg:text-right">
              <div className="bg-white/10 backdrop-blur rounded-xl p-6 border border-white/20">
                <h3 className="text-xl font-semibold mb-4 text-center">Designed for SEND Excellence:</h3>
                <div className="space-y-3 text-emerald-100">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-yellow-300 rounded-full mr-3"></div>
                    Person-first, inclusive language
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-yellow-300 rounded-full mr-3"></div>
                    IEP and accommodation terminology
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-yellow-300 rounded-full mr-3"></div>
                    Strength-based progress reporting
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-yellow-300 rounded-full mr-3"></div>
                    Sensitive parent communication
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
                Special Education Communication Is Complex
              </h2>
              
              <div className="space-y-4 text-lg text-gray-600 mb-8">
                <p>
                  <strong>Your challenge:</strong> Every word matters when discussing a child's needs. Parents are often emotional, progress is individual, and one wrong phrase can damage relationships built over months.
                </p>
                <p>
                  <strong>The pressure:</strong> You need to balance honesty about challenges with hope for growth. Explain accommodations without stigma. Celebrate small wins while addressing significant needs.
                </p>
                <p>
                  <strong>Your reality:</strong> You spend hours crafting IEP reports and parent emails, agonizing over tone and terminology, knowing these communications profoundly impact families.
                </p>
              </div>
              
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <h3 className="font-semibold text-red-800 mb-3">SEND teachers face unique challenges:</h3>
                <div className="space-y-2 text-red-700">
                  <div>❌ Finding the right balance of honesty and hope</div>
                  <div>❌ Using person-first language consistently</div>
                  <div>❌ Explaining complex needs to worried parents</div>
                  <div>❌ Writing detailed IEP progress reports</div>
                  <div>❌ Navigating emotional parent meetings</div>
                </div>
              </div>
            </div>
            
            <div>
              <div className="bg-white rounded-xl shadow-lg p-8 border">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">AI trained in SEND best practices:</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-green-600 font-bold text-sm">✓</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Inclusive Language Mastery</h4>
                      <p className="text-gray-600 text-sm">Person-first language, strength-based reporting, and respectful terminology</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-green-600 font-bold text-sm">✓</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">IEP & Legal Awareness</h4>
                      <p className="text-gray-600 text-sm">Understanding of special education law, rights, and documentation requirements</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-green-600 font-bold text-sm">✓</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Sensitive Communication</h4>
                      <p className="text-gray-600 text-sm">Balances honesty with hope, challenges with strengths</p>
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
              See the Difference: Sensitive Communication
            </h2>
            <p className="text-xl text-gray-600">
              From basic notes to professional, inclusive communication
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <Card className="overflow-hidden">
              <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-4">
                <h3 className="font-semibold flex items-center">
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Before: Basic Note
                </h3>
              </div>
              <CardContent className="p-6">
                <div className="bg-gray-100 p-4 rounded font-mono text-sm">
                  "Jack is having behavioral problems in class. He can't focus and disrupts other students. His autism makes it hard for him to learn."
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4">
                <h3 className="font-semibold flex items-center">
                  <Heart className="w-5 h-5 mr-2" />
                  After: SEND-Aware Communication
                </h3>
              </div>
              <CardContent className="p-6">
                <div className="bg-green-50 p-4 rounded font-mono text-sm">
                  "Jack continues to develop his self-regulation strategies and is making progress with the sensory break tools we've introduced. While he experiences challenges with sustained attention in group settings, he demonstrates strong engagement during one-on-one instruction and shows particular strength in visual learning tasks.

As a student with autism, Jack benefits from predictable routines and clear expectations. We're collaborating to expand his successful independent work periods and introduce new peer interaction opportunities at his pace.

I'd like to schedule a meeting to discuss how we can further support Jack's communication and social learning goals."
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden lg:col-span-2">
              <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white p-4">
                <h3 className="font-semibold">IEP Progress Report Example</h3>
              </div>
              <CardContent className="p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Your Notes:</h4>
                    <div className="bg-gray-100 p-3 rounded text-sm">
                      "Reading goal - Emma still struggles with phonics, gets frustrated easily, needs more help"
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">AI-Generated IEP Report:</h4>
                    <div className="bg-emerald-50 p-3 rounded text-sm">
                      "<strong>IEP Goal Progress: Phonics and Decoding Skills</strong>

<strong>Current Performance:</strong> Emma demonstrates emerging skills in phonetic decoding and has made measurable progress toward her annual reading goal. She successfully identifies 15/20 consonant-vowel-consonant patterns (up from 8/20 at baseline) and uses visual supports effectively.

<strong>Strengths:</strong> Shows strong motivation when provided choice in reading materials and maintains focus during structured phonics instruction with built-in movement breaks.

<strong>Areas of Growth:</strong> Emma benefits from additional processing time and emotional regulation support when encountering challenging texts. We continue to implement her accommodation for frequent breaks and alternative response methods.

<strong>Next Steps:</strong> Increase practice opportunities with high-interest, decodable texts and expand use of assistive technology tools as specified in her IEP."
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Built for the Heart of Special Education
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Person-First Language</h3>
              <p className="text-gray-600">
                Always puts the person before their disability, using respectful, empowering terminology
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-teal-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">IEP & Legal Compliance</h3>
              <p className="text-gray-600">
                Understands legal requirements, IDEA guidelines, and proper documentation
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Privacy & Sensitivity</h3>
              <p className="text-gray-600">
                FERPA compliant with extra care for sensitive special education information
              </p>
            </div>
          </div>

          <div className="mt-12 bg-white rounded-xl p-8 shadow-sm">
            <h3 className="text-xl font-semibold text-center text-gray-900 mb-6">
              Supporting all areas of special education:
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-center">
              <div className="p-4 bg-emerald-50 rounded-lg">
                <strong>Learning Disabilities</strong>
              </div>
              <div className="p-4 bg-teal-50 rounded-lg">
                <strong>Autism Spectrum</strong>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg">
                <strong>Behavioral Support</strong>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <strong>Multiple Disabilities</strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What SEND Teachers Are Saying
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <Card className="p-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="font-bold text-emerald-600">LM</span>
                </div>
                <div>
                  <div className="flex items-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4">
                    "This AI understands the sensitivity needed in SEND communication. It helps me write IEP reports that celebrate progress while honestly addressing needs. Parents have commented on how respectful and hope-filled our communications have become."
                  </p>
                  <div className="text-sm text-gray-500">
                    <strong>Dr. Lisa M.</strong> - Special Education Coordinator, Austin ISD
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="font-bold text-teal-600">KR</span>
                </div>
                <div>
                  <div className="flex items-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4">
                    "As someone who works with students with autism, I'm impressed by the AI's understanding of neurodiversity. It helps me communicate about behaviors and needs without stigmatizing language. It's like having a colleague who really gets it."
                  </p>
                  <div className="text-sm text-gray-500">
                    <strong>Kevin R.</strong> - Autism Support Teacher, Phoenix Elementary
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
              SEND Teacher FAQs
            </h2>
          </div>

          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="font-semibold text-gray-900 mb-2">
                Is it trained on person-first language and SEND best practices?
              </h3>
              <p className="text-gray-600">
                Yes! The AI is specifically trained on inclusive language, person-first terminology, and special education best practices. It understands the importance of respectful, empowering communication.
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold text-gray-900 mb-2">
                Can it help with IEP documentation and progress reports?
              </h3>
              <p className="text-gray-600">
                Absolutely. The AI understands IEP structure, legal requirements, and can help create comprehensive progress reports that meet documentation standards while maintaining a strength-based approach.
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold text-gray-900 mb-2">
                Is it FERPA compliant for sensitive student information?
              </h3>
              <p className="text-gray-600">
                Yes, we're FERPA and GDPR compliant. The AI doesn't store student information and is designed with extra privacy protections appropriate for sensitive special education communications.
              </p>
            </Card>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-gradient-to-r from-emerald-600 to-teal-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Communicate with Confidence and Care
          </h2>
          <p className="text-xl mb-8 text-emerald-100">
            Join 1,500+ special education teachers who trust our AI for sensitive, professional communication
          </p>
          
          <div className="max-w-md mx-auto">
            <BrevoForm
              title="Start Your Free Trial"
              description="See how it supports your SEND practice"
              buttonText="Try Free for 7 Days"
              source="special_education_landing"
              tags={['special_education', 'send_teachers', 'iep_support', 'landing_page_signup']}
              className="bg-white text-gray-900 shadow-xl"
            />
          </div>
          
          <div className="mt-8 text-sm text-emerald-100">
            <p>✓ FERPA & GDPR compliant ✓ Person-first language ✓ IEP documentation support</p>
          </div>
        </div>
      </div>
    </div>
  )
}