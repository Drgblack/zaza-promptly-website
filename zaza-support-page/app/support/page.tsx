"use client"

import type React from "react"

import { useState } from "react"
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Layout } from "@zaza/shared-components"

const products = [
  {
    id: "promptly",
    name: "Zaza Promptly",
    description: "AI-powered prompt generator to create engaging classroom activities and discussions.",
    logo: "🎯",
    color: "bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800",
  },
  {
    id: "teach",
    name: "Zaza Teach",
    description: "Intelligent lesson planning tool that adapts to your curriculum and student needs.",
    logo: "📚",
    color: "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800",
  },
  {
    id: "visuals",
    name: "Zaza Visuals",
    description: "Create stunning educational visuals, infographics, and presentations with AI.",
    logo: "🎨",
    color: "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800",
  },
  {
    id: "assess",
    name: "Zaza Assess",
    description: "Build comprehensive assessments and quizzes tailored to your learning objectives.",
    logo: "📝",
    color: "bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800",
  },
  {
    id: "connect",
    name: "Zaza Connect",
    description: "Streamline parent-teacher communication with AI-assisted messaging and updates.",
    logo: "💬",
    color: "bg-pink-50 dark:bg-pink-900/20 border-pink-200 dark:border-pink-800",
  },
]

const faqs = {
  promptly: [
    {
      question: "How do I create my first prompt with Zaza Promptly?",
      answer:
        "Simply select your subject area, grade level, and learning objective. Zaza Promptly will generate customized prompts that engage your students and align with your curriculum goals.",
    },
    {
      question: "Can I save and reuse prompts?",
      answer:
        "Yes! All your generated prompts are automatically saved to your library. You can organize them by subject, grade level, or custom tags for easy access.",
    },
  ],
  teach: [
    {
      question: "How does Zaza Teach adapt to different curricula?",
      answer:
        "Zaza Teach supports major curriculum standards including Common Core, Next Generation Science Standards, and international frameworks. Simply select your standards during setup.",
    },
    {
      question: "Can I collaborate with other teachers on lesson plans?",
      answer:
        "You can share lesson plans with colleagues, leave comments, and work together on collaborative planning projects.",
    },
  ],
  visuals: [
    {
      question: "What types of visuals can I create?",
      answer:
        "Zaza Visuals can generate infographics, diagrams, charts, presentation slides, worksheets, and interactive visual content for any subject area.",
    },
    {
      question: "Are the visuals copyright-free?",
      answer:
        "Yes, all content created with Zaza Visuals is royalty-free and can be used in your classroom, shared with students, and included in educational materials.",
    },
  ],
  assess: [
    {
      question: "How do I create different types of assessments?",
      answer:
        "Zaza Assess offers multiple question types including multiple choice, short answer, essay questions, and interactive elements. Choose your assessment type and let AI generate questions based on your content.",
    },
    {
      question: "Can students take assessments online?",
      answer:
        "Yes! Students can access assessments through a secure link, and you'll receive real-time results and analytics to track their progress.",
    },
  ],
  connect: [
    {
      question: "How does AI help with parent communication?",
      answer:
        "Zaza Connect suggests personalized message templates, helps translate communications into multiple languages, and provides insights on the best times to reach parents.",
    },
    {
      question: "Is student data secure?",
      answer:
        "Absolutely. Zaza Connect is FERPA compliant and uses enterprise-grade encryption to protect all student and family information.",
    },
  ],
}

export default function ZazaSupportPage() {
  const [openFaq, setOpenFaq] = useState<string | null>(null)
  const [selectedProduct, setSelectedProduct] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleFaqToggle = (faqId: string) => {
    setOpenFaq(openFaq === faqId ? null : faqId)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log("Form submitted:", { ...formData, product: selectedProduct })
    // Reset form
    setFormData({ name: "", email: "", message: "" })
    setSelectedProduct("")
    alert("Thank you for your message! We'll get back to you soon.")
  }

  return (
    <Layout currentProduct="Support">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">Zaza Support</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Here to help across all Zaza tools. Whether you're creating prompts, planning lessons, or connecting with
            parents, we're here to support your teaching journey.
          </p>
        </section>

        {/* Product Selector */}
        <section id="products" className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">Choose Your Zaza Tool</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <Card
                key={product.id}
                className={`${product.color} hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer dark:bg-gray-800 dark:border-gray-700`}
              >
                <CardHeader className="text-center">
                  <div className="text-4xl mb-3">{product.logo}</div>
                  <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">{product.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 dark:text-gray-300 text-center mb-4">
                    {product.description}
                  </CardDescription>
                  <Button
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white rounded-lg"
                    onClick={() => document.getElementById("faq")?.scrollIntoView({ behavior: "smooth" })}
                  >
                    Get Help
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="max-w-4xl mx-auto space-y-8">
            {Object.entries(faqs).map(([productId, productFaqs]) => {
              const product = products.find((p) => p.id === productId)
              return (
                <div
                  key={productId}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden transition-colors duration-200"
                >
                  <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
                      <span className="text-2xl mr-3">{product?.logo}</span>
                      {product?.name}
                    </h3>
                  </div>
                  <div className="divide-y divide-gray-200 dark:divide-gray-700">
                    {productFaqs.map((faq, index) => {
                      const faqId = `${productId}-${index}`
                      return (
                        <div key={faqId}>
                          <button
                            className="w-full px-6 py-4 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:bg-gray-50 dark:focus:bg-gray-700"
                            onClick={() => handleFaqToggle(faqId)}
                          >
                            <div className="flex justify-between items-center">
                              <h4 className="font-medium text-gray-900 dark:text-white pr-4">{faq.question}</h4>
                              {openFaq === faqId ? (
                                <ChevronUpIcon className="h-5 w-5 text-purple-600 dark:text-purple-400 flex-shrink-0" />
                              ) : (
                                <ChevronDownIcon className="h-5 w-5 text-gray-400 dark:text-gray-500 flex-shrink-0" />
                              )}
                            </div>
                          </button>
                          {openFaq === faqId && (
                            <div className="px-6 pb-4">
                              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{faq.answer}</p>
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* Contact Form */}
        <section id="contact" className="mb-20">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">Contact Us</h2>
            <Card className="bg-white dark:bg-gray-800 shadow-lg border-0 dark:border dark:border-gray-700 transition-colors duration-200">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20">
                <CardTitle className="text-xl text-gray-900 dark:text-white">Get in Touch</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300">
                  Can't find what you're looking for? Send us a message and we'll help you out.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name" className="text-gray-700 dark:text-gray-300 font-medium">
                        Name
                      </Label>
                      <Input
                        id="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="mt-1 rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-purple-500 focus:ring-purple-500"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-gray-700 dark:text-gray-300 font-medium">
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="mt-1 rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-purple-500 focus:ring-purple-500"
                        placeholder="your.email@school.edu"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="product" className="text-gray-700 dark:text-gray-300 font-medium">
                      Which Zaza tool do you need help with?
                    </Label>
                    <Select value={selectedProduct} onValueChange={setSelectedProduct}>
                      <SelectTrigger className="mt-1 rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-purple-500 focus:ring-purple-500">
                        <SelectValue placeholder="Select a product" />
                      </SelectTrigger>
                      <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                        <SelectItem value="general">General Question</SelectItem>
                        {products.map((product) => (
                          <SelectItem key={product.id} value={product.id}>
                            {product.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-gray-700 dark:text-gray-300 font-medium">
                      Message
                    </Label>
                    <Textarea
                      id="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="mt-1 rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-purple-500 focus:ring-purple-500"
                      placeholder="Tell us how we can help you..."
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-medium transition-colors"
                  >
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Additional Resources */}
        <section id="resources" className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">Additional Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { title: "Privacy Policy", icon: "🔒", description: "How we protect your data" },
              { title: "Terms of Service", icon: "📋", description: "Our terms and conditions" },
              { title: "Feature Requests", icon: "💡", description: "Suggest new features" },
              { title: "Press Kit", icon: "📰", description: "Media resources and assets" },
            ].map((resource) => (
              <Card
                key={resource.title}
                className="bg-white dark:bg-gray-800 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer border border-gray-200 dark:border-gray-700"
              >
                <CardContent className="p-6 text-center">
                  <div className="text-3xl mb-3">{resource.icon}</div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{resource.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{resource.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </Layout>
  )
}
