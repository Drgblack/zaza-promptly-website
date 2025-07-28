"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Calendar, Clock, User } from "lucide-react"

interface BlogPost {
  id: string
  title: string
  excerpt: string
  slug: string
  publishedAt: string
  readTime: number
  author: {
    name: string
    avatar: string
  }
  category: string
  tags: string[]
  featured: boolean
}

const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "10 AI Teaching Tools That Will Transform Your Classroom in 2024",
    excerpt: "Discover the latest AI-powered tools that are revolutionizing education and helping teachers save time while improving student outcomes.",
    slug: "ai-teaching-tools-2024",
    publishedAt: "2024-01-15",
    readTime: 8,
    author: {
      name: "Dr. Greg Blackburn",
      avatar: "/placeholder-user.jpg"
    },
    category: "Technology",
    tags: ["AI", "Teaching Tools", "2024", "Productivity"],
    featured: true
  },
  {
    id: "2",
    title: "The Ultimate Guide to Writing Effective Student Feedback",
    excerpt: "Learn proven strategies for crafting meaningful, personalized feedback that motivates students and supports their growth.",
    slug: "effective-student-feedback-guide",
    publishedAt: "2024-01-10",
    readTime: 12,
    author: {
      name: "Sarah Johnson",
      avatar: "/placeholder-user.jpg"
    },
    category: "Teaching Tips",
    tags: ["Feedback", "Student Growth", "Communication"],
    featured: true
  },
  {
    id: "3",
    title: "How AI is Changing the Way Teachers Approach Report Writing",
    excerpt: "Explore how artificial intelligence is streamlining the report writing process while maintaining the personal touch that students need.",
    slug: "ai-report-writing-teachers",
    publishedAt: "2024-01-05",
    readTime: 6,
    author: {
      name: "Dr. Greg Blackburn",
      avatar: "/placeholder-user.jpg"
    },
    category: "AI in Education",
    tags: ["AI", "Report Writing", "Efficiency"],
    featured: false
  },
  {
    id: "4",
    title: "5 Time-Saving Strategies Every Teacher Should Know",
    excerpt: "Practical tips and techniques to help busy educators maximize their time and focus on what matters most - their students.",
    slug: "time-saving-strategies-teachers",
    publishedAt: "2024-01-01",
    readTime: 10,
    author: {
      name: "Maria Rodriguez",
      avatar: "/placeholder-user.jpg"
    },
    category: "Productivity",
    tags: ["Time Management", "Productivity", "Teaching"],
    featured: false
  },
  {
    id: "5",
    title: "Building Strong Parent-Teacher Relationships in the Digital Age",
    excerpt: "Navigate the challenges of modern communication and build meaningful connections with parents using technology and empathy.",
    slug: "parent-teacher-relationships-digital",
    publishedAt: "2023-12-28",
    readTime: 9,
    author: {
      name: "Sarah Johnson",
      avatar: "/placeholder-user.jpg"
    },
    category: "Communication",
    tags: ["Parent Communication", "Digital Tools", "Relationships"],
    featured: false
  },
  {
    id: "6",
    title: "The Future of Education: What Teachers Need to Know About AI",
    excerpt: "A comprehensive look at how artificial intelligence will shape the future of education and what it means for teachers.",
    slug: "future-education-ai-teachers",
    publishedAt: "2023-12-20",
    readTime: 15,
    author: {
      name: "Dr. Greg Blackburn",
      avatar: "/placeholder-user.jpg"
    },
    category: "Future of Education",
    tags: ["AI", "Future", "Education Trends"],
    featured: false
  }
]

export function BlogSection() {
  const [visiblePosts, setVisiblePosts] = useState<BlogPost[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [isVisible, setIsVisible] = useState(false)

  const categories = [
    { id: "all", name: "All Posts", count: blogPosts.length },
    { id: "Technology", name: "Technology", count: blogPosts.filter(post => post.category === "Technology").length },
    { id: "Teaching Tips", name: "Teaching Tips", count: blogPosts.filter(post => post.category === "Teaching Tips").length },
    { id: "AI in Education", name: "AI in Education", count: blogPosts.filter(post => post.category === "AI in Education").length },
    { id: "Productivity", name: "Productivity", count: blogPosts.filter(post => post.category === "Productivity").length },
    { id: "Communication", name: "Communication", count: blogPosts.filter(post => post.category === "Communication").length },
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    const element = document.getElementById("blog-section")
    if (element) {
      observer.observe(element)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const filtered = selectedCategory === "all" 
      ? blogPosts 
      : blogPosts.filter(post => post.category === selectedCategory)
    
    setVisiblePosts(filtered.slice(0, 6))
  }, [selectedCategory])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    })
  }

  return (
    <section id="blog-section" className="py-20 lg:py-32 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-800 mb-6">
            Latest from Our{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Blog
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover teaching tips, AI insights, and productivity hacks to help you thrive in the classroom
          </p>
        </div>

        {/* Category Filter */}
        <div className={`flex flex-wrap justify-center gap-4 mb-12 transition-all duration-1000 delay-200 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                selectedCategory === category.id
                  ? "bg-indigo-600 text-white shadow-lg"
                  : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              {category.name} ({category.count})
            </button>
          ))}
        </div>

        {/* Featured Post */}
        {selectedCategory === "all" && (
          <div className={`mb-16 transition-all duration-1000 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}>
            <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 border-2 border-indigo-200 overflow-hidden">
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="p-8 lg:p-12">
                  <Badge className="mb-4 bg-indigo-600 text-white">
                    Featured Post
                  </Badge>
                  <CardTitle className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
                    {blogPosts[0].title}
                  </CardTitle>
                  <CardDescription className="text-lg text-gray-600 mb-6">
                    {blogPosts[0].excerpt}
                  </CardDescription>
                  <div className="flex items-center space-x-4 mb-6 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <User className="w-4 h-4" />
                      <span>{blogPosts[0].author.name}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(blogPosts[0].publishedAt)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{blogPosts[0].readTime} min read</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {blogPosts[0].tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <Button asChild className="bg-indigo-600 hover:bg-indigo-700">
                    <a href={`/blog/${blogPosts[0].slug}`}>
                      Read Full Article
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </a>
                  </Button>
                </div>
                <div className="bg-gradient-to-br from-indigo-100 to-purple-100 p-8 lg:p-12 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-indigo-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <span className="text-white text-2xl font-bold">📚</span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      Expert Insights
                    </h3>
                    <p className="text-gray-600">
                      Written by educators, for educators
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Blog Posts Grid */}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-1000 delay-400 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}>
          {visiblePosts.slice(selectedCategory === "all" ? 1 : 0).map((post, index) => (
            <Card key={post.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline">{post.category}</Badge>
                  <span className="text-sm text-gray-500">{formatDate(post.publishedAt)}</span>
                </div>
                <CardTitle className="text-xl font-bold text-gray-800 group-hover:text-indigo-600 transition-colors duration-200">
                  {post.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 mb-4 line-clamp-3">
                  {post.excerpt}
                </CardDescription>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <User className="w-4 h-4" />
                    <span>{post.author.name}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-sm text-gray-500">
                    <Clock className="w-4 h-4" />
                    <span>{post.readTime} min</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1 mb-4">
                  {post.tags.slice(0, 2).map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <Button asChild variant="ghost" className="w-full group-hover:bg-indigo-50">
                  <a href={`/blog/${post.slug}`} className="flex items-center justify-center">
                    Read More
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Posts Button */}
        <div className={`text-center mt-12 transition-all duration-1000 delay-500 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}>
          <Button asChild size="lg" className="bg-indigo-600 hover:bg-indigo-700 px-8 py-4">
            <a href="/blog">
              View All Blog Posts
              <ArrowRight className="w-4 h-4 ml-2" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
} 