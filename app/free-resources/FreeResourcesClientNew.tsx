'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { EmailCaptureForm } from '@/components/EmailCaptureForm'
import { useAnalytics } from '@/hooks/useAnalytics'
import { 
  Download,
  FileText,
  Users,
  BookOpen,
  PenTool,
  CheckCircle2,
  Zap,
  Gift,
  ArrowRight,
  Sparkles,
  Clock,
  Star
} from 'lucide-react'

export function FreeResourcesClientNew() {
  const { trackEvent } = useAnalytics()

  // Featured resource
  const featuredResource = {
    name: 'Complete AI Prompts Collection',
    tagline: 'Most Popular Resource',
    description: 'Ready-to-use AI prompts for lesson planning, parent communication, and classroom management. Used by 2,000+ teachers.',
    category: 'AI Tools',
    downloadUrl: '/downloads/AI_Prompt_Templates_for_Teachers.docx',
    fileName: 'AI_Prompt_Templates_for_Teachers.docx',
    icon: Zap,
    downloads: '2,000+',
    image: '/images/ai-prompts-preview.png' // placeholder
  }

  // Resource categories with new structure
  const resourceCategories = [
    {
      name: 'AI Prompts Collection',
      category: 'AI Tools',
      description: 'Professional AI prompts for lesson planning, parent emails, and assessment creation.',
      teaser: 'Save 3+ hours weekly with proven prompts that sound like you.',
      downloadUrl: '/downloads/AI_Prompt_Templates_for_Teachers.docx',
      fileName: 'AI_Prompt_Templates_for_Teachers.docx',
      icon: Zap,
      color: 'from-purple-600 to-indigo-700',
      downloads: '2,000+'
    },
    {
      name: 'Assessment Templates',
      category: 'Assessment',
      description: 'Complete rubrics, templates, and report card comment banks for all subjects.',
      teaser: 'Professional assessments ready to use in any classroom setting.',
      downloadUrl: '/downloads/Assessment_Rubrics_and_Templates.docx',
      fileName: 'Assessment_Rubrics_and_Templates.docx',
      icon: FileText,
      color: 'from-blue-600 to-cyan-700',
      downloads: '1,500+'
    },
    {
      name: 'Time Management Guide',
      category: 'Productivity',
      description: 'Step-by-step strategies to reclaim your evenings and weekends.',
      teaser: 'Proven methods used by top-performing teachers worldwide.',
      downloadUrl: '/downloads/Teacher_Time_Management_Guide.docx',
      fileName: 'Teacher_Time_Management_Guide.docx',
      icon: Clock,
      color: 'from-green-600 to-emerald-700',
      downloads: '1,800+'
    },
    {
      name: 'Parent Communication Kit',
      category: 'Communication',
      description: 'Email templates, meeting scripts, and difficult conversation guides.',
      teaser: 'Build stronger parent relationships with professional communication.',
      downloadUrl: '/downloads/Parent_Communication_Templates.docx',
      fileName: 'Parent_Communication_Templates.docx',
      icon: Users,
      color: 'from-orange-600 to-red-700',
      downloads: '1,200+'
    },
    {
      name: 'Lesson Planning Templates',
      category: 'Lesson Planning',
      description: 'Professional templates for daily, weekly, and unit planning.',
      teaser: 'Streamline your planning with curriculum-aligned templates.',
      downloadUrl: '/downloads/Lesson_Planning_Templates.docx',
      fileName: 'Lesson_Planning_Templates.docx',
      icon: BookOpen,
      color: 'from-teal-600 to-blue-700',
      downloads: '1,600+'
    },
    {
      name: 'Classroom Management Toolkit',
      category: 'Management',
      description: 'Behavior systems, routines, and intervention strategies that work.',
      teaser: 'Transform your classroom culture with evidence-based strategies.',
      downloadUrl: '/downloads/Classroom_Management_Guide.docx',
      fileName: 'Classroom_Management_Guide.docx',
      icon: PenTool,
      color: 'from-violet-600 to-purple-700',
      downloads: '1,400+'
    }
  ]

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0
    }
  }

  const handleDownload = (url: string, fileName: string, resourceName: string) => {
    trackEvent('resource_downloaded', {
      resource: resourceName,
      source: 'free_resources_page'
    })
    
    const link = document.createElement('a')
    link.href = url
    link.download = fileName
    link.click()
  }

  const handleFeaturedDownload = () => {
    handleDownload(featuredResource.downloadUrl, featuredResource.fileName, featuredResource.name)
  }

  const handleTryDemo = () => {
    trackEvent('try_demo_clicked', {
      source: 'free_resources_bottom'
    })
    window.location.href = '/#demo-section'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="bg-gradient-to-br from-purple-600 via-indigo-700 to-blue-800 rounded-3xl p-12 md:p-16 relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Background decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-300/10 rounded-full translate-y-24 -translate-x-24" />
            
            <div className="relative z-10">
              <div className="text-center mb-8">
                <motion.div
                  className="inline-flex items-center bg-white/10 rounded-full px-4 py-2 mb-6 backdrop-blur-sm"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                >
                  <Gift className="w-4 h-4 mr-2 text-purple-200" />
                  <span className="text-sm font-medium text-white">100% Free Resources</span>
                </motion.div>
                
                <motion.h1 
                  className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                  Free{' '}
                  <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                    Resources
                  </span>
                </motion.h1>
                
                <motion.p 
                  className="text-xl md:text-2xl text-purple-100 max-w-3xl mx-auto mb-10 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                >
                  AI prompts, templates, and guides tested by 2,000+ teachers to save you hours every week.
                </motion.p>
              </div>

              {/* Hero Stats */}
              <motion.div 
                className="flex flex-wrap justify-center gap-8 text-sm text-purple-200 mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.4 }}
              >
                <div className="flex items-center">
                  <Download className="w-4 h-4 mr-2" />
                  10,000+ downloads
                </div>
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-2" />
                  2,000+ teachers
                </div>
                <div className="flex items-center">
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Classroom tested
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Resource Banner */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="bg-gradient-to-r from-indigo-600 to-purple-700 rounded-3xl p-10 relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16" />
            
            <div className="relative z-10 flex flex-col lg:flex-row items-center">
              <div className="flex-1 text-center lg:text-left mb-8 lg:mb-0">
                <Badge className="bg-yellow-400 text-black font-semibold mb-4 border-0">
                  {featuredResource.tagline}
                </Badge>
                <h2 className="text-4xl font-bold text-white mb-4">
                  {featuredResource.name}
                </h2>
                <p className="text-indigo-100 text-lg mb-6 max-w-2xl">
                  {featuredResource.description}
                </p>
                <div className="flex items-center justify-center lg:justify-start space-x-4 mb-6">
                  <div className="flex items-center text-purple-200">
                    <Download className="w-4 h-4 mr-1" />
                    <span className="text-sm">{featuredResource.downloads} downloads</span>
                  </div>
                  <div className="flex items-center text-purple-200">
                    <Star className="w-4 h-4 mr-1 fill-current" />
                    <span className="text-sm">Top rated</span>
                  </div>
                </div>
                <Button 
                  size="lg"
                  className="bg-white text-indigo-700 hover:bg-gray-100 font-semibold"
                  onClick={handleFeaturedDownload}
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download Free PDF
                </Button>
              </div>
              
              <div className="flex-shrink-0">
                <div className="w-48 h-48 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                  <featuredResource.icon className="w-24 h-24 text-white/80" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              All Resources
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to integrate AI into your teaching workflow and save hours every week.
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {resourceCategories.map((resource) => (
              <motion.article
                key={resource.name}
                className="group cursor-pointer"
                variants={cardVariants}
                transition={{ duration: 0.5, ease: "easeOut" }}
                whileHover={{ 
                  scale: 1.05, 
                  transition: { duration: 0.2 } 
                }}
              >
                <div className="bg-gradient-to-br from-slate-800/90 via-indigo-900/80 to-slate-900/90 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-white/10 transition-all duration-300 group-hover:shadow-2xl group-hover:bg-gradient-to-br group-hover:from-slate-700/90 group-hover:via-indigo-800/80 group-hover:to-slate-800/90">
                  {/* Icon Header */}
                  <div className={`relative h-32 overflow-hidden bg-gradient-to-br ${resource.color} flex items-center justify-center`}>
                    <div className="transform transition-transform duration-500 group-hover:scale-110">
                      <resource.icon className="w-12 h-12 text-white/90" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    
                    {/* Category badge */}
                    <div className="absolute top-3 left-3">
                      <Badge className="bg-white/20 text-white border-white/30 text-xs">
                        {resource.category}
                      </Badge>
                    </div>

                    {/* Downloads count */}
                    <div className="absolute top-3 right-3">
                      <Badge className="bg-green-500/20 text-green-200 border-green-400/30 text-xs">
                        {resource.downloads} downloads
                      </Badge>
                    </div>
                  </div>

                  <div className="p-6">
                    {/* Resource name */}
                    <h3 className="text-2xl font-bold text-white mb-2 leading-tight group-hover:text-purple-200 transition-colors">
                      {resource.name}
                    </h3>
                    
                    {/* Teaser */}
                    <p className="text-purple-200 font-medium text-sm mb-3">
                      {resource.teaser}
                    </p>
                    
                    {/* Description */}
                    <p className="text-slate-300 mb-6 leading-relaxed line-clamp-2">
                      {resource.description}
                    </p>
                    
                    {/* CTA Button */}
                    <Button 
                      className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold"
                      onClick={() => handleDownload(resource.downloadUrl, resource.fileName, resource.name)}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download Free PDF
                    </Button>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Email Signup Banner */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="bg-gradient-to-r from-green-600 to-teal-700 rounded-3xl p-10 text-center relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-teal-300/10 rounded-full translate-y-12 -translate-x-12" />
            
            <div className="relative z-10">
              <Sparkles className="w-12 h-12 text-white mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-white mb-4">
                Get All Future Free Resources
              </h3>
              <p className="text-green-100 text-lg mb-8 max-w-2xl mx-auto">
                Be the first to get new templates, guides, and AI prompts delivered straight to your inbox.
              </p>
              <div className="max-w-md mx-auto">
                <EmailCaptureForm
                  title=""
                  subtitle=""
                  placeholder="Enter your email"
                  buttonText="Get Free Resources"
                  source="free_resources_mid"
                  variant="hero"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex justify-center -space-x-2 mb-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div 
                  key={i}
                  className="w-12 h-12 bg-gradient-to-br from-purple-400 via-blue-400 to-teal-400 rounded-full border-2 border-white"
                />
              ))}
              <div className="w-12 h-12 bg-gray-800 rounded-full border-2 border-white flex items-center justify-center">
                <span className="text-white text-xs font-bold">2k+</span>
              </div>
            </div>
            
            <p className="text-2xl font-bold text-gray-900 mb-4">
              Over 2,000+ teachers downloaded these resources
            </p>
            <p className="text-gray-600 text-lg italic max-w-2xl mx-auto">
              "These templates saved me hours every week. Finally, resources that actually work in real classrooms!"
            </p>
            <p className="text-gray-500 text-sm mt-2">
              — Sarah K., Elementary Teacher
            </p>
          </motion.div>
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 rounded-3xl p-12 text-center relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Background pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(68,68,68,.2)_50%,transparent_75%,transparent_100%)] bg-[length:60px_60px]" />
            
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Ready to{' '}
                <span className="bg-gradient-to-r from-amber-300 to-orange-300 bg-clip-text text-transparent">
                  save time
                </span>{' '}
                teaching?
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed">
                Try our AI assistant and see how it transforms your parent communication and lesson planning.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold px-8 py-4 text-lg shadow-2xl hover:shadow-purple-500/25 transition-all duration-300"
                  onClick={handleTryDemo}
                >
                  <Zap className="w-5 h-5 mr-2" />
                  Try AI Demo
                </Button>
                
                <Button 
                  variant="outline"
                  size="lg" 
                  className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm font-semibold px-8 py-4 text-lg"
                  onClick={() => window.location.href = '/products'}
                >
                  Explore All Tools
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-20 left-10 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl" />
            <div className="absolute top-32 right-20 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl" />
            <div className="absolute bottom-20 left-1/4 w-20 h-20 bg-amber-500/10 rounded-full blur-xl" />
          </motion.div>
        </div>
      </section>
    </div>
  )
}