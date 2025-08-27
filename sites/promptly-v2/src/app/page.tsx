import { redirect } from 'next/navigation'

// This page redirects to the localized homepage
// The actual homepage content is now in /[locale]/page.tsx
export default function HomePage() {
  redirect('/en')
}