'use client'

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Download,
  FileText,
  Users,
  BookOpen,
  PenTool,
  CheckCircle2,
  Zap,
  Gift
} from 'lucide-react';

export function FreeResourcesClient() {
  const resourceCategories = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'AI Prompts Collection',
      description: 'Ready-to-use AI prompts for lesson planning, parent communication, and classroom management',
      color: 'from-purple-500 to-pink-500',
      bgColor: 'from-purple-50 to-pink-50',
      downloadUrl: '/downloads/AI_Prompt_Templates_for_Teachers.docx',
      fileName: 'AI_Prompt_Templates_for_Teachers.docx',
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
      downloadUrl: '/downloads/Assessment_Rubrics_and_Templates.docx',
      fileName: 'Assessment_Rubrics_and_Templates.docx',
      resources: [
        'Assessment Rubrics & Templates',
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
      downloadUrl: '/downloads/Teacher_Time_Management_Guide.docx',
      fileName: 'Teacher_Time_Management_Guide.docx',
      resources: [
        'Time Management Strategies',
        'Digital Classroom Setup',
        'Assessment Best Practices',
        'AI Integration Guide'
      ]
    }
  ];

  const individualResources = [
    {
      name: 'Classroom Management Guide',
      description: 'Comprehensive strategies for effective classroom management',
      downloadUrl: '/downloads/Classroom_Management_Guide.docx',
      fileName: 'Classroom_Management_Guide.docx',
      icon: <PenTool className="w-5 h-5" />
    },
    {
      name: 'Lesson Planning Templates',
      description: 'Professional lesson plan templates to streamline your planning',
      downloadUrl: '/downloads/Lesson_Planning_Templates.docx',
      fileName: 'Lesson_Planning_Templates.docx',
      icon: <BookOpen className="w-5 h-5" />
    },
    {
      name: 'Weekly Newsletter Info',
      description: 'Templates and tips for engaging parent newsletters',
      downloadUrl: '/downloads/Weekly_Teacher_Newsletter_Info.docx',
      fileName: 'Weekly_Teacher_Newsletter_Info.docx',
      icon: <FileText className="w-5 h-5" />
    }
  ];

  const handleDownloadAll = () => {
    const allResources = [
      '/downloads/AI_Prompt_Templates_for_Teachers.docx',
      '/downloads/Assessment_Rubrics_and_Templates.docx',
      '/downloads/Teacher_Time_Management_Guide.docx',
      '/downloads/Classroom_Management_Guide.docx',
      '/downloads/Lesson_Planning_Templates.docx',
      '/downloads/Weekly_Teacher_Newsletter_Info.docx'
    ];
    
    allResources.forEach((url, index) => {
      setTimeout(() => {
        const link = document.createElement('a');
        link.href = url;
        link.download = url.split('/').pop() || '';
        link.click();
      }, index * 500); // Stagger downloads by 500ms
    });
  };

  const handleDownload = (url: string, fileName: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.click();
  };

  const handleTryDemo = () => {
    const demoSection = document.getElementById('demo-section');
    if (demoSection) {
      demoSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      // Redirect to homepage with demo section
      window.location.href = '/#demo-section';
    }
  };

  return (
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
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              onClick={handleDownloadAll}
            >
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
                  
                  <Button 
                    className="w-full mt-6" 
                    variant="outline"
                    onClick={() => handleDownload(category.downloadUrl, category.fileName)}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download {category.title}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Individual Resources Section */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
              Additional Resources
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              More specialized tools and templates for your teaching toolkit
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {individualResources.map((resource, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center text-white mr-3">
                      {resource.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">{resource.name}</h3>
                  </div>
                  
                  <p className="text-gray-600 mb-4">{resource.description}</p>
                  
                  <Button 
                    className="w-full" 
                    variant="outline"
                    onClick={() => handleDownload(resource.downloadUrl, resource.fileName)}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Now
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
            <Button 
              size="lg" 
              className="bg-white text-purple-600 hover:bg-gray-100"
              onClick={handleDownloadAll}
            >
              <Download className="w-5 h-5 mr-2" />
              Get All Resources Free
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-purple-600"
              onClick={handleTryDemo}
            >
              <Zap className="w-5 h-5 mr-2" />
              Try AI Demo
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}