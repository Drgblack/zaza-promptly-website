"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Quote, Heart, Brain, Clock, Rocket, Star, Twitter, Linkedin, Music } from "lucide-react"
import Image from "next/image"
import InteractiveHero from "@/components/interactive-hero"
import { Layout } from "@zaza/shared-components"

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

export default function AboutPage() {
  return (
    <Layout currentProduct="About">
      {/* Add padding top to account for fixed header */}
      <div className="pt-16">
        {/* Interactive Hero Header */}
        <InteractiveHero />

        {/* We've Been Listening */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="text-center mb-16"
            >
              <motion.h2
                variants={fadeInUp}
                className="text-3xl md:text-5xl font-bold text-[#4A235A] dark:text-purple-300 mb-6"
              >
                We Read the Threads. We Felt the Pain.
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
                Every feature we build starts with a real teacher's cry for help.
              </motion.p>
            </motion.div>

            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
            >
              {[
                "I cried in the car again before going in.",
                "I spent more time writing report comments than seeing my kids.",
                "We're professionals—so why does everything feel like survival mode?",
                "Lesson planning shouldn't steal your weekend.",
                "AI can help… but ChatGPT doesn't get teaching.",
              ].map((quote, index) => (
                <motion.div key={index} variants={fadeInUp}>
                  <Card className="bg-[#E8E6F5] dark:bg-gray-800 border-none shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                    <CardContent className="p-6">
                      <Quote className="text-[#4A235A] dark:text-purple-300 mb-4" size={24} />
                      <p className="text-gray-700 dark:text-gray-300 italic leading-relaxed">{quote}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="text-center"
            >
              <p className="text-lg text-gray-700 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
                You're not alone. And you're not crazy. Teaching has become unsustainable - but we're building the tools
                to turn that around.
              </p>
            </motion.div>
          </div>
        </section>

        {/* The Zaza Promise */}
        <section className="py-20 px-4 bg-white dark:bg-gray-800">
          <div className="max-w-6xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-bold text-[#4A235A] dark:text-purple-300 mb-8"
            >
              The Future Is Bright. And Teacher-Led.
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="space-y-6 mb-12"
            >
              <p className="text-xl text-gray-700 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
                Imagine a world where Sunday nights are for rest, not stress. Where lesson plans take minutes, not
                hours. Where you walk into the classroom calm, creative, and confident.
              </p>
              <p className="text-xl text-gray-700 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
                Zaza is building that world - one purposeful AI tool at a time. Believe in us, and we'll give you your
                life back.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-r from-[#4A235A] to-purple-600 text-white p-8 rounded-3xl"
            >
              <p className="text-2xl md:text-3xl font-semibold italic">
                "We don't just help you teach - we help you thrive."
              </p>
            </motion.div>
          </div>
        </section>

        {/* Built By Educators */}
        <section className="py-20 px-4 bg-[#E8E6F5] dark:bg-gray-900">
          <div className="max-w-6xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-bold text-[#4A235A] dark:text-purple-300 mb-8 text-center"
            >
              Built by Educators, Not Tech Bros
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-700 dark:text-gray-300 max-w-4xl mx-auto text-center mb-16 leading-relaxed"
            >
              Our founder, Dr. Greg Blackburn, holds a PhD in Professional Education and has spent 20+ years helping
              people learn. Zaza is rooted in pedagogy - not hype.
            </motion.p>

            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="space-y-8"
            >
              {[
                { year: "2000", event: "Led training initiatives to achieve service delivery solutions" },
                { year: "2007", event: "First teacher workshops on digital learning tools" },
                { year: "2014", event: "L&D leader for global teams" },
                { year: "2019", event: "PhD on student-centred learning" },
                { year: "2025", event: "Zaza is born" },
              ].map((milestone, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="flex items-center space-x-6 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg"
                >
                  <div className="bg-[#4A235A] text-white px-4 py-2 rounded-full font-bold text-lg min-w-[80px] text-center">
                    {milestone.year}
                  </div>
                  <p className="text-lg text-gray-700 dark:text-gray-300">{milestone.event}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-bold text-[#4A235A] dark:text-purple-300 mb-16 text-center"
            >
              Zaza's Core Values
            </motion.h2>

            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {[
                {
                  icon: Brain,
                  title: "Respect Expertise",
                  desc: "You're the expert. Our tools elevate, not override.",
                },
                { icon: Heart, title: "Design with Empathy", desc: "Built from pain, shaped with care." },
                { icon: Clock, title: "Save Time, Protect Energy", desc: "Your peace matters." },
                { icon: Rocket, title: "Build for Joy", desc: "Teaching is a calling. Let's make it joyful again." },
              ].map((value, index) => (
                <motion.div key={index} variants={fadeInUp}>
                  <Card className="bg-white dark:bg-gray-800 border-none shadow-lg hover:shadow-xl transition-all duration-300 h-full text-center">
                    <CardContent className="p-8">
                      <value.icon className="text-[#4A235A] dark:text-purple-300 mx-auto mb-4" size={48} />
                      <h3 className="text-xl font-bold text-[#4A235A] dark:text-purple-300 mb-4">{value.title}</h3>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{value.desc}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* The Zaza Ecosystem */}
        <section className="py-20 px-4 bg-white dark:bg-gray-800">
          <div className="max-w-6xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-bold text-[#4A235A] dark:text-purple-300 mb-16 text-center"
            >
              One Mission. Many Tools.
            </motion.h2>

            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {[
                { name: "Zaza Teach", status: "Available", desc: "AI-powered lesson planning" },
                { name: "Promptly", status: "Available", desc: "Smart prompting for educators" },
                { name: "Visuals", status: "Coming Soon", desc: "Educational image generation" },
                { name: "Coach", status: "Coming Soon", desc: "Professional development AI" },
                { name: "ClarityDeck", status: "Coming Soon", desc: "Presentation builder" },
              ].map((tool, index) => (
                <motion.div key={index} variants={fadeInUp}>
                  <Card className="bg-[#F8F6FF] dark:bg-gray-700 border-none shadow-lg hover:shadow-xl transition-all duration-300 h-full group cursor-pointer">
                    <CardContent className="p-8 text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-[#4A235A] to-purple-600 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                        <span className="text-white text-2xl font-bold">{tool.name[0]}</span>
                      </div>
                      <h3 className="text-xl font-bold text-[#4A235A] dark:text-purple-300 mb-2">{tool.name}</h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">{tool.desc}</p>
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                          tool.status === "Available"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                            : "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
                        }`}
                      >
                        {tool.status}
                      </span>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 px-4 bg-[#E8E6F5] dark:bg-gray-900">
          <div className="max-w-6xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-5xl font-bold text-[#4A235A] dark:text-purple-300 mb-16 text-center"
            >
              Real Teachers. Real Relief.
            </motion.h2>

            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {[
                { quote: "Zaza Promptly saved me three evenings last term.", name: "Sarah M.", role: "Year 5 Teacher" },
                { quote: "It feels like my co-teacher now.", name: "James L.", role: "High School English" },
                {
                  quote: "I've never seen AI respect teacher tone like this.",
                  name: "Maria R.",
                  role: "Primary Educator",
                },
              ].map((testimonial, index) => (
                <motion.div key={index} variants={fadeInUp}>
                  <Card className="bg-white dark:bg-gray-800 border-none shadow-lg h-full">
                    <CardContent className="p-8">
                      <div className="flex mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="text-yellow-400 fill-current" size={20} />
                        ))}
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 mb-6 italic leading-relaxed">
                        "{testimonial.quote}"
                      </p>
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-gradient-to-br from-[#4A235A] to-purple-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                          {testimonial.name[0]}
                        </div>
                        <div>
                          <p className="font-semibold text-[#4A235A] dark:text-purple-300">{testimonial.name}</p>
                          <p className="text-gray-600 dark:text-gray-400 text-sm">{testimonial.role}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Join the Movement */}
        <section className="py-20 px-4 bg-gradient-to-r from-[#E0115F] to-[#9333EA]">
          <div className="max-w-4xl mx-auto text-center text-white">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-5xl font-bold mb-6"
            >
              Believe in Better. Build It With Us.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl mb-8 leading-relaxed"
            >
              We're educators, designers, coders, researchers - and we all believe teachers deserve better tools.
            </motion.p>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-16 px-4 bg-[#4A235A] text-white">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8 mb-8">
              <div>
                <Image src="/images/zaza-logo.png" alt="Zaza Technologies" width={60} height={60} className="mb-4" />
                <p className="text-purple-200">Helping teachers thrive with purposeful AI tools.</p>
              </div>

              <div>
                <h4 className="font-semibold mb-4">Company</h4>
                <ul className="space-y-2 text-purple-200">
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      About the Founder
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Careers
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Contact Us
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-4">Resources</h4>
                <ul className="space-y-2 text-purple-200">
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Free Resources
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      FAQs
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Privacy Policy
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-4">Connect</h4>
                <div className="flex space-x-4">
                  <a href="#" className="text-purple-200 hover:text-white transition-colors">
                    <Music size={24} />
                  </a>
                  <a href="#" className="text-purple-200 hover:text-white transition-colors">
                    <Linkedin size={24} />
                  </a>
                  <a href="#" className="text-purple-200 hover:text-white transition-colors">
                    <Twitter size={24} />
                  </a>
                </div>
              </div>
            </div>

            <div className="border-t border-purple-400 pt-8 text-center text-purple-200">
              <p>&copy; 2025 Zaza Technologies. Built with ❤️ for educators.</p>
            </div>
          </div>
        </footer>
      </div>
    </Layout>
  )
}
