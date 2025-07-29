"use client"

import { useState, useEffect } from 'react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { 
  Users, 
  Download, 
  MessageCircle, 
  Star, 
  TrendingUp,
  BookOpen,
  School,
  CheckCircle2
} from 'lucide-react'

interface SocialProofCounterProps {
  variant?: 'compact' | 'detailed' | 'badge'
  showAnimation?: boolean
  className?: string
}

export function SocialProofCounter({ 
  variant = 'compact', 
  showAnimation = true,
  className = '' 
}: SocialProofCounterProps) {
  const [stats, setStats] = useState({
    totalTeachers: 0,
    weeklyJoins: 0,
    totalDownloads: 0,
    blogReads: 0,
    feedbackSent: 0
  })
  const [isLoading, setIsLoading] = useState(true)
  const [animatedValues, setAnimatedValues] = useState(stats)

  useEffect(() => {
    // Simulate fetching real stats (in production, this would be an API call)
    const fetchStats = async () => {
      try {
        // Mock realistic growth numbers for an early-stage EdTech platform
        const baseStats = {
          totalTeachers: 1247 + Math.floor(Math.random() * 100), // Growing user base
          weeklyJoins: 23 + Math.floor(Math.random() * 10), // Weekly growth
          totalDownloads: 3891 + Math.floor(Math.random() * 50), // Resource downloads
          blogReads: 8234 + Math.floor(Math.random() * 200), // Blog engagement
          feedbackSent: 342 + Math.floor(Math.random() * 20) // User feedback
        }
        
        setStats(baseStats)
        
        if (showAnimation) {
          // Animate counters up to final values
          animateCounters(baseStats)
        } else {
          setAnimatedValues(baseStats)
        }
      } catch (error) {
        console.error('Error fetching stats:', error)
        // Fallback to static numbers
        const fallbackStats = {
          totalTeachers: 1200,
          weeklyJoins: 25,
          totalDownloads: 3800,
          blogReads: 8100,
          feedbackSent: 340
        }
        setStats(fallbackStats)
        setAnimatedValues(fallbackStats)
      } finally {
        setIsLoading(false)
      }
    }

    fetchStats()
  }, [showAnimation])

  const animateCounters = (targetStats: typeof stats) => {
    const duration = 2000 // 2 seconds
    const steps = 60 // 60 FPS
    const stepTime = duration / steps
    
    let currentStep = 0
    
    const interval = setInterval(() => {
      currentStep++
      const progress = currentStep / steps
      const easeOutProgress = 1 - Math.pow(1 - progress, 3) // Ease out cubic
      
      setAnimatedValues({
        totalTeachers: Math.floor(targetStats.totalTeachers * easeOutProgress),
        weeklyJoins: Math.floor(targetStats.weeklyJoins * easeOutProgress),
        totalDownloads: Math.floor(targetStats.totalDownloads * easeOutProgress),
        blogReads: Math.floor(targetStats.blogReads * easeOutProgress),
        feedbackSent: Math.floor(targetStats.feedbackSent * easeOutProgress)
      })
      
      if (currentStep >= steps) {
        clearInterval(interval)
        setAnimatedValues(targetStats)
      }
    }, stepTime)
  }

  const formatNumber = (num: number): string => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}k`
    }
    return num.toLocaleString()
  }

  if (isLoading) {
    return (
      <div className={`animate-pulse ${className}`}>
        <div className="h-6 bg-gray-200 rounded w-32"></div>
      </div>
    )
  }

  if (variant === 'badge') {
    return (
      <Badge 
        variant="secondary" 
        className={`bg-green-100 text-green-800 px-3 py-1 ${className}`}
      >
        <Users className="w-3 h-3 mr-1" />
        {formatNumber(animatedValues.totalTeachers)} teachers joined
      </Badge>
    )
  }

  if (variant === 'compact') {
    return (
      <div className={`flex items-center space-x-4 text-sm text-gray-600 ${className}`}>
        <div className="flex items-center space-x-1">
          <TrendingUp className="w-4 h-4 text-green-600" />
          <span className="font-medium text-green-700">{animatedValues.weeklyJoins}</span>
          <span>teachers joined this week</span>
        </div>
        <div className="flex items-center space-x-1">
          <Users className="w-4 h-4 text-blue-600" />
          <span className="font-medium text-blue-700">{formatNumber(animatedValues.totalTeachers)}</span>
          <span>total educators</span>
        </div>
      </div>
    )
  }

  // Detailed variant
  return (
    <Card className={`${className}`}>
      <CardContent className="p-6">
        <div className="text-center mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Join Thousands of Teachers
          </h3>
          <p className="text-gray-600">
            Educators worldwide are already saving time with Zaza Promptly
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
            </div>
            <div className="text-2xl font-bold text-blue-600">
              {formatNumber(animatedValues.totalTeachers)}
            </div>
            <div className="text-xs text-gray-500">Total Teachers</div>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <div className="p-2 bg-green-100 rounded-lg">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
            </div>
            <div className="text-2xl font-bold text-green-600">
              {animatedValues.weeklyJoins}
            </div>
            <div className="text-xs text-gray-500">This Week</div>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Download className="w-5 h-5 text-purple-600" />
              </div>
            </div>
            <div className="text-2xl font-bold text-purple-600">
              {formatNumber(animatedValues.totalDownloads)}
            </div>
            <div className="text-xs text-gray-500">Downloads</div>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <div className="p-2 bg-orange-100 rounded-lg">
                <BookOpen className="w-5 h-5 text-orange-600" />
              </div>
            </div>
            <div className="text-2xl font-bold text-orange-600">
              {formatNumber(animatedValues.blogReads)}
            </div>
            <div className="text-xs text-gray-500">Blog Reads</div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
            <CheckCircle2 className="w-4 h-4 text-green-600" />
            <span>Trusted by educators worldwide</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Real-time activity feed component
export function ActivityFeed() {
  const [activities, setActivities] = useState<Array<{
    id: string
    type: 'signup' | 'download' | 'share'
    location: string
    timeAgo: string
  }>>([])

  useEffect(() => {
    // Mock real-time activities
    const mockActivities = [
      { id: '1', type: 'signup' as const, location: 'California', timeAgo: '2 minutes ago' },
      { id: '2', type: 'download' as const, location: 'Texas', timeAgo: '5 minutes ago' },
      { id: '3', type: 'share' as const, location: 'New York', timeAgo: '8 minutes ago' },
      { id: '4', type: 'signup' as const, location: 'Florida', timeAgo: '12 minutes ago' },
    ]
    
    setActivities(mockActivities)
    
    // Simulate new activities
    const interval = setInterval(() => {
      const locations = ['California', 'Texas', 'New York', 'Florida', 'Illinois', 'Pennsylvania']
      const types = ['signup', 'download', 'share'] as const
      
      const newActivity = {
        id: Date.now().toString(),
        type: types[Math.floor(Math.random() * types.length)],
        location: locations[Math.floor(Math.random() * locations.length)],
        timeAgo: 'just now'
      }
      
      setActivities(prev => [newActivity, ...prev.slice(0, 3)])
    }, 15000) // New activity every 15 seconds
    
    return () => clearInterval(interval)
  }, [])

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'signup':
        return <Users className="w-3 h-3 text-green-600" />
      case 'download':
        return <Download className="w-3 h-3 text-blue-600" />
      case 'share':
        return <MessageCircle className="w-3 h-3 text-purple-600" />
      default:
        return <Star className="w-3 h-3 text-gray-600" />
    }
  }

  const getActivityText = (type: string, location: string) => {
    switch (type) {
      case 'signup':
        return `Teacher from ${location} just joined`
      case 'download':
        return `Resource downloaded in ${location}`
      case 'share':
        return `Shared with colleagues in ${location}`
      default:
        return `Activity in ${location}`
    }
  }

  return (
    <Card className="w-full max-w-sm">
      <CardContent className="p-4">
        <h4 className="font-medium text-gray-800 mb-3 flex items-center">
          <TrendingUp className="w-4 h-4 mr-2 text-green-600" />
          Live Activity
        </h4>
        <div className="space-y-2">
          {activities.map((activity) => (
            <div 
              key={activity.id} 
              className="flex items-center space-x-2 text-xs text-gray-600 p-2 bg-gray-50 rounded"
            >
              {getActivityIcon(activity.type)}
              <div className="flex-1">
                <div>{getActivityText(activity.type, activity.location)}</div>
                <div className="text-gray-400">{activity.timeAgo}</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}