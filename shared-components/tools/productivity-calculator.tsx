import React from 'react'
import { Calculator, Clock, DollarSign, TrendingUp, Zap, Calendar, Users, BookOpen } from 'lucide-react'
import { cn } from '../lib/utils'

/**
 * Teacher Productivity Calculator
 * 
 * Interactive tool that calculates time and money savings from using AI tools,
 * creating compelling conversion opportunities through personalized ROI analysis.
 */

interface TimeTask {
  id: string
  name: string
  category: 'lesson-planning' | 'feedback' | 'assessment' | 'communication' | 'administration'
  timePerWeek: number // in hours
  aiTimeReduction: number // percentage reduction
  description: string
  icon: React.ComponentType<{ className?: string }>
}

const TIME_TASKS: TimeTask[] = [
  {
    id: 'lesson-planning',
    name: 'Lesson Planning',
    category: 'lesson-planning',
    timePerWeek: 8,
    aiTimeReduction: 70,
    description: 'Creating lesson plans, finding resources, and preparing materials',
    icon: BookOpen,
  },
  {
    id: 'student-feedback',
    name: 'Student Feedback & Comments',
    category: 'feedback',
    timePerWeek: 6,
    aiTimeReduction: 80,
    description: 'Writing report comments, progress reports, and individual feedback',
    icon: Users,
  },
  {
    id: 'assessment-grading',
    name: 'Assessment & Grading',
    category: 'assessment',
    timePerWeek: 5,
    aiTimeReduction: 60,
    description: 'Grading assignments, creating rubrics, and tracking progress',
    icon: TrendingUp,
  },
  {
    id: 'parent-communication',
    name: 'Parent Communication',
    category: 'communication',
    timePerWeek: 3,
    aiTimeReduction: 75,
    description: 'Writing emails, newsletters, and conference preparation',
    icon: Users,
  },
  {
    id: 'administrative-tasks',
    name: 'Administrative Tasks',
    category: 'administration',
    timePerWeek: 4,
    aiTimeReduction: 50,
    description: 'Documentation, record keeping, and compliance tasks',
    icon: Calendar,
  },
]

interface CalculatorResult {
  totalTimeSaved: number
  totalMoneySaved: number
  timePerDay: number
  timePerMonth: number
  timePerYear: number
  moneyPerDay: number
  moneyPerMonth: number
  moneyPerYear: number
  roiPercentage: number
  tasksBreakdown: Array<{
    task: TimeTask
    timeSaved: number
    moneySaved: number
  }>
}

export function ProductivityCalculator() {
  const [hourlyRate, setHourlyRate] = React.useState(45)
  const [selectedTasks, setSelectedTasks] = React.useState<Set<string>>(new Set(TIME_TASKS.map(t => t.id)))
  const [showResults, setShowResults] = React.useState(false)

  const calculateSavings = (): CalculatorResult => {
    const selectedTaskList = TIME_TASKS.filter(task => selectedTasks.has(task.id))
    
    const tasksBreakdown = selectedTaskList.map(task => {
      const timeSaved = (task.timePerWeek * task.aiTimeReduction) / 100
      const moneySaved = timeSaved * hourlyRate
      return { task, timeSaved, moneySaved }
    })

    const totalTimeSaved = tasksBreakdown.reduce((sum, item) => sum + item.timeSaved, 0)
    const totalMoneySaved = tasksBreakdown.reduce((sum, item) => sum + item.moneySaved, 0)

    return {
      totalTimeSaved,
      totalMoneySaved,
      timePerDay: totalTimeSaved / 5, // Assuming 5-day work week
      timePerMonth: totalTimeSaved * 4.33, // Average weeks per month
      timePerYear: totalTimeSaved * 52,
      moneyPerDay: totalMoneySaved / 5,
      moneyPerMonth: totalMoneySaved * 4.33,
      moneyPerYear: totalMoneySaved * 52,
      roiPercentage: ((totalMoneySaved * 52) / 299) * 100, // Assuming $299/year subscription
      tasksBreakdown,
    }
  }

  const result = calculateSavings()

  const toggleTask = (taskId: string) => {
    const newSelected = new Set(selectedTasks)
    if (newSelected.has(taskId)) {
      newSelected.delete(taskId)
    } else {
      newSelected.add(taskId)
    }
    setSelectedTasks(newSelected)
  }

  const formatTime = (hours: number): string => {
    if (hours < 1) {
      return `${Math.round(hours * 60)} minutes`
    }
    const wholeHours = Math.floor(hours)
    const minutes = Math.round((hours - wholeHours) * 60)
    return minutes > 0 ? `${wholeHours}h ${minutes}m` : `${wholeHours}h`
  }

  const formatMoney = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Calculator className="w-4 h-4" />
            Interactive Calculator
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            How Much Time & Money Could You Save?
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the real impact AI tools could have on your teaching workload. 
            Calculate your personalized time and money savings in just a few clicks.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Calculator Input */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Teaching Profile</h2>
            
            {/* Hourly Rate */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                What's your hourly rate? (for time value calculation)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <DollarSign className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="number"
                  value={hourlyRate}
                  onChange={(e) => setHourlyRate(Number(e.target.value))}
                  className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="45"
                  min="0"
                  step="5"
                />
              </div>
              <p className="text-sm text-gray-500 mt-2">
                This helps calculate the monetary value of your time savings
              </p>
            </div>

            {/* Task Selection */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Which tasks do you spend time on weekly?
              </label>
              <div className="space-y-3">
                {TIME_TASKS.map(task => {
                  const IconComponent = task.icon
                  const isSelected = selectedTasks.has(task.id)
                  
                  return (
                    <label
                      key={task.id}
                      className={cn(
                        "flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all",
                        isSelected
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      )}
                    >
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleTask(task.id)}
                        className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <IconComponent className="w-4 h-4 text-gray-600" />
                          <span className="font-medium text-gray-900">{task.name}</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{task.description}</p>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span>{task.timePerWeek}h per week</span>
                          <span>•</span>
                          <span className="text-green-600 font-medium">
                            {task.aiTimeReduction}% time reduction with AI
                          </span>
                        </div>
                      </div>
                    </label>
                  )
                })}
              </div>
            </div>

            {/* Calculate Button */}
            <button
              onClick={() => setShowResults(true)}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <Zap className="w-5 h-5" />
              Calculate My Savings
            </button>
          </div>

          {/* Results */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            {!showResults ? (
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">📊</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Your Results Will Appear Here</h3>
                <p className="text-gray-600">
                  Fill out your teaching profile and click "Calculate My Savings" to see your personalized results.
                </p>
              </div>
            ) : (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Potential Savings</h2>
                
                {/* Summary Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-xl">
                    <div className="flex items-center gap-3 mb-2">
                      <Clock className="w-6 h-6" />
                      <span className="text-sm font-medium">Time Saved</span>
                    </div>
                    <div className="text-2xl font-bold">{formatTime(result.totalTimeSaved)}</div>
                    <div className="text-sm opacity-90">per week</div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-xl">
                    <div className="flex items-center gap-3 mb-2">
                      <DollarSign className="w-6 h-6" />
                      <span className="text-sm font-medium">Money Saved</span>
                    </div>
                    <div className="text-2xl font-bold">{formatMoney(result.totalMoneySaved)}</div>
                    <div className="text-sm opacity-90">per week</div>
                  </div>
                </div>

                {/* Annual Projections */}
                <div className="bg-gray-50 rounded-xl p-6 mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Annual Impact</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">{formatTime(result.timePerYear)}</div>
                      <div className="text-sm text-gray-600">Time saved per year</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{formatMoney(result.moneyPerYear)}</div>
                      <div className="text-sm text-gray-600">Money saved per year</div>
                    </div>
                  </div>
                </div>

                {/* ROI Calculation */}
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl p-6 mb-8">
                  <h3 className="text-lg font-semibold mb-2">Return on Investment</h3>
                  <div className="text-3xl font-bold mb-2">{Math.round(result.roiPercentage)}%</div>
                  <p className="text-sm opacity-90">
                    For a $299/year subscription, you'd save {formatMoney(result.moneyPerYear)} annually
                  </p>
                </div>

                {/* Task Breakdown */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Savings Breakdown</h3>
                  <div className="space-y-3">
                    {result.tasksBreakdown.map(({ task, timeSaved, moneySaved }) => (
                      <div key={task.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <task.icon className="w-4 h-4 text-gray-600" />
                          <span className="font-medium text-gray-900">{task.name}</span>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-semibold text-green-600">{formatTime(timeSaved)}/week</div>
                          <div className="text-xs text-gray-500">{formatMoney(moneySaved)}/week</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="text-center">
                  <p className="text-gray-600 mb-4">
                    Ready to start saving {formatTime(result.timePerDay)} per day?
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                      Start Free Trial
                    </button>
                    <button className="border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                      Watch Demo
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Additional Benefits */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Beyond Time & Money</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Better Student Outcomes</h3>
              <p className="text-gray-600">
                More time for personalized instruction and student support leads to improved learning results.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Reduced Burnout</h3>
              <p className="text-gray-600">
                Less administrative work means more energy for what matters most - teaching and inspiring students.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Enhanced Relationships</h3>
              <p className="text-gray-600">
                More meaningful interactions with students, parents, and colleagues when freed from repetitive tasks.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 