import { redirect } from 'next/navigation'

// Redirect /about-founder to /about/founder for consistency
export default function AboutFounderPage() {
  redirect('/about/founder')
}