import React from 'react'
import { Calendar, Clock, User, Tag, ArrowRight, BookOpen, TrendingUp, Zap, Users, Target, Star } from 'lucide-react'
import { cn } from '../lib/utils'

/**
 * Zaza Blog Content Hub
 * 
 * Educational blog content that provides value to educators while driving conversions.
 * Features how-to guides, AI insights, productivity tips, and best practices.
 */

interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  author: {
    name: string
    avatar: string
    role: string
  }
  publishedAt: string
  readTime: string
  category: 'how-to' | 'ai-insights' | 'productivity' | 'best-practices' | 'case-studies' | 'tutorials'
  tags: string[]
  featured?: boolean
  popular?: boolean
  image: string
  views: number
  likes: number
  comments: number
  seoKeywords: string[]
  relatedPosts?: string[]
}

const BLOG_POSTS: BlogPost[] = [
  {
    id: 'ai-lesson-planning-guide',
    title: 'The Complete Guide to AI-Powered Lesson Planning',
    excerpt: 'Learn how to leverage AI tools to create engaging, differentiated lesson plans in minutes instead of hours. This comprehensive guide covers everything from initial setup to advanced customization.',
    content: `
      <h2>Why AI-Powered Lesson Planning is a Game-Changer</h2>
      <p>Traditional lesson planning can take 2-3 hours per lesson, leaving teachers exhausted and with little time for student interaction. AI tools can reduce this to 15-30 minutes while improving quality.</p>
      
      <h2>Getting Started with AI Lesson Planning</h2>
      <p>Start by identifying your learning objectives and student needs. AI tools work best when you provide clear, specific prompts about your goals.</p>
      
      <h2>Advanced Techniques</h2>
      <p>Learn how to create differentiated activities, incorporate multiple learning styles, and adapt lessons for various student abilities.</p>
      
      <h2>Real Teacher Examples</h2>
      <p>See how Sarah Johnson, a high school English teacher, reduced her planning time by 70% while improving student engagement.</p>
    `,
    author: {
      name: 'Dr. Jennifer Martinez',
      avatar: '/blog/authors/jennifer-martinez.jpg',
      role: 'Educational Technology Specialist'
    },
    publishedAt: '2024-01-15',
    readTime: '8 min read',
    category: 'how-to',
    tags: ['lesson planning', 'AI tools', 'differentiation', 'productivity'],
    featured: true,
    popular: true,
    image: '/blog/ai-lesson-planning-guide.jpg',
    views: 15420,
    likes: 892,
    comments: 156,
    seoKeywords: ['AI lesson planning', 'teacher productivity', 'differentiated instruction', 'educational technology'],
  },
  {
    id: 'student-feedback-ai',
    title: 'How to Write Personalized Student Feedback with AI',
    excerpt: 'Discover the secrets to generating meaningful, personalized feedback that actually helps students grow. Learn the prompts and techniques that make AI feedback feel human and impactful.',
    content: `
      <h2>The Problem with Generic Feedback</h2>
      <p>Generic comments like "Good job" or "Needs improvement" don't help students understand what they did well or how to improve. AI can help create specific, actionable feedback.</p>
      
      <h2>Creating Effective AI Prompts</h2>
      <p>The key is providing context about the student, assignment, and learning objectives. Learn the exact prompts that generate the best results.</p>
      
      <h2>Personalization Techniques</h2>
      <p>How to make AI-generated feedback feel personal and relevant to each student's unique situation and learning style.</p>
      
      <h2>Quality Control</h2>
      <p>Always review and edit AI-generated feedback to ensure it's accurate, appropriate, and aligned with your teaching philosophy.</p>
    `,
    author: {
      name: 'Sarah Johnson',
      avatar: '/blog/authors/sarah-johnson.jpg',
      role: 'High School English Teacher'
    },
    publishedAt: '2024-01-12',
    readTime: '6 min read',
    category: 'how-to',
    tags: ['student feedback', 'AI writing', 'personalization', 'assessment'],
    featured: true,
    image: '/blog/student-feedback-ai.jpg',
    views: 12340,
    likes: 756,
    comments: 89,
    seoKeywords: ['student feedback', 'AI writing', 'personalized comments', 'teacher productivity'],
  },
  {
    id: 'ai-education-trends-2024',
    title: 'The Top 10 AI Education Trends That Will Transform Teaching in 2024',
    excerpt: 'From personalized learning to automated assessment, discover the AI trends that are reshaping education and how teachers can stay ahead of the curve.',
    content: `
      <h2>1. Hyper-Personalized Learning</h2>
      <p>AI is enabling truly individualized learning experiences that adapt to each student's pace, style, and needs.</p>
      
      <h2>2. Intelligent Assessment</h2>
      <p>Automated grading and assessment tools that provide instant, detailed feedback to students.</p>
      
      <h2>3. AI Teaching Assistants</h2>
      <p>Virtual assistants that help with lesson planning, grading, and administrative tasks.</p>
      
      <h2>4. Predictive Analytics</h2>
      <p>Using AI to identify students at risk and provide early intervention.</p>
      
      <h2>5. Natural Language Processing</h2>
      <p>Advanced language models that can understand and respond to student questions naturally.</p>
    `,
    author: {
      name: 'Dr. Michael Chen',
      avatar: '/blog/authors/michael-chen.jpg',
      role: 'AI in Education Researcher'
    },
    publishedAt: '2024-01-10',
    readTime: '12 min read',
    category: 'ai-insights',
    tags: ['AI trends', 'education technology', 'future of teaching', 'innovation'],
    popular: true,
    image: '/blog/ai-education-trends-2024.jpg',
    views: 18920,
    likes: 1245,
    comments: 234,
    seoKeywords: ['AI education trends', 'educational technology', 'future of teaching', 'AI in education'],
  },
  {
    id: 'teacher-productivity-hacks',
    title: '15 Time-Saving Hacks Every Teacher Should Know',
    excerpt: 'Simple but powerful strategies to reclaim your time and focus on what matters most - teaching and inspiring students.',
    content: `
      <h2>1. Batch Similar Tasks</h2>
      <p>Group similar activities together to reduce context switching and increase efficiency.</p>
      
      <h2>2. Use Templates</h2>
      <p>Create reusable templates for common tasks like lesson plans, emails, and assessments.</p>
      
      <h2>3. Leverage AI Tools</h2>
      <p>Use AI for routine tasks like generating feedback, creating rubrics, and lesson planning.</p>
      
      <h2>4. Streamline Communication</h2>
      <p>Set up automated systems for parent communication and student updates.</p>
      
      <h2>5. Optimize Your Workspace</h2>
      <p>Organize your physical and digital spaces for maximum efficiency.</p>
    `,
    author: {
      name: 'Emily Rodriguez',
      avatar: '/blog/authors/emily-rodriguez.jpg',
      role: 'Productivity Coach for Teachers'
    },
    publishedAt: '2024-01-08',
    readTime: '10 min read',
    category: 'productivity',
    tags: ['productivity', 'time management', 'teacher tips', 'work-life balance'],
    image: '/blog/teacher-productivity-hacks.jpg',
    views: 9870,
    likes: 634,
    comments: 78,
    seoKeywords: ['teacher productivity', 'time management', 'teacher tips', 'work-life balance'],
  },
  {
    id: 'differentiated-instruction-ai',
    title: 'Using AI to Create Differentiated Instruction That Actually Works',
    excerpt: 'Learn how to use AI tools to create truly differentiated learning experiences that meet the needs of every student in your classroom.',
    content: `
      <h2>Understanding Differentiation</h2>
      <p>True differentiation goes beyond just giving different students different worksheets. It's about meeting each student where they are.</p>
      
      <h2>AI Tools for Differentiation</h2>
      <p>How AI can help create multiple versions of assignments, adapt content complexity, and provide personalized support.</p>
      
      <h2>Implementation Strategies</h2>
      <p>Practical steps for implementing AI-powered differentiation in your classroom without overwhelming yourself or your students.</p>
      
      <h2>Measuring Success</h2>
      <p>How to track whether your differentiated instruction is actually improving student outcomes.</p>
    `,
    author: {
      name: 'David Thompson',
      avatar: '/blog/authors/david-thompson.jpg',
      role: 'Special Education Specialist'
    },
    publishedAt: '2024-01-05',
    readTime: '9 min read',
    category: 'best-practices',
    tags: ['differentiated instruction', 'inclusive teaching', 'AI tools', 'special education'],
    image: '/blog/differentiated-instruction-ai.jpg',
    views: 11230,
    likes: 789,
    comments: 92,
    seoKeywords: ['differentiated instruction', 'inclusive teaching', 'AI tools', 'special education'],
  },
  {
    id: 'ai-assessment-tools',
    title: 'The Ultimate Guide to AI Assessment Tools for Teachers',
    excerpt: 'From automated grading to intelligent rubrics, discover how AI is revolutionizing assessment and helping teachers provide better feedback.',
    content: `
      <h2>Types of AI Assessment Tools</h2>
      <p>An overview of the different types of AI tools available for assessment, from simple grading assistants to complex analytics platforms.</p>
      
      <h2>Setting Up AI Assessment</h2>
      <p>Step-by-step guide to implementing AI assessment tools in your classroom, including best practices and common pitfalls to avoid.</p>
      
      <h2>Creating Effective Rubrics</h2>
      <p>How to design rubrics that work well with AI tools and provide meaningful feedback to students.</p>
      
      <h2>Balancing Automation and Human Touch</h2>
      <p>Finding the right balance between automated assessment and human judgment in your evaluation process.</p>
    `,
    author: {
      name: 'Lisa Park',
      avatar: '/blog/authors/lisa-park.jpg',
      role: 'Assessment Specialist'
    },
    publishedAt: '2024-01-03',
    readTime: '11 min read',
    category: 'tutorials',
    tags: ['assessment', 'AI tools', 'grading', 'rubrics'],
    image: '/blog/ai-assessment-tools.jpg',
    views: 8760,
    likes: 567,
    comments: 67,
    seoKeywords: ['AI assessment', 'automated grading', 'teacher tools', 'educational technology'],
  },
]

const CATEGORIES = [
  { id: 'all', name: 'All Posts', count: BLOG_POSTS.length },
  { id: 'how-to', name: 'How-To Guides', count: BLOG_POSTS.filter(p => p.category === 'how-to').length },
  { id: 'ai-insights', name: 'AI Insights', count: BLOG_POSTS.filter(p => p.category === 'ai-insights').length },
  { id: 'productivity', name: 'Productivity', count: BLOG_POSTS.filter(p => p.category === 'productivity').length },
  { id: 'best-practices', name: 'Best Practices', count: BLOG_POSTS.filter(p => p.category === 'best-practices').length },
  { id: 'tutorials', name: 'Tutorials', count: BLOG_POSTS.filter(p => p.category === 'tutorials').length },
]

const POPULAR_TAGS = [
  'AI tools', 'lesson planning', 'student feedback', 'productivity', 'differentiation',
  'assessment', 'teacher tips', 'educational technology', 'time management', 'personalization'
]

export function BlogHub() {
  const [selectedCategory, setSelectedCategory] = React.useState('all')
  const [searchQuery, setSearchQuery] = React.useState('')
  const [selectedTag, setSelectedTag] = React.useState<string | null>(null)

  const filteredPosts = BLOG_POSTS.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesTag = !selectedTag || post.tags.includes(selectedTag)
    return matchesCategory && matchesSearch && matchesTag
  })

  const featuredPosts = BLOG_POSTS.filter(p => p.featured)
  const popularPosts = BLOG_POSTS.filter(p => p.popular && !p.featured)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Teacher Resources & Insights
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Discover practical tips, AI insights, and proven strategies to transform your teaching 
              and save hours every week.
            </p>
            
            {/* Search */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search articles, tips, and guides..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 text-gray-900 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Articles
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our most popular and comprehensive guides to help you master AI tools and improve your teaching.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {featuredPosts.map(post => (
              <FeaturedPostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>

      {/* Filters and Categories */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                    selectedCategory === category.id
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  )}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>

            {/* Popular Tags */}
            <div className="flex flex-wrap gap-2">
              {POPULAR_TAGS.slice(0, 5).map(tag => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                  className={cn(
                    "px-3 py-1 rounded-full text-xs font-medium transition-colors",
                    selectedTag === tag
                      ? "bg-purple-600 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  )}
                >
                  #{tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* All Posts */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">
              {selectedCategory === 'all' ? 'All Articles' : CATEGORIES.find(c => c.id === selectedCategory)?.name}
            </h2>
            <div className="text-gray-600">
              {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''}
            </div>
          </div>

          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">📝</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No articles found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map(post => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Never Miss a Teaching Tip
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Get weekly insights, AI tips, and productivity hacks delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Subscribe
            </button>
          </div>
          <p className="text-sm opacity-75 mt-4">
            Join 25,000+ teachers getting weekly insights. Unsubscribe anytime.
          </p>
        </div>
      </section>
    </div>
  )
}

interface PostCardProps {
  post: BlogPost
  featured?: boolean
}

function PostCard({ post, featured }: PostCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <div className={cn(
      "bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow",
      featured && "ring-2 ring-blue-500 ring-opacity-50"
    )}>
      <img
        src={post.image}
        alt={post.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        {/* Meta */}
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {formatDate(post.publishedAt)}
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {post.readTime}
          </div>
          <div className="flex items-center gap-1">
            <User className="w-4 h-4" />
            {post.author.name}
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className="text-gray-600 mb-4 line-clamp-3">
          {post.excerpt}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {post.tags.slice(0, 3).map(tag => (
            <span
              key={tag}
              className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
            >
              {tag}
            </span>
          ))}
          {post.tags.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
              +{post.tags.length - 3} more
            </span>
          )}
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center gap-4">
            <span>{post.views.toLocaleString()} views</span>
            <span>{post.likes} likes</span>
            <span>{post.comments} comments</span>
          </div>
          {post.popular && (
            <div className="flex items-center gap-1 text-yellow-600">
              <Star className="w-4 h-4 fill-current" />
              <span className="font-medium">Popular</span>
            </div>
          )}
        </div>

        {/* Read More */}
        <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
          Read Article
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

function FeaturedPostCard({ post }: PostCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <img
        src={post.image}
        alt={post.title}
        className="w-full h-64 object-cover"
      />
      <div className="p-8">
        {/* Meta */}
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {formatDate(post.publishedAt)}
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {post.readTime}
          </div>
          <div className="flex items-center gap-1">
            <User className="w-4 h-4" />
            {post.author.name}
          </div>
        </div>

        {/* Title */}
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className="text-gray-600 mb-6 text-lg leading-relaxed">
          {post.excerpt}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {post.tags.map(tag => (
            <span
              key={tag}
              className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full font-medium"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
          <div className="flex items-center gap-4">
            <span>{post.views.toLocaleString()} views</span>
            <span>{post.likes} likes</span>
            <span>{post.comments} comments</span>
          </div>
          <div className="flex items-center gap-1 text-yellow-600">
            <Star className="w-4 h-4 fill-current" />
            <span className="font-medium">Featured</span>
          </div>
        </div>

        {/* Read More */}
        <button className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
          Read Full Article
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
} 