import { SEOHead } from "@/components/seo-head"
import { SkipLink } from "@/components/skip-link"
import { AccessibilityAnnouncer } from "@/components/accessibility-announcer"
import { PerformanceMonitor } from "@/components/performance-monitor"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  BookOpen, 
  Download, 
  ExternalLink, 
  FileText, 
  Lightbulb, 
  MessageSquare, 
  Play, 
  Star, 
  Users, 
  Zap,
  Clock,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Heart,
  Target,
  Shield
} from "lucide-react"

export default function FreeResourcesPage() {
  return (
    <>
      <SEOHead pageType="free-resources" />
      <SkipLink />
      <AccessibilityAnnouncer />
      <PerformanceMonitor />

      <Header />

      <main className="min-h-screen pt-16 lg:pt-20">
        {/* Hero Section */}
        <section className="relative py-20 lg:py-32 overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.1),transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.1),transparent_50%)]" />
          </div>

          <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="flex items-center justify-center mb-6">
                <Sparkles className="w-8 h-8 text-purple-500 mr-3" />
                <Badge variant="secondary" className="text-sm font-medium">
                  Free Resources
                </Badge>
                <Sparkles className="w-8 h-8 text-purple-500 ml-3" />
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-800 mb-6">
                Free Resources for{" "}
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Overworked Teachers
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                Time-saving tools, templates, and guides designed specifically for busy educators who want to work smarter, not harder.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <div className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  <span>100% Free</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="w-4 h-4 text-blue-500 mr-2" />
                  <span>Save 5-10 hours per week</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Heart className="w-4 h-4 text-red-500 mr-2" />
                  <span>Teacher-tested</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Start Section */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Start Saving Time Today
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                These resources are designed to help you immediately. No signup required, just download and use.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* AI Prompt Templates */}
              <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-purple-200">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                      <Zap className="w-6 h-6 text-white" />
                    </div>
                    <Badge variant="outline" className="text-xs">Most Popular</Badge>
                  </div>
                  <CardTitle className="text-xl">AI Prompt Templates</CardTitle>
                  <CardDescription>
                    50+ ready-to-use prompts for lesson planning, feedback, and communication
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      <span>Lesson planning prompts</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      <span>Student feedback templates</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      <span>Parent communication scripts</span>
                    </div>
                  </div>
                  <Button 
                    className="w-full mt-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                    onClick={() => {
                      const link = document.createElement('a');
                      link.href = '/downloads/ai-prompt-templates.md';
                      link.download = 'AI-Prompt-Templates-for-Teachers.md';
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                    }}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Templates
                  </Button>
                </CardContent>
              </Card>

              {/* Time Management Guide */}
              <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-blue-200">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">Time Management Guide</CardTitle>
                  <CardDescription>
                    Proven strategies to reclaim 2-3 hours daily without sacrificing quality
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      <span>Priority setting framework</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      <span>Batch processing techniques</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      <span>Digital organization systems</span>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    className="w-full mt-4 border-blue-500 text-blue-600 hover:bg-blue-50"
                    onClick={() => {
                      const link = document.createElement('a');
                      link.href = '/downloads/time-management-guide.md';
                      link.download = 'Time-Management-Guide-for-Teachers.md';
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                    }}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Get the Guide
                  </Button>
                </CardContent>
              </Card>

              {/* Assessment Templates */}
              <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-green-200">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">Assessment Templates</CardTitle>
                  <CardDescription>
                    Rubrics, checklists, and evaluation forms for all subjects and grade levels
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      <span>Standards-aligned rubrics</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      <span>Self-assessment tools</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      <span>Progress tracking forms</span>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    className="w-full mt-4 border-green-500 text-green-600 hover:bg-green-50"
                    onClick={() => {
                      const link = document.createElement('a');
                      link.href = '/downloads/assessment-templates.md';
                      link.download = 'Assessment-Templates-for-Teachers.md';
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                    }}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Templates
                  </Button>
                </CardContent>
              </Card>

              {/* Classroom Management Guide */}
              <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-orange-200">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">Classroom Management</CardTitle>
                  <CardDescription>
                    Proven strategies for creating a positive, productive learning environment
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      <span>Behavior management strategies</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      <span>Student engagement techniques</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      <span>Parent communication templates</span>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    className="w-full mt-4 border-orange-500 text-orange-600 hover:bg-orange-50"
                    onClick={() => {
                      const link = document.createElement('a');
                      link.href = '/downloads/classroom-management-guide.md';
                      link.download = 'Classroom-Management-Guide.md';
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                    }}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Get the Guide
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* AI Tools Section */}
        <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Free AI Tools for Teachers
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Discover AI tools that actually save time and reduce stress. No complex setup required.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Zaza Promptly Demo */}
              <Card className="group hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                      <MessageSquare className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">Zaza Promptly</CardTitle>
                      <Badge variant="secondary" className="text-xs">Free Demo</Badge>
                    </div>
                  </div>
                  <CardDescription>
                    Generate personalized student feedback in seconds, not hours
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Star className="w-4 h-4 text-yellow-500 mr-2" />
                      <span>Save 15-20 minutes per feedback</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Star className="w-4 h-4 text-yellow-500 mr-2" />
                      <span>Multiple tone options</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Star className="w-4 h-4 text-yellow-500 mr-2" />
                      <span>Standards-aligned suggestions</span>
                    </div>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                    <Play className="w-4 h-4 mr-2" />
                    Try Demo
                  </Button>
                </CardContent>
              </Card>

              {/* AI Lesson Planner */}
              <Card className="group hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">AI Lesson Planner</CardTitle>
                      <Badge variant="secondary" className="text-xs">Free Download</Badge>
                    </div>
                  </div>
                  <CardDescription>
                    Comprehensive lesson planning templates with AI integration
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Star className="w-4 h-4 text-yellow-500 mr-2" />
                      <span>Standards integration</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Star className="w-4 h-4 text-yellow-500 mr-2" />
                      <span>Differentiation suggestions</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Star className="w-4 h-4 text-yellow-500 mr-2" />
                      <span>Assessment alignment</span>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    className="w-full border-blue-500 text-blue-600 hover:bg-blue-50"
                    onClick={() => {
                      const link = document.createElement('a');
                      link.href = '/downloads/lesson-planning-templates.md';
                      link.download = 'Lesson-Planning-Templates.md';
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                    }}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Templates
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Community & Support */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Join Our Teacher Community
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Connect with other educators, share resources, and get support when you need it most.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Facebook Group */}
              <Card className="group hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">Facebook Community</CardTitle>
                  <CardDescription>
                    Join 5,000+ teachers sharing tips and resources
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full border-blue-500 text-blue-600 hover:bg-blue-50">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Join Group
                  </Button>
                </CardContent>
              </Card>

              {/* Weekly Newsletter */}
              <Card className="group hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">Weekly Newsletter</CardTitle>
                  <CardDescription>
                    Get the latest AI tools and time-saving tips
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                    onClick={() => {
                      const link = document.createElement('a');
                      link.href = '/downloads/weekly-newsletter-signup.md';
                      link.download = 'Weekly-Newsletter-Signup.md';
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                    }}
                  >
                    <ArrowRight className="w-4 h-4 mr-2" />
                    Subscribe Free
                  </Button>
                </CardContent>
              </Card>

              {/* Support Chat */}
              <Card className="group hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                    <MessageSquare className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">Teacher Support</CardTitle>
                  <CardDescription>
                    Get help with AI tools and teaching challenges
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full border-green-500 text-green-600 hover:bg-green-50">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Start Chat
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-purple-600 to-pink-600">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Transform Your Teaching?
            </h2>
            <p className="text-xl text-purple-100 mb-8">
              Join thousands of teachers who've already discovered their AI superpower
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 font-semibold">
                <Zap className="w-5 h-5 mr-2" />
                Start Free Trial
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600">
                <Play className="w-5 h-5 mr-2" />
                Watch Demo
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
} 