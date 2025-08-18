import { Metadata } from 'next';
import { linkMap, getLink, externalLinks } from '@/lib/linkMap';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Sparkles, 
  MessageSquare, 
  Brain, 
  Calendar,
  Mail,
  Heart,
  FileText,
  Smile,
  GraduationCap,
  ClipboardList,
  Shield,
  Star,
  ArrowRight,
  CheckCircle,
  Clock,
  Zap
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'AI Teaching Tools | Complete Suite for Educators - Zaza Technologies',
  description: 'Discover our complete suite of AI-powered teaching tools designed to transform education and save teachers time.',
  keywords: 'AI teaching tools, educational technology, teacher productivity, AI feedback, lesson planning, classroom automation',
  openGraph: {
    title: 'AI Teaching Tools Suite - Zaza Technologies',
    description: 'Transform your teaching with our complete collection of AI-powered educational tools and resources.',
    type: 'website',
    url: 'https://zazatechnologies.com/products',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Teaching Tools Suite - Zaza Technologies',
    description: 'Transform your teaching with our complete collection of AI-powered educational tools and resources.',
  },
  alternates: {
    canonical: 'https://zazatechnologies.com/products',
  },
};

const coreTools = [
  {
    id: 'teach',
    name: 'Zaza Teach',
    tagline: 'Your intelligent lesson planning workspace',
    description: 'Plan lessons in seconds, not hours. Zaza Teach uses curriculum-aware AI to generate, adapt, and save lesson plans based on your teaching style and student needs. Built with emotional and creative confidence in mind.',
    icon: Brain,
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-gradient-to-br from-blue-50 to-cyan-50',
    features: [
      'Curriculum-aware AI lesson generation',
      'Adapts to your teaching style and student needs',
      'Built-in emotional and creative confidence support',
      'Save and organize lesson plans effortlessly'
    ],
    status: 'Live',
    statusColor: 'bg-green-500',
    link: externalLinks.teach,
    popular: true
  },
  {
    id: 'promptly',
    name: 'Zaza Promptly',
    tagline: 'Your AI-powered parent communication coach',
    description: 'Say goodbye to message stress. Promptly helps you write clear, professional parent updates—instantly. Includes tone checking, translations, rewrites, and memory so you never repeat yourself.',
    icon: MessageSquare,
    color: 'from-purple-500 to-pink-500',
    bgColor: 'bg-gradient-to-br from-purple-50 to-pink-50',
    features: [
      'Clear, professional parent communication',
      'Tone checking and optimization',
      'Multi-language translation support',
      'Memory system to avoid repetition'
    ],
    status: 'Live',
    statusColor: 'bg-green-500',
    link: externalLinks.promptly,
    popular: true
  }
];

const zazaAgents = [
  {
    id: 'autoplanner',
    name: 'AutoPlanner',
    tagline: 'Plans the week before you\'ve had your first coffee',
    description: 'Auto-generates full weekly lesson plans based on your context. Adjusts to your teaching style, grade level, and upcoming topics. Fully integrated into Zaza Teach.',
    icon: Calendar,
    color: 'from-emerald-500 to-teal-500',
    bgColor: 'bg-gradient-to-br from-emerald-50 to-teal-50',
    features: [
      'Auto-generates complete weekly lesson plans',
      'Context-aware planning based on your needs',
      'Grade level and subject customization',
      'Seamless Zaza Teach integration'
    ],
    status: 'Live',
    statusColor: 'bg-green-500',
    link: '#',
    popular: false
  },
  {
    id: 'zazaconnect',
    name: 'ZazaConnect',
    tagline: 'Email support with memory, tone, and teacher empathy',
    description: 'Handles school inbox chaos. Summarises, drafts replies, remembers prior conversations, and even suggests when to pause or forward.',
    icon: Mail,
    color: 'from-indigo-500 to-purple-500',
    bgColor: 'bg-gradient-to-br from-indigo-50 to-purple-50',
    features: [
      'Intelligent email summarization',
      'Context-aware reply drafting',
      'Conversation memory and tracking',
      'Smart escalation suggestions'
    ],
    status: 'Live',
    statusColor: 'bg-green-500',
    link: '#',
    popular: false
  },
  {
    id: 'reflex',
    name: 'Zaza Reflex',
    tagline: 'Your end-of-day wellbeing companion',
    description: 'Summarises your teaching day, tracks emotional tone, and helps you reflect gently. A micro-coach in your pocket for those long weeks.',
    icon: Heart,
    color: 'from-rose-500 to-pink-500',
    bgColor: 'bg-gradient-to-br from-rose-50 to-pink-50',
    features: [
      'Daily teaching summary and reflection',
      'Emotional tone tracking and insights',
      'Gentle micro-coaching support',
      'Wellbeing trend analysis'
    ],
    status: 'Live',
    statusColor: 'bg-green-500',
    link: '#',
    popular: false
  },
  {
    id: 'subplan',
    name: 'Zaza SubPlan',
    tagline: 'Instant sub plans, even mid-commute',
    description: 'Create ready-to-use emergency lesson plans in seconds when you\'re off sick. Context-aware, standards-aligned, and editable.',
    icon: FileText,
    color: 'from-amber-500 to-orange-500',
    bgColor: 'bg-gradient-to-br from-amber-50 to-orange-50',
    features: [
      'Emergency lesson plans in seconds',
      'Context-aware and standards-aligned',
      'Fully editable and customizable',
      'Ready-to-use substitute materials'
    ],
    status: 'Live',
    statusColor: 'bg-green-500',
    link: '#',
    popular: false
  },
  {
    id: 'zen',
    name: 'Zaza Zen',
    tagline: 'Micro-coaching for stressed teachers',
    description: 'Feeling burnt out? Zen offers calming scripts, boundary language, and quick mindset resets. Think: AI-powered care for teachers, by teachers.',
    icon: Smile,
    color: 'from-violet-500 to-purple-500',
    bgColor: 'bg-gradient-to-br from-violet-50 to-purple-50',
    features: [
      'Calming scripts and mindfulness exercises',
      'Professional boundary language suggestions',
      'Quick mindset reset techniques',
      'AI-powered teacher care and support'
    ],
    status: 'Live',
    statusColor: 'bg-green-500',
    link: '#',
    popular: false
  }
];

const comingSoon = [
  {
    id: 'gradeflow',
    name: 'Zaza GradeFlow',
    tagline: 'Your grading sidekick, tone-aware and standards-smart',
    description: 'Turn rubrics into comment-ready feedback. GradeFlow helps you be fair, fast, and human.',
    icon: GraduationCap,
    color: 'from-cyan-500 to-blue-500',
    bgColor: 'bg-gradient-to-br from-cyan-50 to-blue-50',
    features: [
      'Rubric-to-comment conversion',
      'Tone-aware feedback generation',
      'Standards-aligned assessment support',
      'Fair and consistent grading assistance'
    ],
    status: 'Coming Soon',
    statusColor: 'bg-orange-500',
    link: '#',
    popular: false
  },
  {
    id: 'reportmate',
    name: 'Zaza ReportMate',
    tagline: 'Report comment generation, reimagined',
    description: 'AI-generated report card comments based on strengths, areas for growth, and curriculum language. Parent-ready in minutes.',
    icon: ClipboardList,
    color: 'from-teal-500 to-emerald-500',
    bgColor: 'bg-gradient-to-br from-teal-50 to-emerald-50',
    features: [
      'Strengths-based report card comments',
      'Curriculum-aligned language',
      'Growth-focused feedback',
      'Parent-friendly communication'
    ],
    status: 'Coming Soon',
    statusColor: 'bg-orange-500',
    link: '#',
    popular: false
  },
  {
    id: 'integrityguard',
    name: 'Zaza IntegrityGuard',
    tagline: 'Teach with AI and keep it honest',
    description: 'Helps students use AI responsibly while spotting misuse and coaching better digital integrity.',
    icon: Shield,
    color: 'from-red-500 to-rose-500',
    bgColor: 'bg-gradient-to-br from-red-50 to-rose-50',
    features: [
      'AI misuse detection and prevention',
      'Student digital integrity coaching',
      'Responsible AI usage guidance',
      'Academic honesty support tools'
    ],
    status: 'Coming Soon',
    statusColor: 'bg-orange-500',
    link: '#',
    popular: false
  }
];

function ProductCard({ product, isPopular = false }: { product: any, isPopular?: boolean }) {
  const IconComponent = product.icon;
  
  return (
    <Card 
      className={`relative overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 ${
        isPopular ? 'ring-2 ring-purple-500' : ''
      }`}
    >
      {isPopular && (
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
            asChild={product.status !== 'Coming Soon' && product.link !== '#'}
          >
            {product.status === 'Coming Soon' ? (
              <span className="flex items-center justify-center">
                <Clock className="w-4 h-4 mr-2" />
                Coming Soon
              </span>
            ) : product.link === '#' ? (
              <span className="flex items-center justify-center">
                <Sparkles className="w-4 h-4 mr-2" />
                Available in Zaza Suite
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
}

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

      {/* Core Tools Section */}
      <section className="relative py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
              🧰 Core Tools
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
              Essential AI Tools for Every Teacher
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Your intelligent teaching companions that handle the heavy lifting, so you can focus on what matters most—your students.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {coreTools.map((product) => (
              <ProductCard key={product.id} product={product} isPopular={product.popular} />
            ))}
          </div>
        </div>
      </section>

      {/* Zaza Agents Section */}
      <section className="relative py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-gradient-to-r from-purple-500 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
              🤖 Zaza Agents
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
              Your AI Teaching Assistants
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Specialized AI agents that work behind the scenes to automate your daily teaching tasks and support your wellbeing.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {zazaAgents.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="relative py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-gradient-to-r from-orange-500 to-red-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
              🧪 Coming Soon
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
              Next-Generation Teaching Tools
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Innovative solutions currently in development to further revolutionize your teaching experience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {comingSoon.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
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