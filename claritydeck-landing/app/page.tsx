import React from "react"
import { Hero } from "@/components/hero"
import { ProblemSolution } from "@/components/problem-solution"
import { Features } from "@/components/features"
import { ClarityChallenge } from "@/components/clarity-challenge"
import { EmailCapture } from "@/components/email-capture"

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Hero />
      <ProblemSolution />
      <Features />
      <ClarityChallenge />
      <EmailCapture />
    </div>
  )
}
