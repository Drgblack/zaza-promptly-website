import type { Metadata } from 'next'
import { BookOpen, Clock, PenTool, MessageSquare, Star, Users, FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { BrevoForm } from '@/components/brevo-form'

export const metadata: Metadata = {
  title: 'AI Teaching Assistant for Secondary English Teachers | Zaza Promptly',
  description: 'Transform essay feedback and parent communications with AI that understands literature, writing assessment, and secondary English curriculum. Built by PhD educator.',
  keywords: [
    'secondary english teacher AI',
    'essay feedback AI',
    'english literature AI assistant',
    'writing assessment AI',
    'secondary school english',
    'GCSE english AI',
    'A-level english AI'
  ],
  openGraph: {
    title: 'AI Assistant Built for Secondary English Teachers',
    description: 'Get detailed essay feedback and professional parent communications in seconds. AI trained specifically for secondary English education.',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default async function ForSecondaryEnglishPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-purple-600 to-indigo-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="inline-flex items-center mb-6 bg-purple-100 text-purple-800 hover:bg-purple-200">
                <PenTool className="w-4 h-4 mr-2" />
                For Secondary English Teachers
              </Badge>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                The AI That Speaks Literature & Writing
              </h1>
              
              <p className="text-xl md:text-2xl text-purple-100 mb-8 leading-relaxed">
                Stop drowning in essay marking and parent emails. Get sophisticated feedback on student writing and professional communications that understand your curriculum demands.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button 
                  asChild
                  size="lg" 
                  className="bg-white text-purple-700 hover:bg-purple-50 text-lg px-8 py-4"
                >
                  <Link href="/?utm_source=english_landing&utm_medium=hero_cta&utm_campaign=secondary_english">
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
                    See Essay Examples
                  </Link>
                </Button>
              </div>
              
              <div className="flex items-center space-x-6 text-purple-100">
                <div className="flex items-center">
                  <Star className="w-5 h-5 mr-1 text-yellow-300" />
                  <span>4.9/5 rating</span>
                </div>
                <div className="flex items-center">
                  <Users className="w-5 h-5 mr-1" />
                  <span>3,000+ English teachers</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-5 h-5 mr-1" />
                  <span>8+ hours saved weekly</span>
                </div>
              </div>
            </div>
            
            <div className="lg:text-right">
              <div className="bg-white/10 backdrop-blur rounded-xl p-6 border border-white/20">
                <h3 className="text-xl font-semibold mb-4 text-center">Understands Your Subject:</h3>
                <div className="space-y-3 text-purple-100">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-yellow-300 rounded-full mr-3"></div>
                    Literary analysis and interpretation
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-yellow-300 rounded-full mr-3"></div>
                    Writing assessment criteria (GCSE/A-Level)
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-yellow-300 rounded-full mr-3"></div>
                    Academic essay structure and style
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-yellow-300 rounded-full mr-3"></div>
                    Sophisticated vocabulary development
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
                English Teaching Is a Different Beast
              </h2>
              
              <div className="space-y-4 text-lg text-gray-600 mb-8">
                <p>
                  <strong>Your reality:</strong> 150+ students, each submitting essays that need detailed, constructive feedback. Parents want to understand why their child got a B- instead of an A.
                </p>
                <p>
                  <strong>The pressure:</strong> You need to provide sophisticated literary analysis feedback while explaining complex concepts like "critical analysis" and "textual evidence" to concerned parents.
                </p>
                <p>
                  <strong>The workload:</strong> You're staying up until midnight writing meaningful feedback, then crafting diplomatic emails explaining assessment criteria to parents who think their child is the next Shakespeare.
                </p>
              </div>
              
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <h3 className="font-semibold text-red-800 mb-3">The English teacher struggle is real:</h3>
                <div className="space-y-2 text-red-700">
                  <div>❌ Marking essays until midnight every night</div>
                  <div>❌ Explaining complex literary concepts to parents</div>
                  <div>❌ Writing the same feedback over and over</div>
                  <div>❌ Defending grades with detailed explanations</div>
                  <div>❌ Balancing constructive criticism with encouragement</div>
                </div>
              </div>
            </div>
            
            <div>
              <div className="bg-white rounded-xl shadow-lg p-8 border">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">AI that gets English teaching:</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-green-600 font-bold text-sm">✓</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Literary Analysis Expert</h4>
                      <p className="text-gray-600 text-sm">Understands themes, techniques, and textual analysis at secondary level</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-green-600 font-bold text-sm">✓</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Assessment Criteria Fluent</h4>
                      <p className="text-gray-600 text-sm">Trained on GCSE and A-Level marking schemes and grade boundaries</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-green-600 font-bold text-sm">✓</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Academic Sophistication</h4>
                      <p className="text-gray-600 text-sm">Matches the intellectual level expected in secondary English</p>
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
              See It In Action: Real English Feedback
            </h2>
            <p className="text-xl text-gray-600">
              From basic notes to sophisticated literary analysis
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <Card className="overflow-hidden">
              <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-4">
                <h3 className="font-semibold flex items-center">
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Your Quick Note
                </h3>
              </div>
              <CardContent className="p-6">
                <div className="bg-gray-100 p-4 rounded font-mono text-sm">
                  "Good essay on Macbeth. Needs more quotes. Structure could be better. B grade."
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4">
                <h3 className="font-semibold flex items-center">
                  <PenTool className="w-5 h-5 mr-2" />
                  AI-Enhanced Feedback
                </h3>
              </div>
              <CardContent className="p-6">
                <div className="bg-green-50 p-4 rounded font-mono text-sm">
                  "This is a solid analysis of ambition and moral corruption in Macbeth that demonstrates good understanding of the play's central themes. Your exploration of how Shakespeare uses the dagger soliloquy to reveal Macbeth's psychological state shows perceptive insight.

To strengthen this essay further: 1) Integrate more precise textual evidence - for example, when discussing Lady Macbeth's manipulation, consider the specific language she uses in Act 1, Scene 7. 2) Develop your paragraph structure by using clearer topic sentences that directly address the question.

Your conclusion effectively synthesizes your main arguments. With more detailed textual analysis, this has the potential to be A-grade work."
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden lg:col-span-2">
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-4">
                <h3 className="font-semibold">Parent Communication Example</h3>
              </div>
              <CardContent className="p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Your Input:</h4>
                    <div className="bg-gray-100 p-3 rounded text-sm">
                      "Parent concerned about B- grade on Romeo and Juliet essay. Student thinks they deserved an A."
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">AI-Generated Email:</h4>
                    <div className="bg-purple-50 p-3 rounded text-sm">
                      "Dear Mrs. Johnson,

Thank you for reaching out about Emma's recent Romeo and Juliet essay. I'm pleased to discuss her work with you.

Emma's essay demonstrates solid understanding of the play's themes and shows good analytical thinking. Her B- grade reflects several strengths: clear identification of key themes, relevant quotation selection, and coherent argument structure.

To reach A-grade standard, Emma could focus on: deeper critical analysis of Shakespeare's language choices, more sophisticated exploration of dramatic techniques, and stronger integration of context.

Emma is a thoughtful student who engages well with literature. With continued development of these analytical skills, I'm confident she can achieve her target grades.

I'd be happy to discuss specific strategies to support Emma's progress further.

Best regards,
[Your name]"
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Built for the Complexity of English Teaching
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Literary Knowledge Base</h3>
              <p className="text-gray-600">
                Trained on canonical texts, literary techniques, and critical theory
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Assessment Expertise</h3>
              <p className="text-gray-600">
                Understands GCSE, A-Level, and IB assessment criteria and grade descriptors
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-pink-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Time Revolution</h3>
              <p className="text-gray-600">
                Turn 3 hours of marking into 30 minutes of reviewing and personalizing
              </p>
            </div>
          </div>

          <div className="mt-12 bg-white rounded-xl p-8 shadow-sm">
            <h3 className="text-xl font-semibold text-center text-gray-900 mb-6">
              Perfect for all secondary English contexts:
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-center">
              <div className="p-4 bg-purple-50 rounded-lg">
                <strong>GCSE English Literature & Language</strong>
              </div>
              <div className="p-4 bg-indigo-50 rounded-lg">
                <strong>A-Level English Literature</strong>
              </div>
              <div className="p-4 bg-pink-50 rounded-lg">
                <strong>IB English A & B</strong>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg">
                <strong>Creative Writing & Media</strong>
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
              What English Teachers Are Saying
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <Card className="p-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="font-bold text-purple-600">MH</span>
                </div>
                <div>
                  <div className="flex items-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4">
                    "The AI understands literary analysis at a level that actually saves me time rather than creating more work. It can explain complex concepts like dramatic irony and symbolism in ways that both students and parents can understand."
                  </p>
                  <div className="text-sm text-gray-500">
                    <strong>Dr. Michael H.</strong> - Head of English, London Grammar School
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="font-bold text-indigo-600">RC</span>
                </div>
                <div>
                  <div className="flex items-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4">
                    "I teach 120 students across GCSE and A-Level. This AI has transformed my feedback quality while cutting my marking time in half. My students are getting much more detailed, actionable feedback than I could ever provide before."
                  </p>
                  <div className="text-sm text-gray-500">
                    <strong>Rachel C.</strong> - English Teacher, Manchester Academy
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
              English Teacher FAQs
            </h2>
          </div>

          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="font-semibold text-gray-900 mb-2">
                Can it help with both literature and language assessment?
              </h3>
              <p className="text-gray-600">
                Yes! The AI understands both literary analysis and language techniques, helping with creative writing, media studies, and critical analysis across all secondary English subjects.
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold text-gray-900 mb-2">
                Will it understand A-Level complexity?
              </h3>
              <p className="text-gray-600">
                Absolutely. The AI is trained on advanced literary criticism and can handle sophisticated concepts like postcolonial theory, feminist criticism, and complex textual analysis expected at A-Level.
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold text-gray-900 mb-2">
                Can it help explain grades to parents?
              </h3>
              <p className="text-gray-600">
                Yes, one of its strongest features. It can translate technical assessment criteria into parent-friendly explanations while maintaining professional accuracy about why specific grades were awarded.
              </p>
            </Card>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-gradient-to-r from-purple-600 to-indigo-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Reclaim Your Time for What Matters
          </h2>
          <p className="text-xl mb-8 text-purple-100">
            Stop staying up until midnight marking essays. Join 3,000+ English teachers who've revolutionized their feedback process.
          </p>
          
          <div className="max-w-md mx-auto">
            <BrevoForm
              title="Start Your Free Trial"
              description="See how it transforms your English teaching"
              buttonText="Try Free for 7 Days"
              source="secondary_english_landing"
              tags={['secondary_english', 'english_teachers', 'landing_page_signup']}
              className="bg-white text-gray-900 shadow-xl"
            />
          </div>
          
          <div className="mt-8 text-sm text-purple-100">
            <p>✓ 7-day free trial ✓ No credit card required ✓ For GCSE, A-Level & IB teachers</p>
          </div>
        </div>
      </div>
    </div>
  )
}