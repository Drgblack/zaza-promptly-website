import { Metadata } from 'next';
import { externalLinks } from '../../utils/linkMap';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Sparkles, 
  MessageSquare, 
  Image, 
  Users, 
  Presentation, 
  Brain, 
  Zap, 
  Star,
  ArrowRight,
  CheckCircle,
  Clock,
  Target
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'AI Teaching Tools - Zaza Technologies',
  description: 'Discover our complete suite of AI-powered teaching tools designed to transform education and save teachers time.',
  keywords: 'AI teaching tools, educational technology, teacher productivity, AI feedback, lesson planning',
};

const products = [
  {
    id: 'promptly',
    name: 'Zaza Promptly',
    tagline: 'AI-Powered Student Feedback',
    description: 'Transform student observations into meaningful, personalized feedback in seconds. Save hours every week with intelligent feedback generation.',
    icon: MessageSquare,
    color: 'from-purple-500 to-pink-500',
    bgColor: 'bg-gradient-to-br from-purple-50 to-pink-50',
    features: [
      'Multiple feedback tones (encouraging, constructive, formal, warm)',
      'Context-aware feedback generation',
      'Time-saving automation',
      'Professional language optimization'
    ],
    status: 'Live',
    statusColor: 'bg-green-500',
    link: externalLinks.promptly,
    popular: true
  },
  {
    id: 'teach',
    name: 'Zaza Teach',
    tagline: 'AI Lesson Planning Assistant',
    description: 'Create engaging, standards-aligned lesson plans in minutes. Our AI understands curriculum requirements and student needs.',
    icon: Brain,
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-gradient-to-br from-blue-50 to-cyan-50',
    features: [
      'Standards-aligned lesson planning',
      'Differentiation strategies',
      'Assessment integration',
      'Resource recommendations'
    ],
    status: 'Live',
    statusColor: 'bg-green-500',
    link: externalLinks.teach,
    popular: false
  },
  {
    id: 'visuals',
    name: 'Zaza Visuals',
    tagline: 'AI-Generated Educational Graphics',
    description: 'Create stunning visual aids, diagrams, and educational graphics instantly. Perfect for presentations and student materials.',
    icon: Image,
    color: 'from-emerald-500 to-teal-500',
    bgColor: 'bg-gradient-to-br from-emerald-50 to-teal-50',
    features: [
      'Custom educational graphics',
      'Multiple visual styles',
      'Subject-specific templates',
      'High-resolution exports'
    ],
    status: 'Coming Soon',
    statusColor: 'bg-orange-500',
    link: '#',
    popular: false
  },
  {
    id: 'coach',
    name: 'Zaza Coach',
    tagline: 'AI Teaching Mentor',
    description: 'Get personalized coaching and professional development guidance. Improve your teaching practice with AI-powered insights.',
    icon: Users,
    color: 'from-indigo-500 to-purple-500',
    bgColor: 'bg-gradient-to-br from-indigo-50 to-purple-50',
    features: [
      'Personalized coaching sessions',
      'Teaching strategy recommendations',
      'Professional development tracking',
      'Peer collaboration tools'
    ],
    status: 'Coming Soon',
    statusColor: 'bg-orange-500',
    link: '#',
    popular: false
  },
  {
    id: 'schwoop',
    name: 'Zaza Schwoop',
    tagline: 'AI Student Engagement Platform',
    description: 'Boost student engagement with interactive AI-powered activities and assessments that adapt to individual learning styles.',
    icon: Target,
    color: 'from-rose-500 to-pink-500',
    bgColor: 'bg-gradient-to-br from-rose-50 to-pink-50',
    features: [
      'Adaptive learning activities',
      'Real-time engagement tracking',
      'Gamified assessments',
      'Student progress analytics'
    ],
    status: 'Coming Soon',
    statusColor: 'bg-orange-500',
    link: '#',
    popular: false
  },
  {
    id: 'clarity-deck',
    name: 'Zaza Clarity Deck',
    tagline: 'AI Presentation Builder',
    description: 'Create compelling educational presentations with AI assistance. Professional slides that engage and inform your audience.',
    icon: Presentation,
    color: 'from-amber-500 to-orange-500',
    bgColor: 'bg-gradient-to-br from-amber-50 to-orange-50',
    features: [
      'AI-powered slide generation',
      'Educational templates',
      'Content optimization',
      'Presentation analytics'
    ],
    status: 'Coming Soon',
    statusColor: 'bg-orange-500',
    link: '#',
    popular: false
  }
];

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.1),transparent_50%)]" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <Sparkles className="w-8 h-8 text-indigo-500 mr-3" />
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-800">
                Our AI Teaching
                <span className="block bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Tool Suite
                </span>
              </h1>
              <Sparkles className="w-8 h-8 text-purple-500 ml-3" />
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Discover our complete collection of AI-powered tools designed to transform your teaching experience and save you hours every week.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold px-8 py-4 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200">
                Start Free Trial
              </Button>
              <Button variant="outline" className="border-2 border-indigo-500 text-indigo-600 hover:bg-indigo-50 font-semibold px-8 py-4 rounded-full">
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="relative py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => {
              const IconComponent = product.icon;
              return (
                <Card 
                  key={product.id} 
                  className={`relative overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 ${
                    product.popular ? 'ring-2 ring-purple-500' : ''
                  }`}
                >
                  {product.popular && (
                    <div className="absolute top-4 right-4 z-10">
                      <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">
                        <Star className="w-3 h-3 mr-1" />
                        Most Popular
                      </Badge>
                    </div>
                  )}
                  
                  <div className={`${product.bgColor} p-6`}>
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 bg-gradient-to-r ${product.color} rounded-xl shadow-lg flex items-center justify-center`}>
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <Badge className={`${product.statusColor} text-white border-0`}>
                        {product.status}
                      </Badge>
                    </div>
                    
                    <CardHeader className="p-0">
                      <CardTitle className="text-2xl font-bold text-gray-800 mb-2">
                        {product.name}
                      </CardTitle>
                      <CardDescription className="text-lg font-semibold text-gray-600 mb-3">
                        {product.tagline}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent className="p-0">
                      <p className="text-gray-600 mb-6 leading-relaxed">
                        {product.description}
                      </p>
                      
                      <div className="space-y-3 mb-6">
                        {product.features.map((feature, index) => (
                          <div key={index} className="flex items-start space-x-3">
                            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-700">{feature}</span>
                          </div>
                        ))}
                      </div>
                      
                      <Button 
                        className={`w-full bg-gradient-to-r ${product.color} hover:opacity-90 text-white font-semibold py-3 rounded-xl shadow-lg transition-all duration-200`}
                        disabled={product.status === 'Coming Soon'}
                        asChild={product.status !== 'Coming Soon'}
                      >
                        {product.status === 'Coming Soon' ? (
                          <span className="flex items-center justify-center">
                            <Clock className="w-4 h-4 mr-2" />
                            Coming Soon
                          </span>
                        ) : (
                          <a href={product.link} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                            Try {product.name}
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </a>
                        )}
                      </Button>
                    </CardContent>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl p-8 lg:p-12 text-center text-white">
            <Zap className="w-12 h-12 mx-auto mb-6 text-yellow-300" />
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Ready to Transform Your Teaching?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of educators who are already saving hours every week with our AI tools.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-white text-indigo-600 hover:bg-gray-100 font-semibold px-8 py-4 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200">
                Start Free Trial
              </Button>
              <Button variant="outline" className="border-2 border-white text-white hover:bg-white/10 font-semibold px-8 py-4 rounded-full">
                Schedule Demo
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 