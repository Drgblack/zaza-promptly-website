"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Sparkles, User, FileText, Clock, Calendar } from "lucide-react"
import Image from "next/image"

const FloatingElement = ({
  children,
  delay = 0,
  isTransformed = false,
  transformedContent,
  transformedColor = "text-yellow-500",
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: 1,
        y: [0, -10, 0],
        scale: isTransformed ? [1, 1.1, 1] : 1,
      }}
      transition={{
        opacity: { delay },
        y: {
          duration: 3,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay,
        },
        scale: isTransformed
          ? {
              duration: 0.5,
              ease: "easeOut",
            }
          : {},
      }}
      className={`absolute bg-white/80 backdrop-blur-sm px-3 py-2 rounded-full text-sm font-medium shadow-lg transition-all duration-700 ${
        isTransformed ? `${transformedColor} bg-yellow-50/90 shadow-yellow-200/50` : "text-gray-600"
      }`}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={isTransformed ? "transformed" : "original"}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          {isTransformed ? transformedContent : children}
        </motion.span>
      </AnimatePresence>
    </motion.div>
  )
}

const Sparkle = ({ delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0, 1, 0],
        scale: [0, 1, 0],
        x: [0, Math.random() * 100 - 50],
        y: [0, Math.random() * 100 - 50],
      }}
      transition={{
        duration: 3,
        repeat: Number.POSITIVE_INFINITY,
        delay,
        ease: "easeInOut",
      }}
      className="absolute"
    >
      <Sparkles className="text-yellow-400 w-4 h-4" />
    </motion.div>
  )
}

const TeacherFigure = ({ isTransformed = false }) => {
  return (
    <motion.div
      animate={{
        scale: isTransformed ? 1.1 : 1,
        rotate: isTransformed ? [0, 2, -2, 0] : 0,
      }}
      transition={{
        scale: { duration: 0.5 },
        rotate: isTransformed ? { duration: 0.6, ease: "easeInOut" } : {},
      }}
      className="relative"
    >
      <motion.div
        className={`w-24 h-24 rounded-full flex items-center justify-center text-4xl transition-all duration-700 ${
          isTransformed
            ? "bg-gradient-to-br from-yellow-200 to-orange-200 shadow-lg shadow-yellow-300/30"
            : "bg-gradient-to-br from-gray-200 to-blue-200"
        }`}
      >
        <motion.div
          animate={{
            rotate: isTransformed ? 360 : 0,
          }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          {isTransformed ? "😊" : "😰"}
        </motion.div>
      </motion.div>

      {/* Glow effect when transformed */}
      <AnimatePresence>
        {isTransformed && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.6, scale: 1.2 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 bg-yellow-300/30 rounded-full blur-xl -z-10"
          />
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function InteractiveHero() {
  const [isTransformed, setIsTransformed] = useState(false)
  const [sparkles, setSparkles] = useState<number[]>([])

  useEffect(() => {
    // Generate sparkles
    const sparkleArray = Array.from({ length: 8 }, (_, i) => i)
    setSparkles(sparkleArray)
  }, [])

  const handleTransformation = () => {
    setIsTransformed(!isTransformed)
  }

  return (
    <section className="relative bg-white py-20 px-4 overflow-hidden">
      {/* Background gradient that shifts */}
      <motion.div
        className="absolute inset-0 opacity-30"
        animate={{
          background: isTransformed
            ? "linear-gradient(135deg, #FEF3C7 0%, #FDE68A 50%, #F59E0B 100%)"
            : "linear-gradient(135deg, #E5E7EB 0%, #D1D5DB 50%, #9CA3AF 100%)",
        }}
        transition={{ duration: 1 }}
      />

      {/* Floating sparkles */}
      <div className="absolute inset-0 pointer-events-none">
        {sparkles.map((index) => (
          <div
            key={index}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          >
            <Sparkle delay={index * 0.5} />
          </div>
        ))}
      </div>

      <div className="max-w-6xl mx-auto text-center relative z-10">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <Image
            src="/images/zaza-logo.png"
            alt="Zaza Technologies Logo"
            width={120}
            height={120}
            className="mx-auto mb-8"
          />
        </motion.div>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-bold text-[#4A235A] mb-6 leading-tight"
        >
          Helping Teachers Thrive - One AI Tool at a Time
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl md:text-2xl text-gray-700 mb-12 max-w-4xl mx-auto leading-relaxed"
        >
          You became a teacher to make a difference - not to spend Sunday nights drowning in admin. We're here to bring
          back your spark.
        </motion.p>

        {/* Interactive transformation area */}
        <motion.div
          className="relative w-full max-w-4xl mx-auto h-96 cursor-pointer"
          onClick={handleTransformation}
          onHoverStart={() => setIsTransformed(true)}
          onHoverEnd={() => setIsTransformed(false)}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          {/* Background container */}
          <motion.div
            className="absolute inset-0 rounded-3xl backdrop-blur-sm border border-white/20"
            animate={{
              background: isTransformed
                ? "linear-gradient(135deg, rgba(254, 243, 199, 0.8) 0%, rgba(253, 230, 138, 0.8) 100%)"
                : "linear-gradient(135deg, rgba(219, 234, 254, 0.8) 0%, rgba(191, 219, 254, 0.8) 100%)",
            }}
            transition={{ duration: 0.7 }}
          />

          {/* Teacher figure in center */}
          <div className="absolute inset-0 flex items-center justify-center">
            <TeacherFigure isTransformed={isTransformed} />
          </div>

          {/* Floating elements */}
          <div className="absolute inset-0">
            {/* Top left */}
            <div className="absolute top-12 left-12">
              <FloatingElement
                delay={0}
                isTransformed={isTransformed}
                transformedContent="Creative Lessons"
                transformedColor="text-green-600"
              >
                <FileText className="inline w-4 h-4 mr-1" />
                Grading Papers
              </FloatingElement>
            </div>

            {/* Top right */}
            <div className="absolute top-16 right-16">
              <FloatingElement
                delay={0.3}
                isTransformed={isTransformed}
                transformedContent="Work-Life Balance"
                transformedColor="text-blue-600"
              >
                <Calendar className="inline w-4 h-4 mr-1" />
                Lesson Plans
              </FloatingElement>
            </div>

            {/* Bottom left */}
            <div className="absolute bottom-20 left-20">
              <FloatingElement
                delay={0.6}
                isTransformed={isTransformed}
                transformedContent="Student Engagement"
                transformedColor="text-purple-600"
              >
                <Clock className="inline w-4 h-4 mr-1" />
                Admin Tasks
              </FloatingElement>
            </div>

            {/* Bottom right */}
            <div className="absolute bottom-12 right-12">
              <FloatingElement
                delay={0.9}
                isTransformed={isTransformed}
                transformedContent="Teaching Joy"
                transformedColor="text-orange-600"
              >
                <User className="inline w-4 h-4 mr-1" />
                Sunday Stress
              </FloatingElement>
            </div>

            {/* Additional floating elements for mobile */}
            <div className="absolute top-1/3 left-8">
              <FloatingElement
                delay={1.2}
                isTransformed={isTransformed}
                transformedContent="AI Assistance"
                transformedColor="text-indigo-600"
              >
                Overwhelm
              </FloatingElement>
            </div>

            <div className="absolute top-1/3 right-8">
              <FloatingElement
                delay={1.5}
                isTransformed={isTransformed}
                transformedContent="Peace of Mind"
                transformedColor="text-teal-600"
              >
                Burnout
              </FloatingElement>
            </div>
          </div>

          {/* Hover instruction */}
          <motion.div
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 1 }}
            animate={{ opacity: isTransformed ? 0 : 1 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-sm text-gray-600 bg-white/70 px-3 py-1 rounded-full">
              Click or hover to see the transformation
            </p>
          </motion.div>
        </motion.div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12"
        >
          <Button
            size="lg"
            className="bg-gradient-to-r from-[#4A235A] to-purple-600 hover:from-[#5A2C6A] hover:to-purple-700 text-white px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
          >
            <Sparkles className="mr-2 w-5 h-5 group-hover:animate-spin" />
            Experience the Magic
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
