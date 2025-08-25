'use client'

import { useState, useEffect } from 'react'
import { Users, Star, Clock, TrendingUp } from 'lucide-react'

interface LiveUpdate {
  type: 'signup' | 'feedback' | 'timeSaved'
  text: string
  icon: 'user' | 'star' | 'clock'
  timestamp: number
}

const liveUpdates: LiveUpdate[] = [
  {
    type: 'signup',
    text: 'Sarah M. from Birmingham just started her free trial',
    icon: 'user',
    timestamp: Date.now() - 32000
  },
  {
    type: 'feedback',
    text: 'Marcus T. saved 3.5 hours on Year 7 reports this week',
    icon: 'clock',
    timestamp: Date.now() - 45000
  },
  {
    type: 'timeSaved',
    text: 'Jennifer W. generated 28 personalized comments in 15 minutes',
    icon: 'star',
    timestamp: Date.now() - 67000
  },
  {
    type: 'signup',
    text: 'Riverside Academy (12 teachers) upgraded to School Plan',
    icon: 'user',
    timestamp: Date.now() - 89000
  },
  {
    type: 'feedback',
    text: 'Tom H. says: "Best investment I\'ve made as a teacher"',
    icon: 'star',
    timestamp: Date.now() - 125000
  },
  {
    type: 'timeSaved',
    text: 'Lisa P. finished IEP updates in 30 minutes instead of 3 hours',
    icon: 'clock',
    timestamp: Date.now() - 156000
  },
  {
    type: 'signup',
    text: 'David R. from Manchester School just joined 12,000+ teachers',
    icon: 'user',
    timestamp: Date.now() - 178000
  },
  {
    type: 'feedback',
    text: 'Emma C.: "Parents love the detailed, caring feedback"',
    icon: 'star',
    timestamp: Date.now() - 201000
  }
]

const stats = [
  { value: 12847, label: 'Teachers using Promptly', icon: Users, increment: 3 },
  { value: 487263, label: 'Comments generated this month', icon: TrendingUp, increment: 127 },
  { value: 52.3, label: 'Hours saved per teacher per month', icon: Clock, increment: 0.8 }
]

export function DynamicSocialProof() {
  const [currentUpdate, setCurrentUpdate] = useState(0)
  const [currentStats, setCurrentStats] = useState(stats.map(stat => ({ ...stat })))
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Show social proof after a short delay
    const timer = setTimeout(() => setIsVisible(true), 2000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!isVisible) return

    // Rotate through live updates
    const updateInterval = setInterval(() => {
      setCurrentUpdate((prev) => (prev + 1) % liveUpdates.length)
    }, 4000)

    // Increment stats gradually
    const statsInterval = setInterval(() => {
      setCurrentStats(prev => prev.map(stat => ({
        ...stat,
        value: stat.value + Math.random() * stat.increment
      })))
    }, 30000)

    return () => {
      clearInterval(updateInterval)
      clearInterval(statsInterval)
    }
  }, [isVisible])

  if (!isVisible) return null

  const getIcon = (iconType: string) => {
    switch (iconType) {
      case 'user': return Users
      case 'star': return Star
      case 'clock': return Clock
      default: return Users
    }
  }

  const update = liveUpdates[currentUpdate]
  const Icon = getIcon(update.icon)

  return (
    <div className="fixed bottom-20 lg:bottom-6 left-4 z-30 max-w-xs lg:max-w-sm">
      {/* Live Activity Notification */}
      <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 p-4 mb-3 transform transition-all duration-500 ${
        isVisible ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
      }`}>
        <div className="flex items-start">
          <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
            <Icon className="w-4 h-4 text-green-600 dark:text-green-400" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-gray-900 dark:text-white font-medium line-clamp-2">
              {update.text}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {Math.floor((Date.now() - update.timestamp) / 60000)} minutes ago
            </p>
          </div>
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse flex-shrink-0 mt-1.5" />
        </div>
      </div>

      {/* Live Stats Counter */}
      <div className={`bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-3 shadow-xl transform transition-all duration-500 ${
        isVisible ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
      }`}>
        <div className="text-center">
          <div className="flex items-center justify-center mb-1">
            <TrendingUp className="w-4 h-4 mr-1" />
            <span className="text-xs font-medium">Live Usage</span>
          </div>
          <div className="text-lg font-bold">
            {Math.floor(currentStats[0].value).toLocaleString()}
          </div>
          <div className="text-xs opacity-90">
            Teachers active today
          </div>
          <div className="flex items-center justify-center mt-2 space-x-1">
            <div className="w-1 h-1 bg-white rounded-full animate-pulse" />
            <div className="w-1 h-1 bg-white rounded-full animate-pulse" style={{animationDelay: '0.5s'}} />
            <div className="w-1 h-1 bg-white rounded-full animate-pulse" style={{animationDelay: '1s'}} />
          </div>
        </div>
      </div>
    </div>
  )
}

export function InlineUsageStats() {
  const [currentStats, setCurrentStats] = useState(stats)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStats(prev => prev.map(stat => ({
        ...stat,
        value: stat.value + Math.random() * stat.increment
      })))
    }, 15000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
      {currentStats.map((stat, index) => {
        const Icon = stat.icon
        const displayValue = stat.label.includes('Hours') 
          ? stat.value.toFixed(1)
          : Math.floor(stat.value).toLocaleString()
        
        return (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-2">
              <Icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {displayValue}
              {stat.label.includes('Hours') && <span className="text-lg">hrs</span>}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
            <div className="flex items-center justify-center mt-1">
              <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse" />
              <span className="text-xs text-green-600 dark:text-green-400 ml-1 font-medium">Live</span>
            </div>
          </div>
        )
      })}
    </div>
  )
}