"use client"
import * as Mod from "@/components/inline-email-capture"
const Real = (Mod as any).default ?? (Mod as any).InlineEmailCapture ?? Mod

type Props = {
  variant?: string
  source?: string 
  title?: string
  description?: string
  className?: string
  [key: string]: any
}

export default function InlineEmailCaptureAdapter(props: Props) {
  return <Real {...props} />
}