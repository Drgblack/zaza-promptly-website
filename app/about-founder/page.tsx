import type { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { 
  GraduationCap,
  Award,
  Users,
  Lightbulb,
  ArrowRight,
  Mail,
  ExternalLink
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
    images: ['/images/founder.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About the Founder - Dr. Greg Blackburn | Zaza Technologies',
    description: 'Meet Dr. Greg Blackburn, the visionary founder behind Zaza Technologies\' revolutionary AI teaching tools.',
    images: ['/images/founder.png'],
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
                  src="/images/founder.png" 
                  alt="Dr. Greg Blackburn" 
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

        {/* Journey Timeline Section */}
        <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">The Journey</h2>
            
            <div className="space-y-8">
              {/* Timeline Item */}
              <div className="flex flex-col md:flex-row gap-6 relative">
                <div className="md:w-1/3">
                  <div className="sticky top-8">
                    <h3 className="text-xl font-bold text-gray-800 mb-1">Painter's Apprenticeship</h3>
                    <div className="text-indigo-600 font-semibold">1980s</div>
                  </div>
                </div>
                <div className="md:w-2/3 relative">
                  <div className="hidden md:block absolute -left-8 top-2 w-4 h-4 bg-indigo-600 rounded-full"></div>
                  <div className="hidden md:block absolute -left-6 top-6 w-px h-full bg-indigo-200"></div>
                  <Card className="bg-white shadow-md">
                    <CardContent className="p-6">
                      <p className="text-gray-700">Started at Cascade Brewery via father's connection at Tas Paints. Learned perseverance by finishing the trade.</p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Timeline Item */}
              <div className="flex flex-col md:flex-row gap-6 relative">
                <div className="md:w-1/3">
                  <div className="sticky top-8">
                    <h3 className="text-xl font-bold text-gray-800 mb-1">World Travel</h3>
                    <div className="text-indigo-600 font-semibold">Early 1990s</div>
                  </div>
                </div>
                <div className="md:w-2/3 relative">
                  <div className="hidden md:block absolute -left-8 top-2 w-4 h-4 bg-indigo-600 rounded-full"></div>
                  <div className="hidden md:block absolute -left-6 top-6 w-px h-full bg-indigo-200"></div>
                  <Card className="bg-white shadow-md">
                    <CardContent className="p-6">
                      <p className="text-gray-700">Backpacked globally, immersed in new cultures, and realised the power of education.</p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Timeline Item */}
              <div className="flex flex-col md:flex-row gap-6 relative">
                <div className="md:w-1/3">
                  <div className="sticky top-8">
                    <h3 className="text-xl font-bold text-gray-800 mb-1">German Language Course</h3>
                    <div className="text-indigo-600 font-semibold">1994–1995</div>
                  </div>
                </div>
                <div className="md:w-2/3 relative">
                  <div className="hidden md:block absolute -left-8 top-2 w-4 h-4 bg-indigo-600 rounded-full"></div>
                  <div className="hidden md:block absolute -left-6 top-6 w-px h-full bg-indigo-200"></div>
                  <Card className="bg-white shadow-md">
                    <CardContent className="p-6">
                      <p className="text-gray-700">Completed a Diploma in German in Frankfurt, which opened doors to university.</p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Timeline Item */}
              <div className="flex flex-col md:flex-row gap-6 relative">
                <div className="md:w-1/3">
                  <div className="sticky top-8">
                    <h3 className="text-xl font-bold text-gray-800 mb-1">UTAS — Information Systems (Honours)</h3>
                    <div className="text-indigo-600 font-semibold">1995–1999</div>
                  </div>
                </div>
                <div className="md:w-2/3 relative">
                  <div className="hidden md:block absolute -left-8 top-2 w-4 h-4 bg-indigo-600 rounded-full"></div>
                  <div className="hidden md:block absolute -left-6 top-6 w-px h-full bg-indigo-200"></div>
                  <Card className="bg-white shadow-md">
                    <CardContent className="p-6">
                      <p className="text-gray-700">University of Tasmania: Information Systems through to Honours.</p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Timeline Item */}
              <div className="flex flex-col md:flex-row gap-6 relative">
                <div className="md:w-1/3">
                  <div className="sticky top-8">
                    <h3 className="text-xl font-bold text-gray-800 mb-1">MBA — The University of Queensland</h3>
                    <div className="text-indigo-600 font-semibold">2000–2004</div>
                  </div>
                </div>
                <div className="md:w-2/3 relative">
                  <div className="hidden md:block absolute -left-8 top-2 w-4 h-4 bg-indigo-600 rounded-full"></div>
                  <div className="hidden md:block absolute -left-6 top-6 w-px h-full bg-indigo-200"></div>
                  <Card className="bg-white shadow-md">
                    <CardContent className="p-6">
                      <p className="text-gray-700">Master of Business Administration.</p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Timeline Item */}
              <div className="flex flex-col md:flex-row gap-6 relative">
                <div className="md:w-1/3">
                  <div className="sticky top-8">
                    <h3 className="text-xl font-bold text-gray-800 mb-1">PhD — Professional Education</h3>
                    <div className="text-indigo-600 font-semibold">2016–2019</div>
                  </div>
                </div>
                <div className="md:w-2/3 relative">
                  <div className="hidden md:block absolute -left-8 top-2 w-4 h-4 bg-indigo-600 rounded-full"></div>
                  <div className="hidden md:block absolute -left-6 top-6 w-px h-full bg-indigo-200"></div>
                  <Card className="bg-white shadow-md">
                    <CardContent className="p-6">
                      <p className="text-gray-700">City, University of London: research in educational technology and professional development.</p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Timeline Item */}
              <div className="flex flex-col md:flex-row gap-6 relative">
                <div className="md:w-1/3">
                  <div className="sticky top-8">
                    <h3 className="text-xl font-bold text-gray-800 mb-1">Zaza Technologies</h3>
                    <div className="text-indigo-600 font-semibold">2025</div>
                  </div>
                </div>
                <div className="md:w-2/3 relative">
                  <div className="hidden md:block absolute -left-8 top-2 w-4 h-4 bg-indigo-600 rounded-full"></div>
                  <Card className="bg-white shadow-md">
                    <CardContent className="p-6">
                      <p className="text-gray-700">Founded to build teacher-first AI tools, informed by decades of work across education and professional learning.</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Leadership in Learning & Development Section */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Leadership in Learning & Development</h2>
            
            <div className="text-center mb-8">
              <p className="text-xl text-gray-600">
                Work focused on helping educators and teams learn faster, adopt better practices, and turn ideas into classroom impact.
              </p>
            </div>

            <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-100">
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-gray-700">Designs professional learning experiences grounded in evidence and practical tools.</p>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-gray-700">Builds scalable resources that reduce workload and improve feedback quality.</p>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-gray-700">Leads cross-functional edtech projects from research to shipped teacher workflows.</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-gray-700">Partners with educators to co-design safe, school-ready AI practices.</p>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-gray-700">Speaks and writes on teacher workload, AI safety, and professional learning.</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 text-center">
                  <Button asChild variant="outline" className="border-indigo-600 text-indigo-600 hover:bg-indigo-50">
                    <Link href="/promptly">
                      <ArrowRight className="w-4 h-4 mr-2" />
                      Explore how Promptly helps teachers
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
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
                <Link href="mailto:greg@zazatechnologies.com">
                  <Mail className="w-5 h-5 mr-2" />
                  Connect via Email
                </Link>
              </Button>
              
              <Button asChild variant="outline" size="lg" className="border-indigo-600 text-indigo-600 hover:bg-indigo-50">
                <Link href="https://www.linkedin.com/in/drgregblackburn/" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-5 h-5 mr-2" />
                  View LinkedIn Profile
                </Link>
              </Button>
            </div>
          </div>
        </section>
    </div>
  )
}