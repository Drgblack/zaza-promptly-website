import type { Metadata } from 'next'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Users, Shield, BookOpen, Star, ArrowRight, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { FounderPortrait } from '@/components/founder/FounderPortrait'
import { StoryBlock } from '@/components/founder/StoryBlock'
import { Timeline } from '@/components/founder/Timeline'
import { EmailCaptureForm } from '@/components/EmailCaptureForm'

export const metadata: Metadata = {
  title: 'About the Founder - Dr Greg Blackburn | Teacher-First AI',
  description: 'Meet Dr Greg Blackburn, PhD in Professional Education, who built Zaza after 20+ years helping educators. From Tasmania apprentice to AI founder - the authentic story behind teacher-first technology.',
  keywords: [
    'Dr Greg Blackburn',
    'PhD Professional Education', 
    'teacher-first AI',
    'education technology founder',
    'AI for teachers',
    'Zaza Technologies founder',
    '20 years education experience'
  ],
  openGraph: {
    title: 'About Dr Greg Blackburn - Teacher-First AI Founder',
    description: 'The authentic story of how a Tasmania apprentice became a PhD educator building AI tools that respect teachers and save time.',
    type: 'profile',
    url: 'https://zazapromptly.com/about-founder',
    images: [{
      url: 'https://zazapromptly.com/images/founder-gb-v1.jpg',
      width: 400,
      height: 400,
      alt: 'Dr Greg Blackburn — Founder of Zaza Technologies'
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Dr Greg Blackburn - Teacher-First AI Founder',
    description: 'From Tasmania apprentice to PhD educator building AI that respects teachers.',
    images: ['https://zazapromptly.com/images/founder-gb-v1.jpg'],
  },
  alternates: {
    canonical: 'https://zazapromptly.com/about-founder',
  },
}

export default function AboutFounderPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Portrait */}
            <motion.div 
              className="flex justify-center lg:justify-end group"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <FounderPortrait />
            </motion.div>
            
            {/* Right: Intro */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Badge className="bg-purple-100 text-purple-800 border-purple-200 mb-6">
                <Users className="w-4 h-4 mr-2" />
                20+ years building for learners & educators
              </Badge>
              
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                About the{' '}
                <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  Founder
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed max-w-2xl">
                Teacher-first technology built with empathy, reducing workload through AI that respects educators.
              </p>
              
              <div className="flex items-center space-x-6 text-sm text-gray-500">
                <div className="flex items-center">
                  <Shield className="w-4 h-4 mr-2 text-green-600" />
                  <span>PhD Professional Education</span>
                </div>
                <div className="flex items-center">
                  <BookOpen className="w-4 h-4 mr-2 text-blue-600" />
                  <span>City, University of London</span>
                </div>
                <div className="flex items-center">
                  <Star className="w-4 h-4 mr-2 text-purple-600" />
                  <span>Self-Funded</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Story Blocks */}
      <StoryBlock title="No Straight Line" className="bg-white/60">
        <p className="text-xl leading-relaxed mb-6">
          I grew up in Tasmania with no clear direction. No childhood dreams of becoming an artist or entrepreneur.
        </p>
        <p className="text-lg leading-relaxed mb-6">
          My father owned Tas Paints, and through his connections I started a painter's apprenticeship at the Cascade Brewery. I hated it.
        </p>
        <p className="text-lg leading-relaxed mb-6">
          Dad told me to see it through - "get your papers." I did. It taught me perseverance and clarity about what I didn't want to do with my life.
        </p>
        <p className="text-lg leading-relaxed text-gray-600 italic">
          Sometimes the path forward only becomes clear when you know what you're walking away from.
        </p>
      </StoryBlock>

      <StoryBlock title="Discovering Education" delay={0.1}>
        <p className="text-xl leading-relaxed mb-6">
          So I bought a backpack and went into the world to discover... something.
        </p>
        <p className="text-lg leading-relaxed mb-6">
          New cultures, new people, great and not-so-great experiences. Over time I realized education was the only thing that would open doors and carry me forward.
        </p>
        <p className="text-lg leading-relaxed mb-6">
          I completed a German language course in Frankfurt and earned a Diploma in German that helped me enter the University of Tasmania, where I studied Information Systems to Honours level.
        </p>
        <p className="text-lg leading-relaxed text-gray-600 italic">
          Travel taught me that learning is the universal language that opens every door.
        </p>
      </StoryBlock>

      <StoryBlock title="Putting it to Work" className="bg-white/60" delay={0.2}>
        <p className="text-xl leading-relaxed mb-6">
          After UTAS, I completed an MBA at The University of Queensland, then eventually a PhD in Professional Education at City, University of London.
        </p>
        <p className="text-lg leading-relaxed mb-6">
          Since then I have spent twenty years building, researching, and shipping tools that help educators. Not teaching formally, but understanding how technology can serve those who do.
        </p>
        <p className="text-lg leading-relaxed mb-6">
          I learned from a family of teachers - my sister, aunty, uncle, cousins, and many friends who chose this profession because they wanted to make a difference.
        </p>
        <p className="text-lg leading-relaxed text-gray-600 italic">
          The best technology disappears into the background, amplifying what humans do best.
        </p>
      </StoryBlock>

      <StoryBlock title="Why Zaza Promptly" delay={0.3}>
        <p className="text-xl leading-relaxed mb-6">
          After decades of seeing EdTech tools that frustrate more than they help, I built Zaza Promptly on sound educational principles.
        </p>
        <p className="text-lg leading-relaxed mb-6">
          This isn't just another AI tool - it's purpose-built to respect pedagogical integrity while solving the real pain points that keep teachers working late into the night.
        </p>
        <p className="text-lg leading-relaxed mb-6">
          Promptly gives suggestions, but teachers always remain in control. Every feature is designed to save time, not create more work.
        </p>
        <p className="text-lg leading-relaxed text-gray-600 italic">
          AI was never meant to replace teachers. It was meant to free them to do what only humans can do.
        </p>
      </StoryBlock>

      {/* Timeline Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              The Journey
            </h2>
            <p className="text-xl text-purple-200 max-w-3xl mx-auto">
              From Tasmania apprentice to PhD educator building AI that respects teachers
            </p>
          </motion.div>
          
          <Timeline />
        </div>
      </section>

      {/* Trust & Connection Band */}
      <section className="py-16 bg-white/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Teacher Testimonial */}
            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-8 mb-12 border border-purple-100">
              <blockquote className="text-2xl text-gray-800 italic text-center mb-6">
                "Finally, someone who understands what we actually need. Greg's tools feel like they were built by someone who's been in our shoes."
              </blockquote>
              <cite className="text-center block text-gray-600">
                — Sarah M., Primary School Teacher
              </cite>
            </div>
            
            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center gap-6">
              <Badge className="bg-green-100 text-green-800 border-green-200 px-6 py-3 text-base">
                <Shield className="w-5 h-5 mr-2" />
                School-safe
              </Badge>
              <Badge className="bg-blue-100 text-blue-800 border-blue-200 px-6 py-3 text-base">
                <Users className="w-5 h-5 mr-2" />
                Built by educators
              </Badge>
              <Badge className="bg-purple-100 text-purple-800 border-purple-200 px-6 py-3 text-base">
                <Shield className="w-5 h-5 mr-2" />
                Privacy-first
              </Badge>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Soft CTA Footer */}
      <section className="py-20 bg-gradient-to-br from-purple-600 via-indigo-700 to-blue-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Join Greg on the journey
            </h2>
            <p className="text-xl text-purple-100 mb-12 max-w-3xl mx-auto">
              Experience AI that actually understands teaching, built with 20+ years of educational insight.
            </p>
            
            <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
              {/* Primary CTA */}
              <div className="text-center">
                <Button 
                  size="lg"
                  className="bg-white text-indigo-700 hover:bg-gray-100 font-bold px-8 py-4 text-lg shadow-2xl mb-4"
                  asChild
                >
                  <Link href="/promptly">
                    Try Promptly
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
                <p className="text-purple-200 text-sm">Start with report writing & parent communication</p>
              </div>
              
              {/* Email Capture */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 max-w-md">
                <div className="flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-yellow-300 mr-2" />
                  <h3 className="text-lg font-semibold text-white">Get teacher tips</h3>
                </div>
                <EmailCaptureForm
                  title=""
                  subtitle=""
                  placeholder="Your email address"
                  buttonText="Get Free Tips"
                  source="about_founder"
                  variant="hero"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Person Schema JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Dr Greg Blackburn",
            "jobTitle": "Founder & CEO",
            "worksFor": {
              "@type": "Organization",
              "name": "Zaza Technologies",
              "url": "https://zazapromptly.com"
            },
            "alumniOf": [
              {
                "@type": "EducationalOrganization",
                "name": "City, University of London",
                "description": "PhD in Professional Education"
              },
              {
                "@type": "EducationalOrganization", 
                "name": "The University of Queensland",
                "description": "Master of Business Administration"
              },
              {
                "@type": "EducationalOrganization",
                "name": "University of Tasmania", 
                "description": "Information Systems Honours"
              }
            ],
            "knowsAbout": [
              "Educational Technology",
              "AI for Teachers", 
              "Professional Education",
              "Teacher Training",
              "Educational AI Ethics"
            ],
            "description": "PhD educator and founder building teacher-first AI tools. 20+ years experience in educational technology, focusing on reducing teacher workload through ethical AI design.",
            "url": "https://zazapromptly.com/about-founder",
            "image": "https://zazapromptly.com/images/founder-gb-v1.jpg"
          })
        }}
      />
    </div>
  )
}