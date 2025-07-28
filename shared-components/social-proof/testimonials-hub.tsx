import React from 'react'
import { Star, Play, Quote, Award, Shield, Clock, Users, TrendingUp, CheckCircle, ArrowRight } from 'lucide-react'
import { cn } from '../lib/utils'

/**
 * Zaza Testimonials & Social Proof Hub
 * 
 * Comprehensive social proof component featuring video testimonials, case studies,
 * trust signals, and success metrics to build credibility and drive conversions.
 */

interface Testimonial {
  id: string
  name: string
  role: string
  school: string
  location: string
  avatar: string
  rating: number
  quote: string
  videoUrl?: string
  timeSaved: string
  moneySaved: string
  featured?: boolean
  verified?: boolean
}

interface CaseStudy {
  id: string
  title: string
  subtitle: string
  teacher: string
  school: string
  grade: string
  subject: string
  challenge: string
  solution: string
  results: string[]
  metrics: {
    timeSaved: string
    productivityIncrease: string
    studentEngagement: string
    satisfaction: string
  }
  image: string
  featured?: boolean
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 'sarah-johnson',
    name: 'Sarah Johnson',
    role: 'High School English Teacher',
    school: 'Lincoln High School',
    location: 'Austin, TX',
    avatar: '/testimonials/sarah-johnson.jpg',
    rating: 5,
    quote: 'Zaza Promptly has completely transformed my report writing process. What used to take me 3 hours now takes 30 minutes, and the quality is even better. My students get more personalized feedback, and I have time to focus on what really matters.',
    videoUrl: '/videos/testimonial-sarah-johnson.mp4',
    timeSaved: '15 hours per month',
    moneySaved: '$675 per month',
    featured: true,
    verified: true,
  },
  {
    id: 'michael-chen',
    name: 'Michael Chen',
    role: 'Middle School Science Teacher',
    school: 'Riverside Middle School',
    location: 'Seattle, WA',
    avatar: '/testimonials/michael-chen.jpg',
    rating: 5,
    quote: 'The lesson planning templates and AI prompts have made my science classes so much more engaging. I can create differentiated activities in minutes instead of hours. My students are more excited about learning than ever.',
    videoUrl: '/videos/testimonial-michael-chen.mp4',
    timeSaved: '12 hours per month',
    moneySaved: '$540 per month',
    featured: true,
    verified: true,
  },
  {
    id: 'emily-rodriguez',
    name: 'Emily Rodriguez',
    role: 'Elementary School Teacher',
    school: 'Oakwood Elementary',
    location: 'Miami, FL',
    avatar: '/testimonials/emily-rodriguez.jpg',
    rating: 5,
    quote: 'As a bilingual teacher, Zaza has been a game-changer for parent communication. I can quickly generate professional emails in both English and Spanish, saving me hours every week.',
    timeSaved: '8 hours per month',
    moneySaved: '$360 per month',
    verified: true,
  },
  {
    id: 'david-thompson',
    name: 'David Thompson',
    role: 'Special Education Teacher',
    school: 'Maple Ridge School',
    location: 'Portland, OR',
    avatar: '/testimonials/david-thompson.jpg',
    rating: 5,
    quote: 'The AI tools help me create individualized learning plans and assessments that meet each student\'s unique needs. It\'s like having a teaching assistant who never gets tired.',
    timeSaved: '10 hours per month',
    moneySaved: '$450 per month',
    verified: true,
  },
  {
    id: 'lisa-park',
    name: 'Lisa Park',
    role: 'Math Department Head',
    school: 'Central High School',
    location: 'Denver, CO',
    avatar: '/testimonials/lisa-park.jpg',
    rating: 5,
    quote: 'I introduced Zaza to our entire math department, and the results have been incredible. We\'re all saving time on lesson planning and can focus more on student support and professional development.',
    timeSaved: '20 hours per month',
    moneySaved: '$900 per month',
    verified: true,
  },
  {
    id: 'james-wilson',
    name: 'James Wilson',
    role: 'History Teacher',
    school: 'Heritage Academy',
    location: 'Nashville, TN',
    avatar: '/testimonials/james-wilson.jpg',
    rating: 5,
    quote: 'The assessment rubrics and grading tools have made my evaluation process so much more consistent and fair. My students appreciate the detailed feedback, and I appreciate the time savings.',
    timeSaved: '6 hours per month',
    moneySaved: '$270 per month',
    verified: true,
  },
]

const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'district-wide-implementation',
    title: 'District-Wide AI Implementation',
    subtitle: 'How a 15,000-student district saved $2.3M annually',
    teacher: 'Dr. Jennifer Martinez',
    school: 'Sunrise School District',
    grade: 'K-12',
    subject: 'All Subjects',
    challenge: 'Teachers were spending 15+ hours weekly on administrative tasks, leading to burnout and reduced student engagement.',
    solution: 'Implemented Zaza AI tools across all 12 schools, providing comprehensive training and ongoing support.',
    results: [
      'Average time savings of 12 hours per teacher per month',
      '95% teacher satisfaction rate',
      '40% increase in parent communication frequency',
      '25% improvement in student feedback quality',
    ],
    metrics: {
      timeSaved: '12,000 hours/month',
      productivityIncrease: '85%',
      studentEngagement: '+30%',
      satisfaction: '95%',
    },
    image: '/case-studies/district-implementation.jpg',
    featured: true,
  },
  {
    id: 'special-education-transformation',
    title: 'Special Education Transformation',
    subtitle: 'Personalized learning at scale',
    teacher: 'Maria Gonzalez',
    school: 'Inclusive Learning Center',
    grade: '3-8',
    subject: 'Special Education',
    challenge: 'Creating individualized learning plans and assessments for 45 students with diverse learning needs.',
    solution: 'Used Zaza AI tools to generate personalized lesson plans, assessments, and progress reports.',
    results: [
      'Reduced IEP planning time by 70%',
      'Improved student progress tracking accuracy',
      'Enhanced parent communication and involvement',
      'Increased teacher job satisfaction',
    ],
    metrics: {
      timeSaved: '18 hours/month',
      productivityIncrease: '70%',
      studentEngagement: '+45%',
      satisfaction: '98%',
    },
    image: '/case-studies/special-education.jpg',
    featured: true,
  },
  {
    id: 'rural-school-success',
    title: 'Rural School Success Story',
    subtitle: 'Leveling the playing field with AI',
    teacher: 'Robert Anderson',
    school: 'Prairie View Elementary',
    grade: 'K-6',
    subject: 'All Subjects',
    challenge: 'Limited resources and small staff struggling to provide quality education to 200 students.',
    solution: 'Implemented Zaza tools to enhance lesson planning, assessment, and parent communication.',
    results: [
      'Improved standardized test scores by 15%',
      'Increased parent engagement by 60%',
      'Reduced teacher workload by 40%',
      'Enhanced student learning outcomes',
    ],
    metrics: {
      timeSaved: '10 hours/month',
      productivityIncrease: '60%',
      studentEngagement: '+35%',
      satisfaction: '92%',
    },
    image: '/case-studies/rural-school.jpg',
  },
]

const TRUST_SIGNALS = [
  {
    icon: Shield,
    title: 'SOC 2 Type II Certified',
    description: 'Enterprise-grade security and data protection',
    color: 'blue',
  },
  {
    icon: Users,
    title: '50,000+ Teachers',
    description: 'Trusted by educators nationwide',
    color: 'green',
  },
  {
    icon: Award,
    title: 'EdTech Breakthrough Award',
    description: 'Best AI Solution for Education 2024',
    color: 'purple',
  },
  {
    icon: Clock,
    title: '99.9% Uptime',
    description: 'Reliable when you need it most',
    color: 'orange',
  },
]

const SUCCESS_METRICS = [
  { label: 'Teachers Using Zaza', value: '50,000+', change: '+150%' },
  { label: 'Time Saved Monthly', value: '600,000+ hours', change: '+200%' },
  { label: 'Money Saved Annually', value: '$27M+', change: '+180%' },
  { label: 'Average Rating', value: '4.9/5', change: '+0.2' },
]

export function TestimonialsHub() {
  const [selectedTestimonial, setSelectedTestimonial] = React.useState<string | null>(null)
  const [showVideoModal, setShowVideoModal] = React.useState(false)

  const featuredTestimonials = TESTIMONIALS.filter(t => t.featured)
  const regularTestimonials = TESTIMONIALS.filter(t => !t.featured)
  const featuredCaseStudies = CASE_STUDIES.filter(c => c.featured)

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={cn(
          "w-4 h-4",
          i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
        )}
      />
    ))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Trusted by 50,000+ Educators
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              See how teachers across the country are transforming their practice 
              and saving hours every week with Zaza AI tools.
            </p>
            
            {/* Success Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
              {SUCCESS_METRICS.map((metric, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold mb-2">{metric.value}</div>
                  <div className="text-sm opacity-90 mb-1">{metric.label}</div>
                  <div className="text-green-400 text-sm font-semibold">{metric.change} from last year</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {TRUST_SIGNALS.map((signal, index) => {
              const IconComponent = signal.icon
              return (
                <div key={index} className="text-center">
                  <div className={cn(
                    "w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4",
                    signal.color === 'blue' && "bg-blue-100",
                    signal.color === 'green' && "bg-green-100",
                    signal.color === 'purple' && "bg-purple-100",
                    signal.color === 'orange' && "bg-orange-100",
                  )}>
                    <IconComponent className={cn(
                      "w-8 h-8",
                      signal.color === 'blue' && "text-blue-600",
                      signal.color === 'green' && "text-green-600",
                      signal.color === 'purple' && "text-purple-600",
                      signal.color === 'orange' && "text-orange-600",
                    )} />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{signal.title}</h3>
                  <p className="text-sm text-gray-600">{signal.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Featured Testimonials */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Teachers Are Saying
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real stories from real teachers who have transformed their practice with Zaza AI tools.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {featuredTestimonials.map(testimonial => (
              <TestimonialCard
                key={testimonial.id}
                testimonial={testimonial}
                onVideoClick={() => {
                  setSelectedTestimonial(testimonial.id)
                  setShowVideoModal(true)
                }}
                featured
              />
            ))}
          </div>

          {/* More Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularTestimonials.map(testimonial => (
              <TestimonialCard
                key={testimonial.id}
                testimonial={testimonial}
                onVideoClick={() => {
                  setSelectedTestimonial(testimonial.id)
                  setShowVideoModal(true)
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Success Stories & Case Studies
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Deep dives into how schools and districts are achieving remarkable results with Zaza.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredCaseStudies.map(caseStudy => (
              <CaseStudyCard key={caseStudy.id} caseStudy={caseStudy} />
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2 mx-auto">
              View All Case Studies
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Join 50,000+ Teachers Saving Time
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Start your free trial today and see why educators nationwide are choosing Zaza.
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

      {/* Video Modal */}
      {showVideoModal && selectedTestimonial && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[80vh] overflow-hidden">
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="text-lg font-semibold">Teacher Testimonial</h3>
              <button
                onClick={() => setShowVideoModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="p-4">
              <video
                controls
                className="w-full h-auto"
                src={TESTIMONIALS.find(t => t.id === selectedTestimonial)?.videoUrl}
              >
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

interface TestimonialCardProps {
  testimonial: Testimonial
  onVideoClick: () => void
  featured?: boolean
}

function TestimonialCard({ testimonial, onVideoClick, featured }: TestimonialCardProps) {
  return (
    <div className={cn(
      "bg-white rounded-xl shadow-lg p-6",
      featured && "ring-2 ring-blue-500 ring-opacity-50"
    )}>
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <img
            src={testimonial.avatar}
            alt={testimonial.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
              {testimonial.verified && (
                <CheckCircle className="w-4 h-4 text-blue-600" />
              )}
            </div>
            <p className="text-sm text-gray-600">{testimonial.role}</p>
            <p className="text-xs text-gray-500">{testimonial.school}, {testimonial.location}</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          {renderStars(testimonial.rating)}
        </div>
      </div>

      {/* Quote */}
      <blockquote className="text-gray-700 mb-4 italic">
        "{testimonial.quote}"
      </blockquote>

      {/* Metrics */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-green-50 p-3 rounded-lg">
          <div className="text-sm text-green-600 font-medium">Time Saved</div>
          <div className="text-lg font-bold text-green-700">{testimonial.timeSaved}</div>
        </div>
        <div className="bg-blue-50 p-3 rounded-lg">
          <div className="text-sm text-blue-600 font-medium">Money Saved</div>
          <div className="text-lg font-bold text-blue-700">{testimonial.moneySaved}</div>
        </div>
      </div>

      {/* Video Button */}
      {testimonial.videoUrl && (
        <button
          onClick={onVideoClick}
          className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
        >
          <Play className="w-4 h-4" />
          Watch Video Testimonial
        </button>
      )}
    </div>
  )
}

interface CaseStudyCardProps {
  caseStudy: CaseStudy
}

function CaseStudyCard({ caseStudy }: CaseStudyCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <img
        src={caseStudy.image}
        alt={caseStudy.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <div className="flex items-center gap-2 mb-2">
          {caseStudy.featured && (
            <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded-full">
              FEATURED
            </span>
          )}
          <span className="text-sm text-gray-500">{caseStudy.grade} • {caseStudy.subject}</span>
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 mb-2">{caseStudy.title}</h3>
        <p className="text-gray-600 mb-4">{caseStudy.subtitle}</p>
        
        <div className="mb-4">
          <h4 className="font-semibold text-gray-900 mb-2">Challenge:</h4>
          <p className="text-sm text-gray-600 mb-3">{caseStudy.challenge}</p>
          
          <h4 className="font-semibold text-gray-900 mb-2">Solution:</h4>
          <p className="text-sm text-gray-600 mb-3">{caseStudy.solution}</p>
        </div>

        {/* Results */}
        <div className="mb-4">
          <h4 className="font-semibold text-gray-900 mb-2">Results:</h4>
          <ul className="space-y-1">
            {caseStudy.results.map((result, index) => (
              <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                {result}
              </li>
            ))}
          </ul>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-2 gap-3">
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-lg font-bold text-blue-600">{caseStudy.metrics.timeSaved}</div>
            <div className="text-xs text-gray-600">Time Saved</div>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-lg font-bold text-green-600">{caseStudy.metrics.productivityIncrease}</div>
            <div className="text-xs text-gray-600">Productivity Increase</div>
          </div>
        </div>

        <button className="w-full mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
          Read Full Case Study
        </button>
      </div>
    </div>
  )
} 