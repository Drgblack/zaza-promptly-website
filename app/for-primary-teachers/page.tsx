import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, Star, Users, Clock, BookOpen, Heart } from 'lucide-react'

export const metadata: Metadata = {
  title: 'AI Teaching Assistant for Primary Teachers | Zaza Promptly',
  description: 'Specialized AI tool for elementary and primary school teachers. Generate age-appropriate student comments, parent communications, and reports 10x faster. Built by PhD educator.',
  keywords: [
    'primary teacher AI',
    'elementary teacher assistant', 
    'young learners feedback',
    'primary school reports',
    'age-appropriate comments',
    'elementary education AI'
  ]
}

export default function ForPrimaryTeachersPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16 sm:py-24">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-6">
            <Badge className="bg-white/20 text-white border-white/30 text-lg px-6 py-2">
              <BookOpen className="w-5 h-5 mr-2" />
              For Primary Teachers
            </Badge>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            AI Assistant Built for 
            <span className="block text-yellow-300">Young Learners</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-4xl mx-auto">
            Create age-appropriate student comments, nurturing parent messages, and celebration-focused reports 
            that capture each child's unique progress and personality.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Button size="lg" className="bg-yellow-400 text-blue-900 hover:bg-yellow-300 px-8 py-4 text-lg font-semibold">
              Start Free Trial
              <Star className="ml-2 w-5 h-5" />
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10 px-8 py-4">
              See Sample Comments
            </Button>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-blue-100 text-sm">
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-2" />
              Ages 4-11 specialist
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-2" />
              Positive, nurturing tone
            </div>
            <div className="flex items-center">  
              <CheckCircle className="w-4 h-4 mr-2" />
              Development-focused
            </div>
          </div>
        </div>
      </div>

      {/* Key Features for Primary Teachers */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Designed for Young Learners
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Every feature crafted specifically for primary education, from developmental language to celebration-focused feedback.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-2 border-blue-200 hover:border-blue-400 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Heart className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle className="text-blue-900">Age-Appropriate Language</CardTitle>
                <CardDescription>
                  Comments written in developmentally appropriate language that celebrates growth and effort over perfection.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 border-purple-200 hover:border-purple-400 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Star className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle className="text-purple-900">Celebration-Focused</CardTitle>
                <CardDescription>
                  Highlight each child's unique strengths and progress with positive, encouraging language that builds confidence.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 border-green-200 hover:border-green-400 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle className="text-green-900">Parent Partnership</CardTitle>
                <CardDescription>
                  Foster home-school partnerships with warm, informative messages that engage families in their child's learning journey.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Sample Comments Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Sample Comments for Primary Students
            </h2>
            <p className="text-lg text-gray-600">
              See how our AI captures the wonder and growth of young learners
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="p-6">
              <h3 className="font-semibold text-lg mb-3 text-blue-900">Reading Progress - Year 2</h3>
              <p className="text-gray-700 italic mb-4">
                "Emma has shown wonderful enthusiasm for reading this term. She eagerly participates in guided reading 
                sessions and is beginning to tackle more challenging texts with confidence. Emma particularly enjoys stories 
                about animals and often shares her predictions with the class. Her sight word recognition has improved 
                significantly, and she's developing strategies for sounding out unfamiliar words."
              </p>
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="w-4 h-4 mr-2" />
                Generated in 15 seconds
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold text-lg mb-3 text-purple-900">Mathematics - Reception</h3>
              <p className="text-gray-700 italic mb-4">
                "Jack has made excellent progress with number recognition and counting this term. He confidently counts 
                to 20 and is beginning to understand simple addition using concrete objects. Jack loves our math games 
                and often helps his classmates during number activities. His enthusiasm for problem-solving shines 
                through, especially when working with pattern blocks and shape puzzles."
              </p>
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="w-4 h-4 mr-2" />
                Generated in 12 seconds
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
            Start Your Free Trial Today
          </h2>
          
          <Card className="p-8 border-2 border-blue-200">
            <div className="mb-6">
              <div className="text-4xl font-bold text-blue-900 mb-2">$14.99/month</div>
              <p className="text-gray-600">Perfect for primary teachers</p>
            </div>
            
            <ul className="text-left space-y-3 mb-8">
              <li className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                Unlimited age-appropriate comments
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                Celebration-focused feedback
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                Parent communication templates
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                7-day free trial
              </li>
            </ul>
            
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto px-12">
              Start Free Trial
            </Button>
          </Card>
        </div>
      </section>
    </div>
  )
}