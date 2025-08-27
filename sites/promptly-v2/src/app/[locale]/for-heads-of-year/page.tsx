import type { Metadata } from 'next'
import { Crown, Clock, Shield, MessageSquare, Star, Users, FileText, Briefcase } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { BrevoForm } from '@/components/brevo-form'

export const metadata: Metadata = {
  title: 'AI Communication Assistant for Heads of Year | Zaza Promptly',
  description: 'Professional communication support for senior school leaders. Handle difficult parent conversations, incident reports, and pastoral communications with AI-powered assistance.',
  keywords: [
    'head of year AI',
    'senior school leadership AI',
    'pastoral care AI',
    'school management communication',
    'parent complaint management',
    'incident report AI',
    'school leadership tools'
  ],
  openGraph: {
    title: 'AI Assistant for Heads of Year & Senior Leaders',
    description: 'Navigate complex parent communications and pastoral responsibilities with AI that understands school leadership challenges.',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default async function ForHeadsOfYearPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-slate-700 to-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="inline-flex items-center mb-6 bg-slate-100 text-slate-800 hover:bg-slate-200">
                <Crown className="w-4 h-4 mr-2" />
                For Heads of Year & Senior Leaders
              </Badge>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Leadership-Level Communication Made Simple
              </h1>
              
              <p className="text-xl md:text-2xl text-slate-100 mb-8 leading-relaxed">
                Handle the most challenging conversations with confidence. Get professional, diplomatic responses for difficult parents, complex incidents, and sensitive pastoral situations.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button 
                  asChild
                  size="lg" 
                  className="bg-white text-slate-700 hover:bg-slate-50 text-lg px-8 py-4"
                >
                  <Link href="/?utm_source=hoy_landing&utm_medium=hero_cta&utm_campaign=heads_of_year">
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
              
              <div className="flex items-center space-x-6 text-slate-100">
                <div className="flex items-center">
                  <Star className="w-5 h-5 mr-1 text-yellow-300" />
                  <span>4.9/5 rating</span>
                </div>
                <div className="flex items-center">
                  <Users className="w-5 h-5 mr-1" />
                  <span>800+ senior leaders</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-5 h-5 mr-1" />
                  <span>6+ hours saved weekly</span>
                </div>
              </div>
            </div>
            
            <div className="lg:text-right">
              <div className="bg-white/10 backdrop-blur rounded-xl p-6 border border-white/20">
                <h3 className="text-xl font-semibold mb-4 text-center">Leadership Communication Skills:</h3>
                <div className="space-y-3 text-slate-100">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-yellow-300 rounded-full mr-3"></div>
                    Diplomatic incident management
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-yellow-300 rounded-full mr-3"></div>
                    Professional complaint responses
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-yellow-300 rounded-full mr-3"></div>
                    Pastoral care communications
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-yellow-300 rounded-full mr-3"></div>
                    Senior leadership tone and authority
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
                You Handle the Toughest Conversations
              </h2>
              
              <div className="space-y-4 text-lg text-gray-600 mb-8">
                <p>
                  <strong>Your reality:</strong> Angry parents demanding explanations. Complex behavioral incidents requiring careful documentation. Sensitive pastoral issues that need just the right words.
                </p>
                <p>
                  <strong>The pressure:</strong> Every communication reflects on the school's reputation. You need to be authoritative yet approachable, firm yet understanding, professional yet human.
                </p>
                <p>
                  <strong>The stakes:</strong> One poorly worded email can escalate into a formal complaint, damage staff morale, or create lasting damage to parent relationships.
                </p>
              </div>
              
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <h3 className="font-semibold text-red-800 mb-3">Leadership communication challenges:</h3>
                <div className="space-y-2 text-red-700">
                  <div>❌ Dealing with aggressive parent complaints</div>
                  <div>❌ Writing sensitive incident reports</div>
                  <div>❌ Managing staff-parent conflict communications</div>
                  <div>❌ Balancing authority with empathy</div>
                  <div>❌ Protecting both students and staff professionally</div>
                </div>
              </div>
            </div>
            
            <div>
              <div className="bg-white rounded-xl shadow-lg p-8 border">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">AI trained for senior leadership:</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-green-600 font-bold text-sm">✓</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Executive-Level Communication</h4>
                      <p className="text-gray-600 text-sm">Authoritative yet diplomatic tone appropriate for senior leadership</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-green-600 font-bold text-sm">✓</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">De-escalation Expertise</h4>
                      <p className="text-gray-600 text-sm">Trained to handle complaints and conflicts with professional diplomacy</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-green-600 font-bold text-sm">✓</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Policy & Legal Awareness</h4>
                      <p className="text-gray-600 text-sm">Understanding of school policies, safeguarding, and educational law</p>
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
              See Leadership Communication in Action
            </h2>
            <p className="text-xl text-gray-600">
              From crisis to resolution with professional authority
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <Card className="overflow-hidden">
              <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-4">
                <h3 className="font-semibold flex items-center">
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Before: Quick Response
                </h3>
              </div>
              <CardContent className="p-6">
                <div className="bg-gray-100 p-4 rounded font-mono text-sm">
                  "I understand you're upset about the detention. The teacher followed school policy. If you have concerns, we can discuss them."
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4">
                <h3 className="font-semibold flex items-center">
                  <Crown className="w-5 h-5 mr-2" />
                  After: Leadership-Level Response
                </h3>
              </div>
              <CardContent className="p-6">
                <div className="bg-green-50 p-4 rounded font-mono text-sm">
                  "Dear Mr. Johnson,

Thank you for bringing your concerns to my attention. I understand how disappointing it must be when you feel your child has been treated unfairly, and I want to assure you that I take all parent concerns seriously.

I have reviewed the incident in detail with the teacher involved. The detention was issued in accordance with our published behavior policy, specifically regarding persistent disruption during lessons. However, I recognize that context matters, and I'd like to better understand your perspective on what happened.

Would you be available for a brief meeting this week? I believe a conversation will help us work together to support [Student name]'s success while maintaining the classroom environment all our students deserve.

I look forward to hearing from you.

Kind regards,
[Your name]
Head of Year 9"
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden lg:col-span-2">
              <div className="bg-gradient-to-r from-slate-500 to-slate-600 text-white p-4">
                <h3 className="font-semibold">Incident Report Example</h3>
              </div>
              <CardContent className="p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Your Notes:</h4>
                    <div className="bg-gray-100 p-3 rounded text-sm">
                      "Fight in corridor during lunch. Two Year 10 students. Need to write it up and contact parents."
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">AI-Generated Report:</h4>
                    <div className="bg-slate-50 p-3 rounded text-sm">
                      "<strong>Incident Report - Physical Altercation</strong>

<strong>Date:</strong> [Date]
<strong>Time:</strong> 12:45 PM
<strong>Location:</strong> Main corridor, near dining hall
<strong>Students Involved:</strong> [Student A], Year 10 / [Student B], Year 10

<strong>Summary:</strong>
A physical altercation occurred between two Year 10 students during the lunch period. The incident was quickly resolved by staff intervention, with both students separated and removed to the pastoral office.

<strong>Action Taken:</strong>
- Both students received immediate support and de-escalation
- Statements taken from witnesses and students involved  
- Parents contacted by phone within 2 hours
- Appropriate sanctions applied as per school behavior policy
- Restorative meeting scheduled for both students

<strong>Follow-up:</strong>
Both students will be monitored closely, and we are working with families to prevent future incidents. This has been logged according to our safeguarding procedures.

<strong>Reported by:</strong> [Your name], Head of Year 10"
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Built for Senior School Leadership
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Crown className="w-8 h-8 text-slate-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Executive Authority</h3>
              <p className="text-gray-600">
                Communications that reflect your leadership position with appropriate gravitas
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">De-escalation Expert</h3>
              <p className="text-gray-600">
                Turn confrontational situations into collaborative problem-solving opportunities
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Policy Compliant</h3>
              <p className="text-gray-600">
                All communications align with safeguarding and educational best practices
              </p>
            </div>
          </div>

          <div className="mt-12 bg-white rounded-xl p-8 shadow-sm">
            <h3 className="text-xl font-semibold text-center text-gray-900 mb-6">
              Covering all aspects of senior leadership communication:
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-center">
              <div className="p-4 bg-slate-50 rounded-lg">
                <strong>Parent Complaints</strong>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg">
                <strong>Incident Reports</strong>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <strong>Pastoral Concerns</strong>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <strong>Staff Communications</strong>
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
              What Senior Leaders Are Saying
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <Card className="p-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="font-bold text-slate-600">AH</span>
                </div>
                <div>
                  <div className="flex items-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4">
                    "This AI has transformed how I handle difficult parent situations. It helps me craft responses that are firm but empathetic, professional but human. The number of complaints that escalate has dropped significantly since I started using it."
                  </p>
                  <div className="text-sm text-gray-500">
                    <strong>Andrew H.</strong> - Head of Year 11, Grammar School, Surrey
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="font-bold text-blue-600">ST</span>
                </div>
                <div>
                  <div className="flex items-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4">
                    "As Deputy Head Pastoral, I deal with some incredibly sensitive situations. This AI understands the nuances of school leadership communication and helps me maintain the right balance of authority and care in every interaction."
                  </p>
                  <div className="text-sm text-gray-500">
                    <strong>Sarah T.</strong> - Deputy Head Pastoral, Independent School, Edinburgh
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
              Senior Leadership FAQs
            </h2>
          </div>

          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="font-semibold text-gray-900 mb-2">
                Will it maintain the authority expected of senior leadership?
              </h3>
              <p className="text-gray-600">
                Yes, the AI is trained to use appropriate executive-level language that maintains your authority while remaining approachable. It understands the balance needed in leadership communication.
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold text-gray-900 mb-2">
                Can it handle complex safeguarding and legal situations?
              </h3>
              <p className="text-gray-600">
                The AI is trained on educational best practices and understands the importance of proper documentation and communication in sensitive situations. It helps ensure your communications are professional and compliant.
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold text-gray-900 mb-2">
                Is it suitable for both pastoral and academic leadership roles?
              </h3>
              <p className="text-gray-600">
                Absolutely. Whether you're dealing with behavior issues, academic concerns, parent complaints, or staff communications, the AI adapts to the full range of senior leadership responsibilities.
              </p>
            </Card>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-gradient-to-r from-slate-700 to-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Lead with Confidence in Every Communication
          </h2>
          <p className="text-xl mb-8 text-slate-100">
            Join 800+ senior leaders who handle challenging conversations with AI-powered professionalism
          </p>
          
          <div className="max-w-md mx-auto">
            <BrevoForm
              title="Start Your Free Trial"
              description="Experience leadership-level communication support"
              buttonText="Try Free for 7 Days"
              source="heads_of_year_landing"
              tags={['heads_of_year', 'senior_leadership', 'pastoral_care', 'landing_page_signup']}
              className="bg-white text-gray-900 shadow-xl"
            />
          </div>
          
          <div className="mt-8 text-sm text-slate-100">
            <p>✓ Executive-level communication ✓ De-escalation expertise ✓ Policy compliant</p>
          </div>
        </div>
      </div>
    </div>
  )
}