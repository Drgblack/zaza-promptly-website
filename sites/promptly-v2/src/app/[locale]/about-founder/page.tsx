import type { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FounderImage } from '@/components/FounderImage';
import Image from 'next/image';
import { 
  GraduationCap,
  Award,
  Globe,
  BookOpen,
  Users,
  Lightbulb,
  ArrowRight,
  Mail,
  Linkedin
} from 'lucide-react';
import Link from 'next/link';
import { StructuredData } from '@/components/structured-data';
import { generateAuthorSchema } from '@/lib/structured-data';

export const metadata: Metadata = {
  title: 'About the Founder | Dr. Greg Blackburn - Zaza Technologies',
  description: 'Meet Dr. Greg Blackburn, PhD-qualified educator and founder of Zaza Technologies. Over 20 years of EdTech experience building AI tools for teachers worldwide.',
  keywords: 'Dr Greg Blackburn, Zaza Technologies founder, EdTech expert, AI education pioneer, PhD educator, digital learning',
  openGraph: {
    title: 'About the Founder - Dr. Greg Blackburn | Zaza Technologies',
    description: 'Meet Dr. Greg Blackburn, the visionary founder behind Zaza Technologies\' revolutionary AI teaching tools.',
    type: 'website',
    url: 'https://zazapromptly.com/about-founder',
    images: ['/images/founder.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About the Founder - Dr. Greg Blackburn | Zaza Technologies',
    description: 'Meet Dr. Greg Blackburn, the visionary founder behind Zaza Technologies\' revolutionary AI teaching tools.',
    images: ['/images/founder.jpg'],
  },
  alternates: {
    canonical: 'https://zazapromptly.com/about-founder',
  },
};

export default function AboutFounderPage() {
  const siteUrl = 'https://zazapromptly.com'
  
  // Generate structured data for the founder
  const authorSchema = generateAuthorSchema({
    name: 'Dr. Greg Blackburn',
    url: `${siteUrl}/about-founder`
  }, siteUrl)

  return (
    <div className="pt-16 lg:pt-20">
      <StructuredData data={authorSchema} />
        {/* Hero Section */}
        <section className="py-16 lg:py-24 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <Badge variant="secondary" className="text-indigo-700 bg-indigo-100 px-4 py-2 mb-6">
                Meet the Founder
              </Badge>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-800 mb-6">
                About the{" "}
                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Founder
                </span>
              </h1>
            </div>

            {/* Founder Image */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                <Image 
                  src="/images/founder.jpg" 
                  alt="Dr Greg Blackburn, Founder of Zaza Technologies" 
                  width={180} 
                  height={180} 
                  className="rounded-full shadow-xl border-4 border-white ring-4 ring-indigo-100 object-cover" 
                  priority
                />
                <div className="absolute -bottom-3 -right-3 w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                  <GraduationCap className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                </div>
              </div>
            </div>

            {/* Main Content */}
            <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0">
              <CardContent className="p-8 lg:p-12">
                <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Dr. Greg Blackburn</h2>
                  
                  <p className="text-xl text-gray-600 mb-6 text-center italic">
                    PhD-qualified educator, EdTech expert, and founder of Zaza Technologies
                  </p>
                  
                  <div className="space-y-6 text-lg">
                    <p>
                      Dr. Greg Blackburn is a globally recognised EdTech expert, PhD-qualified educator, and founder of Zaza Technologies. With over 20 years of experience in digital learning and instructional design, Greg has built tools used by thousands of teachers worldwide.
                    </p>
                    
                    <p>
                      His mission is simple: to give teachers back their time so they can focus on what they do best - inspiring and educating the next generation.
                    </p>
                    
                    <p>
                      Before founding Zaza Technologies, Greg spent years in classrooms, educational leadership roles, and EdTech companies, gaining deep insights into the challenges teachers face daily. This experience drives his commitment to creating AI-powered solutions that actually work for educators.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Experience Section */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Experience & Expertise</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <GraduationCap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Education</h3>
                <p className="text-gray-600">PhD in Educational Technology</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Experience</h3>
                <p className="text-gray-600">20+ years in EdTech</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Impact</h3>
                <p className="text-gray-600">Supporting 12,000+ teachers globally</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Lightbulb className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Innovation</h3>
                <p className="text-gray-600">Pioneer in AI-powered education tools</p>
              </div>
            </div>
          </div>  
        </section>

        {/* Contact Section */}
        <section className="py-16 bg-gradient-to-br from-gray-50 to-indigo-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Get in Touch</h2>
            <p className="text-xl text-gray-600 mb-8">
              Interested in learning more about Zaza Technologies or discussing educational innovation?
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-indigo-600 hover:bg-indigo-700">
                <Link href="mailto:help@zazatechnologies.com">
                  <Mail className="w-5 h-5 mr-2" />
                  Connect via Email
                </Link>
              </Button>
              
              <Button asChild variant="outline" size="lg" className="border-indigo-600 text-indigo-600 hover:bg-indigo-50">
                <Link href="https://linkedin.com/in/gregblackburn" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="w-5 h-5 mr-2" />
                  View LinkedIn Profile
                </Link>
              </Button>
            </div>
          </div>
        </section>
    </div>
  )
}