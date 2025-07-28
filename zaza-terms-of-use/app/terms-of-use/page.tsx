"use client"

import { useState, useEffect } from "react"
import { ChevronRight, ArrowUp, Menu, X, Search, Home, Scale, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import Image from "next/image"
import { Layout } from "@zaza/shared-components"

export default function TermsOfUsePage() {
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [activeSection, setActiveSection] = useState("")
  const [showMobileNav, setShowMobileNav] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [readingProgress, setReadingProgress] = useState(0)

  const sections = [
    { id: "acceptance", title: "Acceptance of Terms" },
    { id: "services", title: "Description of Services" },
    { id: "responsibilities", title: "User Responsibilities" },
    { id: "intellectual-property", title: "Intellectual Property Rights" },
    { id: "subscription", title: "Subscription & Payment Terms" },
    { id: "ai-disclaimer", title: "AI-Generated Content Disclaimer" },
    { id: "privacy", title: "Privacy & Data Protection" },
    { id: "termination", title: "Termination & Account Suspension" },
    { id: "liability", title: "Limitation of Liability" },
    { id: "disputes", title: "Dispute Resolution" },
    { id: "changes", title: "Changes to Terms" },
    { id: "accessibility", title: "Accessibility Commitment" },
    { id: "contact", title: "Contact Information" },
  ]

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight

      // Show back to top button
      setShowBackToTop(scrolled > 200)

      // Calculate reading progress
      const progress = (scrolled / (documentHeight - windowHeight)) * 100
      setReadingProgress(Math.min(progress, 100))

      // Update active section
      const sectionElements = sections.map((section) => ({
        id: section.id,
        element: document.getElementById(section.id),
        offset: document.getElementById(section.id)?.offsetTop || 0,
      }))

      const currentSection = sectionElements
        .filter((section) => section.element && section.offset <= scrolled + 100)
        .pop()

      if (currentSection) {
        setActiveSection(currentSection.id)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [sections])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setShowMobileNav(false)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <Layout currentProduct="Terms of Use">
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
        <div className="h-full bg-blue-600 transition-all duration-300" style={{ width: `${readingProgress}%` }} />
      </div>

      {/* Page Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Image
                src="/images/zaza-logo.png"
                alt="Zaza Technologies"
                width={40}
                height={40}
                className="rounded-lg"
              />
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Terms of Use</h1>
                <nav className="flex items-center space-x-2 text-sm text-gray-600 mt-1">
                  <Home className="w-4 h-4" />
                  <button className="hover:text-blue-600 transition-colors">Home</button>
                  <ChevronRight className="w-4 h-4" />
                  <button className="hover:text-blue-600 transition-colors">Legal</button>
                  <ChevronRight className="w-4 h-4" />
                  <span className="text-gray-800">Terms of Use</span>
                </nav>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setShowMobileNav(!showMobileNav)}>
              {showMobileNav ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>

          <div className="mt-4 flex flex-col md:flex-row md:items-center md:justify-between">
            <p className="text-sm text-gray-600">
              Last updated: <span className="font-medium">July 15, 2025</span> | Version 2.1
            </p>
            <div className="mt-2 md:mt-0 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search terms..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-full md:w-64"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Table of Contents - Desktop */}
          <aside className="hidden lg:block lg:w-80 lg:flex-shrink-0">
            <Card className="p-6 sticky top-24">
              <h2 className="font-semibold text-gray-800 mb-4">Table of Contents</h2>
              <nav className="space-y-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`block w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                      activeSection === section.id
                        ? "bg-blue-50 text-blue-700 border-l-2 border-blue-600"
                        : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                    }`}
                  >
                    {section.title}
                  </button>
                ))}
              </nav>
            </Card>
          </aside>

          {/* Mobile Navigation */}
          {showMobileNav && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden">
              <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-lg p-6 overflow-y-auto">
                <h2 className="font-semibold text-gray-800 mb-4">Table of Contents</h2>
                <nav className="space-y-2">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className={`block w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                        activeSection === section.id
                          ? "bg-blue-50 text-blue-700"
                          : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                      }`}
                    >
                      {section.title}
                    </button>
                  ))}
                </nav>
              </div>
            </div>
          )}

          {/* Main Content */}
          <main className="flex-1 max-w-3xl">
            <div className="prose prose-gray max-w-none">
              {/* Introduction */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
                <div className="flex items-start space-x-3">
                  <Scale className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h2 className="text-lg font-semibold text-blue-900 mb-2">Welcome to Zaza Technologies</h2>
                    <p className="text-blue-800 text-base leading-relaxed">
                      These Terms of Use govern your access to and use of Zaza Technologies' AI-powered services. By
                      accessing or using our services, you agree to be bound by these terms. Please read them carefully.
                    </p>
                  </div>
                </div>
              </div>

              {/* Section 1: Acceptance of Terms */}
              <section id="acceptance" className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b border-gray-200 pb-2">
                  1. Acceptance of Terms
                </h2>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>
                    By accessing, browsing, or using the Zaza Technologies platform and services ("Services"), you
                    acknowledge that you have read, understood, and agree to be bound by these Terms of Use ("Terms")
                    and our Privacy Policy, which is incorporated herein by reference.
                  </p>
                  <p>
                    These Terms constitute a legally binding agreement between you ("User," "you," or "your") and Zaza
                    Technologies UG (haftungsbeschränkt) ("Zaza," "we," "us," or "our"). If you do not agree to these
                    Terms, you must not access or use our Services.
                  </p>
                  <p>
                    <strong>Effective Date:</strong> These Terms are effective as of July 15, 2025, and supersede all
                    previous versions.
                  </p>
                </div>
              </section>

              {/* Section 2: Description of Services */}
              <section id="services" className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b border-gray-200 pb-2">
                  2. Description of Services
                </h2>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>Zaza Technologies provides AI-powered software solutions, including but not limited to:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Artificial intelligence and machine learning platforms</li>
                    <li>Data analytics and processing tools</li>
                    <li>Automated content generation services</li>
                    <li>API access to our AI models and algorithms</li>
                    <li>Custom AI solution development and consulting</li>
                  </ul>
                  <p>
                    Our Services are provided on a subscription basis and require internet connectivity. Service
                    availability may vary by geographic location and is subject to technical requirements and system
                    maintenance.
                  </p>
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <p className="text-amber-800">
                      <strong>Service Availability:</strong> While we strive for 99.9% uptime, our Services may be
                      temporarily unavailable due to maintenance, updates, or unforeseen technical issues.
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 3: User Responsibilities */}
              <section id="responsibilities" className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b border-gray-200 pb-2">
                  3. User Responsibilities
                </h2>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <h3 className="text-xl font-semibold text-gray-800">Account Security</h3>
                  <p>
                    You are responsible for maintaining the confidentiality of your account credentials and for all
                    activities that occur under your account. You must immediately notify us of any unauthorized use of
                    your account.
                  </p>

                  <h3 className="text-xl font-semibold text-gray-800">Prohibited Uses</h3>
                  <p>You agree not to use our Services to:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Generate harmful, illegal, or malicious content</li>
                    <li>Violate any applicable laws or regulations</li>
                    <li>Infringe upon intellectual property rights of others</li>
                    <li>Attempt to reverse engineer or compromise our systems</li>
                    <li>Distribute malware, viruses, or other harmful code</li>
                    <li>Engage in activities that could harm minors</li>
                    <li>Create deepfakes or misleading synthetic media without disclosure</li>
                  </ul>

                  <h3 className="text-xl font-semibold text-gray-800">Compliance</h3>
                  <p>
                    You must comply with all applicable laws, regulations, and industry standards when using our
                    Services, including but not limited to data protection laws, export control regulations, and AI
                    ethics guidelines.
                  </p>
                </div>
              </section>

              {/* Section 4: Intellectual Property Rights */}
              <section id="intellectual-property" className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b border-gray-200 pb-2">
                  4. Intellectual Property Rights
                </h2>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <h3 className="text-xl font-semibold text-gray-800">Zaza Technologies' Rights</h3>
                  <p>
                    All intellectual property rights in our Services, including software, algorithms, models,
                    documentation, and related materials, are owned by Zaza Technologies or our licensors. These Terms
                    do not grant you any ownership rights in our intellectual property.
                  </p>

                  <h3 className="text-xl font-semibold text-gray-800">User-Generated Content</h3>
                  <p>
                    You retain ownership of content you input into our Services ("Input Content"). However, you grant us
                    a worldwide, non-exclusive, royalty-free license to use, process, and analyze your Input Content
                    solely to provide our Services and improve our AI models.
                  </p>

                  <h3 className="text-xl font-semibold text-gray-800">AI-Generated Output</h3>
                  <p>
                    You may use AI-generated outputs for any lawful purpose, including commercial use. We do not claim
                    ownership of user-specific outputs. However, due to the probabilistic nature of AI, outputs may be
                    similar or identical to those received by other users.
                  </p>

                  <h3 className="text-xl font-semibold text-gray-800">License to Use AI-Generated Content</h3>
                  <p>
                    You are granted a non-exclusive, non-transferable, revocable license to use AI-generated content for
                    personal, professional, or educational use. You may not resell or redistribute outputs without
                    substantial transformation or permission.
                  </p>
                </div>
              </section>

              {/* Section 5: Subscription & Payment Terms */}
              <section id="subscription" className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b border-gray-200 pb-2">
                  5. Subscription & Payment Terms
                </h2>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <h3 className="text-xl font-semibold text-gray-800">Billing and Payment</h3>
                  <p>
                    Subscription fees are billed in advance on a monthly or annual basis, as selected during signup. All
                    fees are non-refundable except as expressly stated in these Terms or required by law.
                  </p>

                  <h3 className="text-xl font-semibold text-gray-800">Price Changes</h3>
                  <p>
                    We may modify our pricing with 30 days' written notice. Price changes will apply to your next
                    billing cycle. If you do not agree to the price change, you may cancel your subscription before the
                    new pricing takes effect.
                  </p>

                  <h3 className="text-xl font-semibold text-gray-800">Cancellation and Refunds</h3>
                  <p>
                    You may cancel your subscription at any time through your account settings. Cancellations take
                    effect at the end of your current billing period. We do not provide refunds for partial months or
                    unused portions of your subscription.
                  </p>
                </div>
              </section>

              {/* Section 6: AI-Generated Content Disclaimer */}
              <section id="ai-disclaimer" className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b border-gray-200 pb-2">
                  6. AI-Generated Content Disclaimer
                </h2>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="text-red-800 font-medium">
                      <strong>Important:</strong> AI-generated content may contain inaccuracies, biases, or
                      inappropriate material. You are solely responsible for reviewing, verifying, and taking
                      responsibility for any AI-generated content before use.
                    </p>
                  </div>

                  <h3 className="text-xl font-semibold text-gray-800">Accuracy Limitations</h3>
                  <p>
                    Our AI models are trained on large datasets and may produce outputs that are factually incorrect,
                    outdated, or misleading. We do not guarantee the accuracy, completeness, or reliability of
                    AI-generated content.
                  </p>

                  <h3 className="text-xl font-semibold text-gray-800">User Responsibility</h3>
                  <p>
                    You must independently verify any AI-generated content before relying on it for business, legal,
                    medical, or other critical decisions. You assume all risks associated with the use of AI-generated
                    content.
                  </p>

                  <h3 className="text-xl font-semibold text-gray-800">Ethical Use</h3>
                  <p>
                    You agree to use our AI Services in accordance with ethical AI principles, including transparency,
                    fairness, and respect for human rights. You must disclose when content has been AI-generated where
                    such disclosure is legally required or ethically appropriate.
                  </p>
                </div>
              </section>

              {/* Section 7: Privacy & Data Protection */}
              <section id="privacy" className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b border-gray-200 pb-2">
                  7. Privacy & Data Protection
                </h2>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>
                    Your privacy is important to us. Our collection, use, and protection of your personal information is
                    governed by our comprehensive
                    <a href="/privacy-policy" className="text-blue-600 hover:text-blue-800 underline">
                      Privacy Policy
                    </a>
                    , which forms part of these Terms.
                  </p>

                  <h3 className="text-xl font-semibold text-gray-800">Data Processing</h3>
                  <p>
                    By using our Services, you consent to the processing of your data as described in our Privacy
                    Policy. We implement appropriate technical and organizational measures to protect your data against
                    unauthorized access, alteration, disclosure, or destruction.
                  </p>

                  <h3 className="text-xl font-semibold text-gray-800">Your Rights</h3>
                  <p>
                    Depending on your location, you may have certain rights regarding your personal data, including the
                    right to access, correct, delete, or port your data. Contact us at
                    <a
                      href="mailto:support@zazatechnologies.com"
                      className="text-blue-600 hover:text-blue-800 underline"
                    >
                      support@zazatechnologies.com
                    </a>{" "}
                    to exercise these rights.
                  </p>
                </div>
              </section>

              {/* Section 8: Termination & Account Suspension */}
              <section id="termination" className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b border-gray-200 pb-2">
                  8. Termination & Account Suspension
                </h2>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <h3 className="text-xl font-semibold text-gray-800">Grounds for Termination</h3>
                  <p>We may suspend or terminate your account immediately if you:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Violate these Terms or our Acceptable Use Policy</li>
                    <li>Fail to pay subscription fees when due</li>
                    <li>Engage in fraudulent or illegal activities</li>
                    <li>Pose a security risk to our Services or other users</li>
                  </ul>

                  <h3 className="text-xl font-semibold text-gray-800">Effect of Termination</h3>
                  <p>
                    Upon termination, your access to our Services will cease immediately. We may delete your account
                    data after a reasonable period, subject to legal retention requirements and our Privacy Policy.
                  </p>

                  <h3 className="text-xl font-semibold text-gray-800">Appeal Process</h3>
                  <p>
                    If your account is suspended or terminated, you may appeal the decision by contacting our support
                    team at
                    <a
                      href="mailto:support@zazatechnologies.com"
                      className="text-blue-600 hover:text-blue-800 underline"
                    >
                      support@zazatechnologies.com
                    </a>{" "}
                    within 30 days.
                  </p>
                </div>
              </section>

              {/* Section 9: Limitation of Liability */}
              <section id="liability" className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b border-gray-200 pb-2">
                  9. Limitation of Liability
                </h2>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <p className="text-gray-800 font-medium uppercase text-sm">DISCLAIMER OF WARRANTIES</p>
                    <p className="text-gray-700 mt-2">
                      OUR SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, WHETHER
                      EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
                      PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
                    </p>
                  </div>

                  <h3 className="text-xl font-semibold text-gray-800">Liability Limitations</h3>
                  <p>
                    TO THE MAXIMUM EXTENT PERMITTED BY LAW, ZAZA TECHNOLOGIES SHALL NOT BE LIABLE FOR ANY INDIRECT,
                    INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF
                    PROFITS, DATA, OR USE, ARISING OUT OF OR RELATING TO THESE TERMS OR OUR SERVICES.
                  </p>

                  <h3 className="text-xl font-semibold text-gray-800">Indemnification</h3>
                  <p>
                    You agree to indemnify, defend, and hold harmless Zaza Technologies from any claims, damages,
                    losses, or expenses arising from your use of our Services, violation of these Terms, or infringement
                    of any third-party rights.
                  </p>
                </div>
              </section>

              {/* Section 10: Dispute Resolution */}
              <section id="disputes" className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b border-gray-200 pb-2">
                  10. Dispute Resolution
                </h2>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <h3 className="text-xl font-semibold text-gray-800">Governing Law</h3>
                  <p>
                    These Terms shall be governed by the laws of Germany. If you are a consumer residing in the European
                    Union, you may benefit from any mandatory provisions of the law of the country in which you reside.
                  </p>

                  <h3 className="text-xl font-semibold text-gray-800">Dispute Resolution</h3>
                  <p>
                    Any disputes arising from these Terms will be subject to the exclusive jurisdiction of the courts of
                    Düsseldorf, Germany. EU consumers may also bring proceedings in the courts of their country of
                    residence.
                  </p>
                </div>
              </section>

              {/* Section 11: Changes to Terms */}
              <section id="changes" className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b border-gray-200 pb-2">
                  11. Changes to Terms
                </h2>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <h3 className="text-xl font-semibold text-gray-800">Amendment Procedures</h3>
                  <p>
                    We may modify these Terms at any time by posting the updated Terms on our website. Material changes
                    will be effective 30 days after posting, unless a longer period is required by law.
                  </p>

                  <h3 className="text-xl font-semibold text-gray-800">Notification Methods</h3>
                  <p>We will notify you of material changes through:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Email notification to your registered email address</li>
                    <li>In-app notifications when you next access our Services</li>
                    <li>Prominent notice on our website</li>
                  </ul>

                  <h3 className="text-xl font-semibold text-gray-800">Continued Use</h3>
                  <p>
                    Your continued use of our Services after the effective date of any changes constitutes your
                    acceptance of the modified Terms. If you do not agree to the changes, you must discontinue use of
                    our Services.
                  </p>
                </div>
              </section>

              {/* Section 13: Accessibility Commitment */}
              <section id="accessibility" className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b border-gray-200 pb-2">
                  13. Accessibility Commitment
                </h2>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>
                    Zaza Technologies strives to make our Services accessible to all users, including those with
                    disabilities. We are committed to providing an inclusive experience that meets or exceeds applicable
                    accessibility standards.
                  </p>

                  <h3 className="text-xl font-semibold text-gray-800">Our Commitment</h3>
                  <p>We work to ensure our Services are:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Compatible with screen readers and assistive technologies</li>
                    <li>Navigable using keyboard-only input</li>
                    <li>Designed with sufficient color contrast and readable fonts</li>
                    <li>Structured with clear headings and logical content flow</li>
                  </ul>

                  <h3 className="text-xl font-semibold text-gray-800">Feedback and Support</h3>
                  <p>
                    If you encounter accessibility barriers while using our Services, please contact us at{" "}
                    <a
                      href="mailto:support@zazatechnologies.com"
                      className="text-blue-600 hover:text-blue-800 underline"
                    >
                      support@zazatechnologies.com
                    </a>
                    . We will work with you to provide the information or functionality you need through alternative
                    means.
                  </p>
                </div>
              </section>

              {/* Section 12: Contact Information */}
              <section id="contact" className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b border-gray-200 pb-2">
                  14. Contact Information
                </h2>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>
                    If you have questions about these Terms or need to contact us for legal matters, please reach out
                    through the following channels:
                  </p>

                  <div className="grid md:grid-cols-2 gap-6">
                    <Card className="p-4">
                      <h3 className="font-semibold text-gray-800 mb-2">Legal Department</h3>
                      <p className="text-sm text-gray-600 space-y-1">
                        <span className="block">Email: help@zazatechnologies.com</span>
                        <span className="block">Response time: 2-3 business days</span>
                      </p>
                    </Card>

                    <Card className="p-4">
                      <h3 className="font-semibold text-gray-800 mb-2">General Support</h3>
                      <p className="text-sm text-gray-600 space-y-1">
                        <span className="block">Email: support@zazatechnologies.com</span>
                      </p>
                    </Card>
                  </div>

                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-800 mb-2">Business Address</h3>
                    <address className="text-gray-700 not-italic">
                      Zaza Technologies UG (haftungsbeschränkt)
                      <br />
                      Gumbertstraße 150
                      <br />
                      40229 Düsseldorf
                      <br />
                      Germany
                    </address>
                    <p className="text-sm text-gray-600 mt-2">
                      German UG (haftungsbeschränkt) | HRB Registration: [Registration Number]
                    </p>
                  </div>
                </div>
              </section>
            </div>
          </main>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-4 md:mb-0">
              <p className="text-sm text-gray-600">Last updated: July 15, 2025 | Version 2.1</p>
              <p className="text-xs text-gray-500 mt-1">
                This document does not constitute legal advice. Consult with a qualified attorney for legal guidance.
              </p>
            </div>
            <div className="flex flex-wrap gap-4 text-sm">
              <a href="/privacy-policy" className="text-blue-600 hover:text-blue-800 underline">
                Privacy Policy
              </a>
              <a href="/cookie-policy" className="text-blue-600 hover:text-blue-800 underline">
                Cookie Policy
              </a>
              <a href="/acceptable-use" className="text-blue-600 hover:text-blue-800 underline">
                Acceptable Use Policy
              </a>
            </div>
          </div>

          <div className="border-t border-gray-200 mt-6 pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Image src="/images/zaza-logo.png" alt="Zaza Technologies" width={24} height={24} className="rounded" />
                <span className="text-sm text-gray-600">
                  © 2025 Zaza Technologies UG (haftungsbeschränkt). All rights reserved.
                </span>
              </div>
              <Button variant="outline" size="sm" onClick={() => window.print()} className="hidden md:flex">
                <FileText className="w-4 h-4 mr-2" />
                Print Terms
              </Button>
            </div>
          </div>
        </div>
      </footer>

      {/* Back to Top Button */}
      {showBackToTop && (
        <Button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 rounded-full w-12 h-12 shadow-lg"
          size="sm"
        >
          <ArrowUp className="w-5 h-5" />
        </Button>
      )}
    </Layout>
  )
}
