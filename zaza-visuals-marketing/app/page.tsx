"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Menu, X, Palette, Clock, Users, Download } from "lucide-react"
import Image from "next/image"
import { SharedFooter } from "@/components/shared-footer"
import ZazaHeroAnimation from "@/components/zaza-hero-animation"
import { headingLg } from "../../shared-components/styles/ui"

export default function ZazaVisualsLanding() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [email, setEmail] = useState("")

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle email submission
    console.log("Email submitted:", email)
    setEmail("")
    // Show success message or redirect
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Image
                src="/zaza-logo.png"
                alt="Zaza Visuals Logo"
                width={32}
                height={32}
                className="w-8 h-8 rounded-lg"
              />
              <span className="text-xl font-bold text-gray-900">Zaza Visuals</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#how-it-works" className="text-gray-600 hover:text-purple-600 transition-colors">
                How It Works
              </a>
              <a href="#for-teachers" className="text-gray-600 hover:text-purple-600 transition-colors">
                For Teachers
              </a>
              <a href="#faqs" className="text-gray-600 hover:text-purple-600 transition-colors">
                FAQs
              </a>
              <a href="#contact" className="text-gray-600 hover:text-purple-600 transition-colors">
                Contact
              </a>
            </nav>

            <div className="flex items-center space-x-4">
              <Button className="hidden md:inline-flex bg-purple-600 hover:bg-purple-700 text-white rounded-full px-6">
                Notify Me
              </Button>

              {/* Mobile Menu Button */}
              <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <nav className="md:hidden mt-4 pb-4 border-t border-gray-100 pt-4">
              <div className="flex flex-col space-y-4">
                <a href="#how-it-works" className="text-gray-600 hover:text-purple-600 transition-colors">
                  How It Works
                </a>
                <a href="#for-teachers" className="text-gray-600 hover:text-purple-600 transition-colors">
                  For Teachers
                </a>
                <a href="#faqs" className="text-gray-600 hover:text-purple-600 transition-colors">
                  FAQs
                </a>
                <a href="#contact" className="text-gray-600 hover:text-purple-600 transition-colors">
                  Contact
                </a>
                <Button className="bg-purple-600 hover:bg-purple-700 text-white rounded-full w-full">Notify Me</Button>
              </div>
            </nav>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-orange-50 via-yellow-50 to-green-50 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="text-center lg:text-left">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                  AI-Powered Visuals for{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-yellow-500 to-green-500">
                    Every Classroom
                  </span>
                </h1>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  Create posters, slides, and learning visuals with just one prompt: no design skills needed.
                </p>

                <form onSubmit={handleEmailSubmit} className="max-w-md mx-auto lg:mx-0">
                  <div className="bg-white rounded-2xl p-2 shadow-lg border border-gray-100">
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="flex-1 border-0 focus:ring-0 text-lg"
                        required
                      />
                      <Button
                        type="submit"
                        className="bg-gradient-to-r from-orange-500 to-purple-600 hover:from-orange-600 hover:to-purple-700 text-white rounded-xl px-8 py-3 font-semibold"
                      >
                        Notify Me
                      </Button>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-3">Be the first to try Zaza Visuals.</p>
                </form>
              </div>

              <div className="relative">
                {/* Animated Hero Component */}
                <div className="transform hover:scale-105 transition-transform duration-500">
                  <ZazaHeroAnimation />
                </div>

                {/* Additional floating elements for extra magic */}
                <div className="absolute -top-6 -left-6 w-12 h-12 bg-gradient-to-r from-purple-400 to-orange-400 rounded-full opacity-70 animate-pulse"></div>
                <div className="absolute -bottom-4 -right-4 w-8 h-8 bg-gradient-to-r from-orange-400 to-purple-400 rounded-full opacity-60 animate-bounce delay-300"></div>
                <div className="absolute top-1/4 -right-8 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full opacity-50 animate-ping delay-700"></div>

                {/* Subtle glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400/10 to-orange-400/10 rounded-3xl blur-xl -z-10"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className={headingLg}>How It Works</h2>
            <p className="text-xl text-gray-600 mb-16">Three simple steps to amazing classroom visuals</p>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="bg-orange-50 border-orange-200 rounded-3xl p-8 hover:shadow-lg transition-shadow">
                <CardContent className="text-center">
                  <div className="w-16 h-16 bg-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <span className="text-white text-2xl font-bold">1</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Type a Prompt</h3>
                  <p className="text-gray-600">E.g. "Water cycle poster for Year 6 science"</p>
                </CardContent>
              </Card>

              <Card className="bg-yellow-50 border-yellow-200 rounded-3xl p-8 hover:shadow-lg transition-shadow">
                <CardContent className="text-center">
                  <div className="w-16 h-16 bg-yellow-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <span className="text-white text-2xl font-bold">2</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Choose Your Style</h3>
                  <p className="text-gray-600">Playful, professional, colourful, etc.</p>
                </CardContent>
              </Card>

              <Card className="bg-green-50 border-green-200 rounded-3xl p-8 hover:shadow-lg transition-shadow">
                <CardContent className="text-center">
                  <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <span className="text-white text-2xl font-bold">3</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Download or Share</h3>
                  <p className="text-gray-600">Printable, slide-ready, or post it to your classroom app</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Why Teachers Love It */}
      <section id="for-teachers" className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className={headingLg}>Why Teachers Love It</h2>
              <p className="text-xl text-gray-600">
                Save time, engage students, and create beautiful visuals effortlessly
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-white rounded-3xl p-6 hover:shadow-lg transition-shadow border-0">
                <CardContent className="text-center">
                  <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Palette className="w-6 h-6 text-orange-600" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">No More Design Hassle</h3>
                  <p className="text-gray-600 text-sm">No more fiddling in Canva or Google Slides</p>
                </CardContent>
              </Card>

              <Card className="bg-white rounded-3xl p-6 hover:shadow-lg transition-shadow border-0">
                <CardContent className="text-center">
                  <div className="w-12 h-12 bg-yellow-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Clock className="w-6 h-6 text-yellow-600" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">Saves Hours Weekly</h3>
                  <p className="text-gray-600 text-sm">Saves hours every week on visual creation</p>
                </CardContent>
              </Card>

              <Card className="bg-white rounded-3xl p-6 hover:shadow-lg transition-shadow border-0">
                <CardContent className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Users className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">Engages Students</h3>
                  <p className="text-gray-600 text-sm">Visuals that actually engage students</p>
                </CardContent>
              </Card>

              <Card className="bg-white rounded-3xl p-6 hover:shadow-lg transition-shadow border-0">
                <CardContent className="text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Download className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">Easy to Share</h3>
                  <p className="text-gray-600 text-sm">Easy to print or share with parents</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Teacher Testimonials */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-16">What Teachers Are Saying</h2>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-3xl p-8 border-0">
                <CardContent>
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold">SM</span>
                    </div>
                    <div>
                      <p className="text-gray-700 mb-4 italic">
                        "My bulletin board finally looks amazing, and I didn't spend hours making it."
                      </p>
                      <p className="text-sm text-gray-600 font-semibold">Sarah Mitchell</p>
                      <p className="text-sm text-gray-500">Year 4 Teacher</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-50 to-yellow-50 rounded-3xl p-8 border-0">
                <CardContent>
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold">JR</span>
                    </div>
                    <div>
                      <p className="text-gray-700 mb-4 italic">
                        "This is the fastest way I've ever created student visuals. Total game-changer."
                      </p>
                      <p className="text-sm text-gray-600 font-semibold">James Rodriguez</p>
                      <p className="text-sm text-gray-500">High School Science</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Join Waitlist CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-purple-600 to-orange-500">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              We're inviting early users soon. Want in?
            </h2>
            <p className="text-xl text-purple-100 mb-8">Zaza Visuals is launching soon. Be the first to try it.</p>

            <form onSubmit={handleEmailSubmit} className="max-w-md mx-auto">
              <div className="bg-white rounded-2xl p-2 shadow-lg">
                <div className="flex flex-col sm:flex-row gap-2">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 border-0 focus:ring-0 text-lg"
                    required
                  />
                  <Button
                    type="submit"
                    className="bg-gray-900 hover:bg-gray-800 text-white rounded-xl px-8 py-3 font-semibold"
                  >
                    Join Waitlist
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section id="faqs" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-16">
              Frequently Asked Questions
            </h2>

            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1" className="bg-gray-50 rounded-2xl px-6 border-0">
                <AccordionTrigger className="text-left font-semibold hover:no-underline">
                  Is this free?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  A free plan will be available with basic features. Paid options will offer more styles, higher
                  resolution downloads, and advanced customization options.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="bg-gray-50 rounded-2xl px-6 border-0">
                <AccordionTrigger className="text-left font-semibold hover:no-underline">
                  What can I generate?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  You can create posters, flashcards, presentation slides, social media posts, bulletin board displays,
                  worksheets, and more. All optimized for classroom use.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="bg-gray-50 rounded-2xl px-6 border-0">
                <AccordionTrigger className="text-left font-semibold hover:no-underline">
                  When does it launch?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  We're launching in early 2026. Join our waitlist and you'll be the first to know when we're ready for
                  you to try Zaza Visuals.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* Shared Footer */}
      <SharedFooter currentProduct="zaza-visuals" />
    </div>
  )
}
