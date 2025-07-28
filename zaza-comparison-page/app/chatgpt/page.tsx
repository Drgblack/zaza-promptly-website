"use client"

import { ArrowRight, ChevronDown, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Layout } from "@zaza/shared-components"
import { Link } from "@/components/ui/link"
import { useState } from "react"

function EcosystemVisual() {
  return (
    <div className="hidden md:block w-full h-full flex items-center justify-center">
      <div
        className="ecosystem-container relative bg-gradient-to-br from-[#F8F6FF] via-[#F0F4FF] to-[#E8E6F5] rounded-3xl p-12 w-[90%] max-w-[500px] mx-auto shadow-2xl border-4 border-red-400"
        style={{ aspectRatio: "1/1.2", minHeight: "600px" }}
      >
        {/* Enhanced Background Elements */}
        <div className="absolute inset-0 overflow-hidden rounded-3xl">
          <div className="absolute top-8 left-8 text-4xl opacity-15 animate-float-slow">📚</div>
          <div className="absolute top-12 right-12 text-3xl opacity-15 animate-float-delayed">✏️</div>
          <div className="absolute bottom-12 left-12 text-3xl opacity-15 animate-float-reverse">📊</div>
          <div className="absolute bottom-8 right-8 text-4xl opacity-15 animate-float-slow">📖</div>
          <div className="absolute top-1/2 left-4 text-2xl opacity-15 animate-float-delayed">📐</div>
          <div className="absolute top-1/3 right-4 text-2xl opacity-15 animate-float-reverse">🖍️</div>
        </div>

        {/* Main Content Container with Enhanced Animations */}
        <div className="relative h-full flex items-center justify-center animate-main-float">
          <div className="ecosystem-icons relative animate-gentle-rotate">
            {/* Enhanced Central Teacher Avatar */}
            <div className="teacher-avatar absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 animate-breathing">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-2xl border-4 border-purple-300 hover:shadow-purple-300/50 transition-all duration-300 hover:scale-110">
                <span className="text-5xl">👩‍🏫</span>
              </div>
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400/20 to-pink-400/20 animate-pulse-glow"></div>
            </div>

            {/* Enhanced Connecting Lines with Animation */}
            <div className="connecting-lines absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-orbit-lines">
              <div
                className="line absolute w-32 h-0 border-t-3 border-dotted border-purple-400 opacity-40 animate-line-draw"
                style={{ transform: "rotate(0deg)", transformOrigin: "0 0" }}
              ></div>
              <div
                className="line absolute w-32 h-0 border-t-3 border-dotted border-purple-400 opacity-40 animate-line-draw"
                style={{ transform: "rotate(72deg)", transformOrigin: "0 0", animationDelay: "0.5s" }}
              ></div>
              <div
                className="line absolute w-32 h-0 border-t-3 border-dotted border-purple-400 opacity-40 animate-line-draw"
                style={{ transform: "rotate(144deg)", transformOrigin: "0 0", animationDelay: "1s" }}
              ></div>
              <div
                className="line absolute w-32 h-0 border-t-3 border-dotted border-purple-400 opacity-40 animate-line-draw"
                style={{ transform: "rotate(216deg)", transformOrigin: "0 0", animationDelay: "1.5s" }}
              ></div>
              <div
                className="line absolute w-32 h-0 border-t-3 border-dotted border-purple-400 opacity-40 animate-line-draw"
                style={{ transform: "rotate(288deg)", transformOrigin: "0 0", animationDelay: "2s" }}
              ></div>
            </div>

            {/* Enhanced App Icons with Orbital Animations */}
            <div
              className="app-icon absolute animate-orbit-1"
              style={{ top: "-60px", left: "50%", transform: "translateX(-50%)" }}
            >
              <div className="w-20 h-20 bg-gradient-to-br from-pink-400 to-pink-500 rounded-2xl flex items-center justify-center shadow-xl hover:scale-125 transition-all duration-300 cursor-pointer animate-icon-pulse-1">
                <span className="text-3xl">📝</span>
              </div>
              <div className="text-sm text-center mt-2 text-purple-700 font-bold">Promptly</div>
            </div>

            <div className="app-icon absolute animate-orbit-2" style={{ top: "20px", right: "-80px" }}>
              <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-purple-500 rounded-2xl flex items-center justify-center shadow-xl hover:scale-125 transition-all duration-300 cursor-pointer animate-icon-pulse-2">
                <span className="text-3xl">🎨</span>
              </div>
              <div className="text-sm text-center mt-2 text-purple-700 font-bold">Visuals</div>
            </div>

            <div className="app-icon absolute animate-orbit-3" style={{ bottom: "20px", right: "-80px" }}>
              <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-500 rounded-2xl flex items-center justify-center shadow-xl hover:scale-125 transition-all duration-300 cursor-pointer animate-icon-pulse-3">
                <span className="text-3xl">📚</span>
              </div>
              <div className="text-sm text-center mt-2 text-purple-700 font-bold">Teach</div>
            </div>

            <div
              className="app-icon absolute animate-orbit-4"
              style={{ bottom: "-60px", left: "50%", transform: "translateX(-50%)" }}
            >
              <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-500 rounded-2xl flex items-center justify-center shadow-xl hover:scale-125 transition-all duration-300 cursor-pointer animate-icon-pulse-4">
                <span className="text-3xl">💬</span>
              </div>
              <div className="text-sm text-center mt-2 text-purple-700 font-bold">Messaging</div>
            </div>

            <div className="app-icon absolute animate-orbit-5" style={{ top: "20px", left: "-80px" }}>
              <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-xl hover:scale-125 transition-all duration-300 cursor-pointer animate-icon-pulse-5">
                <span className="text-3xl">📊</span>
              </div>
              <div className="text-sm text-center mt-2 text-purple-700 font-bold">Analytics</div>
            </div>
          </div>
        </div>

        {/* Animated Border Effect */}
        <div className="absolute inset-0 rounded-3xl border-4 border-red-400 animate-border-pulse"></div>
      </div>

      <style jsx>{`
      .ecosystem-container {
        position: relative;
        will-change: transform;
      }

      /* Main Container Animations */
      @keyframes main-float {
        0%, 100% { transform: translateY(-10px) rotate(-1deg); }
        50% { transform: translateY(10px) rotate(1deg); }
      }

      @keyframes gentle-rotate {
        0% { transform: rotate(-2deg); }
        50% { transform: rotate(2deg); }
        100% { transform: rotate(-2deg); }
      }

      .animate-main-float {
        animation: main-float 4s ease-in-out infinite;
      }

      .animate-gentle-rotate {
        animation: gentle-rotate 6s ease-in-out infinite;
      }

      /* Teacher Avatar Animations */
      @keyframes breathing {
        0%, 100% { transform: translate(-50%, -50%) scale(1); }
        50% { transform: translate(-50%, -50%) scale(1.05); }
      }

      @keyframes pulse-glow {
        0%, 100% { opacity: 0.3; }
        50% { opacity: 0.6; }
      }

      .animate-breathing {
        animation: breathing 3s ease-in-out infinite;
      }

      .animate-pulse-glow {
        animation: pulse-glow 2s ease-in-out infinite;
      }

      /* Orbital Animations for App Icons */
      @keyframes orbit-1 {
        0% { transform: translateX(-50%) rotate(0deg) translateY(-120px) rotate(0deg); }
        100% { transform: translateX(-50%) rotate(360deg) translateY(-120px) rotate(-360deg); }
      }

      @keyframes orbit-2 {
        0% { transform: rotate(72deg) translateY(-120px) rotate(-72deg); }
        100% { transform: rotate(432deg) translateY(-120px) rotate(-432deg); }
      }

      @keyframes orbit-3 {
        0% { transform: rotate(144deg) translateY(-120px) rotate(-144deg); }
        100% { transform: rotate(504deg) translateY(-120px) rotate(-504deg); }
      }

      @keyframes orbit-4 {
        0% { transform: translateX(-50%) rotate(216deg) translateY(-120px) rotate(-216deg); }
        100% { transform: translateX(-50%) rotate(576deg) translateY(-120px) rotate(-576deg); }
      }

      @keyframes orbit-5 {
        0% { transform: rotate(288deg) translateY(-120px) rotate(-288deg); }
        100% { transform: rotate(648deg) translateY(-120px) rotate(-648deg); }
      }

      .animate-orbit-1 { animation: orbit-1 20s linear infinite; }
      .animate-orbit-2 { animation: orbit-2 22s linear infinite; }
      .animate-orbit-3 { animation: orbit-3 24s linear infinite; }
      .animate-orbit-4 { animation: orbit-4 26s linear infinite; }
      .animate-orbit-5 { animation: orbit-5 28s linear infinite; }

      /* Individual Icon Pulsing */
      @keyframes icon-pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.1); }
      }

      .animate-icon-pulse-1 { animation: icon-pulse 2s ease-in-out infinite; }
      .animate-icon-pulse-2 { animation: icon-pulse 2.5s ease-in-out infinite 0.5s; }
      .animate-icon-pulse-3 { animation: icon-pulse 3s ease-in-out infinite 1s; }
      .animate-icon-pulse-4 { animation: icon-pulse 2.2s ease-in-out infinite 1.5s; }
      .animate-icon-pulse-5 { animation: icon-pulse 2.8s ease-in-out infinite 2s; }

      /* Border Animation */
      @keyframes border-pulse {
        0%, 100% { border-color: rgb(248 113 113); box-shadow: 0 0 20px rgba(248, 113, 113, 0.3); }
        50% { border-color: rgb(239 68 68); box-shadow: 0 0 30px rgba(239, 68, 68, 0.5); }
      }

      .animate-border-pulse {
        animation: border-pulse 5s ease-in-out infinite;
      }

      /* Line Drawing Animation */
      @keyframes line-draw {
        0% { width: 0; opacity: 0; }
        50% { opacity: 0.4; }
        100% { width: 8rem; opacity: 0.4; }
      }

      .animate-line-draw {
        animation: line-draw 3s ease-out forwards;
      }

      /* Background Element Animations */
      @keyframes float-slow {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(-15px) rotate(5deg); }
      }

      @keyframes float-delayed {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(-10px) rotate(-3deg); }
      }

      @keyframes float-reverse {
        0%, 100% { transform: translateY(-5px) rotate(2deg); }
        50% { transform: translateY(10px) rotate(-2deg); }
      }

      .animate-float-slow { animation: float-slow 6s ease-in-out infinite; }
      .animate-float-delayed { animation: float-delayed 7s ease-in-out infinite 1s; }
      .animate-float-reverse { animation: float-reverse 5s ease-in-out infinite 2s; }

      /* Responsive Behavior */
      @media (max-width: 1024px) and (min-width: 769px) {
        .ecosystem-container {
          transform: scale(0.75);
          max-width: 400px;
          min-height: 450px;
        }
        
        .app-icon div {
          width: 4rem;
          height: 4rem;
        }
        
        .teacher-avatar div {
          width: 5rem;
          height: 5rem;
        }
      }

      @media (max-width: 768px) {
        .ecosystem-container {
          display: none;
        }
      }

      /* Accessibility - Reduced Motion */
      @media (prefers-reduced-motion: reduce) {
        .animate-main-float,
        .animate-gentle-rotate,
        .animate-breathing,
        .animate-pulse-glow,
        .animate-orbit-1,
        .animate-orbit-2,
        .animate-orbit-3,
        .animate-orbit-4,
        .animate-orbit-5,
        .animate-icon-pulse-1,
        .animate-icon-pulse-2,
        .animate-icon-pulse-3,
        .animate-icon-pulse-4,
        .animate-icon-pulse-5,
        .animate-border-pulse,
        .animate-line-draw,
        .animate-float-slow,
        .animate-float-delayed,
        .animate-float-reverse {
          animation: none;
        }
      }

      /* Performance Optimizations */
      .ecosystem-icons,
      .teacher-avatar,
      .app-icon,
      .connecting-lines {
        will-change: transform;
      }
    `}</style>
    </div>
  )
}

function FAQSection() {
  const [openItem, setOpenItem] = useState<number | null>(null)
  const [searchTerm, setSearchTerm] = useState("")

  const faqData = [
    {
      question: "Is Zaza really different from ChatGPT?",
      answer:
        "Yes! Zaza is built specifically for education with curriculum awareness, age-appropriate content, and teacher-friendly outputs. ChatGPT is general-purpose and requires complex prompting.",
    },
    {
      question: "How do I know the content is curriculum-aligned?",
      answer:
        "Zaza is trained on educational standards and best practices. Every output is checked against grade-level expectations and learning objectives.",
    },
    {
      question: "What about student data privacy?",
      answer:
        "Zaza is FERPA compliant and designed for educational use. Student data is protected and never used for AI training.",
    },
    {
      question: "Do I need to learn complex prompting?",
      answer:
        "No! Zaza works with natural teacher language. Just describe what you need like you would to a teaching assistant.",
    },
    {
      question: "How much time will this really save me?",
      answer:
        "Teachers report saving 3+ hours per week on lesson planning, material creation, and administrative tasks.",
    },
    {
      question: "Can I use this for all grade levels?",
      answer: "Yes! Zaza adapts content for K-12, understanding developmental appropriateness for each age group.",
    },
    {
      question: "What if I need help getting started?",
      answer:
        "We offer free onboarding, video tutorials, and teacher-focused support. Plus, our tools are designed to be intuitive.",
    },
    {
      question: "Is there a free trial?",
      answer: "Yes! Try any Zaza tool free with no credit card required. See the difference for yourself.",
    },
  ]

  const filteredFAQ = faqData.filter(
    (item) =>
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const toggleItem = (index: number) => {
    setOpenItem(openItem === index ? null : index)
  }

  return (
    <section className="w-full bg-white dark:bg-[#121212] py-16 px-6 transition-colors duration-300">
      <div className="mx-auto max-w-4xl">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-[2.5rem] font-bold text-[#4A235A] dark:text-[#F3F3F3] mb-4 leading-tight transition-colors duration-300">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed transition-colors duration-300">
            Get answers to common questions about Zaza and how it works for educators
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative mb-8">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search FAQ..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#4A235A] focus:border-transparent bg-white dark:bg-[#1E1E1E] text-gray-900 dark:text-[#F3F3F3] placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-300"
          />
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {filteredFAQ.map((item, index) => (
            <div
              key={index}
              className="bg-gray-50 dark:bg-[#1E1E1E] rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden transition-colors duration-300"
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#4A235A] focus:ring-inset"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-[#F3F3F3] pr-4 transition-colors duration-300">
                  {item.question}
                </h3>
                <ChevronDown
                  className={`h-5 w-5 text-[#4A235A] dark:text-purple-400 transition-transform duration-300 flex-shrink-0 ${
                    openItem === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openItem === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-6 pb-5 pt-2">
                  <div className="h-px bg-gradient-to-r from-[#4A235A]/20 via-[#4A235A]/40 to-[#4A235A]/20 mb-4"></div>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed transition-colors duration-300">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results Message */}
        {filteredFAQ.length === 0 && (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-[#F3F3F3] mb-2 transition-colors duration-300">
              No results found
            </h3>
            <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">
              Try adjusting your search terms or browse all questions above
            </p>
          </div>
        )}

        {/* Contact CTA */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-br from-[#F8F6FF] to-[#E8E6F5] rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
            <h3 className="text-2xl font-bold text-[#4A235A] mb-4">Still have questions?</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Our education specialists are here to help you get the most out of Zaza
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                asChild
                className="bg-[#4A235A] hover:bg-[#5B2C6F] text-white font-medium px-6 py-3 rounded-lg transition-all duration-300"
              >
                <Link href="/contact">Contact Support</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-2 border-[#4A235A] text-[#4A235A] hover:bg-purple-50 transition-all duration-300 bg-transparent"
              >
                <Link href="/help">Browse Help Center</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function ComparisonPage() {
  return (
    <Layout>
      {/* Header Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-pink-500 via-pink-400 to-purple-600 dark:from-pink-600 dark:via-pink-500 dark:to-purple-700 px-6 py-16 text-white transition-colors duration-300">
        <div className="absolute inset-0 bg-black/10 dark:bg-black/20"></div>
        <div className="relative mx-auto max-w-4xl text-center">
          <h1 className="mb-6 text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">Why not just use ChatGPT?</h1>
          <p className="mx-auto max-w-3xl text-lg leading-relaxed opacity-90 md:text-xl">
            If you've tried generic AI tools and found them clunky, you're not alone. Here's how Zaza Promptly is built
            differently for teachers like you.
          </p>
        </div>
      </section>

      {/* New Comparison Section */}
      <section className="w-full bg-gradient-to-br from-[#F8F6FF] to-[#E8E6F5] px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-5">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-3 space-y-8">
              {/* Content Hierarchy */}
              <div className="space-y-6">
                <h2 className="text-4xl font-bold text-[#4A235A] leading-tight">Why Settle for Generic AI?</h2>
                <p className="text-xl text-[#6B7280] leading-relaxed">
                  You've tried ChatGPT. You know the frustration. Zaza was built differently because teaching isn't
                  generic.
                </p>
                <p className="text-[#374151] leading-relaxed max-w-[600px]">
                  Generic AI tools weren't designed for your classroom reality. They don't understand curriculum
                  standards, age-appropriate language, or the time pressure you're under between bells.
                </p>
              </div>

              {/* Comparison Table */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 w-1/2">
                          Generic AI Tools
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 w-1/2">
                          Zaza Ecosystem
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4 bg-[#FEF2F2] border-l-4 border-red-200">
                          <div className="text-sm text-gray-800 leading-relaxed">
                            🔧 <strong>Built for everyone</strong>: Complex prompts needed
                          </div>
                        </td>
                        <td className="px-6 py-4 bg-[#F0FDF4] border-l-4 border-green-200">
                          <div className="text-sm text-gray-800 leading-relaxed">
                            🍎 <strong>Built for educators</strong>: Works with natural teacher language
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 bg-[#FEF2F2] border-l-4 border-red-200">
                          <div className="text-sm text-gray-800 leading-relaxed">
                            ⚡ <strong>One-size-fits-all</strong>: No curriculum awareness
                          </div>
                        </td>
                        <td className="px-6 py-4 bg-[#F0FDF4] border-l-4 border-green-200">
                          <div className="text-sm text-gray-800 leading-relaxed">
                            📚 <strong>Curriculum-smart</strong>: Understands standards, age groups, subjects
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 bg-[#FEF2F2] border-l-4 border-red-200">
                          <div className="text-sm text-gray-800 leading-relaxed">
                            🔄 <strong>Endless revisions</strong>: 5-10 attempts to get it right
                          </div>
                        </td>
                        <td className="px-6 py-4 bg-[#F0FDF4] border-l-4 border-green-200">
                          <div className="text-sm text-gray-800 leading-relaxed">
                            ✨ <strong>90%+ ready instantly</strong>: Designed for your specific teaching needs
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 bg-[#FEF2F2] border-l-4 border-red-200">
                          <div className="text-sm text-gray-800 leading-relaxed">
                            🤖 <strong>Cold, corporate tone</strong>: Doesn't match your voice
                          </div>
                        </td>
                        <td className="px-6 py-4 bg-[#F0FDF4] border-l-4 border-green-200">
                          <div className="text-sm text-gray-800 leading-relaxed">
                            💝 <strong>Warm, classroom-safe</strong>: Sounds like you, appropriate for students
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 bg-[#FEF2F2] border-l-4 border-red-200">
                          <div className="text-sm text-gray-800 leading-relaxed">
                            🔀 <strong>Scattered tools</strong>: Jump between platforms
                          </div>
                        </td>
                        <td className="px-6 py-4 bg-[#F0FDF4] border-l-4 border-green-200">
                          <div className="text-sm text-gray-800 leading-relaxed">
                            🎯 <strong>Integrated suite</strong>: Lessons, visuals, feedback in one place
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 bg-[#FEF2F2] border-l-4 border-red-200">
                          <div className="text-sm text-gray-800 leading-relaxed">
                            💸 <strong>Hidden costs</strong>: Expensive subscriptions
                          </div>
                        </td>
                        <td className="px-6 py-4 bg-[#F0FDF4] border-l-4 border-green-200">
                          <div className="text-sm text-gray-800 leading-relaxed">
                            🆓 <strong>Teacher-friendly pricing</strong>: Free tiers, educator discounts
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Right Column - Enhanced Ecosystem Visual */}
            <div className="lg:col-span-2 flex justify-center items-center min-h-[600px]">
              <EcosystemVisual />
            </div>
          </div>
        </div>
      </section>

      {/* New CTA Section */}
      <section className="w-full bg-[#E8E6F5] py-16 px-8">
        <div className="mx-auto max-w-[800px] text-center">
          {/* Main heading */}
          <h2 className="text-[2rem] font-bold text-[#4A235A] mb-6">We built Zaza because teachers deserve better.</h2>

          {/* Subheading */}
          <p className="text-[1.1rem] text-[#374151] mb-6 leading-relaxed">
            Every feature, every response, every tool designed around your world, not the tech world. From lesson
            planning to parent communication, from classroom visuals to student feedback.
          </p>

          {/* Social proof */}
          <p className="text-[1rem] text-[#6B7280] mb-8">Join 50,000+ educators who've made the switch</p>

          {/* Button group */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
            <Button
              asChild
              className="bg-gradient-to-br from-[#6B46C1] to-[#9333EA] text-white px-8 py-3 rounded-lg font-medium hover:scale-105 hover:shadow-lg transition-all duration-300"
            >
              <Link href="/products">Explore All Zaza Tools</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-2 border-[#4A235A] text-[#4A235A] bg-transparent px-8 py-3 rounded-lg font-medium hover:bg-purple-50 transition-all duration-300"
            >
              <Link href="/#get-started">Try Any Tool Free</Link>
            </Button>
          </div>

          {/* Microcopy */}
          <div className="text-center text-[#6B7280] text-[0.9rem] space-y-1 mb-8">
            <p>✓ No credit card required</p>
            <p>✓ Try Promptly, Teach, or Visuals instantly</p>
            <p>✓ Cancel anytime</p>
          </div>

          {/* Testimonial card */}
          <div className="bg-[#F8F6FF] rounded-xl p-6 max-w-[500px] mx-auto">
            <blockquote className="italic text-[#374151] mb-3">
              "Finally, an AI that gets teaching. Zaza saves me 3 hours every week."
            </blockquote>
            <cite className="text-[#6B7280] text-[0.9rem] not-italic">Sarah M., 5th Grade Teacher</cite>
          </div>
        </div>
      </section>

      {/* Product Suite Section */}
      <section className="w-full bg-white dark:bg-[#121212] py-16 px-6 transition-colors duration-300">
        <div className="mx-auto max-w-7xl">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-[2.5rem] font-bold text-[#4A235A] dark:text-[#F3F3F3] mb-4 transition-colors duration-300">
              One Platform, Every Teaching Need
            </h2>
            <p className="text-[#6B7280] dark:text-gray-300 text-lg leading-relaxed max-w-3xl mx-auto transition-colors duration-300">
              From lesson planning to parent communication, Zaza tools work together seamlessly
            </p>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
            {/* Product 1 - Zaza Promptly */}
            <div className="bg-white dark:bg-[#1E1E1E] rounded-2xl p-8 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 max-w-[350px] w-full border border-gray-100 dark:border-gray-700">
              <div className="text-center mb-6">
                <div className="text-5xl mb-4">⚡</div>
                <h3 className="text-xl font-bold text-[#4A235A] dark:text-[#F3F3F3] mb-3 transition-colors duration-300">
                  Zaza Promptly
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4 transition-colors duration-300">
                  Transform quick notes into polished lesson plans, assessments, and classroom materials instantly.
                </p>
              </div>

              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 transition-colors duration-300">
                  <span className="text-green-600 dark:text-green-400">✓</span>
                  <span>Curriculum-aligned content</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 transition-colors duration-300">
                  <span className="text-green-600 dark:text-green-400">✓</span>
                  <span>Age-appropriate language</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 transition-colors duration-300">
                  <span className="text-green-600 dark:text-green-400">✓</span>
                  <span>Ready in seconds</span>
                </div>
              </div>

              <Button
                asChild
                variant="outline"
                className="w-full border-2 border-[#4A235A] text-[#4A235A] hover:bg-purple-50 dark:border-purple-400 dark:text-purple-400 dark:hover:bg-purple-900/20 transition-all duration-300 bg-transparent"
              >
                <Link href="/zaza-promptly-site">Try Promptly Free</Link>
              </Button>
            </div>

            {/* Product 2 - Zaza Teach */}
            <div className="bg-white dark:bg-[#1E1E1E] rounded-2xl p-8 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 max-w-[350px] w-full border border-gray-100 dark:border-gray-700">
              <div className="text-center mb-6">
                <div className="text-5xl mb-4">📚</div>
                <h3 className="text-xl font-bold text-[#4A235A] dark:text-[#F3F3F3] mb-3 transition-colors duration-300">
                  Zaza Teach
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4 transition-colors duration-300">
                  Create engaging lessons, activities, and assessments tailored to your students' needs.
                </p>
              </div>

              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 transition-colors duration-300">
                  <span className="text-green-600 dark:text-green-400">✓</span>
                  <span>Differentiated instruction</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 transition-colors duration-300">
                  <span className="text-green-600 dark:text-green-400">✓</span>
                  <span>Interactive activities</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 transition-colors duration-300">
                  <span className="text-green-600 dark:text-green-400">✓</span>
                  <span>Standards-based</span>
                </div>
              </div>

              <Button
                asChild
                variant="outline"
                className="w-full border-2 border-[#4A235A] text-[#4A235A] hover:bg-purple-50 dark:border-purple-400 dark:text-purple-400 dark:hover:bg-purple-900/20 transition-all duration-300 bg-transparent"
              >
                <Link href="/zaza-teach-website">Explore Teach</Link>
              </Button>
            </div>

            {/* Product 3 - Zaza Visuals */}
            <div className="bg-white dark:bg-[#1E1E1E] rounded-2xl p-8 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 max-w-[350px] w-full border border-gray-100 dark:border-gray-700">
              <div className="text-center mb-6">
                <div className="text-5xl mb-4">🎨</div>
                <h3 className="text-xl font-bold text-[#4A235A] dark:text-[#F3F3F3] mb-3 transition-colors duration-300">
                  Zaza Visuals
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4 transition-colors duration-300">
                  Generate classroom-ready graphics, diagrams, and visual aids in seconds.
                </p>
              </div>

              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 transition-colors duration-300">
                  <span className="text-green-600 dark:text-green-400">✓</span>
                  <span>Educational graphics</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 transition-colors duration-300">
                  <span className="text-green-600 dark:text-green-400">✓</span>
                  <span>Custom illustrations</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 transition-colors duration-300">
                  <span className="text-green-600 dark:text-green-400">✓</span>
                  <span>Classroom-safe content</span>
                </div>
              </div>

              <Button
                asChild
                variant="outline"
                className="w-full border-2 border-[#4A235A] text-[#4A235A] hover:bg-purple-50 dark:border-purple-400 dark:text-purple-400 dark:hover:bg-purple-900/20 transition-all duration-300 bg-transparent"
              >
                <Link href="/zaza-visuals-landing (1)">Create Visuals</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="w-full bg-gradient-to-br from-[#F8F6FF] to-[#E8E6F5] py-16 px-6">
        <div className="mx-auto max-w-[1200px]">
          {/* Impact Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-[#4A235A] mb-2">50,000+</div>
              <div className="text-gray-600 font-medium">Active Teachers</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-[#4A235A] mb-2">3 Hours</div>
              <div className="text-gray-600 font-medium">Saved Per Week</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-[#4A235A] mb-2">90%+</div>
              <div className="text-gray-600 font-medium">First-Try Success</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-[#4A235A] mb-2">24/7</div>
              <div className="text-gray-600 font-medium">Always Available</div>
            </div>
          </div>

          {/* Testimonial Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="mb-4">
                <div className="flex text-[#F59E0B] mb-3">
                  <span>⭐⭐⭐⭐⭐</span>
                </div>
                <blockquote className="text-lg italic text-gray-800 leading-relaxed">
                  "Zaza Promptly cut my lesson planning time in half. The content is always curriculum-aligned and ready
                  to use."
                </blockquote>
              </div>
              <div className="border-t pt-4">
                <div className="font-semibold text-gray-900">Maria Rodriguez</div>
                <div className="text-sm text-gray-600">3rd Grade Teacher, Austin ISD</div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="mb-4">
                <div className="flex text-[#F59E0B] mb-3">
                  <span>⭐⭐⭐⭐⭐</span>
                </div>
                <blockquote className="text-lg italic text-gray-800 leading-relaxed">
                  "Finally, an AI that understands classroom management. Zaza Teach creates activities my students
                  actually engage with."
                </blockquote>
              </div>
              <div className="border-t pt-4">
                <div className="font-semibold text-gray-900">James Chen</div>
                <div className="text-sm text-gray-600">Middle School Science, Portland</div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="mb-4">
                <div className="flex text-[#F59E0B] mb-3">
                  <span>⭐⭐⭐⭐⭐</span>
                </div>
                <blockquote className="text-lg italic text-gray-800 leading-relaxed">
                  "Zaza Visuals saves me from endless Google searches. Professional graphics made for education."
                </blockquote>
              </div>
              <div className="border-t pt-4">
                <div className="font-semibold text-gray-900">Sarah Johnson</div>
                <div className="text-sm text-gray-600">High School History, Chicago</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Security Section */}
      <section className="w-full bg-white dark:bg-[#121212] py-16 px-6 transition-colors duration-300">
        <div className="mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-5 gap-12 items-center">
            {/* Left Column - Content (60%) */}
            <div className="lg:col-span-3 space-y-8">
              {/* Section Header */}
              <div className="space-y-4">
                <h2 className="text-[2rem] font-bold text-[#4A235A] dark:text-[#F3F3F3] leading-tight transition-colors duration-300">
                  Built for Education, Secured for Students
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed transition-colors duration-300">
                  Your data, your students' privacy, and your peace of mind are our top priorities.
                </p>
              </div>

              {/* Security Features Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Feature 1 - FERPA Compliant */}
                <div className="bg-gray-50 dark:bg-[#1E1E1E] rounded-xl p-6 border border-gray-100 dark:border-gray-700 transition-colors duration-300">
                  <div className="flex items-start gap-4">
                    <div className="text-3xl">🔐</div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-[#F3F3F3] mb-2 transition-colors duration-300">
                        FERPA Compliant
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed transition-colors duration-300">
                        Full compliance with educational privacy regulations
                      </p>
                    </div>
                  </div>
                </div>

                {/* Feature 2 - Data Encryption */}
                <div className="bg-gray-50 dark:bg-[#1E1E1E] rounded-xl p-6 border border-gray-100 dark:border-gray-700 transition-colors duration-300">
                  <div className="flex items-start gap-4">
                    <div className="text-3xl">🛡️</div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-[#F3F3F3] mb-2 transition-colors duration-300">
                        Data Encryption
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed transition-colors duration-300">
                        Military-grade encryption for all data in transit and at rest
                      </p>
                    </div>
                  </div>
                </div>

                {/* Feature 3 - School-Safe Content */}
                <div className="bg-gray-50 dark:bg-[#1E1E1E] rounded-xl p-6 border border-gray-100 dark:border-gray-700 transition-colors duration-300">
                  <div className="flex items-start gap-4">
                    <div className="text-3xl">🏫</div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-[#F3F3F3] mb-2 transition-colors duration-300">
                        School-Safe Content
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed transition-colors duration-300">
                        All outputs filtered for age-appropriate, classroom-ready content
                      </p>
                    </div>
                  </div>
                </div>

                {/* Feature 4 - No Data Training */}
                <div className="bg-gray-50 dark:bg-[#1E1E1E] rounded-xl p-6 border border-gray-100 dark:border-gray-700 transition-colors duration-300">
                  <div className="flex items-start gap-4">
                    <div className="text-3xl">🔄</div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-[#F3F3F3] mb-2 transition-colors duration-300">
                        No Data Training
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed transition-colors duration-300">
                        Your classroom data never used to train AI models
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Visual & Certifications (40%) */}
            <div className="lg:col-span-2 flex flex-col items-center space-y-8">
              {/* Security Illustration */}
              <div className="relative">
                <div className="w-64 h-64 bg-gradient-to-br from-[#F8F6FF] to-[#E8E6F5] rounded-full flex items-center justify-center border-4 border-[#4A235A]/10">
                  <div className="text-8xl opacity-80">🔒</div>
                </div>
                {/* Floating security icons */}
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-white dark:bg-[#1E1E1E] rounded-full flex items-center justify-center shadow-lg border border-gray-200 dark:border-gray-700 transition-colors duration-300">
                  <span className="text-xl">🛡️</span>
                </div>
                <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-white dark:bg-[#1E1E1E] rounded-full flex items-center justify-center shadow-lg border border-gray-200 dark:border-gray-700 transition-colors duration-300">
                  <span className="text-xl">🔐</span>
                </div>
                <div className="absolute top-1/2 -left-8 w-10 h-10 bg-white dark:bg-[#1E1E1E] rounded-full flex items-center justify-center shadow-lg border border-gray-200 dark:border-gray-700 transition-colors duration-300">
                  <span className="text-lg">✅</span>
                </div>
              </div>

              {/* Certification Badges */}
              <div className="space-y-4 w-full max-w-xs">
                <div className="bg-white dark:bg-[#1E1E1E] rounded-lg p-4 shadow-md border border-gray-200 dark:border-gray-700 text-center transition-colors duration-300">
                  <div className="text-2xl mb-2">📋</div>
                  <div className="font-semibold text-[#4A235A] dark:text-purple-400 text-sm transition-colors duration-300">
                    FERPA CERTIFIED
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400 transition-colors duration-300">
                    Educational Privacy
                  </div>
                </div>

                <div className="bg-white dark:bg-[#1E1E1E] rounded-lg p-4 shadow-md border border-gray-200 dark:border-gray-700 text-center transition-colors duration-300">
                  <div className="text-2xl mb-2">🏆</div>
                  <div className="font-semibold text-[#4A235A] dark:text-purple-400 text-sm transition-colors duration-300">
                    SOC 2 TYPE II
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400 transition-colors duration-300">
                    Security Compliance
                  </div>
                </div>

                <div className="bg-white dark:bg-[#1E1E1E] rounded-lg p-4 shadow-md border border-gray-200 dark:border-gray-700 text-center transition-colors duration-300">
                  <div className="text-2xl mb-2">🌍</div>
                  <div className="font-semibold text-[#4A235A] dark:text-purple-400 text-sm transition-colors duration-300">
                    GDPR COMPLIANT
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400 transition-colors duration-300">
                    Global Privacy
                  </div>
                </div>
              </div>

              {/* Learn More Button */}
              <Button
                asChild
                variant="outline"
                className="border-2 border-[#4A235A] text-[#4A235A] hover:bg-purple-50 dark:border-purple-400 dark:text-purple-400 dark:hover:bg-purple-900/20 transition-all duration-300 bg-transparent"
              >
                <Link href="/security">Learn More About Our Security</Link>
              </Button>
            </div>
          </div>

          {/* Bottom Trust Indicators */}
          <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 text-center">
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 transition-colors duration-300">
                <span className="text-green-600 dark:text-green-400">✓</span>
                <span className="font-medium">Trusted by 500+ school districts</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 transition-colors duration-300">
                <span className="text-green-600 dark:text-green-400">✓</span>
                <span className="font-medium">SOC 2 Type II Certified</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 transition-colors duration-300">
                <span className="text-green-600 dark:text-green-400">✓</span>
                <span className="font-medium">GDPR Compliant</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Getting Started Section */}
      <section className="w-full bg-gradient-to-br from-[#F8F6FF] to-[#E8E6F5] py-16 px-6">
        <div className="mx-auto max-w-6xl">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-[2.5rem] font-bold text-[#4A235A] mb-4 leading-tight">
              Ready to Transform Your Teaching?
            </h2>
            <p className="text-xl text-[#6B7280] leading-relaxed">Get started with Zaza in less than 2 minutes</p>
          </div>

          {/* Step-by-step Flow */}
          <div className="relative">
            {/* Desktop Layout - Horizontal */}
            <div className="hidden md:flex items-center justify-between relative">
              {/* Connecting Lines */}
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-[#4A235A]/20 via-[#4A235A]/40 to-[#4A235A]/20 transform -translate-y-1/2 z-0">
                <div className="absolute left-1/3 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <ArrowRight className="h-6 w-6 text-[#4A235A]/60" />
                </div>
                <div className="absolute left-2/3 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <ArrowRight className="h-6 w-6 text-[#4A235A]/60" />
                </div>
              </div>

              {/* Step 1 */}
              <div className="flex-1 text-center relative z-10">
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 max-w-xs mx-auto hover:shadow-xl transition-all duration-300">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#4A235A] to-[#6B46C1] rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4 mx-auto">
                    1
                  </div>
                  <div className="text-4xl mb-4">📝</div>
                  <h3 className="text-xl font-bold text-[#4A235A] mb-3">Choose Your Tool</h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    Start with Promptly, Teach, or Visuals based on your immediate need
                  </p>
                  <div className="inline-block bg-[#4A235A]/10 text-[#4A235A] px-3 py-1 rounded-full text-sm font-medium">
                    30 seconds
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex-1 text-center relative z-10">
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 max-w-xs mx-auto hover:shadow-xl transition-all duration-300">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#4A235A] to-[#6B46C1] rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4 mx-auto">
                    2
                  </div>
                  <div className="text-4xl mb-4">💬</div>
                  <h3 className="text-xl font-bold text-[#4A235A] mb-3">Describe Your Need</h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    Tell Zaza what you need in plain English, just like talking to a colleague
                  </p>
                  <div className="inline-block bg-[#4A235A]/10 text-[#4A235A] px-3 py-1 rounded-full text-sm font-medium">
                    1 minute
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex-1 text-center relative z-10">
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 max-w-xs mx-auto hover:shadow-xl transition-all duration-300">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#4A235A] to-[#6B46C1] rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4 mx-auto">
                    3
                  </div>
                  <div className="text-4xl mb-4">✨</div>
                  <h3 className="text-xl font-bold text-[#4A235A] mb-3">Get Perfect Results</h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    Receive curriculum-aligned, classroom-ready content instantly
                  </p>
                  <div className="inline-block bg-[#4A235A]/10 text-[#4A235A] px-3 py-1 rounded-full text-sm font-medium">
                    Instant
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Layout - Vertical */}
            <div className="md:hidden space-y-8">
              {/* Step 1 Mobile */}
              <div className="text-center">
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 max-w-sm mx-auto">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#4A235A] to-[#6B46C1] rounded-full flex items-center justify-center text-white text-lg font-bold mb-4 mx-auto">
                    1
                  </div>
                  <div className="text-3xl mb-3">📝</div>
                  <h3 className="text-lg font-bold text-[#4A235A] mb-2">Choose Your Tool</h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-3">
                    Start with Promptly, Teach, or Visuals based on your immediate need
                  </p>
                  <div className="inline-block bg-[#4A235A]/10 text-[#4A235A] px-2 py-1 rounded-full text-xs font-medium">
                    30 seconds
                  </div>
                </div>
              </div>

              {/* Step 2 Mobile */}
              <div className="text-center">
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 max-w-sm mx-auto">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#4A235A] to-[#6B46C1] rounded-full flex items-center justify-center text-white text-lg font-bold mb-4 mx-auto">
                    2
                  </div>
                  <div className="text-3xl mb-3">💬</div>
                  <h3 className="text-lg font-bold text-[#4A235A] mb-2">Describe Your Need</h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-3">
                    Tell Zaza what you need in plain English, just like talking to a colleague
                  </p>
                  <div className="inline-block bg-[#4A235A]/10 text-[#4A235A] px-2 py-1 rounded-full text-xs font-medium">
                    1 minute
                  </div>
                </div>
              </div>

              {/* Step 3 Mobile */}
              <div className="text-center">
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 max-w-sm mx-auto">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#4A235A] to-[#6B46C1] rounded-full flex items-center justify-center text-white text-lg font-bold mb-4 mx-auto">
                    3
                  </div>
                  <div className="text-3xl mb-3">✨</div>
                  <h3 className="text-lg font-bold text-[#4A235A] mb-2">Get Perfect Results</h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-3">
                    Receive curriculum-aligned, classroom-ready content instantly
                  </p>
                  <div className="inline-block bg-[#4A235A]/10 text-[#4A235A] px-2 py-1 rounded-full text-xs font-medium">
                    Instant
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-16 text-center">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-[#4A235A]">Ready to get started?</h3>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  asChild
                  className="bg-gradient-to-br from-[#6B46C1] to-[#9333EA] text-white px-8 py-3 rounded-lg font-medium hover:scale-105 hover:shadow-lg transition-all duration-300"
                >
                  <Link href="/products">Choose Your Tool</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="border-2 border-[#4A235A] text-[#4A235A] bg-transparent px-8 py-3 rounded-lg font-medium hover:bg-purple-50 transition-all duration-300"
                >
                  <Link href="/demo">Watch Demo</Link>
                </Button>
              </div>
              <p className="text-sm text-gray-600">No credit card required • Free trial available</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection />

            </Layout>
  )
}
