import type { Metadata } from 'next'
import { Shield, Lock, Eye, Database, FileCheck, Users, AlertTriangle, CheckCircle } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Student Data Protection – Zaza Promptly Privacy & Security',
  description: 'Learn how Zaza Promptly protects student privacy with GDPR compliance, zero data retention, and education-focused security measures.',
  keywords: 'student data protection, GDPR compliance, education privacy, school data security, AI safety for teachers',
  
  openGraph: {
    title: 'Student Data Protection – Zaza Promptly Privacy & Security',
    description: 'Learn how Zaza Promptly protects student privacy with GDPR compliance, zero data retention, and education-focused security measures.',
    type: 'website',
    url: 'https://www.zazapromptly.com/privacy/student-data',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Student Data Protection – Zaza Promptly Privacy & Security',
    description: 'Learn how Zaza Promptly protects student privacy with GDPR compliance, zero data retention, and education-focused security measures.',
  },
  alternates: {
    canonical: 'https://www.zazapromptly.com/privacy/student-data',
  },
}

const protectionPrinciples = [
  {
    icon: Database,
    title: "Zero Student Data Retention",
    description: "We never store student names, grades, or personal information. Your input is processed and immediately deleted.",
    details: [
      "No permanent storage of student information",
      "Processing happens in real-time only",
      "Complete data deletion after each session",
      "No profile building or tracking"
    ]
  },
  {
    icon: Lock,
    title: "End-to-End Encryption",
    description: "All data is encrypted during transmission and processing using industry-standard security protocols.",
    details: [
      "TLS 1.3 encryption for all communications",
      "Encrypted processing pipelines",
      "Secure API endpoints",
      "Regular security audits and updates"
    ]
  },
  {
    icon: Eye,
    title: "Teacher Control & Transparency",
    description: "You maintain complete control over what information is shared and how it's used.",
    details: [
      "You decide what information to include",
      "Clear visibility into AI processing",
      "No hidden data collection",
      "Easy opt-out at any time"
    ]
  },
  {
    icon: Shield,
    title: "Education-First Privacy",
    description: "Built specifically for educational contexts with understanding of FERPA, GDPR, and school privacy needs.",
    details: [
      "GDPR and FERPA compliant design",
      "Educational privacy best practices",
      "School board approved architecture",
      "Regular compliance audits"
    ]
  }
]

const complianceStandards = [
  {
    standard: "GDPR",
    description: "General Data Protection Regulation (EU)",
    status: "Fully Compliant",
    details: "Right to erasure, data minimization, purpose limitation, and transparent processing."
  },
  {
    standard: "FERPA",
    description: "Family Educational Rights and Privacy Act (US)",
    status: "Compliant Design",
    details: "Protects student education records and gives parents control over disclosure."
  },
  {
    standard: "COPPA",
    description: "Children's Online Privacy Protection Act (US)",
    status: "Exceeds Requirements",
    details: "Enhanced protections for children under 13 with parental consent mechanisms."
  },
  {
    standard: "SOC 2 Type II",
    description: "Service Organization Control 2",
    status: "In Progress",
    details: "Third-party audit of security, availability, and confidentiality controls."
  }
]

const dataFlow = [
  {
    step: 1,
    title: "Teacher Input",
    description: "You provide teaching notes through our secure interface",
    icon: Users,
    details: "Encrypted connection, no data stored"
  },
  {
    step: 2,
    title: "Secure Processing",
    description: "AI processes your input in a protected environment",
    icon: Shield,
    details: "Isolated processing, no model training"
  },
  {
    step: 3,
    title: "Comment Generation",
    description: "Professional feedback is generated and returned to you",
    icon: FileCheck,
    details: "Instant response, encrypted delivery"
  },
  {
    step: 4,
    title: "Complete Deletion",
    description: "All input data is permanently deleted from our systems",
    icon: AlertTriangle,
    details: "Immediate cleanup, zero retention"
  }
]

export default function StudentDataProtectionPage() {
  return (
    <div className="pt-16 lg:pt-20">
      {/* Hero Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-900/20 dark:via-indigo-900/20 dark:to-purple-900/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="secondary" className="text-blue-700 bg-blue-100 px-4 py-2 mb-6">
            <Shield className="w-4 h-4 mr-2" />
            Student Privacy First
          </Badge>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-800 dark:text-white mb-6">
            Your Students' Privacy is{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Sacred
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Built by educators who understand the critical importance of student privacy. 
            Zero data retention, complete transparency, and education-first security.
          </p>

          <div className="bg-green-50 dark:bg-green-900/20 border-2 border-green-200 dark:border-green-800 rounded-xl p-6 max-w-2xl mx-auto">
            <div className="flex items-center justify-center mb-3">
              <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400 mr-2" />
              <span className="font-semibold text-green-800 dark:text-green-200">Our Promise</span>
            </div>
            <p className="text-green-700 dark:text-green-300">
              We never store, share, or profit from your students' information. Period.
            </p>
          </div>
        </div>
      </section>

      {/* Protection Principles */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              How We Protect Student Privacy
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Every feature is designed with student privacy as the highest priority
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {protectionPrinciples.map((principle, index) => {
              const Icon = principle.icon
              return (
                <Card key={index} className="h-full">
                  <CardHeader>
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <CardTitle className="text-xl">{principle.title}</CardTitle>
                    <CardDescription className="text-base">{principle.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {principle.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                          <CheckCircle className="w-4 h-4 text-green-600 mr-3 flex-shrink-0" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Data Flow */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Secure Data Processing Flow
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              See exactly what happens to your data at every step
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {dataFlow.map((step, index) => {
              const Icon = step.icon
              return (
                <div key={index} className="text-center relative">
                  {index < dataFlow.length - 1 && (
                    <div className="hidden md:block absolute top-12 left-full w-full h-0.5 bg-blue-200 dark:bg-blue-800 transform -translate-x-1/2 z-0" />
                  )}
                  <div className="relative z-10">
                    <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4 relative">
                      <Icon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                        {step.step}
                      </div>
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{step.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{step.description}</p>
                    <div className="text-xs text-blue-600 dark:text-blue-400 font-medium">{step.details}</div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Compliance Standards */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Compliance & Standards
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Meeting and exceeding international privacy and security standards
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {complianceStandards.map((standard, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <CardTitle className="text-lg">{standard.standard}</CardTitle>
                    <Badge variant={standard.status === 'Fully Compliant' ? 'default' : 'secondary'} className="text-xs">
                      {standard.status}
                    </Badge>
                  </div>
                  <CardDescription>{standard.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{standard.details}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-blue-50 dark:bg-blue-900/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Privacy Questions & Answers
          </h2>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Do you store any student information?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400">
                  No. We never store student names, grades, assessments, or any personal information. 
                  Your input is processed in real-time and immediately deleted from our systems.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">How do you ensure GDPR compliance?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400">
                  We implement data minimization (collect only what's needed), purpose limitation (use data only for feedback generation), 
                  and the right to erasure (immediate deletion). Our EU-based infrastructure ensures full GDPR compliance.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Can school administrators audit your security?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400">
                  Yes. We provide detailed security documentation, compliance certificates, and can participate in 
                  school district security reviews. Our SOC 2 audit results are available upon request.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">What happens if there's a data breach?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400">
                  Since we don't retain student data, there's no student information to breach. However, we maintain 
                  comprehensive incident response procedures and would notify users immediately of any security issues.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Questions About Student Privacy?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            Our team includes education privacy experts who are happy to address your concerns.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
            >
              Contact Privacy Team
            </Link>
            <Link
              href="/privacy"
              className="px-6 py-3 border border-gray-300 hover:border-gray-400 text-gray-700 dark:text-gray-300 dark:border-gray-600 font-semibold rounded-lg transition-colors"
            >
              Full Privacy Policy
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}