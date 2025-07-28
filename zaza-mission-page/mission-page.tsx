import React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { GraduationCap, Heart, BookOpen, Shield, Globe, Users, Mail, Handshake } from "lucide-react"
import Image from "next/image"

export default function MissionPage() {
  const values = [
    {
      title: "Built by Educators",
      icon: GraduationCap,
      description: "Created by teachers who understand the classroom",
    },
    {
      title: "Emotionally Aware",
      icon: Heart,
      description: "AI that recognizes and responds to human emotions",
    },
    {
      title: "Pedagogically Sound",
      icon: BookOpen,
      description: "Grounded in proven educational research and practice",
    },
    {
      title: "Privacy First",
      icon: Shield,
      description: "Student data protection is our highest priority",
    },
    {
      title: "Global, Local",
      icon: Globe,
      description: "Worldwide reach with local educational context",
    },
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 bg-gradient-to-br from-purple-100 via-pink-50 to-purple-200 dark:from-purple-900/30 dark:via-pink-900/20 dark:to-purple-800/30 overflow-hidden transition-colors duration-200">
        {/* Background decorative elements */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-pink-500/10 to-purple-700/10 dark:from-purple-400/5 dark:via-pink-400/5 dark:to-purple-500/5"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-300/20 via-transparent to-pink-300/20 dark:from-purple-600/10 dark:to-pink-600/10"></div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-700 via-pink-600 to-purple-800 dark:from-purple-400 dark:via-pink-400 dark:to-purple-500 bg-clip-text text-transparent mb-6 leading-tight">
            Zaza helps teachers thrive.
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto font-medium">
            Empowering educators through emotionally intelligent AI.
          </p>

          {/* Optional: Add subtle floating elements */}
          <div className="absolute top-10 left-10 w-20 h-20 bg-purple-300/20 dark:bg-purple-600/10 rounded-full blur-xl"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-pink-300/20 dark:bg-pink-600/10 rounded-full blur-xl"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-purple-400/15 dark:bg-purple-500/10 rounded-full blur-lg"></div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white dark:bg-gray-900 transition-colors duration-200">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8">Our Mission</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              At Zaza Technologies, our mission is to revolutionize education by creating emotionally intelligent AI
              tools that understand, support, and enhance the teaching and learning experience. We believe that
              technology should amplify human connection, not replace it. Our platform empowers educators with insights
              and tools that help them better understand their students' emotional and academic needs, creating more
              inclusive, effective, and compassionate learning environments where every student can thrive.
            </p>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-200">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8">Our Vision</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              We envision a world where every classroom is equipped with emotionally intelligent technology that
              recognizes the unique needs of each learner. Our vision is to create a global educational ecosystem where
              AI serves as a compassionate companion to teachers, helping them identify when students need extra
              support, celebrating their successes, and fostering environments where emotional well-being and academic
              achievement go hand in hand. We see a future where technology bridges gaps rather than creating them,
              making quality education accessible and personalized for every student, everywhere.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white dark:bg-gray-900 transition-colors duration-200">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">What We Stand For</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
            {values.map((value, index) => {
              const IconComponent = value.icon
              return (
                <Card
                  key={index}
                  className="text-center border-0 shadow-sm hover:shadow-md transition-shadow bg-white dark:bg-gray-800 dark:border-gray-700"
                >
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{value.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{value.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section id="how-zaza-began" className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-200">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Image Component */}
              <div className="order-1 lg:order-1">
                <div className="max-w-md mx-auto lg:mx-0">
                  <Image
                    src="/greg-headshot.jpg"
                    alt="Dr. Greg Blackburn, Founder of Zaza Technologies"
                    width={800}
                    height={600}
                    className="w-full h-auto rounded-2xl shadow-md object-cover"
                  />
                </div>
              </div>

              {/* Text Block */}
              <div className="order-2 lg:order-2">
                <div className="space-y-6 max-w-xl mx-auto lg:mx-0">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">How Zaza Began</h2>

                  <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                    Zaza Technologies was born not in a classroom, but in the quiet hours between corporate deadlines,
                    research papers, and the deep desire to build something that truly helps educators thrive.
                  </p>

                  <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                    Dr. Greg Blackburn spent two decades in Learning and Development, leading strategic education
                    initiatives across companies and universities. As a former tradesman turned academic with a PhD in
                    Professional Education, he knew the power of transformative learning. But over the years, he also
                    saw the growing emotional burden placed on teachers: the admin overload, the lack of time for
                    creativity, and the quiet burnout behind their dedication.
                  </p>

                  <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                    Frustrated by generic tools that ignored both the emotional and pedagogical complexity of teaching,
                    Greg set out to build something better. Zaza was his answer: a suite of AI-powered tools grounded in
                    real educational research, designed not just to save time, but to support teachers as whole people,
                    both professionally and emotionally.
                  </p>

                  <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                    What began as a personal mission to restore joy and agency to educators has grown into a
                    teacher-first technology company helping thousands of teachers reclaim their time, reignite their
                    creativity, and reconnect with why they started teaching in the first place.
                  </p>

                  {/* Quote Block */}
                  <blockquote className="border-l-4 border-blue-500 dark:border-blue-400 pl-6 italic text-gray-600 dark:text-gray-400 mt-8 text-lg">
                    "Teachers deserve tools that honour both their time and their humanity. Zaza exists to help them
                    thrive."
                  </blockquote>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Join Us Section */}
      <section className="py-20 bg-purple-600 dark:bg-purple-800 transition-colors duration-200">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">Join Our Mission</h2>
          <p className="text-xl text-purple-100 dark:text-purple-200 mb-12 max-w-2xl mx-auto">
            Be part of the educational revolution. Help us create a more emotionally intelligent future for learning.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 px-8">
              <Users className="w-5 h-5 mr-2" />
              Join Our Waitlist
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-purple-600 px-8 bg-transparent"
            >
              <Handshake className="w-5 h-5 mr-2" />
              Partner With Us
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-purple-600 px-8 bg-transparent"
            >
              <Mail className="w-5 h-5 mr-2" />
              Meet the Founder
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
