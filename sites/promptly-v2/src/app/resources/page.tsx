import { redirect } from 'next/navigation'

// Redirect /resources to /free-resources for consistency
export default function ResourcesPage() {
  redirect('/free-resources')
}