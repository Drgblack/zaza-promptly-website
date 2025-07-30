import { redirect } from 'next/navigation'
import { cookies, headers } from 'next/headers'

export default async function RootPage() {
  // Get user's preferred language from cookie or browser
  const cookieStore = await cookies()
  const headersList = await headers()
  
  const preferredLocale = cookieStore.get('NEXT_LOCALE')?.value
  
  if (preferredLocale) {
    redirect(`/${preferredLocale}`)
  }
  
  // Get browser language
  const acceptLanguage = headersList.get('accept-language')
  const browserLocale = acceptLanguage?.split(',')[0]?.split('-')[0]
  
  // Redirect to appropriate locale or default to English
  const supportedLocales = ['en', 'de', 'fr', 'es', 'it']
  const locale = supportedLocales.includes(browserLocale || '') ? browserLocale : 'en'
  
  redirect(`/${locale}`)
}