"use client"
import * as Mod from "@/components/forms/EmailSignupForm"
const Real = (Mod as any).default ?? (Mod as any).EmailSignupForm ?? Mod

type Props = {
  variant?: string
  source?: string
  headline?: string
  subtext?: string
  [key: string]: any
}

export default function EmailSignupFormAdapter(props: Props) {
  return <Real {...props} />
}