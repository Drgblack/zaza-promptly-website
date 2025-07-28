"use client"

import { useState, useEffect } from "react"
import { FaqSection } from "@/components/faq-section"
import { FaqSidebar } from "@/components/faq-sidebar"
import { faqData } from "@/lib/faq-data"
import { Layout } from "@zaza/shared-components"

export function FaqPage() {
  const [activeSection, setActiveSection] = useState<string>(faqData[0].id)
  const [isMobileView, setIsMobileView] = useState(false)

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobileView(window.innerWidth < 768)
    }

    checkIfMobile()
    window.addEventListener("resize", checkIfMobile)

    return () => {
      window.removeEventListener("resize", checkIfMobile)
    }
  }, [])

  // Handle intersection observer for scroll spy
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.2 },
    )

    const sections = document.querySelectorAll("section[id]")
    sections.forEach((section) => {
      observer.observe(section)
    })

    return () => {
      sections.forEach((section) => {
        observer.unobserve(section)
      })
    }
  }, [])

  return (
    <Layout currentProduct="FAQ">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-4xl mx-auto mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
            Zaza Ecosystem FAQs
          </h1>
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300">
            Everything you need to know about our educator-first AI tools, values, and mission.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {!isMobileView && (
            <div className="md:w-1/4">
              <FaqSidebar sections={faqData} activeSection={activeSection} setActiveSection={setActiveSection} />
            </div>
          )}

          <div className="md:w-3/4">
            {faqData.map((section) => (
              <FaqSection
                key={section.id}
                id={section.id}
                title={section.title}
                icon={section.icon}
                questions={section.questions}
                isMobileView={isMobileView}
              />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}
