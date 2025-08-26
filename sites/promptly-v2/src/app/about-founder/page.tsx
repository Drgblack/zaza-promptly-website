import { redirect } from 'next/navigation'

// Redirect /about-founder to /about for consistency
export default function AboutFounderPage() {
  redirect('/about')
}