import { redirect } from 'next/navigation'

// Redirect to localized resources page
export default function FreeResourcesPage() {
  redirect('/en/resources')
}