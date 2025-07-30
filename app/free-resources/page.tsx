import type { Metadata } from 'next'
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Download,
  FileText,
  Users,
  Lightbulb,
  BookOpen,
  PenTool,
  Star,
  ArrowRight,
  CheckCircle2,
  Zap,
  Gift
} from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Free Teaching Resources - AI Prompts, Templates & Guides',
  description: 'Download free AI prompts, email templates, and teaching guides. Over 50 resources tested by teachers to save you time.',
  alternates: {
    canonical: 'https://zazapromptly.com/free-resources',
  },
  openGraph: {
    title: 'Free Teaching Resources - AI Prompts, Templates & Guides',
    description: 'Download free AI prompts, email templates, and teaching guides. Over 50 resources tested by teachers to save you time.',
    url: 'https://zazapromptly.com/free-resources',
    siteName: 'Zaza Promptly',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@ZazaPromptly',
    title: 'Free Teaching Resources - AI Prompts, Templates & Guides',
    description: 'Download free AI prompts, email templates, and teaching guides. Over 50 resources tested by teachers to save you time.',
  }
};

export default function FreeResourcesPage() {
  const resourceCategories = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'AI Prompts Collection',
      description: 'Ready-to-use AI prompts for lesson planning, parent communication, and classroom management',
      color: 'from-purple-500 to-pink-500',
      bgColor: 'from-purple-50 to-pink-50',
      resources: [
        'Parent Communication Prompts',
        'Lesson Plan Generation Templates',
        'Assessment Creation Prompts',
        'Behavior Management Scripts'
      ]
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: 'Templates & Documents',
      description: 'Professional templates for reports, emails, newsletters, and classroom documents',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'from-blue-50 to-cyan-50',
      resources: [
        'Email Templates Collection',
        'Report Card Comments',
        'Newsletter Templates',
        'Meeting Request Forms'
      ]
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: 'Teaching Guides',
      description: 'Step-by-step guides for integrating AI tools into your teaching workflow',
      color: 'from-green-500 to-emerald-500',
      bgColor: 'from-green-50 to-emerald-50',
      resources: [
        'AI Integration Guide',
        'Time Management Strategies',
        'Digital Classroom Setup',
        'Assessment Best Practices'
      ]
    }
  ];

  return (
    <>
      <Header />
      
      <main className="min-h-screen pt-16 lg:pt-20">
        {/* Hero Section */}
        <section className="py-16 lg:py-24 bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex items-center justify-center mb-6">
              <Gift className="w-8 h-8 text-purple-600 mr-3" />
              <Badge variant="secondary" className="text-purple-700 bg-purple-100 px-4 py-2">
                100% Free Resources
              </Badge>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-800 mb-6">
              Free Teaching{" "}
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Resources
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Download our collection of AI prompts, templates, and guides. 
              All resources are tested by teachers and designed to save you hours of work.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                <Download className="w-5 h-5 mr-2" />
                Download All Resources
              </Button>
              <Button variant="outline" size="lg">
                <Users className="w-5 h-5 mr-2" />
                Join Teacher Community
              </Button>
            </div>
          </div>
        </section>

        {/* Resource Categories */}
        <section className="py-16 lg:py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
                What's Included
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Everything you need to integrate AI into your teaching workflow
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {resourceCategories.map((category, index) => (
                <Card key={index} className="relative overflow-hidden group hover:shadow-xl transition-all duration-300">
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.bgColor} opacity-50`} />
                  <CardContent className="relative p-8">
                    <div className={`w-16 h-16 bg-gradient-to-br ${category.color} rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      {category.icon}
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-800 mb-3">
                      {category.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-6">
                      {category.description}
                    </p>
                    
                    <div className="space-y-3">
                      {category.resources.map((resource, resourceIndex) => (
                        <div key={resourceIndex} className="flex items-center text-sm">
                          <CheckCircle2 className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                          <span className="text-gray-700">{resource}</span>
                        </div>
                      ))}
                    </div>
                    
                    <Button className="w-full mt-6" variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      Download Category
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 lg:py-24 bg-gradient-to-r from-purple-600 to-pink-600">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Ready to Transform Your Teaching?
            </h2>
            <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
              Download all resources now and join thousands of teachers who are saving time with AI.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
                <Download className="w-5 h-5 mr-2" />
                Get All Resources Free
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600">
                <Zap className="w-5 h-5 mr-2" />
                Try AI Demo
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
}