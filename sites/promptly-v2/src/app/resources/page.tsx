import { redirect } from 'next/navigation'

// Redirect to localized resources page
export default function ResourcesPage() {
  redirect('/en/resources')
}