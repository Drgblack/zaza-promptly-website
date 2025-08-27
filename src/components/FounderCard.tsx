'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

interface FounderCardProps {
  className?: string
}

export default function FounderCard({ className = '' }: FounderCardProps) {
  return (
    <motion.div 
      className={`bg-white rounded-2xl shadow-lg border border-gray-200 p-8 max-w-2xl mx-auto ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex flex-col lg:flex-row items-center gap-8">
        {/* Founder Portrait */}
        <div className="relative flex-shrink-0">
          {/* Purple glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-indigo-500/20 rounded-full blur-xl transform scale-110" />
          
          {/* Main portrait */}
          <div className="relative">
            <Image
              src="/images/founder-new.jpg"
              alt="Dr Greg Blackburn — Founder of Zaza Technologies"
              width={180}
              height={180}
              priority
              className="rounded-full shadow-xl border-4 border-white/20"
              sizes="180px"
            />
          </div>
        </div>
        
        {/* Founder Bio */}
        <div className="flex-1 text-center lg:text-left">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Dr Greg Blackburn
          </h3>
          <p className="text-indigo-600 font-medium mb-4">
            Founder & PhD in Professional Education
          </p>
          <p className="text-gray-600 leading-relaxed">
            After 20+ years building, researching, and shipping tools for educators, 
            I created Zaza Promptly to help teachers reclaim their evenings. 
            Unlike generic AI, every feature is designed with real classroom needs in mind.
          </p>
          <div className="mt-4 text-sm text-gray-500">
            <p>Honours in Information Systems (UTAS) • MBA (UQ) • PhD Professional Education</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}