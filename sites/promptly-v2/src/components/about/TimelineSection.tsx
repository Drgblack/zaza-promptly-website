'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { usePrefersReducedMotion } from '@/lib/motion'

interface TimelineItem {
  period: string
  title: string
  description: string
  isHighlight?: boolean
}

const timelineItems: TimelineItem[] = [
  {
    period: '1980s',
    title: 'Painter\'s Apprenticeship',
    description: 'Started at Cascade Brewery via father\'s connection at Tas Paints. Learned perseverance by finishing the trade.',
  },
  {
    period: 'Early 1990s',
    title: 'World Travel',
    description: 'Backpacked globally, immersed in new cultures, and realised the power of education.',
  },
  {
    period: '1994–1995',
    title: 'German Language Course',
    description: 'Completed a Diploma in German in Frankfurt, which opened doors to university.',
  },
  {
    period: '1995–1999',
    title: 'UTAS — Information Systems',
    description: 'University of Tasmania: Information Systems through to Honours.',
  },
  {
    period: '2000–2004',
    title: 'MBA — University of Queensland',
    description: 'Master of Business Administration.',
  },
  {
    period: '2016–2019',
    title: 'PhD — Professional Education',
    description: 'City, University of London: research in educational technology and professional development.',
  },
  {
    period: '2025',
    title: 'Zaza Technologies',
    description: 'Founded to build teacher-first AI tools, informed by decades of work across education and professional learning.',
    isHighlight: true,
  },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12, // 120ms stagger between timeline items
      delayChildren: 0.2, // Small delay before starting
    },
  },
}

const itemVariants = {
  hidden: { 
    opacity: 0, 
    y: 30 
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

// Custom hook for intersection observer with once-only trigger
function useInViewOnce() {
  const ref = useRef<HTMLDivElement>(null)
  const [hasBeenInView, setHasBeenInView] = useState(false)
  const isInView = useInView(ref, { 
    once: false // We'll handle the "once" logic ourselves
  })

  useEffect(() => {
    if (isInView && !hasBeenInView) {
      setHasBeenInView(true)
    }
  }, [isInView, hasBeenInView])

  return { ref, isInView: hasBeenInView }
}

export default function TimelineSection() {
  const { ref, isInView } = useInViewOnce()
  const shouldReduceMotion = usePrefersReducedMotion()
  const svgRef = useRef<SVGPathElement>(null)


  // Skip animations if user prefers reduced motion
  if (shouldReduceMotion) {
    return (
      <section className="py-20 border-t border-white/10">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-semibold text-white text-center mb-16">The Journey</h2>
            
            <div className="relative">
              {/* Static timeline line */}
              <div className="absolute left-0 md:left-48 w-px h-full bg-gradient-to-b from-brand-400 to-purple-600 ml-6 md:ml-0" />
              
              <div className="space-y-12">
                {timelineItems.map((item, index) => (
                  <div key={index} className="flex flex-col md:flex-row gap-6 items-start relative">
                    {/* Timeline dot */}
                    <div className="absolute left-0 md:left-48 w-3 h-3 bg-brand-400 rounded-full ml-5 md:ml-[-6px] mt-2" />
                    
                    <div className="md:w-48 flex-shrink-0 pl-12 md:pl-0">
                      <div className="text-brand-400 font-semibold text-sm uppercase tracking-wide mb-1">
                        {item.period}
                      </div>
                      <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                    </div>
                    <div className="flex-1 pl-12 md:pl-0">
                      <div className={`p-6 border border-white/10 rounded-2xl ${
                        item.isHighlight 
                          ? 'bg-gradient-to-br from-brand-600/20 to-purple-600/20 border border-brand-500/30'
                          : 'bg-slate-800/40'
                      }`}>
                        <p className={item.isHighlight ? 'text-slate-200' : 'text-slate-300'}>
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 border-t border-white/10">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <motion.h2 
            className="text-3xl font-semibold text-white text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, threshold: 0.8 }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          >
            The Journey
          </motion.h2>
          
          <div className="relative" ref={ref}>
            {/* Animated SVG timeline line */}
            <div className="absolute left-0 md:left-48 ml-6 md:ml-0 h-full">
              <svg className="w-px h-full" style={{ overflow: 'visible' }}>
                <defs>
                  <linearGradient id="timelineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="rgb(96, 165, 250)" />
                    <stop offset="100%" stopColor="rgb(147, 51, 234)" />
                  </linearGradient>
                </defs>
                <motion.path
                  ref={svgRef}
                  d={`M 0 0 L 0 ${timelineItems.length * 200}`} // Approximate height based on items
                  stroke="url(#timelineGradient)"
                  strokeWidth="1"
                  fill="none"
                  initial={{
                    pathLength: 0,
                    opacity: 0,
                  }}
                  animate={isInView ? {
                    pathLength: 1,
                    opacity: 1,
                  } : {}}
                  transition={{
                    pathLength: { 
                      duration: 0.6, // 600ms draw animation
                      ease: [0.25, 0.1, 0.25, 1],
                      delay: 0.1
                    },
                    opacity: { 
                      duration: 0.2,
                      delay: 0.1
                    }
                  }}
                />
              </svg>
            </div>
            
            <motion.div 
              className="space-y-12"
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              {timelineItems.map((item, index) => (
                <motion.div 
                  key={index}
                  variants={itemVariants}
                  className="flex flex-col md:flex-row gap-6 items-start relative"
                >
                  {/* Timeline dot */}
                  <motion.div 
                    className="absolute left-0 md:left-48 w-3 h-3 bg-brand-400 rounded-full ml-5 md:ml-[-6px] mt-2 z-10"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={isInView ? { scale: 1, opacity: 1 } : {}}
                    transition={{ 
                      duration: 0.3,
                      delay: 0.3 + (index * 0.12), // Stagger dots after line draws
                      ease: [0.25, 0.1, 0.25, 1]
                    }}
                  />
                  
                  <div className="md:w-48 flex-shrink-0 pl-12 md:pl-0">
                    <div className="text-brand-400 font-semibold text-sm uppercase tracking-wide mb-1">
                      {item.period}
                    </div>
                    <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                  </div>
                  <div className="flex-1 pl-12 md:pl-0">
                    <div className={`p-6 border border-white/10 rounded-2xl ${
                      item.isHighlight 
                        ? 'bg-gradient-to-br from-brand-600/20 to-purple-600/20 border border-brand-500/30'
                        : 'bg-slate-800/40'
                    }`}>
                      <p className={item.isHighlight ? 'text-slate-200' : 'text-slate-300'}>
                        {item.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}