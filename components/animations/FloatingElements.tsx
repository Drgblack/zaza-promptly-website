'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Sparkles, Star, Heart, Zap, Target, Trophy } from 'lucide-react'

const icons = [Sparkles, Star, Heart, Zap, Target, Trophy]

export default function FloatingElements() {
  const [elements, setElements] = useState<Array<{
    id: number
    Icon: any
    initialX: number
    initialY: number
    color: string
    size: string
    duration: number
  }>>([])

  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    // Generate elements only on client side
    setElements(
      Array.from({ length: 6 }, (_, i) => ({
        id: i,
        Icon: icons[i % icons.length],
        initialX: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
        initialY: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
        color: ['text-blue-400', 'text-purple-400', 'text-pink-400', 'text-indigo-400', 'text-teal-400', 'text-orange-400'][i % 6],
        size: ['w-6 h-6', 'w-4 h-4', 'w-5 h-5'][i % 3],
        duration: 8 + Math.random() * 4
      }))
    )
  }, [])

  if (!isClient || elements.length === 0) return null

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {elements.map((element) => {
        const { id, Icon, initialX, initialY, color, size, duration } = element
        
        return (
          <motion.div
            key={id}
            className={`absolute ${color} ${size} opacity-20`}
            initial={{ x: initialX, y: initialY, rotate: 0 }}
            animate={{
              y: [initialY, initialY - 100, initialY],
              x: [initialX, initialX + 50, initialX - 30, initialX],
              rotate: [0, 180, 360],
              scale: [1, 1.2, 0.8, 1]
            }}
            transition={{
              duration,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <Icon />
          </motion.div>
        )
      })}
    </div>
  )
}