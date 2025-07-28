"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  BookOpen,
  PenTool,
  Users,
  Brain,
  Code,
  Gamepad2,
  Globe,
  Puzzle,
  Sparkles,
  ArrowRight,
  Star,
} from "lucide-react"
import SolidBackground from "./solid-background"
import { DarkModeProvider } from "@/contexts/dark-mode-context"
import { Layout } from "@zaza/shared-components"

type Tag = "Admin" | "Planning" | "Creativity" | "Writing" | "Student Tools"

interface Product {
  id: string
  name: string
  description: string
  tags: Tag[]
  icon: React.ReactNode
  keyFeatures?: string[]
}

const products: Product[] = [
  {
    id: "promptly",
    name: "Zaza Promptly",
    description: "Write parent comments in seconds, not hours.",
    tags: ["Admin", "Writing"],
    icon: <PenTool className="w-8 h-8" />,
    keyFeatures: ["Complete in under 2 minutes", "Always authentic to your voice", "Professional, inspection-ready"],
  },
  {
    id: "teach",
    name: "Zaza Teach",
    description: "Your AI lesson planning copilot, always ready to help.",
    tags: ["Planning", "Creativity"],
    icon: <BookOpen className="w-8 h-8" />,
    keyFeatures: ["Complete lessons in minutes", "Always curriculum-aligned", "Engaging, effective content"],
  },
  {
    id: "bragboard",
    name: "Zaza BragBoard",
    description: "Celebrate student strengths with positive, professional report phrases.",
    tags: ["Writing"],
    icon: <Sparkles className="w-8 h-8" />,
    keyFeatures: ["Positive strength-based language", "Professional report phrases", "Celebrates every student"],
  },
  {
    id: "visuals",
    name: "Zaza Visuals",
    description: "Create engaging classroom materials like worksheets and posters in minutes.",
    tags: ["Creativity"],
    icon: <PenTool className="w-8 h-8" />,
    keyFeatures: ["Custom worksheets and posters", "Professional design templates", "Ready-to-print materials"],
  },
  {
    id: "coach",
    name: "Zaza Coach",
    description: "Support teacher growth with clear, constructive feedback tools for coaches.",
    tags: ["Admin"],
    icon: <Users className="w-8 h-8" />,
    keyFeatures: ["Constructive feedback tools", "Growth-focused insights", "Professional development support"],
  },
  {
    id: "focusfriend",
    name: "Zaza FocusFriend",
    description: "Helps students stay organized and manage tasks independently.",
    tags: ["Student Tools"],
    icon: <Brain className="w-8 h-8" />,
    keyFeatures: ["Task organization tools", "Independent learning support", "Focus and productivity aids"],
  },
  {
    id: "claritydeck",
    name: "Zaza ClarityDeck",
    description: "Real-time insights into classroom quality, wellbeing, and teaching trends.",
    tags: ["Admin"],
    icon: <Globe className="w-8 h-8" />,
    keyFeatures: ["Real-time classroom insights", "Wellbeing monitoring", "Teaching trend analysis"],
  },
  {
    id: "stackmate",
    name: "Zaza StackMate",
    description: "Smart tool recommendations and guidance for first-time app builders.",
    tags: ["Admin", "Student Tools"],
    icon: <Code className="w-8 h-8" />,
    keyFeatures: ["Smart tool recommendations", "First-time builder guidance", "Development best practices"],
  },
  {
    id: "scaffold",
    name: "Zaza ScaffoldAI",
    description: "Helps students build critical thinking, not just AI-generated essays.",
    tags: ["Student Tools", "Writing"],
    icon: <Users className="w-8 h-8" />,
    keyFeatures: ["Critical thinking development", "Scaffolded learning approach", "Original thought encouragement"],
  },
  {
    id: "plottwist",
    name: "Zaza PlotTwist",
    description: "Interactive logic games that teach choice-based reasoning.",
    tags: ["Student Tools", "Creativity"],
    icon: <Gamepad2 className="w-8 h-8" />,
    keyFeatures: ["Interactive logic games", "Choice-based reasoning", "Critical thinking skills"],
  },
  {
    id: "looop",
    name: "Zaza Looop",
    description: "From language learning to cultural intelligence, one loop at a time.",
    tags: ["Student Tools", "Creativity"],
    icon: <Globe className="w-8 h-8" />,
    keyFeatures: ["Language learning loops", "Cultural intelligence building", "Progressive skill development"],
  },
  {
    id: "unbox",
    name: "Zaza Unbox",
    description: "Addictive AI puzzle feed for cognitive skill building.",
    tags: ["Student Tools", "Creativity"],
    icon: <Puzzle className="w-8 h-8" />,
    keyFeatures: ["AI-powered puzzle feed", "Cognitive skill building", "Engaging learning experience"],
  },
]

const tagConfig = {
  Admin: {
    emoji: "🟠",
    color:
      "bg-orange-500 text-white hover:bg-orange-600 dark:bg-orange-600 dark:text-orange-100 dark:hover:bg-orange-500",
  },
  Planning: {
    emoji: "🟢",
    color: "bg-green-500 text-white hover:bg-green-600 dark:bg-green-600 dark:text-green-100 dark:hover:bg-green-500",
  },
  Creativity: {
    emoji: "🔵",
    color: "bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:text-blue-100 dark:hover:bg-blue-500",
  },
  Writing: {
    emoji: "🟣",
    color:
      "bg-purple-600 text-white hover:bg-purple-700 dark:bg-purple-700 dark:text-purple-100 dark:hover:bg-purple-600",
  },
  "Student Tools": {
    emoji: "🟡",
    color:
      "bg-yellow-500 text-white hover:bg-yellow-600 dark:bg-yellow-600 dark:text-yellow-100 dark:hover:bg-yellow-500",
  },
}

function ProductsOverviewContent() {
  const [activeFilters, setActiveFilters] = useState<Tag[]>([])
  const [filteredProducts, setFilteredProducts] = useState(products)
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  useEffect(() => {
    if (activeFilters.length === 0) {
      setFilteredProducts(products)
    } else {
      setFilteredProducts(products.filter((product) => product.tags.some((tag) => activeFilters.includes(tag))))
    }
  }, [activeFilters])

  const toggleFilter = (tag: Tag) => {
    setActiveFilters((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-pink-500 dark:from-purple-800 dark:to-pink-800 transition-colors duration-200 relative">
      {/* Solid Background */}
      <SolidBackground />

      {/* Content */}
      <div className="relative z-10">
        {/* Header Section */}
        <header className="container mx-auto px-4 py-16 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center justify-center mb-6">
              <div className="relative">
                <img
                  src="/images/zaza-logo-final.png"
                  alt="Zaza Logo"
                  className="h-16 md:h-20 w-auto object-contain mr-4"
                />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white dark:text-white font-inter drop-shadow-lg">
                Explore the Zaza Suite
              </h1>
            </div>
            <p className="text-xl md:text-2xl text-white/90 dark:text-white/90 max-w-3xl mx-auto leading-relaxed font-medium drop-shadow-md">
              Helping teachers thrive through emotionally intelligent tools. Planning, feedback, creativity,
              communication, and wellbeing: without ever compromising your values.
            </p>
          </motion.div>
        </header>

        {/* Filter Bar */}
        <section className="container mx-auto px-4 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-3"
          >
            {Object.entries(tagConfig).map(([tag, config]) => (
              <Button
                key={tag}
                variant="ghost"
                onClick={() => toggleFilter(tag as Tag)}
                className={`
                  rounded-full px-6 py-3 text-sm font-bold transition-all duration-200 border-2 shadow-lg
                  ${
                    activeFilters.includes(tag as Tag)
                      ? `${config.color} border-white shadow-2xl scale-105`
                      : `${config.color} border-white/50 hover:border-white hover:shadow-xl hover:scale-105`
                  }
                `}
              >
                <span className="mr-2 text-lg">{config.emoji}</span>
                {tag}
              </Button>
            ))}
            {activeFilters.length > 0 && (
              <Button
                variant="ghost"
                onClick={() => setActiveFilters([])}
                className="rounded-full px-6 py-3 text-sm font-bold bg-white text-purple-600 hover:bg-gray-100 border-2 border-white transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Clear all
              </Button>
            )}
          </motion.div>
        </section>

        {/* Products Grid */}
        <section className="container mx-auto px-4 mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence>
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="group relative"
                  onMouseEnter={() => setHoveredCard(product.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <Card className="h-[360px] cursor-pointer transition-all duration-300 ease-out border border-[#66B2B2]/30 bg-gradient-to-b from-[#E8E6F5] to-[#F8F8FF] dark:from-gray-800 dark:to-gray-900 shadow-lg hover:shadow-2xl hover:scale-[1.02] hover:border-[#E0115F] rounded-2xl backdrop-blur-sm flex flex-col will-change-transform group-hover:transform">
                    <CardContent className="p-5 flex flex-col justify-between h-full">
                      {/* Top Section */}
                      <div className="flex-shrink-0">
                        {/* Icon Section */}
                        <div className="p-3 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 group-hover:from-purple-700 group-hover:to-pink-700 transition-all duration-300 shadow-lg group-hover:shadow-xl group-hover:scale-105 group-hover:wiggle-animation">
                          <div className="text-white transition-transform duration-300">{product.icon}</div>
                        </div>

                        {/* Title */}
                        <h3 className="text-lg font-bold text-[#4A235A] dark:text-purple-200 mb-3 transition-colors duration-200 leading-tight">
                          {product.name}
                        </h3>

                        {/* Description */}
                        <p className="text-[#2C3E35] dark:text-gray-300 mb-4 leading-relaxed transition-colors duration-200 text-sm">
                          {product.description}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {product.tags.map((tag, tagIndex) => (
                            <Badge
                              key={tag}
                              variant="secondary"
                              className={`${tagConfig[tag].color} border-0 text-xs font-bold shadow-md px-2 py-1 transition-all duration-200 ease-in-out group-hover:scale-105 group-hover:shadow-lg`}
                              style={{
                                transitionDelay: `${tagIndex * 50}ms`,
                                willChange: "transform, opacity",
                              }}
                            >
                              <span className="mr-1 text-xs">{tagConfig[tag].emoji}</span>
                              <span className="text-xs">{tag}</span>
                            </Badge>
                          ))}
                        </div>

                        {/* Key Features - Simple Bullet List */}
                        {product.keyFeatures && (
                          <div className="mb-4">
                            <ul className="space-y-1">
                              {product.keyFeatures.slice(0, 3).map((feature, featureIndex) => (
                                <li
                                  key={featureIndex}
                                  className="text-[#2C3E35] dark:text-gray-400 text-xs flex items-start"
                                >
                                  <span className="text-purple-600 dark:text-purple-400 mr-2 flex-shrink-0 mt-0.5">
                                    •
                                  </span>
                                  <span className="leading-relaxed">{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>

                      {/* Bottom Section - CTA Button */}
                      <div className="flex-shrink-0">
                        <Button className="w-full group/btn bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white transition-all duration-300 font-bold py-2.5 text-sm rounded-xl relative overflow-hidden shadow-lg hover:shadow-xl">
                          <span className="mr-2 relative z-10">Learn More</span>
                          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300 relative z-10" />
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Key Features Tooltip */}
                  {hoveredCard === product.id && product.keyFeatures && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute top-2 right-2 z-20 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 p-3 max-w-xs pointer-events-none"
                    >
                      <div className="flex items-center mb-2">
                        <Star className="w-4 h-4 text-purple-600 mr-2" />
                        <span className="text-sm font-bold text-[#4A235A] dark:text-purple-200">Key Features</span>
                      </div>
                      <ul className="space-y-1">
                        {product.keyFeatures.map((feature, index) => (
                          <li key={index} className="text-xs text-[#2C3E35] dark:text-gray-300 flex items-start">
                            <span className="text-purple-600 dark:text-purple-400 mr-2 flex-shrink-0 mt-0.5">✓</span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </section>

        {/* Why a Suite Section */}
        <section className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="w-32 h-1 bg-white mx-auto mb-12 rounded-full" />

            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 drop-shadow-lg">Why a Suite?</h2>

            <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8 leading-relaxed font-medium drop-shadow-md">
              Zaza tools are built to work together. The more you use, the more time you save.
            </p>

            <Button
              size="lg"
              className="bg-white text-purple-600 hover:bg-gray-100 hover:text-purple-700 px-10 py-4 rounded-full group transition-all duration-200 hover:scale-110 shadow-2xl font-bold text-lg"
            >
              <Sparkles className="w-6 h-6 mr-3" />
              See Bundles & Pricing
              <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform duration-200" />
            </Button>
          </motion.div>
        </section>

      </div>
    </div>
  )
}

export default function ProductsOverview() {
  return (
    <DarkModeProvider>
      <Layout currentProduct="Products Overview">
        <ProductsOverviewContent />
      </Layout>
    </DarkModeProvider>
  )
}
