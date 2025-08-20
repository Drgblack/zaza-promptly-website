'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface StoryBlockProps {
  title: string
  children: ReactNode
  delay?: number
  className?: string
}

export function StoryBlock({ title, children, delay = 0, className = '' }: StoryBlockProps) {
  return (
    <motion.section 
      className={`py-20 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 leading-tight">
          {title}
        </h2>
        <div className="prose prose-lg prose-gray-600 max-w-none [&>p]:text-lg [&>p]:leading-relaxed [&>p:first-child]:text-xl [&>p:last-child]:italic [&>p:last-child]:text-gray-600">
          {children}
        </div>
      </div>
    </motion.section>
  )
}