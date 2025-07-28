import React from 'react'
import { Download, FileText, Video, BookOpen, Users, Star, Clock, CheckCircle } from 'lucide-react'
import { cn } from '../lib/utils'

/**
 * Zaza Free Resources Hub
 * 
 * This component provides educators with high-value, downloadable resources
 * that demonstrate the value of Zaza tools and build trust with potential customers.
 */

interface Resource {
  id: string
  title: string
  description: string
  type: 'template' | 'guide' | 'video' | 'tool' | 'case-study' | 'research'
  category: 'lesson-planning' | 'feedback' | 'assessment' | 'productivity' | 'ai-prompts' | 'templates'
  downloadUrl: string
  fileSize: string
  downloadCount: number
  rating: number
  timeToComplete?: string
  tags: string[]
  featured?: boolean
  new?: boolean
}

const RESOURCES: Resource[] = [
  // Featured Resources
  {
    id: 'ai-comment-bank',
    title: '100 AI-Generated Student Feedback Comments',
    description: 'Ready-to-use, personalized comments for different student types and subjects. Save hours of writing time.',
    type: 'template',
    category: 'feedback',
    downloadUrl: '/resources/ai-comment-bank.pdf',
    fileSize: '2.3 MB',
    downloadCount: 15420,
    rating: 4.9,
    timeToComplete: '5 minutes',
    tags: ['student feedback', 'report writing', 'AI comments', 'personalized'],
    featured: true,
  },
  {
    id: 'lesson-plan-templates',
    title: '50+ Lesson Plan Templates (K-12)',
    description: 'Comprehensive lesson plan templates for all subjects and grade levels. Includes AI prompts for customization.',
    type: 'template',
    category: 'lesson-planning',
    downloadUrl: '/resources/lesson-plan-templates.zip',
    fileSize: '8.7 MB',
    downloadCount: 8920,
    rating: 4.8,
    timeToComplete: '10 minutes',
    tags: ['lesson planning', 'curriculum', 'templates', 'AI prompts'],
    featured: true,
  },
  {
    id: 'ai-prompts-library',
    title: '500+ AI Prompts for Teachers',
    description: 'Curated collection of AI prompts for lesson planning, assessment, feedback, and classroom management.',
    type: 'guide',
    category: 'ai-prompts',
    downloadUrl: '/resources/ai-prompts-library.pdf',
    fileSize: '1.8 MB',
    downloadCount: 12340,
    rating: 4.9,
    timeToComplete: '15 minutes',
    tags: ['AI prompts', 'productivity', 'automation', 'best practices'],
    featured: true,
  },
  {
    id: 'productivity-calculator',
    title: 'Teacher Time-Savings Calculator',
    description: 'Interactive tool to calculate how much time you could save with AI tools. Includes ROI analysis.',
    type: 'tool',
    category: 'productivity',
    downloadUrl: '/resources/productivity-calculator.xlsx',
    fileSize: '456 KB',
    downloadCount: 5670,
    rating: 4.7,
    timeToComplete: '3 minutes',
    tags: ['time savings', 'ROI', 'productivity', 'calculator'],
    featured: true,
  },
  
  // Lesson Planning Resources
  {
    id: 'differentiated-instruction-guide',
    title: 'Differentiated Instruction with AI',
    description: 'Complete guide to using AI for creating differentiated lesson plans and activities.',
    type: 'guide',
    category: 'lesson-planning',
    downloadUrl: '/resources/differentiated-instruction-guide.pdf',
    fileSize: '3.2 MB',
    downloadCount: 3450,
    rating: 4.8,
    tags: ['differentiation', 'inclusive teaching', 'AI planning'],
  },
  {
    id: 'project-based-learning-templates',
    title: 'PBL Templates with AI Integration',
    description: 'Project-based learning templates with AI prompts for student engagement and assessment.',
    type: 'template',
    category: 'lesson-planning',
    downloadUrl: '/resources/pbl-templates.zip',
    fileSize: '5.1 MB',
    downloadCount: 2890,
    rating: 4.6,
    tags: ['PBL', 'project-based learning', 'student engagement'],
  },
  
  // Feedback & Assessment Resources
  {
    id: 'assessment-rubrics',
    title: '100+ Assessment Rubrics',
    description: 'Comprehensive collection of rubrics for all subjects and assessment types.',
    type: 'template',
    category: 'assessment',
    downloadUrl: '/resources/assessment-rubrics.zip',
    fileSize: '4.2 MB',
    downloadCount: 6780,
    rating: 4.7,
    tags: ['assessment', 'rubrics', 'grading', 'evaluation'],
  },
  {
    id: 'parent-communication-templates',
    title: 'Parent Communication Templates',
    description: 'Professional templates for parent emails, newsletters, and conference notes.',
    type: 'template',
    category: 'feedback',
    downloadUrl: '/resources/parent-communication-templates.pdf',
    fileSize: '1.9 MB',
    downloadCount: 4560,
    rating: 4.8,
    tags: ['parent communication', 'emails', 'newsletters'],
  },
  
  // Productivity Resources
  {
    id: 'classroom-management-guide',
    title: 'AI-Powered Classroom Management',
    description: 'Guide to using AI for behavior tracking, communication, and classroom organization.',
    type: 'guide',
    category: 'productivity',
    downloadUrl: '/resources/classroom-management-guide.pdf',
    fileSize: '2.8 MB',
    downloadCount: 2340,
    rating: 4.6,
    tags: ['classroom management', 'behavior', 'organization'],
  },
  {
    id: 'time-management-workbook',
    title: 'Teacher Time Management Workbook',
    description: 'Interactive workbook with exercises and tools to optimize your teaching schedule.',
    type: 'tool',
    category: 'productivity',
    downloadUrl: '/resources/time-management-workbook.pdf',
    fileSize: '3.5 MB',
    downloadCount: 1890,
    rating: 4.7,
    tags: ['time management', 'productivity', 'workbook'],
  },
  
  // Case Studies & Research
  {
    id: 'ai-education-case-studies',
    title: 'AI in Education: 25 Success Stories',
    description: 'Real case studies from teachers who transformed their practice with AI tools.',
    type: 'case-study',
    category: 'productivity',
    downloadUrl: '/resources/ai-education-case-studies.pdf',
    fileSize: '6.8 MB',
    downloadCount: 3450,
    rating: 4.9,
    tags: ['case studies', 'success stories', 'AI transformation'],
  },
  {
    id: 'ai-effectiveness-research',
    title: 'AI Tools in Education: Research Review',
    description: 'Comprehensive review of research on AI effectiveness in educational settings.',
    type: 'research',
    category: 'productivity',
    downloadUrl: '/resources/ai-effectiveness-research.pdf',
    fileSize: '4.5 MB',
    downloadCount: 1230,
    rating: 4.8,
    tags: ['research', 'AI effectiveness', 'education technology'],
  },
  
  // New Resources
  {
    id: 'special-education-ai-guide',
    title: 'AI for Special Education',
    description: 'Specialized guide for using AI tools to support students with diverse learning needs.',
    type: 'guide',
    category: 'lesson-planning',
    downloadUrl: '/resources/special-education-ai-guide.pdf',
    fileSize: '3.1 MB',
    downloadCount: 890,
    rating: 4.9,
    tags: ['special education', 'inclusive teaching', 'diverse learners'],
    new: true,
  },
  {
    id: 'remote-learning-toolkit',
    title: 'Remote Learning AI Toolkit',
    description: 'Complete toolkit for effective remote and hybrid teaching with AI assistance.',
    type: 'tool',
    category: 'productivity',
    downloadUrl: '/resources/remote-learning-toolkit.zip',
    fileSize: '7.2 MB',
    downloadCount: 2340,
    rating: 4.7,
    tags: ['remote learning', 'hybrid teaching', 'digital tools'],
    new: true,
  },
]

const CATEGORIES = [
  { id: 'all', name: 'All Resources', count: RESOURCES.length },
  { id: 'lesson-planning', name: 'Lesson Planning', count: RESOURCES.filter(r => r.category === 'lesson-planning').length },
  { id: 'feedback', name: 'Feedback & Comments', count: RESOURCES.filter(r => r.category === 'feedback').length },
  { id: 'assessment', name: 'Assessment', count: RESOURCES.filter(r => r.category === 'assessment').length },
  { id: 'productivity', name: 'Productivity', count: RESOURCES.filter(r => r.category === 'productivity').length },
  { id: 'ai-prompts', name: 'AI Prompts', count: RESOURCES.filter(r => r.category === 'ai-prompts').length },
  { id: 'templates', name: 'Templates', count: RESOURCES.filter(r => r.type === 'template').length },
]

const TYPE_ICONS = {
  template: FileText,
  guide: BookOpen,
  video: Video,
  tool: Download,
  'case-study': Users,
  research: Star,
}

export function FreeResourcesHub() {
  const [selectedCategory, setSelectedCategory] = React.useState('all')
  const [searchQuery, setSearchQuery] = React.useState('')

  const filteredResources = RESOURCES.filter(resource => {
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  const handleDownload = (resource: Resource) => {
    // Track download analytics
    console.log(`Downloading: ${resource.title}`)
    
    // Create download link
    const link = document.createElement('a')
    link.href = resource.downloadUrl
    link.download = resource.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Free Resources for Educators
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Download thousands of high-quality teaching resources, templates, and guides. 
              All free, all designed to save you time and improve student outcomes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-lg">No registration required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-lg">Instant download</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-lg">Updated weekly</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Stats */}
        <div className="relative bg-white/10 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold">{RESOURCES.length}+</div>
                <div className="text-sm opacity-90">Free Resources</div>
              </div>
              <div>
                <div className="text-3xl font-bold">50K+</div>
                <div className="text-sm opacity-90">Downloads</div>
              </div>
              <div>
                <div className="text-3xl font-bold">4.8</div>
                <div className="text-sm opacity-90">Average Rating</div>
              </div>
              <div>
                <div className="text-3xl font-bold">100%</div>
                <div className="text-sm opacity-90">Free Forever</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Search */}
            <div className="flex-1">
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
                Search Resources
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="search"
                  placeholder="Search by title, description, or tags..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Category Filter */}
            <div className="lg:w-64">
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                id="category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {CATEGORIES.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name} ({category.count})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Featured Resources */}
        {selectedCategory === 'all' && searchQuery === '' && (
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {RESOURCES.filter(r => r.featured).map(resource => (
                <ResourceCard key={resource.id} resource={resource} onDownload={handleDownload} featured />
              ))}
            </div>
          </div>
        )}

        {/* All Resources */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              {selectedCategory === 'all' ? 'All Resources' : CATEGORIES.find(c => c.id === selectedCategory)?.name}
            </h2>
            <div className="text-gray-600">
              {filteredResources.length} resource{filteredResources.length !== 1 ? 's' : ''}
            </div>
          </div>

          {filteredResources.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No resources found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredResources.map(resource => (
                <ResourceCard key={resource.id} resource={resource} onDownload={handleDownload} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Teaching?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            These free resources are just the beginning. Discover how Zaza's AI tools can save you 
            hours every week and help you become a more effective educator.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Start Free Trial
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
              Watch Demo
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

interface ResourceCardProps {
  resource: Resource
  onDownload: (resource: Resource) => void
  featured?: boolean
}

function ResourceCard({ resource, onDownload, featured }: ResourceCardProps) {
  const IconComponent = TYPE_ICONS[resource.type]

  return (
    <div className={cn(
      "bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden",
      featured && "ring-2 ring-blue-500 ring-opacity-50"
    )}>
      {/* Header */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <IconComponent className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex items-center gap-2">
              {resource.new && (
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
                  NEW
                </span>
              )}
              {resource.featured && (
                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded-full">
                  FEATURED
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center gap-1 text-yellow-500">
            <Star className="w-4 h-4 fill-current" />
            <span className="text-sm font-semibold">{resource.rating}</span>
          </div>
        </div>

        {/* Title and Description */}
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {resource.title}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {resource.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {resource.tags.slice(0, 3).map(tag => (
            <span
              key={tag}
              className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
            >
              {tag}
            </span>
          ))}
          {resource.tags.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
              +{resource.tags.length - 3} more
            </span>
          )}
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center gap-4">
            <span>{resource.fileSize}</span>
            <span>{resource.downloadCount.toLocaleString()} downloads</span>
          </div>
          {resource.timeToComplete && (
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {resource.timeToComplete}
            </span>
          )}
        </div>

        {/* Download Button */}
        <button
          onClick={() => onDownload(resource)}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
        >
          <Download className="w-4 h-4" />
          Download Free
        </button>
      </div>
    </div>
  )
} 