'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Fire, Trophy, Target, Star, Sparkles } from 'lucide-react';
import { useAnalytics } from '@/hooks/useAnalytics';

interface StreakData {
  currentStreak: number;
  lastUsed: string | null;
  totalCommentsGenerated: number;
  weeklyGoal: number;
  weeklyProgress: number;
}

const STREAK_BADGES = [
  { days: 3, name: 'Getting Started', icon: Target, color: 'bg-blue-500' },
  { days: 7, name: 'Week Warrior', icon: Fire, color: 'bg-orange-500' },
  { days: 14, name: 'Committed Teacher', icon: Trophy, color: 'bg-yellow-500' },
  { days: 30, name: 'Master Educator', icon: Star, color: 'bg-purple-500' },
  { days: 100, name: 'Legend', icon: Sparkles, color: 'bg-pink-500' }
];

export function StreakCounter({ compact = false }: { compact?: boolean }) {
  const [streakData, setStreakData] = useState<StreakData>({
    currentStreak: 0,
    lastUsed: null,
    totalCommentsGenerated: 0,
    weeklyGoal: 15,
    weeklyProgress: 0
  });
  const [showAnimation, setShowAnimation] = useState(false);
  const { trackSnippetGenerate } = useAnalytics();

  useEffect(() => {
    // Load streak data from localStorage
    const savedData = localStorage.getItem('promptly-streak-data');
    if (savedData) {
      const data = JSON.parse(savedData);
      setStreakData(data);
      
      // Check if we should show streak animation
      const lastUsed = data.lastUsed ? new Date(data.lastUsed) : null;
      const today = new Date();
      const isToday = lastUsed && 
        lastUsed.toDateString() === today.toDateString();
      
      if (isToday && data.currentStreak >= 3) {
        setShowAnimation(true);
        setTimeout(() => setShowAnimation(false), 3000);
      }
    }

    // Initialize streak if first time
    if (!savedData) {
      const initialData: StreakData = {
        currentStreak: 1,
        lastUsed: new Date().toISOString(),
        totalCommentsGenerated: 0,
        weeklyGoal: 15,
        weeklyProgress: 0
      };
      setStreakData(initialData);
      localStorage.setItem('promptly-streak-data', JSON.stringify(initialData));
    }
  }, []);

  const updateStreak = () => {
    const today = new Date();
    const lastUsed = streakData.lastUsed ? new Date(streakData.lastUsed) : null;
    
    let newStreakData = { ...streakData };
    
    // Check if user used the app today
    if (!lastUsed || lastUsed.toDateString() !== today.toDateString()) {
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      
      // If last used was yesterday, increment streak
      if (lastUsed && lastUsed.toDateString() === yesterday.toDateString()) {
        newStreakData.currentStreak += 1;
      } else if (!lastUsed || lastUsed.toDateString() !== today.toDateString()) {
        // Reset streak if more than a day gap
        newStreakData.currentStreak = 1;
      }
      
      newStreakData.lastUsed = today.toISOString();
      newStreakData.totalCommentsGenerated += 1;
      
      // Update weekly progress (reset on Mondays)
      const startOfWeek = new Date(today);
      startOfWeek.setDate(today.getDate() - today.getDay());
      const savedWeekStart = localStorage.getItem('promptly-week-start');
      
      if (!savedWeekStart || new Date(savedWeekStart) < startOfWeek) {
        newStreakData.weeklyProgress = 1;
        localStorage.setItem('promptly-week-start', startOfWeek.toISOString());
      } else {
        newStreakData.weeklyProgress = Math.min(newStreakData.weeklyProgress + 1, newStreakData.weeklyGoal);
      }
      
      setStreakData(newStreakData);
      localStorage.setItem('promptly-streak-data', JSON.stringify(newStreakData));
      
      // Show animation for milestone streaks
      if (newStreakData.currentStreak >= 3) {
        setShowAnimation(true);
        setTimeout(() => setShowAnimation(false), 3000);
      }

      // Track usage
      trackSnippetGenerate('habit_streak_update', 'streak_counter');
    }
  };

  // Expose update function globally for use when generating comments
  useEffect(() => {
    (window as any).updateStreakCounter = updateStreak;
    return () => {
      delete (window as any).updateStreakCounter;
    };
  }, [streakData]);

  const getCurrentBadge = () => {
    const earnedBadges = STREAK_BADGES.filter(badge => streakData.currentStreak >= badge.days);
    return earnedBadges[earnedBadges.length - 1] || null;
  };

  const getNextBadge = () => {
    return STREAK_BADGES.find(badge => streakData.currentStreak < badge.days) || null;
  };

  const currentBadge = getCurrentBadge();
  const nextBadge = getNextBadge();
  const weeklyPercentage = (streakData.weeklyProgress / streakData.weeklyGoal) * 100;

  if (compact) {
    return (
      <div className="flex items-center space-x-2 bg-gradient-to-r from-orange-50 to-red-50 px-3 py-2 rounded-lg border border-orange-200">
        <Fire className={`w-4 h-4 ${showAnimation ? 'animate-pulse' : ''} ${streakData.currentStreak >= 7 ? 'text-orange-500' : 'text-gray-400'}`} />
        <span className="text-sm font-medium text-gray-900">
          {streakData.currentStreak} day streak!
        </span>
        {currentBadge && (
          <Badge variant="secondary" className="text-xs">
            {currentBadge.name}
          </Badge>
        )}
      </div>
    );
  }

  return (
    <Card className={`transition-all duration-300 ${showAnimation ? 'ring-2 ring-orange-400 shadow-lg transform scale-105' : ''}`}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-full ${currentBadge ? currentBadge.color : 'bg-gray-200'}`}>
              {currentBadge ? (
                <currentBadge.icon className="w-5 h-5 text-white" />
              ) : (
                <Fire className="w-5 h-5 text-gray-500" />
              )}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Your Teaching Streak</h3>
              <p className="text-sm text-gray-600">
                {streakData.currentStreak} {streakData.currentStreak === 1 ? 'day' : 'days'} in a row!
              </p>
            </div>
          </div>
          
          {currentBadge && (
            <Badge className={`${currentBadge.color} text-white border-0`}>
              {currentBadge.name}
            </Badge>
          )}
        </div>

        {/* Weekly Progress */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Weekly Goal</span>
            <span className="text-sm text-gray-600">{streakData.weeklyProgress}/{streakData.weeklyGoal}</span>
          </div>
          <Progress value={weeklyPercentage} className="h-2" />
          <p className="text-xs text-gray-500 mt-1">
            {weeklyPercentage >= 100 ? '🎉 Goal achieved!' : `${Math.ceil(streakData.weeklyGoal - streakData.weeklyProgress)} more this week!`}
          </p>
        </div>

        {/* Next Badge */}
        {nextBadge && (
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="flex items-center space-x-2 mb-2">
              <nextBadge.icon className="w-4 h-4 text-gray-400" />
              <span className="text-sm font-medium text-gray-700">Next: {nextBadge.name}</span>
            </div>
            <div className="flex justify-between text-xs text-gray-600">
              <span>Progress to next badge</span>
              <span>{streakData.currentStreak}/{nextBadge.days} days</span>
            </div>
            <Progress value={(streakData.currentStreak / nextBadge.days) * 100} className="h-1 mt-1" />
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-gray-200">
          <div className="text-center">
            <div className="text-lg font-bold text-gray-900">{streakData.totalCommentsGenerated}</div>
            <div className="text-xs text-gray-600">Comments Generated</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-purple-600">{Math.round(streakData.totalCommentsGenerated * 5)} min</div>
            <div className="text-xs text-gray-600">Time Saved</div>
          </div>
        </div>

        {showAnimation && (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-90 rounded-lg">
            <div className="text-center animate-bounce">
              <Fire className="w-8 h-8 text-orange-500 mx-auto mb-2" />
              <p className="text-sm font-bold text-gray-900">Streak milestone!</p>
              <p className="text-xs text-gray-600">{streakData.currentStreak} days strong!</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}