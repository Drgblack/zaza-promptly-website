import type { Metadata } from "next"
import ProductsOverview from "@/components/products-overview"

export const metadata: Metadata = {
  title: "Explore the Zaza Suite – AI Tools for Educators",
  description: "One mission. Many tools. Designed to take the weight off teachers — and give the joy back.",
  keywords: "AI tools, education, teachers, lesson planning, student tools",
}

export default function Home() {
  return <ProductsOverview />
}
