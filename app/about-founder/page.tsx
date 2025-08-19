import type { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { 
  Paintbrush,
  GraduationCap,
  Heart,
  Shield,
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About the Founder - Dr Greg Blackburn | Zaza',
  description: 'Why Zaza exists - Dr Greg Blackburn\'s story, mission, and teacher-first vision for AI that lightens the load in real classrooms.',
  keywords: ['AI tools for teachers', 'Dr Greg Blackburn', 'teacher-first AI', 'education technology', '20 years education experience'],
  openGraph: {
    title: 'About the Founder - Dr Greg Blackburn | Zaza',
    description: 'Why Zaza exists - Dr Greg Blackburn\'s story, mission, and teacher-first vision for AI that lightens the load in real classrooms.',
    type: 'website',
    url: 'https://www.zazapromptly.com/about-founder',
    images: ['/images/founder.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About the Founder - Dr Greg Blackburn | Zaza',
    description: 'Why Zaza exists - Dr Greg Blackburn\'s story, mission, and teacher-first vision for AI that lightens the load in real classrooms.',
    images: ['/images/founder.png'],
  },
  alternates: {
    canonical: 'https://www.zazapromptly.com/about-founder',
  },
};

export default function AboutFounderPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 dark:from-slate-900 dark:via-blue-900 dark:to-indigo-900">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.15),transparent_50%)]" />
        
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              Why I'm Building Zaza
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
              I created Zaza to help teachers reclaim their time, energy, and joy. Because I know what it is like to feel overwhelmed.
            </p>
            
            {/* Founder Portrait */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                <Image 
                  src="/images/founder.png" 
                  alt="Dr Greg Blackburn - Founder of Zaza Technologies" 
                  width={180} 
                  height={180} 
                  className="rounded-full shadow-2xl border-4 border-white/20 ring-4 ring-white/10 object-cover" 
                  priority
                />
              </div>
            </div>
            
            <p className="text-lg text-gray-400">
              Dr Greg Blackburn — Founder of Zaza Technologies
            </p>
          </div>
        </div>
      </section>

      {/* Why I'm Telling This Story */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="bg-white/5 border border-white/10 shadow-2xl backdrop-blur-sm">
            <CardContent className="p-8 md:p-12 text-center">
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                Teaching today is harder than ever. Most EdTech tools do not actually help - they frustrate.<br/><br/>
                I built Zaza because I have seen what teachers are going through, and I knew I could do something about it.<br/><br/>
                This is my story. And it is why I believe Zaza can change yours.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* From Paint Brushes to PhD */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-16">
            From Paint Brushes to PhD
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
              <p>
                I started life in Tasmania, Australia, with paint brushes in my hands and dreams of being an artist. After school, I took a painter's apprenticeship - four years learning the trade, working with my hands, solving problems one wall at a time.
              </p>
              <p>
                But curiosity called. I traveled, picked up languages, and discovered I had a gift for helping others learn. A Diploma of German led to Honours, then an MBA, and finally a PhD in Professional Education. Twenty years of teaching, researching, and building tools for educators followed.
              </p>
              <p>
                From Tasmania apprentice to PhD researcher - the journey taught me that learning never stops, problems have solutions, and sometimes the best way to help is to build something yourself.
              </p>
            </div>
            
            <div className="flex justify-center">
              <Card className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/10 p-8">
                <div className="flex items-center justify-center space-x-8">
                  <Paintbrush className="w-16 h-16 text-blue-400" />
                  <ArrowRight className="w-8 h-8 text-gray-400" />
                  <GraduationCap className="w-16 h-16 text-purple-400" />
                </div>
                <p className="text-center text-gray-300 mt-4 text-sm">
                  Tasmania Apprentice → PhD Researcher
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem I Couldn't Ignore */}
      <section className="py-16 md:py-24 bg-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-16">
            The Problem I Couldn't Ignore
          </h2>
          
          <div className="space-y-8 mb-12">
            <blockquote className="text-xl md:text-2xl text-gray-300 text-center italic font-light">
              "I love my students, but I'm drowning."
            </blockquote>
            <blockquote className="text-xl md:text-2xl text-gray-300 text-center italic font-light">
              "I spend more time on admin than teaching."
            </blockquote>
            <blockquote className="text-xl md:text-2xl text-gray-300 text-center italic font-light">
              "The tools we have just create more work."
            </blockquote>
            <blockquote className="text-xl md:text-2xl text-gray-300 text-center italic font-light">
              "I became a teacher to inspire kids, not to fight software."
            </blockquote>
          </div>
          
          <Card className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-white/10">
            <CardContent className="p-8 text-center">
              <p className="text-xl text-gray-100 font-semibold">
                AI was never meant to replace teachers. It was meant to free them.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* What Makes Zaza Different */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-16">
            What Makes Zaza Different
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:-translate-y-1 rounded-2xl">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <GraduationCap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Pedagogy-First Design</h3>
                <p className="text-gray-300">
                  Built by an educator who understands classroom realities, not Silicon Valley assumptions about teaching.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:-translate-y-1 rounded-2xl">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">AI That Respects Teachers</h3>
                <p className="text-gray-300">
                  Technology that amplifies your expertise instead of questioning your professional judgment.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:-translate-y-1 rounded-2xl">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Built for Real Classrooms</h3>
                <p className="text-gray-300">
                  Tested with real teachers facing real challenges, not idealized demo environments.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why I'm Doing This Alone */}
      <section className="py-16 md:py-24 bg-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-16">
            Why I'm Doing This Alone
          </h2>
          
          <div className="space-y-8 text-lg text-gray-300 leading-relaxed max-w-4xl mx-auto">
            <p>
              No VC funding. No team of developers. Just me, a laptop, and an unshakeable belief that teachers deserve better tools.
            </p>
            <p>
              I code at 5 a.m. before the family wakes up. I design on weekends. I debug in hotel rooms while traveling for conferences. Every line of code, every pixel of design, every user experience decision comes from someone who has stood in front of a classroom.
            </p>
            <p>
              Yes, I've had moments of doubt. Broken deployments at 5 a.m. Features that didn't work as planned. Times when I wondered if I was crazy to think one person could build something that matters.
            </p>
            <p>
              But then I remember my family of teachers. My wife, my sister, my friends who chose this profession because they wanted to make a difference. They remind me why this work matters.
            </p>
            
            <Card className="bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-white/10 p-8 my-12">
              <blockquote className="text-xl md:text-2xl text-gray-100 font-semibold text-center">
                "I am not building Zaza to automate teachers out of the picture. I am building it to finally give them a fair one."
              </blockquote>
            </Card>
            
            <p>
              Self-funded means self-determined. No pressure to pivot toward buzzwords or chase markets that don't serve teachers. Just a commitment to solving real problems for real educators.
            </p>
          </div>
        </div>
      </section>

      {/* Where Zaza Is Going */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-16">
            Where Zaza Is Going
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
              <p>
                Zaza is not just one tool - it's a growing ecosystem of teacher-first AI that works the way you think, not the way Silicon Valley thinks you should think.
              </p>
              <p>
                Each tool solves a specific pain point that keeps teachers working late into the night. Each one is built with the same philosophy: respect your expertise, save your time, help you focus on what only humans can do.
              </p>
              <p>
                This is just the beginning. Every conversation with a teacher, every piece of feedback, every "what if we could..." moment shapes what comes next.
              </p>
            </div>
            
            <Card className="bg-white/5 border border-white/10">
              <CardContent className="p-8">
                <div className="space-y-8">
                  <div>
                    <h4 className="text-lg font-semibold text-green-400 mb-3">Live Now</h4>
                    <ul className="space-y-2">
                      <li>
                        <Link href="/promptly" className="text-gray-300 hover:text-white transition-colors flex items-center">
                          Zaza Promptly <ExternalLink className="w-4 h-4 ml-2" />
                        </Link>
                      </li>
                      <li>
                        <Link href="/teach" className="text-gray-300 hover:text-white transition-colors flex items-center">
                          Zaza Teach <ExternalLink className="w-4 h-4 ml-2" />
                        </Link>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold text-yellow-400 mb-3">In Development</h4>
                    <ul className="space-y-2">
                      <li>
                        <Link href="/autoplanner" className="text-gray-300 hover:text-white transition-colors flex items-center">
                          Zaza AutoPlanner <ExternalLink className="w-4 h-4 ml-2" />
                        </Link>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold text-blue-400 mb-3">Adjacent Apps</h4>
                    <ul className="space-y-2">
                      <li>
                        <Link href="/notably" className="text-gray-300 hover:text-white transition-colors flex items-center">
                          Zaza Notably Suite <ExternalLink className="w-4 h-4 ml-2" />
                        </Link>
                      </li>
                      <li>
                        <Link href="/spark" className="text-gray-300 hover:text-white transition-colors flex items-center">
                          Zaza Spark (HR) <ExternalLink className="w-4 h-4 ml-2" />
                        </Link>
                      </li>
                      <li>
                        <Link href="/looop" className="text-gray-300 hover:text-white transition-colors flex items-center">
                          Zaza Looop <ExternalLink className="w-4 h-4 ml-2" />
                        </Link>
                      </li>
                      <li>
                        <Link href="/knowledgecore" className="text-gray-300 hover:text-white transition-colors flex items-center">
                          Zaza KnowledgeCore <ExternalLink className="w-4 h-4 ml-2" />
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-purple-600/20 via-blue-600/20 to-indigo-600/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">
              Want to Join the Journey?
            </h2>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                <Link href="/promptly" aria-label="Try Zaza Promptly - AI-powered teacher communication tool">
                  Try Zaza Promptly
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              
              <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white">
                <Link href="/teach" aria-label="Try Zaza Teach - AI lesson planning assistant">
                  Try Zaza Teach
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              
              <Button asChild variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10">
                <Link href="/contact" aria-label="Partner with Zaza Technologies">
                  Partner With Us
                </Link>
              </Button>
              
              <Button asChild variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10">
                <Link href="/blog" aria-label="Follow our story on the Zaza blog">
                  Follow Our Story
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Closing Quote */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-white/10">
            <CardContent className="p-12 text-center">
              <blockquote className="text-2xl md:text-3xl lg:text-4xl text-gray-100 font-bold">
                "Zaza helps teachers thrive. And I am not done yet."
              </blockquote>
            </CardContent>
          </Card>
        </div>
      </section>
      
      {/* TODO: Add German version at /de/about-founder */}
      {/* 
        German translations for headings:
        - Why I'm Building Zaza → „Warum ich Zaza aufbaue"
        - From Paint Brushes to PhD → „Vom Malerpinsel zum Doktortitel"
        - The Problem I Couldn't Ignore → „Das Problem, das ich nicht ignorieren konnte"
        - What Makes Zaza Different → „Was Zaza besonders macht"
        - Where Zaza Is Going → „Wohin Zaza geht"
        - Want to Join the Journey? → „Möchten Sie Teil der Reise sein?"
      */}
    </div>
  )
}