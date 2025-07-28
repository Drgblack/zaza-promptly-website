import type { Metadata } from "next"
import { FaqPage } from "@/components/faq-page"

export const metadata: Metadata = {
  title: "Zaza Ecosystem FAQs",
  description: "Everything you need to know about our educator-first AI tools, values, and mission.",
}

export default function Page() {
  return <FaqPage />
}
