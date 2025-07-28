"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, MapPin, Linkedin, Twitter, Music } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Layout } from "@zaza/shared-components"

export default function ContactPage() {
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    reason: "",
    message: "",
  })
  const [newsletterEmail, setNewsletterEmail] = useState("")
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the form data to your backend
    console.log("Form submitted:", formData)
    setFormSubmitted(true)
  }

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the email to your newsletter service
    console.log("Newsletter signup:", newsletterEmail)
    setNewsletterSubmitted(true)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Layout currentProduct="Contact">
      {/* Hero Section */}
      <section className="py-16 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center mb-8">
            <Image
              src="/zaza-logo.png"
              alt="Zaza Technologies Logo"
              width={80}
              height={80}
              className="rounded-2xl shadow-lg"
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Get in Touch with Zaza</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Whether you're a teacher with feedback, a school with questions, or a curious partner - we'd love to hear
            from you.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 pb-16">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a message</h2>

            {formSubmitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Message sent!</h3>
                <p className="text-gray-600">Thanks! We'll get back to you within 1–2 business days.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                    Name *
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="mt-1"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                    Email *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="mt-1"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <Label htmlFor="reason" className="text-sm font-medium text-gray-700">
                    Reason for contacting
                  </Label>
                  <Select onValueChange={(value) => handleInputChange("reason", value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select a reason" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General Enquiry</SelectItem>
                      <SelectItem value="support">Support</SelectItem>
                      <SelectItem value="partnership">Partnership</SelectItem>
                      <SelectItem value="press">Press</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="message" className="text-sm font-medium text-gray-700">
                    Message *
                  </Label>
                  <Textarea
                    id="message"
                    required
                    value={formData.message}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                    className="mt-1 min-h-[120px]"
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-medium py-3"
                >
                  Send Message
                </Button>
              </form>
            )}
          </div>

          {/* Contact Information & Additional Sections */}
          <div className="space-y-8">
            {/* Direct Contact Options */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Other ways to reach us</h2>
              <div className="space-y-4">
                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
                        <Mail className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Email us</h3>
                        <a
                          href="mailto:support@zazatechnologies.com"
                          className="text-purple-600 hover:text-purple-700 transition-colors"
                        >
                          support@zazatechnologies.com
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
                        <MapPin className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Visit us</h3>
                        <p className="text-gray-600">
                          Gumbertstraße 150
                          <br />
                          40229 Düsseldorf, Germany
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Follow us</h3>
                        <div className="flex space-x-3 mt-2">
                          <Link href="#" className="text-purple-600 hover:text-purple-700 transition-colors">
                            <Linkedin className="w-5 h-5" />
                          </Link>
                          <Link href="#" className="text-purple-600 hover:text-purple-700 transition-colors">
                            <Twitter className="w-5 h-5" />
                          </Link>
                          <Link href="#" className="text-purple-600 hover:text-purple-700 transition-colors">
                            <Music className="w-5 h-5" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Newsletter Sign-up */}
            <Card className="bg-gradient-to-r from-pink-500 to-purple-600 text-white">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold mb-2">Want occasional updates and freebies?</h3>
                <p className="text-pink-100 mb-6">
                  Join our newsletter for teaching tips, product updates, and exclusive resources.
                </p>

                {newsletterSubmitted ? (
                  <div className="text-center">
                    <p className="text-pink-100">Thanks for subscribing! Check your email for confirmation.</p>
                  </div>
                ) : (
                  <form onSubmit={handleNewsletterSubmit} className="flex gap-3">
                    <Input
                      type="email"
                      required
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      placeholder="your.email@example.com"
                      className="flex-1 bg-white/20 border-white/30 text-white placeholder:text-pink-200"
                    />
                    <Button
                      type="submit"
                      variant="secondary"
                      className="bg-white text-purple-600 hover:bg-pink-50 font-medium"
                    >
                      Join the List
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>

            {/* Help Centre Link */}
            <Card className="border-2 border-dashed border-purple-300 bg-purple-50">
              <CardContent className="p-8 text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Looking for quick answers?</h3>
                <p className="text-gray-600 mb-4">Check out our frequently asked questions for instant help.</p>
                <Link href="/faqs">
                  <Button
                    variant="outline"
                    className="border-purple-300 text-purple-600 hover:bg-purple-100 bg-transparent"
                  >
                    Visit Help Centre
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  )
}
