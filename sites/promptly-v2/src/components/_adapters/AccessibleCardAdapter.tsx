"use client"
import * as Mod from "@/components/accessibility/AccessibleCard"
const Real = (Mod as any).default ?? (Mod as any).AccessibleCard ?? Mod

type Props = {
  title?: string
  description?: string
  variant?: string
  focusable?: boolean
  announcement?: string
  [key: string]: any
}

export default function AccessibleCardAdapter(props: Props) {
  return <Real {...props} />
}