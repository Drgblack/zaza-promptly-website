"use client"
import * as Mod from "@/components/ai-transparency/SampleGenerator"
const Real = (Mod as any).default ?? (Mod as any).SampleGenerator ?? Mod

type Props = {
  [key: string]: any
}

export default function SampleGeneratorAdapter(props: Props) {
  return <Real {...props} />
}