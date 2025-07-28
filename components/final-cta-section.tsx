"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Users,
  MapPin,
  Clock,
  AlertCircle,
  Shield,
  GraduationCap,
  Heart,
  Award,
  CheckCircle,
  RefreshCw,
  Database,
  FileText,
} from "lucide-react"
import { useFormSubmission } from '../hooks/useFormSubmission';

const urgencyStats = [
  {
    label: "Teachers joined today",
    baseValue: 1247,
    suffix: " (and counting)",
    icon: Users,
    color: "from-blue-500 to-cyan-500",
  },
  {
    label: "Schools across 50 states",
    baseValue: 2847,
    suffix: "",
    icon: MapPin,
    color: "from-green-500 to-emerald-500",
  },
]

const guarantees = [
  {
    icon: CheckCircle,
    title: "30-Day Money-Back Guarantee",
    description: "Not happy? Get every penny back, no questions asked",
  },
  {
    icon: RefreshCw,
    title: "Cancel Anytime",
    description: "No contracts, no commitments, no hassle",
  },
  {
    icon: Database,
    title: "Your Data Stays Yours",
    description: "We never share or sell your information",
  },
  {
    icon: FileText,
    title: "Keep Your Saved Comments",
    description: "Export your library anytime, even after canceling",
  },
]

const trustSignals = [
  { icon: Shield, text: "GDPR Compliant" },
  { icon: GraduationCap, text: "Built by Teachers" },
  { icon: Heart, text: "Loved by Students" },
  { icon: Award, text: "Trusted by Schools" },
]

export function FinalCTASection() {
  const [teachersCount, setTeachersCount] = useState(1247)
  const [schoolsCount, setSchoolsCount] = useState(2847)
  const [lastActivity, setLastActivity] = useState(3)
  const [sectionVisible, setSectionVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const { submitForm, loading, success, error } = useFormSubmission();
  const [email, setEmail] = useState('');

  // Hydration-safe formatted numbers
  const [formattedTeachers, setFormattedTeachers] = useState('1247')
  const [formattedSchools, setFormattedSchools] = useState('2847')
  const [mounted, setMounted] = useState(false)

  // Consistent number formatting function
  const formatNumber = (num: number) => {
    return num.toLocaleString('en-US')
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    setFormattedTeachers(teachersCount.toLocaleString('en-US'))
    setFormattedSchools(schoolsCount.toLocaleString('en-US'))
  }, [teachersCount, schoolsCount])

  // Live counters and activity simulation
  useEffect(() => {
    // Teachers counter - increases every 8-15 seconds
    const teachersInterval = setInterval(
      () => {
        setTeachersCount((prev) => prev + Math.floor(Math.random() * 3) + 1)
      },
      Math.random() * 7000 + 8000,
    )

    // Schools counter - increases every 30-60 seconds
    const schoolsInterval = setInterval(
      () => {
        setSchoolsCount((prev) => prev + 1)
      },
      Math.random() * 30000 + 30000,
    )

    // Last activity counter - resets every 1-10 seconds
    const activityInterval = setInterval(
      () => {
        setLastActivity(Math.floor(Math.random() * 8) + 1)
      },
      Math.random() * 9000 + 1000,
    )

    return () => {
      clearInterval(teachersInterval)
      clearInterval(schoolsInterval)
      clearInterval(activityInterval)
    }
  }, [])

  // Scroll animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setSectionVisible(true)
          }
        })
      },
      { threshold: 0.2 },
    )

    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="relative py-20 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800">
        {/* Clean, static background without animations */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500" />
        <div className="absolute bottom-0 right-0 w-1/3 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-30" />
        
        {/* Static geometric accents */}
        <div className="absolute top-1/4 right-1/4 w-32 h-32 border border-white/5 rounded-full" />
        <div className="absolute bottom-1/3 left-1/4 w-24 h-24 border border-white/5 rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            sectionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Your Students Deserve{" "}
            <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400 bg-clip-text text-transparent">
              This Version
            </span>{" "}
            of You
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400 mx-auto rounded-full" />
        </div>

        {/* Urgency Elements */}
        <div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 transition-all duration-1000 delay-200 ${
            sectionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Live Teachers Counter */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
              </div>
              <div className="w-2 h-2 bg-green-400 rounded-full" />
            </div>
            <div className="text-2xl lg:text-3xl font-bold text-white mb-1">{teachersCount.toLocaleString('en-US')}</div>
            <div className="text-blue-200 text-sm">Teachers joined today (and counting)</div>
          </div>

          {/* Geographic Spread */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                <MapPin className="w-5 h-5 text-white" />
              </div>
            </div>
            <div className="text-2xl lg:text-3xl font-bold text-white mb-1">{schoolsCount.toLocaleString('en-US')}</div>
            <div className="text-green-200 text-sm">Schools across 50 states</div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 md:col-span-2 lg:col-span-1">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                <Clock className="w-5 h-5 text-white" />
              </div>
              <div className="w-2 h-2 bg-orange-400 rounded-full" />
            </div>
            <div className="text-2xl lg:text-3xl font-bold text-white mb-1">{lastActivity} seconds ago</div>
            <div className="text-orange-200 text-sm">Last comment generated</div>
          </div>
        </div>

        {/* Scarcity Message */}
        <div
          className={`bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-400/30 rounded-2xl p-6 mb-12 transition-all duration-1000 delay-400 ${
            sectionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="flex items-center space-x-3 text-center justify-center">
            <AlertCircle className="w-6 h-6 text-red-400" />
            <p className="text-white font-semibold text-lg">
              We're limiting new users to ensure quality. Join now while spots are available.
            </p>
          </div>
        </div>

        {/* Emotional Close */}
        <div
          className={`text-center mb-12 transition-all duration-1000 delay-600 ${
            sectionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-xl lg:text-2xl text-blue-100 leading-relaxed max-w-4xl mx-auto">
            You became a teacher to <span className="font-semibold text-yellow-300">change lives</span>, not to spend
            your evenings fighting with comment boxes. Give yourself permission to{" "}
            <span className="font-semibold text-pink-300">teach with joy again</span>.
          </p>
        </div>

        {/* CTA Buttons */}
        <div
          className={`flex flex-col sm:flex-row gap-6 justify-center items-center mb-16 transition-all duration-1000 delay-800 ${
            sectionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <Button className="bg-gradient-to-r from-orange-500 via-pink-500 to-red-500 hover:from-orange-600 hover:via-pink-600 hover:to-red-600 text-white font-bold px-12 py-6 text-xl rounded-full shadow-2xl transform hover:scale-105 transition-all duration-200">
            Start My Transformation
          </Button>
          <Button
            variant="outline"
            className="border-2 border-white text-white hover:bg-white hover:text-purple-900 font-semibold px-12 py-6 text-xl rounded-full bg-transparent backdrop-blur-sm"
          >
            See Pricing
          </Button>
        </div>

        {/* Newsletter Signup Form */}
        <div className="mt-16 mb-20 flex flex-col items-center">
          <form
            className="flex flex-col sm:flex-row gap-4 items-center w-full max-w-md"
            onSubmit={e => {
              e.preventDefault();
              submitForm({ email }, 'newsletter');
            }}
          >
            <input
              type="email"
              name="email"
              required
              placeholder="Sign up for updates"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="flex-1 px-6 py-4 rounded-xl text-gray-800 bg-white/90 backdrop-blur-sm border-2 border-white/30 focus:border-white focus:outline-none text-base placeholder-gray-600"
            />
            <button 
              type="submit" 
              disabled={loading} 
              className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? 'Signing up...' : 'Subscribe'}
            </button>
          </form>
          {success && <p className="text-green-300 mt-4 font-medium">Thanks, you're signed up!</p>}
          {error && <p className="text-red-300 mt-4 font-medium">{error}</p>}
        </div>

        {/* Guarantee Section */}
        <div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 transition-all duration-1000 delay-1000 ${
            sectionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {guarantees.map((guarantee, index) => {
            const IconComponent = guarantee.icon
            return (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 text-center"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-white font-semibold mb-2">{guarantee.title}</h4>
                <p className="text-blue-200 text-sm">{guarantee.description}</p>
              </div>
            )
          })}
        </div>

        {/* Trust Signals */}
        <div
          className={`flex flex-wrap justify-center items-center gap-8 transition-all duration-1000 delay-1200 ${
            sectionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {trustSignals.map((signal, index) => {
            const IconComponent = signal.icon
            return (
              <div key={index} className="flex items-center space-x-2 text-white/80">
                <IconComponent className="w-5 h-5" />
                <span className="font-medium">{signal.text}</span>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
