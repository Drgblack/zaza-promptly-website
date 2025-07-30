import type { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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
                <img
                  src="/images/founder.jpg"
                  alt="Dr. Greg Blackburn – Founder of Zaza Technologies"
                  className="w-40 h-40 sm:w-48 sm:h-48 lg:w-56 lg:h-56 rounded-full object-cover shadow-xl border-4 border-white ring-4 ring-indigo-100"
                  loading="eager"
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
                      His career began far from the classroom – in a paint factory in Hobart, Tasmania – but after studying in Germany and Australia, Greg went on to lead global learning and development at major organisations, publish widely in educational technology, and earn a PhD focused on critical thinking in eLearning.
                    </p>
                    
                    <p>
                      Zaza was born out of a frustration with clunky, time-wasting EdTech and a desire to help teachers thrive again. Greg's unique blend of practical teaching empathy and deep technical expertise powers every Zaza product. He's on a mission to build a teacher-first AI ecosystem that genuinely makes a difference.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Credentials & Experience Section */}
        <section className="py-16 lg:py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
                Experience & Credentials
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Two decades of expertise in education, technology, and leadership
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="group hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
                    <GraduationCap className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">PhD Educator</h3>
                  <p className="text-gray-600">PhD focused on critical thinking in eLearning, with extensive academic research and publications</p>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
                    <Globe className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Global Experience</h3>
                  <p className="text-gray-600">Led global learning and development at major organisations across multiple continents</p>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
                    <Users className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">20+ Years EdTech</h3>
                  <p className="text-gray-600">Over two decades of experience in digital learning and instructional design</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Mission & Vision Section */}
        <section className="py-16 lg:py-24 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
                The Mission Behind Zaza
              </h2>
              <p className="text-xl text-gray-600">
                Building a teacher-first AI ecosystem that genuinely makes a difference
              </p>
            </div>

            <Card className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
              <CardContent className="p-8 lg:p-12">
                <div className="text-center">
                  <Lightbulb className="w-16 h-16 mx-auto mb-6 opacity-90" />
                  <blockquote className="text-xl lg:text-2xl font-medium mb-6 italic">
                    "Zaza was born out of a frustration with clunky, time-wasting EdTech and a desire to help teachers thrive again."
                  </blockquote>
                  <p className="text-lg opacity-90">
                    Greg's unique blend of practical teaching empathy and deep technical expertise powers every Zaza product, creating tools that teachers actually want to use.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 lg:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-6">
              Ready to Experience the Difference?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Discover the AI tools built by educators, for educators. Join thousands of teachers already saving time with Zaza.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                asChild
              >
                <Link href="/">
                  <ArrowRight className="w-5 h-5 mr-2" />
                  Try Zaza Promptly
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                asChild
              >
                <Link href="/free-resources">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Free Resources
                </Link>
              </Button>
            </div>
          </div>
        </section>
    </div>
  );
} 