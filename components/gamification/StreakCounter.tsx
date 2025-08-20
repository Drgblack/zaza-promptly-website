"use client"

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Flame, Trophy, Target, Star, Calendar, Zap } from 'lucide-react'
import { useAnalytics } from '@/hooks/useAnalytics'

interface Achievement {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  unlocked: boolean
  progress?: number
  maxProgress?: number
}

export function StreakCounter() {
  const [streak, setStreak] = useState(0)
  const [totalUsage, setTotalUsage] = useState(0)
  const [showCelebration, setShowCelebration] = useState(false)
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const { trackEvent } = useAnalytics()

  useEffect(() => {
    // Load streak data from localStorage
    const savedStreak = localStorage.getItem('promptly_streak')
    const savedUsage = localStorage.getItem('promptly_total_usage')
    const lastUsageDate = localStorage.getItem('promptly_last_usage')
    
    if (savedStreak && savedUsage) {
      const streakCount = parseInt(savedStreak)
      const usageCount = parseInt(savedUsage)
      
      // Check if streak should continue (used within last 2 days)
      if (lastUsageDate) {
        const lastDate = new Date(lastUsageDate)
        const now = new Date()
        const daysDiff = Math.floor((now.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24))
        
        if (daysDiff <= 1) {
          setStreak(streakCount)
        } else if (daysDiff > 2) {
          // Reset streak if more than 2 days
          setStreak(0)
          localStorage.setItem('promptly_streak', '0')
        }
      }
      
      setTotalUsage(usageCount)
    }

    // Initialize achievements
    setAchievements([
      {
        id: 'first_comment',
        title: 'First Steps',
        description: 'Generate your first AI comment',
        icon: <Star className="w-4 h-4" />,
        unlocked: usageCount > 0
      },
      {
        id: 'streak_3',
        title: 'Getting Started',
        description: 'Use Promptly 3 days in a row',
        icon: <Flame className="w-4 h-4" />,
        unlocked: streakCount >= 3
      },
      {
        id: 'streak_7',
        title: 'Week Warrior',
        description: 'Maintain a 7-day streak',
        icon: <Trophy className="w-4 h-4" />,
        unlocked: streakCount >= 7
      },
      {
        id: 'comments_25',
        title: 'Productive Teacher',
        description: 'Generate 25 comments total',
        icon: <Target className="w-4 h-4" />,
        unlocked: usageCount >= 25,
        progress: Math.min(usageCount, 25),
        maxProgress: 25
      },
      {
        id: 'comments_100',
        title: 'AI Master',
        description: 'Generate 100 comments total',
        icon: <Zap className="w-4 h-4" />,
        unlocked: usageCount >= 100,
        progress: Math.min(usageCount, 100),
        maxProgress: 100
      }
    ])
  }, [])

  const incrementUsage = () => {
    const newUsage = totalUsage + 1
    const today = new Date().toISOString().split('T')[0]
    const lastUsageDate = localStorage.getItem('promptly_last_usage_date')
    
    let newStreak = streak
    
    // Check if this is a new day
    if (lastUsageDate !== today) {
      if (lastUsageDate) {
        const lastDate = new Date(lastUsageDate)
        const nowDate = new Date(today)
        const daysDiff = Math.floor((nowDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24))
        
        if (daysDiff === 1) {
          // Consecutive day - increment streak
          newStreak = streak + 1
          if (newStreak > streak) {
            setShowCelebration(true)
            setTimeout(() => setShowCelebration(false), 3000)
            
            trackEvent('streak_milestone', { 
              streak_count: newStreak,
              achievement: newStreak === 3 ? 'first_streak' : newStreak === 7 ? 'week_warrior' : 'streak_extended'
            })
          }
        } else if (daysDiff > 1) {
          // Streak broken - reset
          newStreak = 1
        }
      } else {
        // First usage
        newStreak = 1
      }
      
      localStorage.setItem('promptly_last_usage_date', today)
      localStorage.setItem('promptly_streak', newStreak.toString())
      setStreak(newStreak)
    }
    
    localStorage.setItem('promptly_total_usage', newUsage.toString())
    localStorage.setItem('promptly_last_usage', new Date().toISOString())
    setTotalUsage(newUsage)
    
    // Track usage
    trackEvent('ai_comment_generated', { 
      total_usage: newUsage, 
      current_streak: newStreak
    })
  }

  // Expose function globally for other components to call
  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).incrementPromptlyUsage = incrementUsage
    }
  }, [streak, totalUsage])

  if (streak === 0 && totalUsage === 0) {
    return null // Don't show until user has some activity
  }

  return (
    <>
      <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200 shadow-sm">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ rotate: showCelebration ? [0, 10, -10, 0] : 0 }}
                transition={{ duration: 0.5, repeat: showCelebration ? 3 : 0 }}
              >
                <div className="flex items-center justify-center w-10 h-10 bg-orange-100 rounded-full">
                  <Flame className={`w-5 h-5 ${streak >= 3 ? 'text-orange-600' : 'text-orange-400'}`} />
                </div>
              </motion.div>
              
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-lg text-gray-800">
                    {streak} day{streak !== 1 ? 's' : ''}
                  </span>
                  <Badge variant="secondary" className="text-xs">
                    {totalUsage} total uses
                  </Badge>
                </div>
                <p className="text-sm text-gray-600">
                  {streak === 0 
                    ? "Start your streak today!" 
                    : streak === 1 
                    ? "Keep it going tomorrow!"
                    : streak >= 7 
                    ? "Amazing streak! You're on fire 🔥"
                    : `${streak} days in a row!`
                  }
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              {achievements.slice(0, 3).map(achievement => (
                <motion.div
                  key={achievement.id}
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    achievement.unlocked 
                      ? 'bg-yellow-100 text-yellow-600' 
                      : 'bg-gray-100 text-gray-400'
                  }`}
                  whileHover={{ scale: 1.1 }}
                  title={achievement.title}
                >
                  {achievement.icon}
                </motion.div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Celebration Animation */}
      <AnimatePresence>
        {showCelebration && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -20 }}
            className="fixed top-20 right-4 z-50 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-3 rounded-lg shadow-lg"
          >
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-300" />
              <span className="font-semibold">
                {streak === 3 ? "3 day streak! 🎉" : `${streak} day streak! Keep going!`}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default StreakCounter