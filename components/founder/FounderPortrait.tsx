'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

interface FounderPortraitProps {
  className?: string
}

export function FounderPortrait({ className = '' }: FounderPortraitProps) {
  return (
    <motion.div 
      className={`relative ${className}`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      {/* Purple glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/30 to-indigo-500/30 rounded-full blur-xl transform scale-110 group-hover:scale-125 transition-transform duration-300" />
      
      {/* Main portrait */}
      <div className="relative">
        <Image
          src="/images/founder-gb-v1.jpg"
          alt="Dr Greg Blackburn — Founder of Zaza Technologies"
          width={280}
          height={280}
          priority
          className="rounded-full shadow-2xl border-4 border-white/10 transition-transform duration-300 hover:scale-105"
          sizes="280px"
        />
        
        {/* Subtle inner glow */}
        <div className="absolute inset-0 bg-gradient-to-tr from-purple-400/10 to-indigo-400/10 rounded-full" />
      </div>
    </motion.div>
  )
}