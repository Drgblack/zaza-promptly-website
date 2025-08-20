import { LucideIcon, MessageSquare, BookOpen, Zap, FileText, Users, Globe, Database } from 'lucide-react'

export interface Product {
  id: string
  name: string
  tagline: string
  description: string
  bullets: string[]
  icon: LucideIcon
  href: string
  category: 'teaching' | 'other'
  status: 'available' | 'waitlist' | 'coming-soon'
  ctaPrimary: string
  ctaSecondary?: string
  stats?: string
  crossLink?: {
    text: string
    href: string
  }
}

export const products: Product[] = [
  // Teaching Tools
  {
    id: 'promptly',
    name: 'Zaza Promptly',
    tagline: 'Write caring, professional comments in minutes—not Sunday night.',
    description: 'AI-powered assistant for parent communications and student reports. Trusted by 12,000+ teachers worldwide.',
    bullets: [
      'Sounds like you, not a robot',
      'School-safe tone + templates', 
      'Built for real reports & parent notes'
    ],
    icon: MessageSquare,
    href: '/promptly',
    category: 'teaching',
    status: 'available',
    ctaPrimary: 'Try Free Now',
    ctaSecondary: 'See Examples',
    stats: '12,000+ teachers',
    crossLink: {
      text: 'Perfect your lessons too? Try Teach →',
      href: '/teach'
    }
  },
  {
    id: 'teach', 
    name: 'Zaza Teach',
    tagline: 'Plan engaging, curriculum-aligned lessons faster.',
    description: 'Smart lesson planning that saves 3-5 hours per week with curriculum-aligned content and export capabilities.',
    bullets: [
      'Spark lesson ideas and sequences',
      'Aligns to your context and goals',
      'Export to your planner in clicks'
    ],
    icon: BookOpen,
    href: '/teach',
    category: 'teaching',
    status: 'available',
    ctaPrimary: 'Start Planning',
    ctaSecondary: 'Join Waitlist',
    stats: 'Save 3-5 hours weekly',
    crossLink: {
      text: 'Great lessons, better feedback? Try Promptly →',
      href: '/promptly'
    }
  },
  {
    id: 'autoplanner',
    name: 'Zaza AutoPlanner', 
    tagline: 'Your future-ready co-planner for complex teaching workflows.',
    description: 'Advanced AI agent for comprehensive lesson planning with multimodal capabilities and adaptive workflows.',
    bullets: [
      'Multimodal: text, images, resources',
      'Suggests sequences, questions, scaffolds',
      'Adapts to your class and constraints'
    ],
    icon: Zap,
    href: '/autoplanner',
    category: 'teaching',
    status: 'waitlist',
    ctaPrimary: 'Join Early Access',
    ctaSecondary: 'Learn More',
    stats: 'Next-gen AI',
    crossLink: {
      text: 'Need feedback help now? Try Promptly →',
      href: '/promptly'
    }
  },
  // Other Zaza Apps
  {
    id: 'notably',
    name: 'Zaza Notably',
    tagline: 'Clear school communications—policies, proposals, reports.',
    description: 'Professional communication suite for school administrators and leadership teams.',
    bullets: [
      'Professional tone, consistent style',
      'Shareable docs & version history', 
      'Saves hours across the team'
    ],
    icon: FileText,
    href: '/notably',
    category: 'other',
    status: 'waitlist',
    ctaPrimary: 'Join Waitlist',
    ctaSecondary: 'Learn More',
    stats: 'Admin-focused'
  },
  {
    id: 'spark',
    name: 'Zaza Spark',
    tagline: 'Onboarding, training, and internal comms—done faster.',
    description: 'HR and internal communications platform designed specifically for educational institutions.',
    bullets: [
      'Role-specific onboarding packs',
      'Snappy updates people actually read',
      'Templates for training & policies'
    ],
    icon: Users,
    href: '/spark',
    category: 'other', 
    status: 'waitlist',
    ctaPrimary: 'Join Waitlist',
    ctaSecondary: 'Learn More',
    stats: 'HR simplified'
  },
  {
    id: 'looop',
    name: 'Zaza Looop',
    tagline: 'Culturally rich language learning for bilingual classrooms.',
    description: 'Adaptive language learning platform with real-world topics and cultural context for diverse learners.',
    bullets: [
      'Real-world topics and voices',
      'Adaptive practice + feedback',
      'Teacher-guided projects'
    ],
    icon: Globe,
    href: '/looop',
    category: 'other',
    status: 'coming-soon', 
    ctaPrimary: 'Coming Soon',
    ctaSecondary: 'Get Updates',
    stats: 'Multilingual ready'
  },
  {
    id: 'knowledgecore',
    name: 'Zaza KnowledgeCore',
    tagline: 'Capture, connect, and resurface your best ideas—for years.',
    description: 'Professional knowledge management system that grows with your teaching experience.',
    bullets: [
      'Tag and link across lessons + resources',
      'Resurfaces when relevant',
      'Your private professional memory'
    ],
    icon: Database,
    href: '/knowledgecore',
    category: 'other',
    status: 'coming-soon',
    ctaPrimary: 'Coming Soon', 
    ctaSecondary: 'Get Updates',
    stats: 'Memory enhanced'
  }
]

export const getProductsByCategory = (category: 'teaching' | 'other') => 
  products.filter(product => product.category === category)

export const getProductById = (id: string) => 
  products.find(product => product.id === id)

export const getAvailableProducts = () =>
  products.filter(product => product.status === 'available')

export const getFeaturedProduct = () => 
  products.find(product => product.id === 'promptly') || products[0]

// Comparison data for the 3 main teaching tools
export const teachingToolsComparison = [
  {
    feature: 'Primary use',
    promptly: 'Parent comms & reports',
    teach: 'Lesson planning',
    autoplanner: 'Complex workflows'
  },
  {
    feature: 'Time saved',
    promptly: '5+ hours/week',
    teach: '3-5 hours/week', 
    autoplanner: '8+ hours/week'
  },
  {
    feature: 'Who it\'s for',
    promptly: 'All teachers',
    teach: 'Lesson planners',
    autoplanner: 'Advanced users'
  }
]