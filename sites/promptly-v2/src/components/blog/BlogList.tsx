'use client'

import { motion } from 'framer-motion'
import { usePrefersReducedMotion } from '@/lib/motion'
import BlogCard from './BlogCard'
import type { BlogPost } from '@/lib/blog-types'

interface BlogListProps {
  posts: BlogPost[]
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1, // 100ms stagger between items
      delayChildren: 0.2, // Small delay before starting
    },
  },
}

const itemVariants = {
  hidden: { 
    opacity: 0, 
    y: 20 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
}

export default function BlogList({ posts }: BlogListProps) {
  const shouldReduceMotion = usePrefersReducedMotion()

  if (shouldReduceMotion) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {posts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    )
  }

  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {posts.map((post) => (
        <motion.div key={post.slug} variants={itemVariants}>
          <BlogCard post={post} />
        </motion.div>
      ))}
    </motion.div>
  )
}