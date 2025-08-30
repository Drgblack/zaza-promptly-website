import { redirect } from 'next/navigation'

interface FreeResourcesPageProps {
  params: { locale: string }
}

// Redirect from old /free-resources to new /resources
export default function FreeResourcesPage({ params }: FreeResourcesPageProps) {
  redirect(`/${params.locale}/resources`)
}