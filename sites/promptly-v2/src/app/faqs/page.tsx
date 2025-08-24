import { redirect } from 'next/navigation'

// Redirect /faqs to /faq for consistency
export default function FAQsPage() {
  redirect('/faq')
}