"use client"
import { cn } from "@/lib/utils"
import type { FaqSectionData } from "@/lib/faq-data"

interface FaqSidebarProps {
  sections: FaqSectionData[]
  activeSection: string
  setActiveSection: (id: string) => void
}

export function FaqSidebar({ sections, activeSection, setActiveSection }: FaqSidebarProps) {
  const handleClick = (id: string) => {
    setActiveSection(id)
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="sticky top-8">
      <nav className="space-y-1 rounded-lg overflow-hidden border border-gray-100 dark:border-gray-700 shadow-sm dark:shadow-gray-800/20">
        {sections.map((section) => {
          const Icon = section.icon
          return (
            <button
              key={section.id}
              onClick={() => handleClick(section.id)}
              className={cn(
                "flex items-center w-full px-4 py-3 text-left transition-colors",
                "hover:bg-gray-50 dark:hover:bg-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500",
                activeSection === section.id
                  ? "bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 border-l-4 border-purple-500"
                  : "bg-white dark:bg-gray-900",
              )}
            >
              <Icon
                className={cn(
                  "mr-3 h-5 w-5",
                  activeSection === section.id ? "text-purple-500" : "text-gray-400 dark:text-gray-500",
                )}
              />
              <span
                className={cn(
                  "font-medium",
                  activeSection === section.id
                    ? "text-purple-700 dark:text-purple-400"
                    : "text-gray-700 dark:text-gray-300",
                )}
              >
                {section.title}
              </span>
            </button>
          )
        })}
      </nav>
    </div>
  )
}
