'use client'

import { motion } from 'framer-motion'
import { Paintbrush2, Plane, Languages, GraduationCap, BookOpen, Building2 } from 'lucide-react'

interface TimelineEvent {
  year: string
  title: string
  description: string
  icon: React.ComponentType<any>
}

const timelineEvents: TimelineEvent[] = [
  {
    year: '1980s',
    title: 'Painter\'s Apprenticeship',
    description: 'Started at Cascade Brewery via father\'s connection at Tas Paints. Learned perseverance by finishing the trade.',
    icon: Paintbrush2
  },
  {
    year: 'Early 1990s',
    title: 'World Travel',
    description: 'Backpacked globally, immersed in new cultures, and realised the power of education.',
    icon: Plane
  },
  {
    year: '1994–1995',
    title: 'German Language Course',
    description: 'Completed a Diploma in German in Frankfurt, which opened doors to university.',
    icon: Languages
  },
  {
    year: '1995–1999',
    title: 'UTAS — Information Systems (Honours)',
    description: 'University of Tasmania: Information Systems through to Honours.',
    icon: GraduationCap
  },
  {
    year: '2000–2004',
    title: 'MBA — The University of Queensland',
    description: 'Master of Business Administration.',
    icon: BookOpen
  },
  {
    year: '2016–2019',
    title: 'PhD — Professional Education',
    description: 'City, University of London: research in educational technology and professional development.',
    icon: GraduationCap
  },
  {
    year: '2025',
    title: 'Zaza Technologies',
    description: 'Founded to build teacher-first AI tools, informed by decades of work across education and professional learning.',
    icon: Building2
  }
]

export function Timeline() {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-purple-500/50 via-indigo-500/50 to-blue-500/50" />
        
        <div className="space-y-8">
          {timelineEvents.map((event, index) => (
            <motion.div
              key={event.year}
              className="relative flex items-start space-x-6"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Icon circle */}
              <div className="relative z-10 flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-full shadow-lg border-4 border-white/10">
                <event.icon className="w-6 h-6 text-white" />
              </div>
              
              {/* Content */}
              <div className="flex-1 bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/10">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-semibold text-white">{event.title}</h3>
                  <span className="text-sm font-medium text-purple-300 bg-purple-900/30 px-3 py-1 rounded-full">
                    {event.year}
                  </span>
                </div>
                <p className="text-gray-300 leading-relaxed">{event.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}