"use client"
import * as Mod from "@/components/trust/TrustBadges"
const Real = (Mod as any).default ?? (Mod as any).TrustBadges ?? Mod

type Props = {
  layout?: string
  limit?: number
  className?: string
  [key: string]: any
}

export default function TrustBadgesAdapter(props: Props) {
  return <Real {...props} />
}