"use client"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Palette, Brain, Users, Wrench, Shield, Award } from "lucide-react"
import Image from "next/image"
import { Layout } from "@zaza/shared-components"

export default function AboutFounderPage() {
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.8])

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" },
  }

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  return (
    <Layout currentProduct="Founder">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-12 font-inter">
              Why I'm Building Zaza
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              I created Zaza to help teachers reclaim their time, energy, and joy. Because I know what it's like to feel
              overwhelmed.
            </p>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-6"
            >
              <Image
                src="/images/greg-headshot.jpg"
                alt="Dr Greg Blackburn, Founder of Zaza Technologies"
                width={300}
                height={300}
                className="rounded-full mx-auto shadow-2xl border-4 border-white dark:border-gray-700"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-center"
            >
              <h2 className="text-2xl font-medium text-gray-800 dark:text-gray-200 mb-2">Dr Greg Blackburn</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 italic">Founder of Zaza Technologies</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Why I'm Telling This Story */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8">
              Why I'm Telling This Story
            </h2>
            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-lg border border-purple-200/50 dark:border-purple-800/50">
              <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                Teaching today is harder than ever. Most EdTech tools don't actually help: they frustrate. I built Zaza
                because I've seen what teachers are going through, and I knew I could do something about it.
              </p>
              <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed font-medium">
                This is my story. And it's why I believe Zaza can change yours.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* From Paint Brushes to PhD */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center">
              From Paint Brushes to PhD
            </h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  I didn't grow up thinking I'd build an AI company. I started as a painter and decorator in Tasmania,
                  working at the Cascade Brewery and in my dad's paint factory, Tas Paints.
                </p>
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  After a four-year apprenticeship I hated, I left home, travelled the world, learned languages, and
                  slowly rebuilt myself through education. A Diploma of German. A First-Class Honours in Information
                  Systems. An MBA. And eventually, a PhD in Professional Education from City, University of London.
                </p>
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  I spent two decades leading learning at top companies. But I never forgot what it felt like to be
                  underestimated. Or how education gave me my life back. That's the energy behind Zaza.
                </p>
              </div>
              <div className="flex justify-center">
                <div className="w-80 h-80 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl">
                  <Palette className="w-24 h-24 text-white" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* The Problem I Couldn't Ignore */}
      <section className="py-16 px-4 bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center">
              The Problem I Couldn't Ignore
            </h2>
            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="space-y-4 mb-6"
            >
              {[
                "I love my students, but I'm drowning.",
                "I cry in my car before school starts.",
                "No one talks about the Sunday dread that starts around noon.",
                "I didn't become a teacher to spend hours writing feedback no one reads.",
              ].map((quote, index) => (
                <motion.blockquote
                  key={index}
                  variants={fadeInUp}
                  className="text-lg md:text-xl italic text-slate-700 dark:text-slate-200 text-center max-w-lg mx-auto"
                >
                  "{quote}"
                </motion.blockquote>
              ))}
            </motion.div>
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg mt-6">
              <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                AI was never meant to replace teachers. It was meant to free them.
              </p>
              <p className="text-lg md:text-xl font-semibold text-purple-600 dark:text-purple-400 leading-relaxed">
                So I stopped waiting. I started building.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What Makes Zaza Different */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center">
              What Makes Zaza Different
            </h2>
            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid md:grid-cols-3 gap-8 mb-12"
            >
              {[
                {
                  icon: Brain,
                  title: "Pedagogy-First Design",
                  description: "Every feature is grounded in real learning science.",
                },
                {
                  icon: Users,
                  title: "AI That Respects Teachers",
                  description: "Automate the grind. Never the judgment.",
                },
                {
                  icon: Wrench,
                  title: "Built for Real Classrooms",
                  description: "Not just test scores or trends. Zaza meets teachers where they are.",
                },
              ].map((item, index) => (
                <motion.div key={index} variants={fadeInUp}>
                  <Card className="h-full bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-purple-200/50 dark:border-purple-800/50 hover:shadow-lg transition-shadow">
                    <CardContent className="p-8 text-center">
                      <item.icon className="w-12 h-12 text-purple-600 dark:text-purple-400 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{item.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg text-center">
              <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
                Zaza is not just another AI wrapper. It is not VC-funded hype.
                <br />
                It is built by someone who has spent 20 years in the trenches of education and learning science.
                <br />
                Someone who knows that pedagogy, not just prompts, is what makes technology actually useful.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why I'm Doing This Alone */}
      <section className="py-16 px-4 bg-gradient-to-r from-gray-50 to-purple-50 dark:from-gray-900 dark:to-purple-900/30">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-12">
              Why I'm Doing This Alone
            </h2>
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-lg text-left max-w-3xl mx-auto">
              <div className="space-y-6 text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
                <p>I didn't raise venture capital. I didn't hire a team. I didn't wait for permission.</p>
                <p>
                  I'm building Zaza in the early hours of the morning. On weekends. In between meetings. Sometimes in
                  hotel rooms while travelling for my day job.
                </p>
                <p>
                  I've taught myself everything I needed: how to build a startup from scratch, how to vibe-code AI
                  tools, how to design viral products, how to ship fast without compromising pedagogy.
                </p>
                <p>
                  I've spent hundreds of hours studying how AI can actually improve education, not just sell to it. I
                  learned how to learn. And then I never stopped.
                </p>
                <p>
                  There were moments I felt completely alone: stuck debugging a broken deploy at 5 a.m., wondering if
                  this would ever work. Or if anyone would even care.
                </p>
                <p>
                  But then I'd think of my sister. My cousins. My aunty. My uncle. All teachers. All exhausted. All
                  showing up every day, even when no one's helping. I've seen their struggle up close, for years. And
                  still they soldier on.
                </p>
                <p>
                  When I saw what this new era of AI could offer, not just speed, but real human freedom, I knew it was
                  time to act.
                </p>
                <p className="font-semibold text-purple-700 dark:text-purple-300">
                  I'm not building Zaza to automate teachers out of the picture. I'm building it to finally give them a
                  fair one.
                </p>
                <p>I'm building it for every teacher in my family who deserved better.</p>
                <p>
                  And I'm building it for my daughters: so they'll know that betting on yourself, even quietly, can
                  change everything.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Where Zaza Is Going */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center">
              Where Zaza Is Going
            </h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
                  Zaza is more than tools. It is a teacher-first operating system for the AI era.
                </p>
                <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
                  We're just getting started, but here's what's live and what's coming.
                </p>
              </div>
              <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">🔥</span>
                    <span className="font-semibold text-gray-900 dark:text-white">Live:</span>
                    <span className="text-gray-700 dark:text-gray-300">Zaza Promptly, Zaza Teach</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">🚀</span>
                    <span className="font-semibold text-gray-900 dark:text-white">Coming Soon:</span>
                    <span className="text-gray-700 dark:text-gray-300">
                      Zaza Visuals, Zaza Coach, Zaza Study, ClarityDeck, and more
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Want to Join the Journey */}
      <section className="py-16 px-4 bg-gradient-to-r from-purple-600 to-purple-800">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">Want to Join the Journey?</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <Button size="lg" variant="secondary" className="bg-white text-purple-700 hover:bg-gray-100">
                Try Zaza Teach
              </Button>
              <Button size="lg" variant="secondary" className="bg-white text-purple-700 hover:bg-gray-100">
                Try Zaza Promptly
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-purple-700 bg-transparent"
              >
                Partner With Us
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-purple-700 bg-transparent"
              >
                Follow Our Story →
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final Quote */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 rounded-3xl p-12 md:p-16"
          >
            <blockquote className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white leading-relaxed">
              "Zaza helps teachers thrive. And I'm not done yet."
            </blockquote>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 px-6 md:px-16">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Section 1: Branding & Social */}
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start mb-4">
                <Image
                  src="/images/zaza-logo.png"
                  alt="Zaza Technologies"
                  width={32}
                  height={32}
                  className="rounded-lg"
                />
                <span className="ml-2 text-xl font-bold text-white">Zaza Technologies</span>
              </div>
              <div className="flex justify-center md:justify-start space-x-4 mb-4">
                <a
                  href="https://www.tiktok.com/@zazateach"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-purple-300 hover:scale-110 transition-all duration-200"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                  </svg>
                </a>
                <a
                  href="https://www.linkedin.com/company/zazateach"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-purple-300 hover:scale-110 transition-all duration-200"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
                <a
                  href="https://twitter.com/zazateach"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-purple-300 hover:scale-110 transition-all duration-200"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
              </div>
              <p className="text-gray-400 text-sm">Built by educators</p>
            </div>

            {/* Section 2: Product Links */}
            <div>
              <h4 className="font-semibold mb-4 text-lg">Products</h4>
              <ul className="space-y-2">
                <li>
                  <a href="/promptly" className="text-gray-300 hover:text-purple-300 transition-colors">
                    Zaza Promptly
                  </a>
                </li>
                <li>
                  <a href="/" className="text-gray-300 hover:text-purple-300 transition-colors">
                    Zaza Teach
                  </a>
                </li>
                <li>
                  <div className="flex items-center space-x-2">
                    <a href="/visuals" className="text-gray-300 hover:text-purple-300 transition-colors">
                      Zaza Visuals
                    </a>
                    <span className="text-xs bg-purple-600 text-white px-2 py-1 rounded-full">Coming Soon</span>
                  </div>
                </li>
                <li>
                  <div className="flex items-center space-x-2">
                    <a href="/coach" className="text-gray-300 hover:text-purple-300 transition-colors">
                      Zaza Coach
                    </a>
                    <span className="text-xs bg-purple-600 text-white px-2 py-1 rounded-full">Coming Soon</span>
                  </div>
                </li>
              </ul>
            </div>

            {/* Section 3: Resources */}
            <div>
              <h4 className="font-semibold mb-4 text-lg">Resources</h4>
              <ul className="space-y-2">
                <li>
                  <a href="/blog" className="text-gray-300 hover:text-purple-300 transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="/resources" className="text-gray-300 hover:text-purple-300 transition-colors">
                    Free Resources
                  </a>
                </li>
                <li>
                  <a href="/faqs" className="text-gray-300 hover:text-purple-300 transition-colors">
                    FAQs
                  </a>
                </li>
                <li>
                  <a href="/support" className="text-gray-300 hover:text-purple-300 transition-colors">
                    Support
                  </a>
                </li>
              </ul>
            </div>

            {/* Section 4: Company */}
            <div>
              <h4 className="font-semibold mb-4 text-lg">Company</h4>
              <ul className="space-y-2">
                <li>
                  <a href="/about" className="text-gray-300 hover:text-purple-300 transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="/mission" className="text-gray-300 hover:text-purple-300 transition-colors">
                    Vision & Mission
                  </a>
                </li>
                <li>
                  <a href="/privacy" className="text-gray-300 hover:text-purple-300 transition-colors">
                    Privacy & Data Policy
                  </a>
                </li>
                <li>
                  <a href="/terms" className="text-gray-300 hover:text-purple-300 transition-colors">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Compliance Badges */}
          <div className="flex justify-center space-x-6 mt-8 mb-4">
            <div className="flex items-center space-x-2 text-gray-400">
              <Shield className="w-4 h-4" />
              <span className="text-sm">GDPR Compliant</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-400">
              <Award className="w-4 h-4" />
              <span className="text-sm">FERPA Compliant</span>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-white/20 mt-8 pt-4 text-center">
            <p className="text-gray-300 text-sm mb-2">
              © 2025 Zaza Technologies UG (haftungsbeschränkt). All rights reserved.
            </p>
            <p className="text-gray-400 text-sm">Made with 💙 by teachers, for teachers.</p>
          </div>
        </div>
      </footer>
    </Layout>
  )
}
